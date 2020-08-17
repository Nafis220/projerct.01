const form = document.getElementById('input')
const search = document.getElementById('button')
const result = document.getElementById('lyrics')


/// api URL ///
const apiURL = 'https://api.lyrics.ovh';


/// adding event listener in form

search.addEventListener('click', e=> {
    e.preventDefault();
    searchValue = form.value.trim()

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})
 

async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data)
    
    
}

//display final result in DO
function showData(data){
  
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div class="jumbotron" >
                    <img class="artist-img "img-fluid mx-auto d-block" src="${song.artist.picture}">
                        <h3 class= "artist-name text-primary" >Artist Name:${song.artist.name}</h3> -<h4 class="song-title text-danger">Song Title:${song.title}</h4>
                        <span  class="btn btn-danger lyrics-btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics</span> 
                    </div>
                    
                </li>`
        )
        .join('')}
    </ul>
  `;
}




//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }
