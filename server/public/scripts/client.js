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
        }).catch(function (error) {
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

function submitArtist(event){
    event.preventDefault();
    const artistName = document.querySelector('#artistName');
    const artistBorn = document.querySelector('#artistBorn');
    const artistDied = document.querySelector('#artistDied');
    let addedArtist = {name: artistName.value, born: artistBorn.value, died: artistDied.value}
    axios({
        method: 'POST',
        url: '/new-artist',
        data: addedArtist})
     .then(function (response) {
        console.log(response);

     })
     .catch(function (error){
        console.log(error);
     })
}

onReady();

//
