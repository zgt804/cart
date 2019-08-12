"use strict"

window.onload = function () {


    let carts = [];
    let items = [
        {
            name : 'Товар 1',
            amount : 5,
            price : 560
        },
        {
            name : 'Товар 2',
            amount : 8,
            price : 320
        },
        {
            name : 'Товар 3',
            amount : 3,
            price : 200
        },
        {
            name : 'Товар 4',
            amount : 1,
            price : 1000
        },
        {
            name : 'Товар 5',
            amount : 15,
            price : 100
        },
    ];

    let cartBlock = document.getElementById('cart');
    let itemsBlock = document.getElementById('items');
    let sumBlock = document.getElementById('sum');

    function addDivCart() {

        for(const cart of carts) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('cart_item');
            let fragment = new DocumentFragment();

            for(let key in cart) {
                let divInside = document.createElement('div');
                let divP = document.createElement('p');
                divInside.className = 'item_inside';
                divP.className = 'cntr';
                divP.innerText = cart[key];
                divInside.append(divP);
                fragment.append(divInside);
            }

            newDiv.append(fragment);
            cartBlock.append(newDiv);

            newDiv.onclick = () => {
                itemReturn(cart);
            }
        }
    }


    function addDivItem() {

        for(const item of items) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');
            let fragment = new DocumentFragment();

            for(let key in item) {
                let divInside = document.createElement('div');
                let divP = document.createElement('p');
                divInside.className = 'item_inside';
                divP.className = 'cntr';
                divP.innerText = item[key];
                divInside.append(divP);
                fragment.append(divInside);
            }

            newDiv.append(fragment);
            itemsBlock.append(newDiv);

            newDiv.onclick = () => {
                cartAdd(item);
            }
        }
    }


    function calcSum() {
        let sum = 0;

        for(let i = 0; i < carts.length; i++) {
            sum += carts[i].amount * carts[i].price;
        }

        sum = '<div class=bordered><p class=cntr>Итого: ' + sum + ' руб</p></div>';
        sumBlock.innerHTML = sum;
    }


    function cartRefresh() {
        while (itemsBlock.firstChild) {
            itemsBlock.removeChild(itemsBlock.firstChild);
        }

        addDivItem();

        while (cartBlock.firstChild) {
            cartBlock.removeChild(cartBlock.firstChild);
        }

        addDivCart();

        calcSum();
    }

    function cartAdd(itemc) {

        if(itemc.amount != 0) {
            itemc.amount = itemc.amount - 1;
            if(carts.length != 0) {
                let findThem = carts.find(item => item.name == itemc.name);
                if(findThem) {
                    findThem.amount = findThem.amount + 1;
                } else {
                    carts[carts.length] = Object.assign({}, itemc);
                    carts[carts.length-1].amount = 1;
                }
            } else {
                carts[0] = Object.assign({}, itemc);
                carts[0].amount = 1;
            }
        }

        cartRefresh();
    }


    function itemReturn(cart) {

        cart.amount = cart.amount - 1;
        let j = 0;

        let findThem = items.find(item => item.name == cart.name);
        findThem.amount = findThem.amount + 1;
                
        if(cart.amount == 0) {
            let i = carts.indexOf(cart, 0);
            carts.splice(i,1);
        }

        cartRefresh();
    }

    cartRefresh();
}