import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "../../state/favouritesProducts/actionsCreators";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import { getCart } from "../../state/cart/selectors";
import { addToCartCreator } from "../../state/cart/actionsCreators";
import Price from "../../components/Filters/Price";
import {
  CategoryList,
  ColorList,
  SizeList,
} from "../../components/Filters/FilterList";
import ProductCard from "../../components/ProductCard";
import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import {
  defaultCategoriesList,
  defaultColorsList,
  defaultSizesList,
} from "../../common/defaultState";

import styles from "./ProductsList.module.scss";
import { useProductsStateByCurrency } from "../../hooks/useProductsStateByCurrency";

const ProductsList = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const filterDefaultState = {
    categories: defaultCategoriesList,
    color: defaultColorsList,
    sizes: defaultSizesList,
    price: [
      {
        id: "price",
        uiLabel: "",
        value: [0, maxPrice],
        isActive: true,
      },
    ],
  };

  const [productsState, setProductsState] = useState({
    isLoading: true,
    data: null,
    errors: "",
  });

  useProductsStateByCurrency(productsState, setProductsState);

  const [page, setPage] = useState({
    perPage: 5,
    startPage: 1,
  });

  const [filterState, setFilterState] = useState(filterDefaultState);

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

  const getFiltersParams = () => {
    let filtersParams = "";

    const allFilterKeys = Object.keys(filterState).filter(
      (item) => filterState[item].length
    );
    allFilterKeys.forEach((item, index) => {
      if (item === "price") {
        filtersParams += `minPrice=${filterState[item][0].value[0]}&maxPrice=${filterState[item][0].value[1]}`;
      } else {
        const activeFilters = filterState[item].filter((item) => item.isActive);
        if (activeFilters.length === 0) return;
        filtersParams += `${item}=`;
        activeFilters.forEach((filterItemState) => {
          filtersParams += `${filterItemState.value},`;
        });
      }
      if (allFilterKeys.length !== index + 1) filtersParams += "&";
    });

    return filtersParams;
  };

  const getPageParams = () => {
    return "&perPage=" + page.perPage + "&startPage=" + page.startPage;
  };

  useEffect(() => {
    getProductsByFilter();
  }, [filterState, page]);

  useEffect(() => {
    if (!filterState && productsState.data?.products?.length) {
      getMaxPriceValue();
    }
  }, [productsState.data]);

  const changePage = (e, pageNumber) => {
    setPage({ ...page, startPage: pageNumber });
  };

  const changeFilterEntity = (filterEntity) => {
    let replaceIndex = 0;
    if (filterEntity.id !== "price") {
      replaceIndex = filterState[filterEntity.id].findIndex(
        (item) => item.value === filterEntity.value
      );
    }
    filterState[filterEntity.id][replaceIndex] = filterEntity;

    setPage({ ...page, startPage: 1 });

    setFilterState({
      ...filterState,
      [filterEntity.id]: filterState[filterEntity.id],
    });
  };

  const dispatch = useDispatch();

  const formState = useSelector(getFavoutitesProducts);

  const toggleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  const userCart = useSelector(getCart);

  const onAddToCart = (id) => {
    dispatch(addToCartCreator(id));
  };

  const isInCart = (product) => {
    return !!userCart.data?.products.find(
      (cartItem) => cartItem._id === product._id
    );
  };

  return (
    <div className={styles.contentContainer}>
      <Container fixed>
        <div className={styles.pageTitleContainer}>
          <p className={styles.pageTitle}>Products</p>
          <p>Home / Products</p>
        </div>
        <div className={styles.pageContainer}>
          <div className={"filterWrapper"}>
            <CategoryList
              changeFilterEntityHandler={changeFilterEntity}
              filterEntityList={filterState.categories}
              filterName="Categories"
            />
            <ColorList
              changeFilterEntityHandler={changeFilterEntity}
              filterEntityList={filterState.color}
              filterName="Colors"
            />
            <SizeList
              changeFilterEntityHandler={changeFilterEntity}
              filterEntityList={filterState.sizes}
              filterName="Sizes"
            />
            <Price
              maxPrice={maxPrice}
              changePriceHandler={changeFilterEntity}
            />
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
                    addToCart={onAddToCart}
                    isInCart={isInCart(product)}
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
            page={page.startPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
