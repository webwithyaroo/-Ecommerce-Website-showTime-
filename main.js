
import cart from "./cart.js"
import products from "./product.js"


document.addEventListener('DOMContentLoaded', () => {


    // variables
    let app = document.getElementById('outerRapper')
    let navigation_links = document.querySelectorAll("nav ul li ")
    let navLink = document.querySelector("nav ul li.active")

    // Functions

    for (let i = 0; i < navigation_links.length; i++) {

        let navLINKS = navigation_links[i]
        navLINKS.addEventListener("click", function (e) {
            let n = 0;
            while (n < navigation_links.length) {
                navigation_links[n++].className = "";
            }
            if (e.target.className === "linkImage") {
                navLINKS.classList.add('active')
            }



        })
    }

  
    

    //  -------------the productsPage tab------------



    // loading template file
  

    let temporaryContent = document.getElementById("temporaryContent")
    const loadTemplate = () => {

        fetch("template.html")
            .then(response => response.text())
            .then(content => {
                app.innerHTML = content
                let mainContent = document.getElementById('mainContent')
                mainContent.innerHTML = temporaryContent.innerHTML
                temporaryContent.innerHTML = null
                cart()
                init()
            })


    }
    loadTemplate()

    function init() {
        let listProducts = document.getElementById('listProduct')
        listProducts.innerHTML = null;
        products.forEach(product => {
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




})