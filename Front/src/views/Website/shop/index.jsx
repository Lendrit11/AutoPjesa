import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../../../assets/css/vendor/bootstrap.min.css';
import '../../../assets/css/vendor/font-awesome.css';
import '../../../assets/css/vendor/fontawesome-stars.css';
import '../../../assets/css/vendor/ion-fonts.css';
import '../../../assets/css/plugins/slick.css';
import '../../../assets/css/plugins/animate.css';
import '../../../assets/css/plugins/jquery-ui.min.css';
import '../../../assets/css/plugins/lightgallery.min.css';
import '../../../assets/css/plugins/nice-select.css';
import '../../../assets/css/style.css';
import Loading from '../../../components/bread/loading';
import Price_del from './Price';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Shop = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  // Filters
  const [priceRange, setPriceRange] = useState([5, 1000]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;


 const handleAddToFavorites = async (partId) => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    toast.warning('Ju lutem kyçuni për të shtuar në favorites!');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5298/api/favorites', {
      partId: partId,
      userId: userId
    });

    if (response.status === 200 || response.status === 201) {
      toast.success('Produkti u shtua në favorites!');
    }
  } catch (error) {
    console.error('Gabim gjatë shtimit në favorite:', error);
    toast.error('Ky produkt ndoshta është shtuar më parë.');
  }
};



  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, manuRes] = await Promise.all([
          axios.get('http://localhost:5298/api/user/shop/categories'),
          axios.get('http://localhost:5298/api/user/shop/manufacturers'),
        ]);
        setCategories(catRes.data);
        setManufacturers([...new Set(manuRes.data)]);
      } catch (error) {
        console.error('Gabim gjatë marrjes së filtreve:', error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1000);
    fetchFilteredParts();
    return () => clearTimeout(timer);
  }, [currentPage]);

  const fetchFilteredParts = async () => {
    try {
      const params = new URLSearchParams();
      params.append('minPrice', priceRange[0]);
      params.append('maxPrice', priceRange[1]);
      params.append('page', currentPage);
      params.append('pageSize', pageSize);

      if (selectedManufacturer) params.append('manufacturer', selectedManufacturer);
      if (selectedCategory) params.append('categoryId', selectedCategory);

      const response = await axios.get(`http://localhost:5298/api/user/shop/parts?${params.toString()}`);

      setParts(response.data.parts);
      const totalItems = response.data.totalItems;
      setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (error) {
      console.error('Gabim gjatë marrjes së pjesëve:', error);
    }
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchFilteredParts();
  };

  const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="main-wrapper py-4" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {showLoading && <Loading />}

      <div className="breadcrumb-area bg-white py-3 shadow-sm mb-4">
        <div className="container">
          <div className="breadcrumb-content d-flex align-items-center justify-content-between">
            <ul className="breadcrumb-list list-unstyled d-flex mb-0">
              <li><a href="/" className="text-muted">Home</a></li>
              <li className="active ms-3" style={{ fontWeight: '600', color: '#ff8800ff' }}>Shop</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="shop-content_wrapper container-fluid">
        <div className="row gx-4">
          {/* Sidebar Filters */}
          <aside className="col-lg-3 col-md-5 order-2 order-lg-1 order-md-1 bg-white p-4 rounded shadow-sm">
            <h5 className="mb-4 fw-bold" style={{ color: '#ff8800ff' }}>Filters</h5>

            <div className="mb-4">
              <h6 className="mb-2">Price Range (€)</h6>
              <Price_del priceRange={priceRange} onChange={setPriceRange} />
            </div>

            <div className="mb-4">
              <h6 className="mb-2">Manufacturer</h6>
              <Select
                options={[
                  { value: '', label: 'All' },
                  ...manufacturers.map(manu => ({ value: manu, label: manu }))
                ]}
                value={{ value: selectedManufacturer, label: selectedManufacturer || 'All' }}
                onChange={(option) => setSelectedManufacturer(option.value)}
                classNamePrefix="select"
                styles={{
                  control: (base) => ({ ...base, borderColor: '#ff8800ff', boxShadow: 'none' }),
                  singleValue: (base) => ({ ...base, color: '#ff8800ff' }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#ff8800ff22' : 'white',
                    color: '#333',
                    cursor: 'pointer',
                  }),
                }}
              />
            </div>

            <div className="mb-4">
              <h6 className="mb-2">Category</h6>
              <Select
                options={[
                  { value: '', label: 'All' },
                  ...categories.map(cat => ({
                    value: cat.categoryId,
                    label: cat.name
                  }))
                ]}
                value={{
                  value: selectedCategory,
                  label: categories.find(cat => cat.categoryId == selectedCategory)?.name || 'All'
                }}
                onChange={(option) => setSelectedCategory(option.value)}
                classNamePrefix="select"
                styles={{
                  control: (base) => ({ ...base, borderColor: '#ff8800ff', boxShadow: 'none' }),
                  singleValue: (base) => ({ ...base, color: '#ff8800ff' }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#ff8800ff22' : 'white',
                    color: '#333',
                    cursor: 'pointer',
                  }),
                }}
              />
            </div>

            <button
              className="btn"
              style={{
                backgroundColor: '#ff8800ff',
                borderColor: '#ff8800ff',
                color: 'white',
                fontWeight: '600',
                width: '100%',
                padding: '10px 0',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cc6e00ff')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ff8800ff')}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </aside>

          {/* Products Grid */}
          <section className="col-lg-9 col-md-7 order-1 order-lg-2 order-md-2">
            {parts.length === 0 && !showLoading ? (
              <p className="text-center fs-5 mt-5">No parts found with current filters.</p>
            ) : (
              <div className="row g-4">
                {parts.map((part) => (
                  <div className="col-md-6 col-lg-4" key={part.partId}>
                    <div className="card h-100 shadow-sm border-0 rounded">
                      <div
                        className="ratio ratio-4x3 overflow-hidden rounded-top"
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={part.primaryImages }
                          alt={part.name}
                          className="card-img-top object-fit-cover"
                          style={{ transition: 'transform 0.3s ease' }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title fw-semibold mb-2">{part.name}</h6>
                        <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                          {part.description.length > 60 ? part.description.slice(0, 60) + '...' : part.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                          <span className="fw-bold fs-5" style={{ color: '#ff8800ff' }}>
                            €{part.price ?? 'N/A'}
                          </span>
                          <button
                           className="btn"
                             style={{
                             backgroundColor: '#ff8800ff',
                              borderColor: '#ff8800ff',
                              color: 'white',
                              fontWeight: '600',
                              padding: '5px 5px',
                              borderRadius: '4px',
                              transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                marginLeft:'35px',
                                 fontSize:'14px'   
                             }}
                       onClick={() => handleAddToFavorites(part.partId)}
                          >
                         Add to Favorites
                           </button>

                          <button
                            className="btn btn-outline"
                            style={{
                              borderColor: '#ff8800ff',
                              color: '#ff8800ff',
                              fontWeight: '600',
                              padding: '5px 12px',
                              borderRadius: '4px',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.backgroundColor = '#ff8800ff';
                              e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#ff8800ff';
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={goPrev}
                    aria-label="Previous"
                    style={{ color: '#ff8800ff', borderColor: '#ff8800ff' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ff8800ff', e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent', e.currentTarget.style.color = '#ff8800ff')}
                  >
                    &laquo; Prev
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    Page {currentPage} of {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={goNext}
                    aria-label="Next"
                    style={{ color: '#ff8800ff', borderColor: '#ff8800ff' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ff8800ff', e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent', e.currentTarget.style.color = '#ff8800ff')}
                  >
                    Next &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
    
  );
};

export default Shop;
