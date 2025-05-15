import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

function App() {
  const [view, setView] = useState('add'); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reload, setReload] = useState(false); // for refreshing product list

  const triggerReload = () => setReload(prev => !prev);

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Product Catalog</h1>
      <AddProductForm
        view={view}
        setView={setView}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        triggerReload={triggerReload}
      />
      <hr />
      <ProductList
        setView={setView}
        setSelectedProduct={setSelectedProduct}
        reload={reload}
        triggerReload={triggerReload}
      />
    </div>
  );
}

export default App;