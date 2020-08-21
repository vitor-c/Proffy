import React , {useState, FormEvent}from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningImg from '../../assets/images/icons/warning.svg'
import { useHistory } from 'react-router-dom'
import './styles.css'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'

const TeacherForm:React.FC = () => {
    const [name , setName] = useState('')
    const [avatar , setAvatar] = useState('')
    const [whatsapp , setWhatsapp] = useState('')
    const [bio , setBio] = useState('')
    const [subject , setSubject] = useState('')
    const [cost , setCost] = useState('')

    const history = useHistory()

    const [scheduleItems , setScheduleItems] = useState([{ week_day: 0 , from:"" , to: ""}])

    const addNewscheduleItem = () => {
        setScheduleItems([...scheduleItems , { week_day: 0 , from:"" , to: ""}])
    }

    const handleCreateClass = (e: FormEvent)=>{
        e.preventDefault()
        
        api.post('classes' , {
            name , 
            avatar , 
            whatsapp , 
            bio , 
            subject , 
            cost:Number(cost) , 
            schedule: scheduleItems})
                .then(() => { alert('cadastro realizado com sucesso')
                    history.push('/')
                    })
                .catch(()=>{ alert('Ocorreu um erro inesperado')})

    }

    const setScheduleItemValue = ( position: number , field: string, value: string )=>{
        const updatedScheduleItems = scheduleItems.map(( scheduleItem , index )=>{
            if (index === position) {
                return { ...scheduleItem , [ field]: value}
            }
            return scheduleItem
        } )
        setScheduleItems(updatedScheduleItems)
    }


    return (
        <div id="page-teacher-form" className="container">
        <PageHeader title="Que incrível que você quer dar aulas."
            description="O primeirio passo é preencher esse formulário de inscrição"
        />
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend> Seus dados</legend>
                    <Input 
                        name="name" 
                        label="Nome completo"  
                        value={name} 
                        onChange={(e)=> { setName(e.target.value)}}/>
                    <Input 
                        name="avatar" 
                        label="Avatar"
                        value={avatar} 
                        onChange={(e)=> { setAvatar(e.target.value)}}/>
                    <Input 
                        name="whatsapp" 
                        label="Whatsapp"
                        value={whatsapp} 
                        onChange={(e)=> { setWhatsapp(e.target.value)}}/>
                        
                    <Textarea 
                        name="bio" 
                        label="Biografia"
                        value={bio} 
                        onChange={(e)=> { setBio(e.target.value)}}/>
                        
                </fieldset>
            

                <fieldset>
                    <legend> Sobre a aula</legend>
                    <Select 
                    name="subject"
                    label="Matéria" 
                    value={subject}
                    onChange={(e)=>{setSubject(e.target.value)}}
                    options={[
                        {value: 'Artes' , label: 'Artes '},
                        {value: 'Biologia' , label: 'Biologia '},
                        {value: 'Física' , label: 'Física'},
                        {value: 'Matemática' , label: 'Matemática '},
                        {value: 'Português' , label: 'Português '},
                        {value: 'ED Física' , label: 'ED Física '},
                        {value: 'Filosofia' , label: 'Filosofia '},
                        {value: 'Geografia' , label: 'Geografia '},
                        {value: 'História' , label: 'História '},
                        {value: 'Química' , label: 'Química '},
                    ]}/>
                    <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e)=>{setCost(e.target.value)}}/>
                        
                </fieldset>

                <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewscheduleItem}>
                            + Novo horário
                        </button>
                        </legend>
                        
                        {scheduleItems.map((item , index) =>{
                            return(
                            <div  key={item.week_day} className="schedule-item">
                                <Select 
                                name="week_day"
                                label="Dia da semana" 
                                value={item.week_day}
                                onChange={ e => setScheduleItemValue(index , 'week_day',e.target.value)}
                                options={[
                                    {value: '0' , label: 'Domingo'},
                                    {value: '1' , label: 'Segunda-feira'},
                                    {value: '2' , label: 'Terça-feira'},
                                    {value: '3' , label: 'Quarta-feira'},
                                    {value: '4' , label: 'Quinta-feira'},
                                    {value: '5' , label: 'Sexta-feira'},
                                    {value: '6' , label: 'Sábado'},
                                ]}/>
                                <Input 
                                    type="time" 
                                    name="from" 
                                    label="Das"
                                    value={item.from}
                                    onChange={ e => setScheduleItemValue(index , 'from',e.target.value)}
                                    />
                                <Input 
                                    type="time" 
                                    name="to" 
                                    label="Até"
                                    value={item.to}
                                    onChange={ e => setScheduleItemValue(index , 'to',e.target.value)}
                                    />
                        </div>)
                    })}  
                </fieldset>

                <footer>
                    <p>
                        <img src={warningImg} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        salvar cadasdtro
                    </button>
                </footer>
            </form>
        </main>
    </div>
    )
}

export default TeacherForm