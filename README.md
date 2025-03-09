# 🚀 React Frontend with MySQL & JSON Data Fetching

Welcome to the **Vite-powered React frontend** that seamlessly integrates **MySQL** and **JSON-based data fetching**. This project explores **data visualization using charts** and backend integration with MySQL.

## ✨ Features

- ⚡ **Vite + React** for a fast and modern frontend setup.
- 📊 **Dynamic Charts** using `react-chartjs-2`.
- 🔄 **Data Fetching from JSON & MySQL**:
  - **`jsonModel` branch**: Fetches data from a JSON file.
  - **`sqlModel` branch**: Fetches data from a MySQL database.
- 🛠 **MySQL CRUD Operations** integrated with the backend.
- 🔄 **Seamless Branch Switching** to explore different data sources.
- 🎨 **Responsive UI** for an enhanced user experience.

## 🛠️ Technologies Used

- **React** (with Vite)
- **React Hooks** (`useState`, `useEffect`)
- **Chart.js + React Charts**
- **MySQL** (for `sqlModel` branch)
- **Node.js & Express** (Backend for MySQL CRUD)
- **Git & Git Branching**

## 📌 Branches Overview

| Branch | Description |
|--------|-------------|
| `jsonModel` | Fetches data from a local JSON file |
| `sqlModel` | Connects to a MySQL database and performs CRUD operations |

Switch between branches to explore different data-fetching mechanisms. 

```bash
# Clone the repository
git clone https://github.com/yourusername/janata-frontend.git

# Navigate to the project folder
cd janata-frontend

# Checkout the JSON model branch
git checkout jsonModel

# Checkout the SQL model branch
git checkout sqlModel
```

## 📈 Learnings from this Project

🔹 **Integrating MySQL with React** via Node.js backend.  
🔹 **Using Charts in React** for data visualization.  
🔹 **Exploring Git Branching** for parallel feature development.  
🔹 **Hosting a MySQL Server on Railway** for the first time.  
🔹 **Connecting MySQL with Node.js & React** for full-stack integration.  

## 🚀 Getting Started

1️⃣ **Install dependencies**
```bash
npm install
```

2️⃣ **Run the frontend**
```bash
npm run dev
```

3️⃣ **(Optional) Start backend for MySQL** (for `sqlModel` branch)
```bash
cd backend
node server.js
```

4️⃣ **Enjoy the interactive dashboard with dynamic charts!**

## 📌 Challenges Faced

🔴 **Hosting MySQL on Railway**: Setting up and configuring a remote MySQL database for the first time was challenging.  
🔴 **Integrating MySQL with Node.js & React**: Ensuring seamless data flow between frontend and backend required troubleshooting and debugging.  
🔴 **Handling Git Branching Efficiently**: Switching between `jsonModel` and `sqlModel` branches while maintaining code integrity.

## 📜 License
This project is open-source and available under the **MIT License**.

---

🎉 **Thank you for checking out this project!** Happy coding! 🚀

