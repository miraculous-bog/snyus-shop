const localCart = JSON.parse(localStorage.getItem("cart"));

document.getElementById("product-count").innerText = String(Object.keys(localCart).length);

$.getJSON('goods.json', (data) => {
    const productSummary = document.getElementById("products-summary");
    const html = Object.keys(localCart).map(id =>
        `<p><a href="#">${data[id].name}</a> <span class="price">${Number.parseInt(data[id].cost) * localCart[id]}</span></p>`
    );
    html.push('<hr class="hr" />')
    html.push(`<p>Всего <span class="price" style="color:black"><b>${Object.keys(localCart)
        .reduce((price, id) => Number.parseInt(data[id].cost) * localCart[id] + price, 0)}</b></span></p>`)
    productSummary.insertAdjacentHTML("beforeend", html.join("\n"))
})

/*                              <p><a href="#">Мaison Margiela</a> <span class="price">145</span></p>
                              <p><a href="#">Мaison Margiela2</a> <span class="price">145</span></p>
                              <p><a href="#">Мaison Margiela</a> <span class="price">145</span></p>
                              <p><a href="#">Мaison Margiela</a> <span class="price">145</span></p>
                              <hr class="hr">
                              <p>Всего <span class="price" style="color:black"><b>580</b></span></p>*/