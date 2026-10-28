"""Uso: python generar_qr.py https://TU-USUARIO.github.io/aventuras-entre-paginas/
Requiere: pip install "qrcode[pil]". Genera qr-aventuras.png (corrección de errores alta)."""
import sys, qrcode
if len(sys.argv) != 2 or not sys.argv[1].startswith("https://"):
    sys.exit("Indica la URL pública HTTPS ya verificada.")
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=4)
qr.add_data(sys.argv[1]); qr.make(fit=True)
qr.make_image(fill_color="black", back_color="white").save("qr-aventuras.png")
print("Listo: qr-aventuras.png")
