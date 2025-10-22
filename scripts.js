const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const amount = document.getElementById('amount')
const expenseList = document.getElementById('expense-list')
const accountantExpense = document.querySelector('aside header p span')
const expenseTotal = document.querySelector('aside header h2')

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    value = Number(value) / 100
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        crated_at: new Date(),
    }

    addExpense(newExpense)
}

function addExpense(newExpense) {
    try {
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        const expenseInfo = document.createElement('div')
        const infoName = document.createElement('strong')
        infoName.textContent = newExpense.expense
        const infoCategory = document.createElement('span')
        infoCategory.textContent = newExpense.category_name
        expenseInfo.append(infoName, infoCategory)

        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const removeBtn = document.createElement('img')
        removeBtn.classList.add('remove-icon')
        removeBtn.setAttribute('src', './img/remove.svg')
        removeBtn.setAttribute('alt', 'remover')

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeBtn)
        expenseList.prepend(expenseItem)
        updateTotals()
    } catch (error) {
        console.log(error)
        alert('Não foi possivel atualizar a lista.')
    }
}

function updateTotals() {
    try {
        const items = expenseList.children
        accountantExpense.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`

        let total = 0
        for(let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount')
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.')

            value = parseFloat(value)
            if(isNaN(value)) {
                return alert('Erro ao calcular o total.')
            }
            total += Number(value)
        }

        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        total = formatCurrencyBRL(total).toUpperCase().replace('R$', '')
        expenseTotal.innerHTML = ''
        expenseTotal.append(symbolBRL, total)
    } catch (error) {
        console.log(error)
        alert('Não foi possível atualizar o número de despesas')
    }
}