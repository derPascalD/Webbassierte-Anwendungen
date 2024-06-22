class Sortieren {
    constructor() { }

    sortFirstDate(projekte) {


        let sortable = [];
        for (let element of projekte) {
            sortable.push([element.id, element.startDatum]);
        }

        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });

        return sortable

    }

    sortProjectTime(projekte) {
        let alleZeiten = []
        for (let element of projekte) {
            alleZeiten.push([element.id, projektlaufzeit(element.id)])
        }
        alleZeiten.sort((a, b) => {
            return a[1] - b[1]
        })
        return alleZeiten
    }
}


class Projekt {
    constructor(id, titel, kurzbeschreibung, komplettbeschreibung, pfadZuProjektLogo, maintainer, startDatum, endDatum, projektZeit, max = 0, min = 0, span = 0) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.komplettbeschreibung = komplettbeschreibung.substring(0, 255)
        this.pfadZuProjektLogo = pfadZuProjektLogo
        this.maintainer = maintainer
        this.startDatum = new Date(startDatum)
        this.enddatum = new Date(endDatum)
        this.max = max;
        this.min = min;
        this.span = span;
        this.projektZeit = projektZeit;
    }

}

class Artefakt {

    constructor(id, titel, kurzbeschreibung, komplettbeschreibung, gepZeit, realTime, taskID) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.komplettbeschreibung = komplettbeschreibung.substring(0, 255)
        this.gepZeit = gepZeit
        this.realTime = realTime
        this.taskID = taskID
    }
}


class Aufgabenbereich {

    constructor(id, titel, kurzbeschreibung, projectID) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.projectID = projectID

    }
}


class ProjektArtefakt {

    constructor(idProjekt, idArtefakt, arbeitsaufwand) {
        this.idProjekt = idProjekt
        this.idArtefakt = idArtefakt
        this.arbeitsaufwand = arbeitsaufwand
    }
}


class ProjektAufgabenbereich {

    constructor(idProjekt, idAufgabenbereich) {
        this.idProjekt = idProjekt
        this.idAufgabenbereich = idAufgabenbereich
    }
}


let allInfo = {
    projekte: [],
    artefakte: [],
    aufgabenbereiche: [],
    projektArtefaktData: [],
    projektAufgabenbereichData: []
}


const projektlaufzeit = (projektID) => {
    let sum = 0
    for (let element of allInfo.projektArtefaktData) {
        if (element.idProjekt === projektID) {
            sum += element.arbeitsaufwand
        }
    }
    return sum
}

function addProjetDuration() {

    for (let i = 0; i < allInfo.projekte.length; i++) {

        let sum = projektlaufzeit(allInfo.projekte[i].id)
        allInfo.projekte[i].projektZeit = sum;

    }

}


async function loadJSON(url) {
    const response = await fetch(url)
        .catch(error => {
            console.log(error);
        });
    return await response.json(); // Warten bis wir in den fullFill Zustand übergegangen sind
}


function createProjects(result) {

    let projects = result.records;

    for (let i = 0; i < projects.length; i++) {
        allInfo.projekte.push(new Projekt(
            projects[i].id_projekt,
            projects[i].titel,
            projects[i].kurzbeschreibung,
            projects[i].komplettbeschreibung,
            projects[i].pfadzulogo,
            projects[i].maintainer,
            projects[i].startdatum,
            projects[i].enddatum))
    }

}


function createTasks(result) {

    let tasks = result.records;

    for (let i = 0; i < tasks.length; i++) {
        allInfo.aufgabenbereiche.push(new Aufgabenbereich(
            tasks[i].id_task,
            tasks[i].titel,
            tasks[i].kurzbeschreibung,
            tasks[i].id_projekt
        ))
    }
}


function createArtefacts(result) {

    let artefacts = result.records;


    for (let i = 0; i < artefacts.length; i++) {
        let realTime = "0:00"
        if (artefacts[i].realtime) {
            realTime = artefacts[i].realtime;
        }
        allInfo.artefakte.push(new Artefakt(
            artefacts[i].id_artefakt,
            artefacts[i].titel,
            artefacts[i].kurzbeschreibung,
            artefacts[i].komplettbeschreibung,
            artefacts[i].geplantezeit,
            artefacts[i].realtime,
            artefacts[i].id_task))
    }

}


function addNewProject(Projekt, Artefakt, Aufgabenbereich) {
    if (localStorage.getItem("projekt")) {
        console.log("Projekt geladen");
        const proj = JSON.parse(localStorage.getItem("projekt"))
        localStorage.removeItem("projekt")
        addNewProject(proj.projekt, proj.artefakt, proj.aufgabenbereich)
    } else {
        console.log("Projekt neu");
        fetch('projects.json').then(res => { // https://scl.fh-bielefeld.de/WBA/projectsAPI Da kommt 404 Fehler
            console.log("Objekt erfolgreich zum Server geschickt");
        }).catch(err => {
            // Projekt im Localstorage anlegen wenn Fehler ist 
            const localProj = {
                projekt: Projekt,
                artefakt: Artefakt,
                aufgabenbereich: Aufgabenbereich
            }
            localStorage.setItem("projekt", JSON.stringify(localProj))
        })
    }
}

function responseMinMaxSpan(result) {


    allInfo.projekte.forEach(element => {

        element.min = result.min;
        element.max = result.max;
        element.span = result.span;
    });
}


/*

if (localStorage.getItem("projekt")) {
    addNewProject()
    console.log("NICHT LEER")
} else {
    console.log("LEER")
    addNewProject(new Projekt(0, "a", "a", "a", "b", "a", "1.1.2024", "1.2.2024"), new Artefakt(0, "a", "a", "a", 0, 20, 11), new Aufgabenbereich(0, "a", "a", 0))
}

*/


Promise.all([
    loadJSON('http://localhost:8080/SmartData/smartdata/records/projekt').then(createProjects),
    loadJSON('http://localhost:8080/SmartData/smartdata/records/task').then(createTasks),
    loadJSON('http://localhost:8080/SmartData/smartdata/records/artefakt').then(createArtefacts),

])
    .then(() => {
        loadJSON('http://localhost:8080/SmartDataLyserWBA/smartdatalyser/statistic/minmaxspan?smartdataurl=http://localhost:8080/SmartData&collection=artefakt&storage=public&column=realtime').then(responseMinMaxSpan)
    }

    )
    .then(() => {
        projectRef();
        addProjetDuration();
        printProjects();
    })
    .catch(error => console.error('Error:', error));


function printProjects() {
    console.log("Projekte");
    for (let i = 0; i < allInfo.projekte.length; i++) {
        console.log(allInfo.projekte[i]);
    }
}


function printAllDatas() {

    console.log("Projekte");
    for (let i = 0; i < allInfo.projekte.length; i++) {
        console.log(allInfo.projekte[i]);
    }

    console.log("Artefakte");
    for (let i = 0; i < allInfo.artefakte.length; i++) {
        console.log(allInfo.artefakte[i]);
    }

    console.log("Aufgabenbereiche");
    for (let i = 0; i < allInfo.aufgabenbereiche.length; i++) {
        console.log(allInfo.aufgabenbereiche[i]);
    }


    console.log("Projekt : Aufgabenbereich");
    for (let i = 0; i < allInfo.projektAufgabenbereichData.length; i++) {
        console.log(allInfo.projektAufgabenbereichData[i]);
    }

    console.log("Projekt : Artefakt");
    for (let i = 0; i < allInfo.projektArtefaktData.length; i++) {
        console.log(allInfo.projektArtefaktData[i]);
    }

}



function projectRef() {


    for (let i = 0; i < allInfo.projekte.length; i++) {
        for (let j = 0; j < allInfo.aufgabenbereiche.length; j++) {
            if (allInfo.projekte[i].id == allInfo.aufgabenbereiche[j].projectID) {
                allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[i].id, allInfo.aufgabenbereiche[j].id))
            }

        }
    }



    for (let i = 0; i < allInfo.artefakte.length; i++) {
        for (let j = 0; j < allInfo.projektAufgabenbereichData.length; j++) {
            if (allInfo.artefakte[i].taskID === allInfo.projektAufgabenbereichData[j].idAufgabenbereich) {
                allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projektAufgabenbereichData[j].idProjekt, allInfo.artefakte[i].id, allInfo.artefakte[i].realTime))
            }

        }
    }

}


/* 404 Fehler
function addNewProject(Projekt, Artefakt, Aufgabenbereich) {
    const localProj = {
        projekt: Projekt,
        artefakt: Artefakt,
        aufgabenbereich: Aufgabenbereich
    }
    if (localStorage.getItem("projekt")) {
        console.log("Projekt geladen");
        const proj = JSON.parse(localStorage.getItem("projekt"))
        localStorage.removeItem("projekt")
        addNewProject(proj.projekt, proj.artefakt, proj.aufgabenbereich)
    } else {
        console.log("Projekt neu");
        fetch('https://scl.fh-bielefeld.de/WBA/projectsAPI', {
            method: "POST",
            body: JSON.stringify(localProj)
        }).then(res => {
            console.log("Objekt erfolgreich zum Server geschickt");
        }).catch(err => {
            // Projekt im Localstorage anlegen wenn Fehler ist 
            localStorage.setItem("projekt", JSON.stringify(localProj))
        })
    }
}
*/




