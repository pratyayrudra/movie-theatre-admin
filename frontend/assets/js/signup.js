handleSignup = async () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let res = await fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  let json = await res.json();
  if (!json.success) {
    console.log(json.message);
  } else {
    document.location = "/home.html";
  }
};
