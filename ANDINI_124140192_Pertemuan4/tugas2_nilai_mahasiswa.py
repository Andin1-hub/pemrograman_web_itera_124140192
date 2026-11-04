"""Tugas 2: Program pengelolaan data nilai mahasiswa."""

# List berisi 5 dictionary data mahasiswa
data_mahasiswa = [
    {"nama": "Andini", "nim": "124140192", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Pray Febry SG",    "nim": "124140184", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nama": "Winda Yanti ",   "nim": "124140220", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Divania Munthe",   "nim": "124140027", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Agit Fadilah",   "nim": "124140157", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir dengan bobot UTS 30%, UAS 40%, Tugas 30%.

    Parameter:
        uts   : nilai UTS
        uas   : nilai UAS
        tugas : nilai tugas
    Return:
        nilai akhir bertipe float
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade A-E berdasarkan nilai akhir.

    Parameter:
        nilai_akhir : nilai akhir mahasiswa
    Return:
        huruf grade (A, B, C, D, atau E)
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


# Hitung nilai akhir & grade, simpan kembali ke dictionary masing-masing
for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
    )
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

# Cetak tabel
garis = "=" * 56
print(garis)
print(f"{'No':<4}{'Nama':<20}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>8}")
print(garis)
for no, mhs in enumerate(data_mahasiswa, start=1):
    print(
        f"{no:<4}{mhs['nama']:<20}{mhs['nim']:<12}"
        f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}"
    )
print(garis)

# Cari nilai tertinggi & terendah
tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMahasiswa dengan nilai akhir TERTINGGI:")
print(f"  Nama        : {tertinggi['nama']}")
print(f"  NIM         : {tertinggi['nim']}")
print(f"  Nilai Akhir : {tertinggi['nilai_akhir']:.2f}")
print(f"  Grade       : {tertinggi['grade']}")

print("\nMahasiswa dengan nilai akhir TERENDAH:")
print(f"  Nama        : {terendah['nama']}")
print(f"  NIM         : {terendah['nim']}")
print(f"  Nilai Akhir : {terendah['nilai_akhir']:.2f}")
print(f"  Grade       : {terendah['grade']}")