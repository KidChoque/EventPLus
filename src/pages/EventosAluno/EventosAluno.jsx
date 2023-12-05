import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/Main/Main";
import Title from "../../Components/Titulo/Titulo";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api, {
  eventsResourse,
  eventsTypeResource,
  myEventsResourse,
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
        const retornoEventos = await api.get(eventsResourse);
        setEventos(retornoEventos.data);
        console.log(retornoEventos.data);
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

        retornoEventos.data.forEach(e => {
          arrEventos.push(e.eventos);
        });
        
        setEventos(arrEventos);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      setEventos([])
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
    loadEventsType();
  }, [tipoEvento]); 

  const verificaPresenca = (arrAllEvents,eventsUser) => {
    for(let x = 0; x < arrAllEvents.length; x++){
      for(let i = 0; i<userEvent.length,i++) {if (arrAllEvents[x].idEvento === userEvent[i].idEvento){
      arrAllEvents[x].situacao = true;
      break;
    }}
       {
        
      }
    }
  }


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
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
            value={tipoEvento}
            addClass="select-tp-evento"
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
