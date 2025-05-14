document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-links li a")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") && item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })

    // Scroll to top button
    const scrollToTopBtn = document.querySelector(".scroll-to-top")
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("active")
    } else {
      scrollToTopBtn.classList.remove("active")
    }

    // Skill animation on scroll
    animateOnScroll()
  })

  // Scroll to top button click event
  document.querySelector(".scroll-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Form submission (Netlify handles it, we only show alert)
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const name = document.getElementById("name").value
      alert(`Thank you for your message, ${name}! I will get back to you soon.`)
    })
  }

  // Animate skill bars on scroll using data-skill attribute
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-level")

    elements.forEach((element) => {
      const position = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3
      const skillWidth = element.getAttribute("data-skill")

      if (position < screenPosition && skillWidth) {
        element.style.width = skillWidth
      } else {
        element.style.width = "0%"
      }
    })
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("darkModeToggle")
  const darkModeMessage = document.getElementById("darkModeMessage")

  // Always start in dark mode
  let isDarkMode = true

  // Apply dark mode by default
  document.body.classList.add("dark-mode")
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  localStorage.setItem("darkMode", "true")

  darkModeToggle.addEventListener("click", () => {
    if (!isDarkMode) {
      // Enable dark mode (this shouldn't happen normally since we start in dark mode)
      document.body.classList.add("dark-mode")
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("darkMode", "true")
      isDarkMode = true
    } else {
      // Attempt to disable dark mode - show message instead
      showDarkModeMessage()
    }
  })

  function showDarkModeMessage() {
    // Show the message with shake animation
    darkModeMessage.classList.add("show")

    // Remove the message after 3 seconds
    setTimeout(() => {
      darkModeMessage.classList.remove("show")
    }, 3000)
  }

  // Initial call
  animateOnScroll()
})
