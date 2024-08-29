import { useState } from "react";
import BotaoMenu from "../../Components/BotaoMenu/BotaoMenu";
import Sidebar from "../../Components/Sidebar";
import './_inicio.scss'
import './_inicioMobile.scss'

const Home = () => {
    const [sidebarVisivel, setSidebarVisivel] = useState(false);

    const controleSidebar = () => {
        setSidebarVisivel(!sidebarVisivel);
    }

    return (
        <div className="containerHome">
            <div className="botaoMenu">
                <BotaoMenu controleSidebar={controleSidebar} />
            </div>
            <header className="sideBar">

                <section className={sidebarVisivel ? 'sideBar invisivel': 'sideBar visivel'}>
                    <Sidebar />
                </section>
            </header>
            <main>
                <div>
                    <h2>Qual é a escolha saudável de hoje?</h2>
                </div>
            </main>
            <footer>

            </footer>

        </div>
    )
}

export default Home;