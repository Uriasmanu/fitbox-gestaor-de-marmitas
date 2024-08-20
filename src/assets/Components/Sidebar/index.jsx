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


const Sidebar = () => {
  const iconMap = {
    alimento: iconeAlimento,
    compra: iconeCompra,
    estoque: iconeEstoque,
    registrar: iconeRegistrar,
    relatorio: iconeRelatorio
  };

  return (
    <div className="ContainerSidebar">
      <div className="moldura">
        <img src={imagemUsuario} alt="Imagem do usuário" />
      </div>
      <h2>Olá, {texts.sidebar.usuario}!</h2>
      <ul>
        {texts.sidebar.menus.map((menu, index) => (
          <li key={index}>
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
