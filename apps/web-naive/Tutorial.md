### 📁 **Cấu trúc thư mục `web-naive`**

| 📦 Thư mục / File         | 📌 Ý nghĩa chính                                                   |
| ------------------------- | ------------------------------------------------------------------ |
| **`node_modules`**        | Chứa các thư viện cài đặt từ `package.json`                        |
| **`public`**              | Các file tĩnh như favicon, ảnh, index.html gốc (nếu cần chỉnh sửa) |
| **`src/`**                | **Toàn bộ code** ứng dụng Vue 3 / Naive UI                         |
| ├── **adapter/**          | (có thể là các hàm/thư viện giúp “chuyển đổi dữ liệu”)             |
| ├── **api/**              | Khai báo **API endpoint** (dùng axios hoặc fetch)                  |
| ├── **layouts/**          | Layout chính (kiểu: `BasicLayout`, `AuthLayout`, …)                |
| ├── **locales/**          | Cấu hình **đa ngôn ngữ (i18n)** nếu app hỗ trợ nhiều ngôn ngữ      |
| ├── **router/**           | Cấu hình **điều hướng** (vue-router)                               |
| ├── **store/**            | Quản lý **state toàn cục** (Pinia store hoặc Vuex)                 |
| ├── **views/**            | Các **page chính** (Dashboard, User, Settings, …)                  |
| ├── **app.vue**           | File gốc (root) của Vue App                                        |
| ├── **bootstrap.ts**      | Khởi tạo / thiết lập ban đầu của app (nếu có)                      |
| ├── **main.ts**           | File **entry point** (nơi `createApp` khởi tạo Vue)                |
| ├── **preferences.ts**    | Có thể là nơi lưu / config tùy chỉnh (theme, user setting, …)      |
| **`.env`**                | File môi trường (API URL, base URL, …)                             |
| **`index.html`**          | HTML gốc của app                                                   |
| **`package.json`**        | Thông tin dự án, scripts build/dev                                 |
| **`tailwind.config.mjs`** | Cấu hình Tailwind CSS (dùng cho style)                             |
| **`tsconfig.json`**       | Cấu hình TypeScript                                                |
| **`vite.config.mts`**     | Cấu hình Vite (build, alias, plugins, …)                           |

---

### 🚀 **Luồng hoạt động cơ bản của `web-naive`**

1️⃣ **Khởi động app**
👉 Chạy `pnpm install` hoặc `yarn install` (cài lib)
👉 Chạy `pnpm dev` hoặc `yarn dev` (chạy app)

2️⃣ **Entry Point (`main.ts`)**

* File `main.ts` tạo Vue App bằng `createApp(App)`, gắn thêm:
  ✅ **Pinia store** (state toàn cục)
  ✅ **Router** (vue-router)
  ✅ **I18n** (nếu có)
  ✅ **Naive UI** (UI kit)
  ✅ **Global style** (Tailwind CSS, SCSS, …)

3️⃣ **Giao diện hiển thị (`app.vue` + `layouts/` + `views/`)**

* `app.vue`: điểm bắt đầu (có `router-view` để hiển thị page)
* `layouts/`: bố cục chính của app (header, sidebar, content)
* `views/`: các trang thực tế (Dashboard, User, v.v.)

4️⃣ **Dữ liệu (API)**

* Gọi API qua **`api/`**
* Nếu muốn chia sẻ data → lưu vào **`store/`**
* Component (`views/` hoặc `components/`) sẽ **lấy data** từ API / store rồi hiển thị lên UI.

---

### 🌟 **Bắt đầu phát triển hoặc custom**

✅ Muốn thêm page → Thêm file mới trong `views/`, khai báo trong `router/`.
✅ Muốn đổi màu / theme → Chỉnh trong `preferences.ts` hoặc `tailwind.config.mjs`.
✅ Muốn gọi API mới → Tạo hàm trong `api/`, import vào `views/`.
