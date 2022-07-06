import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPreNextMonth } from 'src/utils/utils';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({ data: createOrderDto });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  findOne(id: number) {
    return this.prismaService.order.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prismaService.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  remove(id: number) {
    return this.prismaService.order.delete({ where: { id } });
  }

  getStatic() {
    this.prismaService.order.aggregate({
      where: {
        createdAt: {
          lt: getPreNextMonth(-3),
        },
      },
    });
  }
}
