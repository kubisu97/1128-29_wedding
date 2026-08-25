/* ===========================================================================
 * WEDI.inspector — fields 仕様からインスペクタフォームを自動生成
 * 値の書き戻しは WEDI.editor.updateBlockData / updateBlockStyle 経由。
 * style はプリセットに加え、色と装飾を安全なコントロールから指定できる。
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

  /* 自由色：color input + テーマ標準へ戻す */
  function buildColorPicker(labelKey, current, fallback, onPick) {
    var row = document.createElement('div');
    row.className = 'ed-style__row';
    var lbl = document.createElement('label');
    lbl.textContent = i18n.t(labelKey);
    row.appendChild(lbl);

    var host = document.createElement('div');
    host.className = 'ed-color-picker';
    var input = document.createElement('input');
    input.type = 'color';
    var safeCurrent = WEDI.render.safeColor(current);
    input.value = safeCurrent || fallback;
    input.setAttribute('aria-label', i18n.t(labelKey));

    var value = document.createElement('code');
    value.textContent = safeCurrent || 'テーマ標準';

    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'ed-btn ed-btn--ghost ed-btn--sm';
    reset.textContent = '標準に戻す';
    reset.disabled = !safeCurrent;

    input.addEventListener('input', function () {
      value.textContent = input.value;
      reset.disabled = false;
      onPick(input.value);
    });
    reset.addEventListener('click', function () {
      input.value = fallback;
      value.textContent = 'テーマ標準';
      reset.disabled = true;
      onPick('');
    });

    host.appendChild(input);
    host.appendChild(value);
    host.appendChild(reset);
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
    var page = ed().activePage();
    var isGuide = page && /しおり|guide|旅/.test((page.name || '') + ' ' + (page.slug || ''));
    var colorDefaults = isGuide
      ? { bg: '#fffaf2', text: '#181717', decoration: '#cf2529' }
      : { bg: '#f8edda', text: '#174c39', decoration: '#eda9c3' };

    sec.appendChild(buildBgSwatches(st.bg, function (v) { ed().updateBlockStyle(bid, 'bg', v); }));
    sec.appendChild(buildColorPicker('styleCustomBg', st.customBg, colorDefaults.bg, function (v) {
      ed().updateBlockStyle(bid, 'customBg', v);
    }));
    sec.appendChild(buildColorPicker('styleCustomText', st.customText, colorDefaults.text, function (v) {
      ed().updateBlockStyle(bid, 'customText', v);
    }));
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

    var decorationDetails = document.createElement('div');
    decorationDetails.className = 'ed-decoration-details';
    var decorationValue = st.decoration || 'default';

    // あしらい図形ピッカー（形が見えるグリッド）
    var decoWrap = document.createElement('div');
    decoWrap.className = 'ed-field';
    var decoLbl = document.createElement('label');
    decoLbl.textContent = i18n.t('styleDecoration');
    decoWrap.appendChild(decoLbl);
    var decoGrid = document.createElement('div');
    decoGrid.className = 'ed-deco-grid';
    var decoOptions = [
      { value: 'default', text: '標準' },
      { value: 'none', text: 'なし' },
      { value: 'starburst', label: 'やわらか星' },
      { value: 'circle', label: '丸' },
      { value: 'scallop', label: 'ぷくぷく丸' },
      { value: 'blob', label: 'ぷっくり花' },
      { value: 'daisy', label: '花びら' },
      { value: 'splat', label: 'スプラッシュ' },
      { value: 'wreath', label: '花リング' },
      { value: 'seal', label: 'ギザギザ' },
      { value: 'spikeball', label: 'トゲ丸' },
      { value: 'flower', label: 'お花（クラシック）' },
      { value: 'starfish', label: 'ヒトデ' },
      { value: 'clover', label: 'クローバー' },
      { value: 'sparkle', label: 'キラッ' },
      { value: 'star6', label: '星6' },
      { value: 'star7', label: '星7' },
      { value: 'star8', label: '星8' },
      { value: 'wavybar', label: 'なみなみ棒' },
      { value: 'squiggle', label: 'うねうね線' },
      { value: 'arch', label: 'アーチ' }
    ];
    decoOptions.forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ed-deco-swatch' + (decorationValue === opt.value ? ' is-on' : '');
      b.title = opt.label || opt.text;
      if (opt.text) {
        b.textContent = opt.text;
      } else {
        var sp = document.createElement('span');
        sp.className = 'ed-deco-shape ed-deco-shape--' + opt.value;
        b.appendChild(sp);
      }
      b.addEventListener('click', function () {
        var cs = decoGrid.querySelectorAll('.ed-deco-swatch');
        for (var i = 0; i < cs.length; i++) { cs[i].classList.remove('is-on'); }
        b.classList.add('is-on');
        decorationDetails.hidden = opt.value === 'default' || opt.value === 'none';
        ed().updateBlockStyle(bid, 'decoration', opt.value);
      });
      decoGrid.appendChild(b);
    });
    decoWrap.appendChild(decoGrid);
    sec.appendChild(decoWrap);

    decorationDetails.hidden = decorationValue === 'default' || decorationValue === 'none';
    decorationDetails.appendChild(buildSegment('styleDecorationPosition', [
      { value: 'top-left', label: i18n.t('decorationPosition.topLeft') },
      { value: 'top-right', label: i18n.t('decorationPosition.topRight') },
      { value: 'bottom-left', label: i18n.t('decorationPosition.bottomLeft') },
      { value: 'bottom-right', label: i18n.t('decorationPosition.bottomRight') }
    ], st.decorationPosition || 'top-right', function (v) { ed().updateBlockStyle(bid, 'decorationPosition', v); }));
    decorationDetails.appendChild(buildSegment('styleDecorationSize', [
      { value: 'small', label: i18n.t('decorationSize.small') },
      { value: 'medium', label: i18n.t('decorationSize.medium') },
      { value: 'large', label: i18n.t('decorationSize.large') }
    ], st.decorationSize || 'medium', function (v) { ed().updateBlockStyle(bid, 'decorationSize', v); }));
    decorationDetails.appendChild(buildColorPicker('styleDecorationColor', st.decorationColor, colorDefaults.decoration, function (v) {
      ed().updateBlockStyle(bid, 'decorationColor', v);
    }));
    sec.appendChild(decorationDetails);

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
