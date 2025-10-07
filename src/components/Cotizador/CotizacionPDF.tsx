import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  header: { fontSize: 20, textAlign: "center", marginBottom: 20, color: "green" },
  section: { marginBottom: 10, padding: 10, borderBottom: "1px solid #ccc" },
  label: { fontWeight: "bold" },
});

interface DetallesCotizacion {
  llevaPaquete: string;
  bodega: string;
  l: string;
  a: string;
  h: string;
  unidadMedida: string;
  peso: string;
  unidadPeso: string;
  costoe1Final: number;
  costoe2Final: number;
  costoe3Final: number;
  resultado: number;
  moneda: string;
}

export default function CotizacionPDF({ datos }: { datos: DetallesCotizacion | null }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Cotización Interna RapidMex</Text>

        <View style={styles.section}>
          <Text style={styles.label}>¿Lleva paquete?: </Text>
          <Text>{datos?.llevaPaquete || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bodega: </Text>
          <Text>{datos?.bodega || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Medidas (LxAxH): </Text>
          <Text>
            {datos?.l} x {datos?.a} x {datos?.h} {datos?.unidadMedida}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Peso ingresado: </Text>
          <Text>
            {datos?.peso} {datos?.unidadPeso}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costos adicionales: </Text>
          <Text>COSTOE1: {datos?.costoe1Final?.toFixed(2) || "N/A"} USD</Text>
          <Text>COSTOE2: {datos?.costoe2Final?.toFixed(2) || "N/A"} USD</Text>
          <Text>COSTOE3: {datos?.costoe3Final?.toFixed(2) || "N/A"} USD</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Resultado final: </Text>
          <Text>
            {datos?.resultado} {datos?.moneda}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
