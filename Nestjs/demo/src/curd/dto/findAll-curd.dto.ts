import { IsNotEmpty, IsString, Length,IsNumber } from 'class-validator';

export class FindAllDto {
  
  // @IsString()
  // @Length(5, 10, {
  //   message: '5到10个字符',
  // })
  keyWord: string;

  // @IsNotEmpty()
  // @IsNumber()
  page: number;

  // @IsNotEmpty()
  // @IsNumber()
  pageSize: number;
}
