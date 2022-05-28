function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function isEmpty(object) {
    //проверка корзины на пустоту
    return !!Object.keys(object).length
}


$(document).ready(function () {
    loadCart();
});