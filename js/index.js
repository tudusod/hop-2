/* ========================= EASY ========================= */

// E1. A person can enter the club only if age is 18 or older
//     AND hasID is true. Print "Welcome" or "Denied".
function age (age, hasId){
    if(age >= 18 && hasId === true){
        return "Welcome"
    }
    else{
        return "Denied"
    }
}
console.log(age(21 , true))


// E2. It is a day off if isWeekend is true OR isHoliday is true.
//     Print "Day off" or "Work day".
function op (isWeekend, isHoliday){
    if(isWeekend === true || isHoliday === true){
        return "Day off"
    }
    else{
        return "Work day"
    }
}
console.log(op(false , false))


// E3. Go to the beach only if temperature is above 30 AND isSunny.
//     Print "Beach" or "Stay home".
function io (temperature, isSunny){
    if(temperature >= 30 && isSunny === true){
        return "Beach"
    }
    else{
        return "Stay home"
    }
}
console.log(io(67 , true))



// E4. Grant admin access if username is "admin" OR username is "root".
//     Print "Admin access" or "Regular user".
function ui(username) {
    if (username === "admin" || username === "root") {
        return "Admin access";
    } 
    else {
        return "Regular user";
    }
}
console.log(ui("root"))


// E5. A number is "good" if it is positive (> 0) AND even (n % 2 === 0).
//     Print "Good" or "Not good".
function number(n){
    if(n > 0 && n % 2 === 0){
        return "good"
    }
    else{
        return "Not good"
    }
}
console.log(number(6))



/* ======================== MEDIUM ======================== */
/* Combine && and || together, or chain several conditions. */

// M1. Login succeeds if the username is "elbeg" AND password is "1234".
//     Print "Login OK" or "Wrong credentials".
function yu(username, password){
    if(username === "elbeg" && password === "1234"){
        return "Login ok"
    }
    else{
        return "Wrong credentials"
    }
}
console.log(yu("elbeg", "1234"))


// M2. A customer gets a discount if they are a member (isMember)
//     OR they spent more than 100000.
//     Print "Discount" or "Full price".
function ty(isMember, spent){
    if(isMember === true || spent >= 100000){
        return "Discount"
    }
    else{
        return "Full price"
    }
}
console.log(ty(true, 100000))


// M3. Entry is free if age is under 5 OR over 65. Otherwise paid.
//     Print "Free" or "Paid".
function rt(age){
    if(age <= 5 || age >= 65){
        return "Free"
    }
    else{
        return "Paid"
    }
}
console.log(rt(3))


// M4. A person may drive only if ALL are true:
//     age is 18+, hasLicense is true, AND isSober is true.
//     Print "Can drive" or "Cannot drive".
function er(age, hasLicense, isSober){
    if(age >= 18 && hasLicense === true && isSober === true){
        return "Can drive"
    }
    else{
        return "Can't drive"
    }
}
console.log(er(87, true, false))


// M5. Bring an umbrella if it isRaining,
//     OR if it isCloudy AND humidity is above 80.
//     Print "Umbrella" or "No umbrella".
function we(isRaining, isCloudy, humidity){
    if(isRaining === true || (isCloudy === true && humidity >= 80)){
        return "Umbrella"
    }
    else{
        return "No umbrella"
    }
}
console.log(we(true, true, 90))


/* ========================= HARD ========================= */
/* Operator precedence, ranges, and multi-part logic.
   Tip: when mixing && and ||, use parentheses to be explicit. */

// H1. Leap year. A year is a leap year if:
//     it is divisible by 4 AND not by 100,
//     OR it is divisible by 400.
//     Print "Leap year" or "Not a leap year".
//     After it works, mentally test: 1900 (no), 2000 (yes), 2023 (no).
function qw(year){
    if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
        return "Leap year"
    }
    else{
        return "Not a leap year"
    }
}
console.log(qw(2000))


// H2. A grade is "valid B" if score is at least 80 AND below 90.
//     Print "Grade B" or "Not B".
function as(score){
    if(score >= 80 && score <= 90){
        return "grade B"
    }
    else{
        return "not B"
    }
}
console.log(as(85))


// H3. Access the control panel only if the user isLoggedIn
//     AND (role is "admin" OR role is "moderator").
//     Print "Access granted" or "Access denied".
function sd(isLoggedIn, role){
    if (isLoggedIn && (role === "admin" || role === "moderator")) {
        return "Access granted";
    } else {
        return "Access denied";
    }
}
console.log(sd(true, "admin"))


// H4. Three side lengths form a valid triangle only if EVERY pair
//     of sides sums to more than the third side:
//     a+b > c AND b+c > a AND a+c > b.
//     Print "Valid triangle" or "Invalid triangle".
function df(a, b, c){
    if ((a + b >= c) && (b + c >= a) && (a + c >= b)) {
        return "Valid triangle";
    } else {
        return "Invalid triangle";
    }
}
console.log(df(1, 2, 3))


// H5. A password is "strong" if its length is at least 8
//     AND it contains a number OR a symbol.
//     (hasNumber and hasSymbol are given as booleans.)
//     Print "Strong" or "Weak".
function fg(length, hasNumber, hasSymbol){
    if (length >= 8 && hasNumber === true && hasSymbol === true) {
        return "Strong";
    } else {
        return "Weak";
    }
}
console.log(fg(10, true, false))
