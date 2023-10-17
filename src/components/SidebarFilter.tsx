import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// helpers
import { valueToText } from "../utils/helper";

// component props type
type SidebarFilterProps = {
  price: number[];
  setPrice: Function;
  setSelectedCategory: Function;
};

function SidebarFilter({
  price,
  setPrice,
  setSelectedCategory,
}: SidebarFilterProps) {
  // price ranges
  const [value, setValue] = useState<number[]>(price);

  // categories states
  const categories = useSelector((state: AppState) => state.categories.data);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
  };

  const handlePriceRangeChangeCommited = (
    event: Event | React.SyntheticEvent<Element | Event>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
    setPrice(newValue as number[]);
  };

  const handleChangeCategory = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setSelectedCategory((event.target as HTMLInputElement).value);
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={0}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="All"
                defaultChecked
                onChange={handleChangeCategory}
              />
              {categories.map((category) => {
                return (
                  <FormControlLabel
                    key={category.id}
                    value={category.id}
                    control={<Radio />}
                    label={category.name}
                    onChange={handleChangeCategory}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ margin: "2rem 0rem" }}>
        <Typography variant="h6" marginBottom={"1rem 0rem"}>
          Price
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChangeCommitted={handlePriceRangeChangeCommited}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valueToText}
            max={5000}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarFilter;
