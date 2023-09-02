// Get catagoriies and handle them
const handleCatagories = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    const catagoriiesCollection = data.data;

    catagoriiesCollection.forEach((catagory) => {
        catagoryButton(catagory.category_id, catagory.category);
    });
};

// craete catagory button
const buttonContainer = document.getElementById("button-container");
const catagoryButton = (id, name) => {
    const catagoryBtn = document.createElement("button");
    catagoryBtn.innerText = name;
    catagoryBtn.classList.add("btn");
    buttonContainer.appendChild(catagoryBtn);
    catagoryBtn.addEventListener("click", function () {
        showData(id);
    });
};

// card show by clicking button
const cardContainer = document.getElementById("card-container");
const noContent = document.getElementById("no-content");
const showData = async (id) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();

    if (data.data.length == 0) {
        noContent.classList.remove("hidden");
    } else {
        noContent.classList.add("hidden");
    }
    createCard(data.data);
    sortCard(data.data);
};
// card create and append them
const createCard = (data) => {
    cardContainer.innerHTML = "";
    data.forEach((content) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card card-compact max-w-xs bg-base-100 shadow-xl mx-auto rounded-none">
            <figure class="relative" >
                <img class="w-full h-[200px] rounded-none" src="${
                    content.thumbnail
                }" alt="Shoes" />
                <p  class="text-xs text-white  bg-black inline absolute bottom-0 right-0">${timeConverter(
                    content.others?.posted_date
                )}</p>
            </figure>
            <div class="card-body p-0">
              <div class="flex  gap-4">
                <div><img class="w-[40px] h-[40px] rounded-full" src="${
                    content.authors[0].profile_picture
                }" alt=""></div>
                <div><h1 class="font-bold text-base">${content.title}</h1></div>
              </div>
              <p class="text-gray-400 text-sm">${
                  content.authors[0].profile_name
              } ${
            content.authors[0].verified === true
                ? '<i class="fa-solid fa-certificate text-[#2568EF]"></i>'
                : ""
        }</p>
              <p class="text-gray-400 text-sm"> ${
                  content.others?.views
              } views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
};
// function for time coverter (sec to min and hour)
const timeConverter = (sec) => {
    let second = sec;
    let hour = Math.floor(second / 3600);
    let reminderSec = second % 3600;
    let min = Math.floor(reminderSec / 60);
    if (sec == 0) {
        return "";
    } else {
        return hour + " Hrs " + min + " Mins ago";
    }
};
handleCatagories();
// for default shows in a screen
showData(1000);
// blogg new page Open
document.getElementById("Blog").addEventListener("click", function () {
    window.location.href = "blog.html";
});
// sorting the card
const sortCard = (data) => {
    data.forEach((cont) => {
        console.log(typeof cont.others.views);
    });
    data.sort(
        (a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1)
    );
    document.getElementById("sort-btn").addEventListener("click", function () {
        createCard(data);
    });
};
