
---

# ValetDesk Mobile App (Technical Screening Assignment)

##  Overview
This project is a **React Native mobile application** built as part of the technical screening assignment for **ValetDesk (Infoguild Technologies Pvt. Ltd.)**.  
The app demonstrates core mobile development fundamentals, API integration, navigation, and end‑to‑end feature implementation.

The application allows users to:
1. **View a list of items** fetched from an API.  
2. **View details** of a selected item.  
3. **Submit a form** to the backend and receive a response.  

A simple **Flask backend** is included (optional) to serve mock data and handle form submissions.

---

##  Objectives
- Showcase React Native fundamentals.  
- Integrate REST APIs with proper error handling.  
- Implement navigation between multiple screens.  
- Demonstrate initiative, clean code, and clear communication.  

---

##  Features
### Screen 1: List Screen
- Fetches items from API (`GET /items`).  
- Displays items in a scrollable list with **title** and **short description**.  
- Example domain: **Tasks** (can be extended to products, notes, orders, etc.).

### Screen 2: Detail Screen
- On tapping a list item, navigates to a detail screen.  
- Displays **full details** of the selected item.  
- Includes loading and error states.

### Screen 3: Create Item / Feedback Form
- Simple form with text input(s) and a submit button.  
- On submit, sends data to API (`POST /items`).  
- Displays success or error message based on response.

---

##  Backend (Flask)
- **Endpoints:**
  - `GET /items` → Returns list of items.  
  - `GET /items/<id>` → Returns details of a specific item.  
  - `POST /items` → Accepts form data and returns success/error response.  
- Data stored in‑memory (no database required).  
- Can be replaced with mock APIs (Postman Mock, JSON Server, or hardcoded JSON).  

---

##  Tech Stack
- **Frontend:** React Native, React Navigation  
- **Backend (Optional):** Flask (Python)  
- **API Integration:** Fetch / Axios  
- **State Management:** React hooks (`useState`, `useEffect`)  
- **Error Handling:** Try/catch blocks, conditional rendering  

---

##  Setup Instructions

### Prerequisites
- Node.js & npm/yarn  
- React Native CLI or Expo CLI  
- Python (if running Flask backend)  

### Frontend
```bash
# Clone repository
git clone https://github.com/<your-username>/valetdesk-app.git
cd valetdesk-app

# Install dependencies
npm install

# Run app (Expo)
npm start
```

### Backend (Flask)
```bash
# Navigate to backend folder
cd backend

# Install dependencies
pip install flask

# Run server
python app.py
```

---

##  API Endpoints
- **GET /items** → Returns list of items.  
- **GET /items/<id>** → Returns details of selected item.  
- **POST /items** → Accepts form data and returns response.  

---

##  Project Structure
```
valetdesk-app/
│
├── src/
│   ├── screens/
│   │   ├── ListScreen.js
│   │   ├── DetailScreen.js
│   │   └── FormScreen.js
│   ├── components/
│   │   └── ItemCard.js
│   ├── api/
│   │   └── api.js
│   └── App.js
│
├── backend/
│   └── app.py
│
└── README.md
```



---

  

---

##  Notes on AI Usage
- AI tools (Copilot, ChatGPT) were used as **assistive aids** for boilerplate code and documentation.  
- All code was reviewed, adapted, and understood before inclusion.  
- Decisions (libraries, structure) were made independently to align with assignment requirements.  

---

##  Conclusion
This project demonstrates the ability to:
- Break down requirements into functional components.  
- Implement a small but complete feature end‑to‑end.  
- Use APIs effectively with proper error handling.  
- Communicate clearly through documentation and code structure.  

---

👉 Would you like me to also **draft sample commit messages** (like “feat: add list screen with API integration”) so your GitHub history looks professional and aligned with startup expectations?
