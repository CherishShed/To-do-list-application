var today = new Date(Date.now())
var meridian = "";

if (localStorage.tasks) {
    var addedTask = localStorage.getItem("tasks");
}
else {
    localStorage.setItem("tasks", "[]")
    var addedTask = localStorage.getItem("tasks");
}
// ,$(".mainList li"));

var taskObject = JSON.parse(addedTask);
// var w = [5, 6, 7, 8];

// console.log(localStorage.tasks);
for (i = 0; i < taskObject.length; i++) {
    let listItem = "<li class='mainListItem'>" + taskObject[i] + "</li>";
    $(".mainList").append(listItem);
}
// console.log(taskObject.indexOf("<li class='mainListItem'><i class='fa-solid fa-check'></i><span class='col-sm-5'>Buy Groceries</span > <span class='timeToDo col-sm-5'>8:45 AM</span ></li >"));
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var months = ["January", "February", "March", "Wednesday", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var dateNum = String(today.getDate())
var prefix = "";
var numOfTasks = document.querySelectorAll("li").length
var iconElement = "<i class= fa-solid fa-check></i>"

function storeTask() {
    taskObject = [];
    for (i = 0; i < document.querySelectorAll("li").length; i++) {
        taskObject.push(document.querySelectorAll("li")[i].innerHTML);
    }
    localStorage.setItem("tasks", JSON.stringify(taskObject));
    console.log(localStorage.tasks);

}

function checkMeridian() {
    if (new Date(Date.now()).getHours() > 11) {
        meridian = "PM";
    } else {
        meridian = "AM";
    }
}

function changeDate() {
    $("#dayOfWeek").fadeOut(10);
    $("#dayOfWeek").text(days[today.getDay()] + ", ");
    $("#dayOfWeek").fadeIn(1000);

    if (dateNum.charAt(dateNum.length - 1) === "1") {
        prefix = "st";
    }
    else if (dateNum.charAt(dateNum.length - 1) === "2") {
        prefix = "nd";
    }
    else if (dateNum.charAt(dateNum.length - 1) === "3") {
        prefix = "rd";
    }
    else {
        prefix = "th";
    }

    $("#date").slideUp(10);
    $("#date").text(today.getDate() + prefix);
    $("#date").slideDown(800);

    $("#month").slideUp(10);
    $("#month").text(months[today.getMonth()] + ", ");
    $("#month").slideDown(800);

    $("#year").slideUp(10);
    $("#year").text(today.getFullYear());
    $("#year").slideDown(800);

    // $(".timeToDo").html("<i class='fa-solid fa-stopwatch'></i> " + (new Date(Date.now()).toUTCString()))
    $("#clockTime").slideUp(10);
    $("#clockTime").text(today.getHours() + ":" + today.getMinutes() + " " + meridian);
    $("#clockTime").slideDown(800);
    taskCalc(numOfTasks);
}

function taskCalc(numTasks) {
    if (numTasks === 1) {
        $("#taskNum").slideUp(10);
        $("#taskNum").slideDown(700);
        $("#taskNum").text(numTasks + " Task")
    } else {
        $("#taskNum").slideUp(10);
        $("#taskNum").slideDown(700);
        $("#taskNum").text(numTasks + " Tasks")
    }
}

changeDate();
addRemove();


$(".addButton").click(function () {
    $(".newTask").show(500);
})

$(".newTask .close").click(function () {
    $(".newTask").hide(500);
})

$(".addNew").click(function () {
    var newTask = "<li class='mainListItem'><i class='fa-solid fa-check'></i><span class='col-sm-5'>" + $("#addedTask").val() + "</span><span class='timeToDo col-sm-5'><i class='fa-solid fa-stopwatch'></i> " + (new Date($("#time").val()).toUTCString()) + "</span>" + "<span class='close'>X</span></li>";
    // console.log(newTask);
    $(".mainList").append(newTask);
    storeTask(newTask);
    numOfTasks++;
    taskCalc(numOfTasks);
    addRemove();
    $(".newTask").hide(500);

})

function addRemove() {
    $(".mainList li").click(function (ev) {
        $(this.firstChild).toggleClass("icon")

        $(this).toggleClass("checked");
        // console.log("'" + ev.target);
    })

    // $("li").append("<span class='close'>X</span>");


    $("li").mouseenter(function () {
        $(this.lastChild).show();
    }
    );

    $("li").mouseleave(function () {
        $(this.lastChild).hide();
    }
    );

    $("span.close").click(function (ev) {
        let happenedTo = ev.target.parentElement;
        $(this.parentElement).slideUp(500, function () {
            $(ev.parentElement).css("display", "none");
            $(happenedTo).remove();
            storeTask();
            numOfTasks = taskObject.length;
            taskCalc(numOfTasks);
        });
    })
}


setInterval(function () {
    checkMeridian();
    let x = new Date(Date.now());
    $("#clockTime").text(("0" + x.getHours()).slice(-2) + ":" + ("0" + x.getMinutes()).slice(-2) + " " + meridian);
}, 500);
