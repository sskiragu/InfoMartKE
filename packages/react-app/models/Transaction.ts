import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/sequelize';

class Transaction extends Model {
  public transactionId!: string;
  public payer!: string;
  public amount!: number;
  public timestamp!: Date;
  public productId!: string;
}

Transaction.init({
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  payer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transactions',
  timestamps: false, // If you have created_at and updated_at columns, set this to true
});

export default Transaction;
