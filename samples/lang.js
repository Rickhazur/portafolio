/* ============================================================
   Bilingual engine — Ricardo Torres portfolio (EN/ES)
   Elements carry data-en / data-es (innerHTML),
   data-en-ph / data-es-ph (placeholder),
   data-en-alt / data-es-alt (alt text),
   data-en-title / data-es-title (title attribute).
   ============================================================ */
(function(){
  var KEY = 'rt-lang';

  function detect(){
    var saved = null;
    try{ saved = localStorage.getItem(KEY); }catch(e){}
    if(saved === 'en' || saved === 'es') return saved;
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function swap(el, l){
    var v = (l === 'es') ? el.getAttribute('data-es') : el.getAttribute('data-en');
    if(v === null || v === undefined) return;
    var tag = el.tagName;
    if(tag === 'META'){ el.setAttribute('content', v); return; }
    if(tag === 'INPUT' || tag === 'TEXTAREA'){ el.setAttribute('placeholder', v); return; }
    el.innerHTML = v;
  }

  function apply(l){
    document.querySelectorAll('[data-en]').forEach(function(el){ swap(el, l); });
    document.querySelectorAll('[data-en-ph]').forEach(function(el){
      var v = l === 'es' ? el.getAttribute('data-es-ph') : el.getAttribute('data-en-ph');
      if(v !== null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-en-alt]').forEach(function(el){
      var v = l === 'es' ? el.getAttribute('data-es-alt') : el.getAttribute('data-en-alt');
      if(v !== null) el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-en-title]').forEach(function(el){
      var v = l === 'es' ? el.getAttribute('data-es-title') : el.getAttribute('data-en-title');
      if(v !== null) el.setAttribute('title', v);
    });
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('.lang-toggle').forEach(function(t){
      t.setAttribute('data-lang', l);
      t.setAttribute('aria-label', l === 'es' ? 'Switch to English' : 'Cambiar a español');
      t.querySelectorAll('.lang-opt').forEach(function(o){
        o.classList.toggle('on', o.getAttribute('data-opt') === l);
      });
    });
    try{ localStorage.setItem(KEY, l); }catch(e){}
    window.__lang = l;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  window.setLang = function(l){
    if(l !== 'en' && l !== 'es') return;
    var t = document.querySelector('.lang-toggle');
    if(t){ t.classList.remove('switching'); void t.offsetWidth; t.classList.add('switching'); }
    apply(l);
  };
  window.getLang = function(){ return window.__lang || detect(); };

  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('.lang-toggle') : null;
    if(t) window.setLang(t.getAttribute('data-lang') === 'en' ? 'es' : 'en');
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ apply(detect()); });
  } else { apply(detect()); }
})();
