import { useState } from "react";
import { ArchiveX, ArrowDownRight, Ellipsis, Plus, UserRoundX } from "lucide-react";
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "../../components/button";
import { Card } from "../../components/card/card";
import { CardContent } from "../../components/card/card-content";
import { CardHeader } from "../../components/card/card-header";
import { TableCell } from "../../components/table/table-cell";
import { TableHeader } from "../../components/table/table-header";
import { TableRow } from "../../components/table/table-row";
import { Table } from "../../components/table/table";
import { CreateRegisterModal } from "./create-register-modal";
import { api } from "../../lib/axios";
import { defineStatus } from "../../utils/define-status";

export interface RegistersProps {
  id: string
  rate: string
  quantity: string
  date: string
}

export function Dashboard() {
  const { isSignedIn, isLoaded } = useUser()
  const [isCreateRegisterModalOpen, setIsCreateRegisterModalOpen] = useState(false)
  const { data, isPending } = useQuery<RegistersProps[]>({
    queryKey: ['registers'],
    queryFn: async () => {
      const response = await api.get('/glycemic?_sort=-date&_limit=5')
      return response.data
    }
  })

  function openCreateRegisterModal(){
    setIsCreateRegisterModalOpen(true)
  }

  function closeCreateRegisterModal(){
    setIsCreateRegisterModalOpen(false)
  }

  if(!isLoaded){
    return (
      <div className="">Carregando...</div>
    )
  }

  return (
    <>    
      {
        isSignedIn ? (
          <main className="flex flex-col gap-4">
            <section className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-wide">Visão geral</h2>
              <Button size='sm' onClick={openCreateRegisterModal}>
                Novo registro
                <Plus className='size-3' />
              </Button>
            </section>

            {
              data && data.length >= 0 ? (
                <>
                  {
                    isPending ? (
                      <div className="">Carregando QUERY...</div>
                    ) : (

                      <>
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
                              data.map(glycemic => (
                                <TableRow key={glycemic.date}>
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
                        </Table>
                      </>
                    )
                  }
                </>
              ) : (
                <main className='pt-32 flex items-center justify-center'>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex flex-col items-center gap-2">
                      <ArchiveX className="size-20" />
                      <span className="text-2xl font-medium ">Você não tem nenhum registro.</span>
                    </div>
                    <span className="text-zinc-400">Crie o seu primeiro registro e comece a criar seu histórico glicemico.</span>
                  </div>
                </main>
              )
            }
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
          <CreateRegisterModal 
            closeCreateRegisterModal={closeCreateRegisterModal}
          />
        )
      }
    </>
  )
}
