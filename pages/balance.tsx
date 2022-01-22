import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav';

const headers = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};

export default function Balance() {
  // fetch products
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, productRes] = await Promise.all([axios.get('/api/balance', headers), axios.get('/api/products', headers)]);
        setBalance(balanceRes.data.data.balance);
        setProducts(productRes.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setMessage('Permission Error');
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: '600px' }} className='mx-auto border-2 border-solid border-gray-300 p-4 mt-16'>
      <Nav />
      {message && <p className='bg-yellow-100 p-2 text-gray-600 rounded-sm'>{message}</p>}
      {loading ? <div className='text-center'>Loading...</div>
        : <ul className='m-2'>
        <li className='py-4 border-b-2 border-gray-200 border-solid'> <strong>Current Balance:</strong> {JSON.stringify(balance)}</li>
        {products && products.map((product:any) => (
            <li className='py-4 border-b-2 border-gray-200 border-solid' key={product.id}>
              <strong>{product.name}</strong>: {product.quantity}
            </li>
        ))}
      </ul>}
    </div>
  );
}
