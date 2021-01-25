
const fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'https://sc04.alicdn.com/kf/UTB8ou8hOyDEXKJk43Oqq6Az3XXaz.jpg' },
    { id: 2, title: 'Груши', price: 20, img: 'https://apeti.ru/upload/iblock/e48/grusha_dyushes_na_razves_1_kg.jpg' },
    { id: 3, title: 'Апельсины', price: 20, img: 'https://dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_500.jpg' }
]

const toHTML = (fruit) => `
<div class="col">
<div class="card">
    <img class="card-img-top" src='${fruit.img}' alt="img">
    <div class="card-body">
        <h5 class="card-title"> ${fruit.title} </h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
            the card's content.</p>
        <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id} >Посмотреть цену</a>
        <a href="#" class="btn btn-primary" data-btn="close" > Закрыть </a>
    </div>
</div>
</div>
`

const render = () => {
    const html = fruits.map(toHTML).join('')
    document.getElementById('fruits').innerHTML = html
}

render()



const priceModal = base.modal({
    title: 'Цена на товар',
    closable: true,
    footerButtons: [
        {
            text: 'Закрыть', handler() {
                priceModal.close()
            }
        }
    ]
})


document.addEventListener('click', e => {
    e.preventDefault()

    const btnType = e.target.dataset.btn
    const id = +e.target.dataset.id


    if (btnType === 'price') {
        const fruit = fruits.find( f=> f.id === id)
        priceModal.setContent(`
        <p> Цена на ${fruit.title}: <strong> ${fruit.price} p.</strong></p>
        `)
        priceModal.open()
    }
})