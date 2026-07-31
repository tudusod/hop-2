// 1. Build a NEW array containing only the words with length >= 5.
const words = ["cat", "elephant", "dog", "giraffe", "ant"];

// Expected: [ 'elephant', 'giraffe' ]
// your code here
const new_array = []
for(let i = 0; i < words.length; i++){
    if(words[i].length >= 5){
        new_array.push(words[i])
    }
}
console.log(new_array)

// 2. Build a NEW array of all words that start with "a" (case-insensitive).
const names = ["Apple", "banana", "Avocado", "cherry", "almond"];

// Expected: [ 'Apple', 'Avocado', 'almond' ]
// your code here
const a_array = []
for(let u = 0; u < names.length; u++){
    if(names[u].startsWith("a") || names[u].startsWith("A")){
        a_array.push(names[u])
    }
}
console.log(a_array)

// 3. Build a NEW array of the FIRST letter of each word, uppercased.
const fruits = ["mango", "kiwi", "pear"];

// Expected: [ 'M', 'K', 'P' ]
// your code here
const s_array = []
for(let y = 0; y < fruits.length; y++){
    s_array.push(fruits[y][0].toUpperCase())
}
console.log(s_array)

// 4. Build a NEW array of the LENGTHS of each string.
const animals = ["fox", "tiger", "bee"];

// Expected: [ 3, 5, 3 ]
// your code here
const d_array = []
for(let t = 0; t < animals.length; t++){
    d_array.push(animals[t].length)
}
console.log(d_array)

// 5. Build a NEW array with every word converted to UPPERCASE.
const colors = ["red", "green", "blue"];

// Expected: [ 'RED', 'GREEN', 'BLUE' ]
// your code here
const f_array = []
for(let w = 0; w < colors.length; w++){
    f_array.push(colors[w].toUpperCase())
}
console.log(f_array)


// 6. Build a NEW array containing only strings that are NOT empty.
const inputs = ["hi", "", "yes", "", "no"];

// Expected: [ 'hi', 'yes', 'no' ]
// your code here
const g_array = []
for(let u = 0; u < inputs.length; u++){
    if(inputs[u] !== ""){
        g_array.push(inputs[u])
    }
}
console.log(g_array)

// 7. Build a NEW array of words that contain the letter "e".
const items = ["tree", "sky", "green", "sun", "leaf"];

// Expected: [ 'tree', 'green', 'leaf' ]
// your code here
const e_array = []
for(let s = 0; s < items.length; s++){
    if(items[s].includes("e")){
        e_array.push(items[s])
    }
}
console.log(e_array)

// 8. Build a NEW array where each word has "!" added to the end.
const shouts = ["go", "stop", "run"];

// Expected: [ 'go!', 'stop!', 'run!' ]
// your code here
const p_array = []
for(let c = 0; c < shouts.length; c++){
    p_array.push(shouts[c] + "!")
}
console.log(p_array)