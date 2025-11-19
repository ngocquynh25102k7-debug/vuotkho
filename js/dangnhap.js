document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const loginBtn = document.querySelector(".btn-login");
  const usernameInput =
    document.querySelector('.login-container input[type="text"].input-field') ||
    document.querySelector('.input-field[type="text"]');
  const passwordInput =
    document.querySelector(
      '.login-container input[type="password"].input-field'
    ) || document.querySelector('.input-field[type="password"]');

  // fallback: try selecting by order if selectors above failed
  const inputs = document.querySelectorAll(".input-field");
  const userInput = usernameInput || inputs[0];
  const passInput = passwordInput || inputs[1];

  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem("vk_accounts") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveSession(account) {
    const session = {
      accountId: account.id,
      accountName: account.accountName,
      fullName: account.fullName,
      email: account.email,
      phone: account.phone || "",
      provider: account.provider || "local",
    };
    localStorage.setItem("vk_session", JSON.stringify(session));
  }

  function showError(msg) {
    alert(msg);
  }

  if (!form && !loginBtn) return; // nothing to do

  const handleLogin = (e) => {
    e.preventDefault();

    const username = userInput ? userInput.value.trim() : "";
    const password = passInput ? passInput.value : "";

    if (!username || !password) {
      showError("Vui lòng nhập tên tài khoản và mật khẩu.");
      return;
    }

    const accounts = getAccounts();
    // try to find by accountName or email
    const account = accounts.find(
      (acc) =>
        (acc.accountName === username || acc.email === username) &&
        acc.password === password
    );

    if (!account) {
      showError("Tên tài khoản hoặc mật khẩu không đúng.");
      return;
    }

    // login success
    saveSession(account);
    alert("Đăng nhập thành công!");
    // redirect to index so header re-renders
    window.location.href = "./index.html";
  };

  if (form) {
    form.addEventListener("submit", handleLogin);
  }
  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }
});
