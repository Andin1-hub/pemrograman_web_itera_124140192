/* ==========================================================
   Mini POS - Versi A
   Alur: validasi form -> simpan ke array -> render tabel
         -> hitung ringkasan -> simpan ke localStorage
   ========================================================== */

// ---------- Konstanta ----------
const KUNCI_STORAGE = "mini_pos_keranjang";
const MIN_HARGA = 500;
const MIN_NAMA = 3;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 10;

// ---------- State ----------
let keranjang = []; // [{ nama, harga, qty }]

// ---------- Elemen DOM ----------
const form = document.getElementById("form-barang");
const inputNama = document.getElementById("input-nama");
const inputHarga = document.getElementById("input-harga");
const inputQty = document.getElementById("input-qty");
const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");

const isiKeranjang = document.getElementById("isi-keranjang");
const badgeJumlah = document.getElementById("badge-jumlah");

const teksTotal = document.getElementById("teks-total");
const teksDiskon = document.getElementById("teks-diskon");
const keteranganDiskon = document.getElementById("keterangan-diskon");
const teksTotalAkhir = document.getElementById("teks-total-akhir");
const inputBayar = document.getElementById("input-bayar");
const kotakKembalian = document.getElementById("kotak-kembalian");
const teksKembalian = document.getElementById("teks-kembalian");
const infoKembalian = document.getElementById("info-kembalian");
const tombolReset = document.getElementById("tombol-reset");

// ---------- Helper ----------
function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

// ---------- LocalStorage ----------
function simpanKeranjang() {
  localStorage.setItem(KUNCI_STORAGE, JSON.stringify(keranjang));
}

function muatKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_STORAGE));
    if (Array.isArray(data)) {
      // hanya ambil data yang bentuknya benar
      keranjang = data.filter(function (b) {
        return b && typeof b.nama === "string" && Number(b.harga) > 0 && Number(b.qty) > 0;
      });
    }
  } catch (err) {
    keranjang = [];
  }
}

// ---------- Validasi ----------
function bersihkanError() {
  [errorNama, errorHarga, errorQty].forEach(function (el) { el.textContent = ""; });
  [inputNama, inputHarga, inputQty].forEach(function (el) { el.classList.remove("is-invalid"); });
}

function tampilkanError(input, elemenError, pesan) {
  input.classList.add("is-invalid");
  elemenError.textContent = pesan;
}

/** Mengembalikan true jika semua input valid. */
function validasiForm() {
  bersihkanError();
  let valid = true;

  const nama = inputNama.value.trim();
  if (nama.length < MIN_NAMA) {
    tampilkanError(inputNama, errorNama, "Nama barang wajib diisi, minimal " + MIN_NAMA + " karakter.");
    valid = false;
  }

  const teksHarga = inputHarga.value.trim();
  const harga = Number(teksHarga);
  if (teksHarga === "" || isNaN(harga)) {
    tampilkanError(inputHarga, errorHarga, "Harga wajib diisi dengan angka.");
    valid = false;
  } else if (harga < MIN_HARGA) {
    tampilkanError(inputHarga, errorHarga, "Harga minimal Rp " + MIN_HARGA.toLocaleString("id-ID") + ".");
    valid = false;
  }

  const teksQty = inputQty.value.trim();
  const qty = Number(teksQty);
  if (teksQty === "" || isNaN(qty)) {
    tampilkanError(inputQty, errorQty, "Jumlah wajib diisi dengan angka.");
    valid = false;
  } else if (!Number.isInteger(qty) || qty < 1) {
    tampilkanError(inputQty, errorQty, "Jumlah harus bilangan bulat minimal 1.");
    valid = false;
  }

  return valid;
}

// ---------- Perhitungan ----------
function hitungSubtotal(barang) {
  return barang.harga * barang.qty;
}

function hitungTotal() {
  return keranjang.reduce(function (jumlah, barang) {
    return jumlah + hitungSubtotal(barang);
  }, 0);
}

function hitungDiskon(total) {
  return total >= BATAS_DISKON ? total * PERSEN_DISKON / 100 : 0;
}

// ---------- Render ----------
function renderTabel() {
  isiKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    const baris = document.createElement("tr");
    const sel = document.createElement("td");
    sel.colSpan = 6;
    sel.className = "kosong";
    sel.textContent = "Keranjang masih kosong. Tambahkan barang lewat form.";
    baris.appendChild(sel);
    isiKeranjang.appendChild(baris);
  }

  keranjang.forEach(function (barang, index) {
    const baris = document.createElement("tr");

    const kolom = [
      { teks: String(index + 1) },
      { teks: barang.nama },
      { teks: formatRupiah(barang.harga), kelas: "num" },
      { teks: String(barang.qty), kelas: "num" },
      { teks: formatRupiah(hitungSubtotal(barang)), kelas: "num" }
    ];

    kolom.forEach(function (k) {
      const td = document.createElement("td");
      td.textContent = k.teks; // textContent -> aman dari injeksi HTML
      if (k.kelas) td.className = k.kelas;
      baris.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "btn btn--danger btn--small";
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", function () { hapusItem(index); });
    tdAksi.appendChild(tombolHapus);
    baris.appendChild(tdAksi);

    isiKeranjang.appendChild(baris);
  });

  badgeJumlah.textContent = keranjang.length + " item";
}

function renderRingkasan() {
  const total = hitungTotal();
  const diskon = hitungDiskon(total);
  const totalAkhir = total - diskon;

  teksTotal.textContent = formatRupiah(total);
  teksDiskon.textContent = "- " + formatRupiah(diskon);
  teksTotalAkhir.textContent = formatRupiah(totalAkhir);
  keteranganDiskon.textContent = diskon > 0
    ? "(" + PERSEN_DISKON + "% karena belanja ≥ Rp 50.000)"
    : "(min. belanja Rp 50.000)";

  renderKembalian(totalAkhir);
}

function renderKembalian(totalAkhir) {
  const teksBayar = inputBayar.value.trim();
  kotakKembalian.classList.remove("ok", "kurang");

  if (teksBayar === "" || isNaN(Number(teksBayar))) {
    teksKembalian.textContent = formatRupiah(0);
    infoKembalian.textContent = "";
    return;
  }

  const bayar = Number(teksBayar);
  const kembalian = bayar - totalAkhir;

  if (totalAkhir === 0) {
    teksKembalian.textContent = formatRupiah(0);
    infoKembalian.textContent = "Keranjang masih kosong.";
  } else if (kembalian < 0) {
    teksKembalian.textContent = formatRupiah(0);
    infoKembalian.textContent = "Uang belum mencukupi, kurang " + formatRupiah(-kembalian) + ".";
    kotakKembalian.classList.add("kurang");
  } else {
    teksKembalian.textContent = formatRupiah(kembalian);
    infoKembalian.textContent = "Uang pas / cukup.";
    kotakKembalian.classList.add("ok");
  }
}

function perbaruiSemua() {
  renderTabel();
  renderRingkasan();
}

// ---------- Aksi ----------
function tambahItem(event) {
  event.preventDefault();
  if (!validasiForm()) return; // data tidak valid -> tidak masuk keranjang

  keranjang.push({
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value),
    qty: Number(inputQty.value)
  });

  simpanKeranjang();
  perbaruiSemua();

  form.reset(); // form otomatis dikosongkan
  bersihkanError();
  inputNama.focus();
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  perbaruiSemua();
}

function transaksiBaru() {
  if (keranjang.length > 0 && !confirm("Kosongkan keranjang dan mulai transaksi baru?")) return;
  keranjang = [];
  localStorage.removeItem(KUNCI_STORAGE);
  inputBayar.value = "";
  form.reset();
  bersihkanError();
  perbaruiSemua();
}

// ---------- Event listener ----------
form.addEventListener("submit", tambahItem);
inputBayar.addEventListener("input", function () { renderRingkasan(); });
tombolReset.addEventListener("click", transaksiBaru);

// ---------- Inisialisasi ----------
muatKeranjang();
perbaruiSemua();
