var orders = [
  {
    id: 1,
    customer: { name: "Bat", city: "Ulaanbaatar", vip: true },
    items: [
      { product: "Laptop", qty: 1, price: 1200000 },
      { product: "Mouse",  qty: 2, price: 25000 }
    ],
    paid: true
  },
  {
    id: 2,
    customer: { name: "Sara", city: "Darkhan", vip: false },
    items: [
      { product: "Keyboard", qty: 3, price: 80000 }
    ],
    paid: false
  },
  {
    id: 3,
    customer: { name: "Tem", city: "Ulaanbaatar", vip: false },
    items: [
      { product: "Monitor", qty: 2, price: 450000 },
      { product: "Cable",   qty: 5, price: 8000 }
    ],
    paid: true
  },
  {
    id: 4,
    customer: { name: "Nara", city: "Erdenet", vip: true },
    items: [
      { product: "Laptop", qty: 2, price: 1200000 }
    ],
    paid: true
  },
  {
    id: 5,
    customer: { name: "Bat", city: "Ulaanbaatar", vip: true },
    items: [
      { product: "Cable", qty: 10, price: 8000 }
    ],
    paid: false
  }
];

// Return an array of just the customer names (item.customer.name).
// Return strings like "Bat from Ulaanbaatar" for each order.
// Return an array of how many products are in each order (item.items.length).

const names = orders.map((name, index) => {
    return name.customer.name
})
console.log(names)

const bat = orders.map((bats, index) => {
    return bats.customer.name + " from " + bats.customer.city
})
console.log(bat)

const product = orders.map((item, index) => {
    return item.items.length
})
console.log(product)

// Get the names of all VIP customers who have paid.
// Get the cities of every unpaid order,
// Get "<name>: <count> items" strings, but only for orders with 2 or more products.

const vip = orders.filter((ner, index) => {
    if(ner.customer.vip === true && ner.paid === true){
        return true
    }
})
console.log(vip)

const cities = orders.filter((citiess, index) => {
    if(citiess.paid !== true){
        return true
    }
})
    .map((citiess, index) => {
        return `${citiess.customer.city}`
    })
console.log(cities)

const largeOrder = orders.filter((zahialga, index) => {
        if (zahialga.items.length >= 2) {
            return true;
        }
    })
    .map((zahialga, index) => {
        return `${zahialga.customer.name}: ${zahialga.items.length} items`;
    })

console.log(largeOrder);

// Return each order's grand total. Each order has multiple items, so inside your .map() you need to sum qty * price across item.items. Return objects like { id, total }

const grand = orders.map((qwe, index) => {
    let niilber = 0

    for(let baraa of qwe.items){
        niilber += baraa.qty * baraa.price
    }
    return "id: " + qwe.id + ", " + niilber
}) 
console.log(grand)