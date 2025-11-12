import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return `
      <html>
        <head>
          <title>API Gestion des Tâches</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
          <h1>🚀 Bienvenue sur l'API de gestion des tâches !</h1>
          <p>Tout fonctionne parfaitement ✅</p>
        </body>
      </html>
    `;
  }
}