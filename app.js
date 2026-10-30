'use strict';
/* Garage English v3 — game + learning loop. No accounts; progress in localStorage. */
const {items:ITEMS,WORKSHOP,DLG,STORY,SCENES,TEST,CHARS,GOALS,IMG}=window.DATA;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
const today=()=>new Date().toISOString().slice(0,10);
const byId=id=>ITEMS.find(i=>i.id===id);
const SETS={out:{n:'🚗 Por fuera',t:'YOUR CAR',img:IMG.car,need:0,map:1},in:{n:'🚪 Por dentro',t:'INSIDE YOUR CAR',img:IMG.inside,need:3,map:2},tool:{n:'🧰 Herramientas',t:'YOUR TOOLS',img:null,need:6,map:3}};
const RANKS=[[0,'🔧 Aprendiz'],[200,'🪛 Ayudante'],[600,'🛠️ Mecánico'],[1200,'🏆 Jefe de taller']];
const BOXDAYS=[0,0,1,3,7,14];

/* ---------- Audio: audio/<id>.mp3, browser voice as backup ---------- */
let cur=null; const missing=new Set();
function stopAll(){ try{speechSynthesis.cancel();}catch(e){} if(cur){cur.pause();cur=null;} }
function tts(t,r){ try{const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=r||1;speechSynthesis.speak(u);}catch(e){} }
function hasMp3(id){ const ok=window.AUDIO_OK; return id&&!missing.has(id)&&(ok==='all'||(Array.isArray(ok)&&ok.includes(id))); }
function play(id,text,rate){ stopAll(); rate=rate||1;
  if(hasMp3(id)){ const a=new Audio('audio/'+id+'.mp3'); a.playbackRate=rate; a.preservesPitch=true; cur=a;
    const fb=()=>{ if(cur===a){ missing.add(id); tts(text,rate);} }; a.onerror=fb; a.play().catch(fb); return; }
  tts(text,rate); }

/* ---------- State ---------- */
const KEY='garageEnglish.v3';
const FRESH={name:'',pts:0,streak:0,best:0,stars:{},learned:{},box:{},log:[],days:[],tests:{},daily:{},seenIntro:false};
let S; try{S=Object.assign({},FRESH,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){S=Object.assign({},FRESH);}
function save(){ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} hud(); }
if(!S.days.includes(today())) S.days.push(today());
const totalStars=()=>Object.values(S.stars).reduce((a,b)=>a+b,0);
function setStars(k,n){ if((S.stars[k]||0)<n){S.stars[k]=n;save();} }
function rank(){ let r=RANKS[0],nx=null; RANKS.forEach((x,i)=>{if(S.pts>=x[0]){r=x;nx=RANKS[i+1]||null;}}); return {r,nx}; }
function hud(){ const {r,nx}=rank(); $('#hRank').textContent=r[1]; $('#hStars').textContent=totalStars(); $('#hStreak').textContent=S.streak;
  $('#hXp').style.width=(nx?(S.pts-r[0])/(nx[0]-r[0])*100:100)+'%'; }
function gain(n,msg){ const b=rank().r; S.pts+=n; save(); if(rank().r!==b) toast('🎉 ¡Subiste a '+rank().r[1]+'!'); else if(msg) toast(msg); }
function logEv(type,item,ok,extra){ S.log.push({d:new Date().toISOString(),type,item,ok:ok?1:0,extra:extra||''}); if(S.log.length>3000) S.log.shift(); }
// Spaced review (Leitner boxes)
function review(id,ok){ const b=S.box[id]||{b:1,due:0}; b.b=ok?Math.min(5,b.b+1):1; b.due=Date.now()+BOXDAYS[b.b]*864e5; S.box[id]=b; }
const dueList=()=>Object.entries(S.box).filter(([id,b])=>b.due<=Date.now()&&b.b<5&&byId(id)).sort((a,b)=>a[1].b-b[1].b).map(([id])=>byId(id));
const missedList=()=>Object.entries(S.box).filter(([,b])=>b.b<=2).map(([id])=>byId(id)).filter(Boolean);
function toast(t){ const el=$('#toast'); el.textContent=t; el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),1700); }
function say(t){ $('#live').textContent=t; }
function buzz(p){ try{navigator.vibrate&&navigator.vibrate(p);}catch(e){} }
const unlocked=s=>totalStars()>=SETS[s].need;
const daily=()=>S.daily[today()]||(S.daily[today()]={learn:0,game:0,scene:0,done:false});
function dailyTick(k){ const d=daily(); d[k]++; if(!d.done&&d.learn>=5&&d.game>=1&&d.scene>=1){ d.done=true; setStars('day-'+today(),1); gain(50); toast('📋 ¡Orden de trabajo completa! +1 ⭐ +50'); } save(); }

/* ---------- Router ---------- */
let view='home', args={};
function go(v,a){ stopAll(); view=v; args=a||{}; $$('nav button').forEach(b=>b.setAttribute('aria-current',(b.dataset.v===v||(v==='scene'&&b.dataset.v==='customers')||(['game','boss','test'].includes(v)&&b.dataset.v==='games'))?'page':'false')); render(); scrollTo(0,0); $('#app').focus({preventScroll:true}); }
$$('nav button').forEach(b=>b.onclick=()=>go(b.dataset.v));
const app=html=>{$('#app').innerHTML=html;};
function render(){ ({home:vHome,intro:vIntro,learn:vLearn,games:vGames,game:vGame,boss:vGame,customers:vCustomers,scene:vScene,me:vMe,test:vTest,reception:vReception}[view]||vHome)(); hud(); }
const charLine=(who,en,es,aid)=>{const c=CHARS[who]||{emoji:'🧑',name:''}; return '<div class="bubble '+(['jorge','camila'].includes(who)?'m':'c')+'"><div class="who"><span class="av" aria-hidden="true">'+c.emoji+'</span><div><b>'+esc(c.name)+':</b> <span lang="en">'+esc(en)+'</span> <button class="btn" data-play="'+aid+'" data-text="'+esc(en)+'" aria-label="Escuchar">🔊</button><div class="mut">🇪🇸 '+esc(es)+'</div></div></div></div>';};
function wirePlay(){ $$('[data-play]').forEach(b=>b.onclick=()=>play(b.dataset.play,b.dataset.text,+(b.dataset.rate||1))); }

/* ---------- Intro (first run): story + name + pre-test ---------- */
function vIntro(){
  app('<h1>🏁 Tu primer día en el taller</h1><div class="stripe"></div>'+STORY.map(s=>charLine(s.who,s.en,s.es,s.a)).join('')+
  '<div class="panel"><label for="nm"><b>¿Cómo te llamas?</b> <span class="mut">(para el reporte de tu profe)</span></label><input type="text" id="nm" autocomplete="given-name" value="'+esc(S.name)+'">'+
  '<p class="mut">Primero, una prueba corta de 10 preguntas para ver qué sabes. No pasa nada si no sabes: ¡para eso vienes al taller!</p><button class="big-btn" id="go">📝 Hacer la prueba inicial</button><button class="btn" style="width:100%" id="skip">Saltar por ahora</button></div>');
  wirePlay(); play(STORY[0].a,STORY[0].en);
  const fin=t=>{S.name=$('#nm').value.trim();S.seenIntro=true;save();t?go('test',{kind:'pre'}):go('home');};
  $('#go').onclick=()=>fin(true); $('#skip').onclick=()=>fin(false);
}
function vReception(){
  app('<h1>🏁 Así se juega</h1><div class="panel"><img src="'+IMG.posters[0]+'" alt="Así vas a aprender: ve, oye, di, usa" style="width:100%;border-radius:12px"><p><b>1 · VE</b> la parte · <b>2 · OYE</b> cómo se dice · <b>3 · DI</b> en voz alta · <b>4 · USA</b> con el cliente.</p></div>'+
  '<div class="panel"><img src="'+IMG.posters[1]+'" alt="Reglas del juego" style="width:100%;border-radius:12px"><p>❤️ Los errores no se castigan: vuelven en el 🔁 repaso. ⭐ Las estrellas abren nuevas secciones. 👨‍🔧 Cada sección termina con el reto del Jefe de taller.</p></div>'+
  '<button class="big-btn" onclick="go(\'intro\')">▶ Ver la historia otra vez</button>');
}

/* ---------- Home: map + daily work order ---------- */
function setCount(s){ const l=ITEMS.filter(i=>i.set===s); return [l.filter(i=>S.learned[i.id]).length,l.length]; }
function vHome(){
  if(!S.seenIntro) return vIntro();
  const d=daily(), due=dueList().length, ts=totalStars();
  const task=(ok,txt,btn,act)=>'<li class="'+(ok?'done':'')+'"><span aria-hidden="true">'+(ok?'✅':'⬜')+'</span> '+txt+(ok?'':' <button class="btn pri" data-act="'+act+'">'+btn+'</button>')+'</li>';
  const sec=[['reception','1 · RECEPTION','Cómo se juega',0]].concat(Object.entries(SETS).map(([k,s])=>[k,(s.map+1)+' · '+s.t,s.n,s.need]));
  const locked=[['5 · YOUR ENGINE',4],['6 · YOUR CLUTCH',5],['7 · YOUR BRAKES',6],['8 · YOUR ELECTRICITY',7]];
  app('<h1>🏭 Taller de '+esc(S.name||'aprendiz')+'</h1>'+
   '<div class="panel"><h2>📋 Orden de trabajo de hoy</h2><ul class="order" style="padding:0">'+
   task(d.learn>=5,'Practica 5 partes ('+Math.min(5,d.learn)+'/5)'+(due?' · <span class="badge">🔁 '+due+' para repasar</span>':''),'Ir','learn')+
   task(d.game>=1,'Juega 1 ronda','Jugar','games')+task(d.scene>=1,'Atiende 1 cliente','Atender','customers')+
   '</ul>'+(d.done?'<p style="color:var(--ok);font-weight:900">✅ ¡Orden completa! Vuelve mañana para mantener tu racha 📅.</p>':'<p class="mut">Completa las 3 tareas: +1 ⭐</p>')+'</div><div class="stripe"></div>'+
   sec.map(([k,t,s,need])=>{ const isSet=SETS[k]; const open=!isSet||unlocked(k); const img=IMG.map[k==='reception'?0:k==='customers'?8:SETS[k].map];
     let pc=''; if(isSet&&open){const [a,b]=setCount(k);pc='<div class="pc">'+a+'/'+b+' ✓ · Jefe: '+'★'.repeat(S.stars['boss-'+k]||0)+'☆'.repeat(3-(S.stars['boss-'+k]||0))+'</div>';}
     return '<button class="mapcard'+(open?'':' locked')+'" data-k="'+k+'"><img src="'+img+'" alt=""><div><div class="t">'+(open?'':'🔒 ')+t+'</div><div class="s">'+s+(open?'':' · necesitas '+need+' ⭐ (tienes '+ts+')')+'</div>'+pc+'</div></button>'; }).join('')+
   locked.map(([t,i])=>'<div class="mapcard locked" aria-disabled="true"><img src="'+IMG.map[i]+'" alt=""><div><div class="t">🚧 '+t+'</div><div class="s">En construcción · próximamente</div></div></div>').join('')+'<button class="mapcard" data-k="customers"><img src="'+IMG.map[8]+'" alt=""><div><div class="t">9 · YOUR CUSTOMER</div><div class="s">Clientes con problemas</div></div></button>');
  $$('[data-act]').forEach(b=>b.onclick=()=>go(b.dataset.act));
  $$('button.mapcard').forEach(b=>b.onclick=()=>{const k=b.dataset.k; if(k==='reception')return go('reception'); if(k==='customers')return go('customers');
    if(!unlocked(k)) return toast('🔒 Necesitas '+SETS[k].need+' ⭐. Gánalas en juegos, clientes y retos.'); go('learn',{set:k});});
}

/* ---------- Learn ---------- */
let learnSet='out'; const sel={};
function vLearn(){
  if(args.set) learnSet=args.set; if(!unlocked(learnSet)) learnSet='out';
  const list=ITEMS.filter(i=>i.set===learnSet); const p=byId(sel[learnSet])||list[0]; sel[learnSet]=p.id;
  const seg='<div class="seg" role="group" aria-label="Sección">'+Object.entries(SETS).map(([k,s])=>'<button aria-pressed="'+(learnSet===k)+'" data-set="'+k+'"'+(unlocked(k)?'':' aria-disabled="true"')+'>'+(unlocked(k)?'':'🔒 ')+s.n+'</button>').join('')+'</div>';
  let stage=''; const img=SETS[learnSet].img;
  if(img) stage='<div class="stage"><img src="'+img+'" alt="'+(learnSet==='out'?'Carro rojo visto de lado':'Interior del carro')+'; la parte '+esc(p.en)+' está marcada con un círculo">'+p.hs.map((h,i)=>'<div class="ring" style="left:'+h[0]+'%;top:'+h[1]+'%"></div>'+(i?'':'<div class="tag" style="left:'+Math.min(80,Math.max(20,h[0]))+'%;top:'+h[1]+'%">'+esc(p.en)+'</div>')).join('')+'</div>';
  if(p.id==='wiper') stage+='<img src="'+IMG.wiper+'" alt="Limpiaparabrisas de cerca" style="width:100%;border-radius:12px;margin-top:8px">';
  const [a,b]=setCount(learnSet); const due=dueList().filter(i=>i.set===learnSet);
  app(seg+'<details class="panel"><summary><b>🎯 Metas de esta sección</b></summary>'+GOALS[learnSet].map(g=>'<div class="goal">✔ '+esc(g)+'</div>').join('')+'</details>'+
   (due.length?'<button class="btn pri" style="width:100%" id="rv">🔁 Repasar '+due.length+' palabras que fallaste</button>':'')+
   '<div class="qhead"><span>'+a+' / '+b+' aprendidas</span><span>'+(list.indexOf(p)+1)+' de '+list.length+'</span></div><div class="pbar"><div style="width:'+(a/b*100)+'%"></div></div>'+stage+
   '<div class="chips" aria-label="Partes">'+list.map((x,i)=>'<button class="'+(x.id===p.id?'on':'')+'" data-id="'+x.id+'" aria-current="'+(x.id===p.id)+'">'+(i+1)+'. '+esc(x.en)+(S.learned[x.id]?' <span class="ck" aria-label="aprendida">✓</span>':'')+'</button>').join('')+'</div>'+
   '<div class="panel"><div class="mut">🇪🇸 '+esc(p.es)+'</div><div class="word" lang="en">'+esc(p.en)+'</div><div class="syl" id="syl" aria-hidden="true">'+(p.syl||[]).map(s=>'<span>'+esc(s)+'</span>').join(' ')+'</div>'+
   (p.tip?'<div class="tip">🗣 '+esc(p.tip)+'</div>':'')+
   '<div class="row"><button class="btn pri" id="bN">🔊 Escuchar</button><button class="btn" id="bS">🐢 Lento</button><button class="btn" id="bM">🎤 Decirlo</button></div><div class="fb" id="sfb" aria-live="polite"></div>'+
   p.sents.map(s=>'<div class="sent"><div class="en" lang="en">'+esc(s.en)+'</div><div class="mut">🇪🇸 '+esc(s.es)+'</div>'+(s.say?'<div class="say">'+esc(s.say)+'</div>':'')+'<button class="btn" data-play="'+s.a+'" data-text="'+esc(s.en)+'" data-rate=".95">🔊 Frase</button></div>').join('')+
   (learnSet==='out'?'<div class="tip">💡 <b>TH</b> (this, the): pon la lengua entre los dientes. No es “d”.</div>':'')+
   '<button class="big-btn" id="bDone">'+(S.learned[p.id]?'✓ Ya la dije · Siguiente →':'✅ ¡La dije en voz alta! +10')+'</button>'+
   (b===a?'<button class="big-btn" style="background:var(--orange)" id="boss">👨‍🔧 Reto del Jefe de taller</button>':'<p class="mut">Aprende las '+b+' para abrir el 👨‍🔧 reto del Jefe (o entra ya desde Jugar).</p>')+'</div>');
  wirePlay();
  $$('.seg button').forEach(x=>x.onclick=()=>{ if(!unlocked(x.dataset.set)) return toast('🔒 Necesitas '+SETS[x.dataset.set].need+' ⭐'); args={}; learnSet=x.dataset.set; render(); });
  $$('.chips button').forEach(x=>x.onclick=()=>{sel[learnSet]=x.dataset.id;render();hear(1);});
  const on=$('.chips .on'); if(on) on.scrollIntoView({inline:'center',block:'nearest'});
  function hear(r){ const q=byId(sel[learnSet]); play(q.a,q.en,r); const sp=$$('#syl span'); sp.forEach((s,i)=>setTimeout(()=>{sp.forEach(z=>z.classList.remove('on'));s.classList.add('on');},300+i*550/r)); setTimeout(()=>sp.forEach(z=>z.classList.remove('on')),300+sp.length*550/r+400); }
  $('#bN').onclick=()=>hear(1); $('#bS').onclick=()=>hear(.7);
  if($('#rv')) $('#rv').onclick=()=>startGame('review',learnSet);
  if($('#boss')) $('#boss').onclick=()=>startGame('boss',learnSet);
  $('#bM').onclick=()=>mic(p.en,r=>{ const f=$('#sfb'); if(!r){f.className='fb bad';f.textContent='Tu navegador no tiene micrófono: dilo 3 veces en voz alta.';return;} f.className='fb '+(r[0]?'ok':'bad'); f.textContent=r[0]?'✓ ¡Perfecto! Dijiste: '+r[1]:'✗ Oí: “'+r[1]+'”. Intenta otra vez.'; logEv('speak',p.id,r[0],r[1]); if(r[0]) gain(5,'🎤 +5'); save(); });
  $('#bDone').onclick=()=>{ if(!S.learned[p.id]){S.learned[p.id]=1;gain(10,'+10');logEv('learn',p.id,1);} dailyTick('learn'); const i=list.indexOf(p); sel[learnSet]=list[(i+1)%list.length].id; render(); hear(1); };
}
function mic(target,cb){ const R=window.SpeechRecognition||window.webkitSpeechRecognition; if(!R) return cb(null); const r=new R(); r.lang='en-US';
  const n=s=>s.toLowerCase().replace(/[^a-z ]/g,'').trim(); r.onresult=e=>{const t=e.results[0][0].transcript; cb([n(t)===n(target),t]);}; r.onerror=()=>cb([false,'…']); try{r.start(); $('#sfb').textContent='🎤 Escuchando…';}catch(e){cb(null);} }

/* ---------- Games ---------- */
const GAMES=[['listen','🎧','Escucha y toca','Oye y elige la palabra'],['spot','🎯','Encuéntrala','Toca la parte en la foto'],['match','🧩','Español → English','Lee y elige en inglés'],['order','🔩','Arma la frase','Ordena las piezas'],['review','🔁','Repaso','Las que fallaste']];
let G=null, gameSet='out';
function vGames(){
  if(!unlocked(gameSet)) gameSet='out';
  const due=dueList().length;
  app('<h1>🎮 Juegos del taller</h1><div class="seg" role="group" aria-label="Sección">'+Object.entries(SETS).map(([k,s])=>'<button aria-pressed="'+(gameSet===k)+'" data-set="'+k+'">'+(unlocked(k)?'':'🔒 ')+s.n+'</button>').join('')+'</div>'+
   '<div class="gamegrid">'+GAMES.filter(g=>g[0]!=='spot'||SETS[gameSet].img).map(g=>{const best=S.stars['g-'+g[0]+'-'+gameSet]||0; return '<button class="gcard" data-g="'+g[0]+'"><span class="ic" aria-hidden="true">'+g[1]+'</span><b>'+g[2]+'</b><small>'+g[3]+(g[0]==='review'?' ('+due+')':'')+'</small><span class="best">'+(best?'★'.repeat(best)+'☆'.repeat(3-best):'¡Nuevo!')+'</span></button>';}).join('')+'</div>'+
   '<button class="big-btn" style="background:var(--orange);margin-top:14px" id="boss">👨‍🔧 Reto del Jefe de taller · '+SETS[gameSet].n+' '+'★'.repeat(S.stars['boss-'+gameSet]||0)+'</button>'+
   '<button class="btn" style="width:100%" id="post">📝 Prueba final (10 preguntas)</button>');
  $$('.seg button').forEach(b=>b.onclick=()=>{ if(!unlocked(b.dataset.set)) return toast('🔒 Necesitas '+SETS[b.dataset.set].need+' ⭐'); gameSet=b.dataset.set; render(); });
  $$('.gcard').forEach(b=>b.onclick=()=>startGame(b.dataset.g,gameSet));
  $('#boss').onclick=()=>startGame('boss',gameSet); $('#post').onclick=()=>go('test',{kind:S.tests.pre?'post':'pre'});
}
function uniq(list){ const u=[]; list.forEach(p=>{if(p&&!u.some(x=>x.en===p.en))u.push(p);}); return u; }
function startGame(kind,set){
  const pool=ITEMS.filter(i=>i.set===set); let qs;
  if(kind==='review'){ const d=dueList(), m=missedList(); qs=uniq(d.concat(m)).slice(0,8).map(p=>({p,t:'match'})); if(!qs.length){toast('🎉 No tienes palabras para repasar. ¡Bien!');return;} }
  else if(kind==='order'){ const src=pool.flatMap(p=>p.sents.slice(1).map(s=>({en:s.en,es:s.es,a:s.a}))).concat(set==='tool'?pool.map(p=>({...p.sents[0]})):[]).concat(WORKSHOP.map(w=>({en:w.en,es:w.es,a:w.a})));
    qs=shuffle(src.filter(s=>s.en.split(' ').length<=8)).slice(0,8).map(s=>({s,t:'order'})); }
  else if(kind==='boss'){ const types=SETS[set].img?['listen','match','spot']:['listen','match','sent']; qs=shuffle(pool).slice(0,10).map((p,i)=>({p,t:types[i%types.length]})); }
  else qs=shuffle(pool).slice(0,8).map(p=>({p,t:kind}));
  G={kind,set,qs,i:0,score:0,lives:kind==='boss'?3:99,locked:false};
  go(kind==='boss'?'boss':'game');
  if(kind==='boss'){ app('<div class="panel">'+charLine('jorge','Show me what you know. Ten questions, three wrenches.','Muéstrame lo que sabes. Diez preguntas, tres llaves.','boss-intro')+'<button class="big-btn" id="st">🔧 ¡Listo, jefe!</button></div>'); wirePlay(); play('boss-intro','Show me what you know. Ten questions, three wrenches.'); $('#st').onclick=()=>renderQ(); }
}
function vGame(){ if(!G) return go('games'); renderQ(); }
function ok(itemId){ G.score++; S.streak++; S.best=Math.max(S.best,S.streak); const bonus=S.streak>=3?5:0; if(itemId){review(itemId,true);} logEv(G.kind,itemId||'',1); gain(10+bonus,bonus?'🔥 Racha x'+S.streak+' +'+(10+bonus):null); buzz(30); say('Correcto'); }
function bad(itemId){ S.streak=0; if(itemId) review(itemId,false); logEv(G.kind,itemId||'',0); if(G.kind==='boss') G.lives--; save(); buzz([60,40,60]); say('Incorrecto'); }
function next(ms){ G.locked=true; setTimeout(()=>{ if(!G)return; G.i++; G.locked=false; renderQ(); }, ms||1000); }
function head(){ return '<div class="qhead"><button class="btn" id="quit" aria-label="Salir">✕</button><span style="align-self:center">'+(G.kind==='boss'?'👨‍🔧 Jefe · ':'')+(G.i+1)+' / '+G.qs.length+'</span><span style="align-self:center" class="lives" aria-label="'+(G.kind==='boss'?G.lives+' vidas':G.score+' correctas')+'">'+(G.kind==='boss'?'🔧'.repeat(Math.max(0,G.lives))+'<span style="opacity:.25">'+'🔧'.repeat(3-Math.max(0,G.lives))+'</span>':'✓ '+G.score)+'</span></div><div class="pbar"><div style="width:'+(G.i/G.qs.length*100)+'%"></div></div>'; }
function choices(q,set){ return shuffle([q,...shuffle(ITEMS.filter(x=>x.en!==q.en&&x.set===(set||q.set))).slice(0,3)]); }
function renderQ(){
  if(!G) return; if(G.i>=G.qs.length||G.lives<=0) return endGame();
  const {p,t,s}=G.qs[G.i]; let h=head()+'<div class="panel">';
  if(t==='listen'||t==='match'||t==='sent'){
    const opts=choices(p);
    if(t==='listen') h+='<p class="mut" style="text-align:center">¿Qué palabra oyes?</p><button class="big-btn" id="pl">🔊 Escuchar otra vez</button>';
    else if(t==='match') h+='<p class="mut" style="text-align:center">¿Cómo se dice en inglés?</p><div class="prompt">🇪🇸 '+esc(p.es)+'</div>';
    else h+='<p class="mut" style="text-align:center">Completa la frase:</p><div class="prompt" lang="en" style="font-size:20px">'+esc(p.sents[0].en.replace(new RegExp(p.en,'i'),'____'))+'</div><div class="mut" style="text-align:center">🇪🇸 '+esc(p.sents[0].es)+'</div>';
    h+='<div class="opts">'+opts.map(o=>'<button class="opt" lang="en" data-en="'+esc(o.en)+'">'+esc(o.en)+'</button>').join('')+'</div><div class="fb" id="fb" aria-live="polite"></div></div>';
    app(h); wireQuit();
    if(t==='listen'){ const pl=()=>play(p.a,p.en); $('#pl').onclick=pl; pl(); }
    $$('.opt').forEach(b=>b.onclick=()=>{ if(G.locked)return; const fb=$('#fb');
      if(b.dataset.en===p.en){ b.classList.add('right'); fb.className='fb ok'; fb.textContent='✓ ¡Bien! '+p.en+' = '+p.es; ok(p.id); play(p.a,p.en); next(1100); }
      else { b.classList.add('wrong'); b.disabled=true; fb.className='fb bad'; fb.textContent='✗ Eso es “'+b.dataset.en+'”. Intenta otra vez.'; bad(p.id); if(G.lives<=0) next(900); else if(G.kind==='boss') renderLives(); } });
  } else if(t==='spot'){
    const img=SETS[p.set].img;
    app(h+'<p class="mut" style="text-align:center">Toca en la foto:</p><div class="prompt" lang="en">'+esc(p.en)+' <button class="btn" id="pl" aria-label="Escuchar">🔊</button></div><div class="stage" id="stg" style="cursor:crosshair"><img src="'+img+'" alt="Foto: toca dónde está '+esc(p.en)+', o usa la lista de abajo"></div><div class="fb" id="fb" aria-live="polite"></div>'+
     '<details><summary class="mut">No puedo tocar la foto: usar lista</summary><div class="opts">'+choices(p).map(o=>'<button class="opt" data-id="'+o.id+'" lang="en">'+esc(o.en)+'</button>').join('')+'</div></details></div>');
    wireQuit(); const pl=()=>play(p.a,p.en); $('#pl').onclick=pl; pl();
    const judge=good=>{ if(G.locked)return; const fb=$('#fb'); p.hs.forEach(hh=>$('#stg').insertAdjacentHTML('beforeend','<div class="ring" style="left:'+hh[0]+'%;top:'+hh[1]+'%"></div>'));
      if(good){fb.className='fb ok';fb.textContent='✓ ¡Exacto! Ahí está: '+p.es+'.';ok(p.id);next(1300);} else {fb.className='fb bad';fb.textContent='✗ No. Mira el círculo: ahí está.';bad(p.id);next(1900);} };
    $('#stg').onclick=e=>{ const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100,k=r.height/r.width;
      const all=ITEMS.filter(i=>i.set===p.set).flatMap(i=>i.hs.map(hh=>[i.id,Math.hypot(hh[0]-x,(hh[1]-y)*k)])).sort((a,b)=>a[1]-b[1]);
      const mine=Math.min(...p.hs.map(hh=>Math.hypot(hh[0]-x,(hh[1]-y)*k))); judge(all[0][0]===p.id||mine<6); };
    $$('details .opt').forEach(b=>b.onclick=()=>judge(b.dataset.id===p.id));
  } else if(t==='order'){
    const words=s.en.split(' '); if(!s.tiles){ let tl; do{tl=shuffle(words.map((w,i)=>({w,i})));}while(words.length>1&&tl.every((x,k)=>x.i===k)); s.tiles=tl; s.built=[]; }
    app(h+'<p class="mut">Arma la frase en inglés:</p><div class="prompt" style="font-size:20px">🇪🇸 '+esc(s.es)+'</div><div class="slots" aria-label="Tu frase">'+s.built.map((k,j)=>'<button class="tile" data-k="'+j+'" lang="en" aria-label="Quitar '+esc(s.tiles[k].w)+'">'+esc(s.tiles[k].w)+'</button>').join('')+'</div>'+
     '<div class="bank">'+s.tiles.map((tl,k)=>'<button class="tile'+(s.built.includes(k)?' used':'')+'" data-t="'+k+'" lang="en"'+(s.built.includes(k)?' tabindex="-1" aria-hidden="true"':'')+'>'+esc(tl.w)+'</button>').join('')+'</div><div class="fb" id="fb" aria-live="polite"></div><div class="row"><button class="btn" id="hint">💡 Escuchar</button><button class="btn pri" id="chk">✔ Revisar</button></div></div>');
    wireQuit();
    $$('.bank .tile').forEach(b=>b.onclick=()=>{ if(G.locked||s.built.includes(+b.dataset.t))return; s.built.push(+b.dataset.t); renderQ(); });
    $$('.slots .tile').forEach(b=>b.onclick=()=>{ if(G.locked)return; s.built.splice(+b.dataset.k,1); renderQ(); });
    $('#hint').onclick=()=>play(s.a,s.en,.85);
    $('#chk').onclick=()=>{ if(G.locked)return; const got=s.built.map(k=>s.tiles[k].w).join(' '), fb=$('#fb');
      if(got===s.en){fb.className='fb ok';fb.textContent='✓ ¡Frase armada! 🔩';ok(null);play(s.a,s.en,.95);next(1600);}
      else {fb.className='fb bad';fb.textContent=s.built.length<words.length?'Faltan piezas.':'✗ Casi. Escucha la pista y vuelve a intentar.';bad(null);} };
  }
}
function renderLives(){ const l=$('.lives'); if(l) l.innerHTML='🔧'.repeat(Math.max(0,G.lives))+'<span style="opacity:.25">'+'🔧'.repeat(3-Math.max(0,G.lives))+'</span>'; }
function wireQuit(){ $('#quit').onclick=()=>{G=null;go('games');}; }
function endGame(){
  const n=G.qs.length,sc=G.score, boss=G.kind==='boss';
  const st=boss?(G.lives<=0?0:sc>=9?3:sc>=7?2:1):(sc>=n-1?3:sc>=n/2?2:1);
  const key=boss?'boss-'+G.set:'g-'+G.kind+'-'+G.set; const prev=S.stars[key]||0; setStars(key,st); gain(st*10); dailyTick('game');
  const kind=G.kind,set=G.set;
  const msg=boss?(st===0?['jorge','Not yet. Practice and come back!','Todavía no. ¡Practica y vuelve!','boss-fail']:st===3?['jorge','Excellent work! You are a real mechanic.','¡Excelente trabajo! Eres un mecánico de verdad.','boss-win']:['jorge','Good job. You can do better!','Buen trabajo. ¡Puedes hacerlo mejor!','boss-ok']):null;
  app('<div class="panel end"><h2>'+(st===3?'🏆 ¡Trabajo perfecto!':st===2?'🔧 ¡Buen trabajo!':st===1?'🛠️ Sigue practicando':'🔧 Se acabaron las llaves')+'</h2>'+(msg?charLine(...msg):'')+'<div class="stars" aria-label="'+st+' de 3 estrellas">'+'★'.repeat(st)+'<span style="opacity:.25">'+'★'.repeat(3-st)+'</span></div><p>'+sc+' / '+n+' correctas</p>'+(st>prev?'<p style="color:var(--amber);font-weight:900">¡+'+(st-prev)+' ⭐ nuevas! Total: '+totalStars()+'</p>':'')+
   (missedList().length?'<p class="mut">Las que fallaste vuelven en 🔁 Repaso.</p>':'')+'<button class="big-btn" id="again">🔁 Otra vez</button><button class="btn" style="width:100%" id="back">Volver a juegos</button></div>');
  wirePlay(); if(msg) play(msg[3],msg[1]);
  $('#again').onclick=()=>startGame(kind,set); $('#back').onclick=()=>{G=null;go('games');}; G=null;
}

/* ---------- Customers: branching breakdown scenes + quick dialogue ---------- */
let SC=null;
function vCustomers(){
  const ts=totalStars();
  app('<h1>🧑‍🔧 Clientes de hoy</h1><p class="mut">Cada cliente trae un daño. Elige bien lo que dices: el cliente se pone feliz… o no.</p>'+
   '<div class="panel">'+GOALS.customer.map(g=>'<div class="goal">🎯 '+esc(g)+'</div>').join('')+'</div>'+
   SCENES.map(sc=>{const c=CHARS[sc.client],open=ts>=sc.stars,st=S.stars['sc-'+sc.id]||0; return '<button class="mapcard'+(open?'':' locked')+'" data-sc="'+sc.id+'"><span style="font-size:56px;width:92px;text-align:center" aria-hidden="true">'+c.emoji+'</span><div><div class="t">'+(open?'':'🔒 ')+esc(sc.title)+'</div><div class="s">'+esc(c.name)+' · '+esc(c.role)+(open?'':' · necesitas '+sc.stars+' ⭐')+'</div><div class="pc">'+'★'.repeat(st)+'☆'.repeat(3-st)+'</div></div></button>';}).join('')+
   '<button class="mapcard" data-sc="quick"><span style="font-size:56px;width:92px;text-align:center" aria-hidden="true">💬</span><div><div class="t">Simulacro rápido</div><div class="s">8 turnos con un cliente · frases del taller</div><div class="pc">'+'★'.repeat(S.stars['sc-quick']||0)+'</div></div></button>');
  $$('[data-sc]').forEach(b=>b.onclick=()=>{ const id=b.dataset.sc;
    if(id==='quick'){ SC={quick:true,i:0,good:0,total:0,hist:[]}; return go('scene'); }
    const sc=SCENES.find(x=>x.id===id); if(totalStars()<sc.stars) return toast('🔒 Necesitas '+sc.stars+' ⭐');
    SC={sc,node:'a',good:0,total:0,mood:50,hist:[]}; go('scene'); });
}
function quickAsScene(){ const d=DLG[SC.i]; if(!d) return null; return {who:'lopez',en:d.custEn,es:d.custEs,a:d.ac,opts:d.opts.map((o,j)=>{const w=WORKSHOP.find(x=>x.en===o)||{}; return {en:o,es:w.es||'',a:w.a||d.am,q:j===d.correct?'good':'bad',fb:j===d.correct?'':'Esa respuesta no encaja. Escucha otra vez al cliente.'};})}; }
function vScene(){
  if(!SC) return go('customers');
  const node=SC.quick?quickAsScene():SC.sc.nodes[SC.node];
  if(!node) return sceneEnd();
  const mood=SC.quick?Math.round(SC.i/DLG.length*100):SC.mood;
  app('<h1>'+(SC.quick?'💬 Simulacro rápido':esc(SC.sc.title))+'</h1><div class="qhead"><span>Cliente</span><span aria-hidden="true">'+(mood<35?'😠':mood<65?'😐':'😊')+'</span></div><div class="meter" role="meter" aria-label="Satisfacción del cliente" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+mood+'"><div style="width:'+mood+'%"></div></div>'+
   SC.hist.join('')+charLine(node.who,node.en,node.es,node.a)+'<p><b>¿Qué dices tú?</b></p><div class="opts">'+node.opts.map((o,j)=>'<button class="opt" data-j="'+j+'"><span lang="en">'+esc(o.en)+'</span></button>').join('')+'</div><div class="fb" id="fb" aria-live="polite"></div>');
  wirePlay(); play(node.a,node.en,.95);
  $$('.opt').forEach(b=>b.onclick=()=>{ if(SC.lock) return; const o=node.opts[+b.dataset.j], fb=$('#fb'); SC.total++;
    logEv('scene',(SC.quick?'quick':SC.sc.id)+':'+(SC.quick?SC.i:SC.node),o.q==='good',o.q);
    if(o.q==='bad'){ b.classList.add('wrong'); b.disabled=true; fb.className='fb bad'; fb.textContent='🧑‍🔧 '+(o.fb||'Intenta otra vez.'); if(!SC.quick) SC.mood=Math.max(0,SC.mood-15); S.streak=0; save(); buzz([60,40,60]); return; }
    b.classList.add('right'); fb.className='fb '+(o.q==='good'?'ok':'bad'); fb.textContent=o.q==='good'?'✓ ¡Así habla un mecánico!':'🤔 '+o.fb;
    if(o.q==='good'){SC.good++; S.streak++; gain(10);} if(!SC.quick) SC.mood=Math.min(100,SC.mood+(o.q==='good'?17:5));
    play(o.a,o.en,.95); SC.lock=true;
    SC.hist.push(charLine(node.who,node.en,node.es,node.a)+'<div class="bubble m"><div class="who"><span class="av" aria-hidden="true">🧑‍🔧</span><div><b>Tú:</b> <span lang="en">'+esc(o.en)+'</span></div></div></div>');
    setTimeout(()=>{ SC.lock=false; if(SC.quick) SC.i++; else SC.node=o.next; vScene(); window.scrollTo(0,document.body.scrollHeight); },1700);
  });
}
function sceneEnd(){
  const ratio=SC.good/Math.max(1,SC.total), st=ratio>=.9?3:ratio>=.6?2:1, key='sc-'+(SC.quick?'quick':SC.sc.id);
  const prev=S.stars[key]||0; setStars(key,st); gain(st*15); dailyTick('scene');
  app('<div class="panel end"><h2>🏆 ¡Carro reparado!</h2><div class="stars" aria-label="'+st+' de 3 estrellas">'+'★'.repeat(st)+'<span style="opacity:.25">'+'★'.repeat(3-st)+'</span></div><p>'+SC.good+' respuestas perfectas de '+SC.total+' intentos.</p>'+(st>prev?'<p style="color:var(--amber);font-weight:900">+'+(st-prev)+' ⭐ nuevas</p>':'')+
   '<button class="big-btn" id="again">🔁 Repetir</button><button class="btn" style="width:100%" id="back">Otro cliente</button></div>');
  const again=SC.quick?{quick:true,i:0,good:0,total:0,hist:[]}:{sc:SC.sc,node:'a',good:0,total:0,mood:50,hist:[]};
  $('#again').onclick=()=>{SC=again;vScene();}; $('#back').onclick=()=>{SC=null;go('customers');};
}

/* ---------- Pre / post test ---------- */
let T=null;
function testItem(t){ if(t.t==='sentence') return {prompt:t.en,es:t.es,ans:t.ans,opts:shuffle(t.opts),a:t.a,full:t.en.replace('____',t.ans)};
  const p=byId(t.ref); return {p,ans:p.en,opts:choices(p).map(o=>o.en),a:p.a}; }
function vTest(){
  if(!T||T.kind!==args.kind) T={kind:args.kind||'pre',i:0,ans:[],items:TEST.map(testItem)};
  if(T.i>=T.items.length){ const sc=T.ans.filter(x=>x).length; S.tests[T.kind]={score:sc,date:new Date().toISOString(),answers:T.ans.map(x=>x?1:0)}; logEv('test-'+T.kind,'total',sc>=7,sc+'/10'); gain(20); save();
    const pre=S.tests.pre, post=S.tests.post;
    app('<div class="panel end"><h2>📝 Prueba '+(T.kind==='pre'?'inicial':'final')+'</h2><div class="word">'+sc+' / 10</div>'+(T.kind==='post'&&pre?'<p>Antes: '+pre.score+'/10 → Ahora: '+sc+'/10 '+(sc>pre.score?'📈 ¡Mejoraste!':'')+'</p>':'<p>Ahora a aprender en el taller. Al final haz la prueba final y compara.</p>')+'<button class="big-btn" id="h">🏭 Ir al taller</button></div>'); T=null; $('#h').onclick=()=>go('home'); return; }
  const t=TEST[T.i], it=T.items[T.i];
  let h='<div class="qhead"><span>📝 Prueba '+(T.kind==='pre'?'inicial':'final')+'</span><span>'+(T.i+1)+' / 10</span></div><div class="pbar"><div style="width:'+(T.i*10)+'%"></div></div><div class="panel">';
  if(t.t==='listen') h+='<p class="mut" style="text-align:center">Escucha y elige:</p><button class="big-btn" id="pl">🔊 Escuchar</button>';
  if(t.t==='meaning') h+='<p class="mut" style="text-align:center">¿Cómo se dice en inglés?</p><div class="prompt">🇪🇸 '+esc(it.p.es)+'</div>';
  if(t.t==='sentence') h+='<p class="mut" style="text-align:center">Completa:</p><div class="prompt" lang="en" style="font-size:22px">'+esc(it.prompt)+'</div><div class="mut" style="text-align:center">🇪🇸 '+esc(it.es)+'</div>';
  app(h+'<div class="opts">'+it.opts.map(o=>'<button class="opt" lang="en" data-o="'+esc(o)+'">'+esc(o)+'</button>').join('')+'</div><p class="mut">En la prueba no se muestra si acertaste. ¡Haz tu mejor intento!</p></div>');
  if($('#pl')){ const pl=()=>play(it.a,it.ans); $('#pl').onclick=pl; pl(); }
  $$('.opt').forEach(b=>b.onclick=()=>{ const good=b.dataset.o===it.ans; T.ans.push(good); logEv('test-'+T.kind,t.ref||t.id,good,b.dataset.o); T.i++; vTest(); });
}

/* ---------- Progress + teacher CSV ---------- */
function dayStreak(){ let n=0; const d=new Date(); while(S.days.includes(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1);} return n; }
function csv(){
  const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  const rows=[['student','date','type','item','correct','detail']];
  S.log.forEach(e=>rows.push([S.name,e.d,e.type,e.item,e.ok,e.extra]));
  ['pre','post'].forEach(k=>{ if(S.tests[k]) rows.push([S.name,S.tests[k].date,'summary-test-'+k,'score',S.tests[k].score,S.tests[k].answers.join('')]); });
  Object.entries(S.stars).forEach(([k,v])=>rows.push([S.name,new Date().toISOString(),'summary-stars',k,v,'']));
  Object.keys(SETS).forEach(s=>{const [a,b]=setCount(s); rows.push([S.name,new Date().toISOString(),'summary-learned',s,a,'of '+b]);});
  rows.push([S.name,new Date().toISOString(),'summary-points','points',S.pts,'days='+dayStreak()]);
  return '\ufeff'+rows.map(r=>r.map(q).join(',')).join('\r\n');
}
function vMe(){
  const {r,nx}=rank(), pre=S.tests.pre, post=S.tests.post, miss=missedList();
  app('<h1>🏅 Tu progreso</h1><div class="panel"><div class="word" style="font-size:28px">'+r[1]+'</div><p>⭐ '+totalStars()+' estrellas · '+S.pts+' puntos'+(nx?' · faltan '+(nx[0]-S.pts)+' para '+nx[1]:'')+'</p><p>📅 Días seguidos: <b>'+dayStreak()+'</b> · 🔥 Mejor racha: <b>'+S.best+'</b></p></div>'+
   '<div class="panel"><h2>📝 Pruebas</h2><p>Inicial: '+(pre?pre.score+'/10':'—')+' · Final: '+(post?post.score+'/10':'—')+'</p><button class="btn pri" id="tp">'+(pre?'Hacer prueba final':'Hacer prueba inicial')+'</button></div>'+
   '<div class="panel"><h2>📚 Secciones</h2>'+Object.entries(SETS).map(([k,s])=>{const [a,b]=setCount(k);return '<p>'+s.n+': '+a+'/'+b+' · Jefe '+'★'.repeat(S.stars['boss-'+k]||0)+'☆'.repeat(3-(S.stars['boss-'+k]||0))+'</p><div class="pbar"><div style="width:'+(a/b*100)+'%"></div></div>';}).join('')+'</div>'+
   (miss.length?'<div class="panel"><h2>🔁 Para repasar</h2><p lang="en">'+miss.map(m=>esc(m.en)).join(' · ')+'</p></div>':'')+
   '<div class="panel"><h2>👩‍🏫 Para tu profe</h2><label for="nm">Tu nombre</label><input type="text" id="nm" value="'+esc(S.name)+'"><p class="mut">Descarga tu reporte y envíaselo a tu profe.</p><button class="big-btn" id="dl">⬇ Descargar reporte (CSV)</button></div>'+
   '<button class="btn" style="width:100%" id="intro">📖 Ver la historia y reglas</button><button class="btn" style="width:100%" id="rst">🗑 Borrar mi progreso</button><p class="mut">Tu progreso se guarda solo en este celular.</p>');
  $('#nm').onchange=e=>{S.name=e.target.value.trim();save();};
  $('#tp').onclick=()=>go('test',{kind:pre?'post':'pre'});
  $('#dl').onclick=()=>{ S.name=$('#nm').value.trim(); save(); const b=new Blob([csv()],{type:'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='garage-english_'+(S.name||'estudiante').replace(/\W+/g,'_')+'_'+today()+'.csv'; document.body.appendChild(a); a.click(); a.remove(); toast('⬇ Reporte descargado'); };
  $('#intro').onclick=()=>go('reception');
  $('#rst').onclick=()=>{ if(confirm('¿Borrar todo tu progreso?')){ localStorage.removeItem(KEY); S=JSON.parse(JSON.stringify(FRESH)); S.days=[today()]; save(); go('home'); } };
}

/* ---------- PWA (only when served over http/https) ---------- */
if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{});
go('home');
