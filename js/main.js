const url = `https://api.thecatapi.com/v1/images/search?limit=1`;
const api_key = "live_ZkQwYEHUxtdtG3mJB59DUtuNvk7CKcRf9vxzoUwYl7BKnOPBPCEQOGE74tdbXHyw"

fetch(url, {
    headers: {
        'x-api-key': api_key
    }
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let imagesData = data;
        imagesData.map(function (imageData) {

            let image = document.createElement('img');
            //use the url from the image object
            image.src = `${imageData.url}`;

            let gridCell = document.createElement('div');
            gridCell.classList.add('col');
            gridCell.classList.add('col-lg');
            gridCell.appendChild(image)

            document.getElementById('grid').appendChild(gridCell);

        });
    })
    .catch(function (error) {
        console.log(error);
    });

