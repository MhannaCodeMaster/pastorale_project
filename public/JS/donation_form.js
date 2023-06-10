const familyTable = document.getElementById('familyTable');
    const recipientType = document.getElementsByName('recipientType');

    // Function to handle the recipient type change event
    const handleRecipientTypeChange = () => {
      const selectedRecipientType = document.querySelector('input[name="recipientType"]:checked').value;
      if (selectedRecipientType === '2') {
        familyTable.style.display = 'block';
      } else {
        familyTable.style.display = 'none';
      }
    };

    // Add event listener to the parent container of radio buttons
    document.addEventListener('change', (event) => {
      if (event.target.name === 'recipientType') {
        handleRecipientTypeChange();
      }
    });
function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${padZero(day)}/${padZero(month)}/${year}`;
    }
    
    function padZero(value) {
      return value.toString().padStart(2, '0');
    }
    
