# Article Processing Service

This project uses **Node.js (Express + TypeScript)** with **Redis** and **BullMQ**.
Docker is the recommended way to run the project locally and in production.

---

## 🚀 Prerequisites

Before running the project, make sure you have:

### 1️⃣ Docker installed

Check if Docker is installed:

```bash
docker --version
```

### 2️⃣ Docker Compose available

Check:

```bash
docker compose version
```

### 📦 Project Setup

#### Step 1: Clone the repository

```base
git clone <your-repo-url>
cd <project-folder>
```

#### Step 2: Create .env file

Create a .env file in the project root:

```bash
PORT=3000
TASK_RETRIES=3
CONCURRENCY_WORKER_COUNT=2
```

### 🐳 Run with Docker (Recommended)

#### Step 3: Build Docker images

If this is your first time running the project or after code changes:

```bash
docker compose build
```

#### Step 4: Start the services (Detached Mode)

```bash
docker compose up -d
```

This will start project

---

```md
# 📘 API Documentation – Article Processing Service

Base URL: http://localhost:3000
```

```http
GET /health
```

---

```http
GET /metrics
```

---

```http
POST /api/articles
```

---

```http
GET /api/articles/:jobId
```

#### change InMemoryCache

```bash
npm run cache:set:memory
```

#### change fileBasedCache

```bash
npm run cache:set:file
```
