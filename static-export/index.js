(function () {
  const STORAGE_KEY = 'com_nd_lavi_posters_v7';
  const NO_OFFSETS = [
    { x: 64, y: -50 },
    { x: -92, y: 46 },
    { x: 70, y: 52 },
    { x: -84, y: -52 },
  ];
  const MAX_NO_CLICKS = 4;

  const DEFAULT_PROFILES = {
    com: {
      id: 'com',
      discordUserId: '1561715349911507046',
      fallbackUsername: '764sa',
      name: 'com',
      caption: 'i love lavi',
      photoDataUrl: './assets/aistudio/1e6b927f5877add71dd4deec48ab0716_d965cf8f.jpg',
    },
    lavi: {
      id: 'lavi',
      discordUserId: '1458715644379009135',
      fallbackUsername: 'm7za',
      name: 'lavi',
      caption: 'i love com',
      photoDataUrl: './assets/aistudio/IMG_20261123_150435_b4cd3e5b.jpg',
    },
  };

  const DISCORD_BANNER_PATH = './assets/aistudio/image_89b2f9de.png';

  const POSTER_STATUS_META = {
    online: { label: 'online', dotClass: 'dot-online' },
    idle: { label: 'idle', dotClass: 'dot-idle' },
    dnd: { label: 'do not disturb', dotClass: 'dot-dnd' },
    offline: { label: 'offline', dotClass: 'dot-offline' },
  };

  const DC_STATUS_CONFIG = {
    online: { label: 'Online', dotClass: 'dot-online' },
    idle: { label: 'Idle', dotClass: 'dot-idle' },
    dnd: { label: 'Do Not Disturb', dotClass: 'dot-dnd' },
    offline: { label: 'Offline', dotClass: 'dot-offline' },
  };

  const PLAY_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:2px" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>';
  const PAUSE_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect></svg>';
  const VOL_ON_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>';
  const VOL_MUTE_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>';
  const CAMERA_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>';
  const HELLO_KITTY_DECO_SVG = `
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" class="hk-deco">
      <circle cx="60" cy="62" r="43" stroke="#F9A8D4" stroke-width="3.2" stroke-dasharray="3 3" stroke-linecap="round" />
      <circle cx="60" cy="62" r="40.5" stroke="#FFFFFF" stroke-width="1.6" opacity="0.9" />
      <path d="M27 36 C23 23 23 15 26 13 C30 12 37 18 42 25 Z" fill="#FFFFFF" stroke="#8C4A5E" stroke-width="2" stroke-linejoin="round" />
      <path d="M29 31 C27 24 27 19 28.5 18 C31 17.5 34.5 21 37.5 25.5 Z" fill="#FCE7F3" />
      <path d="M93 36 C97 23 97 15 94 13 C90 12 83 18 78 25 Z" fill="#FFFFFF" stroke="#8C4A5E" stroke-width="2" stroke-linejoin="round" />
      <path d="M91 31 C93 24 93 19 91.5 18 C89 17.5 85.5 21 82.5 25.5 Z" fill="#FCE7F3" />
      <g transform="translate(86 24) rotate(18)">
        <ellipse cx="-8.5" cy="0" rx="7.5" ry="5.8" fill="#FB7185" stroke="#8C4A5E" stroke-width="1.8" />
        <ellipse cx="8.5" cy="0" rx="7.5" ry="5.8" fill="#FB7185" stroke="#8C4A5E" stroke-width="1.8" />
        <circle cx="-7" cy="-1.2" r="2" fill="#FDA4AF" opacity="0.7" />
        <circle cx="7" cy="-1.2" r="2" fill="#FDA4AF" opacity="0.7" />
        <circle cx="0" cy="0" r="4.2" fill="#F43F5E" stroke="#8C4A5E" stroke-width="1.8" />
      </g>
      <g transform="translate(24 90) rotate(-12)">
        <path d="M-8 -2 C-10 -6 -10 -10 -9 -11 C-7.5 -11 -4.5 -8.5 -3 -6.5 C-1 -7 1 -7 3 -6.5 C4.5 -8.5 7.5 -11 9 -11 C10 -10 10 -6 8 -2 C9.5 -0.5 10 1.5 10 3.2 C10 7 5.5 10 0 10 C-5.5 10 -10 7 -10 3.2 C-10 1.5 -9.5 -0.5 -8 -2 Z" fill="#FFFFFF" stroke="#8C4A5E" stroke-width="1.4" stroke-linejoin="round" />
        <ellipse cx="4.2" cy="-7" rx="2.2" ry="1.7" transform="rotate(-20 4.2 -7)" fill="#FB7185" stroke="#8C4A5E" stroke-width="0.9" />
        <ellipse cx="8.2" cy="-5.5" rx="2.2" ry="1.7" transform="rotate(-20 8.2 -5.5)" fill="#FB7185" stroke="#8C4A5E" stroke-width="0.9" />
        <circle cx="6.2" cy="-6.2" r="1.2" fill="#F43F5E" stroke="#8C4A5E" stroke-width="0.9" />
        <ellipse cx="-3.8" cy="2" rx="1" ry="1.4" fill="#5C2D3D" />
        <ellipse cx="3.8" cy="2" rx="1" ry="1.4" fill="#5C2D3D" />
        <ellipse cx="0" cy="3.8" rx="1.4" ry="0.95" fill="#FBBF24" stroke="#8C4A5E" stroke-width="0.6" />
        <path d="M-11 0.5 L-7.5 1.5 M-11.5 3 L-7.8 3 M-10.8 5.5 L-7.2 4.5 M11 0.5 L7.5 1.5 M11.5 3 L7.8 3 M10.8 5.5 L7.2 4.5" stroke="#8C4A5E" stroke-width="1" stroke-linecap="round" />
      </g>
      <path d="M17 58 C17 58 12.5 54.8 12.5 51.8 C12.5 50.3 13.7 49.2 15.1 49.2 C16 49.2 16.6 49.7 17 50.3 C17.4 49.7 18 49.2 18.9 49.2 C20.3 49.2 21.5 50.3 21.5 51.8 C21.5 54.8 17 58 17 58 Z" fill="#FB7185" stroke="#FFFFFF" stroke-width="1.2" />
      <path d="M103 70 L104.4 73.6 L108 75 L104.4 76.4 L103 80 L101.6 76.4 L98 75 L101.6 73.6 Z" fill="#FFFFFF" stroke="#F472B6" stroke-width="1.1" />
      <path d="M54 15 L55 17.5 L57.5 18.5 L55 19.5 L54 22 L53 19.5 L50.5 18.5 L53 17.5 Z" fill="#FFFFFF" stroke="#F472B6" stroke-width="1" />
    </svg>`;

  const state = {
    profiles: loadProfiles(),
    dataById: {},
    loading: true,
    activePage: 'colavi',
    noClicks: 0,
    isLetterOpen: false,
  };

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function loadProfiles() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          com: { ...DEFAULT_PROFILES.com, ...(parsed.com || {}) },
          lavi: { ...DEFAULT_PROFILES.lavi, ...(parsed.lavi || {}) },
        };
      }
    } catch (_) {}
    return {
      com: { ...DEFAULT_PROFILES.com },
      lavi: { ...DEFAULT_PROFILES.lavi },
    };
  }

  function saveProfiles() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profiles));
    } catch (_) {}
  }

  function seededRandom(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function initAmbientFx() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heartsHost = document.getElementById('floating-hearts');
    const heartColors = ['#FDA4AF', '#FECDD3', '#FB7185', '#F9A8D4'];
    const hRand = seededRandom(20261124);

    for (let i = 0; i < 18; i++) {
      const dur = 13 + hRand() * 10;
      const delay = -(hRand() * dur);
      const size = 11 + Math.round(hRand() * 11);
      const sway = (hRand() > 0.5 ? 1 : -1) * (14 + Math.round(hRand() * 22));
      const rotStart = Math.round((hRand() - 0.5) * 24);
      const rotEnd = Math.round((hRand() - 0.5) * 32);
      const opacity = 0.24 + hRand() * 0.24;
      const color = heartColors[Math.floor(hRand() * heartColors.length)];
      const outline = hRand() > 0.62;

      const span = document.createElement('span');
      span.className = 'floating-heart-item';
      span.style.left = `${4 + hRand() * 92}%`;
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      span.style.animationDuration = `${dur.toFixed(2)}s`;
      span.style.animationDelay = `${delay.toFixed(2)}s`;
      span.style.setProperty('--heart-sway', `${sway}px`);
      span.style.setProperty('--heart-rot-start', `${rotStart}deg`);
      span.style.setProperty('--heart-rot-end', `${rotEnd}deg`);
      span.style.setProperty('--heart-opacity', opacity.toFixed(2));
      span.innerHTML = `<svg viewBox="0 0 24 24" style="width:100%;height:100%" fill="${
        outline ? 'none' : color
      }" stroke="${outline ? color : 'rgba(255,255,255,0.7)'}" stroke-width="${
        outline ? 1.8 : 0.9
      }"><path d="M12 20.4c-.35 0-.7-.12-.98-.35C7.1 16.8 3.5 13.55 3.5 9.2 3.5 6.4 5.68 4.25 8.4 4.25c1.52 0 2.93.72 3.6 1.82.67-1.1 2.08-1.82 3.6-1.82 2.72 0 4.9 2.15 4.9 4.95 0 4.35-3.6 7.6-7.52 10.85-.28.23-.63.35-.98.35Z"/></svg>`;
      heartsHost.appendChild(span);
    }

    const petalsHost = document.getElementById('cherry-blossoms');
    const palette = [
      { fill: '#FBCFE8', stroke: 'rgba(244, 114, 182, 0.35)' },
      { fill: '#FCE7F3', stroke: 'rgba(249, 168, 212, 0.45)' },
      { fill: '#FECDD3', stroke: 'rgba(251, 113, 133, 0.3)' },
      { fill: '#FFF1F2', stroke: 'rgba(253, 164, 175, 0.45)' },
      { fill: '#F9A8D4', stroke: 'rgba(244, 114, 182, 0.3)' },
    ];
    const pRand = seededRandom(20261125);

    for (let i = 0; i < 20; i++) {
      const dur = 11 + pRand() * 9;
      const delay = -(pRand() * dur);
      const sizeBase = 10 + Math.round(pRand() * 9);
      const pal = palette[Math.floor(pRand() * palette.length)];
      const drift = (pRand() > 0.3 ? 1 : -1) * (28 + Math.round(pRand() * 52));
      const rotStart = Math.round(pRand() * 360);
      const rotEnd = Math.round(pRand() * 360) + (pRand() > 0.5 ? 240 : -240);
      const opacity = 0.44 + pRand() * 0.3;

      const span = document.createElement('span');
      span.className = 'sakura-petal-item';
      span.style.left = `${2 + pRand() * 96}%`;
      span.style.width = `${sizeBase}px`;
      span.style.height = `${Math.round(sizeBase * 1.28)}px`;
      span.style.animationDuration = `${dur.toFixed(2)}s`;
      span.style.animationDelay = `${delay.toFixed(2)}s`;
      span.style.setProperty('--petal-drift', `${drift}px`);
      span.style.setProperty('--petal-rot-start', `${rotStart}deg`);
      span.style.setProperty('--petal-rot-end', `${rotEnd}deg`);
      span.style.setProperty('--petal-opacity', opacity.toFixed(2));
      span.innerHTML = `<svg viewBox="0 0 24 30" style="width:100%;height:100%" fill="none"><path d="M12 28 C10.8 25.5 4.2 19.8 4 12.2 C3.8 6.8 6.9 2.4 9.6 2.1 C10.9 2 11.6 3.5 12 5.1 C12.4 3.5 13.1 2 14.4 2.1 C17.1 2.4 20.2 6.8 20 12.2 C19.8 19.8 13.2 25.5 12 28 Z" fill="${pal.fill}" stroke="${pal.stroke}" stroke-width="0.9"/><path d="M12 25.5 C11.9 20.5 11.9 15.5 12 9.5" stroke="rgba(255, 255, 255, 0.65)" stroke-width="0.8" stroke-linecap="round"/></svg>`;
      petalsHost.appendChild(span);
    }
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function getDiscordAvatarUrl(userId, avatarHash) {
    if (!avatarHash) return null;
    const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=512`;
  }

  function getPresenceLine(lanyard) {
    if (!lanyard) return null;
    if (lanyard.listening_to_spotify && lanyard.spotify) {
      return `listening to ${lanyard.spotify.song} · ${lanyard.spotify.artist}`;
    }
    const activities = Array.isArray(lanyard.activities) ? lanyard.activities : [];
    const primary = activities.find((a) => a.type !== 4);
    const custom = activities.find((a) => a.type === 4 && a.state);
    if (primary) {
      const verb =
        primary.type === 1
          ? 'streaming'
          : primary.type === 2
          ? 'listening to'
          : primary.type === 3
          ? 'watching'
          : 'playing';
      const base = `${verb} ${primary.name}`;
      return custom && custom.state ? `${custom.state} · ${base}` : base;
    }
    if (custom && custom.state) return custom.state;
    return null;
  }

  function renderPosters() {
    const container = document.getElementById('posters-container');
    if (!container) return;

    const list = [state.profiles.com, state.profiles.lavi];
    container.innerHTML = list
      .map((profile, index) => {
        const lanyard = state.dataById[profile.discordUserId];
        const status = (lanyard && lanyard.discord_status) || 'offline';
        const statusInfo = POSTER_STATUS_META[status] || POSTER_STATUS_META.offline;
        const username =
          (lanyard && lanyard.discord_user && lanyard.discord_user.username) ||
          profile.fallbackUsername;
        const displayName =
          (lanyard &&
            lanyard.discord_user &&
            (lanyard.discord_user.global_name || lanyard.discord_user.display_name)) ||
          null;
        const discordAvatarUrl = getDiscordAvatarUrl(
          profile.discordUserId,
          lanyard && lanyard.discord_user && lanyard.discord_user.avatar
        );
        const portraitSrc = profile.photoDataUrl || discordAvatarUrl;
        const presenceLine = getPresenceLine(lanyard);
        const sideClass = index === 0 ? 'poster-card--left' : 'poster-card--right';

        return `
          <article class="poster-card ${sideClass}">
            <input
              type="file"
              accept="image/*"
              class="hidden"
              data-upload-id="${profile.id}"
              aria-label="Upload photo for ${escapeHtml(profile.name)}"
            />
            <div class="poster-top">
              <span>${index === 0 ? 'no. i' : 'no. ii'}</span>
              <span class="poster-status">
                <span class="status-dot ${statusInfo.dotClass}" aria-hidden="true"></span>
                <span>${statusInfo.label}</span>
              </span>
            </div>

            <button
              type="button"
              class="poster-frame"
              data-trigger-upload="${profile.id}"
              aria-label="Upload photo for ${escapeHtml(profile.name)} poster"
            >
              ${
                portraitSrc
                  ? `<img src="${escapeHtml(portraitSrc)}" alt="${escapeHtml(profile.name)} (@${escapeHtml(
                      username
                    )}) profile picture" referrerpolicy="no-referrer" data-fallback-avatar="${escapeHtml(
                      discordAvatarUrl || ''
                    )}" />`
                  : `<span class="poster-fallback">
                      <svg width="54" height="54" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="18" r="7.5" stroke="currentColor" stroke-width="1.3"></circle>
                        <path d="M11 39C11 32.3726 16.8203 27 24 27C31.1797 27 37 32.3726 37 39" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>
                      </svg>
                      <span class="poster-fallback-name">${escapeHtml(profile.name)}</span>
                    </span>`
              }
              <span class="poster-upload-overlay">
                <span class="poster-upload-badge">${CAMERA_SVG}<span>Change Photo</span></span>
              </span>
            </button>

            <div class="poster-footer">
              <h2 class="poster-name">${escapeHtml(profile.name)}</h2>
              <p class="poster-handle">
                <span>@${escapeHtml(username)}</span>
                ${
                  displayName
                    ? `<span class="dot-sep" aria-hidden="true">·</span><span>${escapeHtml(
                        displayName
                      )}</span>`
                    : ''
                }
              </p>
              <p class="poster-caption">${escapeHtml(profile.caption)}</p>
              <div class="poster-presence-wrap">
                <p class="poster-presence" title="${escapeHtml(
                  presenceLine || statusInfo.label
                )}">${escapeHtml(presenceLine || statusInfo.label)}</p>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    container.querySelectorAll('[data-trigger-upload]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-trigger-upload');
        const input = container.querySelector(`input[data-upload-id="${id}"]`);
        if (input) input.click();
      });
    });

    container.querySelectorAll('input[data-upload-id]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const id = input.getAttribute('data-upload-id');
        const file = e.target.files && e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
          e.target.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string' && state.profiles[id]) {
            state.profiles[id].photoDataUrl = reader.result;
            saveProfiles();
            renderPosters();
          }
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      });
    });

    container.querySelectorAll('.poster-frame img').forEach((img) => {
      img.addEventListener('error', () => {
        const fallback = img.getAttribute('data-fallback-avatar');
        if (fallback && img.getAttribute('src') !== fallback) {
          img.setAttribute('src', fallback);
        } else {
          img.style.display = 'none';
        }
      });
    });
  }

  function renderDiscordCards() {
    const container = document.getElementById('discord-cards-container');
    if (!container) return;

    const list = [state.profiles.lavi, state.profiles.com];
    container.innerHTML = list
      .map((profile, index) => {
        const lanyard = state.dataById[profile.discordUserId];
        const status = (lanyard && lanyard.discord_status) || 'offline';
        const statusInfo = DC_STATUS_CONFIG[status] || DC_STATUS_CONFIG.offline;
        const username =
          (lanyard && lanyard.discord_user && lanyard.discord_user.username) ||
          profile.fallbackUsername;
        const displayName =
          (lanyard &&
            lanyard.discord_user &&
            (lanyard.discord_user.global_name || lanyard.discord_user.display_name)) ||
          profile.name;
        const avatarUrl = getDiscordAvatarUrl(
          profile.discordUserId,
          lanyard && lanyard.discord_user && lanyard.discord_user.avatar
        );
        const activities = (lanyard && lanyard.activities) || [];
        const customStatus = activities.find((a) => a.type === 4 && a.state);
        const richActivities = activities.filter((a) => a.type !== 4);

        let platformsHtml = '';
        if (lanyard) {
          const icons = [];
          if (lanyard.active_on_discord_desktop) {
            icons.push(
              '<span title="Active on Desktop" aria-label="Active on Desktop"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg></span>'
            );
          }
          if (lanyard.active_on_discord_mobile) {
            icons.push(
              '<span title="Active on Mobile" aria-label="Active on Mobile"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg></span>'
            );
          }
          if (lanyard.active_on_discord_web) {
            icons.push(
              '<span title="Active on Web" aria-label="Active on Web"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg></span>'
            );
          }
          if (icons.length) {
            platformsHtml = `<div class="dc-platforms">${icons.join('')}</div>`;
          }
        }

        const customStatusHtml =
          customStatus && customStatus.state
            ? `<div class="dc-custom-status">
                <p class="dc-label-muted">Custom status</p>
                <p class="dc-quote" title="${escapeHtml(customStatus.state)}">“${escapeHtml(
                customStatus.state
              )}”</p>
              </div>`
            : '';

        const spotifyHtml =
          lanyard && lanyard.listening_to_spotify && lanyard.spotify
            ? `<div class="dc-activity-box">
                ${
                  lanyard.spotify.album_art_url
                    ? `<img class="dc-album-art" src="${escapeHtml(
                        lanyard.spotify.album_art_url
                      )}" alt="${escapeHtml(
                        lanyard.spotify.album
                      )}" referrerpolicy="no-referrer" />`
                    : `<div class="dc-act-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></div>`
                }
                <div class="dc-act-text">
                  <p class="dc-spotify-tag">Listening to Spotify</p>
                  <p class="dc-act-title">${escapeHtml(lanyard.spotify.song)}</p>
                  <p class="dc-act-sub">${escapeHtml(lanyard.spotify.artist)}</p>
                </div>
              </div>`
            : '';

        const richHtml = richActivities
          .slice(0, 1)
          .map((act) => {
            const isStream = act.type === 1;
            const label = isStream
              ? 'Streaming'
              : act.type === 2
              ? 'Listening'
              : act.type === 3
              ? 'Watching'
              : 'Playing';
            const icon = isStream
              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>'
              : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg>';
            return `
              <div class="dc-activity-box">
                <div class="dc-act-icon">${icon}</div>
                <div class="dc-act-text">
                  <p class="dc-act-tag">${label}</p>
                  <p class="dc-act-title">${escapeHtml(act.name)}</p>
                  ${act.details ? `<p class="dc-act-sub">${escapeHtml(act.details)}</p>` : ''}
                </div>
              </div>
            `;
          })
          .join('');

        const sideClass = index === 0 ? 'dc-card--left' : 'dc-card--right';
        const statusText = state.loading && !lanyard ? 'Connecting...' : statusInfo.label;

        return `
          <article class="dc-card ${sideClass}">
            <div class="dc-banner">
              <div class="dc-banner-art">
                <img src="${DISCORD_BANNER_PATH}" alt="Pixel bunnies banner" referrerpolicy="no-referrer" />
              </div>
              <div class="dc-status-pill">
                <span class="status-dot ${statusInfo.dotClass}" aria-hidden="true"></span>
                <span>${statusText}</span>
              </div>
            </div>

            <div class="dc-content">
              <div class="dc-avatar-row">
                <div class="dc-avatar-wrap">
                  ${
                    avatarUrl
                      ? `<img class="dc-avatar-img" src="${escapeHtml(
                          avatarUrl
                        )}" alt="${escapeHtml(displayName)} Discord avatar" referrerpolicy="no-referrer" />`
                      : `<div class="dc-avatar-fallback">${escapeHtml(profile.name[0])}</div>`
                  }
                  ${HELLO_KITTY_DECO_SVG}
                  <span class="dc-avatar-dot ${statusInfo.dotClass}" title="${statusInfo.label}"></span>
                </div>
                ${platformsHtml}
              </div>

              <div class="dc-identity">
                <div class="dc-name-line">
                  <h2 class="dc-display-name">${escapeHtml(displayName)}</h2>
                  <span class="dc-nickname">(${escapeHtml(profile.name)})</span>
                </div>
                <p class="dc-username">@${escapeHtml(username)}</p>
              </div>

              <div class="dc-scroll">
                ${customStatusHtml}
                ${spotifyHtml}
                ${richHtml}
              </div>

              <div class="dc-footer">
                <span class="dc-bio">${escapeHtml(profile.caption)}</span>
                <span class="dc-userid">${escapeHtml(profile.discordUserId)}</span>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function initLanyard() {
    const ids = [DEFAULT_PROFILES.com.discordUserId, DEFAULT_PROFILES.lavi.discordUserId];

    Promise.all(
      ids.map(async (id) => {
        try {
          const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
          if (!res.ok) return null;
          const json = await res.json();
          if (json && json.success && json.data) return [id, json.data];
        } catch (_) {}
        return null;
      })
    ).then((results) => {
      results.forEach((entry) => {
        if (entry) state.dataById[entry[0]] = entry[1];
      });
      state.loading = false;
      renderPosters();
      renderDiscordCards();
    });

    let ws = null;
    let heartbeat = null;

    function connect() {
      try {
        ws = new WebSocket('wss://api.lanyard.rest/socket');
        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg.op === 1 && msg.d && msg.d.heartbeat_interval) {
              ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ids } }));
              if (heartbeat) clearInterval(heartbeat);
              heartbeat = setInterval(() => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, msg.d.heartbeat_interval);
            } else if (msg.op === 0) {
              if (msg.t === 'INIT_STATE' && msg.d) {
                Object.assign(state.dataById, msg.d);
                state.loading = false;
                renderPosters();
                renderDiscordCards();
              } else if (
                msg.t === 'PRESENCE_UPDATE' &&
                msg.d &&
                msg.d.discord_user &&
                msg.d.discord_user.id
              ) {
                state.dataById[msg.d.discord_user.id] = msg.d;
                renderPosters();
                renderDiscordCards();
              }
            }
          } catch (_) {}
        };
        ws.onerror = () => ws && ws.close();
        ws.onclose = () => {
          if (heartbeat) {
            clearInterval(heartbeat);
            heartbeat = null;
          }
          setTimeout(connect, 5000);
        };
      } catch (_) {}
    }

    connect();
  }

  function switchPage(page) {
    state.activePage = page;
    document.querySelectorAll('.nav-tab').forEach((tab) => {
      const isActive = tab.getAttribute('data-page') === page;
      tab.classList.toggle('is-active', isActive);
      if (isActive) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });

    document.getElementById('page-colavi').classList.toggle('hidden', page !== 'colavi');
    document.getElementById('page-dc').classList.toggle('hidden', page !== 'dc');
    document.getElementById('page-lavi').classList.toggle('hidden', page !== 'lavi');

    const titleEl = document.getElementById('page-title');
    const subEl = document.getElementById('page-subtitle');

    if (page === 'colavi') {
      titleEl.innerHTML = 'com <span class="title-accent">nd</span> lavi';
      subEl.innerHTML =
        '<span>our little corner</span><span class="dot-sep" aria-hidden="true">·</span><span>just you &amp; me</span>';
    } else if (page === 'dc') {
      titleEl.innerHTML = 'dc <span class="title-accent">profiles</span>';
      subEl.innerHTML =
        '<span>live discord presence</span><span class="dot-sep" aria-hidden="true">·</span><span>com &amp; lavi</span>';
    } else {
      titleEl.innerHTML = 'babyy <span class="title-accent">lavi</span>';
      subEl.innerHTML =
        '<span>a letter for you</span><span class="dot-sep" aria-hidden="true">·</span><span>always &amp; forever</span>';
    }
  }

  function initApp() {
    initAmbientFx();
    renderPosters();
    renderDiscordCards();
    initLanyard();

    const bgImage = document.getElementById('bg-image');
    if (bgImage) {
      bgImage.addEventListener('error', () => {
        bgImage.style.display = 'none';
      });
    }

    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const eqBars = document.getElementById('eq-bars');
    const timeDisplay = document.getElementById('time-display');
    const seekInput = document.getElementById('seek-input');
    const seekFill = document.getElementById('seek-fill');

    function syncAudioUI() {
      const playing = !audio.paused;
      playBtn.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
      playBtn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
      eqBars.classList.toggle('hidden', !playing);

      muteBtn.innerHTML = audio.muted ? VOL_MUTE_SVG : VOL_ON_SVG;
      muteBtn.setAttribute(
        'aria-label',
        audio.muted ? 'Unmute background music' : 'Mute background music'
      );

      const dur = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 256;
      const cur = audio.currentTime || 0;
      seekInput.max = String(dur);
      seekInput.value = String(cur);
      seekFill.style.width = `${Math.min(100, (cur / dur) * 100)}%`;
      timeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
    }

    syncAudioUI();

    audio.addEventListener('timeupdate', syncAudioUI);
    audio.addEventListener('loadedmetadata', syncAudioUI);
    audio.addEventListener('durationchange', syncAudioUI);
    audio.addEventListener('play', syncAudioUI);
    audio.addEventListener('pause', syncAudioUI);
    audio.addEventListener('ended', syncAudioUI);

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.volume = 0.65;
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });

    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      syncAudioUI();
    });

    seekInput.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = Math.max(0, Math.min(val, audio.duration));
        syncAudioUI();
      }
    });

    // Entrance Gate
    const gate = document.getElementById('entrance-gate');
    const mainSite = document.getElementById('main-site');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    yesBtn.addEventListener('click', () => {
      audio.volume = 0.65;
      audio.play().catch(() => {});
      gate.classList.add('hidden');
      mainSite.classList.remove('hidden');
    });

    noBtn.addEventListener('click', () => {
      state.noClicks += 1;
      const yesScale = Math.min(1.76, 1 + state.noClicks * 0.19);
      yesBtn.style.transform = `scale(${yesScale})`;

      if (state.noClicks >= MAX_NO_CLICKS) {
        noBtn.style.opacity = '0';
        noBtn.style.transform = 'scale(0)';
        setTimeout(() => noBtn.classList.add('hidden'), 220);
      } else {
        const pos = NO_OFFSETS[(state.noClicks - 1) % NO_OFFSETS.length];
        const noScale = Math.max(0, 1 - state.noClicks * 0.24);
        const noOpacity = Math.max(0, 1 - state.noClicks * 0.25);
        noBtn.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${noScale})`;
        noBtn.style.opacity = String(noOpacity);
      }
    });

    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        switchPage(tab.getAttribute('data-page'));
      });
    });

    // Love Letter Toggle
    const envelopeBtn = document.getElementById('envelope-btn');
    const openLetter = document.getElementById('open-letter');

    function toggleLetter() {
      state.isLetterOpen = !state.isLetterOpen;
      envelopeBtn.classList.toggle('hidden', state.isLetterOpen);
      openLetter.classList.toggle('hidden', !state.isLetterOpen);
    }

    envelopeBtn.addEventListener('click', toggleLetter);
    openLetter.addEventListener('click', toggleLetter);
    openLetter.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLetter();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
