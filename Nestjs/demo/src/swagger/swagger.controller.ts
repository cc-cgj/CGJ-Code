import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { CreateSwaggerDto } from './dto/create-swagger.dto';
import { UpdateSwaggerDto } from './dto/update-swagger.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth
} from '@nestjs/swagger';

@Controller('swagger')
@ApiTags('swagger演示')
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createSwaggerDto: CreateSwaggerDto) {
    return this.swaggerService.create(createSwaggerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get接口',
    description: '获取所有数据',
  })
  @ApiQuery({
    name: 'page',
    description: '分页信息',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 403,
    description: '小黑子我是403',
  })
  findAll() {
    return this.swaggerService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是一个id',
    required: true,
    type: 'string',
  })
  findOne(@Param('id') id: string) {
    return this.swaggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwaggerDto: UpdateSwaggerDto) {
    return this.swaggerService.update(+id, updateSwaggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swaggerService.remove(+id);
  }
}
