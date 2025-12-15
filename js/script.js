document.addEventListener("DOMContentLoaded", () => {


// ------ Hambuger ------

const hamburger = document.querySelector(".hamburger");
const navBlock = document.querySelector(".nav-block");

hamburger.addEventListener("click", () => {
  navBlock.classList.toggle("active");
  document.body.style.overflow =
    navBlock.classList.contains("active") ? "hidden" : "";
});

document.addEventListener("click", (e) => {
  if (!navBlock.contains(e.target) && !hamburger.contains(e.target)) {
    navBlock.classList.remove("active");
  }
});

// ---- Close mobile menu on link click ----

const navLinks = document.querySelectorAll(
  ".nav-menu a, .dropdown-menu a, .dropdown-toggle"
);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navBlock.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ----- Gallery Data ----

  const images = [
    "./assets/pexels-pixabay-264870 1 (2).png",
    "./assets/pexels-pixabay-264950 1 (1).png",
    "./assets/pexels-rethaferguson-3059609 2 (2).png",
    "./assets/pexels-valeriya-1961782 1 (1).png"
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const dots = document.querySelectorAll(".dot");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.querySelector(".left-slider");
  const nextBtn = document.querySelector(".right-slider");

  function updateGallery(index) {
  if (index === currentIndex) {
  mainImage.classList.remove("fade-out");
  return;
}

  mainImage.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = index;
    mainImage.src = images[currentIndex];

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");

    thumbs.forEach(thumb => thumb.classList.remove("active"));
    thumbs.forEach(thumb => {
      if (Number(thumb.dataset.index) === currentIndex) {
        thumb.classList.add("active");
      }
    });

    mainImage.classList.remove("fade-out");
  }, 220); 
}

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % images.length;
    updateGallery(newIndex);
  });


  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      updateGallery(Number(dot.dataset.index));
    });
  });
  
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      updateGallery(Number(thumb.dataset.index));
    });
  });

// ---- subscription control -----

  const singleRadio = document.getElementById("singleRadio");
  const doubleRadio = document.getElementById("doubleRadio");

  const singlePlan = document.getElementById("singlePlan");
  const doublePlan = document.getElementById("doublePlan");

  singleRadio.addEventListener("change", () => {
    if (singleRadio.checked) {
      singlePlan.classList.add("active");
      doublePlan.classList.remove("active");
    }
  });

  doubleRadio.addEventListener("change", () => {
    if (doubleRadio.checked) {
      doublePlan.classList.add("active");
      singlePlan.classList.remove("active");
    }
  });

  function updateHighlight() {
  const table = document.querySelector(".comparison-table");
  const highlight = document.querySelector(".column-highlight");

  if (!table || !highlight) return;

  const gtgCell = table.querySelector("thead th:nth-child(2)");
  const tableRect = table.getBoundingClientRect();
  const cellRect = gtgCell.getBoundingClientRect();

  highlight.style.left = (cellRect.left - tableRect.left) + "px";
  highlight.style.width = cellRect.width + "px";
}

updateHighlight();

window.addEventListener("resize", updateHighlight);

// ----- Add to Cart Dynamic Link -----

const cartBtn = document.querySelector(".cart-text");

function updateCartLink() {
  const plan = document.querySelector('input[name="plan"]:checked')?.id;

  let fragrance = null;

  if (plan === "singleRadio") {
    fragrance = document.querySelector(
      'input[name="single-fragrance"]:checked'
    )?.value;
  }

  if (plan === "doubleRadio") {
    const f1 = document.querySelector(
      'input[name="double-fragrance-1"]:checked'
    )?.value;
    const f2 = document.querySelector(
      'input[name="double-fragrance-2"]:checked'
    )?.value;

    if (f1 && f2) {
      fragrance = `${f1}-${f2}`;
    }
  }

  if (!plan || !fragrance) return;

  const dummyLink = `https://example.com/cart?plan=${plan}&fragrance=${fragrance}`;
  cartBtn.dataset.link = dummyLink;
}

document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener("change", updateCartLink);
});

cartBtn.addEventListener("click", () => {
  if (cartBtn.dataset.link) {
    window.location.href = cartBtn.dataset.link;
  } else {
    alert("Please select plan and fragrance");
  }
});


// ----- Count Changing ---

  const counters = document.querySelectorAll(".stat-box h2");
  let started = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;

      const updateCount = () => {
        if (count < target) {
          count++;
          counter.textContent = count + "%";
          setTimeout(updateCount, 20); 
        } else {
          counter.textContent = target + "%";
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".stats-section"));

});