class Artefakt {

    constructor(id, titel, kurzbeschreibung, aufgabenbereich, arbeitszeit) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.objBereich = aufgabenbereich
        this.arbeitszeit = arbeitszeit
    }
}

class Aufgabenbereich {

    constructor(id, titel, kurzbeschreibung) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
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

class Projekt {
    constructor(id, titel, kurzbeschreibung, pfadZuProjektLogo, startDatum) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.pfadZuProjektLogo = pfadZuProjektLogo
        this.startDatum = new Date(startDatum)
    }

}

const projektlaufzeit = (projektID) => {
    let summe = 0
    for (element of allInfo.projektArtefaktData) {
        if(element.idProjekt === projektID) {
            summe+=element.arbeitsaufwand
        }
    }
    return summe
}
class Sortieren {
    constructor(){}

    sortFirstDate(projekte){
        
 
        let sortable = [];
        for (element of projekte) {
            sortable.push([element.id, element.startDatum]);
        }
        
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });    

        return sortable

    }
    
    sortProjectTime(projekte){
        let alleZeiten = []
        for (element of projekte) {
            alleZeiten.push([element.id, projektlaufzeit(element.id)])
        }
        alleZeiten.sort((a,b)=>{
            return a[1]-b[1]
        })
        return alleZeiten
    }
}

let allInfo = {
    projekte: [],
    artefakte: [],
    aufgabenbereiche: [],
    projektArtefaktData: [],
    projektAufgabenbereichData: []
}

allInfo.projekte.push(new Projekt(5, "Testprojekt1", "Das ist ein Test", "./abc.png", "2024, 11, 5"))
allInfo.projekte.push(new Projekt(2, "Testprojekt2", "Das ist ein zweiter Test", "./def.png", "2024, 11, 6"))
allInfo.projekte.push(new Projekt(3, "Testprojekt3", "Das ist ein dritter Test", "./ghi.png", "2024, 11, 7"))

allInfo.aufgabenbereiche.push(new Aufgabenbereich(1, "Aufgabenbereich1", "Bereich für Aufgaben"))
allInfo.aufgabenbereiche.push(new Aufgabenbereich(1, "Aufgabenbereich2", "Bereich für Aufgaben"))


allInfo.artefakte.push(new Artefakt(1, "Artefakt1", "Das ist ein Artefakt", allInfo.aufgabenbereiche[0], 10))
allInfo.artefakte.push(new Artefakt(2, "Artefakt2", "Das ist ein Artefakt", allInfo.aufgabenbereiche[1], 10))

allInfo.artefakte.push(new Artefakt(3,"Artefakt3","Das ist ein Artefakt", allInfo.aufgabenbereiche[0],20))
allInfo.artefakte.push(new Artefakt(4, "Artefakt4", "Das ist ein Artefakt", allInfo.aufgabenbereiche[1], 20))

allInfo.artefakte.push(new Artefakt(5, "Artefakt5", "Das ist ein Artefakt", allInfo.aufgabenbereiche[0], 30))
allInfo.artefakte.push(new Artefakt(6, "Artefakt6", "Das ist ein Artefakt", allInfo.aufgabenbereiche[1], 30))

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
sort.sortFirstDate(allInfo.projekte)
//sort.sortProjectTime(allInfo.projekte)