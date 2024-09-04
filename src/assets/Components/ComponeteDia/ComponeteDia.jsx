import './_ComponeteDia.scss'

const ComponeteDia = () =>{
    const dataAtual = new Date();

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(dataAtual);
  
    // Substituir o mês abreviado para ficar como "Agos" ao invés de "ago"
    const dataCustomizada = dataFormatada.replace("ago", "Agos");
  
    return (
      <div>
        <p>{dataCustomizada}</p>
      </div>
    );
}

export default ComponeteDia;