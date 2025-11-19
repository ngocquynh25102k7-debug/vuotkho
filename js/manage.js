// Chờ cho toàn bộ nội dung trang (HTML, CSS) được tải xong
document.addEventListener("DOMContentLoaded", function () {
  // --- 1. HÀM QUẢN LÝ DỮ LIỆU ---

  // Tải khách hàng từ LocalStorage
  function loadCustomers() {
    return JSON.parse(localStorage.getItem("customers") || "[]");
  }

  // Lưu khách hàng vào LocalStorage
  function saveCustomers(list) {
    localStorage.setItem("customers", JSON.stringify(list));
  }

  // HÀM Dịch trạng thái sang tiếng Việt
  function translateStatus(status) {
    switch (status) {
      case "active":
        return "Còn hạn";
      case "pending":
        return "Chờ duyệt";
      case "overdue":
        return "Hết hạn";
      default:
        return status; // Trả về y cũ nếu không khớp
    }
  }

  // *** HÀM MỚI: DỊCH NGÀY THÁNG SANG DD/MM/YYYY ***
  function formatDate(dateString) {
    // Nếu dateString rỗng, null hoặc undefined, trả về "---"
    if (!dateString) {
      return "---";
    }

    // Tách chuỗi "YYYY-MM-DD" thành mảng [YYYY, MM, DD]
    const parts = dateString.split("-");

    // Kiểm tra xem có đúng 3 phần không
    if (parts.length !== 3) {
      return dateString; // Trả về y cũ nếu định dạng sai
    }

    // Gán lại biến cho dễ đọc
    const [year, month, day] = parts;

    // Trả về chuỗi mới theo định dạng "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  }

  // --- HÀM MỚI: CẬP NHẬT THỐNG KÊ Ở CÁC BOX ---
  function updateStats(list) {
    const totalEl = document.querySelector(".count.total");
    const activeEl = document.querySelector(".count.active");
    const pendingEl = document.querySelector(".count.pending");
    const overdueEl = document.querySelector(".count.overdue");

    const total = list.length;
    const active = list.filter((c) => c.status === "active").length;
    const pending = list.filter((c) => c.status === "pending").length;
    const overdue = list.filter((c) => c.status === "overdue").length;

    if (totalEl) totalEl.textContent = total;
    if (activeEl) activeEl.textContent = active;
    if (pendingEl) pendingEl.textContent = pending;
    if (overdueEl) overdueEl.textContent = overdue;
  }

  // --- HÀM MỚI: GẮN SỰ KIỆN CHO CÁC BOX ĐỂ LỌC BẢNG KHI CLICK ---
  function bindBoxClicks() {
    const boxAll = document.querySelector(".border--total");
    const boxActive = document.querySelector(".border--active");
    const boxPending = document.querySelector(".border--pending");
    const boxOverdue = document.querySelector(".border--overdue");

    function clearSelected() {
      [boxAll, boxActive, boxPending, boxOverdue].forEach((b) => {
        if (b) b.classList.remove("box-selected");
      });
    }

    if (boxAll)
      boxAll.addEventListener("click", () => {
        clearSelected();
        boxAll.classList.add("box-selected");
        renderTable(loadCustomers());
      });

    if (boxActive)
      boxActive.addEventListener("click", () => {
        clearSelected();
        boxActive.classList.add("box-selected");
        renderTable(loadCustomers().filter((c) => c.status === "active"));
      });

    if (boxPending)
      boxPending.addEventListener("click", () => {
        clearSelected();
        boxPending.classList.add("box-selected");
        renderTable(loadCustomers().filter((c) => c.status === "pending"));
      });

    if (boxOverdue)
      boxOverdue.addEventListener("click", () => {
        clearSelected();
        boxOverdue.classList.add("box-selected");
        renderTable(loadCustomers().filter((c) => c.status === "overdue"));
      });
  }

  // --- 2. HÀM HIỂN THỊ BẢNG ---

  // Hiển thị dữ liệu ra bảng
  function renderTable(list) {
    const tbody = document.getElementById("customerTable");
    tbody.innerHTML = ""; // Xóa bảng cũ trước khi vẽ lại

    list.forEach((item, index) => {
      const tr = document.createElement("tr");

      // *** ĐÃ SỬA LẠI CÁC DÒNG NGÀY THÁNG ***
      tr.innerHTML = `
        <td class ="button">
            <button class="action-btn" onclick="editCustomer(${index})">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 3.625H6.04167C5.40073 3.625 4.78604 3.87961 4.33283 4.33283C3.87961 4.78604 3.625 5.40073 3.625 6.04167V22.9583C3.625 23.5993 3.87961 24.214 4.33283 24.6672C4.78604 25.1204 5.40073 25.375 6.04167 25.375H22.9583C23.5993 25.375 24.214 25.1204 24.6672 24.6672C25.1204 24.214 25.375 23.5993 25.375 22.9583V14.5" stroke="#05AA6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.2034 3.17166C22.6841 2.69096 23.3361 2.4209 24.0159 2.4209C24.6957 2.4209 25.3477 2.69096 25.8284 3.17166C26.3091 3.65237 26.5792 4.30434 26.5792 4.98416C26.5792 5.66398 26.3091 6.31596 25.8284 6.79666L14.9377 17.6886C14.6508 17.9752 14.2963 18.1851 13.907 18.2988L10.4354 19.3138C10.3315 19.3441 10.2213 19.3459 10.1163 19.319C10.0114 19.2922 9.91565 19.2376 9.83907 19.161C9.76248 19.0844 9.70789 18.9886 9.68101 18.8837C9.65413 18.7788 9.65595 18.6686 9.68628 18.5646L10.7013 15.0931C10.8155 14.7041 11.0258 14.35 11.3127 14.0636L22.2034 3.17166Z" stroke="#05AA6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>

            <button class="action-btn" onclick="deleteCustomer(${index})">
                <img src="./assets/icons/trash.png" alt="Delete"> 
            </button>
        </td>
        
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${formatDate(item.startDate)}</td>
        <td>${formatDate(item.endDate)}</td>
        <td class="status-${item.status}">${translateStatus(item.status)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- 3. HÀM XỬ LÝ HÀNH ĐỘNG (SỬA, XÓA) ---
  // (Phải đưa ra 'window' để HTML có thể gọi)

  // Hàm Xóa
  window.deleteCustomer = function (index) {
    let list = loadCustomers();
    // (Tùy chọn: Thêm confirm box cho an toàn)
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      // get item so we can delete remote if possible
      const removed = list.splice(index, 1)[0];

      // If remote delete function exists and removed has id, try remote delete
      if (window.deleteCustomerRemote && removed && removed.id) {
        window.deleteCustomerRemote(removed.id).catch((err) => {
          console.warn(
            "Remote delete failed, will still update localStorage",
            err
          );
        });
      }

      saveCustomers(list);
      renderTable(list); // Vẽ lại bảng
      updateStats(list);
    }
  };

  // Hàm Sửa
  window.editCustomer = function (index) {
    // Lưu index của khách hàng cần sửa vào LocalStorage
    localStorage.setItem("customer_to_edit_index", index);
    // Chuyển hướng sang trang chỉnh sửa
    window.location.href = "./edit.html";
  };

  // --- 4. GẮN CÁC SỰ KIỆN (TÌM KIẾM, LỌC, THÊM) ---

  // Gắn sự kiện cho ô Tìm kiếm
  document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    let list = loadCustomers();
    list = list.filter(
      (c) => c.name.toLowerCase().includes(keyword) || c.phone.includes(keyword)
    );
    renderTable(list);
  });

  // Gắn sự kiện cho nút "Thêm khách hàng"
  document.getElementById("addBtn").addEventListener("click", () => {
    window.location.href = "./add.html";
  });

  // Gắn sự kiện cho Dropdown Lọc
  const filterElement = document.getElementById("statusFilter");

  // Kích hoạt Choices.js lên nó
  const choices = new Choices(filterElement, {
    searchEnabled: false, // Tắt ô tìm kiếm bên trong dropdown
    itemSelectText: "", // Bỏ dòng chữ "Press to select"
    shouldSort: false, // Giữ nguyên thứ tự các option
  });

  // Lắng nghe sự kiện "change" từ chính element đó
  filterElement.addEventListener("change", function () {
    let list = loadCustomers();
    const value = this.value; // this.value vẫn hoạt động

    if (value !== "all") {
      list = list.filter((c) => c.status === value);
    }
    renderTable(list);
  });

  // --- 5. CHẠY LẦN ĐẦU KHI TẢI TRANG ---

  // Hiển thị bảng ngay khi trang được tải
  // Render table và cập nhật thống kê
  const allCustomers = loadCustomers();
  renderTable(allCustomers);
  updateStats(allCustomers);
  bindBoxClicks();

  // Nếu remote loader có sẵn (Firestore), tải dữ liệu remote để hiển thị chung cho tất cả máy
  if (window.loadCustomersRemote) {
    window
      .loadCustomersRemote()
      .then((remoteList) => {
        // In case remoteList is not array
        if (Array.isArray(remoteList)) {
          renderTable(remoteList);
          updateStats(remoteList);
        }
      })
      .catch((err) => {
        console.warn(
          "Failed to load remote customers, using localStorage",
          err
        );
      });
  }
});
