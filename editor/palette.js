/* ===========================================================================
 * WEDI.palette — ブロック追加パレット
 * schema.order の順でパーツを並べ、クリックで onAdd(type) を呼ぶ（v1: クリック追加）。
 * 依存: schema, render(esc)
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};
  var S = WEDI.schema;
  var esc = WEDI.render.esc;

  function render(host, onAdd) {
    host.innerHTML = '';
    S.order.forEach(function (type) {
      var def = S.types[type];
      if (!def) { return; }
      var btn = document.createElement('button');
      btn.className = 'ed-palette__item';
      btn.type = 'button';
      btn.dataset.type = type;
      btn.innerHTML =
        '<span class="ed-palette__icon">' + (def.icon || '▫') + '</span>' +
        '<span>' + esc(def.label || type) + '</span>';
      btn.addEventListener('click', function () { onAdd(type); });
      host.appendChild(btn);
    });
  }

  WEDI.palette = { render: render };
})(window);
