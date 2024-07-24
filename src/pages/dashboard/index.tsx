import { useState } from "react";
import { ArrowDownRight, Ellipsis, Plus, UserRoundX } from "lucide-react";
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LineChart, Line, Tooltip } from 'recharts'

import { Button } from "../../components/button";
import { Card } from "../../components/card/card";
import { CardContent } from "../../components/card/card-content";
import { CardHeader } from "../../components/card/card-header";
import { TableCell } from "../../components/table/table-cell";
import { TableHeader } from "../../components/table/table-header";
import { TableRow } from "../../components/table/table-row";
import { Table } from "../../components/table/table";
import { data } from "../../data";
import { useStore } from "../../store/auth";
import { CreateRegisterModal } from "./create-register-modal";

export function Dashboard() {
  const { isLoggedIn } = useStore((store) => {
    return {
      isLoggedIn: store.isLoggedIn
    }
  })

  const [isCreateRegisterModalOpen, setIsCreateRegisterModalOpen] = useState(false)

  function openCreateRegisterModal(){
    setIsCreateRegisterModalOpen(true)
  }

  function closeCreateRegisterModal(){
    setIsCreateRegisterModalOpen(false)
  }

  return (
    <>
      {
        isLoggedIn ? (
          <main className="flex flex-col gap-4">
            <section className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-wide">Visão geral</h2>
              <Button onClick={openCreateRegisterModal}>
                Novo registro
                <Plus className='size-4' />
              </Button>
            </section>

            <section className="flex gap-3">
              <Card>
                <CardHeader>
                  <span className="text-sm text-zinc-400 tracking-wider font-medium">Último registro</span>
                  <span className="text-xs text-zinc-400 tracking-wider">{format(faker.date.anytime().toISOString(), "dd' de 'LLLL' - 'hh':'mm", { locale: ptBR })}h</span>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    <span className="font-bold text-3xl">124</span>
                    <ArrowDownRight className='size-4 text-emerald-400' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <span className="text-sm text-zinc-400 tracking-wider font-medium">Gráfico glicemico</span>
                  <span className="text-xs text-zinc-400 tracking-wider">Todos os registros</span>
                </CardHeader>
                <CardContent>
                  <LineChart layout="horizontal" width={200} height={60} data={data}>
                    <Line 
                      type='monotone' 
                      dataKey="value" 
                      stroke="#22d3ee" 
                      dot={{ stroke: '#22d3ee', strokeWidth: 2, fill: '#22d3ee' }}
                    />
                    <Tooltip 
                      itemStyle={{ fontSize: '14px', color: 'white' }} 
                      labelStyle={{ fontSize: '18px', color: '#a1a1aa' }}
                      contentStyle={{ 
                        backgroundColor: '#27272a',
                        borderRadius: '12px',
                        border: 0,
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '12px',
                        paddingBottom: '12px',
                      }}
                      isAnimationActive
                    />
                  </LineChart>
                </CardContent>
              </Card>
              
            </section>

            <Table>
              <thead className='border-b border-b-zinc-800'>
                <tr>
                  <TableHeader>Data</TableHeader>
                  <TableHeader>Taxa glicêmica</TableHeader>
                  <TableHeader>Quantidade de insulina aplicada</TableHeader>
                  <TableHeader>Estado</TableHeader>
                  <TableHeader></TableHeader>
                </tr>
              </thead>
              <tbody>
                {
                  Array.from({ length: 10 }, () => {
                    return (
                      <TableRow key={Math.random()}>
                        <TableCell>{format(faker.date.anytime().toISOString(), "dd' de 'LLLL' - 'hh':'mm", { locale: ptBR })}h</TableCell>
                        <TableCell>{faker.number.int({ min: 0, max: 1000 })}</TableCell>
                        <TableCell>{faker.number.int({ min: 2, max: 100 })}UI</TableCell>
                        <TableCell>{faker.lorem.word()}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="icon">
                            <Ellipsis className='size-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </tbody>
            </Table>
          </main>
        ) : (
          <main className='pt-32 flex items-center justify-center'>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex flex-col items-center gap-2">
                <UserRoundX className="size-20" />
                <span className="text-2xl font-medium ">Você não está logado</span>
              </div>
              <span className="text-zinc-400">Crie a sua conta e comece a criar seu histórico glicemico.</span>
            </div>
          </main>
        )
      }
      {
        isCreateRegisterModalOpen && (
          <CreateRegisterModal closeCreateRegisterModal={closeCreateRegisterModal} />
        )
      }
    </>
  )
}
