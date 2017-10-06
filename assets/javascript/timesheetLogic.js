var config = {
    apiKey: "AIzaSyA9codjOyD-WeMYBPxSgHzgMMBc4usQmbI",
    authDomain: "trainscheduler-46d26.firebaseapp.com",
    databaseURL: "https://trainscheduler-46d26.firebaseio.com",
    projectId: "trainscheduler-46d26",
    storageBucket: "",
    messagingSenderId: "771268655460"
  };
  firebase.initializeApp(config);

var scheduleData = firebase.database();

$(document).ready(function(){

    $("#submit").on("click", function(){

        
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequencyInput").val().trim();

        
        var trainInfo = {
            name:  trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        
        scheduleData.ref().push(trainInfo);

        console.log(trainInfo.name);
        console.log(trainInfo.destination); 
        console.log(firstTrain);
        console.log(trainInfo.frequency)

        
        
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        

        return false;
    });


    
    scheduleData.ref().on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        
        var fireName = childSnapshot.val().name;
        var fireDestination = childSnapshot.val().destination;
        var fireFrequency = childSnapshot.val().frequency;
        var fireFirstTrain = childSnapshot.val().firstTrain;

        
        var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
        var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
        var minutes = fireFrequency - remainder;

        var arrival = moment().add(minutes, "m").format("hh:mm A"); 
        console.log(minutes);
        console.log(arrival);

        console.log(moment().format("hh:mm A"));
        console.log(arrival);
        console.log(moment().format("X"));

        
        $("#trainSchedule > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

    });
});

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
//var config = {
//  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//  authDomain: "time-sheet-55009.firebaseapp.com",
//  databaseURL: "https://time-sheet-55009.firebaseio.com",
//  storageBucket: "time-sheet-55009.appspot.com"
//};
//
//firebase.initializeApp(config);
//
//var database = firebase.database();
//
//// 2. Button for adding Employees
//$("#add-employee-btn").on("click", function(event) {
//  event.preventDefault();
//
//  // Grabs user input
//  var empName = $("#employee-name-input").val().trim();
//  var empRole = $("#role-input").val().trim();
//  var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
//  var empRate = $("#rate-input").val().trim();
//
//  // Creates local "temporary" object for holding employee data
//  var newEmp = {
//    name: empName,
//    role: empRole,
//    start: empStart,
//    rate: empRate
//  };
//
//  // Uploads employee data to the database
//  database.ref().push(newEmp);
//
//  // Logs everything to console
//  console.log(newEmp.name);
//  console.log(newEmp.role);
//  console.log(newEmp.start);
//  console.log(newEmp.rate);
//
//  // Alert
//  alert("Employee successfully added");
//
//  // Clears all of the text-boxes
//  $("#employee-name-input").val("");
//  $("#role-input").val("");
//  $("#start-input").val("");
//  $("#rate-input").val("");
//});
//
//// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
//database.ref().on("child_added", function(childSnapshot, prevChildKey) {
//
//  console.log(childSnapshot.val());
//
//  // Store everything into a variable.
//  var empName = childSnapshot.val().name;
//  var empRole = childSnapshot.val().role;
//  var empStart = childSnapshot.val().start;
//  var empRate = childSnapshot.val().rate;
//
//  // Employee Info
//  console.log(empName);
//  console.log(empRole);
//  console.log(empStart);
//  console.log(empRate);
//
//  // Prettify the employee start
//  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
//
//  // Calculate the months worked using hardcore math
//  // To calculate the months worked
//  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//  console.log(empMonths);
//
//  // Calculate the total billed rate
//  var empBilled = empMonths * empRate;
//  console.log(empBilled);
//
//  // Add each train's data into the table
//  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
//});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
