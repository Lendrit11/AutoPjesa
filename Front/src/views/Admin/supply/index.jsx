// SupplyInventoryDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Statistic,
  Row,
  Col,
  Popconfirm,
  message,
  Tabs,
  Space,
  Typography,
  Upload,
  Alert,
  Grid,
  Spin,
  Divider
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  ShopOutlined,
  CarOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
//initialValues 
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const API_BASE_URL = 'http://localhost:5298'; // ndrysho nëse duhet

const SupplyInventoryDashboard = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  // global loading
  const [loading, setLoading] = useState(false);
  // per-tabi loading
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  const [manufacturersLoading, setManufacturersLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [carModelsLoading, setCarModelsLoading] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchText, setSearchText] = useState('');

  // data state
  const [parts, setParts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carModels, setCarModels] = useState([]);

  // modal state
  const [isPartModalVisible, setIsPartModalVisible] = useState(false);
  const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
  const [isManufacturerModalVisible, setIsManufacturerModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isAddCarModelModalVisible, setIsAddCarModelModalVisible] = useState(false);
  const [isEditCarModelModalVisible, setIsEditCarModelModalVisible] = useState(false);

  // editing state
  const [editingPart, setEditingPart] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingManufacturer, setEditingManufacturer] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCarModel, setEditingCarModel] = useState(null);

  // upload preview
  const [fileList, setFileList] = useState([]);

  // quick add car model in dropdown
  const [newCarModelName, setNewCarModelName] = useState('');
  const [selectedManufacturerIdForQuickAdd, setSelectedManufacturerIdForQuickAdd] = useState(null);
 

useEffect(() => {
  if (editingPart) {
    form.setFieldsValue({
      partNumber: editingPart.partNumber,
      name: editingPart.name,
      description: editingPart.description,
      manufacturerId: manufacturers.find(m => m.name === editingPart.manufacturer)?.manufacturerId,
      categoryId: editingPart.categoryId,
      price: editingPart.stockPrice,
      stockQuantity: editingPart.stockQuantity,
      reorderLevel: editingPart.stockReorderLevel,
      discount: editingPart.stockDiscount,
    compatibleModelIds: editingPart.compatibleModels?.length
  ? editingPart.compatibleModels.map(cm => cm.carModelId)
  : editingPart.compatibleModelIds,
      compatibleFromYear: editingPart.compatibleFromYear,
      compatibleToYear: editingPart.compatibleToYear,
    });

    setFileList(
      (editingPart.imageUrls || editingPart.images?.map(img => img.imgUrl) || []).map((url, index) => ({
        uid: index,
        name: `Image-${index + 1}`,
        status: 'done',
        url: url,
      }))
    );
  } else {
    form.resetFields();
    setFileList([]);
  }
}, [editingPart, form, manufacturers]);





  // ------------------ Fetch functions ------------------
  
  const fetchParts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Parts`);
      console.log(res.data);
      setParts(res.data || []);
    } catch (err) {
      console.error('Error fetching parts', err);
      message.error('Gabim gjatë marrjes së pjesëve');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    setSuppliersLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Suppliers`);
      setSuppliers(res.data || []);
    } catch (err) {
      console.error('Error fetching suppliers', err);
      message.error('Gabim gjatë marrjes së furnitorëve');
    } finally {
      setSuppliersLoading(false);
    }
  };
//Pjessaaaaaaaaa
  const fetchManufacturers = async () => {
    setManufacturersLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/Manufacturers`);
      setManufacturers(res.data || []);
    } catch (err) {
      console.error('Error fetching manufacturers', err);
      message.error('Gabim gjatë marrjes së prodhuesve');
    } finally {
      setManufacturersLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/categories`);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Error fetching categories', err);
      message.error('Gabim gjatë marrjes së kategorive');
    } finally {
      setCategoriesLoading(false);
    }
  };


  const fetchCarModels = async () => {
  setCarModelsLoading(true); // tregon loading te frontend
  try {
    // Marrim të dhënat nga backend
    const res = await axios.get(`${API_BASE_URL}/api/CarModels`);

    // Normalizojmë çdo objekt për t'u siguruar që ka fushat e duhura
    const normalized = (res.data || []).map(cm => ({
      carModelId: cm.carModelId ?? cm.CarModelId ?? cm.id, // merr id-në
      modelName: cm.modelName ?? cm.model ?? cm.name ?? cm.Name, // emri i modelit
      manufacturerId: cm.manufacturerId ?? cm.ManufacturerId ?? cm.manufacturerId, // id e prodhuesit
      manufacturerName: cm.manufacturerName ?? cm.ManufacturerName ?? (cm.Manufacturer ? cm.Manufacturer.name : undefined), // emri i prodhuesit
      yearStart: cm.yearStart ?? cm.YearStart ?? cm.yearStartValue, // viti fillestar
      yearEnd: cm.yearEnd ?? cm.YearEnd ?? cm.yearEndValue // viti perfundimtar
    }));

    setCarModels(normalized); // vendosim te state
  } catch (err) {
    console.error('Error fetching car models', err);
    message.error('Gabim gjatë marrjes së modeleve të makinave');
  } finally {
    setCarModelsLoading(false); // fikim loading
  }
};
  //Pjesaaaaaaaaaaaaaaaaaaaaaaaaaa
  // load data per active tab
  useEffect(() => {
    if (activeTab === 'inventory') {
      fetchParts();
      fetchCategories();
    } else if (activeTab === 'suppliers') {
      fetchSuppliers();
    } else if (activeTab === 'manufacturers') {
      fetchManufacturers();
    } else if (activeTab === 'categories') {
      fetchCategories();
    } else if (activeTab === 'carModels') {
      fetchCarModels();
      fetchManufacturers(); // needed to link manufacturer dropdown
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

/// ------------------ Parts CRUD ------------------
const handleAddPart = async (values) => {
  setLoading(true);
  try {
    const payload = {
  name: values.name,
  partNumber: values.partNumber,
  description: values.description,
  manufacturer: manufacturers.find(m => m.manufacturerId === values.manufacturerId)?.name || "",
  categoryId: values.categoryId,
  compatibleFromYear: Number(values.compatibleFromYear),
  compatibleToYear: Number(values.compatibleToYear),
  StockQuantity: Number(values.stockQuantity),
  Price: Number(values.price),
  ReorderLevel: Number(values.reorderLevel),
  Discount: Number(values.discount),
  imageUrls: fileList.map(f => f.url || f.thumbUrl),
  compatibleModelIds: values.compatibleModelIds?.map(id => Number(id)) || [],
};
    const res = await axios.post(`${API_BASE_URL}/api/Parts`, payload);
    
    setParts(prev => [...prev, res.data]);
    setIsPartModalVisible(false);
    form.resetFields();
    setFileList([]);
    message.success('Pjesa u shtua me sukses!');
    window.location.reload();
  } catch (err) {
    console.error('Gabim gjatë shtimit të pjesës:', err);
    message.error('Gabim gjatë shtimit të pjesës');
  } finally {
    setLoading(false);
  }
};
//pjesaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
const handleEditPart = async (values) => {
  if (!editingPart) return;

  setLoading(true);

  try {
        const selectedManufacturer = manufacturers.find(m => m.manufacturerId === values.manufacturerId);
    const payload = {
      ...editingPart,
      ...values,
      ManufacturerName: selectedManufacturer?.name || "", 
      imageUrls: fileList.length
        ? fileList.map(f => f.url || f.thumbUrl)
        : editingPart.imageUrls,
    };

    console.log("Payload to update:", payload);

    await axios.put(`${API_BASE_URL}/api/Parts/${editingPart.partId ?? editingPart.id}`, payload);

    setParts(prev =>
      prev.map(p =>
        (p.partId ?? p.id) === (editingPart.partId ?? editingPart.id) ? payload : p
      )
    );

    message.success('Pjesa u përditësua me sukses!');
    setEditingPart(null);
    setIsPartModalVisible(false);
    form.resetFields();
    setFileList([]);
  } catch (err) {
    console.error('Gabim gjatë përditësimit të pjesës:', err);
    message.error('Gabim gjatë përditësimit të pjesës');
  } finally {
    setLoading(false);
  }
};

//pjesa
const handleDeletePart = async (id) => {
  if (!id) return;
  setLoading(true);
  try {
    await axios.delete(`${API_BASE_URL}/api/Parts/${id}`);
    setParts(prev => prev.filter(p => (p.partId ?? p.id) !== id));
    message.success('Pjesa u fshi me sukses!');
  } catch (err) {
    console.error('Gabim gjatë fshirjes së pjesës:', err);
    message.error('Gabim gjatë fshirjes së pjesës');
  } finally {
    setLoading(false);
  }
};

// ------------------ Wrapper Add/Edit ------------------
const handleAddEditPart = async (values) => {
  if (editingPart) {
    await handleEditPart(values);
  } else {
    await handleAddPart(values);
  }
};


 

  // ------------------ Suppliers CRUD ------------------
  const handleAddSupplier = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/Suppliers`, values);
      setSuppliers(prev => [...prev, res.data]);
      setIsSupplierModalVisible(false);
      message.success('Furnitori u shtua');
    } catch (err) {
      console.error('Error adding supplier', err);
      message.error('Gabim gjatë shtimit të furnitorit');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSupplier = async (values) => {
    if (!editingSupplier) return;
    setLoading(true);
    try {
      const payload = { ...editingSupplier, ...values };
      await axios.put(`${API_BASE_URL}/api/Suppliers/${editingSupplier.supplierId}`, payload);
      setSuppliers(prev => prev.map(s => s.supplierId === editingSupplier.supplierId ? payload : s));
      setEditingSupplier(null);
      setIsSupplierModalVisible(false);
      message.success('Furnitori u përditësua');
    } catch (err) {
      console.error('Error editing supplier', err);
      message.error('Gabim gjatë përditësimit të furnitorit');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/Suppliers/${id}`);
      setSuppliers(prev => prev.filter(s => s.supplierId !== id));
      message.success('Furnitori u fshi');
    } catch (err) {
      console.error('Error deleting supplier', err);
      message.error('Gabim gjatë fshirjes së furnitorit');
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Manufacturers CRUD ------------------
  const handleAddManufacturer = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/Manufacturers`, values);
      setManufacturers(prev => [...prev, res.data]);
      setIsManufacturerModalVisible(false);
      message.success('Prodhuesi u shtua');
    } catch (err) {
      console.error('Error adding manufacturer', err);
      message.error('Gabim gjatë shtimit të prodhuesit');
    } finally {
      setLoading(false);
    }
  };

  const handleEditManufacturer = async (values) => {
    if (!editingManufacturer) return;
    setLoading(true);
    try {
      const payload = { ...editingManufacturer, ...values };
      await axios.put(`${API_BASE_URL}/api/Manufacturers/${editingManufacturer.manufacturerId}`, payload);
      setManufacturers(prev => prev.map(m => m.manufacturerId === editingManufacturer.manufacturerId ? payload : m));
      setEditingManufacturer(null);
      setIsManufacturerModalVisible(false);
      message.success('Prodhuesi u përditësua');
    } catch (err) {
      console.error('Error editing manufacturer', err);
      message.error('Gabim gjatë përditësimit të prodhuesit');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteManufacturer = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/Manufacturers/${id}`);
      setManufacturers(prev => prev.filter(m => m.manufacturerId !== id));
      message.success('Prodhuesi u fshi');
    } catch (err) {
      console.error('Error deleting manufacturer', err);
      message.error('Gabim gjatë fshirjes së prodhuesit');
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Categories CRUD (admin) ------------------
  const handleAddEditCategory = async (values) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await axios.put(`${API_BASE_URL}/api/admin/categories/${editingCategory.categoryId}`, values);
        setCategories(prev => prev.map(c => c.categoryId === editingCategory.categoryId ? { ...c, ...values } : c));
        message.success('Kategoria u përditësua');
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/admin/categories`, values);
        setCategories(prev => [...prev, res.data]);
        message.success('Kategoria u shtua');
      }
      setIsCategoryModalVisible(false);
      setEditingCategory(null);
      form.resetFields();
    } catch (err) {
      console.error('Error saving category', err);
      message.error('Gabim gjatë ruajtjes së kategorisë');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/categories/${id}`);
      setCategories(prev => prev.filter(c => c.categoryId !== id));
      message.success('Kategoria u fshi');
    } catch (err) {
      console.error('Error deleting category', err);
      message.error('Gabim gjatë fshirjes së kategorisë');
    } finally {
      setLoading(false);
    }
  };

  // ------------------ CarModels CRUD ------------------
  const handleAddCarModel = async (values) => {
    setLoading(true);
    try {
      
      const res = await axios.post(`${API_BASE_URL}/api/CarModels`, {
        modelName: values.modelName ?? values.name ?? values.modelName,
        manufacturerId: Number(values.manufacturerId)
      });
      // normalizo dhe shto
      const cm = res.data || {};
      const newCm = {
        carModelId: cm.carModelId ?? cm.CarModelId ?? cm.id,
       modelName: values.modelName ?? values.name,
        manufacturerId: cm.manufacturerId ?? values.manufacturerId,
        manufacturerName: cm.manufacturerName ?? manufacturers.find(m => m.manufacturerId === values.manufacturerId)?.name
      };
      setCarModels(prev => [...prev, newCm]);
      setIsAddCarModelModalVisible(false);
      form.resetFields();
      message.success('Modeli u shtua');
    } catch (err) {
      console.error('Error adding car model', err);
      const detail = err.response?.data || err.message;
      message.error(detail || 'Gabim gjatë shtimit të modelit');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCarModel = async (values) => {
    if (!editingCarModel) return;
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/api/CarModels/${editingCarModel.carModelId}`, {
        modelName: values.modelName,
        manufacturerId: Number(values.manufacturerId),
        yearStart: values.yearStart,
        yearEnd: values.yearEnd
      });
      setCarModels(prev => prev.map(cm => cm.carModelId === editingCarModel.carModelId ? {
        ...cm,
        modelName: values.modelName,
        manufacturerId: Number(values.manufacturerId),
        manufacturerName: manufacturers.find(m => m.manufacturerId === Number(values.manufacturerId))?.name,
        yearStart: values.yearStart,
        yearEnd: values.yearEnd
      } : cm));
      setIsEditCarModelModalVisible(false);
      setEditingCarModel(null);
      form.resetFields();
      message.success('Modeli u përditësua');
    } catch (err) {
      console.error('Error editing car model', err);
      message.error('Gabim gjatë përditësimit të modelit');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCarModel = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/CarModels/${id}`);
      setCarModels(prev => prev.filter(cm => cm.carModelId !== id));
      message.success('Modeli u fshi');
    } catch (err) {
      console.error('Error deleting car model', err);
      message.error('Gabim gjatë fshirjes së modelit');
    } finally {
      setLoading(false);
    }
  };

  // Quick add car model from select dropdown (local-only or can POST to backend)
  const handleQuickAddCarModel = async (manufacturerId = selectedManufacturerIdForQuickAdd) => {
    if (!newCarModelName || !newCarModelName.trim()) {
      message.warn('Shtyp emrin e modelit për të shtuar');
      return;
    }
    // Prefer to POST to backend so id is real; fallback to local if backend fails.
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/Parts/CarModels`, {
        modelName: newCarModelName,
        manufacturerId: Number(manufacturerId)
      });
      const cm = res.data || {};
      const newCm = {
        carModelId: cm.carModelId ?? cm.CarModelId ?? cm.id ?? Math.floor(Math.random() * 1000000),
        modelName: cm.modelName ?? newCarModelName,
        manufacturerId: cm.manufacturerId ?? manufacturerId,
        manufacturerName: manufacturers.find(m => m.manufacturerId === Number(manufacturerId))?.name
      };
      setCarModels(prev => [...prev, newCm]);
      setNewCarModelName('');
      message.success('Modeli u shtua');
    } catch (err) {
      console.error('Quick add error', err);
      // fallback local add
      const newId = carModels.length ? Math.max(...carModels.map(m => m.carModelId || 0)) + 1 : 1;
      const fallback = {
        carModelId: newId,
        modelName: newCarModelName,
        manufacturerId: manufacturerId,
        manufacturerName: manufacturers.find(m => m.manufacturerId === manufacturerId)?.name
      };
      setCarModels(prev => [...prev, fallback]);
      setNewCarModelName('');
      message.warning('Shto lokale sepse backend ktheu gabim');
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Upload handling (preview only) ------------------
  const uploadBefore = (file) => {
    setFileList([file]);
    // set imageUrls in form as local preview
    const preview = URL.createObjectURL(file);
    form.setFieldsValue({ imageUrls: [preview] });
    return false; // prevent auto upload
  };

  const uploadRemove = () => {
    setFileList([]);
    form.setFieldsValue({ imageUrls: [] });
  };

  // ------------------ Filters / Derived ------------------
  const filteredParts = parts.filter(p =>
    ((p.name ?? p.Name ?? '') + '').toLowerCase().includes(searchText.toLowerCase()) ||
    ((p.partNumber ?? p.PartNumber ?? '') + '').toLowerCase().includes(searchText.toLowerCase())
  );

  // ------------------ Table columns ------------------

 const partColumns = [
  {
    title: 'Numri i Pjesës',
    dataIndex: 'partNumber',
    key: 'partNumber',
    responsive: ['md'],
    sorter: (a, b) =>
      ((a.partNumber ?? a.PartNumber ?? '') + '').localeCompare(
        (b.partNumber ?? b.PartNumber ?? '') + ''
      ),
  },
  {
    title: 'Emri',
    dataIndex: 'name',
    key: 'name',
    responsive: ['sm'],
    sorter: (a, b) =>
      ((a.name ?? a.Name ?? '') + '').localeCompare(
        (b.name ?? b.Name ?? '') + ''
      ),
  },
  {
    title: 'Kategoria',
    key: 'category',
    dataIndex: 'categoryId',
    filters: (categories || []).map(c => ({
      text: c.name,
      value: String(c.categoryId),
    })),
    onFilter: (value, record) =>
      String(record.categoryId ?? record.CategoryId) === String(value),
    render: (value, record) => {
      const cid = value ?? record.categoryId ?? record.CategoryId;
      const cat = (categories || []).find(
        c => String(c.categoryId) === String(cid)
      );
      return <Tag color="blue">{cat?.name || 'Pa kategori'}</Tag>;
    },
    responsive: ['md'],
  },
  {
    title: 'Çmimi (€)',
    dataIndex: 'price',
    key: 'price',
    responsive: ['lg'],
    sorter: (a, b) => {
      const priceA = Number(a.price ?? a.stockPrice ?? 0);
      const priceB = Number(b.price ?? b.stockPrice ?? 0);
      return priceA - priceB;
    },
    render: (_, record) => {
      const price = Number(record.price ?? record.stockPrice ?? 0);
      return `€${price.toFixed(2)}`;
    },
  },
  {
    title: 'Stoku',
    dataIndex: 'stock',
    key: 'stock',
    render: (value, record) => {
      const qty = record.stockQuantity ?? 0;
       

      const reorder = record.stockReorderLevel ?? 0;

      return (
        <div>
          <Text
            style={{
              color: qty <= reorder ? 'red' : 'green',
              fontWeight: 'bold',
            }}
          >
            {qty}
          </Text>
          {qty <= reorder && (
            <div style={{ fontSize: 10, color: 'red' }}>STOK I ULTË</div>
          )}
        </div>
      );
    },
    responsive: ['sm'],
    sorter: (a, b) => Number(a.stock ?? 0) - Number(b.stock ?? 0),
  },
  {
    title: 'Veprime',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button
          size={screens.xs ? 'small' : 'middle'}
          icon={<EditOutlined />}
          onClick={() => {
            // vetëm vendosim record-in, pjesa tjetër bëhet në useEffect tek PartModal
            console.log(record);
            setEditingPart(record);
            setIsPartModalVisible(true);
          }}
        >
          {!screens.xs && 'Edito'}
        </Button>

        <Popconfirm
          title="Jeni i sigurt që dëshironi të fshini këtë pjesë?"
          onConfirm={() => {
            const id = record.partId ?? record.PartId ?? record.id;
            handleDeletePart(id);
          }}
          okText="Po"
          cancelText="Jo"
        >
          <Button
            danger
            size={screens.xs ? 'small' : 'middle'}
            icon={<DeleteOutlined />}
          >
            {!screens.xs && 'Fshi'}
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
  const supplierColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name', sorter: (a,b)=> (a.name||'').localeCompare(b.name||'') },
    { title: 'Personi Kontaktues', dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: 'Telefoni', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Statusi', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'Aktiv' ? 'green' : 'red'}>{status}</Tag> },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingSupplier(record); setIsSupplierModalVisible(true); }}>
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm title="Jeni i sigurt?" onConfirm={() => handleDeleteSupplier(record.supplierId)} okText="Po" cancelText="Jo">
            <Button danger icon={<DeleteOutlined />}>{!screens.xs && 'Fshi'}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name', sorter: (a,b)=> (a.name||'').localeCompare(b.name||'') },
    { title: 'Shteti', dataIndex: 'country', key: 'country' },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingManufacturer(record); setIsManufacturerModalVisible(true); }}>
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm title="Jeni i sigurt?" onConfirm={() => handleDeleteManufacturer(record.manufacturerId)} okText="Po" cancelText="Jo">
            <Button danger icon={<DeleteOutlined />}>{!screens.xs && 'Fshi'}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const categoryCards = (categories || []).map(category => (
    <Col xs={24} sm={12} md={8} lg={6} key={category.categoryId}>
      <Card size="small" style={{ borderRadius: 8 }} actions={[
        <Popconfirm title="Jeni i sigurt?" onConfirm={() => handleDeleteCategory(category.categoryId)} okText="Po" cancelText="Jo">
          <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} />
        </Popconfirm>,
        <Button type="link" onClick={() => { setEditingCategory(category); form.setFieldsValue({ name: category.name }); setIsCategoryModalVisible(true); }}>Edito</Button>
      ]}>
        <Card.Meta title={category.name} description={`ID: ${category.categoryId}`} />
      </Card>
    </Col>
  ));

  const carModelColumns = [
    { title: 'Emri i Modelit', dataIndex: 'modelName', key: 'modelName', sorter: (a,b)=> (a.modelName||'').localeCompare(b.modelName||'') },
    { title: 'Prodhuesi', dataIndex: 'manufacturerId', key: 'manufacturerId', render: (mid) => manufacturers.find(m => m.manufacturerId === mid)?.name ?? 'Unknown' },
    { title: 'Viti Start', dataIndex: 'yearStart', key: 'yearStart', render: y => y ? Number(y) : '-' },
    { title: 'Viti End', dataIndex: 'yearEnd', key: 'yearEnd', render: y => y ? Number(y) : 'Present' },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingCarModel(record); setIsEditCarModelModalVisible(true); form.setFieldsValue({
            modelName: record.modelName,
            manufacturerId: record.manufacturerId,
            yearStart: record.yearStart,
            yearEnd: record.yearEnd
          }); }}>
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm title="Jeni i sigurt?" onConfirm={() => handleDeleteCarModel(record.carModelId)} okText="Po" cancelText="Jo">
            <Button danger icon={<DeleteOutlined />}>{!screens.xs && 'Fshi'}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  // ------------------ Render ------------------
  return (
    <div style={{ padding: screens.xs ? 12 : 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[16,16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 12 }}>
            <Statistic title="Total Pjesë" value={parts.length} prefix={<AppstoreOutlined style={{ color: '#1890ff' }} />} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 12 }}>
            <Statistic title="Pjesë Në Alarm" value={parts.filter(p => {
              const qty = p.stock ?? (p.Stock ? p.Stock.quantity : 0);
              const reorder = p.reorderLevel ?? (p.Stock ? p.Stock.reorderLevel : 0);
              return qty <= reorder;
            }).length} prefix={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 12 }}>
            <Statistic title="Total Furnitorë" value={suppliers.length} prefix={<ShopOutlined style={{ color: '#52c41a' }} />} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 12 }}>
            <Statistic title="Vlera Totale" value={`€${Number(parts.reduce((sum,p) => {
              const price = Number(p.price ?? (p.Stock ? p.Stock.price : 0)) || 0;
              const qty = Number(p.stock ?? (p.Stock ? p.Stock.quantity : 0)) || 0;
              return sum + price * qty;
            },0)).toFixed(2)}`} valueStyle={{ color: '#722ed1' }} />
          </Card>
        </Col>
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" size={screens.xs ? 'small' : 'middle'}>
          <TabPane tab={<><AppstoreOutlined /> Inventari</>} key="inventory">
            <div style={{ marginBottom: 16, display: 'flex', flexDirection: screens.xs ? 'column' : 'row', gap: 12 }}>
              <Input placeholder="Kërko pjesë..." prefix={<SearchOutlined />} size={screens.xs ? 'small' : 'middle'} value={searchText} onChange={e => setSearchText(e.target.value)} style={screens.xs ? { marginBottom: 12 } : { width: 300 }} />
              <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingPart(null); form.resetFields(); setIsPartModalVisible(true); }} style={{ marginLeft: 'auto' }}>{screens.xs ? 'Shto' : 'Shto Pjesë'}</Button>
            </div>

            {parts.filter(p => {
              const qty = p.stock ?? (p.Stock ? p.Stock.quantity : 0);
              const reorder = p.reorderLevel ?? (p.Stock ? p.Stock.reorderLevel : 0);
              return qty <= reorder;
            }).length > 0 && (
              <Alert type="warning" showIcon message={`${parts.filter(p => {
                const qty = p.stock ?? (p.Stock ? p.Stock.quantity : 0);
                const reorder = p.reorderLevel ?? (p.Stock ? p.Stock.reorderLevel : 0);
                return qty <= reorder;
              }).length} pjesë në stok kritik`} description="Këto pjesë kanë nevojë për rimbushje." style={{ marginBottom: 16 }} />
            )}

            <Table columns={partColumns} dataSource={filteredParts} rowKey={r => r.partId ?? r.PartId ?? r.id} loading={loading} scroll={{ x: true }} size={screens.xs ? 'small' : 'middle'} pagination={{ pageSize: 6 }} />
          </TabPane>

          <TabPane tab={<><ShopOutlined /> Furnitorët</>} key="suppliers">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Button icon={<ReloadOutlined />} onClick={fetchSuppliers} loading={suppliersLoading}>Refresh</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingSupplier(null); setIsSupplierModalVisible(true); }}>{screens.xs ? 'Shto' : 'Shto Furnitor'}</Button>
            </div>
            <Spin spinning={suppliersLoading}>
              <Table columns={supplierColumns} dataSource={suppliers} rowKey="supplierId" size={screens.xs ? 'small' : 'middle'} pagination={{ pageSize: 6 }} />
            </Spin>
          </TabPane>

          <TabPane tab={<><GlobalOutlined /> Prodhuesit</>} key="manufacturers">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Button icon={<ReloadOutlined />} onClick={fetchManufacturers} loading={manufacturersLoading}>Refresh</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingManufacturer(null); setIsManufacturerModalVisible(true); }}>{screens.xs ? 'Shto' : 'Shto Prodhues'}</Button>
            </div>
            <Spin spinning={manufacturersLoading}>
              <Table columns={manufacturerColumns} dataSource={manufacturers} rowKey="manufacturerId" size={screens.xs ? 'small' : 'middle'} pagination={{ pageSize: 6 }} />
            </Spin>
          </TabPane>

          <TabPane tab={<><AppstoreOutlined /> Kategoritë</>} key="categories">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={() => { setEditingCategory(null); form.resetFields(); setIsCategoryModalVisible(true); }}>{screens.xs ? 'Shto' : 'Shto Kategori'}</Button>
            </div>
            <Row gutter={[16,16]}>{categoryCards}</Row>
          </TabPane>

          <TabPane tab={<><CarOutlined /> Modelet e Makinave</>} key="carModels">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Button icon={<ReloadOutlined />} onClick={fetchCarModels} loading={carModelsLoading}>Refresh</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingCarModel(null); form.resetFields(); setIsAddCarModelModalVisible(true); }}>{screens.xs ? 'Shto' : 'Shto Model'}</Button>
            </div>
            <Spin spinning={carModelsLoading}>
              <Table columns={carModelColumns} dataSource={carModels} rowKey="carModelId" size={screens.xs ? 'small' : 'middle'} pagination={{ pageSize: 6 }} />
            </Spin>
          </TabPane>
        </Tabs>
      </Card>

      {/* ------------------ Modals ------------------ */}
{/* ------------------ Part Modal ------------------ */}
<Modal
  title={editingPart ? 'Ndrysho Pjesën' : 'Shto Pjesë të Re'}
  open={isPartModalVisible}
onCancel={() => {
  setIsPartModalVisible(false);
  setEditingPart(null);
  form.resetFields();
  setFileList([]);
}}

  footer={null}
  width={900}
  destroyOnClose
>
  <Form
    form={form}
    layout="vertical"
    onFinish={handleAddEditPart}
  >
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          name="partNumber"
          label="Numri i Pjesës"
          rules={[{ required: true, message: 'Shkruaj numrin e pjesës' }]}
        >
          <Input placeholder="Numri i Pjesës" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Emri"
          rules={[{ required: true, message: 'Shkruaj emrin e pjesës' }]}
        >
          <Input placeholder="Emri i pjesës" />
        </Form.Item>

        <Form.Item name="description" label="Përshkrimi">
          <Input.TextArea placeholder="Përshkrimi i pjesës" rows={4} />
        </Form.Item>
<Form.Item
  name="manufacturerId"
  label="Prodhuesi"
  rules={[{ required: true, message: 'Zgjidh prodhuesin' }]}
>
  <Select
    placeholder="Zgjidh prodhuesin"
    allowClear
    loading={manufacturersLoading}
    onDropdownVisibleChange={(open) => {
      if (open && manufacturers.length === 0) {
        fetchManufacturers();
      }
    }}
  >
    {manufacturers.map(m => (
      <Option key={m.manufacturerId} value={m.manufacturerId}>
        {m.name}
      </Option>
    ))}
  </Select>
</Form.Item>
<Form.Item
  name="categoryId"
  label="Kategoria"
  rules={[{ required: true }]}
>
  <Select
    placeholder="Zgjidh kategorinë"
    allowClear
    loading={categoriesLoading}
    onDropdownVisibleChange={(open) => {
      if (open && categories.length === 0) {
        fetchCategories();
      }
    }}
  >
    {categories.map(c => (
      <Option key={c.categoryId} value={c.categoryId}>
        {c.name}
      </Option>
    ))}
  </Select>
</Form.Item>
<Form.Item
  name="compatibleModelIds"
  label="Modelet e Përshtatshme"
>
  <Select
    mode="multiple"
    placeholder="Zgjidh modelet"
    allowClear
    loading={carModelsLoading}
    optionFilterProp="children"
    onDropdownVisibleChange={(open) => {
      if (open && carModels.length === 0) {
        fetchCarModels();
      }
    }}
  >
    {carModels.map(cm => (
      <Option key={cm.carModelId} value={cm.carModelId}>
        {cm.modelName} ({cm.manufacturerName})
      </Option>
    ))}
  </Select>
</Form.Item>

      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          name="price"
          label="Çmimi (€)"
          rules={[{ required: true, message: 'Shkruaj çmimin' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="stockQuantity"
          label="Sasia në stok"
          rules={[{ required: true, message: 'Shkruaj sasinë' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="reorderLevel"
          label="Niveli për rimbushje"
          rules={[{ required: true, message: 'Shkruaj nivelin për rimbushje' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Zbritja (%)"
          rules={[{ type: 'number', min: 0, max: 100 }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Vitet e Përshtatjes">
          <Input.Group compact>
            <Form.Item name="compatibleFromYear" noStyle>
              <InputNumber
                min={1900}
                max={new Date().getFullYear()}
                placeholder="Nga viti"
                style={{ width: '50%' }}
              />
            </Form.Item>
            <Form.Item name="compatibleToYear" noStyle>
              <InputNumber
                min={1900}
                max={new Date().getFullYear() + 1}
                placeholder="Deri viti"
                style={{ width: '50%' }}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Foto">
          <Upload
            beforeUpload={uploadBefore}
            onRemove={uploadRemove}
            fileList={fileList}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Ngarko Foto</Button>
          </Upload>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
        {editingPart ? 'Ruaj Ndryshimet' : 'Shto Pjesë'}
      </Button>
      <Button
        onClick={() => {
          setIsPartModalVisible(false);
          setEditingPart(null);
          form.resetFields();
          setFileList([]);
        }}
      >
        Anulo
      </Button>
    </Form.Item>
  </Form>
</Modal>
{/*pjessa*/}
      {/* Supplier Modal */}
      <Modal title={editingSupplier ? 'Edito Furnitorin' : 'Shto Furnitor të Ri'} open={isSupplierModalVisible} onCancel={() => { setIsSupplierModalVisible(false); setEditingSupplier(null); form.resetFields(); }} footer={null} destroyOnClose width={screens.xs ? '90%' : 600}>
        <Form layout="vertical" initialValues={editingSupplier || { status: 'Aktiv' }} onFinish={editingSupplier ? handleEditSupplier : handleAddSupplier}>
          <Form.Item name="name" label="Emri i Furnitorit" rules={[{ required: true }]}>
            <Input prefix={<ShopOutlined />} />
          </Form.Item>
          <Form.Item name="contactPerson" label="Personi Kontaktues" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label="Telefoni" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input prefix={<MailOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="address" label="Adresa"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="status" label="Statusi" rules={[{ required: true }]}>
            <Select><Option value="Aktiv">Aktiv</Option><Option value="Jo Aktiv">Jo Aktiv</Option></Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>{editingSupplier ? 'Ruaj Ndryshimet' : 'Shto Furnitorin'}</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Manufacturer Modal */}
      <Modal title={editingManufacturer ? 'Edito Prodhuesin' : 'Shto Prodhues të Ri'} open={isManufacturerModalVisible} onCancel={() => { setIsManufacturerModalVisible(false); setEditingManufacturer(null); form.resetFields(); }} footer={null} destroyOnClose width={screens.xs ? '90%' : 500}>
        <Form layout="vertical" initialValues={editingManufacturer || { country: '' }} onFinish={editingManufacturer ? handleEditManufacturer : handleAddManufacturer}>
          <Form.Item name="name" label="Emri" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="country" label="Shteti" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>{editingManufacturer ? 'Ruaj Ndryshimet' : 'Shto Prodhuesin'}</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Category Modal */}
      <Modal title={editingCategory ? 'Edito Kategori' : 'Shto Kategori të Re'} open={isCategoryModalVisible} onCancel={() => { setIsCategoryModalVisible(false); setEditingCategory(null); form.resetFields(); }} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={editingCategory ? { name: editingCategory.name } : {}} onFinish={handleAddEditCategory}>
          <Form.Item name="name" label="Emri i Kategorisë" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block loading={loading}>{editingCategory ? 'Ruaj Ndryshimet' : 'Shto Kategori'}</Button></Form.Item>
        </Form>
      </Modal>

      {/* CarModel Add Modal */}
      <Modal title={editingCarModel ? 'Edito Modelin' : 'Shto Model të Ri'} open={isAddCarModelModalVisible || isEditCarModelModalVisible} onCancel={() => { setIsAddCarModelModalVisible(false); setIsEditCarModelModalVisible(false); setEditingCarModel(null); form.resetFields(); }} footer={null} destroyOnClose width={screens.xs ? '90%' : 500}>
        <Form layout="vertical" onFinish={editingCarModel ? handleEditCarModel : handleAddCarModel} initialValues={editingCarModel || {}}>
          <Form.Item name="modelName" label="Emri i Modelit" rules={[{ required: true }]}><Input placeholder="Civic, Golf, Passat..." /></Form.Item>
          <Form.Item name="manufacturerId" label="Prodhuesi" rules={[{ required: true }]}>
            <Select placeholder="Zgjidhni prodhuesin" loading={manufacturersLoading} onChange={val => setSelectedManufacturerIdForQuickAdd(val)}>
              {manufacturers.map(m => <Option key={m.manufacturerId} value={m.manufacturerId}>{m.name}</Option>)}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item name="yearStart" label="Viti i Fillimit" rules={[{ required: true }]}><InputNumber min={1900} max={new Date().getFullYear()} style={{ width: '100%' }} /></Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="yearEnd" label="Viti i Mbarimit"><InputNumber min={1900} max={new Date().getFullYear()+10} style={{ width: '100%' }} /></Form.Item>
            </Col>
          </Row>
          <Form.Item><Button type="primary" htmlType="submit" block loading={loading}>{editingCarModel ? 'Ruaj Ndryshimet' : 'Shto Model'}</Button></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplyInventoryDashboard;
