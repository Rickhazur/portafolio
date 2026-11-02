/* Garage English preview v10: in-car photos (Motor, Inyección, Caja, Diésel) with realigned hotspots,
   a systems menu instead of the tab grid, a collapsible "Frases y consejos" panel, workshop sound effects,
   an XP bar that fills, a level-up moment, micro-animations and a mute toggle. Loaded after aprender.js, before shell-v4.js. */
(function(){
const R=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8"/>', C=(cx,cy,r)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>', P=s=>'<polygon points="'+s+'"/>';
const RING=(cx,cy,ro,ri)=>'<path fill-rule="evenodd" d="M'+(cx-ro)+' '+cy+'a'+ro+' '+ro+' 0 1 0 '+(2*ro)+' 0a'+ro+' '+ro+' 0 1 0 '+(-2*ro)+' 0ZM'+(cx-ri)+' '+cy+'a'+ri+' '+ri+' 0 1 0 '+(2*ri)+' 0a'+ri+' '+ri+' 0 1 0 '+(-2*ri)+' 0Z"/>';
const IC=n=>'<i class="ph ph-'+n+'" aria-hidden="true"></i>';
/* ---------- 1. new in-car photos, hotspots on the 1024x576 frame ---------- */
const G={
 eng:{img:'v10-engine.webp',name:'VANO DEL MOTOR · CAPÓ ABIERTO',p:{
  engine:[R(430,138,165,98)], battery:[R(310,95,145,110)], coolanttank:[R(730,222,112,105)], radiatorcap:[C(562,484,26)],
  brakefluid:[R(666,134,50,76)], oilcap:[C(502,256,28)], dipstick:[R(412,228,32,88)], airfilter:[R(172,205,145,135)],
  fusebox:[R(214,110,90,80)], washerfluid:[R(724,418,88,95)], alternator:[C(630,338,46)], belt:[C(618,442,34)]}},
 inj:{img:'v10-injection.webp',name:'INYECCIÓN Y ENCENDIDO · EN EL MOTOR',p:{
  injector:[P('280,318 600,366 600,428 280,376'),[44,61]], fuelpump:[R(735,340,165,172)], fuelfilter:[R(652,132,66,94)],
  sparkplug:[R(396,238,32,66)], ignitioncoil:[R(470,222,78,80)+R(566,240,68,70)+R(306,208,66,70)+R(392,126,72,100),[49.5,45]],
  throttlebody:[R(92,178,145,135)], ecu:[R(788,138,172,145)]}},
 gear:{img:'v10-gearbox.webp',name:'CAJA Y EMBRAGUE · CARRO EN EL ELEVADOR',p:{
  gearbox:[R(195,160,240,230),[30,48]], clutchdisc:[C(546,252,46)], pressureplate:[RING(546,252,82,50),[59.8,43.8]], flywheel:[RING(556,250,112,86),[54.3,25]],
  gearlever:[R(300,140,100,44)], transfluid:[R(388,395,34,170)], releasebearing:[C(440,302,32)], driveshaft:[R(668,226,285,74)]}},
 dsl:{img:'v10-diesel.webp',name:'MOTOR DIÉSEL · CAPÓ ABIERTO',p:{
  dslinjector:[P('462,190 682,158 694,214 474,248')], glowplug:[R(352,202,90,74)], dslfilter:[R(148,166,98,158)], turbo:[R(734,174,122,158)],
  injpump:[R(328,262,94,96)], adblue:[R(876,180,92,106)], intercooler:[R(590,410,330,166)]}}};
function ctr(g){ let m=g.match(/cx="([\d.]+)" cy="([\d.]+)"/); if(m) return [+m[1],+m[2]];
  m=g.match(/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/); if(m) return [+m[1]+m[3]/2,+m[2]+m[4]/2];
  const v=(g.match(/points="([^"]+)"/)||[,''])[1].trim().split(/[\s,]+/).map(Number); let x=0,y=0; for(let i=0;i<v.length;i+=2){x+=v[i];y+=v[i+1];} return [x/(v.length/2),y/(v.length/2)]; }
const IMG=f=>'preview/img/'+f+'?v=10';
Object.entries(G).forEach(([set,d])=>{ const parts={};
  Object.entries(d.p).forEach(([id,[g,hs]])=>{ const it=byId(id); if(!it||it.set!==set) return; parts[id]=g; const c=ctr(g); it.hs=[hs||[+(c[0]/10.24).toFixed(1),+(c[1]/5.76).toFixed(1)]]; });
  ITEMS.filter(i=>i.set===set&&!parts[i.id]).forEach(i=>console.warn('v10: no hotspot for',i.id));
  window.SCHEM[set]={name:d.name,vb:'0 0 1024 576',img:{href:IMG(d.img),x:0,y:0,w:1024,h:576},base:'',parts};
  if(SETS[set]) SETS[set].img=IMG(d.img);
  if(SCHEM.photoZoom) Object.keys(parts).forEach(id=>delete SCHEM.photoZoom[id]); });

/* ---------- 4. sound effects + mute ---------- */
const MK='ge-sfx-mute'; let muted=localStorage.getItem(MK)==='1';
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const SFX={}; ['wrench','engine','jack','success','error'].forEach(k=>{ const a=new Audio('audio/sfx/'+k+'.mp3?v=10'); a.preload='auto'; SFX[k]=a; });
const sfx=(k,vol)=>{ if(muted) return; try{ const a=SFX[k].cloneNode(); a.volume=vol==null?.6:vol; a.play().catch(()=>{}); }catch(e){} };
window.sfx=sfx;
const hudEl=$('.hud');
if(hudEl){ hudEl.insertAdjacentHTML('beforeend','<button class="mute" id="mute" aria-pressed="'+muted+'" aria-label="Silenciar sonidos del taller">'+IC(muted?'speaker-slash':'speaker-simple-high')+'</button>');
  $('#mute').onclick=()=>{ muted=!muted; localStorage.setItem(MK,muted?'1':'0'); $('#mute').setAttribute('aria-pressed',muted); $('#mute').innerHTML=IC(muted?'speaker-slash':'speaker-simple-high'); toast(muted?'Sonidos del taller apagados':'Sonidos del taller encendidos'); if(!muted) sfx('wrench',.4); };
  const lv=$('.hud .lvl'); if(lv) lv.insertAdjacentHTML('beforeend','<div class="xpn mono" id="hXpN" aria-live="off"></div>'); }

/* ---------- XP bar that fills + level-up moment ---------- */
const _hud=hud; hud=function(){ _hud(); const {r,nx}=rank(), n=$('#hXpN'); if(n) n.textContent=nx?(S.pts-r[0])+' / '+(nx[0]-r[0])+' XP':'MÁX'; };
function floatXP(n){ const bar=$('.hud .xpbar'); if(!bar||RM.matches) return; const f=document.createElement('span'); f.className='xpfly mono'; f.textContent='+'+n+' XP'; bar.parentNode.appendChild(f); setTimeout(()=>f.remove(),1100);
  bar.classList.remove('pulse'); void bar.offsetWidth; bar.classList.add('pulse'); }
function levelUp(name){ sfx('engine',.7); buzz([40,60,120]);
  const d=document.createElement('div'); d.className='lvup'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','lvt');
  d.innerHTML='<div class="lvcard"><div class="lvic">'+IC('trophy')+'</div><p class="lbl">Subiste de nivel</p><h2 id="lvt">'+esc(noEmo(name))+'</h2><p class="lvs">Sigue así: cada pieza que dices en inglés suma XP.</p><button class="b wide" id="lvok">'+IC('wrench')+'Seguir trabajando</button></div>'+
   (RM.matches?'':'<div class="conf" aria-hidden="true">'+Array.from({length:24},(_,i)=>'<i style="--x:'+(Math.random()*100)+'%;--d:'+(Math.random()*.6)+'s;--c:'+['#FFB020','#3DA9FC','#2BD9C9','#E36BFF','#B6F23E'][i%5]+'"></i>').join('')+'</div>');
  document.body.appendChild(d); const b=$('#lvok'); b.focus(); const close=()=>{ d.remove(); }; b.onclick=close; d.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  say('Subiste a '+noEmo(name)); }
window.levelUp=levelUp;
gain=function(n,msg){ const b=rank().r; S.pts+=n; save(); floatXP(n); const a=rank().r; if(a!==b) levelUp(a[1]); else if(msg) toast(msg); };

/* ---------- game feel: correct / wrong ---------- */
const _ok=ok, _bad=bad;
ok=function(id){ _ok(id); sfx('success',.55); const r=$('.opt.right')||$('#fb'); if(r&&!RM.matches){ r.classList.remove('pop'); void r.offsetWidth; r.classList.add('pop'); }
  const fb=$('#fb'); if(fb) fb.classList.add('in'); };
bad=function(id){ _bad(id); sfx('error',.45); const w=$$('.opt.wrong').pop()||$('#fb'); if(w&&!RM.matches){ w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake'); } };
const _sg=startGame; startGame=function(k,s){ sfx('jack',.5); return _sg(k,s); };

/* ---------- 3. systems menu + 2. cleaner learn screen ---------- */
const ORDER=['out','in','tool','eng','cab','warn','sys','inj','gear','dsl'];
const NAME={out:'Por fuera',in:'Por dentro',tool:'Herramientas',eng:'Motor',cab:'Cabina',warn:'Testigos',sys:'Frenos y suspensión',inj:'Inyección y encendido',gear:'Caja y embrague',dsl:'Diésel'};
const THUMB={out:'preview/car-side.webp?v=10',in:'preview/img/in-dash.webp?v=10',tool:'preview/img/tools-a.webp?v=10',eng:IMG('v10-engine.webp'),cab:'preview/img/cabin.webp?v=10',sys:'preview/img/brakes.webp?v=10',inj:IMG('v10-injection.webp'),gear:IMG('v10-gearbox.webp'),dsl:IMG('v10-diesel.webp')};
window.GE_THUMB=THUMB;
const CAT={out:'body',in:'int',tool:'tool',eng:'mech',cab:'int',warn:'light',sys:'wheel',inj:'light',gear:'mech',dsl:'body'};
let MENU=!(SETS[location.hash.slice(1)]);
function vMenu(){ const ts=totalStars();
  const tiles=ORDER.filter(k=>SETS[k]).map(k=>{ const [a,b]=setCount(k), open=unlocked(k);
    return '<button class="tile2 c-'+CAT[k]+(open?'':' locked')+'" data-k="'+k+'">'+(THUMB[k]?'<img src="'+THUMB[k]+'" alt="" loading="lazy">':'<span class="wthumb">'+WARN_ICON('checkengine',34)+WARN_ICON('oillight',34)+WARN_ICON('batterylight',34)+'</span>')+
      '<span class="tl"><span class="tn">'+esc(NAME[k])+'</span><span class="tc mono">'+(open?String(a).padStart(2,'0')+'/'+String(b).padStart(2,'0'):IC('lock')+' '+SETS[k].need)+'</span></span><span class="tp" style="--p:'+(b?a/b*100:0)+'%"></span></button>'; }).join('');
  app('<div class="mhead"><h1 class="lbl">¿Qué sistema revisamos?</h1><span class="mono">'+ORDER.filter(k=>SETS[k]).length+' SISTEMAS</span></div><div class="sysgrid" role="list">'+tiles+'</div>');
  $$('.tile2').forEach(b=>b.onclick=()=>{ const k=b.dataset.k; if(!unlocked(k)) return toast('Necesitas '+SETS[k].need+' estrellas. Tienes '+ts+'.'); sfx('jack',.45); MENU=false; learnSet=k; args={}; history.replaceState(null,'','#'+k); render(); window.scrollTo(0,0); });
}
const _vLearn=vLearn;
vLearn=function(){
  if(args&&args.set){ MENU=false; }
  if(args&&args.menu){ MENU=true; args={}; }
  if(MENU) return vMenu();
  _vLearn();
  const tabs=$('#app .tabs'); if(tabs) tabs.remove();
  const [a,b]=setCount(learnSet);
  $('#app').insertAdjacentHTML('afterbegin','<div class="sysbar"><button class="b back" id="bBack" aria-label="Volver a los sistemas">'+IC('squares-four')+'<span>Sistemas</span></button><h2 class="lbl st2">'+esc(NAME[learnSet]||'')+'</h2><span class="mono">'+String(a).padStart(2,'0')+'/'+String(b).padStart(2,'0')+'</span></div>');
  $('#bBack').onclick=()=>{ MENU=true; history.replaceState(null,'','#'); render(); window.scrollTo(0,0); };
  /* phrases + tips into one collapsible panel */
  const more=$('#app .more'); if(more){ const keep=['bDone','rv','boss']; const moving=[...more.children].filter(el=>!keep.includes(el.id)&&!(el.tagName==='P'&&el.querySelector('.ph-lock')));
    const n=more.querySelectorAll('.sent').length; const det=document.createElement('details'); det.className='phr'; det.open=sessionStorage.getItem('ge-phr')==='1';
    det.innerHTML='<summary>'+IC('chat-text')+'<span>Frases y consejos</span><span class="mono">'+n+'</span>'+IC('caret-down')+'</summary><div class="phb"></div>';
    moving.forEach(el=>det.lastChild.appendChild(el)); more.appendChild(det); det.addEventListener('toggle',()=>sessionStorage.setItem('ge-phr',det.open?'1':'0')); }
  /* main action first: Escuchar is the big one */
  const act=$('#app .act'); if(act) act.classList.add('v10');
  /* selection feedback */
  const sel=$('.car .pt.sel'); if(sel&&!RM.matches) sel.classList.add('pop');
  const tag=$('#ptag'); if(tag&&!RM.matches) tag.classList.add('pop');
  $$('.car .pt, .strip button, .boards button').forEach(x=>x.addEventListener('click',()=>sfx('wrench',.3),{capture:true}));
};
/* bottom nav "Aprender" while on the learn page goes back to the menu */
$$('nav button[data-v=learn]').forEach(b=>b.addEventListener('click',()=>{ if(document.body.dataset.page==='learn'){ MENU=true; } },{capture:true}));
})();
