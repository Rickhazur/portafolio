/* Clase 4 «Mi fórmula» + repaso del quiz · tipos nuevos sobre el motor HWS (app.js). Sin dependencias. */
(function(){
"use strict";
var H=window.HWS,S=H.state,save=H.save,h=H.h,R=H.R,play=H.play,playBtn=H.playBtn,speedMinis=H.speedMinis,live=H.live,markDone=H.markDone,shuffle=H.shuffle;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RM=/modo=ricardo/.test(location.search);
var RED=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var L0=window.LESSON;
H.IMG.c4portada="img/c4-portada-01.jpg";H.LHERO["clase-4"]="c4portada";H.LHERO["repaso-quiz"]="taxi";
if(L0&&L0.id==="clase-4"){var ci=L0.slides[0].img;H.HERO["clase-4"]={src:ci.src,pos:"50% 60%",alt:ci.alt}}
document.documentElement.classList.add("c4");if(RM)document.documentElement.classList.add("rmode");
var ST=S.c4=S.c4||{};ST.rev=ST.rev||{};ST.own=ST.own||{};ST.pron=ST.pron||{};ST.unlock=ST.unlock||{};ST.reto=ST.reto||{A:{},B:{},C:{}};ST.hints=ST.hints||{};ST.rq=ST.rq||{};
var F=L0&&L0.formula;
var ROWS=F?F.rows:[];var ROW={};ROWS.forEach(function(r){ROW[r.key]=r});
var END2ROW={"o":"yo","as":"tu","a":"el","amos":"nos","an":"ellos"};
var SHAPE={yo:"●",tu:"■",el:"▲",nos:"◆",ellos:"★"};
function applyRev(){ROWS.forEach(function(r){document.body.classList.toggle("rev-"+r.key,!!ST.rev[r.key])})}
/* subrayado de terminaciones: verbos -ar de la clase */
var STEMS="trabaj|practic|habl|escuch|viaj|tom|diseñ|mir|cen|rent|desayun|regres";
var RX=new RegExp("(^|[^a-záéíóúñ])((?:"+STEMS+"))(amos|an|as|a|o)(?![a-záéíóúñ])","gi");
function esc(t){return String(t).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function mark(t){return esc(t).replace(RX,function(m,pre,stem,end){var k=END2ROW[end.toLowerCase()];return pre+stem+'<span class="end e-'+k+'">'+end+'</span>'})}
function sent(t,cls){return h("span",{class:"c4s "+(cls||""),lang:"es",html:mark(t)})}
function img(o,cls){if(!o||!o.src)return null;return h("img",{src:o.src,alt:o.alt||"",loading:"lazy",class:cls||""})}
function head(s,extra){var d=h("div",{class:"slide-head c4head"});d.appendChild(h("div",{class:"kicker"},[s.kicker||""]));d.appendChild(h("h2",null,[s.title]));if(s.en)d.appendChild(h("div",{class:"en sub"},[s.en]));
 if(s.body){d.appendChild(h("p",{class:"lead",html:s.body}));if(s.bodyEn)d.appendChild(h("p",{class:"lead en"},[s.bodyEn]))}if(extra)d.appendChild(extra);return d}
function fb(){return h("div",{class:"feedback",role:"status"})}
function setFb(el,ok,txt){el.className="feedback "+(ok===true?"ok":ok===false?"no":"neutral");el.textContent=txt;live(txt);try{el.scrollIntoView({block:"nearest",behavior:RED?"auto":"smooth"})}catch(e){}}
function audioRow(it,el){var w=h("span",{class:"arow"});w.appendChild(playBtn(it,{el:el}));w.appendChild(speedMinis(it,el));return w}
/* ---------- panel de Ricardo ---------- */
function rpanel(title,kids){if(!RM)return null;var a=h("aside",{class:"rpanel","aria-label":"Panel de Ricardo"});a.appendChild(h("div",{class:"kicker"},["Solo Ricardo · "+title]));(kids||[]).forEach(function(k){if(k)a.appendChild(typeof k==="string"?h("p",null,[k]):k)});return a}
function hintBox(id,hints){if(!RM||!hints)return null;var w=h("div",{class:"hints"});var out=h("p",{class:"hint-out"});hints.forEach(function(x){w.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){out.textContent="Pista "+x.level+" ("+x.kind+"): "+x.es;ST.hints[id]=Math.max(ST.hints[id]||0,x.level);save()}},["Pista "+x.level]))});w.appendChild(out);return w}
/* ---------- tocar-y-tocar + arrastre (Pointer Events) ---------- */
var sel=null;
function clearSel(){if(sel&&sel.el){sel.el.classList.remove("sel");sel.el.setAttribute("aria-pressed","false")}sel=null;$$(".droptarget.armed").forEach(function(t){t.classList.remove("armed")})}
function chip(label,val,kind,cls){var b=h("button",{type:"button",class:"c4chip "+(cls||""),"aria-pressed":"false","data-kind":kind},[label]);b._val=val;
 b.addEventListener("click",function(e){if(b._dragged){b._dragged=false;return}if(sel&&sel.el===b){clearSel();return}clearSel();sel={el:b,val:val,kind:kind};b.classList.add("sel");b.setAttribute("aria-pressed","true");$$('.droptarget[data-kind="'+kind+'"]').forEach(function(t){t.classList.add("armed")})});
 b.addEventListener("keydown",function(e){if(e.key==="Escape")clearSel()});
 var sx,sy,drag=false;
 b.addEventListener("pointerdown",function(e){if(e.button>0)return;sx=e.clientX;sy=e.clientY;drag=false;try{b.setPointerCapture(e.pointerId)}catch(_){}});
 b.addEventListener("pointermove",function(e){if(sx==null)return;var dx=e.clientX-sx,dy=e.clientY-sy;if(!drag&&Math.abs(dx)+Math.abs(dy)>8){drag=true;b.classList.add("dragging")}if(drag)b.style.transform="translate("+dx+"px,"+dy+"px)"});
 b.addEventListener("pointerup",function(e){if(sx==null)return;sx=null;if(!drag)return;b._dragged=true;b.classList.remove("dragging");b.style.transform="";b.style.visibility="hidden";var t=document.elementFromPoint(e.clientX,e.clientY);b.style.visibility="";var tg=t&&t.closest&&t.closest('.droptarget[data-kind="'+kind+'"]');if(tg&&tg._drop){clearSel();tg._drop(val,b)}setTimeout(function(){b._dragged=false},50)});
 b.addEventListener("pointercancel",function(){sx=null;b.classList.remove("dragging");b.style.transform=""});
 return b}
function target(el,kind,fn,label){el.classList.add("droptarget");el.setAttribute("data-kind",kind);el._drop=fn;if(el.tagName!=="BUTTON"){el.setAttribute("role","button");el.setAttribute("tabindex","0")}if(label)el.setAttribute("aria-label",label);
 function act(){if(sel&&sel.kind===kind){var v=sel.val,c=sel.el;clearSel();fn(v,c)}}
 el.addEventListener("click",function(e){if(e.target.closest(".c4chip"))return;act()});el.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target===el){e.preventDefault();act()}});return el}
/* ---------- «Mi fórmula» ---------- */
var fpanel=null;
function bounce(c){if(!c||RED)return;c.classList.add("bounce");setTimeout(function(){c.classList.remove("bounce")},300)}
function formulaComplete(){return ROWS.every(function(r){return ST.rev[r.key]})}
function renderFormula(){if(!F)return null;var box=h("section",{class:"formula card","aria-label":"Mi fórmula"});
 document.body.classList.add("has-formula");var mob=window.matchMedia&&matchMedia("(max-width:760px)").matches;if(mob)box.classList.add("closed");var tog=h("button",{type:"button",class:"ftoggle","aria-expanded":String(!mob)},[mob?"Mi fórmula ▲":"Mi fórmula ▼"]);tog.addEventListener("click",function(){var o=box.classList.toggle("closed");tog.setAttribute("aria-expanded",String(!o));tog.textContent=o?"Mi fórmula ▲":"Mi fórmula ▼"});box.appendChild(tog);
 box.appendChild(h("h3",null,["Mi fórmula"]));box.appendChild(h("div",{class:"en"},["My formula"]));
 var msg=h("p",{class:"fmsg"});
 var tbl=h("div",{class:"frows"});
 ROWS.forEach(function(r){var on=ST.unlock["s"+r.stage];var done=!!ST.rev[r.key];var lab=r.label;if(r.key==="el"&&ST.pron.usted)lab=r.labelComplete;if(r.key==="ellos"&&ST.pron.ustedes)lab=r.labelComplete;
  var row=h("div",{class:"frow"+(done?" done f-"+r.key:"")+(on?"":" locked")});
  row.appendChild(h("div",{class:"fp"},[lab]));
  var slot=h("div",{class:"fslot"});
  if(done){slot.appendChild(h("span",{class:"fend f-"+r.key},[SHAPE[r.key]+" "+r.answer]));slot.appendChild(h("span",{class:"fex",html:mark(r.example)}));slot.appendChild(h("span",{class:"fok"},["✓ ¡Eso!"]))}
  else if(on){slot.textContent="Suelta aquí";target(row,"end",function(v,c){if(v===r.answer){ST.rev[r.key]=true;save();applyRev();live(v+" en la fila "+r.label+": ¡eso!");refreshFormula();if(formulaComplete())celebrate()}else{bounce(c);ST.tries=ST.tries||[];ST.tries.push(v+"→"+r.key);save();setFb(msg,null,F.wrongChipFeedback+(S.en?" · "+F.wrongChipFeedbackEn:""))}},"Fila "+r.label+", vacía. Suelta aquí una terminación")}
  else slot.textContent="🔒 Etapa "+r.stage;
  row.appendChild(slot);
  // ficha de pronombre
  var pc=(F.pronounChips||[]).filter(function(p){return p.answerRow===r.key||p.trapRows.indexOf(r.key)>=0});
  pc.forEach(function(p){if(ST.unlock[p.key]&&!ST.pron[p.key])target(row,"pron",function(v,c){var pp=(F.pronounChips||[]).filter(function(x){return x.key===v})[0];if(!pp)return;if(pp.answerRow===r.key){ST.pron[v]=true;save();live("«"+v+"» en la fila "+r.label+": ¡eso!");refreshFormula()}else{bounce(c);setFb(msg,null,"Todavía no. Mira el verbo: ¿termina como «tú» o como «él / ella»?")}})});
  if(done){var ow=h("input",{class:"own",type:"text","aria-label":"En mis palabras: "+r.label,placeholder:"En mis palabras…",value:ST.own[r.key]||""});ow.addEventListener("input",function(){ST.own[r.key]=ow.value;save()});row.appendChild(ow)}
  tbl.appendChild(row)});
 (F.extraRows||[]).forEach(function(x){if(!ST.unlock[x.key==="no"?"no":"s1"])return;if(x.key==="sinpronombre"&&!ST.unlock.sinpron)return;var row=h("div",{class:"frow extra"});row.appendChild(h("div",{class:"fp"},[x.label]));var slot=h("div",{class:"fslot"});
  if(x.input==="text"){var t=h("input",{class:"own",type:"text","aria-label":x.label+": en mis palabras",placeholder:"En mis palabras…",value:ST.own[x.key]||""});t.addEventListener("input",function(){ST.own[x.key]=t.value;save()});slot.appendChild(t)}
  else{if(ST.own.no){slot.appendChild(h("span",{class:"fend fno"},["no + verbo"]));slot.appendChild(h("span",{class:"fok"},["✓ ¡Eso!"]))}else{slot.textContent="Suelta aquí";target(row,"no",function(v,c){if(v==="no + verbo"){ST.own.no="no + verbo";save();live("¡Eso! no + verbo");refreshFormula()}else{bounce(c);setFb(msg,null,"Todavía no. Mira dónde está «no» en las dos frases.")}},"Fila Negativo")}}
  row.appendChild(slot);tbl.appendChild(row)});
 box.appendChild(tbl);
 // fichas disponibles
 var bank=h("div",{class:"fbank","aria-label":"Fichas"});
 var stage=ST.unlock.s2?"2":ST.unlock.s1?"1":null;
 if(stage){var placed=ROWS.filter(function(r){return ST.rev[r.key]}).map(function(r){return r.answer});var pend=ROWS.some(function(r){return r.stage==+stage&&!ST.rev[r.key]});
  if(pend){ST.order=ST.order||{};if(!ST.order[stage]){ST.order[stage]=shuffle(F.chipsByStage[stage]);}ST.order[stage].forEach(function(c){if(placed.indexOf(c)>=0&&F.chipsByStage[stage].filter(function(x){return x===c}).length<2&&+stage===1)return;bank.appendChild(chip(c,c,"end"))})}}
 (F.pronounChips||[]).forEach(function(p){if(ST.unlock[p.key]&&!ST.pron[p.key])bank.appendChild(chip(p.key,p.key,"pron","pron"))});
 if(ST.unlock.no&&!ST.own.no)shuffle(F.noChips).forEach(function(c){bank.appendChild(chip(c,c,"no","nochip"))});
 if(bank.childNodes.length){box.appendChild(h("div",{class:"kicker",style:"margin-top:.6rem"},["Tus fichas · toca una y luego su fila (o arrástrala)"]));box.appendChild(bank)}
 box.appendChild(msg);
 if(formulaComplete())box.appendChild(h("p",{class:"fdone"},[F.completeMsg]));
 if(RM)box.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){if(confirm("¿Borrar la fórmula de este navegador?")){ST.rev={};ST.own={};ST.pron={};ST.unlock={};ST.order={};save();applyRev();refreshFormula()}}},["Empezar de nuevo (Ricardo)"]));
 return box}
function refreshFormula(){if(!fpanel||!fpanel.parentNode)return;var n=renderFormula();var closed=fpanel.classList.contains("closed");if(closed){n.classList.add("closed")}fpanel.parentNode.replaceChild(n,fpanel);fpanel=n;$$(".c4wrap").forEach(function(w){w.dispatchEvent(new Event("formula"))})}
function celebrate(){live(F.completeMsg);if(RED||!fpanel)return;var lay=h("div",{class:"confeti","aria-hidden":"true"});for(var i=0;i<30;i++){var s=h("span",{class:"cf f-"+ROWS[i%5].key},[SHAPE[ROWS[i%5].key]]);s.style.left=Math.random()*100+"%";s.style.animationDelay=Math.random()*.4+"s";lay.appendChild(s)}document.body.appendChild(lay);setTimeout(function(){lay.remove()},1600)}
function withFormula(main){var w=h("div",{class:"c4wrap"+(F?" hasf":"")});w.appendChild(main);fpanel=renderFormula();if(fpanel)w.appendChild(fpanel);return w}
/* ---------- pasos internos ---------- */
function stepper(n,render,key){var host=h("div",{class:"steps"});var cur=Math.min(ST[key]||0,n-1);var lab=h("div",{class:"steplab"});var body=h("div");var nav=h("div",{class:"stepnav"});
 var pv=h("button",{class:"btn line",type:"button",onclick:function(){if(cur>0){cur--;show()}}},["← Paso anterior"]);var nx=h("button",{class:"btn",type:"button",onclick:function(){if(cur<n-1){cur++;show()}}},["Paso siguiente →"]);nav.appendChild(pv);nav.appendChild(nx);
 function show(){ST[key]=cur;save();lab.textContent="Paso "+(cur+1)+" de "+n;body.innerHTML="";render(cur,body,function(){if(cur<n-1){cur++;show()}});pv.disabled=cur===0;nx.disabled=cur===n-1;try{lab.scrollIntoView({block:"nearest"})}catch(e){}}
 host.appendChild(lab);host.appendChild(body);host.appendChild(nav);setTimeout(show,0);return host}
function bubble(l,marked){var b=h("div",{class:"bub"});b.appendChild(h("b",{class:"who"},[l.who]));b.appendChild(marked?sent(l.es):h("span",{class:"c4s",lang:"es"},[l.es]));b.appendChild(h("span",{class:"en"},[l.en||""]));b.appendChild(audioRow(l,b));return b}
function sceneCard(sc,marked){var c=h("article",{class:"card scene"});var im=img(sc.img,"sc-img");if(im)c.appendChild(im);c.appendChild(h("div",{class:"sc-meta"},[h("span",{class:"time"},[sc.time]),h("span",null,[" · "+sc.place])]));sc.lines.forEach(function(l){c.appendChild(bubble(l,marked))});return c}
function playSeq(items,i){i=i||0;if(i>=items.length)return;play(items[i].a,null,null,null,function(){setTimeout(function(){playSeq(items,i+1)},500)})}
/* ===== R.discover ===== */
R.discover=function(s){return s.stage===1?colorado(s):sesion(s)};
function colorado(s){var main=h("div");main.appendChild(head(s));
 var sc=s.scenes.filter(function(x,i){return s.sort.fromScenes.indexOf(i)>=0});var pred=s.scenes[s.sort.predictScene];
 ST.sorted=ST.sorted||{};
 main.appendChild(stepper(5,function(k,body,next){
  if(k===0){body.appendChild(h("h3",{class:"steph"},["1 · Escucha las escenas"]));var all=[];sc.forEach(function(x){all=all.concat(x.lines)});body.appendChild(h("button",{class:"btn",type:"button",onclick:function(){playSeq(all)}},["▶ Escuchar todo"]));var g=h("div",{class:"grid g3 scenes"});sc.forEach(function(x){g.appendChild(sceneCard(x,false))});body.appendChild(g);body.appendChild(h("p",{class:"tiny"},[s.characters]))}
  if(k===1){body.appendChild(h("h3",{class:"steph"},["2 · Ordena"]));body.appendChild(h("p",null,[s.sort.instruction]));body.appendChild(h("p",{class:"en"},[s.sort.instructionEn]));
   var cols=h("div",{class:"sortcols"});var f=fb();var lines=[];sc.forEach(function(x){x.lines.forEach(function(l){lines.push(l)})});
   var bank=h("div",{class:"sbank"});
   function check(){if(lines.every(function(l){return ST.sorted[l.es]})){var b=h("button",{class:"btn big",type:"button",onclick:function(){ST.unlock.s1=true;save();refreshFormula();next()}},["Ver terminaciones →"]);bank.innerHTML="";bank.appendChild(b);markDone("c4-colorado-sort",{})}}
   s.sort.columns.forEach(function(c){var col=h("div",{class:"scol"});col.appendChild(h("div",{class:"sch"},[h("b",null,[c.label]),h("span",null,[" · "+c.sub]),h("span",{class:"en"},[" ("+c.subEn+")"])]));var list=h("div",{class:"slist"});col.appendChild(list);
    lines.filter(function(l){return ST.sorted[l.es]===c.key}).forEach(function(l){list.appendChild(h("div",{class:"placed"},["✓ "+l.es]))});
    target(col,"sent",function(v,chipEl){if(v.subj===c.key){ST.sorted[v.es]=c.key;save();chipEl.remove();list.appendChild(h("div",{class:"placed"},["✓ "+v.es]));setFb(f,true,"¡Eso!");check()}else{bounce(chipEl);setFb(f,false,"Mira quién habla en la escena.")}},"Columna "+c.label);cols.appendChild(col)});
   shuffle(lines).forEach(function(l){if(!ST.sorted[l.es]){var c=chip(l.es,l,"sent","long");c.insertBefore(h("small",null,[l.who+": "]),c.firstChild);bank.appendChild(c)}});
   body.appendChild(bank);body.appendChild(cols);body.appendChild(f);check()}
  if(k===2){body.appendChild(h("h3",{class:"steph"},["3 · Mira el final"]));if(!ST.unlock.s1){ST.unlock.s1=true;save();refreshFormula()}
   var cols2=h("div",{class:"sortcols"});s.sort.columns.forEach(function(c){var col=h("div",{class:"scol"});col.appendChild(h("div",{class:"sch"},[h("b",null,[c.label])]));sc.forEach(function(x){x.lines.forEach(function(l){if(l.subj===c.key)col.appendChild(h("div",{class:"placed"},[sent(l.es)]))})});cols2.appendChild(col)});body.appendChild(cols2);
   body.appendChild(h("div",{class:"guide"},[h("b",null,[s.guideQuestion.es]),h("div",{class:"en"},[s.guideQuestion.en]),h("p",{class:"tiny"},["Pon cada ficha en su fila de «Mi fórmula». "+(window.innerWidth<=760?"(abajo)":"(a la derecha)")])]));
   var rp=rpanel("Pistas · Mira el final",[hintBox("c4-colorado",s.hints),"Respuesta: yo → -o · tú → -as · él / ella → -a. Nunca digas la regla."]);if(rp)body.appendChild(rp)}
  if(k===3){body.appendChild(h("h3",{class:"steph"},["4 · Predice: ¿funciona tu fórmula?"]));var c=h("article",{class:"card scene"});var im=img(pred.img,"sc-img");if(im)c.appendChild(im);c.appendChild(h("div",{class:"sc-meta"},[h("span",{class:"time"},[pred.time]),h("span",null,[" · "+pred.place])]));
   var f2=fb();var okc=0;
   pred.lines.forEach(function(l){var m=l.es.match(new RegExp("(.*?escuch)(as|a|o)(.*)"));var row=h("div",{class:"bub"});row.appendChild(h("b",{class:"who"},[l.who]));var gap=h("span",{class:"gap"},["___"]);var line=h("span",{class:"c4s",lang:"es"},[m[1],gap,m[3]]);row.appendChild(line);
    var ch=h("span",{class:"gchips"});["-o","-as","-a"].forEach(function(e){var b=h("button",{type:"button",class:"c4chip sm",onclick:function(){gap.textContent=e.slice(1);gap.classList.add("filled");gap._v=e;$$("button",ch).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))})}},[e]);b.setAttribute("aria-pressed","false");ch.appendChild(b)});row.appendChild(ch);
    var pb=h("button",{class:"btn line sm",type:"button",onclick:function(){if(!gap._v){setFb(f2,null,"Primero elige una terminación.");return}play(l.a,null,null,row);var good=gap._v==="-"+m[2];line.innerHTML=mark(l.es);row.classList.add(good?"good":"bad");if(good){okc++;setFb(f2,true,okc>=3?"¡Tu fórmula funciona con un verbo nuevo!":"¡Eso! Escucha y compara.")}else setFb(f2,false,"Escucha: «"+l.es+"». Mira tu fórmula otra vez.")}},["▶ Comprobar"]);row.appendChild(pb);c.appendChild(row)});
   body.appendChild(c);body.appendChild(f2)}
  if(k===4){var u=s.usted;body.appendChild(h("h3",{class:"steph"},["5 · El señor Ruiz"]));body.appendChild(sceneCard(u,true));var f3=fb();
   var g1=u.guideQuestions[0],g2=u.guideQuestions[1];var q1=h("div",{class:"guide"},[h("b",null,[g1.es]),h("div",{class:"en"},[g1.en])]);var bb=h("div",{class:"opts"});
   g1.choices.forEach(function(ch,i){bb.appendChild(h("button",{class:"opt",type:"button",onclick:function(){if(i===g1.correct){ST.unlock.usted=true;save();refreshFormula();setFb(f3,true,"¡Eso! Ahora pon la ficha «usted» en su fila de «Mi fórmula».")}else setFb(f3,false,"Mira otra vez: «usted viaja» termina en -a.")}},[ch]))});q1.appendChild(bb);body.appendChild(q1);body.appendChild(f3);
   var q2=h("div",{class:"guide"},[h("b",null,[g2.es]),h("div",{class:"en"},[g2.en])]);var t=h("input",{class:"own",type:"text",placeholder:"En mis palabras… (vale en inglés)","aria-label":g2.es,value:ST.own.sinpronombre||""});t.addEventListener("input",function(){ST.own.sinpronombre=t.value;ST.unlock.sinpron=true;save()});q2.appendChild(t);body.appendChild(q2);
   var rp=rpanel("Pistas · usted",[hintBox("c4-usted",u.hints),"Respuesta 1: "+g1.answer,"Respuesta 2: "+g2.answer]);if(rp)body.appendChild(rp);markDone("c4-colorado",{})}
 },"stepColorado"));
 return withFormula(main)}
function sesion(s){var main=h("div");main.appendChild(head(s));
 main.appendChild(stepper(4,function(k,body,next){
  if(k===0){body.appendChild(h("h3",{class:"steph"},["1 · Una persona, varias personas"]));var g=h("div",{class:"grid g2"});s.pairs.forEach(function(p){var c=h("article",{class:"card pair"});var im=img(p.img,"pr-img");if(im)c.appendChild(im);c.appendChild(h("div",{class:"bub"},[sent(p.one.es)]));c.appendChild(h("div",{class:"bub"},[sent(p.many.es)]));if(p.note)c.appendChild(h("p",{class:"tiny"},[p.note]));c.appendChild(audioRow({a:p.a,es:p.one.es+" "+p.many.es},c));g.appendChild(c)});body.appendChild(g)}
  if(k===1){body.appendChild(h("h3",{class:"steph"},["2 · Descubre"]));if(!ST.unlock.s2){ST.unlock.s2=true;save();refreshFormula()}
   var mini=h("div",{class:"grid g2"});s.pairs.forEach(function(p){mini.appendChild(h("div",{class:"bub small"},[sent(p.one.es),h("br"),sent(p.many.es)]))});body.appendChild(mini);
   var gi=ST.gq||0;var box=h("div");body.appendChild(box);var f=fb();
   function showQ(){box.innerHTML="";var q=s.guideQuestions[Math.min(gi,s.guideQuestions.length-1)];box.appendChild(h("div",{class:"steplab"},["Pregunta "+(Math.min(gi,2)+1)+" de 3"]));var gd=h("div",{class:"guide"},[h("b",null,[q.es]),h("div",{class:"en"},[q.en])]);
    if(q.choices){var bb=h("div",{class:"opts"});q.choices.forEach(function(c,i){bb.appendChild(h("button",{class:"opt",type:"button",onclick:function(){if(i===q.correct){ST.unlock.ustedes=true;save();refreshFormula();setFb(f,true,"¡Eso! Pon la ficha «ustedes» en su fila.")}else setFb(f,false,"Piensa en «usted»: va como él / ella. ¿Y «ustedes»?")}},[c]))});gd.appendChild(bb)}
    else gd.appendChild(h("p",{class:"tiny"},["Pon la ficha en la fila de «Mi fórmula» y después toca «Siguiente pregunta»."]));
    box.appendChild(gd);if(gi<2)box.appendChild(h("button",{class:"btn line",type:"button",onclick:function(){gi++;ST.gq=gi;save();showQ()}},["Siguiente pregunta →"]));box.appendChild(f);
    var rp=rpanel("Pistas · etapa 2",[hintBox("c4-sesion",s.hints),"Respuesta: "+q.answer]);if(rp)box.appendChild(rp)}
   showQ()}
  if(k===2){var cd=s.checkDrag;body.appendChild(h("h3",{class:"steph"},["3 · Comprueba"]));body.appendChild(h("p",null,[cd.instruction]));var f2=fb();var ok=0,done=0;var list=h("div",{class:"checks"});var cnt=h("p",{class:"statline"});
   var bank=h("div",{class:"fbank"});cd.chips.forEach(function(c){var k2=END2ROW[c.slice(1)];var b=chip(c,c,"gap","f-"+k2+" endchip");b.insertBefore(h("span",{class:"shp","aria-hidden":"true"},[SHAPE[k2]+" "]),b.firstChild);bank.appendChild(b)});
   cd.items.forEach(function(it){var parts=it.stem.split("___");var gap=h("span",{class:"gap"},["___"]);var row=h("div",{class:"crow"},[h("span",{lang:"es"},[parts[0]]),gap,h("span",{lang:"es"},[parts[1]])]);var tries=0;
    target(row,"gap",function(v,c){if(row.classList.contains("good"))return;tries++;if(v===it.ans){gap.textContent=v.slice(1);gap.className="gap filled end e-"+END2ROW[v.slice(1)];row.classList.add("good");if(tries===1)ok++;done++;cnt.textContent=ok+" de "+cd.items.length+" a la primera";setFb(f2,true,"✓ "+it.fb)}else{bounce(c);setFb(f2,false,"Mira quién es el sujeto.")}},"Hueco: "+it.stem);list.appendChild(row)});
   body.appendChild(bank);body.appendChild(list);body.appendChild(cnt);body.appendChild(f2)}
  if(k===3){var pp=s.photographerPhrases;body.appendChild(h("h3",{class:"steph"},["4 · Dirige y narra"]));var set=h("div",{class:"photoset"});var im=img(s.img,"set-img");var alt7=s.narrate.prompts[0].img;set.appendChild(im);var flash=h("div",{class:"flash","aria-hidden":"true"});set.appendChild(flash);body.appendChild(set);
   var prev=null;var bb=h("div",{class:"phrases"});pp.items.forEach(function(it,i){var b=h("button",{class:"btn line phr",type:"button",onclick:function(){play(it.a);var st=im.getAttribute("data-st")||"";if(i===0){prev=[im.src,st];im.src=alt7.src;im.alt=alt7.alt;im.setAttribute("data-st","")}if(i===1){prev=[im.src,st];im.setAttribute("data-st","back")}if(i===2){prev=[im.src,st];im.setAttribute("data-st","left")}if(i===3&&!RED){flash.classList.remove("go");void flash.offsetWidth;flash.classList.add("go")}if(i===4&&prev){im.src=prev[0];im.setAttribute("data-st",prev[1])}}},["▶ "+it.es]);b.appendChild(h("span",{class:"en"},[" "+it.en]));bb.appendChild(b)});
   body.appendChild(h("div",{class:"kicker"},[pp.label+" · "+pp.tag]));body.appendChild(bb);
   body.appendChild(h("p",{style:"margin-top:1rem"},[s.narrate.instruction]));var g=h("div",{class:"grid g2"});s.narrate.prompts.forEach(function(p){var c=h("article",{class:"card pair"});c.appendChild(img(p.img,"pr-img"));c.appendChild(h("p",{class:"tiny"},["Verbo: "+p.verb]));var m=h("div",{class:"bub",hidden:true},[sent(p.model),audioRow(p,c)]);c.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){m.hidden=false;play(p.a)}},["Ver modelo"]));c.appendChild(m);g.appendChild(c)});body.appendChild(g);markDone("c4-sesion",{})}
 },"stepSesion"));
 return withFormula(main)}
/* ===== R.check (¿Quién es? + Dilo tú) ===== */
R.check=function(s){var main=h("div");main.appendChild(head(s));var L=s.listen;var box=h("div",{class:"card game"});main.appendChild(h("h3",{class:"steph"},["1 · ¿Quién es?"]));main.appendChild(box);
 var rounds,i,ok;function start(){rounds=shuffle(L.rounds);i=0;ok=0;render()}
 function render(){box.innerHTML="";if(i>=rounds.length){box.appendChild(h("div",{class:"result"},[h("div",{class:"badge"},[ok+" de "+rounds.length]),h("div",{class:"en"},["a la primera · first try"]),h("button",{class:"btn line",type:"button",onclick:start},["↻ Otra vez"])]));markDone(s.id+"-listen",{score:ok,total:rounds.length});live("Resultado: "+ok+" de "+rounds.length);return}
  var r=rounds[i],tries=0;box.appendChild(h("div",{class:"kicker"},["Ronda "+(i+1)+" de "+rounds.length]));var bp=h("button",{class:"play bigplay",type:"button","aria-label":"Escuchar",html:H.ICON.play,onclick:function(){play(r.a,null,bp)}});box.appendChild(bp);var f=fb();var os=h("div",{class:"opts"});
  L.options.forEach(function(o){var b=h("button",{class:"opt",type:"button"},[o.label]);b.addEventListener("click",function(){if(b.disabled)return;tries++;if(o.key===r.ans){b.classList.add("ok");if(tries===1)ok++;$$(".opt",os).forEach(function(x){x.disabled=true});f.className="feedback ok";f.innerHTML="";f.appendChild(document.createTextNode("¡Eso! "+r.fb+" · "));f.appendChild(sent(r.es));live("¡Eso! "+r.es);setTimeout(function(){i++;render()},1900)}else{b.classList.add("no");b.disabled=true;if(tries>=2){var good=L.options.filter(function(x){return x.key===r.ans})[0];$$(".opt",os).forEach(function(x){x.disabled=true});f.className="feedback no";f.innerHTML="";f.appendChild(document.createTextNode("Era «"+good.label+"»: "));f.appendChild(sent(r.es));setTimeout(function(){i++;render()},2600)}else{setFb(f,false,"Casi. Escucha otra vez.");play(r.a,"s",bp)}}});os.appendChild(b)});
  box.appendChild(os);box.appendChild(f)}
 box.appendChild(h("button",{class:"btn big",type:"button",onclick:start},["▶ Empezar"]));
 var sp=s.speak;main.appendChild(h("h3",{class:"steph"},["2 · Dilo tú"]));main.appendChild(h("p",null,[sp.instruction]));main.appendChild(h("p",{class:"en"},[sp.instructionEn]));var g=h("div",{class:"flips c4flips"});
 sp.cards.forEach(function(c,ix){var b=h("button",{class:"flip",type:"button","aria-label":"Tarjeta: "+c.subj+" · "+c.verb+" · "+c.rest+". Dila y pulsa para voltear."});var fimg=img(c.img,"fl-img");
  var inn=h("div",{class:"in"},[h("div",{class:"f"},[fimg,h("p",{class:"subj"},[c.subj]),h("p",{class:"inf"},[c.verb+" · "+c.rest]),h("small",null,["Dilo · toca para voltear"])]),h("div",{class:"b"},[h("p",{html:mark(c.es)}),h("small",null,["▶ escuchando…"])])]);b.appendChild(inn);b.addEventListener("click",function(){var on=b.classList.toggle("on");if(on)play(c.a)});g.appendChild(b)});main.appendChild(g);
 var rp=rpanel("Dilo tú",[h("p",null,["Modelos: "+sp.cards.map(function(c){return c.es}).join(" · ")]),"Meta: "+s.success]);if(rp)main.appendChild(rp);
 return withFormula(main)};
/* ===== R.detective ===== */
R.detective=function(s){var main=h("div");main.appendChild(head(s));var dn=s.discoverNo;
 main.appendChild(h("h3",{class:"steph"},["1 · ¿Dónde va «no»?"]));var g=h("div",{class:"grid g2"});dn.pairs.forEach(function(p){var c=h("article",{class:"card pair"});c.appendChild(h("div",{class:"bub"},[sent(p.pos)]));var neg=h("div",{class:"bub",hidden:true},[h("span",{class:"c4s",lang:"es",html:mark(p.neg).replace(/\bno\b/,'<b class="nohl">no</b>')})]);c.appendChild(neg);c.appendChild(h("div",{class:"arow"},[playBtn({a:p.a,es:p.pos+" "+p.neg},{el:c}),h("button",{class:"btn line sm",type:"button",onclick:function(){neg.hidden=false}},["Mostrar"])]));g.appendChild(c)});main.appendChild(g);
 main.appendChild(h("div",{class:"guide"},[h("b",null,[dn.guideQuestion.es]),h("div",{class:"en"},[dn.guideQuestion.en]),h("button",{class:"btn line sm",type:"button",onclick:function(){ST.unlock.no=true;save();refreshFormula()}},["Abrir la fila «Negativo» de Mi fórmula"])]));
 var rp=rpanel("Pistas · no",[hintBox("c4-no",dn.hints),"Respuesta: "+dn.answer]);if(rp)main.appendChild(rp);
 s.rounds.forEach(function(r,ri){main.appendChild(h("h3",{class:"steph"},[(ri+2)+" · Ronda "+r.who]));
  if(r.statements){var f=fb();var wrap=h("div",{class:"grid g3 det"});var picked=null;
   r.statements.forEach(function(st){var c=h("button",{type:"button",class:"card detcard"},[h("span",{class:"c4s",lang:"es",html:mark(st.es)})]);if(st.en)c.appendChild(h("span",{class:"en"},[st.en]));
    if(st.a)c.addEventListener("dblclick",function(){play(st.a)});
    c.addEventListener("click",function(){if(wrap.classList.contains("revealed"))return;if(st.a)play(st.a);$$(".detcard",wrap).forEach(function(x){x.classList.remove("sel")});c.classList.add("sel");picked=st});wrap.appendChild(c);c._st=st});
   main.appendChild(h("p",{class:"tiny"},["Toca la frase que crees que es mentira. Después toca «Revelar»."]));main.appendChild(wrap);
   main.appendChild(h("button",{class:"btn",type:"button",onclick:function(){if(!picked){setFb(f,null,"Primero toca una frase.");return}wrap.classList.add("revealed");if(!RED)wrap.classList.add("lupa");$$(".detcard",wrap).forEach(function(c){c.appendChild(h("b",{class:"tag "+(c._st.truth?"v":"m")},[c._st.truth?"✔ VERDAD":"✖ MENTIRA"]))});var lie=r.statements.filter(function(x){return !x.truth})[0];setFb(f,picked===lie?true:null,(picked===lie?"¡Bien, detective! ":"La mentira era otra. ")+"Ahora di: «"+r.frame+"»");if(RM&&lie.correction)f.appendChild(h("div",{class:"tiny"},["Modelo: "+lie.correction]))}},["🔍 Revelar"]));main.appendChild(f);
   if(RM&&r.expected){main.appendChild(rpanel("Ronda Ricardo",["Mentira: «"+r.statements.filter(function(x){return !x.truth})[0].es+"»","Ella debería decir: "+r.expected,"Tú: "+r.revealFrame]))}}
  else{main.appendChild(h("p",null,[r.instruction]));main.appendChild(h("p",{class:"en"},[r.instructionEn]));var fr=h("div",{class:"frames"});r.frames.forEach(function(x){fr.appendChild(h("span",{class:"pill"},[x]))});main.appendChild(fr);
   main.appendChild(h("p",{class:"tiny"},["Ricardo adivina: «"+r.ricardoGuessFrame+"» · Tú contestas: «"+r.shannonAnswerFrames.join("» / «")+"»"]))}});
 markDone(s.id,{});return withFormula(main)};
/* ===== R.wheel ===== */
R.wheel=function(s){var main=h("div");main.appendChild(head(s));var n=s.slices.length;ST.wheel=ST.wheel||[];var used=ST.wheel;
 var NS="http://www.w3.org/2000/svg";var svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","-110 -110 220 220");svg.setAttribute("class","wheel");svg.setAttribute("aria-hidden","true");var g=document.createElementNS(NS,"g");svg.appendChild(g);
 function draw(){g.innerHTML="";s.slices.forEach(function(sl,i){var a0=(i/n)*2*Math.PI-Math.PI/2,a1=((i+1)/n)*2*Math.PI-Math.PI/2;var p=document.createElementNS(NS,"path");p.setAttribute("d","M0 0 L"+100*Math.cos(a0)+" "+100*Math.sin(a0)+" A100 100 0 0 1 "+100*Math.cos(a1)+" "+100*Math.sin(a1)+"Z");var me=sl.mode==="S→R";p.setAttribute("fill",me?"#E3EFF0":"#F6F6EF");p.setAttribute("stroke",me?"#2F6A70":"#733635");p.setAttribute("stroke-width","1.5");if(used.indexOf(sl.n)>=0)p.setAttribute("opacity",".35");g.appendChild(p);
  var am=(a0+a1)/2;var t=document.createElementNS(NS,"text");t.setAttribute("x",70*Math.cos(am));t.setAttribute("y",70*Math.sin(am)+4);t.setAttribute("text-anchor","middle");t.setAttribute("font-size","11");t.setAttribute("font-weight","800");t.setAttribute("fill","#361E1C");t.textContent=(me?"🎤":"❓")+sl.n;g.appendChild(t)})}
 draw();var wbox=h("div",{class:"wheelbox"});wbox.appendChild(svg);wbox.appendChild(h("div",{class:"pointer","aria-hidden":"true"},["▼"]));
 var legend=h("p",{class:"tiny"},["❓ = Ricardo pregunta (tú contestas) · 🎤 = Tú preguntas a Ricardo"]);var res=h("div",{class:"card wres",hidden:true});var rot=0;
 function show(sl){res.hidden=false;res.innerHTML="";var me=sl.mode==="S→R";res.appendChild(h("div",{class:"kicker"},[(me?"🎤 Tú preguntas":"❓ Ricardo pregunta")+" · casilla "+sl.n]));
  if(me)res.appendChild(h("p",{class:"es-big"},[sl.task]));else{res.appendChild(h("p",{class:"es-big",lang:"es"},[sl.q]));if(sl.a)res.appendChild(audioRow({a:sl.a,es:sl.q},res))}
  var ex=h("p",{hidden:true,class:"wexp",html:mark(sl.expect)});res.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){ex.hidden=false}},["Ver ejemplo"]));res.appendChild(ex);if(sl.note&&RM)res.appendChild(h("p",{class:"tiny"},[sl.note]));live((me?"Tú preguntas: "+sl.task:"Ricardo pregunta: "+sl.q))}
 function spin(force){var avail=s.slices.filter(function(x){return used.indexOf(x.n)<0});if(!avail.length){used.length=0;avail=s.slices.slice()}var sl=force||avail[Math.floor(Math.random()*avail.length)];var i=s.slices.indexOf(sl);
  var target=360-((i+.5)/n)*360;rot=rot-(rot%360)+360*4+target;if(RED){svg.style.transition="none"}svg.style.transform="rotate("+rot+"deg)";used.push(sl.n);save();setTimeout(function(){draw();show(sl)},RED?0:2050)}
 var sb=h("button",{class:"btn big spin",type:"button",onclick:function(){spin()}},["🎡 Girar"]);
 main.appendChild(h("div",{class:"wheelwrap"},[wbox,h("div",null,[sb,legend,res])]));
 if(RM){var sel2=h("select",{"aria-label":"Elegir casilla"});s.slices.forEach(function(x){sel2.appendChild(h("option",{value:x.n},[x.n+" · "+(x.mode==="S→R"?"Tú preguntas":"Ricardo pregunta")]))});main.appendChild(rpanel("Ruleta",[s.teacherNote,"Meta: "+s.success,h("div",{class:"arow"},[sel2,h("button",{class:"btn line sm",type:"button",onclick:function(){spin(s.slices.filter(function(x){return x.n==sel2.value})[0])}},["Elegir casilla"]),h("button",{class:"btn line sm",type:"button",onclick:function(){used.length=0;save();draw()}},["Reiniciar"])])]))}
 markDone(s.id,{});return withFormula(main)};
/* ===== R.reto ===== */
function vicon(verb){return null}
R.reto=function(s){document.body.classList.add("reto-on");var main=h("div",{class:"reto"});main.appendChild(head(s));var RT=ST.reto;var box=h("div");main.appendChild(box);
 var phase=RT.phase||"intro",idx=RT.idx||0;
 function setP(p,i){phase=p;idx=i||0;RT.phase=p;RT.idx=idx;save();render()}
 function card(c,part){var d=h("article",{class:"card retocard"});var im=img(c.img,"rt-img");if(im)d.appendChild(im);else if(c.transfer){var ref=s.partA.cards.filter(function(x){return x.verb===c.verb})[0]}
  d.appendChild(h("p",{class:"subj"},[c.subj||""]));d.appendChild(h("p",{class:"inf"},[(c.verb||"")+(c.rest?" · "+c.rest:"")]));return d}
 function marks(part,n,model){if(!RM)return null;var cur=RT[part][n];var w=h("div",{class:"rmarks"});w.appendChild(h("span",{class:"tiny"},["Modelo: "+model]));[["✓","ok"],["✗","no"],["auto","auto"]].forEach(function(m){var b=h("button",{type:"button",class:"btn sm "+(cur===m[1]?"":"line"),onclick:function(){RT[part][n]=m[1];save();render()}},[m[0]]);w.appendChild(b)});return h("aside",{class:"rpanel"},[h("div",{class:"kicker"},["Solo Ricardo · marca"]),w])}
 function render(){box.innerHTML="";
  if(phase==="intro"){box.appendChild(h("div",{class:"card"},[h("p",{class:"es-big"},["Ahora sin la tabla y sin pistas."]),h("p",{class:"en"},["Now without the table and without hints."]),h("p",null,["Parte A: 10 tarjetas (dices la frase) · Parte B: 4 frases · Parte C: 8 preguntas de opción múltiple."]),h("button",{class:"btn big",type:"button",onclick:function(){setP("A",0)}},["Empezar el reto"])]))}
  if(phase==="A"){var c=s.partA.cards[idx];box.appendChild(h("div",{class:"kicker"},["Parte A · tarjeta "+(idx+1)+" de "+s.partA.cards.length]));box.appendChild(h("p",null,[s.partA.instruction]));var cc=card(c);if(!c.img||!c.img.src){var srcc={cenar:1,rentar:3}[c.verb];}box.appendChild(cc);var m=marks("A",c.n,c.model);if(m)box.appendChild(m);
   box.appendChild(h("button",{class:"btn",type:"button",onclick:function(){if(idx<s.partA.cards.length-1)setP("A",idx+1);else setP("B",0)}},["Siguiente tarjeta →"]))}
  if(phase==="B"){var it=s.partB.items[idx];box.appendChild(h("div",{class:"kicker"},["Parte B · "+(idx+1)+" de "+s.partB.items.length]));var d=h("article",{class:"card retocard"},[h("p",{class:"inf big"},[it.prompt])]);if(/✗/.test(it.prompt))d.appendChild(h("p",{class:"tiny"},["✗ = di que NO es verdad · "+(it.promptEn||"say it's NOT true")]));box.appendChild(d);var m2=marks("B",it.n,it.model);if(m2)box.appendChild(m2);
   box.appendChild(h("button",{class:"btn",type:"button",onclick:function(){if(idx<s.partB.items.length-1)setP("B",idx+1);else setP("C",0)}},["Siguiente →"]))}
  if(phase==="C"){var q=s.partC.items[idx];box.appendChild(h("div",{class:"kicker"},["Parte C · "+(idx+1)+" de "+s.partC.items.length]));box.appendChild(h("p",{class:"es-big"},[q.stem]));var os=h("div",{class:"opts col",role:"radiogroup","aria-label":q.stem});
   q.options.forEach(function(o,k){var L="ABCD"[k];var b=h("button",{type:"button",class:"opt"+(RT.C[q.n]===L?" chosen":""),role:"radio","aria-checked":String(RT.C[q.n]===L)},[L+") "+o.t]);b.addEventListener("click",function(){RT.C[q.n]=L;save();$$(".opt",os).forEach(function(x){x.classList.remove("chosen");x.setAttribute("aria-checked","false")});b.classList.add("chosen");b.setAttribute("aria-checked","true");live("Elegiste "+L)});os.appendChild(b)});box.appendChild(os);
   box.appendChild(h("div",{class:"arow"},[h("button",{class:"btn line",type:"button",onclick:function(){if(idx>0)setP("C",idx-1)}},["← Anterior"]),h("button",{class:"btn",type:"button",onclick:function(){if(idx<s.partC.items.length-1)setP("C",idx+1);else setP("end",0)}},[idx<s.partC.items.length-1?"Siguiente →":"Terminar"])]))}
  if(phase==="end"){box.appendChild(h("div",{class:"card"},[h("p",{class:"es-big"},["¡Listo! Terminaste el reto."]),h("p",{class:"en"},["Done! Ricardo will show you the results now."]),h("button",{class:"btn big",type:"button",onclick:function(){markDone(s.id,{});H.go(window.LESSON.slides.findIndex(function(x){return x.type==="review"}))}},["Ver resultados →"])]))}
  if(RM&&phase!=="intro")box.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){if(confirm("¿Borrar el reto de este navegador?")){ST.reto={A:{},B:{},C:{}};RT=ST.reto;save();setP("intro")}}},["Reiniciar reto (Ricardo)"]))}
 render();return main};
function results(s){var RT=ST.reto;var A=s.partA.cards,ok=0,grp={};A.forEach(function(c){var v=RT.A[c.n];if(v==="ok"||v==="auto"){ok++;grp[c.group]=1}});var marked=Object.keys(RT.A).length;
 var cC=function(n){var q=s.partC.items.filter(function(x){return x.n===n})[0];return RT.C[n]&&RT.C[n]===q.key};
 var o2=(["ok","auto"].indexOf(RT.B[1])>=0?1:0)+(["ok","auto"].indexOf(RT.B[2])>=0?1:0)+(cC(5)?1:0)+(cC(6)?1:0);
 var o3=(["ok","auto"].indexOf(RT.B[3])>=0?1:0)+(["ok","auto"].indexOf(RT.B[4])>=0?1:0)+(cC(7)?1:0)+(cC(8)?1:0);
 var comp=[1,2,3,4].filter(cC).length;
 return {o1:ok,o1g:Object.keys(grp).length,o1pass:ok>=8&&Object.keys(grp).length===5,o2:o2,o2pass:o2>=3,o3:o3,o3pass:o3>=3,comp:comp,marked:marked,bmarked:Object.keys(RT.B).length}}
/* ===== R.review ===== */
R.review=function(s,L){document.body.classList.remove("reto-on");var reto=L.slides.filter(function(x){return x.type==="reto"})[0];var r=results(reto);var main=h("div");main.appendChild(head(s));
 var res=h("div",{class:"grid g3"});function obj(t,v,tot,pass,note){var d=h("div",{class:"card objres"},[h("div",{class:"kicker"},[t]),h("div",{class:"badge"},[v+" / "+tot]),h("div",{class:"bar"},[h("i",{style:"width:"+Math.round(v/tot*100)+"%"})]),h("p",null,[pass?"✓ Logrado":"○ Todavía no"+(note?" · "+note:"")])]);return d}
 var pend=r.marked<10?"faltan marcas de Ricardo":"";res.appendChild(obj("O1 · terminaciones (Parte A)",r.o1,10,r.o1pass,pend||("grupos: "+r.o1g+"/5")));res.appendChild(obj("O2 · «no» antes del verbo",r.o2,4,r.o2pass,r.bmarked<4?"faltan marcas de B":""));res.appendChild(obj("O3 · preguntas",r.o3,4,r.o3pass,r.bmarked<4?"faltan marcas de B":""));main.appendChild(res);
 main.appendChild(h("p",{class:"tiny"},["Parte C 1–4 (reconocimiento, complementario): "+r.comp+" de 4."]));
 if(RM){var inp=h("input",{class:"own",type:"text",maxlength:"8",placeholder:"Letras de la Parte C, p. ej. ACDB…","aria-label":"Letras de la Parte C"});var cp=h("button",{class:"btn line sm",type:"button",onclick:function(){var t=(inp.value||"").toUpperCase().replace(/[^A-D]/g,"");if(t.length===8){reto.partC.items.forEach(function(q,i){ST.reto.C[q.n]=t[i]});save();H.go(L.slides.indexOf(s))}}},["Usar estas letras"]);
  var copy=h("button",{class:"btn sm",type:"button",onclick:function(){var R2=results(reto);var txt="Clase 4 · reto · "+new Date().toLocaleString("es-CO")+"\nO1: "+R2.o1+"/10 (grupos "+R2.o1g+"/5) "+(R2.o1pass?"LOGRADO":"no")+"\nO2: "+R2.o2+"/4 "+(R2.o2pass?"LOGRADO":"no")+"\nO3: "+R2.o3+"/4 "+(R2.o3pass?"LOGRADO":"no")+"\nA: "+JSON.stringify(ST.reto.A)+"\nB: "+JSON.stringify(ST.reto.B)+"\nC: "+reto.partC.items.map(function(q){return q.n+":"+(ST.reto.C[q.n]||"-")}).join(" ")+"\nPistas (nivel máx.): "+JSON.stringify(ST.hints)+"\nIntentos fallidos en Mi fórmula: "+(ST.tries||[]).join(", ");try{navigator.clipboard.writeText(txt);copy.textContent="Copiado ✓"}catch(e){prompt("Copia:",txt)}}},["Copiar resultado"]);
  main.appendChild(rpanel("Resultados",["Si Shannon hizo la Parte C en su equipo, escribe aquí sus 8 letras:",h("div",{class:"arow"},[inp,cp]),copy]))}
 main.appendChild(h("h3",{class:"steph"},["Parte C · retroalimentación"]));reto.partC.items.forEach(function(q){var ch=ST.reto.C[q.n];var d=h("details",{class:"card cfb"});d.appendChild(h("summary",null,[q.n+". "+q.stem+(ch?(ch===q.key?"  ✓":"  ✗"):"  (sin respuesta)")]));q.options.forEach(function(o,k){var L2="ABCD"[k];if(L2===ch||o.ok)d.appendChild(h("p",{class:o.ok?"okline":"noline"},[h("b",null,[(L2===ch?"Elegiste ":"")+(o.ok?"✓ ":"")+L2+") "]),h("span",{html:mark(o.t)}),h("br"),h("span",{class:"tiny"},[o.fb])]))});main.appendChild(d)});
 var two=h("div",{class:"grid g2"});var mine=h("div",{class:"card"},[h("h3",null,["Tu fórmula"])]);ROWS.forEach(function(rw){mine.appendChild(h("p",null,[h("b",null,[(ST.pron[rw.key==="el"?"usted":"ustedes"]&&rw.labelComplete||rw.label)+": "]),ST.rev[rw.key]?h("span",{class:"fend f-"+rw.key},[SHAPE[rw.key]+" "+rw.answer]):"—"," ",ST.own[rw.key]?h("i",null,["«"+ST.own[rw.key]+"»"]):""]))});
 var ref=h("div",{class:"card"},[h("h3",null,["Tabla completa"])]);var t=h("table",{class:"ftable"});s.fullTable.forEach(function(x){t.appendChild(h("tr",null,[h("td",null,[x.p]),h("td",null,[h("b",null,[x.e])]),h("td",{html:mark(x.ex)})]))});ref.appendChild(t);two.appendChild(mine);two.appendChild(ref);main.appendChild(two);
 var wo=h("div",{class:"card"},[h("div",{class:"kicker"},["Ojo · Watch out"])]);s.watchOut.forEach(function(x){wo.appendChild(h("p",null,["⚠ "+x.es,h("br"),h("span",{class:"en"},[x.en])]))});main.appendChild(wo);
 // revelar colores en la revisión
 ROWS.forEach(function(r){ST.rev[r.key]=ST.rev[r.key]||false});applyRev();
 return main};
/* summary con dos botones */
var oldSummary=R.summary;R.summary=function(s,L){document.body.classList.remove("reto-on");if(L.id==="clase-4")s.next={href:"index.html",label:"Volver al inicio"};var c=oldSummary(s,L);return c};
/* cover: aviso de voces + frase de rescate */
var oldCover=R.cover;R.cover=function(s,L){var c=oldCover(s,L);if(L.id!=="clase-4")return c;var t=$(".cv-txt",c);if(s.rescue)t.appendChild(h("div",{class:"rescue"},[h("div",{class:"kicker",style:"color:var(--teal)"},["Tu frase de rescate"]),h("div",{class:"arow"},[playBtn(s.rescue),h("b",{lang:"es"},[" "+s.rescue.es])])]));t.appendChild(h("p",{class:"tiny voice"},["Toca ▶ para empezar. "+s.voiceNotice.es+" "+(S.en?s.voiceNotice.en:"")]));return c};
/* quitar reto-on al salir */
var mo=new MutationObserver(function(){var r=$(".reto");if(!r)document.body.classList.remove("reto-on")});document.addEventListener("DOMContentLoaded",function(){});setTimeout(function(){var st=$("#main");if(st)mo.observe(st,{childList:true})},0);
/* ================= REPASO PARA EL QUIZ ================= */
R.plan=(function(old){return function(s,L){if(!s.schedule)return old(s,L);var w=h("div");w.appendChild(head(s));var g=h("div",{class:"grid g2"});ST.rq.plan=ST.rq.plan||{};
 s.schedule.forEach(function(d,i){var c=h("article",{class:"card dayc"});c.appendChild(h("div",{class:"kicker"},[d.day+" · "+d.minutes+" min"]));var ul=h("ul");d.tasks.forEach(function(t){ul.appendChild(h("li",null,[t]))});c.appendChild(ul);var lab=h("label",{class:"cd-item"});var cb=h("input",{type:"checkbox"});cb.checked=!!ST.rq.plan[i];cb.addEventListener("change",function(){ST.rq.plan[i]=cb.checked;save()});lab.appendChild(cb);lab.appendChild(h("span",{class:"cd-box","aria-hidden":"true"}));lab.appendChild(h("span",null,["Hecho"]));c.appendChild(lab);g.appendChild(c)});w.appendChild(g);return w}})(R.plan);
function linkify(ref){var out=h("span",{class:"refs"});(ref||"").split("·").forEach(function(part){var m=part.match(/(leccion-\d|clase-4)\.html#(\d+)/);if(m){var label=part.trim();out.appendChild(h("a",{class:"linkbtn",href:m[1]+".html#"+m[2]},["Repasar: "+label.replace(/\.html/,"")]))}});return out}
R.checklist=function(s){var w=h("div");w.appendChild(head(s));ST.rq.can=ST.rq.can||{};var items=practiceItems();
 s.groups.forEach(function(g){var d=h("details",{class:"card cgroup",open:true});var cnt=h("span",{class:"pill"});var sm=h("summary",null,[h("b",null,[g.title])," ",cnt]);d.appendChild(sm);
  function upd(){cnt.textContent=g.items.filter(function(i){return ST.rq.can[i.id]}).length+" de "+g.items.length}
  g.items.forEach(function(it){var lab=h("label",{class:"cd-item"});var cb=h("input",{type:"checkbox"});cb.checked=!!ST.rq.can[it.id];cb.addEventListener("change",function(){ST.rq.can[it.id]=cb.checked;save();upd()});lab.appendChild(cb);lab.appendChild(h("span",{class:"cd-box","aria-hidden":"true"}));lab.appendChild(h("span",{class:"cd-txt"},[h("b",{lang:"es"},[it.es]),h("span",{class:"en"},[it.en])]));var row=h("div",{class:"crow2"});row.appendChild(lab);row.appendChild(linkify(it.ref));
   var nums=items.filter(function(x){return x.obj===it.id}).map(function(x){return x.n});if(nums.length)row.appendChild(h("span",{class:"tiny"},["Practicar: ítem "+nums.join(", ")]));var failed=nums.filter(function(n){return ST.rq.res&&ST.rq.res[n]===false});if(failed.length)row.appendChild(h("span",{class:"tiny"},["Repite el ítem "+failed.join(", ")]));d.appendChild(row)});upd();w.appendChild(d)});return w};
function practiceItems(){var p=window.LESSON.slides.filter(function(x){return x.type==="mixpractice"})[0];return p?p.items:[]}
function norm(t){return String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zñ0-9 ]/g,"").replace(/\s+/g," ").trim()}
R.mixpractice=function(s,L){var w=h("div");w.appendChild(head(s));ST.rq.res=ST.rq.res||{};var items=s.items;var plan=L.slides[0].schedule||[];
 var ranges=plan.map(function(d){var m=d.tasks.join(" ").match(/ítems de práctica (\d+) a (\d+)/i);return m?[d.day,+m[1],+m[2]]:null}).filter(Boolean);
 var tabs=h("div",{class:"arow tabs"});var box=h("div",{class:"card game"});var cur=ST.rq.cur||0;
 ranges.forEach(function(r){tabs.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){cur=r[1]-1;show()}},[r[0]+" · "+r[1]+"–"+r[2]]))});tabs.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){var f=items.filter(function(x){return ST.rq.res[x.n]===false});if(f.length){cur=items.indexOf(f[0]);show()}}},["Otra vez: solo los fallados"]));
 w.appendChild(tabs);w.appendChild(box);
 function show(){ST.rq.cur=cur;save();box.innerHTML="";var it=items[cur];var done=items.filter(function(x){return ST.rq.res[x.n]!==undefined}).length;
  box.appendChild(h("div",{class:"statline"},[h("span",null,["Ítem "+it.n+" de "+items.length]),h("span",{class:"pill cl"+it.clase},["Clase "+it.clase]),h("span",null,["Hechos: "+done])]));
  box.appendChild(h("p",{class:"es-big"},[it.stem]));if(it.stemEn)box.appendChild(h("p",{class:"en"},[it.stemEn]));var f=fb();
  function result(ok,txt){ST.rq.res[it.n]=ok;save();f.className="feedback "+(ok?"ok":"no");f.innerHTML="";f.appendChild(h("span",{html:mark(txt)}));live(txt)}
  if(it.kind==="listen-mc"&&it.audio){box.appendChild(audioRow(it.audio,box))}
  if(it.kind==="mc"||it.kind==="listen-mc"){var os=h("div",{class:"opts col"});it.options.forEach(function(o){var b=h("button",{class:"opt",type:"button"},[o.t]);b.addEventListener("click",function(){if(os.classList.contains("answered"))return;os.classList.add("answered");$$(".opt",os).forEach(function(x){x.disabled=true});b.classList.add(o.ok?"ok":"no");var good=it.options.filter(function(x){return x.ok})[0];if(!o.ok){$$(".opt",os)[it.options.indexOf(good)].classList.add("ok")}result(o.ok,(o.ok?"✓ ":"✗ ")+o.fb+(o.ok?"":" · ✓ "+good.t+": "+good.fb))});os.appendChild(b)});box.appendChild(os)}
  if(it.kind==="fill"){var form=h("form",{class:"arow"});var inp=h("input",{class:"numin",type:"text",autocapitalize:"off",autocorrect:"off",spellcheck:"false",autocomplete:"off","aria-label":"Tu respuesta"});form.appendChild(inp);form.appendChild(h("button",{class:"btn",type:"submit"},["Revisar"]));form.addEventListener("submit",function(e){e.preventDefault();if(inp.disabled)return;var v=norm(inp.value);if(!v)return;var ok=(it.accept||[it.answer]).some(function(a){return norm(a)===v});inp.disabled=true;var wf=it.wrongFb&&Object.keys(it.wrongFb).filter(function(k){return norm(k)===v})[0];result(ok,ok?"✓ "+it.fb:"✗ "+(wf?it.wrongFb[wf]+" ":"")+"Respuesta: "+it.answer+". "+it.fb)});box.appendChild(form)}
  if(it.kind==="order"){var tgt=h("div",{class:"order-target"});var bank=h("div",{class:"order-bank"});var pick=[];shuffle(it.words).forEach(function(wd){var b=h("button",{class:"tok",type:"button"},[wd]);b.addEventListener("click",function(){if(b.disabled)return;b.disabled=true;pick.push([wd,b]);tgt.appendChild(h("span",{class:"tok"},[wd]));if(pick.length===it.words.length){var ok=pick.map(function(x){return x[0]}).join(" ")===it.words.join(" ");result(ok,(ok?"✓ ":"✗ Así: ")+it.es+" · "+it.fb);if(it.a)play(it.a)}});bank.appendChild(b)});
   box.appendChild(tgt);box.appendChild(bank);box.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){var x=pick.pop();if(x){x[1].disabled=false;tgt.lastChild&&tgt.removeChild(tgt.lastChild)}}},["Borrar"]))}
  if(it.kind==="say"){if(it.clock)box.appendChild(h("div",{class:"clockbig"},[it.clock]));var m=h("div",{hidden:true},[h("p",{class:"es-big",html:mark(it.model.es)}),audioRow(it.model,box),h("p",{class:"tiny"},[it.fb||""])]);box.appendChild(h("button",{class:"btn line",type:"button",onclick:function(){m.hidden=false;play(it.model.a)}},["Ver respuesta"]));box.appendChild(m);var sc=h("div",{class:"arow"},[h("button",{class:"btn sm",type:"button",onclick:function(){result(true,"✓ ¡Bien!")}},["Lo dije bien"]),h("button",{class:"btn line sm",type:"button",onclick:function(){result(false,"Repítelo en voz alta con el audio.")}},["Lo repito"])]);m.appendChild(sc)}
  box.appendChild(f);if(ST.rq.res[it.n]!==undefined&&it.kind!=="say")box.appendChild(h("p",{class:"tiny"},["(Ya lo hiciste: "+(ST.rq.res[it.n]?"✓":"✗")+")"]));
  box.appendChild(h("div",{class:"arow"},[h("button",{class:"btn line",type:"button",disabled:cur===0,onclick:function(){cur--;show()}},["← Anterior"]),h("button",{class:"btn",type:"button",disabled:cur===items.length-1,onclick:function(){cur++;show()}},["Siguiente →"])]));
  if(done===items.length)markDone(s.id,{})}
 show();return w};
R.quizinfo=function(s){var w=h("div");w.appendChild(head(s));var I=s.info;var c=h("div",{class:"card"});c.appendChild(h("p",{class:"es-big"},["Duración: "+I.duration]));c.appendChild(h("p",{class:"en"},[I.durationEn]));var ul=h("ul");I.rules.forEach(function(r,i){ul.appendChild(h("li",null,[r," ",h("span",{class:"en"},["("+I.rulesEn[i]+")"])]))});c.appendChild(ul);w.appendChild(c);
 var t=h("table",{class:"ftable"});t.appendChild(h("tr",null,[h("th",null,["Parte"]),h("th",null,["Preguntas"]),h("th",null,["Min"]),h("th",null,["Qué cubre"])]));I.sections.forEach(function(x){t.appendChild(h("tr",null,[h("td",null,[x.n+". "+x.name+" ",h("span",{class:"en"},[x.nameEn])]),h("td",null,[String(x.count)]),h("td",null,[String(x.minutes)]),h("td",null,[x.covers])]))});w.appendChild(h("div",{class:"card"},[t,h("p",{class:"tiny"},["Total: "+I.total.items+" preguntas · "+I.total.minutes+" minutos. Las voces son sintéticas."])]));
 var g=h("div",{class:"grid g2"});I.sections.forEach(function(x){var e=x.example;var c2=h("article",{class:"card"},[h("div",{class:"kicker"},["Ejemplo · parte "+x.n+" (no sale en el quiz)"])]);if(e.audio)c2.appendChild(h("p",null,["🎧 «"+e.audio+"»"]));c2.appendChild(h("p",{class:"es-big"},[e.stem]));if(e.options)c2.appendChild(h("p",null,[e.options.join(" · ")]));var a=h("p",{hidden:true},["✓ "+e.answer]);c2.appendChild(h("button",{class:"btn line sm",type:"button",onclick:function(){a.hidden=false}},["Ver respuesta"]));c2.appendChild(a);g.appendChild(c2)});w.appendChild(g);return w};
applyRev();
})();
