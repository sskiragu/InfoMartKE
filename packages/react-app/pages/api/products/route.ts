import type { NextApiRequest, NextApiResponse } from 'next'

// Mock data storage for demonstration purposes
let products = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1', quantity: 10, price: 100, imageUrl: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2', quantity: 5, price: 200, imageUrl: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Handle GET request
      res.status(200).json(products);
      break;

    case 'POST':
      // Handle POST request
      const newProduct = req.body;
      newProduct.id = products.length + 1; // Simple ID assignment for example purposes
      products.push(newProduct);
      res.status(201).json(newProduct);
      break;

    case 'PUT':
      // Handle PUT request
      const updatedProduct = req.body;
      products = products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      res.status(200).json(updatedProduct);
      break;

    case 'DELETE':
      // Handle DELETE request
      const { id } = req.query;
      products = products.filter(product => product.id !== parseInt(id as string));
      res.status(204).end();
      break;

    default:
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
