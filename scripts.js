const inputAmount = document.getElementById('amount')

inputAmount.oninput = () => {
    let value = inputAmount.value.replace(/\D/g, "")

    inputAmount.value = value
}