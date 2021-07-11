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
import { Breadcrumb, SimpleCard } from "matx";

import { withStyles } from "@material-ui/styles";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../services/api";

const BalanceteQuantitativo = props => {
  
    const [releases, setReleases] = useState([]);

    const {id_class} = props.match.params;
    const {id_exercise} = props.match.params;

    useEffect(() => {
        async function loadBalancoPatrimonial() {

            const response = await api.get(`getReleasesAndAmountByClassExercise/${id_class}/${id_exercise}`);
            setReleases(response.data);

        }

        loadBalancoPatrimonial();
    }, []);

    return (
        <div className="m-sm-30" >

        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Meus Cursos", path: "/dashboard/analytics" },
              { name: "Detalhes de curso", path: "/dashboard/detalhesCurso" },
              { name: "Detalhes de aula", path: "/dashboard/detalhesAula" },
              { name: "Detalhes de exercício", path: "/exercicio/detalhesAula" },
              { name: "Balancete Quantitativo" }
            ]}
          />
        </div>

        <SimpleCard title="Balancete Quantitativo">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0" align="left">Conta</TableCell>
                        <TableCell className="px-0" align="center">Quantidade Inicial</TableCell>
                        <TableCell className="px-0" align="center">Saldo Anterior</TableCell>
                        <TableCell className="px-0" align="center">Quantidade</TableCell>
                        <TableCell className="px-0" align="center">Saldo Final</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {releases.length > 0 ? 
                    <Fragment>
                        {releases.map((release, index) =>
                            <Fragment>
                                {release.attribute == 'quantitativo' ? 

                                <TableRow>
                                    <TableCell className="px-0 capitalize" align="left">
                                        {release.category}
                                    </TableCell>

                                    {release.initial_amount_default > 0 ? 
                                        <TableCell className="px-0 capitalize" align="center">
                                            <span style={{color: '#1b832d'}}>{release.initial_amount_default}</span>
                                        </TableCell> 
                                    :
                                        <TableCell className="px-0 capitalize" align="center" style={{color: '#555'}}>
                                            <span style={{color: '#F44336'}}>{release.initial_amount_default}</span>
                                        </TableCell>
                                    }

                                    <TableCell className="px-0 capitalize" align="center">
                                        {release.initial_amount}
                                    </TableCell>

                                        {release.isSum ? 
                                            <TableCell className="px-0 capitalize" align="center">
                                                <span style={{color: '#1b832d'}}>+ {release.amount}</span>
                                            </TableCell> 
                                        :
                                            <TableCell className="px-0 capitalize" align="center" style={{color: '#555'}}>
                                                <span style={{color: '#F44336'}}>- {release.amount}</span>
                                            </TableCell>
                                        }
                                    <TableCell className="px-0 capitalize" align="center">
                                        {release.final_amount}
                                    </TableCell>
                                </TableRow>
                                : ''
                                }
                            </Fragment>            
                            
                        )}  

                    </Fragment>                    

                    :

                    ''
                    }
                    
            
                </TableBody>
            </Table>
            </SimpleCard>

        
      </div>


    );
}

BalanceteQuantitativo.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(BalanceteQuantitativo)
  )
);
