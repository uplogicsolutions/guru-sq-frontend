import React, { useState } from 'react';
import { Col, Input, Row } from 'rsuite';
import { ChatBox } from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';
import { IoIosSend } from 'react-icons/io';

const ChatPage = props => {

    const [user_input, setUserInput] = useState('')
    const [messages, setMessages] = useState([
        {
            'user_id': 1,
            'message': 'Hey Guys!',
            'time': new Date()
        },
        {
            'user_id': 2,
            'message': 'Hii!',
            'time': new Date()
        }
    ])

    const handleSendMessage = (e) =>{
        e.preventDefault()
        
        if(user_input === '')
            return
        setMessages([
            ...messages,
            {
                message:user_input,
                time: new Date()
            }
        ])

        setUserInput('')
    }

    return (
        <div>

            <div className="bg-gray-100 overflow-y-auto" style={{ maxHeight: '90%', height: '90%' }}>

            </div>
            <div className="" style={{ height: '10%' }}>
                <div class="flex items-center h-full">
                    <div class="relative w-full h-full">
                        {/* <div class="absolute top-4 left-3"> 
                            <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
                        </div>  */}
                        <div>
                            {messages && messages.map(message => {
                                return (
                                    <>
                                        <p>{message.message}</p>
                                        <small>{message.time.getTime()}</small>
                                    </>
                                )
                            })}
                        </div>
                        <Input value={user_input} onChange={(text, e) => setUserInput(text)} type="text" class="h-10 pl-10 pr-20 border w-full z-0 focus:shadow focus:outline-none" placeholder="Message" />
                        <div className="">
                            <button onClick={handleSendMessage} class="p-2 text-white rounded-lg">
                                <IoIosSend  className="g-primary-color " size="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;