import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Cliente, TicketDeProducto, VersionProducto } from "@/types/types";
import TicketGridRow from "@/components/TicketGridRow";
import TicketModal from "@/components/TicketModal";
import styles from "./versionTickets.module.css";
import { axiosInstance } from "@/api/axios";

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function TicketsDeProducto() {
  const router = useRouter();
  const versionId = router.query.versionId as string;
  const productId = router.query.productId as string;
  const [list, setList] = useState<TicketDeProducto[]>([]);
  const [modal, setModal] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tasks, setTasks] = useState([]);
  const [productVersion, setProductVersion] = useState<VersionProducto>();

  const fetchClients = () => {
    fetch(
      "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes",  
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setClientes(data);
      });
  };

  const loadProductVersion = () => {
    axiosInstance
      .get(`/products/versions/${versionId}`)
      .then((response: any) => {
        setProductVersion({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          creationDate: response.data.creationDate,
        });
        setList(response.data.tickets);
      })
      .catch((error: any) => {
        console.error(error);
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
    loadProductVersion();
    fetchClients();
    // fetchTasks();
  }, [versionId]);

  return (
    <div className={styles.tableDataContainer}>
      <div className={styles.versionTicketDataContainer}>
        <div className={styles.versionTicketDataItem}>
          <h2 className={styles.versionTicketDataTitleHeader}>
            {productVersion?.name ?? "Versión de Producto"}
          </h2>
        </div>
        <div className={styles.versionTicketDataItem}>
          <h2 className={styles.versionTicketDataTitle}>Descripción:</h2>
          <p className={styles.versionTicketDataValue}>
            {productVersion?.description ?? ""}
          </p>
        </div>
        <div className={styles.versionTicketDataItem}>
          <h2 className={styles.versionTicketDataTitle}>Fecha de creación:</h2>
          <p className={styles.versionTicketDataValue}>
            {new Date(productVersion?.creationDate ?? "").toLocaleString(
              "en-GB",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            )}
          </p>
        </div>
      </div>
      <h2
        className={styles.versionTicketDataTitle}
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        {"Tickets:"}
      </h2>
      <div className="flex flex-col" style={{ width: "100%", maxHeight: "390px" }}>
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
                    productVersionId={versionId}
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
        productVersionId={versionId}
        clientes={clientes}
        tasks={tasks}
      />
    </div>
  );
}
