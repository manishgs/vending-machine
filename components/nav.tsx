import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();
  return (
    <div>
      <h2 className='text-center text-lg'>Welcome to Vending Machine</h2>

      <ul className='flex border-solid border-gray-100 bg-gray-100 border-2 mx-2 my-6'>
        <li className={`m-2 ${router.pathname === '/' ? 'text-red-600' : ''}`}>
          <Link href="/" as="/">
            <a>Buy</a>
          </Link>
        </li>
        <li className={`m-2 ${router.pathname === '/refund' ? 'text-red-600' : ''}`}>
          <Link href="/refund" as="/refund">
            <a>Refund</a>
          </Link>
        </li>
        <li className={`m-2 ${router.pathname === '/balance' ? 'text-red-600' : ''}`}>
          <Link href="/balance" as="/balance">
            <a>Balance</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
