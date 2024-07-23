/** @format */

const inputWrappers = document.querySelectorAll('.input-wrapper')
const radioRepayment = document.getElementById('repayment')
const radioInterest = document.getElementById('interest')
const amountInput = document.getElementById('mortgage-amount')
const interestInput = document.getElementById('interest-rate')
const termInput = document.getElementById('mortgage-term')
const submitBtn = document.getElementById('submit')
let checkboxIsChecked = false

inputWrappers.forEach((wrapper) => {
	wrapper.addEventListener('click', (e) => {
		let target = wrapper.querySelector('input')
		target.parentElement.classList.add('active')
		target.focus()
		wrapper.classList.remove('active')
	})
})

function calculateRepayment() {
	let monthlyRepayment, monthlyInterest, loanAmount, numberOfMonth, euro
	monthlyInterest = interestInput.value / 100 / 12
	loanAmount = amountInput.value
	numberOfMonth = termInput.value * 12
	euro = '&euro'
	monthlyRepayment =
		(loanAmount * (monthlyInterest * (1 + monthlyInterest) ** numberOfMonth)) /
		((1 + monthlyInterest) ** numberOfMonth - 1)
	document.getElementById('monthly-result').innerHTML =
		'\u20AC' + ' ' + monthlyRepayment.toFixed(2)
	document.getElementById('total-repayment').innerHTML =
		'\u20AC' + ' ' + (monthlyRepayment * numberOfMonth).toFixed(2)
}

function calculateInterest() {
	let monthInterest, totalInterest, loanAmt, numberOfMonth
	monthInterest = interestInput.value / 100 / 12
	numberOfMonth = termInput.value * 12
	totalInterest = monthInterest * numberOfMonth

	document.getElementById('monthly-result').innerHTML =
		monthInterest.toFixed(4) + ' %'
	document.getElementById('total-repayment').innerHTML =
		totalInterest.toFixed(4) + ' %'
}



radioRepayment.parentElement.addEventListener('click', () => {
	radioRepayment.checked = true
	radioInterest.checked = false
	radioRepayment.parentElement.classList.add('active')
	radioInterest.parentElement.classList.remove('active')
	checkboxIsChecked = true
})
radioInterest.parentElement.addEventListener('click', () => {
	radioRepayment.checked = false
	radioInterest.checked = true
	radioRepayment.parentElement.classList.remove('active')
	radioInterest.parentElement.classList.add('active')
	checkboxIsChecked = true
})
radioRepayment.addEventListener('click', () => {
	radioRepayment.checked = true
	radioInterest.checked = false
	radioRepayment.parentElement.classList.add('active')
	radioInterest.parentElement.classList.remove('active')
	checkboxIsChecked = true
})
radioInterest.addEventListener('click', () => {
	radioRepayment.checked = false
	radioInterest.checked = true
	radioRepayment.parentElement.classList.remove('active')
	radioInterest.parentElement.classList.add('active')
	checkboxIsChecked = true
})

submitBtn.addEventListener('click', (e) => {
	e.preventDefault()
	if (amountInput.value == '') {
		document.getElementById('amount-err').style.display = 'block'
	} else if (termInput.value == '') {
		document.getElementById('term-err').style.display = 'block'
	} else if (interestInput.value == '') {
		document.getElementById('interest-err').style.display = 'block'
	} else if (checkboxIsChecked == false) {
		const radioParent = radioInterest.parentElement
		radioParent.parentElement.querySelector('.error').style.display = 'block'
	} else {
		document.getElementById('amount-err').style.display = 'none'
		document.getElementById('term-err').style.display = 'none'
		document.getElementById('interest-err').style.display = 'none'
		document.querySelector('.complete-state-display').style.display = 'block'
		document.querySelector('.default-display').style.display = 'none'
		if (radioRepayment.checked) {
			calculateRepayment()
		} else {
			calculateInterest()
		}
	}
})


document.getElementById('clr-All').addEventListener('click', function resetAll(){
	let activeElement = document.querySelectorAll('.input-wrapper')
	for(let i = 0; i < activeElement.length; i++){
		if(activeElement[i].classList.contains('active')){
			activeElement[i].classList.remove('active')
			checkboxIsChecked = false
		}
	}
	document.querySelector('form').reset();
	document.getElementById('amount-err').style.display = 'none'
	document.getElementById('term-err').style.display = 'none'
	document.getElementById('interest-err').style.display = 'none'
	document.querySelector('.complete-state-display').style.display = 'none'
	document.querySelector('.default-display').style.display = 'block'
})
