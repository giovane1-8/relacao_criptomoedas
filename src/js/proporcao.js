coins = {
    'allCoins': [],
    'saleCoin': [],
    'buyCoin': []
}
setInterval(function () {
    getMoedas();
    printAllCoins();

}, 1000);

async function getMoedas() {
    coins.allCoins = await fetch("https://www.binance.com/api/v3/ticker/price", {
        method: "GET"
    });
    coins.allCoins = await coins.allCoins.json()
}

function separarMoedas(coin) {
    for (const i in coins.allCoins) {
        if (coins.allCoins[i].symbol.includes(coin)) {
            coins.saleCoin.push(coins.allCoins[i]);
        } else {
            coins.buyCoin.push(coins.allCoins[i]);
        }
    }
}

$("#moedaVendaInput").keypress(function (e) {
    if (e.keyCode == 13) {
        coins.saleCoin = []
        coins.buyCoin = []
        let coin = ($(this).val()).toUpperCase()
        separarMoedas(coin)

        let input = $("#moedaCompraInput")
        $.each(coins.saleCoin, function (indexInArray, valueOfElement) {
            const ocoin = valueOfElement.symbol.split(coin)[0]
            input.append("<option value=" + ocoin + ">" + ocoin + "</option>")
        });
    }
});

function printAllCoins() {
    var div = $("#moedas");
    div.html(" ")
    coins.allCoins.forEach(element => {
        div.append("Moeda: " + element.symbol + " Preço: " + element.price + "<br>")
    });
}
$("#moedaCompraInput").click(function (e) {
    console.log($(this).val())
});