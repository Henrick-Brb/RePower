import { Link } from 'react-router-dom';
import styles from './ProjetoCard.module.css'

import { BsPencil, BsTrash2Fill } from 'react-icons/bs';

function ProjetoCard({ id, name, horas, category, handleRemove }){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.projeto_card}>
            <h4>{name}</h4>
            <p>
                <span>Total de Dias:</span> {horas}
            </p>
            <p className={styles.category_text}>
                <span className={styles[category.replace(/\s+/g,'').toLowerCase()]}></span> {category}
            </p>
            <div className={styles.projeto_card_actions}>
                <Link to={`/projeto/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsTrash2Fill /> Excluir
                </button>
                
            </div>
        </div>

    )
}

export default ProjetoCard;