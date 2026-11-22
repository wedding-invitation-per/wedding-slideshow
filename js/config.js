/* ====== CẤU HÌNH ======
 Ảnh : bỏ file vào thư mục images/ rồi khai báo tên file bên dưới (n = số trên nhãn "ẢNH n").
 Nhạc: bỏ mp3 vào thư mục music/ rồi liệt kê trong music.playlist. */
window.CONFIG = {
  imagesDir: "images/",
  musicDir: "music/",
  /* Điểm của ảnh (theo chiều cao, 0 = mép trên, 1 = mép dưới) được đặt vào TÂM khung.
     0.3125 = 2.5/4 của nửa trên ảnh (giữ mặt cô dâu chú rể). 0.5 = căn giữa như bình thường. */
  focusY: 0.3125,
  /* Ảnh trong chữ LOVE: lấy phần nào của ảnh theo chiều dọc. Số nhỏ = lấy phần trên (ảnh như dịch xuống, thấy mặt), 0.5 = giữa, lớn = lấy phần dưới. */
  loveFocusY: 0.25,
  focusExact: true,   // true = phóng thêm vừa đủ để điểm đó trùng hẳn tâm khung; false = chỉ lệch tới khi chạm mép ảnh (không phóng thêm)
  /* ---- NHẠC: danh sách phát. Muốn bỏ bài nào thì đặt // ở đầu dòng đó. ----
     Phát lần lượt từ trên xuống, hết bài cuối thì quay lại bài đầu.
     Bài lỗi/không tìm thấy sẽ tự bỏ qua. Mỗi dòng: tên file trong music/, đường dẫn, hoặc URL https:// */
  music: {
    playlist: [
  "ngay_hanh_phuc.mp3",
  "don_gian_anh_yeu_em.mp3",
  "ngoi_nha_hanh_phuc.mp3",
  "khi_hoan_chau_cach_cach.mp3",
  "noi_gio_len.mp3",
  "ngay_hanh_phuc_lofi.mp3",
  // "i_do.mp3",
  // "perfect.mp3",
  // "beautiful_in_white.mp3",
  // "my_love.mp3",
  // Các bài hát mới cập nhật (đã chuẩn hóa tên file theo format snake_case đồng nhất):
  "hon_ca_yeu.mp3",
  "chi_can_co_nhau.mp3",
  "xung_doi_cuoi_thoi.mp3",
  "ngay_dau_tien.mp3",
  "noi_nay_co_anh.mp3",
  "thuyen_hoa_remix.mp3",
  "yeu_em_hon_moi_ngay.mp3",
  "mot_doi.mp3",
  "cuoi_nhau_di_live.mp3",
  "ta_la_cua_nhau.mp3",
  "anh_nang_cua_anh_duc_phuc.mp3",
  "dam_cuoi_tren_duong_que.mp3",

  // Các bài đã comment (giữ nguyên không bật):
  // "everytime_we_touch.mp3",
  // "a_little_love.mp3",
  // "anh_nang_cua_anh.mp3",
  // "cuoi_nhau_di.mp3",
  // "duong_quyen_tinh_yeu.mp3",
  // "may_hong_dua_loi.mp3",
  // "minh_yeu_nhau_di.mp3",
  // "sugar.mp3",
  // "tinh_yeu_mau_hong_lofi.mp3",
  // "until_you.mp3",
  // "vo_tuyet_voi_nhat.mp3",
  // "what_makes_you_beautiful.mp3",
  // "yeu_anh_cu_de_em.mp3"
    ],
    volume: 0.6,
    shuffle: true,    // true = phát ngẫu nhiên theo lượt (hết cả danh sách mới lặp lại bài); false = phát theo thứ tự
    start: 0          // giây bắt đầu của bài đầu tiên
  },
  /* ---- ẢNH: tên file trong images/ (dùng // để tạm bỏ ảnh, ô đó sẽ là phông xanh) ---- */
  images: {
    love: "AC_09.jpg",      // chữ LOVE (slide 2)
    1: "AC_07.jpg",         // slide 3 (ba ảnh trên, có số ngày)
    2: "AC_09.jpg",
    3: "AC_08.jpg",
    4: "AC_01_no_background.png",         // thẻ trắng
    7: "AC_03.jpg",         // slide 5 (ba ảnh)
    8: "AC_02.jpg",
    9: "AC_04.jpg",
    10: "AC_08.jpg",        // slide 6: trái
    "10b": "AC_10.jpg",     //          phải
    11: "AC_09.jpg",        //          giữa
    12: "AC_02.jpg",        // slide 7 (ba ảnh)
    13: "AC_01.jpg",
    14: "AC_03.jpg",
    15: "AC_07.jpg",        // slide 8 (ba ô cong)
    16: "AC_05.jpg",
    17: "AC_06.jpg",
    18: "AC_01_no_background.png",        // slide 9: cặp đôi bên phải
    19: "AC_08.jpg",
    20: "AC_10.jpg",
    22: "AC_05.jpg",        // slide 10: MỘT ảnh phủ cả cụm bên phải
    25: "AC_02.jpg",        // slide 11 (cảm ơn)
    26: "AC_03.jpg",
    27: "AC_04.jpg",
    28: "AC_07.jpg",        // slide 12 (bốn ảnh dọc)
    29: "AC_08.jpg",
    30: "AC_09.jpg",
    31: "AC_10.jpg",
    32: "AC_05.jpg",        // slide 13 (hai nửa tròn)
    33: "AC_05.jpg",
    34: "AC_09.jpg"         // slide 14 (kết)
  }
};