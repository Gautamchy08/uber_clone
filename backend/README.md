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
