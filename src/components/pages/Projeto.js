import { v4 as uuidv4 } from 'uuid'

import styles from './Projeto.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react' 

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message'
import ProjetoForm from '../project/ProjetoForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Projeto() {
    const { id } = useParams()

    const [projeto, setProjeto] = useState([])
    const [services, setServices] = useState([])
    const [showProjetoForm, setShowProjetoForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjeto(data)
                setServices(data.services)
            })
            .catch((error) => console.log(error))
        }, 1000)
    }, [id])

    function editPost(projeto) {
        setMessage('')
        if(projeto.horas < projeto.cost) {
            setMessage('Os Dias Totais do Projeto não pode ser menor que os Dias de Treino do Projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjeto(data)
            setShowProjetoForm(false)
            setMessage('Projeto Atualizado!')
            setType('success')
        })
        .catch(error => console.log(error))
    }

    function createService(projeto){
        setMessage('')
        const lastService = projeto.services[projeto.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost)
        
        if (newCost > parseFloat(projeto.horas)) {
            setMessage('Dias de Treino não pode ser Maior que o Total de Dias do Projeto!')
            setType('error')
            projeto.services.pop()
            return false
        }

        projeto.cost = newCost

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch((error) => console.log(error))
    }

    function removeService(id, cost){

        const servicesUpdated = projeto.services.filter(
            (service) => service.id !== id
        )

        const projetoUpdated = projeto

        projetoUpdated.services = servicesUpdated
        projetoUpdated.cost = parseFloat(projetoUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projetos/${projetoUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projetoUpdated)
        })  
            .then((resp) => resp.json())
            .then((data) => {
                setProjeto(projetoUpdated)
                setServices(servicesUpdated)
                setMessage('Treino removido com Sucesso!')
                setType('success')
            })
            .catch(error => console.log(error))
    }

    function toggleProjetoForm(){
        setShowProjetoForm(!showProjetoForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
        {projeto.name ? (
            <div className={styles.projeto_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {projeto.name}</h1>
                        <button className={styles.btn} onClick={toggleProjetoForm}>
                            {!showProjetoForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjetoForm ? (
                            <div className={styles.projeto_info}>
                                <p><span>Categoria:</span> {projeto.category.name}</p>
                                <p><span>Total de Dias:</span> {projeto.horas}</p>
                                <p><span>Dias de Treino P/semana:</span> {projeto.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.projeto_info}>
                                <ProjetoForm 
                                handleSubmit={editPost} 
                                btnText="Concluir Edição"
                                projectData={projeto}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um Treino:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar Treino' : 'Fechar'}
                        </button>
                        <div className={styles.projeto_info}>
                            {showServiceForm && (
                                <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar Treino"
                                projetoData={projeto}/>
                            )}
                        </div>
                    </div>
                    <h2>Treinos</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}/>
                            ))
                        }
                        {services.length === 0 && <p>Não há Treinos cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading/>
        )}
        </>
    )
}

export default Projeto;
