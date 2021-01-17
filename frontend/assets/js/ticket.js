handleSubmit = async () => {
  let movieID = document.querySelector("#movieID").value;
  let timingID = document.querySelector("#timingID").value;
  let qty = document.querySelector("#qty").value;

  let ticketBody = {
    movieID,
    timingID,
    qty,
  };

  let res = await fetch("http://localhost:3000/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketBody),
  });
  let json = await res.json();
  if (!json.success) {
    console.log(json.message);
  } else {
    document.location = "/home.html";
  }
};
