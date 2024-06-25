document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('projektForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const titel = document.getElementById('projektTitel').value;
        const short = document.getElementsByName('short')[0].value;
        const long = document.getElementsByName('long')[0].value;
        const startdate = document.getElementsByName('startdate')[0].value;
        const enddate = document.getElementsByName('enddate')[0].value;
        
      
        let data = {
            "komplettbeschreibung": long,
            "titel": titel,
            "enddatum": enddate,
            "startdatum": startdate,
            "pfadzulogo": url,
            "kurzbeschreibung": short,
            "maintainer": "Pascal"
        };


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch("http://localhost:8080/SmartData/smartdata/records/projekt", requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            document.getElementById('message').innerText = "ERFOLGREICH HINZUGEFÜGT";
            const data = await response.json();
            window.location.href = "../htmls/projekt.html?id=" + data;


        } catch (error) {
            console.error('Error adding project:', error);
            
        }
    });

    var url;

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Update the image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('uploadPreview').src = e.target.result;
            }
            reader.readAsDataURL(file);
    
            url = "../src/assets/"+ file.name;
        }
    });


});

