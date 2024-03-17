import fs from "fs/promises";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.initialize();
    }

    async initialize() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error("Error al leer", error.message);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar en el archivo:", error.message);
        }
    }

    async addProduct(title, description, code, price, stock, category, thumbnail) {
        try {
            const id = await this.GetId();
            
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].code === code) {
                    console.log(`El código ${code} ya existe`);
                    return;
                }
            }

            const newProduct = {
                id: id, //agrega el id generado en Getid
                title,
                description,
                code,
                price,
                status: true, //true por defecto
                stock,
                category,
                thumbnail,
            };
            console.log("Nuevo producto a agregar:", newProduct);


            if (!Object.values(newProduct).every(value => value !== undefined && value !== null && value !== "")) {
                console.log("Completar todos los campos obligatorios");
                return;
            }

            this.products.push(newProduct);
            await this.saveToFile();
            return "El producto se agregó correctamente!";
        } catch (error) {
            console.error("Error al agregar producto:", error.message);
            return "Error al agregar producto";
        }
    }
    
    async getProducts() {
        try {
            await this.initialize();
            return this.products;
        } catch (error) {
            console.error("Error al obtener productos:", error.message);
            return [];
        }
    }

    async getProductById(id) {
        try {
            await this.initialize();
            const product = this.products.find((producto) => producto.id === id);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async updateProduct(id, updateFields) {
        try {
            await this.initialize();
            const index = this.products.findIndex((producto) => producto.id == id);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }
            this.products[index] = {
                ...this.products[index],
                ...updateFields,
            };
            await fs.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            const updateProduct = this.products[index];
            return updateProduct;
            
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct (id) {
        const productos = await this.getProducts();
        const initLength = productos.length;

        const productosProccesed = productos.filter(productos => productos.id != id);

        const finalLength = productosProccesed.length;

        try {
            if (initLength == finalLength) {
                throw new Error(`No fue posible eliminar el usuario ${id}`);
            }

            await fs.writeFile(this.path, JSON.stringify(productosProccesed, null, "\t"));

            return `El usuario ${id} fue eliminado correctamente`;

        } catch(e) {
            return e.message;
        }

    }
    async GetId() {
        try {
            await this.initialize();
            if (this.products.length > 0) {
                return parseInt(this.products[this.products.length - 1].id) + 1;
            }
            return 1;
        } catch (error) {
            console.error("Error al obtener ID:", error.message);
            throw error;
        }
    }
}
