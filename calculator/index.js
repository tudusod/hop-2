const body = document.getElementById("fullBody")
const hariu = document.createElement("div")
let too1 = ""
let too2 = ""
let temdeg = ""
body.appendChild(hariu)


for(let i = 0; i <= 9; i++){
    const toonuud = document.createElement("button")
    toonuud.innerHTML = i

    body.appendChild(toonuud)

    toonuud.addEventListener("click", function(){
        if(temdeg === ""){
            too1 += i
            hariu.innerHTML = too1
        }
        else{
            too2 += i
            hariu.innerHTML = too2
        }
    })
}

const operations = ["+", "-", "*", "/", "=", "C"]
for(let i = 0; i < operations.length; i++){
    const calOperations = document.createElement("button")
    calOperations.innerHTML = operations[i]

    body.appendChild(calOperations)
    calOperations.addEventListener("click", function(){
        const op = operations[i]

        if(op === "C"){
            too1 = ""
            too2 = ""
            temdeg = ""
            hariu.innerHTML = ""
        }
        else if(op === "="){
            let n1 = Number(too1)
            let n2 = Number(too2)
            let bodolt = 0

            if(temdeg === "+"){
                bodolt = n1 + n2
                hariu.innerHTML = bodolt
                too1 = bodolt.toString()
                too2 = ''
                temdeg = ''

                console.log(too1, too2, temdeg)
            }
            else if(temdeg === "-"){
                bodolt = n1 - n2
                hariu.innerHTML = bodolt
                too1 = bodolt.toString()
                too2 = ''
                temdeg = ''
            }
            else if(temdeg === "*"){
                bodolt = n1 * n2
                hariu.innerHTML = bodolt
                too1 = bodolt.toString()
                too2 = ''
                temdeg = ''
            }
            else if(temdeg === "/"){
                bodolt = n1 / n2
                hariu.innerHTML = bodolt
                too1 = bodolt.toString()
                too2 = ''
                temdeg = ''
            }
        }

        else{
            temdeg = op
        }
    })
}

