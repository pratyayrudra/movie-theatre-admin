const url = "http://localhost:3000";

checkAdmin = async () => {
  let res = await fetch(`${url}/user`);
  let json = await res.json();
  if (json.success) {
    document.location = "/login.html";
  } else {
    document.location = "/signup.html";
  }
};

checkAdmin();
