# Etape 1: Gestion de Tâches — Base de Données MySQL

Ce Projet contient L'étape 1 du projet Taskforge qui demander de faire des bases de données avec MariaDB

---

# Contenu

- Création de la base de données  
- Tables :
  - `user` → gestion des utilisateurs
  - `tasks` → gestion des tâches
  - `assignments` → liaison entre utilisateurs et tâches
- Insertion de données d’exemple
- Configuration des clés étrangères et contraintes

---

# Table `user`

| Colonne | Type | Description |
|----------|------|-------------|
| `id` | INT (PK, AI) | Identifiant unique de l’utilisateur |
| `name` | VARCHAR(100) | Nom de l’utilisateur |
| `email` | VARCHAR(100) | Adresse e-mail (unique) |
| `password` | VARCHAR(255) | Mot de passe (hashé à terme) |
| `role` | ENUM('admin', 'member') | Rôle de l’utilisateur (par défaut : `member`) |

# Exemple de données :
```sql
(1, 'Guernier Thomas', 'guerni_t@etna-alternance.net', 'etna', 'admin');
```

# Etape 2, NestJS Task Manager API


Une API RESTful faites avec **NestJS** et **TypeORM** qui permettent de gérer des utilisateurs et des tâches, avec des méthodes de CRUD, d’attribution, de filtrage et de tri.

## Modifier le task-management-api/.env.example

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_username_db
DATABASE_PASSWORD=your_password_db
DATABASE_NAME=your_database_name
```
Remplacer les données après le "=" par vos propres identifiants

## Setup du Projet

```bash
$ npm install
```

## Compiler pour lancer le projet

```bash
# acces au bon dossier
$ cd task-management-api

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utilisateurs
- **Créer** un utilisateur — `POST /users`
  • Vérifie que l'email n'est pas déjà utilisé.
  • Renvoie 409 Conflict "Email Already in used" si email déjà pris.
- **Lire** tous les utilisateurs — `GET /users`
- **Lire** un utilisateur par ID — `GET /users/:id`
- **Mettre à jour** un utilisateur — `PUT /users/:id`
- **Supprimer** un utilisateur — `DELETE /users/:id`

## Tâches
- **Créer** une tâche — `POST /tasks`
- **Lire** toutes les tâches — `GET /tasks`
- **Lire** une tâche par ID — `GET /tasks/:id`
- **Mettre à jour** une tâche — `PUT /tasks/:id`
- **Supprimer** une tâche — `DELETE /tasks/:id`
- **Changer le statut** d’une tâche — `PUT /tasks/:id/status`
- **Assigner une tâche à un utilisateur** — `POST /tasks/:taskId/assign/:userId`

## Exemple d'ajout d'un Utilisateur

{
  "name": "bob", 
  "email": "bob@example.com", 
  "password": "123456"
}

## Filtrage et tri (exemples)
- Par statut : `GET /tasks?status=done`
- Par priorité : `GET /tasks?priority=high`
- Par date limite : `GET /tasks?dueBefore=2025-12-01`
- Par utilisateur assigné : `GET /tasks?userId=3`

## Contraintes utilisées

- Emails doivent être unique
- Tous les champs doivent être rempli lors de la création ou l'update d'une tâche
- Les Erreurs sont standardisées avec un status code Http.

## Exemple d'Erreur

{
  "message": "Email déjà utilisé",
  "error": "Conflict"
  "statusCode": 409,
}

## Technologies utilisées

- NestJS pour la structure et le routing
- TypeORM pour l'acces à la base de données
- MariaDB / MySQL comme base de données
- Postman pour les tests d'API