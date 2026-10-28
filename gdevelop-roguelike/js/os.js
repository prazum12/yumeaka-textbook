// OS切り替え（Windows / Mac）
(function () {
  var saved = 'win';
  try { saved = localStorage.getItem('yumeaka-os') || 'win'; } catch (e) {}
  document.body.dataset.os = saved;

  document.querySelectorAll('.os-toggle button').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.os === saved);
    btn.addEventListener('click', function () {
      document.body.dataset.os = btn.dataset.os;
      try { localStorage.setItem('yumeaka-os', btn.dataset.os); } catch (e) {}
      document.querySelectorAll('.os-toggle button').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
    });
  });
})();

// 別のページから来たときは、ページの一番上から表示する
// （埋め込み表示などで前のページのスクロール位置が残ることがあるため）
(function () {
  if (location.hash) return;
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  var toTop = function () { window.scrollTo(0, 0); };
  toTop();
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', toTop);
})();
