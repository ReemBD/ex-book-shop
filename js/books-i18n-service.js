var gTrans = {
    'site-title': {
        en: "Reem's Book-shop 📚",
        he: 'חנות ספרים של ראם 📚',
    },
    'id-th': {
        en: '#',
        he: '#',
    },
    'title-th': {
        en: 'Title',
        he: 'שם הספר',
    },
    'price-th': {
        en: 'Price',
        he: 'מחיר',
    },
    'actions-th': {
        en: 'Actions',
        he: 'פעולות',
    },
    'add-book': {
        en: 'Add book',
        he: 'הוסף ספר',
    },
    'add-book-name-input': {
        en: 'Name:',
        he: 'שם הספר:',
    },
    'add-book-price-input': {
        en: 'Price:',
        he: 'מחיר:',
    },
    'read-book': {
        en: 'Read',
        he: 'קרא',
    },
    'update-book': {
        en: 'Update',
        he: 'עדכן',
    },
    'delete-book': {
        en: 'Delete',
        he: 'מחק',
    }
}

var gCurrencies = {
    en: 'USD',
    he: 'ILS',
}
var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function (el) {
        var transKey = el.dataset.trans;
        var txt = gTrans[transKey][gCurrLang];
        (gCurrLang === 'he') ? document.body.classList.add('rtl') : document.body.classList.remove('rtl')
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else el.innerText = txt;
    })
}

function transBooksTableBtns() {
    var elButtons = document.querySelectorAll('.action-btn');
    console.log(elButtons);
    elButtons.forEach(function (btn) {
        var transKey = btn.dataset.trans
        var txt = gTrans[transKey][gCurrLang];
        btn.innerText = txt;
    })
}
function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString(gCurrLang);
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    var currencyKey = gCurrLang + '-' + gCurrLang.toUpperCase();
    return new Intl.NumberFormat(currencyKey, { style: 'currency', currency: gCurrencies[gCurrLang] }).format(num)
}

function formatDate(time) {

}

