gsap.registerPlugin(ScrollTrigger);

// Pin Peru map
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

// Make Piura region appear on scroll
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

// Animate communities on Piura map
gsap.set('.map-piura-dots path', {scale:0, transformOrigin:'50% 50%'});
gsap.set('.map-piura-paths polyline, .map-piura-paths line', {drawSVG:'100% 100%'});
gsap.set('.map-piura-community, .piura-communities-cerro .community-cerro', {y:'+=5', opacity:0});

const stPiuraMap = {
  trigger: '.map-piura',
  start: 'top center',
  end: 'bottom 0',
};
const piuraMapTl = gsap.timeline({ scrollTrigger: stPiuraMap });

piuraMapTl
  .to('.map-piura-community, .piura-communities-cerro .community-cerro', {y:'0', opacity:1, duration:0.4, ease:'back.out(1.4)', stagger:{each:0.1, from:'random'}}, 0.2)
  .to('.map-piura-paths polyline, .map-piura-paths line', {drawSVG:'0 100%', duration:1, ease:'none'})
  .to('.map-piura-dots path', {scale:1, ease:'back.out(1.7)', duration:0.3});

// Animate path on Piura's map on click
var path = document.querySelector('#pathRecrut');
var pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength;

const animatePiuraPath = () => {
  d3.select('#pathRecrut').classed('animate', true);
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
          