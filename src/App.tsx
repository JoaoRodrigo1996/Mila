import { Bell, Ellipsis } from "lucide-react";

export function App() {
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
        <section className="">
          <h2 className="text-2xl font-bold tracking-wide">Visão geral</h2>
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
                    <tr className=' hover:bg-white/5'>
                      <td className='py-3 px-4 text-sm text-zinc-300'>19/07/2024 - 14:00h</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>115</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>16UI</td>
                      <td className='py-3 px-4 text-sm text-zinc-300'>Normal</td>
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
