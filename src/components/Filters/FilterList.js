import ColorItem from "./ColorItem";
import SizeItem from "./SizeItem";
import CategoryItem from "./CategoryItem";
import { WithFilters } from "./WithFilters";

export const ColorList = WithFilters(ColorItem);
export const SizeList = WithFilters(SizeItem);
export const CategoryList = WithFilters(CategoryItem);
