// Initialize the spreadsheet
const spreadsheet = document.getElementById('spreadsheet');
const rows = 20;
const cols = 10;

// Create the grid
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('contenteditable', 'true');
    cell.setAttribute('data-row', i);
    cell.setAttribute('data-col', j);
    spreadsheet.appendChild(cell);
  }
}

// Function to apply mathematical and data quality functions
function applyFunction(func) {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const values = cells.map(cell => {
    const value = cell.innerText.trim();
    return isNaN(value) || value === '' ? value : parseFloat(value);
  });

  let result;
  switch (func) {
    case 'SUM':
      result = values.filter(v => typeof v === 'number').reduce((a, b) => a + b, 0);
      break;
    case 'AVERAGE':
      const nums = values.filter(v => typeof v === 'number');
      result = nums.reduce((a, b) => a + b, 0) / nums.length;
      break;
    case 'MAX':
      result = Math.max(...values.filter(v => typeof v === 'number'));
      break;
    case 'MIN':
      result = Math.min(...values.filter(v => typeof v === 'number'));
      break;
    case 'COUNT':
      result = values.filter(v => typeof v === 'number').length;
      break;
    case 'TRIM':
      result = values.map(v => typeof v === 'string' ? v.trim() : v);
      break;
    case 'UPPER':
      result = values.map(v => typeof v === 'string' ? v.toUpperCase() : v);
      break;
    case 'LOWER':
      result = values.map(v => typeof v === 'string' ? v.toLowerCase() : v);
      break;
    default:
      result = 'Invalid function';
  }

  // Display the result in the first cell
  if (Array.isArray(result)) {
    cells.forEach((cell, index) => {
      cell.innerText = result[index] ?? '';
    });
  } else {
    cells[0].innerText = result;
  }
}

