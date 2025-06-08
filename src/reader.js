import {openDB, Session, storeName, databaseName, versionNum} from "../include/functionality.js";


function fetchAllSessions(){
    function readFromDB(db){
        //db has been open when this function is called within openDB
        const tx = db.transaction([storeName],'readonly')
        const store = tx.objectStore(storeName)

        const readReq = store.getAll();

        readReq.onsuccess = (event)=>{
            const sessions = event.result;
            
        }

        //readReq.onerror handler is not defined because db.onerror
        //is set up

        tx.oncomplete = ()=>{
            db.close();
        }

    }
    openDB(readFromDB)
}

fetchAllSessions()