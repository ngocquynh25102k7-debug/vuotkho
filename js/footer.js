
let footerInnerHTML = ` <div class="logo">
            <img src="./assets/images/pages/trangchu/logo_footer.png" alt="logo">
            <div class="text">VƯỢT KHÓ</div>
        </div>
        <div class="infor">
            <h1>THÔNG TIN</h1>
            <ul>
                <li class="text"><a href="introduction.html">Giới thiệu</a></li>
                <li class="text"><a href="FAQ.html">FAQ</a></li>
                <li class="text"><a href="clause.html">Điều khoản</a></li>
                <li class="text"><a href="chinhsachbaomat.html">Chính sách bảo mật</a></li>
                <li class="text"><a href="support.html">Chăm sóc khách hàng</a></li>
            </ul>
        </div>
        <div class="contact">
            <h1>LIÊN HỆ</h1>
            <ul>
                <li class="text">
                    <div class="icon"><img src="./assets/icons/phone.png" alt=""></div>
                    0909090909
                </li>
                <li class="text">
                    <div class="icon"><img src="./assets/icons/mail.png" alt=""></div>
                    sage@gmail.com
                </li>
                <li class="text">
                    <div class="icon"><img src="./assets/icons/location_on.png" alt=""></div>
                    Nguyễn Văn Bảo, Phường Hạnh Thông, Tp HCM.
                </li>
            </ul>
        </div>
`;
const footerLinkTagCSS = `<link rel="stylesheet" href="./styles/footer.css">`

document.head.innerHTML += footerLinkTagCSS;

document.getElementsByTagName("footer")[0].innerHTML = footerInnerHTML;