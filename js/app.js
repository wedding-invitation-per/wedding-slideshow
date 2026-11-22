const CFG=window.CONFIG||{};
const CL=CFG.cloudinary||{};
const IMAGES=new Proxy({},{get:(_,n)=>resolveImg(CFG.images&&CFG.images[n])});
function resolveImg(v){if(!v)return '';if(/^(https?:)?\/\//.test(v)||v.startsWith('/'))return v;
 return `https://res.cloudinary.com/${CL.cloudName}/image/upload/${CL.transform||'f_auto,q_auto'}/${CL.folder?CL.folder+'/':''}${v}`}
const P=(n,s,c='',inner='')=>{const [cls,...ex]=c.split('" style="');const extra=ex.join(';').replace(/"$/,'');
 return `<div class="ph ${cls}" style="${s};${extra}">${IMAGES[n]?`<img src="${IMAGES[n]}">`:'ẢNH '+n}${inner}</div>`};
/* hiệu ứng nhanh: A(class,delay,style,html) */
const A=(c,d,s,h='')=>`<div class="abs ${c}" style="--d:${d}s;${s}">${h}</div>`;
const T=(txt,cls,s,d=0,speed=45)=>`<div class="t ${cls}" data-type="${txt}" data-d="${d}" data-s="${speed}" style="${s}"></div>`;
const deco=(s)=>`<div class="abs a-fade" style="--d:.6s;${s};border:2px solid #d9c6a8;border-radius:60% 0 60% 0;opacity:.55"></div>`;
const HH=(s,d=0)=>A('a-pop',d,s+';border-radius:50%;background:radial-gradient(#f5d9a0,#c0392b);display:flex;align-items:center;justify-content:center;font:400 90px serif;color:#fff','囍');

const S=[
/* 1. Intro đỏ + đường trắng mở rộng */
{t:3.2,bg:'#8e1020',h:`<div class="redbg"></div><div class="hh a-fade" style="--d:0s">囍</div><div class="seam"></div>`},
/* 2. LOVE – ảnh trong chữ, trôi chậm, chữ gõ từng ký tự */
{t:6,h:`<div class="abs" style="inset:0;background:linear-gradient(#fbf2ec 0 55%,#fff 55%)"></div>
 <div class="lovebox kb a-wipe" style="--du:1.2s;--kb:6s">LOVE</div>
 ${T('Tình yêu là thử thách của thời gian,không phải kết hôn<br>mới là đích đến,mà là sự trọn vẹn sau hai chữ “Hôn nhân” hạnh phúc','script','left:200px;top:660px;width:1200px;font-size:38px',1.4,35)}`},
/* 3. 01 01 26 – đẩy lên từ dưới; 3 ảnh sát nhau, số viền trắng trồi lên lần lượt */
{t:4.6,tr:'up',h:P(1,'left:50px;top:15px;width:495px;height:560px;border-radius:14px 0 0 0','a-fade')+P(2,'left:555px;top:15px;width:495px;height:560px','a-fade')+P(3,'left:1060px;top:15px;width:490px;height:560px;border-radius:0 14px 0 0','a-fade')+
 ['01','01','26'].map((n,i)=>`<div class="abs a-up dnum" style="--d:${[.55,1.05,1.45][i]}s;--du:.55s;left:${[250,790,1300][i]}px;top:400px">${n}</div>`).join('')+
 T('WELCOME TO OUR WEDDING','serif','left:0;width:1600px;top:640px;font-size:30px;letter-spacing:6px;font-weight:700;color:#333',1.2,30)+
 `<div class="t names a-up" style="--d:1.7s;left:0;width:1600px;top:700px;font-size:96px;font-family:'Dancing Script',cursive;font-weight:700">Quang Hải &amp; Minh Tú</div>`},
/* 4. Khung ảnh đỏ nổi + 囍 */
{t:4,bg:'#f7f2f0',h:`<div class="abs a-zoom" style="--d:.1s;left:330px;top:170px;width:940px;height:450px;background:#fff;box-shadow:0 10px 30px #0002"></div>`+
 P(4,'left:380px;top:210px;width:840px;height:370px','kb a-fade')+HH('left:240px;top:330px;width:130px;height:130px',.7)+
 `<div class="t serif a-up" style="--d:.6s;left:0;width:1600px;top:660px;font-size:36px;letter-spacing:3px">MINH TÚ &amp; QUANG HẢI</div>
  <div class="t tan a-fade serif" style="--d:1s;left:0;width:1600px;top:730px;font-size:34px;letter-spacing:8px;font-weight:700">—— 2002 - 1998 ——</div>`},
/* 5. Cô dâu */
{t:5,h:`<div class="abs a-fade" style="left:60px;top:40px;width:650px;height:830px;background:#fbf3ee"></div>`+
 T('CON LÀ CÔ DÂU','script','left:60px;width:650px;top:290px;font-size:34px;letter-spacing:3px;color:#8a6a55',.5,50)+
 `<div class="t script tan a-up" style="--d:1s;left:60px;width:650px;top:350px;font-size:110px">Minh Tú</div>`+
 `<div class="abs a-down" style="--d:.4s;left:1040px;top:0;width:480px;height:900px"></div>`+
 P(5,'left:1010px;top:0;width:560px;height:900px','a-right')+
 `<div class="abs a-wipeR" style="--d:.8s;left:830px;top:80px;width:3px;height:740px;background:#222"></div>`},
/* 6. Chú rể (gương) */
{t:5,h:P(6,'left:200px;top:70px;width:340px;height:760px','a-left')+
 `<div class="abs a-up" style="--d:.5s;left:470px;top:200px;width:60px;height:330px;background:#d4a08a"></div>`+
 `<div class="abs a-fade" style="--d:.3s;left:560px;top:0;width:900px;height:900px;background:#fbf3ee;z-index:-1"></div>`+
 T('CON LÀ CHÚ RỂ','script','left:560px;width:900px;top:270px;font-size:34px;letter-spacing:3px;color:#8a6a55',.5,50)+
 `<div class="t script tan a-up" style="--d:1s;left:560px;width:900px;top:330px;font-size:110px">Hoàng Hiệp</div>`+
 `<div class="abs love a-left" style="--d:.8s;left:130px;top:340px;writing-mode:vertical-rl;transform:rotate(180deg);font-size:50px;letter-spacing:10px">LOVE</div>`},
/* 7. 3 ảnh, fade lần lượt */
{t:5.5,h:P(7,'left:200px;top:140px;width:380px;height:470px','a-fade')+P(8,'left:610px;top:140px;width:380px;height:470px','a-fade" style="--d:.5s')+P(9,'left:1020px;top:140px;width:380px;height:470px','a-fade')+
 T('Gửi hàng triệu lời cảm ơn và tất cả yêu thương từ sâu thẳm trái tim.<br>Chúng con cảm ơn Bố Mẹ hai bên đã chấp thuận và cưu đẹp.','script','left:150px;width:1300px;top:700px;font-size:34px',1.4,30)},
/* 8. Ảnh cong lớn + ảnh cắt viền cam + chữ gõ */
{t:6.5,h:P(10,'left:0;top:260px;width:1600px;height:560px','curve" style="clip-path:ellipse(75% 62% at 50% 100%)')+
 P(11,'left:430px;top:230px;width:540px;height:520px','a-zoom" style="--d:1s;border:10px solid #fff;border-radius:30px')+
 T('Bọn con đã có quãng thời gian tìm hiểu và được sự đón nhận<br>của Bố Mẹ hai bên.','script','left:200px;width:1200px;top:60px;font-size:38px',1.8,45)},
/* 9. 3 ảnh + 囍 + câu chữ */
{t:6.5,h:`<div class="abs a-fade" style="left:150px;top:55px;width:1250px;height:110px;background:#fbf3ee"></div>`+
 T('Và ngày hôm nay, là ngày quan trọng nhất<br>của cuộc đời vợ chồng chúng con.','script','left:150px;width:1250px;top:62px;font-size:34px',.4,45)+
 P(12,'left:95px;top:330px;width:380px;height:300px','a-left')+P(13,'left:490px;top:230px;width:420px;height:470px','a-up" style="--d:.3s')+P(14,'left:1010px;top:330px;width:380px;height:300px','a-right')+
 HH('left:380px;top:560px;width:130px;height:130px',1.2)},
/* 10. 3 ảnh cong + chữ */
{t:5.5,bg:'#fff',h:P(15,'left:60px;top:60px;width:470px;height:560px','curve" style="clip-path:polygon(0 8%,100% 0,100% 92%,0 100%)')+
 P(16,'left:560px;top:90px;width:470px;height:560px','curve" style="--d:.2s;animation-delay:.2s;clip-path:polygon(0 4%,100% 0,100% 100%,0 96%)')+
 P(17,'left:1050px;top:40px;width:470px;height:580px','curve" style="animation-delay:.4s;clip-path:polygon(0 0,100% 6%,100% 92%,0 100%)')+
 T('Chúng con thật vui và hạnh phúc khi<br>được thấy mọi người ở đây.','script','left:150px;width:850px;top:690px;font-size:42px',1.2,50)+
 HH('left:1330px;top:560px;width:170px;height:170px',1.5)},
/* 11. Cặp lớn bên phải + 2 ảnh nhỏ trái */
{t:5,h:P(18,'left:1000px;top:0;width:600px;height:900px','a-right')+P(19,'left:130px;top:70px;width:340px;height:360px','a-fade')+P(20,'left:130px;top:470px;width:340px;height:340px','a-fade" style="--d:.5s')+
 T('Cùng chung vui<br>và chứng kiến giây<br>phút hạnh phúc này.','script','left:480px;width:480px;top:160px;font-size:40px',.8,50)},
/* 12. Lời chúc phúc */
{t:6.5,h:`<div class="abs a-fade" style="left:140px;top:0;width:700px;height:900px;background:#fbf3ee"></div>`+P(21,'left:560px;top:0;width:560px;height:900px','a-left')+
 P(22,'left:1160px;top:60px;width:330px;height:240px','a-right')+P(23,'left:1160px;top:330px;width:330px;height:240px','a-right" style="--d:.2s')+P(24,'left:1160px;top:600px;width:330px;height:240px','a-right" style="--d:.4s')+
 `<div class="t serif a-fade" style="left:140px;width:470px;top:200px;font-size:38px;color:#c9a27f">LỜI CHÚC PHÚC</div>`+
 T('của mọi người là niềm tin<br>để chúng con bước tiếp<br>trên con đường phía trước<br>của cả hai.','script','left:140px;width:470px;top:290px;font-size:36px',1,55)},
/* 13. Cảm ơn: 3 ảnh + chữ */
{t:6,h:P(25,'left:60px;top:40px;width:640px;height:830px','a-left')+P(26,'left:720px;top:60px;width:310px;height:450px','a-down')+P(27,'left:1050px;top:60px;width:310px;height:450px','a-down" style="--d:.2s')+
 `<div class="t serif a-up" style="--d:.6s;left:720px;width:700px;top:560px;font-size:44px;color:#d49a7a">CHÚNG CON XIN CẢM ƠN</div>`+
 T('tất cả mọi người đã sắp xếp công việc<br>và thời gian không ngại xa xôi<br>để tới đây.','script','left:720px;width:700px;top:640px;font-size:34px',1,40)},
/* 14. 4 ảnh dọc */
{t:6,h:T('Hơn bao giờ hết chúng con muốn nói lời cảm ơn thật nhiều.','script','left:0;width:1600px;top:40px;font-size:38px',0,40)+
 P(28,'left:100px;top:150px;width:360px;height:650px','a-up')+P(29,'left:480px;top:150px;width:360px;height:650px','a-up" style="--d:.2s')+P(30,'left:860px;top:150px;width:360px;height:650px','a-up" style="--d:.4s')+P(31,'left:1240px;top:150px;width:260px;height:650px','a-up" style="--d:.6s')},
/* 15. Hai nửa tròn + câu chữ */
{t:5.5,bg:'#f3f0ee',h:`<div class="abs a-fade" style="inset:0;background:radial-gradient(#fff,#ece9e6)"></div>`+
 P(32,'left:100px;top:230px;width:360px;height:440px;border-radius:50% 0 0 50%','a-left')+P(33,'left:400px;top:230px;width:420px;height:440px;border-radius:0 50% 50% 0','a-right')+
 T('Mãi mãi bắt đầu từ hôm<br>nay, chúng con sẽ luôn<br>luôn hạnh phúc.','script','left:880px;width:600px;top:310px;font-size:56px',.9,55)},
/* 16. Kết */
{t:5,h:P(34,'left:0;top:0;width:800px;height:900px','a-left')+
 `<div class="abs love a-fade" style="--d:.5s;left:790px;top:240px;writing-mode:vertical-rl;transform:rotate(180deg);font-size:110px;color:#fff;-webkit-text-stroke:0;background:var(--red);padding:6px">LOVE</div>`+
 `<div class="t serif a-up" style="--d:.7s;left:880px;width:640px;top:360px;font-size:62px;line-height:1.3">CHÚNG CON XIN<br>CẢM ƠN Ạ!!!</div>`}
];

const st=document.getElementById('st'),box=document.getElementById('box');
S.forEach((s,i)=>{const d=document.createElement('div');d.className='sc';d.style.background=s.bg||'';d.innerHTML=s.h;st.appendChild(d);s.el=d});
function fit(){st.style.transform=`scale(${box.clientWidth/1600})`}addEventListener('resize',fit);fit();
let cur=-1,timer=null,playing=true,tyTimers=[];
function typeIn(el){tyTimers.forEach(clearTimeout);tyTimers=[];
 el.querySelectorAll('[data-type]').forEach(n=>{const full=n.dataset.type,sp=+n.dataset.s,d=+n.dataset.d*1000;n.innerHTML='';
  let k=0;const parts=full.split(/(<br>)/);const chars=[];parts.forEach(p=>p==='<br>'?chars.push('<br>'):[...p].forEach(c=>chars.push(c)));
  tyTimers.push(setTimeout(function step(){if(k<=chars.length){n.innerHTML=chars.slice(0,k).join('')+(k<chars.length?'<span style="opacity:0">'+chars.slice(k).join('')+'</span>':'');k++;tyTimers.push(setTimeout(step,sp))}},d))})}
function go(i){clearTimeout(timer);const prev=cur>=0?S[cur].el:null;cur=(i+S.length)%S.length;
 S.forEach((s,j)=>{if(j!==cur&&s.el!==prev)s.el.className='sc'});
 if(prev&&prev!==S[cur].el){prev.className='sc on out';setTimeout(()=>{if(S[cur].el!==prev)prev.className='sc'},550)}
 const e=S[cur].el;e.className='sc';void e.offsetWidth;e.className='sc on';
 if(S[cur].tr==='up'&&prev){e.style.transition='none';e.style.transform='translateY(100%)';prev.style.transition='transform .6s cubic-bezier(.65,0,.35,1)';prev.style.transform='translateY(-100%)';prev.classList.remove('out');void e.offsetWidth;e.style.transition='transform .6s cubic-bezier(.65,0,.35,1)';e.style.transform='none';setTimeout(()=>{prev.style.transform='';prev.style.transition=''},700)}else{e.style.transform='';e.style.transition=''}
e.style.zIndex=2;if(prev)prev.style.zIndex=1;
 typeIn(e);document.getElementById('lb').textContent=`Cảnh ${cur+1}/${S.length}`;
 if(playing)timer=setTimeout(()=>go(cur+1),S[cur].t*1000)}
pp.onclick=()=>{playing=!playing;pp.textContent=playing?'⏸':'▶';if(playing)timer=setTimeout(()=>go(cur+1),600);else clearTimeout(timer)};
prev.onclick=()=>go(cur-1);next.onclick=()=>go(cur+1);rs.onclick=()=>{playing=true;pp.textContent='⏸';go(0)};
const au=document.getElementById('au');
if(CFG.music&&CFG.music.src){au.src=CFG.music.src;au.loop=CFG.music.loop!==false;au.volume=CFG.music.volume??.6}
document.getElementById('start').onclick=()=>{document.getElementById('start').remove();if(au.src)au.play().catch(()=>{});document.fonts.ready.then(()=>go(0))};
document.getElementById('mute').onclick=e=>{au.muted=!au.muted;e.target.textContent=au.muted?'🔇':'🔊'};
