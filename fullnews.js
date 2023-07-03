// ---------------------------------------------------------< For News Category >---------------------------------------------------------

let UserFrom = document.getElementById('UserNewsFrom');
let UserTo = document.getElementById('UserNewsTo');

let From,To,FromYear,FromMonth,FromDate,ToYear,ToMonth,ToDate;

UserFrom.addEventListener('input', () => {
    if (document.getElementById('UserNewsFrom').value != null && document.getElementById('UserNewsFrom').value != undefined) {
        From = document.getElementById('UserNewsFrom').value;
        console.log("Satrt");
        FromYear = parseInt(From.substr(0, 4));
        FromMonth = parseInt(From.substr(5, 2));
        FromDate = parseInt(From.substr(8, 2));
    }
});

UserTo.addEventListener('input', () => {
    if (document.getElementById('UserNewsTo').value != null && document.getElementById('UserNewsTo').value != undefined) {
        To = document.getElementById('UserNewsTo').value;
        ToYear = parseInt(To.substr(0, 4));
        ToMonth = parseInt(To.substr(5, 2));
        ToDate = parseInt(To.substr(8, 2));
    }
});

// My API Key : 4d381142bc154c4aae111c608a8d0384
let APIKey = '4d381142bc154c4aae111c608a8d0384';

let searchNews = document.getElementById("searchNews");

searchNews.addEventListener('click', fetchNews);
function fetchNews() {

    let keyword = document.getElementById('UserKeyword').value;
    let sortBy = document.getElementById('UserSortby').value;
    let searchType;
    if (document.getElementById('Headlines').checked) {
        searchType = "qInTitle";
    }
    else if (document.getElementById('HeadlineWholeArticle').checked) {
        searchType = "q";
    }
    let url = `https://newsapi.org/v2/everything?sortBy=${sortBy}`;
    console.log("keyword : ", keyword);
    console.log("sortBy : ", sortBy);
    console.log("searchType : ", searchType);

    console.log(From);
    console.log(To);
    if((From!=null && To!=null && From!=undefined && To!=undefined))
    {   
        if (FromYear <= ToYear && FromMonth <= ToMonth && FromDate < ToDate)
        {
            console.log(FromYear);
            console.log(FromMonth);
            console.log(FromDate);
            console.log(ToYear);
            console.log(ToMonth);
            console.log(ToDate);
        }
        else
        {
            alert("invalid Dates !!")
        }
    }
    if (keyword == null || keyword == "" || keyword == undefined) {

        if ((From != null || From != undefined)) {
            url += `&from=${From}`;
        }
        if ((To != null || To != undefined)) {
            url += `&to=${To}`;
        }
    }
    else {
        url += `&${searchType}=${keyword}`;
        if ((From != null || From != undefined)) {
            url += `&from=${From}`;
        }
        if ((To != null || To != undefined)) {
            url += `&to=${To}`;
        }
    }
    url += `&apiKey=${APIKey}`;

    console.log(url);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    let SearchedNews = document.getElementById('SearchedNews');
    let newsAccordion = document.getElementById("newsAccordion");

    xhr.onload = function () {
        if (this.status == 200)  // All OK
        {
            let APIData = JSON.parse(this.responseText);
            let NewsArticels = APIData.articles;
            console.log("Data : ", NewsArticels);

            let newsHTML = "";

            NewsArticels.forEach((item,index) => {
                console.log(item);
                let news = `<h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" id="NewsHeading" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                                    aria-expanded="true" aria-controls="collapse${index}">
                                    ${item.title}
                                </button>
                            </h2>
                            <!--Add class hide to hide the-->
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body Newscontent">
                                    ${item.description}. <a href="${item.url}" target ="_blank">Read more here</a>
                                </div>
                            </div>`;

                newsHTML +=news;
            });
            SearchedNews.innerHTML = newsHTML;
            // document.getElementById('collapse0').setAttribute('class','accordion-collapse collapse show');
        }
        else if(this.status === 426)
        {
            SearchedNews.innerHTML = `<h1>Our Server has been Busy</h1>`;
        }
        else {
            SearchedNews.innerHTML = `<h1>Some error occur </h1>`;
        }
    }
    xhr.send();

        
}

fetchNews();







// qInTitle
// Keywords or phrases to search for in the article title only.

// news regarding any topic in title and body: 
// https://newsapi.org/v2/everything?q=<topic>&apiKey=${APIKey}

// sortBy : 

// The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
// relevancy = articles more closely related to q come first.
// popularity = articles from popular sources and publishers come first.
// publishedAt = newest articles come first.

// Default: publishedAt

// from

// A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2021-11-19 or 2021-11-19T07:45:31)

// Default: the oldest according to your plan.
// to

// A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2021-11-19 or 2021-11-19T07:45:31)

// Default: the newest according to your plan.

// category

// Find sources that display news of this category. Possible options: businessentertainmentgeneralhealthsciencesportstechnology