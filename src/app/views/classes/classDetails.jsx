import React, { Component, Fragment, useEffect, useState } from "react";

import { 
  Grid, 
  Card, 
  Icon, 
  Fab,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody 
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";

import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../services/api";


const ClassDetails = props => {
  
    const [exercicios, setExercicios] = useState([]);
    const [aula, setAula] = useState({});

    const {id_class} = props.match.params;

    useEffect(() => {
        async function loadExercicios() {
            var response = await api.get(`getExerciciosByAula/${id_class}`);
            setExercicios(response.data);
            setAula({idaula: response.data[0].idaula, nomeaula: response.data[0].nomeaula});
        }

        loadExercicios();
    }, []);

    let { user } = props;

    return (
      <Fragment>

      {/* PROFESSOR */}
      {user.idprofessor != null ? 
        <Fragment>
          <div className="pb-24 pt-7 px-8 bg-primary">
            <div className="card-title capitalize text-white mb-4 text-white-primary">
              Aula: {aula.nomeaula}
            </div>
          </div>

          <div className="analytics m-sm-30 mt--18">
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>

                {/* Cards */}
                <Grid container spacing={3} className="mb-6">
                  <Grid item xs={12} md={4}>
                    <Link to={`/exercicio/adicionar/${id_class}`}>
                      <Card elevation={3} className="p-4">            
                        <div className="flex items-center">
                          <Fab
                            size="medium"
                            className="bg-light-green circle-44 box-shadow-none"
                          >
                            <Icon className="text-green">add</Icon>
                          </Fab>
                          <h5 className="font-medium text-green m-0 ml-3">Criar exercicio</h5>
                        </div>  
                      </Card>                  
                    </Link>
                    
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card elevation={3} className="p-4">
                      <div className="flex items-center">
                        <Fab
                          size="medium"
                          className="bg-light-green circle-44 box-shadow-none"
                        >
                          <Icon className="text-green">person</Icon>
                        </Fab>
                        <h5 className="font-medium text-green m-0 ml-3">Comentários do curso (18)</h5>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card elevation={3} className="p-4">
                      <div className="flex items-center">
                        <Fab
                          size="medium"
                          className="bg-light-error circle-44 box-shadow-none overflow-hidden"
                        >
                          <Icon className="text-error">dvr</Icon>
                        </Fab>
                        <h5 className="font-medium text-error m-0 ml-3">Professores cadastrados (2)</h5>
                      </div>
                    </Card>
                  </Grid>
                </Grid>



                <Card elevation={3} className="pt-5 mb-6">
                  <div className="card-title px-6 mb-3">Exercicios criados</div>
                  <div className="overflow-auto">
                    <Table className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Exercicio
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Descrição
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exercicios.map((exercicio, index) => (
                          <Fragment key={index}>

                            {exercicio.idexercicio && 
                            <TableRow>
                              
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                <Link to={`/exercicio/${exercicio.idexercicio}/${id_class}`}>{exercicio.nome}</Link>                 
             
                              </TableCell>

                              <TableCell className="px-0" align="left" colSpan={2}>
                                {exercicio.descricao}
                              </TableCell>

                              <TableCell className="px-0" colSpan={1}>
                                <IconButton>
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            }
                        </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>



              </Grid>
            </Grid>
          </div>
        </Fragment>

        :
       
        <Fragment>
          {/* ALUNO */}
          <div className="pb-24 pt-7 px-8 bg-primary">
            <div className="card-title capitalize text-white mb-4 text-white-primary">
              Aula: {aula.nome}
            </div>
          </div>

          <div className="analytics m-sm-30 mt--18">
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>

                
                <Card elevation={3} className="pt-5 mb-6">
                  <div className="card-title px-6 mb-3">Exercicios</div>
                  <div className="overflow-auto">
                    <Table className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Exercicio
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Descrição
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exercicios.map((exercicio, index) => (
                          
                            <TableRow key={index}>
                              
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                <Link to={{ pathname: 'exercicio', state: { exercicio: exercicio, aula: aula} }}>{exercicio.nome}</Link>                    
                              </TableCell>

                              <TableCell className="px-0" align="left" colSpan={2}>
                                {exercicio.descricao}
                              </TableCell>

                              <TableCell className="px-0" colSpan={1}>
                                <IconButton>
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>



              </Grid>
            </Grid>
          </div>

        </Fragment>
      }


        
      </Fragment>
    );
}

ClassDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(ClassDetails)
  )
);
