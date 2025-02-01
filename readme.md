# 🔗 URL Shortener & Analytics System

A **full-stack URL shortener** with **analytics tracking**, built using the **MERN stack** (MongoDB, Express, React, Node.js).  
Users can **create short URLs**, **track clicks**, **view analytics**, and **manage their links efficiently**.

---

## 🚀 **Live Demo**
🔗 [Live App](https://your-live-app-link.com)

---

## 📂 **Project Structure**
 📂 frontend (React) ┣ 
 📂 backend (Node.js & Express) ┣ 
 📜 README.md 

 
---

## 🎯 **Features**
✅ Shorten URLs with a **custom short code**  
✅ Track analytics like **IP Address, Device, Clicks**  
✅ **Pagination & Filtering** for managing URLs  
✅ Mobile-responsive design with **dark mode**  
✅ **JWT Authentication** for user security  
✅ **Rate limiting** to prevent abuse  

---

## 🛠️ **Technologies Used**

### **Frontend**
- React.js ⚛️
- Axios (API Requests)
- Tailwind CSS (UI Styling)
- React Router (Navigation)
- Redux (State Management)

### **Backend**
- Node.js (Backend)
- Express.js (Routing)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- CORS (Security)
- dotenv (Environment Variables)
- Morgan (Logging)

---

## ⚙️ **Installation Guide**

### **1️⃣ Clone the Repository**
git clone https://github.com/yourusername/url-shortener-analytics.git
cd url-shortener-analytics

2️⃣ Setup Backend

cd backend
npm install

✅ Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

Run the Backend:
npm start

3️⃣ Setup Frontend
cd ../frontend
npm install

Run the Frontend:
npm start
🔗 Frontend runs on :(http://localhost:3000)
🔗 Backend runs on: (http://localhost:5000)

📌 API Endpoints
🔗 URL Management
Method	Endpoint	Description
POST	/api/url/shorten	Shorten a URL
GET	/api/url/:shortCode	Redirect to Original URL
DELETE	/api/url/:id	Delete a URL


