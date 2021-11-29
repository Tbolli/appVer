import {useState,useEffect} from 'react'



function App() {
  let [winWidth,setWinWidth] = useState(window.innerWidth)
  let [winHeight,setWinHeight] = useState(window.innerHeight)
  
  

  console.log(winWidth)
  console.log(winHeight)
  window.addEventListener('resize', ()=> {
    setWinWidth((window.innerWidth))
    setWinHeight((window.innerHeight))
  })

  return (



    <div className="App">
      <div className="BackGround"></div>
      <div className="WhiteArea">
      <h1>Molde</h1>
      </div>
      
    </div>
  );
}

export default App;
