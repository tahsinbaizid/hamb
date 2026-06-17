const textArea = document.getElementById("text-area");
const keys = document.querySelectorAll(".key");

let capsLock = false;
let shift = false;

keys.forEach(key => {

    key.addEventListener("click", () => {

        const value = key.textContent;

        // Backspace
        if (key.classList.contains("backspace")) {
            textArea.value = textArea.value.slice(0, -1);
            return;
        }

        // Enter
        if (key.classList.contains("enter")) {
            textArea.value += "\n";
            return;
        }

        // Space
        if (key.classList.contains("space")) {
            textArea.value += " ";
            return;
        }

        // Caps Lock
        if (key.classList.contains("caps")) {
            capsLock = !capsLock;
            key.classList.toggle("active");
            updateKeys();
            return;
        }

        // Shift
        if (key.classList.contains("shift")) {
            shift = !shift;

            document.querySelectorAll(".shift").forEach(btn => {
                btn.classList.toggle("active", shift);
            });

            updateKeys();
            return;
        }

        let character = value;

        if (character.length === 1 && /[a-z]/i.test(character)) {

            if (capsLock || shift) {
                character = character.toUpperCase();
            } else {
                character = character.toLowerCase();
            }
        }

        textArea.value += character;

        if (shift) {
            shift = false;

            document.querySelectorAll(".shift").forEach(btn => {
                btn.classList.remove("active");
            });

            updateKeys();
        }

        textArea.focus();
    });
});

function updateKeys() {

    document.querySelectorAll(".key").forEach(key => {

        if (
            key.classList.contains("caps") ||
            key.classList.contains("shift") ||
            key.classList.contains("backspace") ||
            key.classList.contains("enter") ||
            key.classList.contains("space")
        ) {
            return;
        }

        const text = key.textContent;

        if (/^[a-zA-Z]$/.test(text)) {
            key.textContent = (capsLock || shift)
                ? text.toUpperCase()
                : text.toLowerCase();
        }
    });
}