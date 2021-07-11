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

import api from "../../services/api";

import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const CourseDetails = props => {
    const [aulas, setAulas] = useState([]);
    const [curso, setCurso] = useState({});

    const {id_course} = props.match.params;

    useEffect(() => {
        async function loadCursoAulas() {
            var response = await api.get(`getCursoAulaById/${id_course}`);
            setAulas(response.data);
            setCurso({idcurso: response.data[0].idcurso, nomecurso: response.data[0].nomecurso});
        }

        loadCursoAulas();
    }, []);

    let { user } = props;

    return (
      <Fragment>

      {user.idprofessor != null ? 
      
        <Fragment>
        <div className="pb-24 pt-7 px-8 bg-primary">
          <div className="card-title capitalize text-white mb-4 text-white-primary">
            Curso: {curso.nomecurso}
          </div>
        </div>

        <div className="analytics m-sm-30 mt--18">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>

              {/* Cards */}
              <Grid container spacing={3} className="mb-6">
                <Grid item xs={12} md={4}>
                  <Link to={{ pathname: `/aula/adicionar/${curso.idcurso}` }}>
                    <Card elevation={3} className="p-4">            
                      <div className="flex items-center">
                        <Fab
                          size="medium"
                          className="bg-light-green circle-44 box-shadow-none"
                        >
                          <Icon className="text-green">add</Icon>
                        </Fab>
                        <h5 className="font-medium text-green m-0 ml-3">Criar nova aula</h5>
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
                <div className="card-title px-6 mb-3">Aulas disponíveis</div>
                <div className="overflow-auto">
                  <Table className="product-table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="px-6" colSpan={4}>
                          Aula
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                          Exercicios cadastrados
                        </TableCell>
                        <TableCell className="px-0" colSpan={1}>
                          Ação
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    
                    { aulas.map((aula, index) => (
                        <Fragment key={index}>

                            {aula.idaula && 
                            <TableRow>
                                
                                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                    <Link to={`/aula/${aula.idaula}`}>{aula.nome}</Link>                    
                                </TableCell>

                                <TableCell className="px-0" align="left" colSpan={2}>
                                
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

        <div className="pb-24 pt-7 px-8 bg-primary">
          <div className="card-title capitalize text-white mb-4 text-white-primary">
            Curso: {curso.cursonome}
          </div>
        </div>

        <div className="analytics m-sm-30 mt--18">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>

              

              <Card elevation={3} className="pt-5 mb-6">
                <div className="card-title px-6 mb-3">Aulas disponíveis</div>
                <div className="overflow-auto">
                  <Table className="product-table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="px-6" colSpan={4}>
                          Aula
                        </TableCell>
                        <TableCell className="px-0" colSpan={2}>
                          Exercicios cadastrados
                        </TableCell>
                        <TableCell className="px-0" colSpan={1}>
                          Ação
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {aulas.map((aula, index) => (
                        
                          <TableRow key={index}>
                            
                            <TableCell className="px-0 capitalize" colSpan={4} align="left">
                              <Link to={{ pathname: 'detalhesAula', state: { aula: aula} }}>{aula.nome}</Link>                    
                            </TableCell>

                            <TableCell className="px-0" align="left" colSpan={2}>
                              {aula.exercicios}
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

  CourseDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(CourseDetails)
  )
);

