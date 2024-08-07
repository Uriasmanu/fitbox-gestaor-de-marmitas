import "/_sidebar.scss";
import imagemUsuario from "../../Image/usuario.png"
import texts from "../../Texts/text.json"
import { FaUtensils, FaBox, FaShoppingCart, FaFileAlt, FaWarehouse } from 'react-icons/fa';

const Sidebar = () => {
    const iconMap = {
        FaUtensils: <FaUtensils />,
        FaBox: <FaBox />,
        FaShoppingCart: <FaShoppingCart />,
        FaFileAlt: <FaFileAlt />,
        FaWarehouse: <FaWarehouse />
      };
    return (
        <div className="ContainerSidebar">
            <img src={imagemUsuario} alt="Imagem do usuatio" />
            <h2>Ola, {texts.sidebar.usuario}!</h2>
            <ul>
        {texts.sidebar.menus.map((menu, index) => (
          <li key={index}>
            <span className="icon">{iconMap[menu.icon]}</span>
            {menu.label}
          </li>
        ))}
      </ul>
        </div>
    )
}

export default Sidebar;