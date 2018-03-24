

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZYC5g-mt1v4noTNnRqddV-JcTcjfTPxw",
    authDomain: "my-first-firebase-projec-62f27.firebaseapp.com",
    databaseURL: "https://my-first-firebase-projec-62f27.firebaseio.com",
    projectId: "my-first-firebase-projec-62f27",
    storageBucket: "my-first-firebase-projec-62f27.appspot.com",
    messagingSenderId: "893550024804"
};
firebase.initializeApp(config);

//read data from firebase
var database = firebase.database();

//want reference 

database.ref("trains").on("child_added", function (snapshot) {
    // console.log(snapshot.val())
    mkTableRow(snapshot.val())
})
function pushDatabase(name, place, time, freq) {

    //how to write data to database
    database.ref("trains").push().set({
        'trainName': name,
        "destination": place,
        "dataTime": time,
        "frequency": freq
    })


}

function mkTableRow(trainInfo) {
 var tr=   $("<tr>").html(mkTableDowns(trainInfo))
 
$("tbody").append(tr)
}
function mkTableDowns(trainInfo) {
    // mkTableDown()
    var tdowns = []
    for (var key in trainInfo) {
        tdowns.push(mkTableDown(trainInfo[key], key))
        // console.log(key, trainInfo[key])
    }
    return tdowns
}
function mkTableDown(databaseValue, databaseKey) {
    return $("<td>").text(databaseValue).attr("data-name", databaseKey)

}
//with even.preventDefault it will not refresh the page
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var trainName = $("input[data-name=name ]").val();
    var destination = $("input[data-name=destination-place]").val();
    var dataTime = $("input[data-name=data-time]").val();
    var frequency = $("input[data-name=data-frequency]").val();
    pushDatabase(trainName, destination, dataTime, frequency)
    //   console.log(trainName, destination, dataTime, frequency)
    $("form input").val("")// clear all the inputs of the submit form
})//all this happens on a user click


