import products from "./product.js";



const cart = () => {
    let listCart = document.getElementById('listCart')



    document.addEventListener('click', function (e) {
        let currentPosition = e.target;
        // toggle visibility
        toggleVisibility(currentPosition)
        //buttonClick
        buttonClick(currentPosition)

    })
    function toggleVisibility(currentPosition) {
        let cartList = document.querySelector(".sideCrtList")
        let visiblity = cartList.getAttribute("data-isOpened")
        if (currentPosition.classList.contains("cartImg") || currentPosition.classList.contains("cart")) {
            cartList.setAttribute("data-isOpened", false)
        } else if (currentPosition.classList.contains("close")) {
            cartList.setAttribute("data-isOpened", true)
        }


    }
    listCart.addEventListener('click', function(e){
        let currentPosition = e.target
        if (currentPosition.classList.contains("plus")||currentPosition.classList.contains("minus") ) {
            let productBtnId = currentPosition.parentElement.parentElement.dataset.id
           let type = 'minus'
           if(currentPosition.classList.contains('plus')){
               type = 'plus'
           }
           changeQuantity(productBtnId, type)
        }
    })
     
function changeQuantity(productBtnId, type){
    let positionItem = cart.findIndex((value)=> value.product_id == productBtnId)

    if(positionItem >= 0){
        switch(type){
            case 'plus':
                cart[positionItem].quantity +=1;
                break;
            default:
                let valueChange = cart[positionItem].quantity - 1;
                if(valueChange > 0){
                    cart[positionItem].quantity = valueChange
                }else{
                    cart.splice(positionItem, 1)
                }
                break;
        }
    }
    addCartToMemory()
    refreshCartHTML()
}

    let cart = []
    
    function buttonClick(currentPosition) {
        if (currentPosition.classList.contains("addItemToCart")) {
            let idProduct = currentPosition.dataset.id;
            setProductInCart(idProduct)
        }

    }

    function setProductInCart ( idProduct){
        let positionThisProductInCart = cart.findIndex((value)=> value.product_id == idProduct )
        if (cart.length <= 0) {
            cart = [{
                product_id:idProduct,
                quantity: 1
            }]

        }
        else if (positionThisProductInCart < 0) {
            cart.push({
                product_id:idProduct,
                quantity: 1,
            })
        } else {
            cart[positionThisProductInCart].quantity =  cart[positionThisProductInCart].quantity + 1
        }
        refreshCartHTML()
        addCartToMemory()
    }

    //commiting changes to memory
    function addCartToMemory(){
        localStorage.setItem('cart', JSON.stringify(cart))
    }







    function refreshCartHTML(){
        let quantitySpan = document.getElementById('quantityAmout')
        let totalQuantity = 0;
        listCart.innerHTML = null;
        if(cart.length > 0){
            cart.forEach(item => {
                let productPosition = products.findIndex((value) => value.id == item.product_id)
                let info = products[productPosition]
                let newCart = document.createElement('div')
                newCart.dataset.id = info.id;
                newCart.classList.add('item')
                newCart.innerHTML =`
                     <div class="image">
                    <img src="${info.image}">
                    </div>
                    <div id="tagName">${info.text}</div>
                    <div id="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"  data-id='${info.id}'>-</span>
                        <span>${ item.quantity}</span>
                        <span class="plus" data-id='${info.id}'>+</span>
                    </div>
                
                `
                   listCart.appendChild(newCart)
                   totalQuantity += item.quantity
            })
          
        }
        quantitySpan.innerText = totalQuantity


    }

    
  
    


    const initApp=()=>{
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
            refreshCartHTML()
            
        }
       
    }
       initApp()
}
export default cart;