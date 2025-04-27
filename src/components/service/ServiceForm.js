import { useState } from 'react'

import Input from '../form/Input';
import BotaoSubmit from '../form/BotaoSubmit';

import styles from '../project/ProjetoForm.module.css'

function ServiceForm({ handleSubmit, btnText, projetoData }) {

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projetoData.services.push(service)
        handleSubmit(projetoData)
    }

    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text"
            text="Nome do Treino"
            name="name"
            placeholder="Insira o nome do treino"
            handleOnChange={handleChange}/>
            <Input 
            type="number"
            text="Quantos dias você repete esse Treino por Semana"
            name="cost"
            placeholder="Insira a quantidade de dias que você repete o treino P/dia"
            handleOnChange={handleChange}/>
            <Input 
            type="text"
            text="Escreva os Exercícios"
            name="description"
            placeholder="Escreva todos os exercícios do seu treino"
            handleOnChange={handleChange}/>
            <BotaoSubmit text={btnText}/>
        </form>
    )
}

export default ServiceForm;