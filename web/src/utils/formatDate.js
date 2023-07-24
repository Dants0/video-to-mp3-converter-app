import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';
dayjs.locale("pt-br")

export function formatDate(date){
  console.log(date)
  return dayjs(date).format('DD/MM/YYYY')
}