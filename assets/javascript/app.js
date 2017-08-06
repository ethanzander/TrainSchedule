// Initialize Firebase
var config = {
    apiKey: "AIzaSyCe1Qulv_uXZJX2ZrXLTZmacuDx-sZ9Bi8",
    authDomain: "trainschedule-fb062.firebaseapp.com",
    databaseURL: "https://trainschedule-fb062.firebaseio.com",
    projectId: "trainschedule-fb062",
    storageBucket: "trainschedule-fb062.appspot.com",
    messagingSenderId: "1095629363547"
};
firebase.initializeApp(config);
var database = firebase.database();
//Global Varibles
var name = "";
var destination = "";
var time = 0000;
var frequency = 00;
// Add Train to FireBase on click
$("#submit").on("click", function () {
    event.preventDefault();
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format();
    var trainFrequency = parseInt($("#frequency-input").val().trim());

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    }
    database.ref().push(newTrain);
    //Clear All Inputs
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});
//Train timing logic
database.ref().on("child_added", function (snapshot) {
    var trName = snapshot.val().name;
    var trDestination = snapshot.val().destination;
    var trTime = snapshot.val().time;
    var trFrequency = snapshot.val().frequency;
    console.log("First train time = " + trTime);
    var convertTrainTime = moment(trTime, "HH:mm").subtract(1, "years");
    //Current Time
    var currentTime = moment();
    console.log("Current time =" + moment().format("HH:mm"));
    var timeDiff = moment().diff(moment(convertTrainTime), "minutes");
    var trainInterval = timeDiff % trFrequency;
    //Minutes away
    var minutesAway = trFrequency - trainInterval;
    console.log("Minutes until next train " + minutesAway);
    //Next arrival time
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("Next train arrival time " + nextArrival);

    //fill in the table
    $("#train-data").append('<tr><td>' + trName + '</td><td>' + trDestination + '</td><td>' + trFrequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

});

