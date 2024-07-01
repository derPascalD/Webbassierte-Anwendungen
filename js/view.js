const projektlaufzeit = (projektID) => {
    let sum = 0
    for (let task of taskListe) {
        for (let artefakt of artefaktListe) {
            if (projektID == task.id_projekt && task.id_task == artefakt.id_task) {
                sum += artefakt.realtime
            }
        }
    }
    return sum
}

function projektHinzufuegen(projekt) {
    let liste = document.getElementById('projekt-liste')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let pTitel = document.createElement('p')
    pTitel.classList = "projektTitel"
    pTitel.innerText = "Projektname: " + projekt.titel

    let pZeit = document.createElement('p')
    pZeit.innerText = "Zeitaufwand: " + projektlaufzeit(projekt.id_projekt) + " h"

    let pErstell = document.createElement('p')
    pErstell.innerText = "Erstelldatum: " + projekt.startdatum

    let pKurz = document.createElement('p')
    pKurz.classList = "kurzbeschreibung"
    pKurz.innerText = "Kurzbeschreibung: " + projekt.kurzbeschreibung

    let pRef = document.createElement('a')
    pRef.innerText = projekt.titel
    pRef.href = "projekt.html?id=" + projekt.id_projekt

    li.appendChild(pTitel)
    li.appendChild(pZeit)
    li.appendChild(pErstell)
    li.appendChild(pKurz)
    li.appendChild(pRef)
    ul.appendChild(li)
    liste.appendChild(ul)
}

var projektListe = []
var taskListe = []
var artefaktListe = []

async function loadJSON(url) {
    const response = await fetch(url)
        .catch(error => {
            console.log(error);
        });
    return await response.json();
}


function createProjects(data) {
    for (let element of data.records) {
        projektListe.push(element)
    }
}

function createTasks(data) {
    for (let element of data.records) {
        taskListe.push(element)
    }
}

function createArtefacts(data) {
    for (let element of data.records) {
        artefaktListe.push(element)
    }
}



window.onload = async () => {
    Promise.all([
        loadJSON('http://localhost:8080/SmartData/smartdata/records/projekt').then((data) => { createProjects(data) }),
        loadJSON('http://localhost:8080/SmartData/smartdata/records/task').then((data) => { createTasks(data) }),
        loadJSON('http://localhost:8080/SmartData/smartdata/records/artefakt').then((data) => { createArtefacts(data) }),

    ])
        .then(() => {
            for (let element of projektListe) {
                projektHinzufuegen(element)
            }

        })
        .catch(error => console.error('Error:', error));
}


function clearListe() {
    let liste = document.getElementById('projekt-liste')
    liste.innerHTML = ''
}

function sortAfterTime() {
    projektListe.sort((a, b) => {
        return a.projektlaufzeit-b.projektlaufzeit
    })
    clearListe()
    projektHinzufuegen(projektListe)
}


function sortAfterDatum() {
    projektListe.sort((a, b) => {
        return a.startdatum-b.startdatum
    })
    clearListe()
    projektHinzufuegen(projektListe)
}