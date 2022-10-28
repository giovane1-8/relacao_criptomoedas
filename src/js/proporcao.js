moedas = []
moeda1 = []
setInterval(function () {
    getMoedas()
    printDados()

}, 800);

async function getMoedas() {
    moedas = await fetch("https://www.binance.com/api/v3/ticker/price", {
        method: "GET"
    });
    moedas = await moedas.json()
}


function separarMoedas(coin) {
    for (var i = 0; i < moedas.length; i++) {
        if (moedas[i].symbol.match("/" + coin + "/")) {
            moeda1.push(moedas[i]);
            console.log("Achou")
        }
    }
}

function printDados() {
    var div = $("#moedas");
    div.html(" ")
    moedas.forEach(element => {
        div.append("Moeda: " + element.symbol + " Preço: " + element.price + "<br>")
    });
}