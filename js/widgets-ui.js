/* widgets-ui.js */
(function(){
  // Default: respect OS setting. User can override with the toggle button.
  var INITIAL = 'auto';
  var stored  = localStorage.getItem('martin-theme');
  // If no stored preference, use the app default (usually 'auto')
  var active  = stored || INITIAL;

  function icon(t) {
    if (t === 'dark')  return '☀️';
    if (t === 'light') return '🌙';
    // auto — show which mode the OS is currently in
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return '🌗';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('martin-theme', t);
    var btn = document.getElementById('_martin_theme_btn');
    if (btn) {
      btn.textContent = icon(t);
      btn.title = t === 'auto' ? 'Tema: automático (sistema)' :
                  t === 'dark' ? 'Tema: oscuro' : 'Tema: claro';
    }
  }

  function cycleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') || 'auto';
    // cycle: auto → dark → light → auto
    setTheme(cur === 'auto' ? 'dark' : cur === 'dark' ? 'light' : 'auto');
  }

  // Listen for OS theme changes when in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    var cur = document.documentElement.getAttribute('data-theme');
    if (cur === 'auto') setTheme('auto'); // re-apply to refresh icon
  });

  window._martinSetTheme   = setTheme;
  window._martinCycleTheme = cycleTheme;
  setTheme(active);
})();;

(function(){if(window._pwSelInit)return;window._pwSelInit=true;window.pwSelectToggle=function(uid){  var d=document.getElementById(uid+"_drop"),      a=document.getElementById(uid+"_arrow"),      b=document.getElementById(uid+"_btn"),      o=d.style.display!=="none";  document.querySelectorAll("[id$=_drop]").forEach(function(el){    if(el.id!==uid+"_drop"){el.style.display="none";      var x=document.getElementById(el.id.replace("_drop","_arrow"));      if(x)x.style.transform="";      var bx=document.getElementById(el.id.replace("_drop","_btn"));      if(bx)bx.style.borderColor="";}  });  if(o){d.style.display="none";a.style.transform="";b.style.borderColor="";}  else{d.style.display="block";a.style.transform="rotate(180deg)";    b.style.borderColor="var(--accent)";    setTimeout(function(){var s=document.getElementById(uid+"_search");      if(s){s.value="";s.focus();pwSelectFilter(uid,"");}},30);}};window.pwSelectFilter=function(uid,q){  document.querySelectorAll("#"+uid+"_list .pw-opt").forEach(function(i){    i.style.display=i.getAttribute("data-label").toLowerCase().includes(q.toLowerCase())?"block":"none";  });};window.pwSelectPick=function(uid,val,label){  document.getElementById(uid+"_val").value=val;  document.getElementById(uid+"_label").textContent=label;  document.getElementById(uid+"_drop").style.display="none";  document.getElementById(uid+"_arrow").style.transform="";  document.getElementById(uid+"_btn").style.borderColor="";  document.querySelectorAll("#"+uid+"_list .pw-opt").forEach(function(el){    var s=el.getAttribute("data-val")===val;    el.setAttribute("data-sel",s?"1":"0");    el.style.fontWeight=s?"600":"400";  });};document.addEventListener("click",function(e){  if(!e.target.closest("[id$=_wrap]")){    document.querySelectorAll("[id$=_drop]").forEach(function(el){      el.style.display="none";      var a=document.getElementById(el.id.replace("_drop","_arrow"));      if(a)a.style.transform="";      var b=document.getElementById(el.id.replace("_drop","_btn"));      if(b)b.style.borderColor="";    });  }});})();;

(function(){var uid="pw_multi_1";var opts=[{"v": "Frontend", "l": "Frontend"}, {"v": "Backend", "l": "Backend"}, {"v": "DevOps", "l": "DevOps"}, {"v": "Testing", "l": "Testing"}];var name=null;var tc="rgba(99,102,241,0.15)";var tb="rgba(99,102,241,0.35)";var tt="var(--accent)";var ph="Select areas...";var sel=new Set(["Frontend"]);if(!window._pwMultiState)window._pwMultiState={};window._pwMultiState[uid]=sel;var box=document.getElementById(uid+'_box');var input=document.getElementById(uid+'_input');var drop=document.getElementById(uid+'_drop');var list=document.getElementById(uid+'_list');var tags=document.getElementById(uid+'_tags');var hidden=document.getElementById(uid+'_hidden');var clearBtn=document.getElementById(uid+'_clear');function render(){  box.querySelectorAll('span[data-tag]').forEach(function(t){t.remove();});  sel.forEach(function(val){    var opt=opts.find(function(o){return o.v===val;})||{};    var label=opt.l||val;    var tag=document.createElement('span');    tag.setAttribute('data-tag',val);    tag.style.cssText='display:inline-flex;align-items:center;gap:4px;padding:3px 8px;'      +'border-radius:9999px;font-size:12px;font-weight:500;flex-shrink:0;'      +'background:'+tc+';color:'+tt+';border:1px solid '+tb;    var txt=document.createTextNode(label);    var x=document.createElement('span');    x.textContent='×';    x.style.cssText='cursor:pointer;font-size:15px;line-height:1;opacity:0.6;margin-left:2px';    x.onmouseover=function(){this.style.opacity='1';};    x.onmouseout=function(){this.style.opacity='0.6';};    (function(v){x.onclick=function(e){e.stopPropagation();sel.delete(v);render();showOpt(v);};})(val);    tag.appendChild(txt);tag.appendChild(x);    box.insertBefore(tag,input);  });  if(name){    hidden.innerHTML='';    sel.forEach(function(val){      var i=document.createElement('input');      i.type='hidden';i.name=name;i.value=val;      hidden.appendChild(i);    });  }  input.placeholder=sel.size===0?ph:'';}function showOpt(val){  var el=list.querySelector('[data-val="'+val+'"]');  if(el)el.style.display='block';}function openDrop(){  drop.style.display='block';  box.style.borderColor='var(--accent)';}function closeDrop(){  drop.style.display='none';  box.style.borderColor='';  input.value='';  list.querySelectorAll('.pw-mopt').forEach(function(el){    var v=el.getAttribute('data-val');    el.style.display=sel.has(v)?'none':'block';  });}list.addEventListener('click',function(e){  var el=e.target.closest('.pw-mopt');  if(!el)return;  var val=el.getAttribute('data-val');  sel.add(val);  el.style.display='none';  input.value='';  list.querySelectorAll('.pw-mopt').forEach(function(e2){    var v=e2.getAttribute('data-val');    e2.style.display=sel.has(v)?'none':'block';  });  render();  input.focus();});input.addEventListener('focus',openDrop);input.addEventListener('input',function(){  var q=this.value.toLowerCase();  list.querySelectorAll('.pw-mopt').forEach(function(el){    var v=el.getAttribute('data-val');    var match=el.getAttribute('data-label').toLowerCase().includes(q);    el.style.display=(match&&!sel.has(v))?'block':'none';  });});clearBtn.addEventListener('click',function(){  sel.clear();  list.querySelectorAll('.pw-mopt').forEach(function(el){el.style.display='block';});  render();  closeDrop();});document.addEventListener('click',function(e){  if(!e.target.closest('#'+uid+'_wrap'))closeDrop();});render();})()