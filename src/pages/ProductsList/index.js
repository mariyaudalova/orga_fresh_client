import React, { useEffect, useState } from "react";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import styles from "./ProductsList.module.scss";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Filters/Categories";

const ProductsList = () => {
  const [productsState, setProductsState] = useState({
    isLoading: false,
    data: null,
    errors: "",
  });

  const [activeCategory, setActiveCategory] = useState("Fruits");

  const getProducts = async () => {
    const res = await getAjax(`${apiUrl}/products`);
    setProductsState(res);
  };

  const getProductsByCategory = async () => {
    const res = await getAjax(
      `${apiUrl}/products/filter?categories=${activeCategory.toLowerCase()}`
    );
    console.log(res.data.products);
    setProductsState(res);
  };

  useEffect(() => {
    getProductsByCategory();
  }, [activeCategory]);

  const changeCategoryHandler = (category) => {
    setActiveCategory(category);
    console.log("Here will be request on server with all filters values");
  };

  return (
    <>
      <div className={styles.pageTitleContainer}>
        <p className={styles.pageTitle}>Products</p>
        <p>Home / Products</p>
      </div>
      <div className={styles.pageContainer}>
        <div>
          <Categories
            changeCategoryHandler={changeCategoryHandler}
            activeCategory={activeCategory}
          />
        </div>
        <div className={styles.productsContainer}>
          {productsState.isLoading && <p>Loading..</p>}
          {productsState.data &&
            productsState.data?.products?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          {productsState.errors && <p>{productsState.errors}</p>}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
