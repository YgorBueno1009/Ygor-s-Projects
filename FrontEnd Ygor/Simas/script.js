async function fetchCarData() {
    try {
        const response = await fetch ('dados.json');
        const carsData = await response();
        
        return carsData;
    }
     catch (error) {
        console.error('Erro ao carregar os carros em:');

        return[]
    }
}

function renderCards(){
    const cardContainer = document.getElementById('car-cards');

    cardContainer.innerHTML = '';

    const filterCars = brand === 'todos' ? carsData : carsData.filter(car => car.brand === brand);

    filterCars.forEach(car => {
        const card = `
        <div class="card" style="width: 18rem;">
        <img src="${car.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${car.name}</h5>
          <p class="card-text">Valor: ${car.price}</p>
          <p class="card-text">Marca: ${car.brand}</p>
          <p class="card-text">Quilometragem: ${car.km}</p>
          <p class="card-text">Ano: ${car.year}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`;

      cardContainer.innerHTML += card;
        
    });

}

document.querySelectorAll('.nav-link').forEach(link => {

    link.addEventListener('click', async (e) =>{
        e.preventDefault();
        const brand = e.target.getAttribute('data-brand');
        const carsData = await fetchCarData();
        renderCards(carsData, brand);
    });

    //Render inicial//

    fetchCarData().then(carsData => renderCards(carsData, 'all'))

})