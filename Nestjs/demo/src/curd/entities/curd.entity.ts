import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class Curd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '名字' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: '描述' })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: string;

  @OneToMany(() => Tags, (tags) => tags.curd)
  tags: Tags[];
}
