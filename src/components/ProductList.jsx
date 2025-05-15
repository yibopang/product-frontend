import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 200px;
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Button = styled.button`
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

function ProductList({ setView, setSelectedProduct, reload, triggerReload }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, [reload]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      triggerReload();
    }
  };

  return (
    <Grid>
      {products.map(p => (
        <Card key={p.productID}>
          <Image src={p.imageURL} alt={p.productName} />
          <h3>{p.productName}</h3>
          <p>${p.price}</p>
          <Button onClick={() => {
            setSelectedProduct(p);
            setView('edit');
          }}>✏️ Edit</Button>
          <Button onClick={() => handleDelete(p.productID)}>❌ Delete</Button>
        </Card>
      ))}
    </Grid>
  );
}

export default ProductList;