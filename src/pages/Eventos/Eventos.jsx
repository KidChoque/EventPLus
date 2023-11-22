import React from "react";
import Titulo from "../../Components/Titulo/Titulo";
import Main from "../../Components/Main/Main";
import Container from "../../Components/Container/Container";
import ImageIlustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import eventImage from "../../assets/icons/evento.svg";
import {
  Button,
  Input,
  Select,
} from "../../Components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTp from "../TiposEvento/TableTp/TableTp";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";
import "./Eventos.css";

const Eventos = () => {
  // const [eventos, setEventos] = useState([]);
  // const [frmEdit, setNextEvents] = useState(false); //está em modo de edição
  // const [nomeEvento, setNomeEvento] = useState("");
  // const [idEvento,setIdEvento]=useState(null)
  // const [showSpinner,setShowSpinner]=useState(false)

  // useEffect(()=>{
  //   async function loadEventsType(){

  //  setShowSpinner(true)

  //      try {
  //        const retorno = await api.get(eventsTypeResource)
  //        setEventos(retorno.data)

  //      }

  //      catch (error) {
  //        console.log("Erro na api")
  //        console.log(error);

  //      }

  //  setShowSpinner(false)

  //    }
  //    loadEventsType();
  //  },[]);

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (nomeEvento.trim().length < 3) {  setNotifyUser({
  //     titleNote:"Aviso",
  //     textNote:`O título dee ter pelo menos 3 caracteres`,
  //     imgIcon:"warning",
  //     imgAlt:
  //     "Imagem de ilustração de aviso.Moça em frente a um símbolo de exclamação",
  //     showMessage:true

  //   });

  //   }

  //     setShowSpinner(true)
  //     try {
  //       const retorno = await api.post(eventsTypeResource, {
  //         nomeEvento: nomeEvento,
  //       });
  //       setNomeEvento("");

  //       setNotifyUser({
  //         titleNote:"Sucesso",
  //         textNote:`Evento Cadastrado`,
  //         imgIcon:"success",
  //         imgAlt:
  //         "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
  //         showMessage:true

  //       });

  //       const buscaEventos = await api.get(eventsTypeResource) //Retorno do array

  //       setEventos(buscaEventos.data)

  //     } catch (e) {
  //       setNotifyUser({
  //         titleNote:"Erro",
  //         textNote:`Deu ruim no submit`,
  //         imgIcon:"Danger",
  //         imgAlt:
  //         "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
  //         showMessage:true

  //       });
  //     }
  //     setShowSpinner(false)
  //   }

  //   async function handleUpdate(e) {

  //     e.preventDefault()

  //     setShowSpinner(true)
  //     try {
  //       //atualizar na api
  //       const edit= await api.put(eventsTypeResource+'/'+idEvento,{nomeEvento:nomeEvento})

  //       if (edit.status===204) {

  //         setNomeEvento("");
  //         setIdEvento(null)
  //         setNotifyUser({
  //           titleNote:"Sucesso",
  //           textNote:`Evento Atualizado`,
  //           imgIcon:"success",
  //           imgAlt:
  //           "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
  //           showMessage:true

  //         });
  //             //DESAFIO: fazer uma função para retirar o registro apagado do array eventos
  //     const retorno = await api.get(eventsTypeResource) //Retorno do array
  //     setEventos(retorno.data)

  //     editActionAbort();

  //       }

  //     } catch (error) {
  //       setNotifyUser({
  //         titleNote:"Erro",
  //         textNote:`Erro na operação.Por favor verifique sua conexão`,
  //         imgIcon:"danger",
  //         imgAlt:
  //         "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
  //         showMessage:true

  //       });
  //     }

  //     setShowSpinner(false)

  //   }

  //   // cancela a tela de ação de edição
  //  function editActionAbort(){
  //     setNextEvents(false)
  //     setNomeEvento("")//reseta variáveis
  //     setIdEvento(null)//reseta variáveis
  //    }

  //   // Mostra o formulário de edição
  //    async function showUpdateForm(idElement){
  //       setIdEvento(idElement) //Preeenche o id do evento para poder atualizar
  //       setNextEvents(true)
  //       try {
  //         const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
  //         setNomeEvento(retorno.data.nomeEvento)
  //       } catch (error) {

  //       }

  //    }

  //    //Apaga o tipo de evento na api
  //    async function handleDelete(idElement){

  //     if (!window.confirm("Confirma sua exclusão ?")) {
  //       return
  //     }
  //     setShowSpinner(true)
  //   try {

  //       const retorno = await api.delete(`${eventsTypeResource}/${idElement}`);

  //     if (retorno.status === 204) {
  //       setNotifyUser({
  //         titleNote:"Sucesso",
  //         textNote:`Cadastro excluído com sucesso`,
  //         imgIcon:"sucess",
  //         imgAlt:
  //         "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
  //         showMessage:true

  //       });

  //       //DESAFIO: fazer uma função para retirar o registro apagado do array eventos
  //       const retorno = await api.get(eventsTypeResource) //Retorno do array

  //       setEventos(retorno.data)

  //     }
  //   }
  //     catch (error) {
  //       setNotifyUser({
  //         titleNote:"Erro",
  //         textNote:`Erro na exclusão do cadastro`,
  //         imgIcon:"danger",
  //         imgAlt:
  //         "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
  //         showMessage:true

  //       });
  //   }

  //   setShowSpinner(false)

  //    }

  //   const[notifyUser,setNotifyUser]= useState([])

  return (
    <>
      <Main>
        <section classname="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro de Eventos"} />

              <ImageIlustrator imageRender={eventImage} />

              <form action="" className="ftipo-evento">
                <Input
                  id="NomeEvento"
                  placeholder="Nome"
                  name="nomeEvento"
                  type="text"
                  required="required"
                  // value={nomeEvento}
                  // manipulationFunction={(e) => {
                  //   // setTitulo(e.target.value);
                  // }}
                />

                <Input
                  id="Descricao"
                  placeholder="Descrição"
                  name="descricao"
                  type="text"
                  required="required"
                  // value={nomeEvento}
                  // manipulationFunction={(e) => {
                  //   // setTitulo(e.target.value);
                  // }}
                />
                <Input
                  id="Descricao"
                  placeholder="Descrição"
                  name="descricao"
                  type="date"
                  required="required"
                  // value={nomeEvento}
                  // manipulationFunction={(e) => {
                  //   // setTitulo(e.target.value);
                  // }}
                />

                {/* <Select
                /> */}

                <Button
                  textButton="Cadastrar"
                  id="cadastrar"
                  name="cadastrar"
                  type="submit"
                />
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Titulo className={"Lista de Eventos"} color="blue" />

          </Container>
        </section>
      </Main>
    </>
  );
};

export default Eventos;
