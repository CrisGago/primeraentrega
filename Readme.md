# Postman
GET = Get Products
    http://localhost:8080/api/products/


GET = Get Products Limit    
    http://localhost:8080/api/products?limit=2


POST = Crear Productos
    http://localhost:8080/api/products/

    {
    "title": "modulo16",
    "description": "control",
    "code": "sp1016",
    "price": "20000",
    "status": "True",
    "stock": 10,
    "category": "A",
    "thumbnail": "img14" 
    }

PUT = Put Products    
    http://localhost:8080/api/products/11

    {
    
    "title": "modulo11",
    "code": "sp1011"
}

DEL = Del Products
    http://localhost:8080/api/products/11
    none

POST = Agregar Productos al carrito
    http://localhost:8080/api/carts/3/product/10

GET = Get Productos del Carrito    
    http://localhost:8080/api/carts/3

    {
    "status": "success",
    "payload": [
        {
            "product": 10,
            "quantity": 2
        }
    ]
}