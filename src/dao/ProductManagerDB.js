import productModel from "./models/productModel.js";

class ProductManagerDB {
    async getAllProducts() {
        try {
            return await productModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findOne({_id: id});
            if (!product) 
                throw new Error(`El producto ${id} no existe!`);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async addProduct(productos) {
        const {title, description, code, price, stock, category, thumbnails} = productos;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        try {
            const result = await productModel.create({title, description, code, price, stock, category, thumbnails: thumbnails ?? []});
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async updateProduct(id, updateFields) {
        try {
            const result = await productModel.findByIdAndUpdate(id, updateFields, { new: true });
            if (!result) {
                throw new Error("Producto no encontrado");
            }
            return result;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.deleteOne({ _id: id });

            if (result.deletedCount === 0) throw new Error (`No fue posible eliminar el producto ${id}`);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error (`Error al eliminar el producto ${id}`);
        }
    }

    // async GetId() {
    //     try {
    //         const products = await productModel.find();
    //         const productslength = products.length;
    //         if (products.length > 0) {
    //             return parseInt(products[products.length - 1].id) + 1;
    //         }
    //         return 1;
    //     } catch (error) {
    //         console.error("Error al obtener ID:", error.message);
    //         throw error;
    //     }
    // }
};

export { ProductManagerDB };
