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
    document.getElementById('constant').style.display='none';

    let conatinerDiv=document.getElementById(divId);

    let editDiv=document.createElement('div');
    editDiv.classList.add('edit-form');
    editDiv.id=divId+"FORM";
    editDiv.style.display='block';

    let formTitle=document.createElement('span');
    formTitle.classList.add('shop-item-title','create-title');
    formTitle.textContent='Create Your Own Menu Card';

    let form=document.createElement('form');
    form.onsubmit = function(event) {submitForm(event,id)};

    let inputTitle=document.createElement('input');
    inputTitle.setAttribute('type','text');
    inputTitle.setAttribute('placeholder','Dish Title');
    inputTitle.setAttribute('required', '');
    inputTitle.id='title'
    inputTitle.classList.add('title');
        
    let inputImage=document.createElement('input');
    inputImage.setAttribute('type','text');
    inputImage.setAttribute('placeholder','Image URL');
    inputImage.setAttribute('required', '');
    inputImage.id='image-url'
    inputImage.classList.add('image-url');

    let inputPrice=document.createElement('input');
    inputPrice.setAttribute('type','number');
    inputPrice.setAttribute('placeholder','Price');
    inputPrice.setAttribute('required', '');
    inputPrice.id='price'
    inputPrice.classList.add('price');

    let inputCookTime=document.createElement('input');
    inputCookTime.setAttribute('type','number');
    inputCookTime.setAttribute('placeholder','Cook Time (min)');
    inputCookTime.setAttribute('required','');
    inputCookTime.id='cook-time'
    inputCookTime.classList.add('cook-time');

    let submitBtn=document.createElement('button');
    submitBtn.setAttribute('type','submit')
    submitBtn.classList.add('btn','btn-primary');
    submitBtn.innerText='Add Menu Item';
    submitBtn.id=divId;
    
    let backBtn=document.createElement('button');
    backBtn.classList.add('btn','btn-primary');
    backBtn.onclick= function() {goBack(backBtn.id)};
    backBtn.id=divId.id;
    backBtn.innerText='Go Back';

    conatinerDiv.appendChild(editDiv);
    editDiv.appendChild(formTitle);
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
        // menuItem.id=divId

        let editView=document.createElement('div');
        editView.classList.add('edit-view');
        // editView.id=divId.id+"VIEW";

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
        itemPrice.textContent= '$' + price;

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
        // deleteButton.id=divId.id+"DEL";
        deleteButton.onclick = function() {deleteItem(deleteButton.id)};
        deleteButton.style.display='block'
        
        let editButton=document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'edit-btn');
        editButton.textContent='EDIT';
        // editButton.id=divId.id+"EDT";
        editButton.onclick = function() {editItem(editButton.id)};
        editButton.style.display='block';

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
    }else{
        let itemDiv=document.getElementById(divId);
        let conatinerDiv=document.createElement('div');
        conatinerDiv.id=divId+"VIEW";

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
        deleteBtn.classList.add('btn','btn-primary','shop-item-button','delete-btn');
        deleteBtn.style.display='block'
        
        itemDiv.appendChild(conatinerDiv);
        conatinerDiv.appendChild(itemTitle);
        conatinerDiv.appendChild(itemImage);
        conatinerDiv.appendChild(itemDetails);
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemCookTime);
        itemDetails.appendChild(addToCartButton);
        conatinerDiv.appendChild(manageBtn);
        manageBtn.appendChild(deleteBtn);
    }
    
}
function submitForm(event,id){
    event.preventDefault();
    let divId=id.substring(0,id.length-3);
    let title=document.getElementById("title").value;
    let imageUrl=document.getElementById("image-url").value;
    let price=document.getElementById("price").value;
    let cookTime=document.getElementById("cook-time").value;
    if(id=='menu-form'){
        createMenuCard(title, imageUrl, price, cookTime, id);
        let menuForm=document.getElementById("menu-form");
        menuForm.reset(); 
    }else{
        document.getElementById(divId+"FORM").remove();
        document.getElementById(divId+"VIEW").remove();
        createMenuCard(title, imageUrl, price, cookTime, id);
    }
    
    
}
function goBack(id){
    document.getElementById(id+"VIEW").style.display='block';
    document.getElementById(id+"FORM").style.display='none';
    document.getElementById('constant').style.display='block';
}
function other(){
    document.getElementById('other').style.display='block'
}

let menuData=[
    {
        "name": "Asian Glazed Chicken Thighs",
        "image": "Resources/resized_Asian-Glazed-Chicken-Thighs.webp",
        "ingredients": ["rice vinegar", "soy sauce", "honey", "Asian sesame oil", "Asian chili garlic sauce", "garlic", "salt", "chicken thigh", "green onion"],
        "price": "$24.95",
        "time": "23 min",
        "id": "MP6"
    },
    {
        "name": "Baked Denver Omelet",
        "image": "Resources/resized_Baked-Denver-Omelet.webp",
        "ingredients": ["butter", "onion", "green bell pepper", "ham", "egg", "milk", "Cheddar cheese", "salt", "black pepper"],
        "price": "$10.45",
        "time": "12 min",
        "id": "MP7"
    },
    {
        "name": "Baked Garlic Parmesan Chicken",
        "image": "Resources/resized_Baked-Garlic-Parmesan-Chicken.webp",
        "ingredients": ["olive oil", "garlic", "breadcrumbs", "Parmesan cheese", "basil", "black pepper", "chicken breast"],
        "price": "$19.75",
        "time": "20 min",
        "id": "MP4"
    },
    {
        "name": "Beef Bourguignon",
        "image": "Resources/resized_Beef-Bourguigno.webp",
        "ingredients": ["beef chuck", "kosher salt", "black pepper", "hickory smoked bacon", "white onion", "garlic", "portobello mushroom", "tomato paste", "beef broth", "dry red wine", "carrots", "all-purpose flour", "parsley"],
        "price": "$49.99",
        "time": "2 hours",
        "id": "MP3"
    },
    {
        "name": "Beef Stir-Fry",
        "image": "Resources/resized_Beef-Stir-Fry.webp",
        "ingredients": ["vegetable oil", "beef sirloin", "broccoli florets", "red bell pepper", "carrots", "green onion", "garlic", "soy sauce", "sesame seeds"],
        "price": "$27.50",
        "time": "27 min",
        "id": "MP8"
    },
    {
        "name": "Chicken and Stuffing Bake",
        "image": "Resources/resized_Chicken-and-Stuffing-Bake.webp",
        "ingredients": ["chicken breast", "cream of chicken", "sour cream", "French onion soup mix", "black pepper", "dry stuffing mix", "chicken broth", "butter", "parsley"],
        "price": "$18.99",
        "time": "40 min",
        "id": "MP1"
    },
    {
        "name": "Chicken Pesto Pizza",
        "image": "Resources/resized_Chicken-Pesto-Pizza.webp",
        "ingredients": ["pesto basil sauce", "pizza crust", "chicken breast strips", "artichoke hearts", "shredded fontina cheese"],
        "price": "$15.50",
        "time": "21 min",
        "id": "MP11"
    },
    {
        "name": "Creamy Chicken Ramen",
        "image": "Resources/resized_Creamy-Chicken-Ramen.webp",
        "ingredients": ["unsalted butter", "garlic", "chicken broth", "whipping cream", "ramen noodles", "soy sauce", "chicken breast", "everything bagel seasoning"],
        "price": "$15.49",
        "time": "10 min",
        "id": "Noodle1"
    },
    {
        "name": "Garden Stuffed Baked Potato",
        "image": "Resources/resized_Garden-Stuffed-Baked-Potato.webp",
        "ingredients": ["potatoes", "butter", "onion", "broccoli", "ranch-style salad dressing", "vegetable oil", "parsley", "salt", "pepper"],
        "price": "$9.95",
        "time": "10 min",
        "id": "Vegan4"
    },
    {
        "name": "Homemade Black Bean Veggie Burger",
        "image": "Resources/resized_Homemade-Black-Bean-Veggie-Burger.webp",
        "ingredients": ["black beans", "green bell pepper", "onion", "garlic", "egg", "chili powder", "cumin", "Thai chili sauce", "breadcrumbs"],
        "price": "$16.50",
        "time": "11 min",
        "id": "Vegan3"
    },
    {
        "name": "Mexican Casserole",
        "image": "Resources/resized_Mexican-Casserole.webp",
        "ingredients": ["lean ground beef", "salsa", "chili beans", "tortilla chips", "sour cream", "black olives", "green onion", "tomato", "Cheddar cheese"],
        "price": "$14.50",
        "time": "12 min",
        "id": "MP10"
    },
    {
        "name": "Pork Fried Rice",
        "image": "Resources/resized_Pork-Fried-Rice.webp",
        "ingredients": ["butter", "boneless pork loin chop", "green onion", "carrot", "broccoli", "egg", "rice", "peas", "soy sauce", "garlic powder", "ginger"],
        "price": "$11.95",
        "time": "12 min",
        "id": "MP12"
    },
    {
        "name": "Pork Tenderloin Diablo",
        "image": "Resources/resized_Pork-Tenderloin-Diablo.webp",
        "ingredients": ["pork tenderloin", "salt", "black pepper", "vegetable oil", "chicken broth", "heavy cream", "extra-hot prepared horseradish", "Dijon mustard", "cayenne pepper", "unsalted butter", "chives"],
        "price": "$26.50",
        "time": "27 min",
        "id": "MP9"
    },
    {
        "name": "Sausage and Peppers",
        "image": "Resources/resized_Sausage-and-Peppers.webp",
        "ingredients": ["white rice", "chicken broth", "tomatoes", "garlic", "Creole seasoning", "black pepper", "cayenne pepper", "green bell pepper", "white onion", "andouille sausage", "scallions"],
        "price": "$21.45",
        "time": "22 min",
        "id": "MP2"
    },
    {
        "name": "Shrimp Scampi with Pasta",
        "image": "Resources/resized_Shrimp-Scampi-with-Pasta.webp",
        "ingredients": ["linguine pasta", "butter", "extra-virgin olive oil", "shallots", "garlic", "red pepper", "shrimp", "kosher salt", "ground pepper", "dry white wine", "lemon", "parsley"],
        "price": "$20.95",
        "time": "20 min",
        "id": "Noodle2"
    },
    {
        "name": "Soy-Honey Glazed Salmon with Asparagus",
        "image": "Resources/resized_Soy-Honey-Glazed-Salmon-with-Asparagus.webp",
        "ingredients": ["asparagus", "soy sauce", "honey", "olive oil", "salmon fillet", "sea salt", "black pepper"],
        "price": "$27.45",
        "time": "25 min",
        "id": "MP5"
    },
    {
        "name": "Spicy Asian Ramen Noodles",
        "image": "Resources/resized_Spicy-Asian-Ramen-Noodles.webp",
        "ingredients": ["soy sauce", "sesame oil", "brown sugar", "rice vinegar", "chili-garlic sauce", "ginger", "creamy peanut butter", "ramen noodles", "peanuts", "green onions"],
        "price": "$17.95",
        "time": "20 min",
        "id": "Noodle3"
    },
    {
        "name": "Spinach Tomato Tortellini",
        "image": "Resources/resized_Spinach-Tomato-Tortellini.webp",
        "ingredients": ["cheese tortellini", "tomatoes", "garlic", "onion", "spinach", "basil", "garlic", "salt", "pepper", "milk", "heavy cream", "all-purpose flour", "Parmesan cheese"],
        "price": "$21.75",
        "time": "22 min",
        "id": "Noodle4"
    },
    {
        "name": "Vegan Sweet Potato Chickpea Curry",
        "image": "Resources/resized_Vegan-Sweet-Potato-Chickpea-Curry.webp",
        "ingredients": ["olive oil", "onion", "garlic", "ginger root", "chickpeas", "tomatoes", "coconut milk", "sweet potato", "garam masala", "cumin", "turmeric", "salt", "red chile flakes", "baby spinach"],
        "price": "17.45",
        "time": "25 min",
        "id": "Vegan1"
    },
    {
        "name": "White Chili",
        "image": "Resources/resized_White-Chili.webp",
        "ingredients": ["ground turkey", "medium salsa", "corn kernels", "water", "Great Northern beans", "Pepper Jack cheese"],
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
        document.getElementById('checkout').style.display = 'block';
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
    document.getElementById('Visa').style.display = "block";
}

function displayCardform2(){
    document.getElementById('Master').style.display = "block";
}

function displayCashForm(){
    document.getElementById('Cash').style.display = "block";
}

function displayGiftCardForm(){
    document.getElementById('GiftCard').style.display = "block";
}
