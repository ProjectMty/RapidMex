import { PDFDownloadLink } from "@react-pdf/renderer";
import CotizacionPDF from "./CotizacionPDF";

interface Props {
  datos: any;
  fileName?: string;
}

export default function PDFButton({ datos, fileName }: Props) {
  return (
    <PDFDownloadLink
      document={<CotizacionPDF datos={datos} />} // ✅ ahora sí es un Document válido
      fileName={fileName || "cotizacion.pdf"}
    >
      {({ loading }) => (loading ? "Generando..." : "Descargar PDF")}
    </PDFDownloadLink>
  );
}
