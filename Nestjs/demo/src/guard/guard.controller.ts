import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role, RoleReqUrl } from './role/role.decorator';
import { ApiTags, ApiOperation, ApiParam,ApiResponse } from '@nestjs/swagger';

@Controller('guard')
@ApiTags('守卫接口') //swagger添加分组
@UseGuards(RoleGuard) // 守卫
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('role',['admin'])
  // 自定义装饰器
  @Role('admin')
  @ApiOperation({
    summary: 'get接口',
    description: 'description猫叔嘻嘻嘻',
  })
  @ApiResponse({
    status: 403,
    description: '小黑子我是403'
  })
  findAll(@RoleReqUrl('传递的data') url: string) {
    console.log(url);
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是一个id',
    required: true,
    type: 'string',
  })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
