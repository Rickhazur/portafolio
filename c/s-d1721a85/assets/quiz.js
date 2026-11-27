/* Quiz final · motor. Califica solo, guarda en este equipo y manda el resultado a Ricardo (FormSubmit, AJAX) al terminar. */
(function(){
"use strict";
var Q=window.QUIZ,KEY="shannon-quiz-v1",SK="shannon-es-v1";
function ld(k){try{return JSON.parse(localStorage.getItem(k))||null}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var st=ld(KEY)||{attempts:[],cur:null,outbox:[]};
function save(){sv(KEY,st)}
function el(t,a,c){var e=document.createElement(t);if(a)for(var k in a){if(k==="text")e.textContent=a[k];else if(k.slice(0,2)==="on")e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}(c||[]).forEach(function(x){if(x==null)return;e.appendChild(typeof x==="string"?document.createTextNode(x):x)});return e}
var root,live;
function say(m){live.textContent="";setTimeout(function(){live.textContent=m},30)}
function tz(d,z){try{return d.toLocaleString("es-MX",{timeZone:z,weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit"})}catch(e){return d.toString()}}
function L(i){return "ABCD"[i]}
/* ---------- resultado y mensaje ---------- */
function grade(a){
 var wrong=[],topics={};
 Q.items.forEach(function(it,i){var ch=a.ans[i];var ok=ch===it.key;
  var t=topics[it.topic]||(topics[it.topic]={ok:0,n:0,fails:[]});t.n++;if(ok)t.ok++;else t.fails.push(it.skill);
  if(!ok)wrong.push({n:i+1,it:it,ch:ch})});
 var score=Q.items.length-wrong.length;
 var list=Object.keys(topics).map(function(k){var t=topics[k];return{name:k,ok:t.ok,n:t.n,pct:t.ok/t.n,fails:t.fails}}).sort(function(x,y){return x.pct-y.pct||y.n-x.n});
 return{score:score,total:Q.items.length,wrong:wrong,topics:list}}
function message(a){
 var g=grade(a),s=new Date(a.start),e=new Date(a.end),mins=Math.max(1,Math.round((e-s)/60000));
 var weak=g.topics.filter(function(t){return t.ok<t.n});
 var weakTxt=weak.length?weak.map(function(t){return t.name+" ("+t.ok+"/"+t.n+"): "+t.fails.join("; ")}).join("\n"):"Ninguna: ¡todo correcto!";
 var sum=g.topics.map(function(t){return t.name+": "+t.ok+"/"+t.n+(t.fails.length?" · falla en "+t.fails.join("; "):" ✓")}).join("\n");
 var det=g.wrong.length?g.wrong.map(function(w){return "#"+w.n+" ["+w.it.topic+" · "+w.it.skill+"]\nPregunta: "+(w.it.kind==="listen"?"(audio) «"+w.it.audio+"» → "+w.it.stem:w.it.p===2?"¿Cómo se dice "+w.it.stem+"?":w.it.stem)+"\nShannon: "+(w.ch==null?"(sin respuesta)":L(w.ch)+") "+w.it.options[w.ch])+"\nCorrecta: "+L(w.it.key)+") "+w.it.options[w.it.key]}).join("\n\n"):"Sin errores.";
 return{g:g,mins:mins,data:{
  _subject:"Quiz de "+a.name+": "+g.score+"/"+g.total+(weak.length?" · repasar: "+weak.slice(0,2).map(function(t){return t.name}).join(", "):" · ¡perfecto!"),
  _template:"box",_captcha:"false",
  "1 · Áreas más débiles":weakTxt,
  "2 · Puntaje":g.score+" de "+g.total+" ("+Math.round(g.score/g.total*100)+"%)",
  "3 · Resumen por tema":sum,
  "4 · Errores (detalle)":det,
  "5 · Estudiante":a.name,
  "6 · Hora":"Terminó: "+tz(e,"America/Denver")+" (Aspen) · "+tz(e,"America/Bogota")+" (Bogotá) · duró "+mins+" min",
  "7 · Intento":String(a.n),
  "8 · Respuestas":Q.items.map(function(it,i){return (i+1)+":"+(a.ans[i]==null?"-":L(a.ans[i]))+(a.ans[i]===it.key?"✓":"✗")}).join(" ")}}}
function flush(){
 if(!st.outbox.length)return;var job=st.outbox[0];
 var x=document.getElementById("sendst");if(x)x.textContent="Enviando tu resultado a Ricardo…";
 fetch(Q.endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(job.data)})
 .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||j.success==="false"||j.success===false)throw new Error(j.message||r.status);return j})})
 .then(function(){st.outbox.shift();var a=st.attempts.filter(function(t){return t.id===job.id})[0];if(a)a.sent=true;save();if(x){x.textContent="✓ Tu resultado ya le llegó a Ricardo.";x.className="sendok"}say("Resultado enviado a Ricardo");if(st.outbox.length)flush()})
 .catch(function(){if(x){x.textContent="Sin conexión por ahora. Lo intento otra vez sola en unos segundos; no cierres esta página.";x.className="sendwait"}setTimeout(flush,20000)})}
/* ---------- pantallas ---------- */
function frame(kick,title,en){root.innerHTML="";var w=el("div",{class:"qwrap"});w.appendChild(el("div",{class:"kicker",text:kick}));w.appendChild(el("h1",{class:"qtitle",text:title}));if(en)w.appendChild(el("p",{class:"en",text:en}));root.appendChild(w);return w}
function intro(){
 var w=frame("Quiz final · lecciones 1 a 3","Tu quiz de la semana 1","Your week 1 quiz");
 var last=st.attempts[st.attempts.length-1];
 w.appendChild(el("div",{class:"card qcard"},[
  el("p",{text:"16 preguntas en 4 partes, unos 12 minutos: la hora, los números y precios, el aeropuerto, el taxi y los saludos."}),
  el("p",{class:"en",text:"16 questions in 4 parts, about 12 minutes."}),
  el("ul",{class:"qrules"},[el("li",{text:"Sin notas ni tabla. · No notes."}),el("li",{text:"Cada audio se puede repetir una vez. · Each audio can be repeated once."}),el("li",{text:"No ves si aciertas hasta el final. · You see your score at the end."}),el("li",{text:"Al terminar, tu resultado le llega solo a Ricardo. · Your result goes to Ricardo automatically."})])]));
 var inp=el("input",{id:"qname",type:"text",autocomplete:"given-name",maxlength:"40",value:(last&&last.name)||"Shannon"});
 var go=el("button",{class:"btn big",type:"button",onclick:function(){var n=inp.value.trim();if(!n){inp.focus();say("Escribe tu nombre");return}
  st.cur={id:Date.now().toString(36),n:st.attempts.length+1,name:n,start:new Date().toISOString(),ans:{},plays:{},i:0};save();item()}},["Empezar el quiz"]);
 w.appendChild(el("div",{class:"card qcard"},[el("label",{for:"qname",class:"qlab",text:"Tu nombre · Your name"}),inp,el("div",{class:"arow"},[go])]));
 if(last)w.appendChild(el("p",{class:"tiny",text:"Último intento: "+last.score+" de "+Q.items.length+" · "+tz(new Date(last.end),"America/Denver")+" (Aspen)"+(last.sent?" · enviado a Ricardo ✓":" · pendiente de enviar")}));
 var b=el("a",{class:"btn line",href:"index.html"},["← Volver al inicio"]);w.appendChild(el("div",{class:"arow"},[b]));
}
var audioEl=null;
function play(it,i,btn,cnt){var c=st.cur;var used=c.plays[i]||0;if(used>=2)return;c.plays[i]=used+1;save();
 if(audioEl){audioEl.pause()}audioEl=new Audio("audio/"+it.a+"-n.mp3");btn.disabled=true;btn.textContent="🔊 Escuchando…";
 var done=function(){var left=2-(c.plays[i]||0);btn.disabled=left<=0;btn.textContent=left>0?"▶ Escuchar otra vez (1)":"Ya lo escuchaste 2 veces";cnt.textContent=""};
 audioEl.addEventListener("ended",done);audioEl.addEventListener("error",done);var p=audioEl.play();if(p&&p.catch)p.catch(done)}
function item(){
 var c=st.cur,i=c.i,it=Q.items[i],part=Q.parts[it.p-1];
 var w=frame("Parte "+part.n+" de 4 · "+part.name,"Pregunta "+(i+1)+" de "+Q.items.length,part.help+" · "+part.helpEn);
 var bar=el("div",{class:"bar qbar","aria-hidden":"true"},[el("i",{style:"width:"+Math.round(i/Q.items.length*100)+"%"})]);w.insertBefore(bar,w.children[1]);
 var card=el("div",{class:"card qcard"});
 if(it.kind==="listen"){var used=c.plays[i]||0;var cnt=el("span",{class:"tiny"});var pb=el("button",{class:"btn qplay",type:"button"},[used===0?"▶ Escuchar":used===1?"▶ Escuchar otra vez (1)":"Ya lo escuchaste 2 veces"]);if(used>=2)pb.disabled=true;pb.addEventListener("click",function(){play(it,i,pb,cnt)});card.appendChild(el("div",{class:"arow"},[pb,cnt]))}
 card.appendChild(el("p",{class:"qstem",id:"qs"+i,text:it.p===2?"¿Cómo se dice "+it.stem+"?":it.stem}));
 if(it.en)card.appendChild(el("p",{class:"en",text:it.en}));
 var os=el("div",{class:"qopts",role:"radiogroup","aria-labelledby":"qs"+i});
 var next=el("button",{class:"btn",type:"button"},[i<Q.items.length-1?"Siguiente →":"Terminar y enviar"]);next.disabled=c.ans[i]==null;
 it.options.forEach(function(o,k){var b=el("button",{type:"button",class:"qopt"+(c.ans[i]===k?" chosen":""),role:"radio","aria-checked":String(c.ans[i]===k)},[el("b",{text:L(k)+") "}),o]);
  b.addEventListener("click",function(){c.ans[i]=k;save();Array.prototype.forEach.call(os.children,function(x){x.classList.remove("chosen");x.setAttribute("aria-checked","false")});b.classList.add("chosen");b.setAttribute("aria-checked","true");next.disabled=false;say("Elegiste "+L(k))});os.appendChild(b)});
 card.appendChild(os);
 next.addEventListener("click",function(){if(c.ans[i]==null)return;if(audioEl)audioEl.pause();if(i<Q.items.length-1){c.i++;save();item();window.scrollTo(0,0)}else finish()});
 var back=el("button",{class:"btn line",type:"button",onclick:function(){if(i>0){c.i--;save();item()}}},["← Anterior"]);if(i===0)back.disabled=true;
 card.appendChild(el("div",{class:"arow qnav"},[back,next]));w.appendChild(card);
 var f=os.querySelector(".chosen")||os.firstChild;}
function finish(){
 var c=st.cur;c.end=new Date().toISOString();var m=message(c);c.score=m.g.score;c.sent=false;
 st.attempts.push({id:c.id,n:c.n,name:c.name,start:c.start,end:c.end,ans:c.ans,score:c.score,sent:false});
 st.outbox.push({id:c.id,data:m.data});st.cur=null;save();
 var S=ld(SK)||{};S.visited=S.visited||{};S.done=S.done||{};S.visited.quiz=[0];S.done.quiz=true;S.done["quiz-complete"]=true;sv(SK,S);
 result(c,m);flush()}
function result(c,m){
 var w=frame("Quiz final · lecciones 1 a 3","¡Terminaste, "+c.name+"!","You finished!");
 var pct=Math.round(m.g.score/m.g.total*100);
 w.appendChild(el("div",{class:"card qcard qres"},[el("div",{class:"qscore",text:m.g.score+" de "+m.g.total}),el("p",{text:pct>=80?"¡Excelente trabajo!":pct>=60?"¡Muy bien! Vamos a repasar unos detalles.":"Buen esfuerzo. Lo repasamos juntos en clase."}),el("p",{class:"en",text:"Ricardo will go over the details with you in class."}),el("p",{id:"sendst",role:"status",text:"Enviando tu resultado a Ricardo…"})]));
 w.appendChild(el("div",{class:"arow"},[el("a",{class:"btn",href:"index.html"},["Volver al inicio"]),el("button",{class:"btn line",type:"button",onclick:function(){intro()}},["Hacer el quiz otra vez"])]));
 say("Terminaste. "+m.g.score+" de "+m.g.total)}
function start(){
 if(window.HWS&&HWS.topbar)try{HWS.topbar("Quiz final")}catch(e){}
 root=el("main",{id:"main",class:"qmain"});document.body.appendChild(root);
 live=el("div",{class:"sr","aria-live":"polite",role:"status"});document.body.appendChild(live);
 if(st.cur&&st.cur.i!=null)item();else intro();
 if(st.outbox.length){flush()}
}
window.QUIZAPP={grade:grade,message:message,state:function(){return st}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
