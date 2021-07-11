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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody ,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Autocomplete } from "@material-ui/lab";

import api from "../../services/api";
import { Fragment } from "react";

class ClassStore extends Component {
  state = {
    nome: "",
    descricao: "",
    tipo: "",
    id_course: this.props.match.params.id_course,
    contasDebito: [],
    contasCredito: [],
    movimentacaoDebito: [],
    movimentacaoCredito: [],
    totalDebito: 0,
    totalCredito: 0,
    historico: "",
    data_inicio: new Date(),
    data_fim: new Date(),
    curso: {},
    showCategories: false
  };

  async componentDidMount(){
    const contasPai = await api.get(`getCategoriesFathers`);

    const resultDebito  = [ ...contasPai.data ];
    const resultCredito = [ ...contasPai.data ];

    this.setState({contasDebito: resultDebito});
    this.setState({contasCredito: resultCredito});

  }

  handleSubmit = async (event) => {
    event.preventDefault();

    function changeDate(str) {
      var month, day, hours, minutes, seconds, date;

      date = new Date(str)
          month = ("0" + (date.getMonth() + 1)).slice(-2)
          day = ("0" + date.getDate()).slice(-2)
          hours = ("0" + date.getHours()).slice(-2)
          minutes = ("0" + date.getMinutes()).slice(-2)
          seconds = ("0" + date.getSeconds()).slice(-2)

      let mySQLDate = [date.getFullYear(), month, day].join("-");
      let mySQLTime = [hours, minutes, seconds].join(":");
      return [mySQLDate, mySQLTime].join(" ");    
    }

    const dadosAula = this.state;

    dadosAula.data_inicio = changeDate(dadosAula.data_inicio);
    dadosAula.data_fim = changeDate(dadosAula.data_fim);

    dadosAula.usuario_inclusao = this.props.user.idusuario;
    dadosAula.data_inclusao = changeDate(new Date());


    dadosAula.usuario_inclusao = this.props.user.idusuario;
    dadosAula.idprofessor_responsavel = this.props.user.idusuario;

    delete dadosAula.contasCredito;
    delete dadosAula.contasDebito;

    console.log(dadosAula);

    const response = await api.post('storeAula', dadosAula);

    this.props.history.push(`/curso/${this.props.match.params.id_course}`);

  };

  handleDateChangeInicio = e => {
    function changeDate(str) {
      var month, day, hours, minutes, seconds, date;

      date = new Date(str)
          month = ("0" + (date.getMonth() + 1)).slice(-2)
          day = ("0" + date.getDate()).slice(-2)
          hours = ("0" + date.getHours()).slice(-2)
          minutes = ("0" + date.getMinutes()).slice(-2)
          seconds = ("0" + date.getSeconds()).slice(-2)

      let mySQLDate = [date.getFullYear(), month, day].join("-");
      let mySQLTime = [hours, minutes, seconds].join(":");
      return [mySQLDate, mySQLTime].join(" ");    
    }

    let data_inicio = changeDate(e);

    this.setState({data_inicio: data_inicio});
  };


  handleDateChangeFim = e => {
    function changeDate(str) {
      var month, day, hours, minutes, seconds, date;

      date = new Date(str)
          month = ("0" + (date.getMonth() + 1)).slice(-2)
          day = ("0" + date.getDate()).slice(-2)
          hours = ("0" + date.getHours()).slice(-2)
          minutes = ("0" + date.getMinutes()).slice(-2)
          seconds = ("0" + date.getSeconds()).slice(-2)

      let mySQLDate = [date.getFullYear(), month, day].join("-");
      let mySQLTime = [hours, minutes, seconds].join(":");
      return [mySQLDate, mySQLTime].join(" ");    
    }

    let data_fim = changeDate(e);

    this.setState({data_fim: data_fim});
  };

  handleChange = e => {
    console.log(e.target.className, e.target.value);
    if (["nomeContaDebito", "valorDebito", "quantidadeDebito", "valorInicialDebito"].includes(e.target.className)) {
      
      let movimentacaoDebito = [...this.state.movimentacaoDebito]
      movimentacaoDebito[e.target.dataset.id][e.target.className] = e.target.value; 
      this.setState({ movimentacaoDebito }, () => console.log("Debito",this.state.movimentacaoDebito));

      var valorConta = 0;
      var movimentacoesPassadas = [];

      this.state.movimentacaoDebito.forEach(movimentacaoDebito => {
        if (!movimentacaoDebito.quantidadeDebito) 
          movimentacaoDebito.quantidadeDebito = 1;

        if (!movimentacaoDebito.valorInicialDebito) 
          movimentacaoDebito.valorInicialDebito = 0;

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



    else if (["nomeContaCredito" ,"valorCredito", "quantidadeCredito", "valorInicialCredito"].includes(e.target.className)) {
      
      let movimentacaoCredito = [...this.state.movimentacaoCredito]
      movimentacaoCredito[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ movimentacaoCredito }, () => console.log("Credito",this.state.movimentacaoCredito))

      var valorConta = 0;
      var movimentacoesPassadas = [];

      this.state.movimentacaoCredito.forEach(movimentacaoCredito => {
        if (!movimentacaoCredito.quantidadeCredito) 
          movimentacaoCredito.quantidadeCredito = 1;

        if (!movimentacaoCredito.valorInicialCredito) 
          movimentacaoCredito.valorInicialCredito = 0;

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


  onTagsChange = (event, values) => {
    this.setState({
      tipo: values.label
    });
  }

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
  
  handleShowCategories = () => {
    this.setState({showCategories: !this.state.showCategories, movimentacaoCredito: [], movimentacaoDebito: [], totalDebito: 0, totalCredito: 0});
  }

  render() {
    let {
      nome,
      descricao,
      contasDebito,
      contasCredito,
      movimentacaoCredito,
      movimentacaoDebito,
      totalDebito,
      totalCredito,
      data_fim,
      data_inicio,
      showCategories
    } = this.state;

    return (
      <div className="m-sm-30">

        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Cursos", path: "/cursos/detalhesCurso" },
              { name: "Criação de aula" }
            ]}
          />
        </div>

        <SimpleCard title="Criação de aula">
          <div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            >

            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Nome"
                  type="text"
                  name="nome"
                  value={nome}
                  validators={[
                    "required",
                  ]}
                  errorMessages={["Obrigatório"]}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Autocomplete
                  className="mb-6 w-full"
                  options={[{label: 'Prova'}, {label: "Aula teórica"}, {label: "Aulas de exercicios"}]}
                  onChange={this.onTagsChange}
                  name="tipo"
                  getOptionLabel={option => option.label}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={"Tipo"}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

              </Grid>
            </Grid>

            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                  <KeyboardDatePicker
                    className="mb-4 w-full"
                    margin="none"
                    label="Início"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={data_inicio}
                    onChange={this.handleDateChangeInicio}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                  <KeyboardDatePicker
                    className="mb-4 w-full"
                    margin="none"
                    label="Fim"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={data_fim}
                    onChange={this.handleDateChangeFim}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} style={{marginBottom: '20px'}}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Descrição"
                  type="text"
                  name="descricao"
                  value={descricao}
                  validators={[
                    "required",
                  ]}
                  errorMessages={["Obrigatório"]}
                />
            </Grid>





            <Grid container style={{flexDirection: 'row', justifyContent: 'space-between'}} style={showCategories ? {} : { display: 'none' }} item lg={12} md={12} sm={12} xs={12} spacing={6}>

              <Grid item lg={6} md={6} sm={12} xs={12}>   
                <Grid container style={{flexDirection: 'row', justifyContent: 'space-between' }} spacing={1} item>

                  <Grid item lg={8} md={8} sm={8} xs={8}>
                    <Autocomplete
                      className="mb-6 w-full"
                      options={contasDebito}
                      onChange={this.onDebitoChange}
                      name="tipo"
                      getOptionLabel={option => option.category}
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
                            Valor Unitário $ 
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Quantidade
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Valor Inicial
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {movimentacaoDebito.map((movimentacao, index) => {

                          let movimentacaoDebitoValor = `valorDebito-${index}`;
                          let movimentacaoDebitoQuantidade = `quantidadeDebito-${index}`;
                          let movimentacaoDebitoContaNome = `nomeContaDebito-${index}`;
                          let movimentacaoDebitoValorInicial = `valorInicial-${index}`;

                          return (
                            <TableRow key={index}>
                            
                            {movimentacao.is_father == null ? 
                              
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                {movimentacao.category}
                              </TableCell>
                              
                              : 
                              
                              <TableCell style={styleTableCell} className="px-0 capitalize" colSpan={4} align="left">
                                <div style={movimentacaoColumnStyle} >
                                  <div style={stylesFont} >{movimentacao.category}</div>   
                                  <input
                                    // InputProps={{ disableUnderline: true }}
                                    style={inputStyle}
                                    type="text"
                                    data-id={index}
                                    name={movimentacaoDebitoContaNome}
                                    id={movimentacaoDebitoContaNome}
                                    value={movimentacaoDebito[index].name} 
                                    placeholder={"Conta filha"}
                                    className="nomeContaDebito"
                                  />   
                                </div>
                              </TableCell>
                            }

                              

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


                              {movimentacao.attribute == "quantitativo" ? 


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

                              {movimentacao.is_father == null ? 
                              
                                <TableCell className="px-0 capitalize" colSpan={4} align="left" colSpan={1}>
                                  -
                                </TableCell>
                                
                                : 
                                <Fragment>
                                  <TableCell style={styleTableCell} className="px-0" align="left" colSpan={1}>
                                    <input
                                      data-id={index}
                                      style={inputStyle}
                                      name={movimentacaoDebitoValorInicial}
                                      id={movimentacaoDebitoValorInicial}
                                      value={movimentacaoDebito[index].name} 
                                      placeholder={"0"}
                                      className="valorInicialDebito"
                                    />
                                  </TableCell>
                                </Fragment>
                               
                              }


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
                      getOptionLabel={option => option.category}
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
                            Quantidade
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Valor Inicial
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {movimentacaoCredito.map((movimentacao, index) => {
                          let movimentacaoCreditoValor = `valorCredito-${index}`;
                          let movimentacaoCreditoquantidade = `quantidadeCredito-${index}`;
                          let movimentacaoCreditoContaNome = `nomeContaCredito-${index}`;
                          let movimentacaoCreditoValorInicial = `valorInicial-${index}`;

                          return (

                            <TableRow key={index}>

                              {movimentacao.is_father == null ? 
                              
                                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                  {movimentacao.category}
                                </TableCell>
                                
                                : 
                                
                                <TableCell style={styleTableCell} className="px-0 capitalize" colSpan={4} align="left">
                                  <div style={movimentacaoColumnStyle} >
                                    <div style={stylesFont} >{movimentacao.category}</div>   
                                    <input
                                      // InputProps={{ disableUnderline: true }}
                                      style={inputStyle}
                                      type="text"
                                      data-id={index}
                                      name={movimentacaoCreditoContaNome}
                                      id={movimentacaoCreditoContaNome}
                                      value={movimentacaoCredito[index].name} 
                                      placeholder={"Conta filha"}
                                      className="nomeContaCredito"
                                    />   
                                  </div>
                                </TableCell>
                              }
                            
                              

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



                              {movimentacao.attribute == "quantitativo" ? 


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


                              {movimentacao.is_father == null ? 
                                
                                <TableCell className="px-0 capitalize" colSpan={4} align="left" colSpan={1}>
                                  -
                                </TableCell>
                                
                                : 
                                <Fragment>
                                  <TableCell style={styleTableCell} className="px-0" align="left" colSpan={1}>
                                    <input
                                      data-id={index}
                                      style={inputStyle}
                                      name={movimentacaoCreditoValorInicial}
                                      id={movimentacaoCreditoValorInicial}
                                      value={movimentacaoCredito[index].name} 
                                      placeholder={"0"}
                                      className="valorInicialCredito"
                                    />
                                  </TableCell>
                                </Fragment>
                                
                              }
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
            
            <div style={{display: 'flex', justifyContent: 'space-between' }}> 
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <span className="pl-2 capitalize">Criar</span>
              </Button>
              <FormControlLabel
                control={<Checkbox onClick={() => {this.handleShowCategories()}} />}
                label="Desejo acrescentar valores iniciais para essa aula."
              />
            </div>
            
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


ClassStore.propTypes = {
  user: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
});

// export default withStyles({}, { withTheme: true })(Dashboard1);

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(ClassStore)
  )
);