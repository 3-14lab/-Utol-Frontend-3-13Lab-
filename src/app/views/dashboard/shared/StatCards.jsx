import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  icon: {
    fontSize: "44px",
    opacity: 0.6,
    color: theme.palette.primary.main
  }
});

const StatCards = ({ classes }) => {
  return (
    <Grid container spacing={3} className="mb-3">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={classes.icon}>group</Icon>
            <div className="ml-3">
              <small className="text-muted">Cursos cadastrados</small>
              <h6 className="m-0 mt-1 text-primary font-medium">5</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={classes.icon}>attach_money</Icon>
            <div className="ml-3">
              <small className="text-muted">This week Sales</small>
              <h6 className="m-0 mt-1 text-primary font-medium">$80,500</h6>
            </div>
          </div>
          <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(StatCards);
