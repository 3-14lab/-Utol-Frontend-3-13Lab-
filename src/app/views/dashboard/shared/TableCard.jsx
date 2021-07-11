import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

import { Link } from "react-router-dom";

const TableCard = () => {
  const productList = [
    {
      imgUrl: "/assets/images/products/headphone-2.jpg",
      name: "Gestão da Informação",
      price: 100,
      available: 15
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "Gestão Empresarial",
      price: 1500,
      available: 30
    },
    {
      imgUrl: "/assets/images/products/iphone-2.jpg",
      name: "Gestão de Projetos",
      price: 1900,
      available: 35
    },
    {
      imgUrl: "/assets/images/products/iphone-1.jpg",
      name: "Gestão da Saúde",
      price: 100,
      available: 0
    }
  ];

  return (
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
                Progresso
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Ação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              
                <TableRow key={index}>
                  
                  <TableCell className="px-0 capitalize" colSpan={4} align="left">
                    <Link to={{ pathname: 'detalhesCurso', state: { curso: product} }}>{product.name}</Link>                    
                  </TableCell>

                  <TableCell className="px-0" align="left" colSpan={2}>
                    {product.available ? (
                      product.available < 20 ? (
                        <small className="border-radius-4 bg-secondary text-white px-2 py-2px ">
                          Andamento
                        </small>
                      ) : (
                        <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                          Concluido
                        </small>
                      )
                    ) : (
                      <small className="border-radius-4 bg-error text-white px-2 py-2px ">
                        Cancelado
                      </small>
                    )}
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
  );
};

export default TableCard;
