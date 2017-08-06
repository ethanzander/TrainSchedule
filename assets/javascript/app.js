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
//   var trainRef = database.ref("/trains");
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
    var trainFrequency = parsInt($("#frequency-input").val().trim());
    
 	var newTrain = {
 		name: trainName,
 		destination: trainDestination,
 		time: trainTime,
 		frequency: trainFrequency,
 		// nextTr: nextTr, CAN DELETE
 		// minutesA: minutesA CAN DELETE
 	}
 	database.ref().push(newTrain);
//Clear All Inputs
 	$("#train-name").val("");
 	$("#destination-input").val("");
 	$("#train-time").val("");
    $("#frequency-input").val("");
    return false;
 });
database.ref().on("child_added", function(snapshot) {
	var trName = snapshot.val().name;
	var trDestination = snapshot.val().destination;
	var trTime = snapshot.val().time;
	var trFrequency = snapshot.val().frequency;
	console.log("Frequency " + trFrequency);
//** I can not get these 2 variables to show up in firebase?
	// var minutesAway = snapshot.val().minutesAway;
	// var nextArrival = snapshot.val().nextArrival;

	//train info
	console.log("First Train: " + trTime);
	// Current Time
	var currentTime = moment();
	console.log("The time is: " + moment().format("HH:mm A"));
	//minutes away
	var minutesAway = moment().diff(trTime, "HH:mm A") % trFrequency;
	console.log("minutesAway " + minutesAway);
	// next arrival time
	var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm A");
	console.log("Next train " + nextArrival);

	//fill in the table
	$("#trainData").append('<tr><td>' + trName + '</td><td>' + trDestination + '</td><td>' + trFrequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

});

