"use client"
import FilleInput from '@/components/FilleInput'
import FormField from '@/components/FormField'
import { error } from 'console'
import { title } from 'process'
import React, { ChangeEvent, useState } from 'react'

function page() {
    const[error,setError] =useState(null)
    // const[Error,setError] =useState(null)
    const [formData, setformData] = useState( {title:"",description:"",visibility:"public"})
    const handleInputChange=(e:ChangeEvent )=>{
        const{name,value}=e.target
        setformData((prevState)=>({...prevState,[name]:value}))
    }
  return (
    <div className='wrapper-md upload-page'>
        <h1>Uplaod Page</h1>
        {
            error && 
            <div className='error-field'>
                {error}
            </div>
        }
        <form className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7'>
         <FormField 
         id="title"
         lable="title"
         value={formData.title}
            onChange={handleInputChange}
            placeholder="enter  video Title"
         />
        <FilleInput/>
        </form>
       
    </div>
  )
}

export default page