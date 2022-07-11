//Инициация всех подсказок
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

const activeForm = function() {
    const forms = document.querySelectorAll('.form-pay');
    if (!forms) {
        return;
    }

    for (let form of forms) {
        const sum = form.querySelector('.pay-sum');
        const min = form.querySelector('.pay-form__red.min').innerHTML;
        const max = form.querySelector('.pay-form__red.max').innerHTML;
        const checkbox = form.querySelector('.pay-form__checkbox input');
        const info = document.createElement('div');
        info.className = 'pay-info center';
        info.innerHTML = 'Загальна сума до сплати становить <span class="pay-form__red"><b>' + sum.value +'</b> грн.</span>';
        const infoBlock = document.createElement('div');
        infoBlock.className = 'pay-info';
        infoBlock.innerHTML = '<ul><li>У випадку встановленних блокувань по Вашій банківській карті операцію погашення проведено не буде.</li>' + '<li>Уточніть на гарячій лінії Вашого банку в консультанта про наявність блокувань на вашій банківській картці при здійсненні інтернет платежів.</li></ul>'
        
        checkbox.oninput = function() { 
            const total = document.querySelector('.pay-total span');
            let totalSum = Number(total.innerHTML.replace(/[^0-9]/g, ''));
            totalSum = totalSum + Number(sum.value);
            total.innerHTML =  totalSum + ' грн.';
            if (checkbox.checked) {
                form.classList.add('active');
                sum.oninput = function() {
                    sum.value = sum.value.replace(/[^0-9]/g, '');
                    info.innerHTML = 'Загальна сума до сплати становить <span class="pay-form__red"><b>' + sum.value +'</b> грн.</span>';
                    totalSum = totalSum + Number(sum.value);
                    total.innerHTML =  totalSum + ' грн.';
                    if (Number(sum.value) > Number(max) || Number(sum.value) < Number(min)) {
                        sum.classList.add('error');
                    } else {
                        sum.classList.remove('error');
                    }
                };
                form.append(infoBlock);
                form.append(info);
            } else {
                form.classList.remove('active');
                sum.classList.remove('error');
                info.remove();
                infoBlock.remove();
            }
        };
    }
}
activeForm();