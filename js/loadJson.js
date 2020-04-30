function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../db.json", true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function loadInfos(projects) {
  for (let i = 0; i < projects.length; i++) {
    const element = projects[i];

    var projectsDiv = document.getElementById("projectsJson");
    let title_1 = element.title_1.replace(/ /g, "").toLowerCase();
    let linkTitle = document.createElement("a");
    linkTitle.className = "title";
    linkTitle.setAttribute("id", title_1);
    linkTitle.setAttribute("rel", "tooltip");
    linkTitle.setAttribute("title", "Clique para acessar o repositorio");
    linkTitle.setAttribute("target", "_blank");
    linkTitle.setAttribute("href", element.url_github);

    let title = document.createElement("h2");
    title.className = "title";
    title.innerHTML = element.title_2;

    linkTitle.appendChild(title);

    let description = document.createElement("p");
    description.className = "description";
    description.style.fontSize = 14;
    description.style.marginTop = -3;
    description.innerText = `Desenvolvido - ${element.date}`;

    let descriptionInfo = document.createElement("h5");
    descriptionInfo.className = "description";
    descriptionInfo.innerHTML = element.description;

    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.setAttribute("onclick", `loadReadme('${title_1}')`);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModalCenter");
    button.innerText = "Detalhes";

    projectsDiv.appendChild(description).append(descriptionInfo);
    description.prepend(linkTitle);
    descriptionInfo.append(button);
  }

  var h1 = document.querySelector("#count");
  h1.innerHTML = `Total de projetos ${projects.length}`;
}

function loadTitle(projects) {
  var titles = projects.map((p) => p.title_1);

  var div = document.getElementById("loadJsonHeader");

  for (let i = 0; i < titles.length; i++) {
    const element = titles[i];

    let dropdown = document.createElement("a");
    dropdown.className = "dropdown-item";
    dropdown.setAttribute(
      "href",
      `../pages/projects.html#${element.replace(/ /g, "").toLowerCase()}`
    );
    dropdown.innerHTML = element;

    let dropdownMenu = document.getElementById("dropdown-menu");

    dropdownMenu.insertBefore(dropdown, div);
  }
}
