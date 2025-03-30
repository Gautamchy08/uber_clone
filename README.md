[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?repo=https://github.com/gautamchy08/uber_clone)

# Uber Clone Project Documentation

## Overview

This project is a full-stack Uber Clone application that allows users to book rides and captains (drivers) to accept and complete rides. It includes features such as real-time ride tracking, OTP verification, and payment integration.

---

## Table of Contents

1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Animation and Transitions](#animation-and-transitions)
4. [Styling](#styling)
5. [Backend Technologies Used](#backend-technologies-used)
6. [Real-Time Communication with Socket.io](#real-time-communication-with-socketio)

---

## Frontend

The frontend is built using **React** and **Vite** for a fast and modern development experience. It includes the following features:

### Key Features

- **User Authentication**: Login and signup functionality with JWT token management.
- **Ride Booking**: Users can search for pickup and destination locations, select a vehicle, and confirm rides.
- **Captain Dashboard**: Captains can view ride requests, accept rides, and track ride progress.
- **Real-Time Updates**: Socket.io integration for real-time ride status updates.
- **Responsive Design**: Fully responsive UI for mobile and desktop devices.

### Pages

1. **Home Page** (`/home`):

   - Allows users to book rides.
   - Includes location search, vehicle selection, and ride confirmation.

2. **Captain Home Page** (`/captain-Home`):

   - Dashboard for captains to view ride requests and manage active rides.

3. **Riding Page** (`/riding`):

   - Displays live ride tracking and driver details for users.

4. **Captain Riding Page** (`/captain-riding`):

   - Active ride management for captains, including ride completion.

5. **Authentication Pages**:
   - `/login`, `/signup`, `/captain-Login`, `/captain-Signup`.

### Components

- **LocationSearchPanel**: Handles location search and displays suggestions.
- **VehiclePanel**: Allows users to select a vehicle type and view pricing.
- **ConfirmRide**: Displays ride summary and handles ride confirmation.
- **LookingForDriver**: Shows a loading state while searching for a driver.
- **WaitingForDriver**: Displays assigned driver details and ETA.
- **FinishRide**: Allows captains to complete rides and confirm payments.

---

## Backend

The backend is built using **Node.js** and **Express.js**. It provides RESTful APIs for user and captain management, ride booking, and real-time updates.

### Key Features

- **Authentication**: Secure JWT-based authentication for users and captains.
- **Ride Management**: APIs for creating, confirming, starting, and ending rides.
- **Real-Time Communication**: Socket.io integration for live ride updates.
- **Database**: MongoDB is used to store user, captain, and ride data.

### API Endpoints

#### User Endpoints

- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: Authenticate a user and generate a JWT token.
- **GET** `/users/profile`: Retrieve the current user's profile.
- **POST** `/users/logout`: Logout the user and invalidate the token.

#### Captain Endpoints

- **POST** `/captains/register`: Register a new captain with vehicle details.
- **POST** `/captains/login`: Authenticate a captain and generate a JWT token.
- **GET** `/captains/profile`: Retrieve the current captain's profile.
- **POST** `/captains/logout`: Logout the captain and invalidate the token.

#### Ride Endpoints

- **POST** `/rides/create`: Create a new ride.
- **POST** `/rides/getFare`: Calculate the estimated fare for a ride.
- **POST** `/rides/confirm`: Confirm a ride request by a captain.
- **GET** `/rides/start-ride`: Start a ride after OTP verification.
- **POST** `/rides/end-ride`: End a ride and mark it as completed.

---

## Animation and Transitions

The application uses **GSAP (GreenSock Animation Platform)** for smooth animations and transitions. Key animations include:

- **Panel Transitions**: Sliding panels for vehicle selection, ride confirmation, and driver details.
- **Loading Animations**: Smooth loading indicators while searching for drivers.
- **State Transitions**: Animated transitions between ride states (e.g., "Looking for Driver" to "Waiting for Driver").

### Examples

1. **Vehicle Panel Animation**:

   - Slides up when the user selects a vehicle.
   - Slides down when the panel is closed.

2. **Ride Confirmation Animation**:

   - Smooth transition to display ride details and OTP input.

3. **Driver Details Animation**:
   - Animated display of driver and vehicle information.

---

## Styling

The application uses **Tailwind CSS** for styling. Tailwind provides a utility-first approach to create responsive and modern designs.

### Key Features

- **Responsive Design**: Fully responsive layouts for mobile and desktop devices.
- **Custom Animations**: Tailwind's animation utilities are used for hover effects and transitions.
- **Consistent Theme**: A consistent color palette and typography are applied across the application.

### Example Classes

- **Buttons**: `bg-green-600 text-white font-semibold p-2 rounded-lg`.
- **Panels**: `fixed bottom-0 w-full bg-white px-4 py-6`.
- **Text**: `text-lg font-medium text-gray-600`.

---

## Backend Technologies Used

The backend is built using the following technologies:

1. **Node.js**: JavaScript runtime for building scalable server-side applications.
2. **Express.js**: Web framework for creating RESTful APIs.
3. **MongoDB**: NoSQL database for storing user, captain, and ride data.
4. **Socket.io**: Real-time communication for ride updates and notifications.
5. **JWT (JSON Web Tokens)**: Secure authentication and authorization.
6. **Mongoose**: ODM library for MongoDB to manage schemas and models.
7. **Express Validator**: Middleware for validating and sanitizing request data.
8. **Axios**: HTTP client for making API requests.

---

## Real-Time Communication with Socket.io

The application uses **Socket.io** for real-time communication between the frontend and backend. This enables features like live ride updates, driver assignment notifications, and ride status changes.

### Key Features of Socket.io Integration

1. **Real-Time Ride Updates**:

   - Users receive live updates about the status of their ride (e.g., "Driver Assigned", "Ride Started", "Ride Completed").
   - Captains are notified in real-time when a new ride request is available.

2. **Driver Assignment**:

   - When a user confirms a ride, the backend uses Socket.io to notify nearby captains about the ride request.
   - Once a captain accepts the ride, the user is notified in real-time.

3. **Ride Status Updates**:

   - The backend emits events to update the ride status (e.g., "in_progress", "completed").
   - Both the user and captain receive these updates instantly.

4. **OTP Verification**:

   - The backend verifies the OTP entered by the user before starting the ride.
   - Socket.io ensures that the ride status is updated in real-time after successful OTP verification.

5. **Error Handling**:
   - Socket.io handles connection errors and reconnections seamlessly to ensure a smooth user experience.

### Socket.io Events

#### Events Emitted by the Backend

- **`rideRequest`**:

  - Sent to captains when a new ride request is created.
  - Includes ride details like pickup and destination locations.

- **`rideAccepted`**:

  - Sent to the user when a captain accepts their ride request.
  - Includes captain details like name, vehicle type, and estimated arrival time.

- **`rideStarted`**:

  - Sent to both the user and captain when the ride starts.

- **`rideCompleted`**:
  - Sent to both the user and captain when the ride is completed.

#### Events Listened to by the Backend

- **`acceptRide`**:

  - Triggered by captains to accept a ride request.
  - Updates the ride status and notifies the user.

- **`startRide`**:

  - Triggered by captains to start the ride after OTP verification.

- **`endRide`**:
  - Triggered by captains to mark the ride as completed.

### Example Socket.io Workflow

1. **Ride Request**:

   - The user confirms a ride.
   - The backend emits a `rideRequest` event to all connected captains in the area.

2. **Ride Acceptance**:

   - A captain accepts the ride by emitting an `acceptRide` event.
   - The backend updates the ride status and emits a `rideAccepted` event to the user.

3. **Ride Start**:

   - The captain verifies the OTP and emits a `startRide` event.
   - The backend updates the ride status to "in_progress" and emits a `rideStarted` event.

4. **Ride Completion**:
   - The captain marks the ride as completed by emitting an `endRide` event.
   - The backend updates the ride status to "completed" and emits a `rideCompleted` event.

### Socket.io Configuration

The backend initializes Socket.io in the `server.js` file:

```javascript
const http = require('http')
const app = require('./app')
const { initializeSocket } = require('./socket')

const server = http.createServer(app)

// Initialize Socket.io
const io = initializeSocket(server)

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})
```

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
