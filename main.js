const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/New_York' // Specify Eastern Time
};

const displayString = `Start Date & Time: ${new 
    Date(Date.now()).toLocaleString('America/N')}`;
    
console.log(displayString)