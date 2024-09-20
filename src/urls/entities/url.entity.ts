import { UserEntity } from '../../user/entities/user.enetity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'urls' })
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'originalUrl', length: 255, nullable: false })
  originalUrl: string;

  @Column({ name: 'shortUrl', length: 200, nullable: false })
  shortUrl: string;

  @Column({ name: 'clicks', default: 0 })
  clicks: number;

  @ManyToOne(() => UserEntity, (user) => user.urls, { eager: true }) // eager carrega o user automaticamente
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
