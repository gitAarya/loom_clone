"use client";
import FilleInput from "@/components/FilleInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { usefileInput } from "@/lib/hooks/useFileInput";
import { error } from "console";
import { title } from "process";
import React, { ChangeEvent, FormEvent, useState } from "react";

function page() {
    const [isSubmitting, setisSubmitting] = useState(false);

  const video=usefileInput(MAX_VIDEO_SIZE)
  const thumbnail=usefileInput(MAX_THUMBNAIL_SIZE)
  const [error, setError] = useState('');

  const [formData, setformData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit= async(e:FormEvent)=>{
    e.preventDefault()
    setisSubmitting(true);
    try {
      if(!video.file || thumbnail.file){
        setError("please uplaod video and thumbnail")
        return;
      }
      if(!formData.title || !formData.description){
        setError("please fill in all the details")
      }
      //upload to imagekit
      //upload to db
      //attach thumbnail
      //create a new db entry  for video details(urls data)
    } catch (error) {
      console.log("error submitting upload form");
      
    }finally{
      setisSubmitting(false)
    }
  }
  return (
    <div className="wrapper-md upload-page">
      <h1>Uplaod Page</h1>
      {error && <div className="error-field">{error}</div>}
      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter the video title"
        />
        <FormField
          id="description"
          label="description"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
          placeholder="Enter the video description"
        />
        <FilleInput
        id="video"
        label="video"
        accept="video/*"
        file={video.file}
        previewUrl={video.previewUrl}
        inputRef={video.inputRef}
        onChange={video.handleFileChange}
        onReset={video.resetFile}
        type="video"

        />

        <FilleInput 
        id="thumbnail"
        label="thumbnail"
        accept="image/*"
        file={thumbnail.file}
        previewUrl={thumbnail.previewUrl}
        inputRef={thumbnail.inputRef}
        onChange={thumbnail.handleFileChange}
        onReset={thumbnail.resetFile}
        type="image"/>

        <FormField
          id="visibility"
          label="visibility"
          value={formData.visibility}
          as="select"
          onChange={handleInputChange}
          options={[
            { value: "Public", label: "Public" },
            { value: "Private", label: "Private" },
          ]}
        />
              <button type="submit" disabled={isSubmitting} className="submit-button">{
  isSubmitting ? 'uploading...' : "Upload video"
  } </button>
      </form>
    </div>
  );
}

export default page;
