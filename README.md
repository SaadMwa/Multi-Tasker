📝 Multi-Tasker – Full-Stack Task Management App 🚀

Multi-Tasker is a full-stack web application designed to help users manage their projects and tasks efficiently. Built from scratch as a learning project, it demonstrates Node.js backend, MongoDB database, authentication, and dynamic project/task management.

🌟 Features

✅ User Registration & Login with Passport.js authentication

✅ Create, update, and delete projects

✅ Add, toggle, and delete tasks for each project

✅ Protected routes: Users can only access their own projects and tasks

✅ Clean MVC architecture for scalability and maintainability

✅ Session management with Express Sessions

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: Passport.js (local strategy)

Views: EJS templates

Session & Flash: express-session, connect-flash

Version Control: Git & GitHub

🎯 Project Structure
Multi-Tasker/
├── server.js
├── config/db.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   ├── projects.js
│   └── tasks.js
├── views/
│   ├── layout.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   └── projects/
│       ├── index.ejs
│       └── show.ejs
└── package.json

⚡ Installation & Setup

Clone the repository

git clone https://github.com/your-username/multi-tasker.git
cd multi-tasker


Install dependencies

npm install


Create a .env file in the root:

PORT=5000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret_key


Start the server

nodemon server.js


Open in browser

http://localhost:5000

🚀 Future Improvements

Add drag-and-drop task management

Implement real-time updates with WebSockets

Add file attachments & notifications

Improve UI/UX with modern CSS or frameworks

Deploy as production-ready SaaS

💡 Key Learning Points

Learned full-stack architecture (Node.js + MongoDB)

Implemented authentication, sessions, and protected routes

Understood CRUD operations and MVC design

Gained experience in debugging, error handling, and project structure

📩 Contact

LinkedIn: Your LinkedIn

Email: your-email@example.com
