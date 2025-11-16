document.getElementById("addForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newCustomer = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        status: document.getElementById("status").value
    };

    const list = JSON.parse(localStorage.getItem("customers") || "[]");
    list.push(newCustomer);

    localStorage.setItem("customers", JSON.stringify(list));

    alert("Thêm khách hàng thành công!");
    window.location.href = "./manage.html";
});
