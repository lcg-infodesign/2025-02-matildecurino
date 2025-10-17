//layout 
let table; 
let outerPadding = 20;
let padding = 10; 
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
let colorOne;
let colorTwo;

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
  colorOne = color("pink");
  colorTwo = color("green");

  rectMode(CENTER);
  angleMode(DEGREES);

}

function draw() {
  background(25);

  let colCount = 0;
  let rowCount = 0;

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    let data = table.getRow(rowNumber).obj;

    let myValueCol0 = data["column0"];
    let mappedValuesCol0 = map(myValueCol0, minValueCol0, maxValueCol0, 1, itemSize);

    let myValueCol1 = data["column1"];
    let mappedStroke = map(myValueCol1, minValueCol1, maxValueCol1, 0, 4);

    let myValueCol2 = data["column2"];
    let colorMapped = map(myValueCol2, minValueCol2, maxValueCol2, 0, 1);
    let mappedColor = lerpColor(colorOne, colorTwo, colorMapped);

    let myValueCol3 = data["column3"];
    let mappedRotation = map(myValueCol3, minValueCol3, maxValueCol3, 0, 360);

    let myValueCol4 = data["column4"];
    let scaledValueCol4 = map(myValueCol4, minValueCol4, maxValueCol4, 0, 1);

    noFill();
    strokeWeight(mappedStroke);
    stroke(mappedColor);
    
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    push();
    translate(xPos, yPos);
    rotate(mappedRotation);
    rect(0, 0, mappedValuesCol0, mappedValuesCol0);
    pop();

    colCount++;
    if (colCount == cols) {
      colCount = 0; 
      rowCount++;
    }
  }
}
