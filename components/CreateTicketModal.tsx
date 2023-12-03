import { useEffect, useState } from "react";
import styles from "./ticketModal.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Cliente, EstadoTicket, SeveridadTicket } from "@/types/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productVersionId: string;
}

interface Inputs {
  title: string;
  description: string;
  state: EstadoTicket;
  severity: SeveridadTicket;
  reportedBy: string;
}

const CreateTicketModal = (props: Props) => {
  const { isOpen, onClose, productVersionId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      state: EstadoTicket.ABIERTO,
      severity: SeveridadTicket.S4,
      reportedBy: "",
    },
  });
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
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
  }, []);

  //Todo: Consumir lista de tareas de endpoint de proyecto para asociar al ticket

  // Consulto los tareas disponibles para asignar a las tickets
  //   useEffect(() => {
  //     fetch("http://localhost:3001/recursos")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setRecursos(data);
  //       });
  //   }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    console.log(productVersionId);
  };

  return (
    <div
      className={styles.modalContainer}
      style={{ display: isOpen ? "grid" : "none" }}
    >
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h1 className="text-3xl font-bold decoration-gray-400">
            Crear Tarea
          </h1>
          <button
            onClick={onClose}
            type="button"
            className={styles.closeButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.formItem}>
            <label className={styles.modalFont}>Título:</label>
            <input
              {...register("title", { required: true })}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.title && (
              <span className={styles.errorLabel}>Título es requerido</span>
            )}
          </div>

          <div>
            <label className={styles.modalFont}>
              Descripción:
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.description && (
              <span className={styles.errorLabel}>
                Descripción es requerido
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={styles.modalFont}>
                Estado:
              </label>
              <select
                {...register("state")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {Object.values(EstadoTicket).map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className={styles.errorLabel}>Estado es requerido</span>
              )}
            </div>

            <div>
              <label className={styles.modalFont}>
                Severidad:
              </label>
              <select
                {...register("severity")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {Object.values(SeveridadTicket).map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {errors.severity && (
                <span className={styles.errorLabel}>
                  Severidad es requerido
                </span>
              )}
            </div>

            <div>
              <label className={styles.modalFont}>
                Reportado por cliente:
              </label>
              <select
                {...register("reportedBy")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.razon_social}
                  </option>
                ))}
              </select>
              {errors.reportedBy && (
                <span className={styles.errorLabel}>
                  El cliente que reporta es requerido
                </span>
              )}
            </div>
          </div>
        </form>

        <div
          className="flex flex-row gap-10"
          style={{ justifyContent: "flex-end" }}
        >
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
            Guardar Ticket
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
