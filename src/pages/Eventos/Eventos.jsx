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
  const [eventos, setEventos] = useState([]);
  const [nomeEvento, setNomeEvento] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [notifyUser, setNotifyUser] = useState([]);
  const [frmEdit, setFrmEdit] = useState(false); //está em modo de edição
  const [frmEditData,setFrmEditData]= useState({})
  const idInstituicao = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  async function loadEventsType() {
    // setShowSpinner(true);

    try {
      const retorno = await api.get(eventsTypeResource);
      const dados = retorno.data.map((tipo) => {
        return { value: tipo.idTipoEvento, text: tipo.titulo };
      });
      setTipoEventos(dados);
      console.log(retorno.data);
    } catch (error) {
      console.log("Erro na api");
      console.log(error);
    }

    // setShowSpinner(false);
  }

  //Chamada das funcoes da que chamam os dados da api
  useEffect(() => {
    loadEventsType();
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const retorno = await api.get(eventsResourse);
      setEventos(retorno.data);
    } catch (erro) {
      console.log("Erro na api");
      console.log(erro);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const retorno = await api.post(eventsResourse, {
        nomeEvento,
        descricao,
        idTipoEvento,
        dataEvento,
        idInstituicao,
      });
      setNomeEvento("");
      setDescricao("");
      setDataEvento("");

      loadEvents(); //Refaz o get dos dados da api

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Evento Cadastrado`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso.Moça segurando um balão com simbolo de confirmação ok",
        showMessage: true,
      });
    } catch (error) {
      console.log({
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
      });
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Deu ruim no submit`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro.Rapaz segurando um balão com simbolo x",
        showMessage: true,
      });
    }
  }

  async function showUpdateForm() {
    setFrmEdit(true);
  }

  async function handleUpdate() {
    try {
      const edit = await api.put(`${eventsResourse}/${idTipoEvento}`);
    } catch (error) {}
    return;
  }


  async function editActionAbort(){
    setFrmEdit(false)
    setNomeEvento("");
    setDescricao("");
    setDataEvento("");
    setIdTipoEvento("")

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
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Main>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro de Eventos"} />

              <ImageIlustrator imageRender={eventImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  <>
                    <Input
                      id="NomeEvento"
                      placeholder="Nome"
                      name="nomeEvento"
                      type="text"
                      required="required"
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />

                    <Input
                      id="descricao"
                      placeholder="Descrição"
                      name="descricao"
                      type="text"
                      required="required"
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Select
                      id="TiposEvento"
                      name={"tiposEvento"}
                      required={"required"}
                      options={tipoEventos}
                      value={idTipoEvento}
                      manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
                    />

                    <Input
                      id="dataEvento"
                      placeholder="Data"
                      name="data"
                      type="date"
                      required="required"
                      value={dataEvento}
                      manipulationFunction={(e) => {
                        setDataEvento(e.target.value);
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
                      id="NomeEvento"
                      placeholder="Nome"
                      name="nomeEvento"
                      type="text"
                      required="required"
                      value={frmEdit.nomeEvento}
                      manipulationFunction={(e) => {setFrmEditData({
                        ...setFrmEditData,nomeEvento:e.target.value});
                      }}
                    />

                    <Input
                      id="descricao"
                      placeholder="Descrição"
                      name="descricao"
                      type="text"
                      required="required"
                      value={frmEdit.descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Select
                      id="TiposEvento"
                      name={"tiposEvento"}
                      required={"required"}
                      options={tipoEventos}
                      value={frmEdit.idTipoEvento}
                      manipulationFunction={(e) => {setFrmEditData({
                        ...setFrmEditData,tipoEventos:e.target.value});
                      }}
                    />

                    <Input
                      id="dataEvento"
                      placeholder="Data"
                      name="data"
                      type="date"
                      required="required"
                      value={new Date(frmEdit.dataEvento).toLocaleDateString(
                        "sv-SE"
                      )}
                      manipulationFunction={(e) => {setFrmEditData({
                        ...setFrmEditData,dataEvento:e.target.value});
                      }}
                    />

                    <Button
                      textButton="Atualizar"
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
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista de Eventos"} color="white" />

            <TableEv 
              dados={eventos} 
              fnDelete={handleDelete}
              fnUpdate={showUpdateForm} 
            />
          </Container>
        </section>
      </Main>
    </>
  );
};

export default Eventos;
