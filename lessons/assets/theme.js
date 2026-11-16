  (function(){
    var btn=document.getElementById('themeBtn');
    try{var s=localStorage.getItem('bsl-theme'); if(s){document.documentElement.setAttribute('data-theme',s);}}catch(e){}
    btn.addEventListener('click',function(){
      var cur=document.documentElement.getAttribute('data-theme');
      var isDark = cur ? cur==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var next=isDark?'light':'dark';
      document.documentElement.setAttribute('data-theme',next);
      try{localStorage.setItem('bsl-theme',next);}catch(e){}
    });
  })();
