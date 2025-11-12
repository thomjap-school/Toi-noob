import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  findFiltered(filters: any) {
    const query = this.tasksRepo.createQueryBuilder('task');

    if (filters.status)
      query.andWhere('task.status = :status', { status: filters.status });
    if (filters.priority)
      query.andWhere('task.priority = :priority', { priority: filters.priority });
    if (filters.userId)
      query.andWhere('task.userId = :userId', { userId: filters.userId });
    if (filters.orderBy)
      query.orderBy(`task.${filters.orderBy}`, 'ASC');

    return query.getMany();
  }

  findOne(id: number) {
    return this.tasksRepo.findOneBy({ id });
  }


  async create(data: Partial<Task>, userId?: number) {
    const task = this.tasksRepo.create(data);

    if (userId) {
      const user = await this.usersRepo.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      task.user = user;
    }

    return this.tasksRepo.save(task);
  }

  update(id: number, data: Partial<Task>) {
    return this.tasksRepo.update(id, data);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }

  async assignTask(taskId: number, userId: number) {
    const task = await this.tasksRepo.findOneBy({ id: taskId });
    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!task || !user) return null;

    task.user = user;
    return this.tasksRepo.save(task);
  }

  async updateStatus(id: number, status: string) {
    const task = await this.tasksRepo.findOneBy({ id });
    if (!task) return null;
    task.status = status;
    return this.tasksRepo.save(task);
  }
}
