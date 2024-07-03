import products from "./product.js";
import cart from "./cart.js";

    function init (){
        let  idProduct = new URLSearchParams(window.location.search).get('id')
        let info = products.filter((value)=> value.id == idProduct)[0]
        if(!info){
            window.location.href= '/'
        }
        // if(window.location.href= 'http://127.0.0.1:5500/HTML/productsPage.html'){
        //    console.log(55)
        // }
        let details = document.querySelector('.details')
        details.querySelector('.imageDesc img').src = info.image 
        details.querySelector('.descName').innerHTML = info.text 
        details.querySelector('.descPrice').innerHTML = `$${info.price }`
        details.querySelector('.addItemToCart').dataset.id = idProduct;
      
        let listProducts = document.getElementById('listProduct')
        listProducts.innerHTML = null;
        products.filter((value) => value.id != idProduct).forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add('Productitem');
            newProduct.dataset.id = product.id
            newProduct.id = `Productitem${product.id}`
            newProduct.innerHTML = `
           <div class="itemWrapper">
                        <h1 class="itemName">${product.text}</h1>
                        <a href="details.html?id=${product.id}">
                            <img src="${product.image}" id="ìmageShow">
                        <a/>
                    </div>
                    <div class="addItemToCart" data-display="show"
                    data-id="${product.id}">
                       +
                    </div>
           `
            listProducts.appendChild(newProduct)
           
        })

        
    }

    let temporaryContent = document.getElementById("temporaryContent")
    const loadTemplate = () => {
        fetch("template.html")
            .then(response => response.text())
            .then(content => {
                app.innerHTML = content;
                let mainContent = document.getElementById('mainContent')
                mainContent.innerHTML = temporaryContent.innerHTML
                temporaryContent.innerHTML = null
                cart()
                init()
                
            })
    }
    loadTemplate()