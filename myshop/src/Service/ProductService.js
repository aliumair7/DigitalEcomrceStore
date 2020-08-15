import GenericService from "./GenericService";
class ProductsService extends GenericService {
 
  //these requests for products
  addProduct = (data) => this.post("/products/newproduct", data);//create new product request
  addnewprodduct=(data)=> this.post("/products",data)//create product
  deleteProduct = (_id) => this.delete("/products/" + _id);//delete product request
  updateProduct = (_id, data) => this.put("/products/updates/" + _id, data);//update product request
  getProducts = (page=1,perPage=10) => this.get("/products?page="+page+ "&perPage=" + perPage  );//get all products
  getSingleProduct = (id) => this.get("/products/" + id);//get single product by id request
  
  //these request for cart in cookies
//getcart=(_id)=> this.gets("/products/carts/" +_id)
//removecart=(_id)=> this.get("/products/carts/remove/"+_id)
//getcartpro=()=> this.get("/cart/products")

//this request for making purchase or order
purchase_product=(data) => this.post("/products/payment", data)//purchase request

//requests for carts 
postdbcart=(_id)=> this.post("/carts/"+_id);//add product to cart request
getdbcarts=()=>  this.get("/carts")//get carts produtc request
deldbcart=(_id)=>   this.delete("/carts/delcarts/"+_id)//delte carts products request
removeallcarts=()=>this.get("/carts/cartsallremove")  //delete all items of carts request
cartinc_qty=(_id)=> this.puts("/carts/cartqtyinc/"+ _id)//increment cart product qty request 
cartdec_qty=(_id)=> this.puts("/carts/cartqtydec/"+ _id)//decrement cart product qty request

//these request for order 
getlastdy=()=> this.get("/orders/getlastdaydeposit") //get today deposit request
  getallorders=()=> this.get("/orders/getorders")// get all orders request
  getspecificorders=()=> this.get("/orders/getspecificorders")//get some specific orders request
  gettendaysdeposit=()=>this.get("/orders/gettendaydeposit")//get last 10 day orders
  gettewentydaysdeposit=()=>this.get("/orders/gettewenty")//get last 20 day orders
  getthirtydaysdeposit=()=>this.get("/orders/getthirty")//get last 30 day orders
  getfortydaysdeposit=()=>this.get("/orders/getforty")//get last 40 day orders
  getfiftydaysdeposit=()=>this.get("/orders/getfifty")//get last 50 day orders
  getsixetydaysdeposit=()=>this.get("/orders/getsixety")//get last 60 day orders

  
  
  

}



let productService = new ProductsService();
export default productService;