# Endpoints

# Auth

## POST /auth/login

### Request

```json
{
    "username": "username",
    "password": "password",
}
```

### Response

Token is a json web token

```json
{
    "token": "token",
}
```

# User

## POST /users/

### Request

```json
{
    "username": "username",
    "password": "password",
    "name": "name (optional)",
}
```

### Response

```json
{
    "id": 1,
    "username": "username",
    "name": "name",
}
```

## GET /users/me

> Need bearer token authorization header

### Response

```json
{
    "id": 1,
    "username": "username",
    "name": "name",
}
```

# Recipe

## GET /recipes/:id

### Response

```json
{
    "id": 1,
    "title": "title",
    "description": "description",
    "steps": [
        "prends le lait",
        "boire le lait",
    ],
    "ingredientsWithQuantityIds": [],
    "createdAt": "2023-09-27T01:38:16.313Z",
    "updatedAt": "2023-09-27T01:38:16.313Z",
    "ingredientsWithQuantity": [
        {
            "id": 1,
            "quantity": "1ml",
            "ingredientId": 1,
            "recipeId": 1,
            "createdAt": "2023-09-27T01:38:16.301Z",
            "updatedAt": "2023-09-27T01:38:16.313Z",
            "ingredient": {
                "id": 1,
                "name": "caco"
            }
        },
        {
            "id": 2,
            "quantity": "2ml",
            "ingredientId": 2,
            "recipeId": 1,
            "createdAt": "2023-09-27T01:38:16.301Z",
            "updatedAt": "2023-09-27T01:38:16.313Z",
            "ingredient": {
                "id": 2,
                "name": "lait"
            }
        }
    ],
    "ratings": [
        {
            "id": 1,
            "notation": 1,
            "recipeId": 1,
            "authorId": 1,
            "comment": null,
            "createdAt": "2023-09-27T20:25:32.027Z",
            "updatedAt": "2023-09-27T20:25:32.027Z",
            "author": {
                "id": 1,
                "username": "gatien1",
                "name": null,
                "createdAt": "2023-09-27T20:23:40.567Z",
                "updatedAt": "2023-09-27T20:23:40.567Z"
            }
        },
        {
            "id": 2,
            "notation": 3,
            "recipeId": 1,
            "authorId": 1,
            "comment": null,
            "createdAt": "2023-09-27T20:28:48.425Z",
            "updatedAt": "2023-09-27T20:28:48.425Z",
            "author": {
                "id": 1,
                "username": "gatien1",
                "name": null,
                "createdAt": "2023-09-27T20:23:40.567Z",
                "updatedAt": "2023-09-27T20:23:40.567Z"
            }
        }
    ],
}
```

## POST /recipes/:id/ratings

> Need bearer token authorization header

### Request

```json
{
    "rating": 5,
}
```

```json
{
    "rating": 5,
    "comment": "comment",
}
```

### Response

```json
{
    "id": 2,
    "notation": 3,
    "recipeId": 1,
    "authorId": 5,
    "comment": null,
    "createdAt": "2023-09-27T20:28:48.425Z",
    "updatedAt": "2023-09-27T20:28:48.425Z",
    "author": {
        "id": 5,
        "username": "gat1",
        "name": "Gatien LeBoss",
        "createdAt": "2023-09-27T20:23:40.567Z",
        "updatedAt": "2023-09-27T20:23:40.567Z"
    }
}
```
## POST /recipes/search-ai

### Request

```json
{
    "prompt": "pizza"
}
```

### Response

```json
{
  "title": "Pizza Margherita",
  "description": "Une délicieuse pizza classique avec une garniture de tomates, de mozzarella et de basilic.",
  "ingredientsWithQuantity": [
    {
      "quantity": "300g",
      "ingredient": "pâte à pizza"
    },
    {
      "quantity": "200g",
      "ingredient": "sauce tomate"
    },
    {
      "quantity": "200g",
      "ingredient": "mozzarella"
    },
    {
      "quantity": "2",
      "ingredient": "tomates"
    },
    {
      "quantity": "quelques feuilles",
      "ingredient": "basilic frais"
    },
    {
      "quantity": "sel",
      "ingredient": "sel"
    },
    {
      "quantity": "poivre",
      "ingredient": "poivre"
    },
    {
      "quantity": "huile d'olive",
      "ingredient": "huile d'olive"
    }
  ],
  "steps": [
    "Préchauffer le four à 220°C.",
    "Étaler la pâte à pizza sur une plaque de cuisson recouverte de papier sulfurisé.",
    "Répartir la sauce tomate sur la pâte.",
    "Couper les tomates en tranches et les disposer sur la sauce tomate.",
    "Couper la mozzarella en tranches et les répartir sur les tomates.",
    "Ajouter quelques feuilles de basilic frais.",
    "Assaisonner avec du sel et du poivre selon votre goût.",
    "Arroser d'un filet d'huile d'olive.",
    "Enfourner la pizza pendant environ 15-20 minutes, ou jusqu'à ce que la pâte soit bien dorée et croustillante.",
    "Retirer du four et laisser reposer quelques minutes avant de découper et de déguster."
  ]
}
```