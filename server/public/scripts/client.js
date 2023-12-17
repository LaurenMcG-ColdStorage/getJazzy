function onReady() {
    console.log('Hello from client.js');

    axios({
        method: 'GET',
        url: '/artist'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.
            console.log(response);
            // quotesFromServer will be an Array of quotes
            let quotesFromServer = response.data;
            let contentDiv = document.querySelector('#artistTableBody');
            for (let artist of quotesFromServer) {
                contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
            }
        }).catch((error) => {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });

    // TODO Add Axios request for /songs and display on DOM
    axios({
        method: 'GET',
        url: './song'
    })
        .then((resp) => {
            let songsFromServer = resp.data;
            const songDiv = document.querySelector('#songTableBody');
            songDiv.innerHTML = ''
            for (let song of songsFromServer){
                songDiv.innerHTML +=`
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                </tr>`
            }
        })
        .catch(function (error) {
            console.log(error);
            alert('Something broke, check console for details')
        });

};

onReady();


function submitArtist(event){
    event.preventDefault();
    const artistName = document.querySelector('#artistName').value;
    const artistBorn = document.querySelector('#artistBorn').value;
    const artistDied = document.querySelector('#artistDied').value;
    let addedArtist = {name: artistName, born: artistBorn, died: artistDied};
    console.log(addedArtist);
    
    axios({
        method: 'POST',
        url: '/artist',
        data: addedArtist
    })
     .then((response) => { //This part submits a new GET request to obtain complete data and reform page.
        axios({
            method: 'GET',
            url: '/artist'
        })
            .then((response) => {
                // Code that will run on successful response
                // from the server.
                console.log(response);
                // quotesFromServer will be an Array of quotes
                let quotesFromServer = response.data;
                let contentDiv = document.querySelector('#artistTableBody');
                contentDiv.innerHTML = ''
                for (let artist of quotesFromServer) {
                    contentDiv.innerHTML += `
                    <tr>
                        <td>${artist.name}</td>
                        <td>${artist.born}</td>
                        <td>${artist.died}</td>
                    </tr>
                `;
                }
            })
            .catch((error) => {
                // Code that will run on any errors from the server.
                console.log(error);
                alert('Something bad happened! Check the console for more details.')
            });
        })
     .catch(function (error){
                console.log(error);
             })
};

function submitSong(event){
    event.preventDefault();
    const songArtist = document.querySelector('#songArtist');
    const songTitle = document.querySelector('#songTitle');
    let addedSong = {title: songTitle.value, artist: songArtist.value};
    console.log(addedSong);
    
    axios({
        method: 'POST',
        url: '/song',
        data: addedSong
    })
     .then((response) => { //This part submits a new GET request to obtain complete data and reform page.
        axios({
            method: 'GET',
            url: '/song'
        })
            .then((response) => {
                // Code that will run on successful response
                // from the server.
                console.log(response);
                // quotesFromServer will be an Array of quotes
                let songsFromServer = response.data;
                let songDiv = document.querySelector('#songTableBody');
                songDiv.innerHTML = ''
                for (let song of songsFromServer) {
                    songDiv.innerHTML += `
                    <tr>
                        <td>${song.title}</td>
                        <td>${song.artist}</td>
                    </tr>
                `;
                }
            })
            .catch((error) => {
                // Code that will run on any errors from the server.
                console.log(error);
                alert('Something bad happened! Check the console for more details.')
            });
        })
     .catch(function (error){
                console.log(error);
             })
};
//
