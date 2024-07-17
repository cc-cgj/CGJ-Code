import { ApiProperty } from '@nestjs/swagger';

export class CreateSwaggerDto {
  @ApiProperty({ example: '小甲', type: 'string', required: true })
  name: string;
  @ApiProperty({ example: 18 })
  age: number;
}
