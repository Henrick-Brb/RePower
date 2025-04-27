import { useNavigate } from 'react-router-dom'

import ProjetoForm from '../project/ProjetoForm'

import styles from './NovoProjeto.module.css'

function NovoProjeto(){

    const navigate = useNavigate()

    function createPost(project){
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projetos", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate('/projetos',{ state: {message: 'Projeto Criado com Sucesso!'} })
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu Projeto para depois adicionar seus Treinos</p>
            <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NovoProjeto;
