function processForm(evt) {
  evt.preventDefault();
  
  const name = $("#name").val();
  const email = $("#email").val();
  const year = $("#year").val();
  const color = $("#color").val();

  if (!name) {
    $("#name-err").text("Birth year is required");
    return;
  }

  if (!year) {
    $("#year-err").text("Birth year is required");
    return;
  }

  if (!email) {
    $("#email-err").text("Email is required");
    return;
  }

  if (!color || !["red", "orange", "green", "blue"].includes(color)) {
    $("#color-err").text("Please select a valid color (red, orange, green, or blue)");
    return;
  }

  const data = { name, email, year, color };

  axios.post('/api/get-lucky-num', data)
    .then(function (response) { 
      handleResponse(response.data);
    })
    .catch(function (error) {
      const { response } = error;
      if (response && response.data) {
        const { errors } = response.data;
        for (const field in errors) {
          const errEl = $(`#${field}-err`);
          errEl.text(errors[field]);
        }
      }
    });
}

function handleResponse(resp) {
  const { fact } = resp;
  const numFact = fact.num.fact;
  const yearFact = fact.year.fact;
  const luckyNum = fact.num.num;
  const result = `Your lucky number is ${luckyNum} (${numFact}). Your birth year (${resp.year}) fact is ${yearFact}.`;
  $("#lucky-results").text(result);
} 

$("#lucky-form").on("submit", processForm);

 