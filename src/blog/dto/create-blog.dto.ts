import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  @ApiProperty({ example: 'Äthiopien' })
  readonly title: string;

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  @ApiProperty({ example: 'Der Lavasee ErtaAle' })
  readonly description: string;
}
