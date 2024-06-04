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
    constructor(id, titel, kurzbeschreibung, komplettbeschreibung, pfadZuProjektLogo, maintainer, startDatum, endDatum) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.komplettbeschreibung = komplettbeschreibung.substring(0, 255)
        this.pfadZuProjektLogo = pfadZuProjektLogo
        this.maintainer = maintainer
        this.startDatum = new Date(startDatum)
        this.enddatum = new Date(endDatum)
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


let option = {
    methods: "POST",
    mode: 'cors',
    headers: {
    'Access-Control-Allow-Origin':'*'
    }
}


async function loadJSON(url) {
    const response = await fetch(url, option)
    .catch(error=>{
        console.log(error);
    });
    return await response.json(); // Warten bis wir in den fullFill Zustand übergegangen sind
}


function createProjects(projects) {

    for (let i = 0; i < projects.length; i++) {
        allInfo.projekte.push(new Projekt(
            projects[i].id,
            projects[i].name,
            projects[i].shortdesc,
            projects[i].longdesc,
            projects[i].logourl,
            projects[i].maintainer,
            projects[i].start,
            projects[i].end))
    }

}


function createTasks(projects) {
    for (let i = 0; i < projects.length; i++) {
        allInfo.aufgabenbereiche.push(new Aufgabenbereich(
            projects[i].id,
            projects[i].name,
            projects[i].shortdesc,
            projects[i].project
        ))
    }
}


function createArtefacts(artefacts) {
    for (let i = 0; i < artefacts.length; i++) {
        let realTime = "0:00"
        if (artefacts[i].realtime) {
            realTime = artefacts[i].realtime;
        }
        allInfo.artefakte.push(new Artefakt(
            artefacts[i].id,
            artefacts[i].name,
            artefacts[i].shortdesc,
            artefacts[i].longdesc,
            artefacts[i].planedtime,
            realTime,
            artefacts[i].taskid))
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
        fetch('https://scl.fh-bielefeld.de/WBA/projectsAPI', {
            method: 'post',
            body: {
                Projekt: Projekt,
                Artefakt: Artefakt,
                aufgabenbereich: Aufgabenbereich
            }
        }).then(res =>{
            console.log("Objekt erfolgreich zum Server geschickt");
        }).catch(err => {
            // Projekt im Localstorage anlegen wenn Fehler ist 
            const localProj = {
                projekt: Projekt,
                artefakt: Artefakt,
                aufgabenbereich: Aufgabenbereich
            }
            localStorage.setItem("projekt", JSON.stringify( localProj ))
        })
    }
}

window.onload = addNewProject()

//addNewProject(new Projekt(0,"a","a","a","b","a","1.1.2024","1.2.2024"), new Artefakt(0,"a","a","a",0,20,11), new Aufgabenbereich(0,"a","a",0))




Promise.all([
    loadJSON('https://scl.fh-bielefeld.de/WBA/projects.json')
    .then(createProjects),
    loadJSON('https://scl.fh-bielefeld.de/WBA/tasks.json')
    .then(createTasks),
    loadJSON('https://scl.fh-bielefeld.de/WBA/artefacts.json')
    .then(createArtefacts)
])
    .then(() => {
        projectRef();
    })
    .catch(error => console.error('Error:', error));


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

    for (let i = 0; i < allInfo.projektAufgabenbereichData.length; i++) {
        console.log(allInfo.projektAufgabenbereichData[i]);
    }

    for (let i = 0; i < allInfo.projektArtefaktData.length; i++) {
        console.log(allInfo.projektArtefaktData[i]);
    }

}


projectRef();

