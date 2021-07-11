import React, { Component, Fragment } from "react";

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

import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../services/api";
  
import { withStyles } from "@material-ui/styles";

class Dashboard1 extends Component {
  state = {
    cursos: [],
  };

  async componentDidMount(){

    const cursos = null;

    if (this.props.user.idprofessor) {
      cursos = await api.get(`getCursos/${this.props.user.idprofessor}`);
    } else {
      cursos = await api.get(`getCursos`);
    }

    this.setState({cursos: cursos.data});

  }

  render() {
    let { theme } = this.props;
    let { user } = this.props;

    let {cursos} = this.state;

    console.log(cursos);

    return (
      
      <Fragment>

        {user.idprofessor != null ?  

        // TELA INICIAL PARA PROFESSOR
        <Fragment>
          <div className="pb-24 pt-7 px-8 bg-primary">
            <div className="card-title capitalize text-white mb-4 text-white-primary">
              Meus cursos
            </div>
          </div>

          <div className="analytics m-sm-30 mt--18">
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} className="mb-6">
                  <Grid item xs={12} md={4}>
                    <Link to={'/curso/adicionar'}>
                      <Card elevation={3} className="p-4">            
                        <div className="flex items-center">
                          <Fab
                            size="medium"
                            className="bg-light-green circle-44 box-shadow-none"
                          >
                            <Icon className="text-green">add</Icon>
                          </Fab>
                          <h5 className="font-medium text-green m-0 ml-3">Cadastrar novo curso</h5>
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
                        <h5 className="font-medium text-green m-0 ml-3">Alunos online (10)</h5>
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
                        <h5 className="font-medium text-error m-0 ml-3">Provas (5)</h5>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
                
                <Card elevation={3} className="pt-5 mb-6">
                  <div className="card-title px-6 mb-3">Meus cursos</div>
                  <div className="overflow-auto">
                    <Table className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Curso
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Tipo
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cursos.length > 0 ? 
                        
                          <>
                          {cursos.map((curso, index) => (
                          
                            <TableRow key={index}>
                              
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                {/* <Link to={{ pathname: 'detalhesCurso', state: { curso: curso} }}>{curso.nome}</Link>*/}
                                <Link to={`/curso/${curso.idcurso}`}>{curso.nome}</Link>
                              </TableCell>

                              <TableCell className="px-0" align="left" colSpan={2}>                              
                                <small className="border-radius-4 bg-secondary text-white px-2 py-2px ">
                                  {curso.tipo}
                                </small>
                              </TableCell>
                              <TableCell className="px-0" colSpan={1}>
                                <IconButton>
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          </> 
                          
                          : 
                          
                          <></>
                        }
                        
                      </TableBody>
                    </Table>
                  </div>
                </Card>

              </Grid>
            </Grid>
          </div>
        </Fragment>        
        
        :

        // TELA INICIAL PARA ALUNO
        <Fragment>
          <div className="pb-24 pt-7 px-8 bg-primary">
            <div className="card-title capitalize text-white mb-4 text-white-primary">
              Cursos disponíveis
            </div>
          </div>

          <div className="analytics m-sm-30 mt--18">
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>                
                
                <Card elevation={3} className="pt-5 mb-6">
                  <div className="overflow-auto">
                    <Table className="product-table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6" colSpan={4}>
                            Cursos
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            Tipo
                          </TableCell>
                          <TableCell className="px-0" colSpan={1}>
                            Ação
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cursos.length > 0 ? 
                        
                          <>
                          {cursos.map((curso, index) => (
                          
                            <TableRow key={index}>
                              
                              <TableCell className="px-0 capitalize" colSpan={4} align="left">
                                <Link to={{ pathname: 'detalhesCurso', state: { curso: curso} }}>{curso.nome}</Link>                    
                              </TableCell>

                              <TableCell className="px-0" align="left" colSpan={2}>                              
                                <small className="border-radius-4 bg-secondary text-white px-2 py-2px ">
                                  {curso.tipo}
                                </small>
                              </TableCell>
                              <TableCell className="px-0" colSpan={1}>
                                <IconButton>
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          </> 
                          
                          : 
                          
                          <></>
                        }
                        
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
}

Dashboard1.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

// export default withStyles({}, { withTheme: true })(Dashboard1);

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(Dashboard1)
  )
);
