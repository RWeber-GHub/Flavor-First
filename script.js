const Manager_Email="manager@hotmail.com";
const Manager_Password="password";
var Account_Type="";
localStorage.setItem(Manager_Email, Manager_Password);
function Display_Login(){
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
                Account_Type="manager";
                location.replace("userview.html");
                ManagerButton();
            }else{
                Account_Type="customer"
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
    location.replace("userview.html");
}


function createMenuItems(menuData){
    let menuContainer=document.getElementById('shop-items');
    menuData.forEach(item=>{
        let menuDiv=document.createElement('div');
        menuDiv.classList.add('shop-item');

        let itemTitle=document.createElement('span');
        itemTitle.innerText=item.name
        itemTitle.classList.add('shop-item-title');

        let itemImg=document.createElement('img');
        itemImg.classList.add('shop-item-image');
        itemImg.src=item.image;

        let itemIngredients=document.createElement('p');
        itemIngredients.classList.add('shop-item-ingredients');
        itemIngredients.textContent=item.ingredients.join(', ');

        let itemDetails=document.createElement('div');
        itemDetails.classList.add('shop-item-details');

        let itemPrice=document.createElement('span');
        itemPrice.innerText=item.price
        itemPrice.classList.add('shop-item-price');

        let itemCooktime=document.createElement('span');
        itemCooktime.innerText=item.time
        itemCooktime.classList.add('shop-item-cooktime');

        let cartBtn=document.createElement('button');
        cartBtn.innerText="ADD TO CART";
        cartBtn.classList.add('btn');
        cartBtn.classList.add('btn-primary');
        cartBtn.classList.add('shop-item-button');

        if(Account_Type=="customer"){
            console.log(Account_Type);
            menuContainer.appendChild(menuDiv);
            menuDiv.appendChild(itemTitle);
            menuDiv.appendChild(itemImg);
            menuDiv.appendChild(itemIngredients)
            menuDiv.appendChild(itemDetails);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(itemCooktime);
            itemDetails.appendChild(cartBtn);
        }
        if(Account_Type=="manager"){
            let deleteBtn=document.createElement('button');
            deleteBtn.innerText="DELETE";
            deleteBtn.classList.add('btn','btn-primary','shop-item-button','delete-btn');
            menuContainer.appendChild(menuDiv);
            menuDiv.appendChild(itemTitle);
            menuDiv.appendChild(itemImg);
            menuDiv.appendChild(itemIngredients)
            menuDiv.appendChild(itemDetails);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(itemCooktime);
            itemDetails.appendChild(cartBtn);
            itemDetails.appendChild(deleteBtn);
        }  
    });
}
let deleteBtn=document.createElement('button');
function ManagerButton(){
    deleteBtn.innerText="DELETE";
    deleteBtn.classList.add('btn','btn-primary','shop-item-button','delete-btn');
    let itemDetails=document.getElementsByClassName('manager-btns');
    for (let i = 0; i < itemDetails.length; i++) {
        itemDetails[i].appendChild(deleteBtn);
    }
}

function createMenuCard(title, imageUrl, price, cookTime){
    let menuContainer=document.getElementById("shop-items");

    let menuDiv=document.createElement("div");
    menuDiv.classList.add("shop-item");

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

    menuContainer.appendChild(menuDiv);
    menuDiv.appendChild(itemTitle);
    menuDiv.appendChild(itemImage);
    menuDiv.appendChild(itemDetails);
    itemDetails.appendChild(itemPrice);
    itemDetails.appendChild(itemCookTime);
    itemDetails.appendChild(addToCartButton);
    menuDiv.appendChild(manageBtn);
    manageBtn.appendChild(deleteBtn);
}


function submitForm(event){
    event.preventDefault();
    let title=document.getElementById("title").value;
    let imageUrl=document.getElementById("image-url").value;
    let price=document.getElementById("price").value;
    let cookTime=document.getElementById("cook-time").value;
    createMenuCard(title, imageUrl, price, cookTime);
    let menuForm=document.getElementById("menu-form");
    menuForm.reset();
}

let menuData=[
    {
        "name": "Asian Glazed Chicken Thighs",
        "image": "/Resources/Asian-Glazed-Chicken-Thighs.webp",
        "ingredients": ["rice vinegar", "soy sauce", "honey", "Asian sesame oil", "Asian chili garlic sauce", "garlic", "salt", "chicken thigh", "green onion"],
        "price": "$29.99",
        "time": "15 min"
    },
    {
        "name": "Baked Denver Omelet",
        "image": "/Resources/Baked-Denver-Omelet.webp",
        "ingredients": ["butter", "onion", "green bell pepper", "ham", "egg", "milk", "Cheddar cheese", "salt", "black pepper"],
        "price": "$19.99",
        "time": "30 min"
    },
    {
        "name": "Baked Garlic Parmesan Chicken",
        "image": "/Resources/Baked-Garlic-Parmesan-Chicken.webp",
        "ingredients": ["olive oil", "garlic", "breadcrumbs", "Parmesan cheese", "basil", "black pepper", "chicken breast"],
        "price": "$22.99",
        "time": "25 min"
    },
    {
        "name": "Beef Bourguignon",
        "image": "/Resources/Beef-Bourguigno.webp",
        "ingredients": ["beef chuck", "kosher salt", "black pepper", "hickory smoked bacon", "white onion", "garlic", "portobello mushroom", "tomato paste", "beef broth", "dry red wine", "carrots", "all-purpose flour", "parsley"],
        "price": "$49.99",
        "time": "2 hours"
    },
    {
        "name": "Beef Stir-Fry",
        "image": "/Resources/Beef-Stir-Fry.webp",
        "ingredients": ["vegetable oil", "beef sirloin", "broccoli florets", "red bell pepper", "carrots", "green onion", "garlic", "soy sauce", "sesame seeds"],
        "price": "$21.99",
        "time": "20 min"
    },
    {
        "name": "Chicken and Stuffing Bake",
        "image": "/Resources/Chicken-and-Stuffing-Bake.webp",
        "ingredients": ["chicken breast", "cream of chicken", "sour cream", "French onion soup mix", "black pepper", "dry stuffing mix", "chicken broth", "butter", "parsley"],
        "price": "$18.99",
        "time": "40 min"
    },
    {
        "name": "Chicken Pesto Pizza",
        "image": "/Resources/Chicken-Pesto-Pizza.webp",
        "ingredients": ["pesto basil sauce", "pizza crust", "chicken breast strips", "artichoke hearts", "shredded fontina cheese"],
        "price": "$15.99",
        "time": "20 min"
    },
    {
        "name": "Creamy Chicken Ramen",
        "image": "/Resources/Creamy-Chicken-Ramen.webp",
        "ingredients": ["unsalted butter", "garlic", "chicken broth", "whipping cream", "ramen noodles", "soy sauce", "chicken breast", "everything bagel seasoning"],
        "price": "$14.99",
        "time": "15 min"
    },
    {
        "name": "Garden Stuffed Baked Potato",
        "image": "/Resources/Garden-Stuffed-Baked-Potato.webp",
        "ingredients": ["potatoes", "butter", "onion", "broccoli", "ranch-style salad dressing", "vegetable oil", "parsley", "salt", "pepper"],
        "price": "$12.99",
        "time": "45 min"
    },
    {
        "name": "Homemade Black Bean Veggie Burger",
        "image": "/Resources/Homemade-Black-Bean-Veggie-Burger.webp",
        "ingredients": ["black beans", "green bell pepper", "onion", "garlic", "egg", "chili powder", "cumin", "Thai chili sauce", "breadcrumbs"],
        "price": "$10.99",
        "time": "25 min"
    },
    {
        "name": "Mexican Casserole",
        "image": "/Resources/Mexican-Casserole.webp",
        "ingredients": ["lean ground beef", "salsa", "chili beans", "tortilla chips", "sour cream", "black olives", "green onion", "tomato", "Cheddar cheese"],
        "price": "$17.99",
        "time": "35 min"
    },
    {
        "name": "Pork Fried Rice",
        "image": "/Resources/Pork-Fried-Rice.webp",
        "ingredients": ["butter", "boneless pork loin chop", "green onion", "carrot", "broccoli", "egg", "rice", "peas", "soy sauce", "garlic powder", "ginger"],
        "price": "$19.99",
        "time": "20 min"
    },
    {
        "name": "Pork Tenderloin Diablo",
        "image": "/Resources/Pork-Tenderloin-Diablo.webp",
        "ingredients": ["pork tenderloin", "salt", "black pepper", "vegetable oil", "chicken broth", "heavy cream", "extra-hot prepared horseradish", "Dijon mustard", "cayenne pepper", "unsalted butter", "chives"],
        "price": "$27.99",
        "time": "30 min"
    },
    {
        "name": "Sausage and Peppers",
        "image": "/Resources/Sausage-and-Peppers.webp",
        "ingredients": ["white rice", "chicken broth", "tomatoes", "garlic", "Creole seasoning", "black pepper", "cayenne pepper", "green bell pepper", "white onion", "andouille sausage", "scallions"],
        "price": "$22.99",
        "time": "25 min"
    },
    {
        "name": "Shrimp Scampi with Pasta",
        "image": "/Resources/Shrimp-Scampi-with-Pasta.webp",
        "ingredients": ["linguine pasta", "butter", "extra-virgin olive oil", "shallots", "garlic", "red pepper", "shrimp", "kosher salt", "ground pepper", "dry white wine", "lemon", "parsley"],
        "price": "$24.99",
        "time": "20 min"
    },
    {
        "name": "Soy-Honey Glazed Salmon with Asparagus",
        "image": "/Resources/Soy-Honey-Glazed-Salmon-with-Asparagus.webp",
        "ingredients": ["asparagus", "soy sauce", "honey", "olive oil", "salmon fillet", "sea salt", "black pepper"],
        "price": "$29.99",
        "time": "20 min"
    },
    {
        "name": "Spicy Asian Ramen Noodles",
        "image": "/Resources/Spicy-Asian-Ramen-Noodles.webp",
        "ingredients": ["soy sauce", "sesame oil", "brown sugar", "rice vinegar", "chili-garlic sauce", "ginger", "creamy peanut butter", "ramen noodles", "peanuts", "green onions"],
        "price": "$12.99",
        "time": "15 min"
    },
    {
        "name": "Spinach Tomato Tortellini",
        "image": "/Resources/Spinach-Tomato-Tortellini.webp",
        "ingredients": ["cheese tortellini", "tomatoes", "garlic", "onion", "spinach", "basil", "garlic", "salt", "pepper", "milk", "heavy cream", "all-purpose flour", "Parmesan cheese"],
        "price": "$19.99",
        "time": "25 min"
    },
    {
        "name": "Vegan Sweet Potato Chickpea Curry",
        "image": "/Resources/Vegan-Sweet-Potato-Chickpea-Curry.webp",
        "ingredients": ["olive oil", "onion", "garlic", "ginger root", "chickpeas", "tomatoes", "coconut milk", "sweet potato", "garam masala", "cumin", "turmeric", "salt", "red chile flakes", "baby spinach"],
        "price": "$16.99",
        "time": "35 min"
    },
    {
        "name": "White Chili",
        "image": "/Resources/White-Chili.webp",
        "ingredients": ["ground turkey", "medium salsa", "corn kernels", "water", "Great Northern beans", "Pepper Jack cheese"],
        "price": "$21.99",
        "time": "45 min"
    }
];