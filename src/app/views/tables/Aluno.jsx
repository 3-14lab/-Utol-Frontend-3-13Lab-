import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow
} from "@material-ui/core";

import { Breadcrumb, SimpleCard } from "matx";

import api from "../../services/api";


const Professor = () => {

  const [movimentacoes, setMovimentacoes] = useState([])

  useEffect(() => {
      async function loadMovimentacoes() {
        var response = await api.get(`getMovimentacoesAluno`);
        setMovimentacoes(response.data);
      }
      loadMovimentacoes();
  }, []);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/dashboard/home" },
            { name: "Movimentações - Aluno" }
          ]}
        />
      </div>

      <div className="w-full overflow-auto">
      <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">Exercicio</TableCell>
              <TableCell className="px-0">Usuário</TableCell>
              <TableCell className="px-0">Plano de contas Pai</TableCell>
              <TableCell className="px-0">Plano de contas Usuario</TableCell>
              <TableCell className="px-0">Saldo Inicial</TableCell>
              <TableCell className="px-0">Mov Debito</TableCell>
              <TableCell className="px-0">Mov Credito</TableCell>
              <TableCell className="px-0">Saldo Final</TableCell>
              <TableCell className="px-0">Valor unitario</TableCell>
              <TableCell className="px-0">Debito Quant.</TableCell>
              <TableCell className="px-0">Credito Quant.</TableCell>
              <TableCell className="px-0">Quantidade Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimentacoes.map((movimentacao, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {movimentacao.nome_exercicio ? movimentacao.nome_exercicio : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize" align="left">
                  {movimentacao.nmusuario ? movimentacao.nmusuario : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize" align="left">
                  {movimentacao.plano_contas_pai_nome ? movimentacao.plano_contas_pai_nome : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize" align="left">
                  {movimentacao.nome ? movimentacao.nome : '-'}
                </TableCell>
                
                <TableCell className="px-0 capitalize">
                  {movimentacao.saldo_inicial_valor ? movimentacao.saldo_inicial_valor : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {movimentacao.mov_debito_valor ? movimentacao.mov_debito_valor : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {movimentacao.mov_credito_valor ? movimentacao.mov_credito_valor : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {movimentacao.saldo_final_valor ? movimentacao.saldo_final_valor : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {movimentacao.valor_unitario ? movimentacao.valor_unitario : '-'}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {(() => {
                    if (movimentacao.atributo == 'financeiro') {
                      return (
                        '-'
                      )
                    } else if (movimentacao.mov_debito_quant) {
                      return (
                        movimentacao.mov_debito_quant
                      )
                    } else {
                      return '-'
                    }
                  })()}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {(() => {
                    if (movimentacao.atributo == 'financeiro') {
                      return (
                        '-'
                      )
                    } else if (movimentacao.mov_credito_quant) {
                      return (
                        movimentacao.mov_credito_quant
                      )
                    } else {
                      return '-'
                    }
                  })()}
                </TableCell>

                <TableCell className="px-0 capitalize">
                  {(() => {
                    if (movimentacao.atributo == 'financeiro') {
                      return (
                        '-'
                      )
                    } else if (movimentacao.saldo_final_quant) {
                      return (
                        movimentacao.saldo_final_quant
                      )
                    } else {
                      return '-'
                    }
                  })()}
                </TableCell>

                

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Professor;
