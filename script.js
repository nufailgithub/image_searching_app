const accesskey = "9G-jyEqRwxmllX2cNvzIu_uSCxgTmaVj_GduWSdLssg"

const form1 =  document.querySelector("form");
const inputE1 = document.getElementById("input_search");
const searchResults = document.querySelector(".search_results");
const showBtn = document.getElementById("next_button");

let inputData = "";
let page = 1;



async function SearchImages(){
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1){
        searchResults.innerHTML= ""
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search_result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page>1){
        showBtn.style.display = "block"
    }
}


form1.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    SearchImages()
})



showBtn.addEventListener("click",()=>{
    SearchImages()
})