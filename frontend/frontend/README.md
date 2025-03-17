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
