import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Créer une tâche
  @Post()
  async createTask(@Body() data: Partial<Task> & { userId?: number }) {
    const { userId, ...taskData } = data;
    return this.tasksService.create(taskData, userId);
  }

  // Récupérer toutes les tâches (avec filtrage possible)
  @Get()
  getTasks(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('userId') userId?: number,
    @Query('orderBy') orderBy?: string,
  ) {
    const filters = { status, priority, userId, orderBy };
    return this.tasksService.findFiltered(filters);
  }

  // Récupérer une seule tâche par ID
  @Get(':id')
  getTask(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  // Mettre à jour une tâche
  @Put(':id')
  updateTask(@Param('id') id: number, @Body() data: Partial<Task>) {
    return this.tasksService.update(id, data);
  }

  // Supprimer une tâche
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }

  // Assigner une tâche à un utilisateur
  @Post(':taskId/assign/:userId')
  assignTask(@Param('taskId') taskId: number, @Param('userId') userId: number) {
    return this.tasksService.assignTask(taskId, userId);
  }

  // Mettre à jour le statut d’une tâche
  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.tasksService.updateStatus(id, status);
  }
}
