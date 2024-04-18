import cartModel from "./models/cartModel.js";

class CartManagerDB {
    async addCart() {
        try {
            const newCart = await cartModel.create({ products: [] });
            return { code: 200, status: `Carrito agregado con id: ${newCart._id}` };
        } catch (error) {
            console.log(error);
            return { code: 500, status: "Error al agregar carrito" };
        }
    }

    async getProductsOfCartById(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart ? cart.products : false;
        } catch (error) {
            console.log(error);
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
            console.log(error);
            return { code: 500, status: "Error al agregar producto al carrito" };
        }
    }
}

export { CartManagerDB };
