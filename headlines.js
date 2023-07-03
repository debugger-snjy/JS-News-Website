// My API Key : 4d381142bc154c4aae111c608a8d0384

console.log("This is LIVE News !!");

// Initializing the news API Parameters :
let source = 'the-times-of-india';
let APIKey = '4d381142bc154c4aae111c608a8d0384';
let HeadlineCountry = document.getElementById('Headline-Country').value;


function fetchheadlines() {
    // Grab the news container
    let newsAccordion = document.getElementById("newsAccordion");

    let keyword = document.getElementById('UserKeyword').value;
    console.log("keyword : ",keyword);
    let category = document.getElementById('UserCategory').value;
    console.log("category : ",category);
    let HeadlineCountry = document.getElementById('Headline-Country').value;
    console.log("Headline : ",HeadlineCountry);
    let url;

    if((keyword=="" || keyword==null ||keyword==undefined) && category=="all")
    {
        console.log("Empty Keyword");
        url = `https://newsapi.org/v2/top-headlines?country=${HeadlineCountry}&apiKey=${APIKey}`
    }
    else if((keyword=="" || keyword==null ||keyword==undefined) && category!="all")
    {
        console.log("Empty Keyword and other category");
        url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${HeadlineCountry}&apiKey=${APIKey}`
    }
    else
    {
        if(category=="all")
        {
            url = `https://newsapi.org/v2/top-headlines?q=${keyword}&country=${HeadlineCountry}&apiKey=${APIKey}`
        }
        else
        {
            url = `https://newsapi.org/v2/top-headlines?q=${keyword}&category=${category}&country=${HeadlineCountry}&apiKey=${APIKey}`
        }
        
        console.log(url);
    }
    // Creating a get request
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

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
            newsAccordion.innerHTML = newsHTML;
            // document.getElementById('collapse0').setAttribute('class','accordion-collapse collapse show');
        }
        else if(this.status === 426)
        {
            newsAccordion.innerHTML = `<h1>Our Server has been Busy</h1>`;
        }
        else {
            newsAccordion.innerHTML = `<h1>Some error occur </h1>`;
        }
    }

    xhr.send();
}
fetchheadlines();

document.getElementById('Headline-Country').addEventListener('input',()=>{
    HeadlineCountry = document.getElementById('Headline-Country').value;
    // console.log(HeadlineCountry);
    fetchheadlines();
});

