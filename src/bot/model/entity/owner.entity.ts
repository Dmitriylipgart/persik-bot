import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'owner' })
export class OwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public readonly ownerId: number;
}