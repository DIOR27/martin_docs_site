/* getting-started.js */
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
})();