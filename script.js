const P=[
[1,"Relaxed Cotton Shirt","men",1299,1599,"New","photo-1596755094514-f87e34085b2c","Relaxed cotton shirt"],
[2,"Structured Blazer","women",2499,2999,"Bestseller","photo-1591047139829-d91aecb6caea","Structured blazer"],
[3,"Minimal Classic Watch","accessories",1899,2299,"New","photo-1523170335258-f5ed11844a49","Classic wristwatch"],
[4,"Everyday Jacket","men",2199,2599,"Limited","photo-1551028719-00167b16eac5","Everyday jacket"],
[5,"Soft Knit Layer","women",1499,1799,"New","photo-1576566588028-4147f3842f27","Soft knit layer"],
[6,"Daily Carry Tote","accessories",999,1299,"Everyday pick","photo-1548036328-c9fa89d128fa","Tote bag"],
[7,"Premium Basic Tee","men",699,899,"Essential","photo-1521572163474-6864f9cf17ab","Basic T-shirt"],
[8,"Weekend Dress","women",1799,2199,"New","photo-1496747611176-843222e1e57c","Everyday dress"],
[9,"Everyday Sunglasses","accessories",799,999,"Trending","photo-1511499767150-a48a237f0083","Sunglasses"],
[10,"Casual Overshirt","men",1599,1899,"New","photo-1618354691373-d851c5c3a990","Casual overshirt"],
[11,"Minimal Shoulder Bag","women",1399,1699,"Bestseller","photo-1584917865442-de89df76afd3","Shoulder bag"],
[12,"Leather Card Holder","accessories",599,799,"Essential","photo-1627123424574-724758594e93","Leather card holder"],
[13,"Linen Blend Shirt","men",1199,1499,"New","photo-1603252109303-2751441dd157","Linen shirt"],
[14,"Everyday Sneakers","accessories",1699,1999,"Bestseller","photo-1542291026-7eec264c27ff","Everyday sneakers"],
[15,"Textured Everyday Top","women",899,1199,"Essential","photo-1551163943-3f6a855d1153","Everyday top"]
];
const fallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#e9e5dd"/><text x="50%" y="48%" text-anchor="middle" font-family="Arial" font-size="34" fill="#6f665b">NOSTRA</text><text x="50%" y="54%" text-anchor="middle" font-family="Arial" font-size="17" fill="#8d8275">IMAGE UNAVAILABLE</text></svg>');
const imgURL=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;
const $=s=>document.querySelector(s);let filter='all',search='',sort='featured',cart=JSON.parse(localStorage.getItem('nostraCart')||'[]'),slide=0,timer;
const money=n=>'₹'+n.toLocaleString('en-IN');
function render(){let a=P.filter(p=>(filter==='all'||p[2]===filter)&&p.slice(1,7).join(' ').toLowerCase().includes(search.toLowerCase()));if(sort==='low')a.sort((x,y)=>x[3]-y[3]);if(sort==='high')a.sort((x,y)=>y[3]-x[3]);$('#products').innerHTML=a.map(p=>`<article class="card"><div class="photo"><img src="${imgURL(p[6])}" alt="${p[7]}" loading="lazy"><span class="badge">${p[5]}</span><button class="add" data-add="${p[0]}">ADD TO BAG — ${money(p[3])}</button></div><div class="info"><div class="cat">${p[2]}</div><div class="name">${p[1]}</div><span class="price">${money(p[3])}</span><span class="old">${money(p[4])}</span></div></article>`).join('');$('#count').textContent=`${a.length} products`;$('#empty').hidden=!!a.length;$('#products').hidden=!a.length;document.querySelectorAll('#products img').forEach(i=>i.onerror=()=>{if(i.dataset.failed)return;i.dataset.failed='1';i.src=fallback;i.alt='Nostra image placeholder'});document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter))}
function renderCart(){let n=cart.reduce((s,x)=>s+x.qty,0);$('#bagCount').textContent=n;$('#bagItems').textContent=`${n} item${n===1?'':'s'}`;$('#cart').innerHTML=cart.length?cart.map(x=>{let p=P.find(y=>y[0]===x.id);return `<p>${p[1]} × ${x.qty} — ${money(p[3]*x.qty)} <button data-remove="${p[0]}">Remove</button></p>`}).join(''):'Your bag is empty.';$('#subtotal').textContent=money(cart.reduce((s,x)=>s+P.find(p=>p[0]===x.id)[3]*x.qty,0));localStorage.setItem('nostraCart',JSON.stringify(cart))}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2200)}
$('#products').addEventListener('click',e=>{let b=e.target.closest('[data-add]');if(!b)return;let id=+b.dataset.add,item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});renderCart();toast('Added to your bag')});
$('#cart').addEventListener('click',e=>{let b=e.target.closest('[data-remove]');if(b){cart=cart.filter(x=>x.id!==+b.dataset.remove);renderCart()}});
$('#filters').addEventListener('click',e=>{let b=e.target.closest('[data-filter]');if(b){filter=b.dataset.filter;render()}});
document.querySelectorAll('[data-cat]').forEach(a=>a.addEventListener('click',()=>{filter=a.dataset.cat;render()}));
$('#search').addEventListener('input',e=>{search=e.target.value.trim();render()});$('#sort').addEventListener('change',e=>{sort=e.target.value;render()});
$('#menuToggle').addEventListener('click',()=>$('#nav').classList.toggle('open'));
$('#newsletter').addEventListener('submit',e=>{e.preventDefault();$('#newsMessage').textContent='Thanks for subscribing! Demo only — email delivery is not connected.';e.target.reset()});
function setSlide(n){let s=[...document.querySelectorAll('.slide')];slide=(n+s.length)%s.length;s.forEach((x,i)=>x.classList.toggle('active',i===slide));document.querySelectorAll('.dots button').forEach((x,i)=>x.classList.toggle('active',i===slide))}
function resetTimer(){clearInterval(timer);timer=setInterval(()=>setSlide(slide+1),5500)}
$('#dots').innerHTML=[0,1,2].map((x)=>`<button data-slide="${x}" aria-label="Slide ${x+1}" class="${x===0?'active':''}"></button>`).join('');
$('#dots').addEventListener('click',e=>{let b=e.target.closest('[data-slide]');if(b){setSlide(+b.dataset.slide);resetTimer()}});$('#prev').onclick=()=>{setSlide(slide-1);resetTimer()};$('#next').onclick=()=>{setSlide(slide+1);resetTimer()};
document.querySelectorAll('.slide').forEach(s=>{let url=getComputedStyle(s).getPropertyValue('--bg').match(/url\\(['"]?(.*?)['"]?\\)/);if(url){let im=new Image();im.onerror=()=>s.style.backgroundImage='linear-gradient(120deg,#454a4b,#1d232c)';im.src=url[1]}});
$('#year').textContent=new Date().getFullYear();render();renderCart();resetTimer();
