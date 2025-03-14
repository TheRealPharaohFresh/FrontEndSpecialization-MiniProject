import { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../services/productServices";




const ProductManagement = () => {

interface Product { 
    id?: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
    imageUrl: string;
}
  
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "", 
    price: 0, 
    description: "", 
    stock: 0, 
    category: "", 
    imageUrl: ""
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Handle null for editing

 
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    console.log('Products updated:', products);
  }, [products]);

  const loadProducts = async () => {
    const productList = await fetchProducts();
    console.log('Fetched products:', productList);
    setProducts(productList);
  };

  const handleCreate = async () => {
    await createProduct(newProduct);
    setNewProduct({
      name: "", 
      price: 0, 
      description: "", 
      stock: 0, 
      category: "", 
      imageUrl: ""
    });
    loadProducts();
  };


  const handleUpdate = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null); // Reset editing state
      loadProducts();
    }
  };

 
  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    loadProducts();
  };

  return (
    <div>
      <h2>Product Management</h2>

   
      <div>
        <h3>Create Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button onClick={handleCreate}>Add Product</button>
      </div>

      
      <div>
        <h3>Products List</h3>
        {products.map((product) => (
          <div key={product.id}>
            <h4>{product.name} - ${product.price}</h4>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      
      {editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
          />
          <input
            type="number"
            value={editingProduct.stock}
            onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
          />
          <input
            type="text"
            value={editingProduct.category}
            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
          />
          <input
            type="text"
            value={editingProduct.imageUrl}
            onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
          />
          <button onClick={handleUpdate}>Update Product</button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
