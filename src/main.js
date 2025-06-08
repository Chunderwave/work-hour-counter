// const options = {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     timeZone: 'America/New_York' // Specify Eastern Time
// };

// const displayString = `Start Date & Time: ${new 
//     Date(Date.now()).toLocaleString('America/N')}`;
    
// console.log(displayString)

import fs from 'fs';

var data = fs.readFileSync('data.json');
var myObject= JSON.parse(data);

const newObj = myObject.filter(obj=>obj.isActive)

var newD = JSON.stringify(newObj)
fs.writeFileSync('test.json',newD, err=>{
    if(err) throw err;

    console.log("Data added successfully.")
})