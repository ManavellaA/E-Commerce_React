import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getFirestore } from "../FireBase/Firebase";

const INITIAL_FORM = {
  nombre: "",
  marca: "",
  categoria: "",
  precio: "",
  stock: "",
  img: "",
  detalle: "",
};

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const db = useMemo(() => getFirestore(), []);

  const fetchProducts = useCallback(() => {
    setIsLoading(true);
    setError("");

    db.collection("items")
      .get()
      .then((snapshot) => {
        const mapped = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(mapped);
      })
      .catch(() => {
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [db]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      nombre: product.nombre || "",
      marca: product.marca || "",
      categoria: product.categoria || "",
      precio: product.precio?.toString() || "",
      stock: product.stock?.toString() || "",
      img: product.img || "",
      detalle: product.detalle || "",
    });
    setSuccess("");
    setError("");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este producto?");

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    db.collection("items")
      .doc(id)
      .delete()
      .then(() => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
        if (editingId === id) {
          resetForm();
        }
        setSuccess("Producto eliminado correctamente.");
      })
      .catch(() => {
        setError("No se pudo eliminar el producto.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.marca || !form.categoria || !form.img || !form.detalle) {
      setError("Completá todos los campos del formulario.");
      setSuccess("");
      return;
    }

    const precio = Number(form.precio);
    const stock = Number(form.stock);

    if (Number.isNaN(precio) || Number.isNaN(stock) || precio < 0 || stock < 0) {
      setError("Precio y stock deben ser números válidos mayores o iguales a 0.");
      setSuccess("");
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      categoria: form.categoria.trim(),
      precio,
      stock,
      img: form.img.trim(),
      detalle: form.detalle.trim(),
    };

    setIsSaving(true);
    setError("");
    setSuccess("");

    const operation = editingId
      ? db.collection("items").doc(editingId).update(payload)
      : db.collection("items").add(payload);

    operation
      .then(() => {
        setSuccess(editingId ? "Producto actualizado correctamente." : "Producto creado correctamente.");
        resetForm();
        fetchProducts();
      })
      .catch(() => {
        setError("Ocurrió un error al guardar el producto.");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <section className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Panel de administración</h2>

      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{editingId ? "Editar producto" : "Agregar producto"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Marca</label>
                <input className="form-control" name="marca" value={form.marca} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <input className="form-control" name="categoria" value={form.categoria} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Precio</label>
                <input className="form-control" type="number" min="0" name="precio" value={form.precio} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input className="form-control" type="number" min="0" name="stock" value={form.stock} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">URL de imagen</label>
                <input className="form-control" name="img" value={form.img} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">Detalle</label>
                <textarea className="form-control" rows="3" name="detalle" value={form.detalle} onChange={handleChange} />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-primary" type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={resetForm} disabled={isSaving}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Productos</h5>

          {isLoading ? (
            <p className="mb-0">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="mb-0">No hay productos cargados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.nombre}</td>
                      <td>{product.marca}</td>
                      <td>{product.categoria}</td>
                      <td>${product.precio}</td>
                      <td>{product.stock}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(product)}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
