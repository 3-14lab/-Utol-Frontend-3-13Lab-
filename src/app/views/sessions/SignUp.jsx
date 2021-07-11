import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  RadioGroup,
  Button,
  Radio
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    nmusuario: "",
    email: "",
    senha: "",
    agreement: "",
    tipo: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {};

  render() {
    let { tipo, nmusuario, email, senha } = this.state;

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
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Nome"
                      onChange={this.handleChange}
                      type="text"
                      name="nmusuario"
                      value={nmusuario}
                      validators={["required"]}
                      errorMessages={["Nome obrigatório"]}
                    />

                    
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      // validators={["required", "isEmail"]}
                      // errorMessages={[
                      //   "Obrigatório",
                      //   "email não válido"
                      // ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Senha"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="senha"
                      type="password"
                      value={senha}
                      validators={["required"]}
                      errorMessages={["Senha obrigatória"]}
                    />

                    <RadioGroup
                      className="mb-4"
                      name="tipo"
                      value={tipo}
                      onChange={this.handleChange}
                      row
                      required
                    >
                      <FormControlLabel
                        value="aluno"
                        control={<Radio color="secondary" />}
                        label="Aluno"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="professor"
                        control={<Radio color="secondary" />}
                        label="Professor"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="instituicao"
                        control={<Radio color="secondary" />}
                        label="Instituição"
                        labelPlacement="end"
                      />
                    </RadioGroup>

                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.props.history.push("/session/cadastro", {state: this.state})
                        }
                      >
                        Seguinte
                      </Button>
                      <span className="mx-2 ml-5">ou</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin", {state: this.state})
                        }
                      >
                        já possuo conta
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

export default connect(mapStateToProps, {})(SignUp);
