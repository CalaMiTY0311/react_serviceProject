import React, { useState } from "react";
import "./CategoryFilter.css";

function SelectCategory({ checkBoxState, handleCheckBox }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCategoryClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="select-category_container">
      <h4 onClick={handleCategoryClick}>Category</h4>
      <div className={isOpen ? "open" : ""}>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Male"
            name="Male"
            checked={checkBoxState.Male}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Male">Male</label>
        </span>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Female"
            name="Female"
            checked={checkBoxState.Female}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Female">Female</label>
        </span>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Other"
            name="Other"
            checked={checkBoxState.Other}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Other">Other</label>
        </span>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Actor"
            name="Actor"
            checked={checkBoxState.Actor}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Actor">Actor</label>
        </span>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Anime"
            name="Anime"
            checked={checkBoxState.Anime}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Anime">Anime</label>
        </span>

        <span className="category-option">
          <input
            type="checkbox"
            id="category-Vtuber"
            name="Vtuber"
            checked={checkBoxState.Vtuber}
            onChange={handleCheckBox}
          />
          <label htmlFor="category-Vtuber">Vtuber</label>
        </span>

      </div>
    </div>
  );
}

export default SelectCategory;
