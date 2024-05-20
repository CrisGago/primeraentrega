import mongoose from "mongoose";
import cartModel from "./models/cartModel.js";
import productModel from "./models/productModel.js";

class CartManagerDB {

    async getAllcarts() {
        try {
            return await cartModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al buscar los carritos");
        }
    }

    async addCart() {
        try {
            const newCart = await cartModel.create({ products: [] });
            return { code: 200, status: `Carrito agregado con id: ${newCart._id}` };
        } catch (error) {
            console.error(error);
            return { code: 500, status: "Error al agregar carrito" };
        }
    }

    async getProductsOfCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            return cart ? cart.products : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { code: 404, status: "Carrito no encontrado" };
            }
    
            const productIndex = cart.products.findIndex(product => product.product === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            return { code: 200, status: "Producto agregado al carrito" };
        } catch (error) {
            console.error(error);
            return { code: 500, status: "Error al agregar producto al carrito" };
        }
    }  

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { code: 404, status: "Carrito no encontrado" };
            }

            const productIndex = cart.products.findIndex(product => product.product === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                return { code: 200, status: "Cantidad del producto actualizada en el carrito" };
            } else {
                return { code: 404, status: "Producto no encontrado en el carrito" };
            }
        } catch (error) {
            console.error(error);
            return { code: 500, status: "Error al actualizar la cantidad del producto en el carrito" };
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { code: 404, status: "Carrito no encontrado" };
            }

            const productIndex = cart.products.findIndex(product => product.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                await cart.save();
                return { code: 200, status: "Producto eliminado del carrito" };
            } else {
                return { code: 404, status: "Producto no encontrado en el carrito" };
            }
        } catch (error) {
            console.error(error);
            return { code: 500, status: "Error al eliminar el producto del carrito" };
        }
    }

    async removeAllProductsFromCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { code: 404, status: "Carrito no encontrado" };
            }

            cart.products = [];
            await cart.save();
            return { code: 200, status: "Todos los productos eliminados del carrito" };
        } catch (error) {
            console.error(error);
            return { code: 500, status: "Error al eliminar todos los productos del carrito" };
        }
    }
}

export { CartManagerDB };
