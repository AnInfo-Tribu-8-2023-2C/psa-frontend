import React from "react";
import { useEffect, useState } from "react";
import styles from "@/components/ticket.module.css";
import {
  Cliente,
  EstadoTicket,
  SeveridadTicket,
  TicketDeProducto,
} from "@/types/types";
import { useRouter } from "next/router";
import TicketModal from "@/components/TicketModal";
import { axiosInstance } from "@/api/axios";

const Ticket = () => {
  const router = useRouter();
  const ticketId = router.query.ticketId as string;
  const versionId = router.query.versionId as string;
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tasks, setTasks] = useState([]);
  const [ticket, setTicket] = useState<TicketDeProducto>();

  const fetchClients = () => {
    fetch(
      "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes",
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientes(data);
      });
  };

  const loadTicket = () => {
    axiosInstance
      .get(`/tickets/${ticketId}`)
      .then((response) => {
        console.log("Ticket data: ", response.data);
        setTicket({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          state: response.data.state,
          severity: response.data.severity,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          client: response.data.client,
          tasks: []
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //fetch de tasks asociados al ticket
  // const fetchTasks = () => {
  //   fetch(
  //     "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/tareas-psa/1.0.0/m/api/tareas"
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setTasks(data);
  //     });
  // }

  useEffect(() => {
    loadTicket();
    fetchClients();
    // fetchTasks();
  }, [ticketId]);

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
            {ticket?.tasks.map((task) => (
              <li key={task.id}>{task.nombre}</li>
            ))}
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
      <div style={{ display: "flex", marginTop: "auto" }}>
        <button className={styles.saveButton} onClick={() => setModal(true)}>
          Edit Ticket
        </button>
      </div>
      <TicketModal
        isOpen={modal}
        onClose={() => setModal(false)}
        productVersionId={versionId}
        clientes={clientes}
        tasks={tasks}
        edit={true}
        ticket={ticket}
      />
    </div>
  );
};

export default Ticket;
