"""Tugas 1: Program penghitung BMI (Body Mass Index) sederhana."""


def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung nilai BMI.

    Parameter:
        berat  : berat badan dalam kilogram (kg)
        tinggi : tinggi badan dalam meter (m)
    Return:
        nilai BMI bertipe float
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    """
    Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameter:
        bmi : nilai BMI
    Return:
        string kategori berat badan
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


# Input data dari pengguna
berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m), contoh 1.65: "))

# Proses
nilai_bmi = hitung_bmi(berat_badan, tinggi_badan)
kategori = tentukan_kategori(nilai_bmi)

# Output
print("\n--- HASIL PERHITUNGAN BMI ---")
print(f"Berat badan : {berat_badan} kg")
print(f"Tinggi badan: {tinggi_badan} m")
print(f"Nilai BMI   : {nilai_bmi:.2f}")
print(f"Kategori    : {kategori}")