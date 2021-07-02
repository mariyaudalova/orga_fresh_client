import React, { useEffect, useState } from "react";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import styles from "./ProductsList.module.scss";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Filters/Categories";
import { Colors } from "../../components/Filters";

const ProductsList = () => {
  const [productsState, setProductsState] = useState({
    isLoading: false,
    data: null,
    errors: "",
  });

  const [activeCategory, setActiveCategory] = useState({
    id: "categories",
    uiLabel: "All",
    value: "all",
  });
  const [activeColor, setActiveColor] = useState(null);
  const [filterState, setFilterState] = useState([
    {
      id: "categories",
      uiLabel: "All",
      value: "all",
    },
  ]);

  const getProducts = async () => {
    const res = await getAjax(`${apiUrl}/products`);
    setProductsState(res);
  };

  // [{id: "categories", value: "apple"},{id: "color", value: "red"} ]

  // ${apiUrl}/products/filter?categories=apple&color=red

  const getProductsByFilter = async () => {
    let requestUrl = `${apiUrl}/products/filter?`;

    const filterParams = getFiltersParams();

    requestUrl += filterParams;

    const res = await getAjax(requestUrl);
    setProductsState(res);
  };

  const getFiltersParams = () => {
    let filtersParams = "";
    console.log(filterState);
    filterState.forEach((item, index) => {
      if (item.value !== "all") {
        filtersParams += item.id + "=" + item.value;
        if (filterState.length !== index + 1) filtersParams += "&";
      }
    });
    return filtersParams;
  };

  useEffect(() => {
    //  getProductsByCategory();
    getProductsByFilter();
  }, [filterState]);

  const changeCategoryHandler = (category) => {
    setActiveCategory(category);

    const categoryIndex = filterState.findIndex(
      (item) => item.id === "categories"
    );
    if (categoryIndex !== -1) {
      filterState[categoryIndex] = category;
    }

    setFilterState([...filterState]);
  };

  const changeColorHandler = (color) => {
    setActiveColor(color);

    const colorIndex = filterState.findIndex((item) => item.id === "color");
    if (colorIndex !== -1) {
      filterState[colorIndex].value = color;
    } else {
      filterState.push({ id: "color", value: color });
    }

    setFilterState([...filterState]);
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
          <Colors
            changeColorHandler={changeColorHandler}
            activeColor={activeColor}
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
