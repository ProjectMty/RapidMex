import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DetallesCotizacion } from "@/types/DetallesCotizacion1";

// 🎨 Estilos del PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "green",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "1px solid #ddd",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    marginTop: 2,
    color: "#555",
  },
});

export default function CotizacionPDF({ datos }: { datos: DetallesCotizacion }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Cotización Interna RapidMex</Text>

        <View style={styles.section}>
          <Text style={styles.label}>¿Lleva paquete?</Text>
          <Text style={styles.value}>{datos.llevaPaquete || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bodega</Text>
          <Text style={styles.value}>{datos.bodega || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Medidas (LxAxH)</Text>
          <Text style={styles.value}>
            {datos.l} x {datos.a} x {datos.h} {datos.unidadMedida}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Peso ingresado</Text>
          <Text style={styles.value}>
            {datos.peso} {datos.unidadPeso}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costos adicionales</Text>
          <Text style={styles.value}>COSTOE1: {datos.costoe1Final.toFixed(2)} USD</Text>
          <Text style={styles.value}>COSTOE2: {datos.costoe2Final.toFixed(2)} USD</Text>
          <Text style={styles.value}>COSTOE3: {datos.costoe3Final.toFixed(2)} USD</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Resultado final</Text>
          <Text style={styles.value}>
            {datos.resultado.toFixed(2)} {datos.moneda}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
