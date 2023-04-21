// Define function to remove rows and columns with '*' values
function starOutGrid(grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const rowsToStar = new Set();
  const colsToStar = new Set();

  // Iterate through the grid to find rows and columns to star
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === "*") {
        rowsToStar.add(i);
        colsToStar.add(j);
      }
    }
  }

  // Create a new grid with the stars removed
  const newGrid = [];
  for (let i = 0; i < numRows; i++) {
    const newRow = [];
    for (let j = 0; j < numCols; j++) {
      if (rowsToStar.has(i) || colsToStar.has(j)) {
        newRow.push("*");
      } else {
        newRow.push(grid[i][j]);
      }
    }
    newGrid.push(newRow);
  }

  return newGrid;
}

// Define function to generate a grid form
function generateGridForm() {
  const table = document.createElement("table");
  table.className = "output-grid";

  const form = document.getElementById("grid-form");
  const sizeInput = document.getElementById("grid-size-input");
  let size = parseInt(sizeInput.value, 10);

  // Check if size is within range
  if (size < 2 || size > 10) {
    alert("Please enter a size between 2 and 10.");
    size = 2; // Set default size to 2
  }

  // Clear any previous form inputs
  form.innerHTML = "";

  // Create inputs for each cell in the grid
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "grid-row";
    for (let j = 0; j < size; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.className = "grid-cell";
      row.appendChild(input);
    }
    form.appendChild(row);
  }

  // Replace any previous table with the new one
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  outputDiv.appendChild(table);
}

// Define function to handle form submission
function onSubmit() {
  const form = document.getElementById("grid-form");
  const inputs = form.querySelectorAll(".grid-cell");
  const size = Math.sqrt(inputs.length);
  const grid = [];

  // Construct two-dimensional grid from input values
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(inputs[(i * size) + j].value);
    }
    grid.push(row);
  }

  // Modify the existing grid by removing rows and columns with '*' values
  const modifiedGrid = starOutGrid(grid);

  // Update the input values with the modified values
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      inputs[(i * size) + j].value = modifiedGrid[i][j];
    }
  }
}

// Add event listeners to generate grid and submit buttons
const generateGridBtn = document.getElementById("generate-grid-btn");
const submitBtn = document.getElementById("submit-btn");

generateGridBtn.addEventListener("click", generateGridForm);
submitBtn.addEventListener("click", onSubmit); 