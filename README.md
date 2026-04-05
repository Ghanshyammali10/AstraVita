<div align="center">

# AstraVita

**A real-time blood donation and matching platform**

Bridging the gap between donors and those in urgent need — through smart compatibility matching, instant alerts, and a seamless community experience.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

</div>

---

## Overview

AstraVita is a full-stack web platform that connects blood donors with recipients in real time. When a match is found based on blood type and geographic proximity, both parties are notified instantly — reducing the time between a critical request and a life-saving response.

---

## Features

| Feature | Description |
|---|---|
| Smart Blood Matching | Matches donors to recipients by blood type and PIN code proximity |
| Instant Notifications | Automated email alerts to matched donors and recipients via Nodemailer |
| Event Management | Host and discover blood donation drives and community health events |
| Secure Authentication | JWT-based auth with `bcrypt` password hashing |
| Admin Dashboard | Centralized panel to manage donors, requests, and platform activity |
| Responsive Frontend | Clean, high-performance UI built with vanilla HTML/CSS/JS |

---

## Tech Stack

**Backend**
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)

**Security**
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Helmet](https://helmetjs.github.io/)

**Communication**
- [Nodemailer](https://nodemailer.com/)

**Frontend**
- Vanilla HTML5, CSS3, JavaScript (ES6+)

---

## Project Structure

```
astravita/
├── lib/              # Shared utilities — DB connection, email helper
├── middleware/       # Express middleware — auth verification
├── models/           # Mongoose schemas — User, Donor, Request, Event
├── public/           # Static frontend assets — HTML, CSS, JS, images
├── routes/           # API route handlers — auth, donor, match, events, admin
├── .env              # Environment configuration (not committed)
├── index.js          # Application entry point
└── package.json      # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance
- A Gmail account for automated email notifications

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/astravita.git
cd astravita
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=3000
```

> See [Email Configuration](#email-configuration) for how to generate `EMAIL_PASS`.

**4. Start the server**

```bash
# Development (with hot reload via nodemon)
npm run dev

# Production
npm start
```

The app will be available at `http://localhost:3000`.

---

## Email Configuration

AstraVita uses Gmail + Nodemailer for match notifications. To set this up:

1. Enable **2-Step Verification** on your Google Account
2. Go to **Google Account → Security → App Passwords**
3. Generate an App Password for AstraVita
4. Use that password as the value for `EMAIL_PASS` in your `.env` file

> Do not use your regular Gmail password — App Passwords are required for programmatic access.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive a JWT |
| GET | `/api/donors` | List all registered donors |
| POST | `/api/match` | Trigger a blood type match |
| GET | `/api/events` | List upcoming donation events |
| GET | `/api/admin/dashboard` | Admin summary (protected) |

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please keep pull requests focused and well-described.

---

## License

This project is licensed under the **ISC License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">
  <sub><i>"Every drop counts. Every donor is a hero."</i></sub>
</div>
