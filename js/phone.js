const countries = [
    { name: "Канада", code: "CA", phone: 1 },
    { name: "Чехія", code: "CZ", phone: 420 },
    { name: "Франція", code: "FR", phone: 33 },
    { name: "Польща", code: "PL", phone: 48 },
    { name: "Україна", code: "UA", phone: 380 },
    { name: "Велика Британія", code: "UK", phone: 44 },
    { name: "США", code: "US", phone: 1 },
];

const select_box = document.querySelector('.options');
const search_box = document.querySelector('.search-box');
const input_box = document.querySelector('input[type="tel"]');
const selected_option = document.querySelector('.selected-option div');

function generateCountryOptions(filter = "") {
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    );

    const optionsContainer = select_box.querySelector('ol');
    optionsContainer.innerHTML = ""; 

    filteredCountries.forEach(country => {
        const option = document.createElement("li");
        option.classList.add("option");

        option.innerHTML = `
            <div>
                <span class="flag flag-${country.code.toLowerCase()}"></span>
                <span class="country-name font-size">${country.name}</span>
            </div>
            <p class="font-size">+${country.phone}</p>
        `;

        option.addEventListener("click", () => selectOption(country));
        optionsContainer.appendChild(option);
    });
}

// Функція для вибору країни
function selectOption(country) {
    selected_option.innerHTML = `
        <span class="flag flag-${country.code.toLowerCase()}"></span>
    `;

    input_box.value = `+${country.phone}`;
    select_box.classList.remove("active");
    selected_option.classList.remove("active");
    search_box.value = ""; // Очищення поля пошуку
    generateCountryOptions(); // Показати весь список знову
}

// Пошук країни
search_box.addEventListener("input", () => {
    const searchQuery = search_box.value.trim();
    generateCountryOptions(searchQuery);
});

// Відкриття/закриття списку
selected_option.addEventListener("click", () => {
    select_box.classList.toggle("active");
    selected_option.classList.toggle("active");
});

// Закриття списку при натисканні поза ним
document.addEventListener("click", (event) => {
    if (!select_box.contains(event.target) && !selected_option.contains(event.target)) {
        select_box.classList.remove('active');
        selected_option.classList.remove('active');
    }
});

// Ініціалізація списку країн
generateCountryOptions();
