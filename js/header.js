
let headerInnerHTML = `<div class="wrapper">
            <div class="logo">
                <img src="./assets/images/pages/trangchu/logo.png" alt="logo">
                <div class="text">VƯỢT KHÓ</div>
            </div>
            <div class="nav_button">
                <nav>
                    <ul>
                        <li class="nav_bar"><a href="index.html" class="active">Trang chủ</a></li>
                        <li class="nav_bar"><a href="#">Bài đăng</a></li>
                        <li class="nav_bar"><a href="#">Giao dịch</a></li>
                    </ul>
                </nav>
                <button onclick="windows.location.href ='./dangky.html'">Đăng ký</button>
            </div>
        </div>
`;
const headerLinkTagCSS = `<link rel="stylesheet" href="./styles/header.css">`
document.head.innerHTML += headerLinkTagCSS;

document.body.getElementsByTagName("header")[0].innerHTML = headerInnerHTML;
