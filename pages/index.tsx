import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav';

const token = '';

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const defaultProduct : {
  id:number;
  name:string;
  price:number;
} | null = null;

export default function Home() {
  // fetch products
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/products', headers);
      setProduct(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = async (e:any) => {
    e.preventDefault();
    setMessage('');
    try {
      if (selectedProduct) {
        const enteredAmount = Number(amount);
        if (enteredAmount < selectedProduct.price) {
          setMessage('Not enough amount');
          return;
        }
        const res = await axios.post('/api/purchase', { productId: selectedProduct.id, amount, vendingMachineId: 1 }, headers);
        setLoading(true);
        setSelectedProduct(defaultProduct);
        setAmount('');
        if (res.data.data.return > 0) {
          setMessage(`Please collect your drinks and change ${res.data.data.return}`);
        } else {
          setMessage('Please collect your drinks');
        }
      }
    } catch (err:any) {
      if (err.response.status === 422) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong!!');
      }
    }
    setLoading(false);
  };
  return (
    <div style={{ width: '600px' }} className='mx-auto border-2 border-solid border-gray-300 p-4 mt-16'>
      <Nav />
      {loading && 'Loading'}
      <h2 className='text-center font-bold'>Choose drinks</h2>
      <ul className='flex'>
      {products && products.map((product:any) => (
          <li
          className={ `w-1/3 hover:cursor-pointer m-2 rounded-sm p-10 text-center border-2 border-solid ${selectedProduct && product.id === selectedProduct.id ? ' border-blue-500 bg-blue-200' : 'bg-blue-50 border-blue-50'}` }
          key={product.id} onClick={() => {
            if (product.quantity < 1) return;
            if (selectedProduct && product.id === selectedProduct.id) {
              setSelectedProduct(defaultProduct);
              return;
            }
            setSelectedProduct(product);
          }} >
            <strong>{product.name}</strong> <br/>  Rs. {product.price}
            <br/>
            <small className='text-red-400'>{product.quantity < 1 && 'Out of stock'}</small>
          </li>
      ))}
      </ul>
      <div className='m-2 text-center'>
        <div className='h-8'>
        {message && <p className='bg-yellow-100 p-2 text-gray-600 rounded-sm'>{message}</p>}
        </div>
        <input type="number" placeholder='Enter amount' className='border-2 border-solid border-gray-300 p-3 mt-4' name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br/>
        <input type="submit" className='bg-blue-300 px-8 py-3 mt-6 rounded-md hover:cursor-pointer  disabled:opacity-50' value="Buy" disabled={!(amount && selectedProduct)} onClick={handleClick} />
      </div>
    </div>
  );
}
