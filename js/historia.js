/* Our story / oś czasu — reveal + accessible marker → <details> */
(function(){
  var root=document.getElementById('historia');
  if(!root)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=[].slice.call(root.querySelectorAll('.tl-item'));
  var details=[].slice.call(root.querySelectorAll('.tl-more details'));

  function inView(){
    root.classList.add('is-in');
  }
  if(reduce){inView();}
  else if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){inView();io.disconnect();}});
    },{threshold:0.22,rootMargin:'0px 0px -8% 0px'});
    io.observe(root);
  }else{inView();}

  function openId(id,fromUser){
    if(!id)return;
    details.forEach(function(d){
      var on=d.id===id;
      d.open=on;
      var item=root.querySelector('.tl-item[data-target="'+id+'"]');
      if(item)item.classList.toggle('is-open',on);
    });
    items.forEach(function(it){
      var btn=it.querySelector('.tl-dot');
      if(btn)btn.setAttribute('aria-expanded', it.getAttribute('data-target')===id?'true':'false');
    });
    if(fromUser){
      var panel=document.getElementById(id);
      if(panel){
        try{panel.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'});}catch(e){}
        var sum=panel.querySelector('summary');
        if(sum)try{sum.focus({preventScroll:true});}catch(err){}
      }
    }
  }

  items.forEach(function(it){
    var btn=it.querySelector('.tl-dot');
    if(!btn)return;
    btn.addEventListener('click',function(){
      var id=it.getAttribute('data-target');
      var panel=id&&document.getElementById(id);
      if(panel&&panel.open){panel.open=false;btn.setAttribute('aria-expanded','false');it.classList.remove('is-open');return;}
      openId(id,true);
    });
  });
  details.forEach(function(d){
    d.addEventListener('toggle',function(){
      if(d.open){
        details.forEach(function(o){if(o!==d)o.open=false;});
        items.forEach(function(it){
          var on=it.getAttribute('data-target')===d.id;
          it.classList.toggle('is-open',on);
          var btn=it.querySelector('.tl-dot');
          if(btn)btn.setAttribute('aria-expanded',on?'true':'false');
        });
      }
    });
  });
})();
