import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;
  @Column({ name: 'email', length: 70, nullable: false })
  email: string;
  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
