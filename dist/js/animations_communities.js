/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Trigger animations for Cerro de Leones
const triggerAnimationsCerro = () => {

  const chickenPaths = document.querySelectorAll('#cerro-community-chicken path, #cerro-community-chicken line, #cerro-community-chicken polyline');
  const cowPaths = document.querySelectorAll('#cerro-community-cow path, #cerro-community-cow line');

  // Animate cerro community illustration
  const cerroCommunityTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.village-cerro-de-leones .section-community',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    }
  });
  const cerroCommunityTractorTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.village-cerro-de-leones .section-community',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    }
  });

  cerroCommunityTl
    // Clouds move horizontally 
    .fromTo('#cerro-community-clouds-front', {x:220}, {x:-300, duration:50, repeat:-1, ease:'none'}, 0)
    .fromTo('#cerro-community-clouds-back', {x:220}, {x:-300, duration:80, repeat:-1, ease:'none'}, 0)

    // Animate birds
    .set('#cerro-community-bird1-state2', {opacity:0}, 0)
    .set('#cerro-community-bird1-state3', {opacity:0}, 0)
    .set('#cerro-community-bird2-state2', {opacity:0}, 0)
    .set('#cerro-community-bird2-state3', {opacity:0}, 0)
    
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, 4)
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state3', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state1', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state3', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')

    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, 4.3)
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state3', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state1', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state3', x:'-=3', y='-=15', duration:0.2, ease:'none'}, '>')
    
    // Trace animals
    .from(chickenPaths, {drawSVG:0, duration:2}, 6)
    .from(cowPaths, {drawSVG:0, duration:2}, 6.7)

    
  // Tractor animation
  gsap.set('#cerro-community-wheel-back', {transformOrigin:"50% 50%"}, 0);
  gsap.set('#cerro-community-wheel-front', {transformOrigin:"50% 50%"}, 0);
  cerroCommunityTractorTl
    .to('#cerro-community-wheel-back', {rotation:'+=458', duration:2, ease:'back.in(1.7)'}, 3)
    .to('#cerro-community-wheel-front', {rotation:'+=573', duration:2, ease:'back.in(1.7)'}, 3)
    .to('#cerro-community-tractor', {x:80, duration:2, ease:'back.in(1.7)'}, 3)

    .to('#cerro-community-wheel-back', {rotation:'-=458', duration:1, ease:'back.out(1.4)'}, 10)
    .to('#cerro-community-wheel-front', {rotation:'-=573', duration:1, ease:'back.out(1.4)'}, 10)
    .to('#cerro-community-tractor', {x:0, duration:1, ease:'back.out(1.4)'}, 10);

  cerroCommunityTractorTl
    .repeat(-1)
    .repeatDelay(10)
    .yoyo(true);
};