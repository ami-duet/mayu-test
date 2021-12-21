/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
const arrowsToggle = document.querySelector('.arrows-toggle');
const aboutToggle = document.querySelector('.about');
const carouselArrows = document.querySelector('.glide__arrows');
let largeScreen = window.innerWidth > 1100 ? true : false;
let villageNameIsSticky = false;

let fundLevelParam = urlParams.get('fund-level');
// Set first community
let firstVillageId = '';
if (urlParams.get('community')) {
  firstVillageId = urlParams.get('community');
} else {
  firstVillageId = 'cerro-de-leones';
}
const firstVillageIndex = villagesData.findIndex(village => village.village_id === firstVillageId);
const firstVillageName = villagesData[firstVillageIndex].village_name;
let currentVillageId = firstVillageId;

const appendCommunities = () => {
  d3.select('#first-community')
    .text(firstVillageName);
  
  // Set project version
  if (urlParams.get('version') && urlParams.get('version') === 'youth') {
    d3.select('body').classed('youth', true);
  }
  
  // Append villages illustrations and descriptions
  const villages = d3.select('.glide__slides')
    .selectAll('.glide__slide')
    .data(villagesData)
    .join('li')
      .attr('class', 'glide__slide')
    .append('div')
      .attr('class', d => {
        const fundLevelClass = fundLevelParam !== null 
          ? fundLevelParam 
          : dataFundraising.find(el => el.community === d.village_id).fundraising_level;
        return `village village-${d.village_id} fund-level-${fundLevelClass}`;
      });
  villages
    .append('h2')
      .text(d => d.village_name);
  const sections = villages
    .append('div')
      .attr('class', 'sections');

  const planeTop = sections
    .append('div')
      .attr('class', d => `plane-container plane-top plane-${d.village_id}`)
    .append('a')
      .attr('href', 'https://veraaquaveravita.org/donate')
      .attr('target', '_blank')
    .append('div')
      .attr('class', 'plane-banner')
    .append('div');
  planeTop
    .append('span')
      .attr('class', 'label')
      .text(d => lang === 'en' ? planeLabelEn : planeLabelEs);
  planeTop
    .append('span')
      .attr('class', 'community')
      .text(d => `${d.village_name}!`)
  
  const section = sections
    .selectAll('.section')
    .data(d => d.sections)
    .join('div')
      .attr('class', d => `section section-${d.sct_id}`);
  const illustration = section
    .append('div')
      .attr('class', 'sct-illustration');
  illustration.html(d =>  d.illustration );
  illustration.append('div').attr('class', 'coloring');
  updateIllustrationsLanguage();
  section
    .append('div')
      .attr('class', 'sct-description')
    .html(d => lang === 'es' ? d.description_es : d.description_en);
  
  currentVillage = d3.select('.current-village');
  currentVillage
    .append('h2')
      .text(villagesData.find(village => village.village_id === currentVillageId).village_name);
  
  // Call illustrations animations
  let fundLevel = fundLevelParam !== null ? +fundLevelParam : +dataFundraising.find(d => d.community === firstVillageId).fundraising_level;
  triggerAnimations(firstVillageId, fundLevel);
  
  // Initialize the carousel
  const carousel = new Glide('.glide', {
    type: 'carousel',
    focusAt: 'center',
    perView: 1,
    startAt: firstVillageIndex
  }).mount();
  
  // Swap carousel button's text for the villages names
  const updateCarouselButtons = (index) => {
    const prevVillage = villagesData[index - 1] ? villagesData[index - 1] : villagesData[villagesData.length - 1];
    d3.select('.glide__arrow--left .btn-label')
      .text(prevVillage.village_name);
  
    const nextVillage = villagesData[index + 1] ? villagesData[index + 1] : villagesData[0];
    d3.select('.glide__arrow--right .btn-label')
      .text(nextVillage.village_name);
  };
  
  // Update name of current village
  const updateCurrentVillage = (index) => {
    const previousVillage = currentVillageId;
    gsap.globalTimeline.clear();

    const community = villagesData[index];
    currentVillageId = community.village_id;
    currentVillage.select('h2').text(community.village_name);

    fundLevel = fundLevelParam !== null ? +fundLevelParam : +dataFundraising.find(d => d.community === community.village_id).fundraising_level;
    triggerAnimations(currentVillageId, fundLevel);
  };
  
  if (window.innerWidth > 1100) {
    updateCarouselButtons(carousel.index);
  }
  carousel.on('run', () => {
    if (window.innerWidth > 1100) {
      updateCarouselButtons(carousel.index);
    }
    d3.selectAll('.coloring').style('opacity', 0);
    updateCurrentVillage(carousel.index);
  });
  
  adjustHeightPeruMapText();
  
  
  // Update variables on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && !largeScreen) {
      largeScreen = true;
      updateCarouselButtons(carousel.index);
    } else if (window.innerWidth <= 1100 && largeScreen) {
      largeScreen = false;
    }
  
    adjustHeightPeruMapText();
  });
  
  
  const villageName = document.querySelector('.village h2');
  window.addEventListener('scroll', () => {
    const arrowsThreshold = largeScreen ? 300 : -125;
    // Once the carousel is in view
    if (aboutToggle.offsetTop - window.pageYOffset <= (window.innerHeight / 2) + 70) {
      // hide arrows
      if (!carouselArrows.classList.contains('exit')) {
        carouselArrows.classList.remove('enter');
        carouselArrows.classList.add('exit');
      }
    } else if (arrowsToggle.getBoundingClientRect().top <= arrowsThreshold) {
      if (carouselArrows.classList.contains('hidden')) {
        carouselArrows.classList.remove('hidden');
      }
  
      if (!carouselArrows.classList.contains('enter')) {
        // show arrows
        carouselArrows.classList.remove('exit');
        carouselArrows.classList.add('enter');
      }
    } else if (arrowsToggle.getBoundingClientRect().top > arrowsThreshold && !carouselArrows.classList.contains('exit')) {
      // hide arrows
      carouselArrows.classList.remove('enter');
      carouselArrows.classList.add('exit');
    }
  
    // Make village name sticky
    if (aboutToggle.offsetTop - window.pageYOffset <= (window.innerHeight / 2) + 70) {
      currentVillage.classed('visible', false);
      villageNameIsSticky = false;
    } else if (villageName.getBoundingClientRect().top < -50 && !villageNameIsSticky) {
      currentVillage.classed('visible', true);
      villageNameIsSticky = true;
    } else if (villageName.getBoundingClientRect().top >= -50 && villageNameIsSticky) {
      currentVillage.classed('visible', false);
      villageNameIsSticky = false;
    }
  });
};

// Load fundraising level data
let dataFundraising;
const dataPath = window.location.href.includes('dist')
  ? '../dist/data/fundraising_level_per_community.csv'
  : '../data/fundraising_level_per_community.csv';

d3.csv(dataPath).then(data => {
  dataFundraising = data;
  appendCommunities();
});
