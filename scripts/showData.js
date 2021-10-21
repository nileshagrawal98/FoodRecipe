async function getData(url){
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

function appendSearch(data, container){
    container = document.getElementById(container);
    console.log(data);
    container.innerHTML = "";

    container.style.display = "block";
    
    data.meals.forEach((el) => {
        let div = document.createElement("div");
        div.id = "search_result_div";

        div.onclick = function() {
            localStorage.setItem("meal_id", el.idMeal);
            window.location.href = "showRecipe.html";
        }

        let img_div = document.createElement("div");
        let img = document.createElement("img");
        img.src = el.strMealThumb;
        img_div.append(img);

        let name = document.createElement("p");
        name.innerText = el.strMeal;

        let type = document.createElement("p");
        type.innerText = el.strArea;

        let detail = document.createElement("div");
        detail.append(name, type);

        div.append(img_div, detail);

        container.append(div);
    })

}

function searchRecipe() {
    let query = document.getElementById("query").value;
    if(query == ""){
        return;
    }
    let search_data = getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    search_data.then((res) => {
        appendSearch(res, "search_result");
    }).catch((e) => {
        console.log(e);
        showNotFound();
    })
}

let searchTimeOut;

function searchDebouncing(){
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(function(){
        searchRecipe();
    },1000);  
}

function showNotFound(){
    let div = document.createElement("div");

    div.className = "not-found";

    let notfound = document.createElement("p");
    notfound.innerText = "No search result found";

    let img = document.createElement("img");
    img.src = 'images/notFound.png';

    div.append(notfound, img);

    document.getElementById("search_result").append(div);
}


async function appendRecipe(recipe) {

    let ingredients = document.getElementById("ingredients");

    document.getElementById("recipe_name").innerText = recipe.strMeal;

    document.getElementById("mealImg").src = recipe.strMealThumb;

    for (let i = 0; i < 20; i++) {

        let ingredient = recipe["strIngredient" + (i + 1)];

        if (ingredient !== "" && ingredient !== null) {

            let measure = recipe["strMeasure" + (i + 1)];

            let li = document.createElement("li");

            li.innerText = ingredient + " - " + measure;

            ingredients.append(li);
        }
    }

    let instructions = document.createElement("ol");

    let instruction = recipe.strInstructions.split("\r\n");

    instruction.forEach(el => {
        let li = document.createElement("li");
        li.innerText = el;
        if (el !== "") {
            instructions.append(li);

        }
    })

    document.getElementById("instructions").append(instructions);

    let video_id = recipe.strYoutube.split("v=");

    let video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video_id[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    document.getElementById("video").innerHTML = video;

    addTagInfo(recipe);
}

function addTagInfo(recipe) {
    let tags = document.getElementById("tags");

    if (recipe.strTags == "" || recipe.strTags == null) {
        document.getElementById("tag-container").style.display = "none";
    } else {
        let tag = recipe.strTags.split(",");

        tag.forEach(e => {
            if (e !== "") {
                let span = document.createElement("span");

                span.innerText = e;

                tags.append(span);
            }

        });
    }

    let info = document.getElementById("info");

    let category = document.createElement("span");
    category.innerText = "Category: " + recipe.strCategory;

    let area = document.createElement("span");
    area.innerText = "Area: " + recipe.strArea;

    info.append(category, area);
}

function setRecipeLayout(){
    return `<div class="container">
    <h1 id="recipe_name"></h1>
    <div id="info"></div>
    <div id="visual">
        <div id="video"></div>
    </div>
    <div id="ingredients_area">
        <div>
            <h2>Ingredients</h2>
            <ul id="ingredients"></ul>
        </div>
        <div>
            <img id="mealImg">
        </div>
    </div>
    <div id="instructions">
        <h2>Instructions</h2>
    </div>
    <div id="tag-container">
        <h4>Tags</h4>
        <div id="tags"></div>
    </div>
</div>`
}

export {getData, appendSearch, searchRecipe, searchDebouncing, showNotFound, appendRecipe, addTagInfo, setRecipeLayout};