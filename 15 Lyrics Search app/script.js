const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const apiURL = 'https://api.lyrics.ovh';



 async function searchSong(term) {
  // fetch(`${apiURL}/suggest/${term}`).then( res => res.json()).then(data => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await  res.json();
  
  showData(data);
}
function showData(data){
  //  let output = '';
  //   data.data.forEach(song => {
  //     output += `
  //      <li> 
  //       <span> <strong>${song.artist.name} </strong> - ${song.title}</span>
  //         <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics</button>
  //      <li>`
  //   });

  //   result.innerHTML= ` 
  //   <ul class="songs">
  //   ${output}</ul> 

  //   `;
    result.innerHTML = ` 
    <ul class="songs">
    ${data.data.map(song => 
      `<li> 
      <span> <strong>${song.artist.name} </strong> - ${song.title}</span>
        <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}"> Get Lyrics</button>
     <li>`
    ).join('')}</ul> 
    `;
    if( data.prev || data.next){
      more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')" >Prev</button> ` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
      `;
    }else {
      more.innerHTML = '';
    }
}
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await  res.json();
  
  showData(data);
}

async function getLyrics ( artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await  res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML =` <h2><strong>${artist} </strong>- ${songTitle}</h2>
  <span>${lyrics}</span>
  `;
  more.innerHTML= '';
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const  searchterm = search.value.trim();
  if (!searchterm){
    alert('Please type in a search term')
  }else {
    searchSong(searchterm);
  }
 
});

result.addEventListener('click', e => {
  const cliledEL = e.target;
  if(cliledEL.tagName === 'BUTTON'){
    const artist = cliledEL.getAttribute('data-artist');
    const songTitle = cliledEL.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
})
