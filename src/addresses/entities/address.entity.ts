import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  country: string;
  @ApiProperty()
  city: string;
  @ApiProperty({ required: false })
  region: string | null;
  @ApiProperty({ required: false })
  addressLine: string | null;
  @ApiProperty()
  postalCode: string;
  @ApiProperty({ required: false })
  phoneNumber: string | null;
  // @ApiProperty()
  userId: number;
}
