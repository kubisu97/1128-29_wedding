/* ===========================================================================
 * WEDI.inspector — fields 仕様からインスペクタフォームを自動生成
 * 値の書き戻しは WEDI.editor.updateBlockData / updateBlockStyle 経由。
 * style はプリセット拘束（セグメント/スウォッチ）で自由入力させない。
 * 依存: schema, render(esc), i18n, theme（呼び出し時に editor も存在）
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};
  var S = WEDI.schema;
  var T = WEDI.theme;
  var i18n = WEDI.i18n;
  var esc = WEDI.render.esc;

  var root = document.getElementById('inspector');

  function ed() { return WEDI.editor; }

  /* ---- 単一フィールドの control を作る ---- */
  function buildControl(type, value, onInput) {
    if (type === 'textarea') {
      var ta = document.createElement('textarea');
      ta.value = value || '';
      ta.addEventListener('input', function () { onInput(ta.value); });
      return ta;
    }
    if (type === 'select') {
      // options は呼び出し側で別途処理（ここには来ない）
      var sel = document.createElement('select');
      return sel;
    }
    var input = document.createElement('input');
    input.type = 'text';
    input.value = value || '';
    input.addEventListener('input', function () { onInput(input.value); });
    return input;
  }

  /* 画像フィールド: URL 入力 + プレビュー */
  function buildImageField(value, onInput) {
    var wrap = document.createElement('div');
    wrap.className = 'ed-image-field';

    var preview = document.createElement('div');
    preview.className = 'ed-image-field__preview';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = i18n.t('imageUrlPlaceholder');
    input.value = value || '';

    function updatePreview(url) {
      preview.innerHTML = '';
      var safe = WEDI.render.safeUrl(url);
      if (safe) {
        var img = document.createElement('img');
        img.src = safe;
        img.alt = '';
        preview.appendChild(img);
      } else {
        preview.textContent = i18n.t('noImage');
      }
    }
    updatePreview(value);
    input.addEventListener('input', function () {
      updatePreview(input.value);
      onInput(input.value);
    });

    wrap.appendChild(preview);
    wrap.appendChild(input);

    // ファイル選択 → アップロード（Supabase 設定時のみ表示）
    if (WEDI.upload && WEDI.upload.isConfigured()) {
      var row = document.createElement('div');
      row.className = 'ed-image-field__upload';

      var fileBtn = document.createElement('label');
      fileBtn.className = 'ed-btn ed-btn--sm';
      fileBtn.textContent = '画像をアップロード';
      var file = document.createElement('input');
      file.type = 'file';
      file.accept = 'image/*';
      file.style.display = 'none';
      fileBtn.appendChild(file);

      var stat = document.createElement('span');
      stat.className = 'ed-image-field__status';

      file.addEventListener('change', function () {
        var f = file.files && file.files[0];
        if (!f) { return; }
        stat.textContent = 'アップロード中…';
        WEDI.upload.uploadFile(f).then(function (url) {
          input.value = url;
          updatePreview(url);
          onInput(url);
          stat.textContent = '完了';
          file.value = '';
        }).catch(function (err) {
          stat.textContent = '失敗: ' + (err && err.message ? err.message : 'エラー');
        });
      });

      row.appendChild(fileBtn);
      row.appendChild(stat);
      wrap.appendChild(row);
    }

    return wrap;
  }

  /* select フィールド */
  function buildSelectField(field, value, onInput) {
    var sel = document.createElement('select');
    (field.options || []).forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === value) { o.selected = true; }
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { onInput(sel.value); });
    return sel;
  }

  /* ---- list フィールド（サブ項目の繰り返し） ---- */
  function buildListField(block, field) {
    var wrap = document.createElement('div');
    wrap.className = 'ed-list';

    var head = document.createElement('div');
    head.className = 'ed-list__head';
    head.textContent = field.label;
    wrap.appendChild(head);

    var items = block.data[field.key];
    if (!Array.isArray(items)) { items = block.data[field.key] = []; }

    var listHost = document.createElement('div');
    wrap.appendChild(listHost);

    function persist() {
      // list 全体を data に書き戻して再描画
      ed().updateBlockData(block.id, field.key, items);
    }

    function renderItems() {
      listHost.innerHTML = '';
      items.forEach(function (item, index) {
        var card = document.createElement('div');
        card.className = 'ed-list__item';

        var ih = document.createElement('div');
        ih.className = 'ed-list__item-head';
        ih.innerHTML = '<span>' + esc(field.itemLabel || i18n.t('item')) + ' ' + (index + 1) + '</span>';

        var controls = document.createElement('span');

        var up = document.createElement('button');
        up.className = 'ed-btn ed-btn--ghost ed-btn--sm';
        up.textContent = '↑';
        up.disabled = index === 0;
        up.addEventListener('click', function () {
          var tmp = items[index - 1]; items[index - 1] = items[index]; items[index] = tmp;
          renderItems(); persist();
        });

        var down = document.createElement('button');
        down.className = 'ed-btn ed-btn--ghost ed-btn--sm';
        down.textContent = '↓';
        down.disabled = index === items.length - 1;
        down.addEventListener('click', function () {
          var tmp = items[index + 1]; items[index + 1] = items[index]; items[index] = tmp;
          renderItems(); persist();
        });

        var rm = document.createElement('button');
        rm.className = 'ed-btn ed-btn--danger ed-btn--sm';
        rm.textContent = i18n.t('removeItem');
        rm.addEventListener('click', function () {
          items.splice(index, 1);
          renderItems(); persist();
        });

        controls.appendChild(up);
        controls.appendChild(down);
        controls.appendChild(rm);
        ih.appendChild(controls);
        card.appendChild(ih);

        (field.itemFields || []).forEach(function (sub) {
          var sf = document.createElement('div');
          sf.className = 'ed-list__subfield';
          var lbl = document.createElement('label');
          lbl.textContent = sub.label;
          sf.appendChild(lbl);

          var onInput = function (v) { item[sub.key] = v; persist(); };
          var control;
          if (sub.type === 'image') {
            control = buildImageField(item[sub.key], onInput);
          } else if (sub.type === 'select') {
            control = buildSelectField(sub, item[sub.key], onInput);
          } else if (sub.type === 'textarea') {
            control = buildControl('textarea', item[sub.key], onInput);
          } else {
            control = buildControl('text', item[sub.key], onInput);
            if (sub.placeholder) { control.placeholder = sub.placeholder; }
          }
          sf.appendChild(control);
          card.appendChild(sf);
        });

        listHost.appendChild(card);
      });
    }
    renderItems();

    var add = document.createElement('button');
    add.className = 'ed-btn ed-btn--sm';
    add.style.cssText = 'width:100%;margin-top:4px;';
    add.textContent = i18n.t('addItem');
    add.addEventListener('click', function () {
      if (field.max && items.length >= field.max) { ed().toast('上限に達しました'); return; }
      var blank = {};
      (field.itemFields || []).forEach(function (sub) { blank[sub.key] = ''; });
      items.push(blank);
      renderItems(); persist();
    });
    wrap.appendChild(add);

    return wrap;
  }

  /* ---- style セグメントコントロール ---- */
  function buildSegment(labelKey, options, current, onPick) {
    var row = document.createElement('div');
    row.className = 'ed-style__row';
    var lbl = document.createElement('label');
    lbl.textContent = i18n.t(labelKey);
    row.appendChild(lbl);

    var seg = document.createElement('div');
    seg.className = 'ed-seg';
    options.forEach(function (opt) {
      var b = document.createElement('button');
      b.className = 'ed-seg__opt' + (opt.value === current ? ' is-on' : '');
      b.textContent = opt.label;
      b.addEventListener('click', function () {
        seg.querySelectorAll('.ed-seg__opt').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        onPick(opt.value);
      });
      seg.appendChild(b);
    });
    row.appendChild(seg);
    return row;
  }

  /* 背景スウォッチ（パレット色のみ） */
  function buildBgSwatches(current, onPick) {
    var row = document.createElement('div');
    row.className = 'ed-style__row';
    var lbl = document.createElement('label');
    lbl.textContent = i18n.t('styleBg');
    row.appendChild(lbl);

    var host = document.createElement('div');
    host.className = 'ed-swatches';
    var colors = ed().state.doc.theme.colors;
    T.BG_PRESETS.forEach(function (bg) {
      var sw = document.createElement('button');
      sw.className = 'ed-swatch' + (bg === current ? ' is-on' : '') + (bg === 'none' ? ' ed-swatch--none' : '');
      sw.title = i18n.t('bg.' + bg);
      if (bg !== 'none') { sw.style.background = colors[bg] || '#ccc'; }
      sw.addEventListener('click', function () {
        host.querySelectorAll('.ed-swatch').forEach(function (x) { x.classList.remove('is-on'); });
        sw.classList.add('is-on');
        onPick(bg);
      });
      host.appendChild(sw);
    });
    row.appendChild(host);
    return row;
  }

  /* ---- style セクション全体 ---- */
  function buildStyleSection(block) {
    var sec = document.createElement('div');
    sec.className = 'ed-style';
    var title = document.createElement('div');
    title.className = 'ed-section__title';
    title.textContent = i18n.t('styleSection');
    sec.appendChild(title);

    var st = block.style || S.defaultStyle();
    var bid = block.id;

    sec.appendChild(buildBgSwatches(st.bg, function (v) { ed().updateBlockStyle(bid, 'bg', v); }));
    sec.appendChild(buildSegment('styleAlign', [
      { value: 'left', label: i18n.t('align.left') },
      { value: 'center', label: i18n.t('align.center') },
      { value: 'right', label: i18n.t('align.right') }
    ], st.align, function (v) { ed().updateBlockStyle(bid, 'align', v); }));
    sec.appendChild(buildSegment('styleSpacing', [
      { value: 'tight', label: i18n.t('spacing.tight') },
      { value: 'normal', label: i18n.t('spacing.normal') },
      { value: 'roomy', label: i18n.t('spacing.roomy') }
    ], st.spacing, function (v) { ed().updateBlockStyle(bid, 'spacing', v); }));
    sec.appendChild(buildSegment('styleWidth', [
      { value: 'narrow', label: i18n.t('width.narrow') },
      { value: 'normal', label: i18n.t('width.normal') },
      { value: 'wide', label: i18n.t('width.wide') }
    ], st.width, function (v) { ed().updateBlockStyle(bid, 'width', v); }));
    sec.appendChild(buildSegment('styleTilt', [
      { value: 'none', label: i18n.t('tilt.none') },
      { value: 'left', label: i18n.t('tilt.left') },
      { value: 'right', label: i18n.t('tilt.right') }
    ], st.tilt, function (v) { ed().updateBlockStyle(bid, 'tilt', v); }));

    return sec;
  }

  /* ---- インスペクタ描画 ---- */
  function render(block) {
    root.innerHTML = '';

    if (!block) {
      var empty = document.createElement('div');
      empty.className = 'ed-inspector__empty';
      empty.textContent = i18n.t('noSelection');
      root.appendChild(empty);
      return;
    }

    var def = S.types[block.type] || {};

    // ヘッダ（タイトル + 操作）
    var head = document.createElement('div');
    head.className = 'ed-inspector__head';
    head.innerHTML = '<span class="ed-inspector__title">' + (def.icon || '') + ' ' +
      esc(def.label || block.type) + '</span>';

    var dup = document.createElement('button');
    dup.className = 'ed-btn ed-btn--ghost ed-btn--sm';
    dup.textContent = i18n.t('duplicate');
    dup.addEventListener('click', function () { ed().duplicateBlock(block.id); });

    var del = document.createElement('button');
    del.className = 'ed-btn ed-btn--danger ed-btn--sm';
    del.textContent = i18n.t('removeItem');
    del.title = i18n.t('deleteBlock');
    del.addEventListener('click', function () { ed().deleteBlock(block.id); });

    head.appendChild(dup);
    head.appendChild(del);
    root.appendChild(head);

    // フィールド
    (def.fields || []).forEach(function (field) {
      if (field.type === 'list') {
        root.appendChild(buildListField(block, field));
        return;
      }
      var fieldEl = document.createElement('div');
      fieldEl.className = 'ed-field';
      var lbl = document.createElement('label');
      lbl.textContent = field.label;
      fieldEl.appendChild(lbl);

      var onInput = function (v) { ed().updateBlockData(block.id, field.key, v); };
      var control;
      if (field.type === 'image') {
        control = buildImageField(block.data[field.key], onInput);
      } else if (field.type === 'select') {
        control = buildSelectField(field, block.data[field.key], onInput);
      } else if (field.type === 'textarea') {
        control = buildControl('textarea', block.data[field.key], onInput);
      } else {
        control = buildControl('text', block.data[field.key], onInput);
        if (field.placeholder) { control.placeholder = field.placeholder; }
      }
      fieldEl.appendChild(control);
      root.appendChild(fieldEl);
    });

    // style セクション
    root.appendChild(buildStyleSection(block));
  }

  WEDI.inspector = { render: render };
})(window);
