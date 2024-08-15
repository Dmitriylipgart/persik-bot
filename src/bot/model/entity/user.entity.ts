import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {UserRole} from "../../shared/consts";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', unique: true })
  telegramId: number;

  @Column({nullable: true})
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
}
