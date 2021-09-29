gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '.map-image',
  endTrigger: '.map-description-third',
  start: 'center center',
  end: () => {
    const height = window.innerHeight;
    const mapHeight = document.querySelector('.map-peru .map-image').offsetHeight;
    const margin = window.innerWidth < 400 ? 90 : 0;
    return `bottom ${mapHeight + (height - mapHeight) / 2 - margin}px`;
  },
  pin: true,
  pinSpacing: false
});

gsap.to('.piura-region', {
  scrollTrigger: {
    trigger: '.map-description-second',
    start: () => {
      const mapHeight = document.querySelector('.map-peru .map-image').offsetHeight;
      return `top ${2 * mapHeight / 5}px`;
    },
    toggleActions: 'play none none reverse'
  },
  fill: '#EA7753',
  duration: 0.3,
  ease: 'power3.easeOut'
});

const animateVillages = () => {
  const cdlIllustrations = document.querySelectorAll('.village-cerro_de_leones .sct-illustration');
  cdlIllustrations.forEach(illustration => {
    gsap.from(illustration, {
      scrollTrigger: {
        trigger: illustration,
        start: 'center center'
      },
      duration: 0.2,
      scale: 0.7,
      opacity: 0,
      ease: Power3.easeOut
    });
  });
};

// Animate path on Piura's map on click
var path = document.querySelector('#pathRecrut');
var pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength;

const animatePiuraPath = () => {
  d3.select('#pathRecrut').classed('animate', true);
  // gsap.to('.cdl-circle', {
  //   scale: 1.5,
  //   x: -1,
  //   duration: 0.2,
  //   delay: 0.7,
  //   ease: Power2.easeOut
  // });
  gsap.to('.community-cerro', {
    fill: '#DD5F3D',
    duration: 0.2,
    delay: 0.9,
    ease: Power3.easeOut
  });
};

let piuraAnimationIsComplete = false;
document.querySelector('.cdl-touch').addEventListener('click', () => {
  if (!piuraAnimationIsComplete) {
    animatePiuraPath();
    piuraAnimationIsComplete = true;
  }
});
          