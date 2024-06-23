# Endpoints

# Auth

## POST /auth/login

### Request

```json
{
  "username": "username",
  "password": "password"
}
```

### Response

Token is a json web token

```json
{
  "token": "token"
}
```

# User

## POST /users/

### Request

```json
{
  "username": "username",
  "password": "password",
  "name": "name (optional)"
}
```

### Response

```json
{
  "id": 1,
  "username": "username",
  "name": "name"
}
```

## GET /users/me

> Need bearer token authorization header

### Response

```json
{
  "id": 1,
  "username": "username",
  "name": "name"
}
```
