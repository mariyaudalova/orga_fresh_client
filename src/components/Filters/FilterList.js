/* eslint-disable */

import React from "react";

import ColorItem from "./ColorItem";
import SizeItem from "./SizeItem";
import { WithFilters } from "./WithFilters";

export const ColorList = WithFilters(ColorItem);
export const SizeList = WithFilters(SizeItem);
