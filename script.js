const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const endBtn = document.querySelector("#endBtn");
const startDT = document.querySelector("#startDateT");
const endDT = document.querySelector("#endDateT");
const resultDisplay = document.querySelector("#resultDisplay");

let startTime = 0;
let elapsedTime = 0;
let accumulated = 0;
let InitialTime, EndTime;
let isPause = true;
let resumed = false;
let IntervalID;
let hrs = 0;
let mins = 0;
let secs = 0;

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/New_York' // Specify Eastern Time
};

startBtn.addEventListener("click", ()=>{
    if(isPause && !resumed){
        isPause = false;
        startTime = Date.now();
        InitialTime = startTime;
        const startDTString = `Start Date & Time: ${new 
        Date(InitialTime).toLocaleString(undefined,options)}`;
        startDT.textContent = startDTString;
        IntervalID = setInterval(updateTime, 100);
    }
})

pauseBtn.addEventListener("click", ()=>{
    if(!isPause){//stopwatch running
        pauseBtn.textContent = "Resume";
        isPause = true;
        elapsedTime = Date.now()-startTime;
        clearInterval(IntervalID)
    }else{//stopwatch pausing
        pauseBtn.textContent = "Pause";
        resumed = true;
        accumulated = elapsedTime;
        startTime = Date.now();
        IntervalID = setInterval(updateTime,100)
    }
})

endBtn.addEventListener("click", ()=>{
    isPause = true;
    resumed = false;
    clearInterval(IntervalID);

    EndTime = Date.now();
    const endDTString = `End Date & Time: ${new Date(EndTime)
    .toLocaleString(undefined,options)}`;
    endDT.textContent = endDTString;
    displayInHourMinSec(elapsedTime,resultDisplay,'Elapsed Time of This Session: ')

    addSessionData(elapsedTime,InitialTime,EndTime);

    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    pauseBtn.textContent = "Pause";
    timeDisplay.textContent = "00:00:00";
})

function updateTime(){
    if(resumed){
        elapsedTime = accumulated + (Date.now()-startTime);
    }else{
        elapsedTime = Date.now()-startTime;
    }
    displayInHourMinSec(elapsedTime,timeDisplay);
}

function displayInHourMinSec(elapsedTime, target, customizedMes=''){
    secs = Math.floor((elapsedTime/1000) %60);
    mins = Math.floor((elapsedTime/(1000*60))%60);
    hrs = Math.floor(elapsedTime/(1000*60*60));
    
    secs = pad(secs)
    mins = pad(mins)
    hrs = pad(hrs)
    target.textContent = `${customizedMes}${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (('0')+unit).length > 2? unit:('0')+unit 
    }
}

function addSessionData(elapsedTime, InitialTime,EndTime){

}