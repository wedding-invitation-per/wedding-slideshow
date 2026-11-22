/* ====== CẤU HÌNH ======
 music.src      : link nhạc (mp3 trực tiếp, hoặc link Cloudinary video/raw)
 cloudinary     : cloudName + folder (tuỳ chọn) + transform
 images[n]      : n = số trên nhãn "ẢNH n". Giá trị là public_id Cloudinary (vd "anh1")
                  hoặc URL đầy đủ. Để trống = phông xanh. */
window.CONFIG = {
  music: { src: "", volume: 0.6, loop: true },
  cloudinary: { cloudName: "", folder: "", transform: "f_auto,q_auto,w_1600" },
  images: {
    // 1: "anh1", 2: "anh2", 3: "anh3", ... tối đa 34
  }
};
