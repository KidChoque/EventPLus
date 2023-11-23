import React, { useEffect, useState } from "react";
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
import api, {
  eventsResourse,
  eventsTypeResource,
} from "../../Services/Service";
import TableEv from "./TableEv/TableEv";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner";
import "./Eventos.css";

const Eventos = () => {
  // const idInstituicao = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  const [eventos, setEventos] = useState([]);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState(null);

  useEffect(() => {
    async function loadEventsType() {
      // setShowSpinner(true);

      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }

      // setShowSpinner(false);
    }
    loadEventsType();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        const retorno = await api.get(eventsResourse);
        setEventos(retorno.data);
      } catch (erro) {
        console.log("Erro na api");
        console.log(erro);
      }
    }
    loadEvents();
  });

  async function handleSubmit(e){
    e.preventdefatult();

    
  }

  async function handleDelete(idElement) {
    if (window.confirm("Confirma a exclusão")) {
      try {
        const promise = await api.delete(`${eventsResourse}/${idElement}`, {
          idElement,
        });
        if (promise.status == 204) {
          const buscaEventos = await api.get(eventsResourse);
          setEventos(buscaEventos.data);
        }
      } catch (error) {
        alert("erro");
      }
    }
  }

  function tituloTipo(tipoEventos) {
    let arrayOptions = [];

    tipoEventos.forEach((element) => {
      arrayOptions.push({ value: element.IdTipoEvento, text: element.titulo });
    });
    return arrayOptions;
  }

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
                  //   // setNomeEvento(e.target.value);
                  // }}
                />


                

               
                <Select
                  id="TiposEvento"
                  name={"tiposEvento"}
                  required={"required"}
                  options={tituloTipo(tipoEventos)}
                />

                <Input
                  id="Data"
                  placeholder="Data"
                  name="data"
                  type="date"
                  required="required"
                  // value={descricao}
                  // manipulationFunction={(e) => {
                  //   // setDescricao(e.target.value);
                  // }}
                />

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
            <Titulo titleText={"Lista de Eventos"} color="white" />

            <TableEv dados={eventos} fnDelete={handleDelete} />
          </Container>
        </section>
      </Main>
    </>
  );
};

export default Eventos;
