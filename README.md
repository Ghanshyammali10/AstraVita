# AstraVita — Blood Donation & Matching System

**AstraVita** is a modern, real-time platform designed to bridge the gap between blood donors and those in urgent need. By leveraging a smart matching algorithm and automated notifications, AstraVita ensures that life-saving blood reaches patients faster than ever before.

---

## 🌟 Key Features

- **🩸 Smart Blood Matching**: Automatically identifies compatible donors based on blood type and geographic proximity (PIN code).
- **📧 Proactive Notifications**: Sends instant email alerts to both recipients and donors when a match is found using Nodemailer.
- **📅 Event Management**: Discover and host blood donation drives and community health events.
- **🛡️ Secure Authentication**: Robust user security with JWT-based authentication and `bcrypt` password hashing.
- **📊 Admin Dashboard**: A centralized hub for administrators to manage donors, requests, and platform activity.
- **🎨 Premium UI/UX**: A responsive, high-performance frontend built with vanilla HTML/CSS/JS for a sleek and professional experience.

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Security**: [JSON Web Token (JWT)](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [Helmet](https://helmetjs.github.io/)
- **Communication**: [Nodemailer](https://nodemailer.com/)
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)

---

## 📂 Project Architecture

```text
astravita/
├── lib/            # Shared utilities (DB connection, email helper)
├── middleware/     # Custom Express middleware (Auth verification)
├── models/         # Mongoose schemas (User, Donor, Request, Event)
├── public/         # Static frontend assets (HTML, CSS, JS, Images)
├── routes/         # API endpoints (Auth, Donor, Match, Events, Admin)
├── .env            # Environment variables (Configuration)
├── index.js        # Entry point of the application
└── package.json    # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
- Gmail account (for automated matching notifications)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/astravita.git
   cd astravita
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_app_specific_password
   PORT=3000
   ```

4. **Run the application**:
   - **Development**: `npm run dev` (uses `nodemon`)
   - **Production**: `npm start`

---

## 📧 Email Configuration

AstraVita uses Nodemailer to send match notifications. If you are using Gmail, you must:
1. Enable **2-Step Verification** on your Google Account.
2. Generate an **App Password** for AstraVita and use it as `EMAIL_PASS` in your `.env` file.

---

## 📜 License

This project is licensed under the **ISC License**.

---

*“Every drop counts. Every donor is a hero.”* — **AstraVita Team**
