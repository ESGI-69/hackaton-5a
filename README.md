# Hackaton 5A

## Init for dev

> Don't forget to `mv .env.example .env` in the backend & frontend folder

## Launch app 

2. Launch the postgres db **in the root folder**
    ```sh
      docker compose up postgres
    ```

3. Migrade the database with pisma **in the backend folder**
    ```
      npx prisma migrate deploy
    ```

2. Launch the rest of the app **in the root folder**
    ```sh
      docker compose up --build
    ```

5. optional: if you have typing erros during dev you can regenerate the prisma client **in the backend folder**
    ```sh
    npx prisma generate
    ```
