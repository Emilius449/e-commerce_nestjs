import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateProductDto {
  @ApiHideProperty()
  id: number;
  @ApiHideProperty()
  createdAt: Date;
  @ApiHideProperty()
  updatedAt: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  categories: string[];
  @ApiPropertyOptional()
  size: string | null;
  @ApiPropertyOptional()
  color: string | null;
  @ApiPropertyOptional()
  cartId: number | null;
  @ApiProperty({ required: false })
  orderId: number | null;
}
