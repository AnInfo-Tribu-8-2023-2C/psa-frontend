import React from "react";
import { VersionProducto } from "@/types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
  version: VersionProducto;
  productId: string;
}

export default function ProductVersionGridRow({ version, productId }: Props) {
  return (
    <tr key={`${version.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{version.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{version.name}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {new Date(version.creationDate).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
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
              pathname: "/producto/[productId]/version/[version]",
              query: { version: version.id, productId: productId },
            }}
          >
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
}
