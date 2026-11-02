/* Garage English demo v5: Inyección y encendido, Caja y embrague, Diésel, new "Por dentro" photo,
   two new customers and 5 extra test items. Same ITEMS / SETS / GOALS / SCENES / TEST that app.js uses.
   Hotspot geometry: 1024x576 frame of each photo in d/img/. Loaded after views-v4.js. */
(function(){
const R=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6"/>', C=(cx,cy,r)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>', P=s=>'<polygon points="'+s+'"/>';
const sy=s=>s.split(/[\s-]+/);
const V5=[]; const geo={};
function centre(g){ let m=g.match(/cx="([\d.]+)" cy="([\d.]+)"/); if(m) return [+m[1],+m[2]];
  m=g.match(/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/); if(m) return [+m[1]+m[3]/2,+m[2]+m[4]/2];
  const n=(g.match(/points="([^"]+)"/)||[])[1]; const v=n.trim().split(/[\s,]+/).map(Number); let x=0,y=0; for(let i=0;i<v.length;i+=2){x+=v[i];y+=v[i+1];} return [x/(v.length/2),y/(v.length/2)]; }
function I(id,set,en,es,say,sents,g){ const c=centre(g);
  const it={id,set,en,es,syl:sy(say),tip:'Cómo se dice: '+say+'.',a:id,sents:sents.map((s,i)=>({en:s[0],es:s[1],say:s[2],a:id+'-s'+(i+1)})),hs:[[+(c[0]/10.24).toFixed(1),+(c[1]/5.76).toFixed(1)]]};
  V5.push(it); ITEMS.push(it); (geo[set]=geo[set]||{})[id]=g; return it; }
/* ---- Inyección y encendido · SENA 280601021 / 280601024 ---- */
I('injector','inj','fuel injector','inyector','FYUL in-YEK-ter',[['This is the fuel injector. The injector sprays fuel.','Este es el inyector. El inyector rocía gasolina.','THIS IS THE FYUL in-YEK-ter. THE in-YEK-ter SPREIS FYUL.'],['The injector is dirty. We clean it.','El inyector está sucio. Lo limpiamos.','THE in-YEK-ter IS DOR-ti. UI KLIIN IT.']],R(160,32,96,200));
I('fuelpump','inj','fuel pump','bomba de gasolina','FYUL PAMP',[['This is the fuel pump. It is in the fuel tank.','Esta es la bomba de gasolina. Está en el tanque.','THIS IS THE FYUL PAMP. IT IS IN THE FYUL TANK.'],['The fuel pump does not work.','La bomba de gasolina no funciona.','THE FYUL PAMP DAZ NOT UORK.']],R(336,32,88,214));
I('fuelfilter','inj','fuel filter','filtro de gasolina','FYUL FIL-ter',[['This is the fuel filter. I change the fuel filter.','Este es el filtro de gasolina. Yo cambio el filtro.','THIS IS THE FYUL FIL-ter. AI CHEINCH THE FYUL FIL-ter.']],R(508,26,96,228));
I('sparkplug','inj','spark plug','bujía','SPARK PLAG',[['This is the spark plug. The spark plug makes a spark.','Esta es la bujía. La bujía hace la chispa.','THIS IS THE SPARK PLAG. THE SPARK PLAG MEIKS A SPARK.'],['Check the spark plugs, please.','Revise las bujías, por favor.','CHEK THE SPARK PLAGS, PLIIS.']],R(718,44,64,186));
I('ignitioncoil','inj','ignition coil','bobina de encendido','ig-NI-shon KOYL',[['This is the ignition coil. The coil sends power to the spark plug.','Esta es la bobina. La bobina manda corriente a la bujía.','THIS IS THE ig-NI-shon KOYL. THE KOYL SENDS PAU-er TU THE SPARK PLAG.']],R(176,260,96,252));
I('throttlebody','inj','throttle body','cuerpo de aceleración','ZRO-tel BO-di',[['This is the throttle body. Air goes in here.','Este es el cuerpo de aceleración. El aire entra por aquí.','THIS IS THE ZRO-tel BO-di. ER GOUS IN JIR.'],['The throttle body is dirty.','El cuerpo de aceleración está sucio.','THE ZRO-tel BO-di IS DOR-ti.']],R(332,284,206,216));
I('ecu','inj','ECU','computadora del motor (ECU)','I SI YU',[['This is the ECU. It is the computer of the engine.','Esta es la ECU. Es la computadora del motor.','THIS IS THE I SI YU. IT IS THE kom-PYU-ter OV THE EN-yin.'],['We connect the scanner to the ECU.','Conectamos el escáner a la ECU.','UI ko-NEKT THE SKA-ner TU THE I SI YU.']],R(604,264,268,234));
/* ---- Caja y embrague · SENA 280601022 (transmisión) ---- */
I('gearbox','gear','transmission','caja de cambios','trans-MI-shon',[['This is the transmission. It has five gears.','Esta es la caja de cambios. Tiene cinco cambios.','THIS IS THE trans-MI-shon. IT JAS FAIV GIRS.'],['The transmission makes a noise.','La caja hace un ruido.','THE trans-MI-shon MEIKS A NOYZ.']],P('28,90 70,48 280,60 300,150 280,240 110,256 34,220'));
I('clutchdisc','gear','clutch disc','disco de embrague','KLACH DISK',[['This is the clutch disc. The clutch disc is worn.','Este es el disco de embrague. El disco está gastado.','THIS IS THE KLACH DISK. THE KLACH DISK IS UORN.']],C(415,150,92));
I('pressureplate','gear','pressure plate','prensa (plato de presión)','PRE-sher PLEIT',[['This is the pressure plate. It presses the clutch disc.','Esta es la prensa. Presiona el disco de embrague.','THIS IS THE PRE-sher PLEIT. IT PRE-ses THE KLACH DISK.']],C(634,152,106));
I('flywheel','gear','flywheel','volante del motor','FLAI-uiil',[['This is the flywheel. It turns with the engine.','Este es el volante del motor. Gira con el motor.','THIS IS THE FLAI-uiil. IT TORNS WITH THE EN-yin.']],C(876,160,110));
I('gearlever','gear','gear shift','palanca de cambios','GIR shift',[['This is the gear shift. Put it in first gear.','Esta es la palanca de cambios. Póngala en primera.','THIS IS THE GIR shift. PUT IT IN FORST GIR.'],['Put the gear shift in neutral.','Ponga la palanca en neutro.','PUT THE GIR shift IN NIU-tral.']],R(112,284,72,236));
I('transfluid','gear','transmission fluid','aceite de transmisión','trans-MI-shon FLU-id',[['This is the transmission fluid. It is red.','Este es el aceite de transmisión. Es rojo.','THIS IS THE trans-MI-shon FLU-id. IT IS RED.'],['Check the transmission fluid level.','Revise el nivel del aceite de la caja.','CHEK THE trans-MI-shon FLU-id LE-vel.']],R(286,256,102,260));
I('releasebearing','gear','release bearing','balinera de empuje (collarín)','ri-LIIS BE-ring',[['This is the release bearing. It makes a noise.','Este es el collarín. Hace ruido.','THIS IS THE ri-LIIS BE-ring. IT MEIKS A NOYZ.']],C(490,405,64));
I('driveshaft','gear','drive shaft','semieje','DRAIV SHAFT',[['This is the drive shaft. It goes to the wheel.','Este es el semieje. Va hasta la rueda.','THIS IS THE DRAIV SHAFT. IT GOUS TU THE UIIL.']],R(580,352,422,96));
/* ---- Diésel · SENA 838100 Mantenimiento de motores diésel ---- */
I('dslinjector','dsl','diesel injector','inyector diésel','DII-sel in-YEK-ter',[['This is the diesel injector. It works at high pressure.','Este es el inyector diésel. Trabaja a alta presión.','THIS IS THE DII-sel in-YEK-ter. IT UORKS AT JAI PRE-sher.']],R(92,16,106,232));
I('glowplug','dsl','glow plug','bujía de precalentamiento','GLOU PLAG',[['This is the glow plug. It heats the engine in the morning.','Esta es la bujía de precalentamiento. Calienta el motor en la mañana.','THIS IS THE GLOU PLAG. IT JIITS THE EN-yin IN THE MOR-ning.'],['Wait for the glow plug light.','Espere el testigo de precalentamiento.','UEIT FOR THE GLOU PLAG LAIT.']],R(310,30,60,200));
I('dslfilter','dsl','diesel filter','filtro de combustible diésel','DII-sel FIL-ter',[['This is the diesel filter. It removes water from the diesel.','Este es el filtro diésel. Quita el agua del combustible.','THIS IS THE DII-sel FIL-ter. IT ri-MUUVS UO-ter FROM THE DII-sel.']],R(460,40,140,182));
I('turbo','dsl','turbocharger','turbo','TOR-bou-char-yer',[['This is the turbocharger. It pushes more air into the engine.','Este es el turbo. Mete más aire al motor.','THIS IS THE TOR-bou-char-yer. IT PU-shes MOR ER IN-tu THE EN-yin.']],R(672,34,276,206));
I('injpump','dsl','injection pump','bomba de inyección','in-YEK-shon PAMP',[['This is the injection pump. It sends diesel to the injectors.','Esta es la bomba de inyección. Manda el diésel a los inyectores.','THIS IS THE in-YEK-shon PAMP. IT SENDS DII-sel TU THE in-YEK-ters.']],R(72,264,222,264));
I('adblue','dsl','AdBlue','AdBlue (líquido para el escape)','AD-blu',[['This is AdBlue. Do not put it in the fuel tank.','Esto es AdBlue. No lo eche en el tanque de combustible.','THIS IS AD-blu. DU NOT PUT IT IN THE FYUL TANK.']],R(378,260,174,262));
I('intercooler','dsl','intercooler','intercooler (enfriador del aire)','IN-ter-kuu-ler',[['This is the intercooler. It cools the air from the turbo.','Este es el intercooler. Enfría el aire del turbo.','THIS IS THE IN-ter-kuu-ler. IT KUULS THE ER FROM THE TOR-bou.']],R(610,300,358,204));
/* ---- Por dentro: new interior photo, five more parts ---- */
I('headrest','in','headrest','cabecera','JED-rest',[['This is the headrest. Adjust the headrest, please.','Esta es la cabecera. Ajuste la cabecera, por favor.','THIS IS THE JED-rest. a-YAST THE JED-rest, PLIIS.']],P('0,80 60,70 104,120 110,330 70,372 0,380')+P('1024,70 960,70 918,130 914,350 960,400 1024,410'));
I('sunvisor','in','sun visor','parasol','SAN VAI-zor',[['This is the sun visor. Pull down the sun visor.','Este es el parasol. Baje el parasol.','THIS IS THE SAN VAI-zor. PUL DAUN THE SAN VAI-zor.']],P('136,14 418,14 412,52 150,58')+P('598,14 880,14 870,58 604,52'));
I('domelight','in','dome light','luz del techo','DOUM LAIT',[['This is the dome light. Turn on the dome light.','Esta es la luz del techo. Prenda la luz del techo.','THIS IS THE DOUM LAIT. TORN ON THE DOUM LAIT.']],R(440,22,138,36));
I('cupholder','in','cup holder','portavasos','KAP JOUL-der',[['This is the cup holder. Put your coffee here.','Este es el portavasos. Ponga su café aquí.','THIS IS THE KAP JOUL-der. PUT YOR KO-fi JIR.']],R(494,522,62,52));
I('climatecontrol','in','A/C controls','controles del aire acondicionado','EI SI kon-TROULS',[['These are the A/C controls. Turn on the A/C.','Estos son los controles del aire. Prenda el aire.','THIIZ AR THE EI SI kon-TROULS. TORN ON THE EI SI.'],['The A/C does not blow cold air.','El aire no sale frío.','THE EI SI DAZ NOT BLOU KOULD ER.']],R(456,336,116,34));
{ const k=I('clutchin','in','clutch pedal','pedal del clutch (embrague)','KLACH PE-dal',[['This is the clutch pedal. I press the clutch pedal.','Este es el pedal del clutch. Piso el pedal del clutch.','THIS IS THE KLACH PE-dal. AI PRES THE KLACH PE-dal.'],['The clutch is on the left.','El clutch está a la izquierda.','THE KLACH IS ON THE LEFT.']],R(314,398,44,36));
  k.tip='Cómo se dice: KLACH PE-dal. La "u" de clutch suena como una "a" corta.'; k.a='clutchpedal'; k.sents[0].a='clutchpedal-s1'; k.sents[1].a='clutchpedal-s2'; }
/* existing interior parts, re-drawn on the new photo */
const IN={steeringwheel:'<path fill-rule="evenodd" d="M200 292a108 102 0 1 0 216 0a108 102 0 1 0-216 0ZM222 292a86 80 0 1 1 172 0a86 80 0 1 1-172 0Z"/>'+C(308,298,40),
 dashboard:P('176,232 250,200 420,196 820,214 842,250 840,300 580,300 570,286 416,286 176,290'),
 screen:R(450,218,130,64), rearviewmirror:R(434,78,146,46), gearstick:P('494,380 520,380 524,430 540,486 482,486 496,430'),
 brakepedal:R(362,400,44,36), accelerator:R(414,404,32,40), seat:P('282,470 440,470 448,576 286,576')+P('574,470 742,470 746,576 572,576'),
 seatbelt:R(456,470,30,106), doorhandlein:R(104,250,40,24)+R(872,250,40,24)};
Object.keys(IN).forEach(id=>{ const it=byId(id); if(!it) return; geo.in[id]=IN[id]; const c=centre(IN[id]); it.hs=[[+(c[0]/10.24).toFixed(1),+(c[1]/5.76).toFixed(1)]]; });
/* sections */
Object.assign(SETS,{
  inj:{n:'Inyección y encendido',t:'FUEL & IGNITION',img:'d/img/injection.webp',need:20,map:4},
  gear:{n:'Caja y embrague',t:'TRANSMISSION & CLUTCH',img:'d/img/gearbox.webp',need:22,map:4},
  dsl:{n:'Diésel',t:'DIESEL ENGINE',img:'d/img/diesel.webp',need:24,map:4}});
SETS.in.img='d/img/interior3.webp';
Object.assign(GOALS,{
  inj:['Puedo nombrar 7 partes de inyección y encendido.','Puedo pedir una revisión: "Check the spark plugs, please."'],
  gear:['Puedo nombrar 8 partes de la caja y el embrague.','Puedo dar una instrucción: "Put the gear shift in neutral."'],
  dsl:['Puedo nombrar 7 partes básicas del motor diésel.','Sé advertir: "Do not put AdBlue in the fuel tank."']});
GOALS.in=['Puedo nombrar 16 partes del interior del carro.','Puedo decir qué hago con ellas: "Pull down the sun visor."'];
/* photo views */
const S=window.SCHEM, IM=f=>({href:'d/img/'+f+'?v=10',x:0,y:0,w:1024,h:576});
S.inj={name:'INYECCIÓN Y ENCENDIDO',vb:'0 0 1024 576',img:IM('injection.webp'),base:'',parts:geo.inj};
S.gear={name:'CAJA Y EMBRAGUE',vb:'0 0 1024 576',img:IM('gearbox.webp'),base:'',parts:geo.gear};
S.dsl={name:'MOTOR DIÉSEL',vb:'0 0 1024 576',img:IM('diesel.webp'),base:'',parts:geo.dsl};
S.in={name:'INTERIOR',vb:'0 0 1024 576',img:IM('interior3.webp'),base:'',parts:geo.in};
if(S.views){ S.views.inside=S.in; Object.assign(S.views,{inj:S.inj,gear:S.gear,dsl:S.dsl}); }
/* ---- two new customers ---- */
SCENES.push({id:'spongy',title:'Pedal de freno esponjoso',client:'tom',section:'customer',stars:0,nodes:{
 a:{who:'tom',en:'Hi. My brake pedal goes to the floor.',es:'Hola. Mi pedal del freno se va hasta el piso.',a:'sc-spongy-a',opts:[
   {en:'Please do not drive the car. I will check the brakes.',es:'Por favor no maneje el carro. Voy a revisar los frenos.',q:'good',next:'b',a:'sc-spongy-a-r1'},
   {en:'It is OK. Drive slowly.',es:'Está bien. Maneje despacio.',q:'bad',next:'a',fb:'Peligro: sin freno no se maneja el carro.',a:'sc-spongy-a-r2'}]},
 b:{who:'jorge',en:'Check the brake fluid and the brake hoses.',es:'Revisa el líquido de frenos y las mangueras.',a:'sc-spongy-b',opts:[
   {en:'The brake fluid is low. There is a leak in the brake hose.',es:'El líquido de frenos está bajo. Hay una fuga en la manguera.',q:'good',next:'c',a:'sc-spongy-b-r1'},
   {en:'The spark plug is dirty.',es:'La bujía está sucia.',q:'bad',next:'b',fb:'La bujía es del motor. El problema es del sistema de frenos.',a:'sc-spongy-b-r2'}]},
 c:{who:'tom',en:'Is it expensive?',es:'¿Es caro?',a:'sc-spongy-c',opts:[
   {en:'We change the hose and bleed the brakes. It costs eighty dollars.',es:'Cambiamos la manguera y purgamos los frenos. Cuesta ochenta dólares.',q:'good',next:'d',a:'sc-spongy-c-r1'},
   {en:'Yes.',es:'Sí.',q:'ok',next:'d',fb:'Explíquele qué va a hacer y cuánto cuesta.',a:'sc-spongy-c-r2'}]},
 d:{who:'tom',en:'OK. Please fix it.',es:'Bueno. Por favor arréglelo.',a:'sc-spongy-d',opts:[
   {en:'Thank you. Please sign the work order.',es:'Gracias. Por favor firme la orden de trabajo.',q:'good',next:null,a:'sc-spongy-d-r1'}]}}});
SCENES.push({id:'alt',title:'Testigo de batería encendido',client:'lopez',section:'customer',stars:0,nodes:{
 a:{who:'lopez',en:'Good morning. The battery light is on.',es:'Buenos días. El testigo de la batería está encendido.',a:'sc-alt-a',opts:[
   {en:'Good morning. I will check the battery and the alternator.',es:'Buenos días. Voy a revisar la batería y el alternador.',q:'good',next:'b',a:'sc-alt-a-r1'},
   {en:'Put more fuel in the car.',es:'Échele más gasolina.',q:'bad',next:'a',fb:'El testigo de batería habla del sistema de carga, no de la gasolina.',a:'sc-alt-a-r2'}]},
 b:{who:'jorge',en:'Use the multimeter, please.',es:'Usa el multímetro, por favor.',a:'sc-alt-b',opts:[
   {en:'The battery has twelve volts. The alternator does not charge.',es:'La batería tiene doce voltios. El alternador no carga.',q:'good',next:'c',a:'sc-alt-b-r1'},
   {en:'Here is the hammer.',es:'Aquí está el martillo.',q:'bad',next:'b',fb:'Don Jorge pidió el multímetro (multimeter).',a:'sc-alt-b-r2'}]},
 c:{who:'lopez',en:'What is the problem?',es:'¿Cuál es el problema?',a:'sc-alt-c',opts:[
   {en:'The alternator belt is loose. We need a new belt.',es:'La correa del alternador está floja. Necesitamos una correa nueva.',q:'good',next:'d',a:'sc-alt-c-r1'},
   {en:'The battery is very old.',es:'La batería está muy vieja.',q:'ok',next:'d',fb:'La batería está bien: la falla es la correa del alternador.',a:'sc-alt-c-r2'}]},
 d:{who:'lopez',en:'When is it ready?',es:'¿Cuándo está listo?',a:'sc-alt-d',opts:[
   {en:'It will be ready in one hour.',es:'Va a estar listo en una hora.',q:'good',next:null,a:'sc-alt-d-r1'}]}}});
/* ---- test: the original 10 stay first (comparable); 5 new items on the new content ---- */
TEST.push({t:'listen',ref:'sparkplug',v5:1},{t:'meaning',ref:'clutchdisc',v5:1},{t:'meaning',ref:'headrest',v5:1},{t:'listen',ref:'glowplug',v5:1},
 {t:'sentence',id:'test-15',en:'The battery light is on. Check the ____.',es:'El testigo de la batería está encendido. Revise el alternador.',ans:'alternator',opts:['alternator','transmission','sun visor','turbocharger'],a:'test-15',v5:1});
window.SENA_V5=V5;
/* ---- «Cómo se juega» with real photos ---- */
IMG.posters=['d/img/poster-learn.webp?v=10','d/img/poster-rules.webp?v=10'];
vReception=function(){
  const st=(n,t,d)=>'<li><span class="mono">'+n+'</span><b class="lbl">'+t+'</b><span>'+d+'</span></li>';
  app('<div class="ph1"><h1 class="lbl">Cómo se juega</h1><span class="mono">RECEPCIÓN</span></div>'+
   '<figure class="poster"><img src="'+IMG.posters[0]+'" alt="Un aprendiz de mecánica señala el motor mientras el jefe de taller escucha"><figcaption class="lbl">Así vas a aprender</figcaption></figure>'+
   '<ol class="steps4">'+st('01','Ve','Toca la parte en la foto.')+st('02','Oye','Escucha cómo se dice.')+st('03','Di','Dila en voz alta.')+st('04','Usa','Úsala con el cliente.')+'</ol>'+
   '<figure class="poster"><img src="'+IMG.posters[1]+'" alt="Un mecánico atiende a un cliente en el mostrador del taller con la orden de trabajo"><figcaption class="lbl">Reglas del taller</figcaption></figure>'+
   '<ul class="rules4"><li>'+IC('arrows-clockwise')+'Los errores no se castigan: vuelven en el repaso.</li><li>'+IC('star')+'Las estrellas abren nuevas secciones.</li><li>'+IC('hard-hat')+'Cada sección termina con el reto del Jefe de taller.</li><li>'+IC('users')+'Con los clientes practicas lo que aprendiste.</li></ul>'+
   '<button class="b wide" id="again">'+IC('play')+'Ver la historia otra vez</button>');
  $('#again').onclick=()=>go('intro'); };
const _vIntro=vIntro; vIntro=function(){ _vIntro(); $$('#app p').forEach(p=>{ if(/10 preguntas/.test(p.textContent)) p.textContent=p.textContent.replace('10 preguntas',TEST.length+' preguntas'); }); };
/* ---- test with 15 items: score on the original 10 stays comparable ---- */
let TT=null;
vTest=function(){
  const N=TEST.length; S.tests=S.tests||{};
  if(!TT||TT.kind!==args.kind) TT={kind:args.kind||'pre',i:0,ans:[],items:TEST.map(testItem)};
  const name=TT.kind==='pre'?'inicial':'final';
  if(TT.i>=N){ const a=TT.ans, s10=a.slice(0,10).filter(x=>x).length, s5=a.slice(10).filter(x=>x).length;
    S.tests[TT.kind]={score:s10,scoreNew:s5,total:s10+s5,of:N,date:new Date().toISOString(),answers:a.map(x=>x?1:0)}; logEv('test-'+TT.kind,'total',s10>=7,s10+'/10 · '+s5+'/'+(N-10)); gain(20); save();
    const pre=S.tests.pre;
    app('<section class="panel end"><span class="lbl">Prueba '+name+'</span><div class="w mono">'+(s10+s5)+' / '+N+'</div><p class="mutl">Preguntas de siempre: '+s10+'/10 · Contenido nuevo: '+s5+'/'+(N-10)+'</p>'+
      (TT.kind==='post'&&pre?'<p>Antes: '+pre.score+'/10 · Ahora: '+s10+'/10'+(pre.scoreNew!=null?' · Nuevas: '+pre.scoreNew+' → '+s5:'')+'</p>':'<p>Ahora a aprender en el taller. Al final haz la prueba final y compara.</p>')+
      '<button class="b wide" id="h">'+IC('garage')+'Ir al taller</button></section>'); TT=null; $('#h').onclick=()=>go('home'); return; }
  const t=TEST[TT.i], it=TT.items[TT.i];
  let h='<div class="qhead"><span class="lbl">Prueba '+name+'</span><span class="mono">'+String(TT.i+1).padStart(2,'0')+' / '+N+'</span></div><div class="pbar"><div style="width:'+(TT.i/N*100)+'%"></div></div><div class="panel">';
  if(t.t==='listen') h+='<p class="mut" style="text-align:center">Escucha y elige:</p><button class="b wide" id="pl">'+IC('speaker-high')+'Escuchar</button>';
  if(t.t==='meaning') h+='<p class="mut" style="text-align:center">¿Cómo se dice en inglés?</p><div class="prompt">'+esc(it.p.es)+'</div>';
  if(t.t==='sentence') h+='<p class="mut" style="text-align:center">Completa:</p><div class="prompt" lang="en" style="font-size:22px">'+esc(it.prompt)+'</div><div class="mut" style="text-align:center">'+esc(it.es)+'</div>';
  app(h+'<div class="opts">'+it.opts.map(o=>'<button class="opt" lang="en" data-o="'+esc(o)+'">'+esc(o)+'</button>').join('')+'</div><p class="mut">En la prueba no se muestra si acertaste. Haz tu mejor intento.</p></div>');
  if($('#pl')){ const pl=()=>play(it.a,it.ans); $('#pl').onclick=pl; pl(); }
  $$('.opt').forEach(b=>b.onclick=()=>{ const good=b.dataset.o===it.ans; TT.ans.push(good); logEv('test-'+TT.kind,t.ref||t.id,good,b.dataset.o); TT.i++; vTest(); });
};
})();
/* grille sat under the front bumper and could not be tapped: draw the bumper first */
(function(){ const sd=window.SCHEM.views&&window.SCHEM.views.side; if(!sd) return; const p=sd.parts, o={frontbumper:p.frontbumper}; Object.keys(p).forEach(k=>{ if(k!=='frontbumper') o[k]=p[k]; }); sd.parts=o; })();
