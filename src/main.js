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
        markers: true,
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

gsap.from(".text-support", {
    duration: 2.0,
    opacity: 0,
    ease: "power2.inOut",
    ScrollTrigger: {
        trigger: ".Motivation-Section",
        start: "top center",
        markers: true,
        toggleActions: "play none none reverse"
    }
})

const donationButton = document.getElementById('donateButton')
const donationDropdown = document.getElementById('donateDropdown')

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
