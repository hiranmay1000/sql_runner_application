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

## 🐳 1. Run Entire App Using Docker

Make sure Docker and Docker Compose are installed.

**_i. Local Development_**

From the project root (`sql_runner_application`):

```bash
docker-compose up --build
```

This command builds both backend and frontend containers and starts them together.

Backend: http://127.0.0.1:8000

Frontend: http://localhost:3000

You can stop the containers anytime with:

```
docker-compose down
```

**_ii. Production Mode_**

For deployment, use your `.env.production` file:

```
docker-compose --env-file .env.production up --build
```

Your `.env.production` should include the production API endpoint:

```
REACT_APP_API_BASE=https://sql-runner-application.onrender.com/api
```

## 🧩 2. Manual Setup (Without Docker)

### i. Backend Setup (Flask + SQLite)

```bash
cd ./sql_runner_application/backend
python -m venv .venv              # create hidden virtual environment
source .venv/bin/activate         # on Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend runs at:

`http://127.0.0.1:8000  OR  http://127.0.0.1:5000`

You should see:

On Browser: `{ "message": "SQL Runner API is running!" }`

On Console:

```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8136    # copy this url and paste into your .env REACT_APP_API_BASE = url
 * Running on http://172.21.92.249:8136
```

The backend will start at `http://127.0.0.1:8136` \***\*copy the url\*\***

✅ Your backend is working correctly!

### ii. Frontend Setup (React)

Open a new terminal:

```
cd ./sql_runner_application/frontend
```

Create a .env file for API communication:

```
touch .env
```

Paste this line inside .env:

```
REACT_APP_API_BASE=http://127.0.0.1:8000/api
```

If your backend runs on a different port (e.g., 5000), replace 8000 accordingly.

Then install and run the app:

```
npm install
npm start
```

Your frontend will be available at 👉 `http://localhost:3000`

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
