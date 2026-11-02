/* Garage English demo v4: every Learn view is a real photo with SVG hotspots (1024x576 frame).
   SCHEM[set] becomes a getter that returns the view holding the selected part, so one section can use several photos. */
(function(){
const S=window.SCHEM, P=s=>'<polygon points="'+s+'"/>';
const IM=(f,x,y,w,h)=>({href:'d/img/'+f+'?v=10',x:x||0,y:y||0,w:w||1024,h:h||576});
const geo={}; (window.SENA_NEW||[]).forEach(it=>{ if(it.geo) (geo[it.set]=geo[it.set]||{})[it.id]=it.geo; });
const side=S.out, inside=S.in;
side.name='VISTA LATERAL'; inside.name='INTERIOR';
/* front three-quarter view: the parts that hide from the side */
const front={name:'VISTA FRONTAL',vb:'0 60 1024 440',img:IM('car-front.webp'),base:'',parts:{
  licenseplate:P('794,356 900,354 900,392 794,394'),
  wiper:P('598,220 736,220 738,232 600,236'),
  windshield:P('396,138 590,130 736,220 598,220 480,232 420,226'),
  hood:P('480,234 600,236 738,226 860,252 908,290 736,304 590,276 560,262')}};
const FRONT=Object.keys(front.parts);
/* photo sections */
const eng={name:'VANO DEL MOTOR',vb:'0 0 1024 576',img:IM('engine-bay.webp'),base:'',parts:geo.eng||{}};
const cab={name:'CABINA DEL CONDUCTOR',vb:'0 0 1024 576',img:IM('cabin.webp'),base:'',parts:geo.cab||{}};
const sys={name:'FRENOS · SUSPENSIÓN · DIRECCIÓN',vb:'0 0 1024 576',img:IM('brakes.webp'),base:'',parts:geo.sys||{}};
/* tools: two photo boards, each tool gets a crop of its own */
const TB={ 'tool-wrench':['a',95,18,80,250],'tool-screwdriver':['a',320,18,90,250],'tool-hammer':['a',505,15,155,255],'tool-jack':['a',700,10,270,255],
 'tool-pliers':['a',70,285,110,240],'tool-socketset':['a',250,295,225,215],'tool-ratchet':['a',550,290,95,240],'tool-oilcan':['a',745,300,170,220],
 'tool-aircompressor':['b',45,50,185,210],'tool-workbench':['b',260,35,255,255],'tool-torquewrench':['b',530,135,285,115],'tool-multimeter':['b',810,75,175,230],
 'tool-tiregauge':['b',70,345,140,110],'tool-jackstand':['b',285,290,150,195],'tool-safetyglasses':['b',525,335,205,130],'tool-gloves':['b',755,325,210,185]};
const toolView=id=>{ const t=TB[id]||TB['tool-wrench'], pad=18, x=t[1]-pad,y=t[2]-pad,w=t[3]+2*pad,h=t[4]+2*pad, s=Math.max(w,h*16/9);
  const cx=t[1]+t[3]/2, cy=t[2]+t[4]/2, vw=s, vh=s*9/16;
  const parts={}; Object.keys(TB).forEach(k=>{ if(TB[k][0]===t[0]) parts[k]='<rect x="'+TB[k][1]+'" y="'+TB[k][2]+'" width="'+TB[k][3]+'" height="'+TB[k][4]+'" rx="6"/>'; });
  /* full board: every tool on this board is its own tappable hotspot */
  return {name:'BANCO DE HERRAMIENTAS · TABLERO '+t[0].toUpperCase(),board:t[0],vb:'0 0 1024 576',img:IM('tools-'+t[0]+'.webp'),base:'',parts}; };
/* warning lights: an instrument cluster drawn in SVG (the symbols are standard ISO 2575 telltales) */
const ICON={
 checkengine:'<path d="M14 40h8v-8h10v-6h22v6h8l6 6h6v-6h6v26h-6v-6h-6v10H40l-8-8H22v-8h-8z"/>',
 oillight:'<path d="M10 44l10-6h22l8 6 30-10-18 24H18v-14zM74 52c4 6 4 10 0 10s-4-4 0-10z"/>',
 batterylight:'<rect x="14" y="30" width="72" height="40" rx="3"/><path d="M26 30v-8h12v8M62 30v-8h12v8M26 48h12M64 48h12M70 42v12"/>',
 templight:'<path d="M50 20v38M50 58a8 8 0 1 0 .1 0M50 28h10M50 38h10M50 48h10M18 74c8-6 16 6 24 0s16 6 24 0 16 6 24 0"/>',
 brakelight:'<circle cx="50" cy="50" r="22"/><path d="M22 28a34 34 0 0 0 0 44M78 28a34 34 0 0 1 0 44M50 38v14M50 60v2"/>',
 abslight:'<circle cx="50" cy="50" r="24"/><path d="M22 28a34 34 0 0 0 0 44M78 28a34 34 0 0 1 0 44"/><text x="50" y="57" text-anchor="middle" font-size="18" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="600" stroke="none">ABS</text>',
 airbaglight:'<circle cx="34" cy="26" r="7"/><path d="M34 36v22l12 16M34 46l16 4M30 74h20"/><circle cx="66" cy="52" r="14"/>',
 seatbeltlight:'<circle cx="50" cy="22" r="7"/><path d="M38 76V40a12 12 0 0 1 24 0v36M40 38l22 26"/>',
 fuellight:'<rect x="26" y="26" width="30" height="48" rx="3"/><path d="M26 44h30M56 34l12 8v24a4 4 0 0 0 8 0V40l-6-8"/>',
 tpmslight:'<path d="M30 30a30 30 0 0 0 0 40M70 30a30 30 0 0 1 0 40M30 70h40M30 30h40M50 38v16M50 60v2"/>'};
const WARN_ORDER=['checkengine','oillight','batterylight','templight','brakelight','abslight','airbaglight','seatbeltlight','fuellight','tpmslight'];
const AMBER={checkengine:1,abslight:1,fuellight:1,tpmslight:1};
let wbase='<defs><radialGradient id="wg" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#1D232A"/><stop offset="1" stop-color="#0B0E11"/></radialGradient></defs><rect x="16" y="16" width="992" height="544" rx="36" fill="url(#wg)" stroke="#3A4148" stroke-width="3"/>';
const wparts={};
WARN_ORDER.forEach((id,i)=>{ const c=i%5,r=i/5|0, col=AMBER[id]?'#FFB020':'#FF4A3D', cx=132+c*190, cy=170+r*236;
  wbase+='<g transform="translate('+(cx-60)+' '+(cy-60)+') scale(1.2)" fill="none" stroke="'+col+'" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px '+col+')">'+ICON[id].replace('stroke="none"','stroke="none" fill="'+col+'"')+'</g>';
  wparts[id]='<rect x="'+(cx-80)+'" y="'+(cy-80)+'" width="160" height="160" rx="10"/>'; });
const warn={name:'TABLERO · TESTIGOS',vb:'0 0 1024 576',base:wbase,parts:wparts};
window.WARN_ICON=(id,size)=>'<svg viewBox="0 0 100 100" width="'+(size||40)+'" height="'+(size||40)+'" aria-hidden="true" fill="none" stroke="'+(AMBER[id]?'#FFB020':'#FF4A3D')+'" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">'+ICON[id].replace('stroke="none"','stroke="none" fill="'+(AMBER[id]?'#FFB020':'#FF4A3D')+'"')+'</svg>';
/* close-up lens: drop the side-photo zooms that now live in the front view */
if(S.photoZoom){ delete S.photoZoom.licenseplate; delete S.photoZoom.wiper; }
const cur=set=>{ try{return sel[set];}catch(e){return null;} };
Object.defineProperty(S,'out',{configurable:true,get(){ return FRONT.includes(cur('out'))?front:side; }});
Object.defineProperty(S,'tool',{configurable:true,get(){ return toolView(cur('tool')); }});
Object.assign(S,{eng,cab,sys,warn}); S.toolBoard=id=>(TB[id]||[])[0];
S.views={side,front,inside,eng,cab,sys,warn};
})();
