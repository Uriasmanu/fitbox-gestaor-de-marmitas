import "./_sidebar.scss"
import "./_sidebarMobile.scss"
import imagemUsuario from "../../Image/usuario.png"
import texts from "../../Texts/text.json"

import "../../Styles/_styleBase.scss";

import iconeAlimento from '../../Image/alimento.svg'
import iconeCompra from '../../Image/compra.svg'
import iconeEstoque from '../../Image/estoque.svg'
import iconeRegistrar from '../../Image/registrar.svg'
import iconeRelatorio from '../../Image/relatorio.svg'
import iconeSair from '../../Image/Logout.svg'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate('/'); // Redireciona para a página de login
  };

  const iconMap = {
    alimento: iconeAlimento,
    compra: iconeCompra,
    estoque: iconeEstoque,
    registrar: iconeRegistrar,
    relatorio: iconeRelatorio,
    sair: iconeSair
  };

  return (
    <div className="ContainerSidebar">
      <div className="moldura">
        <img src={imagemUsuario} alt="Imagem do usuário" />
      </div>
      <h2>Olá, {texts.sidebar.usuario}!</h2>
      <ul>
        {texts.sidebar.menus.map((menu, index) => (
          <li key={index} onClick={menu.label === "Sair" ? handleLogout : null}>
            <span className="icon">
              <img src={iconMap[menu.icon]} alt={menu.label} />
            </span>
            {menu.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
