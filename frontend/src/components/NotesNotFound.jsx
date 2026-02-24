import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center max-w-md py-16 space-y-6 mx-auto text-center'>
        <div className='bg-primary/10 rounded-full p-8'>
            <NotebookIcon className='size-10 text-primary' />
        </div>
        <h3 className=' text-2xl font-bold'>Notes Not Found</h3>
        <p className=' text-base-content/70'>
            Ready to organize your notes? Get started by Creating your first note.
        </p>
        <Link className='btn btn-primary' to={"/create"}>
            Create Your First Note
        </Link>
    </div>
  )
}

export default NotesNotFound