# API Documentation

## User Registration

### Endpoint: `/users/register`

**Method:** POST

**Description:**
Register a new user in the system.

### Request Body

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

### Required Fields

- `email`: Valid email address
- `password`: Minimum 6 characters
- `firstName`: User's first name
- `lastName`: User's last name

### Response

#### Success Response

**Status Code:** 201 (Created)

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string"
  }
}
```

#### Error Responses

**Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Status Code:** 409 (Conflict)

```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

**Status Code:** 500 (Internal Server Error)

```json
{
  "success": false,
  "message": "Error message details..."
}
```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepass123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }'
```

#### Example Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "usr_123456789",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }
}
```

#### Example Error Response - Invalid Email

```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### Example Error Response - User Exists

```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

## User Login

### Endpoint: `/users/login`

**Method:** POST

**Description:**
Authenticate a user and generate an access token.

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields

- `email`: Valid email address
- `password`: Minimum 6 characters

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN_STRING",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

#### Error Responses

**Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepass123"
  }'
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123456789",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Example Error Response - Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## User Logout

### Endpoint: `/users/logout`

**Method:** POST

**Description:**
Logs out the user by invalidating their current session and JWT token.

### Headers Required

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

### Request Body

No request body required.

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "success": true,
  "message": "Logged out successfully",
  "timestamp": "2024-01-20T10:30:45Z"
}
```

#### Error Responses

**Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": {
    "code": "AUTH_001",
    "details": "Authentication token is invalid or has expired"
  }
}
```

**Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "message": "Missing authorization header"
}
```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Logged out successfully",
  "timestamp": "2024-01-20T10:30:45Z"
}
```

#### Example Error Response - Invalid Token

```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": {
    "code": "AUTH_001",
    "details": "Authentication token is invalid or has expired"
  }
}
```

#### Example Error Response - Missing Header

```json
{
  "success": false,
  "message": "Missing authorization header"
}
```

## User Profile

### Endpoint: `/users/profile`

**Method:** GET

**Description:**
Retrieve the current user's profile information.

### Headers Required

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

### Request Body

No request body required.

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Error Responses

**Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Status Code:** 404 (Not Found)

```json
{
  "success": false,
  "message": "User profile not found"
}
```

### Examples

#### Example Request

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

#### Example Success Response

```json
{
  "success": true,
  "user": {
    "id": "usr_123456789",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "createdAt": "2024-01-20T08:30:00Z",
    "updatedAt": "2024-01-20T08:30:00Z"
  }
}
```

#### Example Error Response - Invalid Token

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

#### Example Error Response - Profile Not Found

```json
{
  "success": false,
  "message": "User profile not found"
}
```

## Captain Registration

### Endpoint: `/captains/register`

**Method:** POST

**Description:**
Register a new captain (driver) in the system.

### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "colour": "string",
    "plate": "string",
    "model": "string",
    "capacity": "number",
    "vehicleType": "car" | "motorcycle" | "auto"
  }
}
```

### Required Fields

- `fullname.firstname`: Minimum 3 characters
- `email`: Valid email address
- `password`: Minimum 6 characters
- `vehicle.colour`: Minimum 3 characters
- `vehicle.plate`: Minimum 3 characters
- `vehicle.model`: Minimum 3 characters
- `vehicle.capacity`: Minimum value of 1
- `vehicle.vehicleType`: Must be one of: "car", "motorcycle", "auto"

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "active",
    "vehicle": {
      "colour": "string",
      "plate": "string",
      "model": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "_id": "string"
  }
}
```

#### Error Responses

**Status Code:** 400 (Bad Request)

```json
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "password": "securepass123",
    "vehicle": {
      "colour": "Black",
      "plate": "XYZ123",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Example Success Response

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "active",
    "vehicle": {
      "colour": "Black",
      "plate": "XYZ123",
      "model": "Toyota Camry",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "65abcd1234567890"
  }
}
```

## Captain Login

### Endpoint: `/captains/login`

**Method:** POST

**Description:**
Authenticate a captain and generate an access token.

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields

- `email`: Valid email address
- `password`: Minimum 6 characters

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "colour": "string",
      "plate": "string",
      "model": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "_id": "string"
  }
}
```

#### Error Response

**Status Code:** 401 (Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

## Captain Profile

### Endpoint: `/captains/profile`

**Method:** GET

**Description:**
Retrieve the current captain's profile information.

### Headers Required

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "colour": "string",
      "plate": "string",
      "model": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "_id": "string"
  }
}
```

#### Error Response

**Status Code:** 401 (Unauthorized)

```json
{
  "message": "Authentication required"
}
```

## Captain Logout

### Endpoint: `/captains/logout`

**Method:** POST

**Description:**
Invalidate the captain's current session and JWT token.

### Headers Required

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

### Response

#### Success Response

**Status Code:** 200 (OK)

```json
{
  "message": "logout successfully"
}
```

#### Error Response

**Status Code:** 401 (Unauthorized)

```json
{
  "message": "Authentication required"
}
```

### Examples

#### Example Login Request

```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.driver@example.com",
    "password": "securepass123"
  }'
```

#### Example Profile Request

```bash
curl -X GET http://localhost:3000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Example Logout Request

```bash
curl -X POST http://localhost:3000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Ride Creation

### Endpoint: `/rides/create`

**Method:** POST

**Authentication:**  
The endpoint requires a valid user JWT token in the `Authorization` header.

**Request Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

**Request Body:**

```json
{
  "pickup": "string (min 3 characters)",
  "destination": "string (min 3 characters)",
  "vehicleType": "string, must be one of: 'auto', 'car', 'motorcycle'"
}
```

**Description:**  
Creates a new ride for the authenticated user. The request body is validated to ensure that:

- `pickup` and `destination` are strings with a minimum length of 3 characters.
- `vehicleType` is one of the allowed values: "auto", "car", or "motorcycle".

Upon successful validation, the ride is created and stored (via `rideController.createRide`).

**Success Response:**

**Status Code:** 200 (OK)

```json
{
  "ride": {
    "_id": "string",
    "user": "USER_ID",
    "pickup": "Pickup location address",
    "destination": "Destination address",
    "vehicleType": "car",
    "fare": "number",
    "status": "pending",
    "duration": "number (in seconds, if available)",
    "distance": "number (if available)",
    "otp": "string",
    "...additional ride details..."
  }
}
```

**Error Responses:**

- **Validation Error**  
  **Status Code:** 400 (Bad Request)

  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup address",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Invalid destination address",
        "param": "destination",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicleType",
        "location": "body"
      }
    ]
  }
  ```

- **Server Error**  
  **Status Code:** 500 (Internal Server Error)

  ```json
  {
    "message": "Error message details..."
  }
  ```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/rides/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN_STRING" \
  -d '{
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "vehicleType": "car"
  }'
```

#### Example Success Response

```json
{
  "ride": {
    "_id": "ride_123456789",
    "user": "usr_123456789",
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "vehicleType": "car",
    "fare": 150,
    "status": "pending",
    "duration": 900,
    "distance": 12.5,
    "otp": "1234"
  }
}
```

---

## Get Fare for a Ride

### Endpoint: `/rides/getFare`

**Method:** POST

**Authentication:**  
Requires a valid user JWT token in the `Authorization` header.

**Request Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

**Request Body:**

```json
{
  "pickup": "string (min 3 characters)",
  "destination": "string (min 3 characters)"
}
```

**Description:**  
Calculates the estimated fare between the provided pickup and destination addresses. Internally, this endpoint may call a distance matrix service (such as the Google Maps API) to get distance and duration details, and then compute the fare based on predefined pricing rules.

**Success Response:**

**Status Code:** 200 (OK)

```json
{
  "fare": 150,
  "distance": "12.5 km",
  "duration": "15 mins"
}
```

**Error Response:**

- **Validation or Server Error:**  
  **Status Code:** 400 or 500, depending on the issue.

  ```json
  {
    "success": false,
    "message": "Error message details..."
  }
  ```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/rides/getFare \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN_STRING" \
  -d '{
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City"
  }'
```

#### Example Success Response

```json
{
  "fare": 150,
  "distance": "12.5 km",
  "duration": "15 mins"
}
```

## Confirm Ride

### Endpoint: `/rides/confirm`

**Method:** POST

**Authentication:**  
Requires a valid captain JWT token in the `Authorization` header.

**Request Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

**Request Body:**

```json
{
  "rideId": "string (valid MongoDB ObjectId)"
}
```

**Success Response:**

**Status Code:** 200 (OK)

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "captain": {
      "_id": "507f1f77bcf86cd799439013",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
      },
      "vehicle": {
        "colour": "Black",
        "plate": "XYZ123",
        "model": "Toyota Camry",
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "fare": 150,
    "status": "accepted",
    "otp": "123456"
  }
}
```

**Error Responses:**

- **Validation Error**  
  **Status Code:** 400 (Bad Request)

  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride id",
        "param": "rideId",
        "location": "body"
      }
    ]
  }
  ```

- **Authentication Error**  
  **Status Code:** 401 (Unauthorized)

  ```json
  {
    "message": "Authentication required"
  }
  ```

## Start Ride

### Endpoint: `/rides/start-ride`

**Method:** GET

**Authentication:**  
Requires a valid captain JWT token in the `Authorization` header.

**Request Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

**Query Parameters:**

```json
{
  "rideId": "string (valid MongoDB ObjectId)",
  "otp": "string (exactly 6 characters)"
}
```

**Description:**  
Allows a captain to start a ride after verifying the OTP provided by the user. The captain must be authenticated, the ride ID must be valid, and the OTP must match the one generated during ride creation.

**Success Response:**

**Status Code:** 200 (OK)

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "captain": {
      "_id": "507f1f77bcf86cd799439013",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
      },
      "vehicle": {
        "colour": "Black",
        "plate": "XYZ123",
        "model": "Toyota Camry",
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "fare": 150,
    "status": "in_progress",
    "startTime": "2024-03-30T12:00:00Z",
    "otp": "123456"
  },
  "message": "Ride started successfully"
}
```

**Error Responses:**

- **Validation Error**  
  **Status Code:** 400 (Bad Request)

  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride id",
        "param": "rideId",
        "location": "query"
      },
      {
        "msg": "Invalid OTP",
        "param": "otp",
        "location": "query"
      }
    ]
  }
  ```

- **Authentication Error**  
  **Status Code:** 401 (Unauthorized)

  ```json
  {
    "message": "Authentication required"
  }
  ```

- **OTP Verification Error**  
  **Status Code:** 400 (Bad Request)
  ```json
  {
    "message": "Invalid OTP"
  }
  ```

### Examples

#### Example Request

```bash
curl -X GET "http://localhost:3000/rides/start-ride?rideId=507f1f77bcf86cd799439011&otp=123456" \
  -H "Authorization: Bearer JWT_TOKEN_STRING"
```

#### Example Success Response

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "captain": {
      "_id": "507f1f77bcf86cd799439013",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
      },
      "vehicle": {
        "colour": "Black",
        "plate": "XYZ123",
        "model": "Toyota Camry",
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "fare": 150,
    "status": "in_progress",
    "startTime": "2024-03-30T12:00:00Z",
    "otp": "123456"
  },
  "message": "Ride started successfully"
}
```

---

## End Ride

### Endpoint: `/rides/end-ride`

**Method:** POST

**Authentication:**  
Requires a valid captain JWT token in the `Authorization` header.

**Request Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"
}
```

**Request Body:**

```json
{
  "rideId": "string (valid MongoDB ObjectId)"
}
```

**Description:**  
Allows a captain to end an ongoing ride. The captain must be authenticated, and the ride must be in "in_progress" status. This endpoint will update the ride status to "completed", calculate the final fare, and record the end time.

**Success Response:**

**Status Code:** 200 (OK)

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "captain": {
      "_id": "507f1f77bcf86cd799439013",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
      },
      "vehicle": {
        "colour": "Black",
        "plate": "XYZ123",
        "model": "Toyota Camry",
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "fare": 150,
    "status": "completed",
    "startTime": "2024-03-30T12:00:00Z",
    "endTime": "2024-03-30T12:30:00Z",
    "duration": 1800,
    "distance": 12.5
  },
  "message": "Ride completed successfully"
}
```

**Error Responses:**

- **Validation Error**  
  **Status Code:** 400 (Bad Request)

  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride id",
        "param": "rideId",
        "location": "body"
      }
    ]
  }
  ```

- **Authentication Error**  
  **Status Code:** 401 (Unauthorized)

  ```json
  {
    "message": "Authentication required"
  }
  ```

- **Ride Status Error**  
  **Status Code:** 400 (Bad Request)

  ```json
  {
    "message": "Ride is not in progress"
  }
  ```

- **Server Error**  
  **Status Code:** 500 (Internal Server Error)
  ```json
  {
    "message": "Failed to end ride"
  }
  ```

### Examples

#### Example Request

```bash
curl -X POST http://localhost:3000/rides/end-ride \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN_STRING" \
  -d '{
    "rideId": "507f1f77bcf86cd799439011"
  }'
```

#### Example Success Response

```json
{
  "ride": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      }
    },
    "captain": {
      "_id": "507f1f77bcf86cd799439013",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Smith"
      },
      "vehicle": {
        "colour": "Black",
        "plate": "XYZ123",
        "model": "Toyota Camry",
        "vehicleType": "car"
      }
    },
    "pickup": "123 Main Street, City",
    "destination": "456 Elm Street, City",
    "fare": 150,
    "status": "completed",
    "startTime": "2024-03-30T12:00:00Z",
    "endTime": "2024-03-30T12:30:00Z",
    "duration": 1800,
    "distance": 12.5
  },
  "message": "Ride completed successfully"
}
```

---
