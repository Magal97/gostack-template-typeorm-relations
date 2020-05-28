import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrderTable1590547761526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'customer_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'Customer_fk',
              columnNames: ['customer_id'],
              referencedTableName: 'customers',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        }),
      );

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('orders', 'Customer_fk');
      await queryRunner.dropTable('orders');
    }

}
