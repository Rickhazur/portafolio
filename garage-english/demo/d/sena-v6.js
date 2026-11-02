/* Garage English demo v6: «Por dentro» covers the whole interior in three photo views
   (Tablero y pedales · Consola central · Puerta y silla). Loaded after sena-v5.js.
   Hotspot geometry: 1024x576 frame of d/img/in-*.webp. */
(function(){
const VER='9', R=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6"/>', C=(cx,cy,r)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>', P=s=>'<polygon points="'+s+'"/>';
const sy=s=>s.split(/[\s-]+/);
const VIEWS={
 dash:{label:'Tablero y pedales',name:'INTERIOR · TABLERO Y PEDALES',img:'in-dash.webp',parts:{}},
 con:{label:'Consola central',name:'INTERIOR · CONSOLA CENTRAL',img:'in-console.webp',parts:{}},
 door:{label:'Puerta y silla',name:'INTERIOR · PUERTA Y SILLA',img:'in-door.webp',parts:{}}};
const PRIM={}, ORDER_IN=[], V6=[];
function centre(g){ let m=g.match(/M([\d.]+) ([\d.]+)a/); if(m) return [+m[1]+15,+m[2]];
  m=g.match(/cx="([\d.]+)" cy="([\d.]+)"/); if(m) return [+m[1],+m[2]];
  m=g.match(/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/); if(m) return [+m[1]+m[3]/2,+m[2]+m[4]/2];
  const n=(g.match(/points="([^"]+)"/)||[])[1]; const v=n.trim().split(/[\s,]+/).map(Number); let x=0,y=0; for(let i=0;i<v.length;i+=2){x+=v[i];y+=v[i+1];} return [x/(v.length/2),y/(v.length/2)]; }
const hsOf=g=>{ const c=centre(g); return [[+(c[0]/10.24).toFixed(1),+(c[1]/5.76).toFixed(1)]]; };
function place(id,view,g,extra){ VIEWS[view].parts[id]=g; PRIM[id]=view; ORDER_IN.push(id); (extra||[]).forEach(e=>VIEWS[e[0]].parts[id]=e[1]); }
/* new part with new audio */
function N(id,view,en,es,say,sents,g,tip,extra){
  const it={id,set:'in',en,es,syl:sy(say),tip:tip||('Cómo se dice: '+say+'.'),a:id,sents:sents.map((s,i)=>({en:s[0],es:s[1],say:s[2],a:id+'-s'+(i+1)})),hs:hsOf(g)};
  ITEMS.push(it); V6.push(it); place(id,view,g,extra); return it; }
/* existing «in» part, moved onto the new photo */
function M(id,view,g,extra){ const it=byId(id); if(!it) return; it.hs=hsOf(g); place(id,view,g,extra); }
/* part that already lives in Cabina: same words, same audio, now also in Por dentro */
function K(src,view,g,extra){ const s=byId(src); if(!s) return; const id='in-'+src;
  const it=Object.assign({},s,{id,set:'in',sents:s.sents.map(x=>Object.assign({},x)),hs:hsOf(g)}); ITEMS.push(it); place(id,view,g,extra); return it; }
/* remove the old interior-only geometry */
ITEMS.filter(i=>i.set==='in').forEach(i=>{ if(window.SCHEM.photoZoom) delete window.SCHEM.photoZoom[i.id]; });
/* ---------- 1 · Tablero y pedales ---------- */
M('steeringwheel','dash','<path fill-rule="evenodd" d="M210 225a230 226 0 1 0 460 0a230 226 0 1 0-460 0ZM240 225a200 196 0 1 1 400 0a200 196 0 1 1-400 0Z"/>');
N('airbag','dash','airbag','bolsa de aire (airbag)','ER-bag',[['This is the airbag. The airbag is in the steering wheel.','Esta es la bolsa de aire. Está en el timón.','THIS IS THE ER-bag. THE ER-bag IS IN THE STII-ring UIIL.'],['Do not open the airbag cover.','No abra la tapa del airbag.','DU NOT OU-pen THE ER-bag KA-ver.']],P('345,175 380,148 490,148 530,178 530,222 345,222'),'Cómo se dice: ER-bag. La bolsa sale del centro del timón en un choque.');
K('horn','dash',P('350,232 530,232 520,282 470,320 400,320 360,282'));
N('instrumentcluster','dash','instrument cluster','tablero de instrumentos','INS-tru-ment KLAS-ter',[['This is the instrument cluster. It shows the speed and the fuel.','Este es el tablero de instrumentos. Muestra la velocidad y la gasolina.','THIS IS THE INS-tru-ment KLAS-ter. IT SHOUS THE SPIID AND THE FYUL.']],P('338,84 384,60 388,152 344,152'),'Cómo se dice: INS-tru-ment KLAS-ter. Es el grupo de relojes detrás del timón.');
K('tachometer','dash',C(429,100,37));
K('speedometer','dash',C(528,100,46));
N('fuelgauge','dash','fuel gauge','medidor de gasolina','FYUL GEICH',[['This is the fuel gauge. The tank is almost empty.','Este es el medidor de gasolina. El tanque está casi vacío.','THIS IS THE FYUL GEICH. THE TANK IS OL-moust EMP-ti.']],C(628,112,30));
N('tempgauge','dash','temperature gauge','medidor de temperatura','TEM-pe-ra-chur GEICH',[['This is the temperature gauge. The engine is hot.','Este es el medidor de temperatura. El motor está caliente.','THIS IS THE TEM-pe-ra-chur GEICH. THE EN-yin IS JOT.']],C(686,140,19));
N('turnsignal','dash','turn signal','direccional','TORN SIG-nal',[['This is the turn signal. Use the turn signal to turn left.','Esta es la direccional. Use la direccional para girar a la izquierda.','THIS IS THE TORN SIG-nal. YUUS THE TORN SIG-nal TU TORN LEFT.'],['The right turn signal does not work.','La direccional derecha no funciona.','THE RAIT TORN SIG-nal DAZ NOT UORK.']],R(262,134,72,34),'Cómo se dice: TORN SIG-nal. Es la palanca de la izquierda del timón.');
N('wiperstalk','dash','wiper stalk','palanca del limpiabrisas','UAI-per STOK',[['This is the wiper stalk. Push it up to turn on the wipers.','Esta es la palanca del limpiabrisas. Súbala para prender el limpiabrisas.','THIS IS THE UAI-per STOK. PUSH IT AP TU TORN ON THE UAI-pers.']],R(664,174,52,36),'Cómo se dice: UAI-per STOK. Es la palanca de la derecha del timón.');
K('lightswitch','dash',C(170,228,33));
K('airvent','dash',R(122,98,98,60),[['con',R(352,250,104,36)+R(503,250,104,36)]]);
N('startbutton','dash','start button','botón de encendido','START BA-ton',[['This is the start button. Press the clutch and push the start button.','Este es el botón de encendido. Pise el clutch y oprima el botón.','THIS IS THE START BA-ton. PRES THE KLACH AND PUSH THE START BA-ton.']],C(758,175,25));
N('carkey','dash','car key','llave del carro','KAR KII',[['This is the car key. Do not forget the car key.','Esta es la llave del carro. No olvide la llave.','THIS IS THE KAR KII. DU NOT for-GET THE KAR KII.'],['The car key has a battery.','La llave del carro tiene una pila.','THE KAR KII JAS A BA-te-ri.']],P('800,66 818,56 872,74 930,98 928,110 870,96 846,98 804,82'),'Cómo se dice: KAR KII. Key suena como "kii".');
M('dashboard','dash',R(790,120,220,70));
N('hoodrelease','dash','hood release lever','palanca para abrir el capó','JUD ri-LIIS LI-ver',[['This is the hood release lever. Pull it to open the hood.','Esta es la palanca del capó. Hálela para abrir el capó.','THIS IS THE JUD ri-LIIS LI-ver. PUL IT TU OU-pen THE JUD.']],R(266,272,66,26),'Cómo se dice: JUD ri-LIIS LI-ver. Está abajo, a la izquierda del timón.');
N('footrest','dash','footrest','descansapié','FUT-rest',[['This is the footrest. Put your left foot here.','Este es el descansapié. Ponga el pie izquierdo aquí.','THIS IS THE FUT-rest. PUT YOR LEFT FUT JIR.']],P('300,420 352,412 366,500 352,515 292,512 288,470'));
M('clutchin','dash',R(452,388,48,24));
M('brakepedal','dash',R(534,410,58,56));
M('accelerator','dash',R(624,414,46,74));
N('floormat','dash','floor mat','tapete','FLOR MAT',[['This is the floor mat. The floor mat is dirty.','Este es el tapete. El tapete está sucio.','THIS IS THE FLOR MAT. THE FLOR MAT IS DOR-ti.'],['Take out the floor mats, please.','Saque los tapetes, por favor.','TEIK AUT THE FLOR MATS, PLIIS.']],P('382,478 640,478 662,576 360,576'),null,[['door',P('400,420 560,360 600,330 610,576 380,576')]]);
/* ---------- 2 · Consola central ---------- */
M('rearviewmirror','con',R(408,62,198,48));
M('domelight','con',R(432,8,160,28));
M('sunvisor','con',R(60,26,108,92)+R(848,26,108,92));
M('screen','con',R(410,182,140,58));
K('hazardbutton','con',R(461,255,38,32));
M('climatecontrol','con',R(384,302,192,40));
N('usbport','con','USB port','puerto USB','YU ES BI PORT',[['This is the USB port. Connect your phone here.','Este es el puerto USB. Conecte su celular aquí.','THIS IS THE YU ES BI PORT. ko-NEKT YOR FOUN JIR.']],R(432,366,34,24));
N('socket12v','con','12-volt socket','toma de 12 voltios','TUELV VOULT SO-ket',[['This is the 12-volt socket. Plug the charger in here.','Esta es la toma de 12 voltios. Conecte el cargador aquí.','THIS IS THE TUELV VOULT SO-ket. PLAG THE CHAR-yer IN JIR.']],C(533,377,18));
M('gearstick','con',P('392,380 432,380 436,440 462,452 456,516 362,516 360,452 388,440'));
K('handbrake','con',P('614,350 660,350 652,470 640,530 594,530 602,470'));
M('cupholder','con',C(527,462,30));
N('armrest','con','armrest','apoyabrazos','ARM-rest',[['This is the armrest. Rest your arm here.','Este es el apoyabrazos. Apoye el brazo aquí.','THIS IS THE ARM-rest. REST YOR ARM JIR.']],P('438,500 470,486 590,486 610,505 612,576 436,576'),null,[['door',R(0,330,200,70)]]);
K('glovebox','con',R(690,300,262,98));
/* ---------- 3 · Puerta y silla ---------- */
M('doorhandlein','door',R(146,62,128,48));
N('doorlock','door','door lock','seguro de la puerta','DOR LOK',[['This is the door lock. Lock the door, please.','Este es el seguro de la puerta. Ponga el seguro, por favor.','THIS IS THE DOR LOK. LOK THE DOR, PLIIS.'],['The door lock does not work.','El seguro de la puerta no funciona.','THE DOR LOK DAZ NOT UORK.']],R(284,62,26,28));
K('windowswitch','door',P('205,234 340,222 354,248 212,282'));
N('doorpocket','door','door pocket','bolsillo de la puerta','DOR PO-ket',[['This is the door pocket. Put the map in the door pocket.','Este es el bolsillo de la puerta. Ponga el mapa ahí.','THIS IS THE DOR PO-ket. PUT THE MAP IN THE DOR PO-ket.']],P('150,420 300,350 380,340 385,470 340,520 160,520'));
M('seat','door',P('604,400 650,350 760,345 1000,380 1024,420 1024,576 604,576')+P('650,70 960,90 985,200 975,370 760,345 650,330 640,200'));
M('seatbelt','door',P('622,0 660,0 772,280 748,296'),[]);
N('seatbuckle','door','seat belt buckle','hebilla del cinturón','SIIT BELT BA-kel',[['This is the seat belt buckle. Click the buckle.','Esta es la hebilla del cinturón. Abroche la hebilla.','THIS IS THE SIIT BELT BA-kel. KLIK THE BA-kel.']],P('728,296 772,286 778,312 766,342 748,342 732,316'));
M('headrest','door',R(722,0,190,64));
/* order of the strip: view by view */
const others=ITEMS.filter(i=>i.set!=='in'), mine=ORDER_IN.map(byId).filter(Boolean);
ITEMS.length=0; others.forEach(i=>ITEMS.push(i)); mine.forEach(i=>ITEMS.push(i));
/* Spot game: each part only competes with parts on its own photo */
let SPOTV=null;
mine.forEach(it=>{ const real=it.hs; Object.defineProperty(it,'hs',{configurable:true,enumerable:true,get(){ return (!SPOTV||PRIM[it.id]===SPOTV)?real:[[-999,-999]]; }}); });
const IMGURL=k=>'d/img/'+VIEWS[k].img+'?v='+VER;
const _rq=renderQ; renderQ=function(){ try{ const q=G&&G.qs[G.i]; if(q&&q.t==='spot'&&q.p&&q.p.set==='in'){ SPOTV=PRIM[q.p.id]; SETS.in.img=IMGURL(SPOTV); } else SPOTV=null; }catch(e){} _rq(); };
/* Learn view: SCHEM.in is the photo that holds the selected part */
const S=window.SCHEM; const cur=()=>{ try{return sel.in;}catch(e){return null;} };
const mk=k=>({name:VIEWS[k].name,vb:'0 0 1024 576',img:{href:IMGURL(k),x:0,y:0,w:1024,h:576},base:'',parts:VIEWS[k].parts,views:Object.keys(VIEWS).map(v=>[v,VIEWS[v].label]),view:k});
Object.defineProperty(S,'in',{configurable:true,get(){ return mk(PRIM[cur()]||'dash'); }});
S.inView=id=>PRIM[id];
SETS.in.img=IMGURL('dash');
GOALS.in=['Puedo nombrar las '+mine.length+' partes del interior del carro.','Puedo decir qué hago con ellas: "Press the clutch pedal." "Turn on the A/C."'];
window.SENA_V6=V6; window.IN_VIEWS=VIEWS; window.IN_PRIM=PRIM;
})();
