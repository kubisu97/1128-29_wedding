const SUPABASE_URL = 'https://xkgxocdeunfowivmxyxn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_i3GaR312Iu2bPWP86-Qkbg_EDqgwYfI';
const SITE_SLUG = 'kyoto-family-wedding-2026';
const SUPABASE_BUCKET = 'wedi-assets';

const loginSection = document.getElementById('loginSection');
const editorSection = document.getElementById('editorSection');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');
const magicLinkButton = document.getElementById('magicLinkButton');
const loginStatus = document.getElementById('loginStatus');
const saveButton = document.getElementById('saveButton');
const logoutButton = document.getElementById('logoutButton');
const saveStatus = document.getElementById('saveStatus');

const invitationCeremony = document.getElementById('invitationCeremony');
const invitationVenue = document.getElementById('invitationVenue');
const invitationHotel = document.getElementById('invitationHotel');
const invitationParagraphs = document.getElementById('invitationParagraphs');
const guideCopy = document.getElementById('guideCopy');
const guideNote = document.getElementById('guideNote');
const mastheadSub = document.getElementById('mastheadSub');
const routeTitle = document.getElementById('routeTitle');
const routeCopy = document.getElementById('routeCopy');
const routeStepsList = document.getElementById('routeStepsList');
const countdownTarget = document.getElementById('countdownTarget');
const day1List = document.getElementById('day1List');
const day2List = document.getElementById('day2List');
const mapSummary = document.getElementById('mapSummary');
const mapEmbed = document.getElementById('mapEmbed');
const mapSpotList = document.getElementById('mapSpotList');
const infoListAdmin = document.getElementById('infoListAdmin');
const stayName = document.getElementById('stayName');
const stayText = document.getElementById('stayText');
const stayVenueText = document.getElementById('stayVenueText');
const stayMorningText = document.getElementById('stayMorningText');
const rsvpParagraphs = document.getElementById('rsvpParagraphs');
const photoWallGrid = document.getElementById('photoWallGrid');
const galleryGrid = document.getElementById('galleryGrid');
const photoNoteText = document.getElementById('photoNoteText');
const photoNoteCtaEn = document.getElementById('photoNoteCtaEn');
const photoNoteCtaJa = document.getElementById('photoNoteCtaJa');
const photoNoteCtaUrl = document.getElementById('photoNoteCtaUrl');

const repeatTemplate = document.getElementById('repeatItemTemplate');
const imageTemplate = document.getElementById('imageItemTemplate');

const supabaseClient = (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

let currentContent = {};

function showLogin() {
    loginSection.hidden = false;
    editorSection.hidden = true;
}

function showEditor() {
    loginSection.hidden = true;
    editorSection.hidden = false;
}

function setStatus(el, message, isError = false) {
    if (!el) {
        return;
    }
    el.textContent = message;
    el.style.color = isError ? '#a13318' : '';
}

function toLines(textarea) {
    return textarea.value.split('\n').map((line) => line.trim()).filter(Boolean);
}

function toPercent(value) {
    if (!value) {
        return '';
    }
    const trimmed = value.trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
        return `${trimmed}%`;
    }
    return trimmed;
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 24) || `spot-${Date.now()}`;
}

function createField(labelText, name, value, isTextarea = false) {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = isTextarea ? document.createElement('textarea') : document.createElement('input');
    input.dataset.name = name;
    input.value = value || '';
    if (isTextarea) {
        input.rows = 2;
    }
    label.appendChild(input);
    return label;
}

function createRepeatItem(fields) {
    const node = repeatTemplate.content.firstElementChild.cloneNode(true);
    const container = node.querySelector('.repeat-fields');
    fields.forEach((field) => container.appendChild(field));
    node.querySelector('.remove').addEventListener('click', () => node.remove());
    return node;
}

function renderSchedule(listEl, items) {
    listEl.innerHTML = '';
    (items || []).forEach((item) => {
        const node = createRepeatItem([
            createField('時間', 'time', item.time),
            createField('タイトル', 'title', item.title),
            createField('内容', 'text', item.text, true),
            createField('地図リンク', 'link', item.link),
            createField('リンク表記', 'linkLabel', item.linkLabel)
        ]);
        listEl.appendChild(node);
    });
}

function renderRouteStepsList(items) {
    routeStepsList.innerHTML = '';
    const resolvedItems = (items && items.length)
        ? items
        : [
            {
                labelEn: 'Invitation',
                labelJa: '招待状',
                title: 'まずは挨拶と概要',
                text: '式の日程と場所、今回の旅の雰囲気を確認。',
                href: '#invitation'
            },
            {
                labelEn: 'Travel Guide',
                labelJa: '旅のしおり',
                title: '日程と地図をチェック',
                text: 'バス出発、自由行動、会場までの流れを把握。',
                href: '#guide'
            },
            {
                labelEn: 'RSVP',
                labelJa: '出欠回答',
                title: '最後にフォームを送信',
                text: '出欠・アレルギーの確認をまとめて入力。',
                href: '#rsvp'
            }
        ];

    resolvedItems.forEach((item) => {
        const node = createRepeatItem([
            createField('ラベル英', 'labelEn', item.labelEn),
            createField('ラベル日', 'labelJa', item.labelJa),
            createField('タイトル', 'title', item.title),
            createField('説明', 'text', item.text, true),
            createField('リンク', 'href', item.href)
        ]);
        routeStepsList.appendChild(node);
    });
}

function renderMapSpots(items) {
    mapSpotList.innerHTML = '';
    (items || []).forEach((item) => {
        const node = createRepeatItem([
            createField('ID', 'id', item.id),
            createField('名前', 'name', item.name),
            createField('徒歩', 'walk', item.walk),
            createField('雰囲気', 'vibe', item.vibe),
            createField('紹介文', 'copy', item.copy, true),
            createField('地図リンク', 'mapLink', item.mapLink),
            createField('経路リンク', 'routeLink', item.routeLink),
            createField('X位置(%)', 'x', item.x),
            createField('Y位置(%)', 'y', item.y),
            createField('タグ英', 'tagEn', item.tagEn || item.tag),
            createField('タグ日', 'tagJa', item.tagJa)
        ]);
        mapSpotList.appendChild(node);
    });
}

function renderInfo(items) {
    infoListAdmin.innerHTML = '';
    (items || []).forEach((item) => {
        const node = createRepeatItem([
            createField('記号', 'mark', item.mark),
            createField('見出し', 'title', item.title),
            createField('内容', 'text', item.text, true)
        ]);
        infoListAdmin.appendChild(node);
    });
}

function renderImages(targetGrid, items, sectionKey) {
    targetGrid.innerHTML = '';
    items.forEach((item, index) => {
        const node = imageTemplate.content.firstElementChild.cloneNode(true);
        node.dataset.section = sectionKey;
        node.dataset.index = String(index);
        const urlInput = node.querySelector('.image-url');
        const captionEnInput = node.querySelector('.image-caption-en');
        const captionJaInput = node.querySelector('.image-caption-ja');
        const altInput = node.querySelector('.image-alt');
        const preview = node.querySelector('.image-preview');
        const status = node.querySelector('.image-status');
        const fileInput = node.querySelector('.image-file');

        urlInput.value = item.src || '';
        captionEnInput.value = item.captionEn || '';
        captionJaInput.value = item.captionJa || '';
        altInput.value = item.alt || '';

        const updatePreview = () => {
            preview.innerHTML = '';
            if (urlInput.value) {
                const img = document.createElement('img');
                img.src = urlInput.value;
                img.alt = '';
                preview.appendChild(img);
            } else {
                preview.textContent = 'No Image';
            }
        };

        updatePreview();
        urlInput.addEventListener('input', updatePreview);

        fileInput.addEventListener('change', async () => {
            if (!supabaseClient) {
                setStatus(status, 'Supabase設定が必要です。', true);
                return;
            }
            const file = fileInput.files?.[0];
            if (!file) {
                return;
            }
            try {
                setStatus(status, 'アップロード中...');
                const ext = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
                const filePath = `${SITE_SLUG}/${sectionKey}/${fileName}`;
                const { error } = await supabaseClient.storage
                    .from(SUPABASE_BUCKET)
                    .upload(filePath, file, { upsert: true });
                if (error) {
                    throw error;
                }
                const { data } = supabaseClient.storage
                    .from(SUPABASE_BUCKET)
                    .getPublicUrl(filePath);
                urlInput.value = data.publicUrl;
                updatePreview();
                setStatus(status, 'アップロード完了');
            } catch (err) {
                setStatus(status, 'アップロード失敗', true);
            }
        });

        targetGrid.appendChild(node);
    });
}

function collectRepeat(listEl) {
    return Array.from(listEl.querySelectorAll('.repeat-item')).map((item) => {
        const obj = {};
        item.querySelectorAll('[data-name]').forEach((input) => {
            obj[input.dataset.name] = input.value.trim();
        });
        return obj;
    }).filter((obj) => Object.values(obj).some(Boolean));
}

function collectImages(sectionKey) {
    return Array.from(document.querySelectorAll(`.image-item[data-section="${sectionKey}"]`)).map((item) => ({
        src: item.querySelector('.image-url').value.trim(),
        captionEn: item.querySelector('.image-caption-en').value.trim(),
        captionJa: item.querySelector('.image-caption-ja').value.trim(),
        alt: item.querySelector('.image-alt').value.trim()
    })).filter((item) => item.src || item.captionEn || item.captionJa || item.alt);
}

function mergeContent(next) {
    return {
        ...currentContent,
        masthead: next.masthead,
        start: next.start,
        countdown: next.countdown,
        invitation: next.invitation,
        photos: {
            ...currentContent.photos,
            ...next.photos
        },
        guide: next.guide,
        schedule: next.schedule,
        map: next.map,
        info: next.info,
        rsvp: next.rsvp
    };
}

async function loadContent() {
    if (!supabaseClient) {
        setStatus(saveStatus, 'Supabase設定が必要です', true);
        return;
    }
    const { data, error } = await supabaseClient
        .from('site_content')
        .select('data')
        .eq('slug', SITE_SLUG)
        .maybeSingle();
    if (error) {
        setStatus(saveStatus, '読み込みエラー', true);
        return;
    }
    currentContent = data?.data || {};
    renderForm();
    setStatus(saveStatus, '読み込み完了');
}

function renderForm() {
    invitationCeremony.value = currentContent.invitation?.ceremony || '';
    invitationVenue.value = currentContent.invitation?.venue || '';
    invitationHotel.value = currentContent.invitation?.hotel || '';
    invitationParagraphs.value = (currentContent.invitation?.paragraphs || []).join('\n');
    guideCopy.value = currentContent.guide?.copy || '';
    guideNote.value = currentContent.guide?.note || '';
    mastheadSub.value = currentContent.masthead?.sub || '';
    routeTitle.value = currentContent.start?.title || '';
    routeCopy.value = currentContent.start?.copy || '';
    countdownTarget.value = currentContent.countdown?.target || '';
    mapSummary.value = currentContent.map?.summary || '';
    mapEmbed.value = currentContent.map?.embed || '';
    stayName.value = currentContent.info?.stay?.hotelName || '';
    stayText.value = currentContent.info?.stay?.stayText || '';
    stayVenueText.value = currentContent.info?.stay?.venueText || '';
    stayMorningText.value = currentContent.info?.stay?.morningText || '';
    rsvpParagraphs.value = (currentContent.rsvp?.paragraphs || []).join('\n');
    photoNoteText.value = currentContent.photos?.note || '';
    photoNoteCtaEn.value = currentContent.photos?.noteCtaEn || '';
    photoNoteCtaJa.value = currentContent.photos?.noteCtaJa || '';
    photoNoteCtaUrl.value = currentContent.photos?.noteCtaUrl || '';

    renderSchedule(day1List, currentContent.schedule?.day1?.items || []);
    renderSchedule(day2List, currentContent.schedule?.day2?.items || []);
    renderRouteStepsList(currentContent.start?.steps || []);
    renderMapSpots(currentContent.map?.spots || []);
    renderInfo(currentContent.info?.items || []);

    const wallItems = Array.from({ length: 6 }, (_, i) => currentContent.photos?.wall?.[i] || {});
    const galleryItems = Array.from({ length: 8 }, (_, i) => currentContent.photos?.gallery?.[i] || {});
    renderImages(photoWallGrid, wallItems, 'wall');
    renderImages(galleryGrid, galleryItems, 'gallery');
}

async function saveContent() {
    if (!supabaseClient) {
        setStatus(saveStatus, 'Supabase設定が必要です', true);
        return;
    }

    const day1Items = collectRepeat(day1List);
    const day2Items = collectRepeat(day2List);
    const spots = collectRepeat(mapSpotList).map((spot) => ({
        ...spot,
        id: spot.id || slugify(spot.name || ''),
        x: toPercent(spot.x),
        y: toPercent(spot.y)
    }));

    const next = mergeContent({
        masthead: {
            sub: mastheadSub.value.trim()
        },
        start: {
            title: routeTitle.value.trim(),
            copy: routeCopy.value.trim(),
            steps: collectRepeat(routeStepsList)
        },
        countdown: {
            target: countdownTarget.value.trim()
        },
        invitation: {
            ceremony: invitationCeremony.value.trim(),
            venue: invitationVenue.value.trim(),
            hotel: invitationHotel.value.trim(),
            paragraphs: toLines(invitationParagraphs)
        },
        photos: {
            wall: collectImages('wall'),
            gallery: collectImages('gallery'),
            note: photoNoteText.value.trim(),
            noteCtaEn: photoNoteCtaEn.value.trim(),
            noteCtaJa: photoNoteCtaJa.value.trim(),
            noteCtaUrl: photoNoteCtaUrl.value.trim()
        },
        guide: {
            copy: guideCopy.value.trim(),
            note: guideNote.value.trim()
        },
        schedule: {
            day1: { items: day1Items },
            day2: { items: day2Items }
        },
        map: {
            summary: mapSummary.value.trim(),
            embed: mapEmbed.value.trim(),
            spots
        },
        info: {
            items: collectRepeat(infoListAdmin),
            stay: {
                hotelName: stayName.value.trim(),
                stayText: stayText.value.trim(),
                venueText: stayVenueText.value.trim(),
                morningText: stayMorningText.value.trim()
            }
        },
        rsvp: {
            paragraphs: toLines(rsvpParagraphs)
        }
    });

    setStatus(saveStatus, '保存中...');
    const { error } = await supabaseClient
        .from('site_content')
        .upsert({
            slug: SITE_SLUG,
            data: next,
            updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
    if (error) {
        setStatus(saveStatus, '保存に失敗しました', true);
        return;
    }
    currentContent = next;
    setStatus(saveStatus, '保存しました');
}

document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.dataset.add;
        if (type === 'day1') {
            day1List.appendChild(createRepeatItem([
                createField('時間', 'time', ''),
                createField('タイトル', 'title', ''),
                createField('内容', 'text', '', true),
                createField('地図リンク', 'link', ''),
                createField('リンク表記', 'linkLabel', '')
            ]));
        }
        if (type === 'day2') {
            day2List.appendChild(createRepeatItem([
                createField('時間', 'time', ''),
                createField('タイトル', 'title', ''),
                createField('内容', 'text', '', true),
                createField('地図リンク', 'link', ''),
                createField('リンク表記', 'linkLabel', '')
            ]));
        }
        if (type === 'spot') {
            mapSpotList.appendChild(createRepeatItem([
                createField('ID', 'id', ''),
                createField('名前', 'name', ''),
                createField('徒歩', 'walk', ''),
                createField('雰囲気', 'vibe', ''),
                createField('紹介文', 'copy', '', true),
                createField('地図リンク', 'mapLink', ''),
                createField('経路リンク', 'routeLink', ''),
                createField('X位置(%)', 'x', ''),
                createField('Y位置(%)', 'y', ''),
                createField('タグ英', 'tagEn', ''),
                createField('タグ日', 'tagJa', '')
            ]));
        }
        if (type === 'info') {
            infoListAdmin.appendChild(createRepeatItem([
                createField('記号', 'mark', ''),
                createField('見出し', 'title', ''),
                createField('内容', 'text', '', true)
            ]));
        }
        if (type === 'route') {
            routeStepsList.appendChild(createRepeatItem([
                createField('ラベル英', 'labelEn', ''),
                createField('ラベル日', 'labelJa', ''),
                createField('タイトル', 'title', ''),
                createField('説明', 'text', '', true),
                createField('リンク', 'href', '')
            ]));
        }
    });
});

loginButton.addEventListener('click', async () => {
    if (!supabaseClient) {
        setStatus(loginStatus, 'Supabase設定が必要です', true);
        return;
    }
    setStatus(loginStatus, 'ログイン中...');
    const { error } = await supabaseClient.auth.signInWithPassword({
        email: loginEmail.value.trim(),
        password: loginPassword.value
    });
    if (error) {
        setStatus(loginStatus, 'ログインに失敗しました', true);
        return;
    }
    setStatus(loginStatus, 'ログインしました');
});

magicLinkButton.addEventListener('click', async () => {
    if (!supabaseClient) {
        setStatus(loginStatus, 'Supabase設定が必要です', true);
        return;
    }
    setStatus(loginStatus, '送信中...');
    const { error } = await supabaseClient.auth.signInWithOtp({
        email: loginEmail.value.trim(),
        options: { shouldCreateUser: false }
    });
    if (error) {
        setStatus(loginStatus, '送信に失敗しました', true);
        return;
    }
    setStatus(loginStatus, 'メールを送信しました');
});

logoutButton.addEventListener('click', async () => {
    if (!supabaseClient) {
        return;
    }
    await supabaseClient.auth.signOut();
});

saveButton.addEventListener('click', async () => {
    await saveContent();
});

async function init() {
    if (!supabaseClient) {
        showLogin();
        setStatus(loginStatus, 'Supabase設定が必要です', true);
        return;
    }

    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
        showEditor();
        await loadContent();
    } else {
        showLogin();
    }

    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session) {
            showEditor();
            await loadContent();
        } else {
            showLogin();
        }
    });
}

init();
