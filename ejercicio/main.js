
document.addEventListener('readystatechange', event =>{
    if(event.target.readyState == 'complete'){
        genera_tabla();
    }
});

function genera_tabla() {

    fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        
        // Tabla i
        var tbbody = document.getElementsByTagName("tbody")[0];
        for(var i in data){
            
            var hilera = document.createElement("tr");
            
            // Posicion
            var posicion = document.createElement("td");
            var textoPosicion = document.createTextNode(parseInt(i)+1);
            posicion.appendChild(textoPosicion);
            hilera.appendChild(posicion);

            // Event 
            var evento = document.createElement("td");
            var textoEvento = document.createTextNode(data[i].events);
            evento.appendChild(textoEvento);
            hilera.appendChild(evento);

            // Value
            var value = document.createElement("td");
            var textoValue = document.createTextNode(data[i].squirrel);
            if( data[i].squirrel === true){
                hilera.style.background='#ffb8c6';
            }
            value.appendChild(textoValue);
            hilera.appendChild(value);

        
            tbbody.appendChild(hilera);
           
        }

    });    
    
  }