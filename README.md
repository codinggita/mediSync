<div align="center">
  <img src="./frontend/src/assets/images/medisync_hero_banner.png" width="100%" style="border-radius: 2.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.15);" />

  <br />
  <br />

  # 🏥 MediSync: Next-Gen Clinical Protocol

  ### _Synchronizing Specialist Consultations, Pharmacy Fulfillments, and Patient Diagnostics in a Unified, Post-Quantum Encrypted Environment._

  <br />

  | Deployment Node | Operational Link | Access Protocol |
  | :--- | :--- | :--- |
  | **Design Prototype** | [![Figma](https://img.shields.io/badge/Figma-Clinical_Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/proto/K0gasIFRWzrAlnWWhUy5vE/Untitled?page-id=3%3A2&node-id=3-125&p=f&viewport=463%2C474%2C0.05&t=AHoOQahMQPxluVVC-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A125) | UI/UX Blueprint |
  | **Production Node** | [![Live Demo](https://img.shields.io/badge/Live_Project-View_Live-2ECC71?style=for-the-badge&logo=vercel&logoColor=white)](https://medi-sync-rho.vercel.app) | Live Clinical Environment |
  | **API Intelligence** | [![Postman](https://img.shields.io/badge/Postman-API_Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50839186/2sBXqJLgPy) | Technical Handshake Docs |
  | **Backend Cluster** | [![Backend API](https://img.shields.io/badge/Backend_API-Live_Endpoints-000000?style=for-the-badge&logo=render&logoColor=white)](https://medisync-gxiy.onrender.com) | Clinical Logic Node |
  | **Video Walkthrough** | [![YouTube Demo](https://img.shields.io/badge/YouTube-Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/0iB2YEnbtSw?si=_XlKFlHLEPg5F1aQ) | Clinical Operation Guide |

  <br />

  > **The MediSync Mission**: To bridge the fragmentation in global healthcare by orchestrating a high-fidelity, real-time data matrix where patient records and pharmaceutical intelligence coexist in absolute synchronization.

  ---
</div>

## 🧩 The Clinical Problem
Modern healthcare suffers from **Data Fragmentation**. Patient records are siloed across institutions, pharmaceutical prices vary wildly without transparency, and the synchronization between doctors and patients is often manual and error-prone. This leads to delayed treatments, high costs, and compromised patient safety.

## 💡 The MediSync Solution
MediSync provides a **Unified Clinical Intelligence Matrix**. It aggregates medical records into a secured "Clinical Vault," enables real-time price comparison across verified pharmacy nodes, and orchestrates appointments through a spatial calendar interface. Built with the **Clinical Atelier** design philosophy, it offers a tactile, neumorphic environment for zero-latency healthcare management.

---

## 🛠️ Technology Stack & Architecture

| System Layer | Intelligence Node | Core Technology Stack |
| :--- | :--- | :--- |
| **Frontend Core** | Clinical Interface | [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) |
| **Styling & UI** | Visual Architecture | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Material UI](https://img.shields.io/badge/Material_UI-9.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/) |
| **Motion Physics** | Animations | [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff69b4?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/) [![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/) |
| **State Matrix** | Logic Layer | [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/) |
| **Backend Runtime** | Clinical API | [![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) |
| **Data Dossier** | Intelligence Storage | [![MongoDB](https://img.shields.io/badge/MongoDB-9.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)](https://mongoosejs.com/) |
| **Z+ Security** | Auth & Encryption | [![JWT](https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/) [![Bcrypt](https://img.shields.io/badge/Bcrypt-Hashing-blue?style=for-the-badge)](https://www.npmjs.com/package/bcrypt) |

---

## 🔐 Z+ Hardened Backend Security
MediSync implements a **Zero-Trust Security Architecture** with multi-layer orchestration:

| Security Layer | Technology | Operational Impact |
| :--- | :--- | :--- |
| **HTTP Hardening** | `Helmet.js` | Enforces strict CSP, HSTS, and Frame-Guard policies. |
| **Injection Firewall** | `express-mongo-sanitize` | Prevents NoSQL injection by stripping operator-prefix keys. |
| **Cross-Site Shield** | `xss-clean` | Sanitizes user input to block malicious script injections. |
| **Traffic Orchestrator** | `express-rate-limit` | Multi-tier limiting for Auth (5/15m) and Admin (10/15m) nodes. |
| **HPP Protection** | `hpp` | Guards against HTTP Parameter Pollution attacks. |
| **Payload Guard** | `Body-Parser Limits` | Strict 5MB limit on incoming clinical dossiers. |
| **Audit Surveillance** | `Morgan + Custom Loggers` | Real-time tracking of security-critical handshakes. |

---

## 🧬 System Architecture Matrix
```mermaid
graph TD
    User((Clinical Citizen)) -->|Handshake| AuthNode[Auth Intelligence]
    AuthNode -->|RBAC Token| Dashboard{Clinical Dashboard}
    
    Dashboard -->|Query| RecordVault[(Secured Record Vault)]
    Dashboard -->|Search| PharmacyNet[Pharmacy Search Node]
    Dashboard -->|Book| AppointmentEngine[Spatial Scheduler]
    
    PharmacyNet -->|Compare| PriceMatrix[Price Comparison Engine]
    DoctorPortal[Doctor Intelligence Hub] -->|Review| RecordVault
    
    subgraph "Hardened Backend"
        AuthNode
        RecordVault
        AppointmentEngine
        PriceMatrix
    end
```

---

## 🚀 Strategic Orchestration Nodes (Features)

### 📊 Strategic Intelligence Matrix
- **SVG Spline Analytics**: Animated growth curves tracking clinical metrics.
- **Dynamic Timeline**: Switch between Monthly/Yearly data matrices with sub-second latency.
- **Admin Surveillance**: Real-time monitoring of system-wide clinical activity.

### 🛡️ Secured Record Vault
- **Clinical Dossier**: High-fidelity management for Patients and Doctors.
- **Z+ Security**: Post-quantum encrypted document storage with "Self-Healing" data URIs.
- **Multi-Format Support**: Ingest clinical artifacts (PDFs, Images) with automatic metadata indexing.

### 💊 Pharmacy Synchronization
- **Price Parity**: Real-time price comparison across verified pharmacy nodes.
- **Nearby Discovery**: Geolocation-aware pharmacy directory with verification badges.
- **Registry Handshake**: Specialized registration portal for pharmacy nodes.

### 📅 Advanced Appointment Protocol
- **Spatial Calendar**: Tactile interface for booking and tracking clinical sessions.
- **Auto-Sync**: Background synchronization of doctor schedules and patient timelines.
- **Tele-Consult Integration**: Ready for secure video handshakes.

### 🆘 Emergency Resilience Node
- **One-Tap Protocol**: Rapid access to emergency clinical services.
- **Critical Data Broadcast**: Seamlessly share critical vitals with emergency responders.

### 🤝 Peer-to-Peer Clinical Sharing
- **Secure Handshake**: Share clinical dossiers with specialists through encrypted link protocols.
- **Access Revocation**: Instantly terminate sharing permissions from the Dashboard.

---

## 📂 Project Structure

```text
mediSync/
├── frontend/               # Clinical Interface (Vite + React)
│   ├── src/
│   │   ├── components/     # High-fidelity reusable UI nodes
│   │   ├── context/        # Auth & Clinical State providers
│   │   ├── pages/          # Unified page modules (RBAC protected)
│   │   ├── hooks/          # Tactical custom logic hooks
│   │   └── assets/         # Clinical design tokens & media
├── backend/                # Clinical Intelligence API (Node.js)
│   ├── src/
│   │   ├── controllers/    # Data orchestration logic
│   │   ├── models/         # Mongoose clinical schemas
│   │   ├── routes/         # API endpoint registry
│   │   └── middleware/     # Hardened security & RBAC guards
└── README.md               # Project Dossier
```

---

## 📸 Clinical Interface Gallery

<div align="center">
  <img src="./frontend/src/assets/images/medisync_platform_overview.png" width="100%" style="border-radius: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />
  <p><i>The MediSync Platform Overview: A Unified Hub for Clinical Operations</i></p>

  <br />

  <img src="./frontend/src/assets/images/medisync_record_vault.png" width="100%" style="border-radius: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />
  <p><i>The Secured Clinical Dossier: Neumorphic Grid & Timeline Synchronization</i></p>

  <br />

  <img src="./frontend/src/assets/images/admin_core.png" width="100%" style="border-radius: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />
  <p><i>Admin Control Node: Strategic Surveillance and Real-Time Analytics</i></p>
</div>

---

## 🛠️ Tactical Deployment Protocol

### **1. Clone the Protocol**
```bash
git clone https://github.com/priyabratasahoo780/Resume-generater.git
cd Resume-generater/mediSync
```

### **2. Orchestrate Backend Intelligence**
```bash
cd backend
npm install
# Create .env and inject Clinical Key Matrix (see below)
npm start
```

### **3. Orchestrate Clinical Interface**
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔑 Clinical Key Matrix (Environment)

| Key | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | API Server Port | `5000` |
| `MONGO_URI` | MongoDB Connection String | `mongodb+srv://...` |
| `JWT_SECRET` | High-Entropy Auth Secret | `YourSecretKey` |
| `NODE_ENV` | Tactical Environment | `development` |
| `SMTP_HOST` | Clinical Email SMTP | `smtp.mailtrap.io` |

---

## 🤝 Clinical Ethics & Contribution
We welcome contributions that align with our mission. Please adhere to the **MediSync Tactical Protocol**:
1. **Dossier Selection**: Choose an open clinical node.
2. **Branch Creation**: Use tactical naming (e.g., `feature/medicine-sync`).
3. **Audit**: Ensure code meets the modularization mandate.

---

## ⚖️ License
This project is licensed under the **MIT License**.

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Developed%20With-❤️-red?style=for-the-badge" />
  <br />
  <br />

  ### 👨‍💻 Strategic Clinical Engineering By

  ## **Priyabrata Sahoo**
  _Full-Stack Clinical Systems Architect_

  <br />

  [![GitHub](https://img.shields.io/badge/Connect_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/priyabratasahoo780)
  [![LinkedIn](https://img.shields.io/badge/Professional_Network-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/priyabratasahoo780/)
  [![Portfolio](https://img.shields.io/badge/Clinical_Portfolio-2A7FFF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://github.com/priyabratasahoo780)

  <br />

  **MediSync Core Technologies © 2026**
  <br />
  _Synchronizing the Future of Global Healthcare_
</div>
