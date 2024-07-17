import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Curd } from './curd.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '名字' })
  name: string;

  @ManyToOne(() => Curd, {
    onDelete: 'CASCADE', // 允许级联删除
  })
  curd: Curd;
}
