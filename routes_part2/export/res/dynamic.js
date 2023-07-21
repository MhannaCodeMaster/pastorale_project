let accountDates = document.getElementsByClassName("account-month")
let activityDates = document.getElementsByClassName("activity-month")
let medicineDates = document.getElementsByClassName("medicine-month")
let submitBtn = document.getElementById("submit-btn")

let moneyCollapse = document.getElementById("money-collapse")
let activityCollapse = document.getElementById("activity-collapse")
let medicineCollapse = document.getElementById("medicine-collapse")


let accounts = document.getElementById("accounts")
let activities = document.getElementById("activities")
let medicine = document.getElementById("patients")

let activityDatesDiv = document.getElementsByClassName("activity-dates")
let singleActivites = document.getElementById("single-activities")



function greyOutDates(){ //Greys out submit button

    let accountFromYear = Number(accountDates[0].value.split("-")[0])
    let accountToYear = Number(accountDates[1].value.split("-")[0])
    let accountFromMonth = Number(accountDates[0].value.split("-")[1])
    let accountToMonth = Number(accountDates[1].value.split("-")[1])

    let activityFromYear = Number(activityDates[0].value.split("-")[0])
    let activityToYear = Number(activityDates[1].value.split("-")[0])
    let activityFromMonth = Number(activityDates[0].value.split("-")[1])
    let activityToMonth = Number(activityDates[1].value.split("-")[1])

    let medicineFromYear = Number(medicineDates[0].value.split("-")[0])
    let medicineToYear = Number(medicineDates[1].value.split("-")[0])
    let medicineFromMonth = Number(medicineDates[0].value.split("-")[1])
    let medicineToMonth = Number(medicineDates[1].value.split("-")[1])


    if(accountDates[0].value || accountDates[1].value){
        if(!accountDates[1].value || !accountDates[0].value){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }

        if(accountFromYear > accountToYear){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }
        if(accountFromYear == accountToYear){
            if(accountFromMonth > accountToMonth){
                submitBtn.classList.replace("notFaded", "faded")
                return
            }
        }
    }

    if(activityDates[0].value || activityDates[1].value){

        singleActivites.classList.replace("notFaded", "faded")
        singleActivites.value = ""
   
        if(!activityDates[1].value || !activityDates[0].value){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }

        if(activityFromYear > activityToYear){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }
        if(activityFromYear == activityToYear){
            if(activityFromMonth > activityToMonth){
                submitBtn.classList.replace("notFaded", "faded")
                return
            }
        }
    } else {
        singleActivites.classList.replace("faded", "notFaded")
    }

    if(medicineDates[0].value || medicineDates[1].value){
        if(!medicineDates[1].value || !medicineDates[0].value){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }

        if(medicineFromYear > medicineToYear){
            submitBtn.classList.replace("notFaded", "faded")
            return
        }
        if(medicineFromYear == medicineToYear){
            if(medicineFromMonth > medicineToMonth){
                submitBtn.classList.replace("notFaded", "faded")
                return
            }
        }
    }
    submitBtn.classList.replace("faded", "notFaded")

}

function greyOut(){ //greys out dates if unchecked
    if(accounts.checked){
        for(let i=0; i<accountDates.length; i++){
            accountDates[i].classList.replace("faded", "notFaded")
        }
    } else {
        for(let i=0; i<accountDates.length; i++){
            accountDates[i].classList.replace("notFaded", "faded")
            accountDates[i].value = ""
        }
    }
    if(activities.checked){
        for(let i=0; i<activityDates.length; i++){
            activityDates[i].classList.replace("faded", "notFaded")
            singleActivites.classList.replace("faded", "notFaded")
        }
    }else {
        for(let i=0; i<activityDates.length; i++){
            activityDates[i].classList.replace("notFaded", "faded")
            singleActivites.classList.replace("notFaded", "faded")
            activityDates[i].value = ""
        }
    }
    if(medicine.checked){
        for(let i=0; i<medicineDates.length; i++){
            medicineDates[i].classList.replace("faded", "notFaded")
        }
    }else {
        for(let i=0; i<medicineDates.length; i++){
            medicineDates[i].classList.replace("notFaded", "faded")
            medicineDates[i].value = ""
        }
    }
    if(accounts.checked || medicine.checked || activities.checked){
        submitBtn.classList.replace("faded", "notFaded")
    } else {
        submitBtn.classList.replace("notFaded", "faded")
    }


    if(accounts.checked){
        moneyCollapse.classList.add("collapsing")
        setTimeout(() => {moneyCollapse.classList.add("show")}, 300);
        moneyCollapse.classList.remove("collapsing")
 
    } else {
        moneyCollapse.classList.add("collapsing")
        setTimeout(() => {moneyCollapse.classList.remove("show")}, 300);
        moneyCollapse.classList.remove("collapsing")
    }

    if(activities.checked){
        activityCollapse.classList.add("collapsing")
        setTimeout(() => {activityCollapse.classList.add("show")}, 300);
        activityCollapse.classList.remove("collapsing")
 
    } else {
        activityCollapse.classList.add("collapsing")
        setTimeout(() => {activityCollapse.classList.remove("show")}, 300);
        activityCollapse.classList.remove("collapsing")
    }

    if(medicine.checked){
        medicineCollapse.classList.add("collapsing")
        setTimeout(() => {medicineCollapse.classList.add("show")}, 300);
        medicineCollapse.classList.remove("collapsing")
 
    } else {
        medicineCollapse.classList.add("collapsing")
        setTimeout(() => {medicineCollapse.classList.remove("show")}, 300);
        medicineCollapse.classList.remove("collapsing")
    }
}

function dateFix(e){
    if(!e.value){
        e.value = ""
    }
}

function greyOutActivityDates(){

        if(singleActivites.value != ""){

            for(let j=0; j<activityDatesDiv.length; j++){
            activityDatesDiv[j].classList.replace("notFaded", "faded")
            }
            for(let i=0; i<activityDates.length; i++){
                activityDates[i].value = ""
            }

            submitBtn.classList.replace("faded", "notFaded")

        } else {
            for(let j=0; j<activityDatesDiv.length; j++){
                activityDatesDiv[j].classList.replace("faded", "notFaded")
            }
            for(let i=0; i<activityDates.length; i++){
                activityDates[i].value = ""
            }
        }        
}

greyOutDates()
greyOut()