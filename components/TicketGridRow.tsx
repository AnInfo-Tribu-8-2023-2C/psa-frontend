import React from "react";
import { TicketDeProducto, VersionProducto } from "@/types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
  ticket: TicketDeProducto;
  productVersion: string;
  productId: string;
}

export default function TicketGridRow({ ticket, productVersion, productId }: Props) {
  return (
    <tr key={`${ticket.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.title}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.cliente}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.state}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.severity}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {ticket.creationDate.toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'medium'})}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {ticket.updateDate.toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'medium'})}
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
              query: { id: ticket.id, versionId: productVersion, productId: productId},
            }}
          >
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
}