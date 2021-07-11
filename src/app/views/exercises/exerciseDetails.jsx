import React, { Component, Fragment, useEffect, useState } from "react";

import { 
  Grid, 
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody 
} from "@material-ui/core";

import { Breadcrumb, SimpleCard, SimpleCardWithoutStyle } from "matx";
import { withRouter, Link } from "react-router-dom";

import api from "../../services/api";

const ExerciseDetails = props => {

  // const [movimentacoesDebito, setMovimentacoesDebito] = useState([])
  // const [movimentacoesCredito, setMovimentacoesCredito] = useState([])
  const [movimentacoes, setMovimentacoes] = useState([])
  const [exercicio, setExercicio] = useState({})
  const [movimentacoesDebito, setMovimentacoesDebito] = useState(false)
  const [movimentacoesCredito, setMovimentacoesCredito] = useState(false)

  const {id_exercise} = props.match.params;
  const {id_class} = props.match.params;

  useEffect(() => {
    async function loadMovimentacoes() {

      const movimentacoesResult = await api.get(`getReleasesByExercicio/${id_exercise}`);
      console.log(movimentacoesResult.data);
      setMovimentacoes(movimentacoesResult.data);
      setExercicio({nome_exercicio: movimentacoesResult.data[0].nome_exercicio, descricao_exercicio: movimentacoesResult.data[0].descricao_exercicio});

      movimentacoesResult.data.forEach(movimentacao => {
        if (movimentacao.release_type == "D"){
          setMovimentacoesDebito(true);
        } else if (movimentacao.release_type == "C"){
          setMovimentacoesCredito(true);
        }


      });
    }
    loadMovimentacoes();
  }, []);


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Table" }
          ]}
        />
      </div>

      <div style={{marginBottom: '25px'}}>
        <SimpleCard  title={`Exercício - ${exercicio.nome_exercicio}`}>
          <div className="w-full overflow-auto">
            <h5>Enunciado</h5>
            <span>{exercicio.descricao_exercicio}</span>
          </div>
        </SimpleCard>
      </div>
      
      <Grid container style={{display: 'flex', justifyContent: 'space-between'}} spacing={1}>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SimpleCard >
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap'}}>
              <h5>Movimentações Débito</h5>
            </div>

            {movimentacoesDebito == true ? 
            <div>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0">Conta</TableCell>
                    <TableCell className="px-0">Valor Unitário</TableCell>
                    <TableCell className="px-0">Quantidade</TableCell>
                    <TableCell className="px-0">Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    {movimentacoes.map((movimentacao, index) => (
                      <Fragment>
                        {movimentacao.release_type == "D" ? 
                        
                          <TableRow>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.category}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.value/movimentacao.amount}
                            </TableCell>
                            
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.amount}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.value}
                            </TableCell>
                          </TableRow>
                        : 
                          ''
                        }
                      
                      </Fragment>
                    
                    ))}
                  
                </TableBody>
            </Table>
            </div> 
            
            : 
            
            <div>
              <span>Não houve movimentações débito.</span>
            </div>
            }

            

          </SimpleCard>
        </Grid>
      


        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SimpleCard >
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap'}}>
              <h5>Movimentações Crédito</h5>
            </div>
            {movimentacoesCredito == true ? 
            <div>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0">Conta</TableCell>
                    <TableCell className="px-0">Valor Unitário</TableCell>
                    <TableCell className="px-0">Quantidade</TableCell>
                    <TableCell className="px-0">Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    {movimentacoes.map((movimentacao, index) => (
                      <Fragment>
                        {movimentacao.release_type == "C" ? 
                        
                          <TableRow>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.category}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.value/movimentacao.amount}
                            </TableCell>
                            
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.amount}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                              {movimentacao.value}
                            </TableCell>
                          </TableRow>
                        : 
                          ''
                        }
                      
                      </Fragment>
                    
                    ))}
                  
                </TableBody>
            </Table>
            </div> 
            
            : 
            
            <div>
              <span>Não houve movimentações crédito.</span>
            </div>
            }
            
          </SimpleCard>
        </Grid>

        
      </Grid>
      
      <div style={{marginTop: '10px'}}>
        <SimpleCardWithoutStyle> 
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            {/* <a href="/dashboard/pdf" target="_blank">
              <Button variant="contained" color="primary">Balanço Patrimonial</Button>
            </a> */}
            <Link style={{marginRight: '10px'}} to={{ pathname: `/exercicio/balancete-quantitativo/${id_class}/${id_exercise}`}}>
              <Button variant="contained" color="primary">Balancete Quantitativo</Button>
            </Link>
            <Link style={{marginRight: '10px'}} to={{ pathname: `/exercicio/balancete-financeiro/${id_class}/${id_exercise}`}}>
              <Button variant="contained" color="primary">Balancete Financeiro</Button>
            </Link>
            <Link to={{ pathname: `/exercicio/balancoPatrimonial/${id_class}/${id_exercise}`}}>
              <Button variant="contained" color="primary">Balanço Patrimonial</Button>
            </Link>
          </div>
        </SimpleCardWithoutStyle>
      </div>
      


    </div>
  );
};
  
export default ExerciseDetails;
