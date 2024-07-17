import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferMoneyDto } from './dto/transfer-money.dto';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transaction: Repository<Transaction>,
  ) {}

  async transferMoney(body: TransferMoneyDto) {
    try {
      return await this.transaction.manager.transaction(async (manager) => {
        let from = await this.transaction.findOne({
          where: { id: body.fromId },
        });
        let to = await this.transaction.findOne({ where: { id: body.toId } });
        if (from.money >= body.money) {
          manager.save(Transaction, {
            id: body.fromId,
            money: from.money - body.money,
          });
          manager.save(Transaction, {
            id: body.toId,
            money: to.money + body.money,
          });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '余额不足',
          };
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
