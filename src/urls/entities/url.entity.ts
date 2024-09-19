import { UserEntity } from '../../user/entities/user.enetity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
  } from 'typeorm';

  @Entity({ name: 'urls' })
  export class UrlEntity {
    @Column({ name: 'url', length: 255, nullable: false })
    url: string;

    @Column(() => UserEntity)
    user: UserEntity

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
  }
