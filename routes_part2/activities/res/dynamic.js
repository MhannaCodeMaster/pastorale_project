function dateAlert(e){
    if(!e.value){
        if (confirm(`Warning: this may result in a big table. Continue?`)) {
            document.getElementById("filters").submit()
          } else {
            document.getElementById("month-input").value = data.queries.month
          }
    } else {
        document.getElementById("filters").submit()
    }
}