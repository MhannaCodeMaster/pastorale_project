var data = JSON.parse(document.getElementById("hidden-data").innerText)

var tdElement = document.getElementsByTagName("td")
var currencyButton = document.getElementsByClassName("currency-btn")


function dateAlert(e){
    if(!e.value){
        if (confirm(`Warning: this may result in a big table. Continue?`)) {
            document.getElementById("filters-form").submit()
          } else {
            document.getElementById("main-month").value = data.queries.month
          }
    } else {
        document.getElementById("filters-form").submit()
    }
}

function submitFilters(){
    document.getElementById("filters-form").submit()
}

function submitClearFilters(){
    document.getElementById("clear-filters-form").submit()
}

function submitFiltersTransferType(){
    document.getElementById("isGain").value = null
    document.getElementById("isLoss").value = null
    document.getElementById("filters-form").submit()
}

for (var i = 0; i < tdElement.length; i++) {
    if (tdElement[i].innerText == "") {
        tdElement[i].className = "null"
        tdElement[i].innerText = ""
    }
}

for (var i = 0; i < currencyButton.length; i++) {
    let currentID = data.currencies[i].id_currency
    currencyButton[i].addEventListener("click", (event) => {

        if(data.queries.month){
            window.location.replace(`/api/account?id_currency=${currentID}&r=1&month=${data.queries.month}`);
            return
        }

        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }
        let month = d.getFullYear() + "-" + monthDate

        window.location.replace(`/api/account?id_currency=${currentID}&r=1&month=${month}`);
    })
}

document.getElementById("add-currency").addEventListener("click", (event) => {
    window.location.replace(`/api/account/addCurrency?id_currency=${data.queries.id_currency}`);
})