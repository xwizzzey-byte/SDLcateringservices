document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if(btn && links){
    btn.addEventListener('click', function(){
      links.classList.toggle('open');
      btn.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }
});
/* ==================================================
   PREMIUM GALLERY LIGHTBOX
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const galleryImages = Array.from(
        document.querySelectorAll(".gallery-item img")
    );

    const lightbox =
        document.getElementById("premium-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxCaption =
        document.getElementById("lightbox-caption");

    const lightboxCounter =
        document.getElementById("lightbox-counter");

    const closeButton =
        document.getElementById("lightbox-close");

    const previousButton =
        document.getElementById("lightbox-prev");

    const nextButton =
        document.getElementById("lightbox-next");

    if (
        !galleryImages.length ||
        !lightbox ||
        !lightboxImage
    ){
        return;
    }

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateLightbox(){
        const selectedImage = galleryImages[currentIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;

        lightboxCaption.textContent =
            selectedImage.dataset.caption ||
            selectedImage.alt ||
            "SDL Catering Gallery";

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;
    }

    function openLightbox(index){
        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden","false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox(){
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden","true");

        document.body.style.overflow = "";
    }

    function changeImage(direction){
        currentIndex += direction;

        if (currentIndex < 0){
            currentIndex = galleryImages.length - 1;
        }

        if (currentIndex >= galleryImages.length){
            currentIndex = 0;
        }

        updateLightbox();
    }

    galleryImages.forEach((image,index) => {

        image.setAttribute("tabindex","0");
        image.setAttribute("role","button");
        image.setAttribute(
            "aria-label",
            `Enlarge ${image.alt}`
        );

        image.addEventListener("click",() => {
            openLightbox(index);
        });

        image.addEventListener("keydown",event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ){
                event.preventDefault();
                openLightbox(index);
            }
        });

    });

    closeButton.addEventListener("click",closeLightbox);

    previousButton.addEventListener("click",event => {
        event.stopPropagation();
        changeImage(-1);
    });

    nextButton.addEventListener("click",event => {
        event.stopPropagation();
        changeImage(1);
    });

    lightbox.addEventListener("click",event => {
        if (event.target === lightbox){
            closeLightbox();
        }
    });

    lightboxImage.addEventListener("click",event => {
        event.stopPropagation();
    });

    document.addEventListener("keydown",event => {

        if (!lightbox.classList.contains("open")){
            return;
        }

        if (event.key === "Escape"){
            closeLightbox();
        }

        if (event.key === "ArrowLeft"){
            changeImage(-1);
        }

        if (event.key === "ArrowRight"){
            changeImage(1);
        }

    });

    lightbox.addEventListener(
        "touchstart",
        event => {
            touchStartX =
                event.changedTouches[0].screenX;
        },
        { passive:true }
    );

    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchStartX - touchEndX;

            if (Math.abs(swipeDistance) < 50){
                return;
            }

            if (swipeDistance > 0){
                changeImage(1);
            } else {
                changeImage(-1);
            }

        },
        { passive:true }
    );

});
/* Premium homepage reveal animations */

document.addEventListener("DOMContentLoaded", () => {

    const revealItems =
        document.querySelectorAll(".reveal");

    if (!revealItems.length){
        return;
    }

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting){
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold:0.12
            }
        );

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

});
