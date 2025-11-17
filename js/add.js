document.getElementById("addForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newCustomer = {
    id: Date.now().toString(),
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    status: document.getElementById("status").value,
  };

  // Try to save to remote (Firestore) if available, otherwise fallback to localStorage
  if (window.saveCustomerRemote) {
    window
      .saveCustomerRemote(newCustomer)
      .then(() => {
        alert("Thêm khách hàng thành công (đã lưu lên server)!");
        window.location.href = "./manage.html";
      })
      .catch((err) => {
        console.warn("Remote save failed, falling back to localStorage", err);
        const list = JSON.parse(localStorage.getItem("customers") || "[]");
        list.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(list));
        alert("Thêm khách hàng thành công (lưu cục bộ)!");
        window.location.href = "./manage.html";
      });
  } else {
    const list = JSON.parse(localStorage.getItem("customers") || "[]");
    list.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(list));
    alert("Thêm khách hàng thành công (lưu cục bộ)!");
    window.location.href = "./manage.html";
  }
});
