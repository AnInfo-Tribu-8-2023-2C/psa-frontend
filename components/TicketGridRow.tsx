import React from "react";
import { TicketDeProducto, VersionProducto } from "@/types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface Props {
  ticket: TicketDeProducto;
}

export default function TicketGridRow({ ticket }: Props) {
  return (
    <tr key={`${ticket.id}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.nombre}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.descripcion}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.estado}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{ticket.horasCalculadas}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {ticket.fechaInicial.toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'medium'})}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          {ticket.fechaModificacion.toLocaleString('en-GB', {timeStyle: 'short', dateStyle: 'medium'})}
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
              pathname: "/productos/version/[slug]/tickets/[id]",
              query: { id: ticket.id, slug: "1.0.0" },
            }}
          >
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
}