# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Frontend Pages

### Home Page (/)

- **Description:** Landing page for users to book rides
- **Key Features:**
  - Interactive map display
  - Location search functionality
  - Vehicle selection panel
  - Ride confirmation flow
- **Components Used:**
  - LocationSearchPanel
  - VehiclePanel
  - ConfirmRide
  - LookingForDriver
  - WaitingForDriver

### Captain Home Page (/captain-Home)

- **Description:** Dashboard for ride captains
- **Key Features:**
  - Ride request notifications
  - Earnings display
  - Profile information
  - Active ride management
- **Components Used:**
  - CaptainDetails
  - RidePopUp
  - ConfirmRidePopUp

### Riding Page (/riding)

- **Description:** Active ride tracking for users
- **Key Features:**
  - Live ride status
  - Driver details
  - Route visualization
  - Payment interface
- **Components Used:**
  - Current ride details
  - Payment processing

### Captain Riding Page (/captain-riding)

- **Description:** Active ride management for captains
- **Key Features:**
  - Navigation assistance
  - Ride completion flow
  - Payment confirmation
- **Components Used:**
  - FinishRide
  - Navigation controls

## Components

### Location Related

- **LocationSearchPanel:**
  - Handles location search and selection
  - Displays suggested locations
  - Triggers vehicle panel on selection

### Vehicle Related

- **VehiclePanel:**
  - Shows available vehicle types
  - Displays pricing information
  - Handles vehicle selection

### Ride Management

- **ConfirmRide:**

  - Shows ride summary
  - Handles ride confirmation
  - Displays pricing details

- **RidePopUp:**

  - Notification for new ride requests
  - Shows user details and route
  - Accept/Reject functionality

- **ConfirmRidePopUp:**

  - OTP verification
  - Final ride confirmation
  - Ride details display

- **LookingForDriver:**

  - Loading state while finding driver
  - Cancellation option
  - Status updates

- **WaitingForDriver:**

  - Shows assigned driver details
  - Displays vehicle information
  - ETA information

- **FinishRide:**
  - Ride completion interface
  - Payment confirmation
  - Rating prompt

### User Interface

- **CaptainDetails:**
  - Profile information
  - Earnings display
  - Performance metrics

## Authentication Flow

### User Authentication

- Login/Signup pages
- JWT token management
- Protected route handling

### Captain Authentication

- Separate login/signup flow
- Vehicle information collection
- Profile management

## Data Management

- **Context:**
  - UserContext for user data
  - CaptainContext for captain data
- **Protected Routes:**
  - UserProtectedWrapper
  - CaptainProtectedWrapper

## Animation and Transitions

- GSAP animations for panels
- Smooth transitions between states
- Loading animations

## API Integration

- Axios for HTTP requests
- Environment variable configuration
- Error handling

## Styling

- Tailwind CSS for styling
- Responsive design
- Custom animations

## Socket.io Integration in Frontend

The frontend uses **Socket.io** to enable real-time communication with the backend. This ensures seamless updates for ride status, driver notifications, and location tracking.

### Key Features of Socket.io in Frontend

1. **Real-Time Updates**:

   - Users receive live updates about ride status (e.g., "Driver Assigned", "Ride Started", "Ride Completed").
   - Captains are notified in real-time when new ride requests are available.

2. **Location Tracking**:

   - Captains' locations are updated in real-time and sent to the backend every 10 seconds using geolocation APIs.
   - Users can track the live location of their assigned driver.

3. **Ride Status Management**:

   - Users and captains are notified of ride status changes (e.g., "Ride Confirmed", "Ride Started", "Ride Completed").

4. **Error Handling**:
   - Handles connection errors and reconnections seamlessly to ensure a smooth user experience.

---

### Socket.io Workflow in Frontend

#### For Users

1. **Joining the Socket Room**:
   - When a user logs in, they join a socket room using their user ID.
   ```javascript
   useEffect(() => {
     socket.emit('join', { userType: 'user', userId: user._id })
   }, [user])
   ```
