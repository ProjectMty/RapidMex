import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "green",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  label: {
    fontWeight: "bold",
  },
});

export default function CotizacionPDF({ datos }: { datos: any }) {
  if (!datos) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No hay datos disponibles para la cotización.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Cotización Interna RapidMex</Text>

        <View style={styles.section}>
          <Text style={styles.label}>¿Lleva paquete?: </Text>
          <Text>{datos?.llevaPaquete ?? "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bodega: </Text>
          <Text>{datos?.bodega ?? "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Medidas (LxAxH): </Text>
          <Text>
            {datos?.l ?? 0} x {datos?.a ?? 0} x {datos?.h ?? 0}{" "}
            {datos?.unidadMedida ?? ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Peso ingresado: </Text>
          <Text>
            {datos?.peso ?? 0} {datos?.unidadPeso ?? ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costos adicionales (con +10%): </Text>
          <Text>
            COSTOE1:{" "}
            {datos?.costoe1Final
              ? (datos.costoe1Final ?? 0).toFixed(2) + " USD"
              : "N/A"}
          </Text>
          <Text>
            COSTOE2:{" "}
            {datos?.costoe2Final
              ? (datos.costoe2Final ?? 0).toFixed(2) + " USD"
              : "N/A"}
          </Text>
          <Text>
            COSTOE3:{" "}
            {datos?.costoe3Final
              ? (datos.costoe3Final ?? 0).toFixed(2) + " USD"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Resultado final: </Text>
          <Text>
            {datos?.resultado ?? 0} {datos?.moneda ?? "USD"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
