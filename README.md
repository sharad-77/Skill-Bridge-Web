# 🌉 Skill-Bridge

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/status-active-brightgreen.svg" alt="Status">
  <img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Welcome">
</div>

> A dynamic web platform designed to connect students and mentors, facilitate skill exchange, and foster project collaboration.

Skill-Bridge provides a comprehensive ecosystem for learning, teaching, and building together. Whether you are a student eager to learn or a mentor ready to guide, Skill-Bridge is your gateway to a world of opportunities.

---

## ✨ Key Features

-   👤 **Dual User Roles:** Separate registration and onboarding flows for **Students** and **Mentors**.
-   🔐 **Secure Authentication:** Robust authentication system using JSON Web Tokens (JWT).
-   🧑‍💻 **Rich User Profiles:** Differentiated profiles for students and mentors to showcase skills, experience, projects, and social links.
-   🎓 **Skill Exchange:** A marketplace where mentors can list skills they teach, and students can enroll to learn.
-   🤝 **Project Collaboration:** A dedicated space for users to post project ideas, form teams, and collaborate.
-   👨‍🏫 **Mentorship Program:** A streamlined system for students to find and send mentorship requests to experienced mentors.
-   💬 **Real-time Communication:** Integrated chat functionality for seamless interaction (feature to be implemented).
-   📈 **Personalized Dashboards:** Intuitive dashboards for users to track their learning progress, mentorship requests, and project activities.

---

## 🛠️ Tech Stack

| Category      | Technology                                                                                                                                                                                          |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [JWT](https://jwt.io/), [Cloudinary](https://cloudinary.com/), [Zod](https://zod.dev/) |
| **Frontend**  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/), [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query](https://tanstack.com/query/v5), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/), [React Hook Form](https://react-hook-form.com/) |
| **DevOps**    | [ESLint](https://eslint.org/), [Vite](https://vitejs.dev/)                                                                                                                                          |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Skill-Bridge.git
    cd Skill-Bridge
    ```

2.  **Backend Setup:**
    ```bash
    cd Backend
    npm install
    ```
    -   Navigate to the `src` directory and create a `.env` file by copying `example.env`.
    -   Update the `.env` file with your credentials:
        ```env
        PORT=8000
        ORIGIN=http://localhost:5173
        MONGO_URL=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        CLOUDINARY_CLOUD_NAME=your_cloudinary_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```

3.  **Frontend Setup:**
    ```bash
    cd ../Frontend
    npm install
    ```
    -   In the `Frontend` root, create a `.env` file by copying `Example.env`.
    -   Update it with your backend API URL:
        ```env
        VITE_API_URL=http://localhost:8000
        ```

---

## 🏃 Running the Application

1.  **Start the Backend Server:**
    -   From the `Backend` directory:
    ```bash
    npm run nd
    ```
    The API server will be running at `http://localhost:8000`.

2.  **Start the Frontend Client:**
    -   From the `Frontend` directory:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

The backend provides the following RESTful API endpoints. All protected routes require a `Bearer` token in the Authorization header.

| Method | Endpoint                  | Description                               | Protected |
| :----- | :------------------------ | :---------------------------------------- | :-------: |
| `POST` | `/api/Authentication/signup` | Register a new user (student or mentor)   |    No     |
| `POST` | `/api/Authentication/signin` | Log in a user                             |    No     |
| `GET`  | `/api/User/Profile`       | Get the profile of the logged-in user     |    Yes    |
| `PUT`  | `/api/User/Profile`       | Update the user's profile                 |    Yes    |
| `GET`  | `/api/Skill-Exchange`     | Get all available skills                  |    Yes    |
| `POST` | `/api/Skill-Exchange`     | Create a new skill (mentors only)         |    Yes    |
| `GET`  | `/api/Collaboration`      | Get all available projects                |    Yes    |
| `POST` | `/api/Collaboration`      | Create a new project                      |    Yes    |
| `GET`  | `/api/Mentor-Match`       | Get all mentors                           |    Yes    |
| `POST` | `/api/Mentor-Match/request` | Send a mentorship request to a mentor     |    Yes    |

---

## 📁 Project Structure

The project follows a monorepo structure with two main packages: `Frontend` and `Backend`.

```
Skill-Bridge/
├── 📁 Backend/
│   ├── 📁 src/
│   │   ├── 📁 config/       # DB, Cloudinary configuration
│   │   ├── 📁 controllers/  # Business logic for routes
│   │   ├── 📁 middleware/   # Express middleware (auth, error handling)
│   │   ├── 📁 models/       # Mongoose database schemas
│   │   └── 📁 routes/       # API route definitions
│   └── package.json
└── 📁 Frontend/
    ├── 📁 src/
    │   ├── 📁 api/          # Axios instances and React Query hooks
    │   ├── 📁 components/   # Reusable UI components
    │   ├── 📁 pages/        # Application pages
    │   ├── 📁 store/        # Zustand global state stores
    │   └── App.jsx         # Main component with routing
    └── package.json
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
