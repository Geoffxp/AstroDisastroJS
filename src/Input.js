export default class InputHandler {
    constructor(triangle) {
        const blastBtn = document.getElementById("blastBtn");
        document.addEventListener("click", (event) => {
            triangle.blast();
        })
        document.addEventListener("mousedown", (event) => {
            triangle.mouseX = event.clientX;
            triangle.mouseY = event.clientY;
        })
        document.addEventListener("mousemove", (event) => {
            triangle.mouseX = event.clientX;
            triangle.mouseY = event.clientY;
        })
        document.addEventListener("touchstart", (event) => {
            if (event.touches.length > 1) {
                triangle.blast();
            }
        })
        document.addEventListener("touchmove", (event) => {
            if (event.touches.length > 1) {
                triangle.blast();
            }
            triangle.mouseX = event.touches[0].clientX;
            triangle.mouseY = event.touches[0].clientY;
        })
        document.addEventListener("keydown", (e) => {
            if (e.key === ' ') {
                triangle.blast();
            }
        })
    }
}