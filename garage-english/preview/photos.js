/* Garage English preview v3: realistic car photos with SVG hotspots.
   Hotspot coordinates are in a 1024x576 frame of the source photo; each view crops it with its viewBox. */
(function(){
const C=(r,cx,cy)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>';
const P=s=>'<polygon points="'+s+'"/>';
const ring=(cx,cy,R,r)=>'<path fill-rule="evenodd" d="M'+(cx-R)+' '+cy+'a'+R+' '+R+' 0 1 0 '+2*R+' 0a'+R+' '+R+' 0 1 0 -'+2*R+' 0ZM'+(cx-r)+' '+cy+'a'+r+' '+r+' 0 1 1 '+2*r+' 0a'+r+' '+r+' 0 1 1 -'+2*r+' 0Z"/>';
const arch=(cx,cy,R,r)=>'<path d="M'+(cx-R)+' '+cy+'A'+R+' '+R+' 0 0 1 '+(cx+R)+' '+cy+'H'+(cx+r)+'A'+r+' '+r+' 0 0 0 '+(cx-r)+' '+cy+'Z"/>';
const S=window.SCHEM;
S.out={vb:'60 110 910 350',img:{href:'preview/car-side.webp?v=10',x:60,y:110,w:910,h:350},base:'',parts:{
  headlight:P('852,282 932,294 940,316 906,322 868,304'),
  grille:P('902,350 944,346 942,380 906,384'),
  licenseplate:P('936,322 950,322 950,346 938,346'),
  frontbumper:P('858,326 900,326 948,332 952,392 900,400 866,398 858,362'),
  hood:P('700,244 790,252 852,264 900,280 850,276 760,262 704,254'),
  windshield:P('596,190 640,210 698,242 688,250 640,232 602,204'),
  wiper:P('684,246 724,252 722,256 684,252'),
  frontwindow:P('458,176 556,180 626,222 640,248 460,248'),
  mirror:P('628,222 656,224 668,246 662,252 632,252'),
  frontdoor:P('462,254 690,254 700,300 702,334 692,394 470,394'),
  doorhandle:P('474,271 526,272 526,284 474,284')+P('275,264 328,265 328,277 275,277'),
  reardoor:P('250,252 455,252 464,394 340,392 304,350 268,316 252,290'),
  rearwindow:P('312,178 436,174 440,242 308,242'),
  backwindow:P('246,198 302,180 306,242 244,242'),
  roof:P('200,176 260,166 440,163 540,164 594,186 540,174 440,172 262,176'),
  roofrack:P('254,154 380,150 532,152 546,162 532,160 380,158 256,162'),
  antenna:P('238,124 264,160 258,163 235,127'),
  trunk:P('134,214 180,188 234,182 242,198 238,242 182,242 124,250'),
  spoiler:P('174,174 238,168 244,182 182,188'),
  taillight:P('104,248 174,245 170,262 140,276 106,276'),
  rearbumper:P('88,298 150,306 158,370 142,390 94,388 86,340'),
  exhaust:'<ellipse cx="100" cy="384" rx="14" ry="6"/>',
  fuelcap:'<rect x="183" y="242" width="55" height="31" rx="5"/>',
  fender:arch(790,383,90,80)+arch(228,383,90,80),
  wheel:C(54,228,383)+C(54,790,383),
  tire:ring(228,383,72,54)+ring(790,383,72,54),
  hubcap:C(10,228,383)+C(10,790,383)
}};
S.in={vb:'0 20 1024 500',img:{href:'preview/car-interior.webp?v=10',x:0,y:20,w:1024,h:500},base:'',parts:{
  steeringwheel:'<path fill-rule="evenodd" d="M233 252a122 117 0 1 0 244 0a122 117 0 1 0-244 0ZM255 252a100 96 0 1 1 200 0a100 96 0 1 1-200 0Z"/>'+C(26,355,252),
  dashboard:P('205,192 300,170 520,182 1000,212 1004,284 700,292 690,270 495,272 205,262'),
  screen:'<rect x="530" y="197" width="146" height="68" rx="4"/>',
  rearviewmirror:P('527,34 680,36 682,74 600,78 528,74'),
  gearstick:P('570,384 604,384 610,440 632,470 628,508 560,508 556,470 574,440'),
  brakepedal:'<rect x="437" y="404" width="32" height="34" rx="3"/>',
  accelerator:'<rect x="492" y="398" width="24" height="44" rx="3"/>',
  seat:P('212,500 495,500 508,520 205,520'),
  seatbelt:P('186,140 202,138 214,248 200,250'),
  doorhandlein:'<rect x="108" y="218" width="58" height="28" rx="4"/>'
}};
/* close-up lens = zoomed crop of the same photo around the part */
const Z=(set,cx,cy,s)=>({set:set,cx:cx,cy:cy,s:s});
S.photoZoom={wiper:Z('out',704,250,60),antenna:Z('out',250,145,60),exhaust:Z('out',104,382,50),hubcap:Z('out',790,383,70),grille:Z('out',920,362,70),fuelcap:Z('out',210,258,70),licenseplate:Z('out',940,334,60)};
})();
