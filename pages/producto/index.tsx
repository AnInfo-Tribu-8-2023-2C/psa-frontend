import { useEffect, useState } from "react";
import ProductGridRow from "@/components/ProductGridRow";
import { Producto } from "@/types/types";
import { axiosInstance } from "@/api/axios";
import styles from "@/styles/producto.module.css"

const HeaderItem = ({ title }: { title: string }) => {
  return (
    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">
      {title}
    </th>
  );
};

export default function Productos() {
  const [list, setList] = useState<Producto[]>([]);

  useEffect(() => {
    axiosInstance.get('/products')
      .then(response => {
        // Handle the response
        console.log("Products data: ", response.data);
        setList(response.data);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.tableDataContainer}>
      <div className="mb-4">
        <h1 className="text-3xl font-bold decoration-gray-400">Productos</h1>
      </div>
      <div className="flex flex-col" style={{width: "100%"}}>
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Producto" />
                  <HeaderItem title="Descripción" />
                  <HeaderItem title="" />
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
