"use client"
import CodeEditor from '@/components/custom/editor'
import NavBar from '@/components/custom/nav'
import { addPaste } from '../actions'

const handleSubmit = async (e: any) => {
    e.preventDefault()
    const fileName = e.target[0].value
    const content = e.target[1].value
    const language = e.target[2].innerText.toLowerCase()
    const res = await addPaste(fileName, language, content)
    if (res) {
        window.location.href = `/paste/${fileName}`
    } else {
        alert('An error occurred')
    }
}

export default function PasteHome() {
    return (
        <div>
            <NavBar title='NoobPaste' />
            <div className='flex flex-row justify-center items-center md:mt-10 mt-2'>
                <div className='w-2/3 border-2 border-black rounded-md'>
                    <form onSubmit={handleSubmit}>
                        <CodeEditor />
                    </form>
                    <div className='bg-black px-2 py-1 text-white'>
                        <p>
                            You shall be redirected to the paste page on Save
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
