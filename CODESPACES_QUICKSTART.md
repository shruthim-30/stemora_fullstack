# 🚀 Running Stemora in GitHub Codespaces

This repository is pre-configured with a `.devcontainer` configuration, automated port forwarding, and dependencies for **GitHub Codespaces**.

---

## 3 Simple Steps to Run in GitHub Codespaces

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Enter repository name: `stemora-website`.
3. Set visibility to **Public** or **Private**.
4. Click **Create repository**.

### Step 2: Upload This Codebase
Choose either **Option A (Web Upload)** or **Option B (Git Terminal)**:

#### Option A: Drag & Drop via GitHub Website (Easiest)
1. On your newly created GitHub repository page, click **"uploading an existing file"**.
2. Unzip `stemora-fullstack.zip` on your computer.
3. Drag and drop all the files and folders (`client/`, `server/`, `deploy/`, `.devcontainer/`, `package.json`, etc.) into GitHub.
4. Click **Commit changes**.

#### Option B: Using Git in Terminal
```bash
git init
git add .
git commit -m "Initial commit - Stemora full-stack dynamic platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stemora-website.git
git push -u origin main
```

---

### Step 3: Launch GitHub Codespace
1. In your GitHub repository, click the green **<> Code** button.
2. Select the **Codespaces** tab.
3. Click **"Create codespace on main"**.
4. Wait 1-2 minutes while GitHub automatically:
   - Provisions the Node.js 20 container
   - Runs `npm install` for root, server, and client
   - Configures port forwarding for ports **3000** (React) and **5000** (Express API)

---

### Step 4: Run the Application
In the Codespace integrated terminal at the bottom, run:

```bash
npm run dev
```

This single command starts both services concurrently:
- 🟡 **Frontend (React)**: `http://localhost:3000`
- 🔵 **Backend (Express)**: `http://localhost:5000`

A notification toast will appear at the bottom right of Codespaces:
> *"Your application running on port 3000 is available. [Open in Browser]"*

Click **Open in Browser** to view your live dynamic website!

---

## 🛠️ Testing Features in Codespaces
- **Contact Form**: Fill out the school demo inquiry form. It will submit to the Express backend on port 5000 and log the inquiry.
- **Admin Panel**: Click **⚙️ Admin** in the navbar to open the control panel, view received inquiries, and edit live statistics.
- **Photo Uploads**: Tap on any photo card to select and preview photos.
