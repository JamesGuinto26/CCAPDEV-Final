document.querySelectorAll(".helpful-btn").forEach(button => {
    button.addEventListener("click", function () {
        
        const countText = this.nextElementSibling;
        let count = parseInt(countText.dataset.count);

        count++;
        countText.dataset.count = count;

        countText.textContent = count + " users found this review helpful";
    });
});