import './_botaoMenu.scss'

const BotaoMenu = () => {
    return (
        <div className='botaoMenu'>
            <label class="burger" for="burger">
                <input type="checkbox" id="burger" />
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
}

export default BotaoMenu;
