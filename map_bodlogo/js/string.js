// 1. Print each character of the word on its own line.
const word = "code";

for(let i = 0; i < 4; i++){
    console.log(word[i]);
}
// Expected:
//   c
//   o
//   d
//   e
// your code here


// 2. Count the characters using a loop (increment a counter).
//    Do NOT just print .length — count them one by one.
const text = "javascript";
let count = 0;

for(let i = 0; i < 10; i++){
    count++;
}
console.log(count);
// Expected: 10
// your code here


// 3. Count how many vowels (a, e, i, o, u) are in the string.
const phrase = "education";
let vowels = 0;

for(let i = 0; i < 9; i++){
    if(phrase[i] === "a" || phrase[i] === "e" || phrase[i] === "i" || phrase[i] === "o" || phrase[i] === "u"){
        vowels++;
    }
}
console.log(vowels)
// Expected: 5
// your code here


// 4. Count how many times the letter "a" appears.
const sentence = "banana";
let counts = 0;

for(let i = 0; i < 6; i++){
    if(sentence[i] === "a"){
        counts++;
    }
}
console.log(counts);
// Expected: 3
// your code here


// 5. Reverse the string into a NEW string (don't use a built-in reverse).
//    Build it character by character, then print it.
const name = "elbeg";
let reverse = "";

for(let i = 4; i >= 0; i--){
    reverse = reverse + name[i];
}
console.log(reverse);
// Expected: geble
// your code here


// 6. Build a NEW string with all the spaces removed, then print it.
const spaced = "h e l l o";
let new_string = "";

for(let i = 0; i < 9; i++){
    if(spaced[i] !== " "){
        new_string = new_string + spaced[i];
    }
}
console.log(new_string);
// Expected: hello
// your code here


// 7. Build a NEW string where every space is replaced with a dash "-".
const title = "learn java script";
let dash = "";

for(let i = 0; i < 17; i++){
    if(title[i] === " "){
        dash = dash + "-";
    }
    else{
        dash = dash + title[i];
    }
}
console.log(dash);
// Expected: learn-java-script
// your code here


// 8. Check if the word is a palindrome (reads the same forwards and
//    backwards). Print true or false.
const candidate = "level";
let palindrome = "";
let unen = true;

for(let i = 4; i >= 0; i--){
    palindrome = palindrome + candidate[i];
    if(palindrome === candidate){
        unen = true;
    }
    else{
        unen = false;
    }
}
console.log(unen);
// Expected: true
// your code here


// 9. Count how many words are in the sentence.
//    Hint: words are separated by spaces.
const line = "I love javascript a lot";
let words = 1;

for(let i = 0; i < line.length; i++){
    if(line[i] === " "){
        words++;
    }
}
console.log(words);
// Expected: 5
// your code here


// 10. Count how many UPPERCASE letters are in the string.
//     Hint: a character ch is uppercase when  ch >= "A" && ch <= "Z"
const mixed = "HelloWorldJS";
let up = 0;

for(let i = 0; i < mixed.length; i++){
    if(mixed[i] >= "A" && mixed[i] <= "Z"){
        up++;
    }
}
console.log(up)
// Expected: 4
// your code here