document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'; // Initial fetch
    const cocktailContainer = document.getElementById('cocktail-container');
    const searchBar = document.getElementById('search-bar');
    const modal = document.getElementById('cocktail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const closeModal = document.getElementsByClassName('close')[0];

    const fetchCocktails = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => displayCocktails(data.drinks))
            .catch(error => console.error('Error fetching data:', error));
    };

    const displayCocktails = (cocktails) => {
        cocktailContainer.innerHTML = ''; // Clear previous cards
        if (cocktails) {
            cocktails.slice(0, 12).forEach(cocktail => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${cocktail.strDrink}</h3>
                    <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                `;
                card.addEventListener('click', () => showModal(cocktail));
                cocktailContainer.appendChild(card);
            });
        } else {
            cocktailContainer.innerHTML = '<p>No cocktails found.</p>';
        }
    };

    const showModal = (cocktail) => {
        modalTitle.textContent = cocktail.strDrink;
        modalImage.src = cocktail.strDrinkThumb;
        modalDetails.textContent = cocktail.strInstructions;
        modal.style.display = "block";
    };

    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    searchBar.addEventListener('input', () => {
        const query = searchBar.value;
        if (query) {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
                .then(response => response.json())
                .then(data => displayCocktails(data.drinks))
                .catch(error => console.error('Error fetching data:', error));
        } else {
            fetchCocktails(apiUrl); // Fetch initial cocktails if search is cleared
        }
    });

    // Initial fetch
    fetchCocktails(apiUrl);
});
