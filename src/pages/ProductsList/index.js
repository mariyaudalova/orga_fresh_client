import React, { useEffect, useState } from "react";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import styles from "./ProductsList.module.scss";
import ProductCard from "../../components/ProductCard";

const ProductsList = () => {
  const [productsState, setProductsState] = useState({
    isLoading: false,
    data: null,
    errors: "",
  });

  const getProducts = async () => {
    const res = await getAjax(`${apiUrl}/products`);
    setProductsState(res);
    console.log(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={styles.pageTitleContainer}>
        <p className={styles.pageTitle}>Products</p>
        <p>Home / Products</p>
      </div>
      <div className={styles.pageContainer}>
        <span>For Filter</span>
        <div className={styles.productsContainer}>
          {productsState.isLoading && <p>Loading..</p>}
          {productsState.data &&
            productsState.data?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          {productsState.errors && <p>{productsState.errors}</p>}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
