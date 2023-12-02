import { useEffect, useState } from "react";
import { VersionProducto } from "@/types/types";
import ProductVersionGridRow from "@/components/ProductVersionGridRow";
import { useRouter } from "next/router";

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function VersionesDeProducto() {
  const router = useRouter();
  const productoId = router.query.productId as string;
  const [list, setList] = useState<VersionProducto[]>([]);

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
    console.log("productID: ", productoId);
    setList([
      {
        id: "1",
        version: "1.0.0",
        fechaModificacion: new Date("2021-08-01"),
      },
      {
        id: "2",
        version: "2.0.0",
        fechaModificacion: new Date("2021-09-01"),
      },
      {
        id: "3",
        version: "3.0.0",
        fechaModificacion: new Date("2022-08-01"),
      },
      {
        id: "4",
        version: "4.0.0",
        fechaModificacion: new Date("2022-09-01"),
      },
    ]);
  }
  , [productoId]);

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">Versiones de Producto</h1>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Versión" />
                  <HeaderItem title="Fecha de modificación" />
                  <HeaderItem title="" />
                </tr>
              </thead>

              <tbody>
                {list.map((version) => (
                  <ProductVersionGridRow key={version.id} version={version} productId={productoId}/>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}