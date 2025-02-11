# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Frontend Endpoints

### Home Page (/)

- Description: Landing page of the application
- Method: GET
- Components:
  - Hero image
  - "Get started with Uber" heading
  - Continue button that redirects to login page
- Access: Public

### Login Page (/login)

- Description: User authentication page
- Method: GET
- Components:
  - Email input field
  - Password input field
  - Login button
  - Link to signup page
  - Link to captain login
- Form Data:
  - email: string
  - password: string
- Access: Public

### Signup Page (/signup)

- Description: New user registration page
- Method: GET
- Components:
  - First name input
  - Last name input
  - Email input
  - Password input
  - Signup button
  - Link to login page
- Form Data:
  - firstName: string
  - lastName: string
  - email: string
  - password: string
- Access: Public

### Captain Login Page (/captain-Login)

- Description: Captain authentication page
- Method: GET
- Components:
  - Email input field
  - Password input field
  - Login button
  - Link to captain signup
  - Link to user login
- Form Data:
  - email: string
  - password: string
- Access: Public

### Captain Signup Page (/captain-Signup)

- Description: New captain registration page
- Method: GET
- Components:
  - First name input
  - Last name input
  - Email input
  - Password input
  - Signup button
  - Link to captain login
  - Privacy policy notice
- Form Data:
  - firstName: string
  - lastName: string
  - email: string
  - password: string
- Access: Public
