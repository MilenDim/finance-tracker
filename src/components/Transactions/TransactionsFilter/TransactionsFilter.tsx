import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Box, Select, Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import {
  setCategoryFilter,
  setDateRangeFilter,
} from "../../../redux/slices/transactionSlice";
import { categories } from "../../../constants/constants";
import { RootState } from "../../../redux/store";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

const TransactionFilter = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { categoryFilter, dateRangeFilter } = useAppSelector(
    (state: RootState) => state.transactionReducer
  );

  const [startDate, setStartDate] = useState<Date | undefined>(
    dateRangeFilter?.startDate
      ? new Date(dateRangeFilter?.startDate)
      : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    dateRangeFilter?.endDate ? new Date(dateRangeFilter?.endDate) : undefined
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  const handleDateRangeChange = () => {
    dispatch(
      setDateRangeFilter({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      })
    );
  };

  return (
    <Box display="flex" flexFlow="wrap" gap="30px" mb="4">
      <Select
        placeholder="Filter by category"
        value={categoryFilter || ""}
        onChange={handleCategoryChange}
        mb="4"
        width="fit-content"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Box
        display="flex"
        height="40px"
        mb="4"
        alignItems="center"
        border="1px solid #e2e8f0"
        borderRadius="8px"
      >
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
        <Button
          onClick={handleDateRangeChange}
          ml="4"
          backgroundColor="#319795"
          color="white"
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionFilter;
