// Menu API Data Fetch
const menu = async (isFirstLoad) => {
	const res = await fetch(
		"https://openapi.programming-hero.com/api/videos/categories"
	);
	const data = await res.json();
	const categories = data.data;
	showCategories(categories, isFirstLoad);
};

// showCategories Function
const showCategories = (categories, isFirstLoad) => {
	// Getting the menu Container
	const menuContainer = document.getElementById("menu");

	// Loop
	categories.forEach((element) => {
		const categoriesName = element.category;
		const categoriesID = element.category_id;

		// Creating Category Btn
		const menuDiv = document.createElement("div");

		// Inner HTML
		menuDiv.innerHTML = `
        <button onclick = "videos(${categoriesID}) ; redBtn(this)" class="btn text-black px-5 py-2 bg-slate-400 rounded-md">
        ${categoriesName}
        </button>`;

		// Append
		menuContainer.appendChild(menuDiv);
	});

	if (isFirstLoad) {
		const btn = document.querySelector(".btn");
		btn.classList.replace("bg-slate-400", "bg-[#FF1F3D]");
		btn.classList.replace("text-black", "text-white");
	}
};


// Red Btn categories
const redBtn = (target) =>{
	const btnList = document.querySelectorAll(".btn");
	for (const btn of btnList) {
		btn.classList.replace("bg-[#FF1F3D]", "bg-slate-400");
		btn.classList.replace("text-white", "text-black");
	}
	target.classList.replace("bg-slate-400", "bg-[#FF1F3D]");
	target.classList.replace("text-black", "text-white");
}

// Videos API Data Fetch
const videos = async (categoriesID) => {
	// Fetching Data
	const res = await fetch(
		`https://openapi.programming-hero.com/api/videos/category/${categoriesID}`
	);
	const data = await res.json();
	const haveData = data.status;
	showData(data, haveData);
};

// Videos Shows
const showData = (data, haveData) => {
	const videosContainer = document.getElementById("videosContainer");
	videosContainer.innerHTML = "";

	if (haveData === true) {
		const videos = data.data;
		videos.forEach((element) => {
			const thumbnail = element.thumbnail;
			const title = element.title;
			const authorspp = element.authors[0].profile_picture;
			const authorName = element.authors[0].profile_name;
			const isVarified = element.authors[0].verified;
			const views = element.others.views;
			const postedDate = element.others.posted_date;

			// Create Element
			const div = document.createElement("div");
			if (isVarified === true) {
				div.innerHTML = `<div id="videosCard" class="max-w-80">
            <div class = "position: relative">
			<img src="${thumbnail}" alt="" class="h-[13vw] max-h-[176px] w-full rounded-md">
			<p id = "${postedDate}" class = "position: absolute bottom-4 right-4 bg-black text-white">
			</p>
			</div>
            <div id="details" class="mt-4 flex gap-4">
                <div id="pp">
                    <img src="${authorspp}" alt="" class="w-10 h-10 rounded-full">
                </div>

                <div id="videoDetails" class="flex flex-col">
                    <p id="videoTitle" class="font-bold">
                        ${title}
                    </p>
                    <p id="cName" class="text-sm mt-1 mb-2">
                        ${authorName} <span id = "blueTik"><img src="img/istockphoto-1396933001-612x612.jpg" alt="" class = "w-7 h-7 inline-block"></span>
                    </p>
                    <p id="views" class="text-sm">${views} views</p>
                </div>
            </div>
        </div>`;
			} else {
				div.innerHTML = `<div id="videosCard" class="max-w-80">
            <div class = "position: relative">
			<img src="${thumbnail}" alt="" class="h-[13vw] max-h-[176px] w-full rounded-md">
			<p id = "${postedDate}" class = "position: absolute bottom-3 right-2 bg-black text-white px-2 py-1 text-sm">
			</p>
			</div>
            <div id="details" class="mt-4 flex gap-4">
                <div id="pp">
                    <img src="${authorspp}" alt="" class="w-10 h-10 rounded-full">
                </div>

                <div id="videoDetails" class="flex flex-col">
                    <p id="videoTitle" class="font-bold">
                        ${title}
                    </p>
                    <p id="cName" class="text-sm mt-1 mb-2">
                        ${authorName} <span id = "blueTik"></span>
                    </p>
                    <p id="views" class="text-sm">${views} views</p>
                </div>
            </div>
        </div>`;
			}

			// Append Data
			videosContainer.classList.add("grid")
			videosContainer.appendChild(div);

			// logic for posted date
			if (postedDate.length > 0) {
				const days = Math.floor(postedDate/86400);
				const hours = Math.floor((postedDate%86400)/3600);
				const mins = Math.floor(((postedDate%86400)%3600) / 60);
				const postedDateString = `${postedDate}`
				const postedDateContainer = document.getElementById(postedDateString);
				if (days >= 30) {
					postedDateContainer.innerText = `Long ago`;
				}
				else if (days > 0 && days < 30) {
					postedDateContainer.innerText = `${days} days ago`;
				}else{
					postedDateContainer.innerText = `${hours}hrs ${mins}min ago`;
				}
			}
		});
	} else {
		videosContainer.classList.remove("grid")
		videosContainer.innerHTML = `
		<div class="flex flex-col items-center h-screen w-full gap-8 mt-20">
    		<img src="img/Icon.png" alt="">
    		<p class= "text-3xl font-bold text-center">
        	Oops!! Sorry, There is no <br> content here
    		</p>
		</div>
		`;
	}
};

menu(true);
videos(1000);
