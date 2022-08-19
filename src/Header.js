
function Header() {
    return (
        <div className="header">
            <div className="header-logo">
                <img src={require("./Troll-Face.png")}></img>
                <h1>Meme Generator</h1>
            </div>
            <p>React Course - Project 3</p>
        </div>
    )
}

export default Header