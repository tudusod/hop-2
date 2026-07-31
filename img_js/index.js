const imgsDiv = document.getElementById("imgs");
const clearDiv = document.getElementById("clearDiv")
const zurag = document.createElement("img")
clearDiv.appendChild(zurag)
zurag.style.height = "100px"
zurag.style.width = "100px"
const imgs = [
    "https://cs2pulse.com/wp-content/uploads/cs2/players/senzu-200x200-fitcontain-q99-gb283-s1.png", 
    "https://cs2pulse.com/wp-content/uploads/2025/09/mzinho-CS2-Settings.webp", 
    "https://cs2pulse.com/wp-content/uploads/2025/09/910-CS2-Settings.webp", 
    "https://assets.cs2util.com/other/pro-players/Techno4K.webp", 
    "https://cs2pulse.com/wp-content/uploads/2025/09/bLitz-CS2-Settings.webp"
]

for(let i = 0; i < imgs.length; i++){
    const btn = document.createElement("button")
    const img = document.createElement("img")
    img.src = imgs[i]
    img.style.width = "50px"
    img.style.height = "50px"

    btn.addEventListener('click', () => {
        btn.style.border = "3px solid purple"
        zurag.src = imgs[i]
    })

    btn.appendChild(img)
    imgsDiv.appendChild(btn)
}

