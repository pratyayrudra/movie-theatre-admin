handleSubmit = async () => {
  let name = document.querySelector("#name").value;
  let director = document.querySelector("#director").value;
  let duration = document.querySelector("#duration").value;
  let description = document.querySelector("#description").value;

  let movieBody = {
    name,
    director,
    duration,
    description,
  };

  let res = await fetch("http://localhost:3000/movie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieBody),
  });
  let json = await res.json();
  if (!json.success) {
    console.log(json.message);
  } else {
    document.location = "/home.html";
  }
};
