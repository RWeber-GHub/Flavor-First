function login(){
    
}
function signup(){
    document.getElementById("").style.display="none";

}
function Customer_Login(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    if(localStorage.getItem(email)){
        if(pass === localStorage.getItem(email)){
            document.getElementById("page").style.display="none";
            
        }
        else
            alert("wrong passward")
    }
    else
        alert("user not found")
}
function Customer_SignUp(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    localStorage.setItem(email, pass)
}
function Manager_Login(){

}
function Manager_SignUp(){

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
function clearInfo(){
    localStorage.clear();
}