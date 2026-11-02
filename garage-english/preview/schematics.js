/* Garage English preview: one line-art style for every car view (inline SVG).
   Coordinates follow the hotspot percentages in data.js (x*12, y*3.85 for the side view). */
(function(){
const W=(r,cx,cy)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>';
const side={vb:'0 0 1200 385',
 base:
  /* ground + body outline */
  '<path class="gl" d="M20 368H1180"/>'+
  '<path d="M150 300H60Q46 300 46 284V170Q48 110 82 82Q120 46 170 38H640Q690 40 720 70L880 148Q1010 160 1110 172Q1150 180 1160 214V284Q1160 300 1146 300H1046"/>'+
  '<path d="M914 300H296"/>'+
  /* wheel arches */
  '<path d="M150 300A82 82 0 0 1 310 300"/><path d="M900 300A82 82 0 0 1 1060 300"/>'+
  /* belt line + sill */
  '<path class="th" d="M70 145H880"/><path class="th" d="M320 282H900"/>'+
  /* door shut lines */
  '<path class="th" d="M330 145V282"/><path class="th" d="M548 145V282"/><path class="th" d="M790 148V250Q790 282 760 282"/>'+
  /* hood/trunk shut lines */
  '<path class="th" d="M880 148L1100 176"/><path class="th" d="M60 150Q110 150 120 140"/>',
 parts:{
  headlight:'<path d="M1088 172L1140 180Q1150 190 1146 200L1094 194Z"/>',
  grille:'<path d="M1132 206H1158V236H1134Z"/>',
  licenseplate:'<rect x="1100" y="244" width="40" height="20" rx="2"/>',
  frontbumper:'<path d="M1070 266H1160V292Q1160 300 1146 300H1062Q1060 280 1070 266Z"/>',
  hood:'<path d="M880 148Q1000 158 1104 170L1100 178Q990 168 884 156Z"/>',
  windshield:'<path d="M690 58L866 144H796L668 64Z"/>',
  wiper:'<path d="M770 140L836 112L840 118L776 146Z"/>',
  frontwindow:'<path d="M560 54H660L780 140H560Z"/>',
  mirror:'<path d="M786 136H820Q832 140 830 152H790Z"/>',
  frontdoor:'<path d="M552 148H786V250Q786 278 760 278H552Z"/>',
  doorhandle:'<rect x="598" y="158" width="34" height="9" rx="2"/><rect x="346" y="158" width="34" height="9" rx="2"/>',
  reardoor:'<path d="M334 148H544V278H334Z"/>',
  rearwindow:'<path d="M332 54H540V140H332Z"/>',
  backwindow:'<path d="M168 52H316V140H104Q120 80 168 52Z"/>',
  roof:'<path d="M176 36H636V46H176Z"/>',
  roofrack:'<path d="M410 22H640M430 22V36M620 22V36M410 14H640V22H410Z"/>',
  antenna:'<path d="M384 36L364 0L368 -2L390 36Z"/>',
  trunk:'<path d="M50 152H200V246H50Z"/>',
  spoiler:'<path d="M56 74L150 66L146 84L66 96Z"/>',
  taillight:'<path d="M50 128H86V162H48Z"/>',
  rearbumper:'<path d="M46 248H130V300H60Q46 300 46 284Z"/>',
  exhaust:'<ellipse cx="74" cy="306" rx="20" ry="8"/>',
  fuelcap:'<circle cx="230" cy="190" r="14"/>',
  fender:'<path d="M890 300A92 92 0 0 1 1070 300H1060A82 82 0 0 0 900 300Z"/><path d="M140 300A92 92 0 0 1 320 300H310A82 82 0 0 0 150 300Z"/>',
  wheel:W(44,230,300)+W(44,980,300),
  tire:'<path fill-rule="evenodd" d="M164 300a66 66 0 1 0 132 0a66 66 0 1 0-132 0ZM186 300a44 44 0 1 1 88 0a44 44 0 1 1-88 0Z"/><path fill-rule="evenodd" d="M914 300a66 66 0 1 0 132 0a66 66 0 1 0-132 0ZM936 300a44 44 0 1 1 88 0a44 44 0 1 1-88 0Z"/>',
  hubcap:W(16,230,300)+W(16,980,300)
 }};
/* spokes drawn as base detail */
side.base+=[230,980].map(c=>'<path class="th" d="M'+c+' 256V284M'+c+' 316V344M'+(c-44)+' 300H'+(c-16)+'M'+(c+16)+' 300H'+(c+44)+'"/>').join('');

/* Interior: 1200 x 500 (x*12, y*5) */
const inside={vb:'0 0 1200 500',
 base:'<path d="M0 120Q600 40 1200 120"/><path d="M60 140Q600 90 1140 140V250Q600 230 60 250Z"/>'+
  '<path class="th" d="M0 0L120 120M1200 0L1080 120"/><path d="M40 160V480M70 200H150V420H70"/>'+
  '<path class="th" d="M460 250L420 480M740 250L780 480"/><path class="gl" d="M0 490H1200"/>',
 parts:{
  steeringwheel:'<path fill-rule="evenodd" d="M270 250a90 90 0 1 0 180 0a90 90 0 1 0-180 0ZM290 250a70 70 0 1 1 140 0a70 70 0 1 1-140 0Z"/><circle cx="360" cy="250" r="22"/>',
  dashboard:'<path d="M300 150Q600 120 900 150V200Q600 186 300 200Z"/>',
  screen:'<rect x="540" y="236" width="120" height="70" rx="4"/>',
  rearviewmirror:'<path d="M560 54H640Q650 70 640 86H560Q550 70 560 54ZM598 30H602V54H598Z"/>',
  gearstick:'<path d="M604 390V320"/><circle cx="604" cy="312" r="14"/><path d="M570 400H640L628 420H582Z"/>',
  brakepedal:'<rect x="448" y="318" width="40" height="34" rx="3"/><path d="M468 318V290"/>',
  accelerator:'<rect x="518" y="312" width="22" height="50" rx="3"/><path d="M529 312V290"/>',
  seat:'<path d="M860 240Q930 230 940 260L960 360H1040Q1060 380 1040 410H880Q860 400 864 380Z"/>',
  seatbelt:'<path d="M700 420L780 470L786 460L706 410Z"/>',
  doorhandlein:'<rect x="100" y="240" width="40" height="18" rx="4"/>'
 }};

/* Tools: one close-up each, same canvas as the side view */
const T=(d)=>'<g transform="translate(600 192)">'+d+'</g>';
const tool={vb:'0 0 1200 385', base:'<path class="gl" d="M120 360H1080"/>', parts:{
  'tool-wrench':T('<path d="M-300 -20H200a60 60 0 1 1 0 40H-300a20 20 0 0 1 0-40Z"/><path d="M-330 -60a60 60 0 1 0 50 90l-20-30h-40v-40l30-20Z"/>'),
  'tool-screwdriver':T('<path d="M-320 -40H-40Q-20 -40 -20 -20V20Q-20 40 -40 40H-320Q-340 40 -340 20V-20Q-340 -40 -320 -40Z"/><path d="M-20 -10H300L330 0L300 10H-20Z"/>'),
  'tool-hammer':T('<path d="M-60 -120H140V-40H-60Z"/><path d="M140 -110Q220 -100 240 -40H140Z"/><path d="M10 -40H60V160H10Z"/>'),
  'tool-jack':T('<path d="M-300 130H300V160H-300Z"/><path d="M-200 130L-100 20H100L200 130"/><path d="M-60 20V-80H60V20"/><path d="M-90 -100H90V-80H-90Z"/>'),
  'tool-pliers':T('<path d="M-300 -30L0 -4L260 -50L270 -36L20 10L270 60L260 74L0 26L-300 30Z"/><circle cx="0" cy="10" r="16"/>'),
  'tool-socketset':T('<rect x="-320" y="-60" width="640" height="180" rx="6"/>'+[-240,-120,0,120,240].map(x=>'<circle cx="'+x+'" cy="30" r="'+(30+Math.abs(x)/20)+'"/>').join('')),
  'tool-ratchet':T('<path d="M-300 -18H120V18H-300a18 18 0 0 1 0-36Z"/><circle cx="170" cy="0" r="54"/><rect x="150" y="-20" width="40" height="40"/>'),
  'tool-oilcan':T('<path d="M-200 -40H80V140H-200Z"/><path d="M80 -20L320 -110L326 -96L80 20Z"/><path d="M-200 -10Q-280 -10 -280 60Q-280 120 -200 120"/>'),
  'tool-aircompressor':T('<rect x="-260" y="-60" width="420" height="160" rx="70"/><circle cx="240" cy="-20" r="50"/><path d="M160 20H200M-220 100V150M120 100V150"/>'),
  'tool-workbench':T('<path d="M-400 -60H400V-30H-400Z"/><path d="M-370 -30V160M370 -30V160M-370 80H370"/><path d="M-200 -60V-140H-160V-60M100 -110H220V-60H100Z"/>')
 }};
/* tag anchor for tools = centre of canvas */
const ZOOMS={ /* close-ups for parts that are hard to see from the side, 100x100 lens */
  wiper:{base:'<path d="M5 80Q50 30 95 80"/>',part:'<path d="M25 78L78 40L82 45L30 82Z"/><circle cx="27" cy="80" r="4"/>'},
  antenna:{base:'<path d="M5 78Q50 70 95 78"/><path class="th" d="M5 90Q50 82 95 90"/>',part:'<path d="M48 74L60 10L64 11L54 75Z"/><path d="M42 74H62L60 66H44Z"/>'},
  exhaust:{base:'<path d="M5 20H95V55Q95 60 90 60H5"/>',part:'<ellipse cx="55" cy="72" rx="26" ry="12"/><ellipse class="hole" cx="55" cy="72" rx="15" ry="6"/>'},
  hubcap:{base:'<circle cx="50" cy="50" r="44"/><circle class="th" cx="50" cy="50" r="34"/>',part:'<circle cx="50" cy="50" r="18"/>'+[0,72,144,216,288].map(a=>'<circle class="hole" cx="'+(50+11*Math.cos(a*Math.PI/180)).toFixed(1)+'" cy="'+(50+11*Math.sin(a*Math.PI/180)).toFixed(1)+'" r="2.4"/>').join('')},
  grille:{base:'<circle class="th" cx="14" cy="34" r="8"/><circle class="th" cx="86" cy="34" r="8"/><path d="M5 82H95"/>',part:'<rect x="24" y="24" width="52" height="40" rx="3"/><path class="hole" d="M28 34H72M28 44H72M28 54H72"/>'},
  fuelcap:{base:'<path d="M5 20Q50 10 95 20V90H5Z"/>',part:'<circle cx="50" cy="54" r="22"/><path class="hole" d="M38 54H62"/>'}
};
window.SCHEM={out:side,in:inside,tool:tool,zoom:ZOOMS};
})();
