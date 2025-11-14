document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.querySelector('.button--register');
  const inputs = document.querySelectorAll('.note--box input');
  const agreeCheckbox = document.getElementById('a');

  if (!registerBtn || inputs.length < 5 || !agreeCheckbox) return;

  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem('vk_accounts') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveAccounts(list) {
    localStorage.setItem('vk_accounts', JSON.stringify(list));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const fullName = inputs[0].value.trim();
    const accountName = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const phone = inputs[3].value.trim();
    const password = inputs[4].value;

    if (!fullName || !accountName || !email || !phone || !password) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Email không hợp lệ.');
      return;
    }
    if (!agreeCheckbox.checked) {
      alert('Bạn phải đồng ý với điều khoản để đăng ký.');
      return;
    }

    const accounts = getAccounts();

    const conflict = accounts.find(acc => acc.accountName === accountName || acc.email === email || acc.phone === phone);
    if (conflict) {
      alert('Tài khoản / email / số điện thoại đã được sử dụng.');
      return;
    }

    const newAccount = {
      id: Date.now(),
      fullName,
      accountName,
      email,
      phone,
      password,
      provider: 'local',
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    saveAccounts(accounts);

    // lưu session
    localStorage.setItem('vk_session', JSON.stringify({ accountId: newAccount.id, accountName: newAccount.accountName, fullName: newAccount.fullName }));

    alert('Đăng ký thành công!');

    // redirect về trang chủ (tải lại) để header cập nhật
    window.location.href = './index.html';
  });
});
