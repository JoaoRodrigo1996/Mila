import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BarChart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis, X } from "lucide-react"
import { Button } from "../../components/button"
import { TableCell } from "../../components/table/table-cell"
import { TableHeader } from "../../components/table/table-header"
import { TableRow } from "../../components/table/table-row"
import { Table } from "../../components/table/table"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, Tooltip } from "recharts"
import { defineStatus } from "../../utils/define-status"
import { useQuery } from "@tanstack/react-query"
import { RegistersProps } from "../dashboard"
import { api } from "../../lib/axios"

export function History(){
  const [isGraphicModalOpen, setIsGraphicModalOpen] = useState(false)

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('page')){
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  const [total, setTotal] = useState(0)
  const totalPages = Math.ceil(total / 10)

  function setCurrentPage(page: number){
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))
    window.history.pushState({}, "", url)

    setPage(page)
  }

  function goToNextpage(){
    setCurrentPage(page + 1)
  }

  function goToPreviousPage(){
    setCurrentPage(page - 1)
  }

  function goToFirstPage(){
    setCurrentPage(1)
  }

  function goToLastPage(){
    setCurrentPage(totalPages)
  }

  const { data } = useQuery<RegistersProps[]>({
    queryKey: ['registers'],
    queryFn: async () => {
      const response = await api.get(`/glycemic?_sort=date&_order=desc&_page${page}`)
      setTotal(response.data.length)
      return response.data
    }
  })
  
  function openGraphicModal(){
    setIsGraphicModalOpen(true)
  }

  function closeGraphicModal(){
    setIsGraphicModalOpen(false)
  }

  return (
    <main className="flex flex-col gap-4">
      <section className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wide">Histórico</h2>
        <Button size='sm' onClick={openGraphicModal}>
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
              data?.map(glycemic => (
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
                    <Button size="icon" variant="tertiary">
                      <Ellipsis className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              )) 
            }
          </tbody>
          <tfoot>
            <TableCell colSpan={3}>Mostrando {data?.length} de {total} registros</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span className="">Página {page} de {totalPages}</span>
                <div className="flex gap-1.5">
                  <Button onClick={goToFirstPage} disabled={page === 1} variant='tertiary' size='icon' >
                    <ChevronsLeft className="size-4"/>
                  </Button>
                  <Button onClick={goToPreviousPage} disabled={page === 1} variant='tertiary' size='icon' >
                    <ChevronLeft className="size-4"/>
                  </Button>
                  <Button onClick={goToNextpage} disabled={page === totalPages} variant='tertiary' size='icon' >
                    <ChevronRight className="size-4"/>
                  </Button>
                  <Button onClick={goToLastPage} disabled={page === totalPages} variant='tertiary' size='icon' >
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
                  <Button onClick={closeGraphicModal} variant='tertiary' size='icon'>
                    <X className='size-4 text-zinc-400' />
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
