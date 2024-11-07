const fs = require('fs');
let lin = [];
let arr = [];
let counter = 0 ;
let min = 1000;
let max  = 0 ;
fs.readFile('data.txt', 'utf8', async (err, data) => { 
    if (err) throw err;

    lin = JSON.parse(data);  // Parse the content of the file
    console.log(`Loaded ${lin.length} links from the file`);

    // Loop through the links after they have been loaded
    console.log("Name, cena, rabljeno/novo, registracija_leto, registracija_mesec, proizvodnja, tehnicni_leto, tehnicni_mesec, motor, gorivo, menjalnik, oblika, st.vrat, barva, notranjost")
    for (const link of lin) {
    counter  = 0 ;
    
 
    console.log(`Obdelujem : ${link[link.length-1]}`);
    starost = link[0].toString().split(",");
    
    reg = link[1].toString().split(",");
    
    reg_param = reg.toString().split("/");

    console.log(starost[1] + "," + reg_param[0] + "," + reg_param[1] );
        var map = new Map();
        for(let i = 0 ; i < link.length ; i++){

            
            temp = link[i].toString().split(",");
            if(temp[0].toString() == "VIN/številka šasije:" || temp[0].toString() == "Interna številka:" ||temp[0].toString() ==  "Tehnični pregled velja do:"  ||temp[0].toString() ==  "Leto proizvodnje:")
                continue;
            else
                counter++;
            map.set(temp[0].toString(), temp[1].toString());
            
            

        }
        //console.log(map);
        arr.push(map);

        //console.log(counter);

     
//VIN/številka šasije: 
//Interna številka:
    }
    let header = "Naziv,cena,kraj_ogleda,barva,notranjost,st.vrat,oblika,menjalnik,gorivo,novo/rabljeno,prevozeni_km,leto_1.reg,mesec_1.reg,mocKW,mocKM";
    fs.appendFile('csv.csv', header + "\n", function (err) {
        if (err) throw err;
        
       });
    console.log(counter + "\n");
    console.log(arr.length);
    for(x in arr){
        let moc = arr[x].get("Motor:").split("(");
        let mockm = moc[1].split(")");
        let kraj = arr[x].get("Kraj ogleda:").split(" ");
        let leto = arr[x].get("Prva registracija:").split("/");
        console.log(arr[x]);
        let xx = arr[x].get("name:") + "," + arr[x].get("cena:") + "," 
        + arr[x].get("Kraj ogleda:") + "," + arr[x].get("Barva:") + "," +  arr[x].get("Notranjost:").toString() + "," + arr[x].get("Št.vrat:") + "," 
        + arr[x].get("Oblika:") + "," + arr[x].get("Menjalnik:") 
            + "," + arr[x].get("Gorivo:") + "," + arr[x].get("Starost:") + "," + arr[x].get("Prevoženi km:") + "," +
            leto[0]+ "," + leto[1] + "," + moc[0] + "," + mockm[0];
        console.log(xx );

        fs.appendFile('csv.csv', xx + "\n", function (err) {
                if (err) throw err;
                
               });
//break;
    }
});
