import './_botaoMenu.scss'
import PropTypes from 'prop-types';

const BotaoMenu = ({controleSidebar}) => {
    return (
        <div className='botaoMenu'>
            <label className="burger" htmlFor="burger">
                <input type="checkbox" id="burger" onClick={controleSidebar}/>
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
}

BotaoMenu.propTypes = {
    controleSidebar: PropTypes.func.isRequired, 
};

export default BotaoMenu;
