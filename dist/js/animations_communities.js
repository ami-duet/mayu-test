/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Trigger animations for Cerro de Leones
const triggerAnimationsCerro = () => {

  const start25 = 5;
  const start50 = 10;
  const start75 = 15;
  const start100 = 20;
  const getTransition = () => {
    return d3.transition().duration(200);
  };

  /****************************/
  /*         Community        */
  /****************************/
  const scrollTriggerCerroCommunity = {
    trigger: '.village-cerro-de-leones .section-community',
    // markers: true,
    start: 'top center',
    end: 'bottom 0'
  };
  const cerroCommunityTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroCommunity });
  const cerroCommunityCloudsTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroCommunity });
  const cerroCommunityTractorTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroCommunity });

  const cerroCommunityChickenPaths = document.querySelectorAll('#cerro-community-chicken path, #cerro-community-chicken line, #cerro-community-chicken polyline');
  const cerroCommunityCowPaths = document.querySelectorAll('#cerro-community-cow path, #cerro-community-cow line');

  gsap.set('#cerro-community-bird1-state2, #cerro-community-bird2-state2', {opacity:0});
  gsap.set('#cloud-color-1, #cerro-community-clouds-back, #cerro-community-sun-color, #cerro-community-trees-color', {opacity:0});


  const counterCommunity = d3.select('.village-cerro-de-leones .section-community')
    .append('div')
      .attr('class', 'counter')
      .text('0%');
  const updateCommunityCounter = (percent) => {
    counterCommunity
      .transition(getTransition())
        .style('opacity', 0)
      .transition(getTransition())
        .text(`${percent}%`)
      .transition(getTransition())
        .style('opacity', 1);
  };
  
  const cerroCommunityCloudsMove = () => {
    gsap.to('#cloud-color-1, #cerro-community-clouds-back', {opacity:0.42, duration:1, ease:'power1.out'});
    gsap.to('#cerro-community-sun-color', {opacity:0.8, duration:1, ease:'power1.out'});
    cerroCommunityCloudsTl
      .fromTo('#cerro-community-clouds-front', {x:220}, {x:-300, duration:50, repeat:-1, ease:'none'}, 0)
      .fromTo('#cerro-community-clouds-back', {x:220}, {x:-300, duration:80, repeat:-1, ease:'none'}, 0);
  };

  // Timeline
  cerroCommunityTl
    // Clouds move horizontally
    .call(updateCommunityCounter, [25], start25)
    .call(cerroCommunityCloudsMove, null, start25)

    // Tractor starts
    .call(updateCommunityCounter, [50], start50)

    // Trace animals
    .call(updateCommunityCounter, [75], start75)
    .from(cerroCommunityChickenPaths, {drawSVG:0, duration:2}, start75)
    .from(cerroCommunityCowPaths, {drawSVG:0, duration:2}, start75 + 0.7)

    // Animate birds
    .call(updateCommunityCounter, [100], start100)
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, start100)
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird2-state1', {morphSVG:'#cerro-community-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=15', y='-=10', duration:0.4, ease:'none'}, start100 + 1)
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state1', x:'-=15', y='-=10', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=15', y='-=10', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state1', x:'-=15', y='-=10', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state2', x:'-=15', y='-=10', duration:0.4, ease:'none'}, '>')
    .to('#cerro-community-bird1-state1', {morphSVG:'#cerro-community-bird1-state1', x:'-=15', y='-=10', duration:0.4, ease:'none'}, '>');

    
  // Tractor animation timeline
  gsap.set('#cerro-community-wheel-back', {transformOrigin:"50% 50%"}, 0);
  gsap.set('#cerro-community-wheel-front', {transformOrigin:"50% 50%"}, 0);
  cerroCommunityTractorTl
    .to('#cerro-community-wheel-back', {rotation:'+=458', duration:2, ease:'back.in(1.7)'}, start50)
    .to('#cerro-community-wheel-front', {rotation:'+=573', duration:2, ease:'back.in(1.7)'}, start50)
    .to('#cerro-community-tractor', {x:80, duration:2, ease:'back.in(1.7)'}, start50)

    .to('#cerro-community-wheel-back', {rotation:'-=458', duration:1, ease:'back.out(1.4)'}, start50 + 7)
    .to('#cerro-community-wheel-front', {rotation:'-=573', duration:1, ease:'back.out(1.4)'}, start50 + 7)
    .to('#cerro-community-tractor', {x:0, duration:1, ease:'back.out(1.4)'}, start50 + 7);

  cerroCommunityTractorTl
    .repeat(-1)
    .repeatDelay(10)
    .yoyo(true);


  /****************************/
  /*          School          */
  /****************************/
  const scrollTriggerCerroSchool = {
    trigger: '.village-cerro-de-leones .section-school',
    // markers: true,
    start: 'top center',
    end: 'bottom 0'
  };
  const cerroSchoolTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSchool });
  const cerroSchoolTearsTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSchool });
  const cerroSchoolFlagsTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSchool });

  const counterSchool = d3.select('.village-cerro-de-leones .section-school')
    .append('div')
      .attr('class', 'counter')
      .text('0%');
  const updateSchoolCounter = (percent) => {
    counterSchool
      .transition(getTransition())
        .style('opacity', 0)
      .transition(getTransition())
        .text(`${percent}%`)
      .transition(getTransition())
        .style('opacity', 1);
  };

  const hoursAnimationDuration = 3;
  const hoursAnimationDelay = 2;
  const minHours = 12;
  const maxHours = 15;
  let minNumber = d3.select('#cerro-school-hours-count-min').text(0);
  let maxNumber = d3.select('#cerro-school-hours-count-max').text(0);

  const animateSchoolNumbers = () => {
    minNumber
      .transition()
      .duration(minHours * hoursAnimationDuration * 1000 / maxHours)
      .ease(d3.easeQuadOut)
      .tween('atween', () => {
        return function (t) {
          this.textContent = d3.interpolateRound(0, minHours)(t);
        }
      });
    maxNumber
      .transition()
      .duration(hoursAnimationDuration * 1000)
      .ease(d3.easeQuadOut)
      .tween('atween', () => {
        return function (t) {
          this.textContent = d3.interpolateRound(0, maxHours)(t);
        }
      });
  };

  const kids = document.querySelectorAll('#cerro-school-kids polygon, #cerro-school-kids polyline, #cerro-school-kids path, #cerro-school-kids ellipse');
  const kidsSmile = document.querySelectorAll('#cerro-school-girl-mouth, #cerro-school-boy-mouth');
  
  gsap.set('#cerro-school-clock-small-hand', {transformOrigin:"bottom center"}, 0);
  gsap.set('#cerro-school-clock-big-hand', {transformOrigin:"bottom center"}, 0);
  gsap.set('#cerro-school-flag-top-state2, #cerro-school-flag-top-state3, #cerro-school-flag-bottom-state2, #cerro-school-flag-bottom-state3', {opacity:0}, 0);
  gsap.set('#cerro-school-clock-mouth', {opacity:0});
  gsap.set(kidsSmile, {opacity:0});
  
  const makeFlagsFly = () => {
    cerroSchoolFlagsTl
      .to('#cerro-school-flag-top-state1', {morphSVG:'#cerro-school-flag-top-state2', duration:0.8, ease:'none'})
      .to('#cerro-school-flag-top-state1', {morphSVG:'#cerro-school-flag-top-state3', duration:0.8, ease:'none'}, '>')
      .to('#cerro-school-flag-top-state1', {morphSVG:'#cerro-school-flag-top-state1', duration:0.8, ease:'none'}, '>')
      
      .to('#cerro-school-flag-bottom-state1', {morphSVG:'#cerro-school-flag-bottom-state2', duration:0.8, ease:'none'}, 0.2)
      .to('#cerro-school-flag-bottom-state1', {morphSVG:'#cerro-school-flag-bottom-state3', duration:0.8, ease:'none'}, '>')
      .to('#cerro-school-flag-bottom-state1', {morphSVG:'#cerro-school-flag-bottom-state1', duration:0.8, ease:'none'}, '>');
      
    cerroSchoolFlagsTl
      .repeat(-1);
  };
  
  cerroSchoolTl
    // Clock hands are turning
    .to('#cerro-school-clock-small-hand', {rotation:450, duration:hoursAnimationDuration, ease:'none'}, hoursAnimationDelay)
    .to('#cerro-school-clock-big-hand', {rotation:5400, duration:hoursAnimationDuration, ease:'none'}, hoursAnimationDelay)

    // Animate numbers
    .call(animateSchoolNumbers, null, hoursAnimationDelay)

    // Call flags animation
    .call(updateSchoolCounter, [25], start25)
    .call(makeFlagsFly, null, start25)

    // Draw kids
    .call(updateSchoolCounter, [50], start50)
    .from(kids, {drawSVG:0, duration:2}, start50)
    
    // School doors open
    .call(updateSchoolCounter, [75], start75)
    .to('#cerro-school-door-left', {x:'-95%', duration:2, ease:'power2.in'}, start75)
    .to('#cerro-school-door-right', {x:'95%', duration:2, ease:'power2.in'}, start75)

    // Kids and clock smile
    .call(updateSchoolCounter, [100], start100)
    .fromTo('#cerro-school-clock-mouth', {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, start100)
    .fromTo(kidsSmile, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, start100);
    

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
    .repeat(Math.floor(start100 / 4.2) - 1);



  /****************************/
  /*        Distance          */
  /****************************/
  const scrollTriggerCerroDistance = {
      trigger: '.village-cerro-de-leones .section-distance',
      // markers: true,
      start: 'top center',
      end: 'bottom 0'
    };
  const cerroDistanceTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroDistance });
  const cerroDistanceWalkTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroDistance });
  const cerroDistanceTidesTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroDistance });

  const cerroDistanceChickenPaths = document.querySelectorAll('#cerro-distance-chicken path, #cerro-distance-chicken line, #cerro-distance-chicken polyline');
  const cerroDistanceCowPaths = document.querySelectorAll('#cerro-distance-cow path, #cerro-distance-cow line, #cerro-distance-cow polyline');

  gsap.set('#text-distance', {opacity:0, scale:0.7, transformOrigin:'50% 50%'});
  gsap.set('#cerro-distance-bird1-state2', {opacity:0});
  gsap.set('#cerro-distance-bird2-state2', {opacity:0});
  cerroDistanceTl
    // Clouds move horizontally 
    .fromTo('#cerro-distance-cloud1', {x:-200}, {x:800, duration:70, repeat:-1, ease:'none'}, 0)
    .fromTo('#cerro-distance-cloud2', {x:-200}, {x:800, duration:80, repeat:-1, ease:'none'}, 0)

    // Trace animals
    .from(cerroDistanceChickenPaths, {drawSVG:0, duration:2}, 6)
    .from(cerroDistanceCowPaths, {drawSVG:0, duration:2}, 6.7)

    // Animate birds
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'}, 7)
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird2-state1', {morphSVG:'#cerro-distance-bird2-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'}, 8)
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state2', x:'+=10', y='-=15', duration:0.4, ease:'none'})
    .to('#cerro-distance-bird1-state1', {morphSVG:'#cerro-distance-bird1-state1', x:'+=10', y='-=15', duration:0.4, ease:'none'});
  
  // Trace path to river
  gsap.set('#cerro-distance-arrowhead', {drawSVG:'50% 50%', opacity:0});
  const reverseDistanceWalk = () => {
    cerroDistanceWalkTl.reverse();
  };
  cerroDistanceWalkTl
    .to('#cerro-distance-walk', {drawSVG:'100% 100%', duration:3, ease:'none'}, 2)
    .to('#cerro-distance-arrowhead', {drawSVG:'0 100%', opacity:1, duration:0.5, ease:'power1.in'})
    .to('#text-distance', {opacity:1, scale:1, duration:0.5, ease:'back.out(1.4)'}, '>-0.1')
    .call(reverseDistanceWalk, null, 10);
  
  // Animate river waves
  cerroDistanceTidesTl
    .set('#cerro-distance-river-tides', {opacity:0})
    .to('#cerro-distance-river-tides', {x:'+30', opacity:1, duration:4, ease:'none'})
    .to('#cerro-distance-river-tides', {x:'+60', opacity:0, duration:4, ease:'none'});
  cerroDistanceTidesTl
    .repeat(-1)
    .repeatDelay(2);


  /****************************/
  /*        WaterMCL          */
  /****************************/
  const scrollTriggerCerroWaterMCL = {
    trigger: '.village-cerro-de-leones .section-waterMCL',
    // markers: true,
    start: 'top center',
    end: 'bottom 0'
  };
  const cerroWaterTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroWaterMCL });
  const cerroWaterEndTl = gsap.timeline();
  const cerroWaterBiologicalFloatTl = gsap.timeline();
  const cerroWaterInorganicFloatTl = gsap.timeline();
  const cerroWaterLegTl = gsap.timeline();

  const legs = document.querySelectorAll('#cerro-water-contaminants-biological path');
  legs.forEach(leg => {
    const datanameAttr = leg.getAttribute('data-name');
    if (datanameAttr === 'leg-0' || (datanameAttr === null && leg.getAttribute('id') === 'leg-0')) {
      leg.classList.add('leg-0');
    } else if (datanameAttr === 'leg-3' || (datanameAttr === null && leg.getAttribute('id') === 'leg-3')) {
      leg.classList.add('leg-3');
    } else if (datanameAttr === 'leg-6' || (datanameAttr === null && leg.getAttribute('id') === 'leg-6')) {
      leg.classList.add('leg-6');
    } else if (datanameAttr === 'leg-9' || (datanameAttr === null && leg.getAttribute('id') === 'leg-9')) {
      leg.classList.add('leg-9');
    } 
  });
  
  const numberOfBiologicalContaminants = 7;
  for (let i = 1; i <= numberOfBiologicalContaminants; i++) {
    document.querySelector(`#cerro-water-contaminant-biological-${i}`).classList.add('cerro-water-contaminant-biological');
  }
  const contaminantsBiologicalCircles = document.querySelectorAll('.cerro-water-contaminant-biological circle');
  const contaminantsBiologicalLegs = document.querySelectorAll('.cerro-water-contaminant-biological .leg-0');
  const contaminantsBiologicalBatch1 = document.querySelectorAll('#cerro-water-contaminant-biological-1, #cerro-water-contaminant-biological-4, #cerro-water-contaminant-biological-7');
  const contaminantsBiologicalBatch2 = document.querySelectorAll('#cerro-water-contaminant-biological-2, #cerro-water-contaminant-biological-5');
  const contaminantsBiologicalBatch3 = document.querySelectorAll('#cerro-water-contaminant-biological-3, #cerro-water-contaminant-biological-6');
  gsap.set(contaminantsBiologicalCircles, {opacity:0, transformOrigin:'50% 50%'});
  gsap.set(contaminantsBiologicalLegs, {drawSVG:'100% 100%'});
  gsap.set('.leg-3, .leg-6, .leg-9', {opacity:0})

  const contaminantsInorganic = document.querySelectorAll('#cerro-water-contaminants-inorganic rect');
  const contaminantsInorganicBatch1 = document.querySelectorAll('#cerro-water-contaminant-inorganic-1, #cerro-water-contaminant-inorganic-4');
  const contaminantsInorganicBatch2 = document.querySelectorAll('#cerro-water-contaminant-inorganic-2, #cerro-water-contaminant-inorganic-5');
  const contaminantsInorganicBatch3 = document.querySelectorAll('#cerro-water-contaminant-inorganic-3, #cerro-water-contaminant-inorganic-6');
  gsap.set(contaminantsInorganic, {opacity:0, scale:0, transformOrigin:'50% 50%'});


  const inorganicFloat = () => {
    const batches = [contaminantsInorganicBatch1, contaminantsInorganicBatch2, contaminantsInorganicBatch3];
    batches.forEach((batch, i) => {
      cerroWaterInorganicFloatTl
        .to(batch, {x:'-=0.5', y:'+=0.5', duration:0.7, ease='linear'}, i * 0.25)
        .to(batch, {x:'-=0.5', y:'-=0.5', duration:0.7, ease='linear'}, '>')
        .to(batch, {x:'+=0.5', y:'+=0.5', duration:0.7, ease='linear'}, '>')
        .to(batch, {x:'+=0.5', y:'-=0.5', duration:0.7, ease='linear'}, '>');
      cerroWaterInorganicFloatTl.repeat(-1).yoyo(true);
    });
  };

  const biologicalFloat = () => {
    const batches = [contaminantsBiologicalBatch1, contaminantsBiologicalBatch2, contaminantsBiologicalBatch3];
    batches.forEach((batch, i) => {
      cerroWaterBiologicalFloatTl
        .to(batch, {x:'-=0.7', y:'+=0.7', duration:0.8, ease='linear'}, i * 0.25)
        .to(batch, {x:'-=0.7', y:'-=0.7', duration:0.8, ease='linear'}, '>')
        .to(batch, {x:'+=0.7', y:'+=0.7', duration:0.8, ease='linear'}, '>')
        .to(batch, {x:'+=0.7', y:'-=0.7', duration:0.8, ease='linear'}, '>');
      cerroWaterBiologicalFloatTl.repeat(-1).yoyo(true);
    });
  };

  const biologicalLegsMovement = () => {  
    const legs = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 1; i <= numberOfBiologicalContaminants; i++) {
      legs.forEach(leg => {
        cerroWaterLegTl
          .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, 0)
          .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-6`, duration:0.5, ease:'none'}, '>')
          .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-9`, duration:0.5, ease:'none'}, '>')
          .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, '>');
        cerroWaterLegTl.repeat(-1).yoyo(true);
      });
    }
  };

  const stopWaterAnimations = () => {
    cerroWaterBiologicalFloatTl.pause();
    cerroWaterLegTl.pause();

    cerroWaterEndTl
    .to(contaminantsBiologicalLegs, {drawSVG:'100% 100%', opacity:0, stagger:{each:0.03, from:'random'}, duration:0.5, ease:'sine.in'})
    .to(contaminantsBiologicalCircles, {scale:0, opacity:0, stagger:{each:0.1, from:'random'}, duration:0.2, ease:'back.in(1.4)'})
    .to(contaminantsInorganic, {scale:0, opacity:0, stagger:{each:0.1, from:'random'}, duration:0.2, ease:'back.in(1.4)'});
  };

  cerroWaterTl
    .to(contaminantsInorganic, {opacity:1, scale:1, duration:0.2, ease:'back.out(1.7)', stagger:{each:0.1, from:'random'}}, 1)
    .call(inorganicFloat)
    .fromTo(contaminantsBiologicalCircles, {scale:0}, {scale:1, opacity:1, stagger:{each:0.05, from:'random'}, duration:0.2, ease:'back.out(1.4)'}, 2)
    .to(contaminantsBiologicalLegs, {drawSVG:'0 100%', stagger:{each:0.03, from:'random'}, duration:0.5, ease:'sine.in'})
    .call(biologicalLegsMovement)
    .call(biologicalFloat)
    .call(stopWaterAnimations, null, 15);


  /****************************/
  /*        Solution          */
  /****************************/
  const scrollTriggerCerroSolution = {
    trigger: '.village-cerro-de-leones .section-solution',
    // markers: true,
    start: 'top center',
    end: 'bottom 0'
  };
  const cerroSolutionTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSolution });
  const cerroSolutionTidesTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSolution });
  
  const cerroSolutionChickenPaths = document.querySelectorAll('#cerro-solution-chicken path, #cerro-solution-chicken line, #cerro-solution-chicken polyline');
  const cerroSolutionCowPaths = document.querySelectorAll('#cerro-solution-cow path, #cerro-solution-cow line');
  const cerroSolutionWaterTreatmentFacility = document.querySelectorAll('#cerro-solution-water-treatment path, #cerro-solution-water-treatment line, #cerro-solution-water-treatment polyline, #cerro-solution-water-treatment circle');
  gsap.set('#cerro-solution-water-treatment-faded', {opacity:0.3});
  gsap.set('#cerro-solution-bird1-state2', {opacity:0});
  gsap.set('#cerro-solution-bird2-state2', {opacity:0});
  
  // Animate river waves
  cerroSolutionTidesTl
    .set('#cerro-solution-river-tides', {opacity:0})
    .to('#cerro-solution-river-tides', {x:'+30', opacity:1, duration:4, ease:'none'})
    .to('#cerro-solution-river-tides', {x:'+60', opacity:0, duration:4, ease:'none'});
    cerroSolutionTidesTl
    .repeat(-1)
    .repeatDelay(2);

  cerroSolutionTl
    // Trace animals
    .from(cerroSolutionChickenPaths, {drawSVG:0, duration:2}, 2)
    .from(cerroSolutionCowPaths, {drawSVG:0, duration:2}, 2.7)

    // Animate birds
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, 7)
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, 8)
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    
    // Draw water treatment facility
    .from(cerroSolutionWaterTreatmentFacility, {drawSVG:0, duration:2}, 10)
    .to('#cerro-solution-water-treatment-faded', {opacity:0, duration:0.2}, '>');

  
  /****************************/
  /*        Coloring          */
  /****************************/
  const scrollTriggerCerroColoring = {
    trigger: '.village-cerro-de-leones .section-solution',
    // markers: true,
    start: 'top center',
    end: 'bottom 0'
  };
  const cerroColoringTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroColoring });
  const cerroColoringWindWheelTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroColoring });

  const cerroColoringKids = document.querySelectorAll('#cerro-coloring-kids path, #cerro-coloring-kids ellipse, #cerro-coloring-kids line, #cerro-coloring-kids circle');
  const cerroColoringKidsSmiles = document.querySelectorAll('#cerro-coloring-smile-1, #cerro-coloring-smile-2, #cerro-coloring-smile-3');
  const cerroColoringErlenmeyers = document.querySelectorAll('#cerro-coloring-erlenmeyers path, #cerro-coloring-erlenmeyers line');
  const cerroColoringDrops = document.querySelectorAll('#cerro-coloring-drops path');
  const cerroColoringPencils = document.querySelectorAll('#cerro-coloring-pencil-1, #cerro-coloring-pencil-2, #cerro-coloring-pencil-3, #cerro-coloring-pencil-4, #cerro-coloring-pencil-5');

  gsap.set(cerroColoringKidsSmiles, {opacity:0});
  gsap.set(cerroColoringDrops, {opacity:0, transformOrigin:'50% 50%'});
  gsap.set(cerroColoringPencils, {x:'-=10', y:'+=10', opacity:0});
  gsap.set('#cerro-coloring-windwheel', {transformOrigin:'50% 50%'});

  const startWindWheel = () => {
    cerroColoringWindWheelTl
      .to('#cerro-coloring-windwheel', {rotation:360, duration: 1.5, ease:'none'});
    cerroColoringWindWheelTl.repeat(-1);
  };

  cerroColoringTl
    // Draw kids
    .from(cerroColoringKids, {drawSVG:0, duration:3}, 2)

    // Draw erlenmeyers
    .from(cerroColoringErlenmeyers, {drawSVG:0, duration:2}, 6)

    // Make water drops appear
    .fromTo(cerroColoringDrops, {scale:0}, {scale:1, opacity:1, stagger:{each:0.15, from:'random'}, duration:0.3, ease:'back.out(1.4)'}, 7.8)

    // Make pencils appear
    .to(cerroColoringPencils, {x:'+=10', y:'-=10', opacity:1, stagger:{each:0.2, from:'end'}, duration:0.3, ease:'back.out(1.4)'}, 10)
    
    // Make kids smile
    .fromTo(cerroColoringKidsSmiles, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, 12)

    // Start windwheel
    .call(startWindWheel, null, 12);

};