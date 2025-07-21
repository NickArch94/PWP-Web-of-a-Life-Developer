import 'flowbite'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);


gsap.fromTo('.cards', {
    opacity: 0,
    scale: 1,
    rotation: 360,
    x: "-500%"
}, {
    scrollTrigger: {
        trigger: '.main-section',
        start: 'top center',
        toggleActions: "play none none reverse"
    },
    duration: 2,
    opacity: 1,
    scale: 1,
    rotation: 0,
    x: 0,
    ease: "power2.inOut"
    })

gsap.fromTo(".text-journey", {
    opacity: 0,
    y: "-500%"
}, {
    duration: 1.0,
    opacity: 1,
    y: 0,
    stagger: 0.5,
    ease: "power2.inOut"
    })

gsap.from(".journey-paragraph-1", {
    duration: 1.0,
    opacity: 0,
    ease: "power2.inOut"
})

gsap.from(".text-journey-02", {
    duration: 1.0,
    opacity: 0,
    stagger: 0.5,
    ease: "power2.in"
})

const supportTimeline = gsap.timeline({defaults: {duration: 1.0, ease: "power2.inOut"},
    scrollTrigger: {
        trigger: ".motivation-section",
        start: "top center",
        toggleActions: "play none none reverse"
    }
})
supportTimeline
    .from(".text-support", {opacity: 0})
    .from(".blue-card-stack", {opacity: 0, y: "-500%", stagger: 0.1})

// const donationButton = document.getElementById('donateButton')
// const donationDropdown = document.getElementById('donateDropdown')

donationButton.addEventListener('click', (e) => {
    e.stopPropagation()
    donationDropdown.classList.toggle('hidden')
})

document.addEventListener('click', (e) => {
    if (!donationButton.contains(e.target)) {
        donationDropdown.classList.add('hidden')
    }
})

donationDropdown.addEventListener('click', (e) => {
    e.stopPropagation()
})

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.flip-card')
    cards.forEach(card => {
        const cardInner = card.querySelector('.flip-card-inner')
        let isFlipped = false

        card.addEventListener('click', () => {
            if (!isFlipped) {
                gsap.to(cardInner, {
                    duration: 0.5,
                    rotationY: 180,
                    ease: "power2.inOut"
                })
                isFlipped = true
            } else {
                gsap.to(cardInner, {
                    duration: 0.5,
                    rotationY: 0,
                    ease: "power2.inOut"
                })
                isFlipped = false
            }
        })
    })
})

const learningCards = document.querySelectorAll('.learning-flip-card')

learningCards.forEach(card => {
    const cardInner = card.querySelector('.learning-flip-card-inner')
    let isFlipped = false

    card.addEventListener('click', () => {
        if (!isFlipped) {
            gsap.to(cardInner, {
                duration: 0.5,
                rotationY: 180,
                ease: "power2.inOut"
            })
            isFlipped = true
        } else {
            gsap.to(cardInner, {
                duration: 0.5,
                rotationY: 0,
                ease: "power2.inOut"
            })
            isFlipped = false
        }
    })
})