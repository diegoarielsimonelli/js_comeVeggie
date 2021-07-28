//STAFF


//reqres.in


function trabajarConAjax() {
    let persona = {
        "email":"simonelidiego@gmail.com",
        "first_name": "Diego ",
        "last_name": "Simonelli",
        "avatar": "https://reqres.in/img/faces/13-image.jpg"
    }
    $.post("https://reqres.in/api/users?page=2", persona).done(function(resultado2) {
        console.log("Data que retorna la API reqres con POST: " + JSON.stringify(resultado2));
    });
    $.get("https://reqres.in/api/users?page=2").done(function(resultado3) {
        
        let arrayUsuarios = resultado3.data;
        arrayUsuarios.forEach(usu => {
            $("#staff").append("<h3>" + usu.first_name + "</h3>" + "<h2>" + usu.last_name + "</h2>"+ "<img src=" + usu.avatar + ">");
          
        })
    })
  }
  trabajarConAjax();