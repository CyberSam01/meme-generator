import { useEffect, useState } from "react";

function Meme() {

    const [allMemes, setAllMemes] = useState([])

    const [meme, setMeme] = useState({
        topText:"",
        bottomText:"",
        randomImg:"",
        textWidth: "0px"
    })
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => setAllMemes(data.data.memes))
    }, [])

    function onImgLoad({target: img}) {
        setMeme(prevMeme => ({
            ...prevMeme, 
            textWidth:`${img.offsetWidth * 0.9}px`
        }))
    }

    function getImage() {
        const url = allMemes[Math.floor(Math.random()*allMemes.length)].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImg:url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return (
        <div className="meme-container">
            <div className="Form">
                <input 
                    placeholder="Top Text" 
                    type="text" 
                    name="topText" 
                    onChange={handleChange}
                    value={meme.topText}
                />

                <input 
                    placeholder="Bottom Text" 
                    type="text" 
                    name="bottomText" 
                    onChange={handleChange}
                    value={meme.bottomText}
                />

                <button onClick={getImage}>Get a new meme image  🖼</button>
            </div>
            <div  className="img-container" style={{display: meme.randomImg ? "block" : "none"}}>
                <img alt="different meme when user clicks on buttom" onLoad={onImgLoad} src={meme.randomImg} className="meme-img"></img>
                <h1 style={{maxWidth:meme.textWidth}} className="first-text text">{meme.topText}</h1>
                <h1 style={{maxWidth:meme.textWidth}} className="second-text text">{meme.bottomText}</h1>
            </div>
        </div>
    )
}

export default Meme

    // IF YOU WANT TO MAKE AN ASYNC FUNCTION:
    // useEffect takes a function as its parameter. If that function
    // returns something, it needs to be a cleanup function. Otherwise,
    // it should return nothing. If we make it an async function, it
    // automatically retuns a promise instead of a function or nothing.
    // Therefore, if you want to use async operations inside of useEffect,
    // you need to define the function separately inside of the callback
    // function, as seen below:

    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    //     return () => {
    //         CREATE YOUR CLEANUP
    //     }
    // }, [])