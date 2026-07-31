var products = [
  { name: "Milk", price: 2500, category: "dairy", inStock: true },
  { name: "Bread", price: 1200, category: "bakery", inStock: true },
  { name: "Cheese", price: 8000, category: "dairy", inStock: false },
  { name: "Apple", price: 500, category: "fruit", inStock: true },
  { name: "Cake", price: 15000, category: "bakery", inStock: false },
  { name: "Banana", price: 800, category: "fruit", inStock: true }
];

// Use .map() to return an array of just the product names.
// Use .map() to return an array of just the prices.
// Use .map() to return an array of names in UPPERCASE.
// Use .map() to return prices increased by 10% (price * 1.1).
// Use .map() to return an array of strings like "Milk - 2500".
const names = products.map((product, index) => {
  return product.name
})
console.log(names)

const prices = products.map((product, index) =>{
  return product.price
})
console.log(prices)

const upperNames = products.map((product, index) =>{
  return product.name.toUpperCase()
})
console.log(upperNames)

const increasedPrices = products.map((product, index) => {
  return product.price * 1.1
})
console.log(increasedPrices)

const string = products.map((product, index) => {
  return product.name + " " + "-" + " " + product.price
})
console.log(string)

// Use .filter() to return only products that are inStock.
// Use .filter() to return only products cheaper than 2000.
// Use .filter() to return only products in the "dairy" category.
// Use .filter() to return products that are NOT in stock.
// Use .filter() to return products priced between 1000 and 10000.

const inStockProducts = products.filter((product, index) => {
  if(product.inStock === true){
    return true
  }
});
console.log(inStockProducts)

const cheaper = products.filter((product, index) => {
  if(product.price < 2000){
    return true
  }
})
console.log(cheaper)

const dairy = products.filter((products, index) => {
  if(products.category === "dairy"){
    return true
  }
})
console.log(dairy)

const NotinStockProducts = products.filter((product, index) => {
  if(product.inStock === false){
    return true
  }
});
console.log(NotinStockProducts)

const priced = products.filter((product, index) => {
  if(product.price >= 1000 && product.price <= 10000){
    return true
  }
});
console.log(NotinStockProducts)