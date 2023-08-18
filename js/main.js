/*
Daniel Yevtushenko - 200528781
Jenna Deamer - 200529678
*/

const url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1`;
const api_key =
    "live_ZkQwYEHUxtdtG3mJB59DUtuNvk7CKcRf9vxzoUwYl7BKnOPBPCEQOGE74tdbXHyw";

const urlTwo = "https://api.quotable.io/random";

let catBreed;

const back = document.querySelector("body");

back.addEventListener("mousemove", (e) => {
    back.style.backgroundPositionX = +e.offsetX * 0.05 + "px";
    back.style.backgroundPositionY = +e.offsetY * 0.05 + "px";
});

//---------------------------------------------------- API 1 ----------------------------------------------------\\
fetch(url, {
    headers: {
        "x-api-key": api_key,
    },
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let imagesData = data;
        imagesData.map(function (imageData) {
            let image = document.createElement("img");
            //use the url from the image object
            image.src = `${imageData.url}`;

            let gridCell = document.createElement("div");
            let breed = document.createElement("p");
            breed.innerHTML = "Breed: " + imageData.breeds[0].name;
            catBreed = imageData.breeds[0].name;
            gridCell.classList.add("col");
            gridCell.classList.add("col-lg");
            gridCell.appendChild(image);

            document.getElementById("grid").appendChild(gridCell);
            document.getElementById("grid").appendChild(breed);
        });
    })
    .catch(function (error) {
        console.log(error);
    });

//---------------------------------------------------- API 2 ----------------------------------------------------\\
fetch(urlTwo, {})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let contentBox = document.createElement("h3");

        contentBox.innerHTML = '"' + data.content + '"' + " - " + data.author;

        document.getElementById("grid").appendChild(contentBox);
    })
    .catch(function (error) {
        console.log(error);
    });

// Function to fetch and process the JSON data
async function fetchAndDisplayData() {
    try {
        const response = await fetch("js/catinfo.json");
        const jsonData = await response.json();

        // Select a random entry from the JSON array
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        const randomEntry = jsonData[randomIndex];

        // Display the random entry's variables in the HTML page
        const jsonEntryElement = document.getElementById("catdata");
        jsonEntryElement.innerHTML = `
        <h3>Cat Location Details:</h3><br>
        <p><strong>Street Address:</strong> ${randomEntry.StreetAddress}</p><br>
        <p><strong>City:</strong> ${randomEntry.City}</p> <br>
        <p><strong>Province:</strong> ${randomEntry.State}</p><br>
        <p><strong>Zip Code:</strong> ${randomEntry.ZipCode}</p><br>
        <p><strong>Country:</strong> ${randomEntry.Country}</p><br>
        <p><strong>Latitude:</strong> ${randomEntry.Latitude}</p><br>
        <p><strong>Longitude:</strong> ${randomEntry.Longitude}</p><br>
        <span>Hover over box to uncover sensative information</span>
        <div class="blurry-div">
        <p><strong>Credit Card Type:</strong> ${randomEntry.CCType}</p><br>
        <p><strong>Credit Card Number:</strong> ${addSpaces(
            randomEntry.CCNumber.toString()
        )}</p><br>
        <p><strong>CVV2:</strong> ${randomEntry.CVV2}</p><br>
        <p><strong>CC Expires:</strong> ${randomEntry.CCExpires}</p> 
        </div>
      `;

        const blurryDiv = document.querySelector(".blurry-div");

        blurryDiv.addEventListener("mouseenter", () => {
            blurryDiv.style.filter = "none";
        });

        blurryDiv.addEventListener("mouseleave", () => {
            blurryDiv.style.filter = "blur(5px)";
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Call the fetchAndDisplayData function when the page loads
window.addEventListener("load", fetchAndDisplayData);

function addSpaces(str) {
    const chunkSize = 4;
    const regex = new RegExp(`.{1,${chunkSize}}`, "g");
    return str.match(regex).join(" ");
}
