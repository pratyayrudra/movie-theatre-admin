// getMovies = ()=>{

// }

handleSubmit = async () => {
  let timing = document.querySelector("#timing").value;
  let price = document.querySelector("#price").value;
  let total_tickets = document.querySelector("#total").value;
  let movieID = document.querySelector("#movieID").value;

  let timingBody = {
    timing,
    price,
    total_tickets,
    movieID,
  };
  console.log(timingBody);

  let res = await fetch("http://localhost:3000/movie/timing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timingBody),
  });
  let json = await res.json();
  if (!json.success) {
    console.log(json.message);
  } else {
    document.location = "/home.html";
  }
};
