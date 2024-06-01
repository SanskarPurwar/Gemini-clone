import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context.jsx';

const Sidebar = () => {

    const [open, setOpen] = useState(false);
    const { onSent,
        prevPrompt,
        setRecentPrompt,
        newChat
    } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setOpen(open => !open)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {open ? <p>New chat</p> : null}
                </div>

                {open ? <div className='recent'>
                    <p className='recent-title'>Recent</p>
                    {prevPrompt.map((item, index) => {
                        return (
                            <div onClick={()=>loadPrompt(item) } className='recent-entry'>
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 20)} ...</p>
                            </div>
                        )
                    })}
                </div>
                    : null}
            </div>

            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt="" />
                    {open ? <p>Help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt="" />
                    {open ? <p>Activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt="" />
                    {open ? <p>Setting</p> : null}
                </div>
            </div>

        </div>

    )
}

export default Sidebar