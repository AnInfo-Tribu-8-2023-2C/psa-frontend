import React from "react";
import { useEffect, useState } from "react";
import styles from "@/components/ticket.module.css";
import {
  Cliente,
  EstadoTarea,
  Tarea,
  TicketDeProducto,
  Usuario,
} from "@/types/types";
import { useRouter } from "next/router";
import TicketModal from "@/components/TicketModal";
import { axiosInstance } from "@/api/axios";
import TareaModal from "@/components/TareaModal";

const Ticket = () => {
  const router = useRouter();
  const ticketId = router.query.ticketId as string;
  const versionId = router.query.versionId as string;
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [ticket, setTicket] = useState<TicketDeProducto>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [tareaModal, setTareaModal] = useState(false);

  const fetchClients = () => {
    fetch(
      "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientes(data);
      });
  };

  const fetchUsuarios = () => {
    fetch(
      "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Usuarios data: ", data);
        setUsuarios(data);
      });
  };

  const loadProyects = () => {
    axiosInstance
      .get(`https://psa-backend-projectos.onrender.com/proyectos`)
      .then((response) => {
        // Handle the response
        console.log("Proyects data: ", response.data);
        setProyectos(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  const getTasksByIds = (ids: number[]) => {
    const tasks: any[] = [];
    ids.map((id) => {
      axiosInstance
        .get(`https://psa-backend-projectos.onrender.com/tarea/${id}`)
        .then((response) => {
          // Handle the response
          if (response.data) {
            tasks.push(response.data);
          } else {
            console.log("No se encontró tarea con id: ", id);
            tasks.push(null);
          }
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    });
    return tasks;
  };

  const loadTicket = () => {
    axiosInstance
      .get(`/tickets/${ticketId}`)
      .then(async (response) => {
        const tasksIds = response.data.listLinkedTasks as number[];
        const tareas: Tarea[] = await getTasksByIds(tasksIds);
        console.log("Tareas de ticket", tareas);
        setTicket({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          state: response.data.state,
          severity: response.data.severity,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          client: response.data.client,
          tasks: tareas,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStyleByState = (state: EstadoTarea) => {
    switch (state) {
      case EstadoTarea.EN_PROCESO:
        return styles.enProceso;
      case EstadoTarea.FINALIZADO:
        return styles.finalizado;
      case EstadoTarea.BLOQUEADO:
        return styles.bloqueado;
      case EstadoTarea.NO_INICIADO:
        return styles.noIniciado;
      default:
        return styles.noIniciado;
    }
  };

  useEffect(() => {
    fetchUsuarios();
    loadProyects();
    loadTicket();
    fetchClients();
  }, [ticketId, modal, tareaModal]);

  return (
    <div
      className={styles.tableDataContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "2rem",
        overflow: "auto",
        backgroundColor: "white",
      }}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">
          {"Ticket #" + ticketId}
        </h1>
      </div>
      <div className={styles.ticketDataContainer}>
        <div style={{ display: "flex" }}>
          <div className={styles.ticketDataItem}>
            <h2 className={styles.ticketDataTitle}>Title:</h2>
            <p className={styles.ticketDataValue}>{ticket?.title}</p>
          </div>
          <div className={styles.ticketDataItem}>
            <h2 className={styles.ticketDataTitle}>Reportado por:</h2>
            <p className={styles.ticketDataValue}>{ticket?.client}</p>
          </div>
        </div>

        <div className={styles.ticketDataItem}>
          <h2 className={styles.ticketDataTitle}>Descripción:</h2>
          <p className={styles.ticketDataValue}>{ticket?.description}</p>
        </div>

        <div className={styles.ticketDataItem}>
          <h2 className={styles.ticketDataTitle}>Estado:</h2>
          <p className={styles.ticketDataValue}>{ticket?.state}</p>
        </div>

        <div className={styles.ticketDataItem}>
          <h2 className={styles.ticketDataTitle}>Severidad:</h2>
          <p className={styles.ticketDataValue}>{ticket?.severity}</p>
        </div>

        <div className={styles.ticketDataItem}>
          <h2 className={styles.ticketDataTitle}>Tareas asociadas:</h2>
          <ul className={styles.ticketDataListValue}>
            {ticket && ticket.tasks &&
              ticket.tasks.map(
                (task) =>
                  task && (
                    <li
                      className={`${styles.taskItem} ${getStyleByState(
                        task.estado
                      )}`}
                      key={task.id}
                    >{`${task.nombre} - `} <span style={{fontWeight: "500", marginLeft: "5px"}}>{task.estado}</span></li>
                  )
              )}
          </ul>
        </div>

        <div style={{ display: "flex" }}>
          <div className={styles.ticketDataItem}>
            <h2 className={styles.ticketDataTitle}>Fecha de creación:</h2>
            <p className={styles.ticketDataValue}>
              {new Date(ticket?.createdAt ?? "").toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>

          <div className={styles.ticketDataItem}>
            <h2 className={styles.ticketDataTitle}>Fecha de modificación:</h2>
            <p className={styles.ticketDataValue}>
              {new Date(ticket?.updatedAt ?? "").toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "auto", gap: "1rem" }}>
        <button className={styles.saveButton} onClick={() => setModal(true)}>
          Edit Ticket
        </button>

        <button
          className={styles.saveButton}
          onClick={() => setTareaModal(true)}
        >
          Asociar nueva tarea
        </button>
      </div>
      <TicketModal
        isOpen={modal}
        onClose={() => setModal(false)}
        productVersionId={versionId}
        clientes={clientes}
        tasks={ticket?.tasks as any[]}
        edit={true}
        ticket={ticket}
      />
      <TareaModal
        isOpen={tareaModal}
        onClose={() => setTareaModal(false)}
        usuarios={usuarios}
        proyectos={proyectos}
        ticket={ticket}
        productVersionId={versionId}
      />
    </div>
  );
};

export default Ticket;
