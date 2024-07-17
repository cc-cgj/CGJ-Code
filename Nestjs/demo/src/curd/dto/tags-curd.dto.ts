import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class AddTagsDto {
  userId: number;
  tags: string[];
}
