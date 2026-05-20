# Girlfriend Application — Chris

Ein interaktives Bewerbungsformular mit Admin-Dashboard. Single-Page-HTML, läuft direkt im Browser, speichert Antworten in Supabase (DB + Storage für Voice/Video). Kostenlos gehostet via GitHub Pages.

---

## Ordnerstruktur

```
girlfriend-application/
├── index.html              ← Das Formular (für Bewerberinnen)
├── admin/index.html        ← Admin-Dashboard (für dich)
├── config.js               ← Geteilte Supabase-Config (URL + Key)
├── quiz-defaults.js        ← Quiz-Definition (Schritte, Fragen, Adjektive)
├── supabase.sql            ← Einmal in Supabase ausführen
└── README.md               ← Diese Anleitung
```

**Live-URLs (nach GitHub-Pages-Deployment):**
- Formular: `https://DEIN_USERNAME.github.io/girlfriend-application/`
- Admin: `https://DEIN_USERNAME.github.io/girlfriend-application/admin/`

---

## Quickstart (kompletter Setup)

### 1. Supabase-Projekt anlegen

1. [supabase.com](https://supabase.com/dashboard) → **New project**
2. Name: `girlfriend-application`, Region: **Frankfurt (EU Central)**
3. DB-Passwort: komplex (musst du dir nicht merken — nur intern)
4. Warten bis Status grün ist (~2 Min)

### 2. Schema einspielen

- Supabase-Dashboard → **SQL Editor → New query**
- Inhalt von [supabase.sql](supabase.sql) reinkopieren → **Run**
- Erfolgsmeldung sollte erscheinen — fertig

Das legt an:
- Tabelle `gf_applications` (Bewerbungen)
- Tabelle `gf_quiz_steps` (editierbares Quiz)
- RPC `get_gf_quiz_steps` (das Formular lädt das Quiz darüber)
- Storage Bucket `gf-voice-messages` (Audio/Video)
- RLS-Policies:
  - Bewerbungen: jeder darf INSERT, nur eingeloggte Admins dürfen SELECT/DELETE
  - Quiz: jeder darf lesen, nur eingeloggte Admins dürfen bearbeiten

### 3. Admin-User anlegen

Damit du dich im Dashboard einloggen kannst:

1. Supabase Dashboard → **Authentication → Users**
2. **Add user → Create new user**
3. Email + Passwort vergeben
4. **"Auto Confirm User" aktivieren** (sonst musst du eine Bestätigungs-Mail bestätigen, die nirgendwohin geht)
5. Optional: **Authentication → Providers → Email** → **"Allow new users to sign up" AUS**, damit niemand sonst Accounts anlegen kann

### 4. Keys in config.js eintragen

- Supabase Dashboard → **Settings → API**
- Kopier:
  - `Project URL` → in `config.js` als `SUPABASE_URL`
  - `anon public` Key → in `config.js` als `SUPABASE_ANON_KEY`

`config.js` sieht dann so aus:

```js
window.GF_CONFIG = {
  SUPABASE_URL: 'https://xxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGc...',
  CONTACT_EMAIL: 'clindta@gmail.com',
  OWNER_FIRST_NAME: 'Chris'
};
```

### 5. Pushen

```bash
cd ~/Desktop/girlfriend-application
git add config.js
git commit -m "connect supabase"
git push
```

### 6. Quiz initialisieren

- Geh auf das Admin-Dashboard (`/admin/`)
- Mit deinem Admin-Account einloggen
- Tab **"Quiz"** → Button **"Defaults synchronisieren"** klicken
- Damit werden alle 14 Schritte aus `quiz-defaults.js` in die DB geschrieben

Ab jetzt kannst du jeden Schritt im Dashboard editieren.

---

## Admin-Dashboard Features

### Bewerbungen
- Liste aller eingegangenen Bewerbungen
- Suche nach Name, Kontakt oder Typ
- Klick auf Eintrag → alle Antworten + Voice/Video-Player inline
- **Live-Updates**: neue Bewerbungen erscheinen sofort (Realtime-Channel)
- Bewerbung löschen (mit Bestätigung)
- Stats: Total, Heute, mit Voice/Video, mit Text-Nachricht

### Quiz-Editor
- Sidebar mit allen Schritten + Vorschau der Frage
- Klick auf Schritt → Editor öffnet sich rechts
- Pro Schritt editierbar:
  - Frage + Untertitel (DE + EN)
  - Antwortmöglichkeiten (für Single-Choice): Label, Sub, Value, Freitext-Erlaubt
  - Chips (für Adjektive): einfache DE/EN-Liste
  - Felder (für Schnellrunde): Key + Label + Placeholder
  - Placeholder + Mindestlänge (für Freitext-Schritte)
  - Überspringbar-Flag
- Antworten/Chips neu sortieren (↑↓), löschen (✕), hinzufügen
- Speichern pro Schritt
- "Defaults synchronisieren" — alles auf Code-Defaults zurücksetzen

---

## Lokal entwickeln/testen

Doppelklick auf `index.html` öffnet das Formular im Browser. Solange Supabase noch nicht konfiguriert ist, läuft alles im **Demo-Modus** — Submits werden in der Browser-Console geloggt (F12), nicht gespeichert.

Wichtig: `file://`-URLs erlauben kein Storage-Upload. Für realistisches lokales Testen einen Mini-Server starten:

```bash
cd ~/Desktop/girlfriend-application
python3 -m http.server 8000
# → http://localhost:8000
# → http://localhost:8000/admin/
```

---

## GitHub Pages Updates

```bash
cd ~/Desktop/girlfriend-application

# Was geändert?
git status
git diff

# Committen + pushen
git add -A
git commit -m "describe change"
git push
```

Nach ~1 Min ist die neue Version live.

---

## Sicherheit

- **Der `anon`-Key ist öffentlich** — das ist okay, RLS schützt die Daten.
- **Niemals `service_role` Key in den Code** — der gibt Vollzugriff.
- **Bewerbungen sind nur für eingeloggte User lesbar** (RLS). Wenn du in der Supabase Auth den Self-Signup deaktivierst, kann sich niemand außer dir einloggen.
- **Voice/Video-URLs sind öffentlich**, wenn man sie kennt. Sie sind zufällig generiert und nirgendwo verlinkt außer in deiner DB-Zeile.
- **Admin-URL ist öffentlich erreichbar**, aber ohne Login zeigt sie nur den Login-Screen — kein Zugriff auf Daten.
- **DSGVO**: Bei öffentlichem Hosting wäre Impressum + Datenschutzerklärung theoretisch Pflicht. Für eine private Bewerbungsseite ist das eine Grauzone — im Zweifel rechtlich abklären.

---

## Bekannte Limits

- **Voice-Recording iOS**: ab Safari 14.5+. Ältere iPhones nutzen Text-Fallback.
- **File-Größe**: Storage default 50 MB pro File — reicht für 1–2 Min Voice/Video easy.
- **Supabase Free Tier**: 500 MB DB + 1 GB Storage = ca. 200–500 Bewerbungen mit Video. Mehr als genug.
- **Realtime**: muss in Supabase-Dashboard unter **Database → Replication** für die Tabelle `gf_applications` aktiviert sein, sonst kommen keine Live-Updates im Admin.
