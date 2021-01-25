
Element.prototype.appendAfter = function( element ){
    element.parentNode.insertBefore( this, element.nextSibling )
}


const createModalFooter = ( buttons = [] ) => {
    if ( buttons.length === 0 ) {
        return document.createElement( 'div' )
    }

    const wrap = document.createElement( 'div' )
    wrap.classList.add( 'modal-footer' )

    buttons.map( button => {
        const btn = document.createElement( 'button' )
        btn.textContent = button.text
        btn.classList.add('btn')
        btn.classList.add( 'btn-dark' )
        btn.onclick = button.handler || noop

        wrap.appendChild( btn )
    })

    return wrap
}




function createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('Amodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal_overlay" data-close="true">
        <div class="modal_window">
            <div class="modal_heder"> 
                <span class="modal_title" > ${ options.title } </span>
                    ${ options.closable ? ` <span class="modal_close" data-close="true" > &times; </span>` : '' }
            </div>
            <div class="modal_body" data-content >
                ${ options.content || '' }
            </div>
        </div>
    </div>`  )
    const modalFooter = createModalFooter( options.footerButtons  )
    modalFooter.appendAfter( modal.querySelector('[ data-content]'))
    document.body.appendChild( modal )
    return modal
}//создаем компонент окна


base.modal = function (options) { //создаем функцию 

    const ANIMATION_SPEED = 200
    const $modal =  createModal(options) //инстанс компонента окна
    let closing = false //по умолчанию закрыто
    let destroyed = false

    const modal = {
        open() {
            if ( destroyed ) {
                console.log('destroyed');
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout( ( )=>{
                $modal.classList.remove( 'hide' )
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    const listener = ( e ) => {
        if ( e.target.dataset.close ) {
            modal.close()
        }
    }

    $modal.addEventListener( 'click', listener )


    return Object.assign( modal, {
        destroy(){
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener( 'click', listener )
            destroyed = true
        },
        setContent( html ){
            $modal.querySelector( '[data-content]' ).innerHTML = html
        }
    })
}


