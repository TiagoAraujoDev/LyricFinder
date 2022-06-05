const artist = document.getElementById('artistName');
const song = document.getElementById('song');
const findBtn = document.getElementById('findBtn');
const resultContainer = document.getElementById('result');
const placeHolder = document.getElementById('placeholder');
const divLyric = document.getElementById('lyricContainer');

function findLyrics(artist, song) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}

findBtn.addEventListener('click', () => {
  divLyric.innerHTML = '';
  placeHolder.classList.remove('d-none');
  findLyrics(artist.value, song.value)
    .then(response => response.json())
    .then(response => {
      if (response.lyrics != undefined) {
        placeHolder.classList.add('d-none');
        divLyric.innerHTML = `<pre class="text-center">${response.lyrics}</pre>`;
      } else {
        placeHolder.classList.add('d-none');
        divLyric.innerHTML = `<p class="text-center fs-1">Ops... ${response.error}</p>`;
      }
    })
    .catch(err => {
      console.log(err.error);
      divLyric.innerHTML = `<p class="text-center fs-1">${err.error}</p>`;
    });
});
