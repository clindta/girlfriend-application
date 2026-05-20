# Girlfriend Application — Chris

Ein interaktives Bewerbungsformular als Single-Page-HTML. Läuft direkt im Browser, speichert Antworten in Supabase (DB + Storage für Voice/Video) und kann kostenlos via GitHub Pages gehostet werden.

---

## Ordnerstruktur

```
girlfriend-application/
├── index.html      ← die App (Single-File, kein Build nötig)
├── supabase.sql    ← einmal in Supabase ausführen
└── README.md       ← diese Anleitung
```

---

## Quickstart

1. **Supabase-Projekt anlegen** (siehe unten)
2. **`SUPABASE_URL` und `SUPABASE_ANON_KEY`** in `index.html` eintragen (Zeile ~770)
3. **GitHub Pages aktivieren** (siehe unten)
4. **Fertig** — Link teilen

Ohne Supabase-Setup läuft die App im **Demo-Modus** — Antworten werden nicht gespeichert, sondern nur in die Browser-Console geloggt.

---

## 1) Supabase-Setup

### a) Projekt erstellen
1. [supabase.com](https://supabase.com) → "New Project"
2. Region: Frankfurt (EU) für DSGVO
3. DB-Passwort merken (brauchst du nur intern)

### b) Tabelle + Storage anlegen
- Im Supabase-Dashboard: **SQL Editor → New query**
- Inhalt von `supabase.sql` einfügen → **Run**

Das legt an:
- Tabelle `gf_applications` mit allen Feldern
- Storage Bucket `gf-voice-messages` (öffentlich lesbar für die URL im Mail-Link)
- RLS-Policies, die nur INSERT von außen erlauben (niemand kann Bewerbungen auslesen außer dir im Dashboard)

### c) Keys holen
- Supabase Dashboard → **Settings → API**
- Kopieren:
  - `Project URL` → `SUPABASE_URL`
  - `anon public` Key → `SUPABASE_ANON_KEY`

### d) In `index.html` eintragen
Suche nach diesem Block (ganz oben im `<script>`):

```js
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

Werte einsetzen, speichern.

### e) Testen
- Öffne `index.html` lokal im Browser (Doppelklick)
- Formular ausfüllen → Submit
- Im Supabase-Dashboard: **Table Editor → gf_applications** → neuer Eintrag da? ✓

---

## 2) Benachrichtigung per Email (optional)

Damit du nicht ständig in der DB nachschauen musst:

### Option A: Supabase Database Webhook + Resend (empfohlen)
1. Resend-Account anlegen (3.000 Mails/Monat gratis)
2. Supabase → **Database → Webhooks → Create Webhook**
3. Table: `gf_applications`, Event: `INSERT`
4. URL: Edge Function oder Resend-API direkt

### Option B: Email-Polling per Cron
Einfacher: schreib dir einen kleinen Script-Job, der jede Stunde die Tabelle abfragt und neue Einträge per Email schickt.

### Option C (für später): Pushover / Telegram Bot
Live-Notification auf's Handy.

---

## 3) GitHub Pages Deployment

### a) Git-Repo anlegen
```bash
cd ~/Desktop/girlfriend-application
git init
git add index.html README.md supabase.sql
git commit -m "initial: girlfriend application form"
```

### b) Auf GitHub pushen
1. [github.com/new](https://github.com/new) → Repo `girlfriend-application` (Public oder Private — beides geht für Pages bei kostenlosem Account ist Public Pflicht)
2. Lokal:
```bash
git remote add origin git@github.com:DEIN_USERNAME/girlfriend-application.git
git branch -M main
git push -u origin main
```

### c) Pages aktivieren
1. Repo auf GitHub → **Settings → Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main`, Folder: `/ (root)`
4. **Save**
5. Nach ~1 Minute: Link verfügbar unter
   `https://DEIN_USERNAME.github.io/girlfriend-application/`

### d) Eigene Domain (optional)
- DNS: CNAME auf `DEIN_USERNAME.github.io`
- GitHub Pages → Custom Domain eintragen
- HTTPS-Toggle aktivieren

---

## 4) Updates pushen

```bash
# Was geändert?
git status
git diff

# Committen + pushen
git add index.html
git commit -m "update: copy in step X"
git push
```

Nach ~1 Min ist die neue Version live.

---

## Sicherheitsnotizen

- **Der `anon`-Key ist öffentlich.** Das ist OK — RLS in `supabase.sql` erlaubt nur INSERTs, kein SELECT von außen.
- **Niemals den `service_role` Key in die HTML packen.** Der gibt Vollzugriff.
- **Voice/Video-URLs sind öffentlich**, sobald jemand die URL kennt. Sie sind aber zufällig generiert und nirgendwo verlinkt außer in deiner DB-Zeile.
- **DSGVO**: Du sammelst personenbezogene Daten. Bei öffentlichem Hosting wäre eigentlich Impressum + Datenschutzerklärung Pflicht. Für eine private Bewerbungsseite ist das eine Grauzone — keine Rechtsberatung, aber hol dir im Zweifel eine.

---

## Lokal testen ohne Supabase

Einfach `index.html` doppelklicken — läuft. Submits werden in die Browser-Console geloggt (F12 → Console). Du siehst das ganze Payload-Objekt und kannst das Formular bequem durchklicken.

---

## Bekannte Limits

- **Voice-Recording in Safari iOS**: funktioniert ab Safari 14.5+, ältere iPhones können nur Text.
- **Datei-Größe**: Storage-Bucket hat default 50 MB pro File — sollte für 1–2 Min Voice/Video easy reichen.
- **Free Tier Supabase**: 500 MB DB + 1 GB Storage = ca. 200–500 Bewerbungen mit Video. Mehr als genug.
