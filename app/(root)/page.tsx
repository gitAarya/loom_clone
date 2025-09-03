import Header from '@/components/Header'
import Videocard from '@/components/Videocard'
import { dummyCards } from '@/constants'


function page() {
  return (
    <main className='wrapper page '>
      <Header subHeader='Public Library' title='All Videos'/>
      {dummyCards.map( (card)=>(
        <Videocard key={card.id} {... card}/>
      ))}
   
    </main>
  )
}

export default page