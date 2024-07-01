
async function getProjektData(url) {
    let fetchRes = await fetch(url)
    return await fetchRes.json()
}



window.onload = () => {
    let id = window.location.href.split('=')[1]
    getProjektData('http://localhost:8080/SmartData/smartdata/records/projekt/'+id)
    .then((data) => {
        //
    })

    if(localStorage.getItem("Kommentar"+id)) {
        let kommentare = JSON.parse(localStorage.getItem("Kommentar"+id))
        let par = document.getElementById('result')
        for (let element of kommentare) {
            let p = document.createElement('p')
            if (element.be == 1) {
                p.textContent = element.be + " Stern: " +element.komm
            } else {
                p.textContent = element.be + " Sterne: " +element.komm
            }
            par.appendChild(p)
        }
    }
}

function sendKommentar() {
    
    let id = window.location.href.split('=')[1]

    let kommentar = document.querySelector('#kommentar').value
    let bewertung = document.querySelector('#bewertung').value

    let item = {
        komm:kommentar,
        be:bewertung
    }
    if (localStorage.getItem("Kommentar"+ id)) {
        let kommentare = JSON.parse(localStorage.getItem("Kommentar"+id))
        kommentare.push(item)
        localStorage.setItem("Kommentar"+id, JSON.stringify(kommentare))

    } else {
        localStorage.setItem("Kommentar"+id, JSON.stringify(Array.of(item)))
    }
    window.location.reload()
}