import Image from 'next/image';
import React from 'react';

async function ShowProducts() {
  const products = await fetch('https://cakeswow.com/api/hero-banners');
  const data = await products.json();

  return (
    <div>

     <div className=' gap-4 w-full '>
       {data.data.map((product: any) => (
        <div className=" p-4 border " key={product._id}>
          <Image src={product.image} alt="Banners" width={200} height={200} />
          <h1 className='text-center'>{product.title}</h1>
        </div>
      ))}
     </div>
    </div>
  );
}

export default ShowProducts;
