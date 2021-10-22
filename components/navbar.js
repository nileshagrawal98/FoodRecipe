function navbar() {
    return `<nav class="nav-container">
    <img src="https://img.icons8.com/ios-glyphs/30/000000/cutlery.png" />
    <a href="index.html" class="nav-option">Home</a>
    <a href="recipeOfDay.html" class="nav-option">Recipe of Day</a>
    <a href="latest.html" class="nav-option">Latest Recipe</a>
</nav>`
}

function setPageIcon(){
    let icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = "https://img.icons8.com/ios-glyphs/30/000000/cutlery.png";
    icon.type = "image/icon type";
    document.head.append(icon);
}

export {navbar, setPageIcon};