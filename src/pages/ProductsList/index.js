import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import ProductCard from "../../components/ProductCard";
import { Categories, Colors, Price } from "../../components/Filters";
import Container from "../../components/Container";
import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const [productsState, setProductsState] = useState({
    isLoading: true,
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

  // [{id: "categories", value: "apple"},{id: "color", value: "red"} ]

  // ${apiUrl}/products/filter?categories=apple&color=red

  const getProductsByFilter = async () => {
    let requestUrl = `${apiUrl}/products/filter?`;

    const filterParams = getFiltersParams();

    requestUrl += filterParams;

    const res = await getAjax(requestUrl);
    setProductsState(res);
  };

  // https://orgafresh.herokuapp.com/api/products/filter?minPrice=180&maxPrice=200

  const getFiltersParams = () => {
    let filtersParams = "";
    console.log(filterState);
    filterState.forEach((item, index) => {
      if (item.value !== "all") {
        if (item.id === "price") {
          filtersParams +=
            "minPrice=" + item.value[0] + "&" + "maxPrice=" + item.value[1];
        } else {
          filtersParams += item.id + "=" + item.value;
        }
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

  const changePriceHandler = (price) => {
    const priceIndex = filterState.findIndex((item) => item.id === "price");
    if (priceIndex !== -1) {
      filterState[priceIndex].value = price.value;
    } else {
      filterState.push({ id: "price", value: price.value });
    }

    setFilterState([...filterState]);

    console.log("sd");
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
  console.log("productsState", productsState);
  return (
    <div className={styles.contentContainer}>
      <Container>
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
            <Price maxPrice={1500} changePriceHandler={changePriceHandler} />
          </div>
          <div className={styles.productsContainer}>
            {productsState.isLoading && <CircularProgress />}
            {productsState.data &&
              productsState.data?.products?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            {productsState.errors && <p>{productsState.errors}</p>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
