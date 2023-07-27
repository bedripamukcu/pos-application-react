import Categories from '../components/categories/Categories';
import Products from '../components/products/Products'
import CartTotals from '../components/cart/CartTotals';

import Header from '../components/header/Header';
import { useEffect, useState } from 'react';


const HomePage = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res= await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
        const data = await res.json()
        data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title };
          })
        );
    }
       catch (error) {
        console.log(error);
      }
     
    }   
      getCategories()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return  ( <>
    <Header setSearch={setSearch}/> <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24">
  <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
  <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
  </div>
  <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
          <Products
            categories={categories}
            filtered={filtered}
            products={products}
            setProducts={setProducts}
            search={search}
          />
  </div>
  <div className="card-wrapper">
    <CartTotals/>
  </div>
</div></>
)}

export default HomePage
