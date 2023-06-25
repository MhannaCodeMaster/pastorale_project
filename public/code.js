let childCounter = 0;
const childrenFromToClone = document.getElementById("childrenFromToClone");
const addChildButton = document.getElementById("addChildButton");
const childrenForm = document.getElementById("childrenForm");

function generateChildId() {
    childCounter++;
    return `child${childCounter}`;
  }



const addNewChildForm = () =>{
    console.log('button clicked');
    const childId = generateChildId();
    const newChildFormLayout = childrenFromToClone.cloneNode(true);

    const firstName = newChildFormLayout.querySelector("input[name='FirstName']");
    const profother = newChildFormLayout.querySelector("input[name='profesional_status_other2']");
    const healother = newChildFormLayout.querySelector("input[name='health_service_other2']");


    const date = newChildFormLayout.querySelector("input[name='BirthDate']");
    const childNumberTitle = newChildFormLayout.querySelector("h5");
    const healthTable = newChildFormLayout.querySelector("table[id = healthTable]");
    const healthRow = newChildFormLayout.querySelector("tr[id=healthRow]");
    const medicationField = newChildFormLayout.querySelector("select[name='medicationss[]']");
    const diseaseField = newChildFormLayout.querySelector("select[name='diseasess[]']");
    const startDate = newChildFormLayout.querySelector("input[name='startDate[]']");
    const endDate = newChildFormLayout.querySelector("input[name='endDate[]']");
    const toBuy = newChildFormLayout.querySelector("select[name='toBuy[]']");
    const comment = newChildFormLayout.querySelector("input[name='comment[]']");
    const addRowButton = newChildFormLayout.querySelector("button[class=addRowButton");
    const toggleTable = newChildFormLayout.querySelector("input[class=toggleTable");
    const markaziye= newChildFormLayout.querySelector("input[class=markaziye");
    const room=newChildFormLayout.querySelector("div[id=room]")
    const malak=newChildFormLayout.querySelector("div[id=moulouk]")
    const cls = newChildFormLayout.querySelector("input[name='cls']");
    const establishment = newChildFormLayout.querySelector("input[name='establishment']");
    const schoolAddress = newChildFormLayout.querySelector("input[name='sch_Address']")
    const cheghlo=newChildFormLayout.querySelectorAll("input[class=estez")
    const jobdes=newChildFormLayout.querySelector("input[name='job_desc2']")
    const jobadd=newChildFormLayout.querySelector("input[name='job_address2']")
    const jobsal=newChildFormLayout.querySelector("input[name='job_salary2']")
    const jobrem=newChildFormLayout.querySelector("input[name='job_remark2']")
    const sectors = newChildFormLayout.querySelector("select[name='sectors2']");
    const services=newChildFormLayout.querySelectorAll("input[class=service]");
    const health2=newChildFormLayout.querySelector("input[name='healthes2']")
    const remarc= newChildFormLayout.querySelector("input[name='healthyremark2']");
    cheghlo.forEach(cheghlos => {
      cheghlos.name=`${childId}_profesional_status3`;
      cheghlos.id=childId
      cheghlos.setAttribute("data-child",`${childId}`)
    });
   
    services.forEach(servicess =>{
      servicess.name=`${childId}_health_service2`
      servicess.id=childId
    })
    jobdes.name=`${childId}_job_desc2`
    jobdes.id=childId
    remarc.name=`${childId}_healthyremark2`
    remarc.id=childId
    profother.name=`${childId}_profesional_status_other2`
    profother.id=childId
    healother.name=`${childId}_health_service_other2`
    healother.id=childId
    jobadd.name=`${childId}_job_address2`
    jobadd.id=childId
    jobsal.name=`${childId}_job_salary2`
    jobsal.id=childId
    jobrem.name=`${childId}_job_remark2`
    jobrem.id=childId
    sectors.name=`${childId}_sectors2`
    health2.name=`${childId}_healthes2`
    health2.id=childId

    firstName.name = `${childId}_FirstName`;
    firstName.id = childId;
    
    date.name=`${childId}_birthDate`;
    date.id=childId;
    cls.name= `${childId}_class`
    cls.id=childId
    establishment.name= `${childId}_establishment`
    establishment.id=childId
    schoolAddress.name= `${childId}_schoolAddress`
    schoolAddress.id=childId
    childNumberTitle.innerText = "Child"+childCounter;
    healthTable.id= childId+"_healthTable";
    healthRow.id = childId+"_healthRow"
    room.id=childId+"_room"
    malak.id=childId+"_moulouk"
  
    medicationField.name = `${childId}_medicationss[]`;
    diseaseField.name = `${childId}_diseasess[]`;
    startDate.name = `${childId}_startDate[]`;
    endDate.name = `${childId}_endDate[]`;
    toBuy.name = `${childId}_toBuy[]`;
    comment.name = `${childId}_comment[]`;
    markaziye.name = `${childId}_markaziye[]`
    markaziye.setAttribute("data-child",`${childId}`)
  
    toggleTable.name = `${childId}_toggleTable[]`;
    addRowButton.setAttribute("data-child", `${childId}`);
    toggleTable.setAttribute("data-child", `${childId}`);
    const radioButtons = newChildFormLayout.querySelectorAll("input[name='profesional_status3']");

  


  
  

    newChildFormLayout.style.display = "block";
    childrenForm.appendChild(newChildFormLayout);
}

function addRowToTable(childId) {

   
    const row = document.getElementById("healthRow")
    const rowTemplate=row.cloneNode(true)
    rowTemplate.id = `${childId}_healthRow`;
    console.log(rowTemplate)
    const disease=rowTemplate.querySelector("select[name='diseasess[]']")
    disease.name=`${childId}_diseasess[]`
    disease.id=childId
    const medi=rowTemplate.querySelector("select[name='medicationss[]']")
    medi.name=`${childId}_medicationss[]`
    const startDate = rowTemplate.querySelector("input[name='startDate[]']");
    const endDate = rowTemplate.querySelector("input[name='endDate[]']");
    startDate.name = `${childId}_startDate[]`;
    endDate.name = `${childId}_endDate[]`;
    const toBuy = rowTemplate.querySelector("select[name='toBuy[]']");
    const comment = rowTemplate.querySelector("input[name='comment[]']");
    toBuy.name = `${childId}_toBuy[]`;
    comment.name = `${childId}_comment[]`;

    const table = document.getElementById(`${childId}_healthTable`);
    console.log(table);
    const tbody = table.querySelector("tbody");
    console.log(tbody);
    tbody.append(rowTemplate);
  }

// Event listener for adding a row in the health situation table
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addRowButton")) {
      const childId = event.target.getAttribute("data-child");
      addRowToTable(childId);
    }
  });

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("toggleTable")) {
        const childId = event.target.getAttribute("data-child");
        const table = document.getElementById(`${childId}_healthTable`);
        if(event.target.checked){
            table.style.display = "block";
        }else{
            table.style.display = "none";
        }
        
    }
    if (event.target.classList.contains("markaziye")) {
      const childId = event.target.getAttribute("data-child");
      const table = document.getElementById(`${childId}_room`);
      
      if(event.target.checked){
          table.style.display = "block";
      }else{
          table.style.display = "none";
      }  
  }
  if(event.target.classList.contains("estez")){
    const childId = event.target.getAttribute("data-child");
    const malakSection = document.getElementById(`${childId}_moulouk`);
    const selectedType = document.querySelector( `input[name='${childId}_profesional_status3']:checked`).value;
  if (selectedType === '1') {
    malakSection.style.display = 'block';
  } else {
    malakSection.style.display = 'none';
  }

  }
})







addChildButton.addEventListener('click',addNewChildForm);

let otherCounter = 0;
const otherFromToClone = document.getElementById("otherFromToClone");
const addotherButton = document.getElementById("addOtherButton");
const otherForm = document.getElementById("otherForm");

function generateOtherId() {
    otherCounter++;
    document.getElementById("othernum").value=otherCounter
    return `other${otherCounter}`;
  }



const addNewOtherForm = () =>{
    console.log('button clicked');
    const otherId = generateOtherId();
    const newOtherFormLayout = otherFromToClone.cloneNode(true)

    const firstName5 = newOtherFormLayout.querySelector("input[name='FirstName5']");
    const lastName5 = newOtherFormLayout.querySelector("input[name='LastName5']");
    const pro = newOtherFormLayout.querySelector("input[name='profesional_status_other3']");
    const helo = newOtherFormLayout.querySelector("input[name='health_service_other3']");
    const fatherName5 = newOtherFormLayout.querySelector("input[name='FatherName5']");
    const familylink5 = newOtherFormLayout.querySelector("input[name='FamilyLink5']");
  
    const date5 = newOtherFormLayout.querySelector("input[name='BirthDate5']");
    const otherNumberTitle = newOtherFormLayout.querySelector("h4");
    const healthTable5 = newOtherFormLayout.querySelector("table[id = healthTable5]");
    const healthRow5 = newOtherFormLayout.querySelector("tr[id=healthRow5]");
    const medicationField5 = newOtherFormLayout.querySelector("select[name='medicationss5[]']");
    const diseaseField5 = newOtherFormLayout.querySelector("select[name='diseasess5[]']");
    const startDate5 = newOtherFormLayout.querySelector("input[name='startDate5[]']");
    const endDate5 = newOtherFormLayout.querySelector("input[name='endDate5[]']");
    const toBuy5 = newOtherFormLayout.querySelector("select[name='toBuy5[]']");
    const comment5 = newOtherFormLayout.querySelector("input[name='comment5[]']");
    const addRowButton5 = newOtherFormLayout.querySelector("button[class=addRowButton5");
    const toggleTable5 = newOtherFormLayout.querySelector("input[class=toggleTable5");
    const malak5=newOtherFormLayout.querySelector("div[id=moulouk5]");
    const cheghlo5=newOtherFormLayout.querySelectorAll("input[class=estez5")
    const jobdes5=newOtherFormLayout.querySelector("input[name='job_desc5']")
    const jobadd5=newOtherFormLayout.querySelector("input[name='job_address5']")
    const jobsal5=newOtherFormLayout.querySelector("input[name='job_salary5']")
    const jobrem5=newOtherFormLayout.querySelector("input[name='job_remark5']")
    const sectors5 = newOtherFormLayout.querySelector("select[name='sectors5']");
    const services5=newOtherFormLayout.querySelectorAll("input[class=ser]");
    const health5=newOtherFormLayout.querySelector("input[name='healthes5']")
    const remarc5= newOtherFormLayout.querySelector("input[name='healthyremark5']");
    cheghlo5.forEach(cheghlos5 => {
      cheghlos5.name=`${otherId}_profesional_status5`;
      cheghlos5.id=otherId
      cheghlos5.setAttribute("data-other",`${otherId}`)
    });
    services5.forEach(servicess5 =>{
      servicess5.name=`${otherId}_health_service5`
      servicess5.id=otherId
    })
    pro.name=`${otherId}_profesional_status_other3`
    pro.id=otherId
    helo.name=`${otherId}_health_service_other3`
    helo.id=otherId
    jobdes5.name=`${otherId}_job_desc5`
    jobdes5.id=otherId
    remarc5.name=`${otherId}_healthyremark5`
    remarc5.id=otherId
    lastName5.name=`${otherId}_LastName5`
    lastName5.id=otherId
    fatherName5.name=`${otherId}_FatherName5`
    fatherName5.id=otherId
    familylink5.name=`${otherId}_FamilyLink5`
    familylink5.id=otherId
    jobadd5.name=`${otherId}_job_address5`
    jobadd5.id=otherId
    jobsal5.name=`${otherId}_job_salary5`
    jobsal5.id=otherId
    jobrem5.name=`${otherId}_job_remark5`
    jobrem5.id=otherId
    sectors5.name=`${otherId}_sectors5`
    health5.name=`${otherId}_healthes5`
    health5.id=otherId

    firstName5.name = `${otherId}_FirstName5`;
    firstName5.id = otherId;
   
    date5.name=`${otherId}_birthDate5`;
    date5.id=otherId;
    otherNumberTitle.innerText = "Other "+otherCounter;
    healthTable5.id= otherId+"_healthTable5";
    healthRow5.id = otherId+"_healthRow5"
    malak5.id=otherId+"_moulouk5"
  
    medicationField5.name = `${otherId}_medicationss5[]`;
    diseaseField5.name = `${otherId}_diseasess5[]`;
    startDate5.name = `${otherId}_startDate5[]`;
    endDate5.name = `${otherId}_endDate5[]`;
    toBuy5.name = `${otherId}_toBuy5[]`;
    comment5.name = `${otherId}_comment5[]`;
   
  
    toggleTable5.name = `${otherId}_toggleTable5[]`;
    addRowButton5.setAttribute("data-other", `${otherId}`);
    toggleTable5.setAttribute("data-other", `${otherId}`);
    


// Function to handle the display change event


  
  

    newOtherFormLayout.style.display = "block";
    otherForm.appendChild(newOtherFormLayout);
}

function addRowToTable5(otherId) {

   
    const row5 = document.getElementById("healthRow5")
    const rowTemplate5=row5.cloneNode(true)
    rowTemplate5.id = `${otherId}_healthRow5`;
    console.log(rowTemplate5)
    const disease5=rowTemplate5.querySelector("select[name='diseasess5[]']")
    disease5.name=`${otherId}_diseasess5[]`
    disease5.id=otherId
    const medi5=rowTemplate5.querySelector("select[name='medicationss5[]']")
    medi5.name=`${otherId}_medicationss5[]`
    const startDate5 = rowTemplate5.querySelector("input[name='startDate5[]']");
    const endDate5 = rowTemplate5.querySelector("input[name='endDate5[]']");
    startDate5.name = `${otherId}_startDate5[]`;
    endDate5.name = `${otherId}_endDate5[]`;
    const toBuy5 = rowTemplate5.querySelector("select[name='toBuy5[]']");
    const comment5 = rowTemplate5.querySelector("input[name='comment5[]']");
    toBuy5.name = `${otherId}_toBuy5[]`;
    comment5.name = `${otherId}_comment5[]`;

    const table5 = document.getElementById(`${otherId}_healthTable5`);
    console.log(table5);
    const tbody5 = table5.querySelector("tbody[class=steph");
    console.log(tbody5);
    tbody5.append(rowTemplate5);
  }

// Event listener for adding a row in the health situation table
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addRowButton5")) {
      const otherId = event.target.getAttribute("data-other");
      addRowToTable5(otherId);
    }
  });

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("toggleTable5")) {
        const otherId = event.target.getAttribute("data-other");
        const table5 = document.getElementById(`${otherId}_healthTable5`);
        if(event.target.checked){
            table5.style.display = "block";
        }else{
            table5.style.display = "none";
        }
        
    }
    if(event.target.classList.contains("estez5")){
      const otherId = event.target.getAttribute("data-other");
      const malakSections = document.getElementById(`${otherId}_moulouk5`);
      const selectedTypes = document.querySelector( `input[name='${otherId}_profesional_status5']:checked`).value;
    if (selectedTypes === '1') {
      malakSections.style.display = 'block';
    } else {
      malakSections.style.display = 'none';
    }
  
    }
})
addotherButton.addEventListener('click',addNewOtherForm);
var checkbox20 = document.getElementById('check10');
var table20 = document.getElementById('table10');

checkbox20.addEventListener('click', function() {
  if (this.checked) {
    table20.style.display = 'block';
  
  } else {
    table20.style.display = 'none';
    
  }
});


var financialCheckbox = document.getElementById('Financial');

// Get the input text element
var inputText = document.getElementById('jik');

// Add an event listener to the checkbox
financialCheckbox.addEventListener('click', function() {
  // Check if the checkbox is checked
  if (financialCheckbox.checked) {
    // Show the input text
    inputText.style.display = 'block';
  } else {
    // Hide the input text
    inputText.style.display = 'none';
  }
});
var ScholarCheckbox = document.getElementById('Scolaire');

// Get the input text element
var inputText1 = document.getElementById('jik1');

// Add an event listener to the checkbox
ScholarCheckbox.addEventListener('click', function() {
  // Check if the checkbox is checked
  if (ScholarCheckbox.checked) {
    // Show the input text
    inputText1.style.display = 'block';
  } else {
    // Hide the input text
    inputText1.style.display = 'none';
  }
});
var OtherCheckbox = document.getElementById('other_decision');

// Get the input text element
var inputText2 = document.getElementById('jik2');

// Add an event listener to the checkbox
OtherCheckbox.addEventListener('click', function() {
  // Check if the checkbox is checked
  if (OtherCheckbox.checked) {
    // Show the input text
    inputText2.style.display = 'block';
  } else {
    // Hide the input text
    inputText2.style.display = 'none';
  }
});

var checkbox1 =document.getElementById('check2');
var table1=document.getElementById('mytable1');

checkbox1.addEventListener('click',function(){
  if(this.checked){
    table1.style.display='block'

  }else{
    table1.style.display='none'

  }
})



const Displayrent = document.getElementById('rento');
const property_type = document.getElementsByName('property_type');
const benijobs = document.getElementById('benijob');
const profesional_status = document.getElementsByName('profesional_status');
const jointjobs = document.getElementById('jointjob');
const profesional_status1 = document.getElementsByName('profesional_status1');
const DisplayJoint = document.getElementById('join');
const familysituation = document.getElementsByName('familysituation');


// Function to handle the recipient type change event
const handleJointChange = () => {
  const selectedfamilyType = document.querySelector('input[name="familysituation"]:checked').value;
 
  if (selectedfamilyType === '2') {
    DisplayJoint.style.display = 'block';
    
  } else {
    DisplayJoint.style.display = 'none';
   
  }
};


    // Function to handle the recipient type change event
const handlejointTypeChange = () => {
      const selectedjointType = document.querySelector('input[name="profesional_status1"]:checked').value;
      if (selectedjointType === '1') {
        jointjobs.style.display = 'block';
      } else {
        jointjobs.style.display = 'none';
      }

    };
// Function to handle the recipient type change event
const handleRentChange = () => {
const selectedpropertyType = document.querySelector('input[name="property_type"]:checked').value;
if (selectedpropertyType === '2') {
  Displayrent.style.display = 'block';
} else {
  Displayrent.style.display = 'none';
}
};
const handlebeniTypeChange = () => {
  const selectedbeniType = document.querySelector('input[name="profesional_status"]:checked').value;
  if (selectedbeniType === '1') {
    benijobs.style.display = 'block';
  } else {
    benijobs.style.display = 'none';
  }
  

};
// Add event listener to the parent container of radio buttons
document.addEventListener('change', (event) => {
  if (event.target.name === 'property_type') {
    handleRentChange();
  }
  if (event.target.name === 'profesional_status') {
    handlebeniTypeChange();
  }
  if (event.target.name === 'profesional_status1') {
    handlejointTypeChange();
  }
  if (event.target.name === 'familysituation') {
    handleJointChange();
  }
  });
  
handleRentChange();
handlebeniTypeChange();
handlejointTypeChange();
handleJointChange();
































    


function addRow() {
  var table = document.getElementById("table10");
  var row = document.getElementById("row1");
  var newRow = table.insertRow(-1); // Insert a new row at the end of the table

  for (var i = 0; i < row.cells.length; i++) {
    var cell = row.cells[i];
    var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
    newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
  }
}



function addRow1() {
  var table1 = document.getElementById("mytable1");
  var row1 = document.getElementById("row2");
  var newRow = table1.insertRow(-1); // Insert a new row at the end of the table

  for (var i = 0; i < row1.cells.length; i++) {
    var cell = row1.cells[i];
    var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
    newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
  }
}
function calculateSum() {
  // Get the values of the two input fields
  var number1 = parseInt(document.getElementById("ajar").value) || 0;
  var number2 = parseInt(document.getElementById("dish").value) || 0;
  var number3 = parseInt(document.getElementById("internet").value) || 0;
  var number4 = parseInt(document.getElementById("cellulare").value) || 0;
  var number5 = parseInt(document.getElementById("electricity").value) || 0;
  var number6 = parseInt(document.getElementById("generator").value) || 0;
  var number7 = parseInt(document.getElementById("loan").value) || 0;
  var number8 = parseInt(document.getElementById("others").value) || 0;







  // Calculate the sum
  var sum = number1 + number2 + number3 +number4 +number5 +number6 +number7 + number8;

  // Set the sum value to the hidden form field
  document.getElementById("monthly_spend").value = sum;
}




  

