/* Garage English preview v7: Herramientas = 48 tools on six photo boards (A-F), each tool its own hotspot.
   Loaded after sena-v6.js. Geometry: 1024x576 frame of preview/img/tools-*.webp. */
(function(){
const VER='9', R=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6"/>';
const sy=s=>s.split(/[\s-]+/);
const BL={a:'Tablero A',b:'Tablero B',c:'Llaves y alicates',d:'Eléctrico y llantas',e:'Fluidos y servicio',f:'Banco y seguridad'};
const VIEWS={}; Object.keys(BL).forEach(k=>VIEWS[k]={label:BL[k],name:'BANCO DE HERRAMIENTAS · '+BL[k].toUpperCase(),img:'tools-'+k+'.webp',parts:{}});
const PRIM={}, ORDER=[], V7=[];
const hsOf=(x,y,w,h)=>[[+((x+w/2)/10.24).toFixed(1),+((y+h/2)/5.76).toFixed(1)]];
/* boards A and B: the 16 tools that already exist */
const OLD={ 'tool-wrench':['a',95,18,80,250],'tool-screwdriver':['a',320,18,90,250],'tool-hammer':['a',505,15,155,255],'tool-jack':['a',700,10,270,255],
 'tool-pliers':['a',70,285,110,240],'tool-socketset':['a',250,295,225,215],'tool-ratchet':['a',550,290,95,240],'tool-oilcan':['a',745,300,170,220],
 'tool-aircompressor':['b',45,50,185,210],'tool-workbench':['b',260,35,255,255],'tool-torquewrench':['b',530,135,285,115],'tool-multimeter':['b',810,75,175,230],
 'tool-tiregauge':['b',70,345,140,110],'tool-jackstand':['b',285,290,150,195],'tool-safetyglasses':['b',525,335,205,130],'tool-gloves':['b',755,325,210,185]};
Object.keys(OLD).forEach(id=>{ const t=OLD[id], it=byId(id); if(!it) return; VIEWS[t[0]].parts[id]=R(t[1],t[2],t[3],t[4]); PRIM[id]=t[0]; ORDER.push(id); it.hs=hsOf(t[1],t[2],t[3],t[4]); });
/* boards C-F: 4 columns x 2 rows, one tool per cell */
function N(board,cell,key,en,es,say,s1,s2){
  const id='tool-'+key, c=cell%4, r=cell/4|0, x=c*256+10, y=r*288+10, w=236, h=268;
  const sents=[s1].concat(s2?[s2]:[]);
  const it={id,set:'tool',en,es,syl:sy(say),tip:'Cómo se dice: '+say+'.',a:id,sents:sents.map((s,i)=>({en:s[0],es:s[1],say:s[2],a:id+'-s'+(i+1)})),hs:hsOf(x,y,w,h)};
  ITEMS.push(it); V7.push(it); VIEWS[board].parts[id]=R(x,y,w,h); PRIM[id]=board; ORDER.push(id); }
/* C · Llaves y alicates */
N('c',0,'adjustablewrench','adjustable wrench','llave ajustable (perica)','a-YAS-ta-bel RENCH',['This is the adjustable wrench. I open the jaw.','Esta es la llave ajustable. Abro la boca.','THIS IS THE a-YAS-ta-bel RENCH. AI OU-pen THE YO.']);
N('c',1,'tubewrench','tube wrench','llave de tubo','TUUB RENCH',['This is the tube wrench. I loosen the nut.','Esta es la llave de tubo. Aflojo la tuerca.','THIS IS THE TUUB RENCH. AI LUU-sen THE NAT.']);
N('c',2,'phillips','Phillips screwdriver','destornillador de estrella','FI-lips SKRUU-drai-ver',['This is the Phillips screwdriver. It has a cross tip.','Este es el destornillador de estrella. Tiene punta en cruz.','THIS IS THE FI-lips SKRUU-drai-ver. IT JAS A KROS TIP.']);
N('c',3,'allenkeys','Allen keys','llaves Allen','A-len KIIS',['These are the Allen keys. Use the five millimeter key.','Estas son las llaves Allen. Use la de cinco milímetros.','DIIS AR THE A-len KIIS. YUUS THE FAIV MI-li-mi-ter KII.']);
N('c',4,'torxkeys','Torx keys','llaves Torx','TORKS KIIS',['These are the Torx keys. They have a star tip.','Estas son las llaves Torx. Tienen punta de estrella.','DIIS AR THE TORKS KIIS. DEI JAV A STAR TIP.']);
N('c',5,'mallet','rubber mallet','mazo de caucho','RA-ber MA-let',['This is the rubber mallet. It does not damage the paint.','Este es el mazo de caucho. No daña la pintura.','THIS IS THE RA-ber MA-let. IT DAZ NOT DA-mich THE PEINT.']);
N('c',6,'needlenose','needle-nose pliers','alicate de punta','NII-del NOUS PLAI-erz',['These are the needle-nose pliers. I pick up the small clip.','Este es el alicate de punta. Recojo el clip pequeño.','DIIS AR THE NII-del NOUS PLAI-erz. AI PIK AP THE SMOL KLIP.']);
N('c',7,'lockingpliers','locking pliers','pinza de presión','LO-king PLAI-erz',['These are the locking pliers. They hold the bolt.','Esta es la pinza de presión. Sostiene el tornillo.','DIIS AR THE LO-king PLAI-erz. DEI JOULD THE BOULT.']);
/* D · Eléctrico y llantas */
N('d',0,'wirecutters','wire cutters','cortafríos','UAIR KA-terz',['These are the wire cutters. I cut the wire.','Este es el cortafríos. Corto el cable.','DIIS AR THE UAIR KA-terz. AI KAT THE UAIR.']);
N('d',1,'wirestripper','wire stripper','pelacables','UAIR STRI-per',['This is the wire stripper. I strip the wire.','Este es el pelacables. Pelo el cable.','THIS IS THE UAIR STRI-per. AI STRIP THE UAIR.']);
N('d',2,'testlight','test light','probador de corriente (punta lógica)','TEST LAIT',['This is the test light. The fuse has power.','Este es el probador. El fusible tiene corriente.','THIS IS THE TEST LAIT. THE FIUUS JAS PAU-er.']);
N('d',3,'scanner','OBD2 scanner','escáner OBD2','OU BI DI TUU SKA-ner',['This is the OBD2 scanner. I read the fault codes.','Este es el escáner. Leo los códigos de falla.','THIS IS THE OU BI DI TUU SKA-ner. AI RIID THE FOLT KOUDS.']);
N('d',4,'lugwrench','lug wrench','llave de cruz','LAG RENCH',['This is the lug wrench. I loosen the lug nuts.','Esta es la llave de cruz. Aflojo las tuercas de la rueda.','THIS IS THE LAG RENCH. AI LUU-sen THE LAG NATS.']);
N('d',5,'impactwrench','impact wrench','pistola de impacto','IM-pakt RENCH',['This is the impact wrench. It is very loud.','Esta es la pistola de impacto. Hace mucho ruido.','THIS IS THE IM-pakt RENCH. IT IS VE-ri LAUD.']);
N('d',6,'inflator','tire inflator','infladora de llantas','TAIR in-FLEI-ter',['This is the tire inflator. I fill the tire with air.','Esta es la infladora. Lleno la llanta de aire.','THIS IS THE TAIR in-FLEI-ter. AI FIL THE TAIR WITH ER.']);
N('d',7,'nutdriver','nut driver','destornillador de copa','NAT DRAI-ver',['This is the nut driver. I turn the small nut.','Este es el destornillador de copa. Giro la tuerca pequeña.','THIS IS THE NAT DRAI-ver. AI TORN THE SMOL NAT.']);
/* E · Fluidos y servicio */
N('e',0,'drainpan','oil drain pan','recipiente para aceite usado','OYL DREIN PAN',['This is the oil drain pan. Put it under the engine.','Este es el recipiente del aceite. Póngalo debajo del motor.','THIS IS THE OYL DREIN PAN. PUT IT AN-der THE EN-yin.']);
N('e',1,'funnel','funnel','embudo','FA-nel',['This is the funnel. I pour the oil with the funnel.','Este es el embudo. Echo el aceite con el embudo.','THIS IS THE FA-nel. AI POR THE OYL WITH THE FA-nel.']);
N('e',2,'greasegun','grease gun','engrasadora','GRIIS GAN',['This is the grease gun. I grease the joints.','Esta es la engrasadora. Engraso las uniones.','THIS IS THE GRIIS GAN. AI GRIIS THE YOINTS.']);
N('e',3,'worklight','work light','lámpara de trabajo','UORK LAIT',['This is the work light. Turn on the work light.','Esta es la lámpara de trabajo. Préndala.','THIS IS THE UORK LAIT. TORN ON THE UORK LAIT.']);
N('e',4,'feelergauge','feeler gauge','calibrador de láminas','FII-ler GEICH',['This is the feeler gauge. I measure the gap.','Este es el calibrador de láminas. Mido la luz.','THIS IS THE FII-ler GEICH. AI ME-yer THE GAP.']);
N('e',5,'sparkplugsocket','spark plug socket','copa de bujías','SPARK PLAG SO-ket',['This is the spark plug socket. I remove the spark plug.','Esta es la copa de bujías. Saco la bujía.','THIS IS THE SPARK PLAG SO-ket. AI ri-MUUV THE SPARK PLAG.']);
N('e',6,'bleederkit','brake bleeder kit','kit para purgar frenos','BREIK BLII-der KIT',['This is the brake bleeder kit. I bleed the brakes.','Este es el kit de purga. Purgo los frenos.','THIS IS THE BREIK BLII-der KIT. AI BLIID THE BREIKS.']);
N('e',7,'charger','battery charger','cargador de batería','BA-te-ri CHAR-yer',['This is the battery charger. Red to positive, black to negative.','Este es el cargador. Rojo al positivo, negro al negativo.','THIS IS THE BA-te-ri CHAR-yer. RED TU PO-si-tiv, BLAK TU NE-ga-tiv.']);
/* F · Banco y seguridad */
N('f',0,'jumpercables','jumper cables','cables de arranque','YAM-per KEI-belz',['These are the jumper cables. The battery is dead.','Estos son los cables de arranque. La batería está descargada.','DIIS AR THE YAM-per KEI-belz. THE BA-te-ri IS DED.']);
N('f',1,'vise','bench vise','prensa de banco','BENCH VAIS',['This is the bench vise. It holds the part.','Esta es la prensa de banco. Sostiene la pieza.','THIS IS THE BENCH VAIS. IT JOULDS THE PART.']);
N('f',2,'file','file','lima','FAIL',['This is the file. I file the metal.','Esta es la lima. Limo el metal.','THIS IS THE FAIL. AI FAIL THE ME-tal.']);
N('f',3,'drill','drill','taladro','DRIL',['This is the drill. I drill a hole.','Este es el taladro. Hago un hueco.','THIS IS THE DRIL. AI DRIL A JOUL.']);
N('f',4,'extinguisher','fire extinguisher','extintor','FAIR eks-TIN-gui-sher',['This is the fire extinguisher. It is next to the door.','Este es el extintor. Está al lado de la puerta.','THIS IS THE FAIR eks-TIN-gui-sher. IT IS NEKST TU THE DOR.']);
N('f',5,'creeper','creeper','camilla de mecánico','KRII-per',['This is the creeper. I slide under the car.','Esta es la camilla. Me deslizo debajo del carro.','THIS IS THE KRII-per. AI SLAID AN-der THE KAR.']);
N('f',6,'prybar','pry bar','palanca (barra)','PRAI BAR',['This is the pry bar. Be careful with the pry bar.','Esta es la palanca. Cuidado con la palanca.','THIS IS THE PRAI BAR. BI KER-ful WITH THE PRAI BAR.']);
N('f',7,'mirror','inspection mirror','espejo de inspección','in-SPEK-shon MI-rer',['This is the inspection mirror. I look behind the engine.','Este es el espejo de inspección. Miro detrás del motor.','THIS IS THE in-SPEK-shon MI-rer. AI LUK bi-JAIND THE EN-yin.']);
/* strip order: board by board */
const others=ITEMS.filter(i=>i.set!=='tool'), mine=ORDER.map(byId).filter(Boolean);
ITEMS.length=0; others.forEach(i=>ITEMS.push(i)); mine.forEach(i=>ITEMS.push(i));
/* Spot game: a tool only competes with tools on its own board */
const IMGURL=k=>'preview/img/'+VIEWS[k].img+'?v='+VER;
let SPOTB=null;
mine.forEach(it=>{ const real=it.hs; Object.defineProperty(it,'hs',{configurable:true,enumerable:true,get(){ return (!SPOTB||PRIM[it.id]===SPOTB)?real:[[-999,-999]]; }}); });
const _rq=renderQ; renderQ=function(){ try{ const q=G&&G.qs[G.i]; if(q&&q.t==='spot'&&q.p&&q.p.set==='tool'){ SPOTB=PRIM[q.p.id]; SETS.tool.img=IMGURL(SPOTB); } else SPOTB=null; }catch(e){} _rq(); };
/* Learn view: SCHEM.tool is the board that holds the selected tool, with a view switch */
const S=window.SCHEM; const cur=()=>{ try{return sel.tool;}catch(e){return null;} };
const mk=k=>({name:VIEWS[k].name,vb:'0 0 1024 576',img:{href:IMGURL(k),x:0,y:0,w:1024,h:576},base:'',parts:VIEWS[k].parts,views:Object.keys(VIEWS).map(v=>[v,VIEWS[v].label]),view:k});
Object.defineProperty(S,'tool',{configurable:true,get(){ return mk(PRIM[cur()]||'a'); }});
const _iv=S.inView; S.inView=id=>PRIM[id]||(_iv&&_iv(id)); S.toolBoard=null;
SETS.tool.img=IMGURL('a');
GOALS.tool[0]='Puedo nombrar '+mine.length+' herramientas y equipos del taller.';
window.SENA_V7=V7; window.TOOL_VIEWS=VIEWS; window.TOOL_PRIM=PRIM;
})();
