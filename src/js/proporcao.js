coins = {
    'allCoins': [],
    'saleCoin': [],
    'buyCoin': []
}
setInterval(function () {
    getMoedas().then(printCoins)
}, 200);

async function getMoedas() {
    coins.allCoins = await fetch("https://www.binance.com/api/v3/ticker/price", {
        method: "GET"
    })
    coins.allCoins = await coins.allCoins.json()
}

function separarMoedas(coin) {
    for (const i in coins.allCoins) {
        let _coin = coins.allCoins[i].symbol.indexOf(coin)
        if (_coin > 2) {
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
        input.html("")
        $.each(coins.saleCoin, function (indexInArray, valueOfElement) {
            const ocoin = valueOfElement.symbol.split(coin)[0]
            input.append("<option value=" + indexInArray + ">" + ocoin + "</option>")
        });
    }
});

function printCoins() {
    if (coins.saleCoin.length != 0) {
        coins.buyCoin.forEach(element => {
        });
    }
}
function insertionSort(inputArr) {
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while ((j > -1) && (current.value < inputArr[j].value)) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
    }
    return inputArr;
}
function get_transition_coin(coin) {
    for (const i in coins.buyCoin) {
        if (coins.buyCoin[i].symbol.indexOf(coin) == 0) {
            return coins.buyCoin[i];
        }
    }

    return false
}
$("#moedaCompraInput").click(function (e) {
    let div = $("#moedas");
    div.html(" ");
    let _sale_coin = coins.saleCoin[$(this).val()];

    let _buy_coin = _sale_coin.symbol.split($("#moedaVendaInput").val().toUpperCase())[0]

    div.append("<div class='h4'>" + _sale_coin.symbol + ":" + _sale_coin.price + "</div>")
    let _transitions_coins = []
    for (const i in coins.saleCoin) {
        const _coin = coins.saleCoin[i].symbol.split($("#moedaVendaInput").val().toUpperCase())[0]
        if (_coin != _buy_coin) {
            let _coins_transition = get_transition_coin(_coin + _buy_coin, _sale_coin.price)
            if (_coins_transition) {
                _coins_transition.value = coins.saleCoin[i].price / _coins_transition.price
                _coins_transition.saleCoin = []
                _coins_transition.saleCoin.price = coins.saleCoin[i].price
                _coins_transition.saleCoin.symbol = coins.saleCoin[i].symbol


                _transitions_coins.push(_coins_transition)
            }
        }
    }
    insertionSort(_transitions_coins)


    for (const i in _transitions_coins) {
        div.append("<div class='bg-light col-auto mr-2 h5 mb-1 border border-dark'>" + _transitions_coins[i].saleCoin.symbol + ": " + _transitions_coins[i].saleCoin.price + "&darr;<br>" + _transitions_coins[i].symbol + ": " + _transitions_coins[i].price + "&uarr;<br>= " + _transitions_coins[i].value + "&darr;</div>")
    }
});