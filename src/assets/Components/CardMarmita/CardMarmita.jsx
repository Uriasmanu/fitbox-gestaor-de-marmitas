
import BotaoFavoritar from '../Botoes/BotaoFavoritar/BotaoFavoritar';

import PropTypes from 'prop-types';


const CardMarmita = ({ id, tamanhoMarmita, name, dataCriacao, img, isHidden, onToggleFavoritar, isFavorited }) => {
    return (

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
                                <label className="side front"></label>
                                <label className="side top">{tamanhoMarmita}</label>
                            </div>
                            <label className="text_d">
                                {dataCriacao}
                            </label>
                        </div>
                    </div>
                    <BotaoFavoritar
                        isFavorited={isFavorited}
                        onClick={() => onToggleFavoritar(id)} 
                    />
                </div>
            </div>
 
    )
}

CardMarmita.propTypes = {
    id: PropTypes.string.isRequired,
    tamanhoMarmita: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dataCriacao: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
    onToggleFavoritar: PropTypes.func.isRequired,
    isFavorited: PropTypes.bool.isRequired
};
export default CardMarmita;