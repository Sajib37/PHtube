// Get catagoriies and handle them
const handleCatagories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const catagoriiesCollection = data.data;

    catagoriiesCollection.forEach(catagory => {
        catagoryButton(catagory.category_id, catagory.category);
    });
}

// craete catagory button
const buttonContainer = document.getElementById('button-container');
const catagoryButton=(id,name)=>{
    const catagoryBtn = document.createElement('button');
    catagoryBtn.innerText = name;
    catagoryBtn.classList.add('btn')
    buttonContainer.appendChild(catagoryBtn)
    catagoryBtn.addEventListener("click", function () {
        showData(id);
    })
}

// data show by clicking button
const cardContainer = document.getElementById('card-container');
const showData =async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    cardContainer.innerHTML = '';
    data.data.forEach(content => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact max-w-xs bg-base-100 shadow-xl mx-auto rounded-none">
            <figure ><img class="w-full h-[200px] rounded-none" src="${content.thumbnail}" alt="Shoes" /></figure>
            <div class="card-body p-0">
              <div class="flex items-center gap-1">
                <div><img class="w-[40px] h-[40px] rounded-full" src="${content.authors[0].profile_picture}" alt=""></div>
                <div><h1 class="font-bold ">${content.title}</h1></div>
              </div>
            </div>
        </div>
        `
        cardContainer.appendChild(div);
    })
}

handleCatagories();