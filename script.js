
// ------------------------ Hardcoded Variables ----------------------------------------
const giftcard10 = "A9bC3dE4F5gH6iJ7";
const giftcard20 = "K8lM9nO1P2qR3sT4";
const giftcard50 = "U5vW6xY7zA1bB3C2";

const discountcode10 = "FlavorFirstSaver10"

const Manager_Email="manager@hotmail.com";
const Manager_Password="password";

const Guest_Email="dummyemail";
const Guest_Password="dummypassword";

localStorage.setItem(Manager_Email, Manager_Password);
localStorage.setItem(Guest_Email,Guest_Password);

var currentIndex=0;

function printIngredients(){

}

function scrollMenu(direction){
    let container=document.getElementById('scroll');
    let totalItems=container.children.length;
    let itemWidth=container.children[0].offsetWidth;

    currentIndex+=direction;

    currentIndex=Math.max(0,Math.min(currentIndex,totalItems-1));

    container.style.transform=`translateX(-${currentIndex*itemWidth}px)`;
}
scrollMenu(0);

function Display_Login(){
    if(window.location.pathname=="/userview.html"){
        location.replace("index.html");
    }
    document.getElementById("signup-page").style.display="none";
    document.getElementById("content").style.display="none";
    document.getElementById("login-page").style.display="block";
}

function Display_SignUp(){
    if(window.location.pathname=="/userview.html"){
        location.replace("index.html");
    }
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
    localStorage.setItem("Account_Type","guest");
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
    let temp=id;
        let x = "";
        for (let i of temp) {
            if (!isNaN(i)) {
                 x+=i;
            }
        }
    let containerDiv=document.getElementById(x);

    let editDiv=document.createElement('div');
    editDiv.classList.add('edit-form');
    editDiv.id=divId+"FRMDIV"
    
    editDiv.style.display='block';
        
    editDiv.innerHTML=
    `<form onsubmit="submitForm(event,id)" id=${divId+"FRM"}>
    <input type="text" placeholder="Dish Title" required="" id="${divId}-title" class="title">
    <textarea placeholder="Image URL" required="" id="${divId}-image-url" class="image-url"></textarea>
    <input type="number" placeholder="Price" required="" min="0" max="100" step="0.01" id="${divId}-price" class="price">
    <input type="number" placeholder="Time" required="" id="${divId}-cook-time" class="cook-time">
    <button type="submit" class="btn btn-primary submit-btn" id="${divId}">Add Item</button>
    <button class="btn btn-primary back-btn" id="${divId+"BCK"}" onclick="goBack(id)">Go Back</button>
    <div class="temp">
        <select id="${divId}-tag-options" class="tag">
            <optgroup label="Select a Tag">
                <option value="MP">Majority Protein</option>
                <option value="Noodle">Pasta/Noodle</option>
                <option value="Vegan">Vegan</option>
                <option value="CC">Carb Classics</option>
            </optgroup>
        </select>
    </div>
    <textarea class="ingredients" id="${divId}-ingredients" placeholder="i.e. rice,pasta,green-onion" required></textarea>
    </form>
    `
    
    containerDiv.appendChild(editDiv);
    
}
function goBack(id){
    divId=id.substring(0,id.length-3)
    document.getElementById(divId+"VIEW").style.display='block';
    document.getElementById(divId+"FRM").remove();
    document.getElementById(id).remove(); 
}
function deleteItem(id){
    let temp=id;
    let x = "";
    for (let i of temp) {
        if(!isNaN(i)) {
            x+=i
        }
    }
    document.getElementById(x).remove();
    localStorage.removeItem('Item'+x);
    let y=localStorage.getItem("index");
    y--;
    localStorage.setItem("index",y);
}

function createMenuCard(title, imageUrl, price, cookTime, itemId, idNum, id, ingredients){
    let container=document.getElementById(`${idNum}`);
    let menuContainer=document.getElementById("shop-items")
    if(id=='menu-form'){
        localStorage.setItem(`Item${idNum}`,`<div class="shop-item ${itemId}" id="${idNum}"><div class="edit-view" id="${idNum}VIEW"><span class="shop-item-title">${title}</span><img class="shop-item-image" src="${imageUrl}"><div class="shop-item-details"><span class="shop-item-price">$${price}</span><span class="shop-item-cooktime">${cookTime} min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="${idNum}DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="${idNum}EDT" onclick="editItem(id)">EDIT</button><span class="shop-item-ingredients">${ingredients}</span></div></div></div>`);
        menuContainer.innerHTML+=localStorage.getItem("Item"+`${idNum}`);
        ManagerBtn();
        // ****
    }else{
        document.getElementById(`${idNum}`+"VIEW").remove();
        localStorage.setItem(`Item${idNum}`,`<div class="shop-item ${itemId}" id="${idNum}"><div class="edit-view" id="${idNum}VIEW"><span class="shop-item-title">${title}</span><img class="shop-item-image" src="${imageUrl}"><div class="shop-item-details"><span class="shop-item-price">$${price}</span><span class="shop-item-cooktime">${cookTime} min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="${idNum}DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="${idNum}EDT" onclick="editItem(id)">EDIT</button><span class="shop-item-ingredients">${ingredients}</span></div></div></div>`);        
        container.innerHTML=`<span class="shop-item-title">${title}</span><img class="shop-item-image" src="${imageUrl}"><div class="shop-item-details"><span class="shop-item-price">$${price}</span><span class="shop-item-cooktime">${cookTime} min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="${idNum}DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="${idNum}EDT" onclick="editItem(id)">EDIT</button><span class="shop-item-ingredients">${ingredients}</span></div></div></div>`;
        ManagerBtn();
    }
    
}
function guestCards(){
    let menuContainer=document.getElementById("guest-shop-items");
    for(let i=1;i<=menuItemCount();i++){
        if(localStorage.getItem("Item"+i)!=null){
            let item=localStorage.getItem("Item"+i);
            let temp=document.createElement('div');
            temp.innerHTML=item;
            let shopItem=temp.querySelector('.shop-item');
            shopItem.querySelector('.shop-item-button').onclick=()=>{
                AccountCreationPrompt();
            };
            menuContainer.appendChild(shopItem);
        }
    }
}

function menuItemCount(){
    let total=0;
    for (let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        if (key.startsWith("Item")){
            total++;
        }
    }
    return total;
}
function submitForm(event,id){
    event.preventDefault();
    document.getElementById('constant').style.display='block';
    if(id=='menu-form'){
        let title=document.getElementById("title").value;
        let imageUrl=document.getElementById("image-url").value;
        let itemPrice=document.getElementById("price").value;
        let cookTime=document.getElementById("cook-time").value;
        let itemId=document.getElementById('tag-options').value;
        let ingredients=document.getElementById("ingredients").value;
        let idNum=Number(localStorage.getItem("index"))+1
        id=id;
        localStorage.setItem("index",idNum)
        createMenuCard(title, imageUrl, itemPrice, cookTime, itemId, idNum, id, ingredients);
        document.getElementById(id).reset();
    }else{
        divId=id.substring(0,id.length-3);
        let container=document.getElementById(divId);
        container.classList.remove("MP","Vegan","Noodle","CC");
        let title=document.getElementById(`${divId}-title`).value;
        let imageUrl=document.getElementById(`${divId}-image-url`).value;
        let itemPrice=document.getElementById(`${divId}-price`).value;
        let cookTime=document.getElementById(`${divId}-cook-time`).value;
        let itemId=document.getElementById(`${divId}-tag-options`).value;
        let ingredients=document.getElementById(`${divId}-ingredients`).value;
        container.classList.add(itemId)
        let idNum=divId
        document.getElementById(divId+"FRMDIV").remove();
        createMenuCard(title, imageUrl, itemPrice, cookTime, itemId, idNum, id, ingredients);
    }
}
function clearStorage(){
    localStorage.clear();
    localStorage.setItem("Account_Type", "manager");
    localStorage.setItem("index","20");
    localStorage.setItem("Item1",`<div class="shop-item MP" id="1"><div class="edit-view" id="1VIEW"><span class="shop-item-title">Asian Glazed Chicken Thighs</span><img class="shop-item-image" src="Resources/resized_Asian-Glazed-Chicken-Thighs.webp"><div class="shop-item-details"><span class="shop-item-price">$24.95</span><span class="shop-item-cooktime">23 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="1DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="1EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item2",`<div class="shop-item MP" id="2"><div class="edit-view" id="2VIEW"><span class="shop-item-title">Baked Denver Omelet</span><img class="shop-item-image" src="Resources/resized_Baked-Denver-Omelet.webp"><div class="shop-item-details"><span class="shop-item-price">$10.45</span><span class="shop-item-cooktime">12 min</span><button class="btn btn-primary shop-item-button" type="button"onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="2DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="2EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item3",`<div class="shop-item MP" id="3"><div class="edit-view" id="3VIEW"><span class="shop-item-title">Baked Garlic Parmesan Chicken</span><img class="shop-item-image" src="Resources/resized_Baked-Garlic-Parmesan-Chicken.webp"><div class="shop-item-details"><span class="shop-item-price">$19.75</span><span class="shop-item-cooktime">20 min</span><button class="btn btn-primary shop-item-button" type="button"onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="3DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="3EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item4",`<div class="shop-item MP" id="4"><div class="edit-view" id="4VIEW"><span class="shop-item-title">Beef Bourguignon</span><img class="shop-item-image" src="Resources/resized_Beef-Bourguigno.webp"><div class="shop-item-details"><span class="shop-item-price">$29.99</span><span class="shop-item-cooktime">25 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="4DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="4EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item5",`<div class="shop-item MP" id="5"><div class="edit-view" id="5VIEW"><span class="shop-item-title">Beef Stir-Fry</span><img class="shop-item-image" src="Resources/resized_Beef-Stir-Fry.webp"><div class="shop-item-details"><span class="shop-item-price">$27.50</span><span class="shop-item-cooktime">27 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="5DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="5EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item6",`<div class="shop-item CC" id="6"><div class="edit-view" id="6VIEW"><span class="shop-item-title">Chicken and Stuffing Bake</span><img class="shop-item-image" src="Resources/resized_Chicken-and-Stuffing-Bake.webp"><div class="shop-item-details"><span class="shop-item-price">$18.99</span><span class="shop-item-cooktime">40 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="6DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="6EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item7",`<div class="shop-item CC" id="7"><div class="edit-view" id="7VIEW"><span class="shop-item-title">Chicken Pesto Pizza</span><img class="shop-item-image" src="Resources/resized_Chicken-Pesto-Pizza.webp"><div class="shop-item-details"><span class="shop-item-price">$15.50</span><span class="shop-item-cooktime">21 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="7DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="7EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item8",`<div class="shop-item Noodle" id="8"><div class="edit-view" id="8VIEW"><span class="shop-item-title">Creamy Chicken Ramen</span><img class="shop-item-image" src="Resources/resized_Creamy-Chicken-Ramen.webp"><div class="shop-item-details"><span class="shop-item-price">$15.49</span><span class="shop-item-cooktime">10 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="8DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="8EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item9",`<div class="shop-item Vegan" id="9"><div class="edit-view" id="9VIEW"><span class="shop-item-title">Garden Stuffed Baked Potato</span><img class="shop-item-image" src="Resources/resized_Garden-Stuffed-Baked-Potato.webp"><div class="shop-item-details"><span class="shop-item-price">$9.95</span><span class="shop-item-cooktime">10 min</span><button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="9DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="9EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item10",`<div class="shop-item Vegan" id="10"><div class="edit-view" id="10VIEW"><span class="shop-item-title">Homemade Black Bean Veggie Burger</span><img class="shop-item-image" src="Resources/resized_Homemade-Black-Bean-Veggie-Burger.webp"><div class="shop-item-details"><span class="shop-item-price">$16.50</span><span class="shop-item-cooktime">11 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="10DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="10EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item11",`<div class="shop-item CC" id="11"><div class="edit-view" id="11VIEW"><span class="shop-item-title">Mexican Casserole</span><img class="shop-item-image" src="Resources/resized_Mexican-Casserole.webp"><div class="shop-item-details"><span class="shop-item-price">$14.50</span><span class="shop-item-cooktime">12 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="11DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="11EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item12",`<div class="shop-item CC" id="12"><div class="edit-view" id="12VIEW"><span class="shop-item-title">Pork Fried Rice</span><img class="shop-item-image" src="Resources/resized_Pork-Fried-Rice.webp"><div class="shop-item-details"><span class="shop-item-price">$11.95</span><span class="shop-item-cooktime">12 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="12DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="12EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item13",`<div class="shop-item MP" id="13"><div class="edit-view" id="13VIEW"><span class="shop-item-title">Pork Tenderloin Diablo</span><img class="shop-item-image" src="Resources/resized_Pork-Tenderloin-Diablo.webp"><div class="shop-item-details"><span class="shop-item-price">$26.50</span><span class="shop-item-cooktime">27 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="13DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="13EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item14",`<div class="shop-item MP" id="14"><div class="edit-view" id="14VIEW"><span class="shop-item-title">Sausage and Peppers</span><img class="shop-item-image" src="Resources/resized_Sausage-and-Peppers.webp"><div class="shop-item-details"><span class="shop-item-price">$21.45</span><span class="shop-item-cooktime">22 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="14DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="14EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item15",`<div class="shop-item Noodle" id="15"><div class="edit-view" id="15VIEW"><span class="shop-item-title">Shrimp Scampi with Pasta</span><img class="shop-item-image" src="Resources/resized_Shrimp-Scampi-with-Pasta.webp"><div class="shop-item-details"><span class="shop-item-price">$20.95</span><span class="shop-item-cooktime">20 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="15DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="15EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item16",`<div class="shop-item MP" id="16"><div class="edit-view" id="16VIEW"><span class="shop-item-title">Soy-Honey Glazed Salmon with Asparagus</span><img class="shop-item-image" src="Resources/resized_Soy-Honey-Glazed-Salmon-with-Asparagus.webp"><div class="shop-item-details"><span class="shop-item-price">$27.45</span><span class="shop-item-cooktime">25 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="16DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="16EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item17",`<div class="shop-item Noodle" id="17"><div class="edit-view" id="17VIEW"><span class="shop-item-title">Spicy Asian Ramen Noodles</span><img class="shop-item-image" src="Resources/resized_Spicy-Asian-Ramen-Noodles.webp"><div class="shop-item-details"><span class="shop-item-price">$17.95</span><span class="shop-item-cooktime">20 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="17DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="17EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item18",`<div class="shop-item Noodle" id="18"><div class="edit-view" id="18VIEW"><span class="shop-item-title">Spinach Tomato Tortellini</span><img class="shop-item-image" src="Resources/resized_Spinach-Tomato-Tortellini.webp"><div class="shop-item-details"><span class="shop-item-price">$21.75</span><span class="shop-item-cooktime">22 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="18DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="18EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item19",`<div class="shop-item Vegan" id="19"><div class="edit-view" id="19VIEW"><span class="shop-item-title">Vegan Sweet Potato Chickpea Curry</span><img class="shop-item-image" src="Resources/resized_Vegan-Sweet-Potato-Chickpea-Curry.webp"><div class="shop-item-details"><span class="shop-item-price">$17.45</span><span class="shop-item-cooktime">25 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="19DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="19EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
    localStorage.setItem("Item20",`<div class="shop-item Vegan" id="20"><div class="edit-view" id="20VIEW"><span class="shop-item-title">White Chili</span><img class="shop-item-image" src="Resources/resized_White-Chili.webp"><div class="shop-item-details"><span class="shop-item-price">$13.45</span><span class="shop-item-cooktime">15 min</span><button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button></div><div class="manager-btns"><button class="btn btn-primary delete-btn" id="20DEL" onclick="deleteItem(id)">DELETE</button><button class="btn btn-primary edit-btn" id="20EDT" onclick="editItem(id)">EDIT</button></div></div></div>`);
}

function createMenuCards() {
    let menuContainer=document.getElementById("shop-items");
    for(let i=1;i<=menuItemCount();i++){
        if(localStorage.getItem("Item"+i)!=null){
            menuContainer.innerHTML+=localStorage.getItem("Item"+i)
        }
    }
}
var items = [];

function extractMenuItems() {
    for (let i=0;i<localStorage.length;i++) {
        let key=localStorage.key(i);
        if (key.startsWith("Item")){
            let itemHTML=localStorage.getItem(key);
            if (itemHTML){
                let temp=document.createElement('div');
                temp.innerHTML=itemHTML;
                let title=temp.querySelector('.shop-item-title').innerText;              		
                let image=temp.querySelector('.shop-item-image').src ;
                let price=temp.querySelector('.shop-item-price').innerText;
                let cooktime=temp.querySelector('.shop-item-cooktime').innerText;
                items.push({
                    title: title,
                    image: image,
                    price: price,
                    cooktime: cooktime
                });
            }
        }
    }
    console.log(items)
    return items;
}

function loadSuggestions(){
    let menu=document.getElementsByClassName('menu-item');
    let num=Math.round(Math.random()*20);
    let x=num;
    for (let i=0;i<menu.length;i++) {
        if (items[i]){
            menu[i].innerHTML=`
                <span class="scroll-title shop-item-title");">${items[num].title}</span>
                <img class="scroll-img shop-item-image" src="${items[num].image}" alt="">
                <span class="scroll-price shop-item-price">${items[num].price}</span>
                <button class="btn btn-primary shop-item-button" type="button" onclick="addToCartClicked(event)">ADD TO CART</button>
                <span class="shop-item-cooktime" id="invisible">${items[num].cooktime}</span>
            `;
            num=Math.round(Math.random()*20);
        if(x==num){
            num=Math.round(Math.random()*20);
            
        }
        }
    }
}
extractMenuItems();

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
    let x =document.getElementsByClassName('shop-item')
    for(let i=0;i<x.length;i++){
        x[i].style.display='block'
    }
}

function displayMeat(){
    let x=document.getElementsByClassName('MP')
    for(let i=0;i<x.length;i++){
        x[i].style.display='block';
    }
    let y=document.getElementsByClassName('Vegan')
    for(let i=0;i<y.length;i++){
        y[i].style.display='none';
    }
    let z=document.getElementsByClassName('Noodle')
    for(let i=0;i<z.length;i++){
        z[i].style.display='none';
    }
    let a=document.getElementsByClassName('CC')
    for(let i=0;i<a.length;i++){
        a[i].style.display='none';
    }
}

function displayVegan(){
    let x=document.getElementsByClassName('Vegan')
    for(let i=0;i<x.length;i++){
        x[i].style.display='block'
    }
    let y=document.getElementsByClassName('MP')
    for(let i=0;i<y.length;i++){
        y[i].style.display='none'
    }
    let z=document.getElementsByClassName('Noodle')
    for(let i=0;i<z.length;i++){
        z[i].style.display='none'
    }
    let a=document.getElementsByClassName('CC')
    for(let i=0;i<a.length;i++){
        a[i].style.display='none'
    }
}


function displayNoodle(){
    let x=document.getElementsByClassName('Noodle')
    for(let i=0;i<x.length;i++){
        x[i].style.display='block'
    }
    let y=document.getElementsByClassName('MP')
    for(let i=0;i<y.length;i++){
        y[i].style.display='none'
    }
    let z=document.getElementsByClassName('Vegan')
    for(let i=0;i<z.length;i++){
        z[i].style.display='none'
    }
    let a=document.getElementsByClassName('CC')
    for(let i=0;i<a.length;i++){
        a[i].style.display='none'
    }
}

function displayCarb(){
    let x=document.getElementsByClassName('CC')
    for(let i=0;i<x.length;i++){
        x[i].style.display='block'
    }
    let y=document.getElementsByClassName('MP')
    for(let i=0;i<y.length;i++){
        y[i].style.display='none'
    }
    let z=document.getElementsByClassName('Vegan')
    for(let i=0;i<z.length;i++){
        z[i].style.display='none'
    }
    let a=document.getElementsByClassName('Noodle')
    for(let i=0;i<a.length;i++){
        a[i].style.display='none'
    }
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
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    shopItem.classList.add('selected');

    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    const cookTime = shopItem.getElementsByClassName('shop-item-cooktime')[0]?.textContent?.trim()?.replace('min', '');

    addItemToCart(title, price, imageSrc, cookTime);
    updateCartTotal();
}


function addItemToCart(title, price, imageSrc, cookTime) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            quantityElement++
            return;
        }
    }

    
    cookTime = parseInt(cookTime, 10);
    if (isNaN(cookTime)) cookTime = 0;

    
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        <div class="shop-item-cooktime">${cookTime}</div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

    updatePrepTime();
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
//-----------------------------------------------------------

//checkout & tip ----------------------------------------------
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

        
        const cartItemContainer = document.getElementsByClassName('cart-items')[0];
        const cartRows = cartItemContainer.getElementsByClassName('cart-row');
        let receiptData = [];

        for (let i = 0; i < cartRows.length; i++) {
            const cartRow = cartRows[i];
            const titleElement = cartRow.getElementsByClassName('cart-item-title')[0]; 
            const priceElement = cartRow.getElementsByClassName('cart-price')[0]; 
            const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]; 

            const title = titleElement.innerText;
            const price = priceElement.innerText;
            const quantity = quantityElement.value;

            receiptData.push({ title, price, quantity });
        }
        localStorage.setItem('receiptItems', JSON.stringify(receiptData));

        
        
    } else {
        alert('There are no items in your cart');
    }
}

function randomOrderNumber(){}


function noTip() {
    document.getElementsByClassName('finalprice')[0].innerText = `Total: $${currentTotalWithTax.toFixed(2)}`;
    document.getElementById('tiphead').style.display = 'none';
}

function tipCalc5() {
    let totalWithTip = currentTotalWithTax * 1.05;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 5% tip: $${totalWithTip.toFixed(2)}`;
    document.getElementById('tiphead').style.display = 'none';
}

function tipCalc10() {
    let totalWithTip = currentTotalWithTax * 1.10;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 10% tip: $${totalWithTip.toFixed(2)}`;
    document.getElementById('tiphead').style.display = 'none';
}

function tipCalc15() {
    let totalWithTip = currentTotalWithTax * 1.15;
    document.getElementsByClassName('finalprice')[0].innerText = `Total with 15% tip: $${totalWithTip.toFixed(2)}`;
    document.getElementById('tiphead').style.display = 'none';
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
        document.getElementById('tiphead').style.display = 'none';
    } else {
        alert('Please enter a valid tip percentage');
    }
}
//---------------------------------------------------------------

// Prep time----------------------------------------------------

function updatePrepTime() {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cookTimeElements = cartItems.getElementsByClassName('shop-item-cooktime');

    let totalCookTime = 0;

    for (let i = 0; i < cookTimeElements.length; i++) {
        const cookTimeText = cookTimeElements[i]?.textContent?.trim()?.replace('min', '');
        const cookTime = parseInt(cookTimeText, 10);

        if (!isNaN(cookTime)) {
            totalCookTime += cookTime;
        } else {
            console.warn(`Invalid cook time at index ${i}: "${cookTimeText}"`);
        }
    }

    const prepTimeCalcElement = document.getElementById('prep-time-calc');
    if (prepTimeCalcElement) {
        prepTimeCalcElement.textContent = `${totalCookTime} Min(s)`;
    } else {
        console.error('prepTimeCalcElement not found.');
    }

    console.log('Total Cook Time:', totalCookTime);
    console.log('Cook Time Elements Count:', cookTimeElements.length);
    console.log('Cart Items Inner HTML:', cartItems.innerHTML);
}

//-------------------------------------------


function cardFormVisa(){
    localStorage.setItem('cardType', 'Visa');
    document.getElementById('visa').style.opacity = 0.5;
    document.getElementById('master').style.opacity = 1;
    document.getElementById('cash').style.opacity = 1;

    document.getElementById('payment-form').style.display = "block";
    document.getElementById('cash-input').style.display = "none";
    document.getElementById('cardType').innerText = `Card Used: Visa `;
}
function cardFormMaster(){
    localStorage.setItem('cardType', 'MasterCard');
    document.getElementById('visa').style.opacity = 1;
    document.getElementById('master').style.opacity = 0.5;
    document.getElementById('cash').style.opacity = 1;

    document.getElementById('payment-form').style.display = "block";
    document.getElementById('cash-input').style.display = "none";
    document.getElementById('cardType').innerText = `Card Used: Mastercard `;
}

function displayCashForm(){
    localStorage.setItem('cardType', 'N/A');
    document.getElementById('visa').style.opacity = 1;
    document.getElementById('master').style.opacity = 1;
    document.getElementById('cash').style.opacity = 0.5;
    
    document.getElementById('payment-form').style.display = "none";
    document.getElementById('cash-input').style.display = "block";
}

function displayGiftCardForm(){
    document.getElementById('giftcard').style.display = "block";
}


// navbar cart functions--------------------
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('toggle-cart');
    const sideCart = document.getElementById('side-cart');
    const closeCartButton = document.getElementById('close-cart');

    
    cartButton.addEventListener('click', () => {
        sideCart.classList.add('open');
    });

    
    closeCartButton.addEventListener('click', () => {
        sideCart.classList.remove('open');
    });

    
    const checkoutButton = document.querySelector('.btn-purchase');
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
});
//----------------------------------------------------

//Checkout functions-------------------------------------------------------------------------

//Card number input
const cardInput = document.getElementById('card-number');

cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/\D/g, ''); 
    if (value.length > 16) value = value.slice(0, 16); 

    e.target.value = value.match(/.{1,4}/g)?.join(' ') || ''; 
});

cardInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        const value = e.target.value;
        if (value.endsWith(' ')) {
            e.target.value = value.slice(0, -1); 
        }
    }
});


//EXP Date input
const expDate = document.getElementById('expiry-date');

expDate.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 4) value = value.slice(0, 4); 

    
    if (value.length >= 2) {
        const month = value.slice(0, 2);
        const year = value.slice(2);
        if (parseInt(month, 10) > 12) value = '12' + year; 
    }

    e.target.value = value.match(/.{1,2}/g)?.join('/') || '';
});

expDate.addEventListener('blur', (e) => {
    const [month, year] = e.target.value.split('/');
    if (month && year) {
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
            alert('Invalid month. Please enter a value between 01 and 12.');
            e.target.value = '';
        }
        if (parseInt(year, 10) < 24) {
            alert('Year must be 24 or later.');
            e.target.value = '';
        }
    }
});

expDate.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        const value = e.target.value;
        if (value.endsWith('/')) {
            e.target.value = value.slice(0, -1); 
        }
    }
});


//CVV input

        const securityCode = document.getElementById('security-code');

        securityCode.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) value = value.slice(0, 3);
            e.target.value = value;
        });

        securityCode.addEventListener('blur', (e) => {
            if (e.target.value.length !== 3) {
                alert('CVV must be 3 digits.');
                e.target.value = ''; 
            }
        });



// Order Name Input
const orderName = document.getElementById('order-name');

orderName.addEventListener('input', (e) => {
    let value = e.target.value;

    value = value.replace(/[^a-zA-Z\s]/g, '');

  
    value = value
        .split(/(\s+)/) 
        .map(word => word.trim().length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word)
        .join('');

    e.target.value = value;
});


// Card Name input
    
const cardName = document.getElementById('card-name');

cardName.addEventListener('input', (e) => {
    let value = e.target.value;

    value = value.replace(/[^a-zA-Z\s]/g, '');
    value = value
        .split(/(\s+)/) 
        .map(word => word.trim().length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word)
        .join('');

    e.target.value = value;
});

cardName.addEventListener('blur', (e) => {
    const value = e.target.value.trim();
    const nameParts = value.split(/\s+/); 

    if (nameParts.length < 2 || nameParts.some(part => part.length === 0)) {
        alert('Please enter a valid full name (first and last name).');
        e.target.value = ''; 
    }
});




document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    location.replace("receipt.html"); 
  });

  document.getElementById("cash-input").addEventListener("submit", function (event) {
    event.preventDefault(); 
    location.replace("receipt.html"); 
  });
  


// Pushes checkout info to local storage to be used on the receipt page-----//

  document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const orderName = document.getElementById('order-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardName = document.getElementById('card-name').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const securityCode = document.getElementById('security-code').value.trim();

    const lastFourDigits = cardNumber.slice(-4);

   
    localStorage.setItem('orderName', orderName);
    localStorage.setItem('lastFour', lastFourDigits);
    localStorage.setItem('expiryDate', expiryDate);
    localStorage.setItem('securityCode', securityCode);

    location.replace('receipt.html');
});


document.getElementById('cash-input').addEventListener('submit', function (event) {
    event.preventDefault();
    const orderName = document.getElementById('order-name').value.trim();
    localStorage.setItem('orderName', orderName);
    location.replace('receipt.html');
});