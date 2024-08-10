import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../lib/sequelize';
import Transaction from '../../models/Transaction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { transactionId, payer, amount, timestamp, productId } = req.body;

    try {
      await sequelize.authenticate(); // Ensure the database connection is successful

      // Create a new transaction record
      await Transaction.create({
        transactionId,
        payer,
        amount,
        timestamp: new Date(timestamp), // Ensure timestamp is a Date object
        productId,
      });

      res.status(200).json({ message: 'Transaction recorded successfully' });
    } catch (error) {
      console.error('Error recording transaction:', error);
      res.status(500).json({ error: 'Failed to record transaction' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
