import axios from 'axios'
import {useState,useEffect,useRef} from 'react'



function App() {
  const apiKey ="9d17286957d540f79ad112230211411"
  //Entered city name
  const [cityIn,setCityIn] = useState("")
  //Force rerender
  const [rerender,setRerender] = useState(false)
  //responese from weatherApi
  let responseDataRef= useRef({})
  let lat=0.0;
  let lon=0.0;
  //Success function to set lat, lon  
  //in query string when the component mounted
  const showPosition = (pos)=>{
    lat = pos.coords.latitude
    lon = pos.coords.longitude
    getWeatherData(lat+" "+lon)
  }

  //Get current position then calling the success function
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(showPosition)
  },[])
  
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

const citySubmit = (ev)=>{
  console.log(cityIn)
}
const getWeatherData =(query)=>{
  axios.get("http://api.weatherapi.com/v1/forecast.json?key=9d17286957d540f79ad112230211411&q="+query+"&days=6&aqi=no&alerts=no").then((res)=>{
      responseDataRef.current = res
      setRerender(true)
    })
}

const keyHandler =(e)=>{
  e.preventDefault()
  if(e.key === "Enter"){
    if(rerender) setRerender(false)
    cityIn.length == 0?getWeatherData(document.getElementById("cityNameId").placeholder):getWeatherData(cityIn)
  }else{
    setCityIn(document.getElementById("cityNameId").value)
  }
}
  if(rerender){
    document.getElementById("imgId1").src = responseDataRef.current.data.current.condition.icon
    document.getElementById("currentTempId").innerHTML = responseDataRef.current.data.current.temp_c
    document.getElementById("currentWindSpeedId").innerHTML = "&nbsp&nbsp"+responseDataRef.current.data.current.wind_kph+ "kph/" + responseDataRef.current.data.current.wind_dir
    document.getElementById("Group_2").style.transform= "rotate("+responseDataRef.current.data.current.wind_degree+"deg)" 
    document.getElementById("cityNameId").placeholder = responseDataRef.current.data.location.name
  }
  
  
  return (
    <div className="App">
      <div className="BackGround"></div>
      <div className="WhiteArea">

      <input  onKeyUp={e=>keyHandler(e)} type="text" placeholder="Loading..." id="cityNameId"/>

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
      {/*hourly forecast, 5 hours from your current time*/}
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
