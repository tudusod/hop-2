
// 1. Double every number.
const nums = [1, 2, 3, 4, 5];
// Expected: [2, 4, 6, 8, 10]
// your code here
const b = nums.map((qw, index) => {
  return qw * 2;
})
console.log(b)


// 2. Turn each temperature into a string with "°C".
const temps = [12, 5, 8, 3, 20];
// Expected: ["12°C", "5°C", "8°C", "3°C", "20°C"]
// your code here
const c = temps.map((temp, index) => {
    return temp + "C"
})
console.log(c)


// 3. Get the length of each word.
const words = ["cat", "hello", "hi", "banana"];
// Expected: [3, 5, 2, 6]
// your code here
const d = words.map((word, index) => {
    return word.length
})
console.log(d)




// 4. Capitalize the first letter of each word.
const names = ["apple", "banana", "cherry"];
// Expected: ["Apple", "Banana", "Cherry"]
// your code here
const e = names.map((name, index) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
})
console.log(e)  


// 5. Number each task starting from 1:  "<i>. <task>"
//    (hint: map's second parameter is the index)
const tasks = ["wake up", "brush teeth", "code"];
// Expected: ["1. wake up", "2. brush teeth", "3. code"]
// your code here
const t = tasks.map((task, index) => {
  return (index + 1) + ". " + task
})
console.log(t)



// 6. Add 10% tax to each price, rounded to a whole number.
const prices = [100, 250, 999, 1500];
// Expected: [110, 275, 1099, 1650]
// your code here
const p = prices.map((price, index) => {
  return Math.round(price * 1.1)
})
console.log(p)


// 7. Convert each score to "pass" (>= 60) or "fail".
const scores = [45, 88, 60, 30, 72];
// Expected: ["fail", "pass", "pass", "fail", "pass"]
// your code here
const s = scores.map((score, index) =>{
  if(score >= 60){
    return "pass"
  }
  else{
    return "fail"
  }
})
console.log(s)



let a = [1, 22, 2131, 12, 24, 21321, 1500]
const b = a.map((haha, index) => {
  return 'ymr neg ym'

})
 