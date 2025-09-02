import Header from '@/components/Header'
import Videocard from '@/components/Videocard'
import React from 'react'

function page() {
  return (
    <main className='wrapper page'>
      <Header subHeader='Public Library' title='All Videos'/>
    <Videocard id="1"
     title="snap-Message" 
     thumbnail="/assets/samples/thumbnail (1).png" 
      createdAt={new Date("2025-09-02 08:15:30.437")} 
    userImg="/assets/images/jason.png"
     username="jason"
      views={45} 
      visibility="public"
       duration={156}/>
        <Videocard id="2"
     title="snap-Message" 
     thumbnail="/assets/samples/thumbnail (1).png" 
      createdAt={new Date("2025-09-02 08:15:30.437")} 
    userImg="/assets/images/jason.png"
     username="jason"
      views={45} 
      visibility="public"
       duration={156}/>
    </main>
  )
}

export default page