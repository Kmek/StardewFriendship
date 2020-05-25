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

/******************** Graph Controls ********************/
var graphBtn = document.getElementById("graphBtn")

graphBtn.onclick = function() {
    // Get values from Graph Controls div
    mainGraph = new Graph(
        parseInt(document.getElementById("relationshipSelect").value), 
        parseInt(document.getElementById("talkSelect").value), 
        parseInt(document.getElementById("giftNumSelect").value), 
        calcGift(
            document.getElementById("weeklyGiftQualitySelect").value, document.getElementById("weeklyGiftTypeSelect").value), 
        document.getElementById("birthdayCheckbox").checked, 
        calcGift(
            document.getElementById("birthdayQualitySelect").value, document.getElementById("birthdayTypeSelect").value),
        document.getElementById("winterCheckbox").checked, 
        calcGift(
            document.getElementById("winterQualitySelect").value, document.getElementById("winterTypeSelect").value),
        document.getElementById("daysTimeoutInput").value
    )
    
    mainGraph.calcPoints()
    drawGraph(mainGraph)
}

// Force positive whole numbers by rounding the absolute value
document.getElementById("daysTimeoutInput").onchange = function() {
    this.value = Math.abs(Math.round(this.value))
}

/******************** Display Text from Graph ********************/
var graphTextOutput = document.getElementById("graphTextOutput")

function graphOutput(text) {
    graphTextOutput.innerHTML = text
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