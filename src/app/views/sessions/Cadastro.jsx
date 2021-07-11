import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  RadioGroup,
  Button,
  Radio,
  TextField
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { Autocomplete } from "@material-ui/lab";

import api from "../../services/api";

import { connect } from "react-redux";

class Cadastro extends Component {
    state = {
        nmusuario: "",
        tipo: "",
        semestre: "",
        email: "",
        senha: "",
        entidade: "",
        curso: "",
    };

    constructor(props) {
        super(props);

        this.state.nmusuario = props.location.state.state.nmusuario;
        this.state.tipo = props.location.state.state.tipo;
        this.state.email = props.location.state.state.email;
        this.state.senha = props.location.state.state.senha;

    }

    handleChange = event => {
      event.persist();
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    
    onCursoChange = (event, values) => {
      this.setState({
        curso: values.label
      });
    }

    onEntidadeChange = (event, values) => {
      this.setState({
        entidade: values.label
      });
    }
  
    handleFormSubmit = async (event) => {
      event.preventDefault();
      const response = await api.post('users', this.state);
      console.log(this.state, response);
    };
    
    render() {

    let { nmusuario, semestre, tipo } = this.state;

    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full">
                  
                {/* <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message="This is a success message!"
                  />
                </Snackbar> */}
                  
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                  {tipo == "aluno" && 
                    <> 
                      <h3>Olá {nmusuario}!</h3> 
                      <h6 style={{marginBottom: 15}}>Complete por favor as seguintes informações: </h6> 
                      <Autocomplete
                        className="mb-6 w-full"
                        options={[{label: 'Universidade de Brasília'}, {label: "Universidade de São Paulo"}]}
                        onChange={this.onEntidadeChange}
                        name="entidade"
                        getOptionLabel={option => option.label}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={"Universidade"}
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <Autocomplete
                        className="mb-6 w-full"
                        options={[{label: 'Ciência da computação'}, {label: "Matemática"}, {label: "Contabilidade"}]}
                        onChange={this.onCursoChange}
                        getOptionLabel={option => option.label}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={"Curso"}
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <TextValidator
                        className="mb-6 w-full"
                        label="Semestre"
                        onChange={this.handleChange}
                        type="number"
                        name="semestre"
                        value={semestre}
                        variant="outlined"
                        validators={[
                          "required",
                          "maxStringLength: 2"
                        ]}
                        errorMessages={["Obrigatório"]}
                      />                  
                    </>
                  }

                  {tipo == "professor" && 
                    <> 
                    <h3>Olá professor {nmusuario}!</h3> 
                    <h6 style={{marginBottom: 15}}>Complete por favor as seguintes informações: </h6> 
                      <Autocomplete
                        className="mb-6 w-full"
                        options={[{label: 'Universidade de Brasília'}, {label: "Universidade de São Paulo"}]}
                        onChange={this.onEntidadeChange}
                        name="entidade"
                        getOptionLabel={option => option.label}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={"Universidade"}
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <Autocomplete
                        className="mb-6 w-full"
                        options={[{label: 'Ciência da computação'}, {label: "Matemática"}, {label: "Contabilidade"}]}
                        onChange={this.onCursoChange}
                        name="curso"
                        getOptionLabel={option => option.label}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={"Curso"}
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <div style={{flexDirection: 'row'}}>
                      <FormControlLabel
                        style={{marginLeft: 0, marginBottom: 10}}
                        labelPlacement="start"
                        label="Deseja monetizar?"
                        control={<Checkbox />}
                      />
                      </div>
                      
                    </>
                  }

                  {tipo == "instituicao" && 
                  <> 
                    <h3>Bem vindo(a), {nmusuario}!</h3> 
                    <h6 style={{marginBottom: 15}}>Complete por favor as seguintes informações: </h6> 
                      <Autocomplete
                        className="mb-6 w-full"
                        options={[{label: 'Universidade de Brasília'}, {label: "Universidade de São Paulo"}]}
                        onChange={this.onEntidadeChange}
                        name="entidade"
                        getOptionLabel={option => option.label}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={"Nome de sua entidade"}
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                      <TextValidator
                        className="mb-6 w-full"
                        label="CNPJ"
                        onChange={this.handleChange}
                        type="number"
                        name="semestre"
                        value={semestre}
                        variant="outlined"
                        validators={[
                          "required",
                          "maxStringLength: 11"
                        ]}
                        errorMessages={["Obrigatório"]}
                      />                  
                    </>
                    }

                    <>
                    <FormControlLabel
                      className="mb-4"
                      style={{marginLeft: 0, marginBottom: 10}}
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      labelPlacement="start"
                      label="Li e concordo com os termos de serviço."
                    />
                    </>


                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Cadastrar agora
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {})(Cadastro);
