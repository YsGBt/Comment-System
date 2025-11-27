# 🚀 Comment System

A fullstack comment system similar to YouTube with a Python FastAPI backend and a React + Vite frontend.

---
## 📦 Requirements
- **Docker** and **Docker Compose** 
---

## 🐳 Run the Project with Docker
### Quick Start
If you’re new to Docker, the easiest way to run the entire project is to execute the startup script:
```bash
./start.sh
```
This script handles building, migrating, and starting all the necessary containers.

### Manual Docker Compose Commands
#### First Time Setup
Before running the containers manually, make sure the `backend/alembic/versions` directory exists. If it doesn’t, create it:
```bash
mkdir -p backend/alembic/versions
```
Also, make sure Docker and Docker Compose are installed and running on your machine.  
Then, from the project root directory, run:
```bash
docker compose up --build
```
This will:
- Build and start the backend FastAPI server on http://localhost:8000
- Build and start the frontend React app on http://localhost:5173
- Start a PostgreSQL database container
- Start the database migration service to apply schema changes

#### Subsequent Runs (After Initial Build)
To start the containers without rebuilding, simply run:
```bash
docker compose up
```

### Stop the containers
```bash
docker compose down
```

### Remove the containers
```bash
docker compose down -v
```

## 📁 Project Structure
```css
Capstone/
├── backend/
|   ├── alembic/
│   ├── app/
│   ├── Dockerfile
│   ├── Dockerfile.migrate
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── ...
├── docker-compose.yml
├── README.md
```

## 📝 Notes
- The backend runs on http://localhost:8000
- The frontend runs on http://localhost:5173