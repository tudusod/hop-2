// 1. Print every element of the array, each on its own line.
const fruits = ["apple", "banana", "cherry"];

for(let i = 0; i < 3; i++){
    console.log(fruits[i]);
}


// 2. Add up all the numbers and print the total.
const nums = [4, 8, 15, 16, 23, 42];
let total = 0;

for(let i = 0; i < 6; i++){
    total = total + nums[i]
}
    console.log(total);


// 3. Count how many numbers in the array are even, and print the count.
const values = [3, 6, 9, 12, 15, 18];
let count = 0;

for(let i = 0; i < 6; i++){
    if(values[i] % 2 === 0){
        count++;
    }
}
    console.log(count);


// 4. Find and print the largest number in the array.
const scores = [42, 17, 99, 23, 56];
let max = scores[0];

for(let i = 0; i < 5; i++){
    if(max < scores[i]){
      max = scores[i];
    }
}
console.log(max);



// 5. Find the smallest number AND the index where it sits.
//    Print:  smallest <value> at index <i>
const temps = [12, 5, 8, 3, 20];
let min = temps[0];
let index = 0;

for(let i = 0; i < 5; i++){
    if(min > temps[i]){
        min = temps[i]
        index = i;
    }
}
console.log("smallest", min, "index", index)


// 6. Build a NEW array where every number is doubled, then print it.
const base = [1, 2, 3, 4];
const second = []

for(let i = 0; i < 4; i++){
    second[i] = base[i] * 2;
}
console.log(second)


// 7. Count how many times the target value appears in the array.
const items = [1, 2, 2, 3, 2, 4];
const target = 2;
let appeared = 0;

for(let i = 0; i < 6; i++){
    if(items[i] === target){
        appeared++;
    }
}
console.log(appeared);


// 8. Calculate and print the average of the numbers.
const data = [10, 20, 30, 40];
let average = 0;

for(let i = 0; i < 4; i++){
    average = average + data[i] / 4;
}
console.log(average)


// 9. Build a NEW array containing only the numbers greater than 10,
//    then print it.
const list = [5, 12, 8, 20, 3, 15];
const new_array = [];

for(let i = 0; i < 6; i++){
    if(list[i] > 10){
       new_array.push(list[i])
    }
}
console.log(new_array);


// 10. Reverse the array into a NEW array WITHOUT using .reverse().
//     Then print the new array.
const letters = ["a", "b", "c", "d"];
const array = [];

for(let i = 3; i >= 0; i--){
    array.push(letters[i]);
}
console.log(array);