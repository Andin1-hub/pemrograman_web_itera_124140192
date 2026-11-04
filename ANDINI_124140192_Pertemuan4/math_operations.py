"""Modul operasi matematika: geometri dan konversi suhu."""

# Konstanta
PI = 3.14159


# ---------- Geometri: Persegi ----------
def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas persegi.

    Parameter:
        sisi : panjang sisi persegi
    Return:
        luas persegi
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling persegi.

    Parameter:
        sisi : panjang sisi persegi
    Return:
        keliling persegi
    """
    return 4 * sisi


# ---------- Geometri: Persegi Panjang ----------
def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas persegi panjang.

    Parameter:
        panjang : panjang persegi panjang
        lebar   : lebar persegi panjang
    Return:
        luas persegi panjang
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling persegi panjang.

    Parameter:
        panjang : panjang persegi panjang
        lebar   : lebar persegi panjang
    Return:
        keliling persegi panjang
    """
    return 2 * (panjang + lebar)


# ---------- Geometri: Lingkaran ----------
def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas lingkaran.

    Parameter:
        jari_jari : jari-jari lingkaran
    Return:
        luas lingkaran
    """
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling lingkaran.

    Parameter:
        jari_jari : jari-jari lingkaran
    Return:
        keliling lingkaran
    """
    return 2 * PI * jari_jari


# ---------- Konversi Suhu ----------
def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius : suhu dalam Celsius
    Return:
        suhu dalam Fahrenheit
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius : suhu dalam Celsius
    Return:
        suhu dalam Kelvin
    """
    return celsius + 273.15


# Blok ini hanya jalan kalau file dieksekusi langsung, bukan saat di-import
if __name__ == "__main__":
    print("[TEST MODUL] Luas persegi sisi 4 =", luas_persegi(4))