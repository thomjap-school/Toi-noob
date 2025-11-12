import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @Column({ nullable: true })
  userId: number;

  // Relation avec User si tu veux
  @ManyToOne(() => User, user => user.tasks)
  user: User;
}