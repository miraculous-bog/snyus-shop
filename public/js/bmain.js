var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    /*    $.getJSON("goods.json", goodsOut2);*/
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {

    let out = '';
    for (var key in data) {
        out += '<div class="trade-block anim-items anim-no-hide">';
        out += `<h2 class="eng eng2 hide-this">${data[key].name}</h2>`;
        out += `<img src="${data[key].img}" onclick="toggle()">`;
        /*			if (data[key].top === 1) {
                        out +=`<div class="top-product"><p>хит</p></div>`;
                    }*/
        out += '<div class="hover-block">';
        out += `<h2 class="eng">${data[key].name}</h2>`;
        out += `<div class="trade-ico"><img src="${data[key].img}" class="passive"><a href="#" onclick="toggle()"><img src="img/magnifier.png"></a>
                <a href="#" class="add-to-cart" data-id="${key}"><img src="img/basket.png"></a></div>`;
        out += '</div>';
        out += `<p class="pricehide hide-this">${data[key].cost} &#8372;</p>`;
        out += `<a href="#" class="add-to-cart a-trade hide-this" data-id="${key}">в корзину</a>`;
        out += '</div>';
    }
    $('.tradeNet').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart(event) {
    //добавляем товар в корзину
    event.preventDefault();

    var carting = $('.basketImg');
    var imgtodrag = $(this).parent().find("img").eq(0); // TODO ???
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
                'top': carting.offset().top + 10,
                'left': carting.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1000, 'easeInOutExpo');
    
        setTimeout(function () {
            carting.effect("shake", {
                times: 2
            }, 200);
        }, 1500);
    
        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id] === undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    } else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
    loadCart();
}

function showMiniCart() {
    //показываю мини корзину
    var out = "";
    for (var key in cart) {
        out += key + ' --- ' + cart[key] + '<br>';
    }
    $('.mini-cart').html(out);
}

$(document).ready(function () {
    init();
    loadCart();
});

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        $('.counter-bas').html(Object.keys(cart).length);
        showCart();
    } else {
        $('.wrapper-info-basket').html('Корзина пуста!');
    }
}

const cartLink = document.getElementById("cart-link")
if (cartLink) cartLink.addEventListener("click", showCart)

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.wrapper-info-basket').html('Корзина пуста!');
    } else {
        $.getJSON('goods.json', function (data) {
            const goods = data;
            let out = '';
            out += `<h3>Товары в корзине</h3><div class="one-tov">`;
            for (const id in cart) {
                out += `<div class="item">`;
                out += `<div class="buttons del-goods" data-id="${id}"><span class="delete-btn"></span></div>`;
                out += `<div class="pop-img">`;
                out += `<img src="${goods[id].img}" alt="">`;
                out += `</div>`;
                out += `<h2>${goods[id].name}</h2>`;
                out += `<div class="sum-product">`;
                out += `<p>${goods[id].cost} грн</p>`;
                out += `<div class="quantity">`;
                out += `<button class="minus-btn minus-goods2" data-id="${id}" type="button" name="button">`;
                out += `<img src="img/minus.svg" data-id="${id}" alt="" />`;
                out += `</button>`;
                out += `<p>${cart[id]}</p>`;
                out += `<button class="plus-btn plus-goods2" data-id="${id}" type="button" name="button">`;
                out += `<img src="img/plus.svg" data-id="${id}" alt="" />`;
                out += `</div>`;
                out += `<p class="fix-p">${cart[id] * goods[id].cost} грн</p>`;
                out += `</div>`;
                out += `<div class="close-this"></div>`;
                out += `<div class="clear"></div></div>`;
            }
            out += `<div class="total-point"><h3>Итог
                        <span>${Object.keys(cart).map(id => +cart[id] * +goods[id].cost).reduce((p, c) => p + c, 0)}</span>
                    </h3></div>`;
            out += `<a href="form.html"><div class="tbuy" id="tbuy"><h3>Оформить заказ</h3></div></a>`;
            $('.wrapper-info-basket').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods2').on('click', plusGoods);
            $('.minus-goods2').on('click', minusGoods);
        });
        $.getJSON('goods.json', function (data) {
            let goods = data;
            let out = '';
            let coc = 0;
            for (const id in cart) {
                coc += cart[id] * goods[id].cost;
            }
            out += `<h3>Вместе<span>${coc}грн</span></h3>`;
            $('.tinfo').html(out);

        });
    }
}

function delGoods() {
    //удаляем товар из корзины
    const id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods(e) {
    //добавляет товар в корзине
    const id = e.target.dataset.id;
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods() {
    //уменьшаем товар в корзине
    const id = $(this).attr('data-id');
    if (cart[id] === 1) {
        delete cart[id];
    } else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function isEmpty(object) {
    //проверка корзины на пустоту
    return !!Object.keys(object).length
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function sendOrder(e) {
    e.preventDefault()
    const email = document.getElementById("email").value
    const name = document.getElementById("ename").value
    const phone = document.getElementById("ephone").value
    axios.post(`/api/order`, {order: cart, email, name, phone})
}
document.getElementById("order-form").addEventListener("submit", sendOrder)