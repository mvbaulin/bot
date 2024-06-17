import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {id: 1, title: 'lkasf', price: 5000, description: 'desc1'},
  {id: 2, title: 'ksjf', price: 2000, description: 'desc2'},
  {id: 3, title: 'lfk;', price: 142, description: 'desc3'},
  {id: 4, title: 'o2', price: 9824, description: 'desc4'},
  {id: 5, title: 'kljf', price: 2412, description: 'desc5'},
  {id: 6, title: 'lkjf', price: 2412, description: 'desc6'},
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price;
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);

  const {tg} = useTelegram();

  const onAdd = (product) => {
    const allreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if (allreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (!newItems.length) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      });
    }
  }

  return (
    <div className='list'>
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  );
};

export default ProductList;
