# SQL Runner Application

A full-stack web app that lets users execute SQL queries directly from a browser.  
Built with **React (frontend)**, **Flask (backend)**, and **SQLite**.

---

## 🚀 Features

- Run and view SQL queries in real time
- Display database tables and schema details
- Backend powered by Flask + SQLite

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/sql_runner_application.git
cd sql_runner_application
```

### 2. Backend Setup (Flask + SQLite)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend will start at `http://127.0.0.1:8000` || `http://127.0.0.1:5000`

You should see `{ "message": "SQL Runner API is running!" }`

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
```

Create a .env file in the frontend directory:

```bash
REACT_APP_API_BASE=http://127.0.0.1:8000/api || http://127.0.0.1:5000/api
```

Then start the React app:

```bash
npm start
App runs at http://localhost:3000
```

### Test Locally

- Ensure backend → port 8000

- Ensure frontend → port 3000

- Visit http://localhost:3000 and try queries like:

```bash
SELECT * FROM table_name LIMIT 5;
```

---

## 🧾 Additional Information

### ☁️ Deployment

- Backend: Render

- Frontend: Vercel

For production .env:

```bash
REACT_APP_API_BASE=https://sql-runner-application.onrender.com/api
```

### Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, Material UI                  |
| Backend  | Flask (Python)                      |
| Database | SQLite                              |
| Hosting  | Render (Backend), Vercel (Frontend) |

### Author

Hiranmay Mandal

- 🧰 Position: Software Developer @ ARC Document Solutions
- 📧 Gmail: hiranmay1000@gmail.com
- 🌐 LinkedIn: https://www.linkedin.com/in/hiranmay1000/
- 💻 Leetcode: https://leetcode.com/u/hiranmay1000/

🪪 License
This project is licensed under the MIT License — free to use and modify.
