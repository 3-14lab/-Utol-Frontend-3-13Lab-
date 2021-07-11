import React, { Component, Fragment, useEffect, useState } from "react";

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
  TextField
} from "@material-ui/core";

import "date-fns";
import { Autocomplete } from "@material-ui/lab";

import api from "../../services/api";

const CourseStore = props => {

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function handleSubmit() {

    var dadosCurso = {};

    dadosCurso.usuario_inclusao = props.user.idusuario;
    dadosCurso.idprofessor_responsavel = props.user.idprofessor;
    dadosCurso.nome = nome;
    dadosCurso.tipo = tipo;
    dadosCurso.descricao = descricao;

    const response = await api.post('storeCurso', dadosCurso);

    props.history.push("/dashboard/home");
  }

  return (
    <div className="m-sm-30">

    <div className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "Meus Cursos", path: "/dashboard/analytics" },
          { name: "Criação de curso" }
        ]}
      />
    </div>

    <SimpleCard title="Criação de curso">
      <div>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={errors => null}
      >
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="mb-4 w-full"
              label="Nome do curso"
              onChange={e => setNome(e.target.value)}
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
              options={[{label: 'Exercicios'}, {label: "Aulas"}, {label: "Aulas + exercicios"}]}
              // onChange={option => setTipo(option.label)}
              onChange={(_, value) => { setTipo(value.label) }}
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

        <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextValidator
              className="mb-4 w-full"
              label="Descrição"
              onChange={e => setDescricao(e.target.value)}
              type="text"
              name="descricao"
              value={descricao}
              validators={[
                "required",
              ]}
              errorMessages={["Obrigatório"]}
            />
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
};
  
// export default CriarCurso;


CourseStore.propTypes = {
  user: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
});

// export default withStyles({}, { withTheme: true })(Dashboard1);

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(CourseStore)
  )
);