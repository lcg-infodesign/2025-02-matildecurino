// let table;

// function preload() {
//   // put preload code here
//   table = loadTable("dataset.csv", "csv", "header");
// }

// function setup() {
//   // controllo se ho caricato i dati 
//   console.log(table);

//   // capire la grandezza della canva 
//   let outerPadding = 20;
//   let padding = 10;
//   let itemSize = 30;
//   // calcolo il numero di colonne
//   // arrotondo il numero di colonne per difetto --> funzione floor
//   let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  

//   // calcolo il numero di righe 
//   // arrotondo il numero di righe per eccesso --> funzione ceil
//   let rows = ceil(getRowCount() / cols);
  

//   let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

//   // creo il canvas
//   createCanvas(windowWidth, totalHeight);

//   background("coral");

//   console.log("cols:", cols);
//   console.log("righe:", rows);

//   let colCount = 0;
//   for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++); {
//     // console.log("riga numero:", rowNumber);

//     // carica i dati dalla tabella 
//     let data = table.getRow(rowNumber);
//     console.log(data);

//     let xPos = outerPadding + colCount * itemSize; 
     
//     rect(xPos, 50, itemSize, itemSize);
//     // aumento colcount
//     colCount++
//   }
// }



// function draw() {
//   // put drawing code here
// }

let table;

function preload() {
  // put preload code here
  table = loadTable("dataset.csv","csv","header");
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table); //stampa sulla console cosa c'è nella variabile table

  //larghezza dello sketch uguale a quella della finestra
  // decido un ingombro (larghezza, gap, quanti in una riga...)
  // quando so il numero di righe posso sapere l'altezza dello sketch 

  let outerPadding = 20; // padding esterno
  let padding = 10; // padding tra gli elementi
  let itemSize = 30; // dimensione degli elementi

  //calcolo il numero delle colone  // colonne = larghezza - 2 * padding esterno/ item + padding interno
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding)); // arrotondo per difetto --> meglio una colonna in meno che una che sborda

  let rows = ceil(table.getRowCount() / cols); //numero di righe / il numero di colonne

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

  //creo il canvas
  createCanvas(windowWidth, totalHeight); //larghezza finestra, altezza calcolata

  background("coral");

  console.log("cols: ", cols, "rows: ", rows);

  let colCount = 0;
  let rowCount = 0; 

  //per leggere ogni riga
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    //per ogni riga carico i dati dalla tabella
    let data = table.getRow(rowNumber).obj;
    console.log(data);

    // prendo valore per dimensione 
    let myValueCol0= data['column0'];

    // devo creare una funzione di scala 
    // calcolo il valore massimo e minimo
    let allValuesCol0 = table.getColumn("column0");
    let minValueCol0 = min(allValuesCol0);
    let maxValueCol0 = max(allValuesCol0);
    let scaledValueCol0 = map(myValueCol0, minValueCol0, maxValueCol0, 1, itemSize);

    // seconda variabile per il colore 
    let myValueCol2 = data['column2'];
    let allValuesCol2 = table.getColumn("column2");
    let minValueCol2 = min(allValuesCol2);
    let maxValueCol2 = max(allValuesCol2);

    //due colori
    let colorOne = color("yellow");
    let colorTwo = color("blue");
    let value2Mapped = map(myValueCol2, minValueCol2, maxValueCol2, 0, 1);

    //risultato del mapping
    let mappedColor = lerpColor(colorOne, colorTwo, value2Mapped);
    fill(mappedColor);

    //posizione x
    let xPos = outerPadding + colCount * (itemSize+padding);
    let yPos = outerPadding + rowCount * (itemSize+padding);

    ellipse(xPos, yPos, scaledValueCol0, scaledValueCol0); // x, y, largh., altez.


    //ad ogni ciclo aumento colCount
    colCount++; 

    //controllo se siamo a fine riga
    if(colCount == cols) {
      colCount = 0; 
      rowCount++; 
    }
  }
}


function draw() {
  // put drawing code here
}