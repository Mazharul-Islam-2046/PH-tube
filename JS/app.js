// Menu API Data Fetch
const menu = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    showCategories(categories);
}

// showCategories Function
const showCategories = (categories) => {
    // Getting the menu Container
    const menuContainer = document.getElementById("menu");
    
    // Loop
    categories.forEach(element => {
        const categoriesName = element.category
        const categoriesID = element.category_id
        
        // Creating Category Btn
        const menuDiv = document.createElement('div');

        // Inner HTML
        menuDiv.innerHTML = `
        <button onclick = "videos(${categoriesID})" class="${categoriesName} text-black px-5 py-2 bg-slate-400 rounded-md">
        ${categoriesName}
        </button>`

        // Append
        menuContainer.appendChild(menuDiv)
    });
}

// Videos API Data Fetch
const videos = async (categoriesID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoriesID}`);
    const data = await res.json();
    const haveData = data.status;
    showData(data, haveData);
}

// Videos Shows
const showData = (data, haveData) => {
    const videosContainer = document.getElementById('videosContainer');

    if (haveData === true) {
        const videos = data.data
        videos.forEach(element => {
            const thumbnail = element.thumbnail;
            const title = element.title;
            const authorspp = element.authors[0].profile_picture
            const authorName = element.authors[0].profile_name
            const isVarified = element.authors[0].verified
            const views = element.others.views
            const postedDate = element.others.posted_date
            console.log(postedDate);

        });
    } else {
        console.log(false);
    }
}

menu();