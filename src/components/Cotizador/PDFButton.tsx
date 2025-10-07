"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";

export default function PDFButton({ document, fileName }: any) {
  return (
    <PDFDownloadLink document={document} fileName={fileName}>
      {({ loading }) =>
        loading ? (
          <button className="bg-gray-400 text-white py-2 px-6 rounded-lg" disabled>
            Generando PDF...
          </button>
        ) : (
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
            Descargar PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
}
