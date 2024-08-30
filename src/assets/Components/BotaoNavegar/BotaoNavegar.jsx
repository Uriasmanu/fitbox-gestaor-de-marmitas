import './_botaoNavegar.scss';
import PropTypes from 'prop-types';

const BotaoNavegacao = ({ icone, texto }) => {
  return (
    <div className="container-botaoNavegacao">
      <button>
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
  };

export default BotaoNavegacao;
