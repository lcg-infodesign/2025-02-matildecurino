//layout 
let table; 
let outerPadding = 70;
let padding = 5; 
let itemSize = 30;
let cols;
let rows;
let totalHeight;

//scala 
let minValueCol0;
let maxValueCol0;
let minValueCol1;
let maxValueCol1;
let minValueCol2;
let maxValueCol2;
let minValueCol3; 
let maxValueCol3;
let minValueCol4;
let maxValueCol4;

//colori 
let verdeFluo;
let fucsiaFluo;
let verdeFluoTrasparente;
let fucsiaFluoTrasparente;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  //calcolo cols and rows
  cols = floor((windowWidth - outerPadding *2) / (itemSize + padding));
  rows = ceil(table.getRowCount() / cols);
  totalHeight = outerPadding * 2 + rows * itemSize + (rows -1)* padding; 

  createCanvas(windowWidth, totalHeight);

  //min and max values
  let allValuesCol0 = table.getColumn("column0");
  minValueCol0 = min(allValuesCol0);
  maxValueCol0 = max(allValuesCol0);

  let allValuesCol1 = table.getColumn("column1");
  minValueCol1 = min(allValuesCol1);
  maxValueCol1 = max(allValuesCol1);

  let allValuesCol2 = table.getColumn("column2");
  minValueCol2 = min(allValuesCol2);
  maxValueCol2 = max(allValuesCol2);

  let allValuesCol3 = table.getColumn("column3");
  minValueCol3 = min(allValuesCol3);
  maxValueCol3 = max(allValuesCol3);

  let allValuesCol4 = table.getColumn("column4");
  minValueCol4 = min(allValuesCol4);
  maxValueCol4 = max(allValuesCol4);

  //colori 
  verdeFluo = color(57, 255, 20);
  fucsiaFluo = color(255, 20, 147);
  verdeFluoTrasparente = color(57, 255, 20, 60);
  fucsiaFluoTrasparente = color(255, 20, 147, 60);
  
  rectMode(CENTER);
  angleMode(DEGREES);

}

function draw() {
  background(0);

  let colCount = 0;
  let rowCount = 0;

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    let data = table.getRow(rowNumber).obj;

    let myValueCol0 = data["column0"];
    let mappedValuesCol0 = map(myValueCol0, minValueCol0, maxValueCol0, 1, itemSize);

    let myValueCol1 = data["column1"];
    let mappedStrokeCol1 = map(myValueCol1, minValueCol1, maxValueCol1, 0, 4);
    let mappedReverseStrokeCol2 = map(myValueCol1, maxValueCol1, minValueCol1, 0, 4);

    let myValueCol2 = data["column2"];
    let colorMapped = map(myValueCol2, minValueCol2, maxValueCol2, 0, 1);
    let mappedColorCol2 = lerpColor(verdeFluo, fucsiaFluo, colorMapped);
    let shadowColorMappedCol2 = map(myValueCol2, minValueCol2, maxValueCol2, 0, 1);
    let mappedShadowColorCol2 = lerpColor(verdeFluoTrasparente, fucsiaFluoTrasparente, shadowColorMappedCol2);
    let mappedStrokeCol2 = map(myValueCol2, minValueCol2, maxValueCol2, 0, 6);

    let myValueCol3 = data["column3"];
    let mappedRotationCol3 = map(myValueCol3, minValueCol3, maxValueCol3, 0, 360);
    let mappedReverseRotationCol3 = map(myValueCol3, maxValueCol3, minValueCol3, 0, 360);
    let mappedValuesCol3 = map(myValueCol3, minValueCol3, maxValueCol3, 0, itemSize);

    let myValueCol4 = data["column4"];
    let mappedValuesCol4 = map(myValueCol4, minValueCol4, maxValueCol4, 0, itemSize);
    let mappedRotationCol4 = map(myValueCol4, minValueCol4, maxValueCol4, 0, 360);
    let mappedReverseRotationCol4 = map(myValueCol4, minValueCol4, maxValueCol4, 360, 0);

    noFill();  
    
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    //quadrati fluo
    push();
    strokeWeight(mappedStrokeCol1);
    stroke(mappedColorCol2);
    translate(xPos, yPos);
    rotate(mappedRotationCol3);
    rect(0, 0, mappedValuesCol0, mappedValuesCol0);
    pop();

    //rettangoli fluo trasparenti
    push();
    strokeWeight(mappedReverseStrokeCol2);
    stroke(mappedShadowColorCol2);
    translate(xPos, yPos);
    rotate(mappedRotationCol3);
    rect(0, 0, mappedValuesCol4+20, mappedValuesCol4);
    pop();

    //archi fluo 
    push();
    strokeWeight(mappedReverseStrokeCol2);
    stroke(mappedColorCol2);
    translate(xPos, yPos);
    arc(0, 0, mappedValuesCol4, mappedValuesCol4, mappedReverseRotationCol3, mappedRotationCol3);
    pop();

    //archi fluo trasparenti
    push();
    strokeWeight(mappedStrokeCol2);
    stroke(mappedShadowColorCol2);
    translate(xPos, yPos);
    arc(0, 0, mappedValuesCol3, mappedValuesCol3, mappedRotationCol4, mappedReverseRotationCol4);
    pop();

    colCount++;
    if (colCount == cols) {
      colCount = 0; 
      rowCount++;
    }
  }
}
