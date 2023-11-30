import React from "react";
import { Producto } from "@/types/types";

interface Props {
  producto: Producto;
}

export default function ProductGridRow( {producto}: Props) {
  return (
    <tr key={`${producto.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{producto.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{producto.nombre}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{producto.version}</div>
      </td>
    </tr>
  );
}
