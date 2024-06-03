class Projekt {
    constructor(id, titel, kurzbeschreibung,komplettbeschreibung, pfadZuProjektLogo,maintainer, startDatum, endDatum) {
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