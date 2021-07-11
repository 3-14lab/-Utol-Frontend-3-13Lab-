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
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import api from "../../services/api";

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: '#FFFFFF',
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: '#FFFFFF',
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    content: {
      color: '#444',
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightRegular,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
        marginLeft: 0,
        paddingLeft: theme.spacing(2),
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    }
  }));
  
  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelInfo, color, bgColor, ...other } = props;
    
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="#F44">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    );
  }
  
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };
  
  const useStyles = makeStyles({
    root: {
      height: 264,
      maxWidth: 500,
    },
  });

const BalancoPatrimonial = props => {
  
    const [balancoPatrimonial, setBalancoPatrimonial] = useState([]);
    const [balancoPatrimonialPassivo, setBalancoPatrimonialPassivo] = useState([]);

    const {id_class} = props.match.params;
    const {id_exercise} = props.match.params;

    useEffect(() => {
        async function loadBalancoPatrimonial() {

            const response = await api.get(`getBalancoPatrimonial/${id_class}/${id_exercise}`);
            setBalancoPatrimonial(response.data);

            const responsePassivo = await api.get(`getBalancoPatrimonialPassivo/${id_class}/${id_exercise}`);
            setBalancoPatrimonialPassivo(responsePassivo.data);

        }

        loadBalancoPatrimonial();
    }, []);

    const classes = useStyles();

    const renderTree = (balancoPatrimonial) => (

        <StyledTreeItem key={balancoPatrimonial.id} 
            nodeId={balancoPatrimonial.id}
            labelText={balancoPatrimonial.category}
            labelInfo={balancoPatrimonial.sumOfTheChildren + balancoPatrimonial.initial_value}
            color="#3B5998"
            bgColor="#e8f0fe"
        >
          {Array.isArray(balancoPatrimonial.children) ? balancoPatrimonial.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
      );

    return (
        <div className="m-sm-30" style={{height: '100%'}}>

        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Meus Cursos", path: "/dashboard/analytics" },
              { name: "Detalhes de curso", path: "/dashboard/detalhesCurso" },
              { name: "Detalhes de aula", path: "/dashboard/detalhesAula" },
              { name: "Detalhes de exercício", path: "/exercicio/detalhesAula" },
              { name: "Balanço Patrimonial" }
            ]}
          />
        </div>

        <SimpleCard title="Balanço Patrimonial">
          <div>

            <Grid container style={{flexDirection: 'row', justifyContent: 'space-between', height: '500px'}} item lg={12} md={12} sm={12} xs={12} spacing={6} className="overflow-auto">

                <Grid item  item lg={6} md={6} sm={12} xs={12}>               


                    <div style={{marginBottom: 20, borderRadius: 3 }} >
                        <TreeView
                            defaultExpanded={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}
                            className={classes.root}
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            >
                            {renderTree(balancoPatrimonial)}
                        </TreeView>
                    </div>
                </Grid>

                <Grid item  item lg={6} md={6} sm={12} xs={12}>     
                    <div style={{ marginBottom: 20, borderRadius: 3 }} >
                        <TreeView
                            defaultExpanded={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}
                            className={classes.root}
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            >
                            {renderTree(balancoPatrimonialPassivo)}
                        </TreeView>
                    </div>
                </Grid>

            </Grid>  
        </div>
        </SimpleCard>
      </div>
    );
}

BalancoPatrimonial.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(BalancoPatrimonial)
  )
);
