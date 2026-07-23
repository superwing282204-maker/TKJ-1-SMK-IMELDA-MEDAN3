// ===================================================
// CHAT ANONIM - TKJ 1
// Menggunakan Firebase Realtime Database (gratis)
// supaya chat bisa dilihat & dipakai SEMUA pengunjung,
// bukan cuma tersimpan di browser masing-masing.
//
// CARA SETUP (sekali saja):
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru (gratis, tidak perlu kartu kredit)
// 3. Di menu kiri klik "Build" > "Realtime Database" > "Create Database"
//    - Pilih lokasi server (asia-southeast1 misalnya)
//    - Pilih mode "Start in test mode" (biar bisa dicoba dulu)
// 4. Klik ikon gerigi (Project settings) > scroll ke bawah > "Add app" > pilih Web (</>)
// 5. Copy object firebaseConfig yang muncul, lalu tempel/ganti di bawah ini
// ===================================================

const firebaseConfig = {
  apiKey: "AIzaSyAHrrszkHS6PCUwbBPGEvUmGOmtkPQMjJY",
  authDomain: "tkj1-chat-a1f8e.firebaseapp.com",
  databaseURL: "https://tkj1-chat-a1f8e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tkj1-chat-a1f8e",
  storageBucket: "tkj1-chat-a1f8e.firebasestorage.app",
  messagingSenderId: "62388081598",
  appId: "1:62388081598:web:c2fe65eaa9f18f8785dfef"
};

document.addEventListener('DOMContentLoaded', function () {

  const messagesEl = document.getElementById('chat-messages');
  const loadingEl  = document.getElementById('chat-loading');
  const formEl     = document.getElementById('chat-form');
  const inputEl    = document.getElementById('chat-input');
  const myNameEl   = document.getElementById('chat-my-name');

  if (!formEl || !messagesEl) return; // bukan halaman chat

  // Kalau config belum diganti, kasih tahu di halaman (bukan cuma di console)
  if (firebaseConfig.apiKey === "GANTI_DENGAN_API_KEY_ANDA") {
    loadingEl.innerHTML =
      '<div class="chat-setup-warning">' +
      '⚠️ Chat belum aktif. Admin website perlu memasukkan konfigurasi Firebase ' +
      'di file <code>chat.js</code> (lihat komentar di bagian atas file tersebut).' +
      '</div>';
    return;
  }

  // ===== INIT FIREBASE =====
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const chatRef = db.ref('chat-anonim-tkj1');

  // ===== NAMA ANONIM PER SESI BROWSER =====
  let myName = sessionStorage.getItem('chat-anon-name');
  if (!myName) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    myName = 'Anon-' + rand;
    sessionStorage.setItem('chat-anon-name', myName);
  }
  if (myNameEl) myNameEl.textContent = myName;

  // Warna avatar konsisten berdasarkan nama
  function nameToColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    return 'hsl(' + hue + ', 60%, 45%)';
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function renderMessage(key, data) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg' + (data.name === myName ? ' me' : '');
    wrap.dataset.key = key;

    const initials = data.name.replace('Anon-', '').slice(0, 2);

    wrap.innerHTML =
      '<div class="chat-avatar" style="background:' + nameToColor(data.name) + '">' + escapeHtml(initials) + '</div>' +
      '<div class="chat-bubble">' +
        '<div class="chat-meta"><span class="chat-name">' + escapeHtml(data.name) + '</span>' +
        '<span class="chat-time">' + formatTime(data.time) + '</span></div>' +
        '<div class="chat-text"></div>' +
      '</div>';

    wrap.querySelector('.chat-text').textContent = data.text;
    return wrap;
  }

  // ===== TAMPILKAN PESAN (LIVE) =====
  let firstLoad = true;
  const last200 = chatRef.limitToLast(200);

  last200.on('child_added', function (snapshot) {
    if (firstLoad && loadingEl) loadingEl.remove();
    const el = renderMessage(snapshot.key, snapshot.val());
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });

  last200.once('value', function () {
    firstLoad = false;
    if (loadingEl && loadingEl.parentNode) loadingEl.remove();
  });

  // ===== KIRIM PESAN =====
  let lastSent = 0;
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;

    // batas sederhana anti-spam: 1 pesan per 2 detik
    const now = Date.now();
    if (now - lastSent < 2000) return;
    lastSent = now;

    chatRef.push({
      name: myName,
      text: text.slice(0, 300),
      time: now
    });

    inputEl.value = '';
    inputEl.focus();
  });

});