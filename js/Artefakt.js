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
