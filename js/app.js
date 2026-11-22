const CFG=window.CONFIG||{};
const IMAGES=new Proxy({},{get:(_,n)=>resolveImg(CFG.images&&CFG.images[n])});
/* v = tên file (vd "anh1.jpg" -> images/anh1.jpg) hoặc đường dẫn/URL đầy đủ */
function resolveImg(v){if(!v)return '';v=String(v).replace(/\\/g,'/');if(/^(https?:)?\/\//.test(v)||v.includes('/'))return v;return (CFG.imagesDir||'images/')+v}
/* Đặt ảnh vào khung.
   Mặc định (CFG.fit !== 'cover'): HIỆN ĐỦ ẢNH, canh giữa khung, không cắt. Phần khung còn trống được lấp bằng chính ảnh đó làm mờ.
   Nếu muốn quay lại kiểu cũ (phủ kín khung, cắt ảnh, lấy nét theo FOCUS_Y): trong config.js đặt fit:"cover". */
const FOCUS_Y=CFG.focusY??0.3125;
function fitImg(img){const box=img.parentElement;if(!box||box.classList.contains('cc'))return;  /* .cc = phủ kín khung, canh giữa (CSS lo) */
 const bw=parseFloat(box.style.width),bh=parseFloat(box.style.height),nw=img.naturalWidth,nh=img.naturalHeight;if(!(bw&&bh&&nw&&nh))return;
 if(CFG.fit==='cover'){
  if(box.classList.contains('pop-out'))return;
  let k=Math.max(bw/nw,bh/nh);
  if(CFG.focusExact!==false){const need=bh/(2*Math.min(FOCUS_Y,1-FOCUS_Y));k=Math.max(k,need/nh)}
  const W=nw*k,H=nh*k;
  let top=bh/2-FOCUS_Y*H;top=Math.min(0,Math.max(bh-H,top));
  Object.assign(img.style,{inset:'auto',left:(bw-W)/2+'px',top:top+'px',width:W+'px',height:H+'px',objectFit:'fill'});return}
 /* contain: scale nhỏ nhất để vừa cả chiều rộng lẫn chiều cao khung */
 const k=Math.min(bw/nw,bh/nh),W=nw*k,H=nh*k,nb=box.classList.contains('nb');
 if(!nb&&!box.querySelector('.phbg')){const b=new Image();b.className='phbg';b.alt='';b.src=img.src;box.insertBefore(b,img)}   /* .nb = ảnh cắt nền: không làm nền mờ */
 Object.assign(img.style,{inset:'auto',left:(bw-W)/2+'px',top:(nb?bh-H:(bh-H)/2)+'px',width:W+'px',height:H+'px',objectFit:'fill'})}
const P=(n,s,c='',inner='')=>{const [cls,...ex]=c.split('" style="');const extra=ex.join(';').replace(/"$/,'');
 return `<div class="ph ${cls}" style="${s};${extra}">${IMAGES[n]?`<img src="${IMAGES[n]}" onload="fitImg(this)">`:'ẢNH '+n}${inner}</div>`};
/* hiệu ứng nhanh: A(class,delay,style,html) */
const A=(c,d,s,h='')=>`<div class="abs ${c}" style="--d:${d}s;${s}">${h}</div>`;
const T=(txt,cls,s,d=0,speed=45)=>`<div class="t ${cls}" data-type="${txt}" data-d="${d}" data-s="${speed}" style="${s}"></div>`;
const TX=(txt,cls,x,y,w,fs,d,ex='')=>`<div class="t ${cls} a-fade" style="--d:${d}s;left:${x}px;top:${y}px;width:${w}px;font-size:${fs}px;${ex}">${txt}</div>`;
const deco=(s)=>`<div class="abs a-fade" style="--d:.6s;${s};border:2px solid #d9c6a8;border-radius:60% 0 60% 0;opacity:.55"></div>`;
const HH=(s,d=0)=>A('a-pop',d,s+';border-radius:50%;background:radial-gradient(#f5d9a0,#c0392b);display:flex;align-items:center;justify-content:center;font:400 90px serif;color:#fff','囍');

/* ===== HỌA TIẾT (SVG nét mảnh, bám theo video) ===== */
const pet=r=>`M0 0C${-r*.55} ${-r*.3} ${-r*.5} ${-r*.95} 0 ${-r}C${r*.5} ${-r*.95} ${r*.55} ${-r*.3} 0 0Z`;
const flw=(x,y,r,rot,n,col)=>`<g transform="translate(${x} ${y}) rotate(${rot})">`+Array.from({length:n},(_,i)=>`<path d="${pet(r)}" transform="rotate(${i*360/n+(i%2?9:0)}) scale(${i%2?.86:1})"/>`).join('')+`<path d="M0 0v${-r*.35}M${-r*.1} 0l${-r*.06} ${-r*.3}M${r*.1} 0l${r*.06} ${-r*.3}" stroke="${col}"/></g>`;
const lf=(x,y,l,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0C${l*.25} ${-l*.2} ${l*.7} ${-l*.2} ${l} 0C${l*.7} ${l*.2} ${l*.25} ${l*.2} 0 0Z"/><path d="M0 0L${l*.85} 0" stroke-width=".8"/></g>`;
const SV=(vb,inner,stroke,w,fill='none')=>`<svg viewBox="${vb}" width="100%" height="100%" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" style="overflow:visible">${inner}</svg>`;
/* cành mộc lan vàng (góc trên) */
const MAG=`<path d="M300 10C262 50 250 100 215 150S140 230 118 330S100 390 96 400"/><path d="M205 160C190 140 178 128 168 118"/><path d="M150 262C130 262 112 256 100 252"/><path d="M262 52C250 32 242 18 234 4"/>`+
 flw(150,108,58,-25,6,'#b89358')+flw(92,248,50,18,5,'#b89358')+
 lf(248,44,40,-110)+lf(228,120,42,25)+lf(196,172,46,205)+lf(132,300,44,160)+lf(112,350,40,35)+lf(60,330,38,215)+lf(40,226,36,200);
const FL=(s,d=.5,flip=0)=>`<div class="abs a-wipeR" style="--d:${d}s;--du:1.5s;${s}${flip?';transform:scaleX(-1)':''}">${SV('0 0 300 400',MAG,'#b89358',1.5)}</div>`;
/* hoa 5 cánh viền hồng (slide 8) */
const PFW=`<g>`+[0,1,2,3,4].map(i=>`<ellipse cx="0" cy="-21" rx="17" ry="22" transform="rotate(${i*72})" fill="#fff"/>`).join('')+`<circle r="6" fill="#f3d7d2"/></g>`;
const PF=(x,y,w,d,rot=0)=>`<div class="abs a-pop" style="--d:${d}s;left:${x}px;top:${y}px;width:${w}px;height:${w}px;transform:rotate(${rot}deg)">${SV('-45 -45 90 90',PFW,'#c8a29b',1.3)}</div>`;
/* cành lá nâu hồng (slide 8, 10) */
const PSP=`<path d="M14 250C50 190 90 110 150 6"/>`+[[40,205,70,-70],[56,172,64,-20],[76,140,62,-75],[92,112,56,-15],[110,82,50,-72],[124,52,42,-20],[30,222,60,-10]].map(a=>lf(...a)).join('');
const PS=(s,d=.4,flip=0)=>`<div class="abs a-wipeR" style="--d:${d}s;--du:1.3s;${s}${flip?';transform:scaleX(-1)':''}">${SV('0 0 200 260',PSP,'#b5857e',1.2)}</div>`;
/* cành lá vàng nhỏ (slide 11, 14, 16) */
const GSP=`<path d="M70 262C64 200 76 130 60 14"/>`+[[68,230,44,-40],[68,200,46,215],[72,168,44,-35],[70,134,44,220],[64,100,40,-40],[60,66,38,218],[58,36,30,-45]].map(a=>lf(...a)).join('');
const GS=(s,d=.6)=>`<div class="abs a-wipeR" style="--d:${d}s;--du:1.2s;${s}">${SV('0 0 140 270',GSP,'#b89358',1.3)}</div>`;
const WASH=()=>'';

const LOGO=(st)=>`<div class="abs a-pop" style="--d:1.4s;${st}"><div style="position:absolute;left:55px;top:0;width:195px;height:195px;border-radius:50%;background:#d9573a;display:flex;align-items:center;justify-content:center;font:400 128px/1 serif;color:#fbe9d0">囍</div>
<svg viewBox="0 0 120 170" style="position:absolute;left:-5px;top:30px;width:150px;height:212px"><g fill="#2f2f33"><circle cx="28" cy="26" r="11"/><path d="M16 40h24l4 74h-32z"/><rect x="18" y="112" width="8" height="40"/><rect x="32" y="112" width="8" height="40"/></g><circle cx="28" cy="24" r="9" fill="#f1d3bd"/><path d="M19 22a9 9 0 0 1 18 0c-4-5-14-5-18 0z" fill="#2f2f33"/><g><circle cx="76" cy="30" r="10" fill="#f1d3bd"/><path d="M64 24a12 12 0 0 1 24 0v20H64z" fill="#fff" opacity=".85"/><path d="M68 42h16l12 108H56z" fill="#f6c9c4"/><circle cx="52" cy="70" r="9" fill="#e98fa0"/></g></svg></div>`;
const S=[
/* 1. Nền đỏ + logo 囍; sau ~1.2s tách đôi: nửa trái (mang theo logo) trượt trái, nửa phải trượt phải */
{t:1.3,bg:'transparent',h:`<div class="abs hl" style="left:0;top:0;width:800px;height:900px;background:radial-gradient(circle at 50% 100%,transparent 0 17px,rgba(0,0,0,.16) 18px 20px,transparent 21px) 0 0/40px 20px,radial-gradient(circle at 0 100%,transparent 0 17px,rgba(0,0,0,.16) 18px 20px,transparent 21px) 20px 10px/40px 20px,#a01323;z-index:2"><div class="logo">囍</div></div><div class="abs hr" style="left:800px;top:0;width:800px;height:900px;background:radial-gradient(circle at 50% 100%,transparent 0 17px,rgba(0,0,0,.16) 18px 20px,transparent 21px) 0 0/40px 20px,radial-gradient(circle at 0 100%,transparent 0 17px,rgba(0,0,0,.16) 18px 20px,transparent 21px) 20px 10px/40px 20px,#a01323;z-index:1"></div>`},
/* 2. LOVE: ảnh cắt theo chữ (SVG, ép đúng bề rộng 1295px), chữ slab đậm */
{t:6,tr:'split',bg:'linear-gradient(#f3e9e0 46%,#fbf5f0 46%)',h:
 `<svg class="abs" style="left:0;top:0" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#2563eb"/></linearGradient><clipPath id="lv"><text x="105" y="583" font-size="570" textLength="325" lengthAdjust="spacingAndGlyphs" font-family="'Noto Serif',serif" font-weight="900">L</text><text x="460" y="583" font-size="570" textLength="325" lengthAdjust="spacingAndGlyphs" font-family="'Noto Serif',serif" font-weight="900">O</text><text x="815" y="583" font-size="570" textLength="325" lengthAdjust="spacingAndGlyphs" font-family="'Noto Serif',serif" font-weight="900">V</text><text x="1170" y="583" font-size="570" textLength="325" lengthAdjust="spacingAndGlyphs" font-family="'Noto Serif',serif" font-weight="900">E</text></clipPath></defs><g clip-path="url(#lv)"><g class="kb" style="transform-box:fill-box;transform-origin:center;--kb:6s">${IMAGES.love?`<image href="${IMAGES.love}" x="100" y="150" width="1400" height="500" preserveAspectRatio="xMidYMid slice"/>`:`<rect x="100" y="150" width="1400" height="500" fill="url(#bl)"/><text x="800" y="400" font-size="40" fill="#fff" text-anchor="middle" font-family="system-ui">ẢNH love</text>`}</g></g></svg>`+
 T('Tình yêu là thử thách của thời gian, không phải kết hôn<br>mới là đích đến,mà là sự trọn vẹn sau hai chữ “Hôn nhân” hạnh phúc','script','left:100px;width:1400px;top:635px;font-size:38px;line-height:1.55',1.2,35)},
/* 3. 13 12 26 – đẩy lên từ dưới; 3 ảnh trồi lên + zoom nhẹ, số viền trắng nảy lên sát cạnh phải ảnh, lấp lánh
   (khung ảnh cao hơn: 560 -> 610) */
{t:5.6,tr:'up',h:P(1,'left:50px;top:15px;width:495px;height:610px;border-radius:14px 0 0 0','cc a-grow" style="--d:.1s;--du:1.8s')+P(2,'left:555px;top:15px;width:495px;height:610px','cc a-grow" style="--d:.3s;--du:1.8s')+P(3,'left:1060px;top:15px;width:490px;height:610px;border-radius:0 14px 0 0','cc a-grow" style="--d:.5s;--du:1.8s')+
 ['13','12','26'].map((n,i)=>`<div class="abs dnum num" style="--d:${[.7,1.15,1.6][i]}s;left:${[313,818,1318][i]}px;top:398px"><span>${n}</span></div>`).join('')+
 [[528,375,1.5],[1033,375,1.9],[1533,375,2.3],[420,495,2.1],[925,480,2.5],[1425,495,2.8]].map(([x,y,d])=>`<div class="sp" style="--d:${d}s;left:${x}px;top:${y}px">✦</div>`).join('')+
 `<div class="ln" style="--d:1.2s;left:340px;top:668px;width:170px;transform-origin:right"></div><div class="ln" style="--d:1.2s;left:1090px;top:668px;width:170px;transform-origin:left"></div>`+
 T('WELCOME TO OUR WEDDING','serif','left:0;width:1600px;top:652px;font-size:30px;letter-spacing:6px;font-weight:700;color:#333',1.2,30)+
 `<div class="t names a-up" style="--d:1.7s;left:0;width:1600px;top:712px;font-size:96px;font-family:'Noto Serif',serif;font-weight:700">VŨ MẠNH &amp; NGỌC ÁNH</div>`},
/* 4. Thẻ trắng: cả khối đẩy lên từ dưới (92.3–92.7s). Nền đỏ là lớp riêng, ảnh cắt nền nhô ra khỏi nền đỏ */
{t:3.6,tr:'up',bg:'#f4f2f0',h:
 '<div class="abs" style="left:120px;top:100px;width:1420px;height:640px;background:#fff;box-shadow:0 18px 30px #0003"></div>'+
 '<div class="abs" style="left:208px;top:128px;width:1252px;height:472px;background:#6b1010"></div>'+
 '<div class="abs" style="left:400px;top:0;width:760px;height:740px;overflow:hidden">'+P(4,'left:-25px;top:12px;width:810px;height:946px','pop-out nb rise-drift')+'</div>'+
 '<div class="abs" style="left:120px;top:600px;width:1420px;height:140px;background:#fff"></div>'+
 TX('NGỌC ÁNH &amp; VŨ MẠNH','serif',0,625,1600,52,0,'letter-spacing:2px;font-weight:700')+
 TX('1999 - 2000','serif',0,785,1600,44,0,'letter-spacing:6px;color:#c9a58d')+
 '<div class="abs" style="left:310px;top:824px;width:160px;height:2px;background:#444"></div><div class="abs" style="left:1110px;top:824px;width:160px;height:2px;background:#444"></div>'},
/* 7. 3 ảnh, fade lần lượt (khung cao hơn: 470 -> 570) */
{t:5.5,h:P(7,'left:200px;top:100px;width:380px;height:570px','a-grow" style="--du:1.6s')+P(8,'left:610px;top:100px;width:380px;height:570px','a-grow" style="--d:.45s;--du:1.6s')+P(9,'left:1020px;top:100px;width:380px;height:570px','a-grow" style="--d:.9s;--du:1.6s')+
 T('Gửi hàng triệu lời cảm ơn và tất cả yêu thương từ sâu thẳm trái tim.<br>Chúng con cảm ơn Bố Mẹ hai bên đã chấp thuận và cưu đẹp.','script','left:150px;width:1300px;top:700px;font-size:34px',1.4,30)},
/* 9. Ba ảnh đều nhau (rộng 506, cách 14, lề 27); khung cao hơn: 440 -> 570, giữa 610 -> 620 */
{t:6.5,h:
 PF(40,40,80,.5,-8)+FL('left:1290px;top:-20px;width:300px;height:400px',.5)+
 T('Và ngày hôm nay, là ngày quan trọng nhất<br>của cuộc đời vợ chồng chúng con.','script','left:135px;width:1200px;top:105px;font-size:36px;line-height:1.7',.4,45)+
 P(12,'left:27px;top:300px;width:506px;height:570px','cc a-left')+P(13,'left:547px;top:270px;width:506px;height:620px','cc a-up" style="--d:.3s')+P(14,'left:1067px;top:300px;width:506px;height:570px','cc a-right')},
/* 10. Ba ô ảnh cong: cả cụm trượt đồng loạt từ trái sang phải (127.3–137s) */
{t:9,bg:'#fbf5f0',h:
 WASH('left:-80px;top:560px;width:620px;height:420px',.4)+WASH('left:1200px;top:-80px;width:500px;height:300px',.4)+PS('left:30px;top:0;width:210px;height:90px;overflow:hidden',.5)+
 '<div class="abs a-slideLR" style="inset:0;--du:1.2s"><div class="abs drift" style="inset:0">'+
 P(15,'left:-60px;top:20px;width:560px;height:650px;clip-path:polygon(0 20px,560px 50px,560px 610px,0 640px)')+
 P(16,'left:520px;top:20px;width:500px;height:650px;clip-path:polygon(0 65px,250px 80px,500px 65px,500px 570px,250px 560px,0 570px)')+
 P(17,'left:1040px;top:20px;width:520px;height:650px;clip-path:polygon(0 65px,520px 0,520px 650px,0 610px)')+'</div></div>'+
 T('Chúng con thật vui và hạnh phúc khi<br>được thấy mọi người ở đây.','script','left:420px;width:800px;top:675px;font-size:44px;line-height:1.3',1.4,50)},
/* 11. Nền đỏ bên phải + cặp đôi bước ra, 2 ảnh so le bên trái (137–141.3s) */
{t:4.3,h:FL('left:730px;top:-30px;width:270px;height:360px',.8)+GS('left:95px;top:600px;width:170px;height:270px',1.2)+
 A('a-fade',.1,'left:440px;top:70px;width:360px;height:405px;background:#f3e9e0')+
 A('a-fade',.1,'left:50px;top:525px;width:340px;height:365px;background:#f3e9e0')+
 P(19,'left:90px;top:70px;width:335px;height:420px','cc a-left')+P(20,'left:425px;top:490px;width:350px;height:380px','cc a-up" style="--d:.3s')+
 TX('Cùng chung vui<br>và chứng kiến giây<br>phút hạnh phúc này.','script',455,215,380,36,.9,'text-align:left;line-height:1.7')+
 A('a-right',0,'left:1065px;top:0;width:535px;height:900px;background:#6b1010;--du:.7s')+
 '<div class="abs float" style="inset:0">'+P(18,'left:1070px;top:60px;width:600px;height:840px','cc pop-out" style="--d:.5s;--du:.9s')+'</div>'},
/* 12. Lời chúc phúc: cặp đôi (ảnh 21) trượt từ phải, z cao hơn ảnh 22–24 (141.5–148s) */
{t:7.5,h:WASH('left:760px;top:-110px;width:520px;height:260px',.6)+FL('left:0;top:-10px;width:310px;height:400px',.9,1)+
 P(22,'left:840px;top:60px;width:710px;height:800px;z-index:1','cc a-grow" style="--d:1.1s;--du:1.2s')+
 T('LỜI CHÚC PHÚC','serif','left:175px;width:625px;top:235px;font-size:40px;letter-spacing:3px;color:#c9a27f;z-index:2',1,200)+
 T('của mọi người là niềm tin<br>để chúng con bước tiếp<br>trên con đường phía trước<br>của cả hai.','script','left:175px;width:625px;top:310px;font-size:36px;line-height:1.55;z-index:2',2.6,55)+
 A('a-fade',3.2,'left:287px;top:644px;width:150px;height:2px;background:#555')+A('a-fade',3.2,'left:537px;top:644px;width:150px;height:2px;background:#555')+A('a-pop',3.3,'left:472px;top:631px;width:30px;height:27px;z-index:2','<svg viewBox="0 0 24 22" width="30" height="27"><path d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z" fill="#333"/></svg>')},
/* 13. Cảm ơn: 3 ảnh + chữ (2 ảnh nhỏ cao hơn: 450 -> 480) */
{t:6.5,h:`<div class="abs blip" style="--d:0s;left:1150px;top:600px;width:150px;height:250px">${SV('0 0 140 270',GSP,'#b89358',1.3)}</div>`+FL('left:1400px;top:-20px;width:230px;height:307px',1.1)+P(25,'left:60px;top:40px;width:640px;height:830px','cc a-left" style="--d:.8s')+P(26,'left:720px;top:50px;width:310px;height:480px','cc a-down" style="--d:1s')+P(27,'left:1050px;top:50px;width:310px;height:480px','cc a-down" style="--d:1.2s')+
 `<div class="t serif a-up" style="--d:1.5s;left:720px;width:700px;top:560px;font-size:44px;color:#d49a7a">CHÚNG CON XIN CẢM ƠN</div>`+
 T('tất cả mọi người đã sắp xếp công việc<br>và thời gian không ngại xa xôi<br>để tới đây.','script','left:720px;width:700px;top:640px;font-size:34px',2,40)},
/* 14. 4 ảnh dọc (khung cao hơn: 650 -> 760) */
{t:6,h:FL('left:1400px;top:-30px;width:210px;height:280px',.8)+GS('left:10px;top:650px;width:120px;height:240px',1)+T('Hơn bao giờ hết chúng con muốn nói lời cảm ơn thật nhiều.','script','left:0;width:1600px;top:40px;font-size:38px',0,40)+
 P(28,'left:100px;top:110px;width:360px;height:760px','cc a-up')+P(29,'left:480px;top:110px;width:360px;height:760px','cc a-up" style="--d:.2s')+P(30,'left:860px;top:110px;width:360px;height:760px','cc a-up" style="--d:.4s')+P(31,'left:1240px;top:110px;width:260px;height:760px','cc a-up" style="--d:.6s')},
/* 15. Hai nửa hình tròn BẰNG NHAU (r=332): nửa trái cao hơn, nửa phải thấp hơn, hở 76px, tròn be nhỏ ở giữa.
   Đo từ video: đứng yên khi mở cảnh rồi trôi chậm (không bay nhanh). Mở cảnh bằng dải màu quét phải→trái (165.5–174.4s) */
{t:8.8,keep:1100,bg:'transparent',h:
 `<div class="abs a-fade" style="--d:.55s;--du:.4s;inset:0;background:#fbf5f0"></div>`+
 A('a-fade',.6,'left:340px;top:250px;width:300px;height:300px;border-radius:50%;background:#ecd9cc;--du:.4s')+
 P(32,'left:80px;top:60px;width:332px;height:664px;border-radius:332px 0 0 332px','halfL a-fade" style="--d:.55s;--du:.4s')+
 P(33,'left:488px;top:160px;width:332px;height:664px;border-radius:0 332px 332px 0','halfR a-fade" style="--d:.55s;--du:.4s')+
 T('Mãi mãi bắt đầu từ hôm<br>nay, chúng con sẽ luôn<br>luôn hạnh phúc.','script','left:850px;width:690px;top:305px;font-size:60px;line-height:1.7;font-weight:600',.8,55)+
 '<div class="abs bars" style="left:1600px;top:0;width:1880px;height:900px;z-index:9;display:flex"><i style="width:380px;background:#6b1010"></i><i style="width:300px;background:#8e1a24"></i><i style="width:200px;background:#b5775f"></i><i style="flex:1;background:#d4a08a"></i></div>'},
/* 16. Kết: đẩy xuống từ trên; chữ LOVE từng chữ rơi xuống xếp dọc; họa tiết nhỏ dưới dòng cảm ơn */
{t:5,tr:'down',h:P(34,'left:0;top:0;width:600px;height:900px')+
 [['E',730,.15],['V',560,.4],['O',390,.65],['L',224,.9]].map(([c,y,d])=>`<div class="abs a-letter" style="--d:${d}s;left:600px;top:${y-110}px;width:100px;height:220px"><svg viewBox="0 0 100 220" width="100" height="220"><text x="50" y="178" text-anchor="middle" font-size="175" textLength="68" lengthAdjust="spacingAndGlyphs" fill="#7a1414" font-family="'Noto Serif',serif" font-weight="900">${c}</text></svg></div>`).join('')+
 FL('left:1370px;top:-20px;width:210px;height:280px',1)+GS('left:1400px;top:440px;width:110px;height:200px',.9)+
 TX('CHÚNG CON XIN<br>CẢM ƠN Ạ!!!','serif',800,311,620,66,.6,'line-height:1.6;font-weight:700')+
 A('a-fade',1.4,'left:830px;top:565px;width:600px;height:66px','<svg viewBox="0 0 400 44" width="600" height="66"><path d="M0 28C20 28 25 12 40 18C52 23 45 34 36 28C30 22 55 8 80 24S120 38 150 24S190 10 210 22S240 36 262 26C276 20 285 12 296 20C305 27 296 36 289 30C283 24 305 10 330 22S370 34 400 26" fill="none" stroke="#3a3a3a" stroke-width="2.4" stroke-linecap="round"/></svg>')}
];

const st=document.getElementById('st'),box=document.getElementById('box');
S.forEach((s,i)=>{const d=document.createElement('div');d.className='sc';d.style.background=s.bg||'';d.innerHTML=s.h;st.appendChild(d);s.el=d;s.base=d.style.cssText});
/* ảnh trong chữ LOVE: vẫn phủ kín chữ, chỉ chọn lấy phần nào của ảnh theo chiều dọc (CFG.loveFocusY: 0 = mép trên, 0.5 = giữa, 1 = mép dưới; nhỏ = ảnh như dịch xuống, thấy mặt) */
{const li=st.querySelector('g[clip-path="url(#lv)"] image');
 if(li){const fy=Math.min(1,Math.max(0,CFG.loveFocusY??0.25)),pr=new Image();
  pr.onload=()=>{const BW=1400,BH=500,k=Math.max(BW/pr.naturalWidth,BH/pr.naturalHeight),w=pr.naturalWidth*k,h=pr.naturalHeight*k;
   li.setAttribute('preserveAspectRatio','none');li.setAttribute('width',w);li.setAttribute('height',h);
   li.setAttribute('x',100-(w-BW)/2);li.setAttribute('y',150-(h-BH)*fy)};
  pr.src=li.getAttribute('href')}}
function fit(){st.style.transform=`scale(${box.clientWidth/1600})`}addEventListener('resize',fit);fit();
let cur=-1,timer=null,playing=true,tyTimers=[];
function typeIn(el,off=0){tyTimers.forEach(clearTimeout);tyTimers=[];
 el.querySelectorAll('[data-type]').forEach(n=>{const full=n.dataset.type,sp=+n.dataset.s,d=+n.dataset.d*1000+off;n.innerHTML='';
  let k=0;const parts=full.split(/(<br>)/);const chars=[];parts.forEach(p=>p==='<br>'?chars.push('<br>'):[...p].forEach(c=>chars.push(c)));
  tyTimers.push(setTimeout(function step(){if(k<=chars.length){n.innerHTML=chars.slice(0,k).join('')+(k<chars.length?'<span style="opacity:0">'+chars.slice(k).join('')+'</span>':'');k++;tyTimers.push(setTimeout(step,sp))}},d))})}
function clean(p,ms){setTimeout(()=>{if(S[cur].el!==p){const o=S.find(x=>x.el===p);p.className='sc';p.style.cssText=o.base}},ms)}
function go(i){clearTimeout(timer);const prev=cur>=0?S[cur].el:null;cur=(i+S.length)%S.length;const sc=S[cur],e=sc.el;
 S.forEach(x=>{if(x.el!==e&&x.el!==prev){x.el.className='sc';x.el.style.cssText=x.base}});
 e.className='sc';e.style.cssText=sc.base;void e.offsetWidth;e.className='sc on';e.style.zIndex=2;
 const dis=prev&&prev!==e&&!(sc.tr||sc.keep);if(dis)e.style.setProperty('--off','.45s');
 if(prev&&prev!==e){prev.style.zIndex=1;const TR='transform .7s cubic-bezier(.65,0,.35,1)';prev.classList.remove('out');
  if(sc.tr==='up'||sc.tr==='down'){const d=sc.tr==='up'?1:-1;e.style.transition='none';e.style.transform=`translateY(${100*d}%)`;void e.offsetWidth;e.style.transition=TR;prev.style.transition=TR;e.style.transform='none';prev.style.transform=`translateY(${-100*d}%)`;clean(prev,800)}
  else if(sc.tr==='split'){prev.style.zIndex=3;prev.classList.add('split');clean(prev,1300)}
  else if(sc.keep){clean(prev,sc.keep)}
  else{prev.style.zIndex=3;prev.classList.add('out');clean(prev,720)}}
 typeIn(e,dis?450:0);
 /* giữ thêm HOLD giây sau khi slide diễn xong rồi mới chuyển (đổi trong config.js: hold: 3) */
 if(playing)timer=setTimeout(()=>go(cur+1),(sc.t+(CFG.hold??3))*1000)}
const au=document.getElementById('au');
/* ===== NHẠC: playlist (comment dòng nào thì bài đó không phát) ===== */
const M=CFG.music||{};
const musicUrl=v=>{v=String(v).replace(/\\/g,'/');return(/^(https?:)?\/\//.test(v)||v.includes('/'))?v:(CFG.musicDir||'music/')+v};
const LIST=(Array.isArray(M.playlist)&&M.playlist.length?M.playlist:(M.src?[M.src]:[])).map(musicUrl);
let mi=-1,bad=0,queue=[];
/* random theo lượt: xáo trộn cả danh sách, phát hết mới xáo lại (bài đầu lượt mới không trùng bài vừa phát) */
function refill(){queue=LIST.map((_,i)=>i);if(M.shuffle!==false){for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]]}if(queue.length>1&&queue[0]===mi){const k=queue.length-1;[queue[0],queue[k]]=[queue[k],queue[0]]}}}
function nextTrack(){if(!queue.length)refill();loadTrack(queue.shift())}
function loadTrack(i){mi=(i+LIST.length)%LIST.length;au.src=LIST[mi];au.loop=LIST.length===1&&M.loop!==false}
if(LIST.length){au.volume=M.volume??.6;nextTrack();
 if(M.start)au.addEventListener('loadedmetadata',()=>{if(!au.dataset.started){au.dataset.started=1;au.currentTime=M.start}},{once:true})}
au.addEventListener('ended',()=>{if(LIST.length>1){bad=0;nextTrack();au.play().catch(()=>{})}else{au.currentTime=0;au.play().catch(()=>{})}});
au.addEventListener('error',()=>{console.warn('Không tải được nhạc:',au.src);if(LIST.length>1&&++bad<LIST.length){nextTrack();au.play().catch(()=>{})}});
const playMusic=()=>{if(au.src&&au.paused)au.play().catch(()=>{})};
if(au.src)au.play().catch(()=>{});            /* thử phát ngay khi mở web (nếu trình duyệt cho phép) */
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,playMusic,{once:true,passive:true}));
document.fonts.ready.then(()=>go(0));   /* vào luôn, không cần bấm */