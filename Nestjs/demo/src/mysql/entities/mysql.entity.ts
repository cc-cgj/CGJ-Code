import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Mysql {
  // 自动递增的主键
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: number;
  // @Column()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    // 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
    select: true, //查询表中所有的字段,这个字段会被过滤
    comment: '注释',
    nullable: false, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
  })
  password: string;

  @Column()
  age: number;

  // 自动生成列
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: [1, 2, 3], // 也可以是ts的枚举 enum
    default: 1,
  })
  xiaojia: number;

  @Column('simple-array')
  names: string[]; //相当于自动帮你调用join

  @Column('simple-json')
  json: {
    name: string;
    age: number;
  };
}
