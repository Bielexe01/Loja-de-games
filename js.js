document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.querySelector('.cart-items');
  const totalElement = document.querySelector('.total');
  const cartToggle = document.getElementById('cart-toggle');
  const cartContainer = document.querySelector('.cart-container');
  const checkoutForm = document.getElementById('checkout-form');
  const cartItemsInput = document.getElementById('cart-items-input');
  const cartTotalInput = document.getElementById('cart-total');
  const links = document.querySelectorAll('a[href^="#"]');
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu ul');


  hamburger.addEventListener("click", () => nav.classList.toggle("active"));

  const cart = [];

  const checkoutButton = document.querySelector('.checkout-button');
  checkoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    const section22 = document.getElementById('22');
    section22.scrollIntoView({ behavior: 'smooth' });
  });

  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  cartToggle.addEventListener('click', function() {
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
  });

  function addToCart(event) {
    const product = event.target.closest('.product');
    const productName = product.querySelector('h2').textContent;
    const productPrice = parseFloat(product.querySelector('p').textContent.replace('R$ ', ''));
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    showCartMessage();
    updateCart();
  }

  function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;

      const itemNameInput = document.createElement('input');
      itemNameInput.type = 'hidden';
      itemNameInput.name = `cart-items[${index}][name]`;
      itemNameInput.value = item.name;
      checkoutForm.appendChild(itemNameInput);

      const itemQuantityInput = document.createElement('input');
      itemQuantityInput.type = 'hidden';
      itemQuantityInput.name = `cart-items[${index}][quantity]`;
      itemQuantityInput.value = item.quantity;
      checkoutForm.appendChild(itemQuantityInput);
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    cartItemsInput.value = JSON.stringify(cart);
    cartTotalInput.value = total.toFixed(2);
  }

  function showCartMessage() {
    const cartMessage = document.getElementById('cart-message');
    cartMessage.classList.add('fade-in');
    cartMessage.style.display = 'block';

    setTimeout(() => {
      cartMessage.style.display = 'none';
      cartMessage.classList.remove('fade-in');
    }, 2000);
  }

  checkoutForm.addEventListener('submit', finalizarPedido);

  function finalizarPedido() {
    cart.forEach((item, index) => {
      const itemNameInput = document.createElement('input');
      itemNameInput.type = 'hidden';
      itemNameInput.name = `cart-items[${index}][name]`;
      itemNameInput.value = item.name;
      checkoutForm.appendChild(itemNameInput);

      const itemPriceInput = document.createElement('input');
      itemPriceInput.type = 'hidden';
      itemPriceInput.name = `cart-items[${index}][price]`;
      itemPriceInput.value = item.price;
      checkoutForm.appendChild(itemPriceInput);

      const itemQuantityInput = document.createElement('input');
      itemQuantityInput.type = 'hidden';
      itemQuantityInput.name = `cart-items[${index}][quantity]`;
      itemQuantityInput.value = item.quantity;
      checkoutForm.appendChild(itemQuantityInput);
    });
  }

  checkoutForm.addEventListener('submit', function(event) {
    if (cart.length === 0) {
      alert('Adicione itens ao carrinho antes de finalizar o pedido.');
      event.preventDefault();
    } else if (!validateForm()) {
      alert('Preencha todos os campos do formulário antes de finalizar o pedido.');
      event.preventDefault();
    }
  });

  function validateForm() {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');

    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
      return false;
    }

    return true;
  }

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // jQuery code here
  $(window).scroll(function(){
    if(this.scrollY > 20){
      $('.navbar').addClass("sticky");
    }else{
      $('.navbar').removeClass("sticky");
    }
    if(this.scrollY > 500){
      $('.scroll-up-btn').addClass("show");
    }else{
      $('.scroll-up-btn').removeClass("show");
    }
  });
  $('.scroll-up-btn').click(function(){
    $('html').animate({scrollTop: 0});
  });

  var typed = new Typed(".typing", {
    strings:["Skins", "Games", "Skins", "Games"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
  });

  var typed = new Typed(".typing-2", {
    strings:["", "", "", ""],
    typeSpeed:100,
    backSpeed:60,
    loop:true
  });

  $('.menu-btn').click(function(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
  });

  $('.carousel').owlCarousel({
    margin:20,
    loop:true,
    autoplayTimeOut:2000,
    autoplayHoverPauser:true,
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:false
      }
    }
  });

  menuBtn.addEventListener('click', function () {
    menu.classList.toggle('active');
});

});