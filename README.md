# Hemingways Scheduler

To run this project locally, pick **one** of the two options below.

View the page at http://localhost:5173/ once it's running.

---

## Option 1: With Docker (recommended if Docker Desktop works for you)

1. Install Docker Desktop: https://docs.docker.com/desktop/setup/install/windows-install/
2. From the root folder of this project run `docker compose up -d`

---

## Option 2: Without Docker (Windows users with virtualization issues)

If you can't install Docker Desktop (virtualization disabled in BIOS, no admin rights, Hyper-V/WSL2 problems, etc.), you can run the app directly with Node.js.

### 1. Install Node.js 20 (LTS)

Pick whichever installer you prefer:

- **Official installer** — download the Windows LTS installer from https://nodejs.org/en/download and run it (accept the defaults; npm is included).
- **winget** (built into Windows 10/11) — open PowerShell and run:
  ```powershell
  winget install OpenJS.NodeJS.LTS
  ```
- **nvm-windows** (if you need to juggle multiple Node versions) — https://github.com/coreybutler/nvm-windows/releases, then:
  ```powershell
  nvm install 20
  nvm use 20
  ```

Verify the install by opening a **new** PowerShell window and running:
```powershell
node --version   # should print v20.x.x
npm --version
```

### 2. Install dependencies

From the root folder of this project:
```powershell
npm install
```

### 3. Start the dev server

```powershell
npm run dev
```

Leave the terminal open — the dev server runs in the foreground and hot-reloads as you edit files. Press `Ctrl+C` to stop it.

### Troubleshooting

- **`npm` not recognized** — close and reopen your terminal so it picks up the updated `PATH`.
- **Port 5173 already in use** — something else is on that port. Stop the other process, or change the port in `package.json` (`"dev": "vite --host 0.0.0.0 --port 5174"`).
- **`EACCES` / permission errors on `npm install`** — run the terminal as a regular user (not Administrator); if you previously ran npm as admin, delete the `node_modules` folder and try again.
- **Corporate proxy / SSL errors on `npm install`** — ask IT for the proxy settings, then:
  ```powershell
  npm config set proxy http://your-proxy:port
  npm config set https-proxy http://your-proxy:port
  ```
