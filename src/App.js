import axios from 'axios'
import {useState,useEffect,useRef} from 'react'



function App() {
  const apiKey ="9d17286957d540f79ad112230211411"
  const [rerender,setRerender] = useState(false)
  const responseDataRef= useRef({})
  
  useEffect(()=>{
    axios.get("http://api.weatherapi.com/v1/forecast.json?key=9d17286957d540f79ad112230211411&q=Molde&days=6&aqi=no&alerts=no").then(res=> {
      responseDataRef.current= res
      document.getElementById("imgId1").src = responseDataRef.current.data.current.condition.icon
      document.getElementById("currentTempId").innerHTML = responseDataRef.current.data.current.temp_c
      document.getElementById("currentWindSpeedId").innerHTML = "&nbsp"+responseDataRef.current.data.current.wind_kph+ "kph/" + responseDataRef.current.data.current.wind_dir
      document.getElementById("Group_2").style.transform= "rotate("+responseDataRef.current.data.current.wind_degree+"deg)" 
      
      setRerender(true)
    })
  },[])
 //dayHour = responseDataRef.current.data.forecast.forecastday[0].hour
  
const findHours = (currentHour)=>{
    //find next 5 hours to display
    let resList=[]
    if (currentHour +6<=23){
      for(let i = currentHour+1; i <= currentHour+5;i++){
        resList.push(i)
      }
    }else{
      for(let i = currentHour+1; i <= 23;i++){
        resList.push(i)
      }
      for (let i = 0;i<(currentHour +5) - 23;i++){
        resList.push(i)
      }
    } 
    return resList;
}
const findCurrentHour = ()=>{
  return new Date().getHours()
}

const citySubmit = ()=>{

}
  
  //console.log(responseDataRef.current.data.forecast.forecastday[0].hour[0])
  return (
    <div className="App">
      
      <div className="BackGround"></div>
      <div className="WhiteArea">

      <input onSubmit={citySubmit} type="text" placeholder="Molde" id="cityNameId"/>

      <div className="currentArea">
        <div className="currentTempArea">
          <img id="imgId1" alt="" width="85"/>
          <h2 className="globalTemps WhiteAreaText"id="currentTempId"></h2>
        </div>
      <div className="pointerAndWindArea">
        <div className="currentWindArea">
          <h4 className="WhiteAreaText">Wind speed</h4>
          <p className="WhiteAreaText greyColor" id="currentWindSpeedId"></p>
        </div>
        <svg id="Group_2" data-name="Group 2" xmlns="http://www.w3.org/2000/svg" width="45" height="55" viewBox="0 0 48.534 55.182">
          <path id="Path_10" data-name="Path 10" d="M0,55.182,24.267,0,48.534,55.182l-24.267-12.6Z" transform="translate(0 0)" fill="#333"/>
          <path id="Path_11" data-name="Path 11" d="M10.785,0V19.9L0,25.29Z" transform="translate(9.019 20.548)" fill="#fff"/>
        </svg>
        </div>

      </div>

        <div id="hourForecastID" className="hourForecast">
          {!rerender ?"Loading...":findHours(findCurrentHour()).map((hour)=>(
          <div className="hourPluss">
            <p className="hours greyColor">{responseDataRef.current.data.forecast.forecastday[0].hour[hour].time.split(" ")[1]}</p>
            <img width="65"src={responseDataRef.current.data.forecast.forecastday[0].hour[hour].condition.icon} alt="" />
            <p className="degrees globalTemps">{responseDataRef.current.data.forecast.forecastday[0].hour[hour].temp_c}</p>
          </div>
          ))}
        </div>

      </div>

    <div className="imgBackgroundDiv"></div>|  
    </div>

  );
}

export default App;
