import React from "react";
import { SeveridadTicket, TicketDeProducto, VersionProducto } from "@/types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
  ticket: TicketDeProducto;
  productVersionId: string;
  productId: string;
}

export default function TicketGridRow({
  ticket,
  productVersionId,
  productId,
}: Props) {
  return (
    <tr key={`${ticket.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.title}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.client}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.state}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{SeveridadTicket[ticket.severity]}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {new Date(ticket.createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {new Date(ticket.updatedAt).toLocaleString("en-GB", {
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
              pathname: "/producto/[productId]/version/[versionId]/ticket/[id]",
              query: {
                id: ticket.id,
                versionId: productVersionId,
                productId: productId,
              },
            }}
          >
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
}
