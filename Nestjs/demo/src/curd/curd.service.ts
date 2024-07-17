import { Injectable } from '@nestjs/common';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { FindAllDto } from './dto/findAll-curd.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Curd } from './entities/curd.entity';
import { AddTagsDto } from './dto/tags-curd.dto';
import { Tags } from './entities/tags.entity';

@Injectable()
export class CurdService {
  constructor(
    @InjectRepository(Curd) private readonly curd: Repository<Curd>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}
  create(createCurdDto: CreateCurdDto) {
    const data = new Curd();
    data.name = createCurdDto.name;
    data.desc = createCurdDto.desc;
    return this.curd.save(data);
  }

  async findAll(query: FindAllDto) {
    const data = await this.curd.find({
      relations: ['tags'], //[关联表名,...]
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC', // 排序：ASC 降序；DESC 升序
      },
      skip: (query.page - 1) * query.pageSize, // 跳过的数据
      take: query.pageSize, // 获取多少条数据
    });
    const total = await this.curd.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  async update(id: number, updateCurdDto: UpdateCurdDto) {
    // 1. 这通常适用于更新单个实体的非关系字段。
    // 但是，如果updateCurdDto中包含了试图直接修改关联集合（如一对多或多对多关系）的字段,例如：包含tags表的内容
    // Error: Cannot query across one-to-many for property tags
    return this.curd.update(id, updateCurdDto);

    // 2. 如果要更新关联的tags表内容
    // const curdToUpdate = await this.curd.findOne({
    //   where: {
    //     id: id,
    //   },
    //   relations: ['tags'],
    // });
    // Object.assign(curdToUpdate, updateCurdDto);

    // return this.curd.save(curdToUpdate);
  }

  remove(id: number) {
    return this.curd.delete(id);
  }

  async addTags(body: AddTagsDto) {
    const userInfo = await this.curd.findOne({
      where: {
        id: body.userId,
      },
    });
    const tagList: Tags[] = [];
    for (let i = 0; i < body.tags.length; i++) {
      const tag = new Tags();
      tag.name = body.tags[i];
      await this.tags.save(tag);
      tagList.push(tag);
    }
    userInfo.tags = tagList;
    return this.curd.save(userInfo);
  }
}
