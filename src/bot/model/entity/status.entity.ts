import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class StatusEntity {
    @PrimaryColumn({ type: 'bigint' })
    id: number;

    @Column({default: false})
    anonStarted: boolean;

    @Column({default: false})
    public deAnonStarted: boolean;

    @CreateDateColumn()
    public readonly createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
