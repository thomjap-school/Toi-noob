# 👤 Utilisateurs
- **Créer** un utilisateur — `POST /users`
- **Lire** tous les utilisateurs — `GET /users`
- **Lire** un utilisateur par ID — `GET /users/:id`
- **Mettre à jour** un utilisateur — `PUT /users/:id`
- **Supprimer** un utilisateur — `DELETE /users/:id`

# Tâches
- **Créer** une tâche — `POST /tasks`
- **Lire** toutes les tâches — `GET /tasks`
- **Lire** une tâche par ID — `GET /tasks/:id`
- **Mettre à jour** une tâche — `PUT /tasks/:id`
- **Supprimer** une tâche — `DELETE /tasks/:id`
- **Changer le statut** d’une tâche — `PUT /tasks/:id/status`
- **Assigner une tâche à un utilisateur** — `POST /tasks/:taskId/assign/:userId`

# Filtrage et tri (exemples)
- Par statut : `GET /tasks?status=done`
- Par priorité : `GET /tasks?priority=high`
- Par date limite : `GET /tasks?dueBefore=2025-12-01`
- Par utilisateur assigné : `GET /tasks?userId=3`
