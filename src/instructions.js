export default function addInstructions(game) {
    const instructionsHTML = `<div class="center">
        <h1>HOW TO PLAY</h1>
        <h3>Move the mouse around or touch and drag</h3>
        <h3>Collect the balls and avoid the enemies</h3>
        <h3>Spacebar or click to Activate shockwave</h3>
        <h3>Two fingers on the screen at the same time activates shockwave on mobile</h3>
        <button id="instructionsBtn" class="btn btn-secondary">OKAY</button>
    </div>
    `;
    const instructions = document.createElement("div");
    instructions.id = "instructions";
    instructions.classList.add("instructions");
    instructions.classList.add("text-center");
    const body = document.querySelector("body");
    instructions.innerHTML = instructionsHTML;
    body.appendChild(instructions);
    const go = document.getElementById("instructionsBtn");
    const theme = document.getElementById("theme")
    go.addEventListener("click", () => {
        body.style.cursor = "none";
        theme.muted = false;
        theme.play();
        theme.addEventListener("ended", () => theme.play())
        instructions.classList.add("hidden");
        game.play = true;
    })
}
