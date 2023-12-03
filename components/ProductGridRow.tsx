import React from "react";
import { Producto } from "@/types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
  producto: Producto;
}

export default function ProductGridRow({ producto }: Props) {
  return (
    <tr key={`${producto.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{producto.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{producto.name}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {producto.description}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div
          className="text-sm leading-5 text-gray-900"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link
            href={{
              pathname: "/producto/[slug]",
              query: { slug: producto.id },
            }}
          >
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
}
