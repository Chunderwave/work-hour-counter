export const versionNum = 1; //this must be int positive
export const databaseName = "WorkHourCounterDB";
export const storeName = "sessions";

export function openDB(modificationToDB){
    const dbPromise = indexedDB.open(databaseName,versionNum);
    let db;
    
    dbPromise.onupgradeneeded = (event)=>{
        db = event.target.result;
    
        if(!db.objectStoreNames.contains(storeName)){
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

export class Session{
    constructor(elapsedTime, sessionStart){
        const dateObj = new Date(sessionStart)
        this.id = dateObj.toISOString()
        this.elapsedTime = elapsedTime;
        this.date = this.id.split('T')[0]
    }
}