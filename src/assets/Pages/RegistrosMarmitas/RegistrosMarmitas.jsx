import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss'

const RegistrosMarmitas = () => {
    return (
        <div className='RegistrosMarmitas'>
            <Sidebar />
            <main>
                <form class="form">
                    <p class="heading">Login</p>
                    <input class="input" placeholder="Username" type="text" />
                    <input class="input" placeholder="Password" type="text" />
                    <button class="btn">Submit</button>
                </form>
            </main>
        </div>
    )
}

export default RegistrosMarmitas;