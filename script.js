/* =========================================================
   Prachi Gupta — portfolio scripts
   Progressive enhancement only. If this file fails to load,
   the page stays fully readable — nothing here is required
   to understand the content.
   ========================================================= */

// 1) Mark that JS is available. The CSS only hides reveal
//    elements when <html class="js"> is present, so no-JS
//    visitors see everything immediately.
document.documentElement.classList.add('js');

// 2) Reveal flagship chapters / cards as they scroll in.
(function () {
  var targets = document.querySelectorAll('.reveal-on-scroll');
  if (!targets.length) return;

  // Respect users who prefer reduced motion: just show everything.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target); // reveal once, then stop watching
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) { io.observe(el); });
})();


(function(){
    var modal=document.getElementById('wtModal');
    var sheets=document.querySelectorAll('.sheet');
    var lastFocus=null;
    function show(n){ sheets.forEach(function(s){s.classList.remove('active');}); var t=document.getElementById('sheet-'+n); if(t)t.classList.add('active'); modal.scrollTop=0; }
    function open(n,card){ lastFocus=card||lastFocus; show(n); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; document.getElementById('wtClose').focus(); }
    function close(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; sheets.forEach(function(s){s.classList.remove('active');}); if(lastFocus)lastFocus.focus(); }
    document.querySelectorAll('.walkthrough').forEach(function(card){
      card.addEventListener('click',function(){open(card.dataset.chapter,card);});
      card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(card.dataset.chapter,card);}});
    });
    document.querySelectorAll('.call-next').forEach(function(b){ b.addEventListener('click',function(){show(b.dataset.goto);}); });
    document.getElementById('wtClose').addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))close();});
})();