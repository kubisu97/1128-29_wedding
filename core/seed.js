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
            body: '2日間、みんなで京都を楽しみましょう！\n11月の京都は朝晩がぐっと冷えます。軽い羽織りやカーディガンがあると安心です。\n自由時間にぜひおすすめスポットも回ってみてください。', sign: '' } },
          { id: 'bk_g_day1', type: 'schedule', style: st({ bg: 'pink' }), data: {
            heading: 'Day 1', subheading: '11月28日（金）', items: [
              { time: '07:30', title: 'バス乗車（広島出発）', text: '集合場所: 〇〇〇〇\n※時間厳守でお願いします' },
              { time: '12:00', title: 'ランチ休憩（予定）', text: 'サービスエリアにて各自でお昼を' },
              { time: '15:00', title: 'ホテルにチェックイン', text: 'RakutenStays 四条河原町\n四条河原町駅から徒歩約3分' },
              { time: '15:00', title: '自由時間', text: '京都の街を自由に散策！\nおすすめスポットは下のマップをチェック' },
              { time: '19:00', title: 'みんなでご飯（さざんか亭）', text: '前夜に集まってわいわいしましょう 🍻\n※詳細は別途ご連絡します' },
              { time: '21:00', title: '自由時間・就寝', text: '翌日に備えてゆっくり休んでください' }
            ] } },
          { id: 'bk_g_day2', type: 'schedule', style: st({ bg: 'sage' }), data: {
            heading: 'Day 2', subheading: '11月29日（土）— 結婚式当日', items: [
              { time: '10:00', title: 'アトールテラス鴨川に集合', text: '受付開始: 10:00\n挙式: 10:30〜\n会場: 〒600-0000 京都府京都市○-○-○' },
              { time: '11:30', title: '披露宴スタート', text: '皆様と一緒に素敵な時間を過ごしましょう！' },
              { time: '14:30', title: '披露宴お開き', text: '' },
              { time: '15:00', title: 'バス乗車（京都出発）', text: '集合場所: 会場前\n※荷物の準備をお忘れなく' },
              { time: '20:00', title: '広島到着（予定）', text: 'お疲れ様でした！' }
            ] } },
          { id: 'bk_g_spots', type: 'spotMap', style: st({ bg: 'paper' }), data: {
            heading: 'Kyoto Spots', subheading: '京都おすすめスポット',
            spots: [
              { genre: 'ホテル・式場', name: 'RakutenStays 四条河原町', description: '宿泊先のホテルです。四条河原町駅から徒歩約3分。チェックインは15:00〜。', mapEmbed: '', lat: '35.0036', lng: '135.7682' },
              { genre: 'ホテル・式場', name: 'アトールテラス鴨川', description: '結婚式・披露宴の会場。10:00集合です。鴨川沿いの素敵なテラス会場です。', mapEmbed: '', lat: '35.0083', lng: '135.7722' },
              { genre: '飲食', name: 'さざんか亭', description: '前夜祭ディナーの会場。みんなで乾杯しましょう！詳細は別途連絡します。', mapEmbed: '', lat: '35.0050', lng: '135.7670' },
              { genre: '観光', name: '清水寺', description: '言わずと知れた京都の名所。紅葉の11月は最高の季節。徒歩や市バスで行けます。', mapEmbed: '', lat: '34.9948', lng: '135.7851' },
              { genre: '観光', name: '八坂神社・祇園', description: '祇園の中心。夜もライトアップされていて風情があります。', mapEmbed: '', lat: '35.0036', lng: '135.7785' },
              { genre: 'カフェ', name: '（スプレッドシートから追加予定）', description: 'エディターのスポットリストにデータを追加してください。', mapEmbed: '', lat: '', lng: '' },
              { genre: 'バー・深夜', name: '（スプレッドシートから追加予定）', description: 'エディターのスポットリストにデータを追加してください。', mapEmbed: '', lat: '', lng: '' }
            ] } },
          { id: 'bk_g_outro', type: 'message', style: st({ bg: 'pink' }), data: {
            heading: 'See you in Kyoto', subheading: 'またね',
            body: '皆さんと一緒に最高の2日間にしましょう。\n何かわからないことがあれば気軽に連絡してください。\n当日、京都でお会いできることを楽しみにしています！', sign: '俊平 ＆ このみ', image: '' } }
        ]
      }
    ]
  };

  WEDI.seed = SEED;
})(window);
