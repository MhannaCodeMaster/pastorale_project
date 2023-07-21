const data = JSON.parse(document.getElementById("hidden-data").innerText)

const hasFrom = data.transferTypes.filter(element => element.hasFrom == 1)
const hasTo = data.transferTypes.filter(element => element.hasTo == 1)
const hasAct = data.transferTypes.filter(element => element.isActivity == 1)

var transfertypesarray = []
var beneficiaryArray = []
var donaterArray = []

let dateAsterisk = document.getElementById("date-asterisk")
let timeAsterisk = document.getElementById("time-asterisk")
let fromAsterisk = document.getElementById("from-asterisk")
let toAsterisk = document.getElementById("to-asterisk")
let amountAsterisk = document.getElementById("amount-asterisk")
let amountAsterisk2 = document.getElementById("amount-asterisk-2")

let asterisksElements = document.getElementsByClassName("asterisk")

let dateInput = document.getElementById("date-input")
let timeInput = document.getElementById("time-input")
let fromInput = document.getElementById("from-input")
let toInput = document.getElementById("to-input")
let amountInput = document.getElementById("amount-input")
let amountInput2 = document.getElementById("amount-input-2")
let descriptionInput = document.getElementById("description-input")

// fromInput.value = ""
// toInput.value = ""
// TTInput.value = ""


function addCommas(x) { 
    var str = x.toString().split("."); 
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    return str.join(".");
}

function inArray(x, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (x == arr[i]) {
            return true
        }
        return false
    }
}

function updateAmountPlaceholder() {
    document.getElementById("amount-input").placeholder = data.currencies.find(element => element.id_currency == document.getElementById("from-input").value).symbol_currency
}

function updateAmountPlaceholder2() {
    document.getElementById("amount-input-2").placeholder = data.currencies.find(element => element.id_currency == document.getElementById("to-input").value).symbol_currency
}

function checkForm() {

    let asterisks = [dateAsterisk, timeAsterisk, fromAsterisk, toAsterisk, amountAsterisk, amountAsterisk2]
    let input = [dateInput, timeInput, fromInput, toInput, amountInput, amountInput2]

    for (let i = 0; i < asterisks.length; i++) {
        if (input[i].value != "") {
            asterisks[i].classList.add("hidden")
        } else {
            asterisks[i].classList.remove("hidden")
        }
    }

    console.log(fromInput.value)
    console.log(toInput.value)

    if(fromInput.value == toInput.value){
        fromAsterisk.classList.remove("hidden")
        toAsterisk.classList.remove("hidden")
    } else {
        fromAsterisk.classList.add("hidden")
        toAsterisk.classList.add("hidden")
    }

    for (let i = 0; i < asterisksElements.length; i++) {
        if (!asterisksElements[i].classList.contains("hidden")) {
            document.getElementById("submit-btn").classList.replace("notFaded", "faded")
            document.getElementsByClassName("main-div")[0].classList.replace("border-success", "border-danger")
            console.log("bad form")
            return
        }
    }
    document.getElementById("submit-btn").classList.replace("faded", "notFaded")
    document.getElementsByClassName("main-div")[0].classList.replace("border-danger", "border-success")
    

    descriptionInput.value = `${data.currencies.find(e=>e.id_currency == fromInput.value).symbol_currency + addCommas(amountInput.value)}  =>  ${data.currencies.find(e=>e.id_currency == toInput.value).symbol_currency + addCommas(amountInput2.value)}`
    

    console.log("good form")


}

checkForm()
