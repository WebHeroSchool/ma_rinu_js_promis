setTimeout(() => {
  let preloader = document.querySelector('.preloader');
  preloader.classList.add('visible');
  let body = document.querySelector('.card_container');
  let url = window.location.toString();
  let urlApi = 'https://api.github.com/users/';
  let date = new Date();

  let nameFromUrl = (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if (name == undefined) {
      name = 'MarinaMix';
    }
    return name;
  }

  let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('Ошибка!'),1000);
  });

  let getUrl = new Promise((resolve,reject) => {
    setTimeout(() => resolve(`${urlApi}${nameFromUrl(url)}`),1000);
  });

  Promise.all([getUrl,getDate])
    .then(([url,date]) => fetch(url))
    .then(info => info.json())
    .then(json => {
      let photo = document.createElement('img');
      photo.src = json.avatar_url;
      body.append(photo);

      let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация недоступна';
        }
        body.append(name);
        name.addEventListener("click", () => window.location = json.html_url);

        let bio = document.createElement('p');
          if (json.bio != null) {
              bio.innerHTML = json.bio;
          } else {
              bio.innerHTML = 'Информация недоступна';
          }
          body.append(bio);

        let dateContainer = document.createElement('p');
        dateContainer.innerHTML = `Дата: ${Date()}`;
        body.appendChild(dateContainer);
    })
    .catch(err =>  alert('Информация недоступна'));
},4000)
