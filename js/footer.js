
let footerInnerHTML = ` <div class="logo">
            <img src="./assets/images/pages/trangchu/logo_footer.png" alt="logo">
            <div class="text" data-translate="VƯỢT KHÓ">VƯỢT KHÓ</div>
        </div>
        <div class="infor">
            <h1 data-translate="THÔNG TIN">THÔNG TIN</h1>
            <ul>
                <li class="text"><a href="introduction.html" data-translate="Giới thiệu">Giới thiệu</a></li>
                <li class="text"><a href="FAQ.html" data-translate="FAQ">FAQ</a></li>
                <li class="text"><a href="clause.html" data-translate="Điều khoản">Điều khoản</a></li>
                <li class="text"><a href="chinhsachbaomat.html" data-translate="Chính sách bảo mật">Chính sách bảo mật</a></li>
                <li class="text"><a href="support.html" data-translate="Chăm sóc khách hàng">Chăm sóc khách hàng</a></li>
            </ul>
        </div>
        <div class="contact">
            <h1 data-translate="LIÊN HỆ">LIÊN HỆ</h1>
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
                    <span data-translate="Nguyễn Văn Bảo, Phường Hạnh Thông, Tp HCM.">Nguyễn Văn Bảo, Phường Hạnh Thông, Tp HCM.</span>
                </li>
            </ul>
        </div>
`;
document.getElementsByTagName("footer")[0].innerHTML = footerInnerHTML;