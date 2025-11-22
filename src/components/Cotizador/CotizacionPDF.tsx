import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DetallesCotizacion } from "@/types/DetallesCotizacion";

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
        {datos.origen1 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion origen 1</Text>

            <Text style={styles.value}>Calle: {datos.origen1?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.origen1?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.origen1?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen1?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen1?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen1?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen1?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.origen1?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.origen1?.suburbs?.join(", ") ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen1?.zip_code ?? "N/A"} </Text>
          </View>
        ) : (
           <View style={styles.section}>
          <Text style={styles.label}>Origen 1 no disponible</Text>
          </View>
        )}

        {datos.destino1 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion destino 1</Text>
            <Text style={styles.value}>Calle: {datos.destino1?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.destino1?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.destino1?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino1?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino1?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino1?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino1?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.destino1?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.destino1?.suburbs ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino1?.zip_code ?? "N/A"} </Text>
          </View>
        ) :
          (
             <View style={styles.section}>
            <Text style={styles.label}>Destino 1 no disponible</Text>
            </View>
          )}

        {datos.origen2 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion origen 2</Text>

            <Text style={styles.value}>Calle: {datos.origen2?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.origen2?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.origen2?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen2?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen2?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen2?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen2?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.origen2?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.origen2?.suburbs?.join(", ") ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen2?.zip_code ?? "N/A"} </Text>
          </View>
        ) : (
           <View style={styles.section}>
          <Text style={styles.label}>Origen 2 no disponible</Text>
          </View>
        )}

        {datos.destino2 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion destino 1</Text>
            <Text style={styles.value}>Calle: {datos.destino2?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.destino2?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.destino2?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino2?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino2?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino2?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino2?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.destino2?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.destino2?.suburbs ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino2?.zip_code ?? "N/A"} </Text>
          </View>
        ) :
          (
             <View style={styles.section}>
            <Text style={styles.label}>Destino 2 no disponible</Text>
            </View>
          )}


        {datos.origen3 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion origen 3</Text>

            <Text style={styles.value}>Calle: {datos.origen3?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.origen3?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.origen3?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen3?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen3?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen3?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.origen3?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.origen3?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.origen3?.suburbs?.join(", ") ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen3?.zip_code ?? "N/A"} </Text>
          </View>
        ) : (
           <View style={styles.section}>
          <Text style={styles.label}>Origen 3 no disponible</Text>
          </View>
        )}

        {datos.destino3 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion destino 1</Text>
            <Text style={styles.value}>Calle: {datos.destino3?.additional_info?.street ?? "N/A"} </Text>
            <Text style={styles.value}>País: {datos.destino3?.country?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Municipio: {datos.destino3?.locality ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino3?.regions?.region_1 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino3?.regions?.region_2 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino3?.regions?.region_3 ?? "N/A"} </Text>
            <Text style={styles.value}>Region: {datos.destino3?.regions?.region_4 ?? "N/A"} </Text>
            <Text style={styles.value}>Estado: {datos.destino3?.state?.name ?? "N/A"} </Text>
            <Text style={styles.value}>Suburbios: {datos.destino3?.suburbs ?? "N/A"} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino3?.zip_code ?? "N/A"} </Text>
          </View>
        ) :
          (
             <View style={styles.section}>
            <Text style={styles.label}>Destino 3 no disponible</Text>
            </View>
          )}

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
