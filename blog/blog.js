(function(){var d=document,h=d.documentElement;window.__rv=1;h.classList.add('js');
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var els=[].slice.call(d.querySelectorAll('.rv'));
function all(){els.forEach(function(e){e.classList.add('in')})}
if(rm||!('IntersectionObserver' in window)){all()}else{
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.1});
els.forEach(function(e){io.observe(e)});
var po=new IntersectionObserver(function(en){en.forEach(function(x){x.target.classList.toggle('paused',!x.isIntersecting)})});
[].forEach.call(d.querySelectorAll('.hero-ill'),function(e){po.observe(e)});}
var bar=d.querySelector('.progress span'),art=d.querySelector('article'),raf=0;
if(bar&&art&&!rm){var u=function(){raf=0;var r=art.getBoundingClientRect(),tot=art.offsetHeight-innerHeight,p=tot>0?Math.min(1,Math.max(0,-r.top/tot)):1;bar.style.transform='scaleX('+p.toFixed(4)+')'};
addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(u)},{passive:true});addEventListener('resize',u);u()}
})();
