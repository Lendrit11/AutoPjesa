import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
const Price_del = () => {
  const [priceRange, setPriceRange] = useState([10, 1000]);

  const handleChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="uren-sidebar_categories">
      <div className="uren-categories_title">
        <h5>Price</h5>
      </div>
      <div className="price-filter">
        <Slider
          range={true}
          min={0}
          max={1000}
          value={priceRange}
          onChange={handleChange}
          trackStyle={[{ backgroundColor: '#ffc400', height: 10 }]}
          handleStyle={[
            { borderColor: '#ffc400', height: 20, width: 20, backgroundColor: '#fff' },
            { borderColor: '#ffc400', height: 20, width: 20, backgroundColor: '#fff' }
          ]}
          railStyle={{ backgroundColor: '#e5e5e5', height: 10 }}
        />
        <div className="price-slider-amount">
          <div className="label-input">
            <label>Price: </label>
            <input
              type="text"
              value={`$${priceRange[0]} - $${priceRange[1]}`}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price_del;
