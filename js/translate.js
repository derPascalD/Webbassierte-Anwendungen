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
/* ["title", "Titel"],
    ["",""],


*/ 
]);



let translator = new Translate(enMap)

translator.translate()