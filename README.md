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
git clone https://github.com/hiranmay1000/sql_runner_application.git
cd sql_runner_application
```

### 2. Backend Setup (Flask + SQLite)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend will start at `http://127.0.0.1:8000` \***\*copy the url\*\***

You should see:
On Browser: `{ "message": "SQL Runner API is running!" }`
On Console:
```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8136    # copy this url and paste into your .env REACT_APP_API_BASE = url
 * Running on http://172.21.92.249:8136
```

✅ Your backend is working correctly!

### 3. Frontend Setup (React)

Open a new terminal and run:

\***\*i. Using regular method 🧩\*\***

```bash
cd ./sql_runner_application/frontend
npm install
```

Create a **.env** file in the frontend directory:

```
touch .env
```

Paste backend uri for api communication

```bash
REACT_APP_API_BASE=http://127.0.0.1:8000/api
```

If your backend runs on port 5000, replace 8000 with 5000.

Start the React app:

```bash
npm start
```

Your app will run at 👉 http://localhost:3000

\***\*i. Using docker (optional) 🧩\*\***

Run in Local Environment:

```bash
docker-compose up -- build
```

Run In Production

```bash
docker-compose --env-file .env.production up --build
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
