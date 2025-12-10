import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DetallesCotizacion } from "@/types/DetallesCotizacion2";
import { useEffect, useState } from "react";

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

export default function CotizacionPDF() {
  const [datos, setDatos] = useState<DetallesCotizacion | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("DetallesPdf")
    if (saved) setDatos(JSON.parse(saved))
  }, [])


  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Cotización Interna RapidMex</Text>

        <View style={styles.section}>
          <Text style={styles.label}>¿Lleva paquete?</Text>
          <Text style={styles.value}>{datos?.llevaPaquete || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bodega</Text>
          <Text style={styles.value}>{datos?.bodega || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Medidas (LxAxH)</Text>
          <Text style={styles.value}>
            {datos?.l} x {datos?.a} x {datos?.h} {datos?.unidadMedida}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Peso ingresado</Text>
          <Text style={styles.value}>
            {datos?.peso} {datos?.unidadPeso}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costos adicionales</Text>
          <Text style={styles.value}>COSTOE1: {datos?.costoe1Final.toFixed(2)} USD</Text>
          <Text style={styles.value}>COSTOE2: {datos?.costoe2Final.toFixed(2)} USD</Text>
          <Text style={styles.value}>COSTOE3: {datos?.costoe3Final.toFixed(2)} USD</Text>
        </View>
        {datos?.origen1 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion origen 1</Text>
            <Text style={styles.value}>Calle: {datos.origen1.calle} </Text>
            <Text style={styles.value}>País: {datos.origen1.pais} </Text>
            <Text style={styles.value}>Estado: {datos.origen1.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.origen1.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.origen1.colonia == "" ? "N/A" : datos.origen1.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.origen1.calle} </Text>
            <Text style={styles.value}>Numero: {datos.origen1.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen1.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.origen1.referencia} </Text>

          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Origen 1 no disponible</Text>
          </View>
        )}

        {datos?.destino1 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion Destino 1</Text>
            <Text style={styles.value}>Calle: {datos.destino1.calle} </Text>
            <Text style={styles.value}>País: {datos.destino1.pais} </Text>
            <Text style={styles.value}>Estado: {datos.destino1.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.destino1.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.destino1.colonia == "" ? "N/A" : datos.destino1.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.destino1.calle} </Text>
            <Text style={styles.value}>Numero: {datos.destino1.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino1.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.destino1.referencia} </Text>

          </View>
        ) :
          (
            <View style={styles.section}>
              <Text style={styles.label}>Destino 1 no disponible</Text>
            </View>
          )}

        {datos?.origen2 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion origen 2</Text>
            <Text style={styles.value}>Calle: {datos.origen2.calle} </Text>
            <Text style={styles.value}>País: {datos.origen2.pais} </Text>
            <Text style={styles.value}>Estado: {datos.origen2.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.origen2.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.origen2.colonia == "" ? "N/A" : datos.origen2.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.origen2.calle} </Text>
            <Text style={styles.value}>Numero: {datos.origen2.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen2.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.origen2.referencia} </Text>

          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Origen 2 no disponible</Text>
          </View>
        )}

        {datos?.destino2 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion Destino 2</Text>
            <Text style={styles.value}>Calle: {datos.destino2.calle} </Text>
            <Text style={styles.value}>País: {datos.destino2.pais} </Text>
            <Text style={styles.value}>Estado: {datos.destino2.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.destino2.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.destino2.colonia == "" ? "N/A" : datos.destino2.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.destino2.calle} </Text>
            <Text style={styles.value}>Numero: {datos.destino2.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino2.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.destino2.referencia} </Text>

          </View>
        ) :
          (
            <View style={styles.section}>
              <Text style={styles.label}>Destino 2 no disponible</Text>
            </View>
          )}


        {datos?.origen3 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion Origen 3</Text>
            <Text style={styles.value}>Calle: {datos.origen3.calle} </Text>
            <Text style={styles.value}>País: {datos.origen3.pais} </Text>
            <Text style={styles.value}>Estado: {datos.origen3.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.origen3.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.origen3.colonia == "" ? "N/A" : datos.origen3.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.origen3.calle} </Text>
            <Text style={styles.value}>Numero: {datos.origen3.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.origen3.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.origen3.referencia} </Text>

          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Origen 3 no disponible</Text>
          </View>
        )}

        {datos?.destino3 ? (
          <View style={styles.section}>
            <Text style={styles.label}>Dirreccion Destino 3</Text>
            <Text style={styles.value}>Calle: {datos.destino3.calle} </Text>
            <Text style={styles.value}>País: {datos.destino3.pais} </Text>
            <Text style={styles.value}>Estado: {datos.destino3.estado1} </Text>
            <Text style={styles.value}>Municipio: {datos.destino3.municipio} </Text>
            <Text style={styles.value}>Colonia: {datos.destino3.colonia == "" ? "N/A" : datos.destino3.colonia} </Text>
            <Text style={styles.value}>Calle: {datos.destino3.calle} </Text>
            <Text style={styles.value}>Numero: {datos.destino3.numCalle} </Text>
            <Text style={styles.value}>Codigo Postal: {datos.destino3.codigoP} </Text>
            <Text style={styles.value}>Referencia: {datos.destino3.referencia} </Text>
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
            {datos?.resultado.toFixed(2)} {datos?.moneda}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

