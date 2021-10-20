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

export {getData, appendSearch, searchRecipe, searchDebouncing, showNotFound}