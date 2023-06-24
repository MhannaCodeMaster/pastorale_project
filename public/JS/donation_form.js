const familyTable = document.getElementById('familyTable');
    const recipientType = document.getElementsByName('recipientType');

    // Function to handle the recipient type change event
    const handleRecipientTypeChange = () => {
      const selectedRecipientType = document.querySelector('input[name="recipientType"]:checked').value;
      if (selectedRecipientType === '2') {
        familyTable.style.display = 'block';
        familyTable.classList.add('show');
        familyTable.style.animation = "fadeIn 0.5s forwards";
        
      } else {
        familyTable.style.display = 'none';
        familyTable.classList.remove('show');
        familyTable.style.animation = "fadeOut 0.5s forwards";
        
      }
    };

    // Add event listener to the parent container of radio buttons
    document.addEventListener('change', (event) => {
      if (event.target.name === 'recipientType') {
        handleRecipientTypeChange();
      }
    });
handleRecipientTypeChange();



  // Get all the checkbox elements
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="familyPair[]"]');

  // Loop through the checkboxes
  checkboxes.forEach((checkbox, index) => {
    const commentInput = checkbox.parentNode.nextElementSibling.querySelector('input[type="text"][name="familyPair[]"]');

    // Add event listener to each checkbox
    checkbox.addEventListener('change', () => {
      if (!checkbox.checked) {
        commentInput.disabled = true; // Disable the comment input if the checkbox is not checked
        commentInput.value = ''; 
      } else {
        commentInput.disabled = false; // Enable the comment input if the checkbox is checked
      }
    });

    // Disable the comment input if the checkbox is initially unchecked
    if (!checkbox.checked) {
      commentInput.disabled = true;
      commentInput.value = ''; 
    }
  });


  function filterFamilies() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchFamily");
    filter = input.value.toUpperCase();
    table = document.getElementById("familyTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows and hide those that do not match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]; // Assuming the family name is in the first column
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  const donationTypeSelect = document.getElementById('donationType');
  const customDonationTypeContainer = document.getElementById('customDonationTypeContainer');
  const customDonationTypeInput = document.getElementById("customDonationType");
  donationTypeSelect.addEventListener('change', function() {
    if (this.value === 'others') {
      customDonationTypeContainer.style.display = 'block';
      customDonationTypeInput.required = true;
      
    } else {
      customDonationTypeContainer.style.display = 'none';
      customDonationTypeInput.required = false;
    }
  });
