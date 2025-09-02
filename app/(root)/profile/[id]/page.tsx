import Header from "@/components/Header"


async function page({params}:ParamsWithSearch) {
    const {id}= await params
  return (
    <div className="wrapper page">
        <Header subHeader="aarya@gmail.com" title="Aarya" userImg="/assets/images/dummy.jpg"/>
       <h1 className="text-2xl font-satoshi">User ID: {id}</h1> </div>
  )
}

export default page