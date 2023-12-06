import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../Components/Main/Main";
import Title from "../../Components/Titulo/Titulo";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api, {
  eventsResourse,
  myEventsResourse,
  presencesEventResource
} from "../../Services/Service";

import "./EventosAluno.css";
import { UserContext } from "../../context/AuthContext";
import userEvent from "@testing-library/user-event";

const EventosAlunoPage = () => {
  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  async function loadEventsType() {
    // setShowSpinner(true);

    if (tipoEvento === "1") {
      try {
        const todosEventos = await api.get(eventsResourse);
      const meusEventos = await api.get(
        `${myEventsResourse}/${userData.userId}`
      )
      const eventosMarcados = verificaPresenca(todosEventos.data,meusEventos.data);
      setEventos(eventosMarcados)
      console.clear();
      console.log("TODOS OS EVENTOS");
      console.log(todosEventos.data);
      console.log("MEUS EVENTOS")
      console.log(meusEventos);
      console.log("EVENTOS MARCADOS")
      console.log(eventosMarcados)
      } catch (error) {
        console.log("Erro na API");
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      try {
        const retornoEventos = await api.get(
          `${myEventsResourse}/${userData.userId}`
        );

        const arrEventos = [];

        retornoEventos.data.forEach((e) => {
          arrEventos.push({...e.eventos,situacao:e.situacao});
        });

        setEventos(arrEventos);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEventos([]);
    }

    // setShowSpinner(false);
  }

  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);
      // setEventos([]); //zera o array de eventos
      if (tipoEvento === "1") {
        //todos os eventos (Evento)
        try {
          const todosEventos = await api.get(eventsResourse);
          const meusEventos = await api.get(`${myEventsResourse}/${userData.userId}`)

          const eventosMarcados = verificaPresenca(todosEventos.data,meusEventos.data)

          console.clear();
          console.log("TODOS OS EVENTOS")
          console.log(todosEventos.data)
          console.log("MEUS EVENTOS")
          console.log(meusEventos.data)
          console.log("EVENTOS  MARCADOS")
          console.log(eventosMarcados);


          setEventos(eventosMarcados)

        } catch (error) {
          //colocar o notification
          console.log("Erro na API");
          console.log(error);
        }
      } else if (tipoEvento === "2") {
        /**
         * Lista os meus eventos (PresencasEventos) 
         * retorna um formato diferente de array
         */
        try {
          const retornoEventos = await api.get(
            `${myEventsResourse}/${userData.userId}`
          );
          console.clear()
          console.log("MINHAS PRESENÇAS");
          console.log(retornoEventos.data);

            const arrEventos = [];//array vazio
            
            retornoEventos.data.forEach( e => {
              arrEventos.push(e.evento); 
            });

            // console.log(arrEventos);
          setEventos(arrEventos);
        } catch (error) {
          //colocar o notification
          console.log("Erro na API");
          console.log(error);
        }
      } else {
        setEventos([]);
      }
      setShowSpinner(false);
    }

    loadEventsType();
  }, [tipoEvento]); //userData.userId

  

  const verificaPresenca = (arrAllEvents, eventsUser) => {
      for (let x = 0; x < arrAllEvents.length; x++) {//para cada evento principal
        for (let i = 0; i < eventsUser.length; i++) {//procurar a correspondência em minhas presenças
          if(arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
            arrAllEvents[x].situacao = true;
            arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento; //PRECISA DE UMA PRESENÇA PARA DESCONECTAR DE UMA PRESENÇA 
            break;//paro de procurar para o evento principal atual
          }
        }
      }
      return(arrAllEvents)
  }
 


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  // async function loadMyComentary(idComentary) {
  //   return "????";
  // }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId,whatTheFunction,presencaId = null) {
  if (whatTheFunction === "connect"){

    // {

    //   "situacao": true,
    //   "idUsuario": "7032a779-bcbb-4c9c-a651-1fcf90eae853",
    //   "idEvento": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    // }

    try {
      const promise = await api.post(presencesEventResource,{
        situacao:true,
        idUsuario : userData.userId,
        idEvento:eventId
      })
      if (promise.status === 201) {
        alert("Presença confirmada, parabéns")
      }

    } catch (error) {
      
    }

    try {
      const unconnected = await api.delete(`${presencesEventResource}/${presencaId}`);
      if (unconnected.status === 204){
        const todosEventos = await api.get(eventsResourse);
        setEventos(todosEventos.data)
      }

    } catch (error) {
      
    }

    alert("CONECTAR AO EVENTO" + eventId);
    return
  }
  alert("DESCONECTAR EVENTO " + eventId)
  }
  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
