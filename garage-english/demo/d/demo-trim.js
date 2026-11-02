/* Garage English DEMO: keep a small sample of every section. */
(function(){
  const keepView=(V,k,n)=>{ Object.keys(V).forEach(x=>{ if(x!==k) delete V[x]; }); const p=V[k].parts; Object.keys(p).slice(n).forEach(id=>delete p[id]); return Object.keys(p); };
  const inIds=keepView(window.IN_VIEWS,'dash',4), toolIds=keepView(window.TOOL_VIEWS,'a',6);
  const per={}; const keep=ITEMS.filter(it=>{
    if(it.set==='in') return inIds.includes(it.id);
    if(it.set==='tool') return toolIds.includes(it.id);
    per[it.set]=(per[it.set]||0)+1; return per[it.set]<=4; });
  ITEMS.splice(0,ITEMS.length,...keep);
  if(typeof SCENES!=='undefined') SCENES.splice(1);
  if(typeof GAMES!=='undefined'){ const g=GAMES.filter(x=>['listen','match'].includes(x[0])); GAMES.splice(0,GAMES.length,...g); }
})();
