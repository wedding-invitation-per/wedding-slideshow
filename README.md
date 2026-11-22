# Wedding Slideshow

Source tĩnh (HTML/CSS/JS), không cần build, không dùng Cloudinary.

## Cấu trúc
- `images/` – bỏ ảnh JPG vào đây
- `music/`  – bỏ file nhạc mp3 vào đây
- `js/config.js` – khai báo tên file ảnh và nhạc

## Cách dùng
1. Chép ảnh vào `images/`, nhạc vào `music/`.
2. Sửa `js/config.js`, ví dụ `1: "anh1.jpg"`, `music.src: "nhac.mp3"`.
3. Chạy thử: `npx serve .` (phải chạy qua server, mở file trực tiếp có thể bị chặn nhạc/ảnh)
4. Deploy: `npm i -g vercel && vercel --prod` (Framework: Other, Output: `.`)

Trình duyệt chỉ cho phép phát nhạc sau khi người xem bấm, nên nhạc bắt đầu khi bấm "Bấm để bắt đầu".

## Cách hiển thị ảnh
Mặc định ảnh được hiện ĐỦ, canh giữa khung, không bị cắt; phần khung còn trống được lấp bằng chính ảnh đó làm mờ.
Muốn quay lại kiểu cũ (phủ kín khung, cắt ảnh, lấy nét theo `focusY`), thêm vào `js/config.js`: `fit: "cover"`.