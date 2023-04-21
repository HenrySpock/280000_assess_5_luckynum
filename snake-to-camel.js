function snakeToCamel(str) {
    return str.replace(/_([a-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }

const form = document.getElementById('snakeToCamelForm');
const input = document.getElementById('snakeCaseInput');
const output = document.getElementById('camelCaseOutput');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const snakeCaseString = input.value;
  const camelCaseString = snakeToCamel(snakeCaseString);
  const outputText = document.createTextNode(camelCaseString);
  output.appendChild(outputText);
;})