const mediaInput = document.getElementById("mediaUpload");
const fileNamesSpan = document.getElementById("file-names");

mediaInput.addEventListener("change", function () {
    if (this.files.length === 0) {
        fileNamesSpan.textContent = "";
        return;
    }

    if (this.files.length > 3) {
        alert("Sorry! Maximum of 3 files allowed only.");
        this.value = "";
        fileNamesSpan.textContent = "";
        return;
    }

    const names = Array.from(this.files).map(file => file.name);
    fileNamesSpan.textContent = ": " + names.join(", ");
});