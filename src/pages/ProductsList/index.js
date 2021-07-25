/* eslint-disable */
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import {
  Categories,
  Colors,
  Price,
  WithFilters,
} from "../../components/Filters";
import styles from "./ProductsList.module.scss";
import { toggleFavorite } from "../../state/favouritesProducts/actionsCreators";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import { getCurrency } from "../../state/currency/selectors";
import { ColorList, SizeList } from "../../components/Filters/FilterList";

const ProductsList = () => {
  const defaultCategoriesList = [
    { id: "categories", uiLabel: "Fruits", value: "fruits", isActive: false },
    {
      id: "categories",
      uiLabel: "Vegetables",
      value: "vegetables",
      isActive: false,
    },
    { id: "categories", uiLabel: "Burries", value: "Burries", isActive: false },
  ];
  const defaultColorsList = [
    {
      id: "color",
      uiLabel: "red",
      value: "red",
      isActive: false
    },
    {
      id: "color",
      uiLabel: "yellow",
      value: "yellow",
      isActive: false,
    },
    {
      id: "color",
      uiLabel: "green",
      value: "green",
      isActive: false
    },
  ];
  const filterDefaultState = {
    categories: [],
    color: [],
    price: []
  };

  const [productsState, setProductsState] = useState({
    isLoading: true,
    data: null,
    errors: "",
  });

  const [categoriesList, setCategoriesList] = useState(defaultCategoriesList);
  const [colorsList, setColorsList] = useState(defaultColorsList);
  const [activeSize, setActiveSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [page, setPage] = useState({
    perPage: 5,
    startPage: 1,
  });

  // https://orgafresh.herokuapp.com/api/products/filter?minPrice=0&maxPrice=500&&perPage=2&startPage=3
  const [filterState, setFilterState] = useState(filterDefaultState);

  const currentCurrency = useSelector(getCurrency);

  const getProductsByPrice = () => {
    const currencyRates = {
      USD: 1 / 27.2,
      UAH: 27.2,
    };

    if (productsState.data?.products[0].currency !== currentCurrency) {
      const changedCurrencyProducts = productsState.data?.products.map(
        (item) => {
          const newPrice = item.currentPrice * currencyRates[currentCurrency];
          item.currentPrice = newPrice.toFixed(2);
          item.currency = currentCurrency;
          return item;
        }
      );
      setProductsState({
        ...productsState,
        data: {
          products: changedCurrencyProducts,
        },
      });
      console.log(changedCurrencyProducts);
    }
  };

  const getProductsByFilter = async () => {
    let requestUrl = `${apiUrl}/products/filter?`;

    const filterParams = getFiltersParams();

    const pageParams = getPageParams();

    requestUrl += filterParams + pageParams;

    const res = await getAjax(requestUrl);

    res.data.products = res.data.products.map((item) => {
      item.currency = "USD";
      return item;
    });
    setProductsState(res);
  };

  const getMaxPriceValue = () => {
    const max = Math.max.apply(
      Math,
      productsState.data?.products?.map(function (object) {
        return object.currentPrice;
      })
    );
    setMaxPrice(max);
  };

  // https://orgafresh.herokuapp.com/api/products/filter?minPrice=180&maxPrice=200

  const getFiltersParams = () => {
    let filtersParams = "";
    console.log("filterState", filterState);

    const allFilterKeys = Object.keys(filterState).filter(item => filterState[item].length);
    console.log("allFilterKeys", allFilterKeys);
    allFilterKeys.forEach((item, index) => {
      if (item === "price") {
        filtersParams += `minPrice=${filterState[item][0].value[0]}&maxPrice=${filterState[item][0].value[1]}`;
      } else {
        filtersParams += `${item}=`;
        filterState[item].forEach((filterItemState) => {
          filtersParams += `${filterItemState.value},`;
        });
      }
      if (allFilterKeys.length !== index + 1) filtersParams += "&";
    });

    return filtersParams;
  };

  // https://orgafresh.herokuapp.com/api/products/filter?minPrice=0&maxPrice=500&&perPage=2&startPage=3
  const getPageParams = () => {
    return "&perPage=" + page.perPage + "&startPage=" + page.startPage;
  };

  useEffect(() => {
    getProductsByFilter();
  }, [filterState, page]);

  useEffect(() => {
    console.log(filterState);
    if (!filterState && productsState.data?.products?.length) {
      getMaxPriceValue();
    }
  }, [productsState.data]);

  useEffect(() => {
    getProductsByPrice();
  }, [currentCurrency]);

  const changePriceHandler = (price) => {
    if (filterState.price.length) {
      filterState.price[0].value = price.value;
    } else {
      filterState.price.push({ id: "price", value: price.value });
    }

    setFilterState({...filterState});
  };

  const changePage = (e, pageNumber) => {
    setPage({ ...page, startPage: pageNumber });
  };

  const changeCategoryHandler = (category) => {
    const categoryForReplaceIndex = categoriesList.findIndex(
      (item) => item.value === category.value
    );
    categoriesList[categoryForReplaceIndex] = category;

    setCategoriesList([...categoriesList]);

    filterState.categories = categoriesList.filter(
      (item) => item.isActive === true
    );

    setFilterState({...filterState});
  };

  const changeColorHandler = (color) => {
    const colorForReplaceIndex = colorsList.findIndex(
        (item) => item.value === color.value
    );
    colorsList[colorForReplaceIndex] = color;

    setColorsList([...colorsList]);

    filterState.color = colorsList.filter(
        (item) => item.isActive === true
    );

    setFilterState({...filterState});
  };

  const changeSizeHandler = (size) => {
    setActiveSize(size);
    const sizeIndex = filterState.findIndex((item) => item.id === "sizes");
    if (sizeIndex !== -1) {
      filterState[sizeIndex].value = size.value;
    } else {
      filterState.push({ id: "sizes", value: size.value });
    }

    setFilterState([...filterState]);
  };

  const dispatch = useDispatch();

  const formState = useSelector(getFavoutitesProducts);

  const toggleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  // const colorsList = [
  //   { id: "color", uiLabel: "All", value: null },
  //   { id: "color", uiLabel: "Red", value: "red" },
  //   { id: "color", uiLabel: "Yellow", value: "yellow" },
  //   { id: "color", uiLabel: "Green", value: "green" },
  // ];

  const sizesList = [
    { id: "sizes", uiLabel: "All", value: null },
    { id: "sizes", uiLabel: "2 kg", value: "2" },
    { id: "sizes", uiLabel: "1 kg", value: "1" },
    { id: "sizes", uiLabel: "0,5 kg", value: "0.5" },
  ];

  return (
    <div className={styles.contentContainer}>
      <Container fixed>
        <div className={styles.pageTitleContainer}>
          <p className={styles.pageTitle}>Products</p>
          <p>Home / Products</p>
        </div>
        <div className={styles.pageContainer}>
          <div>
            <Categories
              changeCategoryHandler={changeCategoryHandler}
              categoriesList={categoriesList}
            />
            <Colors
              changeColorHandler={changeColorHandler}
              colorsList={colorsList}
            />
            <Price
              maxPrice={maxPrice}
              changePriceHandler={changePriceHandler}
            />
            {/*  <FilterL
              filterName="Category"
              activeValue={categoriesList[0]}
              listOfValues={categoriesList}
              changeFilterHandler={changeCategoryHandler}
           />*
            <ColorList
              filterName="Colors"
              activeValue={colorsList[0]}
              listOfValues={colorsList}
              changeFilterHandler={changeColorHandler}
            />
            <SizeList
              filterName="Sizes"
              activeValue={sizesList[0]}
              listOfValues={sizesList}
              changeFilterHandler={changeSizeHandler}
            />*/}
          </div>
          <div className={styles.productsContainer}>
            {productsState.isLoading && <CircularProgress />}
            {productsState.data &&
              productsState.data?.products?.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    isFavourite={formState.includes(product._id)}
                    product={product}
                    toggleFavoriteClick={toggleFavoriteClick}
                  />
                );
              })}
            {productsState.errors && <p>{productsState.errors}</p>}
          </div>
          <Pagination
            count={
              Math.ceil(productsState.data?.productsQuantity / page.perPage) ||
              1
            }
            onChange={changePage}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
