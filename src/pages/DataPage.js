const api_url = "https://lego-hobby.ew.r.appspot.com/upload";

async function getapi(url) {
  const response = await fetch(url);

  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}

getapi(api_url);

function hideloader() {
  document.getElementById("loading").style.display = "none";
}

function show(data) {
  let tab = `<tr>
		<th>color</th>
		<th>type</th>
		<th>width</th>
		<th>length</th>
		</tr>`;

  // Loop
  for (let r of data.list) {
    tab += `<tr>
	<td>${r.color} </td>
	<td>${r.type}</td>
	<td>${r.width}</td>
	<td>${r.length}</td>		
</tr>`;
  }

  document.getElementById("product").innerHTML = tab;
}
