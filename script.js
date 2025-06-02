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

class Session{
    constructor(elapsedTime, sessionStart){
        const dateObj = new Date(sessionStart)
        this.id = dateObj.toISOString()
        this.elapsedTime = elapsedTime;
        this.date = this.id.split('T')[0]
    }
}

//create database
const versionNum = 1; //this must be int positive
const databaseName = "WorkHourCounterDB";
const storeName = "sessions";

function openDB(modificationToDB){
    const dbPromise = indexedDB.open(databaseName,versionNum);
    let db;
    
    dbPromise.onupgradeneeded = (event)=>{
        db = event.target.result;
    
        if(!db.objectStoreNames.contain(storeName)){
            // id should be existing field
            // id is unique because it is the time and date of the session
            const store = db.createObjectStore(storeName, {keyPath: "id"});
        
            // Create an index on startTimestamp so we can query by date easily later.
            store.createIndex("byDate", "date", { unique: false });
        }
    }
    
    dbPromise.onerror = function(event) {
        console.error("IndexedDB open error:", event.target.error);
    };
      
    dbPromise.onsuccess = function(event) {
        //event is an instance of indexedDB database
        console.log("Database opened successfully");
        db = event.target.result;

        modificationToDB(db);
    
        db.onerror = (event)=>{
            //generic error handler for all database errors 
            console.error(`Database error: ${event.target.error?.message}.`)
        }
    }; 
}

function addSessiontoDB(elapsedTime, sessionStart){
    function modificationToDB(database){
        const obj = new Session(elapsedTime,sessionStart);

    }
}

let sessionStart;
startBtn.addEventListener("click", ()=>{
    if(isPause && !resumed){
        isPause = false;
        startTime = Date.now();
        InitialTime = startTime;
        sessionStart = startTime;
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

    addSessiontoDB(elapsedTime,sessionStart);

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