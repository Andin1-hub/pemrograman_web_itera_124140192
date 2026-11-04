"""Program utama yang menggunakan modul math_operations."""

import math_operations  # Cara 1: impor seluruh modul
from math_operations import (  # Cara 2: impor fungsi/konstanta spesifik
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
    PI,
)
import math_operations as mo  # Cara 3: impor dengan alias

print("=" * 45)
print("PROGRAM PENGUJIAN MODUL MATH_OPERATIONS")
print("=" * 45)
print(f"Nilai konstanta PI: {PI}")

print("\n--- PERSEGI ---")
for sisi in (4, 7.5):
    print(f"Sisi {sisi:>4} -> Luas: {math_operations.luas_persegi(sisi):>8.2f} | "
          f"Keliling: {math_operations.keliling_persegi(sisi):>7.2f}")

print("\n--- PERSEGI PANJANG ---")
for panjang, lebar in ((10, 5), (8.5, 3)):
    print(f"{panjang} x {lebar} -> "
          f"Luas: {mo.luas_persegi_panjang(panjang, lebar):>7.2f} | "
          f"Keliling: {mo.keliling_persegi_panjang(panjang, lebar):>6.2f}")

print("\n--- LINGKARAN ---")
for jari in (7, 10.5):
    print(f"Jari-jari {jari:>4} -> Luas: {mo.luas_lingkaran(jari):>8.2f} | "
          f"Keliling: {mo.keliling_lingkaran(jari):>7.2f}")

print("\n--- KONVERSI SUHU ---")
for suhu in (0, 37, 100):
    print(f"{suhu:>3} C = {celsius_ke_fahrenheit(suhu):>6.2f} F = "
          f"{celsius_ke_kelvin(suhu):>7.2f} K")