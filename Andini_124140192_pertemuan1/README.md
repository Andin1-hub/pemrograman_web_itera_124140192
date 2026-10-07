# Mini POS – Kasir & Keranjang Belanja Sederhana

## Identitas

- **Nama Lengkap :** _Andini_
- **NIM :** _124140192_
- **Kelas Praktikum :** _RB_

## Deskripsi Aplikasi

Aplikasi web **Kasir & Keranjang Belanja Sederhana (Mini POS)** untuk kasir kantin / toko kampus. Kasir dapat memasukkan barang, melihat daftar belanja, mendapat diskon otomatis, dan menghitung uang kembalian. Isi keranjang disimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh.

Studi kasus yang dipilih: **kasir kantin kampus**.

## Panduan Menjalankan

1. Clone / unduh repository ini.
2. Buka folder `Andini_124140192_pertemuan1` di VS Code.
3. Klik kanan `index.html` → **Open with Live Server** (atau cukup klik dua kali `index.html` untuk membukanya di browser).
4. Latihan modul ada di `modul/index.html`.

## Struktur Folder

```
Andini_124140192_pertemuan1/
├── index.html          # Struktur halaman utama
├── style.css           # Tampilan halaman
├── script.js            # Logika aplikasi
├── README.md            # Dokumentasi proyek
│
├── modul/               # Latihan praktikum
│   ├── index.html
│   └── latihan.js
│
└── screenshot/          # Dokumentasi screenshot
    ├── diskon.png
    ├── eror.png
    └── form.png
```

## Daftar Fitur

- [x] Validasi nama barang (wajib, minimal 3 karakter)
- [x] Validasi harga satuan (angka, minimal Rp 500)
- [x] Validasi qty (bilangan bulat, minimal 1)
- [x] Pesan error merah di bawah input yang salah; barang tidak masuk keranjang jika tidak valid
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan
- [x] Subtotal per barang (harga × qty)
- [x] Total belanja otomatis
- [x] Diskon 10% otomatis jika total ≥ Rp 50.000
- [x] Uang bayar & kembalian otomatis, pesan "uang belum mencukupi" jika kurang
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Tombol Hapus per item (total & diskon dihitung ulang)
- [x] Penyimpanan keranjang di localStorage (`JSON.stringify` / `JSON.parse`)
- [x] Tombol Transaksi Baru / Reset (mengosongkan keranjang & localStorage)
- [x] Format Rupiah dan tampilan responsif

## Tangkapan Layar

> Ganti dengan screenshot milik sendiri (minimal 3).

| Tampilan                  | Gambar                  |
| ------------------------- | ----------------------- |
| Form input utama          | ![Image Alt](https://github.com/Andin1-hub/pemrograman_web_itera_124140192/blob/e2e5f5f98925f5845c7630f450afcf9f66d2fedb/Andini_124140192_pertemuan1/screenshot/form.png)  |
| Validasi error muncul     | ![Image Alt](https://github.com/Andin1-hub/pemrograman_web_itera_124140192/blob/e2e5f5f98925f5845c7630f450afcf9f66d2fedb/Andini_124140192_pertemuan1/screenshot/eror.png) |
| Hasil perhitungan & tabel | ![Image Alt](https://github.com/Andin1-hub/pemrograman_web_itera_124140192/blob/e2e5f5f98925f5845c7630f450afcf9f66d2fedb/Andini_124140192_pertemuan1/screenshot/diskon.png) |

## Penjelasan Teknis Singkat

**Validasi input.** Fungsi `validasiForm()` memeriksa tiga input. Nama di-`trim()` lalu dicek panjangnya ≥ 3. Harga diubah dengan `Number()` dan harus ≥ 500. Qty harus `Number.isInteger()` dan ≥ 1. Jika ada yang salah, pesan merah ditampilkan di bawah input terkait dan fungsi mengembalikan `false` sehingga barang tidak ditambahkan.

**Kalkulator.** `hitungSubtotal()` = harga × qty. `hitungTotal()` menjumlahkan semua subtotal dengan `reduce()`. `hitungDiskon()` mengembalikan 10% dari total jika total ≥ 50.000, selain itu 0. Total akhir = total − diskon, dan kembalian = uang bayar − total akhir (jika negatif ditampilkan pesan uang kurang).

**localStorage.** Setiap perubahan keranjang (tambah, hapus) memanggil `simpanKeranjang()` yang menyimpan array dengan `JSON.stringify()`. Saat halaman dibuka, `muatKeranjang()` membaca data dengan `JSON.parse()` (dibungkus `try/catch` agar aman jika data rusak). Tombol reset menghapus data dengan `localStorage.removeItem()`.
