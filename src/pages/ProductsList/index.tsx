import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import {
  ProductEntity,
  ProductState,
  ProductsData,
  FilterItem,
} from "../../common/types";

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

  const [productsState, setProductsState] = useState<ProductState>({
    isLoading: true,
    data: null,
    errors: "",
  });

  const [currentPrice, setCurrentPrice] = useState([0, maxPrice]);

  useProductsStateByCurrency(productsState, setProductsState);

  const [page, setPage] = useState({
    perPage: 9,
    startPage: 1,
  });

  const [filterState, setFilterState] = useState(filterDefaultState);

  const getProductsByFilter = async () => {
    let requestUrl = `${apiUrl}/products/filter?`;
    const filterParams = getFiltersParams();
    const pageParams = getPageParams();

    requestUrl += filterParams + pageParams;
    const res = await getAjax(requestUrl);
    res.data.products = res.data.products.map((item: ProductEntity) => {
      item.currency = localStorage.getItem("currency") || "USD";
      return item;
    });
    setProductsState(res);
  };
  const getMaxPriceValue = () => {
    const { data } = productsState;
    const productsData = data as ProductsData;
    const arrayForMaping = productsData?.products?.map(function (
      item: ProductEntity
    ) {
      return item.currentPrice;
    });
    const max = Math.max(...arrayForMaping);
    setMaxPrice(max);
    setCurrentPrice([currentPrice[0], max]);
  };

  const getFiltersParams = () => {
    let filtersParams = "";

    const allFilterKeys = (
      Object.keys(filterState) as Array<keyof typeof filterState>
    ).filter((item) => filterState[item].length);
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

  const changePage = (event: object, pageNumber: number) => {
    setPage({ ...page, startPage: pageNumber });
  };

  const changeFilterEntity = (filterEntity: FilterItem) => {
    let replaceIndex = 0;
    if (filterEntity.id !== "price") {
      replaceIndex = filterState[filterEntity.id].findIndex(
        (item: any) => item.value === filterEntity.value
      );
    } else {
      setCurrentPrice(filterEntity.value as any);
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

  const toggleFavoriteClick = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const userCart = useSelector(getCart);

  const onAddToCart = (id: string) => {
    dispatch(addToCartCreator(id));
  };

  const isInCart = (product: ProductEntity) => {
    return !!userCart.data?.products.find(
      (cartItem: any) => cartItem._id === product._id
    );
  };

  const filterDetails = (
    <>
      <CategoryList
        changeFilterEntityHandler={changeFilterEntity}
        filterEntityList={filterState.categories as Array<FilterItem>}
        filterName="Categories"
      />
      <ColorList
        changeFilterEntityHandler={changeFilterEntity}
        filterEntityList={filterState.color as Array<FilterItem>}
        filterName="Colors"
      />
      <SizeList
        changeFilterEntityHandler={changeFilterEntity}
        filterEntityList={filterState.sizes as Array<FilterItem>}
        filterName="Sizes"
      />
      <Price
        maxPrice={maxPrice}
        changePriceHandler={changeFilterEntity}
        currentPrice={currentPrice}
      />
    </>
  );
  return (
    <div className={styles.contentContainer}>
      <Container>
        <div className={styles.pageTitleContainer}>
          <p className={styles.pageTitle}>Products</p>
          <p>Home / Products</p>
        </div>
        <div className={styles.pageContainer}>
          <div>
            <Accordion className={styles.accordionContainer}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p>Filters</p>
              </AccordionSummary>
              <AccordionDetails>
                <div>{filterDetails}</div>
              </AccordionDetails>
            </Accordion>
            <div className={styles.filtersFully}>{filterDetails}</div>
          </div>
          <div>
            <div className={styles.productsContainer}>
              {productsState.isLoading && (
                <CircularProgress className={styles.loaderContainer} />
              )}
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
              {productsState.data?.products?.length === 0 && (
                <p>No products matches search query</p>
              )}
              {productsState.errors && <p>{productsState.errors}</p>}
            </div>
            {!productsState.isLoading && (
              <Pagination
                className={styles.paginationContainer}
                count={
                  Math.ceil(
                    (productsState.data as ProductsData)?.productsQuantity /
                      page.perPage
                  ) || 1
                }
                onChange={changePage}
                page={page.startPage}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
