## Golden Eggs - Frontend

Welcome to the frontend of the **Golden Eggs** system a **web platform for managing an egg distribution company**.  
This application is built with **Angular** and communicates with a **Spring Boot** backend using JWT authentication.

---

### 🚀 Technologies Used

- **Angular CLI**: 19.2.8  
- **Node.js**: 18.20.7  
- **npm**: 10.8.2  
- **TypeScript**  
- **HTML / SCSS**  
- **RxJS**  
- **Bootstrap / Custom CSS**  
- **Angular Router & HTTP Client**

---

### 📁 Project Structure

```
front-golden-eggs/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Main feature pages
│   │   ├── guards/           # Auth and role-based route guards
│   │   ├── core/             # Authentication management
│   │   └── app-routing.module.ts
│
├── assets/                   # Static resources
├── environments/             # Environment config (dev/prod)
```

---

### 🔧 Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/estebanp22/front-golden-eggs.git
   cd front-golden-eggs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Check or update the backend URL in `src/environments/environment.prod.ts`:
   ```ts
   export const environment = {
     production: true,
     apiUrl: 'http://localhost:8008/api/v1'
   };
   ```

4. Run the app:
   ```bash
   ng serve
   ```

5. Open your browser at:
   ```
   http://localhost:4200
   ```

---

### 📊 Main Features

Golden Eggs functions as an **ERP (Enterprise Resource Planning)** system tailored for an egg distribution business. It centralizes and automates key operations such as sales, inventory, payments, and user management. Key features include:

- 🌐 **Public product catalog**: anyone can browse available egg products without logging in.
- 🛒 **Order system**: authenticated clients can place orders for available products.
- 🔐 **Authentication system**:
  - Protected login with **JWT**.
  - **Role-based access control**:
    - `ADMIN`: full access to all system features (inventory, users, reports, payments, etc.).
    - `EMPLOYEE`: limited operational access.
    - `CLIENT`: can view products and place orders only.
- 📊 **Admin dashboard** with real-time statistics:
  - Monthly income
  - Website visits
  - Orders placed
  - Eggs in stock
  - Total clients and employees
- 📦 **Comprehensive management** of:
  - Eggs (stock and types)
  - Payments and billing
  - Suppliers
  - Users, roles, and employees
  - Reports and inventories

---

### 🔐 Security

- **JWT-based authentication**.
- Tokens are stored in `localStorage`.
- An **HTTP interceptor** automatically attaches the token to every request.
- Routes are protected using **guards** (`AuthGuard`, `RoleGuard`).

---

### 🔗 Backend

This project works together with the backend repo built in Java:

- 📦 **Backend repo** (Spring Boot): [back-golden-eggs](https://github.com/estebanp22/back-golden-eggs)  

---

### 📃 License

This project is licensed under the MIT License.
