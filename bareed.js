/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = point => {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  };

  equals = point => point.x === this.x && point.y === this.y;

  static randomPoint = (maxX, maxY) => {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  };
}

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money = 0) { this.money=money}

  credit = amount => {this.money+=amount};

  debit = amount => {this.money-=amount};
}

/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person extends Point {
  // implement Person!
  constructor(name ,x, y) {
    super(x ,y )
    this.name=name;
    this.x = x;
    this.y = y;
    //if (x != 0 || y != 0)
       this.location= new Point(x, y);
   // else{
    //  this.location= false
    //}
    this.wallet=new Wallet(0)
    
  }

  moveTo = point => {
    this.location= point

  }
}

/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor  extends Person {
  // implement Vendor!
  constructor(name ,x, y) {
    super( name ,x ,y )
    this.name=name;
    this.x = x;
    this.y = y;
    this.location=new Point(x, y);
    this.wallet=new Wallet(0)
    this.range= 5;
    this.price=1;

}
moveTo = point => {
  this.location= point

}


sellTo = (customer, numberOfIceCreams) => {
 // this.location= point
 //let vendorMoney = Math.floor(Math.random() * 100);
 //let newPrice= Math.floor(Math.random() * 100);
  customer.location= this.location
  let expectedCost = numberOfIceCreams * this.price;
  customer.wallet.debit(expectedCost);
  this.wallet.credit(expectedCost)
 // expectedCost = numberOfIceCreams * newPrice
 // customerMoney = Math.floor(expectedCost + Math.random() * 100);
  //customer.wallet.money = customerMoney;

  //let expectedCustomerMoney = customerMoney - expectedCost;
  //    let expectedVendorMoney = vendorMoney + expectedCost;

}
}

/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  constructor(name ,x, y) {
    super( name ,x ,y )
    this.name=name;
    this.x = x;
    this.y = y;
    this.location=new Point(x, y);
    this.wallet=new Wallet(10)
    //this.range= 5;
    this.price=1;

}
moveTo = point => {
  this.location= point

}

_isInRange= vendor => {
  //vendor.range
  //vendor.range = range;

  //const range =customerLocation.distanceTo(vendorLocation) + Math.random() * (isInRange ? 10 : -10);


  const customerLocation = this.location
  const vendorLocation = vendor.location
  const isInRange = Math.random() > 0.5;
   const range = customerLocation.distanceTo(vendorLocation) 
   //+ Math.random() * (isInRange ? 10 : -10); t
   // if (range> 0 ||range< 0) {
   //   return false
   // }else{
   //   return true 
   // }
   if (range<= vendor.range){
     return true
   }else{
     return false
   }
}

_haveEnoughMoney=(vendor, numberOfIceCreams)=> {

    let price= vendor.price;
    let money = this.wallet.money ;
    let total = price* numberOfIceCreams;
    if (total<= money){
      return true
    }else{
      return false
    }
}
  // implement Customer!

requestIceCream=(vendor, numberOfIceCreams)=>{
  if (this._isInRange(vendor) && this._haveEnoughMoney(vendor, numberOfIceCreams)){
    vendor.sellTo(this,numberOfIceCreams)
    console.log(" the request failed - because is too far away or does not have Enough Money")
  }

  }
}

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
let vendorAsis = new Vendor("Asis", 10, 10); // create a new vendor named Asis at location (10,10)
let nearbyCustomer = new Customer("MishMish", 11, 11); // create a new customer named MishMish at location (11,11)
let distantCustomer = new Customer("Hamsa", 1000, 1000); // create a new customer named Hamsa at location (1000,1000)
let brokeCustomer = new Customer("Maskeen", 12, 12); // create a new customer named Maskeen at location (12,12)

brokeCustomer.wallet.money = 0; // steal all of Maskeen's money

nearbyCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// money was transferred from MishMish to Asis
nearbyCustomer.wallet.money; // 0 left
vendorAsis.wallet.money; // 10
// Asis moved to MishMish's location
vendorAsis.location; // { x: 11, y: 11 }

distantCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// no money was transferred because the request failed - Hamsa is too far away
distantCustomer.wallet.money; // 10 left
vendorAsis.wallet.money; // still only 10
// Asis didn't move
vendorAsis.location; // { x: 11, y: 11 }

brokeCustomer.requestIceCream(vendorAsis, 1); // ask to buy 1 ice creams from Asis
// no money was transferred because the request failed - Maskeen doesn't have enough money to buy even one ice cream :(
brokeCustomer.wallet.money; // 0
vendorAsis.wallet.money; // still only 10
// Asis didn't move
vendorAsis.location; // { x: 11, y: 11 }