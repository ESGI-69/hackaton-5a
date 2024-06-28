# Mediflow - Hackathon 2024

## Développeurs

Izïa CRINIER (19946-Dresden-St)
Gatien ANIZAN (mrpinkcat)
Quentin PELTIER (Timdev0)

## Fonctionnalités

- Mise en place de départ de l'application, back-end et front-end avec authentification (Gatien ANIZAN)
- Endpoint pour simuer un appel vers un patient qui n'aurait pas répondu (Gatien ANIZAN)
- Endpoint pour fermer un alerte (Gatien ANIZAN)
- Authentification et gestion des utilisateurs (Gatien ANIZAN)
- Shémas de données et relations (Gatien ANIZAN, Quentin PELTIER)
- Création du Datatable type safe en fonction du type de la donée qu'on lui passe (Gatien ANIZAN)
- Branchement de l'api à la page d'une alerte (Gatien ANIZAN, Izïa CRINIER)
- Chat pour simuler l'envoi de SMS Back/Front (Quentin PELTIER, Gatien ANIZAN)
- Alert et actions endpoints (Quentin PELTIER)
- Setup de mistral dans le back-end (Quentin PELTIER)
- Analyse de la conversation et génération d'alerte grace à l'IA (Quentin PELTIER, Gatien ANIZAN)
- Mise en place des SEEDS pour la base de données (Gatien ANIZAN)
- Endpoint assigner un doctor à une alerte et permetre au doctor d'envoyer un message au patient (Quentin PELTIER)

## Procédure d'installation

### Ollama

Installer ollama et lancer la commande suivante :

```sh
  ollama pull mistral
```

Assurez que l'API d'ollama écoute sur le port 11434

### DB Postgres

Dans le dossier racine lancez la commande suivante :

```sh
  docker compose up postgres
```

### Back-end

Dans le dossier back-end créé le .env grace au .env.example et executez les commandes suivantes :

```sh
  npm install
  npx prisma migrate dev && npx prisma db seed
  DATABASE_URL=postgresql://root:password@localhost:5432/app JWT_SECRET=secret OLLAMA_API=http://127.0.0.1:11434 npm run dev
```

### Front-end

Dans le dossier front-end et executez les commandes suivantes :

```sh
  npm install
  npm run dev
```
