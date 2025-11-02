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

Make sure Docker and Docker Compose are installed & running.

**_i. LOCAL Development_**

From the project root (`sql_runner_application`):

Environment Variables Setup (.env Files)

```
# Create backend .env
cd backend && cat > .env <<EOF
DATABASE_URL=sql_runner.db
FLASK_ENV=production
PORT=8000
DEBUG=true
EOF

# Create frontend .env
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

Backend: http://127.0.0.1:8000

Frontend: http://localhost:3000

You can stop the containers anytime with:

```
docker-compose down
```

**_ii. PRODUCTION Development_**

From the project root (`sql_runner_application`):

```
cd frontend &&
touch .env.production &&
echo "REACT_APP_API_BASE=https://sql-runner-application.onrender.com/api" > .env.production
```

For deployment, use your `.env.production` file:

```
docker-compose --env-file .env.production up --build
```

## 🧩 2. Manual Setup (Without Docker)

Open your terminal and navigate to the project root:

**⚠️ Note:** Users
Ensure that Python 3.x is installed and added to your PATH. You can verify this by running: `python --version`, `python3 --version`, `py --version`
If you don’t have Python installed, download it from [python.org/downloads](https://www.python.org/downloads/) now.

Install dependencies (frontend):

```bash
npm install
cd frontend && npm install && cd ../backend
```

You can create virtual environment **(optional)**

```bash
python -m venv .venv              # create hidden virtual environment
source .venv/bin/activate         # on Windows: .venv\Scripts\activate
```

Install dependencies **(backend)**

```bash
pip install -r requirements.txt && cd ..
```

Create a .env file for API communication:

```
cd frontend && touch .env && echo "REACT_APP_API_BASE=http://127.0.0.1:8000/api" > .env && cd ..

```

Run both servers together:

```bash
npm run dev
```

Once started:

- Frontend → http://localhost:3000

- Backend API → http://127.0.0.1:8000
  (or 5000 depending on setup)

✅ Both servers are running, your application is ready to serve.

On Browser: `{ "message": "SQL Runner API is running!" }`

On Console:

```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8000    # copy this url and paste into your .env REACT_APP_API_BASE = url
 * Running on http://172.21.92.249:8000
```

The backend will start at `http://127.0.0.1:8000` \***\*copy the url\*\***

✅ Your backend is working correctly!

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
