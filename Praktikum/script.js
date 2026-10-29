
const tombol = document.getElementById("tombolAtas");

window.onscroll = function() {
    if (window.scrollY > 500) {
        tombol.style.display = "block";
    } else {
        tombol.style.display = "none";
    }
};

tombol.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
