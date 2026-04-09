        const SUPABASE_URL = 'https://xkgxocdeunfowivmxyxn.supabase.co';
        const SUPABASE_ANON_KEY = 'sb_publishable_i3GaR312Iu2bPWP86-Qkbg_EDqgwYfI';
        const SITE_SLUG = 'kyoto-family-wedding-2026';
        const SUPABASE_BUCKET = 'wedi-assets';

        const ACCESS_STORAGE_KEY = 'wedi-family-access';
        const PASSWORD_HASH = '6e80596dbc1acf3059007f86ef034859ed10d002b5ad669a63c5e6d3765517e9';
        // Google Apps Script の Web アプリ URL を入れると、回答をスプレッドシートへ保存できます。
        const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxx7rtaTNA4sOcO4VUpcbQocG4oZm_nKrrT_67_Ec0qAZcyqaAEbFEJUSdclXK-AkV_/exec';
        const accessGate = document.getElementById('accessGate');
        const accessForm = document.getElementById('accessForm');
        const passwordInput = document.getElementById('sitePassword');
        const gateError = document.getElementById('gateError');

        const supabaseClient = (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase)
            ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
            : null;

        async function sha256(text) {
            const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
            return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
        }

        function unlockSite() {
            document.body.classList.remove('is-locked');
            accessGate.hidden = true;
        }

        const scrollMeter = document.getElementById('scrollMeter');

        function updateScrollMeter() {
            if (!scrollMeter) {
                return;
            }
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
            scrollMeter.style.width = `${(ratio * 100).toFixed(2)}%`;
        }

        if (localStorage.getItem(ACCESS_STORAGE_KEY) === PASSWORD_HASH) {
            unlockSite();
        } else {
            passwordInput.focus();
        }

        accessForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            gateError.textContent = '';

            const inputHash = await sha256(passwordInput.value.trim());
            if (inputHash === PASSWORD_HASH) {
                localStorage.setItem(ACCESS_STORAGE_KEY, PASSWORD_HASH);
                unlockSite();
                accessForm.reset();
                return;
            }

            gateError.textContent = 'パスワードが違います。もう一度お試しください。';
            passwordInput.select();
        });

        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (scrollTicking) {
                return;
            }
            scrollTicking = true;
            requestAnimationFrame(() => {
                updateScrollMeter();
                scrollTicking = false;
            });
        }, { passive: true });

        window.addEventListener('resize', updateScrollMeter);
        updateScrollMeter();

        const targetDate = new Date('2026-11-29T10:30:00+09:00');
        const countdownRoot = document.getElementById('countdown');
        const units = {
            days: countdownRoot.querySelector('[data-unit="days"]'),
            hours: countdownRoot.querySelector('[data-unit="hours"]'),
            minutes: countdownRoot.querySelector('[data-unit="minutes"]'),
            seconds: countdownRoot.querySelector('[data-unit="seconds"]')
        };

        function updateCountdown() {
            const now = new Date();
            const diff = Math.max(targetDate.getTime() - now.getTime(), 0);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            units.days.textContent = String(days).padStart(3, '0');
            units.hours.textContent = String(hours).padStart(2, '0');
            units.minutes.textContent = String(minutes).padStart(2, '0');
            units.seconds.textContent = String(seconds).padStart(2, '0');

            if (diff === 0) {
                clearInterval(countdownTimerId);
            }
        }

        const countdownTimerId = setInterval(updateCountdown, 1000);
        updateCountdown();

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -8% 0px'
        });

        document.querySelectorAll('.reveal').forEach((element) => {
            revealObserver.observe(element);
        });

        function observeReveal(element) {
            if (element && element.classList.contains('reveal')) {
                revealObserver.observe(element);
            }
        }

        function setText(id, value) {
            if (!value) {
                return;
            }
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value;
            }
        }

        function setMultilineText(id, value) {
            if (!value) {
                return;
            }
            const el = document.getElementById(id);
            if (!el) {
                return;
            }
            const lines = String(value).split('\n');
            el.innerHTML = '';
            lines.forEach((line, index) => {
                if (index > 0) {
                    el.appendChild(document.createElement('br'));
                }
                el.appendChild(document.createTextNode(line));
            });
        }

        function setRubyLabel(id, en, ja) {
            if (!en && !ja) {
                return;
            }
            const el = document.getElementById(id);
            if (!el) {
                return;
            }
            el.innerHTML = '';
            const ruby = document.createElement('ruby');
            ruby.className = 'bilingual';
            ruby.appendChild(document.createTextNode(en || ja || ''));
            if (ja) {
                const rt = document.createElement('rt');
                rt.textContent = ja;
                ruby.appendChild(rt);
            }
            el.appendChild(ruby);
        }

        function renderParagraphs(containerId, paragraphs) {
            const container = document.getElementById(containerId);
            if (!container || !Array.isArray(paragraphs) || paragraphs.length === 0) {
                return;
            }
            container.innerHTML = '';
            paragraphs.forEach((paragraph) => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                container.appendChild(p);
            });
        }

        function renderTimeline(containerId, items) {
            const container = document.getElementById(containerId);
            if (!container || !Array.isArray(items) || items.length === 0) {
                return;
            }
            container.innerHTML = '';
            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'timeline-item reveal';
                card.dataset.tilt = index % 2 === 0 ? 'right' : 'left';

                const time = document.createElement('span');
                time.className = 'time txt-en';
                time.textContent = item.time || '';

                const body = document.createElement('div');
                const title = document.createElement('h3');
                title.className = 'content-title';
                title.textContent = item.title || '';
                body.appendChild(title);

                if (item.text) {
                    const text = document.createElement('p');
                    text.className = 'content-txt';
                    text.textContent = item.text;
                    body.appendChild(text);
                }

                if (item.link) {
                    const link = document.createElement('a');
                    link.className = 'map-link txt-en';
                    link.href = item.link;
                    link.target = '_blank';
                    link.rel = 'noreferrer';
                    link.textContent = item.linkLabel || '地図を見る';
                    body.appendChild(link);
                }

                card.appendChild(time);
                card.appendChild(body);
                container.appendChild(card);
                observeReveal(card);
            });
        }

        function renderRouteSteps(steps) {
            const container = document.getElementById('routeSteps');
            if (!container || !Array.isArray(steps) || steps.length === 0) {
                return;
            }
            container.innerHTML = '';
            steps.forEach((step, index) => {
                const anchor = document.createElement('a');
                anchor.className = 'route-step';
                anchor.href = step.href || '#';
                anchor.dataset.step = String(index + 1).padStart(2, '0');

                const small = document.createElement('small');
                small.className = 'txt-en';
                const ruby = document.createElement('ruby');
                ruby.className = 'bilingual';
                ruby.appendChild(document.createTextNode(step.labelEn || step.labelJa || ''));
                if (step.labelJa) {
                    const rt = document.createElement('rt');
                    rt.textContent = step.labelJa;
                    ruby.appendChild(rt);
                }
                small.appendChild(ruby);

                const strong = document.createElement('strong');
                strong.textContent = step.title || '';

                const span = document.createElement('span');
                span.textContent = step.text || '';

                anchor.appendChild(small);
                anchor.appendChild(strong);
                anchor.appendChild(span);
                container.appendChild(anchor);
            });
        }

        function renderInfoList(items) {
            const container = document.getElementById('infoList');
            if (!container || !Array.isArray(items) || items.length === 0) {
                return;
            }
            container.innerHTML = '';
            items.forEach((item) => {
                const li = document.createElement('li');
                li.dataset.mark = item.mark || '';
                const strong = document.createElement('span');
                strong.className = 'txt-bold';
                strong.textContent = item.title ? `${item.title}：` : '';
                li.appendChild(strong);
                if (item.text) {
                    li.appendChild(document.createTextNode(` ${item.text}`));
                }
                container.appendChild(li);
            });
        }

        function buildCaption(figure, caption) {
            if (!caption) {
                return;
            }
            const figcaption = document.createElement('figcaption');
            figcaption.className = 'txt-en';
            const ruby = document.createElement('ruby');
            ruby.className = 'bilingual';
            const enText = caption.en || caption.ja || '';
            const jaText = caption.ja || '';
            ruby.appendChild(document.createTextNode(enText));
            if (jaText) {
                const rt = document.createElement('rt');
                rt.textContent = jaText;
                ruby.appendChild(rt);
            }
            figcaption.appendChild(ruby);
            figure.appendChild(figcaption);
        }

        function applyImageToFigure(figure, item) {
            if (!figure || !item || !item.src) {
                return;
            }
            figure.classList.remove('photo-placeholder', 'gallery-placeholder');
            figure.innerHTML = '';
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt || '';
            figure.appendChild(img);
            if (item.captionEn || item.captionJa) {
                buildCaption(figure, { en: item.captionEn, ja: item.captionJa });
            }
        }

        function updateFigureSet(attrName, items) {
            if (!Array.isArray(items)) {
                return;
            }
            items.forEach((item, index) => {
                const figure = document.querySelector(`[${attrName}="${index + 1}"]`);
                if (figure) {
                    applyImageToFigure(figure, item);
                }
            });
        }

        function updateMapSpots(spots) {
            if (!Array.isArray(spots) || spots.length === 0) {
                return;
            }
            const mapFigure = document.getElementById('freewalkMap');
            const spotList = document.getElementById('spotList');
            if (!mapFigure || !spotList) {
                return;
            }

            mapFigure.querySelectorAll('.map-spot').forEach((spot) => spot.remove());
            spotList.innerHTML = '';

            spots.forEach((spot) => {
                const spotBtn = document.createElement('button');
                spotBtn.type = 'button';
                spotBtn.className = 'map-spot';
                spotBtn.dataset.spot = spot.id;
                spotBtn.dataset.name = spot.name || '';
                spotBtn.style.left = spot.x || '50%';
                spotBtn.style.top = spot.y || '50%';
                mapFigure.appendChild(spotBtn);

                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'spot-card';
                card.dataset.spot = spot.id;
                card.dataset.mapLink = spot.mapLink || '';
                card.dataset.routeLink = spot.routeLink || '';
                card.dataset.walk = spot.walk || '';
                card.dataset.vibe = spot.vibe || '';

                const strong = document.createElement('strong');
                strong.textContent = spot.name || '';
                card.appendChild(strong);

                if (spot.copy) {
                    const copy = document.createElement('p');
                    copy.textContent = spot.copy;
                    card.appendChild(copy);
                }

                if (spot.tagEn || spot.tagJa || spot.tag) {
                    const small = document.createElement('small');
                    small.className = 'txt-en';
                    if (spot.tagEn || spot.tagJa) {
                        const ruby = document.createElement('ruby');
                        ruby.className = 'bilingual';
                        ruby.appendChild(document.createTextNode(spot.tagEn || spot.tagJa || ''));
                        if (spot.tagJa) {
                            const rt = document.createElement('rt');
                            rt.textContent = spot.tagJa;
                            ruby.appendChild(rt);
                        }
                        small.appendChild(ruby);
                    } else {
                        small.textContent = spot.tag;
                    }
                    card.appendChild(small);
                }

                spotList.appendChild(card);
            });

            const firstSpot = spots[0];
            if (firstSpot) {
                activateSpot(firstSpot.id);
            }
        }

        async function loadRemoteContent() {
            if (!supabaseClient) {
                return;
            }
            const { data, error } = await supabaseClient
                .from('site_content')
                .select('data')
                .eq('slug', SITE_SLUG)
                .maybeSingle();
            if (error || !data) {
                return;
            }
            const content = data.data || data;
            applyContent(content);
        }

        function applyContent(content) {
            if (!content) {
                return;
            }

            if (content.invitation) {
                renderParagraphs('invitationCopy', content.invitation.paragraphs);
                setText('invitationMetaCeremony', content.invitation.ceremony);
                setText('invitationMetaVenue', content.invitation.venue);
                setText('invitationMetaHotel', content.invitation.hotel);
            }

            if (content.masthead) {
                setText('mastheadSub', content.masthead.sub);
            }

            if (content.start) {
                setText('routeTitle', content.start.title);
                setText('routeCopy', content.start.copy);
                renderRouteSteps(content.start.steps);
            }

            if (content.countdown) {
                setText('countdownTarget', content.countdown.target);
            }

            if (content.photos) {
                updateFigureSet('data-photo-slot', content.photos.wall);
                updateFigureSet('data-gallery-slot', content.photos.gallery);
                setMultilineText('photoNoteText', content.photos.note);
                setRubyLabel('photoNoteCta', content.photos.noteCtaEn, content.photos.noteCtaJa);
                if (content.photos.noteCtaUrl) {
                    const cta = document.getElementById('photoNoteCta');
                    if (cta) {
                        cta.href = content.photos.noteCtaUrl;
                    }
                }
            }

            if (content.guide) {
                setText('guideCopy', content.guide.copy);
                setText('guideNote', content.guide.note);
            }

            if (content.schedule) {
                if (content.schedule.day1?.items) {
                    renderTimeline('day1Timeline', content.schedule.day1.items);
                }
                if (content.schedule.day2?.items) {
                    renderTimeline('day2Timeline', content.schedule.day2.items);
                }
            }

            if (content.map) {
                setText('mapSummary', content.map.summary);
                if (content.map.embed) {
                    const mapEmbed = document.getElementById('mapEmbed');
                    if (mapEmbed) {
                        mapEmbed.src = content.map.embed;
                    }
                }
                updateMapSpots(content.map.spots);
            }

            if (content.info) {
                renderInfoList(content.info.items);
                if (content.info.stay) {
                    setText('stayName', content.info.stay.hotelName);
                    setText('stayMetaStay', content.info.stay.stayText);
                    setText('stayMetaVenue', content.info.stay.venueText);
                    setText('stayMetaMorning', content.info.stay.morningText);
                }
            }

            if (content.rsvp?.paragraphs) {
                renderParagraphs('rsvpCopy', content.rsvp.paragraphs);
            }
        }

        const mapDetailTitle = document.getElementById('mapDetailTitle');
        const mapDetailWalk = document.getElementById('mapDetailWalk');
        const mapDetailVibe = document.getElementById('mapDetailVibe');
        const mapDetailCopy = document.getElementById('mapDetailCopy');
        const mapDetailLink = document.getElementById('mapDetailLink');
        const mapRouteLink = document.getElementById('mapRouteLink');

        function activateSpot(spotId) {
            const spotCards = Array.from(document.querySelectorAll('.spot-card'));
            const mapSpots = Array.from(document.querySelectorAll('.map-spot'));

            spotCards.forEach((card) => {
                card.classList.toggle('is-active', card.dataset.spot === spotId);
            });

            mapSpots.forEach((spot) => {
                spot.classList.toggle('is-active', spot.dataset.spot === spotId);
            });

            const activeCard = spotCards.find((card) => card.dataset.spot === spotId);
            if (!activeCard) {
                return;
            }

            mapDetailTitle.textContent = activeCard.querySelector('strong')?.textContent ?? '';
            mapDetailWalk.textContent = activeCard.dataset.walk ?? '';
            mapDetailVibe.textContent = activeCard.dataset.vibe ?? '';
            mapDetailCopy.textContent = activeCard.querySelector('p')?.textContent ?? '';
            mapDetailLink.href = activeCard.dataset.mapLink ?? '#';
            mapRouteLink.href = activeCard.dataset.routeLink ?? '#';
        }

        const spotList = document.getElementById('spotList');
        const mapFigure = document.getElementById('freewalkMap');

        if (spotList) {
            spotList.addEventListener('click', (event) => {
                const card = event.target.closest('.spot-card');
                if (!card) {
                    return;
                }
                activateSpot(card.dataset.spot);
            });
        }

        if (mapFigure) {
            mapFigure.addEventListener('click', (event) => {
                const spot = event.target.closest('.map-spot');
                if (!spot) {
                    return;
                }
                activateSpot(spot.dataset.spot);
                const linkedCard = spotList?.querySelector(`.spot-card[data-spot="${spot.dataset.spot}"]`);
                linkedCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }

        const mapToggleButtons = Array.from(document.querySelectorAll('.map-toggle-btn'));
        const mapPanels = Array.from(document.querySelectorAll('[data-map-panel]'));

        function setMapPanel(target) {
            mapToggleButtons.forEach((button) => {
                button.classList.toggle('is-active', button.dataset.mapTarget === target);
            });

            mapPanels.forEach((panel) => {
                panel.hidden = panel.dataset.mapPanel !== target;
            });
        }

        mapToggleButtons.forEach((button) => {
            button.addEventListener('click', () => {
                setMapPanel(button.dataset.mapTarget);
            });
        });

        if (mapToggleButtons.length && mapPanels.length) {
            setMapPanel('paper');
        }

        loadRemoteContent();

        const rsvpForm = document.getElementById('rsvpForm');
        const rsvpStatus = document.getElementById('rsvpStatus');
        const memberList = document.getElementById('memberList');
        const memberTemplate = document.getElementById('memberTemplate');
        const addMemberButton = document.getElementById('addMemberButton');

        function refreshMemberLabels() {
            Array.from(memberList.children).forEach((memberCard, index) => {
                const number = index + 1;
                memberCard.querySelector('.member-card-head strong').textContent = `メンバー ${number}`;

                memberCard.querySelectorAll('.member-attendance-input').forEach((input) => {
                    input.name = `memberAttendance${number}`;
                });

                memberCard.querySelectorAll('.member-allergy-toggle').forEach((input) => {
                    input.name = `memberAllergy${number}`;
                });
            });
        }

        function bindMemberCard(memberCard) {
            const removeButton = memberCard.querySelector('.member-remove');
            const allergyDetail = memberCard.querySelector('.allergy-detail');
            const allergyToggleInputs = memberCard.querySelectorAll('.member-allergy-toggle');

            removeButton.addEventListener('click', () => {
                if (memberList.children.length === 1) {
                    return;
                }
                memberCard.remove();
                refreshMemberLabels();
            });

            allergyToggleInputs.forEach((input) => {
                input.addEventListener('change', () => {
                    const shouldShow = input.value === 'あり' && input.checked;
                    allergyDetail.hidden = !shouldShow;
                    if (!shouldShow) {
                        allergyDetail.querySelector('textarea').value = '';
                    }
                });
            });
        }

        function addMember(initialValues = {}) {
            const memberCard = memberTemplate.content.firstElementChild.cloneNode(true);
            memberCard.querySelector('.member-name-input').value = initialValues.name || '';

            const attendanceInputs = memberCard.querySelectorAll('.member-attendance-input');
            const allergyInputs = memberCard.querySelectorAll('.member-allergy-toggle');
            const allergyDetail = memberCard.querySelector('.allergy-detail');
            const allergyDetailInput = memberCard.querySelector('.member-allergy-detail-input');

            attendanceInputs.forEach((input) => {
                input.checked = input.value === (initialValues.attendance || '参加');
            });

            allergyInputs.forEach((input) => {
                input.checked = input.value === (initialValues.allergyStatus || 'なし');
            });

            if (initialValues.allergyStatus === 'あり') {
                allergyDetail.hidden = false;
                allergyDetailInput.value = initialValues.allergyDetail || '';
            }

            bindMemberCard(memberCard);
            memberList.appendChild(memberCard);
            refreshMemberLabels();
        }

        addMemberButton.addEventListener('click', () => {
            addMember();
        });

        addMember({ name: '', attendance: '参加', allergyStatus: 'なし', allergyDetail: '' });

        rsvpForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!FORM_ENDPOINT) {
                rsvpStatus.textContent = 'ただいま回答フォームの準備中です。時間をおいてもう一度お試しください。';
                rsvpStatus.classList.remove('is-success');
                return;
            }

            const formData = new FormData(rsvpForm);
            const members = Array.from(memberList.children).map((memberCard) => {
                const selectedAttendance = memberCard.querySelector('.member-attendance-input:checked');
                const selectedAllergy = memberCard.querySelector('.member-allergy-toggle:checked');
                return {
                    name: memberCard.querySelector('.member-name-input').value.trim(),
                    attendance: selectedAttendance ? selectedAttendance.value : '',
                    allergyStatus: selectedAllergy ? selectedAllergy.value : '',
                    allergyDetail: memberCard.querySelector('.member-allergy-detail-input').value.trim()
                };
            });

            const payload = {
                householdName: formData.get('householdName'),
                contact: formData.get('contact'),
                householdMemo: formData.get('householdMemo'),
                message: formData.get('message'),
                members,
                submittedAt: new Date().toISOString()
            };

            const bodyParams = new URLSearchParams();
            Object.entries(payload).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    bodyParams.append(key, JSON.stringify(value));
                } else if (value != null) {
                    bodyParams.append(key, String(value));
                }
            });

            rsvpStatus.textContent = '送信中です...';
            rsvpStatus.classList.remove('is-success');

            try {
                await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: bodyParams,
                    mode: 'no-cors'
                });

                rsvpForm.reset();
                rsvpStatus.textContent = '送信ありがとうございました。内容を受け取りました。';
                rsvpStatus.classList.add('is-success');
                memberList.innerHTML = '';
                addMember({ name: '', attendance: '参加', allergyStatus: 'なし', allergyDetail: '' });
            } catch (error) {
                rsvpStatus.textContent = '送信できませんでした。時間をおいて再度お試しください。';
                rsvpStatus.classList.remove('is-success');
            }
        });

        if (window.matchMedia('(pointer:fine)').matches) {
            document.querySelectorAll('.photo-piece, .spot-card, .member-card, .gallery-card').forEach((card) => {
                card.addEventListener('pointermove', (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                    const y = (event.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `translate(${(x * 6).toFixed(2)}px, ${(y * 6).toFixed(2)}px)`;
                });

                card.addEventListener('pointerleave', () => {
                    card.style.transform = '';
                });
            });
        }
