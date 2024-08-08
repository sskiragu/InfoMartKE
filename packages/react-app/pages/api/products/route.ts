import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.findAll();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      const { name, description, quantity, price, imageUrl } = req.body;

      if (!name || !description || !quantity || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      try {
        const newProduct = await Product.create({ name, description, quantity, price, imageUrl });
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;

    case 'PUT':
      const updatedProductData = req.body;

      if (!updatedProductData.id || !updatedProductData.name || !updatedProductData.description || !updatedProductData.quantity || !updatedProductData.price || !updatedProductData.imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      try {
        const [updatedRows] = await Product.update(updatedProductData, {
          where: { id: updatedProductData.id }
        });

        if (updatedRows === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await Product.findByPk(updatedProductData.id);
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
      }
      break;

    case 'DELETE':
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid product ID' });
      }

      try {
        const deletedRows = await Product.destroy({
          where: { id: parseInt(id, 10) }
        });

        if (deletedRows === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
