import React from "react";
import editPen from "../../../assets/icons/edit-pen.svg";
import trashDelete from "../../../assets/icons/trash-delete.svg";
import "./TableEv.css";

const TableEv = ({ dados, fnDelete = null, fnUpdate = null }) => {
  return (
    <table className="table-data">
      {/* Cabecalho */}
      <thead className="table-data__head">
      <tr className="table-data__head-row">
              <th className="table-data__head-title table-data__head-title--big">
                Nome
              </th>
              <th className="table-data__head-title table-data__head-title--big">
                Descrição
              </th>
              <th className="table-data__head-title table-data__head-title--big">
                Tipo do Evento
              </th>
              <th className="table-data__head-title table-data__head-title--big">
               Instituição
              </th>
              <th className="table-data__head-title table-data__head-title--big">
               Data
              </th>
              <th className="table-data__head-title table-data__head-title--little">
              Editar
              </th>
              <th className="table-data__head-title table-data__head-title--little">
                Deletar
              </th>
            </tr>
      </thead>

      <tbody>
        {dados.map((ev) => {
          return (
            <tr className="table-data__head-row">

            <td className="table-data__data table-data__data--big">
            {ev.nomeEvento}
            </td>

            <td className="table-data__data table-data__data--big">
            {ev.descricao}
            </td>

            <td className="table-data__data table-data__data--big">
            {ev.dataEvento}
            </td>
            
            
  
            <td className="table-data__data table-data__data--little">
              <img 
              idEvento={ev.idEvento}
               className="table-data__icon"
               src={editPen} 
               alt="" 
              onClick={(e)=>{
                fnUpdate(ev.idEvento)
              }}
              />
            </td>
  
            <td className="table-data__data table-data__data--little" 
            
            
            >
              <img 
              idEvento={ev.idEvento}
              className="table-data__icon" 
              src={trashDelete} 
              alt=""
              onClick={(e)=>{
                fnDelete(ev.idEvento)
              }} />
              
            </td>
          </tr>

          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
