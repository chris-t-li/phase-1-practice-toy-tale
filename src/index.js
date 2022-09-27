let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys/')
    .then(res => res.json())
    .then(data => {
      for (const id in data) {
        renderCards(data[id])
      }
    })

  function renderCards(data) {
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const button = document.createElement('button');

    card.className = 'card';
    h2.textContent = data.name;
    img.src = data.image;
    img.className = "toy-avatar";
    p.textContent = `${data.likes} likes`;
    button.textContent = "like";
    document.querySelector('#toy-collection').appendChild(card);
    card.append(h2, img, p, button)

    button.addEventListener('click', ()=> {
      fetch(`http://localhost:3000/toys/${data.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": data.likes += 1
        })
      })
      p.textContent = `${data.likes} likes`;
    })
  }

  document.querySelector('.submit').addEventListener('click', e => {
    e.preventDefault();
    const newToyName = document.querySelector('#newName')
    const newImage = document.querySelector('#newImage')
    const newToyObj = {
      name: newToyName.value,
      image: newImage.value,
      likes: 0
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newToyObj)
    }

    fetch('http://localhost:3000/toys/', configObj)
      .then(res => res.json())
      .then(data => renderCards(data))
  })
});
