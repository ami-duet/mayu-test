/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Animation variables
const start25 = 5;
const start50 = 10;
const start75 = 15;
const start100 = 20;
const getTransition = () => {
  return d3.transition().duration(200);
};
const illustrations = ['community', 'school', 'distance', 'waterMCL', 'solution', 'coloring'];

const triggerAnimations = (communityId, fundraisingLevel) => {
  const illustrationInfo = illustrationsInfo.find(info => info.community === communityId);

  // Reveal coloring
  const revealColoring = (community, section) => {
    gsap.to(`.village-${community} .section-${section} .coloring`, {opacity:1, duration:2, ease:'sine.out'});
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
          .call(makeBirdFly, [`#${communityId}-${section}-bird2-state1`, `#${communityId}-${section}-bird2-state2`, directionBird], '>+0.5');
        break;
      case 3:
        birdsTl
          .call(makeBirdFly, [`#${communityId}-${section}-bird1-state1`, `#${communityId}-${section}-bird1-state2`, directionBird])
          .call(makeBirdFly, [`#${communityId}-${section}-bird2-state1`, `#${communityId}-${section}-bird2-state2`, directionBird], '>+0.5')
          .call(makeBirdFly, [`#${communityId}-${section}-bird3-state1`, `#${communityId}-${section}-bird3-state2`, directionBird], '>+0.5');
        break;
      case 4:
        birdsTl
          .call(makeBirdFly, [`#${communityId}-${section}-bird1-state1`, `#${communityId}-${section}-bird1-state2`, directionBird])
          .call(makeBirdFly, [`#${communityId}-${section}-bird2-state1`, `#${communityId}-${section}-bird2-state2`, directionBird], '>+0.5')
          .call(makeBirdFly, [`#${communityId}-${section}-bird3-state1`, `#${communityId}-${section}-bird3-state2`, directionBird], '>+0.5')
          .call(makeBirdFly, [`#${communityId}-${section}-bird4-state1`, `#${communityId}-${section}-bird4-state2`, directionBird], '>+0.5');
        break;
    }
  };

  // Vehicles animation
  const vehicleAnimation = (section, distance, direction, rotationWheelBack, rotationWheelFront) => {
    gsap.set(`#${communityId}-${section}-wheel-back, #${communityId}-${section}-wheel-front`, {transformOrigin:"50% 50%"}, 0);
    let easeIn;
    let easeOut;
    if ((section === 'community' && communityId === 'las-mercedes') || section === 'solution') {
      easeIn = 'back.in(1.2)';
      easeOut = 'back.out(1.1)';
    } else {
      easeIn = 'back.in(1.7)';
      easeOut = 'back.out(1.4)';
    }
    const directionOpposite = direction === '+' ? '-' : '+';
    const durationIn = communityId === 'las-mercedes' ? 3 : 2;
    const durationOut = communityId === 'las-mercedes' ? 2.5 : 1;

    const vehicleTl = gsap.timeline();
    vehicleTl
      .to(`#${communityId}-${section}-wheel-back`, {rotation:`${direction}=${rotationWheelBack}`, duration:durationIn, ease:easeIn}, 3.1)
      .to(`#${communityId}-${section}-wheel-front`, {rotation:`${direction}=${rotationWheelFront}`, duration:durationIn, ease:easeIn}, 3.1)
      .to(`#${communityId}-${section}-tractor`, {x:`${direction}${distance}`, duration:durationIn, ease:easeIn}, 3.1)
  
      .to(`#${communityId}-${section}-wheel-back`, {rotation:`${directionOpposite}=${rotationWheelBack}`, duration:durationOut, ease:easeOut}, durationIn + 5)
      .to(`#${communityId}-${section}-wheel-front`, {rotation:`${directionOpposite}=${rotationWheelFront}`, duration:durationOut, ease:easeOut}, durationIn + 5)
      .to(`#${communityId}-${section}-tractor`, {x:0, duration:durationOut, ease:easeOut}, durationIn + 5);
  }

  // Rive waves animation
  const animateRiverTides = (section) => {
    const tidesTl = gsap.timeline();
    tidesTl
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

  const animateRaindrops = (section) => {
    const drops = document.querySelectorAll(`#${communityId}-${section}-raindrops line`);
    gsap.set(drops, {drawSVG:'0% 100%', y:0});
    const tl = gsap.timeline();
    tl
      .from(drops, {drawSVG:0, duration:0.01, opacity:0, ease:'none'}, 0)
      .to(drops, {y:45, drawSVG:'100% 100%', duration:0.5, opacity:1, stagger:{each:0.008, from:'random'}, ease:'power1.in'});
    tl.repeat(-1);
  };


  /****************************/
  /*         Planes           */
  /****************************/
  const stPlaneTop = {
    trigger: `.village-${communityId} .plane-top`,
    start: 'top center',
  };
  const stPlaneBottom = {
    trigger: `.village-${communityId} .plane-bottom`,
    start: 'top center'
  };
  const translation = (window.innerWidth - 90) < 1310 ? (window.innerWidth - 90)/2 : 1310/2;
  const planeWidth = window.innerWidth > 576 ? 184 : -200;

  // Plane top timeline
  const planeTopTl = gsap.timeline({ scrollTrigger: stPlaneTop });
  planeTopTl.from(`.village-${communityId} .plane-top`, {left:-translation + planeWidth, duration:window.innerWidth/100, ease:'sine.out'});

  // Plane bottom timeline
  const planeBottomTl = gsap.timeline({ scrollTrigger: stPlaneBottom });
  planeBottomTl.from(`.village-${communityId} .plane-bottom`, {right:-translation + planeWidth, duration:window.innerWidth/100, ease:'sine.out'});
    

  
  /****************************/
  /*         Community        */
  /****************************/
  if (fundraisingLevel >= 25) {
    const stCommunity = {
      trigger: `.village-${communityId} .section-community svg`,
      start: 'top center',
      end: 'bottom 0',
      onEnterBack: () => communityTl.restart(),
      onLeave: () => communityTl.pause()
    };
    const communityTl = gsap.timeline({ scrollTrigger: stCommunity });
    
    // Get animals selectors
    if (fundraisingLevel >= 75) {
      illustrationInfo.animalsCommunity.forEach(animal => {
        animal.selector = document.querySelectorAll(`#${communityId}-community-${animal.id} path, #${communityId}-community-${animal.id} line, #${communityId}-community-${animal.id} polyline`);
        gsap.set(animal.selector, {drawSVG:0});
      });
    }
    
    // Clouds animations
    const cloudsTranslation = `${illustrationInfo.cloudsCommunity.direction}=${illustrationInfo.cloudsCommunity.distance}`;
    if (communityId === 'totoral-bajo') {
      gsap.set(`#${communityId}-community-clouds-back-outline`, {x:cloudsTranslation, opacity:0});
    } else if (communityId === 'las-mercedes') {
      gsap.set(`#${communityId}-community-clouds-front-outline, #${communityId}-community-clouds-back-outline`, {x:cloudsTranslation, opacity:0});
    } else if (communityId === 'carrizalillo') {
      gsap.set(`#${communityId}-community-clouds-outline`, {x:cloudsTranslation, opacity:0});
    } else if (communityId === 'la-merced' || communityId === 'totoral-alto') {
      gsap.set(`#${communityId}-community-sun`, {opacity:0, y:20});
    }

    if (communityId !== 'la-merced' && communityId !== 'las-mercedes' && communityId !== 'totoral-alto' && communityId !== 'carrizalillo') {
      gsap.set(`#${communityId}-community-clouds-front`, {opacity:0});
      gsap.set(`#${communityId}-community-clouds-front`, {x:cloudsTranslation});
    }
    
    const communityCloudsMove = () => {
      const communityCloudsTl = gsap.timeline();

      if (communityId === 'totoral-bajo') {
        communityCloudsTl
          .to(`#${communityId}-community-clouds-front`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-front`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1')
          .to(`#${communityId}-community-clouds-back-outline`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-back-outline`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1');
      } else if (communityId === 'las-mercedes') {
        communityCloudsTl
          .to(`#${communityId}-community-clouds-front, #${communityId}-community-clouds-front-outline`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-front, #${communityId}-community-clouds-front-outline`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1')
          .to(`#${communityId}-community-clouds-back-outline`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-back-outline`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1');
      } else if (communityId === 'carrizalillo') {
        communityCloudsTl
          .to(`#${communityId}-community-clouds-outline`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-outline`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1');
      } else if (communityId === 'la-merced' || communityId === 'totoral-alto') {
        communityCloudsTl
          .to(`#${communityId}-community-sun`, {opacity:1, duration:1, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-sun`, {y:0, duration:8, ease:'sine.out'}, '<-1');
      } else {
        communityCloudsTl
          .to(`#${communityId}-community-clouds-front`, {opacity:1, duration:3, ease:'sine.out'}, 0)
          .to(`#${communityId}-community-clouds-front`, {x:-1*cloudsTranslation, duration:20, ease:'sine.out'}, '<-1');
      }
    };

    const community50 = () => {
      const tl = gsap.timeline();
      tl.call(vehicleAnimation, ['community', illustrationInfo.vehicleCommunity.distance, illustrationInfo.vehicleCommunity.direction, illustrationInfo.vehicleCommunity.rotationWheelBack, illustrationInfo.vehicleCommunity.rotationWheelFront]);
    };

    const community75 = () => {
      const tl = gsap.timeline();
      tl.call(traceAnimals, [illustrationInfo.animalsCommunity]);
    };

    const community100 = () => {
      const tl = gsap.timeline();

      if (communityId === 'totoral-alto') {
        tl
          .call(makeBirdFly, [`#${communityId}-community-bird1-state1`, `#${communityId}-community-bird1-state2`, 'right'])
          .call(makeBirdFly, [`#${communityId}-community-bird3-state1`, `#${communityId}-community-bird3-state2`, 'left'], '>+0.5')
          .call(makeBirdFly, [`#${communityId}-community-bird2-state1`, `#${communityId}-community-bird2-state2`, 'left'], '>+0.5');
      } else if (communityId == 'totoral-bajo') {
        tl
          .call(makeBirdFly, [`#${communityId}-community-bird1-state1`, `#${communityId}-community-bird1-state2`, 'left'])
          .call(makeBirdFly, [`#${communityId}-community-bird3-state1`, `#${communityId}-community-bird3-state2`, 'left'], '>+0.5')
          .call(makeBirdFly, [`#${communityId}-community-bird2-state1`, `#${communityId}-community-bird2-state2`, 'left'], '>+0.5');
      } else {
        tl
          .call(makeBirdFly, [`#${communityId}-community-bird2-state1`, `#${communityId}-community-bird2-state2`, 'left'])
          .call(makeBirdFly, [`#${communityId}-community-bird1-state1`, `#${communityId}-community-bird1-state2`, 'left'], 0.5);
      }
    };

    const communityColoringRevealTiming = [
      { level:25, timing:2 },
      { level:50, timing:5 },
      { level:75, timing:6 },
      { level:100, timing:9 }
    ];

    communityTl
      // Clouds move horizontally
      .call(communityCloudsMove, null, 1)
      .call(revealColoring, [communityId, 'community'], communityColoringRevealTiming.find(d => d.level === fundraisingLevel).timing);

      // Tractor starts moving
      if (fundraisingLevel >= 50) { communityTl.add(community50, 3) }

      // Trace animals
      if (fundraisingLevel >= 75) { communityTl.add(community75, 5) }

      // Animate birds
      if (fundraisingLevel === 100) { communityTl.add(community100, 8) }
  }


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

  const clockAnimationDuration = illustrationInfo.missedSchoolHours.max / 3;
  const clockAnimationDelay = 2;
  const tearsEnd = 9;
  
  gsap.set(`#${communityId}-school-clock-small-hand`, {transformOrigin:"bottom center"}, 0);
  gsap.set(`#${communityId}-school-clock-big-hand`, {transformOrigin:"bottom center"}, 0);
  gsap.set(`#${communityId}-school-clock-mouth`, {opacity:0});
  if (fundraisingLevel < 25) {
    gsap.set(`#${communityId}-school-clock-small-hand`, {rotation:7*360/12});
    gsap.set(`#${communityId}-school-clock-big-hand`, {rotation:4.5*360/12});
  }

  let kids = document.querySelectorAll(`#${communityId}-school-kids polygon, #${communityId}-school-kids polyline, #${communityId}-school-kids path, #${communityId}-school-kids ellipse`);
  let kidsSmile = document.querySelectorAll(`#${communityId}-school-kid1-mouth, #${communityId}-school-kid2-mouth`);
  gsap.set(kidsSmile, {opacity:0});
  if (fundraisingLevel === 100) {
    gsap.set(kids, {drawSVG:0});
  }

  const tearLeft = document.querySelector(`#${communityId}-school-clock-tear-left`);
  const tearRight = document.querySelector(`#${communityId}-school-clock-tear-right`);
  // Reset tears
  gsap.set(tearLeft, {drawSVG:'0% 100%', y:0});
  gsap.set(tearRight, {drawSVG:'0% 100%', y:0});

  const makeClockCry = () => {
    schoolTearsTl = gsap.timeline();
    schoolTearsTl
      .from(tearLeft, {drawSVG:0, duration:0.7, ease:'none'}, 0)
      .to(tearLeft, {y:25, duration:1, ease:'power2.in'})
      .to(tearLeft, {drawSVG:'100% 100%', opacity:0, duration:0.1})
      .from(tearRight, {drawSVG:0, duration:0.7, ease:'none'}, 3.2)
      .to(tearRight, {y:25, duration:1, ease:'power2.in'})
      .to(tearRight, {drawSVG:'100% 100%', opacity:0, duration:0.1});
    
    const clockTearsRepeatFactor = (fundraisingLevel < 100) ? -1 : (Math.floor(tearsEnd / 4.2) - 1);
    schoolTearsTl
      .repeat(clockTearsRepeatFactor);
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

  const school25 = () => {
    const tl = gsap.timeline();
    tl
      .to(`#${communityId}-school-clock-small-hand`, {rotation:illustrationInfo.missedSchoolHours.max*360/12, duration:clockAnimationDuration, ease:'none'}, 0)
      .to(`#${communityId}-school-clock-big-hand`, {rotation:illustrationInfo.missedSchoolHours.max*360, duration:clockAnimationDuration, ease:'none'}, 0)
      .call(makeClockCry, null, 0);
  };

  // Reset doors
  gsap.set(`#${communityId}-school-door-left`, {x:0})
  gsap.set(`#${communityId}-school-door-right`, {x:0})
  const school75 = () => {
    const tl = gsap.timeline();
    tl
      .to(`#${communityId}-school-door-left`, {x:'-95%', duration:2, ease:'power2.in'}, 0)
      .to(`#${communityId}-school-door-right`, {x:'95%', duration:2, ease:'power2.in'}, 0);
  };

  const school100 = () => {
    const tl = gsap.timeline();
    tl
      .to(kids, {drawSVG:'100%', duration:2})
      .fromTo(`#${communityId}-school-clock-mouth`, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, '>-0.8')
      .fromTo(kidsSmile, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, '>-0.8');
  };

  const schoolColoringRevealTiming = [
    { level:25, timing:4 },
    { level:50, timing:4 },
    { level:75, timing:8 },
    { level:100, timing:11 }
  ];

  // Timeline
    // Clock hands are turning
    if (fundraisingLevel >= 25) { 
      schoolTl
        .call(revealColoring, [communityId, 'school'], schoolColoringRevealTiming.find(d => d.level === fundraisingLevel).timing)
        .add(school25, clockAnimationDelay);
    }
    
    // Call flags animation
    if (fundraisingLevel >= 50) { schoolTl.add(makeFlagsFly, 0) }

    // School doors open
    if (fundraisingLevel >= 75) { schoolTl.add(school75, 6) }

    // Draw Kids and make clock smile
    if (fundraisingLevel === 100) { schoolTl.add(school100, tearsEnd) }
    


  /****************************/
  /*        Distance          */
  /****************************/
  gsap.set(`#${communityId}-distance-walk`, {opacity:0});

  if (fundraisingLevel >= 25) {
    const stDistance = {
      trigger: `.village-${communityId} .section-distance svg`,
      start: 'top center',
      end: 'bottom 0',
      onEnterBack: () => distanceTl.restart(),
      onLeave: () => distanceTl.pause()
    };
    const distanceTl = gsap.timeline({ scrollTrigger: stDistance });

    // gsap.set(`#${communityId}-distance-text-${lang}`, {opacity:0, scale:0.7, transformOrigin:'50% 50%'});
    gsap.set(`#${communityId}-distance-walk`, {drawSVG:'0% 100%', opacity:1});
    gsap.set(`#${communityId}-distance-arrowhead`, {drawSVG:'50% 50%', opacity:0});

    if (fundraisingLevel >= 50 && communityId !== 'carrizalillo') {
      gsap.set(`#${communityId}-distance-river-tides`, {opacity:0});
      gsap.set(`#${communityId}-distance-river-tides`, {x:'-=20'});
    }

    // Get animals selectors
    if (fundraisingLevel === 100) {
      illustrationInfo.animalsDistance.forEach(animal => {
        animal.selector = document.querySelectorAll(`#${communityId}-distance-${animal.id} path, #${communityId}-distance-${animal.id} line, #${communityId}-distance-${animal.id} polyline`);
        gsap.set(animal.selector, {drawSVG:0});
      });
    }

    let well;
    if (communityId === 'carrizalillo' && fundraisingLevel >= 50) {
      well = document.querySelectorAll('#carrizalillo-distance-well polygon, #carrizalillo-distance-well line, #carrizalillo-distance-well rect, #carrizalillo-distance-well polyline');
      gsap.set(well, {drawSVG:0})
    }
    const distance50 = () => {
      const tl = gsap.timeline();
      if (communityId === 'carrizalillo') {
        tl.to(well, {drawSVG:'100%', duration:2}, 2)
      } else {
        tl.call(animateRiverTides, ['distance']);
      }
    };

    const distance75 = () => {
      const tl = gsap.timeline();
      tl.call(callBirdsAnimations, ['numberOfBirdsDistance', 'distance', 'directionBirdsDistance']);
    };

    const distance100 = () => {
      const tl = gsap.timeline();
      tl.call(traceAnimals, [illustrationInfo.animalsDistance]);
    };

    const distanceColoringRevealTiming = [
      { level:25, timing:4 },
      { level:50, timing:4 },
      { level:75, timing:8 },
      { level:100, timing:11 }
    ];
    
    distanceTl
      // Trace path to river
      .to(`#${communityId}-distance-walk`, {drawSVG:'100% 100%', duration:3, ease:'none'}, 2)
      .to(`#${communityId}-distance-arrowhead`, {drawSVG:'0 100%', opacity:1, duration:0.5, ease:'power1.in'})
      // .to(`#${communityId}-distance-text-${lang}`, {opacity:1, scale:1, duration:0.5, ease:'back.out(1.4)'}, '>-0.1')
      .call(revealColoring, [communityId, 'distance'], distanceColoringRevealTiming.find(d => d.level === fundraisingLevel).timing);

      if (communityId === 'totoral-alto') {
        distanceTl.call(animateRaindrops, ['distance'], 0);
      }
      
      // Animate river waves
      if (fundraisingLevel >= 50) { distanceTl.add(distance50, 0) }
      
      // Animate birds
      if (fundraisingLevel >= 75) { distanceTl.add(distance75, 6) }
      
      // Trace animals
      if (fundraisingLevel === 100) { distanceTl.add(distance100, 9) }
  }


  /****************************/
  /*        WaterMCL          */
  /****************************/
  const legs = document.querySelectorAll(`#${communityId}-water-contaminants-biological path`);
  legs.forEach(leg => {
    const idAttr = leg.getAttribute('id');
    switch (true) {
      case idAttr.includes('leg-0'):
        leg.classList.add('leg-0');
        break;
      case idAttr.includes('leg-3'):
        leg.classList.add('leg-3');
        break;
      case idAttr.includes('leg-6'):
        leg.classList.add('leg-6');
        break;
      case idAttr.includes('leg-9'):
        leg.classList.add('leg-9');
        break;
    };
  });
  gsap.set('.leg-3, .leg-6, .leg-9', {opacity:0});

  if (fundraisingLevel >= 25) {
    const stWaterMCL = {
      trigger: `.village-${communityId} .section-waterMCL svg`,
      start: 'top center',
      end: 'bottom 0',
      onEnterBack: () => waterMCLTl.restart(),
      onLeave: () => waterMCLTl.pause()
    };
    const waterMCLTl = gsap.timeline({ scrollTrigger: stWaterMCL });
  
    for (let i = 1; i <= illustrationInfo.waterContaminants.biological; i++) {
      document.querySelector(`#${communityId}-water-contaminant-biological-${i}`).classList.add(`${communityId}-water-contaminant-biological`);
    }
    const contaminantsBiologicalCircles = document.querySelectorAll(`.${communityId}-water-contaminant-biological circle`);
    const contaminantsBiologicalLegs = document.querySelectorAll(`.${communityId}-water-contaminant-biological .leg-0`);
    gsap.set(contaminantsBiologicalCircles, {opacity:0, transformOrigin:'50% 50%'});
    gsap.set(contaminantsBiologicalLegs, {drawSVG:'100% 100%'});
    const contaminantsInorganic = document.querySelectorAll(`#${communityId}-water-contaminants-inorganic rect, #${communityId}-water-contaminants-inorganic path`);
    gsap.set(contaminantsInorganic, {opacity:0, scale:0, transformOrigin:'50% 50%'});

    // Make contaminants batches (groups)
    let contaminantsBiologicalBatch1Selectors = '';
    let contaminantsBiologicalBatch2Selectors = '';
    let contaminantsBiologicalBatch3Selectors = '';
    let contaminantsBiologicalBatch1;
    let contaminantsBiologicalBatch2;
    let contaminantsBiologicalBatch3;
    if (fundraisingLevel >= 50) {
      for (let i = 1; i <= illustrationInfo.waterContaminants.biological; i++) {
        switch (true) {
          case i % 3 == 0:
            contaminantsBiologicalBatch3Selectors += `#${communityId}-water-contaminant-biological-${i}, `
            break;
          case i % 2 == 0:
            contaminantsBiologicalBatch2Selectors += `#${communityId}-water-contaminant-biological-${i}, `
            break;
          default:
            contaminantsBiologicalBatch1Selectors += `#${communityId}-water-contaminant-biological-${i}, `
            break;
        };
      }
      contaminantsBiologicalBatch1 = document.querySelectorAll(contaminantsBiologicalBatch1Selectors.slice(0, -2));
      contaminantsBiologicalBatch2 = document.querySelectorAll(contaminantsBiologicalBatch2Selectors.slice(0, -2));
      contaminantsBiologicalBatch3 = document.querySelectorAll(contaminantsBiologicalBatch3Selectors.slice(0, -2));
    }

    let contaminantsInorganicBatch1Selectors = '';
    let contaminantsInorganicBatch2Selectors = '';
    let contaminantsInorganicBatch3Selectors = '';
    let contaminantsInorganicBatch1;
    let contaminantsInorganicBatch2;
    let contaminantsInorganicBatch3;
    if (fundraisingLevel >= 25) {
      for (let i = 1; i <= illustrationInfo.waterContaminants.inorganic; i++) {
        switch (true) {
          case i % 3 == 0:
            contaminantsInorganicBatch3Selectors += `#${communityId}-water-contaminant-inorganic-${i}, `
            break;
          case i % 2 == 0:
            contaminantsInorganicBatch2Selectors += `#${communityId}-water-contaminant-inorganic-${i}, `
            break;
          default:
            contaminantsInorganicBatch1Selectors += `#${communityId}-water-contaminant-inorganic-${i}, `
            break;
        };
      }
      contaminantsInorganicBatch1 = document.querySelectorAll(contaminantsInorganicBatch1Selectors.slice(0, -2));
      contaminantsInorganicBatch2 = document.querySelectorAll(contaminantsInorganicBatch2Selectors.slice(0, -2));
      if (illustrationInfo.waterContaminants.inorganic > 2) {
        contaminantsInorganicBatch3 = document.querySelectorAll(contaminantsInorganicBatch3Selectors.slice(0, -2));
      }
    }

    const waterInorganicFloatTl = gsap.timeline();
    const inorganicFloat = () => {
      const batches = [contaminantsInorganicBatch1, contaminantsInorganicBatch2, contaminantsInorganicBatch3];
      batches.forEach((batch, i) => {
        waterInorganicFloatTl
          .to(batch, {x:'-=0.5', y:'+=1', duration:0.7, ease='linear'}, i * 0.25)
          .to(batch, {x:'-=0.5', y:'-=1', duration:0.7, ease='linear'}, '>')
          .to(batch, {x:'+=1', y:'+=1', duration:0.7, ease='linear'}, '>')
          .to(batch, {x:'+=1', y:'-=1', duration:0.7, ease='linear'}, '>');
        waterInorganicFloatTl.repeat(-1).yoyo(true);
      });
    };
    const waterBiologicalFloatTl = gsap.timeline();
    
    const biologicalFloat = () => {
      const batches = [contaminantsBiologicalBatch1, contaminantsBiologicalBatch2, contaminantsBiologicalBatch3];
      batches.forEach((batch, i) => {
        waterBiologicalFloatTl
          .to(batch, {x:'-=0.7', y:'+=1.3', duration:0.8, ease='linear'}, i * 0.25)
          .to(batch, {x:'-=0.7', y:'-=1.3', duration:0.8, ease='linear'}, '>')
          .to(batch, {x:'+=1.4', y:'+=1.3', duration:0.8, ease='linear'}, '>')
          .to(batch, {x:'+=1.4', y:'-=1.3', duration:0.8, ease='linear'}, '>');
        waterBiologicalFloatTl.repeat(-1).yoyo(true);
      });
    };
    
    const waterLegTl = gsap.timeline();
    const biologicalLegsMovement = () => {  
      const legs = [1, 2, 3, 4, 5, 6, 7, 8];
      for (let i = 1; i <= illustrationInfo.waterContaminants.biological; i++) {
        legs.forEach(leg => {
          waterLegTl
            .to(`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, 0)
            .to(`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-6`, duration:0.5, ease:'none'}, '>')
            .to(`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-9`, duration:0.5, ease:'none'}, '>')
            .to(`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-0`, {morphSVG:`#${communityId}-water-contaminant-biological-${i} #leg-group-${i}-${leg} .leg-3`, duration:0.5, ease:'none'}, '>');
          waterLegTl.repeat(-1).yoyo(true);
        });
      }
    };
    
    const waterDrop1 = document.querySelector(`#${communityId}-water-drop-small-1`);
    const waterDrop2 = document.querySelector(`#${communityId}-water-drop-small-2`);
    const waterDrop3 = document.querySelector(`#${communityId}-water-drop-small-3`);
    const dropsFloat = () => {
      const batches = [waterDrop1, waterDrop2, waterDrop3];
      batches.forEach((batch, i) => {
        const waterDropsFloatTl = gsap.timeline();
        waterDropsFloatTl
          .to(batch, {x:'-=0.5', y:'+=1', duration:0.7, ease='linear'}, i * 0.25)
          .to(batch, {x:'-=0.5', y:'-=1', duration:0.7, ease='linear'}, '>')
          .to(batch, {x:'+=1', y:'+=1', duration:0.7, ease='linear'}, '>')
          .to(batch, {x:'+=1', y:'-=1', duration:0.7, ease='linear'}, '>');
        waterDropsFloatTl.repeat(-1).yoyo(true);
      });
    };

    const waterMCL75 = () => {
      const tl = gsap.timeline();
      tl
        .call(biologicalLegsMovement, null, 0)
        .call(biologicalFloat, null, 0);
    };

    const waterColoringRevealTiming = [
      { level:50, timing:6 },
      { level:75, timing:8 },
      { level:100, timing:10 }
    ];
    
    waterMCLTl
      .to(contaminantsInorganic, {opacity:1, scale:1, duration:0.2, ease:'back.out(1.7)', stagger:{each:0.1, from:'random'}}, 1)
      .fromTo(contaminantsBiologicalCircles, {scale:0}, {scale:1, opacity:1, stagger:{each:0.05, from:'random'}, duration:0.2, ease:'back.out(1.4)'}, 2)
      .to(contaminantsBiologicalLegs, {drawSVG:'0 100%', stagger:{each:0.03, from:'random'}, duration:0.5, ease:'sine.in'});

      // Make inorganic contaminants float
      if (fundraisingLevel >= 50) { 
        waterMCLTl
          .add(inorganicFloat, 5)
          .call(revealColoring, [communityId, 'waterMCL'], waterColoringRevealTiming.find(d => d.level === fundraisingLevel).timing);
      }
      
      // Make biologic contaminants float
      if (fundraisingLevel >= 75) { waterMCLTl.add(waterMCL75, 7) }

      // Make drops flot
      if (fundraisingLevel === 100) { waterMCLTl.add(dropsFloat, 10) }

  }


  /****************************/
  /*        Solution          */
  /****************************/
  const solutionWaterTreatmentFacility = document.querySelectorAll(`#${communityId}-solution-water-treatment path, #${communityId}-solution-water-treatment line, #${communityId}-solution-water-treatment polyline, #${communityId}-solution-water-treatment circle, #${communityId}-solution-water-treatment rect`);
  gsap.set(solutionWaterTreatmentFacility, {drawSVG:0});
  gsap.set(`#${communityId}-solution-water-treatment-faded`, {opacity:0.3});

  if (fundraisingLevel >= 25) {
    const stSolution = {
      trigger: `.village-${communityId} .section-solution svg`,
      start: 'top center',
      end: 'bottom 0',
      onEnterBack: () => solutionTl.restart(),
      onLeave: () => solutionTl.pause()
    };
    const solutionTl = gsap.timeline({ scrollTrigger: stSolution });
    
    if (communityId !== 'carrizalillo') {
      gsap.set(`#${communityId}-solution-river-tides`, {opacity:0});
      gsap.set(`#${communityId}-solution-river-tides`, {x:'-=20'});
    }

    // Get animals selectors
    illustrationInfo.animalsSolution.forEach(animal => {
      animal.selector = document.querySelectorAll(`#${communityId}-solution-${animal.id} path, #${communityId}-solution-${animal.id} line, #${communityId}-solution-${animal.id} polyline`);
      gsap.set(animal.selector, {drawSVG:0});
    });

    const solutionBirdsAnimation = () => {
      const solutionBirdsTl = gsap.timeline();
      solutionBirdsTl.call(callBirdsAnimations, ['numberOfBirdsSolution', 'solution', 'directionBirdsSolution']);
    };

    const solution50 = () => {
      const tl = gsap.timeline();
      tl.call(traceAnimals, [illustrationInfo.animalsSolution])
    };

    const solution100 = () => {
      const tl = gsap.timeline();
      tl
        .to(solutionWaterTreatmentFacility, {drawSVG:'100%', duration:2})
        .to(`#${communityId}-solution-water-treatment-faded`, {opacity:0, duration:0.2});
    };

    const solutionColoringRevealTiming = [
      { level:25, timing:3 },
      { level:50, timing:5},
      { level:75, timing:8 },
      { level:100, timing:11 }
    ];

    solutionTl
      .call(revealColoring, [communityId, 'solution'], solutionColoringRevealTiming.find(d => d.level === fundraisingLevel).timing);
      
      if (communityId === 'carrizalillo') {
        solutionTl.call(animateRaindrops, ['solution'], 0.1);
      } else if (communityId === 'totoral-bajo') {
        solutionTl
          .call(animateRaindrops, ['solution'], 0.1)
          .call(animateRiverTides, ['solution'], 0.1);
      } else {
        solutionTl.call(animateRiverTides, ['solution'], 0.1);
      }

      // Trace animals
      if (fundraisingLevel >= 50) { solutionTl.add(solution50, 4) }
      
      // Animate birds
      if (fundraisingLevel >= 75) {
        if (communityId === 'la-merced' || communityId === 'totoral-bajo' || communityId === 'carrizalillo') {
          solutionTl.call(vehicleAnimation, ['solution', illustrationInfo.vehicleSolution.distance, illustrationInfo.vehicleSolution.direction, illustrationInfo.vehicleSolution.rotationWheelBack, illustrationInfo.vehicleSolution.rotationWheelFront], 6);
        } else if (illustrationInfo.numberOfBirdsSolution > 0) {
          solutionTl.add(solutionBirdsAnimation, 6);
        }
      }
    
      // Draw water treatment facility
      if (fundraisingLevel === 100) { solutionTl.add(solution100, 10) }

  }

    
  /****************************/
  /*        Coloring          */
  /****************************/
  if (fundraisingLevel >= 25) {
    const stColoring = {
      trigger: `.village-${communityId} .section-coloring svg`,
      start: 'top center',
      end: 'bottom 0',
      onEnterBack: () => coloringTl.restart(),
      onLeave: () => coloringTl.pause()
    };
    const coloringTl = gsap.timeline({ scrollTrigger: stColoring });

    const coloringKids = document.querySelectorAll(`#${communityId}-coloring-kids path, #${communityId}-coloring-kids ellipse, #${communityId}-coloring-kids line, #${communityId}-coloring-kids circle`);
    const coloringKidsSmiles = document.querySelectorAll(`#${communityId}-coloring-smile-1, #${communityId}-coloring-smile-2, #${communityId}-coloring-smile-3`);
    const coloringErlenmeyers = document.querySelectorAll(`#${communityId}-coloring-erlenmeyers path, #${communityId}-coloring-erlenmeyers line`);
    const coloringDrops = document.querySelectorAll(`#${communityId}-coloring-drops path`);
    const coloringPencils = document.querySelectorAll(`#${communityId}-coloring-pencil-1, #${communityId}-coloring-pencil-2, #${communityId}-coloring-pencil-3, #${communityId}-coloring-pencil-4, #${communityId}-coloring-pencil-5`);
    
    gsap.set(coloringDrops, {opacity:0, transformOrigin:'50% 50%'});
    if (fundraisingLevel >= 50) {
      gsap.set(coloringPencils, {x:'-=10', y:'+=10', opacity:0});
    }
    if (fundraisingLevel >= 75) {
      gsap.set(`#${communityId}-coloring-windwheel`, {transformOrigin:'50% 50%'});
    }
    if (fundraisingLevel === 100) {
      gsap.set(coloringKids, {drawSVG:0});
      gsap.set(coloringKidsSmiles, {opacity:0});
    }
    
    const startWindWheel = () => {
      const coloringWindWheelTl = gsap.timeline();
      coloringWindWheelTl
        .to(`#${communityId}-coloring-windwheel`, {rotation:360, duration: 1.5, ease:'none'});
      coloringWindWheelTl.repeat(-1);
    };

    const coloring50 = () => {
      const tl = gsap.timeline();
      tl.to(coloringPencils, {x:'+=10', y:'-=10', opacity:1, stagger:{each:0.2, from:'end'}, duration:0.3, ease:'back.out(1.4)'});
    };

    const coloring100 = () => {
      const tl = gsap.timeline();
      tl
        .to(coloringKids, {drawSVG:'100%', duration:3})
        .fromTo(coloringKidsSmiles, {drawSVG:'50% 50%'}, {drawSVG:'0 100%', opacity:1, duration:1, ease:'sine.in'}, '>-0.8');
    };

    const coloringBookColoringRevealTiming = [
      { level:25, timing:2 },
      { level:50, timing:3 },
      { level:75, timing:4 },
      { level:100, timing:6 }
    ];

    coloringTl
      // Draw erlenmeyers + Make water drops appear
      .from(coloringErlenmeyers, {drawSVG:0, opacity:0, duration:2}, 2)
      .fromTo(coloringDrops, {scale:0}, {scale:1, opacity:1, stagger:{each:0.15, from:'random'}, duration:0.3, ease:'back.out(1.4)'}, '<+=1.8')
      .call(revealColoring, [communityId, 'coloring'], coloringBookColoringRevealTiming.find(d => d.level === fundraisingLevel).timing);
      
      // Make pencils appear
      if (fundraisingLevel >= 50) { coloringTl.add(coloring50, 3) }
      
      // Start windwheel
      if (fundraisingLevel >= 75) { coloringTl.add(startWindWheel, 4) }
      
      // Draw and Make kids smile
      if (fundraisingLevel >= 100) { coloringTl.add(coloring100, 5) }

  }
};