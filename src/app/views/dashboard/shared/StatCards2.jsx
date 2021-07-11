import React from "react";
import { Link } from "react-router-dom";

import { Grid, Card, Icon, Fab } from "@material-ui/core";

const StatCards2 = () => {
  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={4}>
        <Link to={"criarCurso"}>
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
  );
};

export default StatCards2;
