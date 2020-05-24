// JavaScript for Changing Pages

// Constants
// var page = document.getElementById("page")
var page = document.getElementById("pageLayout")
var lastPage = document.getElementById("lastPage")

/******************** Change Accent Color ********************/
// Print Color
// console.log(getComputedStyle(document.body).getPropertyValue('--accent'))

function changeAccent(color) {
    document.documentElement.style.setProperty('--accent', color)
}

/******************** Change Title ********************/
function changeTitle(text) {
    document.getElementById("title").innerHTML = text
}

/******************** Show Table Button ********************/
var showTableBtn = document.getElementById("showTableBtn")
var pointsDiv = document.getElementById("pointsDiv")

showTableBtn.onclick = function() {
    if (pointsDiv.clientHeight == 0) {
        pointsDiv.style.height = "250px"
        pointsDiv.style.overflowY = "scroll"
    } else {
        pointsDiv.style.height = 0
        pointsDiv.style.overflowY = "hidden"
    }
}

/******************** Points Table Functions ********************/
var pointsTable = document.getElementById("pointsTable")

function emptyPointsTable() {
    // Save header row
    pointsTable.innerHTML = pointsTable.rows[0].innerHTML
}

function addPointsRow(x, y) {
    let newRow = pointsTable.insertRow()
    let xCol = newRow.insertCell(0)
    let yCol = newRow.insertCell(1)
    xCol.innerHTML = x
    yCol.innerHTML = y
}