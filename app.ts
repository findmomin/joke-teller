const button = document.getElementById('button') as HTMLButtonElement;

// Disable/Enable Button
const toggleButton = () => {
  if (button.disabled) {
    // Enable the button
    button.disabled = false;

    // Change the text of the button
    button.textContent = 'Tell Me A Joke';

    return;
  }

  // Disable the button
  button.disabled = true;

  // Change the text of the button
  button.textContent = 'Hold On...';
};

const tellMe = async (joke: string) =>
  new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(joke);

    speechSynthesis.speak(utterance);

    utterance.addEventListener('end', () => resolve(null));
  });

// Get jokes from Joke API
const getJokes = async () => {
  let joke = '';

  // Disable the button
  toggleButton();

  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming,Pun?blacklistFlags=nsfw,religious,racist,sexist';

  try {
    const data = await (await fetch(apiUrl)).json();

    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Outputting the joke as audio
    await tellMe(joke);

    // Enable the Button
    toggleButton();
  } catch (err) {
    // Catch Error Here
    alert(err);

    // Enable the Button
    toggleButton();
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
