from picamera2 import Picamera2
from datetime import datetime
import time

# Inisialisasi kamera
picam2 = Picamera2()

# Konfigurasi kamera
picam2.configure(picam2.create_still_configuration())
picam2.start()

try:
    while True:
        # Ambil gambar dengan timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"/home/pi/images/{timestamp}.jpg"
        picam2.capture_file(filename)
        print(f"Captured {filename}")
        
        # Tunggu 5 jam sebelum mengambil gambar berikutnya (dalam detik)
        time.sleep(18000)
except KeyboardInterrupt:
    print("Program stopped.")
    picam2.stop()
