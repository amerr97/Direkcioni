# Kako kreirati ikone za PWA

Za PWA su potrebne ikone u sledećim veličinama:
- `icon-192.png` (192x192 piksela)
- `icon-512.png` (512x512 piksela)

## Opcije za kreiranje ikona:

### Opcija 1: Online PWA Asset Generator
1. Idite na: https://github.com/onderceylan/pwa-asset-generator
2. Koristite bilo koji online PWA asset generator
3. Upload-ujte vašu ikonu ili koristite placeholder
4. Download-ujte generisane ikone

### Opcija 2: Android Studio Asset Studio
1. Otvorite Android Studio
2. Desni klik na `res` folder → New → Image Asset
3. Izaberite "Launcher Icons"
4. Kreirajte ikonu
5. Export-ujte kao PNG u potrebnim veličinama

### Opcija 3: Ručno (Image Editor)
1. Koristite bilo koji image editor (Photoshop, GIMP, Paint.NET)
2. Kreirajte kvadratnu sliku
3. Eksport-ujte u veličinama 192x192 i 512x512 piksela

### Opcija 4: Koristite postojeću Android ikonu
Ako već imate Android ikonu u projektu:
1. Pronađite `ic_launcher.png` u Android projektu
2. Resize-ujte na 192x192 i 512x512
3. Preimenujte u `icon-192.png` i `icon-512.png`

## Placeholder ikone

Ako želite brzo da testirate PWA, možete koristiti bilo koju kvadratnu sliku i resize-ovati je na potrebne veličine. Aplikacija će raditi i bez ikona, samo neće biti moguće da se instalira kao PWA.
