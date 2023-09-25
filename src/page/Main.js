import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import avtar from '../assets/avtar.png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import { sendMsgToOpenAiI } from '../Openai';
import { useSpeechSynthesis } from 'react-speech-kit';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { TypeAnimation } from 'react-type-animation';


const Main = () => {


    const [input, setinput] = useState('')
    const [chat, setchat] = useState([])
    const { speak } = useSpeechSynthesis();
    const [user, setuser] = useState({})




    const handlesend = async () => {
        const res = await sendMsgToOpenAiI(input)
        setchat(res)
        speak({ text: res.content })
    }

    const handlesignout = () => {
        signOut(auth).then(alert("Signed Out"))
    }



    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const handlereset = () => {
        resetTranscript()
        setinput('')
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }



    return (
        <>
            {user ? (<div className='home-main'>
                <div class='text-white h-[80vh]'>
                    <div class='text-white h-1/5  flex justify-center items-center'>
                        <div class='flex justify-between w-[80%]'>
                            <div>
                                <Link to='/'><img src={logo} alt='logo' /></Link>
                            </div>

                            <div>
                                <button class='bg-black border border-gray-500 px-7 py-2 rounded-3xl'> <Link to='/login'> Hi Keshav </Link> </button>
                            </div>
                        </div>
                    </div>

                    <div class=' h-full flex flex-row justify-center'>
                        <div class='w-2/3 flex justify-around flex-col'>
                            {/* <div class='text-center font-semibold text-3xl'>
                            How Can i help you ???
                        </div> */}

                            <div class=' w-full h-full m-3 flex justify-center items-center flex-col '>
                                <div class='border-stone-600 border-2 border-collapse w-full h-[100%] rounded-2xl'>
                                    {
                                        chat ? (
                                            <div className=" text-white px-3 py-1 m-3 rounded-xl">
                                                {chat.content ? (chat.content) : (<div class='h-44 w-full flex justify-center items-center'> Nothing to Show here, lets talk </div>)}
                                            </div>
                                        ) : null
                                    }
                                </div>

                                <div class=' w-full h-[20%] m-5'>
                                    <div class="">
                                        <input class='w-full h-full text-white border-stone-600 border-2 p-4 bg-black rounded-2xl' value={input || transcript} onChange={(e) => setinput(e.target.value)} type='text' placeholder='Text here...' />
                                    </div>

                                    <div class='flex justify-center '>
                                        {listening ? (<div class='bg-green-500 w-fit rounded-xl p-1 m-2'>You have the sweetest voice I've ever had the pleasure of hearing.🤩 </div>) : (<div class='bg-red-700 w-fit rounded-xl p-2 m-2'> I want to hear your sweat voice 👉👈 🥺 </div>)}
                                    </div>
                                </div>
                            </div>



                            <div class='flex justify-around'>
                                <button onClick={SpeechRecognition.startListening} class='bg-black border border-gray-500 px-7 py-2 rounded-3xl hover:bg-slate-900'> Speak 🎤 </button>

                                <button onClick={handlesend} class='bg-black border border-gray-500 px-7 py-2 rounded-3xl hover:bg-slate-900'> Send 📨 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : ("Not Logged In")}
        </>
    )
}

export default Main