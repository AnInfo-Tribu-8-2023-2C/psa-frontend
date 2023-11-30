import { useEffect, useState } from "react";
import ClientGridRow from "@/components/clientGridRow";
import ProductGridRow from "@/components/productGridRow";
import { Producto } from "@/types/types";

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function Productos() {
  const [list, setList] = useState<Producto[]>([]);

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
        nombre: "Producto 1",
        version: "1.0.0",
      },
      {
        id: "2",
        nombre: "Producto 2",
        version: "1.0.0",
      },
      {
        id: "3",
        nombre: "Producto 3",
        version: "1.0.0",
      },
      {
        id: "4",
        nombre: "Producto 4",
        version: "1.0.0",
      },
    ]);
  }
  , []);

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">Clientes</h1>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Producto" />
                  <HeaderItem title="Versión" />
                </tr>
              </thead>

              <tbody>
                {list.map((producto) => (
                  <ProductGridRow key={producto.id} producto={producto} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
