// ------------------------ Hardcoded Variables ----------------------------------------
const giftcardcode10 = "A9bC3dE4F5gH6iJ7";
const giftcardcode20 = "K8lM9nO1P2qR3sT4";
const giftcardcode50 = "U5vW6xY7zA1bB3C2";

const discountcode5 = "FlavorFirstSaver5"
const discountcode10 = "FlavorFirstSaver10"
const discountcode20 =  "FlavorFirstSaver20"


const Manager_Email="manager@hotmail.com";
const Manager_Password="password";

const Guest_Email="dummyemail";
const Guest_Password="dummypassword";

var Account_Type="";
localStorage.setItem(Manager_Email, Manager_Password);
function Display_Login(){
    if(window.location.pathname=="/userview.html"){
        location.replace("index.html");
    }
    document.getElementById("signup-page").style.display="none";
    document.getElementById("content").style.display="none";
    document.getElementById("login-page").style.display="block";
}
function Display_SignUp(){
    document.getElementById("login-page").style.display="none";
    document.getElementById("content").style.display="none";
    document.getElementById("signup-page").style.display="block";
}
function Submit_Login(){
    let loginEmail=document.getElementById("loginEmail").value;
    let loginPass=document.getElementById("loginPass").value;
    if(localStorage.getItem(loginEmail)){
        if(loginPass==localStorage.getItem(loginEmail)){
            if(loginEmail==Manager_Email){
                localStorage.setItem("Account_Type", "manager");
                location.replace("/userview.html");
            }else{
                localStorage.setItem("Account_Type", "customer");
                location.replace("userview.html");
            }

        }else{
            alert("wrong password")
        }
    }else{
        alert("user not found");
    }
}
function Submit_SignUp(){
    let signUpEmail = document.getElementById("signUpEmail").value;
    let signUpPass = document.getElementById("signUpPass").value;
    localStorage.setItem(signUpEmail, signUpPass);
    localStorage.setItem("Account_Type", "customer");
    location.replace("userview.html");
}
function GuestView(){
    localStorage.setItem("Account_Type" , "guest");
    location.replace("/userview.html");
}
function BacktoHome(){
    location.replace("/index.html");
    document.getElementById('account-create-notice').style.display = 'none';

}
function AccountCreationPrompt() {
    alert("To add Items to your cart you must first create an account")
}
function editItem(id){
    let divId=id.substring(0,id.length-3);
    document.getElementById(divId+"VIEW").style.display='none';

    let conatinerDiv=document.getElementById(divId);

    let editDiv=document.createElement('div');
    editDiv.classList.add('edit-form');
    editDiv.id=divId+"FORM"
    
    editDiv.style.display='block';

    let form=document.createElement('form');
    form.onsubmit = function(event) {submitForm(event,id)};

    let inputTitle=document.createElement('input');
    inputTitle.setAttribute('type','text');
    inputTitle.setAttribute('placeholder','Dish Title');
    inputTitle.setAttribute('required', '');
    inputTitle.id='title1'
    inputTitle.classList.add('title');
        
    let inputImage=document.createElement('textarea');
    inputImage.setAttribute('placeholder','Image URL');
    inputImage.setAttribute('required', '');
    inputImage.id='image-url1'
    inputImage.classList.add('image-url');

    let inputPrice=document.createElement('input');
    inputPrice.setAttribute('type','number');
    inputPrice.setAttribute('placeholder','Price');
    inputPrice.setAttribute('required', '');
    inputPrice.setAttribute('min','0');
    inputPrice.setAttribute('max','100');
    inputPrice.setAttribute('step','0.01')
    inputPrice.id='price1'
    inputPrice.classList.add('price');


    let inputCookTime=document.createElement('input');
    inputCookTime.setAttribute('type','number');
    inputCookTime.setAttribute('placeholder','Time');
    inputCookTime.setAttribute('required','');
    inputCookTime.id='cook-time1'
    inputCookTime.classList.add('cook-time');

    let submitBtn=document.createElement('button');
    submitBtn.setAttribute('type','submit')
    submitBtn.classList.add('btn','btn-primary','submit-btn');
    submitBtn.innerText='Add Item';
    submitBtn.id=divId;
    
    let backBtn=document.createElement('button');
    backBtn.classList.add('btn','btn-primary','back-btn');
    backBtn.onclick= function() {goBack(id)};
    backBtn.id=divId;
    backBtn.innerText='Go Back';

    conatinerDiv.appendChild(editDiv);
    editDiv.appendChild(form);
    editDiv.appendChild(backBtn);
    form.appendChild(inputTitle);
    form.appendChild(inputImage);
    form.appendChild(inputPrice);
    form.appendChild(inputCookTime);
    form.appendChild(submitBtn);
    
}
function deleteItem(id){
    let divId=id.substring(0,id.length-3);
    document.getElementById(divId).remove(); 
}
function createMenuCard(title, imageUrl, price, cookTime, id){
    let divId=id.substring(0,id.length-3);
    if(id=="menu-form"){
        
        let menuContainer=document.getElementById('shop-items');

        let menuItem=document.createElement('div');
        menuItem.classList.add('shop-item');
        menuItem.id=divId

        let editView=document.createElement('div');
        editView.classList.add('edit-view');
        editView.id=divId.id+"VIEW";

        let itemTitle=document.createElement('span');
        itemTitle.classList.add('shop-item-title');
        itemTitle.textContent=title;

        let itemImage=document.createElement('img');
        itemImage.classList.add('shop-item-image');
        itemImage.src=imageUrl;
        itemImage.alt=title;

        let itemDetails=document.createElement('div');
        itemDetails.classList.add('shop-item-details');

        let itemPrice=document.createElement('span');
        itemPrice.classList.add('shop-item-price');
        itemPrice.textContent=`$${price}`;

        let itemCookTime=document.createElement('span');
        itemCookTime.classList.add('shop-item-cooktime');
        itemCookTime.textContent=`${cookTime} min`;

        let addToCartButton=document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-primary', 'shop-item-button');
        addToCartButton.type='button';
        addToCartButton.textContent='ADD TO CART';
        addToCartButton.onclick= function(event) {addToCartClicked(event)};

        let managerBtns=document.createElement('div');
        managerBtns.classList.add('manager-btns');
        managerBtns.style.display='block'

        let deleteButton=document.createElement('button');
        deleteButton.classList.add('btn','btn-primary','delete-btn');
        deleteButton.textContent='DELETE';
        deleteButton.id=divId.id+"DEL";
        deleteButton.onclick = function() {deleteItem(deleteButton.id)};
        deleteButton.style.display='block'
        
        let editBtn=document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'edit-btn');
        editBtn.textContent='EDIT';
        editBtn.id=divId.id+"EDT";
        editBtn.onclick = function() {editItem(editBtn.id)};
        editBtn.style.display='block';

        menuContainer.appendChild(menuItem);

        menuItem.appendChild(editView);
        editView.appendChild(itemTitle);
        editView.appendChild(itemImage);
        editView.appendChild(itemDetails);
    
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemCookTime);
        itemDetails.appendChild(addToCartButton);

        editView.appendChild(managerBtns);

        managerBtns.appendChild(deleteButton);
        managerBtns.appendChild(editBtn);
    }else{
        
        let itemDiv=document.getElementById(divId);
        let conatinerDiv=document.createElement('div');
        conatinerDiv.id=divId+"VIEW";
        conatinerDiv.classList.add('edit-view');

        let itemTitle=document.createElement("span");
        itemTitle.classList.add("shop-item-title");
        itemTitle.textContent=title;

        let itemImage=document.createElement("img");
        itemImage.classList.add("shop-item-image");
        itemImage.src=imageUrl;

        let itemDetails=document.createElement("div");
        itemDetails.classList.add("shop-item-details");

        let itemPrice=document.createElement("span");
        itemPrice.classList.add("shop-item-price");
        itemPrice.textContent=`$${price}`;

        let itemCookTime=document.createElement("span");
        itemCookTime.classList.add("shop-item-cooktime");
        itemCookTime.textContent = `${cookTime} min`;

        let addToCartButton=document.createElement("button");
        addToCartButton.classList.add("btn","btn-primary","shop-item-button");
        addToCartButton.textContent="ADD TO CART";
        addToCartButton.type="button";

    
        let manageBtn=document.createElement('div');
        manageBtn.classList.add("manager-btns")

        let deleteBtn=document.createElement('button');
        deleteBtn.innerText="DELETE";
        deleteBtn.classList.add('btn','btn-primary','delete-btn');
        deleteBtn.style.display='block'

        let editBtn=document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'edit-btn');
        editBtn.textContent='EDIT';
        editBtn.id=divId+"EDT";
        editBtn.onclick = function() {editItem(editBtn.id)};
        editBtn.style.display='block';
        
        itemDiv.appendChild(conatinerDiv);
        conatinerDiv.appendChild(itemTitle);
        conatinerDiv.appendChild(itemImage);
        conatinerDiv.appendChild(itemDetails);
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemCookTime);
        itemDetails.appendChild(addToCartButton);
        conatinerDiv.appendChild(manageBtn);
        manageBtn.appendChild(deleteBtn);
        manageBtn.appendChild(editBtn);
    }
    
}
function submitForm(event,id){
    event.preventDefault();
    let divId=id.substring(0,id.length-3);
    document.getElementById('constant').style.display='block';
    if(id=='menu-form'){
        let title=document.getElementById("title").value;
        let imageUrl=document.getElementById("image-url").value;
        let price=document.getElementById("price").value;
        let cookTime=document.getElementById("cook-time").value;
        let itemNum=1
        let itemDetails=[{
            "name": title,
            "image": imageUrl,
            "price": price,
            "time": cookTime,
            "id": "Item"+itemNum
        }];
        itemNum++;
        menuData=menuData.concat(itemDetails);
        createMenuCard(title, imageUrl, price, cookTime, id);
        let menuForm=document.getElementById("menu-form");
        menuForm.reset(); 
    }else{
        let title=document.getElementById("title1").value;
        let imageUrl=document.getElementById("image-url1").value;
        let price=document.getElementById("price1").value;
        let cookTime=document.getElementById("cook-time1").value;
        document.getElementById(divId+"FORM").remove();
        document.getElementById(divId+"VIEW").remove();
        createMenuCard(title, imageUrl, price, cookTime, id);
    }
}
function goBack(id){
    let divId=id.substring(0,id.length-3);
    document.getElementById(divId+"VIEW").style.display='block';
    document.getElementById(divId+"FORM").remove();
}
let menuData=[
    {
        "name": "Asian Glazed Chicken Thighs",
        "image": "Resources/resized_Asian-Glazed-Chicken-Thighs.webp",
        "price": "$24.95",
        "time": "23 min",
        "id": "MP6"
    },
    {
        "name": "Baked Denver Omelet",
        "image": "Resources/resized_Baked-Denver-Omelet.webp",
        "price": "$10.45",
        "time": "12 min",
        "id": "MP7"
    },
    {
        "name": "Baked Garlic Parmesan Chicken",
        "image": "Resources/resized_Baked-Garlic-Parmesan-Chicken.webp",
        "price": "$19.75",
        "time": "20 min",
        "id": "MP4"
    },
    {
        "name": "Beef Bourguignon",
        "image": "Resources/resized_Beef-Bourguigno.webp",
        "price": "$49.99",
        "time": "2 hours",
        "id": "MP3"
    },
    {
        "name": "Beef Stir-Fry",
        "image": "Resources/resized_Beef-Stir-Fry.webp",
        "price": "$27.50",
        "time": "27 min",
        "id": "MP8"
    },
    {
        "name": "Chicken and Stuffing Bake",
        "image": "Resources/resized_Chicken-and-Stuffing-Bake.webp",
        "price": "$18.99",
        "time": "40 min",
        "id": "MP1"
    },
    {
        "name": "Chicken Pesto Pizza",
        "image": "Resources/resized_Chicken-Pesto-Pizza.webp",
        "price": "$15.50",
        "time": "21 min",
        "id": "MP11"
    },
    {
        "name": "Creamy Chicken Ramen",
        "image": "Resources/resized_Creamy-Chicken-Ramen.webp",
        "price": "$15.49",
        "time": "10 min",
        "id": "Noodle1"
    },
    {
        "name": "Garden Stuffed Baked Potato",
        "image": "Resources/resized_Garden-Stuffed-Baked-Potato.webp",
        "price": "$9.95",
        "time": "10 min",
        "id": "Vegan4"
    },
    {
        "name": "Homemade Black Bean Veggie Burger",
        "image": "Resources/resized_Homemade-Black-Bean-Veggie-Burger.webp",
        "price": "$16.50",
        "time": "11 min",
        "id": "Vegan3"
    },
    {
        "name": "Mexican Casserole",
        "image": "Resources/resized_Mexican-Casserole.webp",
        "price": "$14.50",
        "time": "12 min",
        "id": "MP10"
    },
    {
        "name": "Pork Fried Rice",
        "image": "Resources/resized_Pork-Fried-Rice.webp",
        "price": "$11.95",
        "time": "12 min",
        "id": "MP12"
    },
    {
        "name": "Pork Tenderloin Diablo",
        "image": "Resources/resized_Pork-Tenderloin-Diablo.webp",
        "price": "$26.50",
        "time": "27 min",
        "id": "MP9"
    },
    {
        "name": "Sausage and Peppers",
        "image": "Resources/resized_Sausage-and-Peppers.webp",
        "price": "$21.45",
        "time": "22 min",
        "id": "MP2"
    },
    {
        "name": "Shrimp Scampi with Pasta",
        "image": "Resources/resized_Shrimp-Scampi-with-Pasta.webp",
        "price": "$20.95",
        "time": "20 min",
        "id": "Noodle2"
    },
    {
        "name": "Soy-Honey Glazed Salmon with Asparagus",
        "image": "Resources/resized_Soy-Honey-Glazed-Salmon-with-Asparagus.webp",
        "price": "$27.45",
        "time": "25 min",
        "id": "MP5"
    },
    {
        "name": "Spicy Asian Ramen Noodles",
        "image": "Resources/resized_Spicy-Asian-Ramen-Noodles.webp",
        "price": "$17.95",
        "time": "20 min",
        "id": "Noodle3"
    },
    {
        "name": "Spinach Tomato Tortellini",
        "image": "Resources/resized_Spinach-Tomato-Tortellini.webp",
        "price": "$21.75",
        "time": "22 min",
        "id": "Noodle4"
    },
    {
        "name": "Vegan Sweet Potato Chickpea Curry",
        "image": "Resources/resized_Vegan-Sweet-Potato-Chickpea-Curry.webp",
        "price":  "$17.45",
        "time": "25 min",
        "id": "Vegan1"
    },
    {
        "name": "White Chili",
        "image": "Resources/resized_White-Chili.webp",
        "price": "$13.45",
        "time": "15 min",
        "id": "Vegan2"
    }
];
function createMenuCards(menuData) {

    let menuContainer=document.getElementById("shop-items");

    menuData.forEach((item) => {
        let menuItem=document.createElement('div');
        menuItem.classList.add('shop-item');
        menuItem.id=item.id;

        let editView=document.createElement('div');
        editView.classList.add('edit-view');
        editView.id=item.id+"VIEW";

        let itemTitle=document.createElement('span');
        itemTitle.classList.add('shop-item-title');
        itemTitle.textContent=item.name;

        let itemImage=document.createElement('img');
        itemImage.classList.add('shop-item-image');
        itemImage.src=item.image;
        itemImage.alt=item.name;

        let itemDetails=document.createElement('div');
        itemDetails.classList.add('shop-item-details');

        let itemPrice=document.createElement('span');
        itemPrice.classList.add('shop-item-price');
        itemPrice.textContent=item.price;

        let itemCookTime=document.createElement('span');
        itemCookTime.classList.add('shop-item-cooktime');
        itemCookTime.textContent=item.time;

        let addToCartButton=document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-primary', 'shop-item-button');
        addToCartButton.type='button';
        addToCartButton.textContent='ADD TO CART';
        addToCartButton.onclick= function(event) {addToCartClicked(event)};

        let managerBtns=document.createElement('div');
        managerBtns.classList.add('manager-btns');

        let deleteButton=document.createElement('button');
        deleteButton.classList.add('btn','btn-primary','delete-btn');
        deleteButton.textContent='DELETE';
        deleteButton.id=item.id+"DEL";
        deleteButton.onclick = function() {deleteItem(deleteButton.id)};
        
        let editButton=document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'edit-btn');
        editButton.textContent='EDIT';
        editButton.id=item.id+"EDT";
        editButton.onclick = function() {editItem(editButton.id)};

        menuContainer.appendChild(menuItem);

        menuItem.appendChild(editView);
        editView.appendChild(itemTitle);
        editView.appendChild(itemImage);
        editView.appendChild(itemDetails);
    
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemCookTime);
        itemDetails.appendChild(addToCartButton);

        editView.appendChild(managerBtns);

        managerBtns.appendChild(deleteButton);
        managerBtns.appendChild(editButton);
    });
}
function ManagerBtn(){
    let deleteBtn=document.getElementsByClassName('delete-btn');
    let editBtn=document.getElementsByClassName('edit-btn');
    for(let i=0;i<deleteBtn.length;i++){
        deleteBtn[i].style.display = 'block';
    }   
    for(let x=0;x<editBtn.length;x++){
        editBtn[x].style.display = 'block';
    }   
}

// ----------------------------- Sort Function for Customer View --------------------------

function displayAll(){
    document.getElementById("MP1").style.display = "block"
    document.getElementById("MP2").style.display = "block"
    document.getElementById("MP3").style.display = "block"
    document.getElementById("MP4").style.display = "block"
    document.getElementById("MP5").style.display = "block"
    document.getElementById("MP6").style.display = "block"
    document.getElementById("MP7").style.display = "block"
    document.getElementById("MP8").style.display = "block"
    document.getElementById("MP9").style.display = "block"
    document.getElementById("MP10").style.display = "block"
    document.getElementById("MP11").style.display = "block"
    document.getElementById("MP12").style.display = "block"
    document.getElementById("Noodle1").style.display = "block"
    document.getElementById("Noodle2").style.display = "block"
    document.getElementById("Noodle3").style.display = "block"
    document.getElementById("Noodle4").style.display = "block"
    document.getElementById("Vegan1").style.display = "block"
    document.getElementById("Vegan2").style.display = "block"
    document.getElementById("Vegan3").style.display = "block"
    document.getElementById("Vegan4").style.display = "block"

}

function displayMeat(){
    document.getElementById("MP1").style.display = "block"
    document.getElementById("MP2").style.display = "block"
    document.getElementById("MP3").style.display = "block"
    document.getElementById("MP4").style.display = "block"
    document.getElementById("MP5").style.display = "block"
    document.getElementById("MP6").style.display = "block"
    document.getElementById("MP7").style.display = "block"
    document.getElementById("MP8").style.display = "block"
    document.getElementById("MP9").style.display = "block"
    document.getElementById("MP10").style.display = "block"
    document.getElementById("MP11").style.display = "block"
    document.getElementById("MP12").style.display = "block"
    document.getElementById("Noodle1").style.display = "none"
    document.getElementById("Noodle2").style.display = "none"
    document.getElementById("Noodle3").style.display = "none"
    document.getElementById("Noodle4").style.display = "none"
    document.getElementById("Vegan1").style.display = "none"
    document.getElementById("Vegan2").style.display = "none"
    document.getElementById("Vegan3").style.display = "none"
    document.getElementById("Vegan4").style.display = "none"

}

function displayVegan(){
    document.getElementById("MP1").style.display = "none"
    document.getElementById("MP2").style.display = "none"
    document.getElementById("MP3").style.display = "none"
    document.getElementById("MP4").style.display = "none"
    document.getElementById("MP5").style.display = "none"
    document.getElementById("MP6").style.display = "none"
    document.getElementById("MP7").style.display = "none"
    document.getElementById("MP8").style.display = "none"
    document.getElementById("MP9").style.display = "none"
    document.getElementById("MP10").style.display = "none"
    document.getElementById("MP11").style.display = "none"
    document.getElementById("MP12").style.display = "none"
    document.getElementById("Noodle1").style.display = "none"
    document.getElementById("Noodle2").style.display = "none"
    document.getElementById("Noodle3").style.display = "none"
    document.getElementById("Noodle4").style.display = "none"
    document.getElementById("Vegan1").style.display = "block"
    document.getElementById("Vegan2").style.display = "block"
    document.getElementById("Vegan3").style.display = "block"
    document.getElementById("Vegan4").style.display = "block"

}


function displayNoodle(){
    document.getElementById("MP1").style.display = "none"
    document.getElementById("MP2").style.display = "none"
    document.getElementById("MP3").style.display = "none"
    document.getElementById("MP4").style.display = "none"
    document.getElementById("MP5").style.display = "none"
    document.getElementById("MP6").style.display = "none"
    document.getElementById("MP7").style.display = "none"
    document.getElementById("MP8").style.display = "none"
    document.getElementById("MP9").style.display = "none"
    document.getElementById("MP10").style.display = "none"
    document.getElementById("MP11").style.display = "none"
    document.getElementById("MP12").style.display = "none"
    document.getElementById("Noodle1").style.display = "block"
    document.getElementById("Noodle2").style.display = "block"
    document.getElementById("Noodle3").style.display = "block"
    document.getElementById("Noodle4").style.display = "block"
    document.getElementById("Vegan1").style.display = "none"
    document.getElementById("Vegan2").style.display = "none"
    document.getElementById("Vegan3").style.display = "none"
    document.getElementById("Vegan4").style.display = "none"

}
// ---------------------------------- Cart functions ---------------------------------
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
    } 
else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    total = updateCartTotal()
    alert('Thank you for your purchase. Your total purchase came out to $' + total)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
        } 
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value < 0) {
        input.value = 1
    }
    else if (input.value === 0){
        var quantityZero = event.target
        quantityZero.parentElement.remove(event)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    document.getElementById('emptycart').style.display = 'none';
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = 
    `<div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
        <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

let currentTotalWithTax = 0; 

function displayCheckout() {
    let totalBeforeTax = updateCartTotal();
    if (totalBeforeTax !== 0) {
        document.getElementById('checkcontainer').style.display = 'block';
        document.getElementById('checkout').style.display = 'flex';
        document.getElementById('payment').style.display = 'flex';
        document.getElementById('customer').style.display = 'none';

        
        document.getElementById('total-price-notax').innerText = `$${totalBeforeTax}`;

        
        currentTotalWithTax = Math.round(totalBeforeTax * 1.06 * 100) / 100;
        document.getElementById('total-price-Tax').innerText = `$${currentTotalWithTax}`;

      
        document.getElementById('tip5').innerText = `+ $${(currentTotalWithTax * 0.05).toFixed(2)}`;
        document.getElementById('tip10').innerText = `+ $${(currentTotalWithTax * 0.10).toFixed(2)}`;
        document.getElementById('tip15').innerText = `+ $${(currentTotalWithTax * 0.15).toFixed(2)}`;
    } else {
        alert('There are no items in your cart');
    }
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
    if (total === 0){
        document.getElementById('emptycart').style.display = 'block';
    }else{
        document.getElementById('emptycart').style.display = 'none';
    }
    return total;
}

function noTip() {
    document.getElementsByClassName('finalprice')[0].innerText = `Total: $${currentTotalWithTax.toFixed(2)}`;
}


function tipCalc5() {
    let totalWithTip = currentTotalWithTax * 1.05;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 5% tip: $${totalWithTip.toFixed(2)}`;
}


function tipCalc10() {
    let totalWithTip = currentTotalWithTax * 1.10;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 10% tip: $${totalWithTip.toFixed(2)}`;
}


function tipCalc15() {
    let totalWithTip = currentTotalWithTax * 1.15;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 15% tip: $${totalWithTip.toFixed(2)}`;
}


function updateCustomTip() {
    let customTipInput = document.querySelector('input[name="tipcustom"]').value;
    let customTip = parseFloat(customTipInput);
    if (!isNaN(customTip) && customTip > 0) {
        let customTipAmount = (currentTotalWithTax * customTip / 100).toFixed(2);
        document.querySelector('.tipbutton.custom').innerText = `+ $${customTipAmount}`;
    } else {
        document.querySelector('.tipbutton.custom').innerText = "+ $0.00";
    }
}


function addCustomTip() {
    let customTipInput = document.querySelector('input[name="tipcustom"]').value;
    let customTip = parseFloat(customTipInput);
    if (!isNaN(customTip) && customTip > 0) {
        let totalWithCustomTip = currentTotalWithTax * (1 + customTip / 100);
        document.getElementsByClassName('finalprice')[0].innerText = `Total with ${customTip}% tip: $${totalWithCustomTip.toFixed(2)}`;
    } else {
        alert('Please enter a valid tip percentage');
    }
}



// function timechanger() {
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     var totaltime = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace(' ', 'mins'))
//         var quantity = quantityElement.value
        
//     }
//     totaltime = Math.round(totaltime * 100) / 100
//     document.getElementsByClassName('cart-total-time')[0].innerText = totaltime + 'mins';
//     return totaltime;
// }



// function displayCalc(){
//     document.getElementById('calcform').style.display = "block";
// }

function displayCardform1(){
    document.getElementById('card1').style.opacity = 0.5;
    document.getElementById('card2').style.opacity = 1;
    document.getElementById('cash').style.opacity = 1;
    document.getElementById('MasterCard').style.display = "none";
    document.getElementById('Visa').style.display = "block"
    document.getElementById('Cash').style.display = "none"
    document.getElementById('giftcard').style.display = "none"
}

function displayCardform2(){
    document.getElementById('card1').style.opacity = 1;
    document.getElementById('card2').style.opacity = 0.5;
    document.getElementById('cash').style.opacity = 1;
    document.getElementById('MasterCard').style.display = "block";
    document.getElementById('Visa').style.display = "none"
    document.getElementById('Cash').style.display = "none"
    document.getElementById('giftcard').style.display = "none"
}

function displayCashForm(){
    document.getElementById('card1').style.opacity = 1;
    document.getElementById('card2').style.opacity = 1;
    document.getElementById('cash').style.opacity = 0.5;
    document.getElementById('MasterCard').style.display = "none";
    document.getElementById('Visa').style.display = "none"
    document.getElementById('Cash').style.display = "block"
    document.getElementById('giftcard').style.display = "none"
}

function displayGiftCardForm(){
    document.getElementById('giftcard').style.display = "block";
}