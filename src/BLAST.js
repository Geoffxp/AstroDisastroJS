

export default function BLAST(triangle) {
    const blastHTML = `<div class="center"><button id="blastBtn" class="btn-lg btn-secondary">SHOCKWAVE</button></div>`;
    const blast = document.createElement("div");
    blast.id = "blastDiv";
    blast.classList.add("blast");
    blast.classList.add("text-center");
    const body = document.querySelector("body");
    blast.innerHTML = blastHTML;
    body.appendChild(blast);
    const boom = document.getElementById("blastBtn");
    boom.addEventListener("click", () => {
        triangle.blast()
        blast.classList.add("hidden");
    })
}