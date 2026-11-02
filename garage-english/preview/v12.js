/* Garage English preview v12: three game modes that make students want to play.
   1. MI TALLER  - coins buy upgrades; the workshop photo changes stage by stage (saved in localStorage with the rest of S).
   2. TRABAJOS CON RELOJ - timed jobs: listen to the customer, pick the faulty part, the tool and the right sentence. 1-5 star review.
   3. REPARACIONES PASO A PASO - guided repairs: hear the instruction, tap the tool, then the part on the photo.
   Loaded last (after shell-v4.js). Only touches the preview. */
(function(){
const IC=n=>'<i class="ph ph-'+n+'" aria-hidden="true"></i>', IF=n=>'<i class="ph-fill ph-'+n+'" aria-hidden="true"></i>';
const PIMG=f=>'preview/img/'+f+'?v=12';
const sfx=(k,v)=>{ try{ window.sfx&&window.sfx(k,v); }catch(e){} };
const item=id=>ITEMS.find(i=>i.id===id);
if(S.coins==null) S.coins=0; if(!S.shop) S.shop=[]; if(!S.jobs) S.jobs={}; if(!S.reps) S.reps={};
/* every point earned anywhere also pays coins (1 coin per 5 points) */
const _gain=gain; gain=function(n,msg){ if(n>0) S.coins+=Math.max(1,Math.round(n/5)); _gain(n,msg); coinHud(); };
function coinHud(){ let c=$('#hCoins'); if(!c){ const h=$('.hud'); const m=$('#mute'); if(!h) return; const s=document.createElement('span'); s.className='ctr coin'; s.innerHTML=IF('coins')+'<span id="hCoins">0</span><span class="sr"> monedas</span>'; m?h.insertBefore(s,m):h.appendChild(s); c=$('#hCoins'); } c.textContent=S.coins; }
const pay=n=>{ S.coins+=n; save(); coinHud(); const c=$('.hud .coin'); if(c){ c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); } };

/* ---------------- 1. MI TALLER ---------------- */
const UP=[
 {id:'lights',n:'Luces LED',d:'Ilumina todo el taller',ic:'lightbulb-filament',cost:30},
 {id:'paint',n:'Pintura y piso',d:'Paredes blancas, franja azul, piso epóxico',ic:'paint-roller',cost:60},
 {id:'tools',n:'Herramientas pro',d:'Gabinete rojo y tablero de herramientas',ic:'toolbox',cost:100},
 {id:'lift',n:'Elevador de carros',d:'Sube el carro para trabajar por debajo',ic:'arrow-fat-lines-up',cost:160},
 {id:'wait',n:'Sala de espera',d:'Sillas, café y una planta para los clientes',ic:'armchair',cost:220},
 {id:'sign',n:'Aviso con tu nombre',d:'Un aviso de neón con el nombre de tu taller',ic:'sign-in',cost:300}];
const stage=()=>Math.min(5,S.shop.filter(id=>id!=='sign').length);
const hasSign=()=>S.shop.includes('sign');
const STAGEN=['Taller abandonado','Con luz','Pintado y limpio','Taller equipado','Taller con elevador','Taller profesional'];
function scene(big){ const st=stage(); const nm=esc((S.name||'Aprendiz').toUpperCase());
  return '<div class="ws'+(big?' big':'')+'" data-stage="'+st+'"><img src="'+PIMG('ws-'+st+'.webp')+'" alt="Tu taller: '+STAGEN[st]+'" width="1024" height="576">'+
   (hasSign()?'<div class="wsign" aria-label="Aviso: Taller '+nm+'"><span>TALLER</span><b>'+nm+'</b></div>':'')+
   '<div class="wsbadge lbl">'+STAGEN[st]+' · '+S.shop.length+'/'+UP.length+'</div></div>'; }
function heroCard(){
  const nx=UP.find(u=>!S.shop.includes(u.id));
  return '<section class="mt-hero"><div class="mth"><h2 class="lbl">'+IC('garage')+'Mi taller</h2><span class="coinpill mono">'+IF('coins')+S.coins+'</span></div>'+scene(false)+
   '<p class="mutl">'+(nx?'Siguiente mejora: <b>'+nx.n+'</b> · '+nx.cost+' monedas':'¡Tu taller está completo!')+'</p>'+
   '<div class="mtgo"><button class="b big mt-b" data-m="shop">'+IC('storefront')+'Mejorar mi taller</button>'+
   '<button class="b big mt-b c2" data-m="jobs">'+IC('timer')+'Trabajos con reloj</button>'+
   '<button class="b big mt-b c3" data-m="reps">'+IC('wrench')+'Reparaciones paso a paso</button></div></section>'; }
function vShop(){
  const nx=UP.find(u=>!S.shop.includes(u.id));
  app('<div class="ph1"><h1 class="lbl">Mi taller</h1><span class="coinpill mono">'+IF('coins')+'<span id="cBal">'+S.coins+'</span></span></div>'+scene(true)+
   '<p class="mutl">Gana monedas con respuestas correctas, juegos, clientes, trabajos con reloj y reparaciones. Las mejoras se compran en orden.</p>'+
   '<div class="ups">'+UP.map(u=>{ const own=S.shop.includes(u.id), next=nx&&nx.id===u.id, can=next&&S.coins>=u.cost;
     return '<div class="up'+(own?' own':'')+(next?' next':'')+'"><span class="upi">'+IC(u.ic)+'</span><span class="info"><b>'+u.n+'</b><small>'+u.d+'</small></span>'+
      (own?'<span class="ok mono">'+IC('check-circle')+'TUYA</span>':'<button class="b buy'+(can?' can':'')+'" data-u="'+u.id+'"'+(next?'':' aria-disabled="true"')+'>'+IF('coins')+u.cost+'</button>')+'</div>'; }).join('')+'</div>'+
   '<button class="b wide" data-m="jobs">'+IC('timer')+'Ganar monedas: trabajos con reloj</button><button class="b wide" data-m="reps">'+IC('wrench')+'Ganar monedas: reparaciones</button>');
  wireM();
  $$('.buy').forEach(b=>b.onclick=()=>{ const u=UP.find(x=>x.id===b.dataset.u); const nx=UP.find(x=>!S.shop.includes(x.id));
    if(nx.id!==u.id) return toast('Primero compra: '+nx.n);
    if(S.coins<u.cost) return toast('Te faltan '+(u.cost-S.coins)+' monedas. ¡Atiende trabajos!');
    S.coins-=u.cost; S.shop.push(u.id); save(); coinHud(); sfx('jack',.6); setTimeout(()=>sfx('success',.5),350);
    vShop(); scrollTo(0,0); const w=$('.ws'); if(w) w.classList.add('upg'); toast('¡Nueva mejora: '+u.n+'!'); say('Compraste '+u.n); });
}

/* ---------------- 2. TRABAJOS CON RELOJ ---------------- */
const JOBS=[
 {id:'flat',who:'lopez',a:'sc-flat-a',en:'Hello. I have a flat tire.',es:'Hola. Tengo una llanta pinchada.',part:'tire',tool:'tool-lugwrench',ok:'I will change the tire.',oes:'Voy a cambiar la llanta.'},
 {id:'brakes',who:'brown',a:'sc-brakes-a',en:'Good afternoon. The brakes squeak when I stop.',es:'Buenas tardes. Los frenos chillan cuando paro.',part:'brakepad',tool:'tool-ratchet',ok:'I will replace the brake pads.',oes:'Voy a cambiar las pastillas de freno.'},
 {id:'battery',who:'sofia',a:'sc-battery-a',en:"Help! My car won't start.",es:'¡Ayuda! Mi carro no arranca.',part:'battery',tool:'tool-multimeter',ok:'I will test the battery.',oes:'Voy a probar la batería.'},
 {id:'light',who:'tom',a:'sc-light-a',en:'The light on the dashboard is on.',es:'La luz del tablero está encendida.',part:'checkengine',tool:'tool-scanner',ok:'I will read the fault codes.',oes:'Voy a leer los códigos de falla.'},
 {id:'heat',who:'brown',a:'sc-heat-a',en:'Hello. My engine is very hot.',es:'Hola. Mi motor está muy caliente.',part:'coolanttank',tool:'tool-funnel',ok:'I will add coolant.',oes:'Voy a echar refrigerante.'},
 {id:'spongy',who:'tom',a:'sc-spongy-a',en:'Hi. My brake pedal goes to the floor.',es:'Hola. El pedal del freno se va hasta el piso.',part:'brakefluid',tool:'tool-bleederkit',ok:'I will bleed the brakes.',oes:'Voy a purgar los frenos.'},
 {id:'alt',who:'lopez',a:'sc-alt-a',en:'Good morning. The battery light is on.',es:'Buenos días. El testigo de la batería está encendido.',part:'alternator',tool:'tool-multimeter',ok:'I will test the alternator.',oes:'Voy a probar el alternador.'},
 {id:'lamp',who:'brown',a:'job-lamp-q',en:'My headlight does not work.',es:'Mi farola no funciona.',part:'headlight',tool:'tool-screwdriver',ok:'I will change the bulb.',oes:'Voy a cambiar el bombillo.'},
 {id:'misfire',who:'brown',a:'job-misfire-q',en:'The engine shakes and misfires.',es:'El motor vibra y falla.',part:'sparkplug',tool:'tool-sparkplugsocket',ok:'I will change the spark plugs.',oes:'Voy a cambiar las bujías.'},
 {id:'press',who:'brown',a:'job-press-q',en:'The tire pressure light is on.',es:'El testigo de presión de las llantas está encendido.',part:'tire',tool:'tool-tiregauge',ok:'I will check the tire pressure.',oes:'Voy a revisar la presión de las llantas.'}];
JOBS.forEach(j=>j.oa='job-'+j.id+'-c');
const JT=60; let J=null, tick=null;
const AVI=w=>'preview/img/av-'+w+'.webp';
function pick(pool,correct,n){ return shuffle([correct].concat(shuffle(pool.filter(x=>x!==correct)).slice(0,n-1))); }
function vJobs(){ stopTimer();
  app('<div class="ph1"><h1 class="lbl">Trabajos con reloj</h1><span class="coinpill mono">'+IF('coins')+S.coins+'</span></div>'+
   '<p class="mutl">Llega un carro con un daño. Escucha al cliente, encuentra la pieza, escoge la herramienta y confirma en inglés antes de que se acabe el tiempo ('+JT+' s). Rápido y sin errores = 5 estrellas.</p>'+
   '<div class="jobl">'+JOBS.map((j,i)=>{ const best=S.jobs[j.id]||0, c=CHARS[j.who];
     return '<button class="cust job" data-j="'+j.id+'"><img src="'+AVI(j.who)+'" alt="" width="64" height="64"><span class="info"><span class="mono no">TRABAJO '+String(i+1).padStart(2,'0')+'</span><span class="t" lang="en">“'+esc(j.en)+'”</span><span class="s">'+esc(c.name)+'</span>'+rev(best)+'</span>'+IC('timer')+'</button>'; }).join('')+'</div>');
  $$('[data-j]').forEach(b=>b.onclick=()=>startJob(b.dataset.j));
}
const rev=n=>'<span class="rev" aria-label="'+n+' de 5 estrellas">'+[1,2,3,4,5].map(i=>i<=n?IF('star'):IC('star')).join('')+'</span>';
function stopTimer(){ if(tick){ clearInterval(tick); tick=null; } }
function startJob(id){ const j=JOBS.find(x=>x.id===id);
  const parts=JOBS.map(x=>x.part).concat(['engine','wheel','radiatorcap','oilcap','exhaust','caliper','fuelfilter','belt']).filter((v,i,a)=>a.indexOf(v)===i&&item(v));
  const tools=ITEMS.filter(i=>i.set==='tool').map(i=>i.id);
  const oks=JOBS.map(x=>x.ok).filter((v,i,a)=>a.indexOf(v)===i);
  J={j,step:0,miss:0,t0:Date.now(),left:JT,po:pick(parts,j.part,4),to:pick(tools,j.tool,4),so:pick(oks,j.ok,3),done:false};
  go('job'); }
function jobHead(){ const j=J.j, c=CHARS[j.who];
  return '<div class="jtop"><div class="clock'+(J.left<=15?' low':'')+'" role="timer" aria-label="Tiempo"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.5" class="tr"/><circle cx="18" cy="18" r="15.5" class="fg" style="stroke-dashoffset:'+(97.4*(1-J.left/JT))+'"/></svg><b class="mono" id="jLeft">'+J.left+'</b></div>'+
   '<div class="jsteps">'+['Pieza','Herramienta','Confirma'].map((s,i)=>'<span class="'+(i<J.step?'done':i===J.step?'on':'')+'">'+(i<J.step?IC('check'):(i+1))+' '+s+'</span>').join('')+'</div></div>'+
   '<div class="bubble2"><img src="'+AVI(j.who)+'" alt="" width="56" height="56"><div><b>'+esc(c.name)+'</b><p lang="en">'+esc(j.en)+'</p><details class="es"><summary>Ayuda en español</summary>'+esc(j.es)+'</details></div><button class="b sm" id="jPlay" aria-label="Escuchar al cliente">'+IC('speaker-high')+'</button></div>'; }
function vJob(){ const j=J.j; let body='';
  if(J.step===0) body='<h2 class="lbl q">'+IC('magnifying-glass')+'What is the problem? · ¿Qué pieza tiene la falla?</h2><div class="opts2">'+J.po.map(id=>{ const it=item(id), th=(window.GE_THUMB||{})[it.set];
      return '<button class="opt pick" data-v="'+id+'">'+'<span class="wi">'+(window.WARN_ICON&&it.set==='warn'?WARN_ICON(id,34):IC('gear-six'))+'</span>'+'<span lang="en">'+esc(it.en)+'</span></button>'; }).join('')+'</div>';
  else if(J.step===1) body='<div class="chip mono">'+IC('check-circle')+esc(item(j.part).en)+'</div><h2 class="lbl q">'+IC('toolbox')+'Which tool? · ¿Qué herramienta usas?</h2><div class="opts2">'+J.to.map(id=>'<button class="opt pick" data-v="'+id+'">'+IC('wrench')+'<span lang="en">'+esc(item(id).en)+'</span></button>').join('')+'</div>';
  else body='<div class="chip mono">'+IC('check-circle')+esc(item(j.part).en)+' · '+esc(item(j.tool).en)+'</div><h2 class="lbl q">'+IC('chat-circle-text')+'Tell the customer · Dile al cliente</h2><div class="opts2 one">'+J.so.map(s=>'<button class="opt pick" data-v="'+esc(s)+'"><span lang="en">'+esc(s)+'</span></button>').join('')+'</div>';
  app('<div class="ph1"><h1 class="lbl">Trabajo con reloj</h1><button class="b sm" id="jQuit">'+IC('x')+'Salir</button></div>'+jobHead()+body);
  $('#jPlay').onclick=()=>play(j.a,j.en); $('#jQuit').onclick=()=>{ stopTimer(); go('jobs'); };
  $$('.pick').forEach(b=>b.onclick=()=>answer(b));
  if(!tick){ tick=setInterval(()=>{ if(view!=='job'){ stopTimer(); return; } J.left=Math.max(0,JT-Math.round((Date.now()-J.t0)/1000)); const l=$('#jLeft'); if(l) l.textContent=J.left;
    const fg=$('.clock .fg'); if(fg) fg.style.strokeDashoffset=97.4*(1-J.left/JT); if(J.left<=15) $('.clock')&&$('.clock').classList.add('low');
    if(J.left===10) sfx('error',.25); if(J.left<=0) endJob(true); },250); }
}
function answer(b){ const j=J.j, v=b.dataset.v, want=[j.part,j.tool,j.ok][J.step];
  if(v===want){ b.classList.add('right'); sfx(J.step===1?'wrench':'success',.5); buzz(30);
    if(J.step===0) play(j.part,item(j.part).en); else if(J.step===1) play(j.tool,item(j.tool).en); else play(j.oa,j.ok);
    review(J.step===0?j.part:j.tool,true); logEv('job',j.id,true,'step'+J.step);
    setTimeout(()=>{ if(view!=='job') return; J.step++; if(J.step>2) endJob(false); else vJob(); },650); }
  else { J.miss++; b.classList.add('wrong'); b.disabled=true; sfx('error',.4); buzz([40,40,40]); logEv('job',j.id,false,'step'+J.step); if(J.step<2) review(want,false); toast('Intenta otra vez'); }
}
function endJob(timeout){ stopTimer(); const used=Math.round((Date.now()-J.t0)/1000);
  let st=timeout?1:5-Math.min(3,J.miss)-(used>40?1:0)-(used>25&&J.miss>0?0:0); st=Math.max(1,Math.min(5,st));
  const coins=timeout?5:10+st*5;
  const best=S.jobs[J.j.id]||0; if(st>best) S.jobs[J.j.id]=st; pay(coins); gain(st*6); dailyTick('scene'); setStars('job-'+J.j.id,Math.min(3,Math.ceil(st/2)));
  J.res={st,coins,used,timeout}; go('jobend'); }
const QUOTES=[['Too slow. I am not happy.','Muy lento. No estoy contento.'],['It is OK, but it took a long time.','Está bien, pero se demoró mucho.'],['Good job. Thank you.','Buen trabajo. Gracias.'],['Very good! Fast and clear.','¡Muy bien! Rápido y claro.'],['Excellent! The best workshop in town!','¡Excelente! ¡El mejor taller de la ciudad!']];
function vJobEnd(){ const r=J.res, j=J.j, c=CHARS[j.who], q=QUOTES[r.st-1];
  app('<div class="ph1"><h1 class="lbl">Reseña del cliente</h1><span class="coinpill mono">'+IF('coins')+S.coins+'</span></div>'+
   '<section class="review st'+r.st+'"><img src="'+AVI(j.who)+'" alt="" width="84" height="84"><div class="rv">'+rev(r.st)+'</div><p class="quote" lang="en">“'+q[0]+'”</p><p class="mutl">'+q[1]+' — '+esc(c.name)+'</p>'+
   '<div class="rstats"><span>'+IC('timer')+(r.timeout?'Se acabó el tiempo':r.used+' s')+'</span><span>'+IC('x-circle')+J.miss+' errores</span><span class="gold">'+IF('coins')+'+'+r.coins+'</span></div></section>'+
   '<button class="b big wide pri2" id="jNext">'+IC('arrow-right')+'Siguiente trabajo</button><button class="b wide" data-m="shop">'+IC('storefront')+'Mejorar mi taller</button><button class="b wide" data-m="jobs">'+IC('list')+'Todos los trabajos</button>');
  if(r.st>=4){ sfx('engine',.4); confetti(); } wireM();
  $('#jNext').onclick=()=>{ const i=JOBS.indexOf(j); startJob(JOBS[(i+1)%JOBS.length].id); };
}

/* ---------------- 3. REPARACIONES PASO A PASO ---------------- */
const H=(id,x,y,en)=>({id,x,y,en});
const REPS=[
 {id:'tyre',n:'Cambiar una llanta',en:'Change a tyre',img:'rep-tyre.webp',hs:[H('nuts',51.1,43.9,'lug nuts'),H('jack',24.4,57.3,'jack'),H('tire',51.1,74,'wheel')],
  steps:[['Loosen the lug nuts.','Afloja las tuercas de la rueda.','tool-lugwrench','nuts'],['Lift the car with the jack.','Levanta el carro con el gato.','tool-jack','jack'],['Remove the lug nuts.','Quita las tuercas.','tool-lugwrench','nuts'],['Remove the wheel.','Quita la rueda.','tool-gloves','tire'],['Tighten the lug nuts with the torque wrench.','Aprieta las tuercas con el torquímetro.','tool-torquewrench','nuts']]},
 {id:'pads',n:'Cambiar las pastillas de freno',en:'Replace the brake pads',img:'rep-brakes.webp',hs:[H('bolt',78.6,16.8,'caliper bolt'),H('caliper',88.4,48.6,'brake caliper'),H('pads',73.9,67.7,'brake pads'),H('disc',39,35,'brake disc')],
  steps:[['Remove the caliper bolts.','Quita los tornillos de la mordaza.','tool-ratchet','bolt'],['Remove the caliper.','Quita la mordaza.','tool-prybar','caliper'],['Check the brake pads.','Revisa las pastillas de freno.','tool-worklight','pads'],['Replace the brake pads.','Cambia las pastillas de freno.','tool-gloves','pads'],['Check the brake disc.','Revisa el disco de freno.','tool-mirror','disc']]},
 {id:'oil',n:'Cambiar aceite y filtro',en:'Change the oil and filter',img:'rep-oil.webp',hs:[H('pan',49.8,72.9,'drain pan'),H('plug',28.1,40.3,'drain plug'),H('filter',64.2,36.5,'oil filter')],
  steps:[['Put the drain pan under the car.','Pon el recipiente debajo del carro.','tool-drainpan','pan'],['Remove the drain plug.','Quita el tapón del cárter.','tool-socketset','plug'],['Remove the old oil filter.','Quita el filtro de aceite viejo.','tool-pliers','filter'],['Install the new oil filter.','Instala el filtro de aceite nuevo.','tool-gloves','filter'],['Tighten the drain plug.','Aprieta el tapón del cárter.','tool-torquewrench','plug']]},
 {id:'batt',n:'Cambiar la batería',en:'Replace the battery',img:'rep-battery.webp',hs:[H('neg',74.7,24.3,'negative terminal'),H('pos',26.9,24.3,'positive terminal'),H('clamp',51.8,50.3,'hold-down clamp'),H('body',41,69.4,'battery')],
  steps:[['Disconnect the negative terminal.','Desconecta el borne negativo.','tool-wrench','neg'],['Disconnect the positive terminal.','Desconecta el borne positivo.','tool-wrench','pos'],['Remove the hold-down clamp.','Quita la abrazadera de la batería.','tool-ratchet','clamp'],['Install the new battery.','Instala la batería nueva.','tool-gloves','body'],['Test the battery with the multimeter.','Prueba la batería con el multímetro.','tool-multimeter','body']]}];
REPS.forEach(r=>r.steps.forEach((s,i)=>s.a='rep-'+r.id+'-'+(i+1)));
let RP=null;
function vReps(){
  app('<div class="ph1"><h1 class="lbl">Reparaciones paso a paso</h1><span class="coinpill mono">'+IF('coins')+S.coins+'</span></div><p class="mutl">Don Jorge te da cada instrucción en inglés. Toca la herramienta correcta y después la pieza en la foto.</p>'+
   '<div class="repl">'+REPS.map(r=>{ const d=S.reps[r.id]||0; return '<button class="rep" data-r="'+r.id+'"><img src="'+PIMG(r.img)+'" alt="" loading="lazy"><span class="info"><b class="lbl" lang="en">'+esc(r.en)+'</b><small>'+esc(r.n)+' · '+r.steps.length+' pasos</small>'+(d?'<span class="ok mono">'+IC('check-circle')+'HECHA ×'+d+'</span>':'<span class="new mono">+40 '+IF('coins')+'</span>')+'</span></button>'; }).join('')+'</div>');
  $$('[data-r]').forEach(b=>b.onclick=()=>{ const r=REPS.find(x=>x.id===b.dataset.r);
    const all=r.steps.map(s=>s[2]).filter((v,i,a)=>a.indexOf(v)===i); const extra=shuffle(ITEMS.filter(i=>i.set==='tool'&&!all.includes(i.id)).map(i=>i.id)).slice(0,Math.max(2,6-all.length));
    RP={r,i:0,tool:null,miss:0,tray:shuffle(all.concat(extra))}; go('rep'); });
}
function vRep(){ const r=RP.r, s=r.steps[RP.i];
  app('<div class="ph1"><h1 class="lbl" lang="en">'+esc(r.en)+'</h1><button class="b sm" id="rQuit">'+IC('x')+'Salir</button></div>'+
   '<div class="rprog" aria-label="Paso '+(RP.i+1)+' de '+r.steps.length+'">'+r.steps.map((x,i)=>'<span class="'+(i<RP.i?'done':i===RP.i?'on':'')+'"></span>').join('')+'</div>'+
   '<div class="instr"><img src="'+AVI('jorge')+'" alt="" width="48" height="48"><div><span class="mono">PASO '+(RP.i+1)+' / '+r.steps.length+'</span><p lang="en">'+esc(s[0])+'</p><details class="es"><summary>Ayuda en español</summary>'+esc(s[1])+'</details></div><button class="b sm" id="rPlay" aria-label="Escuchar la instrucción">'+IC('speaker-high')+'</button></div>'+
   '<p class="hint mono" id="rHint">'+(RP.tool?'2 · AHORA TOCA LA PIEZA EN LA FOTO':'1 · ESCOGE LA HERRAMIENTA')+'</p>'+
   '<div class="rphoto'+(RP.tool?' arm':'')+'"><img src="'+PIMG(r.img)+'" alt="" width="1024" height="576">'+r.hs.map(h=>'<button class="hs" data-h="'+h.id+'" style="left:'+h.x+'%;top:'+h.y+'%" aria-label="'+esc(h.en)+'"><span></span></button>').join('')+'</div>'+
   '<div class="tray" role="group" aria-label="Herramientas">'+RP.tray.map(id=>'<button class="tl'+(RP.tool===id?' on':'')+'" data-t="'+id+'" aria-pressed="'+(RP.tool===id)+'">'+IC('wrench')+'<span lang="en">'+esc(item(id).en)+'</span></button>').join('')+'</div>');
  $('#rPlay').onclick=()=>play(s.a,s[0]); $('#rQuit').onclick=()=>go('reps');
  $$('.tl').forEach(b=>b.onclick=()=>{ const id=b.dataset.t;
    if(id!==s[2]){ RP.miss++; b.classList.add('wrong'); sfx('error',.4); buzz([40,40,40]); play(id,item(id).en); toast('Esa no es. Escucha otra vez: '+s[0]); return; }
    RP.tool=id; sfx('wrench',.5); play(id,item(id).en); $$('.tl').forEach(x=>{x.classList.toggle('on',x===b); x.setAttribute('aria-pressed',x===b);}); $('.rphoto').classList.add('arm'); $('#rHint').textContent='2 · AHORA TOCA LA PIEZA EN LA FOTO'; });
  $$('.hs').forEach(b=>b.onclick=()=>{ if(!RP.tool){ toast('Primero escoge la herramienta'); $('.tray').classList.add('nudge'); setTimeout(()=>$('.tray')&&$('.tray').classList.remove('nudge'),600); return; }
    if(b.dataset.h!==s[3]){ RP.miss++; b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'),500); sfx('error',.4); buzz([40,40,40]); toast('Esa pieza no. '+s[0]); return; }
    b.classList.add('right'); sfx(/jack/.test(s[2])?'jack':'wrench',.6); buzz(30); logEv('repair',r.id,true,'step'+(RP.i+1));
    setTimeout(()=>{ if(view!=='rep') return; RP.i++; RP.tool=null; if(RP.i>=r.steps.length) finishRep(); else { vRep(); play(r.steps[RP.i].a,r.steps[RP.i][0]); } },700); });
}
function finishRep(){ const r=RP.r; S.reps[r.id]=(S.reps[r.id]||0)+1; const coins=Math.max(20,40-RP.miss*4); pay(coins); gain(30); setStars('rep-'+r.id,RP.miss===0?3:RP.miss<3?2:1);
  app('<div class="ph1"><h1 class="lbl">¡Reparación lista!</h1><span class="coinpill mono">'+IF('coins')+S.coins+'</span></div><section class="review st5"><img src="'+PIMG(r.img)+'" alt="" class="wide"><p class="quote" lang="en">Good work! The job is done.</p><p class="mutl">¡Buen trabajo! El trabajo está listo. — Don Jorge</p>'+
   '<div class="rstats"><span>'+IC('list-checks')+r.steps.length+' pasos</span><span>'+IC('x-circle')+RP.miss+' errores</span><span class="gold">'+IF('coins')+'+'+coins+'</span><span class="gold">+30 XP</span></div></section>'+
   '<button class="b big wide pri2" data-m="reps">'+IC('wrench')+'Otra reparación</button><button class="b wide" data-m="shop">'+IC('storefront')+'Mejorar mi taller</button>');
  sfx('engine',.4); confetti(); wireM(); }

/* ---------------- shared ---------------- */
function confetti(){ if(matchMedia('(prefers-reduced-motion: reduce)').matches) return; const box=document.createElement('div'); box.className='cf12'; box.setAttribute('aria-hidden','true');
  for(let i=0;i<36;i++){ const p=document.createElement('i'); p.style.left=Math.random()*100+'%'; p.style.background=['#FFC83D','#3DF59A','#4DA3FF','#FF4FD8','#FF7A1A'][i%5]; p.style.animationDelay=(Math.random()*.4)+'s'; box.appendChild(p); }
  document.body.appendChild(box); setTimeout(()=>box.remove(),1800); }
function wireM(){ $$('[data-m]').forEach(b=>b.onclick=()=>{ const m=b.dataset.m; go(m==='shop'?'shop':m); }); }
const V={shop:vShop,jobs:vJobs,job:vJob,jobend:vJobEnd,reps:vReps,rep:vRep};
const _render=render; render=function(){ if(V[view]){ V[view](); hud(); coinHud(); return; } _render(); coinHud(); };
/* home: Mi taller first */
const _vHome=vHome; vHome=function(){ _vHome(); if(!S.seenIntro) return; const w=$('#app .wo'); if(w) w.insertAdjacentHTML('afterend',heroCard()); else $('#app').insertAdjacentHTML('afterbegin',heroCard());
  $$('.mt-b').forEach(b=>b.onclick=()=>go(b.dataset.m)); };
/* customers page: timed jobs entry */
const _vCust=vCustomers; vCustomers=function(){ _vCust(); const h=$('#app .ph1'); if(h) h.insertAdjacentHTML('afterend','<a class="b big wide c2 tolink" href="preview/taller.html#trabajos">'+IC('timer')+'Trabajos con reloj · gana monedas</a>'); };
const _vGames=vGames; vGames=function(){ _vGames(); const h=$('#app .ph1'); if(h) h.insertAdjacentHTML('afterend','<a class="b big wide c3 tolink" href="preview/taller.html#reparar">'+IC('wrench')+'Reparaciones paso a paso</a>'); };
coinHud();
const HM={mitaller:'shop',trabajos:'jobs',reparar:'reps'};
const hh=location.hash.slice(1); if(PAGE_IS_HOME()&&HM[hh]) go(HM[hh]); else render();
window.addEventListener('hashchange',()=>{ const k=location.hash.slice(1); if(HM[k]) go(HM[k]); });
function PAGE_IS_HOME(){ return (document.body.dataset.page||'home')==='home'; }
window.GE12={JOBS,REPS,UP};
})();
