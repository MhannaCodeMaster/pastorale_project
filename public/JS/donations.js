function filterDonations() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("donationsTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows and hide those that do not match the search query
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[1]; // Assuming the name column is the second column
      td2 = tr[i].getElementsByTagName("td")[2];
      if (td1 || td2) {
          txtValue1 = td1.textContent || td1.innerText;
          txtValue2 = td2.textContent || td2.innerText;
        if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
          td1.innerHTML = txtValue1.replace(
          new RegExp("(" + filter + ")", "gi"),
          "<span class='highlight'>$1</span>"
        );
        td2.innerHTML = txtValue2.replace(
          new RegExp("(" + filter + ")", "gi"),
          "<span class='highlight'>$1</span>"
        );
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }