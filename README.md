# Bremen stoppt den Mietennotstand! 🛑

Dies ist die modernisierte, responsive und hochperformante Website für die Bürgerantrags-Kampagne **"Bremen stoppt den Mietennotstand!"**.

Die Seite wurde komplett neu aufgebaut und basiert auf modernen Webstandards und dem **Mobile-First-Prinzip**.

## 🌟 Features der neuen Website
- **Modernes Kampagnen-Design**: Klare, emotionale Signalfarben, strukturierte Layouts und eine erstklassige Typografie (Inter + Outfit).
- **Interaktiver Miet-Check**: Ein praktischer Mietpreis-Rechner, der die Kaltmiete pro Quadratmeter berechnet und nach den gesetzlichen Maßstäben (§ 5 WiStG und § 291 StGB) prüft, ob Verdacht auf Mietpreisüberhöhung oder Mietwucher vorliegt.
- **Interaktive Forderungskarten**: Klappbare, mobile-optimierte Karten zur übersichtlichen Vermittlung der 6 Kernforderungen.
- **Strukturierter Hintergrundbereich**: Ein Tab-System, das Wände aus Text auf kleinen Bildschirmen vermeidet und die Fakten lesefreundlich sortiert.
- **Unterschriften-Standorte**: Eine voll integrierte, responsive Google Maps-Karte, die alle Sammelstellen übersichtlich anzeigt.
- **Vollständig barrierefrei & responsive**: Große Touch-Targets auf Smartphones (mind. 48px), hervorragender Farbkontrast und optimierte Performance dank Tailwind CSS.

---

## 💻 Lokale Vorschau auf Ihrem Mac

Sie können sich die Website auf zwei Arten lokal ansehen:

### Methode A: Direktes Öffnen (Ohne Installation)
Doppelklicken Sie einfach auf die Datei `index.html` in diesem Verzeichnis, um die Seite in Ihrem Standard-Webbrowser (Safari, Chrome oder Firefox) zu öffnen.

### Methode B: Lokaler Webserver (Empfohlen)
Um die Seite genau wie auf einem echten Webserver (und über WLAN auch auf Ihrem Smartphone!) zu testen, führen Sie in Ihrem Terminal im Projektordner Folgendes aus:

**Mit Python (standardmäßig auf macOS installiert):**
```bash
python3 -m http.server 8000
```
Öffnen Sie anschließend im Browser: **`http://localhost:8000`**

---

## 🚀 Hosting auf GitHub Pages (Kostenlos)

Da es sich um eine rein statische Website handelt (HTML, CSS, JS), können Sie sie völlig kostenlos über **GitHub Pages** hosten und unter einer Adresse wie `https://ihr-benutzername.github.io/bremen-stoppt-den-mietennotstand/` veröffentlichen.

### Schritt-für-Schritt-Anleitung:

1. **Neues Repository auf GitHub erstellen**:
   - Gehen Sie auf [github.com](https://github.com) und erstellen Sie ein neues, öffentliches Repository (z. B. mit dem Namen `bremen-mietennotstand`).
   - Fügen Sie *keine* README, `.gitignore` oder Lizenz bei der Erstellung hinzu (da wir diese Dateien bereits lokal haben).

2. **Git initialisieren & Dateien hochladen**:
   Öffnen Sie Ihr Terminal, wechseln Sie in dieses Verzeichnis und führen Sie folgende Befehle aus:
   ```bash
   # Git initialisieren
   git init

   # Alle Dateien hinzufügen
   git add .

   # Ersten Commit erstellen
   git commit -m "Initial commit: Modernized mobile-first campaign page"

   # Hauptbranch benennen
   git branch -M main

   # Verbindung zum GitHub Repository herstellen (Ersetzen Sie den Link mit Ihrem Link!)
   git remote add origin https://github.com/IHR-BENUTZERNAME/bremen-mietennotstand.git

   # Dateien pushen
   git push -u origin main
   ```

3. **GitHub Pages aktivieren**:
   - Gehen Sie in Ihrem Repository auf GitHub auf **Settings** (Einstellungen).
   - Klicken Sie im linken Menü auf **Pages**.
   - Wählen Sie unter *Build and deployment* -> *Branch* den **`main`** Branch aus und klicken Sie auf **Save**.
   - Nach ca. 1–2 Minuten ist Ihre Website weltweit live unter der angezeigten URL erreichbar!
