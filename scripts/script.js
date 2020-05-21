// JavaScript for Economic Systems Website

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

/******************** Page Loading Functions ********************/
// function loadFile(name) {
//     window.location.href = ("#" + name)
// }

// function getFileFromURL() {
//     let url = document.URL
//     if (!url.includes("#")) {
//         url = "debitCredit.html"
//     } else {
//         url = url.slice(url.lastIndexOf("#") + 1)
//     }
//     return url
// }

// function loadFileFromUrl() {
//     let file = getFileFromURL()
//     $('#page').load(("docs/" + file + "#"), function() {
//         window.scrollTo(0, ($('#header').offset().top + 1))
//     })
// }