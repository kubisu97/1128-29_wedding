/* ===========================================================================
 * WEDI.seed — 初期サンプル doc（Favori 構成）
 * 保存データが無いとき（初回）に使う。招待状ページ + 旅のしおりページ。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  function st(over) {
    var s = { bg: 'none', align: 'center', spacing: 'normal', width: 'normal', tilt: 'none' };
    if (over) { Object.keys(over).forEach(function (k) { s[k] = over[k]; }); }
    return s;
  }

  var SEED = {
    version: 2,
    theme: WEDI.theme ? WEDI.theme.clone(WEDI.theme.DEFAULT) : {},
    pages: [
      {
        id: 'pg_home', name: '招待状', slug: 'home',
        blocks: [
          { id: 'bk_cover', type: 'cover', style: st({ bg: 'pink', spacing: 'tight' }), data: {
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
            letteringImage: 'assets/cover-lettering.png',
            lettering: 'WEDDING\nINVITATION', names: 'SHUNPEI and KONOMI', date: '2026.11.29' } },
          { id: 'bk_cd', type: 'countdown', style: st({ bg: 'pink' }), data: {
            target: '2026-11-29T10:30:00+09:00', dateLabel: '2026.11.29' } },
          { id: 'bk_msg', type: 'message', style: st({ bg: 'paper' }), data: {
            heading: 'Message', subheading: 'ご挨拶',
            body: '謹啓　皆様におかれましては\nご清栄のこととお慶び申し上げます\nこのたび私たちは京都で結婚式を挙げることになりました\nつきましては日頃お世話になっている皆様に\n心ばかりの披露宴を催したく存じます',
            sign: '謹白', image: '' } },
          { id: 'bk_prof', type: 'profile', style: st({ bg: 'pink' }), data: {
            heading: 'Profile', subheading: 'プロフィール',
            people: [
              { role: '新郎', name: '岩井 俊平', image: '', text: '皆様にお会いできることが今から楽しみです！' },
              { role: '新婦', name: '福永 このみ', image: '', text: 'これからも夫婦共々よろしくお願いいたします' }
            ] } },
          { id: 'bk_alb', type: 'album', style: st({ bg: 'paper' }), data: {
            heading: 'Album', subheading: 'アルバム', images: [
              { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80', alt: '' },
              { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80', alt: '' }
            ] } },
          { id: 'bk_party', type: 'partyInfo', style: st({ bg: 'sage' }), data: {
            heading: 'Party Information', subheading: 'パーティーのご案内',
            dateLabel: 'Date', dateText: '2026年11月29日 日曜日',
            sessions: [
              { name: '挙式', start: '10:30', sub1Label: '受付', sub1: '10:00', sub2Label: '終了予定', sub2: '11:00' },
              { name: '披露宴', start: '11:30', sub1Label: '受付', sub1: '11:00', sub2Label: 'お開き', sub2: '14:30' }
            ],
            venueLabel: '会場情報', venueName: 'アトールテラス鴨川',
            venueLines: '〒600-0000\n京都府京都市○-○-○\nTEL : 00-0000-0000' } },
          { id: 'bk_req', type: 'request', style: st({ bg: 'pink' }), data: {
            heading: 'Request', subheading: 'その他のご案内',
            cardTitle: '挙式参列のお願い',
            cardBody: '誠に恐れ入りますが\n挙式にもご列席賜りたく\n当日は ○時○分 迄に\nご光来のほど\nよろしくお願い申し上げます' } },
          { id: 'bk_rsvp', type: 'rsvp', style: st({ bg: 'pink' }), data: {
            heading: 'RSVP', subheading: '返信フォーム', lead: '御出欠について',
            deadline: '2026年11月1日 (日)',
            deadlineNote: '万が一ご都合が合わなくなってしまった場合は\n直接ご連絡ください',
            askCeremony: true, askReception: true,
            askCompanions: true, maxCompanions: 5,
            busInfo: '当日　送迎バスをご用意しております\nご利用を希望される場合はお知らせくださいませ',
            submitLabel: '確認画面へ', endpoint: '' } }
        ]
      },
      {
        id: 'pg_guide', name: '旅のしおり', slug: 'guide',
        blocks: [
          { id: 'bk_g_msg', type: 'message', style: st({ bg: 'paper' }), data: {
            heading: 'Travel Guide', subheading: '旅のしおり',
            body: '前日から少しずつ旅気分で。\n11月の京都は朝晩が冷えるので、軽い羽織りがあると安心です。', sign: '' } },
          { id: 'bk_g_day1', type: 'schedule', style: st({ bg: 'pink' }), data: {
            heading: 'Day 1', subheading: '11月28日', items: [
              { time: '07:30', title: '広島をバスで出発', text: '' },
              { time: '15:00', title: 'ホテルにチェックイン', text: '四条河原町' },
              { time: '19:00', title: '前夜祭ディナー', text: '' }
            ] } },
          { id: 'bk_g_map', type: 'map', style: st({ bg: 'paper' }), data: {
            heading: 'Access', subheading: 'ホテル周辺', embed: '', caption: '地図をタップで拡大・操作できます。' } }
        ]
      }
    ]
  };

  WEDI.seed = SEED;
})(window);
