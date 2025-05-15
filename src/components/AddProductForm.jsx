import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
`;

function AddProductForm({ view, setView, selectedProduct, setSelectedProduct, triggerReload }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (view === 'edit' && selectedProduct) {
      reset({
        name: selectedProduct.productName,
        description: selectedProduct.description || '',
        price: selectedProduct.price,
        imageURL: selectedProduct.imageURL
      });
      setImagePreview(selectedProduct.imageURL);
    } else {
      reset();
      setImagePreview('');
    }
  }, [view, selectedProduct]);

  const onSubmit = async (data) => {
    try {
      if (view === 'edit') {
        await axios.put(`http://localhost:3001/api/products/${selectedProduct.productID}`, {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          imageURL: data.imageURL
        });
        setView('add');
        setSelectedProduct(null);
      } else {
        await axios.post('http://localhost:3001/api/products', {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          imageURL: data.imageURL
        });
      }
      triggerReload();
      reset();
      setImagePreview('');
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.error || 'Failed to submit product'));
    }
  };

  const handleImagePreview = (e) => setImagePreview(e.target.value);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{view === 'edit' ? 'Edit Product' : 'Add Product'}</h2>

      <Field>
        <Label>Product Name:</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <p style={{ color: 'red' }}>Required</p>}
      </Field>

      <Field>
        <Label>Description:</Label>
        <TextArea {...register("description", { required: true })} />
        {errors.description && <p style={{ color: 'red' }}>Required</p>}
      </Field>

      <Field>
        <Label>Price:</Label>
        <Input type="number" step="0.01" {...register("price", { required: true })} />
        {errors.price && <p style={{ color: 'red' }}>Required</p>}
      </Field>

      <Field>
        <Label>Image URL:</Label>
        <Input {...register("imageURL")} onBlur={handleImagePreview} />
        {imagePreview && <img src={imagePreview} alt="preview" style={{ width: 100, marginTop: 10 }} />}
      </Field>

      <Button type="submit">{view === 'edit' ? 'Update' : 'Add Product'}</Button>
      {view === 'edit' && <Button onClick={() => { setView('add'); setSelectedProduct(null); }}>Cancel</Button>}
    </Form>
  );
}

export default AddProductForm;