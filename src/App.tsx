import { ArrowDownRight, Bell, Ellipsis, Plus } from "lucide-react";
import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LineChart, Line, Tooltip } from 'recharts'

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
      <header className="h-12 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src="/logo.svg" alt="" className="" />
          <menu className="flex itemce gap-5">
            <li><a href="#" className="text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors">Página inicial</a></li>
            <li><a href="#" className="text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors">Histórico</a></li>
          </menu>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <button className='text-zinc-400 hover:text-zinc-100 transition-colors'>
              <Bell className="size-5" />
            </button>
          </div>

          <div className="h-6 w-px bg-zinc-800" />

          <button className="size-8 rounded-full">
            <img 
              src="https://github.com/JoaoRodrigo1996.png" 
              alt="Foto de perfil" 
              className="size-8 rounded-full object-cover" 
            />
          </button>
        </div>
      </header>

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

        <section className="border border-zinc-800 rounded-lg">
          <table className='w-full text-left'>
            <thead className='border-b border-b-zinc-800'>
              <tr>
                <th className='py-3 px-4 text-sm font-semibold text-left'>Data</th>
                <th className='py-3 px-4 text-sm font-semibold text-left'>Taxa glicêmica</th>
                <th className='py-3 px-4 text-sm font-semibold text-left'>Quantidade de insulina aplicada</th>
                <th className='py-3 px-4 text-sm font-semibold text-left'>Estado</th>
                <th className='py-3 px-4 text-sm font-semibold text-left'></th>
              </tr>
            </thead>
            <tbody>
              {
                Array.from({ length: 10 }, () => {
                  return (
                    <tr key={Math.random()} className='hover:bg-white/5'>
                      <td className='py-3 px-4 text-sm text-zinc-300'>{faker.date.anytime().toISOString()}</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>{faker.number.int({ min: 0, max: 1000 })}</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>{faker.number.int({ min: 2, max: 100 })}UI</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>{faker.lorem.word()}</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>
                        <button className="hover:bg-zinc-950 p-2.5 rounded-xl">
                          <Ellipsis className='size-4' />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </section>
      </main>
    </div> 
  )
}
