

// Get the current date
var currentDay = moment().format("dddd, MMMM Do");

$("#currentDay").text(currentDay);

// Get the current hour
var now = moment().format("H A");


// the schedule's object
var workSchedule = [
    {time: "9 AM", event: ""},
    {time: "10 AM", event: ""},
    {time: "11 AM", event: ""},
    {time: "12 PM", event: ""},
    {time: "1 PM", event: ""},
    {time: "2 PM", event: ""},
    {time: "3 PM", event: ""},
    {time: "4 PM", event: ""},
    {time: "5 PM", event: ""}
    
]

// retrieve the data from local storage
var theEvents = JSON.parse(localStorage.getItem("workDay"));
// check to see if there is any data in local storage
// if there is then assign it to workSchedule
if(theEvents){
    workSchedule = theEvents;

}

// loop through the workSchedule
workSchedule.forEach(function(timeBlock, index){
    var theTime = timeBlock.time; // retrieve the time from workSchedule and assign to theTime

    // Get the time block status: present, future, or past
    var blockColor = colorRow(theTime); 

    // create each row of the time block
    var row = "<div class='time-block' id='" + index + "'>" +
                "<div class='row no-gutters input-group'>" +
                "<div class='col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3'>" + theTime +"</div>" +
                "<textarea class='form-control " + blockColor + "'>" + timeBlock.event +"</textarea>" +
                "<div class='col-sm col-lg-1 input-group-append'>" +
                "<button class='saveBtn btn-block' type='submit'><i class='fas fa-save'></a></button>"+
                "</div></div></div>";
    // append row to the container
    $(".container").append(row);
   
})


// Compare the time of the event and the current time
// to determine if the event is past, present, or future
function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// if the save button is clicked, then save the data to local storage
$(".saveBtn").on("click", function(){
    
    // retrieve the id index
    var timeBlockId = parseInt(
        $(this)
        .closest(".time-block")
        .attr("id")
    );
    // retrieve the data from textarea
    var userEntry = $.trim(
        $(this)
        .parent()
        .siblings("textarea")
        .val()
    )
    
    // store the index and value entry into the workSchedule object
    workSchedule[timeBlockId].event = userEntry;

    // convert workSchedule object to string and save it to local storage
    localStorage.setItem("workDay", JSON.stringify(workSchedule));

})

