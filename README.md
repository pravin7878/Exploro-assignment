# SmartTrips - Your Ultimate Trip Booking and Management Solution  

**SmartTrips** is a full-featured platform for customers and organizers to book and manage trips seamlessly. Whether you're planning your next vacation or organizing trips for others, SmartTrips offers a secure, intuitive, and user-friendly experience.  


## 🌟 Features  
### Backend Overview
   - **Backned docs** : [backned docs](https://smarttrips.onrender.com/api-docs/)

### Frontend Overview
### 🔑 User Authentication  

1. **Registration**  
   - Route: `/user/register`  
   - Roles: `Customer` and `Organizer`  
   - Tab-based registration allows users to register as either a customer or an organizer. Based on the selected tab, the role is automatically saved in the database.  

2. **Login**  
   - Route: `/user/login`  
   - Enter your registered email and password to log in securely.  
   - Redirects based on roles:  
     - **Customer**: Redirected to the homepage `/`.  
     - **Organizer**: Redirected to the dashboard `/dashboard`.  
   - **Security Features**:  
     - Passwords are securely hashed using `bcrypt`.  
     - JSON Web Tokens (JWT) are used for secure authentication and session management.  

---

### 🛍️ Customer Features  

1. **Landing Page (`/`)**  
   - Displays all available trips in a visually appealing grid layout.  
   - Each trip card includes:  
     - **Add to Cart**: Add a trip to your cart after login. Non-logged-in users are redirected to the login page.  
     - **More Info**: View detailed trip information.  

2. **Trip Detail Page (`/trips/:id`)**  
   - Provides full details about a selected trip, including destination, price, and itinerary.  

3. **Cart Page (`/cart`)**  
   - A protected route that requires login to access.  
   - Features:  
     - View all trips added to your cart.  
     - Remove individual items or clear the entire cart with a single click.  
     - Checkout functionality redirects users to a secure checkout page.  

---

### 🛠️ Organizer Features  

1. **Dashboard (`/dashboard`)**  
   - Manage your trips efficiently:  
     - Add new trips.  
     - View, edit, or delete existing trips.  

---

## 🛠️ Tech Stack  

- **Frontend**: React.js, Tailwind CSS, React Router  
- **Backend**: Node.js, Express.js  
- **State Management**: Redux  
- **Database**: MongoDB  
- **Authentication**: JWT and bcrypt  
- **Other Tools**: Vite, Axios  

---

## 🚀 Getting Started  

### Prerequisites  

Ensure you have the following installed:  
- Node.js (v14+)  
- npm or yarn  
- MongoDB  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/pravin7878/Exploro-assignment.git

2. Navigate to the project directory:
   - **for runing backend** 
    ```bash
      cd /Backend

   - **for runing frontend** 
    ```bash
      cd /Frontend

3. Install dependencies: in a both directory
       ```bash
       npm install

3. Set up environment variables:
  - Create a .env file in the root directory.
  - Add the following:
    - **for backend** 
    ```bash
     PORT = <any port number>
     MONGO_URI = <yourlocal mongo uri>
     SALT_ROUND = 10
     JWT_SECRET_KEY = <any secret key>
     JWT_REFRESH_SECRET_KEY = <any secret key>

   - **for runing frontend** 
      ```bash
        VITE_APP_BACKEND_URL : <where you have runed backend>


