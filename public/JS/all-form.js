const exportButton = document.getElementById('exportButton');
const selectedCheckBoxes = document.getElementById('selectedCheckBoxes');
const checkboxes = document.querySelectorAll('.checkbox-control');
const tableRows = document.querySelectorAll('.table-row');

//Function handle export button behavior
function handleExportButton(selectedBoxes){
  if (selectedBoxes === 0) {
    exportButton.style.display = "none";
    return;
  } 
  exportButton.style.display = "block";
  exportButton.innerText = "Export ("+selectedBoxes+")";
}

//event listener for the table header checkbox.
const triggeringCheckbox = document.getElementById('checkAll');
triggeringCheckbox.addEventListener('change', function() {
  const isChecked = this.checked;
  var  selectedBoxes = 0;
  // Loop through all checkboxes and set their checked state
  for(let i =0 ;i < checkboxes.length;i++){
    checkboxes[i].checked = isChecked;
    if(!isChecked) tableRows[i].classList.remove("row-selected");
    else tableRows[i].classList.add("row-selected");
    selectedBoxes++;
  }
  
  if(isChecked) handleExportButton(selectedBoxes);
  else {
    exportButton.style.display = "none";
  }
});

//When export button clicked submit the inside table form. 
const submitForm = () => {
  document.getElementById('exportForm').submit();
};

//event listener for displaying the close beneficiary file modal
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-file-btn")) {
    const ben_id = event.target.getAttribute("data-ben-id");
    const ben_name = event.target.getAttribute("data-ben-name");
    const modal_title = document.getElementById("confirmationModalLabel");
    const hidden_input = document.getElementById("close_ben_id");
    hidden_input.value = ben_id;
    modal_title.innerText = 'Close '+ben_name+' File';
  }
});


//Adding event listeners to all table rows for checking or unchecking the checkbox inside the clicked row
tableRows.forEach(row => {
  row.addEventListener("click", (event) => {
    if(event.target.classList.contains('btn-primary')){
      return;
    }
    if (!event.target.classList.contains('checkbox-control')) {
      const checkbox = row.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
    }
    var selectedBoxes = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedBoxes++;
      }
    });
    console.log(row);
    row.classList.toggle("row-selected");
    handleExportButton(selectedBoxes);
  });
});

