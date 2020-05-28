import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrderProductsTable1590551264281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'orders_products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'product_id',
              type: 'uuid',
            },
            {
              name: 'order_id',
              type: 'uuid',
            },
            {
              name: 'price',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'quantity',
              type: 'integer',
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
              name: 'Product_fk',
              columnNames: ['product_id'],
              referencedTableName: 'products',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
            {
              name: 'Order_fk',
              columnNames: ['order_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'orders',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        }),
      );
    };

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('orders_products', 'Product_fk');
      await queryRunner.dropForeignKey('orders_products', 'Order_fk');
      await queryRunner.dropTable('orders_products');


    }

}
