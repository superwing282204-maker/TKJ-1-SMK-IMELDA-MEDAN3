# Website Sekolah — TKJ 1

Website profil sekolah/kelas TKJ 1, dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework/build tool). Bisa langsung dijalankan di browser atau dideploy sebagai situs statis (misalnya GitHub Pages).

## Struktur Folder

```
.
├── index.html                  # Halaman utama
├── style.css
├── script.js
├── images/                     # Semua foto & video
├── profil/                     # Profil sekolah (sejarah, visi-misi, dll)
├── kurikulum/                  # Info kurikulum & kalender akademik
├── gtk/                        # Guru & Tenaga Kependidikan
├── fitur/                      # Galeri foto & video
├── berita-sekolah/             # Berita/artikel sekolah
├── kesiswaan/                  # (placeholder, belum ada konten)
├── sarpras/                    # (placeholder, belum ada konten)
├── hubin/                      # (placeholder, belum ada konten)
├── program/                    # (placeholder, belum ada konten)
└── ppdb.html                   # (placeholder, belum ada konten)
```

## Menjalankan di Lokal

Karena ini situs statis, cukup buka `index.html` di browser. Untuk pengalaman yang lebih mirip hosting sungguhan (menghindari isu path relatif/CORS pada beberapa browser), jalankan local server sederhana dari folder ini:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

## Deploy ke Vercel

**Cara termudah (drag & drop, tanpa GitHub):**
1. Buka https://vercel.com/new
2. Pilih tab "Deploy" lalu drag & drop seluruh folder project ini (atau upload file .zip-nya).
3. Vercel otomatis mendeteksi ini sebagai static site (tidak perlu build command / output directory apa pun — biarkan kosong/default).
4. Klik Deploy, tunggu beberapa detik, situs langsung online.

**Cara via GitHub (disarankan untuk update berkelanjutan):**
1. Push folder ini ke repository GitHub (lihat langkah "Cara Push ke GitHub" di bawah).
2. Buka https://vercel.com/new, pilih "Import Git Repository", lalu pilih repo ini.
3. Framework Preset: pilih **Other** (karena tidak ada build tool). Build Command & Output Directory dikosongkan saja.
4. Klik Deploy. Setiap kali push ke `main`, Vercel otomatis re-deploy.

## Deploy ke GitHub Pages

1. Push folder ini ke repository GitHub (lihat langkah di bawah).
2. Buka **Settings → Pages** pada repository.
3. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Situs akan tersedia di `https://<username>.github.io/<nama-repo>/`.

## Catatan Perbaikan yang Sudah Dilakukan

- **Perbaikan bug besar:** folder `Profil`, `Kurikulum`, `GTK`, `Fitur` sebelumnya memakai huruf kapital, padahal semua tautan (`href`) di HTML menulisnya huruf kecil. Ini tidak masalah di Windows/Mac (case-insensitive), **tapi akan menyebabkan semua tautan 404 di GitHub Pages** (server Linux bersifat case-sensitive). Semua folder sudah diganti ke huruf kecil agar konsisten dengan tautannya.
- Menghapus file gambar duplikat yang tidak terpakai dan mengandung spasi di nama file (`penatapan 1.jpeg`, `ss 1.png`, dll) — spasi pada nama file bermasalah saat diakses lewat URL.
- Menghapus folder `kontak/` kosong (0 byte, tidak direferensikan di mana pun; kontak sekolah sudah ada di `profil/kontak.html`).
- Menambahkan halaman placeholder ("Halaman ini sedang dalam proses pembuatan") untuk 20 tautan menu yang sebelumnya menuju halaman yang belum dibuat (`program/`, `kesiswaan/`, `sarpras/`, `hubin/`, `ppdb.html`, dll), supaya pengunjung tidak melihat error 404. **Silakan isi halaman-halaman ini dengan konten aslinya.**
- Menambahkan `.gitignore` dan `README.md` ini.
- **Perbaikan untuk deploy Vercel (case-sensitive):** folder `Profil`, `Kurikulum`, `GTK`, `Fitur` diubah ke huruf kecil (`profil`, `kurikulum`, `gtk`, `fitur`) agar konsisten dengan seluruh tautan di HTML.
- Memperbaiki puluhan tautan rusak di `index.html` yang sebelumnya menunjuk ke path yang tidak ada (`../website-sekolah/...`, `./website.real/...`) — sekarang semua tautan relatif terhadap root project dengan benar.
- Memperbaiki tautan di semua file dalam folder `profil/` yang sebelumnya salah menunjuk ke `../profil/namafile.html` (padahal file tersebut ada di folder yang sama).
- Menambahkan halaman placeholder `berita-sekolah-2.html` s/d `berita-sekolah-5.html` yang direferensikan di beranda tapi belum ada filenya.
- Menghapus 5 file gambar duplikat bernama dengan spasi (tidak terpakai di mana pun) dan folder `kontak/` yang isinya file kosong (0 byte) dan tidak direferensikan.
- Menambahkan `vercel.json` (konfigurasi minimal untuk static site).

## Yang Masih Perlu Dikerjakan

Folder/halaman berikut baru berisi placeholder dan perlu diisi kontennya:
`program/`, `kesiswaan/`, `sarpras/`, `hubin/`, `kurikulum/program-keahlian.html`, `gtk/prestasi-guru.html`, `gtk/tugas-fungsi.html`, `profil/struktur-organisasi-kelas.html`, `ppdb.html`.

## Cara Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: website sekolah"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```
