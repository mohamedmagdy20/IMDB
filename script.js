$("#open").click(() => {
  $(".black-sidebar").animate({ width: "250px" }, 500);
  $(".white-sidebar").animate({ left: "250px" }, 500);
  $("#open").css("display", "none");
  $("#close").css("display", "inline");
  $(".links li").slideDown(800, () => {
    $(".links li").fadeIn(800);
  });
});
$("#close").click(() => {
  $(".black-sidebar").animate({ width: "0px" }, 500);
  $(".white-sidebar").animate({ left: "0px" }, 500);
  $("#open").css("display", "inline");
  $("#close").css("display", "none");
  $(".links li").slideUp(800);
});
let allData = [];
let links = document.querySelectorAll(".nav-link");
console.log(links);
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    term = e.target.getAttribute("id");
    if (term == "trending") {
      gettrending();
    } else {
      console.log(term);
      getData(term);
    }
  });
}
async function gettrending() {
  let data = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=f7bace3b9dc82589087c24c469d48a0c`
  );
  let data_details = await data.json();
  console.log(data_details.results.length);

  allData = data_details.results;
  console.log(data_details);
  console.log(allData);
  displayData();
}
async function getData(x) {
  let data = await fetch(
    `https://api.themoviedb.org/3/movie/${x}?api_key=f7bace3b9dc82589087c24c469d48a0c`
  );
  if (data.ok != true) {
    return;
  }
  let data_details = await data.json();
  console.log(data_details.results.length);

  allData = data_details.results;
  console.log(data_details);
  console.log(allData);
  displayData();
}
(async function () {
  await getData("now_playing");
})();
let imgurl = "https://image.tmdb.org/t/p/w500";
let x = document.getElementById("main-result");
function displayData() {
  let str = ``;
  for (let i = 0; i < allData.length; i++) {
    str += ` <div class="col-sm-4 mb-3">
        <div class="post text-center">
          <img src="${imgurl}${allData[i].poster_path}" class="w-100 rounded-2" alt="" />
          <div class="post-content">
            <div class="contnet">
              <h2>${allData[i].original_title}</h2>
              <p>
               ${allData[i].overview}
              </p>
              <p>rate: ${allData[i].vote_average}</p>
              <p>${allData[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>`;
    x.innerHTML = str;
  }
}
/*
let searchmovie = document.getElementById("Serach-movie");
function searchMovie() {
  searchmovie.addEventListener("keyup", () => {
    let word = searchmovie.value;
    let str = ``;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].original_title.includes(word)) {
        str += ` <div class="col-sm-4 mb-3">
        <div class="post text-center">
          <img src="${imgurl}${allData[i].poster_path}" class="w-100 rounded-2" alt="" />
          <div class="post-content">
            <div class="contnet">
              <h1>${allData[i].original_title}</h1>
              <p>
               ${allData[i].overview}
              </p>
              <p>rate: ${allData[i].vote_average}</p>
              <p>${allData[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>`;
        x.innerHTML = str;
      }
    }
  });
}
*/
//searchMovie();
let serachword = document.getElementById("Serach-word");
let searchdata = [];
async function searchbyword(word) {
  let data = await fetch(
    `https://api.themoviedb.org/3/search/movie?query= ${word} &api_key=f7bace3b9dc82589087c24c469d48a0c&language=en-US&include_adult=false`
  );
  if (data.ok != true) {
    return;
  } else {
    let data_details = await data.json();
    searchdata = data_details.results;
    console.log(searchdata);
  }
  let str = ``;
  for (let i = 0; i < searchdata.length; i++) {
    str += ` <div class="col-sm-4 mb-3">
        <div class="post text-center">
          <img src="${imgurl}${searchdata[i].poster_path}" class="w-100 rounded-2" alt="" />
          <div class="post-content">
            <div class="contnet">
              <h2>${searchdata[i].original_title}</h2>
              <p>
               ${searchdata[i].overview}
              </p>
              <p>rate: ${searchdata[i].vote_average}</p>
              <p>${searchdata[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>`;
    x.innerHTML = str;
  }
}
serachword.addEventListener("keyup", () => {
  searchbyword(serachword.value);
});
let usname = document.getElementById("name");
let phone = document.getElementById("phone");
let pass = document.getElementById("pass");
let email = document.getElementById("email");
let age = document.getElementById("age");
let repass = document.getElementById("repass");

function form_name() {
  let regex = /^[a-zA-Z\-]+$/;
  if (regex.test(usname.value)) {
    console.log(usname.value);
    $("#namealert").css("display", "none");
  } else {
    $("#namealert").css("display", "block");
  }
}
usname.addEventListener("keyup", () => {
  form_name();
});

function form_phone() {
  let regex = /^01[0125][0-9]{8}$/;
  if (regex.test(phone.value)) {
    console.log(phone.value);
    $("#phonealert").css("display", "none");
  } else {
    $("#phonealert").css("display", "block");
  }
}
phone.addEventListener("keyup", () => {
  form_phone();
});

function form_pass() {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (regex.test(pass.value)) {
    console.log(pass.value);
    $("#passalert").css("display", "none");
  } else {
    $("#passalert").css("display", "block");
  }
}
pass.addEventListener("keyup", () => {
  form_pass();
});
function form_email() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(email.value)) {
    console.log(email.value);
    $("#Emailalert").css("display", "none");
  } else {
    $("#Emailalert").css("display", "block");
  }
}
email.addEventListener("keyup", () => {
  form_email();
});
function form_Age() {
  let regex = /^\S[0-9]{0,3}$/;
  if (regex.test(age.value)) {
    console.log(age.value);
    $("#agealert").css("display", "none");
  } else {
    $("#agealert").css("display", "block");
  }
}
age.addEventListener("keyup", () => {
  form_Age();
});

function form_repass() {
  if (repass.value == pass.value) {
    console.log(repass.value);
    $("#repassalert").css("display", "none");
  } else {
    $("#repassalert").css("display", "block");
  }
}
repass.addEventListener("keyup", () => {
  form_repass();
});
