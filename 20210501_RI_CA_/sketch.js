let w;
let columns;
let rows;
let board;
let next;
let tri;


function setup() {
  createCanvas(1920, 960);

  w = 50;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);

  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();


  //Pic
  imgPicSlider = createSlider(1, 10, 2, 1);
  imgPicSlider.position(10, 10);
  imgPicSlider.style('width', '100px');

  //Size
  imgSizeSlider = createSlider(1, 5, 3, 1);
  imgSizeSlider.position(10, 30);
  imgSizeSlider.style('width', '100px');

}

function draw() {
  background(255, 100);
  frameRate(15);


  //Tri
  if (imgPicSlider.value() > 9) {
    tri = 200;
  } else if (imgPicSlider.value() > 8) {
    tri = 175;
  } else if (imgPicSlider.value() > 7) {
    tri = 150;
  } else if (imgPicSlider.value() > 6) {
    tri = 125;
  } else if (imgPicSlider.value() > 5) {
    tri = 100;
  } else if (imgPicSlider.value() > 4) {
    tri = 75;
  } else if (imgPicSlider.value() > 3) {
    tri = 50;
  } else if (imgPicSlider.value() > 2) {
   tri = 25;
  } else if (imgPicSlider.value() > 1) {
    tri = 15;
  } else {
    tri = 10;
  }
  //Slider
  if (imgSizeSlider.value() > 4) {
    maxSize = 200;
  } else if (imgSizeSlider.value() > 3) {
    maxSize = 150;
  } else if (imgSizeSlider.value() > 2) {
    maxSize = 100;
  } else if (imgSizeSlider.value() > 1) {
    maxSize = 50;
  } else {
    maxSize = 25;
  }

  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      


      rw = random(-maxSize/2, maxSize);
      rh = random(-maxSize/2, maxSize/2);
      if ((board[i][j] == 1)) {

        noFill();
        stroke(220);

beginShape();
vertex((i * w) - tri, (j * w));
vertex((i * w) + tri, (j * w));
vertex((i * w), (j * w)-tri*1.5);
endShape(CLOSE);
        
        
         //RED
        stroke(255,0,0,100);
        circle((i * w) - tri, (j * w), rh/2);
        stroke(150);
        line((i * w) - tri, (j * w), (i * w)-tri - rw, (j * w) + rh);
        noStroke();
        fill(50);
        n = int(rw);
        text(n, (i * w)- tri - rw, (j * w) + rh);
        noFill();

        //GREEN
        stroke(0,255,0,100);
        circle((i * w) + tri, (j * w), rh/2);
        stroke(150);
        line((i * w) + tri, (j * w), (i * w)+ tri + rw, (j * w) + rh);
        noStroke();
        fill(50);
        n = int(rw);
        text(n, (i * w)+ tri + rw, (j * w) + rh);
        noFill();
        
         //BLUE
        stroke(0,0,255,100);
        circle((i * w), (j * w)- (tri*1.5), rh/2);
        stroke(150);
        line((i * w), (j * w)-(tri*1.5), (i * w) + rw, (j * w) -(tri*1.5) + rh);
        noStroke();
        fill(50);
        n = int(rw);
        text(n, (i * w) + rw, (j * w) -(tri*1.5) + rh);
        noFill();
      }

    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if ((board[x][y] == 1) && (neighbors < 2)) next[x][y] = 0; // Loneliness
      else if ((board[x][y] == 1) && (neighbors > 3)) next[x][y] = 0; // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1; // Reproduction
      else next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}


function keyPressed() {
  save("AZ_CA.png");
  return false;
}