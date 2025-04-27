import { Link } from 'react-router-dom'
import styles from './LinkBotao.module.css'

function LinkBotao({ to, text }){
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default LinkBotao;
