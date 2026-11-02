/* Garage English · preview of the new visual layer for the Aprender screen.
   Reuses window.DATA and every helper from app.js (play, mic, gain, logEv, dailyTick, review state, S, SETS...).
   Only the markup of vLearn, the HUD text and the toast text change here. */
(function(){
const noEmo=s=>String(s==null?'':s).replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D\u20E3]/gu,'').replace(/\s{2,}/g,' ').trim();
const IC=n=>'<i class="ph ph-'+n+'" aria-hidden="true"></i>';
const SETNAME={out:'Por fuera',in:'Por dentro',tool:'Herramientas'};
const VIEWNAME={out:'VISTA LATERAL',in:'INTERIOR',tool:'BANCO DE HERRAMIENTAS'};

/* HUD: same data as app.js hud(), mono counters, no emoji */
hud=function(){ const {r,nx}=rank(); $('#hRank').textContent=noEmo(r[1]); $('#hStars').textContent=String(totalStars()).padStart(2,'0'); $('#hStreak').textContent=String(S.streak).padStart(2,'0');
  $('#hXp').style.width=(nx?Math.min(100,(S.pts-r[0])/(nx[0]-r[0])*100):100)+'%'; };
const _toast=toast; toast=function(t){ _toast(noEmo(t)); };

/* Nav: only Aprender lives in this preview */
$$('nav button').forEach(b=>b.onclick=()=>{ if(b.dataset.v==='learn') return go('learn'); toast('Vista previa: solo Aprender. Las demás pantallas siguen en la app.'); });
const toFull=()=>toast('Este reto se abre en la app completa.');

const CAT={headlight:'light',taillight:'light',windshield:'glass',frontwindow:'glass',rearwindow:'glass',backwindow:'glass',mirror:'glass',wheel:'wheel',tire:'wheel',hubcap:'wheel',exhaust:'mech',wiper:'mech',fuelcap:'mech',antenna:'mech'};
const catOf=id=>{const it=byId(id); if(it&&it.set==='in') return 'int'; if(it&&it.set==='tool') return 'tool'; return CAT[id]||'body';};
const SETCAT={out:'body',in:'int',tool:'tool'};
let lastTag=null;
vLearn=function(){
  if(args.set) learnSet=args.set; if(!unlocked(learnSet)) learnSet='out';
  const list=ITEMS.filter(i=>i.set===learnSet); const p=byId(sel[learnSet])||list[0]; sel[learnSet]=p.id;
  const sc=SCHEM[learnSet]; const idx=list.indexOf(p); const [a,b]=setCount(learnSet); const due=dueList().filter(i=>i.set===learnSet);
  const code=n=>String(n).padStart(2,'0');
  const tabs='<div class="tabs" role="group" aria-label="Sección">'+Object.keys(SETS).map(k=>'<button class="c-'+SETCAT[k]+'" aria-pressed="'+(learnSet===k)+'" data-set="'+k+'"'+(unlocked(k)?'':' aria-disabled="true"')+'>'+(unlocked(k)?'<i class="cdot" aria-hidden="true"></i>':IC('lock'))+SETNAME[k]+'</button>').join('')+'</div>';
  const parts=Object.entries(sc.parts).filter(([id])=>learnSet!=='tool'||id===p.id).map(([id,d])=>'<g class="pt c-'+catOf(id)+(id===p.id?' sel':'')+'" data-part="'+id+'">'+d+'</g>').join('');
  const pz=SCHEM.photoZoom&&SCHEM.photoZoom[p.id]; const z=pz&&sc.img&&learnSet===pz.set; const zx=(p.hs&&p.hs[0]&&p.hs[0][0]<50)?'r':'l';
  const IMG=c=>c.img?'<image href="'+c.img.href+'" x="'+c.img.x+'" y="'+c.img.y+'" width="'+c.img.w+'" height="'+c.img.h+'" preserveAspectRatio="none"/>':'';
  const lens=z?'<figure class="lens '+zx+'" aria-label="'+esc(p.es)+' de cerca"><svg viewBox="'+(pz.cx-pz.s/2)+' '+(pz.cy-pz.s/2)+' '+pz.s+' '+pz.s+'" aria-hidden="true">'+IMG(sc)+'<g class="pt zpt">'+sc.parts[p.id]+'</g></svg><figcaption class="lbl">Detalle</figcaption></figure>':'';
  const stage='<section class="stage" aria-label="'+VIEWNAME[learnSet]+'"><div class="stagebar"><span class="lbl">'+VIEWNAME[learnSet]+'</span><span class="mono">PT-'+code(idx+1)+' / '+code(list.length)+'</span></div>'+
    '<div class="carwrap'+(z?' z'+zx:'')+'"><svg class="car" viewBox="'+sc.vb+'" role="img" aria-label="Foto del carro; la parte '+esc(p.en)+' está marcada en naranja">'+IMG(sc)+'<g class="ln">'+sc.base+'</g>'+parts+'</svg>'+
    '<svg class="lead" aria-hidden="true"><line id="ldr"/><circle id="ldot" r="3"/></svg>'+
    '<div class="tag" id="ptag"><span class="lbl" lang="en">'+esc(p.en)+'</span><span class="es">'+esc(p.es)+'</span></div>'+lens+'</div></section>';
  const strip='<div class="strip" aria-label="Partes">'+list.map((x,i)=>'<button class="c-'+catOf(x.id)+(x.id===p.id?' on':'')+'" data-id="'+x.id+'" aria-current="'+(x.id===p.id)+'"><span class="mono">'+code(i+1)+'</span>'+esc(x.en)+(S.learned[x.id]?IC('check')+'<span class="sr"> aprendida</span>':'')+'</button>').join('')+'</div>';
  const word='<section class="word" aria-label="Palabra"><div class="wtop"><div><div class="es">'+esc(p.es)+'</div><h1 class="w" lang="en">'+esc(p.en)+'</h1></div><div class="mono prog">'+code(a)+'/'+code(b)+'<span class="sr"> aprendidas</span></div></div>'+
    '<div class="syl" id="syl" aria-hidden="true">'+(p.syl||[]).map(s=>'<span>'+esc(s)+'</span>').join('<i class="dot">·</i>')+'</div>'+
    '<div class="act"><button class="b k-listen" id="bN">'+IC('speaker-high')+'Escuchar</button><button class="b k-slow" id="bS">'+IC('hourglass-medium')+'Lento</button><button class="b k-say" id="bM">'+IC('microphone')+'Decirlo</button></div>'+
    '<div class="fb" id="sfb" aria-live="polite"></div></section>';
  const more='<section class="more">'+
    '<button class="b wide" id="bDone">'+(S.learned[p.id]?IC('check')+'Ya la dije · Siguiente':IC('check-square')+'La dije en voz alta <span class="mono">+10</span>')+'</button>'+
    (p.tip?'<p class="tip">'+IC('info')+esc(p.tip)+'</p>':'')+
    '<h2 class="lbl">Frases</h2>'+p.sents.map(s=>'<div class="sent"><button class="pl" data-play="'+s.a+'" data-text="'+esc(s.en)+'" data-rate=".95" aria-label="Escuchar la frase">'+IC('play')+'</button><div class="en" lang="en">'+esc(s.en)+'</div><div class="es">'+esc(s.es)+'</div>'+(s.say?'<div class="say mono">'+esc(s.say)+'</div>':'')+'</div>').join('')+
    (learnSet==='out'?'<p class="tip">'+IC('info')+'TH (this, the): pon la lengua entre los dientes. No es “d”.</p>':'')+
    (due.length?'<button class="b wide" id="rv">'+IC('arrows-clockwise')+'Repasar '+due.length+' palabras que fallaste</button>':'')+
    (b===a?'<button class="b wide" id="boss">'+IC('clipboard-text')+'Inspección final</button>':'<p class="tip">'+IC('lock')+'Aprende las '+b+' para abrir la inspección final.</p>')+
    '<details class="goals"><summary class="lbl">Metas de esta sección</summary>'+GOALS[learnSet].map(g=>'<div>'+IC('check')+esc(g)+'</div>').join('')+'</details></section>';
  app(tabs+stage+strip+word+more);
  wirePlay(); placeTag();
  $$('.tabs button').forEach(x=>x.onclick=()=>{ if(!unlocked(x.dataset.set)) return toast('Necesitas '+SETS[x.dataset.set].need+' estrellas'); args={}; learnSet=x.dataset.set; render(); });
  $$('.strip button').forEach(x=>x.onclick=()=>{sel[learnSet]=x.dataset.id;render();hear(1);});
  $$('.car .pt').forEach(g=>g.onclick=()=>{ if(g.dataset.part===sel[learnSet]) return hear(1); sel[learnSet]=g.dataset.part; render(); hear(1); });
  const on=$('.strip .on'); if(on) on.scrollIntoView({inline:'center',block:'nearest'});
  function hear(r){ const q=byId(sel[learnSet]); play(q.a,q.en,r); const sp=$$('#syl span'); sp.forEach((s,i)=>setTimeout(()=>{sp.forEach(z=>z.classList.remove('on'));s.classList.add('on');},300+i*550/r)); setTimeout(()=>sp.forEach(z=>z.classList.remove('on')),300+sp.length*550/r+400); }
  $('#bN').onclick=()=>hear(1); $('#bS').onclick=()=>hear(.7);
  if($('#rv')) $('#rv').onclick=toFull;
  if($('#boss')) $('#boss').onclick=toFull;
  $('#bM').onclick=()=>mic(p.en,r=>{ const f=$('#sfb'); if(!r){f.className='fb bad';f.textContent='Tu navegador no tiene micrófono: dilo 3 veces en voz alta.';return;} f.className='fb '+(r[0]?'ok':'bad'); f.textContent=r[0]?'Perfecto. Dijiste: '+r[1]:'Oí: “'+r[1]+'”. Intenta otra vez.'; logEv('speak',p.id,r[0],r[1]); if(r[0]) gain(5,'+5'); save(); });
  $('#bDone').onclick=()=>{ if(!S.learned[p.id]){S.learned[p.id]=1;gain(10,'+10');logEv('learn',p.id,1);} dailyTick('learn'); const i=list.indexOf(p); sel[learnSet]=list[(i+1)%list.length].id; render(); hear(1); };
};
/* mic() writes an emoji status line; keep its logic, clean its text */
const _mic=mic; mic=function(t,cb){ _mic(t,cb); const f=$('#sfb'); if(f) f.textContent=noEmo(f.textContent); };

/* Part tag on a thin leader line, anchored to the selected part's real geometry */
function placeTag(){
  const wrap=$('.carwrap'), g=$('.car .pt.sel'), tag=$('#ptag'); if(!wrap||!g||!tag) return;
  const bb=g.firstElementChild.getBBox(), m=g.ownerSVGElement.getScreenCTM(), wr=wrap.getBoundingClientRect();
  const pt=g.ownerSVGElement.createSVGPoint(); pt.x=bb.x+bb.width/2; pt.y=bb.y+bb.height/2; const s=pt.matrixTransform(m);
  const x=s.x-wr.left, y=s.y-wr.top, tw=tag.offsetWidth, th=tag.offsetHeight, W=wr.width;
  const lx=Math.max(4,Math.min(W-tw-4,x-tw/2)); tag.style.left=lx+'px'; tag.style.top='0px';
  const l=$('#ldr'); l.setAttribute('x1',x); l.setAttribute('y1',y); l.setAttribute('x2',Math.max(lx+8,Math.min(lx+tw-8,x))); l.setAttribute('y2',th);
  const d=$('#ldot'); d.setAttribute('cx',x); d.setAttribute('cy',y);
}
addEventListener('resize',placeTag);
if(document.fonts) document.fonts.ready.then(placeTag);
go('learn');
})();
