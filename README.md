# BotConversation

A full-stack chat conversation viewer for support cases, built with **React**, **Node.js**, **PostgreSQL**, and **Prisma**.

This project allows support representatives to view user conversations, messages, and case metadata in a clean, MUI-styled interface. It also includes an Express-based backend API and PostgreSQL integration using Prisma ORM.

---

## 🚀 Features

- 💬 Chat message UI with avatars, timestamps, and directional alignment
- 🗂 View conversation summaries and full details
- 🧾 Message timestamp formatting (no libraries required)
- 🧱 PostgreSQL database schema using Prisma
- 🎨 MUI (Material UI) for clean and responsive components
- ✅ Bot welcome message is auto-generated on new conversations

---

## 🛠 Tech Stack

- **Frontend:** React, MUI
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Tooling:** Vite, Git

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/EliyaouVaknin/BotConversation.git
cd BotConversation
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/chatapp
PORT=3000
```

Run Prisma:

```bash
npx prisma db push
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Folder Structure

```
BotConversation/
├── client/        # React + MUI frontend
└── server/        # Express + Prisma backend
```

---

## 🧪 Sample Conversation Flow

1. A new conversation is created via POST `/conversations/new`
2. The bot auto-replies with a greeting
3. All messages and conversation data are stored in PostgreSQL
4. Chat UI renders messages with alignment, avatars, and timestamp formatting

---

## 📃 License

This project is for educational/demo purposes and is not licensed for production use.

---

## 🙋‍♂️ Author

Built with ❤️ by [Eliyahu Vaknin](https://github.com/EliyaouVaknin)