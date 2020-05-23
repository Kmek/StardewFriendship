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