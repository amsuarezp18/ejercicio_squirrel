
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

         // Tabla 2

         var tbbodyC = document.getElementsByTagName("tbody")[1];

          //Coeficiente de correlación 
      
          function MCC(matrix){
            let trueN = matrix[0]; 
            let falseN = matrix[1]; 
            let falseP = matrix[2]; 
            let trueP = matrix[3]; 
            return (trueP * trueN - falseP * falseN)/Math.sqrt( (trueP + falseP )*( trueP + falseN)*(trueN + falseP)*(trueN + falseN));
          }
        
          //Guardar en la matriz los fN, fP, tN, tP
          function guardar(evento)
          {
            var matrix = [0,0,0,0]
            data.forEach(row =>{
              var index = 0; 
              var value = row.events.some(event => event === evento);
              if (value && row.squirrel){
                index = 3;
              }
              else if (value && !row.squirrel)
              {
                index=1;
              }
              else if(row.squirrel && !value)
              {
                index=2;
              }
              matrix[index]+=1;
            });
            return MCC(matrix);
          }
        
          // MCC para cada evento
          var squirrelEvent = []
          data.forEach(fila=>{
            fila.events.forEach(evento=>{
              var dict = {
                'event':evento,
                'MCC':guardar(evento)
              };
              var found = squirrelEvent.some(squirrelEvent => squirrelEvent.event === evento);
              if(!found)
              {
                squirrelEvent.push(dict);
              }
            });
          });
          
          //Arreglar los elementos por ornden descendiente
          squirrelEvent = squirrelEvent.sort(function (a, b) {
            if (a.MCC > b.MCC) {
              return -1;
            }
            if (a.MCC < b.MCC) {
              return 1;
            }
            return 0;
          });


          // Crear la tabla
         for(var i in squirrelEvent){
             
             var hilera = document.createElement("tr");
             
             // Posicion
             var posicion = document.createElement("td");
             var textoPosicion = document.createTextNode(parseInt(i)+1);
             posicion.appendChild(textoPosicion);
             hilera.appendChild(posicion);
 
             // Event 
             var evento = document.createElement("td");
             var textoEvento = document.createTextNode(squirrelEvent[i].event);
             evento.appendChild(textoEvento);
             hilera.appendChild(evento);
 
             // Correlacion
             var value = document.createElement("td");
             var textoValue = document.createTextNode(squirrelEvent[i].MCC);
             value.appendChild(textoValue);
             hilera.appendChild(value);
 
         
             tbbodyC.appendChild(hilera);
            
         }

    });    
    
  }