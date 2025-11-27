# Comment-System

```
backend/
│
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   └── comments.py
│   │   └── dependencies/
│   │       └── db.py
│   │
│   ├── db/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── models/
│   │       └── comment.py
│   │
│   ├── schemas/
│   │   └── comment.py
│   │
│   ├── config.py            
│   └── main.py
│
├── alembic/
│   ├── versions/
│   └── env.py
│
├── alembic.ini
├── .env
├── Dockerfile
└── requirements.txt



frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/                  # API calls to backend
│   │   └── comments.js
│   │
│   ├── components/           # Reusable UI components
│   │   └── CommentCard.jsx
│   │
│   ├── pages/                # Page-level components / routes
│   │   └── CommentsPage.jsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useComments.js
│   │
│   ├── context/              # React context for global state
│   │   └── CommentsContext.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                      # frontend-specific environment variables
├── package.json
├── vite.config.js             # if using Vite
└── Dockerfile


```