import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../models/product';
import sequelize from '../../lib/sequelize';

const models = [Product];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Starting database synchronization...');
    await sequelize.sync({ force: true }); // 'force: true' drops the table if it exists
    console.log('Database synchronized successfully');

    res.status(200).json({ message: 'Database synchronized successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to synchronize database' });
  }
}
