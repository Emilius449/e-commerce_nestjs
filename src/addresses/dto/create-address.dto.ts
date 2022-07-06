import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
  @ApiHideProperty()
  id: number;
  @ApiHideProperty()
  createdAt: Date;
  @ApiHideProperty()
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
  @ApiHideProperty()
  userId: number;
}
