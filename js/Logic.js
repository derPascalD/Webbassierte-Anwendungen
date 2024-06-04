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
/*
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

    constructor(id, titel, kurzbeschreibung, komplettbeschreibung, aufgabenbereich, gepZeit, realTime) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.komplettbeschreibung = komplettbeschreibung.substring(0, 255)
        this.objBereich = aufgabenbereich
        this.gepZeit = gepZeit
        this.realTime = realTime
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
*/


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



async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
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
    for (let i = 0; i < allInfo.projekte.length; i++) {
        console.log(allInfo.projekte[i]);
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
    for (let i = 0; i < allInfo.aufgabenbereiche.length; i++) {
        console.log(allInfo.aufgabenbereiche[i]);
    }
}


function createArtefacts(projects) {
    for (let i = 0; i < projects.length; i++) {
        allInfo.artefakte.push(new Artefakt(
            projects[i].id,
            projects[i].name,
            projects[i].shortdesc,
            projects[i].longdesc,
            projects[i].planedtime,
            projects[i].realtime,
            projects[i].taskid))
    }
    for (let i = 0; i < allInfo.artefakte.length; i++) {
        console.log(allInfo.artefakte[i]);
    }
}

/*
loadJSON('https://scl.fh-bielefeld.de/WBA/projects.json').then(data => {
    createProjects(data);
});


loadJSON('https://scl.fh-bielefeld.de/WBA/tasks.json').then(data => {
    createTasks(data);
});

loadJSON('https://scl.fh-bielefeld.de/WBA/artefacts.json').then(data => {
    createArtefacts(data);
});
*/
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

/*


allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[0].id, allInfo.artefakte[0].id, 9))
allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[0].id, allInfo.artefakte[1].id, 8))

allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[1].id, allInfo.artefakte[2].id, 19))
allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[1].id, allInfo.artefakte[3].id, 22))

allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[2].id, allInfo.artefakte[4].id, 20))
allInfo.projektArtefaktData.push(new ProjektArtefakt(allInfo.projekte[2].id, allInfo.artefakte[5].id, 40))

allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[0].id, allInfo.aufgabenbereiche[0].id))
allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[0].id, allInfo.aufgabenbereiche[1].id))

allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[1].id, allInfo.aufgabenbereiche[0].id))
allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[1].id, allInfo.aufgabenbereiche[1].id))

allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[2].id, allInfo.aufgabenbereiche[0].id))
allInfo.projektAufgabenbereichData.push(new ProjektAufgabenbereich(allInfo.projekte[2].id, allInfo.aufgabenbereiche[1].id))




//projektlaufzeit(1)
let sort = new Sortieren()
//sort.sortFirstDate(allInfo.projekte)
sort.sortProjectTime(allInfo.projekte)
*/