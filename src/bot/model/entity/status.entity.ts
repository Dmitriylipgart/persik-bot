import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StatusEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: false })
  anonStarted: boolean;

  @Column({ default: false })
  public deAnonStarted: boolean;

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
