import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { Context } from '../../context/Context.jsx';

function Main() {

    const {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setInput,
        input,
        loading,
        setLoading,
        resultData,
        setResultData,

    } = useContext(Context)




    return (

        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {
                    !showResult
                        ?
                        <>
                            <div className='greet'>
                                <p><span>Hello, Sanskar</span></p>
                                <p>How can I help you today?</p>
                            </div>

                            <div className='cards'>
                                <div className="card">
                                    <p>Suggest an organised list of best food spots in the city</p>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                                <div className="card">
                                    <p>Outline a way to home, organising my closet</p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                                <div className="card">
                                    <p>Suggest videos to quickly solve a problem</p>
                                    <img src={assets.youtube_icon} alt="" />
                                </div>
                                <div className="card">
                                    <p>List powerful words for my resume that shows teamwork</p>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </>
                        : <div className='results'>
                            <div className='result-title'>
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className='result-data'>
                                <img src={assets.gemini_icon} alt="" />
                                {
                                    loading
                                        ? <div className='loader'>

                                        </div>
                                        : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                }

                <div className="main-bottom">
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            { input?<img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>

                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Main