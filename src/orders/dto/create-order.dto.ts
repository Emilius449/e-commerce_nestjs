import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";

export class CreateOrderDto {
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
