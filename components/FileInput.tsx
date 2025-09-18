"use client"
import { MAX_VIDEO_SIZE } from "@/constants";
import { upload } from "@imagekit/next"
import { useRef,useState } from "react";
import Image from "next/image";
interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  previewUrl:any
}
const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      
      if (!signature || !expire || !token || !publicKey) {
        throw new Error("Invalid authentication response");
      }
      
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

const FileInput=({onSuccess,onProgress,fileType ,previewUrl,}:FileUploadProps)=>{
  const [uploading, setUploading] = useState(false)
  const [progress, setprogress] = useState(0)
  const [error, seterror] = useState<string |null>(null)
  const inputRef=useRef<HTMLInputElement>(null)




const abortController=new AbortController();
const validateFile=(file:File)=>{
  seterror(null);
  if(fileType=="image" && !file.type.startsWith("image/")){
    seterror("please uplaod a valid image file")
  }
  
  if(fileType=="video" && !file.type.startsWith("video/")){
    seterror("please uplaod a valid video file");
    return false;
  }
  if(file.size >MAX_VIDEO_SIZE){
    seterror(`File must be less than ${MAX_VIDEO_SIZE}`)
    return false;

  }
  return true;



}
const handelFileChange= async (e:React.ChangeEvent<HTMLInputElement>)=>{
  const file=e.target.files?.[0]
  if(!file || !validateFile(file)) return;
  setUploading(true);
  seterror(null)
  try {
    const authParams=await authenticator()
    const { signature, expire, token, publicKey }=authParams;
    const uplaodRes= await upload(
      {expire,
      token,
      publicKey,
      signature,
      file,
      fileName:file.name,
      abortSignal:abortController.signal,
      onProgress: (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setprogress(percent);
          onProgress?.(percent);
        }
      }
      },
    )
    onSuccess(
      {
        url:uplaodRes.url,
        name:uplaodRes.name,
        fileId:uplaodRes.fileId,
        size:uplaodRes.size,
        filePath:uplaodRes.filePath,
      }
    )
  } catch (error) {
    console.log("error while uploading file",error);
    seterror(`file uplaod failed ${error}`)
    
    
  }finally{
    setUploading(false)
    setprogress(0)

  }

}

  return(
     <section className='file-input'>  
      <label htmlFor={fileType}>{fileType}</label>
      <input type="file" name={fileType} id={fileType} accept={fileType} onChange={handelFileChange} ref={inputRef}  hidden  />
      {!previewUrl ?(
        <figure onClick={ ()=>{
          inputRef.current?.click()
        }}>
          <Image src="/assets/icons/upload.svg"  alt='upload' height={24} width={24} />
          <p>Click to upload your {fileType} </p>
        </figure>
      ):(
        <div>
          {fileType ==="video" ? <video src={previewUrl} />: <Image src={previewUrl} alt='Image' fill />}
          <button type='button' onClick={()=>{
            
          }}>
            <Image src="assets/icons/close.svg" alt='close' height={16} width={16}/>
          </button>
          <p>{fileType}</p>
        </div>
      )
      }
    </section>
  )
}
export default FileInput;