function conversao_compra_moeda(quantia_investimento, valor_unidade_moeda) {
    return quantia_investimento / valor_unidade_moeda;
}

function comparacao_conversao_compra(moeda_final, moeda_final_transicao, valor_investimento, valor_moeda_trasicao) {
    result = $("#resultado");
    transacao1 = conversao_compra_moeda(valor_investimento, moeda_final)
    transacao2 = conversao_compra_moeda (valor_investimento, valor_moeda_trasicao)
    result.html(valor_investimento + " BRL -> " + transacao1 + " GALA<br>" + valor_investimento + " BRL -> " + transacao2 + " BTC -> " + conversao_compra_moeda(transacao2, moeda_final_transicao)+" GALA");
}
