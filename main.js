const time = Date.parse("2025-06-09")
var d = new Date(time); 
const sunday = new Date(time); 
const saturday = new Date(time); 
// console.log(`the date of today is ${d};`)
var x = d.getDay();
var y = 6-d.getDay();
sunday.setDate(d.getDate() - x);
saturday.setDate(d.getDate() + y)
const sun = sunday.toISOString().split('T')[0]
const sat = saturday.toISOString().split('T')[0]
// console.log(`the date of the Sunday of this week is ${sun}.`)
// console.log(`the date of the Saturday of this week is ${sat}.`)

// const test = new Date(Date.parse("2025-06-09"))
// console.log(test.getDate())

console.log(sat===sun)