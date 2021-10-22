const button = document.getElementById('button') as HTMLButtonElement;

// Global variables
let isJokeFetching: boolean = false;

// Disable/Enable Button
const toggleButton = () => {
  const buttonText = 'Tell Me A Joke';

  if (button.disabled) {
    // Enable the button
    button.disabled = false;

    // Change the text of the button
    button.textContent = buttonText;

    return;
  }

  // Disable the button
  button.disabled = true;

  // Change the text of the button
  button.textContent = `${buttonText}...`;
};

const tellMe = (joke: string) => {
  console.log(joke);
};

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
    tellMe(joke);

    // Enable the Button
    toggleButton();
  } catch (err) {
    // Catch Error Here
    alert(err);

    console.log('fuck');

    // Enable the Button
    toggleButton();
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
