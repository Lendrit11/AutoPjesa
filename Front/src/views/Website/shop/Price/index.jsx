import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Price_del = ({ priceRange, onChange }) => {
  const handleChange = (value) => onChange(value);

  return (
    <div className="uren-sidebar_categories">
      <div className="uren-categories_title"><h5>Price</h5></div>
      <div className="price-filter">
        <Slider
          range
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
              readOnly
              value={`€${priceRange[0]} - €${priceRange[1]}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price_del;
