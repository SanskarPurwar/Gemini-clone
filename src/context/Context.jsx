import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props)=>{

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")


    const delayPara = (index, nextWord)=>{
        setTimeout( ()=> {
            setResultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const newChat= ()=>{
        setLoading(false);
        setShowResult(false);
    } 

    const onSent = async(prompt)=>{

        setLoading(true);
        setResultData("");
        setShowResult(true);
        let response ;
        if(prompt!==undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setRecentPrompt(input);
            setPrevPrompt(prev=>[...prev, input]);
            response = await run(input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0 ; i<responseArray.length ; i++){
            if(i&1){
                newResponse+= ("<b>"+responseArray[i]+"</b>");
            }else{
                newResponse+=responseArray[i];                
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0 ; i<newResponseArray.length ; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ");
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
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
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
} 

export default ContextProvider;