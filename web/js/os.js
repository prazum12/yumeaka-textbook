// OS切り替え（Windows / Mac）
(function () {
  var saved = 'win';
  try { saved = localStorage.getItem('yumeaka-os') || 'win'; } catch (e) {}
  document.body.dataset.os = saved;

  document.querySelectorAll('.os-toggle button').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.os === saved);
    btn.setAttribute('aria-pressed', btn.dataset.os === saved ? 'true' : 'false');
    btn.addEventListener('click', function () {
      document.body.dataset.os = btn.dataset.os;
      try { localStorage.setItem('yumeaka-os', btn.dataset.os); } catch (e) {}
      document.querySelectorAll('.os-toggle button').forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
    });
  });
})();
