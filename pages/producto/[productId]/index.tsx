import { useEffect, useState } from "react";
import { Producto, VersionProducto } from "@/types/types";
import ProductVersionGridRow from "@/components/ProductVersionGridRow";
import { useRouter } from "next/router";
import styles from "@/styles/producto.module.css";
import { axiosInstance } from "@/api/axios";
import SearchFilter from "@/components/SearchFilter";
import { set } from "date-fns";

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
  const [product, setProduct] = useState<Producto>();
  const [productVersions, setProductVersions] = useState<VersionProducto[]>([]);
  const [initialList, setInitialList] = useState<VersionProducto[]>([]);

  const fetchProductById = () => {
    axiosInstance.get(`/products/${productoId}`)
      .then(response => {
        // Handle the response
        console.log("Product data: ", response.data);
        setProduct(response.data);
        setProductVersions(response.data.productVersions); 
        setInitialList(response.data.productVersions);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProductById();
  }, [productoId]);

  return (
    <div className={styles.tableDataContainer}>
      <div className={styles.productDataContainer}>
        <div className={styles.productDataItem}>
          <h2 className={styles.productDataTitleHeader}>{product?.name ?? "Producto"}</h2>
        </div>
        <div className={styles.productDataItem}>
          <h2 className={styles.productDataTitle}>Descripción:</h2>
          <p className={styles.productDataValue}>
            {product?.description ?? ""}
          </p>
        </div>

        <div className={styles.productDataItem}>
          <h2 className={styles.productDataTitle}>Fecha de creación:</h2>
          <p className={styles.productDataValue}>
            {new Date(product?.createdAt ?? "").toLocaleDateString("en-GB", {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
            })}
          </p>
        </div>
      </div>
      <h2 className={styles.productDataTitle} style={{paddingTop: "1rem", paddingBottom: "1rem"}}>Versiones:</h2>
      <SearchFilter intialList={initialList} dataList={productVersions} setList={setProductVersions} productVersion/>
      <div className="flex flex-col" style={{ width: "100%", maxHeight: "450px" }}>
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <HeaderItem title="ID" />
                  <HeaderItem title="Nombre" />
                  <HeaderItem title="Fecha de creación" />
                  <HeaderItem title="Fecha de modificación" />
                  <HeaderItem title="" />
                </tr>
              </thead>

              <tbody>
                {productVersions.map((version) => (
                  <ProductVersionGridRow
                    key={version.id}
                    version={version}
                    productId={productoId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
