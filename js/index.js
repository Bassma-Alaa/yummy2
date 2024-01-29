//NavBar
function openNav(){
    $('.side-nav-menu').animate({left:0},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
}

function closeSideNav() {
    $(".side-nav-menu").animate({left:-256.562 }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
}
closeSideNav();

$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openNav()
    }
})

function showSearch(){
    document.getElementById('searchContainer').classList.remove('d-none');
    document.getElementById('data').classList.add('d-none');
}

















let data = document.getElementById("rowData");
let search = document.getElementById("searchContainer");

//show  meals on the start page
let meals = [];
async function startPage(){
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    arr = await respone.json()
    meals = arr.meals

    dispalyStart(meals)
    $(".inner-loading-screen").fadeOut(300)
}
function dispalyStart(){
    let cartona = "";

    for (let i = 0; i < meals.length ; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${meals[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona
}
startPage();

//show  information about one meal
let meal = [];
async function getMealDetails(mealID) {
    closeSideNav()
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    arr = await respone.json();
    meal = arr.meals
    displayMealDetails();
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(){

    let ingredients = meal[0];
    let ingredientsContent = ``

    for (let i = 1; i <= 20; i++) {
        if (ingredients[`strIngredient${i}`]) {
            ingredientsContent += `<li class="alert alert-info m-2 p-1">${ingredients[`strMeasure${i}`]} ${ingredients[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal[0].strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let button = `<button type="button" onclick="startPage()" class="close btn btn-dark" >
    <span aria-hidden="true">&times;</span>
  </button>`
    let cartona = `
    <div class="col-md-4 text-black-50" >
                <img class="w-100 rounded-3" src="${meal[0].strMealThumb
                }"
                    alt="">
                    <h2>${meal[0].strMeal}</h2>
            </div>
            <div class="col-md-8 text-black-50">
                <h2>Instructions</h2>
                <p>${meal[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredientsContent}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
                </ul>
                    <a target="_blank" href="${meal[0].strSource}">
                        <button class="button">
                            Source
                        </button>
                    </a>
                    <a target="_blank" href="${meal[0].strYoutube}" >
                        <button class="button">
                        Youtube
                        </button>
                    </a>
            </div>`

    data.innerHTML =button + cartona
}





//show  Area

async function getArea() {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    arr = await respone.json()
    area = arr.meals

    displayArea(area)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(area) {
    searchContainer.innerHTML=''
    let cartona = "";

    for (let i = 0; i < area.length ; i++) {
        cartona += `
        <div class="col-md-3 text-black-50">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    data.innerHTML = cartona
}

async function getAreaMeals(area) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    arr = await response.json();
    areaMeal = arr.meals

    dispalyAreaMeals(areaMeal);
    $(".inner-loading-screen").fadeOut(300)

}
function dispalyAreaMeals(areaMeal){
    let cartona = "";
    let button = `<button type="button" onclick="getArea()"  class="btn btn-outline-dark">
    Back
</button>`
    for (let i = 0; i < areaMeal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${areaMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${areaMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${areaMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = button + cartona
}

//show  Categories

async function getCategories() {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    arr = await response.json()
    Categories = arr.meals

    displayCategories(arr.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(Categories) {
    searchContainer.innerHTML=''
    let cartona = "";

    for (let i = 0; i < Categories.length; i++) {
        cartona += `
        <div class="col-md-3 ">
                <div onclick="getCategoryMeals('${Categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${Categories[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${Categories[i].strCategory}</h3>
                        <p>${Categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    data.innerHTML = cartona
}

async function getCategoryMeals(Categories) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categories}`)
    arr = await response.json()
    CategorieMeal = arr.meals

    dispalyCategoryMeals(CategorieMeal)
    $(".inner-loading-screen").fadeOut(300)

}
function dispalyCategoryMeals(CategorieMeal){
    let cartona = "";
    let button = `<button type="button" onclick="getCategories()"  class="btn btn-outline-dark">
    Back
</button>`
    for (let i = 0; i < CategorieMeal.length; i++) {
        cartona += `
        
        <div class="col-md-3">
                <div onclick="getMealDetails(${CategorieMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${CategorieMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${CategorieMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = button + cartona
}


//show  Ingredients

async function getIngredients() {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    arr = await respone.json()
    

    displayIngredients(arr.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    searchContainer.innerHTML=''
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3 text-black-50">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <img src="https://www.themealdb.com/images/ingredients/${arr[i].strIngredient}.png" class="w-100">
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    data.innerHTML = cartona
}

async function getIngredientsMeals(ingredients) {
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    arr = await response.json()
    ingredientsmeal = arr.meals

    dispalyingredientsMeals(arr.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

function dispalyingredientsMeals(ingredientsmeal){
    let cartona = "";
    let button = `<button type="button" onclick="getIngredients()"  class="btn btn-outline-dark">
    Back
</button>`
    for (let i = 0; i < ingredientsmeal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${ingredientsmeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${ingredientsmeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${ingredientsmeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = button + cartona
}





//search
let searchContainer = document.getElementById("searchContainer");

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6 ">
        <div class="main">
<input id="searchData"  oninput="getDataBySearch()" placeholder="Search By Name" class="input" name="text" type="text">
<label>
<span style="transition-delay:0ms;left:10px">S</span>
<span style="transition-delay:75ms;left:25px">e</span>
<span style="transition-delay:150ms;left:40px">a</span>
<span style="transition-delay:225ms;left:55px">r</span>
<span style="transition-delay:300ms;left:70px">c</span>
<span style="transition-delay:375ms;left:85px">h</span>
<p style="position:absolute;left:-8px;top:-10px;font-size:24px;margin:10px;color:gray;transition:0.5s;pointer-events:none;">Search By Name</p>
</label>
</div>
        </div>
        <div class="col-md-6">
        <div class="main">
<input  id="searchletter" oninput="getDataBySearchLetter()" maxlength="1" placeholder="Search By First Letter" class="input" name="text" type="text" >
<label>
<span style="transition-delay:0ms;left:10px">S</span>
<span style="transition-delay:75ms;left:25px">e</span>
<span style="transition-delay:150ms;left:40px">a</span>
<span style="transition-delay:225ms;left:55px">r</span>
<span style="transition-delay:300ms;left:70px">c</span>
<span style="transition-delay:375ms;left:85px">h</span>
<p style="position:absolute;left:-8px;top:-10px;font-size:24px;margin:10px;color:gray;transition:0.5s;pointer-events:none;">Search By letter</p>
</label>
</div>
        </div>
    </div>`

    data.innerHTML = ""
}



async function getDataBySearch(){
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let searchInput = document.getElementById("searchData").value

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    arr = await respone.json()
    searchMeal = arr.meals
    console.log(searchMeal)

    dispalySearch(searchMeal)
    $(".inner-loading-screen").fadeOut(300)
}
async function getDataBySearchLetter(){
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    let searchLetter = document.getElementById("searchletter").value

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`)
    arr = await respone.json()
    searchMeal = arr.meals
    console.log(searchMeal)

    dispalySearch(searchMeal)
    $(".inner-loading-screen").fadeOut(300)
}
function dispalySearch(){
    let cartona = "";

    for (let i = 0; i < searchMeal.length ; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails(${searchMeal[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${searchMeal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${searchMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona
}


//contact us

function showContacts() {
    searchContainer.innerHTML=''
    data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button class="ui-btn btn px-2 mt-3" id="submitBtn" disabled="">
            <span>
                Submit
            </span>
        </button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched == true) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched  == true) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched  == true) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched  == true) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched  == true) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched  == true) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()  == true) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^(?:\+?20)?(01)[0125]\d{8}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}