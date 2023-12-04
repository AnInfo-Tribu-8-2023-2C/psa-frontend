import { useEffect, useState } from "react";
import styles from "./ticket.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Cliente,
  EstadoTicket,
  SeveridadTicket,
  TicketDeProducto,
} from "@/types/types";
import Select from "react-select";
import { axiosInstance } from "@/api/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productVersionId: string;
  clientes: Cliente[];
  tasks: any[];
  edit?: boolean;
  ticket?: TicketDeProducto;
}

interface TaskOption {
  value: string;
  label: string;
}

interface Inputs {
  title: string;
  description: string;
  state: EstadoTicket;
  severity: SeveridadTicket;
  reportedBy: string;
  relatedTasks: TaskOption[];
}

const TicketModal = (props: Props) => {
  const { isOpen, onClose, productVersionId, clientes, tasks, edit, ticket } = props;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      state: EstadoTicket.ABIERTO,
      severity: SeveridadTicket.S4,
      reportedBy: "",
      relatedTasks: [],
    },
  });

  const mockTasks = [
    { id: "1", name: "Tarea 1" },
    { id: "2", name: "Tarea 2" },
    { id: "3", name: "Tarea 3" },
    { id: "4", name: "Tarea 4" },
  ];

  //Todo: Consumir lista de tasks de endpoint de proyecto para asociar al ticket

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

  useEffect(() => {
    if (edit && ticket) {
      console.log("ticket", ticket);
      setValue("reportedBy", ticket!.client);
      setValue("title", ticket!.title);
      setValue("description", ticket!.description);
      setValue("state", ticket!.state);
      setValue("severity", ticket!.severity);
      setValue("relatedTasks", ticket!.tasks.map((task) => ({ value: task.id, label: task.nombre })));
    }
  }
  , [ticket, edit]);

  const saveTicket = (data: Inputs) => {
    axiosInstance
      .post(`/products/versions/tickets`, {
        title: data.title,
        description: data.description,
        state: data.state,
        severity: data.severity,
        productVersionId: productVersionId,
        client: data.reportedBy
      })
      .then((response: any) => {
        // Handle the response
        console.log("Ticket saved: ", response.data);
      })
      .catch((error: any) => {
        // Handle the error
        console.error(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (edit) {
      console.log("Update Ticket with", data);
    } else {
      console.log("Create Ticket with: ", data);
      saveTicket(data);
    }
  };

  return (
    <div
      className={styles.modalContainer}
      style={{ display: isOpen ? "grid" : "none" }}
    >
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h1 className="text-3xl font-bold decoration-gray-400">
            {edit ? "Editar Ticket" : "Crear Ticket"}
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
              className={styles.inputStyle}
            />
            {errors.title && (
              <span className={styles.errorLabel}>Título es requerido</span>
            )}
          </div>

          <div>
            <label className={styles.modalFont}>Descripción:</label>
            <input
              {...register("description", { required: true })}
              type="text"
              id="first_name"
              className={styles.inputStyle}
            />
            {errors.description && (
              <span className={styles.errorLabel}>
                Descripción es requerido
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={styles.modalFont}>Reportado por cliente:</label>
              <select {...register("reportedBy")} className={styles.inputStyle}>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente["razon social"]}>
                    {cliente["razon social"]}
                  </option>
                ))}
              </select>
              {errors.reportedBy && (
                <span className={styles.errorLabel}>
                  El cliente que reporta es requerido
                </span>
              )}
            </div>

            <div>
              <label className={styles.modalFont}>Asociar Tareas:</label>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    isMulti
                    name="colors"
                    onChange={onChange}
                    onBlur={onBlur}
                    options={mockTasks.map((task) => ({
                      value: task.id,
                      label: task.name,
                    }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                )}
                name="relatedTasks"
              />
              {errors.relatedTasks && (
                <span className={styles.errorLabel}>
                  Tareas relacionadas al ticket es requerido
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={styles.modalFont}>Estado:</label>
              <select {...register("state")} className={styles.inputStyle}>
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
              <label className={styles.modalFont}>Severidad:</label>
              <select {...register("severity")} className={styles.inputStyle}>
                {Object.values(SeveridadTicket).map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
              {errors.severity && (
                <span className={styles.errorLabel}>
                  Severidad es requerido
                </span>
              )}
            </div>
          </div>
        </form>

        <div
          className={styles.modalFooter}
          style={{ justifyContent: "flex-end" }}
        >
          <button
            type="submit"
            className={styles.saveButton}
            onClick={handleSubmit(onSubmit)}
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

          <button onClick={onClose} className={styles.cancelButton}>
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

export default TicketModal;
