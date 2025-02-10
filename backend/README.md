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
  "message": "Internal server error"
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
