import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Message from "../layout/Message";
import Container from "../layout/Container"
import Loading from "../layout/Loading"
import LinkBotao from "../layout/LinkBotao";
import ProjetoCard from "../project/ProjetoCard";

import styles from './Projetos.module.css'

function Projetos(){
    const [projetos, setProjetos] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projetoMessage, setProjetoMessage] = useState('')


    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projetos', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then(resp => resp.json())    
            .then(data => {
                setProjetos(data)
                setRemoveLoading(true)
            })
            .catch((error) => console.log(error))
        }, 3000)
    }, [])

    function removeProjeto(id){

        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjetos(projetos.filter((projetos) => projetos.id !== id))
            setProjetoMessage('Projeto Removido com Sucesso!')
        })
        .catch(error => console.log(error))

    }

    return (
        <div className={styles.projeto_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkBotao to="/NovoProjeto" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            {projetoMessage && <Message type="success" msg={projetoMessage}/>}
            <Container customClass="start">
                {projetos.length > 0 &&
                    projetos.map((projetos) => <ProjetoCard 
                    id={projetos.id}
                    name={projetos.name}
                    horas={projetos.horas}
                    category={projetos.category.name}
                    key={projetos.id}
                    handleRemove={removeProjeto}/>)}
                    {!removeLoading && <Loading />}
                    {removeLoading && projetos.length === 0 && (
                        <p>Não há Projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}

export default Projetos;
