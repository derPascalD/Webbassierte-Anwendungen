class Aufgabenbereich {

    constructor(id, titel, kurzbeschreibung, projectID) {
        this.id = id
        this.titel = titel
        this.kurzbeschreibung = kurzbeschreibung.substring(0, 255)
        this.projectID = projectID

    }
}
