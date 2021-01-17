movies = () => {
  document.location = "/movies.html";
};

timings = () => {
  document.location = "/timing.html";
};

buy = () => {
  document.location = "/ticket.html";
};

handleSearch = async () => {
  let query = document.querySelector("#query").value;

  let res = await fetch(`http://localhost:3000/movie/search?q=${query}`);
  let json = await res.json();
  console.log(json.data);
};
