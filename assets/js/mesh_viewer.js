document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById("model-container");
    var model1 = document.getElementById("model1");
    var model2 = document.getElementById("model2");
    var slider = document.getElementById("slider");

    container.addEventListener("mousemove", function(e) {
        var rect = container.getBoundingClientRect();
        var position = (e.clientX - rect.left) / rect.width;
        model1.style.clip = `rect(0, ${position * rect.width}px, ${rect.height}px, 0)`;
        model2.style.clip = `rect(0, ${rect.width}px, ${rect.height}px, ${position * rect.width}px)`;
        // Adjust slider position
        slider.style.left = `${position * 100}%`;
    });
});
