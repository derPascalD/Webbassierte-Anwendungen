class Translate {

    constructor(languageMap) {
        this.languageMap = languageMap
    }

    translate() {
        for (let [id, text] of this.languageMap) {
            console.log(id, text);
        }
    }
}



const enMap = new Map([
    ["text-title", "Titel"],
    ["text-label-Benutzername", "Benutzername"],
    ["Benutzername", "Benutzername"],
    ["Password", "Passwort"],
    ["text-a-menu-one", ""],
    ["text-a-menu-two", ""],
    ["text-h1-Zeile1", ""],
    ["text-h1-Zeile2", ""],
    ["text-h1-question-one", ""],
    ["text-p-answer-one", ""],
    ["text-h1-title-one", ""],
    ["text-a-projekt-one", ""],
    ["text-a-projekt-two", ""],
    ["text-a-projekt-three", ""],
    ["text-a-impressum", "Impressum"],
    ["text-a-datenschutz", "Datenschutz"],
    ["text-a-haftung", "Haftung"],
    ["text-a-scroll-top", "Nach oben"],
    ["text-p-copyright", "Copyright"]
]);

/*
text-title
text-label-Benutzername
Benutzername
text-label-password
Password
text-a-menu-one
text-a-menu-two
text-h1-Zeile1
text-h1-Zeile2
text-h1-question-one
text-p-answer-one
text-h1-title-one
text-a-projekt-one
text-a-projekt-two
text-a-projekt-three
text-a-impressum
text-a-datenschutz
text-a-haftung
text-a-scroll-top
text-p-copyright
*/

let translator = new Translate(medics)

translator.translate()