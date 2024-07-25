import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BarChart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis, X } from "lucide-react"
import { Button } from "../../components/button"
import { TableCell } from "../../components/table/table-cell"
import { TableHeader } from "../../components/table/table-header"
import { TableRow } from "../../components/table/table-row"
import { Table } from "../../components/table/table"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Tooltip } from "recharts"
import { api } from "../../lib/axios"
import { defineStatus } from "../../utils/define-status"

// const dataG = [
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 120,
//     quantity: 16,    
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 152,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 92,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 180,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 144,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 210,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 160,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 103,
//     quantity: 16,
//   },
//   {
//     date: "2024-07-24T21:24:57.729Z",
//     rate: 60,
//     quantity: 16,
//   },
// ]

interface DataProps {
  date: string,
  rate: string,
  quantity: string,
}

export function History(){
  const [isGraphicModalOpen, setIsGraphicModalOpen] = useState(false)
  const [data, setData] = useState<DataProps[]>([])

  function openGraphicModal(){
    setIsGraphicModalOpen(true)
  }

  function closeGraphicModal(){
    setIsGraphicModalOpen(false)
  }

  async function fetchGlycemic(){
    const response = await api.get('/glycemic')

    setData(response.data)
  }

  useEffect(()=>{
    fetchGlycemic()
  }, [])

  return (
    <main className="flex flex-col gap-4">
      <section className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wide">Histórico</h2>
        <Button onClick={openGraphicModal}>
          Ver gráfico
          <BarChart className='size-4' />
        </Button>
      </section>
      <section className="">
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
              data.map(glycemic => (
                <TableRow key={Math.random()}>
                  <TableCell>{format(glycemic.date, "dd' de 'LLLL' - 'hh':'mm", { locale: ptBR })}h</TableCell>
                  <TableCell>{glycemic.rate}</TableCell>
                  <TableCell>{glycemic.quantity}UI</TableCell>
                  <TableCell>
                  <span 
                    className={
                      defineStatus(glycemic.rate) === 'BAIXO' 
                        ? 'py-1 px-2 rounded-xl text-[10px] font-semibold bg-red-950 text-red-300' 
                        : defineStatus(glycemic.rate) === 'NORMAL' 
                        ? 'py-1 px-2 rounded-xl text-[10px] font-semibold bg-emerald-950 text-emerald-300'
                        : 'py-1 px-2 rounded-xl text-[10px] font-semibold bg-yellow-950 text-yellow-300'
                        
                      }
                  >
                    {defineStatus(glycemic.rate)}
                  </span>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="icon">
                      <Ellipsis className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              )) 
            }
          </tbody>
          <tfoot>
            <TableCell colSpan={3}>Mostrando 10 de 1000 registros</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span className="">Página 1 de 100</span>
                <div className="flex gap-1.5">
                  <Button variant='icon' size='icon' >
                    <ChevronsLeft className="size-4"/>
                  </Button>
                  <Button variant='icon' size='icon' >
                    <ChevronLeft className="size-4"/>
                  </Button>
                  <Button variant='icon' size='icon' >
                    <ChevronRight className="size-4"/>
                  </Button>
                  <Button variant='icon' size='icon' >
                    <ChevronsRight className="size-4"/>
                  </Button>
                </div>
              </div>
            </TableCell>
          </tfoot>
        </Table>
      </section>
      {
        isGraphicModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[820px] space-y-5 rounded-2xl py-5 px-6 shadow-lg bg-zinc-950">
              <div className="">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-wide">Gráfico glicêmico</h2>
                  <Button onClick={closeGraphicModal} variant='icon' size='icon'>
                    <X className='size-5 text-zinc-400' />
                  </Button>
                </div>
                <p className="text-sm text-zinc-400 ">
                  Veja aqui uma representação em gráfico do seu histórico glicêmico.
                </p>
              </div>

              <AreaChart width={796} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FAFAFA" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FAFAFA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </div>
          </div>
        )
      }
    </main>
  )
}
