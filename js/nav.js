/* Martin — nav.js */
/* defer garantiza que el DOM ya está listo — no necesitamos DOMContentLoaded */
(function () {
  var file = window.location.pathname.split('/').pop() || 'index.html';
  if (!file.endsWith('.html')) file = 'index.html';
  document.querySelectorAll('nav.martin-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop() || 'index.html';
    if (href === file) a.classList.add('active');
  });
  var nav    = document.querySelector('nav.martin-nav');
  var burger = nav && nav.querySelector('.mn-burger');
  if (burger) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('mn-open');
    });
    var drawer = nav.querySelector('.mn-drawer');
    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('mn-open'); });
      });
    }
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('mn-open');
    });
  }
})();
