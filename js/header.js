const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Read session (if any) from localStorage
const session = JSON.parse(localStorage.getItem("vk_session") || "null");

// If session exists but email/phone is missing, try to backfill from stored accounts so header doesn't show 'undefined'
if (session && (!session.email || !session.phone)) {
  try {
    const accounts = JSON.parse(localStorage.getItem("vk_accounts") || "[]");
    const acc = accounts.find(
      (a) => a.id == session.accountId || a.accountName === session.accountName
    );
    if (acc) {
      session.email = session.email || acc.email || "";
      session.phone = session.phone || acc.phone || "";
      session.fullName = session.fullName || acc.fullName || "";
      // persist updated session so subsequent loads have email/phone
      localStorage.setItem("vk_session", JSON.stringify(session));
    }
  } catch (e) {
    // ignore parse errors
  }
}

// Configurable logout icon: put your file at this path (e.g. assets/icons/logOut.png)
const LOGOUT_ICON = (() => {
  // prefer the 'logOut.png' asset if present, otherwise fallback to existing out.png
  const preferred = "./assets/icons/logOut.png";
  try {
    return preferred;
  } catch (e) {
    return "./assets/icons/out.png";
  }
})();

// button text/link for unauthenticated users
const unauthButtonText =
  currentPage === "index.html" || currentPage === "dangky.html"
    ? "Đăng Nhập"
    : "Đăng Ký";
const unauthButtonLink = unauthButtonText.includes("Đăng Nhập")
  ? "./dangnhap.html"
  : "./dangky.html";

const isActivePage = (pageName) => (currentPage === pageName ? "active" : "");

// If session exists, render user actions (avatar, chat, logout). Otherwise render auth button.
const authHtml = session
  ? `
    <div class="user-wrapper">
        <div class="user-actions">
            <button class="icon-circle noti-btn">
                <img src="./assets/icons/noti.png" alt="notification icon">
            </button>
            <button class="icon-circle user-btn" id="user-btn" aria-haspopup="true" aria-expanded="false">
                <img src="./assets/icons/avatar.png" alt="user icon">
            </button>
        </div>
        <div class="user-menu" id="user-menu" role="menu">
            <div class="user-info">
                <div class="avatar"><img src="./assets/icons/avatar2.png" alt="user icon" ></div>
                <div class = "user-name">
                    <strong>${session.fullName}</strong>
                    <div class="user-email">${session.email}</div>
                </div>
            </div>
            <div class="menu-buttons">
                <button class="menu-item" id="manage-account" role="menuitem"><svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_831_878)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.982 9.268C8.21419 9.50013 8.48984 9.68425 8.79319 9.80985C9.09655 9.93545 9.42167 10.0001 9.75 10C10.422 10 11.052 9.733 11.518 9.268C11.7501 9.03581 11.9343 8.76016 12.0599 8.45681C12.1854 8.15345 12.2501 7.82833 12.25 7.5C12.25 6.828 11.983 6.198 11.518 5.732C11.2858 5.49987 11.0102 5.31575 10.7068 5.19015C10.4035 5.06455 10.0783 4.99994 9.75 5C9.078 5 8.448 5.267 7.982 5.732C7.74987 5.96419 7.56575 6.23984 7.44015 6.54319C7.31455 6.84655 7.24994 7.17167 7.25 7.5C7.25 8.172 7.517 8.802 7.982 9.268ZM10.811 8.561C10.531 8.841 10.154 9 9.75 9C9.346 9 8.97 8.84 8.69 8.56C8.41 8.28 8.25 7.904 8.25 7.5C8.25 7.096 8.41 6.72 8.69 6.44C8.97 6.16 9.346 6 9.75 6C10.154 6 10.53 6.16 10.81 6.44C11.09 6.72 11.25 7.096 11.25 7.5C11.25 7.904 11.09 8.28 10.81 8.56" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.966 1.273L12.696 1.987C12.3247 1.78779 11.934 1.62696 11.53 1.507L11.06 0.0929999C11.027 -0.00670874 10.9635 -0.0935026 10.8784 -0.15507C10.7933 -0.216637 10.691 -0.249851 10.586 -0.25H8.81C8.701 -0.249906 8.59501 -0.214195 8.50818 -0.148304C8.42135 -0.0824137 8.35843 0.010047 8.329 0.115L7.937 1.518C7.53349 1.64001 7.14347 1.80285 6.773 2.004L5.44 1.335C5.34601 1.28792 5.23956 1.27166 5.1358 1.28853C5.03203 1.30541 4.93623 1.35456 4.862 1.429L3.605 2.685C3.52781 2.7622 3.47802 2.86254 3.46321 2.9707C3.4484 3.07886 3.4694 3.18889 3.523 3.284L4.237 4.554C4.037 4.92467 3.877 5.31333 3.757 5.72L2.343 6.19C2.24329 6.22298 2.1565 6.28651 2.09493 6.37159C2.03336 6.45667 2.00015 6.55898 2 6.664V8.441C2.00009 8.55 2.0358 8.65599 2.1017 8.74282C2.16759 8.82965 2.26005 8.89257 2.365 8.922L3.768 9.314C3.89067 9.71933 4.05267 10.1073 4.254 10.478L3.585 11.811C3.53792 11.905 3.52166 12.0114 3.53853 12.1152C3.55541 12.219 3.60456 12.3148 3.679 12.389L4.935 13.645C5.0122 13.7222 5.11254 13.772 5.2207 13.7868C5.32886 13.8016 5.43889 13.7806 5.534 13.727L6.804 13.013C7.17467 13.213 7.56333 13.373 7.97 13.493L8.44 14.907C8.47298 15.0067 8.53651 15.0935 8.62159 15.1551C8.70667 15.2166 8.80898 15.2499 8.914 15.25H10.691C10.8 15.2499 10.906 15.2142 10.9928 15.1483C11.0796 15.0824 11.1426 14.99 11.172 14.885L11.564 13.482C11.9675 13.36 12.3575 13.1972 12.728 12.996L14.061 13.665C14.1549 13.7122 14.2613 13.7286 14.365 13.7119C14.4688 13.6952 14.5647 13.6463 14.639 13.572L15.895 12.315C15.9722 12.2378 16.022 12.1375 16.0368 12.0293C16.0516 11.9211 16.0306 11.8111 15.977 11.716L15.263 10.446C15.463 10.0753 15.623 9.68667 15.743 9.28L17.157 8.81C17.2567 8.77702 17.3435 8.71349 17.4051 8.62841C17.4666 8.54333 17.4999 8.44102 17.5 8.336V6.56C17.4999 6.451 17.4642 6.34501 17.3983 6.25818C17.3324 6.17135 17.24 6.10843 17.135 6.079L15.732 5.687C15.61 5.28349 15.4472 4.89347 15.246 4.523L15.915 3.19C15.9622 3.09611 15.9786 2.98972 15.9619 2.88597C15.9452 2.78221 15.8963 2.68635 15.822 2.612L14.565 1.356C14.4878 1.27881 14.3875 1.22902 14.2793 1.21421C14.1711 1.1994 14.0611 1.2194 13.966 1.273ZM12.942 2.998L14.126 2.331L14.859 3.064L14.232 4.314C14.1943 4.38942 14.1762 4.47317 14.1795 4.55744C14.1829 4.64172 14.2074 4.72378 14.251 4.796C14.516 5.236 14.715 5.714 14.841 6.214C14.8624 6.29954 14.9061 6.37789 14.9675 6.44112C15.029 6.50434 15.1061 6.55019 15.191 6.574L16.5 6.94V7.977L15.173 8.417C15.0929 8.44353 15.0208 8.48991 14.9635 8.55181C14.9061 8.6137 14.8654 8.68911 14.845 8.771C14.7214 9.27068 14.5242 9.74923 14.26 10.191C14.2147 10.2666 14.1902 10.3529 14.1889 10.4411C14.1877 10.5292 14.2098 10.6161 14.253 10.693L14.92 11.877L14.187 12.61L12.937 11.983C12.8616 11.9453 12.7778 11.9272 12.6936 11.9305C12.6093 11.9339 12.5272 11.9584 12.455 12.002C12.015 12.267 11.537 12.466 11.037 12.592C10.9515 12.6134 10.8731 12.6571 10.8099 12.7185C10.7467 12.78 10.7008 12.8571 10.677 12.942L10.311 14.251H9.275L8.835 12.924C8.80837 12.8438 8.76185 12.7716 8.69977 12.7143C8.63768 12.6569 8.56207 12.6162 8.48 12.596C7.98032 12.4724 7.50177 12.2752 7.06 12.011C6.98437 11.9657 6.8981 11.9412 6.80994 11.9399C6.72178 11.9387 6.63486 11.9608 6.558 12.004L5.374 12.671L4.641 11.938L5.268 10.688C5.30574 10.6126 5.32379 10.5288 5.32047 10.4446C5.31715 10.3603 5.29256 10.2782 5.249 10.206C4.98323 9.76514 4.7844 9.28726 4.659 8.788C4.63759 8.70246 4.59393 8.62411 4.53246 8.56088C4.471 8.49766 4.3939 8.45181 4.309 8.428L3 8.062V7.025L4.327 6.585C4.40704 6.55823 4.47899 6.51164 4.53617 6.44957C4.59335 6.3875 4.63388 6.31196 4.654 6.23C4.779 5.73 4.977 5.251 5.24 4.81C5.28532 4.73437 5.30984 4.6481 5.31107 4.55994C5.3123 4.47178 5.2902 4.38486 5.247 4.308L4.58 3.124L5.313 2.391L6.563 3.018C6.63842 3.05574 6.72217 3.07379 6.80644 3.07047C6.89072 3.06715 6.97278 3.04256 7.045 2.999C7.485 2.734 7.963 2.535 8.463 2.409C8.54854 2.38759 8.62689 2.34393 8.69012 2.28246C8.75334 2.221 8.79919 2.1439 8.823 2.059L9.189 0.75H10.226L10.666 2.077C10.6927 2.15692 10.7391 2.2288 10.801 2.28596C10.8629 2.34313 10.9382 2.38373 11.02 2.404C11.52 2.529 11.999 2.727 12.44 2.99C12.5156 3.03532 12.6019 3.05984 12.6901 3.06107C12.7782 3.0623 12.8651 3.0412 12.942 2.998Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_831_878">
<rect width="19" height="15" fill="white"/>
</clipPath>
</defs>
</svg>
Quản lý tài khoản</button>
                <button class="menu-item" id="btn-logout" role="menuitem"><svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_831_883)">
<path d="M10.5 5.5V4.25C10.5 3.91848 10.3683 3.60054 10.1339 3.36612C9.89946 3.1317 9.58152 3 9.25 3H3.25C2.91848 3 2.60054 3.1317 2.36612 3.36612C2.1317 3.60054 2 3.91848 2 4.25V11.75C2 12.0815 2.1317 12.3995 2.36612 12.6339C2.60054 12.8683 2.91848 13 3.25 13H9.25C9.58152 13 9.89946 12.8683 10.1339 12.6339C10.3683 12.3995 10.5 12.0815 10.5 11.75V10.5M12.5 5.5L15 8M15 8L12.5 10.5M15 8H6.46875" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_831_883">
<rect width="15" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
Đăng xuất</button>
            </div>
        </div>
    </div>`
  : `
    <button class="auth-btn" onclick="window.location.href='${unauthButtonLink}'">${unauthButtonText}</button>`;

let headerInnerHTML = `
    <div class="wrapper">
        <div class="logo">
            <img src="./assets/images/pages/trangchu/logo.png" alt="logo">
            <div class="text">VƯỢT KHÓ</div>
        </div>
        <div class="nav_button">
            <nav>
                <ul>
                    <li class="nav_bar"><a href="index.html" class="${isActivePage(
                      "index.html"
                    )}">Trang chủ</a></li>
                    <li class="nav_bar"><a href="trangbaidang.html" class="${isActivePage(
                      "trangbaidang.html"
                    )}">Bài đăng</a></li>
                    <li class="nav_bar"><a href="timkiem.html" class="${isActivePage(
                      "timkiem.html"
                    )}">Giao dịch</a></li>
                </ul>
            </nav>
            ${authHtml}
        </div>
    </div>`;

const headerLinkTagCSS = `<link rel="stylesheet" href="./styles/header.css">`;
document.head.insertAdjacentHTML("beforeend", headerLinkTagCSS);

const headerEl = document.body.getElementsByTagName("header")[0];
if (headerEl) headerEl.innerHTML = headerInnerHTML;

// attach handlers for user menu and logout
const userBtn = document.getElementById("user-btn");
const userMenu = document.getElementById("user-menu");
const logoutBtn = document.getElementById("btn-logout");
const manageBtn = document.getElementById("manage-account");

// --- Logout confirmation modal helpers ---
function ensureLogoutModalExists() {
  if (document.getElementById("logout-modal")) return;
  const html = `
  <div id="logout-modal" class="vk-modal-overlay" style="display:none">
    <div class="vk-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title">
  <div class="vk-modal-icon"><img src="${LOGOUT_ICON}" alt="logout icon" onerror="this.onerror=null;this.src='./assets/icons/out.png'"/></div>
      <h2 id="logout-title">Xác nhận đăng xuất</h2>
      <p class="vk-modal-sub">Tài khoản: <strong id="logout-username">User</strong></p>
      <p class="vk-modal-note">Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Bạn sẽ cần đăng nhập lại để tiếp tục.</p>

      <div class="vk-modal-warning">
        <div class="vk-modal-warning-icon"><img src="./assets/icons/warningIcon.png" alt="warning" onerror="this.onerror=null;this.src='./assets/icons/warningIcon.png'"/></div>
        <div class="vk-modal-warning-text">Hãy đảm bảo bạn đã lưu toàn bộ công việc</div>
      </div>

      <div class="vk-modal-actions">
        <button id="logout-cancel" class="vk-btn vk-btn-outline">Hủy bỏ</button>
        <button id="logout-confirm" class="vk-btn vk-btn-danger">Đăng xuất</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  // wire buttons
  const modal = document.getElementById("logout-modal");
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) hideLogoutModal();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") hideLogoutModal();
  });
  document
    .getElementById("logout-cancel")
    .addEventListener("click", hideLogoutModal);
  document.getElementById("logout-confirm").addEventListener("click", () => {
    // perform logout
    localStorage.removeItem("vk_session");
    hideLogoutModal();
    window.location.href = "index.html";
  });
}

function showLogoutModal() {
  ensureLogoutModalExists();
  const modal = document.getElementById("logout-modal");
  const nameEl = document.getElementById("logout-username");
  try {
    const s = JSON.parse(localStorage.getItem("vk_session") || "null");
    nameEl.textContent = s && s.fullName ? s.fullName : "Admin User";
  } catch (e) {
    nameEl.textContent = "Admin User";
  }
  modal.style.display = "flex";
}

function hideLogoutModal() {
  const modal = document.getElementById("logout-modal");
  if (modal) modal.style.display = "none";
}

if (userBtn && userMenu) {
  // toggle menu when clicking user button
  userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isShown = userMenu.style.display === "block";
    userMenu.style.display = isShown ? "none" : "block";
    // update aria-expanded
    userBtn.setAttribute("aria-expanded", (!isShown).toString());
    // focus first menu item when opened for keyboard users
    if (!isShown) {
      const firstItem = userMenu.querySelector(".menu-item");
      if (firstItem) firstItem.focus();
    }
  });

  // support opening via keyboard (Enter/Space)
  userBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      userBtn.click();
    }
  });

  // hide menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target) && !userBtn.contains(e.target)) {
      userMenu.style.display = "none";
      if (userBtn) userBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (userMenu) {
      userMenu.style.display = "none";
      if (userBtn) userBtn.setAttribute("aria-expanded", "false");
      if (userBtn) userBtn.focus();
    }
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // show confirmation modal instead of immediate logout
    showLogoutModal();
  });
}

// navigate to profile management page when clicking manage-account
if (manageBtn) {
  manageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "./taikhoan.html";
  });
}

let chieuDaiWeb = document.getElementById("b")
