const listProduct = document.querySelector('.listProduct');
  
    fetch('https://ecommerce.routemisr.com/api/v1/products')
      .then(res => res.json())
      .then(data => {
        const products = data.data;
  
       
        const limitedProducts = products.slice(0, 8);
  
        limitedProducts.forEach(product => {
          const productHTML = `
            <div class="product">
              <div class="image">
                <img width="250px" src="${product.imageCover}" alt="${product.title}">
              </div>
              <div class="contentProd">
                <h3>${product.title}</h3>
                <h4>${product.price}$</h4>
              </div>
              <div class="new">New</div>
              <button class="prodBtn">Add to Cart</button>
            </div>
          `;
  
          listProduct.innerHTML += productHTML;
        });
  
        listProduct.innerHTML += `<button class="allProdBtn">View All Products</button>`;
      

      document.querySelectorAll('.prodBtn').forEach(btn => {
        btn.addEventListener('click', () => {
          window.location.href = 'Authentication/Login/login.html'; 
        });
      });

     
      document.querySelector('.allProdBtn').addEventListener('click', () => {
        window.location.href = 'Authentication/Login/login.html'; 
      });

    })
      .catch(err => {
        console.error('Error fetching products:', err);
        listProduct.innerHTML = `<p style="color:red;">Failed to load products.</p>`;
      });
  
  

    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault(); 

        const userData = {
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value
        };

        localStorage.setItem("ContactUser", JSON.stringify(userData));
        e.target.reset();
    });

   const contactData = JSON.parse(localStorage.getItem("ContactUser"));
    console.log(contactData);


   
document.getElementById("contactForm").addEventListener("submit", function(e) {
   e.preventDefault(); 
   
      document.getElementById("afterSubmitBtn").style.display = "block";
      document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault(); 

        const userData = {
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value
        };

        localStorage.setItem("ContactUser", JSON.stringify(userData));
        e.target.reset();
    });


    const contactData = JSON.parse(localStorage.getItem("ContactUser"));
    console.log(contactData);

});
