import { PDFDownloadLink } from "@react-pdf/renderer";
import CotizacionPDF from "./CotizacionPDF";
import { DetallesCotizacion } from "@/types/DetallesCotizacion1";

interface Props {
  datos: DetallesCotizacion;
  fileName?: string;
}

export default function PDFButton({ datos, fileName }: Props) {
  return (
    <PDFDownloadLink
      document={<CotizacionPDF datos={datos} />}
      fileName={fileName || "cotizacion.pdf"}
      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition inline-block"
    >
      {({ loading }) =>
        loading ? "Generando PDF..." : "Descargar PDF"
      }
    </PDFDownloadLink>
  );
}
