import { useEffect, useState } from 'react'

import BotaoSubmit from '../form/BotaoSubmit';
import Input from '../form/Input';
import Select from '../form/Select';

import styles from './ProjetoForm.module.css'

function ProjetoForm({ handleSubmit, btnText, projectData }){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories",{
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((error) => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e){
        setProject({ ...project, 
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text"
            text="Nome do Projeto"
            name="name"
            placeholder="Insira o Nome do Projeto"
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}/>
            <Input 
            type="number"
            text="Total de Dias do Projeto"
            name="horas"
            placeholder="Insira o total de dias do seu Projeto"
            handleOnChange={handleChange}
            value={project.horas ? project.horas : ''}/>
            <Select 
            name="categoria_id" 
            text="Selecione a categoria" 
            options={categories} 
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}/>
            <BotaoSubmit text={btnText} />
        </form>
    )
}

export default ProjetoForm;
