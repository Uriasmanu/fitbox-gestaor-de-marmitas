import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss'
import './_RegistrosMarmitasMobile.scss'
import BotaoMenu from '../../Components/BotaoMenu/BotaoMenu';

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
                    <p className="heading">Login</p>
                    <input className="input" placeholder="Username" type="text" />
                    <input className="input" placeholder="Password" type="text" />
                    <button className="btn">Submit</button>
                </form>
            </main>
        </div>
    )
}

export default RegistrosMarmitas;