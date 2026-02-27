import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../services/productService";
import "./Products.css";
import Snowfall from "react-snowfall";
import { getCategory} from "../services/categoryService";
import "../App.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        categoryId: "",
        salePrice: "",
        costPrice: "",
        trackStock: false,
    });
const [categories, setCategories] = useState([]);
const [successMessage, setSuccessMessage] = useState("");

const [deleteModal, setDeleteModal] = useState({show: false, id: null});

const isStockActive = (val) => {
    if (typeof val === "string") return val.toLowerCase() === "true";
    return Boolean(val);
};

    const fetchProducts = () => {
        getProducts().then(res => setProducts(res.data));
    };

    useEffect(() => {
        fetchProducts();
        getCategory().then(res => setCategories(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct({
            name: form.name,
            categoryId: Number(form.categoryId),
            salePrice: Number(form.salePrice),
            costPrice: Number(form.costPrice),
            trackStock: form.trackStock
        }).then(() => {
            setSuccessMessage("Ürün başarıyla eklendi!");
            setTimeout(() => setSuccessMessage(""), 3000);
            setForm({
                name: "",
                categoryId: "",
                salePrice: "",
                costPrice: "",
                trackStock: false,
            });
            setShowModal(false);
            fetchProducts();
        });
    };

    const handleDelete = (id) => {
        deleteProduct(id).then(() => {
            fetchProducts();
            setDeleteModal({show: false, id: null});
        })
    };

    return (
        <div className="products-container">
        <Snowfall color="#fff" snowflakeCount={100} />
            <div className="header-row">
                <div className="header-title-group">
                    <div className="header-title-text">
                        <span role="img" aria-label="burger" style={{ marginRight: 8, fontSize: "2rem", lineHeight: 1 }}>🍔</span>
                        Ürünler Yönetimi
                    </div>
                    <div className="header-desc">Ürün ekleyin, düzenleyin veya silin</div>
                </div>
                <div className="form-card">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        ➕ Ürün Ekle
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Yeni Ürün Ekle</h3>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ürün Adı</label>
                                    <input
                                        name="name"
                                        placeholder="Ürün adı girin"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kategori</label>
                                    <select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Kategori Seçin</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Satış Fiyatı (₺)</label>
                                    <input
                                        name="salePrice"
                                        type="number"
                                        placeholder="0.00"
                                        value={form.salePrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Maliyet Fiyatı (₺)</label>
                                    <input
                                        name="costPrice"
                                        type="number"
                                        placeholder="0.00"
                                        value={form.costPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="trackStock"
                                        checked={form.trackStock}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Stok Takibi Yap
                                </label>
                            </div>
                            <div className="form-row">
                                <button type="submit" className="btn-primary">
                                    ➕ Ürün Ekle
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowModal(false)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Kapat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {successMessage && (
            <div className="success-toast">{successMessage}</div>
            )}
            
            {deleteModal.show &&(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Ürünü Silmek İstediğinize Emin Misiniz?</h3>
                        <div style={{display:"flex", justifyContent: "flex-end", gap:"10px"}}>
                            <button
                                className="btn-secondary"
                                onClick = {() => setDeleteModal({show: false, id: null})}>
                                    İptal
                                </button>
                            <button
                                className="btn-delete"
                                onClick = {() => handleDelete(deleteModal.id)}>
                                    Sil
                                </button>

                        </div>
                    </div>
                </div>
            )}

            <div className="table-card">
                <h3>Ürün Listesi</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ürün Adı</th>
                            <th>Satış Fiyatı</th>
                            <th>Maliyet</th>
                            <th>Stok Takibi</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    Henüz ürün eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            products.map(p => (
                                <tr key={p.id}>
                                    <td><span className="id-badge">#{p.id}</span></td>
                                    <td>{p.name}</td>
                                    <td className="price">₺{p.salePrice}</td>
                                    <td className="cost">₺{p.costPrice}</td>
                                    <td>
                                        <span className={`status ${p.stock ? "active" : "inactive"}`}>
                                            {isStockActive(p.stock) ? "Aktif" : "Pasif"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => setDeleteModal({show: true, id: p.id})}
                                        >
                                            🗑️ Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Products;