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
        info.innerHTML = 'Загальна сума до сплати становить <span class="pay-form__red"><b class="sum-value"> 0</b> грн.</span>';
        const infoBlock = document.createElement('div');
        infoBlock.className = 'pay-info';
        infoBlock.innerHTML = '<ul><li>У випадку встановленних блокувань по Вашій банківській карті операцію погашення проведено не буде.</li>' + '<li>Уточніть на гарячій лінії Вашого банку в консультанта про наявність блокувань на вашій банківській картці при здійсненні інтернет платежів.</li></ul>'

        const countSum = function() {
            const pays = document.querySelectorAll('.pay-form__red b');
            let result = 0;
            const total = document.querySelector('.pay-total span');

            for (let i = 0; i < pays.length; i += 1) {
                result = result + Number(pays[i].innerHTML);
                total.innerHTML =  result + ' грн.';
            }
        }
        
        checkbox.oninput = function() {
            countSum();
            sum.value = sum.value.replace(/[^0-9]/g, '');
            if (checkbox.checked) {
                form.classList.add('active');
                sum.oninput = function() {
                    sum.value = sum.value.replace(/[^0-9]/g, '');
                    info.innerHTML = 'Загальна сума до сплати становить <span class="pay-form__red"><b>' + sum.value +'</b> грн.</span>';
                    countSum();
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

const showForms = function() {
    const showBtn = document.querySelector('.show-forms');
    const showBlock = document.querySelector('.add');
    const showBtnBlock = document.querySelector('.add-form');

    if (!showBtn) {
        return;
    }

    showBtn.onclick = function(e) {
        e.preventDefault();
        showBtn.classList.toggle('show');

        if (showBtn.classList.contains('show')) {
            showBlock.classList.add('open');
            showBtnBlock.classList.add('open');
        } else {
            showBlock.classList.remove('open');
            showBtnBlock.classList.remove('open');
        }
    }
};
showForms();

const loadFunction = function() {
    const btn = document.querySelector('.button.success');
    const contentBlock = document.querySelector('.add-modal__content');
    if (!btn) {
        return;
    }

    btn.onclick = function(e) {
        e.preventDefault();
        contentBlock.innerHTML = '<p class="add-loading">Почекайте будь ласка, запит у процесі!</p>';
        setTimeout(() => contentBlock.innerHTML = '<p class="add-success">Видача пройшла успішно!</p> <button type="button" class="button-outline" data-bs-dismiss="modal">Ok</button>', 2000);
    }
};
loadFunction();