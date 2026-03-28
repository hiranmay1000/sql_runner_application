# SQL Runner Application

A full-stack web app that lets users execute SQL queries directly from a browser.  
Built with **React (frontend)**, **Flask (backend)**, and **SQLite**.

App is live on: https://sqlrunneronline.vercel.app/

## Video demo


https://github.com/user-attachments/assets/cd5747db-6d79-4210-a66e-33f1374d2d7a



---

## 🚀 Features

- Run and view SQL queries in real time
- Display database tables and schema details
- Backend powered by Flask + SQLite

---

## ⚙️ Setup Instructions

## 🐳 1. Run Entire App Using Docker

Make sure Docker and Docker Compose are installed & running.

> ### **LOCAL Development**

From the project root (`sql_runner_application`):

Create a .env file for API communication **(frontend & backend)**:

```
#---- Create backend .env
cd backend && cat > .env <<EOF
DATABASE_URL=sql_runner.db
FLASK_ENV=development
PORT=8000
EOF

#---- Create frontend .env
cd ../frontend && cat > .env <<EOF
REACT_APP_API_BASE=http://127.0.0.1:8000/api
EOF

```

Install node modules for frontend:

```
npm install
```

Start docker:

```bash
docker-compose up --build
```

This command builds both backend and frontend containers and starts them together.

- Backend: http://127.0.0.1:8000

- Frontend: http://localhost:3000

You can stop the containers anytime with:

```
docker-compose down
```

> ### **PRODUCTION Development**

From the project root (`sql_runner_application`):

```
#---- Create backend .env.production
cd backend && cat > .env.production <<EOF
DATABASE_URL=sql_runner.db
FLASK_ENV=production
PORT=8000
EOF

#---- Create frontend .env.production
cd ../frontend &&
touch .env.production &&
echo "REACT_APP_API_BASE=https://sql-runner-application.onrender.com/api" > .env.production
```

Install node modules for frontend:

```
npm install
```

Start docker, for deployment, use your `.env.production` file:

```
docker-compose --env-file .env.production up --build
```

---

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

1. Production Deployment
   Backend **_(Render)_**

- Deployed at → https://sql-runner-application.onrender.com

2. Frontend **_(Vercel)_**

- Deployed at → https://sql-runner-application.vercel.app

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
