import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, Font, Image } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import imagem from'./balanco.png';
import imagem_ativo from'./balanco_ativo.png';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = (100 - COL1_WIDTH) / 3

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#fff'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 22,
      marginTop: 15,
      marginBottom: 25,
      textAlign: 'left',
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    textHeader: {
      margin: 0,
      fontSize: 14,
      textAlign: 'justify',
      color: '#444'
    },
    text: {
        margin: 0,
        fontSize: 14,
        textAlign: 'justify',
        color: '#444'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    headerUtol: {
        fontSize: 10,
        marginBottom: 15,
        textAlign: 'right',
        color: 'grey',
      },
      table: { 
        display: "table", 
        width: "auto", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol1Header: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },     
      tableColHeader: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
      },   
      tableCol1: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      },   
      tableCol: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCellHeader: {
        margin: 5, 
        fontSize: 12,
        fontWeight: 500
      },  
      tableCell: { 
        margin: 5, 
        fontSize: 10 
      }

  });

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

const Pdf = (props) => {

    const { height, width } = useWindowDimensions();
    
    return (
    <PDFViewer style={{width: width, height: height}}>
        <Document>
            {/* <Page style={styles.page}>

            <Text style={styles.header}>UTOL</Text>


            <Text style={styles.textHeader}>Universidade de Brasília</Text>
            <Text style={styles.textHeader}>Emanoel Johannes Cardim Lazaro</Text>
            
            <Text style={styles.textHeader}>Curso: Curso Teste</Text>
            <Text style={styles.textHeader}>Aula: Aula teste</Text>

            <Text style={styles.title}>Balanço Patrimonial - Exercicio Teste</Text>

            <Text style={styles.text}>
            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.headerText, styles.cell]}>Column 1 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 2 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 3 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 4 Header</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 1</Text>
                    <Text style={[styles.cell]}>Column 2 Row 1</Text>
                    <Text style={[styles.cell]}>Column 3 Row 1</Text>
                    <Text style={[styles.cell]}>Column 4 Row 1</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 2</Text>
                    <Text style={[styles.cell]}>Column 2 Row 2</Text>
                    <Text style={[styles.cell]}>Column 3 Row 2</Text>
                    <Text style={[styles.cell]}>Column 4 Row 2</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 3</Text>
                    <Text style={[styles.cell]}>Column 2 Row 3</Text>
                    <Text style={[styles.cell]}>Column 3 Row 3</Text>
                    <Text style={[styles.cell]}>Column 4 Row 3</Text>
                </View>
            </View>

            </Text>
            
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
            </Page> */}


            {/* <Page style={styles.page} size="A4" wrap>
                <Text style={styles.headerUtol}>UTOL</Text>


                <Text style={styles.textHeader}>Universidade de Brasília</Text>
                <Text style={styles.textHeader}>Emanoel Johannes Cardim Lazaro</Text>

                <Text style={styles.textHeader}>Curso: Curso Teste</Text>
                <Text style={styles.textHeader}>Aula: Aula teste</Text>

                <Text style={styles.title}>Balanço Patrimonial - Exercicio Teste</Text>

                <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.headerText, styles.cell]}>Ativo</Text>
                        <Text style={[styles.headerText, styles.cell]}>Dez/19</Text>
                        <Text style={[styles.headerText, styles.cell]}>Dez/20</Text>
                        <Text style={[styles.headerText, styles.cell]}>Dez/21</Text>

                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cellPrincipal]}>Ativo Circulante</Text>
                        <Text style={[styles.cell]}></Text>
                        <Text style={[styles.cell]}></Text>
                        <Text style={[styles.cell]}></Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cell]}>Caixas </Text>
                        <Text style={[styles.cell]}>240</Text>
                        <Text style={[styles.cell]}>240</Text>
                        <Text style={[styles.cell]}>189</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cell]}>Contas</Text>
                        <Text style={[styles.cell]}>128</Text>
                        <Text style={[styles.cell]}>240</Text>
                        <Text style={[styles.cell]}>189</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.cell]}>Estoque</Text>
                        <Text style={[styles.cell]}>128</Text>
                        <Text style={[styles.cell]}>240</Text>
                        <Text style={[styles.cell]}>189</Text>
                    </View>
                </View>
            </Page> */}


            <Page style={styles.body}>
                <Text style={styles.headerUtol} fixed>UTOL</Text>


                <Text style={styles.textHeader}>Universidade de Brasília</Text>
                <Text style={styles.textHeader}>Emanoel Johannes Cardim Lazaro</Text>

                <Text style={styles.textHeader}>Curso: Curso Teste</Text>
                <Text style={styles.textHeader}>Aula: Aula teste</Text>

                <Text style={styles.title}>Balanço Patrimonial - Exercicio Teste</Text>

                <Image
                    src={imagem_ativo}
                />

                <Image
                    src={imagem}
                />

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />

                {/* <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol1Header}> 
                            <Text style={styles.tableCellHeader}>Ativo</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Dez/2019</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Dez/2020</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Dez/2021</Text> 
                        </View> 
                    </View>

                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol1}> 
                            <Text style={styles.tableCell}>React-PDF</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>3</Text> 
                        </View> 
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                        </View>
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>5€</Text> 
                        </View> 
                    </View> 

                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol1}> 
                            <Text style={styles.tableCell}>Another row</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
                        Quijote de la Mancha</Text> 
                        </View> 
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>2019-05-20 - 2020-07-19</Text> 
                        </View>
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>25€</Text> 
                        </View> 
                    </View>       

                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol1}> 
                            <Text style={styles.tableCell}>Another row</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
                        Quijote de la Mancha</Text> 
                        </View> 
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>2019-05-20 - 2020-07-19</Text> 
                        </View>
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>25€</Text> 
                        </View> 
                    </View>     
                </View> */}
            </Page>

        </Document>
    </PDFViewer>
 
)};

export default Pdf;

