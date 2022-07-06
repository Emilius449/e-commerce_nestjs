import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserId } from 'src/auth/decorator/get-user-id.decorator';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Controller('addresses')
@ApiTags('addresses')
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiCreatedResponse({ type: AddressEntity })
  create(
    @Body() createAddressDto: CreateAddressDto,
    @GetUserId() userId: number,
  ) {
    return this.addressesService.create({ ...createAddressDto, userId });
  }

  @Get()
  @ApiOkResponse({ type: AddressEntity, isArray: true })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AddressEntity })
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AddressEntity })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AddressEntity })
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
/* 
{
  "country": "Tanzania",
  "city": "Dar Es Salaam",
  "region": "Dar Es Salaam",
  "addressLine": null,
  "postalCode": "11024",
  "phoneNumber": "0718741315"
}
*/
