# 🔥 Heizkosten & Gasthermen Tracker

Eine moderne, offline-fähige Web-App (Progressive Web App - PWA) im edlen **iOS Dark-Design**, speziell optimiert für das **iPhone 15 Pro Max** und alle modernen Smartphones.

Die App ermöglicht das präzise Erfassen von Zählerständen (kWh) deiner Gastherme, berechnet automatisch Verbräuche und Kosten, bietet **umfangreiche Monats- und Jahresauswertungen**, **PDF-Abrechnungsberichte** und lässt sich im Aussehen mit **mehreren Themes und frei wählbaren Farben** individualisieren.

---

## ✨ Neue & wichtigste Features

1. **🔥 Startwert nach dem Sommer (Offizieller Heizbeginn):**
   - **Spätsommer-Nullpunkt:** Der erste Zählerstand, den du nach den Sommermonaten einträgst, wird als offizieller Startwert der Heizperiode festgelegt.
   - **Ab hier startet das Heizen:** Die App trennt den reinen Warmwasser-Verbrauch der Sommermonate vom echten Raumwärmebedarf:
     - **Start-Zählerstand:** z. B. 38.450 kWh zum Stichtag nach dem Sommer.
     - **Seit Heizbeginn:** Exakter Verbrauch an Raumwärme ($\Delta\text{kWh}$).
     - **Aktive Heiztage:** Wie viele Tage seit dem Einschalten der Heizung geheizt wurde.
     - **Ø Heizkosten pro Tag (€/Tag):** Reine Raumheizungskosten pro Tag seit Heizbeginn.
   - **Flexibel festlegbar:** Direkt bei der Ablesung über das Kontrollkästchen `[x] Startwert nach dem Sommer (Heizbeginn)` markieren, automatisch ermitteln lassen oder in den Einstellungen auswählen.
   - **Verlaufs-Badge:** Markierte Startablesungen werden in der Chronik sofort mit dem Badge **`🔥 Startwert Sommer`** hervorgehoben.

2. **🔮 Jahresübergreifende Heizperiode & Folgejahr-Prognose:**
   - **Jahresübergreifender Zyklus:** Da eine Heizperiode üblicherweise über zwei Kalenderjahre läuft (z. B. 2026/2027 von September bis August), berechnet die App den 12-Monats-Zyklus jahresübergreifend.
   - **Direktes Umschalten im Dashboard:** Mit den Tabs **„Heizperiode 2026/27“** und **„Folgejahr 2027/28 ▶“** wechselst du auf einen Fingertipp zwischen aktueller Abrechnung und Folgejahr-Vorschau.
   - **Saison-Navigator in der Statistik:** Mit den Pfeiltasten `◀` / `▶` oder dem Dropdown-Menü kannst du jede beliebige Heizperiode ansteuern (Vorjahr, Aktuell, Folgejahr, Langzeitprognose).
   - **Folgejahr-Vorschau (12 Monate):** Auch wenn für das Folgejahr noch keine Ablesungen vorliegen, simuliert die App alle 12 Monate auf Basis deiner kalibrierten Heizintensität und zeigt dir im Voraus, ob dein Abschlag auch für den übernächsten Winter ausreicht.

3. **Sofort-Auswertung nach jedem Eintrag:**
   - Direkt nach dem Speichern eines Zählerstands öffnet sich ein übersichtliches Ergebnis-Fenster:
     - **Zeitraum:** Exakte Dauer in Tagen seit der letzten Ablesung.
     - **Verbrauch:** $\Delta\text{kWh}$ und durchschnittlicher Tagesverbrauch ($\text{kWh}/\text{Tag}$).
     - **Kosten:** Gesamtkosten für diesen Zeitraum und **durchschnittliche Kosten pro Tag (€/Tag)**.
     - **Gesamtstand bis heute:** Gesamte bis dahin aufgelaufene Kosten, aktueller Zählerstand und Allzeit-Tagesschnitt.
     - **Monats- und Jahresstand:** Bisheriger Status des laufenden Monats und Jahres.

4. **📍 Präzise Heiz- & Nachzahlungsprognose (30974 Wennigsen / Deister):**
   - **Klimadaten-Modellierung:** Nutzt die Gradtagszahlen des Deutschen Wetterdienstes (DWD) für die Region Hannover / Wennigsen und das offizielle BDEW-Heizprofil HE01 (Warmwasser-Sockel im Sommer + Raumwärme-Heizkurve im Winter).
   - **Vorausschauende Nachzahlungsberechnung:** Vergleicht die für das gesamte 12-monatige Abrechnungsjahr prognostizierten Heizkosten mit deinen monatlichen Gas-Abschlägen.
   - **Reale Messwerte & Startwert-Kalibrierung:** Der Startwert nach dem Sommer kalibriert deine individuelle Haushalts-Heizintensität für die verbleibenden Wintermonate und das Folgejahr.
   - **Punktlandungsempfehlung:** Zeigt dir auf den Euro genau, ob eine **Nachzahlung** droht oder ein **Guthaben** entsteht und empfiehlt dir die optimale Abschlagshöhe (€/Monat).
   - **12-Monate-Übersicht:** Zeigt für jeden Monat den erwarteten Verbrauch, die Kosten, den Abschlag und den monatlichen Überhang/Puffer.

5. **Monats- & Jahresauswertung (Kosten & kWh):**
   - Im Reiter **„Statistik“** wechselst du bequem zwischen:
     - 📊 **Diagramm:** Interaktive Retina-Balken für Verbrauch oder Kosten.
     - 📅 **Monate:** Übersicht aller Kalendermonate mit Gesamtkosten (€), kWh, Ø Kosten pro Tag (€/Tag) und Ø Verbrauch pro Tag.
     - 📆 **Jahre:** Jahresbilanz mit Gesamtkosten, Monatsdurchschnitt und 365-Tage-Hochrechnung.
     - 📍 **Heiz-Prognose:** Die detaillierte Wennigsen-Jahresendabrechnung mit Monatstabelle und Saison-Navigator.

3. **🖨️ PDF-Abrechnungsbericht & Drucken:**
   - Mit einem Klick auf **„PDF / Drucken“** wird ein formschöner, druckfertiger Abrechnungsbericht erzeugt:
     - Kopfzeile mit Druckdatum und Erfassungszeitraum.
     - KPI-Zusammenfassungsboxen (Zählerstand, Gesamtverbrauch, Gesamtkosten, Ø/Tag).
     - Jahres- und Monatsübersichtstabellen.
     - Tarif- und Preishistorie.
     - Vollständige Zählerstands-Chronik.
   - **Tipp für iPhone:** Im iOS-Druckfenster die Vorschau mit zwei Fingern aufziehen (Pinch-to-Zoom), um den Bericht direkt als **PDF in „Dateien“ zu sichern** oder per WhatsApp/Mail zu versenden!

4. **⚡ Minimalistisches Design (Fokus auf die wichtigsten Daten & Werte):**
   - In den Einstellungen unter **„Design-Stil“** kannst du mit einem Klick auf **„Minimalistisch“** umschalten:
     - **Extrem aufgeräumtes Erscheinungsbild:** Keine ablenkenden Verläufe, Schatten oder unnötige Zierelemente – ideal zum schnellen Ablesen vor Ort im Heizungskeller.
     - **Die wichtigsten Daten und Werte im direkten Fokus:**
       - **Aktueller Zählerstand (kWh):** Extra große, gestochen scharfe Ziffern mit Ablesedatum und aktuellem ct/kWh-Tarif.
       - **Letzter Zählerzuwachs:** $\Delta\text{kWh}$ und vergangene Tage.
       - **Letzte Kosten:** Rechnungsbetrag (€) und **durchschnittliche Kosten pro Tag (€/Tag)**.
       - **Laufender Monat & Jahr:** Kompakte Übersicht über aufgelaufene kWh und Kosten.
       - **Wennigsen-Heizprognose:** Sofort sichtbares Abrechnungsergebnis (+ Nachzahlung / - Rückzahlung).
       - **Großer Schnelleingabe-Button:** Schnelles Erfassen ohne Scrollen.
     - **Passendes Theme „Minimal Mono“:** Tiefes OLED-Schwarz mit hochkontrastigen weißen/silbernen Akzenten für maximalen Kontrast.

5. **🎨 Mehrere Designs, viele Farben & Wunschfarbwähler:**
   - **Hintergrund-Designs:**
     - *OLED Schwarz* (Pures Schwarz, minimaler Akkuverbrauch)
     - *Minimal Mono* (Monochrom Schwarz/Weiß, High Contrast)
     - *Schiefergrau* (Slate Dark)
     - *Nachtblau* (Deep Nordic Navy)
     - *Waldgrün* (Forest Eco)
     - *Cyberpunk* (Neon Dark Violett)
   - **Farb-Presets:** Flamme (Bernstein/Orange), Smaragd (Grün), Ozean (Cyan), Violett (Lila), Rubin (Rot), Gold (Gelb), Titan (Silber).
   - **Individuelle Wunschfarbe:** Eigener Farbkreis / Color-Picker zur freien Wahl jedes beliebigen Hex-Farbcodes!

5. **📑 Menüleiste & Reiter individuell anordnen (Reiter verschieben):**
   - Im Reiter **„Tarif & Setup“** unter **„Menüleiste & Reiter anordnen“** kannst du die Reihenfolge aller Tabs (Übersicht, Verlauf, Statistik, Tarif & Setup) frei nach deinen Wünschen anpassen.
   - Einfache Bedienung per **▲ / ▼ Pfeiltasten** (ideal für Touchscreens ohne versehentliches Verziehen).
   - Der Reiter an **Position 1** wird automatisch mit dem Badge **„Startseite“** versehen und dient als deine persönliche Standard-Startansicht beim Start der App.

6. **💾 Automatische Echtzeit-Sicherung & Session-Wiederherstellung:**
   - **Zero-Data-Loss:** Jeder eingetragene Zählerstand, Preis, Abschlag, Farbwahl und jede Reiter-Verschiebung wird sofort in Echtzeit persistent im Browser gespeichert.
   - **Nahtlose Fortsetzung:** Beim erneuten Öffnen der App lädt alles blitzschnell und startet exakt dort, wo du aufgehört hast (inklusive aktivem Tab, Monats-/Jahres-Unteransicht und Diagramm-Modus).
   - **Dezenter Status-Indikator:** Ein kurzer grüner **„✓ Gesichert“**-Badge in der Kopfzeile signalisiert jederzeit die erfolgreiche Speicherung.
   - **Lifecycle-Schutz:** Reagiert auf Hintergrundwechsel (`visibilitychange`, `pagehide`), sodass auch beim Sperren des iPhones oder App-Wechsel nichts verloren geht.

7. **📱 Perfekte iPhone 15 Pro Max Display-Ergonomie:**
   - **Kein schwarzer Balken:** Die untere Navigationsleiste ist fest am Bildschirmrand verankert (`100dvh` & dynamic Safe-Area-Integration).
   - **Nahtloser Home-Bar-Übergang:** Die Bar umschließt den Home-Indikator in der gewählten Oberflächenfarbe mit Blur-Effekt und 120px Überlaufschutz für überragendes iOS-App-Feeling.

8. **Tarif- & Stichtagsberechnung bei Preiserhöhung:**
   - Beliebig viele Preise pro kWh mit „Gültig ab“-Datum hinterlegen.
   - Verbrauchsintervalle über einen Preiswechsel hinweg werden automatisch zeitgewichtet aufgeteilt.

9. **Export & Import:**
   - Excel-kompatibler CSV-Export mit UTF-8 BOM und deutschen Trennzeichen.
   - Vollständiges JSON-Backup (inkl. aller Messwerte, Tarife, Reiterordnung und Theme-Einstellungen) und Restore.

---

## 🚀 Schritt-für-Schritt: Auf GitHub hochladen & auf dem iPhone öffnen

### Schritt 1: GitHub Repository erstellen
1. Öffne [github.com](https://github.com) und logge dich ein.
2. Klicke oben rechts auf das **+** &rarr; **New repository**.
3. Name eingeben (z. B. `gas-tracker`) und **Public** (öffentlich) wählen.
4. Klicke auf **Create repository**.

---

### Schritt 2: Dateien hochladen

#### Option A: Über das Terminal (Git)
Führe in diesem Projektordner folgende Befehle aus (ersetze `<dein-benutzername>`):

```bash
cd /Users/eugen/.gemini/antigravity/scratch/gas-tracker
git remote add origin https://github.com/<dein-benutzername>/gas-tracker.git
git branch -M main
git push -u origin main
```

#### Option B: Direkt im Browser per Drag & Drop
1. Klicke auf GitHub im neuen Repository auf **„uploading an existing file“**.
2. Ziehe alle Dateien aus dem Ordner in das Browserfenster.
3. Klicke auf **Commit changes**.

---

### Schritt 3: GitHub Pages aktivieren (Dauert 1 Minute)
1. Gehe im Repository auf **Settings** &rarr; **Pages**.
2. Wähle bei *Build and deployment*:
   - **Source:** *Deploy from a branch*
   - **Branch:** *main* und Ordner */ (root)*
3. Klicke auf **Save**.
4. Deine Web-App ist nach ca. 1 Minute erreichbar unter:
   ```text
   https://<dein-benutzername>.github.io/gas-tracker/
   ```

---

### Schritt 4: Auf dem iPhone 15 Pro Max als App installieren
1. Öffne **Safari** auf deinem iPhone 15 Pro Max und rufe deine GitHub-Pages-URL auf.
2. Tippe unten auf das **Teilen-Symbol** (Viereck mit Pfeil nach oben).
3. Scrolle im Menü nach unten und wähle **„Zum Home-Bildschirm“**.
4. Bestätige mit **Hinzufügen**.

Die App startet danach im echten Vollbildmodus ohne Browserleiste und funktioniert dank Service Worker auch ohne Netzempfang im Heizungskeller.

---

## 📁 Projektdateien

```text
gas-tracker/
├── index.html            # UI mit iOS 18 Design, Modals, Auswertungen & PDF-Container
├── style.css             # OLED Dark Themes, Farbwelten & @media print Stylesheet
├── app.js                # Berechnungslogik, Monats-/Jahresauswertung, Theme-Engine, PDF
├── manifest.webmanifest  # PWA Manifest für Vollbild auf dem iPhone
├── sw.js                 # Service Worker für 100% Offline-Betrieb
├── apple-touch-icon.png  # Hochauflösendes iOS App-Icon (180x180)
├── icon-192.png          # PWA Icon (192x192)
├── icon-512.png          # PWA Icon (512x512)
├── favicon.png           # Browser Tab Favicon
├── icon.svg              # Vektor-Grafik des App-Icons
└── README.md             # Diese Dokumentation
```
