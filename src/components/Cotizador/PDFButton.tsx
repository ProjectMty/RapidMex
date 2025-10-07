"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface PDFButtonProps {
  document: ReactElement; // PDF generado con @react-pdf/renderer
  fileName?: string;      // nombre opcional del archivo
}

export default function PDFButton({ document, fileName }: PDFButtonProps) {
  return (
    <PDFDownloadLink document={document} fileName={fileName || "cotizacion.pdf"}>
      {({ loading }) =>
        loading ? (
          <button className="bg-gray-400 text-white py-2 px-4 rounded-lg" disabled>
            Generando PDF...
          </button>
        ) : (
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
            Descargar PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
}
