const body = document.getElementById("body")

const input = document.createElement("input")
const btn = document.createElement("button")
const full_div = document.createElement("div")

btn.innerHTML = "seperate"

btn.addEventListener('click', () => {
    if (input.value.trim() === "") {
        return; 
    }
    

    const text = input.value

    for(let i = 0; i < text.length; i++){
        const letter = text[i]
        const seperated = document.createElement("div")
        const letterSpan = document.createElement('span');
        letterSpan.style.border = "1px solid black"
        letterSpan.style.margin = "5px"
        letterSpan.innerHTML = letter;
        seperated.appendChild(letterSpan)
        seperated.style.gap = "5px"
        seperated.style.padding = "5px"
        full_div.style.display = "flex"
        full_div.appendChild(seperated)
        input.value = ""
    }
})

body.appendChild(input)
body.appendChild(btn)
body.appendChild(full_div)