import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";


import { withStyles } from "@material-ui/styles";
import { Breadcrumb, SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody 
} from "@material-ui/core";

import "date-fns";
import { Autocomplete } from "@material-ui/lab";

import api from "../../services/api";

class ExerciseStudent extends Component {
  state = {
    idaula: this.props.location.state.aula.idaula,
    contasDebito: [],
    contasCredito: [],
    movimentacaoDebito: [],
    movimentacaoCredito: [],
    totalDebito: 0,
    totalCredito: 0,
    historico: "",
  };


  async componentDidMount(){

    const contasAula = await api.get(`getPlanoDeContasAula/${this.props.location.state.aula.idaula}`);

    var contasDebitoArray = [];
    var contasCreditoArray = [];

    contasAula.data.forEach(conta => {
      if (conta.tipo == 'D') {
        contasDebitoArray.push(conta);
      }        
      else {
        contasCreditoArray.push(conta);
      }

    });

    const resultDebito = [...contasAula.data];


    const resultCredito = [...contasAula.data];

    this.setState({contasDebito: resultDebito});
    this.setState({contasCredito: resultCredito});

  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const dadosExercicio = this.state;

    dadosExercicio.id_usuario = this.props.user.idusuario;
    dadosExercicio.id_exercicio = this.props.location.state.exercicio.idexercicio;

    delete dadosExercicio.contasCredito;
    delete dadosExercicio.contasDebito;

    const response = await api.post('storeExercicioAluno', dadosExercicio);
    
    // this.props.history.push("/dashboard/detalhesExercicio", {exercicio: dadosExercicio, usuario: this.props.user});
    this.props.history.push("/dashboard/detalhesAula", {aula: this.props.location.state.aula});

  };

  handleChange = e => {
    // console.log(e.target.className, e.target.value);
    if (["nomeContaDebito", "valorDebito", "quantidadeDebito"].includes(e.target.className)) {
      
      let movimentacaoDebito = [...this.state.movimentacaoDebito]
      movimentacaoDebito[e.target.dataset.id][e.target.className] = e.target.value; 
      this.setState({ movimentacaoDebito }, () => console.log("Debito",this.state.movimentacaoCredito));

      var valorConta = 0;
      var movimentacoesPassadas = [];

      this.state.movimentacaoDebito.forEach(movimentacaoDebito => {
        if (!movimentacaoDebito.quantidadeDebito) 
          movimentacaoDebito.quantidadeDebito = 1;

        if (movimentacaoDebito.valorDebito && movimentacaoDebito.quantidadeDebito) {
          movimentacoesPassadas = [...movimentacoesPassadas, (movimentacaoDebito.valorDebito * movimentacaoDebito.quantidadeDebito)];
        }   

        movimentacaoDebito.isDebito = true;
      });

      valorConta = movimentacoesPassadas.reduce((a, b) => a + b, 0);

      if (valorConta != 0){          
        this.setState({totalDebito: valorConta});
      }
      
    }



    else if (["nomeContaCredito" ,"valorCredito", "quantidadeCredito"].includes(e.target.className)) {
      
      let movimentacaoCredito = [...this.state.movimentacaoCredito]
      movimentacaoCredito[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ movimentacaoCredito }, () => console.log("Credito",this.state.movimentacaoCredito))

      var valorConta = 0;
      var movimentacoesPassadas = [];

      this.state.movimentacaoCredito.forEach(movimentacaoCredito => {
        if (!movimentacaoCredito.quantidadeCredito) 
          movimentacaoCredito.quantidadeCredito = 1;

        if (movimentacaoCredito.valorCredito && movimentacaoCredito.quantidadeCredito) {
          movimentacoesPassadas = [...movimentacoesPassadas, (movimentacaoCredito.valorCredito * movimentacaoCredito.quantidadeCredito)];
        }  
        
        movimentacaoCredito.isDebito = false;

      });

      valorConta = movimentacoesPassadas.reduce((a, b) => a + b, 0);

      if (valorConta != 0){          
        this.setState({totalCredito: valorConta});
      }
      
    }
    else {
        this.setState({ [e.target.name]: e.target.value });
    }

  };

  onDebitoChange = (event, values) => {
    this.setState({
      movimentacaoDebito: [...this.state.movimentacaoDebito, values]
    });
  }

  onCreditoChange = (event, values) => {
    this.setState({
      movimentacaoCredito: [...this.state.movimentacaoCredito, values]
    });
  }
  
  render() {
    let {
      contasDebito,
      contasCredito,
      movimentacaoCredito,
      movimentacaoDebito,
      totalDebito,
      totalCredito,
      historico
    } = this.state;

    const {exercicio} = this.props.location.state;

    return (
      <div className="m-sm-30">

        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Meus Cursos", path: "/dashboard/analytics" },
              { name: "Detalhes de curso", path: "/dashboard/detalhesCurso" },
              { name: "Detalhes de aula", path: "/dashboard/detalhesAula" },
              { name: "Exercício" }
            ]}
          />
        </div>

        <SimpleCard title="Exercício">
          <div>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            onError={errors => null}
          >
            <Grid container spacing={6}>
              <Grid style={{paddingBottom: 30}} item lg={12} md={12} sm={12} xs={12}>
                <h4>{exercicio.nome}</h4>
                <span>{exercicio.descricao}</span>
              </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Histórico"
                  type="text"
                  name="historico"
                  value={historico}
                />
            </Grid>


            <Grid container style={{flexDirection: 'row', justifyContent: 'space-between'}} item lg={12} md={12} sm={12} xs={12} spacing={6}>

              <Grid item  item lg={6} md={6} sm={12} xs={12}>   
                <Grid container style={{flexDirection: 'row', justifyContent: 'space-between'}} spacing={1} item>

                  <Grid item lg={8} md={8} sm={8} xs={8}>
                    <Autocomplete
                      className="mb-6 w-full"
                      options={contasDebito}
                      onChange={this.onDebitoChange}
                      name="tipo"
                      getOptionLabel={option => option.nome}
                      renderInput={params => (
                        <TextField
                        {...params}
                        label={"Conta(s) Débito"}
                        variant="outlined"
                        placeholder="Adicione uma conta débito."
                        fullWidth
                        />
                      )}
                    />
                  </Grid>  

                  <Grid item lg={4} md={4} sm={4} xs={4}>
                      <TextField
                        value={totalDebito}
                        label={"Total Débito"}
                        variant="outlined"                        
                        fullWidth
                      />
                  </Grid>   

                </Grid>
                         
                {movimentacaoDebito.length > 0 ? 

                  <div style={{ border: '1px solid #cecece', marginBottom: 20, borderRadius: 3 }} className="overflow-auto">
                    <Table  className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Conta
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Valor Unitário
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Atributo
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {movimentacaoDebito.map((movimentacao, index) => {

                          let movimentacaoDebitoValor = `valorDebito-${index}`;
                          let movimentacaoDebitoQuantidade = `quantidadeDebito-${index}`;

                          return (
                            <TableRow key={index}>
                            
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                {movimentacao.nome}
                              </TableCell>
                                                            

                              <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>

                                <input
                                  // InputProps={{ disableUnderline: true }}
                                  style={inputStyle}
                                  type="text"
                                  data-id={index}
                                  name={movimentacaoDebitoValor}
                                  id={movimentacaoDebitoValor}
                                  value={movimentacaoDebito[index].name} 
                                  placeholder={"Digite valor"}
                                  className="valorDebito"
                                />                                
                              </TableCell>


                              {movimentacao.atributo == "quantitativo" ? 


                              <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>
                                <input
                                  style={inputStyle}
                                  data-id={index}
                                  name={movimentacaoDebitoQuantidade}
                                  id={movimentacaoDebitoQuantidade}
                                  value={movimentacaoDebito[index].name} 
                                  placeholder={"Digite quantidade"}
                                  className="quantidadeDebito"
                                />
                              </TableCell>

                              : 
                                                            
                              <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>
                                <input
                                  disabled
                                  style={inputStyle}
                                  data-id={index}
                                  name={movimentacaoDebitoQuantidade}
                                  id={movimentacaoDebitoQuantidade}
                                  value={movimentacaoDebito[index].name} 
                                  placeholder={"Não quantitativo"}
                                  className="quantidadeDebito"
                                />
                              </TableCell>
                              }

                              <TableCell className="px-0" colSpan={1}>
                                <IconButton>
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </TableCell>

                            </TableRow>
                          )


                          
                        })}
                      </TableBody>
                    </Table>
                  </div>
                : 
                                
                <div></div>}
                
              </Grid>

              {/* CONTA CRÉDITO */}
              <Grid item  item lg={6} md={6} sm={12} xs={12}>                  
                <Grid container style={{flexDirection: 'row', justifyContent: 'space-between'}} spacing={1} item>

                  <Grid item lg={8} md={8} sm={8} xs={8}>
                    <Autocomplete
                      className="mb-6 w-full"
                      options={contasCredito}
                      onChange={this.onCreditoChange}
                      name="tipo"
                      getOptionLabel={option => option.nome}
                      renderInput={params => (
                        <TextField
                        {...params}
                        label={"Conta(s) Crédito"}
                        variant="outlined"
                        placeholder="Adicione uma conta crédito."
                        fullWidth
                        />
                      )}
                    />
                  </Grid>  

                  <Grid item lg={4} md={4} sm={4} xs={4}>
                    <TextField
                      value={totalCredito}
                      label={"Total Crédito"}
                      variant="outlined"                        
                      fullWidth
                    />
                  </Grid>    

                </Grid>

                {movimentacaoCredito.length > 0 ? 

                  <div style={{ border: '1px solid #cecece', marginBottom: 20, borderRadius: 3 }} className="overflow-auto">
                    <Table  className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Conta
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Valor Unitário
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Atributo
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {movimentacaoCredito.map((movimentacao, index) => {
                          let movimentacaoCreditoValor = `valorCredito-${index}`;
                          let movimentacaoCreditoquantidade = `quantidadeCredito-${index}`;

                          return (

                            <TableRow key={index}>

                          
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                {movimentacao.nome}
                              </TableCell>
                              

                              <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>

                                <input
                                  // InputProps={{ disableUnderline: true }}
                                  style={inputStyle}
                                  type="text"
                                  data-id={index}
                                  name={movimentacaoCreditoValor}
                                  id={movimentacaoCreditoValor}
                                  value={movimentacaoCredito[index].name} 
                                  className="valorCredito"
                                />                                
                              </TableCell>



                              {movimentacao.atributo == "quantitativo" ? 


                                <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>
                                  <input
                                    style={inputStyle}
                                    data-id={index}
                                    name={movimentacaoCreditoquantidade}
                                    id={movimentacaoCreditoquantidade}
                                    value={movimentacaoCredito[index].name} 
                                    className="quantidadeCredito"
                                    placeholder={"Digite a quantidade"}

                                  />
                                </TableCell>

                              : 
                                                            
                                <TableCell style={styleTableCell} className="px-0" align="left" colSpan={2}>
                                  <input
                                    disabled
                                    style={inputStyle}
                                    data-id={index}
                                    name={movimentacaoCreditoquantidade}
                                    id={movimentacaoCreditoquantidade}
                                    value={movimentacaoCredito[index].name} 
                                    className="quantidadeCredito"
                                    placeholder={"Não quantitativo"}

                                  />
                                </TableCell>
                              }


                              <TableCell className="px-0" colSpan={1}>
                                  <IconButton>
                                    <Icon color="primary">edit</Icon>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                          )


                          
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  : 
                                
                  <div></div>}
              </Grid>

            </Grid>  

            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <span className="pl-2 capitalize">Criar</span>
            </Button>
          </ValidatorForm>
        </div>
        </SimpleCard>
      </div>
    );
  }
}

const styleTableCell = {
  // verticalAlign: 'bottom'
};

const stylesFont = {
  fontSize: '13px',
  color: '#333'
};

const movimentacaoColumnStyle = {
  display: 'flex', 
  flexDirection: 'column' 
}

const inputStyle = {
  border: '1px solid #cecece', 
  borderRadius: 3, 
  padding: 5, 
  width: '80%' 
}


ExerciseStudent.propTypes = {
  user: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
});

// export default withStyles({}, { withTheme: true })(Dashboard1);

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(ExerciseStudent)
  )
);