import React, { useEffect, useState } from "react";
import Titulo from "../../Components/Titulo/Titulo";
import Main from "../../Components/Main/Main";
import Container from "../../Components/Container/Container";
import ImageIlustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import typeEventImage from "../../assets/icons/tipo-evento.svg";
import { Button, Input } from "../../Components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTp from "../TiposEvento/TableTp/TableTp";
import Notification from "../../Components/Notification/Notification";
// import eventImage  from '../../assets/icons/tipo-evento.svg'
// import dafaultImage from '../../assets/images/default-image.jpeg'
import "./TiposEvento.css";
const TiposEvento = () => {
  const [frmEdit, setNextEvents] = useState(false); //está em modo de edição
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);

  useEffect(()=>{
   async function loadEventsType(){

      try {
        const retorno = await api.get(eventsTypeResource)
        setTipoEventos(retorno.data)
        
      } catch (error) {
        console.log("Erro na api")
        console.log(error);
      }
    }
    loadEventsType();
  },[]);


  
  
  

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("O título dee ter pelo menos 3 caracteres");
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      setTitulo("");
    } catch (e) {
      alert("Deu ruim no submit");
    }
  }
  
  async function handleUpdate(e) {
    e.preventDefault()
    const edit= await api.put(eventsTypeResource,{titulo:titulo})
    alert("Bora Editar");

  }

// cancela a tela de ação de edição
 function editActionAbort(){
  setNextEvents(false)
  setTitulo("")
 }

// Mostra o formulário de edição 
 async function showUpdateForm(idElement){

    setNextEvents(true)
    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo)
    } catch (error) {
      
    }

 }

 //Apaga o tipo de evento na api
 async function handleDelete(idElement){
  setNotifyUser({
    titleNote:"Sucesso",
    textNote:`Cadastro excluído com sucesso`,
    imgIcon:"sucess",
    imgAlt:
    "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
    showMessage:true   

  });
  if (!window.confirm("Confirma sua exclusão ?")) {
    return
  }
try {

    const retorno = await api.delete(`${eventsTypeResource}/${idElement}`);


  if (retorno.status === 204) {
    alert("Cadastro Deletado")
    
    //DESAFIO: fazer uma função para retirar o registro apagado do array tipoEventos
    const retorno = await api.get(eventsTypeResource) //Retorno do array

    setTipoEventos(retorno.data)
    
  }
} 
  catch (error) {
    alert("Problemas para deletar o cadastro")
}

  
 }

const[notifyUser,setNotifyUser]= useState([]) 

  return (
    <>
    {<Notification{...notifyUser}setNotifyUser={setNotifyUser}/>}
      <Main>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              {/* titulo */}
              <Titulo titleText={"Cadastro Tipo de Eventos"} />
              {/* imagem de ilustração */}
              {/* <ImageIlustrator imageRender={(ImageIlustrator.imageRender === '') ? dafaultImage : typeEventImage}/> */}
              <ImageIlustrator imageRender={typeEventImage} />
              <form
                action=""
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* Cadastrar ou editar? */}
                {
                  !frmEdit ? (
                    //Cadastrar
                    <>
                      <Input
                        id="Titulo"
                        placeholder="Título"
                        name="titulo"
                        type="text"
                        required="required"
                        value={titulo}
                        manipulationFunction={(e) => {
                          setTitulo(e.target.value);
                        }}
                      />

                      <Button
                        textButton="Cadastrar"
                        id="cadastrar"
                        name="cadastrar"
                        type="submit"
                      />
                    </>
                  ) : (

                 <>

                    <Input
                    id="Titulo"
                    placeholder="Título"
                    name="titulo"
                    type="text"
                    required="required"
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />

                  <div className="buttons-editbox">

                  <Button
                    textButton="Editar"
                    id="cadastrar"
                    name="cadastrar"
                    type="submit"
                    addClass="button-component--midle"
                  />


                   <Button
                    textButton="cancelar"
                    id="magica"
                    name="magica"
                    type="submit"
                    manipulationFunction={editActionAbort}
                    addClass="button-component--midle"

                  />

                  </div>

                  
                  </>
                  )
                  //Editar
                }
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          {/* Listagem de Eventos */}
          <Container>
            <Titulo titleText={"Lista Tipo de Eventos"} color="white" />

            <TableTp  
            
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
            
            />

          </Container>
        </section>
      </Main>
    </>
  );
};

export default TiposEvento;
