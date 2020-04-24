import React, { useState } from 'react'
import './Main.css'
import logo from '../assets/logo.png'
import api, { state } from '../api/api'
export default function Main(){
    const[location,setLocation] = useState()
    const[loading,setLoad]= useState(false)
    const[zone, setZone] = useState()
    const[value, setValue] = useState()
    const[states, setStates] = useState([])
    const trigger = ()=>{
        setLoad(true)
            navigator.geolocation.getCurrentPosition(position=>{
            api(position.coords.latitude, position.coords.longitude).then(value=>{
                setLoad(false)
                setValue(value)
                if(value.length>0){state(value[0].state).then(result => setStates(result))}
                evaluate(value)
                console.log(value)
                }
            )
        },
        error=>{
            alert("Unable to Detect your Location")
            setLoad(false)
        })        
    }

    const evaluate = (value)=>{
        var count = 0
        var name = ''
        var distance = 100
        if(value.length === 0){
            setLocation({name : 'NaN', count : 'NaN', distance : 'NaN'})
            setZone(0)
        }else{
            count = value[0].count
            name = value[0].name
            distance = value[0].hitMetadata.distance
            if(distance < 15){
                setLocation({name : name, count : count, distance : distance})
                setZone(2)
            }else if((distance<30 && count>15) || (distance<50 && count> 30) || (distance< 60 && count>100)){
                setLocation({name : name, count : count, distance : distance})
                setZone(2)
            }else if(distance > 90){
                setLocation({name : name, count : count, distance : distance})
                
                setZone(0)
            }else{
                setLocation({name : name, count : count, distance : distance})
                setZone(1)
            }
        }
    }
    return(
        <div className='main'>
            <div className='card'>
                <img className='logo' src={logo} alt='logo'/>
                <div className='title'>
                    <div className='heading'>COVID TRACKER</div>
                    <p>An open-source project by AJV Technologies</p>
                </div>
            </div>

            <div className='banner'>
                <marquee attribute_name = "attribute_value">
                    Note : All Information are gathered from external APIs. Our main intention is to visualize the incoming data in such a way that the users of the website may find it beneficiary. This website does not hold any responsibility for the data shown...
                </marquee>
            </div>
            {!location?
            <div className='card1'>
                
                <div className='section1'>
                    {!loading?
                    <h2>Are you in a Safe Zone?</h2>
                    :
                    <h2>Decision Pending...</h2>
                    }
                    <div className='button'>
                        {!loading?
                        <button onClick={(trigger)}>Check Now</button>
                        :
                        <div className="loader"></div>
                        }
                    </div>
                    

                </div>
                
            </div>
            :
            <>
                {renderZone(zone,value)}
            {states.length>0?
                renderStates(states)
            
            :
            0
            }
            </>
            }

            <div className='card2'>
                <a href='https://rebrand.ly/Covid-App'>DOWNLOAD <u><b><i>CoronaLiv</i></b></u> APP <br></br>FOR COMPLETE INFO</a>
            </div>
            <div className='card2'>
                <div className='source'>Data Source : </div>
                <ul>
                    <li>COVID19-INDIA API by covid19india.org</li>
                    <li>Press Information Buerau - INDIA</li>
                    <li>Other external sources</li>
                    
                    
                </ul>
            </div>

            {renderAd()}

        </div>
    )
}

function renderZone(zone,value){
    switch(zone) {
        case 0:
            return(
                <div className='safe' style={{backgroundColor:"#388E3C"}}>
                    <div style={{color:'white', fontSize:24}}>You are in <i>Safe</i> zone</div>
                    <div style={{color:'white', fontSize:16}}> No Cases reported within 100KM Radius</div>
                </div>
            )
        case 1:
            return(
                <div className='moderate' >
                    <div style={{color:'white', fontSize:24}}>You are in a <i>Moderate</i> zone</div>
                    <div style={{color:'white', fontSize:18}}> Nearest active region: <b>{value[0].name}</b></div>
                    <div style={{color:'white', fontSize:18}}> Cases Recorded: <b>{value[0].count}</b></div>
                    <br/>
                    {value[0].unknown > 0 ? <div style={{color:'white', fontSize:16}}> <b>{value[0].unknown}</b> cases with unknown districts in <b>{value[0].state}</b></div> : <></>}
                </div>
            )
        case 2:
            
            return(
                <div className='red' style={{backgroundColor:"#D32F2F"}}>
                    <div style={{color:'white', fontSize:22}}>You are in an <i>Infected</i> zone</div>
                    <div style={{color:'white', fontSize:18}}>{value[0].count} cases reported in <b>{value[0].name}</b> region</div>
                    <div style={{color:'white', fontSize:18}}>Cases Recorded: <b>{value[0].count}</b></div>
                    {value[0].unknown > 0 ? <div style={{color:'white', fontSize:16}}><b>{value[0].unknown}</b> cases with unknown districts in <b>{value[0].state}</b></div> : <></>}
                </div>
            )
    }
}

function renderStates(states){
    return(
        <div className='states'>
                <div className='source' style={{color:'#FFFFFF'}}>Stats from all Districts in {states[0].state} : </div>
                <ul>
                    {states.map((element,index) => {
                        if(states.length/2 > index){
                            return <> <li style={{fontSize:18, color:'#FFFFFF'}}><b>{element.count}</b> cases in <b>{element.name}</b>. </li> <br/> </>
                        }else{
                            return <> <li style={{fontSize:18, color:'#000000'}}><b>{element.count}</b> cases in <b>{element.name}</b>. </li> <br/> </>
                        }
                        })
                    }
                </ul>
            </div>
    )
}


function renderAd(){
    return(
        <div id="285626754">
                <script type="text/javascript">
                    try {
                        window._mNHandle.queue.push(function (){
                            window._mNDetails.loadTag("285626754", "728x90", "285626754");
                        })
                    }
                    catch (error) {}
                </script>
            </div>
    )
}




