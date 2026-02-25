import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Restoran Yönetim Sistemi</h2>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/products">Ürünler</Link></li>
                <li><Link to="/tables">Masa Yönetimi</Link></li>
                <li><Link to="/orders">Siparişler</Link></li>
            </ul>
        </div>
    )
}
export default Sidebar;