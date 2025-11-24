import React, { useState, useEffect } from 'react';

function ProductForm({ addProduct, updateProduct, editingProduct, setEditingProduct }) {
  const initialState = { id: null, name: '', category: '', price: '', stock: '' };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData(initialState);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? (value === '' ? '' : Number(value)) : value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    if (editingProduct) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }
    setFormData(initialState);
    setEditingProduct(null);
  };

  const onCancel = () => {
    setEditingProduct(null);
    setFormData(initialState);
  };

  return (
    <form onSubmit={onSubmit} style={{marginBottom:12}}>
      <div className="form-grid">
        <div className='col-span-4'>
          <input  type="text" name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='col-span-2'>
          <button className="btn btn-primary" type="submit">{editingProduct ? 'Guardar' : 'Añadir'}</button>
        </div>
        <div className='col-span-2'>
          <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />
        </div>
        <div className='col-span-2'>
          <input type="number" name="price" placeholder="Precio" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>
        <div className='col-span-2'>
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        </div>
        <div className="col-span-6" style={{display:'flex', alignItems:'center', justifyContent:"flex-end", gap:10}}>
          {editingProduct && <button type="button" className="btn btn-secondary" style={{width:"auto"}} onClick={onCancel}>Cancelar</button>}
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
