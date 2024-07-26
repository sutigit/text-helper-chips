const chipNames = [
    'Kettu', 
    'Karkki', 
    'Viesti', 
    'Kuva', 
    'Pankkilaina'
];



// Get the textarea container and create a textarea element
const textareaConainer = document.getElementById('textarea-container');
const textarea = document.createElement('textarea');
textarea.id = 'textarea';
textareaConainer.appendChild(textarea);


// // Add the overlay to the textarea
const textareaOverlay = document.createElement('div');
textareaOverlay.classList.add('textarea-overlay');
textareaConainer.appendChild(textareaOverlay);


// Add text generation button to overlay footer area
const overlayFooter = document.createElement('button');
overlayFooter.classList.add('overlay-footer');
textareaConainer.appendChild(overlayFooter);
overlayFooter.textContent = 'Luo teksti';


// Add click handler to the overlay footer button
overlayFooter.addEventListener('click', () => {
    const text = selectedChips.join(' ');
    writeTextInterval(text, 100);
});

let selectedChips = [];

// Get the chip area
const chipArea = document.getElementById('chip-area');

// Add chips to the chip area
chipNames.forEach((name) => {
    const chip = document.createElement('div');
    const chipDeselect = document.createElement('div');
    chip.classList.add('chip');
    chip.textContent = name;
    chipDeselect.classList.add('chip-deselect');
    chipDeselect.textContent = 'x';
    chip.appendChild(chipDeselect);

    // add click handler to the chip
    chip.addEventListener('click', () => {

        // check if the chip is already selected
        if (selectedChips.includes(name)) {
            // remove the chip from the selectedChips array
            selectedChips.splice(selectedChips.indexOf(name), 1);
            // remove the selected class from the chip
            chip.classList.remove('selected');
            chipDeselect.classList.remove('show');

            if (!selectedChips) {
                overlayFooter.classList.remove('show');
                textareaOverlay.classList.remove('show');
            }

        } else {
            // add the chip to the selectedChips array
            selectedChips.push(name);
            // add the selected class to the chip
            chip.classList.add('selected');
            chipDeselect.classList.add('show');

            if (selectedChips) {
                overlayFooter.classList.add('show');
                textareaOverlay.classList.add('show');
            }
            
        }
        // log the selected chips
        console.log(selectedChips);
    });
    chipArea.appendChild(chip);
});



// functions
function writeTextInterval(text, ms) {
    let i = 0;

    // disable textarea
    textarea.setAttribute('disabled', 'disabled');

    const interval = setInterval(() => {
        if (i < text.length) {
            textarea.textContent = text.slice(0, i + 1);
            i++;
        } else {
            clearInterval(interval);
            
            // enable textarea
            textarea.removeAttribute('disabled');
            
            // hide the overlay
            overlayFooter.classList.remove('show');
            textareaOverlay.classList.remove('show');
            
            // remove the selected class from the chips
            const chips = document.querySelectorAll('.chip');
            chips.forEach((chip) => {
                chip.classList.remove('selected');
                chip.querySelector('.chip-deselect').classList.remove('show');
            });
            
            // clear the selected chips
            selectedChips = [];
        }
    }, ms);
}