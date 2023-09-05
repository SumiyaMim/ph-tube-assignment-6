let category = [];

// show category
const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    // console.log(categories)

    const tabContainer = document.getElementById("tab-container");
   
    categories.forEach(category => {
        // console.log(category);
        const div = document.createElement("div");

        div.innerHTML = `
        <button onclick="handleLoadVideos('${category.category_id}')" class="tab bg-[#252525] bg-opacity-10 text-gray-600 px-4 rounded font-medium focus:bg-primary-color focus:text-white">${category.category}</button>        
        `;

        tabContainer.appendChild(div);
    });
}

// fetch video data
const handleLoadVideos = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json()
    category = data.data;
    // console.log(category);
    displayVideos(category);
}

// show all video card
const displayVideos = async () => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const noContentContainer = document.getElementById("no-content-container");
    noContentContainer.innerHTML = "";

    if (category.length === 0) {
        const div = document.createElement("div");
        div.innerHTML = `
       <div class="text-center">
            <img src="./image/icon.png" class="mb-5 w-28 mx-auto">
            <p class="text-lg font-bold">Oops!! Sorry, There is no <br>content here</p>
       </div>
        `;
        noContentContainer.appendChild(div);
    } 
    else {
    category.forEach((videos) => {
        // console.log(video)
        const div = document.createElement("div");

        const seconds = videos?.others?.posted_date;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        div.innerHTML = `
        <div class="pb-2">
            <div class="mb-6 relative">
                <img src=${videos?.thumbnail} class="w-full h-48 lg:h-44 rounded-lg">
                ${videos?.others?.posted_date !== "" ? 
                `<h5 class="bg-[#171717] px-3 py-1 absolute right-2 bottom-2 text-white text-sm rounded-md">${hours} hrs ${minutes} min ago</h5>` 
                : ''}
            </div>
            <div class="flex gap-3">
                <div>
                    <img src=${videos?.authors[0]?.profile_picture} class="w-10 h-10 rounded-full">
                </div>
                <div>
                    <h2 class="text-base font-bold mb-2">${videos?.title}</h2>
                    <div class="mb-2 flex gap-3">
                        <div>
                            <h4 class="text-sm text-gray-500 font-medium">${videos?.authors[0]?.profile_name}</h4>
                        </div>
                        <div>
                            ${videos?.authors[0]?.verified == true ? 
                            `<img src="./image/verified.png">` 
                            : ''}
                        </div>
                    </div>
                    <h4 class="text-sm text-gray-500 font-medium"><span>${videos?.others?.views}</span> views</h4>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })
   }
}

// handle sort by views
const handleSortButton = () => {
    category.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.split('K')[0]) * 1000;
        const viewsB = parseFloat(b.others.views.split('K')[0]) * 1000;
        return viewsB - viewsA;
    });
    displayVideos(category);
}
    
handleCategory();
handleLoadVideos("1000");