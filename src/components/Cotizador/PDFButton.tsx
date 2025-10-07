import { PDFDownloadLink } from "@react-pdf/renderer";
import CotizacionPDF from "./CotizacionPDF";

interface CotizacionDatos {
  // Define aquí las propiedades que realmente uses en el PDF.
  // Por ejemplo:
  nombre?: string;
  direccion?: string;
  peso?: number;
  precio?: number;
  [key: string]: string | number | undefined;
}

interface Props {
  datos: CotizacionDatos;
  fileName?: string;
}

export default function PDFButton({ datos, fileName }: Props) {
  return (
    <PDFDownloadLink
      document={<CotizacionPDF datos={datos} />}
      fileName={fileName ?? "cotizacion.pdf"}
      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition inline-block"
    >
      {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
    </PDFDownloadLink>
  );
}
