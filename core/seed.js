/* ===========================================================================
 * WEDI.seed — 書き出しデータ
 * このファイルを core/seed.js に上書きして git push するとサイトに反映されます。
 * =========================================================================== */
(function (global) {
  'use strict';
  var WEDI = global.WEDI = global.WEDI || {};
  WEDI.seed = {
  "version": 6,
  "updatedAt": 1787842318000,
  "theme": {
    "colors": {
      "pink": "#ecd9d1",
      "pinkSoft": "#f5e9e4",
      "coral": "#ec775b",
      "sage": "#c6cec9",
      "sageSoft": "#dde2de",
      "ink": "#333333",
      "muted": "#9c9c9c",
      "paper": "#ffffff",
      "line": "#d9d9d9"
    },
    "fonts": {
      "pair": "favori"
    },
    "radius": "8px",
    "sectionPad": "64px"
  },
  "pages": [
    {
      "id": "pg_home",
      "name": "招待状",
      "slug": "home",
      "blocks": [
        {
          "id": "bk_cover",
          "type": "cover",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "tight",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "coverMode": "poster",
            "posterImage": "assets/cover-collage-v1.jpg",
            "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
            "letteringImage": "assets/cover-lettering.png",
            "lettering": "WEDDING\nINVITATION",
            "names": "TAKURO and KAZUMI",
            "date": "2026.11.29"
          }
        },
        {
          "id": "bk_cd",
          "type": "countdown",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "target": "2026-11-29T10:30:00+09:00",
            "dateLabel": "2026.11.29"
          }
        },
        {
          "id": "bk_msg",
          "type": "message",
          "style": {
            "bg": "paper",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": "#184c39"
          },
          "data": {
            "heading": "Message",
            "subheading": "ご挨拶",
            "body": "謹啓　晩夏の候\n皆様におかれましては一層ご清祥のことと\nお慶び申し上げます\nわたしたちはこのたび 11月29日(日)に\n披露宴を執り行うこととなりました\n日頃より温かく見守ってくださるたいせつな皆様と\n心温まる穏やかな時間を過ごしたいと思い\n親族のみの小宴を催すことといたしました\nご多用中恐縮ではございますが \nぜひご出席いただきたく存じます\n謹白",
            "sign": "",
            "image": "https://tk1129.pages.dev/img/kyoto-family-wedding-2026/1787659382890-bz7so0cq.jpg"
          }
        },
        {
          "id": "bk_prof",
          "type": "profile",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Profile",
            "subheading": "プロフィール",
            "people": [
              {
                "role": "新郎",
                "name": "栗栖 拓郎",
                "image": "https://tk1129.pages.dev/img/kyoto-family-wedding-2026/1787658440910-7e7yhp2i.jpg",
                "text": "1997年10月7日 広島生まれ\nお調子者でお酒を飲むことや音楽を聴くことラーメン お好み焼きを食べることが大好きです\n\n当日は日頃の感謝の気持ちをお伝えしつつ\n来てくれたみんなが楽しかった来てよかったと思ってもらえる一日にしたいです\nみんなで楽しく和やかに開催できたらと思いますので\n是非ともよろしくお願いいたします"
              },
              {
                "role": "新婦",
                "name": "高橋 和美",
                "image": "https://tk1129.pages.dev/img/kyoto-family-wedding-2026/1787659550573-rf7ztaxy.jpg",
                "text": "1997年5月15日 滋賀生まれ\nすきなモノ♥BUMP OF CHICKEN ダイアンのラジオ\n温冷交代浴 だし巻き卵 からあげ\n\nみなさま いつも温かく見守ってくださり\nありがとうございます\n当日は楽しく食べたり飲んだりしながら\n親族同士の親睦が深まる会を開催できたらと\n思っておりますので\nよろしくお願いいたします！"
              }
            ]
          }
        },
        {
          "id": "bk_alb",
          "type": "album",
          "style": {
            "bg": "paper",
            "align": "left",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "scallop",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Our Days",
            "subheading": "ふたりの思い出",
            "autoplay": "on",
            "interval": "4",
            "images": [
              {
                "src": "assets/photos/kiyomizu-enhanced.jpg",
                "alt": "清水寺で並ぶふたり"
              },
              {
                "src": "assets/photos/miyajima.jpg",
                "alt": "宮島を訪れたふたり"
              },
              {
                "src": "assets/photos/globe-night.jpg",
                "alt": "夜の旅先で撮ったふたりの写真"
              },
              {
                "src": "assets/photos/expo-selfie.jpg",
                "alt": "太陽の塔の前で撮ったふたりの写真"
              },
              {
                "src": "assets/photos/stained-glass.jpg",
                "alt": "色鮮やかな空間で撮ったふたりの写真"
              },
              {
                "src": "assets/photos/victory-day.jpg",
                "alt": "イベント会場で笑うふたり"
              },
              {
                "src": "assets/photos/happy-wedding.jpg",
                "alt": "HAPPY WEDDINGの飾りとふたり"
              },
              {
                "src": "assets/photos/london-platform.jpg",
                "alt": "ロンドンのホームでポーズを取るふたり"
              },
              {
                "src": "assets/photos/oasis-live.jpg",
                "alt": "ライブ会場で笑うふたり"
              },
              {
                "src": "assets/photos/london-street.jpg",
                "alt": "ロンドンの街で楽しむふたり"
              },
              {
                "src": "assets/photos/restaurant.jpg",
                "alt": "レストランで笑うふたり"
              },
              {
                "src": "assets/photos/cinema-day.jpg",
                "alt": "映画館で撮ったふたりの写真"
              }
            ]
          }
        },
        {
          "id": "bk_party",
          "type": "partyInfo",
          "style": {
            "bg": "sage",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Party Information",
            "subheading": "パーティーのご案内",
            "dateLabel": "Date",
            "dateText": "2026年11月29日 日曜日",
            "sessions": [
              {
                "name": "チャペルセレモニー",
                "start": "10:00",
                "sub1Label": "受付",
                "sub1": "9:30",
                "sub2Label": "終了予定",
                "sub2": "10:35",
                "note": "※当日は挙式の執り行いはございません\nチャペルでの写真撮影およびセレモニーを行う予定です\n"
              },
              {
                "name": "披露宴",
                "start": "10:45",
                "sub1Label": "お披楽喜",
                "sub1": "13:10",
                "sub2Label": "",
                "sub2": ""
              }
            ],
            "venueLabel": "会場情報",
            "venueName": "アトールテラス鴨川",
            "venueLines": "〒600-8017\n京都府京都市下京区木屋町通五条上る下材木町448\nTEL : 075-354-0855"
          }
        },
        {
          "id": "bk_memories",
          "type": "photo",
          "style": {
            "bg": "paper",
            "align": "center",
            "spacing": "tight",
            "width": "wide",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "layout": "gallery",
            "images": [
              {
                "src": "https://tk1129.pages.dev/img/kyoto-family-wedding-2026/1787840930541-egl3kxs7.jpg",
                "caption": "DAILY LIFE",
                "alt": "桜の木の前で撮ったふたりの写真"
              },
              {
                "src": "assets/photos/london-platform.jpg",
                "caption": "LONDON TRIP",
                "alt": "ロンドンのホームに立つふたり"
              },
              {
                "src": "https://tk1129.pages.dev/img/kyoto-family-wedding-2026/1787840943311-enlsw2q9.jpg",
                "caption": "OUR BEGINNING",
                "alt": "母校にて"
              }
            ]
          }
        },
        {
          "id": "bk_req",
          "type": "request",
          "style": {
            "bg": "pink",
            "align": "right",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "none",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Request",
            "subheading": "その他のご案内",
            "cardTitle": "参列のお願い",
            "cardBody": "誠に恐れ入りますが\nチャペルセレモニーにも\nご列席賜りたく\n当日は9時30分までに\nご光来のほど\nよろしくお願い申し上げます"
          }
        },
        {
          "id": "bk_rsvp",
          "type": "rsvp",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "RSVP",
            "subheading": "返信フォーム",
            "lead": "御出欠について",
            "deadline": "2026年10月16日 (金)",
            "deadlineNote": "回答後に万が一ご都合が合わなくなってしまった場合は\nご連絡ください",
            "askCeremony": true,
            "askReception": true,
            "askCompanions": true,
            "maxCompanions": 5,
            "busInfo": "京都駅からタクシーを手配いたします\nタクシーチケットをお渡ししますので\nご利用を希望される方は「利用する」にチェックをお願いいたします",
            "submitLabel": "確認画面へ",
            "endpoint": "https://script.google.com/macros/s/AKfycbwUcE-26H3WF9cKc_I3hEa5g78F3r3whallqCtazMnkcLFyGmELwo82nl9FBUVyXqVj/exec"
          }
        }
      ]
    },
    {
      "id": "pg_guide",
      "name": "旅のしおり",
      "slug": "guide",
      "blocks": [
        {
          "id": "bk_g_msg",
          "type": "message",
          "style": {
            "bg": "paper",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "daisy",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": "#f6f1ee"
          },
          "data": {
            "heading": "KYOTO\nTRAVEL GUIDE",
            "subheading": "栗栖家のみなさまへ｜旅のしおり",
            "body": "結婚式と一緒に\n京都の旅も楽しんでもらえたらうれしいです\n\n11月の京都は朝晩がぐっと冷えます\n軽い羽織りやカーディガンがあると安心です\n\n日程やふたりのおすすめスポットをまとめました\n\nスポットをタップすると説明と地図が開きます\n「＋」で追加すると自分だけの\nプランが作れるのでよかったら試してみて下さい\n\nみんなに会えるのを楽しみにしてます",
            "sign": "拓郎 ＆ 和美"
          }
        },
        {
          "id": "bk_g_day1",
          "type": "schedule",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "DAY 1",
            "subheading": "11月28日（土）｜広島から京都へ（貸切バス）",
            "items": [
              {
                "time": "6:00頃",
                "title": "バス出発（広島 矢野町）",
                "text": "広島市安芸区矢野町付近で水野家が乗車して出発\n集合場所は個別に連絡します"
              },
              {
                "time": "7:00頃",
                "title": "大町駅で合流 出発",
                "text": "アストラムライン大町駅付近にて\nそのほかの親族が乗車して京都へ"
              },
              {
                "time": "途中",
                "title": "サービスエリアで休憩",
                "text": "休憩を取りながら向かいます\nバスの中やSAで適宜お昼を食べてきてください"
              },
              {
                "time": "13:00頃",
                "title": "京都着（ホテル前で降車）",
                "text": "Rakuten STAY URBAN 四条河原町付近に到着\n荷物を降ろしてバスは運行終了です"
              },
              {
                "time": "13:30〜",
                "title": "荷物を下ろして自由時間",
                "text": "ホテルに荷物を置かせてもらって自由時間です\nそれぞれで楽しんでください！\n\n※チェックインは15:00からできます"
              },
              {
                "time": "19:00頃",
                "title": "前夜祭ディナー（鉄板 フタゴヤ 富小路）",
                "text": "みんなで集まって乾杯しましょう 🍻\n※詳細は別途ご連絡します"
              },
              {
                "time": "21:00頃",
                "title": "自由時間",
                "text": "それぞれでバーに行ったり銭湯に行ったり好きに楽しんでください！\n疲れた方はホテルへ！\n\n※飲み過ぎ注意"
              }
            ]
          }
        },
        {
          "id": "bk_g_day2",
          "type": "schedule",
          "style": {
            "bg": "sage",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "DAY 2",
            "subheading": "11月29日（日）｜結婚式当日 京都から広島へ",
            "items": [
              {
                "time": "朝",
                "title": "自由時間",
                "text": "ホテルに朝食がついてないので近くで食べるかコンビニで買って食べてください🙇🙇‍♀️\n\n※ホテル周辺の朝ごはんスポットは下にまとめてます"
              },
              {
                "time": "10:00",
                "title": "結婚式（アトールテラス鴨川）",
                "text": "受付 9:30〜／チャペルセレモニー 10:00〜\n\n京都府京都市下京区木屋町通五条上る下材木町448"
              },
              {
                "time": "13:30頃",
                "title": "披露宴お披楽喜",
                "text": "楽しい時間をありがとうございました！"
              },
              {
                "time": "14:20頃",
                "title": "バス乗車（京都出発）",
                "text": "式場付近で親族全員と荷物を乗せて出発\n集合は拓郎 和美がご案内します"
              },
              {
                "time": "20:00頃",
                "title": "大町駅に到着",
                "text": "アストラムライン大町駅付近で\n大部分の親族が降車"
              },
              {
                "time": "20:45頃",
                "title": "矢野町に到着",
                "text": "広島市安芸区矢野町付近で残りの家族が降車\nお疲れ様でした！"
              }
            ]
          }
        },
        {
          "id": "bk_g_spots",
          "type": "spotMap",
          "style": {
            "bg": "paper",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Kyoto Spots",
            "subheading": "京都おすすめスポット",
            "overviewMap": "https://www.google.com/maps/d/embed?mid=1omOZ7iCdKE00wosvxH9SsD6HgsdsV1g&ehbc=2E312F",
            "mapNote": "検索ボックスとジャンルボタンで絞り込みできますピンをタップするとお店の説明が出てそのまま「＋」でマイプランに追加できます",
            "spots": [
              {
                "genre": "ホテル",
                "name": "Rakuten STAY URBAN 四条河原町",
                "address": "〒600-8023 京都府京都市下京区河原町通松原上る二丁目富永町354-2",
                "description": "宿泊先のホテルです28日はここで降車 チェックイン（15:00〜）",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=Rakuten%20STAY%20URBAN%20%E5%9B%9B%E6%9D%A1%E6%B2%B3%E5%8E%9F%E7%94%BA%20%E3%80%92600-8023%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E6%9D%BE%E5%8E%9F%E4%B8%8A%E3%82%8B%E4%BA%8C%E4%B8%81%E7%9B%AE%E5%AF%8C%E6%B0%B8%E7%94%BA354-2&output=embed",
                "lat": "35.00104",
                "lng": "135.76846"
              },
              {
                "genre": "式場",
                "name": "アトールテラス鴨川",
                "address": "京都府京都市下京区木屋町通五条上る下材木町448",
                "description": "結婚式 披露宴の会場10:00集合です鴨川沿いのテラス会場",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%A2%E3%83%88%E3%83%BC%E3%83%AB%E3%83%86%E3%83%A9%E3%82%B9%E9%B4%A8%E5%B7%9D%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E4%BA%94%E6%9D%A1%E4%B8%8A%E3%82%8B%E4%B8%8B%E6%9D%90%E6%9C%A8%E7%94%BA448&output=embed",
                "lat": "34.99716",
                "lng": "135.76783"
              },
              {
                "genre": "28日夜宴会会場",
                "name": "鉄板 フタゴヤ 富小路",
                "address": "〒604-8054 京都府京都市中京区富小路通錦小路下る西大文字町615番地 メディナ四条富小路 1F",
                "description": "28日夜の宴会（前夜祭ディナー）の会場ですみんなで乾杯しましょう！詳細は別途ご連絡します",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E9%89%84%E6%9D%BF%E3%83%95%E3%82%BF%E3%82%B4%E3%83%A4%E5%AF%8C%E5%B0%8F%E8%B7%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%AF%8C%E5%B0%8F%E8%B7%AF%E9%80%9A%E9%8C%A6%E5%B0%8F%E8%B7%AF%E4%B8%8B%E3%82%8B%E8%A5%BF%E5%A4%A7%E6%96%87%E5%AD%97%E7%94%BA615&output=embed",
                "lat": "35.0043183",
                "lng": "135.7649925"
              },
              {
                "genre": "紅葉スポット",
                "name": "東福寺",
                "address": "京都府京都市東山区本町15丁目778",
                "description": "京都屈指の紅葉名所初めての京都紅葉なら外せない",
                "image": "",
                "link": "https://maps.google.com/?q=東福寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%9D%B1%E7%A6%8F%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%9C%AC%E7%94%BA15%E4%B8%81%E7%9B%AE778&output=embed",
                "lat": "34.97602",
                "lng": "135.77376"
              },
              {
                "genre": "紅葉スポット",
                "name": "永観堂",
                "address": "京都府京都市左京区永観堂町48",
                "description": "「もみじの永観堂」と呼ばれる名所夜間ライトアップも人気",
                "image": "",
                "link": "https://maps.google.com/?q=永観堂+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%B0%B8%E8%A6%B3%E5%A0%82%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E6%B0%B8%E8%A6%B3%E5%A0%82%E7%94%BA48&output=embed",
                "lat": "35.01485",
                "lng": "135.79416"
              },
              {
                "genre": "紅葉スポット",
                "name": "瑠璃光院",
                "address": "京都府京都市左京区上高野東山55",
                "description": "【要予約】リフレクション写真で有名SNS映えする",
                "image": "",
                "link": "https://maps.google.com/?q=瑠璃光院+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%91%A0%E7%92%83%E5%85%89%E9%99%A2%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8A%E9%AB%98%E9%87%8E%E6%9D%B1%E5%B1%B155&output=embed",
                "lat": "35.06358",
                "lng": "135.80854"
              },
              {
                "genre": "紅葉スポット",
                "name": "圓光寺",
                "address": "京都府京都市左京区一乗寺小谷町13",
                "description": "【要予約】比較的落ち着いて見られる混雑が少なめ",
                "image": "",
                "link": "https://maps.google.com/?q=圓光寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%9C%93%E5%85%89%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%80%E4%B9%97%E5%AF%BA%E5%B0%8F%E8%B0%B7%E7%94%BA13&output=embed",
                "lat": "35.04509",
                "lng": "135.79707"
              },
              {
                "genre": "紅葉スポット",
                "name": "嵐山",
                "address": "京都府京都市右京区嵯峨",
                "description": "渡月橋と紅葉の景観が美しい家族旅行との相性が良い",
                "image": "",
                "link": "https://maps.google.com/?q=嵐山+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%B5%90%E5%B1%B1%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E5%B5%AF%E5%B3%A8&output=embed",
                "lat": "35.01288",
                "lng": "135.67777"
              },
              {
                "genre": "昼食",
                "name": "錦市場",
                "address": "京都府京都市中京区",
                "description": "京都グルメを食べ歩きできる京都らしい食文化を体験できる",
                "image": "",
                "link": "https://maps.google.com/?q=錦市場+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%8C%A6%E5%B8%82%E5%A0%B4%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA&output=embed",
                "lat": "35.00503",
                "lng": "135.76472"
              },
              {
                "genre": "ラーメン そば",
                "name": "SUBA",
                "address": "京都府京都市下京区美濃屋町182番地 10東",
                "description": "人気立ち食いそばホテルから近くの若者に大人気のそば屋",
                "image": "",
                "link": "https://maps.app.goo.gl/BBko9HkozGSUardWA",
                "mapEmbed": "https://www.google.com/maps?q=SUBA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E7%BE%8E%E6%BF%83%E5%B1%8B%E7%94%BA182%E7%95%AA%E5%9C%B0%2010%E6%9D%B1&output=embed",
                "lat": "34.99897",
                "lng": "135.76848"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "フランソア喫茶室",
                "address": "京都府京都市下京区西木屋町通四条下ル船頭町１８４",
                "description": "登録有形文化財のレトロ喫茶食後の休憩に最適",
                "image": "",
                "link": "https://maps.app.goo.gl/zMBjTXw8KzLKQQ9s9",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%95%E3%83%A9%E3%83%B3%E3%82%BD%E3%82%A2%E5%96%AB%E8%8C%B6%E5%AE%A4%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E8%A5%BF%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%83%AB%E8%88%B9%E9%A0%AD%E7%94%BA%EF%BC%91%EF%BC%98%EF%BC%94&output=embed",
                "lat": "35.00329",
                "lng": "135.77021"
              },
              {
                "genre": "立ち飲み",
                "name": "井倉木材",
                "address": "京都府京都市上京区薮之内町７７−１ 井倉木材",
                "description": "カツオのタタキが名物の立ち飲み屋大人気なディープな立ち飲み屋",
                "image": "",
                "link": "https://maps.app.goo.gl/3zQtnxV5UkjACj9Y8?g_st=il",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%95%E5%80%89%E6%9C%A8%E6%9D%90%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E8%96%AE%E4%B9%8B%E5%86%85%E7%94%BA%EF%BC%97%EF%BC%97%E2%88%92%EF%BC%91%20%E4%BA%95%E5%80%89%E6%9C%A8%E6%9D%90&output=embed",
                "lat": "35.02269",
                "lng": "135.75522"
              },
              {
                "genre": "居酒屋 バー",
                "name": "だるまときんぎょ",
                "address": "京都府京都市下京区京極町５０９",
                "description": "おでん酒場おでんと出汁料理",
                "image": "",
                "link": "https://maps.app.goo.gl/8Y38NshjGmngJNRJ9",
                "mapEmbed": "https://www.google.com/maps?q=%E3%81%A0%E3%82%8B%E3%81%BE%E3%81%A8%E3%81%8D%E3%82%93%E3%81%8E%E3%82%87%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E4%BA%AC%E6%A5%B5%E7%94%BA%EF%BC%95%EF%BC%90%EF%BC%99&output=embed",
                "lat": "34.99970",
                "lng": "135.76698"
              },
              {
                "genre": "観光地",
                "name": "清水寺",
                "address": "京都府京都市東山区清水1丁目294",
                "description": "京都を代表する寺院初京都なら必須",
                "image": "",
                "link": "https://maps.google.com/?q=清水寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%B8%85%E6%B0%B4%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%B8%85%E6%B0%B41%E4%B8%81%E7%9B%AE294&output=embed",
                "lat": "34.99467",
                "lng": "135.78466"
              },
              {
                "genre": "観光地",
                "name": "伏見稲荷大社",
                "address": "京都府京都市伏見区深草藪之内町68",
                "description": "千本鳥居が有名京都らしさを感じられる",
                "image": "",
                "link": "https://maps.google.com/?q=伏見稲荷大社",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BC%8F%E8%A6%8B%E7%A8%B2%E8%8D%B7%E5%A4%A7%E7%A4%BE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%BC%8F%E8%A6%8B%E5%8C%BA%E6%B7%B1%E8%8D%89%E8%97%AA%E4%B9%8B%E5%86%85%E7%94%BA68&output=embed",
                "lat": "34.96769",
                "lng": "135.77919"
              },
              {
                "genre": "観光地",
                "name": "金閣寺",
                "address": "京都府京都市北区金閣寺町1",
                "description": "世界的に有名な寺院写真映えする",
                "image": "",
                "link": "https://maps.google.com/?q=金閣寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%87%91%E9%96%A3%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8C%97%E5%8C%BA%E9%87%91%E9%96%A3%E5%AF%BA%E7%94%BA1&output=embed",
                "lat": "35.03937",
                "lng": "135.72924"
              },
              {
                "genre": "観光地",
                "name": "八坂神社",
                "address": "京都府京都市東山区祇園町北側625",
                "description": "祇園観光の中心周辺散策も楽しい",
                "image": "",
                "link": "https://maps.google.com/?q=八坂神社+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%AB%E5%9D%82%E7%A5%9E%E7%A4%BE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E7%A5%87%E5%9C%92%E7%94%BA%E5%8C%97%E5%81%B4625&output=embed",
                "lat": "35.00366",
                "lng": "135.77855"
              },
              {
                "genre": "観光地",
                "name": "二年坂 三年坂",
                "address": "京都府京都市東山区",
                "description": "京都らしい街並み家族で散歩しやすい",
                "image": "",
                "link": "https://maps.google.com/?q=二年坂+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%8C%E5%B9%B4%E5%9D%82%E3%83%BB%E4%B8%89%E5%B9%B4%E5%9D%82%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA&output=embed",
                "lat": "34.99840",
                "lng": "135.78084"
              },
              {
                "genre": "観光地",
                "name": "京都御所",
                "address": "京都府京都市上京区京都御苑内",
                "description": "紫宸殿や御池庭など歴代天皇の住まいだった建物と庭園を見学できる",
                "image": "",
                "link": "https://maps.google.com/?q=京都御所+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E5%BE%A1%E6%89%80%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E4%BA%AC%E9%83%BD%E5%BE%A1%E8%8B%91%E5%86%85&output=embed",
                "note": "やっちゃんが行きたいと言っている場所今回の旅行では優先して候補に入れたい",
                "lat": "35.02540",
                "lng": "135.76210"
              },
              {
                "genre": "観光地",
                "name": "南禅寺",
                "address": "京都府京都市左京区南禅寺福地町",
                "description": "大きな三門 方丈庭園 レンガ造りの水路閣を一度に楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=南禅寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%8D%97%E7%A6%85%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%8D%97%E7%A6%85%E5%AF%BA%E7%A6%8F%E5%9C%B0%E7%94%BA&output=embed",
                "note": "ばあちゃんおすすめの場所家族の思い出にもなるので優先して行きたい",
                "lat": "35.01130",
                "lng": "135.79466"
              },
              {
                "genre": "観光地",
                "name": "銀閣寺",
                "address": "京都府京都市左京区銀閣寺町2",
                "description": "銀閣と美しい庭園展望所からの景色を楽しめる京都東山の名所",
                "image": "",
                "link": "https://maps.google.com/?q=銀閣寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%8A%80%E9%96%A3%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E9%8A%80%E9%96%A3%E5%AF%BA%E7%94%BA2&output=embed",
                "note": "金閣寺とあわせて押さえたい王道哲学の道の散歩とセットにしやすい",
                "lat": "35.02704",
                "lng": "135.79820"
              },
              {
                "genre": "観光地",
                "name": "建仁寺",
                "address": "京都府京都市東山区大和大路通四条下る小松町584",
                "description": "風神雷神図屏風や双龍図で知られる京都最古の禅寺",
                "image": "",
                "link": "https://maps.google.com/?q=建仁寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%BB%BA%E4%BB%81%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%A4%A7%E5%92%8C%E5%A4%A7%E8%B7%AF%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%82%8B%E5%B0%8F%E6%9D%BE%E7%94%BA584&output=embed",
                "note": "ホテルから近く祇園や花見小路を散歩する途中に立ち寄りやすい",
                "lat": "35.00029",
                "lng": "135.77434"
              },
              {
                "genre": "観光地",
                "name": "三十三間堂",
                "address": "京都府京都市東山区三十三間堂廻町657",
                "description": "本堂に並ぶ1001体の千手観音像が圧巻",
                "image": "",
                "link": "https://maps.google.com/?q=三十三間堂+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%B8%89%E5%8D%81%E4%B8%89%E9%96%93%E5%A0%82%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E4%B8%89%E5%8D%81%E4%B8%89%E9%96%93%E5%A0%82%E5%BB%BB%E7%94%BA657&output=embed",
                "note": "京都でしか見られない迫力があり天候が悪い日の観光候補にも使いやすい",
                "lat": "34.98780",
                "lng": "135.77166"
              },
              {
                "genre": "観光地",
                "name": "東寺",
                "address": "京都府京都市南区九条町1",
                "description": "京都のシンボルでもある五重塔と立体曼荼羅を見られる世界遺産",
                "image": "",
                "link": "https://maps.google.com/?q=東寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%9D%B1%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8D%97%E5%8C%BA%E4%B9%9D%E6%9D%A1%E7%94%BA1&output=embed",
                "note": "京都駅から比較的近く到着日や帰宅日の予定に組み込みやすい",
                "lat": "34.98083",
                "lng": "135.74750"
              },
              {
                "genre": "観光地",
                "name": "下鴨神社",
                "address": "京都府京都市左京区下鴨泉川町59",
                "description": "世界遺産の社殿と原生林が残る糺の森を散策できる",
                "image": "",
                "link": "https://maps.google.com/?q=下鴨神社+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%B8%8B%E9%B4%A8%E7%A5%9E%E7%A4%BE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8B%E9%B4%A8%E6%B3%89%E5%B7%9D%E7%94%BA59&output=embed",
                "note": "鴨川デルタや鴨川湯とセットにするとこのエリアをまとめて楽しめる",
                "lat": "35.03880",
                "lng": "135.77268"
              },
              {
                "genre": "観光地",
                "name": "天龍寺",
                "address": "京都府京都市右京区嵯峨天龍寺芒ノ馬場町68",
                "description": "嵐山を代表する世界遺産で曹源池庭園の景観が美しい",
                "image": "",
                "link": "https://maps.google.com/?q=天龍寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%A4%A9%E9%BE%8D%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E5%B5%AF%E5%B3%A8%E5%A4%A9%E9%BE%8D%E5%AF%BA%E8%8A%92%E3%83%8E%E9%A6%AC%E5%A0%B4%E7%94%BA68&output=embed",
                "note": "嵐山 渡月橋 福田美術館と一緒に回るコースの中心にできる",
                "lat": "35.01590",
                "lng": "135.67390"
              },
              {
                "genre": "観光地",
                "name": "仁和寺",
                "address": "京都府京都市右京区御室大内33",
                "description": "旧御室御所の建築や庭園遅咲きの御室桜で知られる世界遺産",
                "image": "",
                "link": "https://maps.google.com/?q=仁和寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BB%81%E5%92%8C%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E5%BE%A1%E5%AE%A4%E5%A4%A7%E5%86%8533&output=embed",
                "note": "金閣寺方面を一日かけて回る場合に追加したい落ち着いた王道スポット",
                "lat": "35.03110",
                "lng": "135.71390"
              },
              {
                "genre": "観光地",
                "name": "平安神宮",
                "address": "京都府京都市左京区岡崎西天王町97",
                "description": "朱塗りの応天門と大極殿広大な神苑が印象的",
                "image": "",
                "link": "https://maps.google.com/?q=平安神宮+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%B9%B3%E5%AE%89%E7%A5%9E%E5%AE%AE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%B2%A1%E5%B4%8E%E8%A5%BF%E5%A4%A9%E7%8E%8B%E7%94%BA97&output=embed",
                "note": "京都市京セラ美術館や京都国立近代美術館と一緒に回りやすい",
                "lat": "35.01600",
                "lng": "135.78230"
              },
              {
                "genre": "美術館",
                "name": "京都国立近代美術館",
                "address": "京都府京都市左京区岡崎円勝寺町26-1",
                "description": "京都を代表する美術館岡崎エリア観光とセットにしやすい",
                "image": "",
                "link": "https://maps.google.com/?q=京都国立近代美術館",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E5%9B%BD%E7%AB%8B%E8%BF%91%E4%BB%A3%E7%BE%8E%E8%A1%93%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%B2%A1%E5%B4%8E%E5%86%86%E5%8B%9D%E5%AF%BA%E7%94%BA26-1&output=embed",
                "lat": "35.01241",
                "lng": "135.78216"
              },
              {
                "genre": "美術館",
                "name": "京都市京セラ美術館",
                "address": "京都府京都市左京区岡崎円勝寺町124",
                "description": "建築自体も美しい京都で今一番人気の美術館",
                "image": "",
                "link": "https://maps.google.com/?q=京都市京セラ美術館",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E5%B8%82%E4%BA%AC%E3%82%BB%E3%83%A9%E7%BE%8E%E8%A1%93%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%B2%A1%E5%B4%8E%E5%86%86%E5%8B%9D%E5%AF%BA%E7%94%BA124&output=embed",
                "lat": "35.01286",
                "lng": "135.78355"
              },
              {
                "genre": "美術館",
                "name": "細見美術館",
                "address": "京都府京都市左京区岡崎最勝寺町6-3",
                "description": "日本美術コレクションが充実和の雰囲気を感じられる",
                "image": "",
                "link": "https://maps.google.com/?q=細見美術館",
                "mapEmbed": "https://www.google.com/maps?q=%E7%B4%B0%E8%A6%8B%E7%BE%8E%E8%A1%93%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%B2%A1%E5%B4%8E%E6%9C%80%E5%8B%9D%E5%AF%BA%E7%94%BA6-3&output=embed",
                "lat": "35.01386",
                "lng": "135.77967"
              },
              {
                "genre": "美術館",
                "name": "福田美術館",
                "address": "京都府京都市右京区嵯峨天龍寺芒ノ馬場町3-16",
                "description": "嵐山の絶景と日本画を楽しめる嵐山観光との相性抜群",
                "image": "",
                "link": "https://maps.google.com/?q=福田美術館+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%A6%8F%E7%94%B0%E7%BE%8E%E8%A1%93%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E5%B5%AF%E5%B3%A8%E5%A4%A9%E9%BE%8D%E5%AF%BA%E8%8A%92%E3%83%8E%E9%A6%AC%E5%A0%B4%E7%94%BA3-16&output=embed",
                "lat": "35.01380",
                "lng": "135.67636"
              },
              {
                "genre": "美術館",
                "name": "アサヒグループ大山崎山荘美術館",
                "address": "京都府乙訓郡大山崎町銭原5-3",
                "description": "洋館と庭園が美しい紅葉シーズンは特に綺麗",
                "image": "",
                "link": "https://maps.google.com/?q=アサヒグループ大山崎山荘美術館",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%A2%E3%82%B5%E3%83%92%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E5%A4%A7%E5%B1%B1%E5%B4%8E%E5%B1%B1%E8%8D%98%E7%BE%8E%E8%A1%93%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%B9%99%E8%A8%93%E9%83%A1%E5%A4%A7%E5%B1%B1%E5%B4%8E%E7%94%BA%E9%8A%AD%E5%8E%9F5-3&output=embed",
                "lat": "34.89556",
                "lng": "135.67967"
              },
              {
                "genre": "穴場",
                "name": "旧三井家下鴨別邸",
                "address": "京都市左京区下鴨宮河町58-2",
                "description": "明治時代の邸宅と庭園京都らしいのに意外と空いている",
                "image": "",
                "link": "https://maps.google.com/?q=旧三井家下鴨別邸",
                "mapEmbed": "https://www.google.com/maps?q=%E6%97%A7%E4%B8%89%E4%BA%95%E5%AE%B6%E4%B8%8B%E9%B4%A8%E5%88%A5%E9%82%B8%20%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8B%E9%B4%A8%E5%AE%AE%E6%B2%B3%E7%94%BA58-2&output=embed",
                "lat": "35.03178",
                "lng": "135.77191"
              },
              {
                "genre": "穴場",
                "name": "鴨川デルタ",
                "address": "京都市左京区田中下柳町周辺",
                "description": "京都の日常を感じる地元感があって散歩に最高",
                "image": "",
                "link": "https://maps.google.com/?q=鴨川デルタ",
                "mapEmbed": "https://www.google.com/maps?q=%E9%B4%A8%E5%B7%9D%E3%83%87%E3%83%AB%E3%82%BF%20%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E7%94%B0%E4%B8%AD%E4%B8%8B%E6%9F%B3%E7%94%BA%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.02986",
                "lng": "135.77176"
              },
              {
                "genre": "穴場",
                "name": "日向大神宮",
                "address": "京都市山科区日ノ岡一切経谷町29",
                "description": "京都のお伊勢さん人が少なく雰囲気が神秘的",
                "image": "",
                "link": "https://maps.google.com/?q=日向大神宮",
                "mapEmbed": "https://www.google.com/maps?q=%E6%97%A5%E5%90%91%E5%A4%A7%E7%A5%9E%E5%AE%AE%20%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B1%B1%E7%A7%91%E5%8C%BA%E6%97%A5%E3%83%8E%E5%B2%A1%E4%B8%80%E5%88%87%E7%B5%8C%E8%B0%B7%E7%94%BA29&output=embed",
                "lat": "35.00675",
                "lng": "135.79536"
              },
              {
                "genre": "穴場",
                "name": "金福寺",
                "address": "京都市左京区一乗寺才形町20",
                "description": "芭蕉ゆかりの寺静かで落ち着く",
                "image": "",
                "link": "https://maps.google.com/?q=金福寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%87%91%E7%A6%8F%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%80%E4%B9%97%E5%AF%BA%E6%89%8D%E5%BD%A2%E7%94%BA20&output=embed",
                "lat": "35.04215",
                "lng": "135.79521"
              },
              {
                "genre": "穴場",
                "name": "古知谷阿弥陀寺",
                "address": "京都市左京区大原古知平町83",
                "description": "山奥の隠れ寺京都通向けの超穴場",
                "image": "",
                "link": "https://maps.google.com/?q=古知谷阿弥陀寺",
                "mapEmbed": "https://www.google.com/maps?q=%E5%8F%A4%E7%9F%A5%E8%B0%B7%E9%98%BF%E5%BC%A5%E9%99%80%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%A4%A7%E5%8E%9F%E5%8F%A4%E7%9F%A5%E5%B9%B3%E7%94%BA83&output=embed",
                "lat": "35.13820",
                "lng": "135.82807"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "ANEMOS",
                "address": "京都府京都市北区上賀茂薮田町57-1 2F",
                "description": "古い洋館の空気を残すクラシックな喫茶内装まで含めて静かに写真と時間を楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=ANEMOS+京都",
                "mapEmbed": "https://www.google.com/maps?q=ANEMOS%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8C%97%E5%8C%BA%E4%B8%8A%E8%B3%80%E8%8C%82%E8%96%AE%E7%94%B0%E7%94%BA57-1%202F&output=embed",
                "lat": "35.05255",
                "lng": "135.75966"
              },
              {
                "genre": "居酒屋 バー",
                "name": "charlie",
                "address": "京都府京都市中京区玉蔵町136",
                "description": "町家を生かした家庭的かつ洒落た居酒屋料理 器 空間のバランスが雑誌的",
                "image": "",
                "link": "https://maps.google.com/?q=charlie+京都",
                "mapEmbed": "https://www.google.com/maps?q=charlie%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E7%8E%89%E8%94%B5%E7%94%BA136&output=embed",
                "lat": "35.00728",
                "lng": "135.75786"
              },
              {
                "genre": "夜ごはん",
                "name": "il filo",
                "address": "京都府京都市中京区上大阪町519",
                "description": "【要予約】カウンター中心のイタリア料理を割烹の距離感で楽しむ旅の食事を一回だけ贅沢にする枠",
                "image": "",
                "link": "https://maps.google.com/?q=il+filo+京都",
                "mapEmbed": "https://www.google.com/maps?q=il%20filo%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%8A%E5%A4%A7%E9%98%AA%E7%94%BA519&output=embed",
                "lat": "35.01022",
                "lng": "135.77066"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "Kaikado Café",
                "address": "京都府京都市下京区河原町通七条上ル住吉町352",
                "description": "老舗茶筒 開化堂の工芸とコーヒーをつなぐカフェ京都のものづくりを現代的に体験できる",
                "image": "",
                "link": "https://maps.google.com/?q=Kaikado+Café+京都",
                "mapEmbed": "https://www.google.com/maps?q=Kaikado%20Caf%C3%A9%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E4%B8%83%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%BD%8F%E5%90%89%E7%94%BA352&output=embed",
                "lat": "34.98990",
                "lng": "135.76440"
              },
              {
                "genre": "居酒屋 バー",
                "name": "manoir28",
                "address": "京都府京都市中京区八百屋町98-3",
                "description": "京町家で約300本のワインから選ぶ特別感のあるバー静かな大人の夜に振り切れる",
                "image": "",
                "link": "https://maps.google.com/?q=manoir28+京都",
                "mapEmbed": "https://www.google.com/maps?q=manoir28%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%AB%E7%99%BE%E5%B1%8B%E7%94%BA98-3&output=embed",
                "lat": "35.00720",
                "lng": "135.76578"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "Méton",
                "address": "京都府京都市左京区大菊町102 2F",
                "description": "フランス菓子とワインを午後から楽しめる甘いものと酒の両方が好きな人に刺さる",
                "image": "",
                "link": "https://maps.google.com/?q=Méton+京都",
                "mapEmbed": "https://www.google.com/maps?q=M%C3%A9ton%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%A4%A7%E8%8F%8A%E7%94%BA102%202F&output=embed",
                "lat": "35.01185",
                "lng": "135.77357"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "New Bird 烏丸",
                "address": "京都府京都市中京区高倉通四条上ル中魚屋町511",
                "description": "大ぶりで層の美しいクロワッサンが主役買ってすぐ見栄えと満足感がある",
                "image": "",
                "link": "https://maps.google.com/?q=New+Bird+烏丸+京都",
                "mapEmbed": "https://www.google.com/maps?q=New%20Bird%20%E7%83%8F%E4%B8%B8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E9%AB%98%E5%80%89%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%AD%E9%AD%9A%E5%B1%8B%E7%94%BA511&output=embed",
                "lat": "35.00483",
                "lng": "135.76266"
              },
              {
                "genre": "夜ごはん",
                "name": "TONA",
                "address": "京都府京都市下京区桝屋町477",
                "description": "町家でナチュラルワインとフレンチの小皿満席でも立ち飲みスペースを狙える",
                "image": "",
                "link": "https://maps.google.com/?q=TONA+京都",
                "mapEmbed": "https://www.google.com/maps?q=TONA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%A1%9D%E5%B1%8B%E7%94%BA477&output=embed",
                "lat": "34.99942",
                "lng": "135.76617"
              },
              {
                "genre": "居酒屋 バー",
                "name": "Utr.",
                "address": "京都府京都市中京区壬生坊城町55 坊城ビル2F",
                "description": "クラフトビールと創作小皿を二階の隠れ家で西側エリアの夜候補を増やせる",
                "image": "",
                "link": "https://maps.google.com/?q=Utr.+京都",
                "mapEmbed": "https://www.google.com/maps?q=Utr.%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A3%AC%E7%94%9F%E5%9D%8A%E5%9F%8E%E7%94%BA55%20%E5%9D%8A%E5%9F%8E%E3%83%93%E3%83%AB2F&output=embed",
                "lat": "35.00494",
                "lng": "135.74723"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "Walden Woods Kyoto",
                "address": "京都府京都市下京区栄町508-1",
                "description": "白い階段状空間と焙煎機が印象的建築的な内装で写真を撮りたい人に強い",
                "image": "",
                "link": "https://maps.google.com/?q=Walden+Woods+Kyoto",
                "mapEmbed": "https://www.google.com/maps?q=Walden%20Woods%20Kyoto%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%A0%84%E7%94%BA508-1&output=embed",
                "lat": "34.99335",
                "lng": "135.76316"
              },
              {
                "genre": "夜ごはん",
                "name": "watoto",
                "address": "京都府京都市左京区下鴨森本町9",
                "description": "発酵やハーブを生かした食事と世界の酒昼カフェから夜飲みまで一軒で表情が変わる",
                "image": "",
                "link": "https://maps.google.com/?q=watoto+京都",
                "mapEmbed": "https://www.google.com/maps?q=watoto%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8B%E9%B4%A8%E6%A3%AE%E6%9C%AC%E7%94%BA9&output=embed",
                "lat": "35.03614",
                "lng": "135.77124"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "WEEKENDERS COFFEE 富小路",
                "address": "京都府京都市中京区骨屋之町560 離れ",
                "description": "駐車場の奥に隠れた日本家屋のコーヒースタンド見つける体験まで含めて京都らしい",
                "image": "",
                "link": "https://maps.google.com/?q=WEEKENDERS+COFFEE+富小路",
                "mapEmbed": "https://www.google.com/maps?q=WEEKENDERS%20COFFEE%20%E5%AF%8C%E5%B0%8F%E8%B7%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E9%AA%A8%E5%B1%8B%E4%B9%8B%E7%94%BA560%20%E9%9B%A2%E3%82%8C&output=embed",
                "lat": "34.99895",
                "lng": "135.76608"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "WIFE&HUSBAND",
                "address": "京都府京都市北区小山下内河原町106-6",
                "description": "アンティークの道具を借りて鴨川ピクニックができる京都の日常風景を写真と体験にできる",
                "image": "",
                "link": "https://maps.google.com/?q=WIFE%26HUSBAND+京都",
                "mapEmbed": "https://www.google.com/maps?q=WIFE%26HUSBAND%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8C%97%E5%8C%BA%E5%B0%8F%E5%B1%B1%E4%B8%8B%E5%86%85%E6%B2%B3%E5%8E%9F%E7%94%BA106-6&output=embed",
                "lat": "35.04340",
                "lng": "135.76173"
              },
              {
                "genre": "夜ごはん",
                "name": "ぎょうざ歩兵 祇園本店",
                "address": "京都府京都市東山区清本町373-3",
                "description": "舞妓にも親しまれる一口サイズの餃子小ぶりで食べ比べしやすい",
                "image": "",
                "link": "https://maps.google.com/?q=ぎょうざ歩兵+祇園本店",
                "mapEmbed": "https://www.google.com/maps?q=%E3%81%8E%E3%82%87%E3%81%86%E3%81%96%E6%AD%A9%E5%85%B5%20%E7%A5%87%E5%9C%92%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%B8%85%E6%9C%AC%E7%94%BA373-3&output=embed",
                "lat": "35.00520",
                "lng": "135.77452"
              },
              {
                "genre": "昼食",
                "name": "ごはんや村上",
                "address": "京都府京都市東山区小松町561-17",
                "description": "落ち着いた空間でおばんざいを昼夜楽しめる祇園で観光客向けに寄りすぎない食事処",
                "image": "",
                "link": "https://maps.google.com/?q=ごはんや村上+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%81%94%E3%81%AF%E3%82%93%E3%82%84%E6%9D%91%E4%B8%8A%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%B0%8F%E6%9D%BE%E7%94%BA561-17&output=embed",
                "lat": "35.00079",
                "lng": "135.77651"
              },
              {
                "genre": "居酒屋 バー",
                "name": "たつみ",
                "address": "京都府京都市中京区中之町572 しのぶ会館1F",
                "description": "1968年創業昼から飲める京都の大衆酒場気取りすぎない老舗の空気を味わえる",
                "image": "",
                "link": "https://maps.google.com/?q=たつみ+京都+しのぶ会館",
                "mapEmbed": "https://www.google.com/maps?q=%E3%81%9F%E3%81%A4%E3%81%BF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%AD%E4%B9%8B%E7%94%BA572%20%E3%81%97%E3%81%AE%E3%81%B6%E4%BC%9A%E9%A4%A81F&output=embed",
                "lat": "35.00434",
                "lng": "135.76858"
              },
              {
                "genre": "昼食",
                "name": "グリルキャピタル東洋亭 ポルタ店",
                "address": "京都府京都市下京区北小路町902 京都駅前地下街ポルタ",
                "description": "丸ごとトマトとハンバーグで知られる老舗洋食旅の最後に駅直結で京都の洋食文化を拾える",
                "image": "",
                "link": "https://maps.google.com/?q=グリルキャピタル東洋亭+ポルタ店",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%B0%E3%83%AA%E3%83%AB%E3%82%AD%E3%83%A3%E3%83%94%E3%82%BF%E3%83%AB%E6%9D%B1%E6%B4%8B%E4%BA%AD%20%E3%83%9D%E3%83%AB%E3%82%BF%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%8C%97%E5%B0%8F%E8%B7%AF%E7%94%BA902%20%E4%BA%AC%E9%83%BD%E9%A7%85%E5%89%8D%E5%9C%B0%E4%B8%8B%E8%A1%97%E3%83%9D%E3%83%AB%E3%82%BF&output=embed",
                "lat": "34.98696",
                "lng": "135.75753"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "バール カフェジーニョ",
                "address": "京都府京都市左京区下鴨西本町37",
                "description": "ブラジルのコーヒーと音楽を楽しむ小さな店京都の喫茶店を音と空気で選ぶ候補",
                "image": "",
                "link": "https://maps.google.com/?q=バール+カフェジーニョ+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%90%E3%83%BC%E3%83%AB%20%E3%82%AB%E3%83%95%E3%82%A7%E3%82%B8%E3%83%BC%E3%83%8B%E3%83%A7%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8B%E9%B4%A8%E8%A5%BF%E6%9C%AC%E7%94%BA37&output=embed",
                "lat": "35.04377",
                "lng": "135.76998"
              },
              {
                "genre": "居酒屋 バー",
                "name": "ブランカ",
                "address": "京都府京都市中京区丸屋町334",
                "description": "和 中華 沖縄を自在に横断する料理と酒京都の今っぽい居酒屋感が濃い",
                "image": "",
                "link": "https://maps.google.com/?q=ブランカ+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%96%E3%83%A9%E3%83%B3%E3%82%AB%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%B8%E5%B1%8B%E7%94%BA334&output=embed",
                "lat": "35.00967",
                "lng": "135.76651"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "三日月氷菓店",
                "address": "京都府京都市東山区下新シ町329",
                "description": "季節の果物を生かした無添加シロップと中庭立ち飲みの三日月とは別物昼のSNS映え枠",
                "image": "",
                "link": "https://maps.google.com/?q=三日月氷菓店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%B8%89%E6%97%A5%E6%9C%88%E6%B0%B7%E8%8F%93%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E4%B8%8B%E6%96%B0%E3%82%B7%E7%94%BA329&output=embed",
                "lat": "34.99390",
                "lng": "135.77188"
              },
              {
                "genre": "ラーメン そば",
                "name": "中華そば 髙安",
                "address": "京都府京都市左京区一乗寺高槻町10",
                "description": "白濁した豚骨 鶏ガラスープと大きな唐揚げ一乗寺ラーメン文化の定番を押さえられる",
                "image": "",
                "link": "https://maps.google.com/?q=中華そば+髙安+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%B8%AD%E8%8F%AF%E3%81%9D%E3%81%B0%20%E9%AB%99%E5%AE%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%80%E4%B9%97%E5%AF%BA%E9%AB%98%E6%A7%BB%E7%94%BA10&output=embed",
                "lat": "35.04510",
                "lng": "135.78513"
              },
              {
                "genre": "ラーメン そば",
                "name": "元祖らーめん大栄",
                "address": "京都府京都市上京区河原町丸太町上ル出水町275 1F",
                "description": "たっぷりのチャーシューと昔ながらの醤油豚骨派手さより京都の日常ラーメンを選ぶ枠",
                "image": "",
                "link": "https://maps.google.com/?q=元祖らーめん大栄+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%83%E7%A5%96%E3%82%89%E3%83%BC%E3%82%81%E3%82%93%E5%A4%A7%E6%A0%84%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E4%B8%B8%E5%A4%AA%E7%94%BA%E4%B8%8A%E3%83%AB%E5%87%BA%E6%B0%B4%E7%94%BA275%201F&output=embed",
                "lat": "35.01882",
                "lng": "135.76907"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "喫茶ソワレ",
                "address": "京都府京都市下京区西木屋町通四条上る真町95",
                "description": "青い照明とゼリーポンチで知られる1948年創業の純喫茶ホテルから木屋町方面へ歩いて行けフランソア喫茶室との比較も面白い",
                "image": "",
                "link": "https://maps.google.com/?q=喫茶ソワレ+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%96%AB%E8%8C%B6%E3%82%BD%E3%83%AF%E3%83%AC%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E8%A5%BF%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%82%8B%E7%9C%9F%E7%94%BA95&output=embed",
                "lat": "35.00417",
                "lng": "135.77034"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "和栗専門店 紗織",
                "address": "京都府京都市下京区木屋町通松原上る二丁目和泉屋町170-1",
                "description": "木屋町 松原の和栗モンブラン専門店1mmの細さで絞る「紗-しゃ-」がSNSで話題ホテルからすぐ",
                "image": "",
                "link": "https://maps.google.com/?q=%E5%92%8C%E6%A0%97%E5%B0%82%E9%96%80%E5%BA%97%20%E7%B4%97%E7%B9%94%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E5%92%8C%E6%A0%97%E5%B0%82%E9%96%80%E5%BA%97%20%E7%B4%97%E7%B9%94%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E6%9D%BE%E5%8E%9F%E4%B8%8A%E3%82%8B%E4%BA%8C%E4%B8%81%E7%9B%AE%E5%92%8C%E6%B3%89%E5%B1%8B%E7%94%BA170-1&output=embed",
                "note": "ホテルと同じ松原エリア話題の映えスイーツ",
                "lat": "34.99930",
                "lng": "135.76980"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "Kawa cafe",
                "address": "京都府京都市下京区木屋町通松原上ル美濃屋町176-1",
                "description": "鴨川に面した和×仏の隠れ家カフェ窓辺の眺めが絵画のよう5〜9月は川床席も",
                "image": "",
                "link": "https://maps.google.com/?q=Kawa%20cafe%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=Kawa%20cafe%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E6%9D%BE%E5%8E%9F%E4%B8%8A%E3%83%AB%E7%BE%8E%E6%BF%83%E5%B1%8B%E7%94%BA176-1&output=embed",
                "note": "ホテルから徒歩すぐ鴨川ビューでおしゃれ",
                "lat": "34.99900",
                "lng": "135.76960"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "RAU Patisserie & Chocolate",
                "address": "京都府京都市下京区河原町四条下ル2丁目稲荷町318-6 GOOD NATURE STATION 3F",
                "description": "GOOD NATURE STATION内のパティスリー＆ショコラ造形が美しいデセールと焼き菓子",
                "image": "",
                "link": "https://maps.google.com/?q=RAU%20Patisserie%20%26%20Chocolate%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=RAU%20Patisserie%20%26%20Chocolate%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%83%AB2%E4%B8%81%E7%9B%AE%E7%A8%B2%E8%8D%B7%E7%94%BA318-6%20GOOD%20NATURE%20STATION%203F&output=embed",
                "lat": "35.00250",
                "lng": "135.76870"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "Ralph’s Coffee 京都",
                "address": "京都府京都市中京区河原町通三条下ル山崎町251 京都BAL 2F",
                "description": "京都BAL内ラルフ ローレン展開のグリーン基調のおしゃれカフェ",
                "image": "",
                "link": "https://maps.google.com/?q=Ralph’s%20Coffee%20%E4%BA%AC%E9%83%BD%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=Ralph’s%20Coffee%20%E4%BA%AC%E9%83%BD%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8B%E3%83%AB%E5%B1%B1%E5%B4%8E%E7%94%BA251%20%E4%BA%AC%E9%83%BDBAL%202F&output=embed",
                "lat": "35.00800",
                "lng": "135.76890"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "ブルーボトルコーヒー 京都木屋町カフェ",
                "address": "京都府京都市中京区蛸薬師通河原町東入備前島町310-2 立誠ガーデン ヒューリック京都1F",
                "description": "元 立誠小学校をリノベした立誠ガーデン内季節ごとの厳選豆が楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=%E3%83%96%E3%83%AB%E3%83%BC%E3%83%9C%E3%83%88%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC%20%E4%BA%AC%E9%83%BD%E6%9C%A8%E5%B1%8B%E7%94%BA%E3%82%AB%E3%83%95%E3%82%A7%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%96%E3%83%AB%E3%83%BC%E3%83%9C%E3%83%88%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC%20%E4%BA%AC%E9%83%BD%E6%9C%A8%E5%B1%8B%E7%94%BA%E3%82%AB%E3%83%95%E3%82%A7%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%9B%B8%E8%96%AC%E5%B8%AB%E9%80%9A%E6%B2%B3%E5%8E%9F%E7%94%BA%E6%9D%B1%E5%85%A5%E5%82%99%E5%89%8D%E5%B3%B6%E7%94%BA310-2%20%E7%AB%8B%E8%AA%A0%E3%82%AC%E3%83%BC%E3%83%87%E3%83%B3%20%E3%83%92%E3%83%A5%E3%83%BC%E3%83%AA%E3%83%83%E3%82%AF%E4%BA%AC%E9%83%BD1F&output=embed",
                "lat": "35.00560",
                "lng": "135.76960"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "SHIN-SETSU",
                "address": "京都府京都市中京区円福寺前町（寺町京極商店街内）",
                "description": "約24種のカラフルなクリームソーダが映える喫茶鉄板パンケーキも人気",
                "image": "",
                "link": "https://maps.google.com/?q=SHIN-SETSU%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=SHIN-SETSU%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%86%86%E7%A6%8F%E5%AF%BA%E5%89%8D%E7%94%BA&output=embed",
                "lat": "35.00470",
                "lng": "135.76730"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "さらさ花遊小路",
                "address": "京都府京都市中京区新京極四条上る中之町565-13",
                "description": "1984年から続く町家カフェ自社焙煎コーヒーと朝焼きマフィン",
                "image": "",
                "link": "https://maps.google.com/?q=%E3%81%95%E3%82%89%E3%81%95%E8%8A%B1%E9%81%8A%E5%B0%8F%E8%B7%AF%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E3%81%95%E3%82%89%E3%81%95%E8%8A%B1%E9%81%8A%E5%B0%8F%E8%B7%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%96%B0%E4%BA%AC%E6%A5%B5%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%82%8B%E4%B8%AD%E4%B9%8B%E7%94%BA565-13&output=embed",
                "lat": "35.00400",
                "lng": "135.76770"
              },
              {
                "genre": "カフェ 喫茶",
                "name": "和カフェ 季の音",
                "address": "京都府京都市中京区河原町通四条上ル米屋町384 くらもとビル4F",
                "description": "宇治抹茶やほうじ茶を使った濃厚パフェが人気の和カフェ",
                "image": "",
                "link": "https://maps.google.com/?q=%E5%92%8C%E3%82%AB%E3%83%95%E3%82%A7%20%E5%AD%A3%E3%81%AE%E9%9F%B3%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E5%92%8C%E3%82%AB%E3%83%95%E3%82%A7%20%E5%AD%A3%E3%81%AE%E9%9F%B3%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E7%B1%B3%E5%B1%8B%E7%94%BA384%20%E3%81%8F%E3%82%89%E3%82%82%E3%81%A8%E3%83%93%E3%83%AB4F&output=embed",
                "lat": "35.00420",
                "lng": "135.76860"
              },
              {
                "genre": "居酒屋 バー",
                "name": "才",
                "address": "京都府京都市右京区西院高山寺町15 折鶴会館",
                "description": "L字カウンターでおでん 天ぷらをつまめる小さな酒場折鶴会館の初訪問でも入りやすい候補",
                "image": "",
                "link": "https://maps.google.com/?q=才+折鶴会館+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%89%8D%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%99%A2%E9%AB%98%E5%B1%B1%E5%AF%BA%E7%94%BA15%20%E6%8A%98%E9%B6%B4%E4%BC%9A%E9%A4%A8&output=embed",
                "lat": "35.00319",
                "lng": "135.73116"
              },
              {
                "genre": "居酒屋 バー",
                "name": "折鶴会館",
                "address": "京都府京都市右京区西院高山寺町15周辺",
                "description": "細い路地に小さな酒場が集まるレトロな飲食街西院の会館飲みを一か所で体験できる",
                "image": "",
                "link": "https://maps.google.com/?q=折鶴会館+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%8A%98%E9%B6%B4%E4%BC%9A%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%99%A2%E9%AB%98%E5%B1%B1%E5%AF%BA%E7%94%BA15%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.00317",
                "lng": "135.73109"
              },
              {
                "genre": "居酒屋 バー",
                "name": "新京極スタンド",
                "address": "京都府京都市中京区新京極通四条上ル中之町546",
                "description": "昭和2年創業のレトロな大衆食堂 大衆酒場昼12時から飲めて食事も豊富昔ながらの京都の大衆酒場を体験できる",
                "image": "",
                "link": "https://maps.google.com/?q=新京極スタンド+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%96%B0%E4%BA%AC%E6%A5%B5%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%96%B0%E4%BA%AC%E6%A5%B5%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%AD%E4%B9%8B%E7%94%BA546&output=embed",
                "lat": "35.00459",
                "lng": "135.76730"
              },
              {
                "genre": "居酒屋 バー",
                "name": "先斗町",
                "address": "京都府京都市中京区先斗町",
                "description": "鴨川沿いの石畳の路地に居酒屋 小料理屋 バーが軒を連ねる京都らしい飲み屋街",
                "image": "",
                "link": "https://maps.google.com/?q=%E5%85%88%E6%96%97%E7%94%BA%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%88%E6%96%97%E7%94%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%88%E6%96%97%E7%94%BA&output=embed",
                "note": "ホテルから歩いて行ける鴨川沿いの飲み屋街宴会のあと路地をぶらっと歩いてお店を選べる",
                "lat": "35.00470",
                "lng": "135.77080"
              },
              {
                "genre": "居酒屋 バー",
                "name": "木屋町通",
                "address": "京都府京都市中京区木屋町通",
                "description": "高瀬川沿いに居酒屋やバーが集まる京都随一の繁華街",
                "image": "",
                "link": "https://maps.google.com/?q=%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A&output=embed",
                "note": "ホテルから近い繁華街人数や気分でお店を選びやすい",
                "lat": "35.00520",
                "lng": "135.77000"
              },
              {
                "genre": "居酒屋 バー",
                "name": "めなみ",
                "address": "京都府京都市中京区木屋町通三条上ル上大阪町517-1",
                "description": "木屋町の老舗名物のおばんざいと京料理を気軽に楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=%E3%82%81%E3%81%AA%E3%81%BF%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%81%E3%81%AA%E3%81%BF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%8A%E5%A4%A7%E9%98%AA%E7%94%BA517-1&output=embed",
                "note": "おばんざいをつまみに落ち着いて飲みたいとき向け",
                "lat": "35.00790",
                "lng": "135.76990"
              },
              {
                "genre": "居酒屋 バー",
                "name": "赤垣屋",
                "address": "京都府京都市左京区孫橋町9",
                "description": "三条大橋近くの老舗居酒屋おでんや一品料理でしっぽり飲める",
                "image": "",
                "link": "https://maps.google.com/?q=%E8%B5%A4%E5%9E%A3%E5%B1%8B%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E8%B5%A4%E5%9E%A3%E5%B1%8B%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%AD%AB%E6%A9%8B%E7%94%BA9&output=embed",
                "note": "しっとり飲める老舗三条大橋を渡ってすぐ",
                "lat": "35.00920",
                "lng": "135.77260"
              },
              {
                "genre": "居酒屋 バー",
                "name": "先斗町 ますだ",
                "address": "京都府京都市中京区先斗町四条上ル下樵木町200",
                "description": "先斗町の老舗居酒屋おでんや京のおばんざいを気取らず味わえる",
                "image": "",
                "link": "https://maps.google.com/?q=%E5%85%88%E6%96%97%E7%94%BA%20%E3%81%BE%E3%81%99%E3%81%A0%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%88%E6%96%97%E7%94%BA%20%E3%81%BE%E3%81%99%E3%81%A0%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%88%E6%96%97%E7%94%BA%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%8B%E6%A8%B5%E6%9C%A8%E7%94%BA200&output=embed",
                "lat": "35.00390",
                "lng": "135.77080"
              },
              {
                "genre": "居酒屋 バー",
                "name": "A BAR（エーバー）",
                "address": "京都府京都市中京区材木町181-2 ニュー京都ビル2F",
                "description": "木屋町の名物 安うま大衆居酒屋バー木の看板が目印でにぎやか",
                "image": "",
                "link": "https://maps.google.com/?q=A%20BAR%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=A%20BAR%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%9D%90%E6%9C%A8%E7%94%BA181-2%20%E3%83%8B%E3%83%A5%E3%83%BC%E4%BA%AC%E9%83%BD%E3%83%93%E3%83%AB2F&output=embed",
                "lat": "35.00500",
                "lng": "135.76950"
              },
              {
                "genre": "居酒屋 バー",
                "name": "京都 サンボア",
                "address": "京都府京都市下京区四条通御幸町上ル奈良物町360",
                "description": "1918年創業の老舗バー名物の樽詰めハイボールと落ち着いた雰囲気",
                "image": "",
                "link": "https://maps.google.com/?q=%E4%BA%AC%E9%83%BD%20%E3%82%B5%E3%83%B3%E3%83%9C%E3%82%A2%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%20%E3%82%B5%E3%83%B3%E3%83%9C%E3%82%A2%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%9B%9B%E6%9D%A1%E9%80%9A%E5%BE%A1%E5%B9%B8%E7%94%BA%E4%B8%8A%E3%83%AB%E5%A5%88%E8%89%AF%E7%89%A9%E7%94%BA360&output=embed",
                "lat": "35.00380",
                "lng": "135.76660"
              },
              {
                "genre": "居酒屋 バー",
                "name": "フィンランディアバー",
                "address": "京都府京都市中京区先斗町通三条下ル橋下町126",
                "description": "元お茶屋を改装した先斗町の隠れ家バーしっとり大人の一杯に",
                "image": "",
                "link": "https://maps.google.com/?q=%E3%83%95%E3%82%A3%E3%83%B3%E3%83%A9%E3%83%B3%E3%83%87%E3%82%A3%E3%82%A2%E3%83%90%E3%83%BC%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%95%E3%82%A3%E3%83%B3%E3%83%A9%E3%83%B3%E3%83%87%E3%82%A3%E3%82%A2%E3%83%90%E3%83%BC%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%88%E6%96%97%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8B%E3%83%AB%E6%A9%8B%E4%B8%8B%E7%94%BA126&output=embed",
                "lat": "35.00600",
                "lng": "135.77120"
              },
              {
                "genre": "居酒屋 バー",
                "name": "ATLANTIS（アトランティス）",
                "address": "京都府京都市中京区先斗町通四条上ル下樵木町204",
                "description": "先斗町の鴨川沿い人気バー5〜9月は川床席でカクテルを楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=ATLANTIS%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=ATLANTIS%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%88%E6%96%97%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%8B%E6%A8%B5%E6%9C%A8%E7%94%BA204&output=embed",
                "lat": "35.00430",
                "lng": "135.77090"
              },
              {
                "genre": "居酒屋 バー",
                "name": "Bar K6（ケーシックス）",
                "address": "京都府京都市中京区二条通木屋町東入ル東生洲町484 ヴァルズビル3F",
                "description": "高瀬川沿いにある本格カクテルの名店腰を据えて飲みたい夜に",
                "image": "",
                "link": "https://maps.google.com/?q=Bar%20K6%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=Bar%20K6%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%BA%8C%E6%9D%A1%E9%80%9A%E6%9C%A8%E5%B1%8B%E7%94%BA%E6%9D%B1%E5%85%A5%E3%83%AB%E6%9D%B1%E7%94%9F%E6%B4%B2%E7%94%BA484%20%E3%83%B4%E3%82%A1%E3%83%AB%E3%82%BA%E3%83%93%E3%83%AB3F&output=embed",
                "lat": "35.01170",
                "lng": "135.77020"
              },
              {
                "genre": "こども 遊び",
                "name": "ラウンドワン京都河原町店",
                "address": "〒604-8032 京都府京都市中京区河原町通三条下る山崎町250",
                "description": "ボウリング ゲーム カラオケ ダーツなどが揃う大型アミューズメント施設",
                "image": "",
                "link": "https://maps.google.com/?q=%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%83%AF%E3%83%B3%E4%BA%AC%E9%83%BD%E6%B2%B3%E5%8E%9F%E7%94%BA%E5%BA%97%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%83%AF%E3%83%B3%E4%BA%AC%E9%83%BD%E6%B2%B3%E5%8E%9F%E7%94%BA%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8B%E3%82%8B%E5%B1%B1%E5%B4%8E%E7%94%BA250&output=embed",
                "note": "子どもたちが遊べる場所河原町通り沿い（BAL向かい）でホテルからも歩いて行ける",
                "lat": "35.00860",
                "lng": "135.76930"
              },
              {
                "genre": "こども 遊び",
                "name": "京都水族館",
                "address": "京都府京都市下京区観喜寺町35-1",
                "description": "オオサンショウウオやイルカクラゲなど梅小路公園に隣接した都市型水族館",
                "image": "",
                "link": "https://maps.google.com/?q=%E4%BA%AC%E9%83%BD%E6%B0%B4%E6%97%8F%E9%A4%A8%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E6%B0%B4%E6%97%8F%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E8%A6%B3%E5%96%9C%E5%AF%BA%E7%94%BA35-1&output=embed",
                "note": "子ども連れにぴったり京都鉄道博物館 梅小路公園とセットで一日楽しめる",
                "lat": "34.98860",
                "lng": "135.74620"
              },
              {
                "genre": "こども 遊び",
                "name": "京都鉄道博物館",
                "address": "京都府京都市下京区観喜寺町",
                "description": "蒸気機関車から新幹線まで展示運転シミュレータも人気の体験型ミュージアム",
                "image": "",
                "link": "https://maps.google.com/?q=%E4%BA%AC%E9%83%BD%E9%89%84%E9%81%93%E5%8D%9A%E7%89%A9%E9%A4%A8%20%E4%BA%AC%E9%83%BD",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E9%89%84%E9%81%93%E5%8D%9A%E7%89%A9%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E8%A6%B3%E5%96%9C%E5%AF%BA%E7%94%BA&output=embed",
                "note": "電車好きの子どもに水族館や梅小路公園とまとめて回れる",
                "lat": "34.98770",
                "lng": "135.74280"
              },
              {
                "genre": "立ち飲み",
                "name": "柳小路 TAKA",
                "address": "京都府京都市中京区中之町577 柳小路はちべえ長屋",
                "description": "細い路地の長屋で焼き鳥や小皿料理を楽しめる立ち飲みホテルから四条河原町方面へ歩いて寄りやすく0次会にも向く",
                "image": "",
                "link": "https://maps.google.com/?q=柳小路+TAKA+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%9F%B3%E5%B0%8F%E8%B7%AF%20TAKA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%AD%E4%B9%8B%E7%94%BA577%20%E6%9F%B3%E5%B0%8F%E8%B7%AF%E3%81%AF%E3%81%A1%E3%81%B9%E3%81%88%E9%95%B7%E5%B1%8B&output=embed",
                "lat": "35.00458",
                "lng": "135.76823"
              },
              {
                "genre": "立ち飲み",
                "name": "樫尾酒店 本店",
                "address": "京都府京都市右京区西院高山寺町15 折鶴会館",
                "description": "駅前の会館で長く親しまれる立ち飲み短時間の一杯にもはしごの起点にも使える",
                "image": "",
                "link": "https://maps.google.com/?q=樫尾酒店+本店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%A8%AB%E5%B0%BE%E9%85%92%E5%BA%97%20%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%99%A2%E9%AB%98%E5%B1%B1%E5%AF%BA%E7%94%BA15%20%E6%8A%98%E9%B6%B4%E4%BC%9A%E9%A4%A8&output=embed",
                "lat": "35.00317",
                "lng": "135.73116"
              },
              {
                "genre": "ラーメン そば",
                "name": "煌力",
                "address": "京都府京都市中京区姉西洞院町545 ホワイトプラザ1F",
                "description": "香りと辛さの設計が異なる担々麺を選べるラーメン枠に辛味の選択肢を足せる",
                "image": "",
                "link": "https://maps.google.com/?q=煌力+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%85%8C%E5%8A%9B%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A7%89%E8%A5%BF%E6%B4%9E%E9%99%A2%E7%94%BA545%20%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88%E3%83%97%E3%83%A9%E3%82%B61F&output=embed",
                "lat": "35.00969",
                "lng": "135.75505"
              },
              {
                "genre": "立ち飲み",
                "name": "立ち呑み 三日月",
                "address": "京都府京都市中京区西ノ京東中合町33 GRAVI西大路1F",
                "description": "駅徒歩約1分安くて一人でも入りやすい立ち飲み観光地化されすぎていない西側の地元飲みの入口",
                "image": "",
                "link": "https://maps.google.com/?q=立ち呑み+三日月+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%AB%8B%E3%81%A1%E5%91%91%E3%81%BF%20%E4%B8%89%E6%97%A5%E6%9C%88%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%A5%BF%E3%83%8E%E4%BA%AC%E6%9D%B1%E4%B8%AD%E5%90%88%E7%94%BA33%20GRAVI%E8%A5%BF%E5%A4%A7%E8%B7%AF1F&output=embed",
                "lat": "35.01196",
                "lng": "135.73169"
              },
              {
                "genre": "立ち飲み",
                "name": "立ち飲み やみー",
                "address": "京都府京都市中京区西錦小路町262-8",
                "description": "魚料理を中心に小皿が充実する昼11時開店の人気立ち飲み立ち飲み百名店2025選出四条烏丸側なので錦市場や西院方面へ行く日に組み込みたい2階座席のみDM予約可",
                "image": "",
                "link": "https://maps.google.com/?q=立ち飲み+やみー+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%AB%8B%E3%81%A1%E9%A3%B2%E3%81%BF%20%E3%82%84%E3%81%BF%E3%83%BC%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%8C%A6%E5%B0%8F%E8%B7%AF%E7%94%BA262-8&output=embed",
                "lat": "35.00476",
                "lng": "135.75598"
              },
              {
                "genre": "昼食",
                "name": "酒パークPINN",
                "address": "京都府京都市中京区新椹木町通竹屋町上ル西革堂町175",
                "description": "小ポーションのスパイス料理で一人昼飲みしやすい中東 アジアの香りで京都旅の味に変化をつける",
                "image": "",
                "link": "https://maps.google.com/?q=酒パークPINN+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%85%92%E3%83%91%E3%83%BC%E3%82%AFPINN%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%96%B0%E6%A4%B9%E6%9C%A8%E7%94%BA%E9%80%9A%E7%AB%B9%E5%B1%8B%E7%94%BA%E4%B8%8A%E3%83%AB%E8%A5%BF%E9%9D%A9%E5%A0%82%E7%94%BA175&output=embed",
                "lat": "35.01629",
                "lng": "135.76860"
              },
              {
                "genre": "夜ごはん",
                "name": "野菜と魚 en",
                "address": "京都府京都市下京区永原町153-10",
                "description": "町家で野菜と魚を軸にした創作料理重すぎない夜ごはんと酒を両立",
                "image": "",
                "link": "https://maps.google.com/?q=野菜と魚+en+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%87%8E%E8%8F%9C%E3%81%A8%E9%AD%9A%20en%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B0%B8%E5%8E%9F%E7%94%BA153-10&output=embed",
                "lat": "35.00200",
                "lng": "135.76380"
              },
              {
                "genre": "夜ごはん",
                "name": "食堂ルインズ",
                "address": "京都府京都市下京区稲荷町319",
                "description": "古い町家でフランス料理とワインを気軽に楽しむレトロと現代のバランスが雑誌的",
                "image": "",
                "link": "https://maps.google.com/?q=食堂ルインズ+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%A3%9F%E5%A0%82%E3%83%AB%E3%82%A4%E3%83%B3%E3%82%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E7%A8%B2%E8%8D%B7%E7%94%BA319&output=embed",
                "lat": "35.00269",
                "lng": "135.76978"
              },
              {
                "genre": "立ち飲み",
                "name": "高木商店（高木与三右衛門商店）",
                "address": "京都府京都市中京区西ノ京西中合町64",
                "description": "昔ながらの酒屋で飲める角打ち西大路御池の空気を最もローカルに味わえる",
                "image": "",
                "link": "https://maps.google.com/?q=高木与三右衛門商店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%AB%98%E6%9C%A8%E5%95%86%E5%BA%97%EF%BC%88%E9%AB%98%E6%9C%A8%E4%B8%8E%E4%B8%89%E5%8F%B3%E8%A1%9B%E9%96%80%E5%95%86%E5%BA%97%EF%BC%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%A5%BF%E3%83%8E%E4%BA%AC%E8%A5%BF%E4%B8%AD%E5%90%88%E7%94%BA64&output=embed",
                "lat": "35.01160",
                "lng": "135.72990"
              },
              {
                "genre": "ラーメン そば",
                "name": "麺屋 さん田",
                "address": "京都府京都市右京区西院追分町7-4",
                "description": "濃厚鶏白湯のつけ麺と自家製麺西院でラーメンを目的地にするなら有力",
                "image": "",
                "link": "https://maps.google.com/?q=麺屋+さん田+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BA%BA%E5%B1%8B%20%E3%81%95%E3%82%93%E7%94%B0%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%99%A2%E8%BF%BD%E5%88%86%E7%94%BA7-4&output=embed",
                "lat": "34.99766",
                "lng": "135.72588"
              },
              {
                "genre": "ラーメン そば",
                "name": "麺屋 優光",
                "address": "京都府京都市中京区場之町588",
                "description": "貝と鶏の澄んだ醤油スープ「淡竹」味も丼のビジュアルも京都の現代ラーメンらしい",
                "image": "",
                "link": "https://maps.google.com/?q=麺屋+優光+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BA%BA%E5%B1%8B%20%E5%84%AA%E5%85%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A0%B4%E4%B9%8B%E7%94%BA588&output=embed",
                "lat": "35.00978",
                "lng": "135.75935"
              },
              {
                "genre": "ラーメン そば",
                "name": "麺屋 猪一",
                "address": "京都府京都市下京区恵美須之町542",
                "description": "和出汁を生かした透明感のあるスープSNS映えだけでなく味の評価も安定した行列店",
                "image": "",
                "link": "https://maps.google.com/?q=麺屋+猪一+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BA%BA%E5%B1%8B%20%E7%8C%AA%E4%B8%80%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%81%B5%E7%BE%8E%E9%A0%88%E4%B9%8B%E7%94%BA542&output=embed",
                "lat": "35.00133",
                "lng": "135.76696"
              },
              {
                "genre": "ラーメン そば",
                "name": "麺屋 練之助",
                "address": "京都府京都市上京区東竪町116-2",
                "description": "素材の重なりを丁寧に見せる淡麗系ラーメン2026年8月の移転直後で今まさに追う価値がある",
                "image": "",
                "link": "https://maps.google.com/?q=麺屋+練之助+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BA%BA%E5%B1%8B%20%E7%B7%B4%E4%B9%8B%E5%8A%A9%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E6%9D%B1%E7%AB%AA%E7%94%BA116-2&output=embed",
                "lat": "35.02638",
                "lng": "135.73608"
              },
              {
                "genre": "ラーメン そば",
                "name": "麺屋EDITION 西院店",
                "address": "京都府京都市右京区西院乾町70-1 ジェミニビル1F",
                "description": "京都素材の背脂醤油と泡醤油深夜まで営業2025年新店で飲んだ後の締めにも使いやすい",
                "image": "",
                "link": "https://maps.google.com/?q=麺屋EDITION+西院店",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BA%BA%E5%B1%8BEDITION%20%E8%A5%BF%E9%99%A2%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8F%B3%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%99%A2%E4%B9%BE%E7%94%BA70-1%20%E3%82%B8%E3%82%A7%E3%83%9F%E3%83%8B%E3%83%93%E3%83%AB1F&output=embed",
                "lat": "35.00362",
                "lng": "135.72658"
              },
              {
                "genre": "夜ごはん",
                "name": "龍門 本店",
                "address": "京都府京都市東山区三条通東大路西入北側",
                "description": "辛さと香りが立つ本格四川料理寺社巡り後に味の方向を変えたい夜に良い",
                "image": "",
                "link": "https://maps.google.com/?q=龍門+本店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%BE%8D%E9%96%80%20%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E4%B8%89%E6%9D%A1%E9%80%9A%E6%9D%B1%E5%A4%A7%E8%B7%AF%E8%A5%BF%E5%85%A5%E5%8C%97%E5%81%B4&output=embed",
                "lat": "35.00955",
                "lng": "135.77726"
              },
              {
                "genre": "古道具 アンティーク",
                "name": "70B ANTIQUES",
                "address": "京都府京都市中京区三条通高倉東入桝屋町53-1 B1F",
                "description": "地下に家具 器 小物が大量に並ぶアンティーク店宝探し感が強く見るだけでも楽しい",
                "image": "",
                "link": "https://maps.google.com/?q=70B+ANTIQUES+京都",
                "mapEmbed": "https://www.google.com/maps?q=70B%20ANTIQUES%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%89%E6%9D%A1%E9%80%9A%E9%AB%98%E5%80%89%E6%9D%B1%E5%85%A5%E6%A1%9D%E5%B1%8B%E7%94%BA53-1%20B1F&output=embed",
                "lat": "35.00871",
                "lng": "135.76265"
              },
              {
                "genre": "雑貨 クラフト",
                "name": "D&DEPARTMENT KYOTO by 京都芸術大学",
                "address": "京都府京都市下京区高倉通仏光寺下ル新開町397 本山佛光寺内",
                "description": "佛光寺境内で京都のロングライフデザインと食を紹介する店POPEYEやBRUTUS的な編集感が強く寺院 雑貨 食事を一度に楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=D%26DEPARTMENT+KYOTO",
                "mapEmbed": "https://www.google.com/maps?q=D%26DEPARTMENT%20KYOTO%20by%20%E4%BA%AC%E9%83%BD%E8%8A%B8%E8%A1%93%E5%A4%A7%E5%AD%A6%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E9%AB%98%E5%80%89%E9%80%9A%E4%BB%8F%E5%85%89%E5%AF%BA%E4%B8%8B%E3%83%AB%E6%96%B0%E9%96%8B%E7%94%BA397%20%E6%9C%AC%E5%B1%B1%E4%BD%9B%E5%85%89%E5%AF%BA%E5%86%85&output=embed",
                "lat": "35.00019",
                "lng": "135.76264"
              },
              {
                "genre": "雑貨 クラフト",
                "name": "LE LABO KYOTO MACHIYA",
                "address": "京都府京都市中京区木屋町通四条上る2丁目下樵木町206",
                "description": "築約145年の酒蔵を再生した町家型店舗とカフェ香り 建築 コーヒーを一度に楽しめる",
                "image": "",
                "link": "https://maps.google.com/?q=LE+LABO+KYOTO+MACHIYA",
                "mapEmbed": "https://www.google.com/maps?q=LE%20LABO%20KYOTO%20MACHIYA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%82%8B2%E4%B8%81%E7%9B%AE%E4%B8%8B%E6%A8%B5%E6%9C%A8%E7%94%BA206&output=embed",
                "lat": "35.00542",
                "lng": "135.77068"
              },
              {
                "genre": "雑貨 クラフト",
                "name": "minä perhonen Kyoto",
                "address": "京都府京都市下京区河原町通四条下ル市之町251-2 寿ビル1F",
                "description": "古い寿ビルを生かした京都店で服 生地 生活品を見るブランドと建築の世界観が一体になっている",
                "image": "",
                "link": "https://maps.google.com/?q=minä+perhonen+Kyoto",
                "mapEmbed": "https://www.google.com/maps?q=min%C3%A4%20perhonen%20Kyoto%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%83%AB%E5%B8%82%E4%B9%8B%E7%94%BA251-2%20%E5%AF%BF%E3%83%93%E3%83%AB1F&output=embed",
                "lat": "35.00171",
                "lng": "135.76916"
              },
              {
                "genre": "雑貨 クラフト",
                "name": "POJ Studio",
                "address": "京都府京都市東山区妙法院前側町427-19",
                "description": "日本の手仕事を現代の暮らしにつなぐショップ兼スタジオ買うだけでなくワークショップ体験も選べる",
                "image": "",
                "link": "https://maps.google.com/?q=POJ+Studio+京都",
                "mapEmbed": "https://www.google.com/maps?q=POJ%20Studio%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%A6%99%E6%B3%95%E9%99%A2%E5%89%8D%E5%81%B4%E7%94%BA427-19&output=embed",
                "lat": "34.99763",
                "lng": "135.76556"
              },
              {
                "genre": "古道具 アンティーク",
                "name": "TORYBAZAR",
                "address": "京都府京都市上京区東三本木通丸太町上ル中之町496",
                "description": "器 ガラス 古物 食材を編集して並べる店暮らし目線の京都土産を選べる",
                "image": "",
                "link": "https://maps.google.com/?q=TORYBAZAR+京都",
                "mapEmbed": "https://www.google.com/maps?q=TORYBAZAR%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E6%9D%B1%E4%B8%89%E6%9C%AC%E6%9C%A8%E9%80%9A%E4%B8%B8%E5%A4%AA%E7%94%BA%E4%B8%8A%E3%83%AB%E4%B8%AD%E4%B9%8B%E7%94%BA496&output=embed",
                "lat": "35.01903",
                "lng": "135.77035"
              },
              {
                "genre": "雑貨 クラフト",
                "name": "VOU / 棒",
                "address": "京都府京都市下京区筋屋町137",
                "description": "ZINE陶器作品オリジナル雑貨が混在するギャラリーショップ京都の若いアートと土産を一緒に探せる",
                "image": "",
                "link": "https://maps.google.com/?q=VOU+棒+京都",
                "mapEmbed": "https://www.google.com/maps?q=VOU%20/%20%E6%A3%92%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E7%AD%8B%E5%B1%8B%E7%94%BA137&output=embed",
                "lat": "35.00109",
                "lng": "135.76466"
              },
              {
                "genre": "古道具 アンティーク",
                "name": "WIFE&HUSBAND DAUGHTER/SON",
                "address": "京都府京都市北区小山西花池町6-9",
                "description": "焙煎所とアンティーク販売を併設した新拠点2026年6月移転の新しさと世界観がある",
                "image": "",
                "link": "https://maps.google.com/?q=WIFE%26HUSBAND+DAUGHTER%2FSON",
                "mapEmbed": "https://www.google.com/maps?q=WIFE%26HUSBAND%20DAUGHTER/SON%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8C%97%E5%8C%BA%E5%B0%8F%E5%B1%B1%E8%A5%BF%E8%8A%B1%E6%B1%A0%E7%94%BA6-9&output=embed",
                "lat": "35.04340",
                "lng": "135.76173"
              },
              {
                "genre": "古道具 アンティーク",
                "name": "YAMADA MPD ART CLUB",
                "address": "京都府京都市中京区寺町通竹屋町上る藤木町22",
                "description": "古道具民藝現代作家の品が混ざる店BRUTUS酒場特集の案内人の視点ともつながる",
                "image": "",
                "link": "https://maps.google.com/?q=YAMADA+MPD+ART+CLUB+京都",
                "mapEmbed": "https://www.google.com/maps?q=YAMADA%20MPD%20ART%20CLUB%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%AF%BA%E7%94%BA%E9%80%9A%E7%AB%B9%E5%B1%8B%E7%94%BA%E4%B8%8A%E3%82%8B%E8%97%A4%E6%9C%A8%E7%94%BA22&output=embed",
                "lat": "35.01567",
                "lng": "135.76738"
              },
              {
                "genre": "本屋",
                "name": "京都 蔦屋書店",
                "address": "京都府京都市下京区四条通寺町東入二丁目御旅町35 京都髙島屋S.C. T8 5 6階",
                "description": "本 現代アート 工芸 文具を横断して見られる大型書店ホテルから行きやすく雑誌好きやアート好きの買い物に向く",
                "image": "",
                "link": "https://maps.google.com/?q=京都+蔦屋書店",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%20%E8%94%A6%E5%B1%8B%E6%9B%B8%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%9B%9B%E6%9D%A1%E9%80%9A%E5%AF%BA%E7%94%BA%E6%9D%B1%E5%85%A5%E4%BA%8C%E4%B8%81%E7%9B%AE%E5%BE%A1%E6%97%85%E7%94%BA35%20%E4%BA%AC%E9%83%BD%E9%AB%99%E5%B3%B6%E5%B1%8BS.C.%20T8%205%E3%83%BB6%E9%9A%8E&output=embed",
                "lat": "35.00353",
                "lng": "135.76825"
              },
              {
                "genre": "本屋",
                "name": "恵文社一乗寺店",
                "address": "京都府京都市左京区一乗寺払殿町10",
                "description": "本 生活雑貨 ギャラリーが一続きになった独立系書店一乗寺散策の文化的な核",
                "image": "",
                "link": "https://maps.google.com/?q=恵文社一乗寺店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%81%B5%E6%96%87%E7%A4%BE%E4%B8%80%E4%B9%97%E5%AF%BA%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%80%E4%B9%97%E5%AF%BA%E6%89%95%E6%AE%BF%E7%94%BA10&output=embed",
                "lat": "35.04396",
                "lng": "135.78491"
              },
              {
                "genre": "本屋",
                "name": "誠光社",
                "address": "京都府京都市上京区中町通丸太町上ル俵屋町437",
                "description": "独自選書と自社出版を行う小さな書店POPEYE BRUTUS系の感度で京都を掘るなら外せない",
                "image": "",
                "link": "https://maps.google.com/?q=誠光社+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E8%AA%A0%E5%85%89%E7%A4%BE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E4%B8%AD%E7%94%BA%E9%80%9A%E4%B8%B8%E5%A4%AA%E7%94%BA%E4%B8%8A%E3%83%AB%E4%BF%B5%E5%B1%8B%E7%94%BA437&output=embed",
                "lat": "35.01829",
                "lng": "135.76957"
              },
              {
                "genre": "お土産",
                "name": "GOOD NATURE STATION",
                "address": "京都府京都市下京区河原町通四条下ル2丁目稲荷町318番6",
                "description": "食品 コスメ 雑貨 カフェが集まるライフスタイル施設ホテル至近で雨の日にも京都らしい食品やコスメをまとめて探せる",
                "image": "",
                "link": "https://maps.google.com/?q=GOOD+NATURE+STATION+京都",
                "mapEmbed": "https://www.google.com/maps?q=GOOD%20NATURE%20STATION%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%83%AB2%E4%B8%81%E7%9B%AE%E7%A8%B2%E8%8D%B7%E7%94%BA318%E7%95%AA6&output=embed",
                "lat": "35.00256",
                "lng": "135.76916"
              },
              {
                "genre": "お土産",
                "name": "RAU Patisserie & Chocolate",
                "address": "京都府京都市下京区河原町通四条下ル2丁目稲荷町318番6 GOOD NATURE STATION 3F",
                "description": "造形的なデザートとビーントゥバーのチョコレートが人気ホテル至近見栄えのする菓子土産や食後のデザートに使いやすい",
                "image": "",
                "link": "https://maps.google.com/?q=RAU+Patisserie+%26+Chocolate+京都",
                "mapEmbed": "https://www.google.com/maps?q=RAU%20Patisserie%20%26%20Chocolate%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%83%AB2%E4%B8%81%E7%9B%AE%E7%A8%B2%E8%8D%B7%E7%94%BA318%E7%95%AA6%20GOOD%20NATURE%20STATION%203F&output=embed",
                "lat": "35.00251",
                "lng": "135.76891"
              },
              {
                "genre": "お土産",
                "name": "SOU SOU 足袋",
                "address": "京都府京都市中京区",
                "description": "京都発ブランドの足袋 地下足袋京都らしい現代的な柄が魅力",
                "image": "",
                "link": "https://maps.google.com/?q=SOU SOU+足袋+京都",
                "mapEmbed": "https://www.google.com/maps?q=SOU%E3%83%BBSOU%20%E8%B6%B3%E8%A2%8B%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%96%B0%E4%BA%AC%E6%A5%B5%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB%E4%B8%AD%E4%B9%8B%E7%94%BA583-3&output=embed",
                "lat": "35.00438",
                "lng": "135.76814"
              },
              {
                "genre": "お土産",
                "name": "よーじや 四条河原町店",
                "address": "京都府京都市下京区",
                "description": "京都コスメの定番ホテルから近くコスメとカフェを一度に見られる",
                "image": "",
                "link": "https://maps.google.com/?q=よーじや+四条河原町店",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%88%E3%83%BC%E3%81%98%E3%82%84%20%E5%9B%9B%E6%9D%A1%E6%B2%B3%E5%8E%9F%E7%94%BA%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%9B%9B%E6%9D%A1%E9%80%9A%E5%AF%BA%E7%94%BA%E6%9D%B1%E5%85%A5%E5%BE%A1%E6%97%85%E7%94%BA%E4%BA%8C%E4%B8%81%E7%9B%AE30&output=embed",
                "lat": "35.00396",
                "lng": "135.76810"
              },
              {
                "genre": "お土産",
                "name": "カランコロン京都 本店",
                "address": "京都府京都市下京区四条通小橋西入真町83-1",
                "description": "親しみやすい和雑貨ホテルから近く手頃で京都らしい小物をまとめて探せる",
                "image": "",
                "link": "https://maps.google.com/?q=カランコロン京都+本店",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%AB%E3%83%A9%E3%83%B3%E3%82%B3%E3%83%AD%E3%83%B3%E4%BA%AC%E9%83%BD%20%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%9B%9B%E6%9D%A1%E9%80%9A%E5%B0%8F%E6%A9%8B%E8%A5%BF%E5%85%A5%E7%9C%9F%E7%94%BA83-1&output=embed",
                "lat": "35.00391",
                "lng": "135.77005"
              },
              {
                "genre": "お土産",
                "name": "京都鳩居堂",
                "address": "京都府京都市中京区寺町通四条上ル",
                "description": "お香 便箋 書画用品大人向けの上品な土産に向く",
                "image": "",
                "link": "https://maps.google.com/?q=京都鳩居堂",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E9%B3%A9%E5%B1%85%E5%A0%82%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%AF%BA%E7%94%BA%E9%80%9A%E5%A7%89%E5%B0%8F%E8%B7%AF%E4%B8%8A%E3%83%AB%E4%B8%8B%E6%9C%AC%E8%83%BD%E5%AF%BA%E5%89%8D%E7%94%BA520&output=embed",
                "lat": "35.00997",
                "lng": "135.76707"
              },
              {
                "genre": "お土産",
                "name": "永楽屋 本店",
                "address": "京都府京都市中京区河原町通四条上ル",
                "description": "手ぬぐい 風呂敷などの和雑貨京都土産の定番",
                "image": "",
                "link": "https://maps.google.com/?q=永楽屋+本店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%B0%B8%E6%A5%BD%E5%B1%8B%20%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8A%E3%83%AB&output=embed",
                "lat": "35.00928",
                "lng": "135.75823"
              },
              {
                "genre": "紅葉スポット",
                "name": "永観堂（禅林寺）",
                "address": "京都府京都市左京区永観堂町48",
                "description": "もみじの永観堂と呼ばれる名所夜間ライトアップも人気",
                "image": "",
                "link": "https://maps.google.com/?q=永観堂+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%B0%B8%E8%A6%B3%E5%A0%82%EF%BC%88%E7%A6%85%E6%9E%97%E5%AF%BA%EF%BC%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E6%B0%B8%E8%A6%B3%E5%A0%82%E7%94%BA48&output=embed",
                "lat": "35.01485",
                "lng": "135.79416"
              },
              {
                "genre": "夜景 散歩",
                "name": "二年坂 三年坂",
                "address": "京都府京都市東山区",
                "description": "石畳と町家が続く京都らしい街並み家族で散歩しやすい",
                "image": "",
                "link": "https://maps.google.com/?q=二年坂 三年坂+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%8C%E5%B9%B4%E5%9D%82%E3%83%BB%E4%B8%89%E5%B9%B4%E5%9D%82%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%B8%85%E6%B0%B4%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "34.99840",
                "lng": "135.78084"
              },
              {
                "genre": "夜景 散歩",
                "name": "祇園白川 巽橋",
                "address": "京都府京都市東山区元吉町周辺",
                "description": "白川沿いの柳 石畳 町家がつくる祇園らしい景観夜は灯りが美しく早朝は比較的静か八坂神社や朝食喜心とも組み合わせやすい",
                "image": "",
                "link": "https://maps.google.com/?q=祇園白川 巽橋+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%A5%87%E5%9C%92%E7%99%BD%E5%B7%9D%E3%83%BB%E5%B7%BD%E6%A9%8B%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%85%83%E5%90%89%E7%94%BA%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.00547",
                "lng": "135.77365"
              },
              {
                "genre": "夜景 散歩",
                "name": "立誠ガーデン ヒューリック京都",
                "address": "京都府京都市中京区蛸薬師通河原町東入備前島町310-2",
                "description": "元小学校を活用した広場 ホテル ショップの複合施設高瀬川や木屋町の夜散歩の休憩地点に便利文化イベントが開かれることもある",
                "image": "",
                "link": "https://maps.google.com/?q=立誠ガーデン+ヒューリック京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%AB%8B%E8%AA%A0%E3%82%AC%E3%83%BC%E3%83%87%E3%83%B3%20%E3%83%92%E3%83%A5%E3%83%BC%E3%83%AA%E3%83%83%E3%82%AF%E4%BA%AC%E9%83%BD%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%9B%B8%E8%96%AC%E5%B8%AB%E9%80%9A%E6%B2%B3%E5%8E%9F%E7%94%BA%E6%9D%B1%E5%85%A5%E5%82%99%E5%89%8D%E5%B3%B6%E7%94%BA310-2&output=embed",
                "lat": "35.00601",
                "lng": "135.77029"
              },
              {
                "genre": "夜景 散歩",
                "name": "高瀬川 木屋町通",
                "address": "京都府京都市下京区美濃屋町〜中京区下樵木町周辺",
                "description": "細い水路と町家飲食店が続く京都中心部の散歩道ホテルのすぐ近く食後に北へ歩けば先斗町や三条方面まで自然につながる",
                "image": "",
                "link": "https://maps.google.com/?q=高瀬川 木屋町通+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%AB%98%E7%80%AC%E5%B7%9D%E3%83%BB%E6%9C%A8%E5%B1%8B%E7%94%BA%E9%80%9A%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E7%BE%8E%E6%BF%83%E5%B1%8B%E7%94%BA%E3%80%9C%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%8B%E6%A8%B5%E6%9C%A8%E7%94%BA%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.00146",
                "lng": "135.76941"
              },
              {
                "genre": "夜景 散歩",
                "name": "鴨川デルタ",
                "address": "京都市左京区田中下柳町周辺",
                "description": "川の合流地点で京都の日常を感じる地元感があり散歩と休憩に最適",
                "image": "",
                "link": "https://maps.google.com/?q=鴨川デルタ",
                "mapEmbed": "https://www.google.com/maps?q=%E9%B4%A8%E5%B7%9D%E3%83%87%E3%83%AB%E3%82%BF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E7%94%B0%E4%B8%AD%E4%B8%8B%E6%9F%B3%E7%94%BA%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.02986",
                "lng": "135.77176"
              },
              {
                "genre": "夜景 散歩",
                "name": "鴨川河川敷（四条大橋〜五条大橋）",
                "address": "京都府京都市下京区斎藤町〜東橋詰町周辺",
                "description": "川音と東山の稜線を眺めながら歩ける無料の夜散歩コースホテルから短時間で行け飲んだ後の散歩や朝の散策にも最も使いやすい",
                "image": "",
                "link": "https://maps.google.com/?q=鴨川河川敷+四条大橋+五条大橋",
                "mapEmbed": "https://www.google.com/maps?q=%E9%B4%A8%E5%B7%9D%E6%B2%B3%E5%B7%9D%E6%95%B7%EF%BC%88%E5%9B%9B%E6%9D%A1%E5%A4%A7%E6%A9%8B%E3%80%9C%E4%BA%94%E6%9D%A1%E5%A4%A7%E6%A9%8B%EF%BC%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%96%8E%E8%97%A4%E7%94%BA%E3%80%9C%E6%9D%B1%E6%A9%8B%E8%A9%B0%E7%94%BA%E5%91%A8%E8%BE%BA&output=embed",
                "lat": "35.00384",
                "lng": "135.77153"
              },
              {
                "genre": "穴場",
                "name": "京都府庁旧本館",
                "address": "京都府京都市上京区下立売通新町西入薮ノ内町",
                "description": "明治期の現役官公庁建築と中庭無料で京都の近代建築をじっくり見られる",
                "image": "",
                "link": "https://maps.google.com/?q=京都府庁旧本館",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E5%BA%81%E6%97%A7%E6%9C%AC%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E4%B8%8B%E7%AB%8B%E5%A3%B2%E9%80%9A%E6%96%B0%E7%94%BA%E8%A5%BF%E5%85%A5%E8%96%AE%E3%83%8E%E5%86%85%E7%94%BA&output=embed",
                "lat": "35.02071",
                "lng": "135.75560"
              },
              {
                "genre": "穴場",
                "name": "光明院",
                "address": "京都府京都市東山区本町15丁目809",
                "description": "重森三玲の枯山水「波心庭」と苔の景観東福寺の大混雑から外して静かな庭を見る",
                "image": "",
                "link": "https://maps.google.com/?q=光明院+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%89%E6%98%8E%E9%99%A2%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%9C%AC%E7%94%BA15%E4%B8%81%E7%9B%AE809&output=embed",
                "lat": "34.97395",
                "lng": "135.77367"
              },
              {
                "genre": "穴場",
                "name": "六波羅蜜寺",
                "address": "京都府京都市東山区ロクロ町81-1",
                "description": "空也上人像をはじめ重要文化財を収蔵する歴史寺院ホテルから宮川町経由で歩け大黒湯や清水五条とセットにしやすい",
                "image": "",
                "link": "https://maps.google.com/?q=六波羅蜜寺+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%AD%E6%B3%A2%E7%BE%85%E8%9C%9C%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E3%83%AD%E3%82%AF%E3%83%AD%E7%94%BA81-1&output=embed",
                "lat": "34.99709",
                "lng": "135.77337"
              },
              {
                "genre": "穴場",
                "name": "市比賣神社",
                "address": "京都府京都市下京区河原町五条下ル一筋目西入ル",
                "description": "女人守護 市場守護で知られだるま型の姫みくじも人気ホテルから河原町通を南へ歩け梅湯や五条散策と組み合わせやすい",
                "image": "",
                "link": "https://maps.google.com/?q=市比賣神社+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%B8%82%E6%AF%94%E8%B3%A3%E7%A5%9E%E7%A4%BE%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E4%BA%94%E6%9D%A1%E4%B8%8B%E3%83%AB%E4%B8%80%E7%AD%8B%E7%9B%AE%E8%A5%BF%E5%85%A5%E3%83%AB&output=embed",
                "lat": "34.99399",
                "lng": "135.76473"
              },
              {
                "genre": "穴場",
                "name": "渉成園（枳殻邸）",
                "address": "京都府京都市下京区下珠数屋町通間之町東入東玉水町",
                "description": "京都駅徒歩圏とは思えない広い池泉回遊式庭園到着日 帰宅日に静かな京都を足せる",
                "image": "",
                "link": "https://maps.google.com/?q=渉成園+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%B8%89%E6%88%90%E5%9C%92%EF%BC%88%E6%9E%B3%E6%AE%BB%E9%82%B8%EF%BC%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E4%B8%8B%E7%8F%A0%E6%95%B0%E5%B1%8B%E7%94%BA%E9%80%9A%E9%96%93%E4%B9%8B%E7%94%BA%E6%9D%B1%E5%85%A5%E6%9D%B1%E7%8E%89%E6%B0%B4%E7%94%BA&output=embed",
                "lat": "34.99134",
                "lng": "135.76314"
              },
              {
                "genre": "穴場",
                "name": "無鄰菴",
                "address": "京都府京都市左京区南禅寺草川町31",
                "description": "七代目小川治兵衛の庭と洋館を時間制で静かに鑑賞南禅寺の混雑から少し離れて庭を深く見る",
                "image": "",
                "link": "https://maps.google.com/?q=無鄰菴+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E7%84%A1%E9%84%B0%E8%8F%B4%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%8D%97%E7%A6%85%E5%AF%BA%E8%8D%89%E5%B7%9D%E7%94%BA31&output=embed",
                "lat": "35.01163",
                "lng": "135.78695"
              },
              {
                "genre": "穴場",
                "name": "雲龍院",
                "address": "京都府京都市東山区泉涌寺山内町36",
                "description": "蓮華の間の四角い窓景色と写経体験東福寺近くで静かな室内と庭を味わえる",
                "image": "",
                "link": "https://maps.google.com/?q=雲龍院+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%9B%B2%E9%BE%8D%E9%99%A2%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%B3%89%E6%B6%8C%E5%AF%BA%E5%B1%B1%E5%86%85%E7%94%BA36&output=embed",
                "lat": "34.97719",
                "lng": "135.78020"
              },
              {
                "genre": "美術館",
                "name": "京都文化博物館 別館",
                "address": "京都府京都市中京区高倉通三条上る東片町623-1",
                "description": "旧日本銀行京都支店の赤煉瓦建築買い物の途中に短時間でも建築を見られる",
                "image": "",
                "link": "https://maps.google.com/?q=京都文化博物館+別館",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E6%96%87%E5%8C%96%E5%8D%9A%E7%89%A9%E9%A4%A8%20%E5%88%A5%E9%A4%A8%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E9%AB%98%E5%80%89%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8A%E3%82%8B%E6%9D%B1%E7%89%87%E7%94%BA623-1&output=embed",
                "lat": "35.00877",
                "lng": "135.76226"
              },
              {
                "genre": "朝ごはん",
                "name": "CICON",
                "address": "京都府京都市東山区五条橋東4丁目450-1 NOHGA HOTEL KIYOMIZU KYOTO 1F",
                "description": "朝7時から焼き立てパンと選べるメインの朝食を楽しめるベーカリーだけの利用も可能清水寺へ向かう日の朝食に組み込みやすい",
                "image": "",
                "link": "https://maps.google.com/?q=CICON+京都",
                "mapEmbed": "https://www.google.com/maps?q=CICON%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E4%BA%94%E6%9D%A1%E6%A9%8B%E6%9D%B14%E4%B8%81%E7%9B%AE450-1%20NOHGA%20HOTEL%20KIYOMIZU%20KYOTO%201F&output=embed",
                "lat": "34.99494",
                "lng": "135.77401"
              },
              {
                "genre": "朝ごはん",
                "name": "Kacto",
                "address": "京都府京都市下京区斎藤町133",
                "description": "鴨川沿いで朝8時からパンケーキや洋食ブランチを楽しめるホテル周辺の朝食 ブランチ本命季節の川床席は予約推奨",
                "image": "",
                "link": "https://maps.google.com/?q=Kacto+京都",
                "mapEmbed": "https://www.google.com/maps?q=Kacto%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%96%8E%E8%97%A4%E7%94%BA133&output=embed",
                "lat": "35.00226",
                "lng": "135.77049"
              },
              {
                "genre": "朝ごはん",
                "name": "LIGNUM",
                "address": "京都府京都市中京区御幸町通夷川上ル松本町577",
                "description": "ガラス張りとテラスが印象的な朝食 ブランチ店朝から一日のテンションを上げられる",
                "image": "",
                "link": "https://maps.google.com/?q=LIGNUM+京都",
                "mapEmbed": "https://www.google.com/maps?q=LIGNUM%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%BE%A1%E5%B9%B8%E7%94%BA%E9%80%9A%E5%A4%B7%E5%B7%9D%E4%B8%8A%E3%83%AB%E6%9D%BE%E6%9C%AC%E7%94%BA577&output=embed",
                "lat": "35.01513",
                "lng": "135.76658"
              },
              {
                "genre": "朝ごはん",
                "name": "M&Maison KYOTO",
                "address": "京都府京都市下京区橋詰町143",
                "description": "魚と旬の野菜を使った一汁三菜の和朝食旧ロリマー京都の流れをくむ店ホテルから五条方面へ歩き京都らしい定食を食べられる",
                "image": "",
                "link": "https://maps.google.com/?q=M%26Maison+KYOTO",
                "mapEmbed": "https://www.google.com/maps?q=M%26Maison%20KYOTO%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%A9%8B%E8%A9%B0%E7%94%BA143&output=embed",
                "lat": "34.99366",
                "lng": "135.76103"
              },
              {
                "genre": "朝ごはん",
                "name": "OHARU",
                "address": "京都府京都市左京区岡崎西福ノ川町13-2",
                "description": "伊勢志摩の魚介と朝食昼飲みを楽しむ美術館前後の食事を定番カフェ以外にできる",
                "image": "",
                "link": "https://maps.google.com/?q=OHARU+京都",
                "mapEmbed": "https://www.google.com/maps?q=OHARU%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E5%B2%A1%E5%B4%8E%E8%A5%BF%E7%A6%8F%E3%83%8E%E5%B7%9D%E7%94%BA13-2&output=embed",
                "lat": "35.01859",
                "lng": "135.78327"
              },
              {
                "genre": "朝ごはん",
                "name": "イノダコーヒ本店",
                "address": "京都府京都市中京区堺町通三条下る道祐町140",
                "description": "町家造りの本店でコーヒーと京都らしい洋朝食を味わえる朝7時開店少し歩くが京都の喫茶文化を代表する一軒として行く価値がある",
                "image": "",
                "link": "https://maps.google.com/?q=イノダコーヒ本店",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%A4%E3%83%8E%E3%83%80%E3%82%B3%E3%83%BC%E3%83%92%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A0%BA%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8B%E3%82%8B%E9%81%93%E7%A5%90%E7%94%BA140&output=embed",
                "lat": "35.00810",
                "lng": "135.76319"
              },
              {
                "genre": "朝ごはん",
                "name": "コーヒーショップ ナカタニ",
                "address": "京都府京都市東山区廿一軒町236 鴨東ビル1F",
                "description": "祇園四条駅前のレトロ喫茶でサンドイッチやトーストを楽しめるホテルから鴨川を渡って行きやすい朝9時開店で軽く済ませたい日に向く",
                "image": "",
                "link": "https://maps.google.com/?q=コーヒーショップ+ナカタニ+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97%20%E3%83%8A%E3%82%AB%E3%82%BF%E3%83%8B%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%BB%BF%E4%B8%80%E8%BB%92%E7%94%BA236%20%E9%B4%A8%E6%9D%B1%E3%83%93%E3%83%AB1F&output=embed",
                "lat": "35.00426",
                "lng": "135.77273"
              },
              {
                "genre": "朝ごはん",
                "name": "スマート珈琲店",
                "address": "京都府京都市中京区寺町通三条上る天性寺前町537",
                "description": "昭和7年創業の喫茶店でホットケーキやフレンチトーストを楽しめる朝8時開店寺町商店街や京都市役所方面を回る日のクラシックな朝食候補",
                "image": "",
                "link": "https://maps.google.com/?q=スマート珈琲店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E7%8F%88%E7%90%B2%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%AF%BA%E7%94%BA%E9%80%9A%E4%B8%89%E6%9D%A1%E4%B8%8A%E3%82%8B%E5%A4%A9%E6%80%A7%E5%AF%BA%E5%89%8D%E7%94%BA537&output=embed",
                "lat": "35.00945",
                "lng": "135.76708"
              },
              {
                "genre": "朝ごはん",
                "name": "京菜味のむら 烏丸本店",
                "address": "京都府京都市中京区蛸薬師通烏丸西入橋弁慶町224",
                "description": "朝7時から好みのおばんざい小鉢を選べる和朝食比較的手頃で予約不要四条烏丸や立ち飲みやみー方面へ行く朝に便利",
                "image": "",
                "link": "https://maps.google.com/?q=京菜味のむら+烏丸本店",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E8%8F%9C%E5%91%B3%E3%81%AE%E3%82%80%E3%82%89%20%E7%83%8F%E4%B8%B8%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%9B%B8%E8%96%AC%E5%B8%AB%E9%80%9A%E7%83%8F%E4%B8%B8%E8%A5%BF%E5%85%A5%E6%A9%8B%E5%BC%81%E6%85%B6%E7%94%BA224&output=embed",
                "lat": "35.00605",
                "lng": "135.75872"
              },
              {
                "genre": "朝ごはん",
                "name": "京都いとおかし",
                "address": "京都府京都市下京区高辻通油小路東入永養寺町224",
                "description": "【要予約】厚切りの焼き鮭を主役にした予約制朝食朝ごはん自体を旅の目的にできる",
                "image": "",
                "link": "https://maps.google.com/?q=京都いとおかし",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%E3%81%84%E3%81%A8%E3%81%8A%E3%81%8B%E3%81%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E9%AB%98%E8%BE%BB%E9%80%9A%E6%B2%B9%E5%B0%8F%E8%B7%AF%E6%9D%B1%E5%85%A5%E6%B0%B8%E9%A4%8A%E5%AF%BA%E7%94%BA224&output=embed",
                "lat": "35.00003",
                "lng": "135.75390"
              },
              {
                "genre": "朝ごはん",
                "name": "僧伽小野 京都浄教寺",
                "address": "京都府京都市下京区寺町通四条下る貞安前之町620 三井ガーデンホテル京都河原町浄教寺2F",
                "description": "朝6時30分から選べる主菜と京料理のハーフビュッフェホテルから特に近く朝からしっかり和食を食べたい日に最適価格は高めだが使い勝手が良い",
                "image": "",
                "link": "https://maps.google.com/?q=僧伽小野+京都浄教寺",
                "mapEmbed": "https://www.google.com/maps?q=%E5%83%A7%E4%BC%BD%E5%B0%8F%E9%87%8E%20%E4%BA%AC%E9%83%BD%E6%B5%84%E6%95%99%E5%AF%BA%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%AF%BA%E7%94%BA%E9%80%9A%E5%9B%9B%E6%9D%A1%E4%B8%8B%E3%82%8B%E8%B2%9E%E5%AE%89%E5%89%8D%E4%B9%8B%E7%94%BA620%20%E4%B8%89%E4%BA%95%E3%82%AC%E3%83%BC%E3%83%87%E3%83%B3%E3%83%9B%E3%83%86%E3%83%AB%E4%BA%AC%E9%83%BD%E6%B2%B3%E5%8E%9F%E7%94%BA%E6%B5%84%E6%95%99%E5%AF%BA2F&output=embed",
                "lat": "35.00296",
                "lng": "135.76720"
              },
              {
                "genre": "朝ごはん",
                "name": "六曜社珈琲店 一階店",
                "address": "京都府京都市中京区河原町三条下ル大黒町40",
                "description": "朝8時30分からトーストとコーヒーのモーニングを提供ホテルから河原町通を北へ歩くだけ華美ではない地元の喫茶店らしさが魅力",
                "image": "",
                "link": "https://maps.google.com/?q=六曜社珈琲店+一階店+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%85%AD%E6%9B%9C%E7%A4%BE%E7%8F%88%E7%90%B2%E5%BA%97%20%E4%B8%80%E9%9A%8E%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%B2%B3%E5%8E%9F%E7%94%BA%E4%B8%89%E6%9D%A1%E4%B8%8B%E3%83%AB%E5%A4%A7%E9%BB%92%E7%94%BA40&output=embed",
                "lat": "35.00841",
                "lng": "135.76922"
              },
              {
                "genre": "朝ごはん",
                "name": "旬菜いまり",
                "address": "京都府京都市中京区六角通新町西入西六角町108",
                "description": "【要予約】炊き立て土鍋ごはん 西京焼き だし巻き おばんざいの朝御膳ホテルからは少し離れるが紅葉期は1か月前予約推奨の目的地型朝食",
                "image": "",
                "link": "https://maps.google.com/?q=旬菜いまり+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%97%AC%E8%8F%9C%E3%81%84%E3%81%BE%E3%82%8A%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%85%AD%E8%A7%92%E9%80%9A%E6%96%B0%E7%94%BA%E8%A5%BF%E5%85%A5%E8%A5%BF%E5%85%AD%E8%A7%92%E7%94%BA108&output=embed",
                "lat": "35.00740",
                "lng": "135.75602"
              },
              {
                "genre": "朝ごはん",
                "name": "朝食喜心 kyoto",
                "address": "京都府京都市東山区小松町555 鈴ホテル祇園花とうろ1F",
                "description": "【要予約】土鍋ごはんと汁物を中心に一斉スタートで味わう朝食コースミシュランガイド京都 大阪2026ビブグルマン祇園で朝食自体を旅の目的にできる",
                "image": "",
                "link": "https://maps.google.com/?q=朝食喜心+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E6%9C%9D%E9%A3%9F%E5%96%9C%E5%BF%83%20kyoto%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%B0%8F%E6%9D%BE%E7%94%BA555%20%E9%88%B4%E3%83%9B%E3%83%86%E3%83%AB%E7%A5%87%E5%9C%92%E8%8A%B1%E3%81%A8%E3%81%86%E3%82%8D1F&output=embed",
                "lat": "35.00268",
                "lng": "135.77406"
              },
              {
                "genre": "朝ごはん",
                "name": "茶の間",
                "address": "京都府京都市上京区西鷹司町14",
                "description": "古いレコード店のような空気とスパイスカレー観光客向けに作られすぎていない朝喫茶",
                "image": "",
                "link": "https://maps.google.com/?q=茶の間+京都+西鷹司町",
                "mapEmbed": "https://www.google.com/maps?q=%E8%8C%B6%E3%81%AE%E9%96%93%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8A%E4%BA%AC%E5%8C%BA%E8%A5%BF%E9%B7%B9%E5%8F%B8%E7%94%BA14&output=embed",
                "lat": "35.02249",
                "lng": "135.75764"
              },
              {
                "genre": "朝ごはん",
                "name": "進々堂 三条河原町店",
                "address": "京都府京都市中京区三条通河原町東入中島町74 ザ ロイヤルパークホテル京都三条1F",
                "description": "朝7時から焼き立てパンと洋食系の朝食を選べるベーカリーレストラン年中無休で席数もあり早朝から確実に食べたい日の安全牌",
                "image": "",
                "link": "https://maps.google.com/?q=進々堂+三条河原町店",
                "mapEmbed": "https://www.google.com/maps?q=%E9%80%B2%E3%80%85%E5%A0%82%20%E4%B8%89%E6%9D%A1%E6%B2%B3%E5%8E%9F%E7%94%BA%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%89%E6%9D%A1%E9%80%9A%E6%B2%B3%E5%8E%9F%E7%94%BA%E6%9D%B1%E5%85%A5%E4%B8%AD%E5%B3%B6%E7%94%BA74%20%E3%82%B6%20%E3%83%AD%E3%82%A4%E3%83%A4%E3%83%AB%E3%83%91%E3%83%BC%E3%82%AF%E3%83%9B%E3%83%86%E3%83%AB%E4%BA%AC%E9%83%BD%E4%B8%89%E6%9D%A11F&output=embed",
                "lat": "35.00900",
                "lng": "135.76951"
              },
              {
                "genre": "朝ごはん",
                "name": "高木珈琲店 高辻本店",
                "address": "京都府京都市下京区高辻通室町東入骨屋町175",
                "description": "朝7時から厚切りトースト 卵 ソーセージの充実したモーニング昭和喫茶らしい雰囲気と量のある朝食ホテルから西へ散歩する日におすすめ",
                "image": "",
                "link": "https://maps.google.com/?q=高木珈琲店+高辻本店",
                "mapEmbed": "https://www.google.com/maps?q=%E9%AB%98%E6%9C%A8%E7%8F%88%E7%90%B2%E5%BA%97%20%E9%AB%98%E8%BE%BB%E6%9C%AC%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E9%AB%98%E8%BE%BB%E9%80%9A%E5%AE%A4%E7%94%BA%E6%9D%B1%E5%85%A5%E9%AA%A8%E5%B1%8B%E7%94%BA175&output=embed",
                "lat": "35.00021",
                "lng": "135.75839"
              },
              {
                "genre": "銭湯",
                "name": "サウナの梅湯",
                "address": "京都府京都市下京区岩滝町175-1",
                "description": "高瀬川沿いのレトロなネオンとサウナオリジナルグッズが人気京都の銭湯カルチャーを体験するなら最優先朝6時から翌2時まで営業木曜休み",
                "image": "",
                "link": "https://maps.google.com/?q=サウナの梅湯+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E3%82%B5%E3%82%A6%E3%83%8A%E3%81%AE%E6%A2%85%E6%B9%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E5%B2%A9%E6%BB%9D%E7%94%BA175-1&output=embed",
                "lat": "34.99296",
                "lng": "135.76568"
              },
              {
                "genre": "銭湯",
                "name": "五香湯",
                "address": "京都府京都市下京区黒門通五条上ル柿本町590-12",
                "description": "2種類のサウナ 水風呂 露天風呂 岩盤浴を備えた大型銭湯設備重視なら有力西院方面からホテルへ戻る途中にも寄りやすい",
                "image": "",
                "link": "https://maps.google.com/?q=五香湯+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%94%E9%A6%99%E6%B9%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E9%BB%92%E9%96%80%E9%80%9A%E4%BA%94%E6%9D%A1%E4%B8%8A%E3%83%AB%E6%9F%BF%E6%9C%AC%E7%94%BA590-12&output=embed",
                "lat": "34.99693",
                "lng": "135.74978"
              },
              {
                "genre": "銭湯",
                "name": "京都 玉の湯",
                "address": "京都府京都市中京区押小路通御幸町西入ル亀屋町401",
                "description": "明るく清潔な浴室とサウナを備える御所南の地域銭湯寺町 京都市役所 誠光社方面の散策後に使いやすい日曜休み",
                "image": "",
                "link": "https://maps.google.com/?q=京都+玉の湯",
                "mapEmbed": "https://www.google.com/maps?q=%E4%BA%AC%E9%83%BD%20%E7%8E%89%E3%81%AE%E6%B9%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E6%8A%BC%E5%B0%8F%E8%B7%AF%E9%80%9A%E5%BE%A1%E5%B9%B8%E7%94%BA%E8%A5%BF%E5%85%A5%E3%83%AB%E4%BA%80%E5%B1%8B%E7%94%BA401&output=embed",
                "lat": "35.01210",
                "lng": "135.76637"
              },
              {
                "genre": "銭湯",
                "name": "大黒湯",
                "address": "京都府京都市東山区大黒町通松原下ル山城町284",
                "description": "宮川町近くに残る番台式銭湯サウナ 水風呂 薬湯ありホテルから最も行きやすい銭湯候補深夜1時まで営業",
                "image": "",
                "link": "https://maps.google.com/?q=大黒湯+東山区+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E5%A4%A7%E9%BB%92%E6%B9%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E5%A4%A7%E9%BB%92%E7%94%BA%E9%80%9A%E6%9D%BE%E5%8E%9F%E4%B8%8B%E3%83%AB%E5%B1%B1%E5%9F%8E%E7%94%BA284&output=embed",
                "lat": "34.99719",
                "lng": "135.77124"
              },
              {
                "genre": "銭湯",
                "name": "白山湯 高辻店",
                "address": "京都府京都市下京区東中筋通松原上ル舟屋町665",
                "description": "サウナ 水風呂 薬湯が揃う京都屈指の人気銭湯サウナ好きから特に支持される日曜日は朝7時から営業土曜休み",
                "image": "",
                "link": "https://maps.google.com/?q=白山湯+高辻店",
                "mapEmbed": "https://www.google.com/maps?q=%E7%99%BD%E5%B1%B1%E6%B9%AF%20%E9%AB%98%E8%BE%BB%E5%BA%97%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%9D%B1%E4%B8%AD%E7%AD%8B%E9%80%9A%E6%9D%BE%E5%8E%9F%E4%B8%8A%E3%83%AB%E8%88%9F%E5%B1%8B%E7%94%BA665&output=embed",
                "lat": "34.99957",
                "lng": "135.75433"
              },
              {
                "genre": "銭湯",
                "name": "船岡温泉",
                "address": "京都府京都市北区紫野南舟岡町82-1",
                "description": "欄間 マジョリカタイルなど装飾が残る歴史的銭湯観光ではなく京都の日常文化に入れる",
                "image": "",
                "link": "https://maps.google.com/?q=船岡温泉+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E8%88%B9%E5%B2%A1%E6%B8%A9%E6%B3%89%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%8C%97%E5%8C%BA%E7%B4%AB%E9%87%8E%E5%8D%97%E8%88%9F%E5%B2%A1%E7%94%BA82-1&output=embed",
                "lat": "35.03703",
                "lng": "135.74465"
              },
              {
                "genre": "銭湯",
                "name": "鴨川湯",
                "address": "京都府京都市左京区下鴨上川原町56",
                "description": "カラフルなタイルとネオン薪で沸かす天然地下水が魅力鴨川デルタやWIFE&HUSBANDと組み合わせる価値がある日曜は朝8時から営業",
                "image": "",
                "link": "https://maps.google.com/?q=鴨川湯+京都",
                "mapEmbed": "https://www.google.com/maps?q=%E9%B4%A8%E5%B7%9D%E6%B9%AF%20%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E4%B8%8B%E9%B4%A8%E4%B8%8A%E5%B7%9D%E5%8E%9F%E7%94%BA56&output=embed",
                "lat": "35.04358",
                "lng": "135.76461"
              },
              {
                "genre": "古着屋",
                "name": "古着屋JAM 京都四条店",
                "address": "京都市中京区御幸町通四条上ル海老屋町317",
                "description": "アメリカ古着中心の大型古着店点数が多くて掘り甲斐のある定番スポット",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E5%8F%A4%E7%9D%80%E5%B1%8BJAM%20%E4%BA%AC%E9%83%BD%E5%9B%9B%E6%9D%A1%E5%BA%97%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00434",
                "lng": "135.76703"
              },
              {
                "genre": "古着屋",
                "name": "ビッグタイム 京都",
                "address": "京都市中京区三条通寺町東入石橋町5-1",
                "description": "三条寺町の老舗大型古着店地下から3階まで4フロアにアメリカ ヨーロッパ古着がぎっしり",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E3%83%93%E3%83%83%E3%82%B0%E3%82%BF%E3%82%A4%E3%83%A0%20%E4%BA%AC%E9%83%BD%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00877",
                "lng": "135.76745"
              },
              {
                "genre": "古着屋",
                "name": "古着屋 KINJI 京都店",
                "address": "京都市中京区弁慶石町48 1F",
                "description": "ヴィンテージから普段使いまで幅広く揃う大型店値段も手頃で古着初心者でも入りやすい",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E5%8F%A4%E7%9D%80%E5%B1%8B%20KINJI%20%E4%BA%AC%E9%83%BD%E5%BA%97%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00871",
                "lng": "135.76602"
              },
              {
                "genre": "古着屋",
                "name": "ROGER'S",
                "address": "京都市中京区永楽町241 寺町六角ビル2F",
                "description": "デッドストック多めのアメカジ系古着屋寺町六角のビル2階コンディションの良さに定評",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=ROGER%27S%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00749",
                "lng": "135.76665"
              },
              {
                "genre": "古着屋",
                "name": "原宿シカゴ 京都店",
                "address": "京都市中京区寺町通六角下ル式部町258",
                "description": "世界各国の古着が手頃な価格でずらり着物 和装小物の古着コーナーは京都ならでは",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=%E5%8E%9F%E5%AE%BF%E3%82%B7%E3%82%AB%E3%82%B4%20%E4%BA%AC%E9%83%BD%E5%BA%97%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00668",
                "lng": "135.76680"
              },
              {
                "genre": "レコード屋",
                "name": "JET SET 京都店",
                "address": "京都市中京区下丸屋町410 ユニティー河原町ビル4F",
                "description": "京都発の有名レコードショップ新譜 クラブミュージックに強く自社レーベルも持つ河原町三条のビル4階",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=JET%20SET%20%E4%BA%AC%E9%83%BD%E5%BA%97%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00980",
                "lng": "135.76872"
              },
              {
                "genre": "レコード屋",
                "name": "100000tアローントコ",
                "address": "京都市中京区寺町御池上ル上本能寺前町485",
                "description": "中古レコード CD 古本が所狭しと積まれた名物店京都市役所のすぐ横で寄りやすい",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=100000t%E3%82%A2%E3%83%AD%E3%83%BC%E3%83%B3%E3%83%88%E3%82%B3%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.01134",
                "lng": "135.76703"
              },
              {
                "genre": "レコード屋",
                "name": "Meditations",
                "address": "京都市上京区河原町丸太町上ル出水町253 春日ビル3F",
                "description": "アンビエント ニューエイジ ワールドを独自の審美眼で集めるその筋では世界的に知られる店河原町丸太町のビル3階",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=Meditations%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.01953",
                "lng": "135.76920"
              },
              {
                "genre": "レコード屋",
                "name": "Face Records KYOTO",
                "address": "京都市下京区四条通河原町西入真町52 京都髙島屋S.C.［T8］",
                "description": "四条河原町 京都髙島屋S.C.［T8］内のアナログレコード専門店ホテルの目の前でサッと寄れる",
                "image": "",
                "link": "",
                "mapEmbed": "https://www.google.com/maps?q=Face%20Records%20KYOTO%20%E4%BA%AC%E9%83%BD&output=embed",
                "lat": "35.00353",
                "lng": "135.76826"
              }
            ]
          }
        },
        {
          "id": "bk_g_outro",
          "type": "message",
          "style": {
            "bg": "pink",
            "align": "center",
            "spacing": "normal",
            "width": "normal",
            "tilt": "none",
            "customBg": "",
            "customText": "",
            "decoration": "default",
            "decorationPosition": "top-right",
            "decorationSize": "medium",
            "decorationColor": ""
          },
          "data": {
            "heading": "Looking forward to it!",
            "subheading": "みんなに会えるのを楽しみにしてます",
            "body": "結婚式をやると決めてから \n今日までみんなに楽しんでもらえることを\n想像しながらわくわくの気持ちで\n準備を進めています\n\n当日までまだ少し時間がありますがみんなで\n心の底から楽しめる最高の１日にしたいと 思っています\n\n京都の旅を \n楽しみにしていてもらえたらとても嬉しいです\n当日お会いできるのを 楽しみにしています",
            "sign": "拓郎 ＆ 和美",
            "image": ""
          }
        }
      ]
    }
  ]
};
})(window);
