import { ArrowDownRight, Ellipsis, Plus } from "lucide-react";
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LineChart, Line, Tooltip } from 'recharts'
import { Header } from "./components/header";
import { TableHeader } from "./components/table/table-header";
import { Table } from "./components/table/table";
import { TableRow } from "./components/table/table-row";
import { TableCell } from "./components/table/table-cell";

export function App() {
  const data = Array.from({ length: 10 }, () => {
    return (
      {
        data: faker.date.anytime().toISOString(),
        value: faker.number.int({ min: 0, max: 1000 }),
        insulin: faker.number.int({ min: 2, max: 100 }),
        status: faker.lorem.word()
      }  
    )
  })

  return (
    <div className='max-w-5xl mx-auto py-5 flex flex-col gap-5'>
      <Header />

      <main className="flex flex-col gap-4">
        <section className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-wide">Visão geral</h2>
          <button className="flex items-center gap-2 bg-cyan-400 px-4 py-2 rounded-lg text-zinc-950 font-medium text-sm">
            Novo registro
            <Plus className='size-4' />
          </button>
        </section>

        <section className="flex gap-3">
          <div className="space-y-4 border px-4 py-3 border-zinc-800 rounded-lg">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-400 tracking-wider">Último registro</span>
              <span className="text-sm font-medium text-zinc-400 tracking-wider">{format(faker.date.anytime().toISOString(), "dd' de 'LLLL' - 'hh':'mm", { locale: ptBR })}h</span>
            </div>
            <div className="flex gap-1">
              <h4 className="font-semibold text-3xl">124</h4>
              <ArrowDownRight className='size-4 text-emerald-400' />
            </div>
          </div>

          <div className="space-y-4 border px-4 py-3 border-zinc-800 rounded-lg">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-400 tracking-wider">Gráfico glicemico</span>
              <span className="text-sm font-medium text-zinc-400 tracking-wider">Todos os registros</span>
            </div>
            <LineChart width={186} height={60} data={data}>
              <Line type='monotone' dataKey="value" stroke="#22d3ee" />
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
          </div>
          
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
                    <TableCell>{faker.date.anytime().toISOString()}</TableCell>
                    <TableCell>{faker.number.int({ min: 0, max: 1000 })}</TableCell>
                    <TableCell>{faker.number.int({ min: 2, max: 100 })}UI</TableCell>
                    <TableCell>{faker.lorem.word()}</TableCell>
                    <TableCell>
                      <button className="hover:bg-zinc-950 p-2.5 rounded-xl">
                        <Ellipsis className='size-4' />
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </tbody>
        </Table>
      </main>
    </div> 
  )
}
