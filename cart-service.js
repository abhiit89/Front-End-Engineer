angular.module('services.cart', [])
    .service('Cart', ['$rootScope', 'Reviewer', function ($rootScope, Reviewer) {
        /*
         * Function to fetch the cart from the localStorage, if it exists
         */
        var getCart = function () {
            if (localStorage.getItem("cart") != null) {
                var cart = JSON.parse(localStorage.getItem("cart"));
                return cart;
            }
            else {
                return false;
            }
        };

        /*
         * Function to add item to the cart
         */
        var addItem = function (item, quantity, cart) {
            if (!cart && !item && !quantity) {
                return;
            }
            cart.item = quantity;
            return cart;
        };

        /*
         * Function to add multiple items to the cart.
         * Multiple items are passed as an object items in argument to the function addItems.
         * items object contains key value pair as item and its quantity
         */
        var addItems = function (items, cart) {
            if (!items && !cart) {
                return;
            }
            angular.forEach(items, function (value, key) {
                cart[key] = value;
            });
            return cart;
        };

        /*
         * Function to save the cart to the localStorage, after checking if it can be persisted,
         * through Reviewer Service
         */
        var save = function (cart) {
            if (!cart) {
                return;
            }
            if (Reviewer(cart)) {
                persist(cart);
                return true;
            }
            else {
                return false;
            }
        };

        /*
         * Remove the items from the cart
         */
        var remove = function (item, cart) {
            if (!item && !cart) {
                return;
            }
            if (!cart) {
                var cart = JSON.parse(localStorage.getItem("cart"));
                delete cart.item;

            }
            else {
                delete cart.item;
            }
            persist(cart);
        };

        /*
         * Clears the Cart from the localStorage
         */
        var clear = function () {
            localStorage.removeItem("cart");
        };

        /*
         * Save the Cart to the localStorage
         */
        var persist = function (cart) {
            if (!cart) {
                return;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        };

        /*
         * Change the quantity of an Item in the Cart
         */
        var changeQuantity = function (item, quantity, cart) {
            if (!cart) {
                var cart = JSON.parse(localStorage.getItem("cart"));
                cart[item] = quantity;
            }
            else {
                cart[item] = quantity;
            }
            persist(cart);
        };

        /*
         * Notifies the application that the cart has been persisted.
         */
        var refresh = function (cart) {
            return Reviewer(cart);
        };
    }]);
