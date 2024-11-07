let Manager_Email="manager@hotmail.com";
let Manager_Password="password";
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
    let email=document.getElementById("email1").value;
    let pass=document.getElementById("pass1").value;
    if(localStorage.getItem(email)){
        if(pass===localStorage.getItem(email)){
            if(email===Manager_Email){
                location.replace("userview.html");
                Account_Type=1;
            } else{
                location.replace("userview.html");
            }
        } else{
            alert("wrong password")
        }
    } else{
        alert("user not found");
    }
}
function Submit_SignUp(){
    let email = document.getElementById("email2").value;
    let pass = document.getElementById("pass2").value;
    localStorage.setItem(email, pass);
    location.replace("userview.html");
}
let Menu_Images=["/Resources/Asian-Glazed-Chicken-Thighs.webp",
    "/Resources/Baked-Denver-Omelet.webp",
    "/Resources/Baked-Garlic-Parmesan-Chicken.webp",
    "/Resources/Beef-Bourguigno.webp",
    "/Resources/Beef-Stir-Fry.webp",
    "/Resources/Chicken-and-Stuffing-Bake.webp",
    "/Resources/Chicken-Pesto-Pizza.webp",
    "/Resources/Creamy-Chicken-Ramen.webp",
    "/Resources/Garden-Stuffed-Baked-Potato.webp",
    "/Resources/Homemade-Black-Bean-Veggie-Burger.webp",
    "/Resources/Mexican-Casserole.webp",
    "/Resources/Pork-Fried-Rice.webp",
    "/Resources/Pork-Tenderloin-Diablo.webp",
    "/Resources/Sausage-and-Peppers.webp",
    "/Resources/Shrimp-Scampi-with-Pasta.webp",
    "/Resources/Soy-Honey-Glazed-Salmon-with-Asparagus.webp",
    "/Resources/Spicy-Asian-Ramen-Noodles.webp",
    "/Resources/Spinach-Tomato-Tortellini.webp",
    "/Resources/Vegan-Sweet-Potato-Chickpea-Curry.webp",
    "/Resources/White-Chili.webp",
]
function CreateMenu(){
    for(let i=0;i<=20;i++){
        let x=document.createElement("img");
        let z=Menu_Images[i];
        x.setAttribute("id", i)
        x.src=z;
        document.body.appendChild(x);
    }
}

let Account_Type=2;
function createMenuItems(menuData) {
    let menuContainer = document.getElementById('menu-container');
    menuData.forEach(item=>{
        let menuDiv=document.createElement('div');
        menuDiv.classList.add('menu-item');

        let img=document.createElement('img');
        img.src=item.image;

        let name=document.createElement('h3');
        name.textContent=item.name;

        let ingredient=document.createElement('p');
        ingredient.classList.add('ingredients');
        ingredient.textContent=item.ingredients.join(', ');

        menuDiv.appendChild(img);
        menuDiv.appendChild(name);
        menuDiv.appendChild(ingredient);
        menuContainer.appendChild(menuDiv);
    });
}


let menuData=[
    {
        name: "Asian Glazed Chicken Thighs",
        image: "/Resources/Asian-Glazed-Chicken-Thighs.webp",
        ingredients: ["rice vinegar", "soy sauce", "honey", "Asian sesame oil", "Asian chili garlic sauce", "garlic", "salt", "chicken thigh", "green onion" ]
    },
    {
        name: "Baked Denver Omelet",
        image: "/Resources/Baked-Denver-Omelet.webp",
        ingredients: ["butter", "onion", "green bell pepper", "ham", "egg", "milk", "Cheddar cheese", "salt", "black pepper"]
    },
    {
        name: "Baked Garlic Parmesan Chicken",
        image: "/Resources/Baked-Garlic-Parmesan-Chicken.webp",
        ingredients: ["Olive oil", "garlic", "breadcrumbs", "Parmesan cheese", "basil", "black pepper", "chicken breast"]
    }
];