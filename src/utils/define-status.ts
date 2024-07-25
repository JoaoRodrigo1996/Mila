export function defineStatus(rate: string){
  if (Number(rate) <= 60) return 'BAIXO'
  if (Number(rate) <= 160) return 'NORMAL'
  if (Number(rate) > 160) return 'ALERTA'
}
