import { ArrowLeftIcon } from 'lucide-react';
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("Title and content is required");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/notes",{
        title,
        content
      })

      toast.success("Note created successfully!")
      navigate("/")
      
    } catch (error) {
      console.log("Error creating Note", error);
      if(error.response.status === 429){
        toast.error("Slow down! You are creating notes too foasr",{
          duration:4000,
          icon : "💀"
        })
      }
      toast.error("Failed to create note!");
      
    } finally{
      setIsLoading(false)
    }

  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className=' container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className='fieldset mb-4'>
                  <legend className=' fieldset-label  text-sm'>Title</legend>
                  <input 
                  type="text" 
                  className='input input-bordered w-full' 
                  placeholder='Note Title'
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  
                   />

                </fieldset>
                <fieldset className='fieldset mb-4'>
                  <legend className=' fieldset-label  text-sm'>Content</legend>
                  <textarea 
                  type="text" 
                  className='textarea textarea-bordered h-32 w-full' 
                  placeholder='Write your note here...'
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                  
                   />

                </fieldset>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePage