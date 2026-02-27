import { useEffect, useState } from "react";
import { getCategory, createCategory, deleteCategory } from "../services/categoryService";
import Snowfall from "react-snowfall";
import "./Products.css";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

    const fetchCategories = () => {
        getCategory().then(res => setCategories(res.data));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory({
            name: form.name,
        }).then(() => {
            setSuccessMessage("Kategori başarıyla eklendi!");
            setTimeout(() => setSuccessMessage(""), 3000);
            setForm({ name: "" });
            setShowModal(false);
            fetchCategories();
        });
    };

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            fetchCategories();
            setDeleteModal({ show: false, id: null });
        })
        .catch((err) => {
            setDeleteModal({ show: false, id: null});
            setSuccessMessage("Bu kategoriye bağlı ürünler varken silme işlemi yapılamaz!");
            setTimeout(() => setSuccessMessage(""), 3000);
        });
    };

    return (
        <div className="products-container">
            <Snowfall color="#fff" snowflakeCount={100} />
            <div className="header-row">
                <div className="header-title-group">
                    <div className="header-title-text">
                        <span role="img" aria-label="kategori" style={{ marginRight: 8, fontSize: "2rem", lineHeight: 1 }}>🏷️</span>
                        Kategori Yönetimi
                    </div>
                    <div className="header-desc">Kategori ekleyin, düzenleyin veya silin</div>
                </div>
                <div className="form-card">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        ➕ Kategori Ekle
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Yeni Kategori Ekle</h3>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Kategori Adı</label>
                                    <input
                                        name="name"
                                        placeholder="Kategori adı girin"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="submit" className="btn-primary">
                                    ➕ Kategori Ekle
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

            {deleteModal.show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Kategoriyi Silmek İstediğinize Emin Misiniz?</h3>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button
                                className="btn-secondary"
                                onClick={() => setDeleteModal({ show: false, id: null })}
                            >
                                İptal
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(deleteModal.id)}
                            >
                                🗑️ Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-card">
                <h3>Kategori Listesi</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kategori Adı</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="empty-state">
                                    Henüz kategori eklenmemiş
                                </td>
                            </tr>
                        ) : (
                            categories.map(c => (
                                <tr key={c.id}>
                                    <td><span className="id-badge">#{c.id}</span></td>
                                    <td>{c.name}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => setDeleteModal({ show: true, id: c.id })}
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

export default Categories;