document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM content loaded")
  let monsterContainer = document.getElementById('monster-container')
  let createMonsterDiv = document.getElementById('create-monster')
  let baseUrl = `http://localhost:3000/monsters`
  let page = 1
  let limit = 50
  let form = document.createElement('form')
  // let monsterDiv = document.createElement('div')

  function getMonsters(){
    console.log("get Monster")
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    // fetch(`http://localhost:3000/monsters`)
    .then(resp => resp.json())
    .then(data => {
      data.forEach(function(monster){
        let monsterDiv = document.createElement('div')
        monsterDiv.innerHTML = `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>Bio: ${monster.description}</p>
        `
        monsterContainer.append(monsterDiv)
      })
    })
  }
  
  function createMonsterForm(){
    // let form = document.createElement('form')
    form.dataset.id = 'monster-form'
    form.innerHTML = `
    <form>
    <input type="text" name="name" placeholder="Enter Monster Name">
    <input type="text" name="age" placeholder="Enter Monster Age">
    <input type="text" name="description" placeholder="Enter Monster Description">
    <input type="submit" value="Submit">
    </form>
    `
    createMonsterDiv.append(form)
  }
  createMonsterForm()

  form.addEventListener('submit', function(e){
    console.log('clicked')
    e.preventDefault()
    let name = e.target.name.value
    let age = e.target.age.value
    let description = e.target.description.value
    fetch(baseUrl,{
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({name, age, description})
    })
      .then(resp => resp.json())
      .then(monster => {
        console.log(monster)
        let monsterDiv = document.createElement('div')
        monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
        monsterContainer.append(monsterDiv)
        
      })
  })
  let backButton = document.getElementById('back')
  let forwardButton = document.getElementById('forward')

  function goBack(){
    if (page === 1){
      alert('Cannot go back!')
    } else {
      monsterContainer.innerHTML = ''
      --page
      getMonsters()
    }
  }

  function goForward(){
    if (monsterContainer.childElementCount <= 20) {
      alert('No more monsters!')
    } else {
      monsterContainer.innerHTML = ''
      ++page
      getMonsters()
    }
  }
  
  backButton.addEventListener('click', goBack)
  forwardButton.addEventListener('click', goForward)

  
  getMonsters()
})

