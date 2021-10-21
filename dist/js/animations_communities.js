/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Trigger animations for Cerro de Leones
const triggerAnimationsCerro = () => {

  /****************************/
  /*         Community        */
  /****************************/

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

  // Timeline
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

    
  // Tractor animation timeline
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


  /****************************/
  /*          School          */
  /****************************/

  // Animate cerro school illustration
  const cerroSchoolTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.village-cerro-de-leones .section-school',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    }
  });
  const cerroSchoolTearsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.village-cerro-de-leones .section-school',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    }
  });
  const cerroSchoolFlagsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.village-cerro-de-leones .section-school',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    }
  });

  const hoursAnimationDuration = 3;
  const hoursAnimationDelay = 2;
  const minHours = 12;
  const maxHours = 15;
  let minNumber = d3.select('#cerro-school-hours-count-min').text(0);
  let maxNumber = d3.select('#cerro-school-hours-count-max').text(0);

  setTimeout(() => {
    minNumber
      .transition()
      .duration(minHours * hoursAnimationDuration * 1000 / maxHours)
      .ease(d3.easeQuadOut)
      .tween('atween', () => {
        return function (t) {
          this.textContent = d3.interpolateRound(0, 12)(t);
        }
      });
    maxNumber
      .transition()
      .duration(hoursAnimationDuration * 1000)
      .ease(d3.easeQuadOut)
      .tween('atween', () => {
        return function (t) {
          this.textContent = d3.interpolateRound(0, 15)(t);
        }
      });
  }, hoursAnimationDelay * 1000);

  gsap.set('#cerro-school-clock-small-hand', {transformOrigin:"bottom center"}, 0);
  gsap.set('#cerro-school-clock-big-hand', {transformOrigin:"bottom center"}, 0);
  cerroSchoolTl
    .to('#cerro-school-clock-small-hand', {rotation:450, duration:hoursAnimationDuration, ease:'none'}, hoursAnimationDelay)
    .to('#cerro-school-clock-big-hand', {rotation:5400, duration:hoursAnimationDuration, ease:'none'}, hoursAnimationDelay)
    

  const cerroTearLeft = document.querySelector('#cerro-school-clock-tear-left');
  const cerroTearRight = document.querySelector('#cerro-school-clock-tear-right');
  cerroSchoolTearsTl
    .from(cerroTearLeft, {drawSVG:0, duration:0.7, ease:'none'}, 2)
    .to(cerroTearLeft, {y:25, duration:1, ease:'power2.in'})
    .to(cerroTearLeft, {drawSVG:'100% 100%', opacity:0, duration:0.1})
    .from(cerroTearRight, {drawSVG:0, duration:0.7, ease:'none'}, 3.2)
    .to(cerroTearRight, {y:25, duration:1, ease:'power2.in'})
    .to(cerroTearRight, {drawSVG:'100% 100%', opacity:0, duration:0.1});

  cerroSchoolTearsTl
    .repeat(-1)
    .repeatDelay(1.5);

  
  gsap.set('#cerro-school-flag-top-state2', {opacity:0}, 0)
  gsap.set('#cerro-school-flag-bottom-state2', {opacity:0}, 0)
  cerroSchoolFlagsTl
    .to('#cerro-school-flag-top-state1', {morphSVG:'#cerro-school-flag-top-state2', duration:1.2, ease:'sine.inOut'})
    .to('#cerro-school-flag-top-state1', {morphSVG:'#cerro-school-flag-top-state1', duration:1.2, ease:'sine.inOut'})
    .to('#cerro-school-flag-bottom-state1', {morphSVG:'#cerro-school-flag-bottom-state2', duration:1.2, ease:'sine.inOut'}, 0.1)
    .to('#cerro-school-flag-bottom-state1', {morphSVG:'#cerro-school-flag-bottom-state1', duration:1.2, ease:'sine.inOut'}, '>');
  cerroSchoolFlagsTl
    .repeat(-1);
};