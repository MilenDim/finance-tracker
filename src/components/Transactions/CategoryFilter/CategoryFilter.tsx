import React from "react";
import { Select } from "@chakra-ui/react";
import { categories } from "../../../constants/constants";
import { RootState } from "../../../redux/store";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { setCategoryFilter } from "../../../redux/slices/transactionSlice";

const CategoryFilter = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { categoryFilter } = useAppSelector(
    (state: RootState) => state.transactionReducer
  );

  return (
    <Select
      value={categoryFilter}
      onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      placeholder="All Categories"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};

export default CategoryFilter;
