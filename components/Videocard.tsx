"use client"
import Image from "next/image";
import Link from "next/link";


function Videocard({
    id,
    title,
    thumbnail,
    username,
    userImg,
    createdAt,
    visibility,
    duration,
    views
}:VideoCardProps) {
  return (

<Link href={`/video/${id}`}  className="video-card">
<Image src={thumbnail} alt="thumbnail" width={290} height={160}/>
<article>
    <div>
        <figure>
            <Image src={userImg} alt="avatar" width={34} height={34} className="rounded-full"/>
            <figcaption>
                <h3>{username}</h3>
                <p>{visibility}</p>
            </figcaption>
        </figure>
        <aside>
            <Image src="/assets/icons/eye.svg" alt="views" height={16} width={16}/>
            <span>{views}</span>
        </aside>
    </div>
    <h2>{title}-{" "}{createdAt.toLocaleDateString('en-us',{
        year:"numeric",
        month:"short",
         day:"numeric"
    })} </h2>
</article>
<button onClick={()=>{

}} className="copy-btn" >
    <Image src="/assets/icons/link.svg" alt="copy"  width={18} height={18} />

</button>
{duration &&(
    <div className="duration">
        {Math.ceil(duration/60)}min

    </div>
)}
</Link>
  )
}

export default Videocard