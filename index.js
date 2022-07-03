// Your code here
function createEmployeeRecord(employee){

  // [firstName, familyName, title, payPerHour] = employee
  return {
  firstName: employee[0],
  familyName: employee[1],
  title: employee[2],
  payPerHour: employee[3],
  timeInEvents: [],
  timeOutEvents: []
  }
}

function createEmployeeRecords(employees){
  return employees.map(employee => createEmployeeRecord(employee))

}
function createTimeInEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ")
  let eventObj = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  }
  employee.timeInEvents.push(eventObj)
return employee

}

function createTimeOutEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ")
  let eventObjs = {
    type : "TimeOut",
    hour: parseInt(hour, 10),
    date
  }
  employee.timeOutEvents.push(eventObjs)
  return employee
}

function hoursWorkedOnDate(obj, dateForm){
  const timeIn = obj.timeInEvents.find(event => event.date === dateForm)
  const timeOut = obj.timeOutEvents.find(event => event.date === dateForm)
  return (timeOut.hour - timeIn.hour)/100

}

function wagesEarnedOnDate(obj, dateForm){
  return hoursWorkedOnDate(obj, dateForm) * obj.payPerHour
}

function allWagesFor(obj){
  // console.log(obj)
  let allWages = obj.timeInEvents.map(event => wagesEarnedOnDate(obj, event.date))
  return allWages.reduce((total, wage) => total + wage)

}

function calculatePayroll(arr){
  const totalForEachEmployee = arr.map(record => allWagesFor(record))
   return totalForEachEmployee.reduce((total, objTotal) => total + objTotal)
}