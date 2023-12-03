import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Cliente, TicketDeProducto } from "@/types/types";
import TicketGridRow from "@/components/TicketGridRow";
import TicketModal from "@/components/TicketModal";
import styles from "./versionTickets.module.css";

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function TicketsDeProducto() {
  const router = useRouter();
  const version = router.query.version as string;
  const productId = router.query.productId as string;
  const [list, setList] = useState<TicketDeProducto[]>([]);
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tasks, setTasks] = useState([]);

  const fetchClients = () => {
    fetch(
      "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setClientes(data);
      });
  };

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
    fetchClients();
    // fetchTasks();
  }, []);

  // useEffect(() => {
  //   setList([
  //     {
  //       id: "1",
  //       nombre: "Ticket 1",
  //       descripcion: "Descripción del ticket 1",
  //       estado: "Abierto",
  //       horasCalculadas: 10,
  //       fechaInicial: new Date("2021-08-01"),
  //       fechaModificacion: new Date("2021-08-03"),
  //     },
  //     {
  //       id: "2",
  //       nombre: "Ticket 2",
  //       descripcion: "Descripción del ticket 2",
  //       estado: "Abierto",
  //       horasCalculadas: 10,
  //       fechaInicial: new Date("2021-08-04"),
  //       fechaModificacion: new Date("2021-08-05"),
  //     },
  //     {
  //       id: "3",
  //       nombre: "Ticket 3",
  //       descripcion: "Descripción del ticket 3",
  //       estado: "Abierto",
  //       horasCalculadas: 10,
  //       fechaInicial: new Date("2021-09-05"),
  //       fechaModificacion: new Date("2021-09-09"),
  //     },
  //     {
  //       id: "4",
  //       nombre: "Ticket 4",
  //       descripcion: "Descripción del ticket 4",
  //       estado: "Abierto",
  //       horasCalculadas: 10,
  //       fechaInicial: new Date("2021-10-01"),
  //       fechaModificacion: new Date("2021-10-04"),
  //     },
  //   ]);
  // }, [version]);

  return (
    <div
      className={styles.tableDataContainer}
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   height: "100%",
      //   padding: "2rem",
      //   overflow: "auto",
      //   backgroundColor: "white",
      //   borderRadius: "20px",
      // }}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">
          {"Tickets de producto version " + version}
        </h1>
      </div>
      <div className="flex flex-col" style={{width: "100%"}}>
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Título" />
                  <HeaderItem title="Reportado por" />
                  <HeaderItem title="Estado" />
                  <HeaderItem title="Severidad" />
                  <HeaderItem title="Fecha de creación" />
                  <HeaderItem title="Fecha de modificación" />
                  <HeaderItem title="" />
                </tr>
              </thead>

              <tbody>
                {list.map((ticket) => (
                  <TicketGridRow
                    key={ticket.id}
                    ticket={ticket}
                    productVersion={version}
                    productId={productId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "auto" }}>
        <button className={styles.saveButton} onClick={() => setModal(true)}>
          Crear Ticket
        </button>
      </div>
      <TicketModal
        isOpen={modal}
        onClose={() => setModal(false)}
        productVersionId={version}
        clientes={clientes}
        tasks={tasks}
      />
    </div>
  );
}
