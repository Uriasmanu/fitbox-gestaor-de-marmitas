import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss'
import './_RegistrosMarmitasMobile.scss'
import BotaoMenu from '../../Components/BotaoMenu/BotaoMenu';
import chef from '../../Image/ChefHat.svg'
import save from '../../Image/Save.svg'
import add from '../../Image/Add.svg'

const RegistrosMarmitas = () => {
    const [sidebarVisivel, setSidebarVisivel] = useState(false);

    const controleSidebar = () => {
        setSidebarVisivel(!sidebarVisivel);
    };

    return (
        <div className='RegistrosMarmitas'>
            <div className="botaoMenu">
                <BotaoMenu controleSidebar={controleSidebar} />
            </div>
            <header className="sideBar">
                <section className={sidebarVisivel ? 'sideBar invisivel' : 'sideBar visivel'}>
                    <Sidebar />
                </section>
            </header>
            <main>
                <form className="form">
                    <img src={chef} alt="icone de chapeu de cozinha" />
                    <input className="input" placeholder="Nome da marmita" type="text" />
                    <input className="input" placeholder="Tamanho da vasilha" type="text" />
                    <div className='ingredientes'>
                        <input className="input" placeholder="Ingredientes" type="text" />
                        <input className="input" placeholder="quantidade" type="text" />
                    </div>
                    <button className="btn adicionar">
                        <img src={add} alt="icone de salvar" />
                        Adicionar ingrediente
                    </button>
                    <button className="btn criar">
                        <img src={save} alt="icone de salvar" />
                        Criar marmita
                    </button>
                </form>
            </main>
        </div>
    )
}

export default RegistrosMarmitas;