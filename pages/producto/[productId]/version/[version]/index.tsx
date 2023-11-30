import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TicketDeProducto } from "@/types/types";
import TicketGridRow from "@/components/TicketGridRow";

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function TicketsDeProducto() {
  const router = useRouter();
  const version = router.query.version;
  const [list, setList] = useState<TicketDeProducto[]>([]);

  // useEffect(() => {
  //   fetch(
  //     "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setList(data);
  //     });
  // }, []);

  useEffect(() => {
    setList([
      {
        id: "1",
        nombre: "Ticket 1",
        descripcion: "Descripción del ticket 1",
        estado: "Abierto",
        horasCalculadas: 10,
        fechaInicial: new Date("2021-08-01"),
        fechaModificacion: new Date("2021-08-03"),
      },
      {
        id: "2",
        nombre: "Ticket 2",
        descripcion: "Descripción del ticket 2",
        estado: "Abierto",
        horasCalculadas: 10,
        fechaInicial: new Date("2021-08-04"),
        fechaModificacion: new Date("2021-08-05"),
      },
      {
        id: "3",
        nombre: "Ticket 3",
        descripcion: "Descripción del ticket 3",
        estado: "Abierto",
        horasCalculadas: 10,
        fechaInicial: new Date("2021-09-05"),
        fechaModificacion: new Date("2021-09-09"),
      },
      {
        id: "4",
        nombre: "Ticket 4",
        descripcion: "Descripción del ticket 4",
        estado: "Abierto",
        horasCalculadas: 10,
        fechaInicial: new Date("2021-10-01"),
        fechaModificacion: new Date("2021-10-04"),
      },
    ]);
  }, [version]);

  return (
    <div
      className="container max-w-7xl mx-auto"
      style={{ display: "flex", flexDirection: "column", height: "100%", padding: "2rem", overflow: "auto" }}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">
          {"Tickets de producto version " + version}
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Nombre" />
                  <HeaderItem title="Descripción" />
                  <HeaderItem title="Estado" />
                  <HeaderItem title="Horas calculadas" />
                  <HeaderItem title="Fecha de creación" />
                  <HeaderItem title="Fecha de modificación" />
                  <HeaderItem title="" />
                </tr>
              </thead>

              <tbody>
                {list.map((ticket) => (
                  <TicketGridRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{display: "flex", marginTop: "auto"}}>
        <button
          className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
          onClick={() => console.log("Crear ticket")}
        >
          Crear Ticket
        </button>
      </div>
    </div>
  );
}
