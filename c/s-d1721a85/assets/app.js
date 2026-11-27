/* Tu espacio de español, Shannon · motor de lecciones (sin dependencias) */
(function(){
"use strict";
var KEY="shannon-es-v1";
var S; try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){S={}}
S.en=(S.en===undefined)?true:S.en; S.speed=S.speed||"n"; S.visited=S.visited||{}; S.done=S.done||{}; S.best=S.best||{}; S.srs=S.srs||{}; S.plan=S.plan||{}; S.checks=S.checks||{}; S.mission=S.mission||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
window.HWS={state:S,save:save};
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function h(tag,attrs,kids){var e=document.createElement(tag);if(attrs)for(var k in attrs){var v=attrs[k];if(v==null||v===false)continue;if(k==="class")e.className=v;else if(k==="html")e.innerHTML=v;else if(k.slice(0,2)==="on")e.addEventListener(k.slice(2),v);else e.setAttribute(k,v===true?"":v)}
 (kids||[]).forEach(function(c){if(c==null)return;e.appendChild(typeof c==="string"?document.createTextNode(c):c)});return e}
var ICON={play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
 stop:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>'};
var SPN={s:"Lento",n:"Normal",f:"Rápido"}, SPE={s:"Slow",n:"Normal",f:"Fast"};
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function live(msg){var r=$("#live");if(r){r.textContent="";setTimeout(function(){r.textContent=msg},30)}}
function markDone(id,info){if(!id)return;S.done[id]=Object.assign({at:Date.now()},info||{});save();updateDots()}

/* ---------- audio ---------- */
var A=new Audio(); A.preload="auto"; var curBtn=null, curEnd=null, curEl=null;
function stopAudio(){A.pause();clearBtn()}
function clearBtn(){if(curBtn){curBtn.classList.remove("on");curBtn.innerHTML=ICON.play;curBtn.setAttribute("aria-pressed","false")}if(curEl)curEl.classList.remove("playing");curBtn=null;curEl=null}
function play(id,sp,btn,el,onend){
 stopAudio(); curEnd=null;
 sp=sp||S.speed; A.src="audio/"+id+"-"+sp+".mp3";
 if(btn){curBtn=btn;btn.classList.add("on");btn.innerHTML=ICON.stop;btn.setAttribute("aria-pressed","true")}
 if(el){curEl=el;el.classList.add("playing")}
 curEnd=onend||null;
 var p=A.play(); if(p&&p.catch)p.catch(function(err){clearBtn();if(onend)onend(err)});
 return A;
}
A.addEventListener("ended",function(){clearBtn();var f=curEnd;curEnd=null;if(f)f()});
A.addEventListener("error",function(){clearBtn();var f=curEnd;curEnd=null;console.warn("audio error",A.src);if(f)f()});
function playBtn(item,opts){opts=opts||{};var b=h("button",{class:"play","aria-label":"Escuchar: "+item.es,"aria-pressed":"false",type:"button",html:ICON.play});
 b.addEventListener("click",function(ev){ev.stopPropagation();if(curBtn===b){stopAudio();return}play(item.a,opts.sp,b,opts.el)});return b}
function speedMinis(item,el){var w=h("div",{class:"speeds"});["s","n","f"].forEach(function(sp){w.appendChild(h("button",{class:"mini",type:"button","aria-label":SPN[sp]+": "+item.es,onclick:function(ev){ev.stopPropagation();play(item.a,sp,null,el)}},[sp==="s"?"🐢 Lento":sp==="n"?"Normal":"⚡ Rápido"]))});return w}

/* ---------- top bar (shared) ---------- */
function topbar(title){
 var tb=h("header",{class:"topbar"});
 tb.appendChild(h("a",{class:"brand",href:"index.html","aria-label":"Volver a mi espacio de español"},[h("b",null,["Español · Shannon"]),h("span",null,[title||"Tu espacio de español"])]));
 var sg=h("div",{class:"speed-group",role:"group","aria-label":"Velocidad del audio"});
 ["s","n","f"].forEach(function(sp){sg.appendChild(h("button",{type:"button","aria-pressed":String(S.speed===sp),title:SPE[sp],onclick:function(){S.speed=sp;save();$$("button",sg).forEach(function(x,i){x.setAttribute("aria-pressed",String(["s","n","f"][i]===sp))})}},[SPN[sp]]))});
 tb.appendChild(sg);
 var en=h("button",{class:"tb-btn",type:"button","aria-pressed":String(S.en),title:"Mostrar u ocultar el inglés (tecla E)",onclick:function(){setEn(!S.en);en.setAttribute("aria-pressed",String(S.en))}},["EN",h("span",{class:"label"},[" inglés"])]);
 tb.appendChild(en);
 if(document.documentElement.requestFullscreen){tb.appendChild(h("button",{class:"tb-btn",type:"button","aria-label":"Pantalla completa (tecla F)",title:"Pantalla completa (F)",onclick:toggleFS},["⛶"]))}
 document.body.prepend(tb);
 setEn(S.en);
}
function setEn(v){S.en=v;save();document.body.classList.toggle("hide-en",!v);var b=$(".topbar .tb-btn");if(b)b.setAttribute("aria-pressed",String(v))}
function toggleFS(){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(function(){})}
function T(es,en,cls){var f=document.createDocumentFragment();f.appendChild(h("span",{class:cls||""},[es]));return f}
var IMG={puerta:"img/leccion-1-puerta.jpg",cafe:"img/leccion-2-cafe-horas.jpg",taxi:"img/leccion-3-taxi-oaxaca.jpg",polaroid:"img/diagnostico-polaroid.jpg",mercado:"img/mercado-oaxaca.jpg",pesos:"img/pesos-macro.jpg",pase:"img/pase-abordar.jpg"};
var LHERO={"leccion-1":"puerta","leccion-2":"cafe","leccion-3":"taxi","practica-1":"pase","practica-2":"cafe","practica-3":"taxi"};
function pickImg(s){var k=(s.kicker||"").toLowerCase(),id=(L&&L.id)||"";
 if(s.img)return s.img;
 if(s.type==="speak")return LHERO[id]||"puerta";
 if(s.type==="numbers"||s.type==="numchoice")return "pesos";
 if(s.type==="numgrid")return /30–1,000|mil/.test(k)?"mercado":"pase";
 if(s.type==="plan"||s.type==="mission")return "mercado";
 if(s.type==="srs")return "polaroid";
 if(/puerta|anuncio|sala|salidas|cambios|hora/.test(k+(s.title||"").toLowerCase())&&id!=="leccion-3")return /hora|salidas/.test(k)?"cafe":"pase";
 if(/taxi|subir|viaje|llegar|historia/.test(k+(s.title||"").toLowerCase()))return id==="leccion-1"&&/historia/.test(k)?"puerta":"taxi";
 if(/pagar|tienda|caf/.test(k+(s.title||"").toLowerCase()))return "pesos";
 return LHERO[id]||"puerta"}
var POS={puerta:"57% 45%",cafe:"40% 55%",taxi:"55% 50%",polaroid:"50% 60%",mercado:"50% 40%",pesos:"50% 55%",pase:"60% 50%"};
function head(s){var key=pickImg(s);var d=h("div",{class:"slide-head"});
 var band=h("div",{class:"head-photo"});band.appendChild(h("img",{src:IMG[key],alt:"",style:"object-position:"+(POS[key]||"50% 50%"),"aria-hidden":"true"}));
 var tx=h("div",{class:"hp-txt"});tx.appendChild(h("div",{class:"kicker"},[s.kicker||""]));tx.appendChild(h("h2",null,[s.title]));if(s.en)tx.appendChild(h("div",{class:"en"},[s.en]));band.appendChild(tx);d.appendChild(band);
 if(s.body){d.appendChild(h("p",{class:"lead",html:s.body}));if(s.bodyEn)d.appendChild(h("p",{class:"lead en"},[s.bodyEn]))}return d}

/* ---------- renderers ---------- */
var R={};
R.cover=function(s,L){var c=h("section",{class:"cover"});var t=h("div",{class:"cv-txt"});
 t.appendChild(h("div",{class:"kicker"},[s.kicker]));t.appendChild(h("h1",{class:"display"},[s.title]));t.appendChild(h("div",{class:"sub en",style:"color:#f1e6df"},[s.en]));
 t.appendChild(h("div",{class:"kicker",style:"margin-top:1.4rem;color:var(--teal)"},["Hoy vas a poder…"]));
 var ul=h("ul");s.objectives.forEach(function(o){var li=h("li");li.appendChild(playBtn(o));li.appendChild(h("div",null,[h("div",{style:"font-weight:600"},[o.es]),h("div",{class:"en"},[o.en])]));ul.appendChild(li)});t.appendChild(ul);
 t.appendChild(h("div",{class:"day"},[L.day+" · 60 min · Google Meet"]));
 c.appendChild(t);var hp=HERO[L.id];var art=hp?h("div",{class:"art photo"},[h("img",{src:hp.src,alt:hp.alt,loading:"eager",decoding:"async",style:"object-position:"+hp.pos})]):h("div",{class:"art",html:ART[L.scene]||ART.mtn});c.appendChild(art);return c};
R.text=function(s){var w=h("div");w.appendChild(head(s));if(s.tips){var g=h("div",{class:"tips card"});s.tips.forEach(function(t){g.appendChild(h("div",{class:"tip"},[h("b",{"aria-hidden":"true"},[t[0]]),h("div",null,[h("div",null,[t[1]]),h("div",{class:"en"},[t[2]])])]))});w.appendChild(g)}return w};
R.chunks=function(s){var w=h("div");w.appendChild(head(s));var g=h("div",{class:"grid g2"});
 s.items.forEach(function(it,ix){var c=h("div",{class:"card chunk",role:"group","aria-label":it.es,style:"animation-delay:"+(ix*60)+"ms"});c.appendChild(h("span",{class:"idx","aria-hidden":"true"},[("0"+(ix+1)).slice(-2)]));var pb=playBtn(it,{el:c});c.appendChild(pb);
  var tx=h("div",{class:"txt"},[h("span",{class:"es-big",lang:"es"},[it.es]),h("span",{class:"en",lang:"en"},[it.en])]);if(it.note)tx.appendChild(h("div",{class:"cn"},[it.note]));tx.appendChild(speedMinis(it,c));c.appendChild(tx);
  c.addEventListener("click",function(){pb.click()});g.appendChild(c)});
 w.appendChild(g);if(s.note){w.appendChild(h("div",{class:"note",html:s.note+(s.noteEn?'<div class="en" style="margin-top:.3rem">'+s.noteEn+'</div>':"")}))}return w};
R.numgrid=function(s){var w=h("div");w.appendChild(head(s));var big=s.items.some(function(it){return it.n>=30&&it.n!==30})&&s.items[0].n>=30;var g=h("div",{class:"numgrid "+(big?"tags":"flaps")});
 s.items.forEach(function(it,ix){var b=h("button",{type:"button","aria-label":it.label+": "+it.es,style:"animation-delay:"+(ix*35)+"ms"},[h("b",null,big?[it.label]:String(it.label).split("").map(function(ch){return h("i",null,[ch])})),h("span",{lang:"es"},[it.es])]);b.addEventListener("click",function(){play(it.a,null,null,b)});g.appendChild(b)});
 w.appendChild(g);var all=h("button",{class:"btn line",type:"button",style:"margin-top:1rem"},["▶ Escuchar todos en orden"]);
 all.addEventListener("click",function(){var i=0,btns=$$("button",g);(function nx(){if(i>=s.items.length)return;var it=s.items[i],b=btns[i];i++;play(it.a,null,null,b,function(){setTimeout(nx,700)})})()});w.appendChild(all);return w};
function choiceGame(s,rounds,labelFn){ // rounds: [{audio:{a,es}, opts:[label], answer}]
 var w=h("div");w.appendChild(head(s));var box=h("div",{class:"card game"});w.appendChild(box);
 var i=0,ok=0,tries=0;var sp=s.speed||null;
 function render(){box.innerHTML="";
  if(i>=rounds.length){var pct=Math.round(ok/rounds.length*100);box.appendChild(h("div",{class:"result"},[h("div",{class:"badge"},[pct===100?"¡Oído perfecto!":pct>=75?"¡Muy bien!":"¡Buen comienzo!"]),h("div",{class:"en"},[pct===100?"Perfect ear!":pct>=75?"Very good!":"Good start!"]),
   h("div",{class:"nums"},[h("div",null,[h("b",null,[ok+"/"+rounds.length]),h("span",null,["a la primera"])])]),h("button",{class:"btn line",type:"button",onclick:function(){i=0;ok=0;rounds=shuffle(rounds);render()}},["↻ Otra vez"])]));
   markDone(s.id,{score:ok,total:rounds.length});if(ok===rounds.length)snow(box);live("Resultado: "+ok+" de "+rounds.length);return}
  var r=rounds[i];tries=0;
  box.appendChild(h("div",{class:"kicker"},["Ronda "+(i+1)+" de "+rounds.length]));
  var bp=h("button",{class:"play bigplay",type:"button","aria-label":"Escuchar","aria-pressed":"false",html:ICON.play});bp.addEventListener("click",function(){if(curBtn===bp){stopAudio();return}play(r.audio.a,sp,bp)});box.appendChild(bp);
  box.appendChild(h("div",{class:"en"},["Listen and choose"]));
  var fb=h("div",{class:"feedback",role:"status"});
  var os=h("div",{class:"opts flapopts"});r.opts.forEach(function(lab,k){var b=h("button",{class:"opt",type:"button"},[lab]);b.addEventListener("click",function(){if(b.disabled)return;tries++;
    if(k===r.answer){b.classList.add("ok");if(tries===1)ok++;fb.className="feedback ok";fb.textContent="¡Eso! "+(r.audio.es||"");$$(".opt",os).forEach(function(x){x.disabled=true});setTimeout(function(){i++;render()},1300)}
    else{b.classList.add("no");b.disabled=true;fb.className="feedback no";fb.textContent="Casi. Escucha otra vez.";play(r.audio.a,"s")}});os.appendChild(b)});
  box.appendChild(os);box.appendChild(fb);
  box.appendChild(h("div",{class:"statline"},[h("span",null,["Aciertos: ",h("b",null,[String(ok)])])]));
  setTimeout(function(){play(r.audio.a,sp,bp)},350);
 }
 var started=false;box.appendChild(h("button",{class:"btn big",type:"button",onclick:function(){started=true;rounds=shuffle(rounds);render()}},["▶ Empezar"]));
 return w}
R.numchoice=function(s){var rounds=s.rounds.map(function(r){var k=Math.floor(Math.random()*r.opts.length);return {audio:{a:r.opts[k].a,es:r.opts[k].es||""},opts:r.opts.map(function(o){return o.label}),answer:k}});
 // ensure es text for feedback
 rounds.forEach(function(r,idx){var o=s.rounds[idx].opts[r.answer];r.audio.es=o.label});
 return choiceGame(s,rounds)};
R.timechoice=function(s){var rounds=s.rounds.map(function(r){return {audio:{a:r.a,es:r.es},opts:r.opts,answer:r.ans}});return choiceGame(s,rounds)};
R.numbers=function(s){var w=h("div");w.appendChild(head(s));var box=h("div",{class:"card game"});w.appendChild(box);var sp=s.speed||null;
 var best=S.best[s.id];
 function intro(){box.innerHTML="";box.appendChild(h("div",{class:"kicker"},[s.count+" precios"+(sp==="f"?" · velocidad real":"")]));
  if(best)box.appendChild(h("p",{class:"statline"},[h("span",null,["Tu mejor promedio: ",h("b",null,[(best/1000).toFixed(1)+" s"])])]));
  box.appendChild(h("button",{class:"btn big",type:"button",onclick:start},["⏱ Empezar el sprint"]));box.appendChild(h("p",{class:"en",style:"margin-top:.6rem"},["Type the number you hear and press Enter."]))}
 var q,i,ok,times,t0,tick,misses;
 function start(){q=shuffle(s.pool).slice(0,s.count);while(q.length<s.count)q=q.concat(shuffle(s.pool)).slice(0,s.count);i=0;ok=0;times=[];misses=[];round()}
 function round(){clearInterval(tick);box.innerHTML="";if(i>=q.length)return finish();var it=q[i];var wrong=0;
  box.appendChild(h("div",{class:"kicker"},["Precio "+(i+1)+" de "+q.length]));
  var bp=h("button",{class:"play bigplay",type:"button","aria-label":"Escuchar otra vez","aria-pressed":"false",html:ICON.play});
  bp.addEventListener("click",function(){play(it.a,sp,bp)});box.appendChild(bp);
  var tm=h("div",{class:"timer","aria-hidden":"true"},["0.0 s"]);box.appendChild(h("div",{class:"meter","aria-hidden":"true"},[h("span",null,["Taxímetro"]),tm]));
  var form=h("form",{style:"margin-top:.6rem"});var inp=h("input",{class:"numin",type:"text",inputmode:"numeric",autocomplete:"off","aria-label":"Escribe el número que escuchas",placeholder:"$"});
  form.appendChild(inp);form.appendChild(h("div",null,[h("button",{class:"btn",type:"submit",style:"margin-top:.7rem"},["Revisar ↵"])]));box.appendChild(form);
  var fb=h("div",{class:"feedback",role:"status"});box.appendChild(fb);
  box.appendChild(h("div",{class:"statline"},[h("span",null,["Aciertos ",h("b",null,[String(ok)])]),h("span",null,["Ronda ",h("b",null,[(i+1)+"/"+q.length])])]));
  t0=null;play(it.a,sp,bp);A.addEventListener("playing",function once(){A.removeEventListener("playing",once);t0=performance.now();tick=setInterval(function(){tm.textContent=((performance.now()-t0)/1000).toFixed(1)+" s"},100)});
  setTimeout(function(){inp.focus()},50);
  form.addEventListener("submit",function(ev){ev.preventDefault();var v=parseInt(inp.value.replace(/[^0-9]/g,""),10);if(isNaN(v)){inp.focus();return}
   if(v===it.n){clearInterval(tick);var ms=t0?performance.now()-t0:0;if(wrong===0){ok++;times.push(ms)}fb.className="feedback ok";fb.textContent="¡Correcto! "+it.label+" · "+it.es+" · "+(ms/1000).toFixed(1)+" s";inp.disabled=true;setTimeout(function(){i++;round()},1200)}
   else{wrong++;if(wrong===1)misses.push(it);fb.className="feedback no";if(wrong>=2){fb.textContent="Era "+it.label+": "+it.es;clearInterval(tick);inp.disabled=true;play(it.a,"s");setTimeout(function(){i++;round()},2600)}else{fb.textContent="Casi. Escucha otra vez.";inp.select();play(it.a,"s",bp)}}})}
 function finish(){clearInterval(tick);var avg=times.length?times.reduce(function(a,b){return a+b},0)/times.length:0;var prev=S.best[s.id];var rec=false;
  if(times.length>=Math.ceil(q.length/2)&&avg&&(!prev||avg<prev)){S.best[s.id]=avg;best=avg;rec=!!prev||true;save()}
  var lvl=avg&&avg<=3000?["Velocidad nativa","Native speed"]:avg<=4500?["Muy rápida","Really fast"]:avg<=6500?["Vas muy bien","Doing great"]:["Calentando motores","Warming up"];
  box.innerHTML="";var r=h("div",{class:"result"},[h("div",{class:"kicker"},["Resultado"]),h("div",{class:"badge"},[lvl[0]]),h("div",{class:"en"},[lvl[1]]),
   h("div",{class:"nums"},[h("div",null,[h("b",null,[ok+"/"+q.length]),h("span",null,["a la primera"])]),h("div",null,[h("b",null,[avg?(avg/1000).toFixed(1)+" s":"–"]),h("span",null,["promedio"])]),h("div",null,[h("b",null,[S.best[s.id]?(S.best[s.id]/1000).toFixed(1)+" s":"–"]),h("span",null,["tu récord"])])])]);
  if(misses.length){r.appendChild(h("p",{style:"margin:.4rem 0 0;font-size:.9rem"},["Para repasar: "+misses.map(function(m){return m.label+" ("+m.es+")"}).join(" · ")]))}
  r.appendChild(h("button",{class:"btn line",type:"button",style:"margin-top:.9rem",onclick:start},["↻ Otra vez"]));box.appendChild(r);
  markDone(s.id,{score:ok,total:q.length,avg:Math.round(avg)});if(ok===q.length)snow(box);live("Resultado: "+ok+" de "+q.length+", promedio "+(avg/1000).toFixed(1)+" segundos")}
 intro();return w};
R.flip=function(s){var w=h("div");w.appendChild(head(s));var g=h("div",{class:"flips"});
 s.items.forEach(function(it){var b=h("button",{class:"flip",type:"button","aria-label":"Tarjeta: "+it.en+". Pulsa para voltear."});
  var inn=h("div",{class:"in"},[h("div",{class:"f"},[h("small",{style:"color:var(--orgD)"},["English"]),h("p",{lang:"en"},[it.en]),h("small",{style:"color:var(--mute)"},["Dilo en español · toca para voltear"])]),h("div",{class:"b"},[h("small",null,["Español"]),h("p",{lang:"es"},[it.es]),h("small",null,["▶ toca para escuchar"])])]);
  b.appendChild(inn);b.addEventListener("click",function(){var on=b.classList.toggle("on");if(on)play(it.a)});g.appendChild(b)});w.appendChild(g);return w};
function mcq(qs,id,host){var answered=0,correct=0;qs.forEach(function(q,qi){var d=h("div",{class:"q"});d.appendChild(h("div",{class:"qt"},[(qi+1)+". "+q.q]));d.appendChild(h("div",{class:"en"},[q.qEn]));
  var os=h("div",{class:"opts"});var fb=h("div",{class:"feedback",role:"status"});var first=true;
  q.options.forEach(function(o,k){var b=h("button",{class:"opt",type:"button"},[o]);b.addEventListener("click",function(){if(k===q.answer){b.classList.add("ok");$$(".opt",os).forEach(function(x){x.disabled=true});fb.className="feedback ok";fb.textContent="¡Correcto!";answered++;if(first)correct++;if(answered===qs.length){markDone(id,{score:correct,total:qs.length});if(correct===qs.length)snow(host)}}
   else{b.classList.add("no");b.disabled=true;first=false;fb.className="feedback no";fb.textContent="Escucha otra vez."}});os.appendChild(b)});d.appendChild(os);d.appendChild(fb);host.appendChild(d)})}
R.listen=function(s){var w=h("div");w.appendChild(head(s));var c=h("div",{class:"card ticket"});c.appendChild(h("div",{class:"stub","aria-hidden":"true"},[h("span",null,["Audio"]),h("b",null,["3"]),h("span",null,["velocidades"])]));var pl=h("div",{class:"player"});var spd=h("div",{class:"spd",role:"group","aria-label":"Escuchar a distintas velocidades"});
 ["s","n","f"].forEach(function(sp){var b=h("button",{type:"button","aria-label":"Escuchar "+SPN[sp]},[sp==="s"?"🐢 Lento":sp==="n"?"▶ Normal":"⚡ Rápido"]);b.addEventListener("click",function(){$$("button",spd).forEach(function(x){x.classList.remove("on")});b.classList.add("on");play(s.audio.a,sp,null,null,function(){b.classList.remove("on")})});spd.appendChild(b)});
 pl.appendChild(spd);c.appendChild(pl);
 var tr=h("div",{class:"transcript",hidden:true},[h("p",{lang:"es",style:"font-weight:600;margin:0"},[s.audio.es]),h("p",{class:"en",lang:"en",style:"margin:.3rem 0 0"},[s.audio.en])]);
 var tb=h("button",{class:"mini",type:"button","aria-expanded":"false",style:"margin-top:.8rem"},["Ver transcripción"]);tb.addEventListener("click",function(){tr.hidden=!tr.hidden;tb.textContent=tr.hidden?"Ver transcripción":"Ocultar transcripción";tb.setAttribute("aria-expanded",String(!tr.hidden))});
 c.appendChild(tb);c.appendChild(tr);w.appendChild(c);var qc=h("div",{class:"card",style:"margin-top:.9rem"});mcq(s.questions,s.id,qc);w.appendChild(qc);return w};
function tokens(it){return it.parts?it.parts.slice():it.es.split(/\s+/)}
R.order=function(s){var w=h("div");w.appendChild(head(s));var c=h("div",{class:"card"+(s.sentences?" sent":"")});w.appendChild(c);var idx=0,okc=0;
 function render(){c.innerHTML="";if(idx>=s.items.length){c.appendChild(h("div",{class:"result"},[h("div",{class:"badge"},["¡Todas armadas!"]),h("div",{class:"en"},["All built!"]),h("button",{class:"btn line",type:"button",style:"margin-top:.8rem",onclick:function(){idx=0;render()}},["↻ Otra vez"])]));markDone(s.id,{score:okc,total:s.items.length});snow(c);return}
  var it=s.items[idx],tk=tokens(it),bank=shuffle(tk);if(bank.join(" ")===tk.join(" ")&&tk.length>1)bank=bank.slice(1).concat(bank[0]);
  c.appendChild(h("div",{class:"kicker"},[(s.sentences?"Historia":"Frase")+" "+(idx+1)+" de "+s.items.length]));
  if(!s.sentences)c.appendChild(h("div",{class:"prompt",lang:"en"},["“"+it.en+"”"]));else c.appendChild(h("div",{class:"prompt"},[it.en]));
  var tgt=h("div",{class:"order-target","aria-label":"Tu frase",role:"list"});var bk=h("div",{class:"order-bank","aria-label":"Palabras disponibles",role:"list"});
  function mk(t){var b=h("button",{class:"tok",type:"button",lang:"es"},[t]);b.addEventListener("click",function(){tgt.classList.remove("ok","no");$$(".tok",c).forEach(function(x){x.classList.remove("wrong")});(b.parentNode===bk?tgt:bk).appendChild(b);chk.disabled=bk.children.length>0});return b}
  bank.forEach(function(t){bk.appendChild(mk(t))});c.appendChild(tgt);c.appendChild(bk);
  var fb=h("div",{class:"feedback",role:"status"});var row=h("div",{style:"display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem"});
  var chk=h("button",{class:"btn",type:"button",disabled:true},["Revisar"]);var first=true;
  chk.addEventListener("click",function(){var got=$$(".tok",tgt).map(function(x){return x.textContent});var bad=-1;for(var k=0;k<tk.length;k++){if(got[k]!==tk[k]){bad=k;break}}
   if(bad<0){tgt.classList.add("ok");fb.className="feedback ok";fb.textContent="¡Perfecto! "+(s.sentences?"":it.es);if(first)okc++;play(it.a);chk.disabled=true;nx.hidden=false;nx.focus()}
   else{first=false;tgt.classList.add("no");$$(".tok",tgt)[bad].classList.add("wrong");fb.className="feedback no";fb.textContent="Casi: revisa la parte marcada."}});
  var hint=h("button",{class:"btn line",type:"button"},["▶ Escuchar la frase"]);hint.addEventListener("click",function(){play(it.a,"s")});
  var nx=h("button",{class:"btn alt",type:"button",hidden:true},["Siguiente →"]);nx.addEventListener("click",function(){idx++;render()});
  row.appendChild(chk);row.appendChild(hint);row.appendChild(nx);c.appendChild(row);c.appendChild(fb)}
 render();return w};
R.dialogue=function(s){var w=h("div");w.appendChild(head(s));var ctrl=h("div",{class:"dlg-ctrl"});var dl=h("div",{class:"dlg card photo-bg",style:"--bg:url('"+new URL(IMG[pickImg(s)],location.href).href+"')"});
 var rp=false,running=false,cancel=0;
 var lines=s.lines.map(function(l,i){var me=l.who==="Shannon";var row=h("div",{class:"line"+(me?" r":"")});row.appendChild(h("div",{class:"av","aria-hidden":"true"},[me?"Tú":l.who.slice(0,1)]));
  var b=h("div",{class:"bubble",role:"button",tabindex:"0","aria-label":l.who+": "+l.es},[h("div",{class:"who"},[me?"Shannon (tú)":l.who]),h("div",{class:"t",lang:"es"},[l.es]),h("div",{class:"en",lang:"en"},[l.en])]);
  b.addEventListener("click",function(){row.classList.remove("hidden");play(l.a,null,null,row)});b.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();b.click()}});row.appendChild(b);dl.appendChild(row);return row});
 var turn=h("div",{class:"yourturn",hidden:true,role:"status"});
 function runAll(){var my=++cancel;running=true;var i=0;turn.hidden=true;
  (function nx(){if(my!==cancel)return;if(i>=s.lines.length){running=false;turn.hidden=true;markDone(s.id,{rp:rp});if(rp){snow(dl)}return}var l=s.lines[i],row=lines[i];i++;row.scrollIntoView({block:"nearest",behavior:"smooth"});
   if(rp&&l.who==="Shannon"){row.classList.add("turn");turn.hidden=false;turn.innerHTML="";turn.appendChild(h("span",null,["Tu turno: di tu frase en voz alta."]));
    var go=h("button",{class:"btn alt",type:"button"},["Ya lo dije · escuchar modelo"]);go.addEventListener("click",function(){row.classList.remove("hidden","turn");turn.hidden=true;play(l.a,null,null,row,function(){setTimeout(nx,500)})});turn.appendChild(go);
    row.after(turn);go.focus();return}
   play(l.a,null,null,row,function(){setTimeout(nx,450)})})()}
 var pa=h("button",{class:"btn",type:"button"},["▶ Escuchar todo"]);pa.addEventListener("click",runAll);
 var rb=h("button",{class:"btn line",type:"button","aria-pressed":"false"},["🎭 Modo role-play"]);rb.addEventListener("click",function(){rp=!rp;rb.setAttribute("aria-pressed",String(rp));rb.textContent=rp?"🎭 Role-play: activado":"🎭 Modo role-play";rb.classList.toggle("alt",rp);
  cancel++;stopAudio();turn.hidden=true;s.lines.forEach(function(l,i){lines[i].classList.toggle("hidden",rp&&l.who==="Shannon");lines[i].classList.remove("turn")});if(rp)runAll()});
 var st=h("button",{class:"btn line",type:"button"},["■ Parar"]);st.addEventListener("click",function(){cancel++;stopAudio();turn.hidden=true});
 ctrl.appendChild(pa);ctrl.appendChild(rb);ctrl.appendChild(st);w.appendChild(ctrl);w.appendChild(dl);return w};
function recorder(id){var wrap=h("div",{class:"rec"});var dot=h("span",{class:"dot","aria-hidden":"true"});var tm=h("span",{class:"timer"},["0:00"]);
 var ok=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
 if(!ok){wrap.appendChild(h("p",{class:"note",style:"margin:0"},["Tu navegador no permite grabar aquí. Usa la grabadora de tu teléfono y envíasela a Ricardo."]));return wrap}
 var b=h("button",{class:"btn",type:"button"},["● Grabar"]);var mr=null,chunks=[],t0=0,iv=null,stream=null;var out=h("div",{class:"rec"});
 b.addEventListener("click",function(){if(mr&&mr.state==="recording"){mr.stop();return}
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){stream=st;chunks=[];mr=new MediaRecorder(st);mr.ondataavailable=function(e){if(e.data.size)chunks.push(e.data)};
   mr.onstop=function(){clearInterval(iv);wrap.classList.remove("live");b.textContent="● Grabar otra vez";stream.getTracks().forEach(function(t){t.stop()});var blob=new Blob(chunks,{type:mr.mimeType||"audio/webm"});var url=URL.createObjectURL(blob);
    out.innerHTML="";out.appendChild(h("audio",{controls:true,src:url,"aria-label":"Tu grabación"}));var ext=(mr.mimeType||"").indexOf("mp4")>=0?"m4a":"webm";
    out.appendChild(h("a",{class:"btn line",href:url,download:"shannon-"+id+"-"+new Date().toISOString().slice(0,10)+"."+ext},["⬇ Descargar"]));markDone(id+"-rec",{})};
   mr.start();t0=Date.now();wrap.classList.add("live");b.textContent="■ Detener";iv=setInterval(function(){var sec=Math.floor((Date.now()-t0)/1000);tm.textContent=Math.floor(sec/60)+":"+("0"+sec%60).slice(-2)},250)})
  .catch(function(){out.innerHTML="";out.appendChild(h("p",{class:"note",style:"margin:0"},["No tengo acceso al micrófono. Puedes permitirlo en el navegador o usar la grabadora de tu teléfono."]))})});
 wrap.appendChild(b);wrap.appendChild(dot);wrap.appendChild(tm);var all=h("div");all.appendChild(wrap);all.appendChild(out);return all}
function checklist(id,items,host,onAll){S.checks[id]=S.checks[id]||[];items.forEach(function(t,k){var lab=h("label",{class:"check"});var cb=h("input",{type:"checkbox"});cb.checked=!!S.checks[id][k];
  cb.addEventListener("change",function(){S.checks[id][k]=cb.checked;save();if(items.every(function(_,j){return S.checks[id][j]})){if(onAll)onAll()}});lab.appendChild(cb);lab.appendChild(h("span",null,[t]));host.appendChild(lab)})}
R.speak=function(s){var w=h("div");w.appendChild(head(s));var g=h("div",{class:"grid g2"});var left=h("div",{class:"card"});
 if(s.questions){left.appendChild(h("div",{class:"kicker",style:"margin-bottom:.5rem"},["Preguntas"]));var qs=h("div",{class:"qs"});s.questions.forEach(function(q,qi){var r=h("div",{class:"qrow"});r.appendChild(h("span",{class:"qnum","aria-hidden":"true"},[String(qi+1)]));r.appendChild(playBtn(q));r.appendChild(h("div",null,[h("div",{style:"font-weight:600",lang:"es"},[q.es]),h("div",{class:"en"},[q.en])]));qs.appendChild(r)});left.appendChild(qs);
  var pa=h("button",{class:"btn line",type:"button",style:"margin-top:.8rem"},["▶ Escuchar todas, con pausa"]);pa.addEventListener("click",function(){var i=0;(function nx(){if(i>=s.questions.length)return;var q=s.questions[i++];play(q.a,null,null,$$(".qrow",qs)[i-1],function(){setTimeout(nx,6000)})})()});left.appendChild(pa)}
 left.appendChild(h("div",{class:"kicker",style:"margin:1rem 0 .2rem"},["Bloques que te ayudan"]));var ch=h("div",{class:"chips"});s.hints.forEach(function(t){ch.appendChild(h("span",{class:"chip",lang:"es"},[t]))});left.appendChild(ch);g.appendChild(left);
 var right=h("div",{class:"card polaroid"});right.appendChild(h("div",{class:"pol-photo"},[h("img",{src:IMG.polaroid,alt:"Cámara instantánea y fotos en blanco sobre una mesa con luz dorada: tu foto de «antes».",loading:"lazy"})]));right.appendChild(h("div",{class:"pol-cap"},[/diagnostico/.test(s.id)?"Mi foto de «antes» · 23 · 11 · 2026":s.title]));right.appendChild(h("div",{class:"kicker"},["Graba tu voz (opcional)"]));right.appendChild(recorder(s.id));
 right.appendChild(h("div",{class:"kicker",style:"margin:1.1rem 0 .2rem"},["Autoevaluación"]));checklist(s.id,s.checklist,right,function(){markDone(s.id,{});snow(right)});g.appendChild(right);w.appendChild(g);return w};
R.summary=function(s,L){var c=h("section",{class:"celebrate",style:"--bg:url('"+new URL(IMG[LHERO[L.id]||"puerta"],location.href).href+"')"});c.appendChild(h("div",{class:"kicker"},[s.kicker]));c.appendChild(h("h2",{class:"display"},[s.title]));c.appendChild(h("div",{class:"en",style:"font-family:'Cormorant Garamond';font-style:italic;font-size:1.25rem"},[s.en]));
 c.appendChild(h("div",{class:"kicker",style:"margin-top:1.2rem;color:var(--teal)"},["Tus 5 frases para llevar"]));var k=h("div",{class:"keepers"});s.keepers.forEach(function(it){var r=h("div",{class:"chunk"});r.appendChild(playBtn(it,{el:r}));r.appendChild(h("div",{class:"txt"},[h("span",{class:"es-big",lang:"es"},[it.es]),h("span",{class:"en",style:"color:#e8d6cf"},[it.en])]));k.appendChild(r)});c.appendChild(k);
 if(s.cando){var cd=h("div",{class:"cando"});var pol=h("figure",{class:"cd-pol"},[h("img",{src:IMG.polaroid,alt:"Tu foto de «antes»: cámara instantánea y fotos sobre una mesa.",loading:"lazy"}),h("figcaption",null,["Antes · 23 · 11 · 2026"])]);cd.appendChild(pol);
  var lst=h("div",{class:"cd-list"});lst.appendChild(h("div",{class:"kicker"},["Ahora puedo… · Now I can…"]));lst.appendChild(h("p",{class:"cd-help"},["Compara con tu foto de «antes». Marca lo que ya puedes hacer."]));
  var cid=s.id+"-cando";S.checks[cid]=S.checks[cid]||[];s.cando.forEach(function(it,k){var es=typeof it==="string"?it:it[0],en=typeof it==="string"?"":it[1];var lab=h("label",{class:"cd-item"});var cb=h("input",{type:"checkbox"});cb.checked=!!S.checks[cid][k];cb.addEventListener("change",function(){S.checks[cid][k]=cb.checked;save()});lab.appendChild(cb);lab.appendChild(h("span",{class:"cd-box","aria-hidden":"true"}));lab.appendChild(h("span",{class:"cd-txt"},[h("b",{lang:"es"},[es])].concat(en?[h("span",{class:"en"},[en])]:[])));lst.appendChild(lab)});cd.appendChild(lst);c.appendChild(cd)}
 var m=h("div",{class:"mission"},[h("div",{class:"kicker"},["Tu misión"]),h("p",{style:"margin:.3rem 0 0;font-weight:600"},[s.mission]),h("p",{class:"en",style:"margin:.2rem 0 0"},[s.missionEn])]);
 if(s.next)m.appendChild(h("a",{class:"btn",href:s.next.href,style:"margin-top:.8rem;text-decoration:none"},[s.next.label+" →"]));c.appendChild(m);
 setTimeout(function(){snow(c,40);markDone(s.id,{});S.done[L.id+"-complete"]={at:Date.now()};save()},300);return c};
R.plan=function(s){var w=h("div");w.appendChild(head(s));var c=h("div",{class:"card plan"});var t=h("table");var tr=h("tr",null,[h("th",{scope:"col"},["Tarea"])]);s.days.forEach(function(d){tr.appendChild(h("th",{scope:"col"},[d]))});t.appendChild(h("thead",null,[tr]));var tb=h("tbody");
 S.plan[s.id]=S.plan[s.id]||{};s.tasks.forEach(function(tk,ti){var r=h("tr",null,[h("td",null,[h("span",{"aria-hidden":"true"},[tk[0]+" "]),h("b",null,[tk[1]])," · "+tk[2]," ",h("span",{class:"en"},["("+tk[3]+")"])])]);
  s.days.forEach(function(d,di){var key=ti+"-"+di;var cb=h("input",{type:"checkbox","aria-label":tk[1]+", "+d});cb.checked=!!S.plan[s.id][key];cb.addEventListener("change",function(){S.plan[s.id][key]=cb.checked;save();var all=s.tasks.every(function(_,a){return s.days.every(function(_,b){return S.plan[s.id][a+"-"+b]})});if(all){markDone(s.id,{});snow(c)}});r.appendChild(h("td",null,[cb]))});tb.appendChild(r)});
 t.appendChild(tb);c.appendChild(t);c.appendChild(h("p",{class:"note"},["Más una nota de voz para Ricardo (2 por semana) y, los viernes, tu misión real. No son worksheets: es entrenamiento corto, como hacer reps."]));w.appendChild(c);return w};
R.audiopack=function(s){var w=h("div");w.appendChild(head(s));var ctrl=h("div",{class:"dlg-ctrl"});var list=h("div",{class:"grid g2"});var cancel=0,sp="s";
 var cards=s.items.map(function(it){var c=h("div",{class:"card chunk"});var pb=playBtn(it,{el:c});c.appendChild(pb);c.appendChild(h("div",{class:"txt"},[h("span",{class:"es-big",lang:"es"},[it.es]),h("span",{class:"en"},[it.en])]));c.addEventListener("click",function(){pb.click()});list.appendChild(c);return c});
 var sg=h("div",{class:"spd",role:"group","aria-label":"Velocidad"});[["s","🐢 Lento"],["n","Normal"],["f","⚡ Rápido"]].forEach(function(o){var b=h("button",{type:"button",class:o[0]===sp?"on":""},[o[1]]);b.addEventListener("click",function(){sp=o[0];$$("button",sg).forEach(function(x){x.classList.remove("on")});b.classList.add("on")});sg.appendChild(b)});
 var pa=h("button",{class:"btn",type:"button"},["▶ Reproducir todo"]);var st=h("button",{class:"btn line",type:"button"},["■ Parar"]);var loops=0;
 pa.addEventListener("click",function(){var my=++cancel;var i=0;loops=0;(function nx(){if(my!==cancel)return;if(i>=s.items.length){loops++;markDone(s.id,{});live("Ronda completa");if(loops<2){i=0}else return}var it=s.items[i],c=cards[i];i++;c.scrollIntoView({block:"nearest",behavior:"smooth"});
   play(it.a,sp,null,c,function(){var gap=Math.max(1800,(A.duration||2)*1000*1.3+600);c.classList.add("playing");setTimeout(function(){c.classList.remove("playing");nx()},gap)})})()});
 st.addEventListener("click",function(){cancel++;stopAudio()});ctrl.appendChild(pa);ctrl.appendChild(st);ctrl.appendChild(sg);w.appendChild(ctrl);w.appendChild(h("p",{class:"en",style:"margin:-.4rem 0 .8rem"},["Plays the list twice, with a pause after each phrase for you to repeat."]));w.appendChild(list);return w};
R.srs=function(s){var w=h("div");w.appendChild(head(s));var c=h("div",{class:"card game"});w.appendChild(c);
 function key(it){return it.a}
 function start(){var q=s.items.slice().sort(function(a,b){return (S.srs[key(a)]||0)-(S.srs[key(b)]||0)});var known=0,again=0;
  (function show(){c.innerHTML="";if(!q.length){c.appendChild(h("div",{class:"result"},[h("div",{class:"badge"},["¡Mazo terminado!"]),h("div",{class:"en"},["Deck done!"]),h("div",{class:"nums"},[h("div",null,[h("b",null,[String(known)]),h("span",null,["las sabías"])]),h("div",null,[h("b",null,[String(again)]),h("span",null,["repasos"])])]),h("button",{class:"btn line",type:"button",onclick:start},["↻ Otra ronda"])]));markDone(s.id,{});snow(c);return}
   var it=q[0];c.appendChild(h("div",{class:"kicker"},["Quedan "+q.length+" · caja "+((S.srs[key(it)]||0)+1)]));
   var fl=h("button",{class:"flip",type:"button",style:"max-width:520px;margin:.6rem auto;display:block;width:100%","aria-label":"Tarjeta: "+it.en+". Pulsa para voltear."});
   fl.appendChild(h("div",{class:"in"},[h("div",{class:"f"},[h("small",{style:"color:var(--orgD)"},["English"]),h("p",{lang:"en"},[it.en]),h("small",{style:"color:var(--mute)"},["Dilo en voz alta y voltea"])]),h("div",{class:"b"},[h("small",null,["Español"]),h("p",{lang:"es"},[it.es]),h("small",null,["▶ escuchando…"])])]));
   var row=h("div",{class:"opts",hidden:true});fl.addEventListener("click",function(){if(!fl.classList.contains("on")){fl.classList.add("on");play(it.a);row.hidden=false}else play(it.a)});
   var ag=h("button",{class:"btn line",type:"button"},["↺ Otra vez"]);ag.addEventListener("click",function(){again++;S.srs[key(it)]=0;save();q.shift();q.splice(Math.min(3,q.length),0,it);show()});
   var kn=h("button",{class:"btn",type:"button"},["✓ La sé"]);kn.addEventListener("click",function(){known++;S.srs[key(it)]=(S.srs[key(it)]||0)+1;save();q.shift();show()});
   row.appendChild(ag);row.appendChild(kn);c.appendChild(fl);c.appendChild(row)})()}
 c.appendChild(h("button",{class:"btn big",type:"button",onclick:start},["🃏 Empezar"]));return w};
R.mission=function(s){var w=h("div");w.appendChild(head(s));var c=h("div",{class:"card"});S.mission[s.id]=S.mission[s.id]||[];var g=h("div",{class:"grid g3"});
 for(var k=0;k<s.count;k++)(function(k){var inp=h("input",{class:"numin",style:"font-size:1.1rem;width:100%",type:"text","aria-label":"Precio "+(k+1),placeholder:(k+1)+". Precio y dónde lo viste"});inp.value=S.mission[s.id][k]||"";inp.addEventListener("input",function(){S.mission[s.id][k]=inp.value;save();if(S.mission[s.id].filter(function(x){return x&&x.trim()}).length>=s.count){markDone(s.id,{});snow(c)}});g.appendChild(inp)})(k);
 c.appendChild(g);c.appendChild(h("p",{class:"en",style:"margin-top:.6rem"},["Example: “$45, a scarf: cuarenta y cinco dólares” (prices in dollars count too!)."]));w.appendChild(c);return w};

/* ---------- snow celebration ---------- */
function snow(host,n){if(!host||window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;n=n||18;var pos=getComputedStyle(host).position;if(pos==="static")host.style.position="relative";var lay=h("div",{class:"snow","aria-hidden":"true"});host.appendChild(lay);
 for(var i=0;i<n;i++){var f=h("span",{class:"flake"},["❄"]);f.style.left=Math.random()*100+"%";f.style.fontSize=(10+Math.random()*16)+"px";f.style.animationDuration=(3+Math.random()*3)+"s";f.style.animationDelay=(Math.random()*1.2)+"s";f.style.color=["#ffffff","#9DC5C8","#F6F6EF"][i%3];lay.appendChild(f)}setTimeout(function(){lay.remove()},7000)}

/* ---------- lesson runner ---------- */
var L,cur=0,stage,dots,counter,prevB,nextB,bar;
function updateDots(){if(!dots)return;$$("button",dots).forEach(function(b,i){b.classList.toggle("cur",i===cur);b.classList.toggle("seen",(S.visited[L.id]||[]).indexOf(i)>=0)})}
function go(i,focus){if(!L)return;i=Math.max(0,Math.min(L.slides.length-1,i));stopAudio();cur=i;var s=L.slides[i];stage.innerHTML="";var el=h("div",{class:"slide",role:"region","aria-label":"Diapositiva "+(i+1)+" de "+L.slides.length+": "+(s.title||"")});
 var r=R[s.type];if(!r){el.appendChild(h("p",null,["(tipo desconocido: "+s.type+")"]))}else el.appendChild(r(s,L));stage.appendChild(el);
 var v=S.visited[L.id]=S.visited[L.id]||[];if(v.indexOf(i)<0){v.push(i);save()}
 counter.textContent=(i+1)+" / "+L.slides.length;prevB.disabled=i===0;nextB.disabled=i===L.slides.length-1;bar.style.width=((i+1)/L.slides.length*100)+"%";updateDots();
 if(location.hash!=="#"+(i+1))history.replaceState(null,"","#"+(i+1));window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"});
 if(focus!==false){var hh=$("h1,h2",el);if(hh){hh.setAttribute("tabindex","-1");hh.focus({preventScroll:true})}}
}
function runLesson(){L=window.LESSON;document.title=L.title+" · Español con Ricardo";topbar((L.practice?"Práctica · ":"Lección "+L.num+" · ")+L.day);
 var pg=h("div",{class:"progress","aria-hidden":"true"},[bar=h("i")]);$(".topbar").after(pg);
 stage=h("main",{class:"stage",id:"main"});document.body.appendChild(stage);
 var nav=h("nav",{class:"navbar","aria-label":"Navegación de diapositivas"});prevB=h("button",{class:"nav-btn ghost",type:"button","aria-label":"Anterior (flecha izquierda)"},["← Atrás"]);nextB=h("button",{class:"nav-btn",type:"button","aria-label":"Siguiente (flecha derecha)"},["Siguiente →"]);
 dots=h("div",{class:"dots"});L.slides.forEach(function(s,i){dots.appendChild(h("button",{type:"button","aria-label":"Ir a la diapositiva "+(i+1)+": "+(s.title||""),onclick:function(){go(i)}}))});counter=h("span",{class:"counter","aria-live":"polite"});
 prevB.addEventListener("click",function(){go(cur-1)});nextB.addEventListener("click",function(){go(cur+1)});nav.appendChild(prevB);nav.appendChild(dots);nav.appendChild(counter);nav.appendChild(nextB);document.body.appendChild(nav);
 document.body.appendChild(h("div",{id:"live",class:"sr","aria-live":"polite"}));
 document.addEventListener("keydown",function(e){var t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"))return;if(e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==="ArrowRight"||e.key==="PageDown"){e.preventDefault();go(cur+1)}else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(cur-1)}else if(e.key==="e"||e.key==="E"){setEn(!S.en)}else if(e.key==="f"||e.key==="F"){toggleFS()}else if(e.key==="Home"){go(0)}else if(e.key==="End"){go(L.slides.length-1)}});
 var start=parseInt((location.hash||"").slice(1),10);go(isNaN(start)?0:start-1,false);
 window.addEventListener("hashchange",function(){var n=parseInt(location.hash.slice(1),10);if(!isNaN(n)&&n-1!==cur)go(n-1)})}
window.HWS.runLesson=runLesson;window.HWS.topbar=topbar;window.HWS.h=h;window.HWS.snow=snow;

/* ---------- art ---------- */
var MT='<path d="M0 300 L70 210 L120 250 L190 140 L250 215 L300 170 L400 260 L400 400 L0 400Z" fill="#5e2b2a"/><path d="M0 330 L90 250 L160 300 L240 200 L320 280 L400 230 L400 400 L0 400Z" fill="#4c2322"/><path d="M190 140 L212 170 L200 166 L190 178 L178 165 L170 168Z" fill="#F6F6EF" opacity=".9"/><path d="M240 200 L258 222 L246 219 L238 228 L230 218 L222 222Z" fill="#F6F6EF" opacity=".8"/>';
var ART={
 mtn:'<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">'+MT+'</svg>',
 airport:'<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="290" cy="110" r="46" fill="#C46821" opacity=".85"/>'+MT+'<g fill="none" stroke="#9DC5C8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(95 85) rotate(-14)"><path d="M10 70 L190 70 Q215 70 215 82 Q215 94 190 94 L60 94 L30 120 L14 120 L30 94 L10 94 Z" fill="#F6F6EF" stroke="#F6F6EF"/><path d="M95 70 L60 20 L80 20 L135 70" fill="#9DC5C8" stroke="#9DC5C8"/><path d="M110 94 L80 140 L100 140 L145 94" fill="#9DC5C8" stroke="#9DC5C8"/></g><ellipse cx="200" cy="160" rx="170" ry="34" fill="none" stroke="#C46821" stroke-width="2.5" opacity=".9"/><text x="200" y="372" text-anchor="middle" font-family="Maven Pro" font-weight="800" font-size="20" letter-spacing="6" fill="#9DC5C8">CDMX → OAX</text></svg>',
 board:'<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+MT+'<g transform="translate(60 60)"><rect width="280" height="190" rx="14" fill="#361E1C" stroke="#9DC5C8" stroke-width="3"/><text x="20" y="38" font-family="Maven Pro" font-weight="800" font-size="16" letter-spacing="4" fill="#C46821">SALIDAS</text><g font-family="Maven Pro" font-size="17" font-weight="700" fill="#F6F6EF"><text x="20" y="78">OAXACA</text><text x="170" y="78">16:20</text><text x="240" y="78" fill="#9DC5C8">9</text><text x="20" y="114">CANCÚN</text><text x="170" y="114">11:30</text><text x="240" y="114" fill="#9DC5C8">4</text><text x="20" y="150">CDMX</text><text x="170" y="150">15:15</text><text x="240" y="150" fill="#9DC5C8">15</text></g></g><circle cx="320" cy="300" r="44" fill="#F6F6EF"/><path d="M320 270 L320 300 L342 312" stroke="#733635" stroke-width="5" stroke-linecap="round" fill="none"/></svg>',
 taxi:'<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="300" cy="100" r="44" fill="#C46821" opacity=".85"/>'+MT+'<g transform="translate(70 170)" stroke-linejoin="round"><rect x="105" y="0" width="56" height="20" rx="4" fill="#C46821"/><text x="133" y="15" text-anchor="middle" font-family="Maven Pro" font-weight="900" font-size="13" fill="#F6F6EF">TAXI</text><path d="M30 60 L70 22 L200 22 L240 60 L262 64 Q272 66 272 78 L272 108 L0 108 L0 78 Q0 64 14 62 Z" fill="#F6F6EF"/><path d="M78 30 L128 30 L128 60 L50 60Z M138 30 L192 30 L222 60 L138 60Z" fill="#9DC5C8"/><circle cx="62" cy="110" r="22" fill="#361E1C" stroke="#F6F6EF" stroke-width="5"/><circle cx="212" cy="110" r="22" fill="#361E1C" stroke="#F6F6EF" stroke-width="5"/></g><ellipse cx="205" cy="230" rx="175" ry="60" fill="none" stroke="#C46821" stroke-width="2.5"/></svg>'};
var HERO={
 "leccion-1":{src:"img/leccion-1-puerta.jpg",pos:"57% 50%",alt:"Una viajera de espaldas, con suéter color crema, mira por el ventanal de la sala de espera un avión en la pista y las montañas al atardecer."},
 "leccion-2":{src:"img/leccion-2-cafe-horas.jpg",pos:"42% 50%",alt:"Mesa de café en el aeropuerto: un café americano, una rebanada de pan de elote, un reloj dorado en la muñeca, monedas y un billete, y un pase de abordar boca abajo."},
 "leccion-3":{src:"img/leccion-3-taxi-oaxaca.jpg",pos:"55% 50%",alt:"Vista desde el asiento trasero de un taxi por una calle empedrada del centro de Oaxaca, con fachadas de colores y papel picado al atardecer."}};
window.HWS.HERO=HERO;window.HWS.ART=ART;window.HWS._audio=A;
/* clase 4: helpers expuestos para assets/clase4.js (aditivo; no cambia las lecciones 1-3) */
window.HWS.R=R;window.HWS.play=play;window.HWS.playBtn=playBtn;window.HWS.speedMinis=speedMinis;window.HWS.live=live;window.HWS.markDone=markDone;window.HWS.shuffle=shuffle;window.HWS.stopAudio=stopAudio;window.HWS.IMG=IMG;window.HWS.LHERO=LHERO;window.HWS.ICON=ICON;window.HWS.go=function(i){go(i)};
})();
