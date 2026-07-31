const orders = [
  { id: 1, customer: "Bat",  item: "Laptop",  qty: 1, price: 1200000, city: "Ulaanbaatar", paid: true },
  { id: 2, customer: "Sara", item: "Mouse",   qty: 4, price: 25000,   city: "Darkhan",     paid: false },
  { id: 3, customer: "Tem",  item: "Keyboard",qty: 2, price: 80000,   city: "Ulaanbaatar", paid: true },
  { id: 4, customer: "Bat",  item: "Monitor", qty: 3, price: 450000,  city: "Erdenet",     paid: true },
  { id: 5, customer: "Nara", item: "Cable",   qty: 10,price: 8000,    city: "Darkhan",     paid: false },
  { id: 6, customer: "Sara", item: "Laptop",  qty: 2, price: 1200000, city: "Ulaanbaatar", paid: true }
];

// Return an array of order totals (qty * price) for each order.
// Return strings like "Order 1: Laptop x1" for every order.
// Return each order's total, but add 10% tax (qty * price * 1.1).
// Return an array of objects with only { customer, total } for each order (total = qty × price).

const totals = orders.map((order, index) => {
    return order.qty * order.price
})
console.log(totals)

const strings = orders.map((orderuud, index) => {
    return "Order " + orderuud.id + ": " + orderuud.item + " " + "x" + orderuud.qty 
})
console.log(strings)

const totalsuud = orders.map((ordersuud, index) => {
    return (ordersuud.qty * ordersuud.price) * 1.1
})
console.log(totalsuud)

const object = orders.map((orderlt, index) => {
    let niilber = orderlt.qty * orderlt.price
    return orderlt.customer + ", " + niilber
})
console.log(object)

// Return orders that are unpaid.
// Return orders where the total (qty * price) is over 500000.
// Return orders from Ulaanbaatar that are paid.
// Return orders where qty is 3 or more AND the item is not "Cable".
// Return orders NOT from Darkhan.

const unpaid = orders.filter((product, index) => {
    if(product.paid === false){
        return true
    }
})
console.log(unpaid)

const overprice = orders.filter((productuud, index) => {
    if(productuud.qty * productuud.price > 500000){
        return true
    }
})
console.log(overprice)

const notPaid = orders.filter((qwe, index) => {
    if(qwe.city === "Ulaanbaatar" && qwe.paid === true){
        return true
    }
})
console.log(notPaid)

const cable = orders.filter((cabluud, index) => {
    if(cabluud.qty >= 3 && cabluud.item !== "Cable"){
        return true
    }
})
console.log(cable)

const darhan = orders.filter((darhans, index) => {
    if(darhans.city !== "Darkhan"){
        return true
    }
})
console.log(darhan)