import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { FindAllDto } from './dto/findAll-curd.dto';
import { AddTagsDto } from './dto/tags-curd.dto';

@Controller('curd')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}

  @Post()
  create(@Body() createCurdDto: CreateCurdDto) {
    return this.curdService.create(createCurdDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.curdService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurdDto: UpdateCurdDto) {
    return this.curdService.update(+id, updateCurdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curdService.remove(+id);
  }

  // 给用户添加tags
  @Post('/add/tags')
  addTags(@Body() body: AddTagsDto) {
    return this.curdService.addTags(body);
  }
}
