import BotaoFavoritar from '../BotaoFavoritar/BotaoFavoritar';
import './_CardMarmita.scss'
import './_CardMarmitaMobile.scss'
import PropTypes from 'prop-types';


const CardMarmita = ({ id, name, descricao, img, isHidden }) => {
    return (
        <div className='container-CardMarmita'>
            <div className="card">
                <div className="bar"></div>
                <div className="card_form">
                    <img src={img} alt={name} />
                </div>
                <div className={`card_data ${isHidden ? 'hidden' : ''}`}>
                    <div className="data">
                        <div className="text">
                            <label className="text_m">{name}</label>
                            <div className="cube text_s">
                                <label className="side front">Access the list (Topic)</label>
                                <label className="side top">{id}</label>
                            </div>
                            <label className="text_d">
                                {descricao}
                            </label>
                        </div>
                    </div>
                    <BotaoFavoritar />
                </div>
            </div>
        </div>
    )
}

CardMarmita.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    isHidden: PropTypes.bool
};
export default CardMarmita;