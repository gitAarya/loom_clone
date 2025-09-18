"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { apiClient, VideoFormData } from "@/lib/ApiClient";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSession, } from "next-auth/react";


function Page() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [visibility, setvisibility] = useState("public")
  const [error, setError] = useState("");
   const { data: session, status } = useSession();
  
  const [videoFile, setvideoFile] = useState<{url: string} | null>(null)
const [thumbnailFile, setthumbnailFile] = useState<{url: string} | null>(null)
  
const handleVideoUploadSuccess=(uploadResponse:any)=>{
setvideoFile({
  url:uploadResponse.url
})
console.log(uploadResponse?.url);

}
  
const handleThumbnailUploadSuccess=(uploadResponse:any)=>{
setthumbnailFile({
  url:uploadResponse.url
})
console.log(uploadResponse?.url);

}
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    try {
     // Validate required fields
      if (!title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!videoFile) {
        throw new Error('Video file is required');
      }

     const videoData: VideoFormData = {
  title: "My Video",
  description: "Description",
  videoUrl: "url",
  thumbnailUrl: "thumb",
  visibility: "public", // or the correct Visibility type
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: session?.user.id as any, // Replace with actual user ID
};

      await apiClient.createVideo(videoData); 
      alert('Video created successfully!');

      
      // Reset form
      settitle('');
      setdescription('');
      setvideoFile(null);
      setthumbnailFile(null);
    } catch (error) {
       console.error(error);
      setError(error instanceof Error ? error.message : 'Failed to save video details');
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Uplaod Page</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Enter the video title"
        />
        <FormField
          id="description"
          label="description"
          value={description}
          as="textarea"
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Enter the video description"
        />
        <FileInput
        onSuccess={handleVideoUploadSuccess}
        fileType="video"
        previewUrl={videoFile?.url}

        />
        
        <FileInput
        onSuccess={handleThumbnailUploadSuccess}
        fileType="image"
        previewUrl={thumbnailFile?.url}

        />


        <FormField
          id="visibility"
          label="visibility"
          onChange={(e) => setvisibility(e.target.value)}
          value={visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "Private", label: "Private" },
          ]}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "uploading..." : "Upload video"}{" "}
        </button>
      </form>
    </div>
  );
}

export default Page;
