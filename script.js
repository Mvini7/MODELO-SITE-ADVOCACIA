// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const mainNav = document.getElementById("mainNav")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  mainNav.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    mainNav.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Carousel functionality
const carouselTrack = document.getElementById("carouselTrack")
const slides = document.querySelectorAll(".testimonial-slide")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const indicators = document.querySelectorAll(".indicator")

let currentSlide = 0
const totalSlides = slides.length

function goToSlide(slideIndex) {
  // Remove active class from current slide
  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("active")

  // Update current slide
  currentSlide = slideIndex

  // Add active class to new slide
  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.add("active")

  // Move the track
  const translateValue = -currentSlide * 100
  carouselTrack.style.transform = `translateX(${translateValue}%)`
}

function nextSlide() {
  const next = (currentSlide + 1) % totalSlides
  goToSlide(next)
}

function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides
  goToSlide(prev)
}

// Button event listeners
nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Indicator event listeners
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToSlide(index)
  })
})

// Auto-play carousel (optional)
let autoplayInterval = setInterval(nextSlide, 5000)

// Pause autoplay on hover
const carouselContainer = document.querySelector(".carousel-container")
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval)
})

carouselContainer.addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(nextSlide, 5000)
})

// Contact Form submission with EmailJS
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")

if (window.emailjs) {
  emailjs.init("h53Xfir9-fSZL-KlT")
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalButtonText = submitButton.textContent
  submitButton.textContent = "ENVIANDO..."
  submitButton.disabled = true

  formStatus.textContent = ""
  formStatus.classList.remove("success", "error")

  const name = document.getElementById("name").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  const templateParams = {
    from_name: name,
    from_email: email,
    from_phone: phone,
    message,
    to_email: "mvinicius030608@gmail.com",
  }

  emailjs
    .send("service_b54cu2c", "template_hdatz4p", templateParams)
    .then(() => {
      formStatus.textContent = "✓ Mensagem enviada com sucesso!"
      formStatus.style.color = "#22c55e"
      contactForm.reset()
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error)
      formStatus.textContent =
        "✗ Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone."
      formStatus.style.color = "#ef4444"
    })
    .finally(() => {
      submitButton.textContent = originalButtonText
      submitButton.disabled = false
    })
})
