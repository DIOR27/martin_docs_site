/* Martin — select.js */
(function () {
  if (!window._pwSelectInit) {
    window._pwSelectInit = true;
    window.pwSelectToggle = function (uid) {
      var drop=document.getElementById(uid+'_drop'),arrow=document.getElementById(uid+'_arrow'),btn=document.getElementById(uid+'_btn');
      var isOpen=drop&&drop.style.display!=='none';
      document.querySelectorAll('[id$="_drop"]').forEach(function(el){
        if(el.id!==uid+'_drop'){el.style.display='none';
          var a=document.getElementById(el.id.replace('_drop','_arrow'));if(a)a.style.transform='';
          var b=document.getElementById(el.id.replace('_drop','_btn'));if(b)b.style.borderColor='';}
      });
      if(isOpen){drop.style.display='none';if(arrow)arrow.style.transform='';if(btn)btn.style.borderColor='';}
      else{drop.style.display='block';if(arrow)arrow.style.transform='rotate(180deg)';if(btn)btn.style.borderColor='var(--accent)';
        setTimeout(function(){var s=document.getElementById(uid+'_search');if(s){s.value='';s.focus();pwSelectFilter(uid,'');}},50);}
    };
    window.pwSelectFilter=function(uid,q){
      document.querySelectorAll('#'+uid+'_list .pw-opt').forEach(function(i){
        i.style.display=i.getAttribute('data-label').toLowerCase().includes(q.toLowerCase())?'block':'none';});
    };
    window.pwSelectPick=function(uid,val,label){
      document.getElementById(uid+'_val').value=val;
      document.getElementById(uid+'_label').textContent=label;
      document.getElementById(uid+'_drop').style.display='none';
      var arrow=document.getElementById(uid+'_arrow');if(arrow)arrow.style.transform='';
      var btn=document.getElementById(uid+'_btn');if(btn)btn.style.borderColor='';
      document.querySelectorAll('#'+uid+'_list .pw-opt').forEach(function(el){
        var s=el.getAttribute('data-val')===val;
        el.style.background=s?'rgba(99,102,241,0.15)':'';el.style.color=s?'var(--accent)':'';el.style.fontWeight=s?'600':'400';});
    };
    document.addEventListener('click',function(e){
      if(!e.target.closest('[id$="_wrap"]'))
        document.querySelectorAll('[id$="_drop"]').forEach(function(el){
          el.style.display='none';
          var a=document.getElementById(el.id.replace('_drop','_arrow'));if(a)a.style.transform='';
          var b=document.getElementById(el.id.replace('_drop','_btn'));if(b)b.style.borderColor='';});
    });
  }
  if(!window._pwMultiState)window._pwMultiState={};
  window.pwMultiIsSelected=function(uid,val){return window._pwMultiState[uid]&&window._pwMultiState[uid].has(val);};
  window.pwMultiOpen=function(uid){var d=document.getElementById(uid+'_drop');if(d)d.style.display='block';};
  window.pwMultiFocus=function(uid){var i=document.getElementById(uid+'_input');if(i)i.focus();};
  window.pwMultiFilter=function(uid,q){
    document.querySelectorAll('#'+uid+'_list .pw-mopt').forEach(function(el){
      el.style.display=el.getAttribute('data-label').toLowerCase().includes(q.toLowerCase())?'flex':'none';});
  };
})();
