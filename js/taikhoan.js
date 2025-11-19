document.addEventListener("DOMContentLoaded", () => {
  const session = (() => {
    try {
      return JSON.parse(localStorage.getItem("vk_session") || "null");
    } catch (e) {
      return null;
    }
  })();

  if (!session) {
    // nếu chưa đăng nhập chuyển hướng sang trang đăng nhập
    window.location.href = "./dangnhap.html";
    return;
  }

  // Elements
  const fullNameEl = document.getElementById("fullName");
  const accountNameEl = document.getElementById("accountName");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const postContentEl = document.getElementById("postContent");
  const postBtn = document.getElementById("postBtn");
  const postsListEl = document.getElementById("postsList");

  // populate profile fields from session
  fullNameEl.value = session.fullName || "";
  accountNameEl.value = session.accountName || "";
  emailEl.value = session.email || "";
  phoneEl.value = session.phone || "";

  // helpers
  function loadAccounts() {
    try {
      return JSON.parse(localStorage.getItem("vk_accounts") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(accounts) {
    localStorage.setItem("vk_accounts", JSON.stringify(accounts));
  }

  function saveSession(sessionObj) {
    localStorage.setItem("vk_session", JSON.stringify(sessionObj));
  }

  // profile save
  async function saveProfile() {
    const accounts = loadAccounts();
    const idx = accounts.findIndex((a) => a.id === session.accountId);
    const updated = Object.assign({}, accounts[idx] || {}, {
      id: session.accountId,
      fullName: fullNameEl.value.trim(),
      accountName: accountNameEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim(),
    });

    if (idx >= 0) accounts[idx] = updated;
    else accounts.push(updated);
    saveAccounts(accounts);

    // update session
    const newSession = Object.assign({}, session, {
      fullName: updated.fullName,
      accountName: updated.accountName,
      email: updated.email,
      phone: updated.phone,
    });
    saveSession(newSession);

    alert("Thông tin đã được lưu.");

    // optionally sync to Firestore if available
    if (window.db && typeof window.db.collection === "function") {
      try {
        await window.db.collection("users").doc(updated.id).set(updated);
        console.info("Đồng bộ thông tin người dùng lên Firestore.");
      } catch (e) {
        console.warn("Không thể đồng bộ lên Firestore:", e);
      }
    }
  }

  saveProfileBtn &&
    saveProfileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      saveProfile();
    });

  // posts handling
  function loadPosts() {
    try {
      return JSON.parse(localStorage.getItem("vk_posts") || "[]");
    } catch (e) {
      return [];
    }
  }

  function savePosts(posts) {
    localStorage.setItem("vk_posts", JSON.stringify(posts));
  }

  function renderPosts() {
    const posts = loadPosts()
      .filter((p) => p.authorId === session.accountId)
      .sort((a, b) => b.createdAt - a.createdAt);
    postsListEl.innerHTML = "";
    if (!posts.length) {
      postsListEl.innerHTML = "<p>Chưa có bài đăng nào.</p>";
      return;
    }

    posts.forEach((post) => {
      const wrap = document.createElement("div");
      wrap.className = "post-item";

      const header = document.createElement("div");
      header.className = "post-header";
      header.innerHTML = `<strong>${
        session.fullName || session.accountName
      }</strong> <small style="color:#666;margin-left:8px">${new Date(
        post.createdAt
      ).toLocaleString()}</small>`;

      const body = document.createElement("div");
      body.className = "post-body";
      body.textContent = post.content;

      const actions = document.createElement("div");
      actions.className = "post-actions";
      const del = document.createElement("button");
      del.textContent = "Xóa";
      del.className = "btn btn-ghost";
      del.addEventListener("click", () => deletePost(post.id));
      actions.appendChild(del);

      wrap.appendChild(header);
      wrap.appendChild(body);
      wrap.appendChild(actions);
      postsListEl.appendChild(wrap);
    });
  }

  async function deletePost(id) {
    let posts = loadPosts();
    posts = posts.filter((p) => p.id !== id);
    savePosts(posts);

    // try delete remote if exists
    if (window.db && typeof window.db.collection === "function") {
      try {
        await window.db.collection("posts").doc(id).delete();
      } catch (e) {
        // ignore
      }
    }

    renderPosts();
  }

  async function createPost() {
    const content = (postContentEl.value || "").trim();
    if (!content) return alert("Nội dung bài đăng không được để trống");

    const posts = loadPosts();
    const id = Date.now().toString();
    const post = {
      id,
      authorId: session.accountId,
      authorName: session.accountName || session.fullName,
      content,
      createdAt: Date.now(),
    };
    posts.push(post);
    savePosts(posts);
    postContentEl.value = "";

    // try remote save if Firestore available
    if (window.db && typeof window.db.collection === "function") {
      try {
        await window.db.collection("posts").doc(id).set(post);
        console.info("Bài đăng đã được lưu lên Firestore.");
      } catch (e) {
        console.warn("Lưu bài đăng lên Firestore thất bại:", e);
      }
    }

    renderPosts();
  }

  postBtn &&
    postBtn.addEventListener("click", (e) => {
      e.preventDefault();
      createPost();
    });

  // logout handling (global logout in sidebar)
  document.addEventListener("click", (e) => {
    const target = e.target.closest && e.target.closest(".global-logout");
    if (target) {
      localStorage.removeItem("vk_session");
      window.location.href = "./index.html";
    }
  });

  // initial render
  renderPosts();
});
