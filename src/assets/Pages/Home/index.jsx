import BotaoMenu from "../../Components/BotaoMenu/BotaoMenu";
import Sidebar from "../../Components/Sidebar";
import './_inicio.scss'
import './_inicioMobile.scss'

const Home = () => {
    return (
        <div className="containerHome">
            <header>
                <div className="botaoMenu">
                    <BotaoMenu />
                </div>
                <section>
                    <Sidebar />
                </section>
            </header>
            <main>

            </main>
            <footer>

            </footer>

        </div>
    )
}

export default Home;