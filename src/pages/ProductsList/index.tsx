import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Price from "../../components/Filters/Price";
import {
  CategoryList,
  ColorList,
  SizeList,
} from "../../components/Filters/FilterList";

import { apiUrl } from "../../env";
import { getAjax } from "../../services";
import {
  defaultCategoriesList,
  defaultColorsList,
  defaultSizesList,
} from "../../common/defaultState";
import { ProductEntity, ProductState, FilterItem } from "../../common/types";

import styles from "./ProductsList.module.scss";
import { useProductsStateByCurrency } from "../../hooks/useProductsStateByCurrency";
import MenuItem from "@material-ui/core/MenuItem";
//import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ProductsContainer from "../../components/ProductsContainer";

const ProductsList = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentSortType, setCurrentSortType] = useState("");

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
    const sortParams = getSortParams();

    requestUrl += filterParams + pageParams + sortParams;
    const res = await getAjax(requestUrl);
    res.data.products = res.data.products.map((item: ProductEntity) => {
      item.currency = localStorage.getItem("currency") || "USD";
      return item;
    });
    setProductsState(res);
  };
  const getMaxPriceValue = () => {
    const { data } = productsState;
    const arrayForMaping = data!.products?.map(function (item: ProductEntity) {
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

  const getSortParams = () => {
    return "&sort=" + currentSortType;
  };

  useEffect(() => {
    getProductsByFilter();
  }, [filterState, page, currentSortType]);

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

  const handleSortControlChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCurrentSortType(event.target.value as string);
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
          <div className={styles.SortContainer}>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Sort by
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currentSortType}
                onChange={handleSortControlChange}
                label="Sort by"
              >
                <MenuItem value={"currentPrice"}>Chepest</MenuItem>
                <MenuItem value={"-currentPrice"}>More Expensive</MenuItem>
                <MenuItem value={"date"}>Oldest</MenuItem>
                <MenuItem value={"-date"}>Newest</MenuItem>
              </Select>
            </FormControl>
          </div>
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
                    <ProductsContainer key={product._id} product={product} />
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
                    (productsState.data as any)?.productsQuantity / page.perPage
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
