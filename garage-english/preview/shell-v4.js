/* Garage English preview v4: shared shell for taller / aprender / jugar / clientes.
   Keeps every app.js feature and its logic; only markup, icons and photos change. Nothing here touches the live app. */
(function(){
const PAGE=document.body.dataset.page||'home';
const PAGES={home:'taller.html',learn:'aprender.html',games:'jugar.html',customers:'clientes.html',me:'taller.html#progreso'};
const IC=n=>'<i class="ph ph-'+n+'" aria-hidden="true"></i>';
const noEmo=s=>String(s==null?'':s).replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D\u20E3]/gu,'').replace(/\s{2,}/g,' ').trim();
window.noEmo=noEmo; window.IC=IC;
/* review link: ?abierto=1 opens every section so the teacher can check all content */
if(/[?&]abierto=1/.test(location.search)) sessionStorage.setItem('ge-open','1');
/* preview: always open */ sessionStorage.setItem('ge-open','1');
if(sessionStorage.getItem('ge-open')){ Object.values(SETS).forEach(s=>s.need=0); SCENES.forEach(s=>s.stars=0); }
/* ---- nav: one page per main screen ---- */
$$('nav button').forEach(b=>b.onclick=()=>{ const v=b.dataset.v, here=(v===PAGE)||(v==='me'&&PAGE==='home');
  if(here) return go(v); location.href='preview/'+PAGES[v]; });
/* ---- emoji -> line icons, everywhere app.js still writes them ---- */
const EM={'🔊':'speaker-high','🔁':'arrows-clockwise','📝':'clipboard-text','🔧':'wrench','⬇':'download-simple','🗑':'trash','📖':'book-open','💡':'lightbulb','✔':'check','✅':'check-square','⬜':'square','🏭':'garage','🔒':'lock','🎉':'confetti','⭐':'star','🔥':'fire','📋':'clipboard-text','😠':'smiley-angry','😐':'smiley-meh','😊':'smiley','🐢':'hourglass-medium','🎤':'microphone','🏆':'trophy','👨‍🔧':'hard-hat','🛠️':'toolbox','🔩':'nut','📈':'trend-up','🤔':'question','📅':'calendar-check','▶':'play'};
const RX=/(?:[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}](?:\uFE0F|\u200D[\p{Extended_Pictographic}])*\uFE0F?)|\u25B6|\u2B07/gu;
function scrub(root){ const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); const hits=[]; let n; const RX1=new RegExp(RX.source,'u'); while((n=w.nextNode())) if(RX1.test(n.nodeValue)) hits.push(n);
  hits.forEach(t=>{ const parts=t.nodeValue.split(RX), ems=t.nodeValue.match(RX)||[]; const f=document.createDocumentFragment();
    parts.forEach((p,i)=>{ if(p) f.appendChild(document.createTextNode(i===0?p:p.replace(/^\s+/,' '))); const e=ems[i]; if(!e) return; const k=EM[e]||EM[e.replace(/\uFE0F/g,'')];
      if(k){ const ic=document.createElement('i'); ic.className='ph ph-'+k; ic.setAttribute('aria-hidden','true'); f.appendChild(ic); } });
    t.replaceWith(f); }); }
const mo=new MutationObserver(ms=>{ mo.disconnect(); ms.forEach(m=>m.addedNodes.forEach(x=>{ if(x.nodeType===1) scrub(x); else if(x.nodeType===3&&x.parentNode) scrub(x.parentNode); })); obs(); });
const obs=()=>['#app','#toast','#live'].forEach(s=>mo.observe($(s),{childList:true,subtree:true,characterData:false}));
obs();
/* view class on <main> so the legacy markup can be skinned per screen */
const _render=render; render=function(){ $('#app').className='v-'+view+(view==='learn'?' s-'+learnSet:''); _render(); scrub($('#app')); fixBubbles(); const t=$('#app .tabs [aria-pressed=true]'); if(t) t.scrollIntoView({inline:'center',block:'nearest'}); };
/* ---- people: real portraits instead of emoji ---- */
const AV=w=>'preview/img/av-'+(CHARS[w]?w:'jorge')+'.webp';
const NAME2K={}; Object.entries(CHARS).forEach(([k,c])=>NAME2K[c.name]=k);
function fixBubbles(){ $$('#app .bubble .av').forEach(av=>{ const b=av.parentNode.querySelector('b'); const nm=b?b.textContent.replace(/:\s*$/,''):''; const k=NAME2K[nm];
  av.outerHTML=k?'<img class="avp" src="'+AV(k)+'" alt="" width="44" height="44">':'<span class="avp me">'+IC('user')+'</span>'; }); }
window.fixBubbles=fixBubbles;
/* ---- section cards ---- */
const SECIMG={out:'preview/car-side.webp?v=3',in:'preview/img/interior3.webp?v=7',tool:'preview/img/tools-a.webp?v=4',eng:'preview/img/engine-bay.webp?v=4',cab:'preview/img/cabin.webp?v=4',warn:null,sys:'preview/img/brakes.webp?v=4',inj:'preview/img/injection.webp?v=5',gear:'preview/img/gearbox.webp?v=5',dsl:'preview/img/diesel.webp?v=5'};
const SECCAT={out:'body',in:'int',tool:'tool',eng:'mech',cab:'int',warn:'light',sys:'wheel',inj:'light',gear:'mech',dsl:'body'};
const SECNAME={out:'Por fuera',in:'Por dentro',tool:'Herramientas',eng:'Motor',cab:'Cabina',warn:'Testigos del tablero',sys:'Frenos, suspensión y dirección',inj:'Inyección y encendido',gear:'Caja y embrague',dsl:'Diésel'};
const ORDER=['out','in','tool','eng','cab','warn','sys','inj','gear','dsl'];
Object.entries(SECNAME).forEach(([k,n])=>{ if(SETS[k]) SETS[k].n=n; });
const stars=n=>'<span class="st" aria-label="'+n+' de 3">'+'<i class="ph-fill ph-star on"></i>'.repeat(n)+'<i class="ph ph-star"></i>'.repeat(3-n)+'</span>';
const thumb=k=>SECIMG[k]?'<img src="'+SECIMG[k]+'" alt="" loading="lazy">':'<span class="wthumb">'+WARN_ICON('checkengine',30)+WARN_ICON('oillight',30)+WARN_ICON('batterylight',30)+'</span>';
const code=n=>String(n).padStart(2,'0');
vHome=function(){
  if(!S.seenIntro) return vIntro();
  const d=daily(), due=dueList().length, ts=totalStars();
  const task=(ok,txt,btn,act,n,m)=>'<li class="'+(ok?'done':'')+'"><span class="mono">'+code(Math.min(n,m))+'/'+code(m)+'</span><span class="tx">'+txt+'</span>'+(ok?IC('check-circle'):'<button class="b sm" data-act="'+act+'">'+btn+'</button>')+'</li>';
  const sec=ORDER.filter(k=>SETS[k]).map((k,i)=>{ const s=SETS[k], open=unlocked(k), [a,b]=setCount(k), bs=S.stars['boss-'+k]||0;
    return '<button class="sec c-'+SECCAT[k]+(open?'':' locked')+'" data-k="'+k+'"><span class="th">'+thumb(k)+'<span class="mono no">'+code(i+2)+'</span></span><span class="info"><span class="t lbl">'+esc(s.t)+'</span><span class="s">'+esc(s.n)+'</span>'+
      (open?'<span class="pbar2"><span style="width:'+(a/b*100)+'%"></span></span><span class="mono pc">'+code(a)+'/'+code(b)+' · JEFE '+stars(bs)+'</span>':'<span class="mono pc">'+IC('lock')+' '+s.need+' ESTRELLAS · TIENES '+ts+'</span>')+'</span></button>'; }).join('');
  app('<section class="wo"><div class="woh"><span class="lbl">Orden de trabajo · hoy</span><span class="mono">'+today()+'</span></div><h1 class="hi">Taller de '+esc(S.name||'aprendiz')+'</h1><ul class="order2">'+
   task(d.learn>=5,'Practica 5 partes'+(due?' <span class="badge2">'+IC('arrows-clockwise')+due+' para repasar</span>':''),'Ir','learn',d.learn,5)+
   task(d.game>=1,'Juega 1 ronda','Jugar','games',d.game,1)+task(d.scene>=1,'Atiende 1 cliente','Atender','customers',d.scene,1)+'</ul>'+
   (d.done?'<p class="okline">'+IC('check-circle')+'Orden completa. Vuelve mañana para mantener tu racha.</p>':'<p class="mutl">Completa las 3 tareas: +1 estrella</p>')+'</section>'+
   '<h2 class="lbl hsec">Secciones del taller</h2><button class="sec c-glass" data-k="reception"><span class="th"><img src="preview/img/car-front.webp?v=4" alt="" loading="lazy"><span class="mono no">01</span></span><span class="info"><span class="t lbl">Reception</span><span class="s">Cómo se juega</span></span></button>'+sec+
   '<button class="sec c-mech" data-k="customers"><span class="th"><img src="preview/img/av-lopez.webp" alt="" loading="lazy"><span class="mono no">'+code(ORDER.length+2)+'</span></span><span class="info"><span class="t lbl">Your customer</span><span class="s">'+SCENES.length+' clientes con problemas</span></span></button>');
  $$('[data-act]').forEach(b=>b.onclick=()=>nav(b.dataset.act));
  $$('button.sec').forEach(b=>b.onclick=()=>{ const k=b.dataset.k; if(k==='reception') return go('reception'); if(k==='customers') return nav('customers');
    if(!unlocked(k)) return toast('Necesitas '+SETS[k].need+' estrellas. Gánalas en juegos, clientes y retos.'); nav('learn',k); });
};
function nav(v,set){ if(v===PAGE) return go(v,set?{set}:{}); location.href='preview/'+PAGES[v]+(set?'#'+set:''); }
/* ---- games ---- */
const GIC={listen:'headphones',spot:'crosshair',match:'translate',order:'puzzle-piece',review:'arrows-clockwise'};
vGames=function(){
  if(!unlocked(gameSet)) gameSet='out'; const due=dueList().length;
  app('<div class="ph1"><h1 class="lbl">Juegos del taller</h1><span class="mono">'+esc(SETS[gameSet].t)+'</span></div><div class="tabs sc" role="group" aria-label="Sección">'+ORDER.filter(k=>SETS[k]).map(k=>'<button class="c-'+SECCAT[k]+'" aria-pressed="'+(gameSet===k)+'" data-set="'+k+'"'+(unlocked(k)?'':' aria-disabled="true"')+'>'+(unlocked(k)?'<i class="cdot" aria-hidden="true"></i>':IC('lock'))+esc(SECNAME[k].split(',')[0])+'</button>').join('')+'</div>'+
   (SECIMG[gameSet]?'<div class="gbanner"><img src="'+SECIMG[gameSet]+'" alt=""><span class="lbl">'+esc(SETS[gameSet].n)+'</span></div>':'<div class="gbanner w">'+['checkengine','oillight','batterylight','templight','brakelight'].map(i=>WARN_ICON(i,36)).join('')+'<span class="lbl">'+esc(SETS[gameSet].n)+'</span></div>')+
   '<div class="ggrid">'+GAMES.filter(g=>g[0]!=='spot'||SETS[gameSet].img).map(g=>{ const best=S.stars['g-'+g[0]+'-'+gameSet]||0;
     return '<button class="gc g-'+g[0]+'" data-g="'+g[0]+'">'+IC(GIC[g[0]])+'<b class="lbl">'+esc(noEmo(g[2]))+'</b><small>'+esc(g[3])+(g[0]==='review'?' ('+due+')':'')+'</small>'+(best?stars(best):'<span class="new mono">NUEVO</span>')+'</button>'; }).join('')+'</div>'+
   '<button class="b wide boss" id="boss">'+IC('hard-hat')+'Reto del Jefe de taller '+stars(S.stars['boss-'+gameSet]||0)+'</button>'+
   '<button class="b wide" id="post">'+IC('clipboard-text')+'Prueba final · '+TEST.length+' preguntas</button>');
  $$('.tabs button').forEach(b=>b.onclick=()=>{ if(!unlocked(b.dataset.set)) return toast('Necesitas '+SETS[b.dataset.set].need+' estrellas'); gameSet=b.dataset.set; render(); });
  $$('.gc').forEach(b=>b.onclick=()=>startGame(b.dataset.g,gameSet));
  $('#boss').onclick=()=>startGame('boss',gameSet); $('#post').onclick=()=>go('test',{kind:S.tests.pre?'post':'pre'});
  const on=$('.tabs [aria-pressed=true]'); if(on) on.scrollIntoView({inline:'center',block:'nearest'});
};
/* warning-light section has no photo: show the telltale in the question so Listen/Match still work visually */
const _renderQ=renderQ; renderQ=function(){ _renderQ(); try{ const q=G&&G.qs[G.i]; if(q&&q.p&&q.p.set==='warn'){ const pr=$('.prompt')||$('#pl'); if(pr) pr.insertAdjacentHTML('beforebegin','<div class="wq">'+WARN_ICON(q.p.id,72)+'</div>'); } }catch(e){} };
/* ---- customers ---- */
vCustomers=function(){
  const ts=totalStars();
  app('<div class="ph1"><h1 class="lbl">Clientes de hoy</h1><span class="mono">'+code(SCENES.length)+' ÓRDENES</span></div><p class="mutl">Cada cliente trae un daño. Elige bien lo que dices: el cliente se pone feliz… o no.</p>'+
   '<details class="goals"><summary class="lbl">Metas de esta sección</summary>'+GOALS.customer.map(g=>'<div>'+IC('check')+esc(g)+'</div>').join('')+'</details>'+
   SCENES.map((sc,i)=>{ const c=CHARS[sc.client], open=ts>=sc.stars, st=S.stars['sc-'+sc.id]||0;
     return '<button class="cust'+(open?'':' locked')+'" data-sc="'+sc.id+'"><img src="'+AV(sc.client)+'" alt="" width="64" height="64"><span class="info"><span class="mono no">OT-'+code(i+1)+'</span><span class="t lbl">'+esc(noEmo(sc.title))+'</span><span class="s">'+esc(c.name)+' · '+esc(c.role)+'</span>'+(open?stars(st):'<span class="mono pc">'+IC('lock')+' '+sc.stars+' ESTRELLAS</span>')+'</span>'+IC('caret-right')+'</button>'; }).join('')+
   '<button class="cust" data-sc="quick"><span class="qic">'+IC('chats-circle')+'</span><span class="info"><span class="mono no">SIM</span><span class="t lbl">Simulacro rápido</span><span class="s">8 turnos con un cliente · frases del taller</span>'+stars(Math.min(3,S.stars['sc-quick']||0))+'</span>'+IC('caret-right')+'</button>');
  $$('[data-sc]').forEach(b=>b.onclick=()=>{ const id=b.dataset.sc;
    if(id==='quick'){ SC={quick:true,i:0,good:0,total:0,hist:[]}; return go('scene'); }
    const sc=SCENES.find(x=>x.id===id); if(totalStars()<sc.stars) return toast('Necesitas '+sc.stars+' estrellas');
    SC={sc,node:'a',good:0,total:0,mood:50,hist:[]}; go('scene'); });
};
/* scene: the "you" bubble in app.js is inline; give it the student's avatar style */
const _vScene=vScene; vScene=function(){ _vScene(); scrub($('#app')); fixBubbles(); };
/* ---- start on this page's screen ---- */
const h=location.hash.slice(1);
if(PAGE==='home'&&h==='progreso') go('me'); else if(PAGE==='learn'&&SETS[h]) go('learn',{set:h}); else go(PAGE);
})();
