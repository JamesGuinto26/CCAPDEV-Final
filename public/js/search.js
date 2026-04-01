const searchInput = document.getElementById("searchInput");
const reviews = document.querySelectorAll(".review");
const checkboxes = document.querySelectorAll(".filter-panel input");

function filterReviews() {

    const searchText = searchInput.value.toLowerCase();

    const checked = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    reviews.forEach(review => {

        const text = review.textContent.toLowerCase();

        const matchText = text.includes(searchText);

        const matchRestaurant =
            checked.length === 0 ||
            checked.some(r => review.classList.contains(r));

        if (matchText && matchRestaurant) {
            review.style.display = "block";
        } else {
            review.style.display = "none";
        }

    });
}

searchInput.addEventListener("input", filterReviews);
checkboxes.forEach(cb =>
    cb.addEventListener("change", filterReviews)
);
