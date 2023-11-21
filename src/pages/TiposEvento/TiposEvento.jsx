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
import Spinner from "../../Components/Spinner/Spinner"
// import eventImage  from '../../assets/icons/tipo-evento.svg'
// import dafaultImage from '../../assets/images/default-image.jpeg'
import "./TiposEvento.css";
const TiposEvento = () => {
  const [frmEdit, setNextEvents] = useState(false); //está em modo de edição
  const [titulo, setTitulo] = useState("");
  const [idTipoEvento,setIdTipoEvento]=useState(null)
  const [tipoEventos, setTipoEventos] = useState([]);
  const [showSpinner,setShowSpinner]=useState(false)

  useEffect(()=>{
   async function loadEventsType(){

  setShowSpinner(true)

      try {
        const retorno = await api.get(eventsTypeResource)
        setTipoEventos(retorno.data)
        
      } 
      
      catch (error) {
        console.log("Erro na api")
        console.log(error);

      }

  setShowSpinner(false)
        
    }
    loadEventsType();
  },[]);


  
  
  

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {  setNotifyUser({
      titleNote:"Aviso",
      textNote:`O título dee ter pelo menos 3 caracteres`,
      imgIcon:"warning",
      imgAlt:
      "Imagem de ilustração de aviso.Moça em frente a um símbolo de exclamação",
      showMessage:true   
      
    });
    
    }


    setShowSpinner(true)
    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      setTitulo("");

      setNotifyUser({
        titleNote:"Sucesso",
        textNote:`Tipo de evento Cadastrado`,
        imgIcon:"success",
        imgAlt:
        "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
        showMessage:true   
    
      });

      const buscaEventos = await api.get(eventsTypeResource) //Retorno do array

      setTipoEventos(buscaEventos.data)

    } catch (e) {
      setNotifyUser({
        titleNote:"Erro",
        textNote:`Deu ruim no submit`,
        imgIcon:"Danger",
        imgAlt:
        "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
        showMessage:true   
    
      });
    }
    setShowSpinner(false)
  }
  
  async function handleUpdate(e) {

    e.preventDefault()

    setShowSpinner(true)
    try {
      //atualizar na api
      const edit= await api.put(eventsTypeResource+'/'+idTipoEvento,{titulo:titulo})

      if (edit.status===204) {

        setTitulo("");
        setIdTipoEvento(null)
        setNotifyUser({
          titleNote:"Sucesso",
          textNote:`Tipo de evento Atualizado`,
          imgIcon:"success",
          imgAlt:
          "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
          showMessage:true   
      
        });
            //DESAFIO: fazer uma função para retirar o registro apagado do array tipoEventos
    const retorno = await api.get(eventsTypeResource) //Retorno do array
    setTipoEventos(retorno.data)

    editActionAbort();
        
      }
      
    } catch (error) {
      setNotifyUser({
        titleNote:"Erro",
        textNote:`Erro na operação.Por favor verifique sua conexão`,
        imgIcon:"danger",
        imgAlt:
        "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
        showMessage:true   
    
      });
    }
    
    setShowSpinner(false)

  }

// cancela a tela de ação de edição
 function editActionAbort(){
  setNextEvents(false)
  setTitulo("")//reseta variáveis
  setIdTipoEvento(null)//reseta variáveis
 }

// Mostra o formulário de edição 
 async function showUpdateForm(idElement){
    setIdTipoEvento(idElement) //Preeenche o id do evento para poder atualizar
    setNextEvents(true)
    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo)
    } catch (error) {
      
    }

 }

 //Apaga o tipo de evento na api
 async function handleDelete(idElement){
  
  if (!window.confirm("Confirma sua exclusão ?")) {
    return
  }
  setShowSpinner(true)
try {

    const retorno = await api.delete(`${eventsTypeResource}/${idElement}`);


  if (retorno.status === 204) {
    setNotifyUser({
      titleNote:"Sucesso",
      textNote:`Cadastro excluído com sucesso`,
      imgIcon:"sucess",
      imgAlt:
      "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
      showMessage:true   
  
    });
    
    //DESAFIO: fazer uma função para retirar o registro apagado do array tipoEventos
    const retorno = await api.get(eventsTypeResource) //Retorno do array

    setTipoEventos(retorno.data)
    
  }
} 
  catch (error) {
    setNotifyUser({
      titleNote:"Erro",
      textNote:`Erro na exclusão do cadastro`,
      imgIcon:"danger",
      imgAlt:
      "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
      showMessage:true   
  
    });
}

setShowSpinner(false)

 }

const[notifyUser,setNotifyUser]= useState([]) 

  return (
    <>
    {<Notification{...notifyUser}setNotifyUser={setNotifyUser}/>}

    {showSpinner ? <Spinner/>:null}
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
