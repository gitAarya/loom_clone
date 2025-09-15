import React, { ChangeEvent } from 'react'
import Image from 'next/image';
declare interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  previewUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  type: "video" | "image";
}

function FilleInput({id,label,accept,file,previewUrl,inputRef,onChange,onReset,type}:FileInputProps) {
  return (
    <section className='file-input'>  
      <label htmlFor={id}>{label}</label>
      <input type="file" name={id} id={id} accept={accept} onChange={onChange} ref={inputRef}  hidden  />
      {!previewUrl ?(
        <figure onClick={ ()=>{
          inputRef.current?.click()
        }}>
          <Image src="/assets/icons/upload.svg"  alt='upload' height={24} width={24} />
          <p>Click to upload your {id} </p>
        </figure>
      ):(
        <div>
          {type ==="video" ? <video src={previewUrl} controls muted  />: <Image src={previewUrl} alt='thumbnail' fill />}
          <button type='button' onClick={onReset}>
            <Image src="assets/icons/close.svg" alt='close' height={16} width={16}/>
          </button>
          <p>{file?.name}</p>
        </div>
      )
      }
    </section>
  )
}

export default FilleInput