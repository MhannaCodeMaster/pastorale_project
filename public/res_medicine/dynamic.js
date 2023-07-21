const data = JSON.parse(document.getElementById("hidden-data").innerText)


function patientRedirect() {
    window.location.replace(`/api/medicine/patients`)
}

function addRedirect() {
    window.location.replace(`/api/medicine/addMedicationReceipt`)
}
function submitFiltersForm() {
    document.getElementById("filters-form").submit()
}

function submitClearFilters(){
    document.getElementById("clear-filters-form").submit()
}

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