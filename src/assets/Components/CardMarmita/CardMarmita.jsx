import BotaoFavoritar from '../BotaoFavoritar/BotaoFavoritar';
import './CardMarmita.scss'
import './CardMarmitaMobile.scss'

const CardMarmita = () => {
    return (
        <div className='container-CardMarmita'>
            <div className="card">
                <div className="bar"></div>
                <div className="card_form">
                    <img src="" alt="" />
                </div>
                <div className="card_data">
                    <div className="data">
                        <div className="text">
                            <label className="text_m">Main Title</label>
                            <div className="cube text_s">
                                <label className="side front">Access the list (Topic)</label>
                                <label className="side top">Username-id</label>
                            </div>
                            <label className="text_d"
                            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio,
                                quo modo possit, si luxuriosus sit, finitas cupiditates habere.
                            </label>
                        </div>
                    </div>
                    <BotaoFavoritar/>
                </div>
            </div>

        </div>
    )
}

export default CardMarmita;