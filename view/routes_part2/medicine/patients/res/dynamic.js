var table = document.getElementById("main-table")
var delButton = document.getElementsByClassName("del-icon")
let personNameInput = document.getElementById("personNameInput")
let datarows = document.getElementsByClassName("data-row")
const data = JSON.parse(document.getElementById("hidden-data").innerText)

let submit = document.getElementById("submit-btn")

document.getElementById("form-meta").value = Number(datarows.length)

function addNewRow() {
    var datarows = document.getElementsByClassName("data-row")

    let tr = document.createElement("tr")
    let id = Number(datarows.length) + 1
    tr.id = id
    document.getElementById("form-meta").value = id
    tr.classList.add("data-row")

    let sicknessArray = ""
    for (let i = 0; i < data.sicknesses.length; i++) {
        sicknessArray += `<option value=${data.sicknesses[i].id_sickness}> ${data.sicknesses[i].description_sickness}</option>`
    }

    let medicationArray = ""
    for (let i = 0; i < data.medications.length; i++) {
        medicationArray += `<option value=${data.medications[i].id_medicine}> ${data.medications[i].description_medicine}</option>`
    }

    tr.innerHTML = `
    <td class="id-td">${id}</td>

    <td><select name="sicknesspost" class="sickness-select" onchange="checkForm()">
        <option></option>
        ${sicknessArray}
        </select>
    </td>



    <td><select name="medicationpost" class="medication-select" onchange="checkForm()">
        <option></option>
        ${medicationArray}
    </td>

    <td><input id="n${id}"class="checkbox notChecked" onchange="fixIsActive(), fixCheckboxes()" type="checkbox" name="isActive"><label class="checkboxLabel" for="n${id}">On</label></td>

    <input type="hidden" class="isActivehidden" name="isActivehidden">

    <td><input type="text" name="commentpost" maxlength="254"></td>

    <td><i class="fa-solid fa-trash del-icon" id="${id}" onclick="removeRow(this), checkForm()"></i></td>`

    table.appendChild(tr)

}

function updateIDs() {

    var idtds = document.getElementsByClassName("id-td")

    for (let i = 0; i < delButton.length; i++) {
        for (let i = 0; i < idtds.length; i++) {
            idtds[i].innerText = i + 1
        }
        document.getElementById("form-meta").value = idtds.length
    }
}

function newRedirect() {
    window.location.replace(`/medicine/patients/?patientid=${personNameInput.value}`)
}

function removeRow(e) {
    let datarows = document.getElementsByClassName("data-row")
    for (let i = 0; i < datarows.length; i++) {
        if (datarows[i].id == e.id) {
            datarows[i].remove()
        }
    }
    updateIDs()
}

function fixIsActive() {
    let isActive = document.getElementsByClassName("checkbox")
    let isActiveHidden = document.getElementsByClassName("isActivehidden")


    for (let i = 0; i < isActive.length; i++) {

        if (isActive[i].checked) {
            isActiveHidden[i].value = "on"
        } else {
            isActiveHidden[i].value = "off"
        }
    }
}

function fixCheckboxes(){
    let checkboxes = document.getElementsByClassName("checkbox")
    let checkboxLabels = document.getElementsByClassName("checkboxLabel")

    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkboxLabels[i].innerText = "On"
        } else {
            checkboxLabels[i].innerText = "Off"
        }
    }
}

function checkForm() {
    let medication = document.getElementsByClassName("medication-select")
    let sickness = document.getElementsByClassName("sickness-select")

    for(let i=0; i<medication.length; i++){
        if(!medication[i].value){
            submit.classList.replace("notFaded", "faded")
            return
        }
    }
    for(let i=0; i<sickness.length; i++){
        if(!sickness[i].value){
            submit.classList.replace("notFaded", "faded")
            return
        }
    }

    if(!personNameInput.value){
        submit.classList.replace("notFaded", "faded")
        return
    }
    
    submit.classList.replace("faded", "notFaded")
}
fixCheckboxes()
fixIsActive()
checkForm()