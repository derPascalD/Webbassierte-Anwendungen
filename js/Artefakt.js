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
