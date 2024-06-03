
async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}




loadJSON('https://scl.fh-bielefeld.de/WBA/projects.json').then(data => {
    console.log("Projektdaten")
    console.log(data);
});

loadJSON('https://scl.fh-bielefeld.de/WBA/tasks.json').then(data => {
    console.log("Aufgabenbereiche")
    console.log(data);
});

loadJSON('https://scl.fh-bielefeld.de/WBA/artefacts.json').then(data => {
    console.log("Artekfate")
    console.log(data);
});