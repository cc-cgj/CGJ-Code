import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import * as uuid from 'uuid'

console.log(uuid.v4());

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Config') private readonly base: any,
  ) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    // return this.listService.findAll();
    return this.base; // { "baseUrl":"/api/xiaojia" }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id, '===========id==========>');
    return this.listService.findOne(+id);
  }

  @Get('uuid/:uuid')
  findOneUuid(@Param('uuid',ParseUUIDPipe) uuid:number) {
    // ParseUUIDPipe会自动校验, 校验不通过会抛出: The value passed as UUID is not a string
    console.log(typeof uuid, '=========uuid============>');
    // return this.listService.findOne(+uuid);
    return uuid
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
