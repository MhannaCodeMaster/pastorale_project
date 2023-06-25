// function filterDonations() {
//     var input, filter, table, tr, td, i;
//     input = document.getElementById("searchInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("donationsTable");
//     tr = table.getElementsByTagName("tr");

//     // Loop through all table rows and hide those that do not match the search query
//     for (i = 0; i < tr.length; i++) {
//       td1 = tr[i].getElementsByTagName("td")[1]; // Assuming the name column is the second column
//       td2 = tr[i].getElementsByTagName("td")[2];
//       if (td1 || td2) {
//           txtValue1 = td1.textContent || td1.innerText;
//           txtValue2 = td2.textContent || td2.innerText;
//         if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
//           td1.innerHTML = txtValue1.replace(
//           new RegExp("(" + filter + ")", "gi"),
//           "<span class='highlight'>$1</span>"
//         );
//         td2.innerHTML = txtValue2.replace(
//           new RegExp("(" + filter + ")", "gi"),
//           "<span class='highlight'>$1</span>"
//         );
//           tr[i].style.display = "";
//         } else {
//           tr[i].style.display = "none";
//         }
//       }
//     }
//   }

//   function filterDonationsTypes() {
//     // Get the selected donation type
//     const donationTypeFilter = document.getElementById("donationTypeFilter");
//     const selectedType = donationTypeFilter.value;
  
//     // Get the search input value
//     const searchInput = document.getElementById("searchInput");
//     const searchText = searchInput.value.toLowerCase();
  
//     // Get all donation rows
//     const donationRows = document.querySelectorAll("#donationsTable tbody tr");
  
//     // Loop through the rows and hide/show based on the selected type and search text
//     donationRows.forEach(row => {
//       const donationType = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
//       const donatorName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
  
//       if ((selectedType === "all" || donationType === selectedType) && donatorName.includes(searchText)) {
//         row.style.display = "table-row";
//       } else {
//         row.style.display = "none";
//       }
//     });
//   }
function filterDonations() {
  // Get the selected donation type
  const donationTypeFilter = document.getElementById("donationTypeFilter");
  const selectedType = donationTypeFilter.value;

  // Get the search input value
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.toLowerCase();

  // Get all donation rows
  const donationRows = document.querySelectorAll("#donationsTable tbody tr");

  // Loop through the rows and hide/show based on the selected type and search text
  donationRows.forEach(row => {
    const donationType = row.querySelector("td:nth-child(5)").textContent;
    const donationAmount = row.querySelector("td:nth-child(4)");
    const donatorName = row.querySelector("td:nth-child(3)");

    // Reset the row's text content
    donationAmount.innerHTML = donationAmount.innerHTML.replace(/<mark>|<\/mark>/gi, '');
    donatorName.innerHTML = donatorName.innerHTML.replace(/<mark>|<\/mark>/gi, '');
    console.log(selectedType)

    

    if ((selectedType === "all" || donationType === selectedType || donationAmount.textContent.toLowerCase() === selectedType) && (donatorName.textContent.toLowerCase().includes(searchText) || donationAmount.textContent.toLowerCase().includes(searchText))) {
      // Highlight the matched text if search text is not empty
      if (searchText !== '') {
        const regex = new RegExp(`(${searchText})`, 'gi');
        donationAmount.innerHTML = donationAmount.innerHTML.replace(regex, "<mark>$1</mark>");
        donatorName.innerHTML = donatorName.innerHTML.replace(regex, "<mark>$1</mark>");
      }

      // Show the row
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}



// Attach event listener to the donation type filter
document.getElementById("donationTypeFilter").addEventListener("change", filterDonations);

// Get the table container element
var tableContainer = document.getElementById('donationsTableContainer');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const exportButton = document.getElementById('exportButton');
// Add scroll event listener to the table container
function handleExportButton(selectedBoxes){
  if (selectedBoxes === 0) {
    exportButton.style.display = "none";
    return;
  } 
  exportButton.style.display = "block";
  exportButton.innerText = "Export ("+selectedBoxes+")";
}

function toggleRowSelection(event, donationId) {
  var count = 0
  // Check if the click event was triggered by the checkbox itself
  if (event.target.tagName !== 'INPUT') {
    
    var checkbox = document.getElementById('export_' + donationId);
    checkbox.checked = !checkbox.checked;
    checkBoxes.forEach(box =>{
      if(box.checked){
        count++
      }
      
    })
    handleExportButton(count)
  }
}

