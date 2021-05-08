const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

//* Disable and Enable Button
function toggleButton() {
  button.disabled = !button.disabled
}

let joke = ''

//** Pass Joke to VoiceRSS API
function tellMe(joke) {
  console.log('tell me: ', joke)
  VoiceRSS.speech({
    key: '9eba1730bedc4581a8f5fa2251cccb17',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

// * Get Jokes from API
async function getJokes() {
  const apiURL =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=political'
  try {
    const response = await fetch(apiURL)
    const data = await response.json()

    // ** check if choke is one part or two part
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    //* Text-to-Speech
    tellMe(joke)

    //* Disabl Button
    toggleButton()
    // ** catch any errors
  } catch (error) {
    console.log('Something went wrong!', error)
  }
}

// * Event Listener
button.addEventListener('click', getJokes)

audioElement.addEventListener('ended', toggleButton)
