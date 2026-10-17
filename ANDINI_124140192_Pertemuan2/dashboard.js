// 1. Jam & Salam Dinamis
const aturWaktu = () => {
  const sekarang = new Date();
  const jam = sekarang.getHours();
  
  let salamTeks = "Selamat Malam";
  if (jam >= 5 && jam < 12) salamTeks = "Selamat Pagi";
  else if (jam >= 12 && jam < 15) salamTeks = "Selamat Siang";
  else if (jam >= 15 && jam < 18) salamTeks = "Selamat Sore";

  document.getElementById("salam").innerText = `${salamTeks}, dini cantik!`;
  document.getElementById("jam").innerText = sekarang.toLocaleTimeString("id-ID");
};

setInterval(aturWaktu, 1000);
aturWaktu();

// 2. Fetch Quote Dinamis dari API (Async/Await + Destructuring)
const ambilQuote = async () => {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    
    const { quote, author } = data;
    document.getElementById("quoteText").innerText = `"${quote}"`;
    document.getElementById("quoteAuthor").innerText = `- ${author}`;
  } catch (err) {
    document.getElementById("quoteText").innerText = '"Semangat menjalani harimu!"';
    document.getElementById("quoteAuthor").innerText = '- Catatan Harian';
  }
};

ambilQuote();

// 3. Fitur To-Do List
let daftarTugas = [];
let filterAktif = "semua";

const renderTugas = () => {
  const list = document.getElementById("listTugas");
  list.innerHTML = "";

  // Reset semua tombol filter ke pink pastel muda
  const btnSemua = document.getElementById("btnSemua");
  const btnBelum = document.getElementById("btnBelum");
  const btnSelesai = document.getElementById("btnSelesai");

  [btnSemua, btnBelum, btnSelesai].forEach((btn) => {
    btn.className = "bg-pink-100 text-pink-700 px-3 py-1.5 rounded-lg transition-colors hover:bg-pink-200";
  });

  // Highlight tombol aktif dengan warna pink pastel lebih tegas
  if (filterAktif === "semua") {
    btnSemua.className = "bg-pink-400 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm";
  } else if (filterAktif === "belum") {
    btnBelum.className = "bg-pink-400 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm";
  } else if (filterAktif === "selesai") {
    btnSelesai.className = "bg-pink-400 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm";
  }

  // Filter tugas
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filterAktif === "belum") return !tugas.selesai;
    if (filterAktif === "selesai") return tugas.selesai;
    return true;
  });

  // Render list item
  tugasTampil.forEach((tugas) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-2.5 rounded-lg border border-sky-100 shadow-sm text-sm";
    
    const dicoret = tugas.selesai ? "line-through text-gray-400" : "text-slate-700";
    
    li.innerHTML = `
      <span class="${dicoret} cursor-pointer hover:text-pink-500" onclick="toggleSelesai(${tugas.id})">${tugas.teks}</span>
      <button onclick="hapusTugas(${tugas.id})" class="text-red-400 hover:text-red-600 text-xs font-medium">Hapus</button>
    `;
    
    list.appendChild(li);
  });
};

// Tambah Tugas
document.getElementById("btnTambah").addEventListener("click", () => {
  const input = document.getElementById("inputTugas");
  if (input.value.trim() === "") return;

  const tugasBaru = {
    id: Date.now(),
    teks: input.value,
    selesai: false
  };

  daftarTugas = [...daftarTugas, tugasBaru];
  input.value = "";
  renderTugas();
});

// Toggle & Hapus
window.toggleSelesai = (id) => {
  daftarTugas = daftarTugas.map((t) => t.id === id ? { ...t, selesai: !t.selesai } : t);
  renderTugas();
};

window.hapusTugas = (id) => {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  renderTugas();
};

// Event Filter
document.getElementById("btnSemua").addEventListener("click", () => { filterAktif = "semua"; renderTugas(); });
document.getElementById("btnBelum").addEventListener("click", () => { filterAktif = "belum"; renderTugas(); });
document.getElementById("btnSelesai").addEventListener("click", () => { filterAktif = "selesai"; renderTugas(); });

// Render Awal
renderTugas();

// 4. Fitur Catatan Cepat (Auto Save dengan localStorage)
const inputCatatan = document.getElementById("inputCatatan");

// Ambil catatan yang tersimpan saat halaman dibuka
inputCatatan.value = localStorage.getItem("catatanDashboard") || "";

// Simpan otomatis ke localStorage tiap kali pengguna mengetik
inputCatatan.addEventListener("input", (e) => {
  localStorage.setItem("catatanDashboard", e.target.value);
});