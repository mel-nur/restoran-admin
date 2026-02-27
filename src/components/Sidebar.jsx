import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { path: "/", label: "Dashboard", icon: "📊" },
        { path: "/expenses", label: "Giderler", icon: "💸" },
        { path: "/payments", label: "Ödemeler", icon: "💳" },
        { path: "/stocks", label: "Stoklar", icon: "📦" },
        { path: "/products", label: "Ürünler", icon: "🍔" },
        { path: "/tables", label: "Masa Yönetimi", icon: "🪑" },
        { path: "/orders", label: "Siparişler", icon: "📝" },
        { path: "/categories", label: "Kategoriler", icon: "🏷️" },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>Restoran Yönetim Sistemi</h1>
                <span>Yönetim Paneli</span>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? "active" : ""}`}>
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>
            {/* <h2>Restoran Yönetim Sistemi</h2>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/expenses">Giderler</Link></li>
                <li><Link to="/payments">Ödemeler</Link></li>
                <li><Link to="/stocks">Stoklar</Link></li>
                <li><Link to="/products">Ürünler</Link></li>
                <li><Link to="/tables">Masa Yönetimi</Link></li>
                <li><Link to="/orders">Siparişler</Link></li>
            </ul> */}
        </div>
    );
}
export default Sidebar;