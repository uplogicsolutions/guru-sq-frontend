import React from 'react';
import { Col, Row } from 'rsuite';
import { ChatBox } from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';
import {IoIosSend} from 'react-icons/io';

const ChatPage = props => {



    return (
        <div>
            
            <div className="bg-gray-100 overflow-y-scroll" style={{maxHeight:'90%', height:'90%'}}>
                
                You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip ter a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would tfavorite search ithin seconds of try and error or after a small trip to our favorite search engine.You woungine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would tfavorite search ithin seconds of try and error or after a small trip to our favorite search engine.You woungine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would tfavorite search ithin seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.You would think that such a basic problem would be solved within seconds of try and error or after a small trip to our favorite search engine.
            </div>
            <div className="" style={{ height: '10%' }}>
                <div class="flex items-center h-full">
                    <div class="relative w-full h-full">
                        {/* <div class="absolute top-4 left-3"> 
                            <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
                        </div>  */}
                        <input type="text" class="h-full pl-10 pr-20 border w-full z-0 focus:shadow focus:outline-none" placeholder="Message" />
                        <div class="absolute top-2 right-2">
                            <button class="p-2 text-white rounded-lg">
                                <IoIosSend className="g-primary-color " size="20"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;