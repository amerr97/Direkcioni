# Direkcioni Ugao - PWA Kalkulator

Progressive Web App (PWA) za izračunavanje direktnog ugla i dužine između dve tačke.

## Funkcionalnosti

- Unos koordinata za tačke A (Ya, Xa) i B (Yb, Xb)
- Automatski izračun dužine između tačaka
- Automatski izračun direktnog ugla u formatu stepeni-minuti-sekunde
- Vizuelni grafik sa prikazom tačaka A (plava) i B (crvena)
- Offline funkcionalnost
- Responsive dizajn

## Instalacija za GitHub Pages

1. Uploadaj sve fajlove u GitHub repository
2. U Settings → Pages, izaberi source branch (npr. `main` ili `master`)
3. Aplikacija će biti dostupna na `https://username.github.io/repository-name/`

## Lokalno testiranje

1. Koristi lokalni server (npr. Python):
   ```bash
   python -m http.server 8000
   ```
   ili
   ```bash
   python3 -m http.server 8000
   ```

2. Otvori u browseru: `http://localhost:8000`

## Fajlovi

- `index.html` - Glavni HTML fajl
- `styles.css` - CSS stilovi
- `app.js` - JavaScript logika
- `manifest.json` - PWA manifest
- `service-worker.js` - Service worker za offline funkcionalnost
- `icon-192.png` - Ikona 192x192 (potrebno dodati)
- `icon-512.png` - Ikona 512x512 (potrebno dodati)

## Napomena

**VAŽNO:** Potrebno je kreirati ikone `icon-192.png` i `icon-512.png` za PWA. Možete koristiti:
- Online alate kao što je [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- Android Studio Asset Studio i eksportovati ikone
- Bilo koji image editor

## Korišćenje

1. Unesi koordinate tačke A (Ya, Xa)
2. Unesi koordinate tačke B (Yb, Xb)
3. Rezultati se automatski prikazuju:
   - Dužina između tačaka u metrima
   - Direkcioni ugao u formatu stepeni-minuti-sekunde
   - Grafički prikaz tačaka

## Tehnologije

- HTML5
- CSS3
- Vanilla JavaScript
- Service Workers (PWA)
- Canvas API (grafika)
