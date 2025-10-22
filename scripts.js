const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const amount = document.getElementById('amount')
const expenseList = document.getElementById('expense-list')

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

        expenseItem.append(expenseIcon, expenseInfo)
        expenseList.prepend(expenseItem)
    } catch (error) {
        console.log(error)
        alert('Não foi possivel atualizar a lista.')
    }
}