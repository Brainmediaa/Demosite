// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Basic form validation
  if (!formObject.name || !formObject.email || !formObject.message) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formObject.email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Simulate form submission
  showNotification("Thank you for your message. We will contact you soon!", "success")
  this.reset()
})

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#48bb78" : "#f56565"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .attorney-card, .news-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Video error handling
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video video")
  if (video) {
    video.addEventListener("error", () => {
      // If video fails to load, show a fallback background
      const heroSection = document.querySelector(".hero")
      heroSection.style.background = "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)"
    })
  }
})

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        // Simulate image loading
        setTimeout(() => {
          img.style.opacity = "1"
        }, 100)

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Scroll to top functionality
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Show/hide scroll to top button
  let scrollTopBtn = document.getElementById("scroll-top")
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement("button")
    scrollTopBtn.id = "scroll-top"
    scrollTopBtn.innerHTML = "↑"
    scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #3182ce;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 1000;
            display: none;
        `

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    document.body.appendChild(scrollTopBtn)
  }

  if (scrollTop > 300) {
    scrollTopBtn.style.display = "block"
  } else {
    scrollTopBtn.style.display = "none"
  }
})

// Enhanced form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    const value = input.value.trim()
    const errorElement = input.parentNode.querySelector(".error-message")

    // Remove existing error message
    if (errorElement) {
      errorElement.remove()
    }

    // Reset input styling
    input.style.borderColor = "#e2e8f0"

    if (!value) {
      showFieldError(input, "This field is required")
      isValid = false
    } else if (input.type === "email" && !isValidEmail(value)) {
      showFieldError(input, "Please enter a valid email address")
      isValid = false
    }
  })

  return isValid
}

function showFieldError(input, message) {
  input.style.borderColor = "#f56565"

  const errorElement = document.createElement("span")
  errorElement.className = "error-message"
  errorElement.textContent = message
  errorElement.style.cssText = `
        color: #f56565;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `

  input.parentNode.appendChild(errorElement)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Appointment form handling
const appointmentForm = document.getElementById("appointment-form")
if (appointmentForm) {
  // Set minimum date to today
  const dateInput = document.getElementById("apt-date")
  const today = new Date().toISOString().split("T")[0]
  dateInput.setAttribute("min", today)

  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Enhanced form validation
    if (!validateAppointmentForm(this)) {
      return
    }

    // Simulate appointment booking
    showNotification(
      "Your consultation has been scheduled! We will contact you within 24 hours to confirm your appointment.",
      "success",
    )
    this.reset()

    // Scroll to top of form
    this.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

// Enhanced appointment form validation
function validateAppointmentForm(form) {
  const requiredInputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  const radioGroups = form.querySelectorAll("input[type='radio'][required]")
  const checkboxes = form.querySelectorAll("input[type='checkbox'][required]")
  let isValid = true

  // Clear previous errors
  form.querySelectorAll(".error-message").forEach((error) => error.remove())
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.style.borderColor = "#e2e8f0"
  })

  // Validate required fields
  requiredInputs.forEach((input) => {
    const value = input.value.trim()

    if (!value) {
      showFieldError(input, "This field is required")
      isValid = false
    } else if (input.type === "email" && !isValidEmail(value)) {
      showFieldError(input, "Please enter a valid email address")
      isValid = false
    } else if (input.type === "date") {
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        showFieldError(input, "Please select a future date")
        isValid = false
      }

      // Check if it's a weekend
      const dayOfWeek = selectedDate.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        showFieldError(input, "Please select a weekday (Monday-Friday)")
        isValid = false
      }
    }
  })

  // Validate radio groups
  const consultationTypeChecked = form.querySelector("input[name='consultationType']:checked")
  if (!consultationTypeChecked) {
    const radioGroup = form.querySelector(".radio-group")
    showFieldError(radioGroup, "Please select a consultation type")
    isValid = false
  }

  // Validate checkboxes
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      const checkboxGroup = checkbox.closest(".checkbox-group")
      showFieldError(checkboxGroup, "You must agree to the terms and conditions")
      isValid = false
    }
  })

  return isValid
}

// Enhanced scroll animations with Intersection Observer
const enhancedObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target

        // Add staggered animation delays for cards
        if (element.classList.contains("service-card")) {
          const cards = Array.from(element.parentNode.children)
          const index = cards.indexOf(element)
          element.style.animationDelay = `${index * 0.1}s`
        }

        if (element.classList.contains("attorney-card")) {
          const cards = Array.from(element.parentNode.children)
          const index = cards.indexOf(element)
          element.style.animationDelay = `${index * 0.2}s`
        }

        if (element.classList.contains("news-card")) {
          const cards = Array.from(element.parentNode.children)
          const index = cards.indexOf(element)
          element.style.animationDelay = `${index * 0.2}s`
        }

        if (element.classList.contains("contact-item")) {
          const items = Array.from(element.parentNode.children)
          const index = items.indexOf(element)
          element.style.animationDelay = `${index * 0.1}s`
        }

        element.classList.add("animate-in")
        enhancedObserver.unobserve(element)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .attorney-card, .news-card, .contact-item, .contact-form, .benefits-list li, .consultation-option",
  )

  animatedElements.forEach((el) => {
    enhancedObserver.observe(el)
  })
})

// Add hover sound effects (optional)
function addHoverEffects() {
  const cards = document.querySelectorAll(".service-card, .attorney-card, .news-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Initialize hover effects
document.addEventListener("DOMContentLoaded", addHoverEffects)

// Smooth reveal animation for appointment benefits
function animateAppointmentSection() {
  const benefitItems = document.querySelectorAll(".benefits-list li")
  const consultationOptions = document.querySelectorAll(".consultation-option")

  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  benefitItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    revealOnScroll.observe(item)
  })

  consultationOptions.forEach((option, index) => {
    option.style.opacity = "0"
    option.style.transform = "translateX(30px)"
    option.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    revealOnScroll.observe(option)
  })
}

// Initialize appointment section animations
document.addEventListener("DOMContentLoaded", animateAppointmentSection)

// Typer Effect for Hero Banner
class TyperEffect {
  constructor(element, phrases, options = {}) {
    this.element = element
    this.phrases = phrases
    this.currentPhraseIndex = 0
    this.currentCharIndex = 0
    this.isDeleting = false
    this.isPaused = false

    // Options with defaults
    this.typeSpeed = options.typeSpeed || 100
    this.deleteSpeed = options.deleteSpeed || 50
    this.pauseTime = options.pauseTime || 2000
    this.startDelay = options.startDelay || 1000

    this.init()
  }

  init() {
    // Start typing after initial delay
    setTimeout(() => {
      this.type()
    }, this.startDelay)
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex]

    if (!this.isDeleting) {
      // Typing
      if (this.currentCharIndex < currentPhrase.length) {
        this.element.textContent = currentPhrase.substring(0, this.currentCharIndex + 1)
        this.currentCharIndex++
        setTimeout(() => this.type(), this.typeSpeed)
      } else {
        // Finished typing, pause then start deleting
        this.isPaused = true
        setTimeout(() => {
          this.isPaused = false
          this.isDeleting = true
          this.type()
        }, this.pauseTime)
      }
    } else {
      // Deleting
      if (this.currentCharIndex > 0) {
        this.element.textContent = currentPhrase.substring(0, this.currentCharIndex - 1)
        this.currentCharIndex--
        setTimeout(() => this.type(), this.deleteSpeed)
      } else {
        // Finished deleting, move to next phrase
        this.isDeleting = false
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length
        setTimeout(() => this.type(), this.typeSpeed)
      }
    }
  }
}

// Initialize typer effect when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const typerElement = document.getElementById("typer-text")

  if (typerElement) {
    const phrases = ["We are here for help", "Easy and fast service", "Our consultancy is free"]

    // Initialize the typer with custom options
    new TyperEffect(typerElement, phrases, {
      typeSpeed: 80, // Speed of typing (ms per character)
      deleteSpeed: 40, // Speed of deleting (ms per character)
      pauseTime: 2500, // Pause time at end of phrase (ms)
      startDelay: 2000, // Initial delay before starting (ms)
    })
  }
})

// Enhanced typer with sound effects (optional)
function addTyperSoundEffects() {
  const typerElement = document.getElementById("typer-text")

  if (typerElement) {
    // Create audio context for typing sounds (optional)
    let audioContext

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      // Audio not supported, continue without sound
      console.log("Audio context not supported")
    }

    // Function to create typing sound
    function playTypingSound() {
      if (audioContext) {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    }

    // Observer to detect text changes and play sound
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "characterData") {
          // Uncomment the line below to enable typing sounds
          // playTypingSound();
        }
      })
    })

    observer.observe(typerElement, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }
}
// Initialize sound effects (optional)
// Uncomment the line below to enable typing sound effects
// document.addEventListener('DOMContentLoaded', addTyperSoundEffects);

// Enhanced Video Management for Hero Banner
class HeroVideoManager {
  constructor() {
    this.videos = document.querySelectorAll(".hero-video-element")
    this.navButtons = document.querySelectorAll(".video-nav-btn")
    this.currentVideoIndex = 0
    this.autoPlayInterval = null
    this.autoPlayDelay = 8000 // 8 seconds between videos

    this.init()
  }

  init() {
    if (this.videos.length === 0) return

    // Set up navigation buttons
    this.navButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.switchToVideo(index)
        this.resetAutoPlay()
      })
    })

    // Set initial active states
    this.updateActiveStates()

    // Start auto-play
    this.startAutoPlay()

    // Handle video loading errors
    this.handleVideoErrors()

    // Pause auto-play when user hovers over hero section
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => this.pauseAutoPlay())
      heroSection.addEventListener("mouseleave", () => this.startAutoPlay())
    }
  }

  switchToVideo(index) {
    if (index === this.currentVideoIndex) return

    // Fade out current video
    this.videos[this.currentVideoIndex].classList.remove("active")

    // Update index
    this.currentVideoIndex = index

    // Fade in new video
    setTimeout(() => {
      this.videos[this.currentVideoIndex].classList.add("active")
    }, 100)

    // Update navigation buttons
    this.updateActiveStates()
  }

  updateActiveStates() {
    // Update navigation buttons
    this.navButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index === this.currentVideoIndex)
    })
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      const nextIndex = (this.currentVideoIndex + 1) % this.videos.length
      this.switchToVideo(nextIndex)
    }, this.autoPlayDelay)
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay()
    this.startAutoPlay()
  }

  handleVideoErrors() {
    this.videos.forEach((video, index) => {
      video.addEventListener("error", () => {
        console.warn(`Video ${index + 1} failed to load`)
        // Hide the corresponding navigation button
        if (this.navButtons[index]) {
          this.navButtons[index].style.display = "none"
        }
      })

      video.addEventListener("loadeddata", () => {
        console.log(`Video ${index + 1} loaded successfully`)
      })
    })
  }
}

// Initialize video manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroVideoManager()
})

// Enhanced video loading with fallback
function createVideoFallback() {
  const heroSection = document.querySelector(".hero")
  const videoContainer = document.querySelector(".hero-video")

  if (!videoContainer) return

  // Create loading indicator
  const loadingDiv = document.createElement("div")
  loadingDiv.className = "video-loading"
  loadingDiv.innerHTML = `
    <div class="loading-spinner"></div>
    <div>Loading Professional Content...</div>
  `

  videoContainer.appendChild(loadingDiv)

  // Remove loading indicator after videos load or timeout
  setTimeout(() => {
    if (loadingDiv.parentNode) {
      loadingDiv.remove()
    }
  }, 3000)

  // Fallback background if all videos fail
  const videos = document.querySelectorAll(".hero-video-element")
  let loadedVideos = 0

  videos.forEach((video) => {
    video.addEventListener("loadeddata", () => {
      loadedVideos++
      if (loadedVideos === 1 && loadingDiv.parentNode) {
        loadingDiv.remove()
      }
    })

    video.addEventListener("error", () => {
      // If this is the last video and none loaded, show fallback
      if (loadedVideos === 0) {
        setTimeout(() => {
          if (loadedVideos === 0) {
            heroSection.style.background = `
              linear-gradient(135deg, #1a365d 0%, #2d3748 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f8f9fa" width="1200" height="600"/><text x="600" y="300" text-anchor="middle" font-family="serif" font-size="48" fill="%23495057">Sterling %26 Associates</text></svg>')
            `
            heroSection.style.backgroundSize = "cover"
            heroSection.style.backgroundPosition = "center"
            if (loadingDiv.parentNode) {
              loadingDiv.remove()
            }
          }
        }, 1000)
      }
    })
  })
}

// Initialize video fallback
document.addEventListener("DOMContentLoaded", createVideoFallback)

// About Section Animations and Functionality

// Animated Counter for Statistics
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element
    this.target = Number.parseInt(target)
    this.duration = duration
    this.startValue = 0
    this.increment = this.target / (duration / 16)
    this.hasAnimated = false
  }

  animate() {
    if (this.hasAnimated) return

    this.hasAnimated = true
    let current = this.startValue

    const timer = setInterval(() => {
      current += this.increment

      if (current >= this.target) {
        current = this.target
        clearInterval(timer)
      }

      // Format number with commas for large numbers
      const displayValue = Math.floor(current).toLocaleString()
      this.element.textContent = displayValue
    }, 16)
  }
}

// Initialize counters when they come into view
function initializeCounters() {
  const statNumbers = document.querySelectorAll(".stat-number")
  const counters = []

  statNumbers.forEach((element) => {
    const target = element.getAttribute("data-target")
    const counter = new AnimatedCounter(element, target)
    counters.push({ element, counter })
  })

  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = counters.find((c) => c.element.closest(".stat-item") === entry.target)
          if (counter) {
            counter.counter.animate()
            counterObserver.unobserve(entry.target)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  // Observe stat items
  document.querySelectorAll(".stat-item").forEach((item) => {
    counterObserver.observe(item)
  })
}

// Enhanced scroll animations for About section
function initializeAboutAnimations() {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Special handling for story items
          if (entry.target.classList.contains("story-item")) {
            const items = Array.from(entry.target.parentNode.children)
            const index = items.indexOf(entry.target)
            entry.target.style.animationDelay = `${index * 0.2}s`
          }

          // Special handling for value cards
          if (entry.target.classList.contains("value-card")) {
            const cards = Array.from(entry.target.parentNode.children)
            const index = cards.indexOf(entry.target)
            entry.target.style.animationDelay = `${index * 0.1}s`
          }

          aboutObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe about section elements
  const aboutElements = document.querySelectorAll(".story-item, .value-card, .stat-item, .section-badge, .about-visual")

  aboutElements.forEach((el) => {
    aboutObserver.observe(el)
  })
}

// Video interaction enhancements
function enhanceAboutVideo() {
  const aboutVideo = document.querySelector(".about-video")
  const videoContainer = document.querySelector(".video-container")

  if (aboutVideo && videoContainer) {
    // Add loading state
    aboutVideo.addEventListener("loadstart", () => {
      videoContainer.classList.add("loading")
    })

    aboutVideo.addEventListener("loadeddata", () => {
      videoContainer.classList.remove("loading")
    })

    // Add error handling
    aboutVideo.addEventListener("error", () => {
      console.warn("About video failed to load")
      videoContainer.style.background = `
        linear-gradient(135deg, #1a365d 0%, #2d3748 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23f8f9fa" width="400" height="300"/><text x="200" y="150" text-anchor="middle" font-family="serif" font-size="24" fill="%23495057">Justice & Law</text></svg>')
      `
      videoContainer.style.backgroundSize = "cover"
      videoContainer.style.backgroundPosition = "center"
    })

    // Pause/play on hover
    videoContainer.addEventListener("mouseenter", () => {
      aboutVideo.playbackRate = 0.5 // Slow down on hover
    })

    videoContainer.addEventListener("mouseleave", () => {
      aboutVideo.playbackRate = 1 // Normal speed
    })
  }
}

// Parallax effect for about section
function initializeAboutParallax() {
  const aboutSection = document.querySelector(".about")

  if (aboutSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const aboutTop = aboutSection.offsetTop
      const aboutHeight = aboutSection.offsetHeight
      const windowHeight = window.innerHeight

      // Check if section is in viewport
      if (scrolled + windowHeight > aboutTop && scrolled < aboutTop + aboutHeight) {
        const progress = (scrolled + windowHeight - aboutTop) / (aboutHeight + windowHeight)
        const translateY = (progress - 0.5) * 50

        // Apply subtle parallax to background elements
        aboutSection.style.backgroundPosition = `center ${translateY}px`
      }
    })
  }
}

// Interactive hover effects for story items
function enhanceStoryItems() {
  const storyItems = document.querySelectorAll(".story-item")

  storyItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // Add ripple effect
      const ripple = document.createElement("div")
      ripple.className = "story-ripple"
      ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(49, 130, 206, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
      `

      item.appendChild(ripple)

      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      }, 600)
    })
  })

  // Add ripple animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
    
    .story-item {
      position: relative;
      overflow: hidden;
    }
  `
  document.head.appendChild(style)
}

// Initialize all About section functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeCounters()
  initializeAboutAnimations()
  enhanceAboutVideo()
  initializeAboutParallax()
  enhanceStoryItems()
})

// Smooth scroll enhancement for about CTA buttons
document.querySelectorAll(".about-cta .btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  })
})

// Add loading animation styles
const aboutStyles = document.createElement("style")
aboutStyles.textContent = `
  .video-container.loading::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #ffd700;
    animation: spin 1s ease-in-out infinite;
  }
  
  .animate-in {
    animation-play-state: running !important;
  }
`
document.head.appendChild(aboutStyles)
