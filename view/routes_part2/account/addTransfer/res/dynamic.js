const data = JSON.parse(document.getElementById("hidden-data").innerText)

const hasFrom = data.transferTypes.filter(element => element.hasFrom == 1)
const hasTo = data.transferTypes.filter(element => element.hasTo == 1)
const hasAct = data.transferTypes.filter(element => element.isActivity == 1)

var transfertypesarray = []
var beneficiaryArray = []
var donaterArray = []

let dateAsterisk = document.getElementById("date-asterisk")
let timeAsterisk = document.getElementById("time-asterisk")
let TTAsterisk = document.getElementById("transfertype-asterisk")
let accountAsterisk = document.getElementById("currency-asterisk")
let fromAsterisk = document.getElementById("from-asterisk")
let toAsterisk = document.getElementById("to-asterisk")
let amountAsterisk = document.getElementById("amount-asterisk")

let asterisksElements = document.getElementsByClassName("asterisk")

let fromInput = document.getElementById("from-input")
let toInput = document.getElementById("to-input")
let TTInput = document.getElementById("transfertype-input")
let dateInput = document.getElementById("date-input")
let timeInput = document.getElementById("time-input")
let accountInput = document.getElementById("currency-input")
let amountInput = document.getElementById("amount-input")

fromInput.value = ""
toInput.value = ""
TTInput.value = ""

for (let i = 0; i < data.transferTypes.length; i++) {
    if (!data.transferTypes[i].isActivity) {
        transfertypesarray.push(data.transferTypes[i].transferTitle)
    }
}

for (let i = 0; i < data.donators.length; i++) {
    donaterArray.push(data.donators[i].name_donator)
}

for (let i = 0; i < data.beneficiaries.length; i++) {
    beneficiaryArray.push(data.beneficiaries[i].name_beneficiary + " " + data.beneficiaries[i].father_name_beneficiary + " " + data.beneficiaries[i].family_name_beneficiary)
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
    document.getElementById("amount-input").placeholder = data.currencies.find(element => element.id_currency == document.getElementById("currency-input").value).symbol_currency
}

function greyOut() {

    if (data.transferTypes.find(element => element.transferTitle == document.getElementById("transfertype-input").value)) {
        let enteredTT = data.transferTypes.find(element => element.transferTitle == document.getElementById("transfertype-input").value).transferCode

        if (hasFrom.filter(element => element.transferCode == enteredTT).length != 0) {
            fromInput.classList.replace("faded", "notFaded")
            if (data.donators.find(element => element.name_donator == fromInput.value)) {
                fromAsterisk.classList.add("hidden")
            } else {
                fromAsterisk.classList.remove("hidden")
            }
        } else {
            fromInput.classList.replace("notFaded", "faded")
            fromInput.value = ""
        }
        if (hasTo.filter(element => element.transferCode == enteredTT).length != 0) {
            toInput.classList.replace("faded", "notFaded")
            splitTo = toInput.value.split(" ")
            if (data.beneficiaries.find(element => element.name_beneficiary == splitTo[0] && element.father_name_beneficiary == splitTo[1] && element.family_name_beneficiary == splitTo[2])) {
                toAsterisk.classList.add("hidden")
            } else {
                toAsterisk.classList.remove("hidden")
            }
        } else {
            toInput.classList.replace("notFaded", "faded")
            toInput.value = ""
        }
    } else {
        toInput.classList.replace("notFaded", "faded")
        toAsterisk.classList.add("hidden")
        toInput.value = ""
        fromInput.classList.replace("notFaded", "faded")
        fromAsterisk.classList.add("hidden")
        fromInput.value = ""
    }

}

function checkForm(e) {

    if(data.transferTypes.find(element => element.transferTitle == TTInput.value)){
        if(data.transferTypes.find(element => element.transferTitle == TTInput.value).isExchange){
            if (confirm(`You are about to add an "Exchange" transfer. Continue?`)) {
                window.location.replace(`/api/account/addTransfer/exchange/?date=${dateInput.value}&time=${timeInput.value}&id_currency=${accountInput.value}`)
            } else {
                TTInput.value=""
            }
        }
        
    }

    greyOut()

    let asterisks = [dateAsterisk, timeAsterisk, accountAsterisk, amountAsterisk]
    let input = [dateInput, timeInput, accountInput, amountInput]

    for (let i = 0; i < asterisks.length; i++) {
        if (input[i].value != "") {
            asterisks[i].classList.add("hidden")
        } else {
            asterisks[i].classList.remove("hidden")
        }
    }
    if (data.transferTypes.find(element => element.transferTitle == TTInput.value)) {
        TTAsterisk.classList.add("hidden")
    } else {
        TTAsterisk.classList.remove("hidden")
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
    console.log("good form")

}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;

        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    greyOut()
                    checkForm()
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}



checkForm()

autocomplete(document.getElementById("transfertype-input"), transfertypesarray);
autocomplete(document.getElementById("from-input"), donaterArray);
autocomplete(document.getElementById("to-input"), beneficiaryArray);