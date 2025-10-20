const inputAmount = document.getElementById('amount')

inputAmount.oninput = () => {
    let value = inputAmount.value.replace(/\D/g, "")
    value = Number(value) / 100
    inputAmount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}