"use strict";
const button = document.getElementById('button');
const toggleButton = () => {
    if (button.disabled) {
        button.disabled = false;
        button.textContent = 'Tell Me A Joke';
        return;
    }
    button.disabled = true;
    button.textContent = 'Hold On...';
};
const tellMe = async (joke) => new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(joke);
    speechSynthesis.speak(utterance);
    utterance.addEventListener('end', () => resolve(null));
});
const getJokes = async () => {
    let joke = '';
    toggleButton();
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Pun?blacklistFlags=nsfw,religious,racist,sexist';
    try {
        const data = await (await fetch(apiUrl)).json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        await tellMe(joke);
        toggleButton();
    }
    catch (err) {
        alert(err);
        toggleButton();
    }
};
button.addEventListener('click', getJokes);
