import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
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
  @ApiProperty({ required: false })
  size: string | null;
  @ApiProperty({ required: false })
  color: string | null;
  @ApiProperty({ required: false })
  cartId: number | null;
  @ApiProperty({ required: false })
  orderId: number | null;
}
