import styles from './Inicio.module.css'
import savings from '../../img/savings.svg'
import LinkBotao from '../layout/LinkBotao';

function Inicio(){
    return (
        <section className={styles.inicio_container}>
            <h1>Bem-Vindo ao <span>RePower</span></h1>
            <p>Comece a Gerenciar os seus Projetos agora mesmo!</p>
            <LinkBotao to="/NovoProjeto" text="Criar Projeto"/>
            <img src={savings} alt="RePower"/>
        </section>
    )
}

export default Inicio;
