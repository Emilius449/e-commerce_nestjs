import { ApiProperty } from '@nestjs/swagger';
import { Order, Status } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  status: Status;
  @ApiProperty()
  addressId: number;
}
