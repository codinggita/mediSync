<div align="center">

<img src="https://img.shields.io/badge/MediSync-Healthcare%20Platform-00897B?style=for-the-badge&logo=healthicons&logoColor=white" alt="MediSync Banner" />

# 🏥 MediSync

### *Bridging the Gap in Modern Healthcare*

**MediSync** is a full-stack MERN healthcare web application that empowers patients to compare medicine prices across pharmacies and securely manage their medical records — all in one unified, intelligent platform.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://figma.com/)

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-our-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Frontend Folder Structure](#-frontend-folder-structure)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Project Workflow](#-project-workflow)
- [Figma Design](#-figma-design)
- [Getting Started](#-getting-started)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)

---

## ❗ Problem Statement

Healthcare systems across the world are plagued by two deeply impactful and often overlooked challenges:

### 💸 1. Lack of Medicine Price Transparency
Patients frequently pay **significantly different prices** for the same medicine depending on the pharmacy they visit. Without access to a centralized comparison tool, patients — especially those with chronic conditions — are left in the dark, often overpaying for essential medications.

> 📌 *A 2023 survey found that the price of common drugs can vary by up to 10x across different pharmacies in the same city.*

### 🗂️ 2. Fragmented Medical Records
Medical history is scattered across multiple hospitals, clinics, and diagnostic centers. Patients carry physical files, forget test results, or lose critical reports — making it nearly impossible for doctors to get a complete picture of a patient's health at a glance. This fragmentation leads to **delayed diagnoses**, **redundant tests**, and **poor patient outcomes**.

---

## ✅ Our Solution

**MediSync** addresses both problems with two core systems:

| Feature | Description |
|---|---|
| 💊 **Medicine Price Comparison** | A real-time search & compare engine that aggregates medicine prices from multiple pharmacies and highlights the cheapest option |
| 📂 **Medical Record Hub** | A centralized, secure vault for uploading, organizing, and sharing medical records with doctors through controlled access |

---

## ✨ Features

### 💊 Medicine Price Comparison

- 🔍 **Smart Search** — Search any medicine by name, salt, or brand
- 📊 **Price Comparison** — View prices from multiple pharmacies side by side
- 🟢 **Cheapest Highlight** — The lowest-priced option is automatically highlighted for quick decision-making
- 🔔 **Price Alerts** — Get notified when a medicine's price drops at any registered pharmacy

---

### 📄 Medical Records Management

- 📤 **Upload Reports** — Upload PDFs, images, prescriptions, lab reports, and discharge summaries
- 🗓️ **Timeline View** — Visualize your complete medical history in a clean, chronological timeline
- 🔐 **Secure Sharing** — Share records with specific doctors using access-controlled, time-limited links
- 🔒 **Privacy First** — Only you control who sees your data

---

### 🔔 Additional Features

| Feature | Description |
|---|---|
| 🚨 **Emergency Mode** | Instantly share critical records (allergies, blood type, conditions) in emergencies |
| 📣 **Notifications & Alerts** | Real-time alerts for price changes, appointment reminders, and shared record access |
| 👥 **Role-Based Access** | Separate, tailored dashboards for Patients, Doctors, and Admins |
| 📱 **Responsive Design** | Fully optimized for desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js | Component-based, dynamic UI |
| **Backend** | Node.js + Express.js | RESTful API server |
| **Database** | MongoDB + Mongoose | Flexible NoSQL data storage |
| **Authentication** | JWT + Google OAuth 2.0 | Secure, stateless session management |
| **File Storage** | Cloudinary / Multer | Medical report upload & retrieval |
| **Design** | Figma | UI/UX prototyping |
| **Version Control** | Git + GitHub | Collaborative development |

---

## 📁 Frontend Folder Structure

> The following structure follows industry best practices for a **scalable, maintainable React.js** application within the MediSync MERN stack project.

```
client/
└── src/
    │
    ├── assets/                        # Static assets
    │   ├── images/                    # Project images & illustrations
    │   ├── icons/                     # SVG & PNG icons
    │   └── fonts/                     # Custom font files
    │
    ├── components/                    # Reusable UI components
    │   ├── Navbar/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.module.css
    │   ├── Footer/
    │   │   └── Footer.jsx
    │   ├── Cards/
    │   │   ├── MedicineCard.jsx
    │   │   └── RecordCard.jsx
    │   ├── Buttons/
    │   │   └── PrimaryButton.jsx
    │   ├── Modal/
    │   │   └── ConfirmModal.jsx
    │   ├── Loader/
    │   │   └── Spinner.jsx
    │   └── Badge/
    │       └── RoleBadge.jsx
    │
    ├── pages/                         # Route-level page components
    │   ├── LandingPage/
    │   │   └── LandingPage.jsx
    │   ├── LoginPage/
    │   │   └── LoginPage.jsx
    │   ├── SignupPage/
    │   │   └── SignupPage.jsx
    │   ├── DashboardPage/
    │   │   └── DashboardPage.jsx
    │   ├── MedicalRecordsPage/
    │   │   └── MedicalRecordsPage.jsx
    │   ├── UploadRecordPage/
    │   │   └── UploadRecordPage.jsx
    │   ├── SharingPage/
    │   │   └── SharingPage.jsx
    │   ├── PharmacyPage/
    │   │   └── PharmacyPage.jsx
    │   ├── ComparisonPage/
    │   │   └── ComparisonPage.jsx
    │   ├── DoctorPortalPage/
    │   │   └── DoctorPortalPage.jsx
    │   ├── AdminPage/
    │   │   └── AdminPage.jsx
    │   ├── NotificationsPage/
    │   │   └── NotificationsPage.jsx
    │   ├── SettingsPage/
    │   │   └── SettingsPage.jsx
    │   └── EmergencyPage/
    │       └── EmergencyPage.jsx
    │
    ├── features/                      # Business logic modules (feature-based)
    │   ├── auth/
    │   │   ├── authSlice.js           # Redux slice or Context logic
    │   │   └── authAPI.js
    │   ├── medicine/
    │   │   ├── medicineSlice.js
    │   │   └── medicineAPI.js
    │   └── records/
    │       ├── recordsSlice.js
    │       └── recordsAPI.js
    │
    ├── layouts/                       # Page layout wrappers
    │   ├── DashboardLayout.jsx        # Sidebar + Topbar for authenticated users
    │   ├── AuthLayout.jsx             # Centered card layout for Login/Signup
    │   └── PublicLayout.jsx           # Navbar + Footer for public pages
    │
    ├── routes/                        # React Router configuration
    │   ├── AppRoutes.jsx              # Main router with all routes
    │   ├── PrivateRoute.jsx           # Protected route wrapper
    │   └── RoleRoute.jsx              # Role-based route guard
    │
    ├── services/                      # API service layer (Axios)
    │   ├── api.js                     # Axios instance with base URL & interceptors
    │   ├── authService.js             # Auth-related API calls
    │   ├── medicineService.js         # Medicine & pharmacy API calls
    │   └── recordService.js           # Medical record API calls
    │
    ├── hooks/                         # Custom React hooks
    │   ├── useAuth.js                 # Hook for auth state & actions
    │   ├── useFetch.js                # Generic data-fetching hook
    │   └── useLocalStorage.js         # Persistent local storage hook
    │
    ├── context/                       # React Context API (global state)
    │   ├── AuthContext.jsx            # Authentication context provider
    │   ├── ThemeContext.jsx           # Dark/Light mode context
    │   └── NotificationContext.jsx    # Global notification state
    │
    ├── store/                         # Redux Toolkit store (if using Redux)
    │   ├── store.js                   # Redux store configuration
    │   └── rootReducer.js             # Combined reducers
    │
    ├── utils/                         # Utility / helper functions
    │   ├── formatDate.js              # Date formatting helpers
    │   ├── validateForm.js            # Form validation logic
    │   ├── roleHelpers.js             # Role-check utility functions
    │   └── constants.js              # App-wide constants (roles, status codes)
    │
    ├── config/                        # Application configuration
    │   ├── appConfig.js               # Base URLs, feature flags
    │   └── axiosConfig.js             # Global Axios settings
    │
    ├── styles/                        # Global styles
    │   ├── global.css                 # CSS reset & base styles
    │   ├── variables.css              # CSS custom properties (colors, fonts)
    │   └── animations.css             # Reusable keyframe animations
    │
    ├── App.jsx                        # Root application component
    └── main.jsx                       # React DOM entry point
```

---

### 🗂️ Folder Breakdown

| Folder | Purpose |
|---|---|
| `assets/` | Houses all static resources — images, icons, and custom fonts used across the app |
| `components/` | Contains small, **reusable UI building blocks** (Navbar, Cards, Buttons, Modals) shared across multiple pages |
| `pages/` | Each sub-folder represents a **distinct route/screen** in the application, keeping page-level logic self-contained |
| `features/` | Implements **domain-driven business logic** — each feature (auth, medicine, records) owns its state slice and API calls |
| `layouts/` | Provides structural **wrapper templates** (e.g., sidebar + topbar for dashboard, centered card for auth screens) |
| `routes/` | Centralizes **React Router** configuration including protected routes and role-based access guards |
| `services/` | Abstracts all **HTTP API communication** (Axios instance, interceptors, and per-domain service files) |
| `hooks/` | Encapsulates **reusable stateful logic** into clean custom hooks (`useAuth`, `useFetch`, etc.) |
| `context/` | Manages **global application state** using the React Context API (auth session, theme, notifications) |
| `store/` | Houses the **Redux Toolkit** store and root reducer when using Redux for more complex state management |
| `utils/` | Holds **pure helper functions** (date formatting, form validation, role checks) with no side effects |
| `config/` | Stores **environment-specific configuration** such as base API URLs, Axios defaults, and feature flags |
| `styles/` | Contains **global CSS** — reset rules, CSS variables (color tokens, spacing), and keyframe animations |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                  │
│              React.js (Frontend)                │
│   ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│   │ Medicine │ │ Records  │ │  Dashboard   │   │
│   │  Search  │ │ Manager  │ │  (Role-Based)│   │
│   └─────┬────┘ └─────┬────┘ └──────┬───────┘   │
└─────────┼────────────┼─────────────┼────────────┘
          │            │             │
          ▼            ▼             ▼
┌─────────────────────────────────────────────────┐
│                   API LAYER                     │
│          Node.js + Express.js (Backend)         │
│   ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│   │ Medicine │ │  Record  │ │    Auth &    │   │
│   │   API    │ │   API    │ │  User API    │   │
│   └─────┬────┘ └─────┬────┘ └──────┬───────┘   │
└─────────┼────────────┼─────────────┼────────────┘
          │            │             │
          ▼            ▼             ▼
┌─────────────────────────────────────────────────┐
│                  DATA LAYER                     │
│              MongoDB (Database)                 │
│   ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│   │ Medicine │ │ Medical  │ │   Users &    │   │
│   │ Pharmacy │ │ Records  │ │    Roles     │   │
│   └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────┘
```

**Data Flow:**
1. The **React frontend** communicates with the backend via HTTP REST APIs
2. The **Express.js server** handles business logic, authentication middleware, and routes requests
3. **MongoDB** stores all persistent data — users, medicine listings, pharmacy details, and encrypted medical records
4. **JWT tokens** are issued on login and validated on every protected API request

---

## 👥 User Roles

MediSync implements a structured **Role-Based Access Control (RBAC)** system:

### 🙍 Patient (User)
- Search and compare medicine prices
- Upload and manage personal medical records
- Share records with specific doctors via secure links
- Access emergency mode
- Receive price drop notifications

### 👨‍⚕️ Doctor
- View patient-shared medical records (with explicit permission)
- Add consultation notes to shared records
- Manage their own profile and availability

### 🛡️ Admin
- Manage pharmacy and medicine listings
- Oversee user and doctor accounts
- Monitor platform activity and analytics
- Handle reported issues and moderation

---

## 🔄 Project Workflow

### 🔐 Authentication Flow
```
User Visits → Sign Up / Google Login → JWT Issued → Role-Specific Dashboard
```

### 💊 Medicine Comparison Flow
```
Search Medicine → View All Pharmacies → Compare Prices → Cheapest Highlighted → Navigate to Pharmacy
```

### 📂 Medical Record Flow
```
Upload Report (PDF/Image) → Auto-Categorized → Timeline View → Generate Secure Link → Share with Doctor → Doctor Views Record
```

### 🚨 Emergency Flow
```
Emergency Mode Activated → Critical Info Surfaced → Share QR / Link → Medical Staff Accesses Data
```

---

## 🎨 Figma Design

The UI/UX for MediSync was designed in **Figma**, following a modern healthcare aesthetic:

- 🎨 **Clean Green-White Theme** — Inspired by trust, health, and clarity; using a calming palette of medical green (`#00897B`) and crisp white
- 📐 **Dashboard-Based Layout** — Role-specific dashboards with card-based UI, sidebar navigation, and data-rich panels
- 🖱️ **Intuitive UX** — Designed for patients of all tech comfort levels, with large CTAs, clear iconography, and minimal friction flows
- 📱 **Mobile-First Responsiveness** — All screens designed for both mobile and desktop breakpoints

### 👉 [View Figma Prototype](https://www.figma.com/design/K0gasIFRWzrAlnWWhUy5vE/Untitled?node-id=3-2&t=lDesLUzM5rGlRUeB-1)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyabratasahoo780/mediSync.git
cd mediSync

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the App

```bash
# Start backend server
cd server
npm run dev

# Start frontend (in a new terminal)
cd client
npm run dev
```

> The app will be running at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

---

## 🔮 Future Enhancements

| Enhancement | Description |
|---|---|
| 🌐 **Real-Time Pharmacy APIs** | Live integration with pharmacy databases for up-to-date pricing |
| 🤖 **AI-Powered Suggestions** | Smart medicine alternatives and dosage recommendations using AI |
| 📱 **Mobile Application** | Cross-platform React Native app for iOS and Android |
| 💬 **Telemedicine Integration** | In-app video consultations with registered doctors |
| 🧬 **Health Analytics Dashboard** | Personalized health insights from medical history trends |
| 🌍 **Multi-language Support** | Accessibility for regional language speakers |

---

## 🏁 Conclusion

MediSync is more than just an application — it's a step toward **democratizing healthcare access**.

- 💰 **Cost Savings** — Transparent pricing ensures patients never overpay for medicines
- 🩺 **Better Diagnosis** — Complete, centralized records help doctors make faster, more accurate decisions
- ⚡ **Efficient Healthcare** — Reducing paperwork and record fragmentation saves time for both patients and providers

> *"Healthcare should be simple, transparent, and accessible to everyone."*

---

<div align="center">

**Built with ❤️ using the MERN Stack**

[![GitHub](https://img.shields.io/badge/GitHub-priyabratasahoo780-181717?style=for-the-badge&logo=github)](https://github.com/priyabratasahoo780)

</div>