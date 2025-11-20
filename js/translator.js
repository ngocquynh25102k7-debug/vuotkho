// Hệ thống dịch thuật đơn giản
class SimpleTranslator {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'vi';
        this.translations = {
            vi: {
                // Trang chủ
                'SÁCH CŨ - TRI THỨC MỚI': 'SÁCH CŨ - TRI THỨC MỚI',
                'Khám phá thế giới tri thức với những cuốn sách đã qua sử dụng': 'Khám phá thế giới tri thức với những cuốn sách đã qua sử dụng',
                'Đừng để chúng nằm quên trên kệ – hãy để Vượt Khó giúp bạn trao lại tri thức cho người cần, đồng thời kiếm thêm thu nhập từ sách cũ.': 'Đừng để chúng nằm quên trên kệ – hãy để Vượt Khó giúp bạn trao lại tri thức cho người cần, đồng thời kiếm thêm thu nhập từ sách cũ.',
                'Tìm kiếm nhiều nhất': 'Tìm kiếm nhiều nhất',
                'Bài đăng mới nhất': 'Bài đăng mới nhất',

                // Footer
                'VƯợT KHÓ': 'VƯợT KHÓ',
                'THÔNG TIN': 'THÔNG TIN',
                'Giới thiệu': 'Giới thiệu',
                'FAQ': 'FAQ',
                'Điều khoản': 'Điều khoản',
                'Chính sách bảo mật': 'Chính sách bảo mật',
                'Chăm sóc khách hàng': 'Chăm sóc khách hàng',
                'LIÊN HỆ': 'LIÊN HỆ',
                'Nguyễn Văn Bảo, PhưỜng Hạnh Thông, Tp HCM.': 'Nguyễn Văn Bảo, PhưỜng Hạnh Thông, Tp HCM.',
                'Quản lý tài khoản': 'Quản lý tài khoản',

                // Modal Đăng xuất
                'Xác nhận đăng xuất': 'Xác nhận đăng xuất',
                'Tài khoản:': 'Tài khoản:',
                'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Bạn sẽ cần đăng nhập lại để tiếp tục.': 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Bạn sẽ cần đăng nhập lại để tiếp tục.',
                'Hãy đảm bảo bạn đã lưu toàn bộ công việc': 'Hãy đảm bảo bạn đã lưu toàn bộ công việc',
                'Hủy bỏ': 'Hủy bỏ',
                'Tìm kiếm sách': 'Tìm kiếm sách',
                'Đăng bán sách': 'Đăng bán sách',
                'Danh mục sách': 'Danh mục sách',
                'Sách giáo khoa': 'Sách giáo khoa',
                'Tiểu thuyết': 'Tiểu thuyết',
                'Khoa học': 'Khoa học',
                'Lịch sử': 'Lịch sử',
                'Kinh tế': 'Kinh tế',
                'Sách mới nhất': 'Sách mới nhất',
                'Khám phá ngay': 'Khám phá ngay',

                // Đăng nhập
                'ĐĂNG NHẬP': 'ĐĂNG NHẬP',
                'Tên tài khoản': 'Tên tài khoản',
                'Mật khẩu': 'Mật khẩu',
                'Quên mật khẩu?': 'Quên mật khẩu?',
                'Lưu thông tin': 'Lưu thông tin',
                'Đăng nhập': 'Đăng nhập',
                'Hoặc': 'Hoặc',
                'Đăng nhập bằng Google': 'Đăng nhập bằng Google',
                'Chưa có tài khoản?': 'Chưa có tài khoản?',

                // Đăng ký
                'ĐĂNG KÝ': 'ĐĂNG KÝ',
                'Đăng ký': 'Đăng ký',
                'Họ và tên': 'Họ và tên',
                'Email': 'Email',
                'Số điện thoại': 'Số điện thoại',
                'Nhập lại mật khẩu': 'Nhập lại mật khẩu',
                'Tôi đồng ý với': 'Tôi đồng ý với',
                'điều khoản và điều kiện': 'điều khoản và điều kiện',
                'Đăng ký bằng Google': 'Đăng ký bằng Google',
                'Đã có tài khoản?': 'Đã có tài khoản?',

                // Header và Navigation
                'Trang chủ': 'Trang chủ',
                'Tìm kiếm': 'Tìm kiếm',
                'KẾT QUẢ TÌM KIẾM': 'KẾT QUẢ TÌM KIẾM',
                'Thông báo': 'Thông báo',
                'Tài khoản': 'Tài khoản',
                'Đăng xuất': 'Đăng xuất',
                'Điều hướng': 'Điều hướng',

                // Thêm sách và quản lý
                'ĐĂNG BÁN SÁCH': 'ĐĂNG BÁN SÁCH',
                'Tiêu đề sách': 'Tiêu đề sách',
                'Tác giả': 'Tác giả',
                'Thể loại': 'Thể loại',
                'Giá bán': 'Giá bán',
                'Mô tả': 'Mô tả',
                'Hình ảnh': 'Hình ảnh',
                'Hình ảnh sản phẩm': 'Hình ảnh sản phẩm',
                'Số lượng': 'Số lượng',
                'Độ mới': 'Độ mới',
                'Đăng bán': 'Đăng bán',
                'Chi tiết': 'Chi tiết',
                'Trước': 'Trước',
                'Sau': 'Sau',
                'Thêm khách hàng': 'Thêm khách hàng',
                'Quản lý khách hàng': 'Quản lý khách hàng',
                'Quản lý thông tin và trang thái khách hàng': 'Quản lý thông tin và trang thái khách hàng',
                'Tổng bài đăng': 'Tổng bài đăng',
                'Đã duyệt': 'Đã duyệt',
                'Chờ duyệt': 'Chờ duyệt',
                'Từ chối': 'Từ chối',
                'Hết hạn': 'Hết hạn',
                'Đang hoạt động': 'Đang hoạt động',
                'Trạng thái': 'Trạng thái',

                // Chi tiết sản phẩm
                'Mô tả chi tiết sản phẩm': 'Mô tả chi tiết sản phẩm',
                'Lưu ý': 'Lưu ý',
                'Kiểm tra chính tả và nội dung trước khi đăng.': 'Kiểm tra chính tả và nội dung trước khi đăng.',
                'Không sử dụng từ ngữ phản cảm hoặc vi phạm quy định cộng đồng.': 'Không sử dụng từ ngữ phản cảm hoặc vi phạm quy định cộng đồng.',
                'Hình ảnh phải rõ nét, không chứa logo hoặc watermark.': 'Hình ảnh phải rõ nét, không chứa logo hoặc watermark.',
                'Không đăng lại cùng một nội dung nhiều lần.': 'Không đăng lại cùng một nội dung nhiều lần.',
                'Hủy': 'Hủy',
                'Đăng bài': 'Đăng bài',
                'THÔNG TIN CHI TIẾT': 'THÔNG TIN CHI TIẾT',

                'Nhắn tin': 'Nhắn tin',
                'Tôi muốn mua sách': 'Tôi muốn mua sách',

                // Alerts
                'Chỉ hỗ trợ chèn hình ảnh.Tối đa 5 hình ảnh': 'Chỉ hỗ trợ chèn hình ảnh.Tối đa 5 hình ảnh',
                'Thông tin sản phẩm': 'Thông tin sản phẩm',
                'Số lượng': 'Số lượng',
                'Độ mới': 'Độ mới',

                // Nút ngôn ngữ
                'Vietnamese': 'Tiếng Việt',
                'English': 'English'
            },

            en: {
                // Homepage
                'SÁCH CŨ - TRI THỨC MỚI': 'OLD BOOKS - NEW KNOWLEDGE',
                'Khám phá thế giới tri thức với những cuốn sách đã qua sử dụng': 'Discover the world of knowledge with used books',
                'Đừng để chúng nằm quên trên kệ – hãy để Vượt Khó giúp bạn trao lại tri thức cho người cần, đồng thời kiếm thêm thu nhập từ sách cũ.': 'Don\'t let them gather dust on the shelf – let Vuot Kho help you share knowledge with those in need while earning extra income from old books.',
                'Tìm kiếm nhiều nhất': 'Most Searched',
                'Bài đăng mới nhất': 'Latest Posts',
                
                // Footer
                'VƯợT KHÓ': 'VUOT KHO',
                'THÔNG TIN': 'INFORMATION',
                'Giới thiệu': 'About Us',
                'FAQ': 'FAQ',
                'Điều khoản': 'Terms & Conditions',
                'Chính sách bảo mật': 'Privacy Policy',
                'Chăm sóc khách hàng': 'Customer Service',
                'LIÊN HỆ': 'CONTACT',
                'Nguyễn Văn Bảo, PhưỜng Hạnh Thông, Tp HCM.': 'Nguyen Van Bao, Hanh Thong Ward, Ho Chi Minh City.',
                'Quản lý tài khoản': 'Account Management',
                
                // Modal Đăng xuất
                'Xác nhận đăng xuất': 'Confirm Logout',
                'Tài khoản:': 'Account:',
                'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? Bạn sẽ cần đăng nhập lại để tiếp tục.': 'Are you sure you want to logout from the system? You will need to login again to continue.',
                'Hãy đảm bảo bạn đã lưu toàn bộ công việc': 'Make sure you have saved all your work',
                'Hủy bỏ': 'Cancel',
                'Tìm kiếm sách': 'Search books',
                'Đăng bán sách': 'Sell books',
                'Danh mục sách': 'Book categories',
                'Sách giáo khoa': 'Textbooks',
                'Tiểu thuyết': 'Novels',
                'Khoa học': 'Science',
                'Lịch sử': 'History',
                'Kinh tế': 'Economics',
                'Sách mới nhất': 'Latest books',
                'Khám phá ngay': 'Explore now',
                
                // Login
                'ĐĂNG NHẬP': 'LOGIN',
                'Tên tài khoản': 'Username',
                'Mật khẩu': 'Password',
                'Quên mật khẩu?': 'Forgot password?',
                'Lưu thông tin': 'Remember me',
                'Đăng nhập': 'Login',
                'Hoặc': 'Or',
                'Đăng nhập bằng Google': 'Login with Google',
                'Chưa có tài khoản?': "Don't have an account?",
                'Đăng ký': 'Sign up',
                
                // Register
                'ĐĂNG KÝ': 'REGISTER',
                'Họ và tên': 'Full name',
                'Email': 'Email',
                'Số điện thoại': 'Phone number',
                'Nhập lại mật khẩu': 'Confirm password',
                'Tôi đồng ý với': 'I agree with',
                'điều khoản và điều kiện': 'terms and conditions',
                'Đăng ký bằng Google': 'Register with Google',
                'Đã có tài khoản?': 'Already have an account?',
                
                // Header và Navigation
                'Trang chủ': 'Home',
                'Tìm kiếm': 'Search',
                'KẾT QUẢ TÌM KIẾM': 'SEARCH RESULTS',
                'Thông báo': 'Notifications',
                'Tài khoản': 'Account',
                'Đăng xuất': 'Logout',
                'Điều hướng': 'Navigation',
                
                // Add book và Management
                'ĐĂNG BÁN SÁCH': 'SELL BOOK',
                'Tiêu đề sách': 'Book title',
                'Tác giả': 'Author',
                'Thể loại': 'Category',
                'Giá bán': 'Price',
                'Mô tả': 'Description',
                'Hình ảnh': 'Images',
                'Hình ảnh sản phẩm': 'Product Images',
                'Số lượng': 'Quantity',
                'Độ mới': 'Condition',
                'Đăng bán': 'Sell',
                'Chi tiết': 'Details',
                'Trước': 'Previous',
                'Sau': 'Next',
                'Thêm khách hàng': 'Add customer',
                'Quản lý khách hàng': 'Customer management',
                'Quản lý thông tin và trang thái khách hàng': 'Manage customer information and status',
                'Tổng bài đăng': 'Total posts',
                'Đã duyệt': 'Approved',
                'Chờ duyệt': 'Pending',
                'Từ chối': 'Rejected',
                'Hết hạn': 'Expired',
                'Đang hoạt động': 'Active',
                'Trạng thái': 'Status',
                
                // Post page
                'Mô tả chi tiết sản phẩm': 'Detailed product description',
                'Lưu ý': 'Note',
                'Kiểm tra chính tả và nội dung trước khi đăng.': 'Check spelling and content before posting.',
                'Không sử dụng từ ngữ phản cảm hoặc vi phạm quy định cộng đồng.': 'Do not use offensive language or violate community guidelines.',
                'Hình ảnh phải rõ nét, không chứa logo hoặc watermark.': 'Images must be clear, without logos or watermarks.',
                'Không đăng lại cùng một nội dung nhiều lần.': 'Do not repost the same content multiple times.',
                'Hủy': 'Cancel',
                'Đăng bài': 'Post',
                'THÔNG TIN CHI TIẾT': 'DETAILED INFORMATION',
                
                // Messages
                'Nhắn tin': 'Messages',
                'Tôi muốn mua sách': 'I want to buy a book',
                
                // Image and form fields
                'Chỉ hỗ trợ chèn hình ảnh.Tối đa 5 hình ảnh': 'Only supports image insertion. Maximum 5 images',
                'Thông tin sản phẩm': 'Product information',
                'Số lượng': 'Quantity',
                'Độ mới': 'Condition',
                
                // Alert messages
                'Chỉ hỗ trợ định dạng hình ảnh.': 'Only image formats are supported.',
                'Bạn chỉ có thể tải lên tối đa 5 hình ảnh.': 'You can only upload a maximum of 5 images.',
                'Một hoặc nhiều hình ảnh đã được chọn trước đó.': 'One or more images have been previously selected.',
                
                // Additional English translations
                'Hệ thống dịch thuật hoàn chỉnh Tiếng Việt ↔ English': 'Complete Vietnamese ↔ English Translation System',
                'Trạng thái': 'Status',
                'Hoạt động': 'Active',
                'Thông tin cá nhân': 'Personal Information',
                'Thống kê': 'Statistics',
                'Thông báo hệ thống': 'System Notifications',
                'Test Alert 1': 'Test Alert 1',
                'Test Alert 2': 'Test Alert 2',
                'Test Alert 3': 'Test Alert 3', 
                'Hệ thống dịch thuật hoàn tất': 'Translation System Complete',
                'Tất cả các thành phần đã được tích hợp và hoạt động chính xác': 'All components have been integrated and are working correctly',
                'Phạm vi dịch': 'Translation Coverage',
                
                // Search và Titles  
                'Tìm kiếm': 'Search',
                'Tìm kiếm...': 'Search...',
                'Tìm kiếm sách': 'Search books',
                
                // Account
                'Quản lý thông tin cá nhân của bạn': 'Manage your personal information',
                'Sản phẩm': 'Products',
                'Chi tiết tài khoản': 'Account details',
                'Tên người dùng': 'Username',
                'Quay lại': 'Back',
                
                // FAQ và Policy
                'FAQ - CÂU HỎI THƯỜNG GẶP': 'FAQ - FREQUENTLY ASKED QUESTIONS',
                'Chính sách bảo mật': 'Privacy Policy',
                
                // Page titles
                'Document': 'Website',
                'Đăng ký': 'Register',
                'Đăng nhập': 'Login',
                'Tìm kiếm': 'Search',
                'Thêm khách hàng': 'Add customer',
                
                // Demo page
                'Nhấp vào nút ngôn ngữ ở góc trên bên phải để chuyển đổi giữa Tiếng Việt và English': 'Click the language button in the top right corner to switch between Vietnamese and English',
                
                // Language button
                'Vietnamese': 'Vietnamese',
                'English': 'Tiếng Việt'
            }
        };

        this.init();
    }

    init() {
        this.createLanguageToggle();
        this.translate();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.translate());
        }
    }

    createLanguageToggle() {
        if (document.getElementById("language-toggle")) return;

        const langToggle = document.createElement("div");
        langToggle.id = "language-toggle";
        langToggle.innerHTML = `
            <button id="lang-btn" class="language-btn">
                <i class="fas fa-globe"></i>
                <span>${this.currentLanguage === "vi" ? "EN" : "VI"}</span>
            </button>
        `;

        const style = document.createElement("style");
        style.textContent = `
            #language-toggle {
                position: fixed;
                top: ${localStorage.getItem("lang-pos-top") || "unset"};
                bottom: ${localStorage.getItem("lang-pos-bottom") || "30px"};
                left: ${localStorage.getItem("lang-pos-left") || "unset"};
                right: ${localStorage.getItem("lang-pos-right") || "30px"};
                z-index: 9999;
                cursor: grab;
            }
            .language-btn {
                background: #007bff;
                color: #fff;
                padding: 10px 15px;
                border: none;
                border-radius: 20px;
                box-shadow: 0 3px 7px rgba(0,0,0,.2);
                font-weight: bold;
                display: flex;
                gap: 5px;
                align-items: center;
            }
        `;

        document.head.appendChild(style);

        const appendButton = () => {
            if (document.body) {
                document.body.appendChild(langToggle);
                document.getElementById("lang-btn").addEventListener("click", () => this.toggleLanguage());
                this.enableDrag(langToggle);
            } else {
                setTimeout(appendButton, 100);
            }
        };

        appendButton();
    }

    // 🟦 DRAG & DROP CHO NÚT NGÔN NGỮ (Với giới hạn màn hình)
    enableDrag(element) {
        let offsetX = 0, offsetY = 0, dragging = false;

        element.addEventListener("mousedown", e => {
            dragging = true;
            element.style.cursor = "grabbing";
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        });

        document.addEventListener("mousemove", e => {
            if (!dragging) return;
            
            // Tính toán vị trí mới
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            // Lấy kích thước element và viewport
            const elementRect = element.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const margin = 30; // Khoảng cách an toàn từ các cạnh
            
            // Giới hạn trong phạm vi màn hình với margin
            // Không cho phép ra ngoài biên trái
            if (newX < margin) {
                newX = margin;
            }
            // Không cho phép ra ngoài biên phải
            if (newX + elementRect.width > viewportWidth - margin) {
                newX = viewportWidth - elementRect.width - margin;
            }
            // Không cho phép ra ngoài biên trên
            if (newY < margin) {
                newY = margin;
            }
            // Không cho phép ra ngoài biên dưới
            if (newY + elementRect.height > viewportHeight - margin) {
                newY = viewportHeight - elementRect.height - margin;
            }

            element.style.left = newX + "px";
            element.style.top = newY + "px";
            element.style.right = "unset";
            element.style.bottom = "unset";
        });

        document.addEventListener("mouseup", () => {
            if (!dragging) return;
            dragging = false;
            element.style.cursor = "grab";

            localStorage.setItem("lang-pos-top", element.style.top);
            localStorage.setItem("lang-pos-bottom", "unset");
            localStorage.setItem("lang-pos-left", element.style.left);
            localStorage.setItem("lang-pos-right", "unset");
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === "vi" ? "en" : "vi";
        localStorage.setItem("language", this.currentLanguage);

        const btn = document.querySelector("#lang-btn span");
        if (btn) btn.textContent = this.currentLanguage === "vi" ? "EN" : "VI";

        this.translate();
    }

    translate() {
        const translations = this.translations[this.currentLanguage];

        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            if (translations[key]) {
                if (el.placeholder !== undefined) el.placeholder = translations[key];
                else el.textContent = translations[key];
            }
        });

        document.title = translations[document.title] || document.title;
        this.translateByTextContent(translations);
    }

    translateByTextContent(translations) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null
        );

        let node;
        while ((node = walker.nextNode())) {
            const text = node.nodeValue.trim();
            if (translations[text]) {
                node.nodeValue = node.nodeValue.replace(text, translations[text]);
            }
        }
    }
}

// Khởi tạo
const translator = new SimpleTranslator();
window.translator = translator;

