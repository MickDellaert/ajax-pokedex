const getData = async (pokeName, callback) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/`+ pokeName)
    const x = await data.json();
    const evolve = await fetch ('https://pokeapi.co/api/v2/pokemon-species/' + pokeName)
    const y = await evolve.json()
    const result = {...x, ...y}
    callback(result);
};

let name = document.getElementById('name')
let id = document.getElementById('id');
let image = document.getElementById('image');
let moves = document.getElementById('moves');
let evolve = document.getElementById("evolve");
let imageevolve = document.getElementById("imageevolve")


document.getElementById('run').addEventListener('click', () => {

    moves.innerHTML = "";

    const pokemonName = document.getElementById('pokemon').value;

    getData(pokemonName, (x) => {
        //adding name
        name.innerText = x.name

        //adding id
        id.innerText = x.id

        //adding a picture
        let urlsprite = x.sprites.front_default;
        console.log(urlsprite)
        image.setAttribute("src", urlsprite)

        //adding moves in a list
        for (let i = 0; i<5; i++){
            let list = document.createElement('li');
            list.innerText = x.moves[i].move.name;
            console.log(list)
            moves.appendChild(list)
        }

        //adding evolve from
        if (x.evolves_from_species) {
            evolve.innerText = x.evolves_from_species.name;
            getData(x.evolves_from_species.name, (y) => {
                let urlspriteevolve = y.sprites.front_default;
                imageevolve.setAttribute("src", urlspriteevolve)
            })
        }
        else {
            evolve.innerText = "this Pokémon has not been evolved"
        }

    });
})