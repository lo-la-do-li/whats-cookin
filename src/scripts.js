const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");


trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
window.addEventListener('load', onLoad);

function onLoad() {
  getRandomUser()
  //getRandomUser function

}

function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomUser() {
  user = new User(getRandomIndex(usersData))
  userPantry = new Pantry(user);
  let message = document.querySelector('.whats-cookin-message');
  message.innerHTML = `What's Cookin' in ${user.name}'s Kitchen?`
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
    //add other winow event targets here
  }
}

function displayElement(className) {
  document.querySelector(`.${className}`).remove('hidden')
}

function hideElement(className) {
  document.querySelector(`.${className}`).add('hidden')
}

function displayRecipes() {
recipesData.forEach =
`
<section class="recipe-data" id="${recipe.id}">
  <article>
    <figure>
      <img class="recipe-image" src="${recipe.image}",
      "ingredients" alt="${recipe.name}" />
    </figure>
    <hgroup>
      <h2>${recipe.name}</h2>
      <h3>${recipe.tags}</h3>
    </hgroup>
    <p>
      <button>Like</button>
      <button>Remove</button>
    </p>
    <p>
      <button class="trigger">Click here to see more</button>
      <div class="modal">
        <div class="modal-content">
          <span class="close-button">x</span>
          <h1>Instructions</h1>
          <p>${recipe.instructions}<br>
            2. Add egg and vanilla and mix until combined.<br>
            3. Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.<br>
            4. Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.<br>
            5. Bake for 9 to 10 minutes, or until you see the edges start to brown.</p>
            <h3>Ingredients</h3>
          </div>
        </div>
      </p>
    </article>
    `
  }
