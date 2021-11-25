const translations = {
  intro_en: '<div class="container"> <div class="row"> <div class="col-12 col-lg-4 offset-lg-5 title-container"> <div class="title"> <h1 class="hidden"> <span>True Water,</span> <span>True Life.</span> </h1> <div class="credentials hidden">by ami duet for VAVV</div></div></div><div class="col-12 col-lg-3 intro-container"> <div class="intro hidden"> <p><span class="drop-cap">M</span>ayu loves to play and dream in the fields surrounding her home in <span class="em">Cerro de Leones</span>. She lives in beautiful <span class="em">Piura</span> in northwestern <span class="em">Peru</span>, where there are three other countryside communities closer to her, and another three quite farther. Some are bigger than Cerro de Leones, with lots of homes and children her age, and some are so small that they do not have a school.</p><p>But they have one thing in common. All the children in the seven communities do not have clean water - not in their homes nor their schools. With no healthy water to drink, they cannot learn and play as much as they would like.</p><p><span class="drop-cap close">T</span>his is our story about them, and about <span class="em">Vera Aqua Vera Vita</span> &lbrace;VAVV&rbrace; who wish to make a true life change!</p></div></div></div></div><div class="donate-link-wrapper"> <a href="https://veraaquaveravita.org/donate" class="donate-link hidden" target="_blank">Donate</a> </div>',
  intro_es: '<div class="container"> <div class="row"> <div class="col-12 col-lg-4 offset-lg-5 title-container"> <div class="title"> <h1 class="hidden"> <span>Agua verdadera,</span> <span>Vida verdadera.</span> </h1> <div class="credentials hidden">por ami duet para VAVV</div></div></div><div class="col-12 col-lg-3 intro-container"> <div class="intro hidden"> <p><span class="drop-cap">A</span> Mayu le encanta jugar y soñar en los campos que rodean su casa en <span class="em">Cerro de Leones</span>. Ella vive en la hermosa <span class="em">Piura</span>, en el noroeste de Perú, donde hay otras tres comunidades rurales cercanas a ella y otras tres bastante lejos. Algunas son más grandes que <span class="em">Cerro de Leones</span>, con muchas casas y niños de su edad, y algunas son tan pequeñas que no tienen escuelas.</p><p>Aun así, todos tienen algo en común. Todos los niños de las siete comunidades no tienen agua potable, ni en sus hogares ni en sus escuelas. Sin agua saludable para beber, no pueden aprender ni jugar como ellos quisieran.</p><p>¡<span class="drop-cap close">E</span>sta es nuestra historia sobre ellos y sobre <span class="em">Vera Aqua Vera Vita</span> &lbrace;VAVV&rbrace; quienes desean hacer un verdadero cambio de vida!</p></div></div></div></div><div class="donate-link-wrapper"> <a href="https://veraaquaveravita.org/donate" class="donate-link hidden" target="_blank">Donar</a> </div>',
}

// Get url parameters
const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang') ? urlParams.get('lang') : 'en';

// Append introduction
let intro = lang === 'es' ? 'intro_es' : 'intro_en';
d3.select('#top').html(`<div class="illustration"></div>${translations[intro]}`);

// Animate introduction
gsap.set('.cover h1', {y:'+=10'});
gsap.set('.cover .donate-link', {y:'-=4'});

const introTl = gsap.timeline();
introTl
  .to('.cover h1', {y:'0', opacity:1, duration:0.6, ease:'sine.in'}, 1.5)
  .to('.cover .credentials, .cover .intro', {opacity:1, duration:0.3, ease:'sine.in'})
  .to('.cover .donate-link', {y:'0', opacity:1, duration:0.4, ease:'sine.out'}, '+=0.5');