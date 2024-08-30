import './_botaoNavegar.scss';
import './_botaoNavegarMobile.scss';
import PropTypes from 'prop-types';

const BotaoNavegacao = ({ icone, texto, selecionado, onClick }) => {
  return (
    <div className="container-botaoNavegacao">
      <button onClick={onClick} className={selecionado ? 'selecionado' : ''} disabled={selecionado}>
        <div className='icone-navegacao'>
          <img src={icone} alt={texto} />
        </div>
        {texto}
      </button>
    </div>
  );
};

BotaoNavegacao.propTypes = {
  icone: PropTypes.string.isRequired, 
  texto: PropTypes.string.isRequired, 
  selecionado: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BotaoNavegacao;
