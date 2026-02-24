import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to load note!");
        console.log("Error in loading note", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async() => {
    if(!window.confirm("Are you sure you want to delete this note")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully!");
      navigate("/")
    } catch (error) {
      console.log("Error in deleting the note", error)
      toast.error("Failed to delete note!");
    }
    
  };

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim() ){
      toast.error("Please add a Title or Content!");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note saved successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note", error)
      toast.error("Failed to save note!");
    } finally{
      setSaving(false)
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost ">
              <ArrowLeftIcon className="size-5" />
              Back To Home
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">

              <fieldset className="fieldset mb-4">
                <legend className=" fieldset-label  text-sm">Title</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Note Title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </fieldset>

              <fieldset className='fieldset mb-4'>
                  <legend className=' fieldset-label  text-sm'>Content</legend>
                  <textarea 
                  type="text" 
                  className='textarea textarea-bordered h-32 w-full' 
                  placeholder='Write your note here...'
                  value={note.content}
                  onChange={(e)=>setNote({...note, content: e.target.value})}
                  
                   />

              </fieldset>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
