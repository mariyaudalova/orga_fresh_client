export interface FilterEntitiy {
    isActive: boolean;
    uiLabel: string;
}

export interface ProductEntity {
    enabled: boolean,
    imageUrls: Array<string>,
    quantity: number,
    currency: string,
    _id: string,
    name: string,
    currentPrice: number,
    previousPrice: number,
    categories: string,
    color: string,
    productUrl: string,
    brand: string,
    myCustomParam: string,
    sizes: string,
    itemNo: string,
    date: string,
    __v: number,
 
}

export interface ProductState {
    isLoading: boolean,
    data: null | ProductsData,
    errors: string,
}

export type ProductsData = {
    products: Array<ProductEntity>,
    productsQuantity: number
}

export type FilterNames = "categories" | "sizes" | "color" | "price";

export interface FilterItem { 
    id: FilterNames, 
    uiLabel: string, 
    value: string, 
    isActive: boolean
}

export interface PriceType { 
    id: string, 
    uiLabel: string, 
    value: Array<string>, 
    isActive: boolean
}

export interface filterStateType {
    categories: Array<FilterItem>,
    color: Array<FilterItem>,
    sizes: Array<FilterItem>,
    price: Array<PriceType>
  };
