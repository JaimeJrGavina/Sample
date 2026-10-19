/* Quillmere Realty demo page. Nothing is submitted anywhere: the form only shows a thank-you state. */
(function(){
  'use strict';
  var form=document.getElementById('valueForm'); if(!form) return;
  var steps=[].slice.call(form.querySelectorAll('.step'));
  var dots=[].slice.call(document.querySelectorAll('.step-dot'));
  var count=document.getElementById('stepCount');
  var shell=document.getElementById('formShell'), thanks=document.getElementById('thanks');
  var names=['Your property','Home details','Where to send it'];
  var cur=0, started=false;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MSG={required:'Please fill this in so we can prepare your estimate.',
    email:"That email doesn't look quite right. Mind checking it?",
    phone:'Please enter a 10-digit phone number, or leave it blank.',
    zip:'Please enter a 5-digit ZIP code.',
    street:'Please enter your street address, like 123 Main St.',
    consent:'Please check this box so we can send you your estimate.',
    timeline:'Please pick one. "Just curious" is a perfectly good answer.'};

  function wrap(f){return f.closest('.field,.check');}
  function setErr(f,m){var w=wrap(f),e=w&&w.querySelector('.err');
    if(m){w.classList.add('is-invalid-x');f.setAttribute('aria-invalid','true');if(e){e.textContent=m;e.id=f.id+'-err';f.setAttribute('aria-describedby',e.id);}}
    else{w&&w.classList.remove('is-invalid-x');f.removeAttribute('aria-invalid');if(e)e.textContent='';}
    return !m;}
  function digits(v){var d=v.replace(/\D/g,'');if(d.length===11&&d[0]==='1')d=d.slice(1);return d;}
  function check(f){
    var v=(f.value||'').trim();
    if(f.type==='checkbox') return setErr(f,f.required&&!f.checked?MSG.consent:'');
    if(f.id==='street') return setErr(f,!v?MSG.required:(v.length<4||!/[a-z]/i.test(v))?MSG.street:'');
    if(f.id==='zip') return setErr(f,!v?MSG.required:!/^\d{5}$/.test(v)?MSG.zip:'');
    if(f.id==='email') return setErr(f,!v?MSG.required:!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?MSG.email:'');
    if(f.id==='phone') return setErr(f,v&&digits(v).length!==10?MSG.phone:'');
    if(f.id==='timeline') return setErr(f,!v?MSG.timeline:'');
    if(f.required) return setErr(f,!v?MSG.required:'');
    return true;}
  function validStep(i){var ok=true,first=null;
    [].forEach.call(steps[i].querySelectorAll('input,select'),function(f){if(!check(f)){ok=false;first=first||f;}});
    if(first) first.focus(); return ok;}
  function show(i){
    steps.forEach(function(s,k){s.hidden=k!==i;s.classList.toggle('is-active',k===i);});
    dots.forEach(function(d,k){d.classList.toggle('is-on',k<=i);});
    count.textContent='Step '+(i+1)+' of 3 · '+names[i]; cur=i;
    var f=steps[i].querySelector('input:not([type=checkbox]),select'); if(f&&started) f.focus();}
  form.addEventListener('click',function(e){
    var n=e.target.closest('[data-next]'),b=e.target.closest('[data-back]');
    if(n){started=true;if(validStep(cur))show(cur+1);}
    if(b){started=true;show(cur-1);}});
  form.addEventListener('keydown',function(e){ // Enter on steps 1-2 = Next
    if(e.key==='Enter'&&e.target.tagName==='INPUT'&&cur<2){e.preventDefault();started=true;if(validStep(cur))show(cur+1);}});
  form.addEventListener('blur',function(e){if(e.target.matches&&e.target.matches('input,select')&&e.target.closest('.is-invalid-x'))check(e.target);},true);
  form.addEventListener('input',function(e){if(e.target.closest('.is-invalid-x'))check(e.target);});
  form.addEventListener('change',function(e){if(e.target.closest('.is-invalid-x'))check(e.target);});
  var phone=document.getElementById('phone');
  phone.addEventListener('blur',function(){var d=digits(phone.value);if(d.length===10)phone.value='('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);});

  form.addEventListener('submit',function(e){
    e.preventDefault(); // DEMO: never sent anywhere, no fetch, no action URL
    if(!validStep(cur)) return;
    var g=function(id){return (document.getElementById(id).value||'').trim();};
    var addr=g('street')+(g('unit')?', '+g('unit'):'')+', '+g('city')+' '+g('zip');
    thanks.querySelector('[data-fill=fname]').textContent=g('fname');
    thanks.querySelector('[data-fill=address]').textContent=addr;
    thanks.querySelector('[data-fill=email]').textContent=g('email');
    shell.hidden=true; thanks.hidden=false;
    var card=document.getElementById('valuation'), top=card.getBoundingClientRect().top;
    if(top<0||top>window.innerHeight*.6) card.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    thanks.focus({preventScroll:true});
  });
  document.getElementById('resetForm').addEventListener('click',function(){thanks.hidden=true;shell.hidden=false;started=true;show(0);});

  // Every "Get my free estimate" link: scroll back to the form and focus the current field
  document.addEventListener('click',function(e){var a=e.target.closest('[data-focus-form]');if(!a)return;e.preventDefault();
    var card=document.getElementById('valuation');
    card.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    setTimeout(function(){var t=thanks.hidden?steps[cur].querySelector('input,select'):thanks;t&&t.focus({preventScroll:true});},reduce?0:500);});

  // Sticky mobile CTA: shows only after the form card has left the screen, hides near the final CTA and footer
  var sticky=document.getElementById('stickyCta');
  if('IntersectionObserver' in window&&sticky){
    var vis={valuation:true,'final-cta':false,foot:false};
    var upd=function(){var on=!vis.valuation&&!vis['final-cta']&&!vis.foot;sticky.classList.toggle('is-shown',on);sticky.setAttribute('aria-hidden',on?'false':'true');sticky.tabIndex=on?0:-1;};
    var so=new IntersectionObserver(function(es){es.forEach(function(x){vis[x.target.id||'foot']=x.isIntersecting;});upd();});
    so.observe(document.getElementById('valuation'));so.observe(document.getElementById('final-cta'));so.observe(document.querySelector('.site-footer'));
  }

  // Scroll reveal (progressive: nothing is hidden until the visitor actually scrolls; off for reduced motion)
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    var arm=function(){window.removeEventListener('scroll',arm);
      els.forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('in');else io.observe(el);});
      document.documentElement.classList.add('anim');};
    window.addEventListener('scroll',arm,{passive:true});
  }
})();
