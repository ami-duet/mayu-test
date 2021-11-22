// Animation variables
const start25 = 5;
const start50 = 10;
const start75 = 15;
const start100 = 20;
const getTransition = () => {
  return d3.transition().duration(200);
};
const illustrations = ['community', 'school', 'distance', 'waterMCL', 'solution', 'coloring'];

const triggerAnimations = (communityId) => {
  const illustrationInfo = illustrationsInfo.find(info => info.community === communityId);
  
  // Temporary counters
  if (document.querySelector(`.village-${communityId} .section-community .counter`) === null) {
    illustrations.forEach(illustration => {
      d3.select(`.village-${communityId} .section-${illustration}`)
        .append('div')
          .attr('class', 'counter')
          .text('0%');
    });
  }
  const updateCounter = (section, percent) => {
    d3.select(`.village-${communityId} .section-${section} .counter`)
      .transition(getTransition())
        .style('opacity', 0)
      .transition(getTransition())
        .text(`${percent}%`)
      .transition(getTransition())
        .style('opacity', 1);
  };

  // Birds flying animation
  const makeBirdFly = (birdState1, birdState2, direction) => {
    const birdTl = gsap.timeline();
    const xDirection = direction === 'left' ? '-' : '+';
    
    birdTl
      .to(birdState1, {morphSVG:birdState2, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, 0)
      .to(birdState1, {morphSVG:birdState1, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, '>')
      .to(birdState1, {morphSVG:birdState2, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, '>')
      .to(birdState1, {morphSVG:birdState1, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, '>')
      .to(birdState1, {morphSVG:birdState2, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, '>')
      .to(birdState1, {morphSVG:birdState1, x:`${xDirection}=10`, y='-=15', duration:0.4, ease:'none'}, '>');
  };
  const callBirdsAnimations = (selector, section, direction) => {
    const numOfBirds = illustrationInfo[selector];
    const directionBird = illustrationInfo[direction];
    const birdsTl = gsap.timeline();

    switch (numOfBirds) {
      case 2:
        birdsTl
          .call(makeBirdFly, [`#${communityId}-${section}-bird1-state1`, `#${communityId}-${section}-bird1-state2`, directionBird])
          .call(makeBirdFly, [`#${communityId}-${section}-bird2-state1`, `#${communityId}-${section}-bird2-state2`, directionBird], '>+1');
        break;
      case 4:
        birdsTl
          .call(makeBirdFly, [`#${communityId}-${section}-bird1-state1`, `#${communityId}-${section}-bird1-state2`, directionBird])
          .call(makeBirdFly, [`#${communityId}-${section}-bird2-state1`, `#${communityId}-${section}-bird2-state2`, directionBird], '>+1')
          .call(makeBirdFly, [`#${communityId}-${section}-bird3-state1`, `#${communityId}-${section}-bird3-state2`, directionBird], '>+1')
          .call(makeBirdFly, [`#${communityId}-${section}-bird4-state1`, `#${communityId}-${section}-bird4-state2`, directionBird], '>+1');
        break;
    }
  };

  // Vehicles animation
  const vehicleAnimation = (section, distance, direction, rotationWheelBack, rotationWheelFront) => {
    gsap.set(`#${communityId}-${section}-wheel-back, #${communityId}-${section}-wheel-front`, {transformOrigin:"50% 50%"}, 0);
    const easeIn = 'back.in(1.7)';
    const easeOut = 'back.out(1.4)';
    const directionOpposite = direction === '+' ? '-' : '+';

    const vehicleTl = gsap.timeline();
    vehicleTl
      .to(`#${communityId}-${section}-wheel-back`, {rotation:`${direction}=${rotationWheelBack}`, duration:2, ease:easeIn}, 0)
      .to(`#${communityId}-${section}-wheel-front`, {rotation:`${direction}=${rotationWheelFront}`, duration:2, ease:easeIn}, 0)
      .to(`#${communityId}-${section}-tractor`, {x:`${direction}${distance}`, duration:2, ease:easeIn}, 0)
  
      .to(`#${communityId}-${section}-wheel-back`, {rotation:`${directionOpposite}=${rotationWheelBack}`, duration:1, ease:easeOut}, 7)
      .to(`#${communityId}-${section}-wheel-front`, {rotation:`${directionOpposite}=${rotationWheelFront}`, duration:1, ease:easeOut}, start50 + 7)
      .to(`#${communityId}-${section}-tractor`, {x:0, duration:1, ease:easeOut}, 7);
  
    vehicleTl
      .repeat(-1)
      .repeatDelay(10)
      .yoyo(true);
  }

  // Rive waves animation
  const animateRiverTides = (section) => {
    const tidesTl = gsap.timeline();
    tidesTl
      .set(`#${communityId}-${section}-river-tides`, {x:'-=20', opacity:0})
      .to(`#${communityId}-${section}-river-tides`, {x:'+=30', opacity:1, duration:4, ease:'none'})
      .to(`#${communityId}-${section}-river-tides`, {x:'+=30', opacity:0, duration:4, ease:'none'});
    tidesTl
      .repeat(-1)
      .repeatDelay(2);
  };

  // Trace animals
  const traceAnimals = (animals) => {
    animals.forEach(animal => {
      gsap.to(animal.selector, {drawSVG:'100%', duration:2});
    });
  };


  /****************************/
  /*         Community        */
  /****************************/
  const stCommunity = {
    trigger: `.village-${communityId} .section-community svg`,
    start: 'top center',
    end: 'bottom 0',
    onEnterBack: () => communityTl.restart(),
    onLeave: () => communityTl.pause()
  };
  const communityTl = gsap.timeline({ scrollTrigger: stCommunity });

  // Get animals selectors
  illustrationInfo.animalsCommunity.forEach(animal => {
    animal.selector = document.querySelectorAll(`#${communityId}-community-${animal.id} path, #${communityId}-community-${animal.id} line, #${communityId}-community-${animal.id} polyline`);
    gsap.set(animal.selector, {drawSVG:0});
  });
  
  // Clouds animations
  const communityCloudsMove = () => {
    gsap.to(`#cloud-color-1, #${communityId}-community-clouds-back`, {opacity:0.42, duration:1, ease:'power1.out'});
    gsap.to(`#${communityId}-community-sun-color`, {opacity:0.8, duration:1, ease:'power1.out'});
    const communityCloudsTl = gsap.timeline();
    communityCloudsTl
      .fromTo(`#${communityId}-community-clouds-front`, {x:220}, {x:-300, duration:50, repeat:-1, ease:'none'}, 0)
      .fromTo(`#${communityId}-community-clouds-back`, {x:220}, {x:-300, duration:80, repeat:-1, ease:'none'}, 0);
  };

  // Timelines
  communityTl
    // Clouds move horizontally
    .call(updateCounter, ['community', 25], start25)
    .call(communityCloudsMove, null, start25)

    // Tractor starts moving
    .call(updateCounter, ['community', 50], start50)
    .call(vehicleAnimation, ['community', illustrationInfo.vehicleCommunity.distance, illustrationInfo.vehicleCommunity.direction, illustrationInfo.vehicleCommunity.rotationWheelBack, illustrationInfo.vehicleCommunity.rotationWheelFront], start50)

    // Trace animals
    .call(updateCounter, ['community', 75], start75)
    .call(traceAnimals, [illustrationInfo.animalsCommunity], start75)

    // Animate birds
    .call(updateCounter, ['community', 100], start100)
    .call(makeBirdFly, [`#${communityId}-community-bird2-state1`, `#${communityId}-community-bird2-state2`, 'left'], start100)
    .call(makeBirdFly, [`#${communityId}-community-bird1-state1`, `#${communityId}-community-bird1-state2`, 'left'], start100 + 1);


  /****************************/
  /*          School          */
  /****************************/
  const stSchool = {
    trigger: `.village-${communityId} .section-school svg`,
    start: 'top center',
    end: 'bottom 0',
    onEnterBack: () => schoolTl.restart(),
    onLeave: () => schoolTl.pause()
  };
  const schoolTl = gsap.timeline({ scrollTrigger: stSchool });

  const clockAnimationDuration = 3;
  const clockAnimationDelay = 2;
  const kids = document.querySelectorAll(`#${communityId}-school-kids polygon, #${communityId}-school-kids polyline, #${communityId}-school-kids path, #${communityId}-school-kids ellipse`);
  const kidsSmile = document.querySelectorAll(`#${communityId}-school-kid1-mouth, #${communityId}-school-kid2-mouth`);
  
  gsap.set(`#${communityId}-school-clock-small-hand`, {transformOrigin:"bottom center"}, 0);
  gsap.set(`#${communityId}-school-clock-big-hand`, {transformOrigin:"bottom center"}, 0);
  gsap.set(`#${communityId}-school-clock-mouth`, {opacity:0});
  gsap.set(kidsSmile, {opacity:0});

  if (illustrationInfo.hasTwoSchools) {
    gsap.set(`#${communityId}-school-flag-top-state2, #${communityId}-school-flag-top-state3, #${communityId}-school-flag-bottom-state2, #${communityId}-school-flag-bottom-state3`, {opacity:0}, 0);
  } else {
    gsap.set(`#${communityId}-school-flag-state2, #${communityId}-school-flag-state3`, {opacity:0}, 0);
  }

  const makeClockCry = () => {
    const tearLeft = document.querySelector(`#${communityId}-school-clock-tear-left`);
    const tearRight = document.querySelector(`#${communityId}-school-clock-tear-right`);
    schoolTearsTl = gsap.timeline();
    schoolTearsTl
      .from(tearLeft, {drawSVG:0, duration:0.7, ease:'none'}, 0)
      .to(tearLeft, {y:25, duration:1, ease:'power2.in'})
      .to(tearLeft, {drawSVG:'100% 100%', opacity:0, duration:0.1})
      .from(tearRight, {drawSVG:0, duration:0.7, ease:'none'}, 3.2)
      .to(tearRight, {y:25, duration:1, ease:'power2.in'})
      .to(tearRight, {drawSVG:'100% 100%', opacity:0, duration:0.1});
    schoolTearsTl
      .repeat(Math.floor(start100 / 4.2) - 1);
  };
  
  const makeFlagsFly = () => {
    schoolFlagsTl = gsap.timeline();

    if (illustrationInfo.hasTwoSchools) {
      schoolFlagsTl
        .to(`#${communityId}-school-flag-top-state1`, {morphSVG:`#${communityId}-school-flag-top-state2`, duration:0.8, ease:'none'})
        .to(`#${communityId}-school-flag-top-state1`, {morphSVG:`#${communityId}-school-flag-top-state3`, duration:0.8, ease:'none'}, '>')
        .to(`#${communityId}-school-flag-top-state1`, {morphSVG:`#${communityId}-school-flag-top-state1`, duration:0.8, ease:'none'}, '>')
        
        .to(`#${communityId}-school-flag-bottom-state1`, {morphSVG:`#${communityId}-school-flag-bottom-state2`, duration:0.8, ease:'none'}, 0.2)
        .to(`#${communityId}-school-flag-bottom-state1`, {morphSVG:`#${communityId}-school-flag-bottom-state3`, duration:0.8, ease:'none'}, '>')
        .to(`#${communityId}-school-flag-bottom-state1`, {morphSVG:`#${communityId}-school-flag-bottom-state1`, duration:0.8, ease:'none'}, '>');  
    } else {
      schoolFlagsTl
        .to(`#${communityId}-school-flag-state1`, {morphSVG:`#${communityId}-school-flag-state2`, duration:0.8, ease:'none'})
        .to(`#${communityId}-school-flag-state1`, {morphSVG:`#${communityId}-school-flag-state3`, duration:0.8, ease:'none'}, '>')
        .to(`#${communityId}-school-flag-state1`, {morphSVG:`#${communityId}-school-flag-state1`, duration:0.8, ease:'none'}, '>')
    }

    schoolFlagsTl
      .repeat(-1);
  };
  
  schoolTl
    // Clock hands are turning
    .to(`#${communityId}-school-clock-small-hand`, {rotation:illustrationInfo.missedSchoolHours.max*360/12, duration:clockAnimationDuration, ease:'none'}, clockAnimationDelay)
    .to(`#${communityId}-school-clock-big-hand`, {rotation:illustrationInfo.missedSchoolHours.max*360, duration:clockAnimationDuration, ease:'none'}, clockAnimationDelay)
    .call(makeClockCry, null, clockAnimationDelay)

    // Call flags animation
    .call(updateCounter, ['school', 25], start25)
    .call(makeFlagsFly, null, start25)

    // Draw kids
    .call(updateCounter, ['school', 50], start50)
    .from(kids, {drawSVG:0, duration:2}, start50)
    
    // School doors open
    .call(updateCounter, ['school', 75], start75)
    .to(`#${communityId}-school-door-left`, {x:'-95%', duration:2, ease:'power2.in'}, start75)
    .to(`#${communityId}-school-door-right`, {x:'95%', duration:2, ease:'power2.in'}, start75)

    // Kids and clock smile
    .call(updateCounter, ['school', 100], start100)
    .fromTo(`#${communityId}-school-clock-mouth`, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, start100)
    .fromTo(kidsSmile, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, start100);
  


  /****************************/
  /*        Distance          */
  /****************************/
  const stDistance = {
    trigger: `.village-${communityId} .section-distance svg`,
    start: 'top center',
    end: 'bottom 0',
    onEnterBack: () => distanceTl.restart(),
    onLeave: () => distanceTl.pause()
  };
  const distanceTl = gsap.timeline({ scrollTrigger: stDistance });

  gsap.set(`#${communityId}-distance-text`, {opacity:0, scale:0.7, transformOrigin:'50% 50%'});
  gsap.set(`#${communityId}-distance-walk`, {drawSVG:'0% 100%'});
  gsap.set(`#${communityId}-distance-arrowhead`, {drawSVG:'50% 50%', opacity:0});
  gsap.set(`#${communityId}-distance-bird1-state2, #${communityId}-distance-bird2-state2`, {opacity:0});
 
  // Get animals selectors
  illustrationInfo.animalsDistance.forEach(animal => {
    animal.selector = document.querySelectorAll(`#${communityId}-distance-${animal.id} path, #${communityId}-distance-${animal.id} line, #${communityId}-distance-${animal.id} polyline`);
    gsap.set(animal.selector, {drawSVG:0});
  });
  
  // Fade path to river
  const fadeDistanceWalk = () => {
    gsap.set(`#${communityId}-distance-walk`, {opacity:0});
    gsap.to(`#${communityId}-distance-points, #${communityId}-distance-arrowhead, #${communityId}-distance-text`, {opacity:0.4, duration:1, ease:'power2.out'});
  };
  
  distanceTl
    // Trace path to river
    .to(`#${communityId}-distance-walk`, {drawSVG:'100% 100%', duration:3, ease:'none'}, 2)
    .to(`#${communityId}-distance-arrowhead`, {drawSVG:'0 100%', opacity:1, duration:0.5, ease:'power1.in'})
    .to(`#${communityId}-distance-text`, {opacity:1, scale:1, duration:0.5, ease:'back.out(1.4)'}, '>-0.1')

    // Animate river waves
    .call(updateCounter, ['distance', 25], start25)
    .to(`#${communityId}-distance-river-tides`, {opacity:0, duration:0.2})
    .call(animateRiverTides, ['distance'], start25)

    // Animate birds
    .call(updateCounter, ['distance', 50], start50)
    .call(callBirdsAnimations, ['numberOfBirdsDistance', 'distance', 'directionBirdsDistance'], start50)
    
    // Trace animals
    .call(updateCounter, ['distance', 75], start75)
    .call(traceAnimals, [illustrationInfo.animalsDistance], start75)

    // Fade distance walk
    .call(updateCounter, ['distance', 100], start100)
    .call(fadeDistanceWalk, null, start100);



  // /****************************/
  // /*        WaterMCL          */
  // /****************************/
  // const scrollTriggerCerroWaterMCL = {
  //   trigger: '.village-cerro-de-leones .section-waterMCL svg',
  //   // markers: true,
  //   start: 'top center',
  //   end: 'bottom 0'
  // };
  // const cerroWaterTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroWaterMCL });
  // const cerroWaterEndTl = gsap.timeline();
  // const cerroWaterDropsFloatTl = gsap.timeline();
  // const cerroWaterBiologicalFloatTl = gsap.timeline();
  // const cerroWaterInorganicFloatTl = gsap.timeline();
  // const cerroWaterLegTl = gsap.timeline();

  // const counterWater = d3.select('.village-cerro-de-leones .section-waterMCL')
  //   .append('div')
  //     .attr('class', 'counter')
  //     .text('0%');
  // const updateWaterCounter = (percent) => {
  //   counterWater
  //     .transition(getTransition())
  //       .style('opacity', 0)
  //     .transition(getTransition())
  //       .text(`${percent}%`)
  //     .transition(getTransition())
  //       .style('opacity', 1);
  // };

  // const legs = document.querySelectorAll('#cerro-water-contaminants-biological path');
  // legs.forEach(leg => {
  //   const datanameAttr = leg.getAttribute('data-name');
  //   if (datanameAttr === 'leg-0' || (datanameAttr === null && leg.getAttribute('id') === 'leg-0')) {
  //     leg.classList.add('leg-0');
  //   } else if (datanameAttr === 'leg-3' || (datanameAttr === null && leg.getAttribute('id') === 'leg-3')) {
  //     leg.classList.add('leg-3');
  //   } else if (datanameAttr === 'leg-6' || (datanameAttr === null && leg.getAttribute('id') === 'leg-6')) {
  //     leg.classList.add('leg-6');
  //   } else if (datanameAttr === 'leg-9' || (datanameAttr === null && leg.getAttribute('id') === 'leg-9')) {
  //     leg.classList.add('leg-9');
  //   } 
  // });
  
  // const numberOfBiologicalContaminants = 7;
  // for (let i = 1; i <= numberOfBiologicalContaminants; i++) {
  //   document.querySelector(`#cerro-water-contaminant-biological-${i}`).classList.add('cerro-water-contaminant-biological');
  // }
  // const contaminantsBiologicalCircles = document.querySelectorAll('.cerro-water-contaminant-biological circle');
  // const contaminantsBiologicalLegs = document.querySelectorAll('.cerro-water-contaminant-biological .leg-0');
  // const contaminantsBiologicalBatch1 = document.querySelectorAll('#cerro-water-contaminant-biological-1, #cerro-water-contaminant-biological-4, #cerro-water-contaminant-biological-7');
  // const contaminantsBiologicalBatch2 = document.querySelectorAll('#cerro-water-contaminant-biological-2, #cerro-water-contaminant-biological-5');
  // const contaminantsBiologicalBatch3 = document.querySelectorAll('#cerro-water-contaminant-biological-3, #cerro-water-contaminant-biological-6');
  // gsap.set(contaminantsBiologicalCircles, {opacity:0, transformOrigin:'50% 50%'});
  // gsap.set(contaminantsBiologicalLegs, {drawSVG:'100% 100%'});
  // gsap.set('.leg-3, .leg-6, .leg-9', {opacity:0})

  // const contaminantsInorganic = document.querySelectorAll('#cerro-water-contaminants-inorganic rect');
  // const contaminantsInorganicBatch1 = document.querySelectorAll('#cerro-water-contaminant-inorganic-1, #cerro-water-contaminant-inorganic-4');
  // const contaminantsInorganicBatch2 = document.querySelectorAll('#cerro-water-contaminant-inorganic-2, #cerro-water-contaminant-inorganic-5');
  // const contaminantsInorganicBatch3 = document.querySelectorAll('#cerro-water-contaminant-inorganic-3, #cerro-water-contaminant-inorganic-6');
  // gsap.set(contaminantsInorganic, {opacity:0, scale:0, transformOrigin:'50% 50%'});

  // const waterDrop1 = document.querySelector('#cerro-water-drop-small-1');
  // const waterDrop2 = document.querySelector('#cerro-water-drop-small-2');
  // const waterDrop3 = document.querySelector('#cerro-water-drop-small-3');
  // const dropsFloat = () => {
  //   const batches = [waterDrop1, waterDrop2, waterDrop3];
  //   batches.forEach((batch, i) => {
  //     cerroWaterDropsFloatTl
  //       .to(batch, {x:'-=0.5', y:'+=1', duration:0.7, ease='linear'}, i * 0.25)
  //       .to(batch, {x:'-=0.5', y:'-=1', duration:0.7, ease='linear'}, '>')
  //       .to(batch, {x:'+=1', y:'+=1', duration:0.7, ease='linear'}, '>')
  //       .to(batch, {x:'+=1', y:'-=1', duration:0.7, ease='linear'}, '>');
  //       cerroWaterDropsFloatTl.repeat(-1).yoyo(true);
  //   });
  // };

  // const inorganicFloat = () => {
  //   const batches = [contaminantsInorganicBatch1, contaminantsInorganicBatch2, contaminantsInorganicBatch3];
  //   batches.forEach((batch, i) => {
  //     cerroWaterInorganicFloatTl
  //       .to(batch, {x:'-=0.5', y:'+=1', duration:0.7, ease='linear'}, i * 0.25)
  //       .to(batch, {x:'-=0.5', y:'-=1', duration:0.7, ease='linear'}, '>')
  //       .to(batch, {x:'+=1', y:'+=1', duration:0.7, ease='linear'}, '>')
  //       .to(batch, {x:'+=1', y:'-=1', duration:0.7, ease='linear'}, '>');
  //     cerroWaterInorganicFloatTl.repeat(-1).yoyo(true);
  //   });
  // };

  // const biologicalFloat = () => {
  //   const batches = [contaminantsBiologicalBatch1, contaminantsBiologicalBatch2, contaminantsBiologicalBatch3];
  //   batches.forEach((batch, i) => {
  //     cerroWaterBiologicalFloatTl
  //       .to(batch, {x:'-=0.7', y:'+=1.3', duration:0.8, ease='linear'}, i * 0.25)
  //       .to(batch, {x:'-=0.7', y:'-=1.3', duration:0.8, ease='linear'}, '>')
  //       .to(batch, {x:'+=1.4', y:'+=1.3', duration:0.8, ease='linear'}, '>')
  //       .to(batch, {x:'+=1.4', y:'-=1.3', duration:0.8, ease='linear'}, '>');
  //     cerroWaterBiologicalFloatTl.repeat(-1).yoyo(true);
  //   });
  // };

  // const biologicalLegsMovement = () => {  
  //   const legs = [1, 2, 3, 4, 5, 6, 7, 8];
  //   for (let i = 1; i <= numberOfBiologicalContaminants; i++) {
  //     legs.forEach(leg => {
  //       cerroWaterLegTl
  //         .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, 0)
  //         .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-6`, duration:0.5, ease:'none'}, '>')
  //         .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-9`, duration:0.5, ease:'none'}, '>')
  //         .to(`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#cerro-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, '>');
  //       cerroWaterLegTl.repeat(-1).yoyo(true);
  //     });
  //   }
  // };

  // const stopWaterAnimations = () => {
  //   cerroWaterBiologicalFloatTl.pause();
  //   cerroWaterLegTl.pause();

  //   cerroWaterEndTl
  //   .to(contaminantsBiologicalLegs, {drawSVG:'100% 100%', opacity:0, stagger:{each:0.03, from:'random'}, duration:0.5, ease:'sine.in'})
  //   .to(contaminantsBiologicalCircles, {scale:0, opacity:0, stagger:{each:0.1, from:'random'}, duration:0.2, ease:'back.in(1.4)'})
  //   .to(contaminantsInorganic, {scale:0, opacity:0, stagger:{each:0.1, from:'random'}, duration:0.2, ease:'back.in(1.4)'});
  // };

  // cerroWaterTl
  //   .to(contaminantsInorganic, {opacity:1, scale:1, duration:0.2, ease:'back.out(1.7)', stagger:{each:0.1, from:'random'}}, 1)
  //   .fromTo(contaminantsBiologicalCircles, {scale:0}, {scale:1, opacity:1, stagger:{each:0.05, from:'random'}, duration:0.2, ease:'back.out(1.4)'}, 2)
  //   .to(contaminantsBiologicalLegs, {drawSVG:'0 100%', stagger:{each:0.03, from:'random'}, duration:0.5, ease:'sine.in'})
    
  //   // Make inorganic contaminants float
  //   .call(updateWaterCounter, [25], start25)
  //   .call(inorganicFloat, null, start25)

  //   // Make biologic contaminants float
  //   .call(updateWaterCounter, [50], start50)
  //   .call(biologicalLegsMovement, null, start50)
  //   .call(biologicalFloat, null, start50)

  //   // Make drops flot
  //   .call(updateWaterCounter, [75], start75)
  //   .call(dropsFloat, null, start75)

  //   .call(updateWaterCounter, [100], start100)
  //   .to([contaminantsInorganic, contaminantsBiologicalCircles, contaminantsBiologicalLegs], {opacity:0.4, duration:1}, start100)
  //   // .call(stopWaterAnimations, null, 15);


  // /****************************/
  // /*        Solution          */
  // /****************************/
  // const scrollTriggerCerroSolution = {
  //   trigger: '.village-cerro-de-leones .section-solution svg',
  //   // markers: true,
  //   start: 'top center',
  //   end: 'bottom 0'
  // };
  // const cerroSolutionTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSolution });
  // const cerroSolutionTidesTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroSolution });

  // const counterSolution = d3.select('.village-cerro-de-leones .section-solution')
  //   .append('div')
  //     .attr('class', 'counter')
  //     .text('0%');
  // const updateSolutionCounter = (percent) => {
  //   counterSolution
  //     .transition(getTransition())
  //       .style('opacity', 0)
  //     .transition(getTransition())
  //       .text(`${percent}%`)
  //     .transition(getTransition())
  //       .style('opacity', 1);
  // };
  
  // const cerroSolutionChickenPaths = document.querySelectorAll('#cerro-solution-chicken path, #cerro-solution-chicken line, #cerro-solution-chicken polyline');
  // const cerroSolutionCowPaths = document.querySelectorAll('#cerro-solution-cow path, #cerro-solution-cow line');
  // const cerroSolutionWaterTreatmentFacility = document.querySelectorAll('#cerro-solution-water-treatment path, #cerro-solution-water-treatment line, #cerro-solution-water-treatment polyline, #cerro-solution-water-treatment circle');
  // gsap.set('#cerro-solution-water-treatment-faded', {opacity:0.3});
  // gsap.set('#cerro-solution-bird1-state2', {opacity:0});
  // gsap.set('#cerro-solution-bird2-state2', {opacity:0});
  // gsap.set('#cerro-solution-river-tides', {x:'+=20'});
  
  // const animateRiverTidesSolution = () => {
  //   cerroSolutionTidesTl
  //     .set('#cerro-solution-river-tides', {x:0, opacity:0})
  //     .to('#cerro-solution-river-tides', {x:'+30', opacity:1, duration:4, ease:'none'})
  //     .to('#cerro-solution-river-tides', {x:'+60', opacity:0, duration:4, ease:'none'});
  //     cerroSolutionTidesTl
  //     .repeat(-1)
  //     .repeatDelay(2);
  // };

  // cerroSolutionTl
  //   // Animate river waves
  //   .call(updateSolutionCounter, [25], start25)
  //   .to('#cerro-solution-river-tides', {opacity:0, duration:0.2})
  //   .to('#cerro-solution-river-tides', {x:'-=20'})
  //   .call(animateRiverTidesSolution, null, start25)

  //   // Trace animals
  //   .call(updateSolutionCounter, [50], start50)
  //   .from(cerroSolutionChickenPaths, {drawSVG:0, duration:2}, start50)
  //   .from(cerroSolutionCowPaths, {drawSVG:0, duration:2}, start50 + 0.7)

  //   // Animate birds
  //   .call(updateSolutionCounter, [75], start75)
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, start75)
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state2', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird2-state1', {morphSVG:'#cerro-solution-bird2-state1', x:'-=10', y='-=15', duration:0.4, ease:'none'}, '>')
    
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, start75 + 1)
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state2', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
  //   .to('#cerro-solution-bird1-state1', {morphSVG:'#cerro-solution-bird1-state1', x:'-=15', y='-=15', duration:0.4, ease:'none'}, '>')
    
  //   // Draw water treatment facility
  //   .call(updateSolutionCounter, [100], start100)
  //   .from(cerroSolutionWaterTreatmentFacility, {drawSVG:0, duration:2}, start100)
  //   .to('#cerro-solution-water-treatment-faded', {opacity:0, duration:0.2}, '>');

  
  // /****************************/
  // /*        Coloring          */
  // /****************************/
  // const scrollTriggerCerroColoring = {
  //   trigger: '.village-cerro-de-leones .section-solution svg',
  //   // markers: true,
  //   start: 'top center',
  //   end: 'bottom 0'
  // };
  // const cerroColoringTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroColoring });
  // const cerroColoringWindWheelTl = gsap.timeline({ scrollTrigger: scrollTriggerCerroColoring });

  // const counterColoring = d3.select('.village-cerro-de-leones .section-coloring')
  //   .append('div')
  //     .attr('class', 'counter')
  //     .text('0%');
  // const updateColoringCounter = (percent) => {
  //   counterColoring
  //     .transition(getTransition())
  //       .style('opacity', 0)
  //     .transition(getTransition())
  //       .text(`${percent}%`)
  //     .transition(getTransition())
  //       .style('opacity', 1);
  // };

  // const cerroColoringKids = document.querySelectorAll('#cerro-coloring-kids path, #cerro-coloring-kids ellipse, #cerro-coloring-kids line, #cerro-coloring-kids circle');
  // const cerroColoringKidsSmiles = document.querySelectorAll('#cerro-coloring-smile-1, #cerro-coloring-smile-2, #cerro-coloring-smile-3');
  // const cerroColoringErlenmeyers = document.querySelectorAll('#cerro-coloring-erlenmeyers path, #cerro-coloring-erlenmeyers line');
  // const cerroColoringDrops = document.querySelectorAll('#cerro-coloring-drops path');
  // const cerroColoringPencils = document.querySelectorAll('#cerro-coloring-pencil-1, #cerro-coloring-pencil-2, #cerro-coloring-pencil-3, #cerro-coloring-pencil-4, #cerro-coloring-pencil-5');

  // gsap.set(cerroColoringKidsSmiles, {opacity:0});
  // gsap.set(cerroColoringDrops, {opacity:0, transformOrigin:'50% 50%'});
  // gsap.set(cerroColoringPencils, {x:'-=10', y:'+=10', opacity:0});
  // gsap.set('#cerro-coloring-windwheel', {transformOrigin:'50% 50%'});

  // const startWindWheel = () => {
  //   cerroColoringWindWheelTl
  //     .to('#cerro-coloring-windwheel', {rotation:360, duration: 1.5, ease:'none'});
  //   cerroColoringWindWheelTl.repeat(-1);
  // };

  // cerroColoringTl
  //   // Draw kids
  //   .from(cerroColoringKids, {drawSVG:0, duration:3}, 2)

  //   // Draw erlenmeyers + Make water drops appear
  //   .call(updateColoringCounter, [25], start25)
  //   .from(cerroColoringErlenmeyers, {drawSVG:0, duration:2}, start25)
  //   .fromTo(cerroColoringDrops, {scale:0}, {scale:1, opacity:1, stagger:{each:0.15, from:'random'}, duration:0.3, ease:'back.out(1.4)'}, start25 + 1.8)

  //   // Make pencils appear
  //   .call(updateColoringCounter, [50], start50)
  //   .to(cerroColoringPencils, {x:'+=10', y:'-=10', opacity:1, stagger:{each:0.2, from:'end'}, duration:0.3, ease:'back.out(1.4)'}, start50)
    
  //   // Start windwheel
  //   .call(updateColoringCounter, [75], start75)
  //   .call(startWindWheel, null, start75)
    
  //   // Make kids smile
  //   .call(updateColoringCounter, [100], start100)
  //   .fromTo(cerroColoringKidsSmiles, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, start100);

};