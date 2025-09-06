import Header from "@/components/Header"
import { dummyCards } from "@/constants"
import Videocard from "@/components/Videocard"


async function page({params}:ParamsWithSearch) {
    const {id}= await params
  return (
    <div className="wrapper page">
        <Header subHeader="aarya@gmail.com" title="Aarya" userImg="/assets/images/dummy.jpg"/>
         <section className="video-grid">

          {dummyCards.map( (card)=>(
        <Videocard key={card.id} {... card}/>
      ))}

         </section>
     
     </div>
  )
}

export default page