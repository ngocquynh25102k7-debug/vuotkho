
const currentPage = window.location.pathname.split("/").pop();
const buttonText = currentPage === "dangky.html" ? "Đăng nhập" : "Đăng ký";
const buttonLink = currentPage === "dangky.html" ? "./dangnhap.html" : "./dangky.html";

// Hàm kiểm tra trang hiện tại để set active
const isActivePage = (pageName) => {
    return currentPage === pageName ? "active" : "";
};
let headerInnerHTML = `<div class="wrapper">
            <div class="logo">
                <img src="./assets/images/pages/trangchu/logo.png" alt="logo">
                <div class="text">VƯỢT KHÓ</div>
            </div>
            <div class="nav_button">
                <nav>
                    <ul>
                         <li class="nav_bar"><a href="index.html" class="${isActivePage('index.html')}">Trang chủ</a></li>
                        <li class="nav_bar"><a href="post.html" class="${isActivePage('post.html')}">Bài đăng</a></li>
                        <li class="nav_bar"><a href="#" class="${isActivePage('transactions.html')}">Giao dịch</a></li>
                    </ul>
                </nav>
               <button onclick="window.location.href='${buttonLink}'">${buttonText}</button>
            </div>
        </div>
`;
const headerLinkTagCSS = `<link rel="stylesheet" href="./styles/header.css">`
document.head.innerHTML += headerLinkTagCSS;

document.body.getElementsByTagName("header")[0].innerHTML = headerInnerHTML;
