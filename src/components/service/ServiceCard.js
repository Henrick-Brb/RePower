import { BsFillTrash2Fill } from 'react-icons/bs';

import styles from '../project/ProjetoCard.module.css'

function ServiceCard({ id, name, cost, description, handleRemove }){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.projeto_card}>
            <h4>{name}</h4>
            <p>
                <span>Dias de Treino:</span> {cost}
            </p>
            <p>
                <span>Exercícios:</span> {description}
            </p>
            <div className={styles.projeto_card_actions}>
                <button onClick={remove}>
                    <BsFillTrash2Fill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;