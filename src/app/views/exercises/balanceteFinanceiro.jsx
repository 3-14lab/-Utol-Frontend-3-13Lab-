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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

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
    category: {
      fontWeight: 'inherit',
      flexGrow: 1,
    }
  }));

  const useStyles = makeStyles({
    root: {
      height: 264,
      maxWidth: 600,
    },
    label: {
        width: 120
    }
  });
  
  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const style = useStyles();
    const { category, total, preview_value, debito_value, credito_value, color, bgColor, nodeId, ...other } = props;
    
    const [open, setOpen] = useState(false);
    const [nodeIdAtual, setNodeIdAtual] = useState();
    const [releases, setReleases] = useState([]);

    const id_exercise = props.id_exercise;
    const id_class = props.id_class;

    useEffect(()=>{
        async function loadReleases(){
            if (nodeIdAtual != undefined) {
                const result = await api.get(`getReleasesByCategorieExercise/${nodeIdAtual}/${id_exercise}/${id_class}`);
                setReleases(result.data);
            }
        }

        loadReleases();
    }, [nodeIdAtual])

    function handleClickOpen(nodeId) {
        setNodeIdAtual(nodeId);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
      }

    return (
        <Fragment>

            <TreeItem
                TransitionProps={{in: true}}
                nodeId={`${nodeId}`}
                label={
                <div className={classes.labelRoot}>
                    <Typography variant="body2" className={classes.category}>
                        <Link onClick={() => {handleClickOpen(nodeId)}}>{category}</Link>
                    </Typography>
                    <div style={{textAlign: 'right', display: 'flex', width: '300px', justifyContent: 'space-between'}}>
                        <Typography className={style.label} variant="caption" >
                            <Link onClick={() => {handleClickOpen(nodeId)}}>{preview_value ? preview_value : '-'}</Link>
                        </Typography>
                        <Typography className={style.label} variant="caption">
                            <Link onClick={() => {handleClickOpen(nodeId)}}>{debito_value  ? debito_value : '-'}</Link>
                        </Typography>
                        <Typography className={style.label} variant="caption">
                            <Link onClick={() => {handleClickOpen(nodeId)}}>{credito_value ? credito_value : '-'}</Link>
                        </Typography>
                        <Typography className={style.label} variant="caption">
                            <Link onClick={() => {handleClickOpen(nodeId)}}>{total}</Link>                        
                        </Typography>
                    </div>                    
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>
                        {releases.length > 0 ? `Histórico - ${releases[0].name}` : 'Histórico'}                
                    </DialogTitle>
                <DialogContent>

                {releases.length == 0 ? 
                    <DialogContentText id="alert-dialog-description">
                        Não há lançamentos nessa conta.
                    </DialogContentText>
                 : 
                 
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-0" style={{textAlign: 'left'}}>Atividade</TableCell>
                            <TableCell className="px-0" style={{textAlign: 'center'}}>Tipo da movimentação</TableCell>
                            <TableCell className="px-0" style={{textAlign: 'center'}}>Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>     
                        {releases[0].initial_value != undefined && releases[0].initial_value != 0 ? 
                          <TableRow>
                              <TableCell className="px-0 capitalize" align="left">
                                {releases[0].nomeExercicio ? releases[0].nomeExercicio : "Padrão"}
                              </TableCell>
                              <TableCell className="px-0 capitalize" align="center">
                                Valor Inicial
                              </TableCell>
                              <TableCell className="px-0 capitalize" align="center" style={{color: '#555'}}>
                                  ${releases[0].initial_value}
                              </TableCell>                            
                          </TableRow>  
                        : ''}                       
                        {releases.map((release, index) =>                    
                            <TableRow>
                                <TableCell className="px-0 capitalize" align="left">
                                  {release.nomeExercicio ? release.nomeExercicio : "Padrão"}
                                </TableCell>

                                <TableCell className="px-0 capitalize" align="center">
                                {release.release_type == "D" ? "Débito" : "Crédito"}
                                </TableCell>

                                {release.release_type != release.category_type ? 
                                    <TableCell className="px-0 capitalize" align="center">
                                        <span style={{color: '#F44336'}}>${release.value}</span>
                                    </TableCell> 
                                :
                                    <TableCell className="px-0 capitalize" align="center" style={{color: '#555'}}>
                                        <span style={{color: '#1b832d'}}>${release.value}</span>
                                    </TableCell>
                                }
                                
                            </TableRow>                        
                        )}  
                                     
                    </TableBody>
                </Table>

                }  

                

                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Fechar
                </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
      
    );
  }
  
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    total: PropTypes.number,
    preview_value: PropTypes.number,
    debito_value: PropTypes.number,
    credito_value: PropTypes.number,
    category: PropTypes.string,
  };
  
  
 

const BalanceteFinanceiro = props => {
  
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
            category={balancoPatrimonial.category}
            total={balancoPatrimonial.sumOfTheChildren + balancoPatrimonial.initial_value}
            preview_value={balancoPatrimonial.preview_value}
            debito_value={balancoPatrimonial.debito_value}
            credito_value={balancoPatrimonial.credito_value}
            color="#3B5998"
            bgColor="#e8f0fe"
            id_exercise={id_exercise}
            id_class={id_class}
        >
          {Array.isArray(balancoPatrimonial.children) ? balancoPatrimonial.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
      );

    return (
        <div className="m-sm-30">

        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Meus Cursos", path: "/dashboard/analytics" },
              { name: "Detalhes de curso", path: "/dashboard/detalhesCurso" },
              { name: "Detalhes de aula", path: "/dashboard/detalhesAula" },
              { name: "Detalhes de exercício", path: "/exercicio/detalhesAula" },
              { name: "Balancete" }
            ]}
          />
        </div>

        <SimpleCard title="Balancete Financeiro">
          <div>

            <Grid container style={{flexDirection: 'row', justifyContent: 'space-between', height: '600px'}} lg={12} md={12} sm={12} xs={12} spacing={6} className="overflow-auto">

                <Grid item lg={6} md={6} sm={12} xs={12}>   
                    <div style={{maxWidth: '600px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                        <span style={{width: '50%'}}><strong>Balanço Patrimonial</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Saldo Inicial</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Mov. Débito</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Mov. Crédito</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Saldo Final</strong></span>
                    </div>            
                        
                    <div style={{ marginBottom: 20, borderRadius: 3 }} >
                        <TreeView
                            // defaultExpanded={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}
                            // expanded={balancoPatrimonial.length}
                            className={classes.root}
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            >
                            {renderTree(balancoPatrimonial)}
                        </TreeView>
                    </div>
                </Grid>


                <Grid item lg={6} md={6} sm={12} xs={12}>   
                    <div style={{maxWidth: '600px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                        <span style={{width: '50%'}}><strong>Balanço Patrimonial</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Saldo Inicial</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Mov. Débito</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Mov. Crédito</strong></span>
                        <span style={{textAlign: 'right'}}><strong>Saldo Final</strong></span>
                    </div>                        

                    <div style={{ marginBottom: 20, borderRadius: 3 }} >
                        <TreeView
                            // defaultExpanded={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}
                            // expanded={balancoPatrimonial.length}
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

BalanceteFinanceiro.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles({}, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
    })(BalanceteFinanceiro)
  )
);
