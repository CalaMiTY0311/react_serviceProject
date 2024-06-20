import React from "react";
import { Button } from "@material-tailwind/react";
import clothes from "../../assets/images/clothes.jpg";
import { filterProducts } from "../../features/slices/productsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavigateButtons = () => {
  const buttons = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ];

  const naviButton = [
    "Models"
  ]

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        {buttons.map((button, index) => {
          return (
            <div key={index} className="mr-4">
              <Link to={"/filteredProducts/" + button}>
                <Button
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out"
                  onClick={() => dispatch(filterProducts(button))}
                >
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center py-8">
        {naviButton.map((naviButton, index) => {
          return (
            <div key={index} className="mr-4">
              <Link to="/Posts">
                <Button
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out"
                  // onClick={() => dispatch(filterProducts(button))}
                >
                  {naviButton}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigateButtons;
