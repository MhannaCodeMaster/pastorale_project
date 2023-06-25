function addRowToTables(childId) {

   
  const row = document.getElementById("healtho")
  const rowTemplate=row.cloneNode(true)
  rowTemplate.id = `${childId}_healtho`;
  const disease=rowTemplate.querySelector("select[name='diseasess7[]']")
  disease.name=`${childId}_diseasess7[]`
  disease.id=childId
  const medi=rowTemplate.querySelector("select[name='medicationss7[]']")
  medi.name=`${childId}_medicationss7[]`
  const startDate = rowTemplate.querySelector("input[name='startDate7[]']");
  const endDate = rowTemplate.querySelector("input[name='endDate7[]']");
  startDate.name = `${childId}_startDate7[]`;
  endDate.name = `${childId}_endDate7[]`;
  const toBuy = rowTemplate.querySelector("select[name='toBuy7[]']");
  const comment = rowTemplate.querySelector("input[name='comment7[]']");
  toBuy.name = `${childId}_toBuy7[]`;
  comment.name = `${childId}_comment7[]`;

  const table = document.getElementById(`${childId}_healthTable7`);
  console.log(table);
  const tbody = table.querySelector("tbody[class=eliya");
  console.log(tbody);
  tbody.append(rowTemplate);
}

// Event listener for adding a row in the health situation table
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("addRowButton7")) {
    const childId = event.target.getAttribute("data-value");
    addRowToTables(childId);
  }
});
const mainjobs = document.getElementById('myform2');
    const profesional_status = document.getElementsByName('profesional_status');

    // Function to handle the recipient type change event
    const handlemainTypeChange = () => {
      const selectedmainType = document.querySelector('input[name="profesional_status"]:checked').value;
      if (selectedmainType === '1') {
        mainjobs.style.display = 'block';
      } else {
        mainjobs.style.display = 'none';
        document.getElementById("job11").value=""
        document.getElementById("job12").value=""
        document.getElementById("job13").value=""
        document.getElementById("job14").value=""
        document.getElementById("job15").value=""
      }
    };

    // Add event listener to the parent container of radio buttons
    document.addEventListener('change', (event) => {
      if (event.target.name === 'profesional_status') {
        handlemainTypeChange();
      }
    });
handlemainTypeChange();
    const rent = document.getElementById('myform1');
    const property_type = document.getElementsByName('property_type');

    // Function to handle the recipient type change event
    const handlePropTypeChange = () => {
      const selectedPropType = document.querySelector('input[name="property_type"]:checked').value;
      if (selectedPropType === '2') {
          rent.style.display = 'block';
      } else {
         rent.style.display = 'none';
        document.getElementById("rents").value=""
      }
    };

    // Add event listener to the parent container of radio buttons
    document.addEventListener('change', (event) => {
      if (event.target.name === 'property_type') {
        handlePropTypeChange();
      }
    });
handlePropTypeChange();
function addRow() {
    var table = document.getElementById("mytable");
    var row = document.getElementById("firstRow");
    var newRow = table.insertRow(-1
        ); // Insert a new row at the end of the table
  
    for (var i = 0; i < row.cells.length; i++) {
      var cell = row.cells[i];
      var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
      newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
    }
  }
  function addRow1() {
    var table = document.getElementById("mytable1");
    var row = document.getElementById("row2");
    var newRow = table.insertRow(-1
        ); // Insert a new row at the end of the table
  
    for (var i = 0; i < row.cells.length; i++) {
      var cell = row.cells[i];
      var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
      newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
    }
  }
document.addEventListener("change", (event) => {
    if (event.target.classList.contains("table1")) {
        const table1 = document.getElementById("mytable");
        const rowi=document.getElementsByClassName("rowi1")
       
        if(event.target.checked){
            table1.style.display = "block";
          
        }else{
            table1.style.display = "none";
           
        }
        
    }
})
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


