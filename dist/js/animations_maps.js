/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
gsap.registerPlugin(ScrollTrigger);

const triggerMapAnimations = () => {
  // Pin Peru map
  gsap.to('.map-image', {
    scrollTrigger: {
      id: 'peru-map-trigger',
      trigger: '.map-image',
      endTrigger: '.map-description-third',
      start: 'center center',
      end: () => {
        const height = window.innerHeight;
        const mapHeight = document.querySelector('.map-peru .map-image').offsetHeight;
        const margin = window.innerWidth < 400 ? 100 : 0;
        return `bottom ${mapHeight + (height - mapHeight) / 2 - margin}px`;
      },
      pin: true,
      pinSpacing: false
    }
  });

  // Make Piura region appear on scroll
  gsap.to('.piura-region', {
    scrollTrigger: {
      id: 'piura-region',
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
  gsap.set('#pathRecrut', {drawSVG:'0 0'});

  const animatePiuraPath = () => {
    const tl = gsap.timeline();
    tl
      .to('#pathRecrut', {drawSVG:'100% 0%', duration:0.8, ease:'sine.out'})
      .to('.community-cerro', {fill: '#DD5F3D', duration: 0.2, ease: 'Power3.easeOut'}, '>+0.1');
  };

  let piuraAnimationIsComplete = false;
  document.querySelector('.cdl-touch').addEventListener('click', () => {
    if (!piuraAnimationIsComplete) {
      animatePiuraPath();
      piuraAnimationIsComplete = true;
    }
  });
  
}