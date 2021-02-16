const API_KEY = "$2b$10$27md03GcHwr8lZA3RWWylugyaJawIZEQ0qlbU.3Lo3GsA8jJw7.u6"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const URL = "https://api.jsonbin.io/v3/b/602a88fff460fe73a196fc5d";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  const init = {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  };
  const request = new Request(URL + "/latest", init);
  let data = await fetch(request);
  data = await data.json();
  return data.record[key];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  const dataObj = {};
  dataObj[key] = data;
  const init = {
    method: "PUT",
    headers: {
      "X-Master-Key": API_KEY,
      "Content-Type": "application/json",
      "X-Bin-Versioning": false,
    },
    body: JSON.stringify(dataObj),
  };
  const request = new Request(URL, init);
  let response = await fetch(request);
  console.log(response);
  return response.ok;
}
