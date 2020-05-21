// JS for Navigation (goes with navigation.css)
// Creates navigation buttons so they don't have to be copied
// Horizontal Navigation Version

/******************** Setup NavBtn ********************/
const navBtn = document.getElementById("navBtn")
let navDots = document.createElement("h2")
navDots.innerHTML = "..."
navBtn.appendChild(navDots)

/******************** Make Dropdown Div ********************/
var navigationDiv = document.createElement("div")
navigationDiv.setAttribute("id", "navigation")
navBtn.appendChild(navigationDiv)

/******************** Make Dropdown Contents ********************/
// items are: page title, doc name, and ""
const navItems = [
    ["Debit Cards vs. Credit Cards", "debitCredit.html", "#a83632"],
    ["Standard Credit Cards vs. Charged Cards", "standardCharge.html", "#d97c11"],
    ["Credit Card Pros & Cons", "prosCons.html", "#c7c428"],
    ["What To Look For", "lookFor.html", "#25941f"],
    ["Credit Card: Common Tips", "tips.html", "#1f9492"],
    ["What To Do: Stolen Card", "stolen.html", "#1f4094"],
    ["FICO Score", "fico.html", "#6b1f94"],
    ["Glossary", "glossary.html", "#9e4476"],
    ["Works Cited", "worksCited.html", "#1f9477"]
]

var navigationDiv = document.getElementById("navigation")

for (let i = 0; i < navItems.length; i++) {
    let row = document.createElement("button")
    row.innerHTML = navItems[i][0]

    row.setAttribute("onclick", ("clickNav('" + i + "')"))
    navigationDiv.appendChild(row)
}

/******************** Nav Button Click ********************/
// need to update current page and enable check on nav button click
function clickNav(index) {
    currentPage = index
    loadFile(navItems[index][1])
    pageBtnsEnableCheck()
}

/******************** Move Pages ********************/
const nextBtn = document.getElementById("nextBtn")
const backBtn = document.getElementById("backBtn")
var currentPage = 0;

// Disable / enable page buttons depending on current page num
function pageBtnsEnableCheck() {
    backBtn.disabled = false
    nextBtn.disabled = false
    
    if (currentPage >= (navItems.length - 1)) 
        nextBtn.disabled = true
    if (currentPage <= 0)
        backBtn.disabled = true
}

// Update page num of not starting on welcome page
let currentPageName = getFileFromURL()
for (let i = 0; i < navItems.length; i++) {
    if (currentPageName === navItems[i][1])
        currentPage = i
}
pageBtnsEnableCheck() // Initial check

// Move a page forward
nextBtn.onclick = function() {
    currentPage++
    pageBtnsEnableCheck()
    loadFile(navItems[currentPage][1])
}

// Move a page back
backBtn.onclick = function() {
    currentPage--
    pageBtnsEnableCheck()
    loadFile(navItems[currentPage][1])
}