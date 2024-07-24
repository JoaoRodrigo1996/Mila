import { faker } from "@faker-js/faker"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "lucide-react"
import { Button } from "../../components/button"
import { TableCell } from "../../components/table/table-cell"
import { TableHeader } from "../../components/table/table-header"
import { TableRow } from "../../components/table/table-row"
import { Table } from "../../components/table/table"

export function History(){
  return (
    <main className="flex flex-col gap-4">
      <section className="">
        <h2 className="text-2xl font-bold tracking-wide">Histórico</h2>
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
    </main>
  )
}
