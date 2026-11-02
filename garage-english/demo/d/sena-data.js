/* Garage English demo v4: SENA-aligned content (new sections, tools, warning lights, a cooling-system client).
   Pushed into the same ITEMS / SETS / GOALS / SCENES / WORKSHOP that app.js uses, so every game and the CSV report see it.
   Hotspot geometry: 1024x576 frame of each photo in d/img/. */
(function(){
const P=s=>'<polygon points="'+s+'"/>', R=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4"/>', C=(cx,cy,r)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>';
const sy=s=>s.split(/[\s-]+/);
/* item builder: id,set,en,es,say,[[en,es,say],...],geometry */
const NEW=[];
function I(id,set,en,es,say,sents,geo){
  const it={id,set,en,es,syl:sy(say),tip:'Cómo se dice: '+say+'.',a:id,sents:sents.map((s,i)=>({en:s[0],es:s[1],say:s[2],a:id+'-s'+(i+1)})),hs:[],geo};
  NEW.push(it); return it;
}
/* ---- 1. Motor (engine bay) · SENA 280601019/020/021/022 ---- */
I('engine','eng','engine','motor','EN-yin',[['This is the engine. The engine is hot.','Este es el motor. El motor está caliente.','THIS IS THE EN-yin. THE EN-yin IS JOT.'],['Turn off the engine, please.','Apague el motor, por favor.','TORN OF THE EN-yin, PLIIS.']],P('362,140 680,140 688,318 366,328'));
I('battery','eng','battery','batería','BA-te-ri',[['This is the battery. The battery is dead.','Esta es la batería. La batería está descargada.','THIS IS THE BA-te-ri. THE BA-te-ri IS DED.'],['I charge the battery.','Yo cargo la batería.','AI CHARYCH THE BA-te-ri.']],P('150,180 292,178 300,290 155,292'));
I('coolanttank','eng','coolant tank','depósito del refrigerante','KUU-lant TANK',[['This is the coolant tank. The coolant is pink.','Este es el depósito del refrigerante. El refrigerante es rosado.','THIS IS THE KUU-lant TANK. THE KUU-lant IS PINK.'],['Check the coolant level.','Revise el nivel del refrigerante.','CHEK THE KUU-lant LE-vel.']],P('272,104 348,104 352,190 276,192'));
I('radiatorcap','eng','radiator cap','tapa del radiador','REI-di-ei-ter KAP',[['This is the radiator cap. The radiator cools the engine.','Esta es la tapa del radiador. El radiador enfría el motor.','THIS IS THE REI-di-ei-ter KAP. THE REI-di-ei-ter KUULS THE EN-yin.'],['Never open a hot radiator cap.','Nunca abra la tapa del radiador caliente.','NE-ver OU-pen A JOT REI-di-ei-ter KAP.']],C(372,468,26));
I('brakefluid','eng','brake fluid','líquido de frenos','BRAYK FLU-id',[['This is the brake fluid. Check the brake fluid.','Este es el líquido de frenos. Revise el líquido de frenos.','THIS IS THE BRAYK FLU-id. CHEK THE BRAYK FLU-id.'],['The brake fluid is low.','El líquido de frenos está bajo.','THE BRAYK FLU-id IS LOU.']],P('370,88 434,88 436,132 372,134'));
I('oilcap','eng','oil cap','tapa del aceite','OYL KAP',[['This is the oil cap. I open the oil cap.','Esta es la tapa del aceite. Yo abro la tapa del aceite.','THIS IS THE OYL KAP. AI OU-pen THE OYL KAP.'],['I put oil in the engine.','Yo le echo aceite al motor.','AI PUT OYL IN THE EN-yin.']],C(628,246,24));
I('dipstick','eng','dipstick','varilla del aceite','DIP-stik',[['This is the dipstick. I pull out the dipstick.','Esta es la varilla del aceite. Yo saco la varilla.','THIS IS THE DIP-stik. AI PUL AUT THE DIP-stik.'],['The oil level is OK.','El nivel del aceite está bien.','THE OYL LE-vel IS OU-KEI.']],C(641,388,15));
I('airfilter','eng','air filter','filtro de aire','ER FIL-ter',[['This is the air filter. The air filter is dirty.','Este es el filtro de aire. El filtro de aire está sucio.','THIS IS THE ER FIL-ter. THE ER FIL-ter IS DOR-ti.'],['I change the air filter.','Yo cambio el filtro de aire.','AI CHEINCH THE ER FIL-ter.']],P('152,312 270,306 284,410 176,420 150,380'));
I('fusebox','eng','fuse box','caja de fusibles','FYUZ BOKS',[['This is the fuse box. I open the fuse box.','Esta es la caja de fusibles. Yo abro la caja de fusibles.','THIS IS THE FYUZ BOKS. AI OU-pen THE FYUZ BOKS.'],['This fuse is bad.','Este fusible está malo.','THIS FYUZ IS BAD.']],P('676,82 762,80 766,152 678,156'));
I('washerfluid','eng','washer fluid','líquido limpiaparabrisas','WO-sher FLU-id',[['This is the washer fluid. I fill the washer fluid.','Este es el líquido limpiaparabrisas. Yo lleno el líquido.','THIS IS THE WO-sher FLU-id. AI FIL THE WO-sher FLU-id.']],C(264,463,22));
I('alternator','eng','alternator','alternador','OL-ter-nei-ter',[['This is the alternator. The alternator charges the battery.','Este es el alternador. El alternador carga la batería.','THIS IS THE OL-ter-nei-ter. THE OL-ter-nei-ter CHAR-yez THE BA-te-ri.']],C(748,302,42));
I('belt','eng','belt','correa','BELT',[['This is the belt. The belt is loose.','Esta es la correa. La correa está floja.','THIS IS THE BELT. THE BELT IS LUUS.'],['I check the belt.','Yo reviso la correa.','AI CHEK THE BELT.']],P('690,380 760,350 800,372 790,420 730,432 696,412'));
/* ---- 2. Cabina (driver seat and dashboard) · SENA 280601024/025/026 ---- */
I('clutchpedal','cab','clutch pedal','pedal del embrague','KLACH PE-dal',[['This is the clutch pedal. I press the clutch pedal.','Este es el pedal del embrague. Piso el pedal del embrague.','THIS IS THE KLACH PE-dal. AI PRES THE KLACH PE-dal.'],['The clutch is on the left.','El embrague está a la izquierda.','THE KLACH IS ON THE LEFT.']],P('300,330 334,330 338,370 302,370'));
I('handbrake','cab','parking brake','freno de mano','PAR-king breik',[['This is the parking brake. Pull the parking brake.','Este es el freno de mano. Suba el freno de mano.','THIS IS THE PAR-king breik. PUL THE PAR-king breik.'],['The parking brake is on.','El freno de mano está puesto.','THE PAR-king breik IS ON.']],P('634,424 662,420 704,576 664,576'));
I('horn','cab','horn','pito','JORN',[['This is the horn. I press the horn.','Este es el pito. Yo toco el pito.','THIS IS THE JORN. AI PRES THE JORN.'],['The horn does not work.','El pito no funciona.','THE JORN DAZ NOT UORK.']],C(370,182,44));
I('tachometer','cab','tachometer','tacómetro','ta-KO-me-ter',[['This is the tachometer. It shows the engine speed.','Este es el tacómetro. Muestra las revoluciones del motor.','THIS IS THE ta-KO-me-ter. IT SHOUS THE EN-yin SPIID.']],C(287,133,33));
I('speedometer','cab','speedometer','velocímetro','spi-DO-me-ter',[['This is the speedometer. It shows the speed.','Este es el velocímetro. Muestra la velocidad.','THIS IS THE spi-DO-me-ter. IT SHOUS THE SPIID.']],C(400,123,33));
I('hazardbutton','cab','hazard button','botón de las estacionarias','JA-zard BA-ton',[['This is the hazard button. I press the hazard button.','Este es el botón de las estacionarias. Yo lo presiono.','THIS IS THE JA-zard BA-ton. AI PRES THE JA-zard BA-ton.']],R(568,180,22,28));
I('lightswitch','cab','light switch','interruptor de luces','LAIT SUICH',[['This is the light switch. I turn on the lights.','Este es el interruptor de luces. Yo prendo las luces.','THIS IS THE LAIT SUICH. AI TORN ON THE LAITS.']],C(160,230,27));
I('airvent','cab','air vent','rejilla del aire','ER VENT',[['This is the air vent. Cold air comes out.','Esta es la rejilla del aire. Sale aire frío.','THIS IS THE ER VENT. KOULD ER KAMS AUT.']],P('118,134 200,128 204,170 120,176'));
I('windowswitch','cab','window switch','botón del vidrio','UIN-dou SUICH',[['This is the window switch. I open the window.','Este es el botón del vidrio. Yo abro el vidrio.','THIS IS THE UIN-dou SUICH. AI OU-pen THE UIN-dou.']],P('36,362 88,356 92,408 40,414'));
I('glovebox','cab','glove box','guantera','GLAV BOKS',[['This is the glove box. The papers are in the glove box.','Esta es la guantera. Los papeles están en la guantera.','THIS IS THE GLAV BOKS. THE PEI-pers AR IN THE GLAV BOKS.']],P('690,196 880,182 884,236 696,248'));
/* ---- 3. Testigos del tablero (warning lights) · SENA 280601024 ---- */
const W=(id,en,es,say,s1,s2)=>I(id,'warn',en,es,say,[s1].concat(s2?[s2]:[]),null);
W('checkengine','check engine light','testigo de revisar motor','CHEK EN-yin LAIT',['The check engine light is on.','El testigo de revisar motor está encendido.','THE CHEK EN-yin LAIT IS ON.'],['We need to scan the car.','Necesitamos escanear el carro.','UI NIID TU SKAN THE KAR.']);
W('oillight','oil light','testigo de presión de aceite','OYL LAIT',['The oil light is on. Stop the engine.','El testigo del aceite está encendido. Apague el motor.','THE OYL LAIT IS ON. STOP THE EN-yin.']);
W('batterylight','battery light','testigo de la batería','BA-te-ri LAIT',['The battery light is on. Check the alternator.','El testigo de la batería está encendido. Revise el alternador.','THE BA-te-ri LAIT IS ON. CHEK THE OL-ter-nei-ter.']);
W('templight','temperature light','testigo de temperatura','TEM-pe-ra-chur LAIT',['The temperature light is on. The engine is too hot.','El testigo de temperatura está encendido. El motor está muy caliente.','THE TEM-pe-ra-chur LAIT IS ON. THE EN-yin IS TUU JOT.']);
W('brakelight','brake warning light','testigo de frenos','BRAYK UOR-ning LAIT',['The brake warning light is on. Check the brake fluid.','El testigo de frenos está encendido. Revise el líquido de frenos.','THE BRAYK UOR-ning LAIT IS ON. CHEK THE BRAYK FLU-id.']);
W('abslight','ABS light','testigo del ABS','EI BI ES LAIT',['The ABS light is on.','El testigo del ABS está encendido.','THE EI BI ES LAIT IS ON.']);
W('airbaglight','airbag light','testigo del airbag','ER-bag LAIT',['The airbag light is on. The airbag does not work.','El testigo del airbag está encendido. El airbag no funciona.','THE ER-bag LAIT IS ON. THE ER-bag DAZ NOT UORK.']);
W('seatbeltlight','seatbelt light','testigo del cinturón','SIIT-belt LAIT',['The seatbelt light is on. Put on your seatbelt.','El testigo del cinturón está encendido. Póngase el cinturón.','THE SIIT-belt LAIT IS ON. PUT ON YOR SIIT-belt.']);
W('fuellight','fuel light','testigo de gasolina','FYUL LAIT',['The fuel light is on. The tank is almost empty.','El testigo de gasolina está encendido. El tanque está casi vacío.','THE FYUL LAIT IS ON. THE TANK IS OL-moust EMP-ti.']);
W('tpmslight','tire pressure light','testigo de presión de llantas','TAIR PRE-sher LAIT',['The tire pressure light is on. Check the tires.','El testigo de presión de llantas está encendido. Revise las llantas.','THE TAIR PRE-sher LAIT IS ON. CHEK THE TAIRS.']);
/* ---- 4. Frenos, suspensión y dirección (wheel corner) · SENA 280601027/028/026 ---- */
I('brakedisc','sys','brake disc','disco de freno','BRAYK DISK',[['This is the brake disc. The brake disc is hot.','Este es el disco de freno. El disco está caliente.','THIS IS THE BRAYK DISK. THE BRAYK DISK IS JOT.'],['The brake disc is worn.','El disco de freno está gastado.','THE BRAYK DISK IS UORN.']],'<path fill-rule="evenodd" d="M434 302a140 158 0 1 0 280 0a140 158 0 1 0-280 0ZM512 300a60 66 0 1 0 120 0a60 66 0 1 0-120 0Z"/>');
I('caliper','sys','brake caliper','mordaza del freno','BRAYK KA-li-per',[['This is the brake caliper. The caliper is red.','Esta es la mordaza del freno. La mordaza es roja.','THIS IS THE BRAYK KA-li-per. THE KA-li-per IS RED.']],P('366,182 412,170 470,172 490,210 474,380 420,396 384,392 362,330'));
I('brakepad','sys','brake pad','pastilla de freno','BRAYK PAD',[['These are the brake pads. The brake pads are worn.','Estas son las pastillas. Las pastillas están gastadas.','THIIS AR THE BRAYK PADS. THE BRAYK PADS AR UORN.'],['I change the brake pads.','Yo cambio las pastillas de freno.','AI CHEINCH THE BRAYK PADS.']],P('452,206 470,200 474,368 456,372'));
I('brakehose','sys','brake hose','manguera de freno','BRAYK JOUZ',[['This is the brake hose. The brake hose has a leak.','Esta es la manguera de freno. La manguera tiene una fuga.','THIS IS THE BRAYK JOUZ. THE BRAYK JOUZ JAS A LIIK.']],P('254,34 284,34 286,140 330,172 404,182 400,204 322,194 262,160 252,100'));
I('spring','sys','coil spring','espiral (resorte)','KOYL SPRING',[['This is the coil spring. The spring is broken.','Este es el espiral. El espiral está partido.','THIS IS THE KOYL SPRING. THE SPRING IS BROU-ken.']],R(426,0,124,112));
I('shock','sys','shock absorber','amortiguador','SHOK ab-SOR-ber',[['This is the shock absorber. The shock absorber is leaking.','Este es el amortiguador. El amortiguador está botando aceite.','THIS IS THE SHOK ab-SOR-ber. THE SHOK ab-SOR-ber IS LII-king.']],R(456,108,54,62));
I('controlarm','sys','control arm','tijera','kon-TROUL ARM',[['This is the control arm. The control arm holds the wheel.','Esta es la tijera. La tijera sostiene la rueda.','THIS IS THE kon-TROUL ARM. THE kon-TROUL ARM JOULDS THE UIIL.']],P('116,430 300,440 420,452 440,478 414,506 120,468'));
I('tierod','sys','tie rod','terminal de dirección','TAI ROD',[['This is the tie rod. The tie rod moves the wheel.','Este es el terminal de dirección. Mueve la rueda.','THIS IS THE TAI ROD. THE TAI ROD MUUVS THE UIIL.']],P('128,344 186,340 330,372 372,356 386,400 330,402 186,412 130,396'));
I('cvaxle','sys','CV axle','eje homocinético','SI VI AK-sel',[['This is the CV axle. The CV axle turns the wheel.','Este es el eje homocinético. Hace girar la rueda.','THIS IS THE SI VI AK-sel. THE SI VI AK-sel TORNS THE UIIL.'],['The rubber boot is broken.','El guardapolvo de caucho está roto.','THE RA-ber BUUT IS BROU-ken.']],P('438,470 520,474 600,494 646,506 646,532 600,536 520,552 444,548'));
/* ---- 5. More tools and safety (SENA 280601019 + seguridad y salud en el trabajo) ---- */
const T=(id,en,es,say,s)=>I('tool-'+id,'tool',en,es,say,[s],null);
T('torquewrench','torque wrench','torquímetro','TORK RENCH',['I tighten the nut with the torque wrench.','Aprieto la tuerca con el torquímetro.','AI TAI-ten THE NAT WITH THE TORK RENCH.']);
T('multimeter','multimeter','multímetro','MUL-ti-mi-ter',['I check the battery with the multimeter.','Reviso la batería con el multímetro.','AI CHEK THE BA-te-ri WITH THE MUL-ti-mi-ter.']);
T('tiregauge','tire gauge','medidor de presión','TAIR GEICH',['I check the tire pressure with the tire gauge.','Reviso la presión con el medidor.','AI CHEK THE TAIR PRE-sher WITH THE TAIR GEICH.']);
T('jackstand','jack stand','torre (soporte del gato)','YAK STAND',['Put the car on the jack stands.','Ponga el carro sobre las torres.','PUT THE KAR ON THE YAK STANDS.']);
T('safetyglasses','safety glasses','gafas de seguridad','SEIF-ti GLA-sez',['Wear your safety glasses, please.','Use sus gafas de seguridad, por favor.','UER YOR SEIF-ti GLA-sez, PLIIS.']);
T('gloves','gloves','guantes','GLAVS',['Put on your gloves.','Póngase los guantes.','PUT ON YOR GLAVS.']);

/* hotspot % for the Spot game (centre of each shape in its 1024x576 photo) */
function centre(g){ if(!g) return null; let m=g.match(/cx="([\d.]+)" cy="([\d.]+)"/); if(m) return [+m[1],+m[2]];
  m=g.match(/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/); if(m) return [+m[1]+m[3]/2,+m[2]+m[4]/2];
  m=g.match(/M(\d+) (\d+)a(\d+) (\d+)/); if(m) return [+m[1]+ +m[3],+m[2]];
  const n=(g.match(/points="([^"]+)"/)||[])[1]; if(!n) return null; const v=n.trim().split(/[\s,]+/).map(Number); let x=0,y=0; for(let i=0;i<v.length;i+=2){x+=v[i];y+=v[i+1];} return [x/(v.length/2),y/(v.length/2)]; }
NEW.forEach(it=>{ const c=centre(it.geo); if(c) it.hs=[[+(c[0]/10.24).toFixed(1),+(c[1]/5.76).toFixed(1)]]; });
window.SENA_NEW=NEW;

/* push into the app's live data */
NEW.forEach(it=>{ const o=Object.assign({},it); delete o.geo; ITEMS.push(o); });
Object.assign(SETS,{
  eng:{n:'Motor',t:'YOUR ENGINE',img:'d/img/engine-bay.webp',need:9,map:4},
  cab:{n:'Cabina',t:'YOUR DASHBOARD',img:'d/img/cabin.webp',need:12,map:5},
  warn:{n:'Testigos',t:'WARNING LIGHTS',img:null,need:15,map:7},
  sys:{n:'Frenos y suspensión',t:'YOUR BRAKES',img:'d/img/brakes.webp',need:18,map:6}
});
Object.assign(GOALS,{
  eng:['Puedo nombrar 12 partes del motor en inglés.','Puedo pedir revisar un fluido: "Check the coolant level."','Puedo decir el estado de una parte: "The belt is loose."'],
  cab:['Puedo nombrar 10 mandos de la cabina del conductor.','Puedo decir qué hago: "I press the clutch pedal."'],
  warn:['Reconozco 10 testigos del tablero y sé decir cuál está encendido.','Puedo decir qué hacer: "The oil light is on. Stop the engine."'],
  sys:['Puedo nombrar 9 partes de frenos, suspensión y dirección.','Puedo explicar una falla: "The brake pads are worn."'],
  tool:GOALS.tool.concat(['Puedo pedir el equipo de seguridad: "Wear your safety glasses."'])
});
GOALS.tool[0]='Puedo nombrar 16 herramientas y equipos del taller.';
/* Workshop phrases: work order, diagnosis, delivery (SENA 280601015 + formatos del taller) */
const ws=[['5 · Orden de trabajo','Please sign the work order.','Por favor firme la orden de trabajo.','PLIIS SAIN THE UORK OR-der.'],
 ['5 · Orden de trabajo','What is your phone number?','¿Cuál es su número de teléfono?','UAT IS YOR FOUN NAM-ber?'],
 ['5 · Orden de trabajo','We will do an oil change.','Vamos a hacer un cambio de aceite.','UI UIL DU AN OYL CHEINCH.'],
 ['6 · Diagnóstico','I will scan the car.','Voy a escanear el carro.','AI UIL SKAN THE KAR.'],
 ['6 · Diagnóstico','There is a leak under the car.','Hay una fuga debajo del carro.','THER IS A LIIK AN-der THE KAR.'],
 ['6 · Diagnóstico','The engine is overheating.','El motor se está recalentando.','THE EN-yin IS OU-ver-jii-ting.'],
 ['7 · Entrega','We changed the brake pads.','Cambiamos las pastillas de freno.','UI CHEINCHD THE BRAYK PADS.'],
 ['7 · Entrega','Here is your invoice.','Aquí está su factura.','JIR IS YOR IN-vois.']];
ws.forEach((w,i)=>WORKSHOP.push({scene:w[0],en:w[1],es:w[2],say:w[3],a:'ws-'+(26+i)}));
/* New client: overheating engine (cooling system, SENA 280601020) */
SCENES.push({id:'heat',title:'Motor recalentado',client:'brown',section:'customer',stars:12,nodes:{
 a:{who:'brown',en:'Hello. My engine is very hot.',es:'Hola. Mi motor está muy caliente.',a:'sc-heat-a',opts:[
   {en:'Please stop the engine. I will check the coolant.',es:'Por favor apague el motor. Voy a revisar el refrigerante.',q:'good',next:'b',a:'sc-heat-a-r1'},
   {en:'Open the radiator cap now.',es:'Abra la tapa del radiador ya.',q:'bad',next:'a',fb:'Peligro: nunca se abre el radiador caliente.',a:'sc-heat-a-r2'}]},
 b:{who:'jorge',en:'The coolant tank is empty. Look for a leak.',es:'El depósito del refrigerante está vacío. Busca una fuga.',a:'sc-heat-b',opts:[
   {en:'There is a leak in the radiator hose.',es:'Hay una fuga en la manguera del radiador.',q:'good',next:'c',a:'sc-heat-b-r1'},
   {en:'The tire is flat.',es:'La llanta está pinchada.',q:'bad',next:'b',fb:'Habla del sistema de refrigeración, no de la llanta.',a:'sc-heat-b-r2'}]},
 c:{who:'brown',en:'Can you fix it today?',es:'¿Lo puede arreglar hoy?',a:'sc-heat-c',opts:[
   {en:'Yes. Please sign the work order.',es:'Sí. Por favor firme la orden de trabajo.',q:'good',next:'d',a:'sc-heat-c-r1'},
   {en:'Yes. I sign the work order.',es:'Sí. Yo firmo la orden de trabajo.',q:'ok',next:'d',fb:'El cliente es quien firma: "Please sign…".',a:'sc-heat-c-r2'}]},
 d:{who:'brown',en:'Thank you. When is it ready?',es:'Gracias. ¿Cuándo está listo?',a:'sc-heat-d',opts:[
   {en:'It will be ready at five o\'clock.',es:'Va a estar listo a las cinco.',q:'good',next:null,a:'sc-heat-d-r1'}]}}});
})();
