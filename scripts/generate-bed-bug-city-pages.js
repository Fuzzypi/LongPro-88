#!/usr/bin/env node
/**
 * LongPro — Bed Bug City Page Generator
 * Generates /service-area/{city}/bed-bugs/index.html for all target cities
 * Focus: west side of Cleveland, 20-mile radius
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '../dist_assets/service-area');
const BED_BUG_PREVIEW = 'https://longpropc.com/images/og/bed-bug-extermination-preview.png';

// ─── City data ────────────────────────────────────────────────────────────────
const cities = [
  {
    name: 'Lakewood',
    slug: 'lakewood',
    distance: 3,
    zip: '44107',
    lat: 41.4819, lon: -81.7982,
    county: 'Cuyahoga',
    nearby: ['Rocky River', 'Fairview Park', 'Cleveland West Side', 'Brooklyn'],
    localContext: 'Lakewood\'s dense housing stock — including dozens of large apartment complexes and multi-unit buildings along Detroit Avenue and Clifton Boulevard — makes it one of the highest-risk cities in Greater Cleveland for bed bug spread. Shared walls, shared laundry, and high tenant turnover create ideal conditions for infestations to move from unit to unit.',
    bedbugRisk: 'Lakewood\'s concentration of older apartment buildings and frequent tenant movement puts residents at elevated bed bug risk. Hotels and Airbnb rentals near the lakefront also introduce new infestations regularly.',
    neighborhoods: ['Birdtown', 'Gold Coast', 'Clifton Park', 'Edgewater', 'Downtown Lakewood'],
  },
  {
    name: 'Rocky River',
    slug: 'rocky-river',
    distance: 6,
    zip: '44116',
    lat: 41.4770, lon: -81.8396,
    county: 'Cuyahoga',
    nearby: ['Westlake', 'Bay Village', 'Lakewood', 'Fairview Park'],
    localContext: 'Rocky River\'s mix of upscale single-family homes and lakefront condos means bed bug infestations here often arrive via travel — returning from hotels, cruises, or visiting relatives. Many residents are surprised bed bugs can reach their neighborhood, but the pests don\'t discriminate by zip code.',
    bedbugRisk: 'Travel-related introductions are the primary bed bug risk in Rocky River. Hotel stays, vacation travel, and second-hand furniture purchases are the most common entry points.',
    neighborhoods: ['Rocky River (city proper)', 'Beachcliff', 'Center Ridge area', 'Wagar Road corridor'],
  },
  {
    name: 'Fairview Park',
    slug: 'fairview-park',
    distance: 5,
    zip: '44126',
    lat: 41.4442, lon: -81.8627,
    county: 'Cuyahoga',
    nearby: ['North Olmsted', 'Rocky River', 'Lakewood', 'Westlake'],
    localContext: 'Fairview Park\'s residential neighborhoods include many mid-century ranch and split-level homes that see consistent turnover, especially near Lorain Road. Bed bugs introduced through used furniture, visiting guests, or travel often go undetected for weeks in these single-family settings.',
    bedbugRisk: 'Fairview Park sees bed bug introductions primarily through used furniture, travel, and visitors. Infestations in single-family homes can go undetected longer than in apartments.',
    neighborhoods: ['Fairview Park (city proper)', 'Lorain Road corridor', 'Mastick area', 'West 220th area'],
  },
  {
    name: 'Bay Village',
    slug: 'bay-village',
    distance: 9,
    zip: '44140',
    lat: 41.4851, lon: -81.9124,
    county: 'Cuyahoga',
    nearby: ['Westlake', 'Rocky River', 'Avon Lake', 'North Olmsted'],
    localContext: 'Bay Village is a largely residential lakefront community where bed bug introductions typically trace back to travel or purchasing second-hand furniture. The city\'s tight-knit neighborhood feel means word of an infestation spreads quickly — discretion is especially valued here.',
    bedbugRisk: 'Travel and used furniture are the primary bed bug introduction routes in Bay Village. Discreet, confidential service is a priority for most Bay Village homeowners.',
    neighborhoods: ['Bay Village (city proper)', 'Cahoon Memorial Park area', 'Lake Road corridor', 'Wolf Road area'],
  },
  {
    name: 'Brooklyn',
    slug: 'brooklyn',
    distance: 4,
    zip: '44144',
    lat: 41.4381, lon: -81.7355,
    county: 'Cuyahoga',
    nearby: ['Parma', 'Garfield Heights', 'Middleburg Heights', 'Cleveland'],
    localContext: 'Brooklyn\'s mix of older single-family homes and multi-unit rentals along Tiedeman Road and Broadview Road puts it at moderate-to-high bed bug risk. Proximity to Cleveland\'s west side means infestations here often track back to shared transportation or workplace exposure.',
    bedbugRisk: 'Brooklyn sees bed bug cases from both multi-family housing spread and travel introduction. The city\'s proximity to Cleveland adds workplace-exposure risk.',
    neighborhoods: ['Brooklyn (city proper)', 'Tiedeman Road area', 'Broadview Road corridor', 'Memphis Avenue area'],
  },
  {
    name: 'Parma',
    slug: 'parma',
    distance: 5,
    zip: '44129',
    lat: 41.4048, lon: -81.7229,
    county: 'Cuyahoga',
    nearby: ['Parma Heights', 'Seven Hills', 'Brooklyn', 'Middleburg Heights'],
    localContext: 'Parma — Cuyahoga County\'s second-largest city — has a dense mix of 1950s-era single-family homes, duplexes, and apartment complexes along Ridge Road, Pearl Road, and State Road. Older construction with more entry points, combined with multi-unit housing, makes Parma one of the most active bed bug markets on Cleveland\'s west side.',
    bedbugRisk: 'Parma\'s older housing stock and multi-unit buildings along Ridge Road and Pearl Road create elevated bed bug risk. High-density residential areas see faster infestation spread between units.',
    neighborhoods: ['Parma (city proper)', 'Ridge Road corridor', 'Pearl Road area', 'State Road area', 'Parma Heights adjacent'],
  },
  {
    name: 'Parma Heights',
    slug: 'parma-heights',
    distance: 7,
    zip: '44130',
    lat: 41.3870, lon: -81.7610,
    county: 'Cuyahoga',
    nearby: ['Parma', 'Middleburg Heights', 'Seven Hills', 'Strongsville'],
    localContext: 'Parma Heights residents benefit from a quieter, more suburban setting but still face bed bug risk through travel, used furniture, and shared-wall exposure in condo and townhome communities. Proximity to Parma means infestations can sometimes trace back to neighboring units or shared common areas.',
    bedbugRisk: 'Parma Heights sees bed bug cases from travel introductions and condo/townhome spread. The city\'s mix of housing types means both single-family and multi-unit scenarios.',
    neighborhoods: ['Parma Heights (city proper)', 'York Road corridor', 'Pearl Road area', 'West 130th area'],
  },
  {
    name: 'Seven Hills',
    slug: 'seven-hills',
    distance: 8,
    zip: '44131',
    lat: 41.3864, lon: -81.6810,
    county: 'Cuyahoga',
    nearby: ['Independence', 'Parma', 'Broadview Heights', 'Brecksville'],
    localContext: 'Seven Hills is a largely residential suburban community where bed bug introductions primarily come from travel or second-hand furniture. The city\'s predominantly single-family character means infestations don\'t spread as rapidly as in denser areas, but early treatment is still critical.',
    bedbugRisk: 'Seven Hills bed bug cases most commonly trace to travel, hotel stays, or used furniture. Single-family homes limit spread but early treatment matters.',
    neighborhoods: ['Seven Hills (city proper)', 'Broadview Road area', 'Crossview Road corridor'],
  },
  {
    name: 'Brook Park',
    slug: 'brook-park',
    distance: 7,
    zip: '44142',
    lat: 41.3989, lon: -81.8007,
    county: 'Cuyahoga',
    nearby: ['Berea', 'Middleburg Heights', 'Parma', 'Brooklyn'],
    localContext: 'Brook Park\'s proximity to Cleveland Hopkins International Airport creates unique bed bug risk — travelers returning home, airline employees, and hotel workers all have elevated exposure. The city\'s mix of working-class residential homes and transient traffic makes it a consistent market for bed bug treatment.',
    bedbugRisk: 'Brook Park\'s airport proximity creates elevated bed bug risk through travel exposure. Hotel employees and frequent travelers in this area have higher-than-average infestation rates.',
    neighborhoods: ['Brook Park (city proper)', 'Airport area', 'Snow Road corridor', 'Engle Road area'],
  },
  {
    name: 'Berea',
    slug: 'berea',
    distance: 10,
    zip: '44017',
    lat: 41.3662, lon: -81.8543,
    county: 'Cuyahoga',
    nearby: ['Brook Park', 'Middleburg Heights', 'North Olmsted', 'Olmsted Falls'],
    localContext: 'Berea\'s combination of Baldwin Wallace University students, airport-area workers, and established residential neighborhoods creates a diverse bed bug risk profile. Student housing turnover each fall is a common introduction point, and multi-unit apartments near the university see higher infestation rates.',
    bedbugRisk: 'Berea\'s university population and airport proximity create elevated bed bug risk. Student housing and multi-unit apartments near Baldwin Wallace see higher infestation rates.',
    neighborhoods: ['Berea (city proper)', 'Downtown Berea', 'Front Street area', 'Baldwin Wallace University area', 'Eastland Road corridor'],
  },
  {
    name: 'Middleburg Heights',
    slug: 'middleburg-heights',
    distance: 9,
    zip: '44130',
    lat: 41.3620, lon: -81.8138,
    county: 'Cuyahoga',
    nearby: ['Berea', 'Brook Park', 'Strongsville', 'Parma Heights'],
    localContext: 'Middleburg Heights\' concentration of hotels, extended-stay properties, and retail corridors along Bagley Road and Smith Road make it one of the higher-risk suburbs for bed bug introduction on the west side. Hotel workers and frequent business travelers in this area have elevated exposure.',
    bedbugRisk: 'Middleburg Heights\' hotel corridor and business traveler population create above-average bed bug risk. The Bagley Road and Smith Road areas see regular new introductions.',
    neighborhoods: ['Middleburg Heights (city proper)', 'Bagley Road corridor', 'Smith Road area', 'Airport area'],
  },
  {
    name: 'North Olmsted',
    slug: 'north-olmsted',
    distance: 10,
    zip: '44070',
    lat: 41.4153, lon: -81.9224,
    county: 'Cuyahoga',
    nearby: ['Westlake', 'Fairview Park', 'Olmsted Falls', 'Berea'],
    localContext: 'North Olmsted\'s Great Northern Mall area and surrounding retail corridors bring significant foot traffic, and the city\'s mix of apartment complexes and single-family homes covers a wide range of bed bug risk scenarios. Multi-family housing near Lorain Road sees more rapid spread.',
    bedbugRisk: 'North Olmsted\'s apartment complexes near Lorain Road create multi-unit spread risk. Retail and shopping traffic also brings occasional introduction from elsewhere.',
    neighborhoods: ['North Olmsted (city proper)', 'Great Northern area', 'Lorain Road corridor', 'Stearns Road area'],
  },
  {
    name: 'Independence',
    slug: 'independence',
    distance: 10,
    zip: '44131',
    lat: 41.3695, lon: -81.6388,
    county: 'Cuyahoga',
    nearby: ['Seven Hills', 'Brecksville', 'Garfield Heights', 'Parma'],
    localContext: 'Independence\'s concentration of corporate offices, hotels, and business-traveler traffic along Rockside Road creates consistent bed bug introduction risk. Many residents and hotel guests travel frequently for work, and the hospitality corridor here sees some of the highest regional bed bug activity.',
    bedbugRisk: 'Independence\'s Rockside Road hotel and business corridor creates elevated bed bug risk. Business travelers and hotel staff have above-average exposure.',
    neighborhoods: ['Independence (city proper)', 'Rockside Road corridor', 'Brecksville Road area', 'Valley View adjacent'],
  },
  {
    name: 'Strongsville',
    slug: 'strongsville',
    distance: 15,
    zip: '44136',
    lat: 41.3145, lon: -81.8357,
    county: 'Cuyahoga',
    nearby: ['North Royalton', 'Middleburg Heights', 'Brunswick', 'Olmsted Falls'],
    localContext: 'Strongsville\'s SouthPark Mall and surrounding retail hub bring significant traffic from across Northeast Ohio. The city\'s large, newer single-family homes may mask bed bug infestations longer since residents often don\'t expect the problem, delaying treatment and allowing infestations to grow.',
    bedbugRisk: 'Strongsville\'s retail hub and upscale housing profile create a risk where infestations go undetected longer. Travel introductions are the most common source.',
    neighborhoods: ['Strongsville (city proper)', 'SouthPark area', 'Pearl Road corridor', 'Royalton Road area', 'Prospect Road corridor'],
  },
  {
    name: 'Westlake',
    slug: 'westlake',
    distance: 13,
    zip: '44145',
    lat: 41.4553, lon: -81.9179,
    county: 'Cuyahoga',
    nearby: ['Bay Village', 'North Olmsted', 'Avon', 'Rocky River'],
    localContext: 'Westlake\'s upscale residential profile doesn\'t reduce bed bug risk — in fact, higher travel frequency among residents means more hotel exposure. Luxury condos and apartments in Crocker Park and surrounding developments also create multi-unit spread potential.',
    bedbugRisk: 'Westlake residents\' frequent travel and the city\'s growing multi-family housing create bed bug introduction and spread risk. Crocker Park area developments see regular cases.',
    neighborhoods: ['Westlake (city proper)', 'Crocker Park area', 'Center Ridge Road corridor', 'Columbia Road area'],
  },
  {
    name: 'North Royalton',
    slug: 'north-royalton',
    distance: 14,
    zip: '44133',
    lat: 41.3134, lon: -81.7249,
    county: 'Cuyahoga',
    nearby: ['Strongsville', 'Broadview Heights', 'Brecksville', 'Parma Heights'],
    localContext: 'North Royalton\'s primarily single-family suburban character means bed bug infestations here typically arrive through travel or used furniture purchases rather than multi-unit spread. However, growing apartment development along State Road is increasing the city\'s multi-unit risk.',
    bedbugRisk: 'North Royalton sees most bed bug cases from travel and second-hand furniture. Growing apartment inventory along State Road is increasing multi-unit risk.',
    neighborhoods: ['North Royalton (city proper)', 'State Road corridor', 'Royalton Road area', 'Bennett Road area'],
  },
  {
    name: 'Broadview Heights',
    slug: 'broadview-heights',
    distance: 15,
    zip: '44147',
    lat: 41.3134, lon: -81.6799,
    county: 'Cuyahoga',
    nearby: ['Brecksville', 'North Royalton', 'Seven Hills', 'Independence'],
    localContext: 'Broadview Heights is one of Greater Cleveland\'s more affluent suburbs, but bed bugs show no income preference. Travel introductions from hotel stays and vacation travel are the primary source, and larger homes can harbor larger infestations before they\'re detected.',
    bedbugRisk: 'Broadview Heights cases mostly trace to travel introductions. Larger homes can harbor bigger infestations before detection — early inspection is key.',
    neighborhoods: ['Broadview Heights (city proper)', 'Highland Drive area', 'Royalton Road corridor', 'Broadview Road area'],
  },
  {
    name: 'Olmsted Falls',
    slug: 'olmsted-falls',
    distance: 12,
    zip: '44138',
    lat: 41.3751, lon: -81.9038,
    county: 'Cuyahoga',
    nearby: ['Berea', 'North Olmsted', 'Westlake', 'Strongsville'],
    localContext: 'Olmsted Falls\' small-town character with growing residential development means most bed bug cases arrive through travel or purchasing used items. The city\'s historic downtown and growing new-construction neighborhoods both see cases, though older rental properties are at higher risk.',
    bedbugRisk: 'Olmsted Falls cases primarily come from travel and used furniture. Older rental properties near the historic downtown carry higher risk.',
    neighborhoods: ['Olmsted Falls (city proper)', 'Downtown Olmsted Falls', 'Lewis Road area', 'Columbia Road corridor'],
  },
  {
    name: 'Avon',
    slug: 'avon',
    distance: 18,
    zip: '44011',
    lat: 41.4512, lon: -82.0354,
    county: 'Lorain',
    nearby: ['Avon Lake', 'North Ridgeville', 'Westlake', 'Sheffield Lake'],
    localContext: 'Avon is one of the fastest-growing communities in Northeast Ohio. Rapid new-home construction and a growing apartment market along Chester Road and Detroit Road means the city\'s bed bug risk profile is changing quickly. New residents relocating from infested properties in other cities are a common introduction vector.',
    bedbugRisk: 'Avon\'s rapid growth and new-resident influx from across the region creates growing bed bug introduction risk. New apartments along Chester Road are a particular focus area.',
    neighborhoods: ['Avon (city proper)', 'Chester Road corridor', 'Detroit Road area', 'Nagel Road area'],
  },
  {
    name: 'Avon Lake',
    slug: 'avon-lake',
    distance: 17,
    zip: '44012',
    lat: 41.4995, lon: -82.0277,
    county: 'Lorain',
    nearby: ['Avon', 'Sheffield Lake', 'Bay Village', 'North Ridgeville'],
    localContext: 'Avon Lake\'s lakefront residential character and proximity to employer centers like the Avon Lake power generation facility means a mix of long-term homeowners and relocating employees. Travel introductions through hotel stays during business travel are the most common bed bug source here.',
    bedbugRisk: 'Avon Lake sees bed bug introductions primarily through business travel and hotel stays. Relocating employees are another common introduction point.',
    neighborhoods: ['Avon Lake (city proper)', 'Moore Road area', 'Lake Road corridor', 'Walker Road area'],
  },
  {
    name: 'North Ridgeville',
    slug: 'north-ridgeville',
    distance: 16,
    zip: '44039',
    lat: 41.3887, lon: -82.0185,
    county: 'Lorain',
    nearby: ['Avon', 'Avon Lake', 'Elyria', 'Olmsted Falls'],
    localContext: 'North Ridgeville is growing rapidly with new residential construction, and many new residents are relocating from urban areas that carry higher bed bug prevalence. This relocation pattern makes North Ridgeville a consistent emerging market for bed bug treatment on the far west side.',
    bedbugRisk: 'North Ridgeville\'s new resident influx from higher-prevalence urban areas makes it a growing bed bug market. New-construction move-ins are a common introduction point.',
    neighborhoods: ['North Ridgeville (city proper)', 'Center Ridge Road corridor', 'Lorain Road area', 'Mills Road corridor'],
  },
  {
    name: 'Brecksville',
    slug: 'brecksville',
    distance: 14,
    zip: '44141',
    lat: 41.3145, lon: -81.6291,
    county: 'Cuyahoga',
    nearby: ['Independence', 'Broadview Heights', 'Seven Hills', 'North Royalton'],
    localContext: 'Brecksville\'s affluent, wooded suburban character sees bed bug cases primarily from travel — residents who vacation frequently or travel for business have elevated exposure. Larger homes mean infestations can go undetected longer, making professional inspection important at the first sign of a problem.',
    bedbugRisk: 'Brecksville cases nearly always trace to travel. Larger homes allow infestations to grow before detection — early action is critical.',
    neighborhoods: ['Brecksville (city proper)', 'Chippewa Road area', 'Royalton Road corridor', 'Snowville Road area'],
  },
  {
    name: 'Brunswick',
    slug: 'brunswick',
    distance: 20,
    zip: '44212',
    lat: 41.2384, lon: -81.8418,
    county: 'Medina',
    nearby: ['Strongsville', 'North Royalton', 'Hinckley', 'Medina'],
    localContext: 'Brunswick sits at the edge of LongPro\'s service area but is fully covered. The city\'s mix of suburban housing and growing retail along Pearl Road means residents face similar bed bug risks to other southwest Cuyahoga communities. Travel and used furniture are the primary introduction vectors.',
    bedbugRisk: 'Brunswick cases primarily come from travel introductions and used furniture purchases. Growing retail activity brings additional foot-traffic exposure.',
    neighborhoods: ['Brunswick (city proper)', 'Center Road area', 'Pearl Road corridor', 'Grafton Road area'],
  },
  {
    name: 'Sheffield Lake',
    slug: 'sheffield-lake',
    distance: 18,
    zip: '44054',
    lat: 41.4945, lon: -82.0996,
    county: 'Lorain',
    nearby: ['Avon Lake', 'Sheffield Village', 'Lorain', 'Avon'],
    localContext: 'Sheffield Lake\'s lakefront working-class community has a mix of older homes and multi-unit housing that creates moderate bed bug risk. Proximity to Lorain — which sees higher bed bug activity — means some introductions cross city lines via shared social networks.',
    bedbugRisk: 'Sheffield Lake sees bed bug risk from both housing density and proximity to higher-prevalence Lorain. Older housing stock creates more entry points.',
    neighborhoods: ['Sheffield Lake (city proper)', 'Lake Road corridor', 'Harris Road area', 'US-6 corridor'],
  },
  {
    name: 'Garfield Heights',
    slug: 'garfield-heights',
    distance: 7,
    zip: '44125',
    lat: 41.4170, lon: -81.6068,
    county: 'Cuyahoga',
    nearby: ['Maple Heights', 'Independence', 'Seven Hills', 'Cleveland'],
    localContext: 'Garfield Heights has a dense mix of older single-family homes, duplexes, and apartment buildings that puts it among the higher-risk communities in Greater Cleveland for bed bug activity. Shared-wall housing and older construction with more entry points accelerate spread.',
    bedbugRisk: 'Garfield Heights has above-average bed bug risk due to older housing density and multi-unit buildings. Infestations spread more quickly in shared-wall properties.',
    neighborhoods: ['Garfield Heights (city proper)', 'Turney Road corridor', 'Granger Road area', 'Maple Leaf area'],
  },
  {
    name: 'Maple Heights',
    slug: 'maple-heights',
    distance: 9,
    zip: '44137',
    lat: 41.4095, lon: -81.5627,
    county: 'Cuyahoga',
    nearby: ['Garfield Heights', 'Bedford', 'Warrensville Heights', 'Cleveland'],
    localContext: 'Maple Heights\' dense housing — predominantly 1940s-1960s bungalows and multi-unit buildings — creates a challenging bed bug environment. High tenant turnover in rental properties means infestations can move quickly between units in the same building or street.',
    bedbugRisk: 'Maple Heights has elevated bed bug risk from older housing density and rental turnover. Multi-unit properties see faster spread between units.',
    neighborhoods: ['Maple Heights (city proper)', 'Libby Road area', 'Dunham Road corridor', 'Broadway area'],
  },
];

// ─── Shared HTML fragments ─────────────────────────────────────────────────────

const GA_TAG = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z1EH98YLZ1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Z1EH98YLZ1');

  document.addEventListener('click', function(event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || typeof gtag !== 'function') return;
    var href = link.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      gtag('event', 'phone_click', { event_category: 'engagement', event_label: href });
    } else if (href === '/contact' || href.indexOf('/contact?') === 0) {
      gtag('event', 'quote_click', { event_category: 'engagement', event_label: window.location.pathname });
    }
  });
</script>`;

const NAV = `<header class="sticky top-0 z-50 bg-brand-dark border-b border-brand-border">
  <nav aria-label="Main navigation" class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="flex-shrink-0">
      <img src="/images/longpro-logo.webp" alt="LongPro Pest Control" width="257" height="134" class="h-14 w-auto">
    </a>
    <div class="hidden md:flex items-center gap-8">
      <a href="/" class="text-brand-text hover:text-brand-gold transition">Home</a>
      <div class="relative group">
        <button type="button" aria-haspopup="true" class="services-menu-button text-brand-text hover:text-brand-gold transition">Services</button>
        <div class="services-menu-panel hidden group-hover:block absolute left-0 mt-0 w-56 bg-brand-surface border border-brand-border rounded shadow-lg z-10">
          <a href="/services/general-pest-control" class="block px-4 py-3 text-brand-text hover:bg-brand-dark hover:text-brand-gold transition first:rounded-t last:rounded-b">General Pest Control</a>
          <a href="/services/bed-bug-extermination" class="block px-4 py-3 text-brand-text hover:bg-brand-dark hover:text-brand-gold transition first:rounded-t last:rounded-b">Bed Bug Extermination</a>
          <a href="/services/cockroach-extermination" class="block px-4 py-3 text-brand-text hover:bg-brand-dark hover:text-brand-gold transition first:rounded-t last:rounded-b">Cockroach Extermination</a>
          <a href="/services/ant-and-spider-control" class="block px-4 py-3 text-brand-text hover:bg-brand-dark hover:text-brand-gold transition first:rounded-t last:rounded-b">Ant &amp; Spider Control</a>
          <a href="/services/flea-extermination" class="block px-4 py-3 text-brand-text hover:bg-brand-dark hover:text-brand-gold transition first:rounded-t last:rounded-b">Flea Extermination</a>
        </div>
      </div>
      <a href="/about" class="text-brand-text hover:text-brand-gold transition">About</a>
      <a href="/service-area" class="text-brand-text hover:text-brand-gold transition text-brand-gold font-semibold">Service Area</a>
      <a href="/faq" class="text-brand-text hover:text-brand-gold transition">FAQ</a>
      <a href="/reviews" class="text-brand-text hover:text-brand-gold transition">Reviews</a>
      <a href="/blog" class="text-brand-text hover:text-brand-gold transition">Blog</a>
      <a href="/contact" class="text-brand-text hover:text-brand-gold transition">Contact</a>
    </div>
    <a href="tel:+12163004121" class="hidden md:inline-block bg-brand-red hover:bg-brand-red-light text-white px-4 py-2 rounded transition font-semibold">(216) 300-4121</a>
    <button id="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" class="md:hidden flex flex-col gap-1.5 cursor-pointer">
      <span class="block w-6 h-0.5 bg-brand-text transition"></span>
      <span class="block w-6 h-0.5 bg-brand-text transition"></span>
      <span class="block w-6 h-0.5 bg-brand-text transition"></span>
    </button>
  </nav>
  <div id="mobile-menu" class="hidden md:hidden bg-brand-dark-alt border-t border-brand-border max-h-0 overflow-hidden transition-all duration-300">
    <div class="px-4 py-4 flex flex-col gap-4">
      <a href="/" class="text-brand-text hover:text-brand-gold transition">Home</a>
      <span class="text-brand-text font-semibold text-sm uppercase tracking-wider">Services</span>
      <div class="flex flex-col gap-2 ml-4">
        <a href="/services/general-pest-control" class="text-brand-text hover:text-brand-gold transition">General Pest Control</a>
        <a href="/services/bed-bug-extermination" class="text-brand-text hover:text-brand-gold transition">Bed Bug Extermination</a>
        <a href="/services/cockroach-extermination" class="text-brand-text hover:text-brand-gold transition">Cockroach Extermination</a>
        <a href="/services/ant-and-spider-control" class="text-brand-text hover:text-brand-gold transition">Ant &amp; Spider Control</a>
        <a href="/services/flea-extermination" class="text-brand-text hover:text-brand-gold transition">Flea Extermination</a>
      </div>
      <a href="/about" class="text-brand-text hover:text-brand-gold transition">About</a>
      <a href="/service-area" class="text-brand-text hover:text-brand-gold transition text-brand-gold font-semibold">Service Area</a>
      <a href="/faq" class="text-brand-text hover:text-brand-gold transition">FAQ</a>
      <a href="/reviews" class="text-brand-text hover:text-brand-gold transition">Reviews</a>
      <a href="/blog" class="text-brand-text hover:text-brand-gold transition">Blog</a>
      <a href="/contact" class="text-brand-text hover:text-brand-gold transition">Contact</a>
      <div class="mt-4 pt-4 border-t border-brand-border">
        <a href="tel:+12163004121" class="block bg-brand-red hover:bg-brand-red-light text-white px-4 py-2 rounded transition font-semibold text-center">(216) 300-4121</a>
      </div>
    </div>
  </div>
</header>
<script type="module">const t=document.getElementById("mobile-menu-toggle"),e=document.getElementById("mobile-menu");t&&e&&t.addEventListener("click",()=>{const i=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!i),i?(e.style.maxHeight="0",setTimeout(()=>{e.classList.add("hidden")},300)):(e.classList.remove("hidden"),e.style.maxHeight=e.scrollHeight+"px")});</script>`;

const FOOTER = `<footer class="bg-brand-dark border-t border-brand-border">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <img src="/images/longpro-logo.webp" alt="LongPro Pest Control" width="257" height="134" class="h-12 w-auto mb-4">
        <p class="text-brand-text-muted text-sm leading-relaxed">Discreet, professional pest control solutions for Cleveland and surrounding areas. We handle your pest problems with expertise and discretion.</p>
      </div>
      <nav aria-label="Footer navigation">
        <h3 class="text-brand-text font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
        <ul class="flex flex-col gap-3">
          <li><a href="/" class="text-brand-text-muted hover:text-brand-gold transition">Home</a></li>
          <li><a href="/services" class="text-brand-text-muted hover:text-brand-gold transition">Services</a></li>
          <li><a href="/about" class="text-brand-text-muted hover:text-brand-gold transition">About</a></li>
          <li><a href="/service-area" class="text-brand-text-muted hover:text-brand-gold transition">Service Area</a></li>
          <li><a href="/faq" class="text-brand-text-muted hover:text-brand-gold transition">FAQ</a></li>
          <li><a href="/reviews" class="text-brand-text-muted hover:text-brand-gold transition">Reviews</a></li>
          <li><a href="/blog" class="text-brand-text-muted hover:text-brand-gold transition">Blog</a></li>
          <li><a href="/contact" class="text-brand-text-muted hover:text-brand-gold transition">Contact</a></li>
        </ul>
      </nav>
      <div>
        <h3 class="text-brand-text font-semibold mb-4 uppercase text-sm tracking-wider">Contact Info</h3>
        <div class="text-brand-text-muted text-sm space-y-2 mb-4">
          <p class="font-semibold text-brand-text">LongPro Pest Control LLC</p>
          <p>Cleveland, OH</p>
          <p><a href="tel:+12163004121" class="hover:text-brand-gold transition">(216) 300-4121</a></p>
          <p><a href="mailto:info@longpropc.com" class="hover:text-brand-gold transition">info@longpropc.com</a></p>
        </div>
        <img src="/images/bbb-badge.webp" alt="BBB A+ Rated" width="200" height="80" class="h-20 w-auto mt-4">
      </div>
    </div>
    <div class="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-brand-text-muted text-sm">© 2026 LongPro Pest Control LLC. All rights reserved.</p>
      <a href="/privacy-policy" class="text-brand-text-muted hover:text-brand-gold transition text-sm">Privacy Policy</a>
    </div>
  </div>
</footer>`;

// ─── Page generator ────────────────────────────────────────────────────────────

function generatePage(city) {
  const url = `https://longpropc.com/service-area/${city.slug}/bed-bugs/`;
  const cityArea = city.nearby.slice(0, 3).join(', ');

  const schema = {
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://longpropc.com/#business",
      "name": "LongPro Pest Control LLC",
      "description": `Professional bed bug exterminator serving ${city.name}, OH. Discreet unmarked vehicles, BBB A+ accredited since 2015. Free inspection.`,
      "url": "https://longpropc.com",
      "telephone": "+12163004121",
      "email": "info@longpropc.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Cleveland", "addressRegion": "OH", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 41.4993, "longitude": -81.6944 },
      "areaServed": [
        { "@type": "City", "name": city.name, "containedInPlace": { "@type": "State", "name": "Ohio" } },
        ...city.nearby.map(n => ({ "@type": "City", "name": n })),
        { "@type": "AdministrativeArea", "name": `${city.county} County` }
      ],
      "serviceArea": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 41.4993, "longitude": -81.6944 }, "geoRadius": "40234" },
      "priceRange": "$$",
      "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "21:00" },
      "image": BED_BUG_PREVIEW,
      "logo": { "@type": "ImageObject", "url": "https://longpropc.com/images/longpro-logo.webp" },
      "sameAs": ["https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736", "https://share.google/GETw9NeHew2eJ5lB2"]
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Bed Bug Exterminator in ${city.name}, OH`,
      "provider": { "@type": "LocalBusiness", "@id": "https://longpropc.com/#business", "name": "LongPro Pest Control LLC" },
      "areaServed": { "@type": "City", "name": city.name, "containedInPlace": { "@type": "State", "name": "Ohio" } },
      "serviceType": "Bed Bug Extermination",
      "description": `Professional bed bug extermination in ${city.name}, OH. Discreet unmarked vehicles, inspection-first approach, written estimates. BBB A+ accredited since 2015.`
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Does LongPro Pest Control treat bed bugs in ${city.name}, OH?`,
          "acceptedAnswer": { "@type": "Answer", "text": `Yes — LongPro Pest Control provides professional bed bug extermination throughout ${city.name}, OH. We serve all of ${city.county} County and surrounding communities. Call (216) 300-4121 for a free inspection.` }
        },
        {
          "@type": "Question",
          "name": `How quickly can you respond to a bed bug problem in ${city.name}?`,
          "acceptedAnswer": { "@type": "Answer", "text": `${city.name} is approximately ${city.distance} miles from our Cleveland base. We typically schedule inspections within 24 hours, and same-day service is often available for urgent situations. Call (216) 300-4121 and describe the urgency.` }
        },
        {
          "@type": "Question",
          "name": `Do you use unmarked vehicles for bed bug treatment in ${city.name}?`,
          "acceptedAnswer": { "@type": "Answer", "text": `Absolutely. Every LongPro vehicle is completely unmarked — no company name, no pest control logos. Your ${city.name} neighbors will have no idea we visited. Discretion is built into every appointment.` }
        },
        {
          "@type": "Question",
          "name": `How much does bed bug treatment cost in ${city.name}, OH?`,
          "acceptedAnswer": { "@type": "Answer", "text": `We don't quote prices by phone — every home is different. A free in-home inspection lets us accurately scope the problem and give you a written estimate before any treatment begins. For ${city.name}, typical Cleveland-area ranges are $400–$900 for a single room and $900–$2,500+ for a whole home. Call (216) 300-4121 to schedule your free inspection.` }
        }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://longpropc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Service Area", "item": "https://longpropc.com/service-area/" },
        { "@type": "ListItem", "position": 3, "name": city.name, "item": `https://longpropc.com/service-area/${city.slug}/` },
        { "@type": "ListItem", "position": 4, "name": "Bed Bug Extermination", "item": url }
      ]
    }
  };

  return `<!DOCTYPE html><html lang="en">
<head>
<meta charset="UTF-8">
${GA_TAG}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/png" href="/images/longpro-logo.webp">
<title>Bed Bug Exterminator ${city.name} OH | LongPro Pest Control</title>
<meta name="description" content="Bed bug exterminator in ${city.name}, OH. Discreet unmarked vehicles, free inspection, written estimates. BBB A+ accredited since 2015. Call (216) 300-4121.">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="Bed Bug Exterminator ${city.name} OH | LongPro Pest Control">
<meta property="og:description" content="Professional bed bug extermination in ${city.name}, OH. Discreet unmarked vehicles, inspection-first approach. BBB A+ accredited since 2015. Call (216) 300-4121.">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="LongPro Pest Control">
<meta property="og:image" content="${BED_BUG_PREVIEW}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bed Bug Exterminator ${city.name} OH | LongPro Pest Control">
<meta name="twitter:description" content="Professional bed bug extermination in ${city.name}, OH. Discreet, unmarked vehicles. BBB A+ accredited since 2015. Call (216) 300-4121.">
<meta name="twitter:image" content="${BED_BUG_PREVIEW}">
<meta name="geo.region" content="US-OH">
<meta name="geo.placename" content="${city.name}">
<script type="application/ld+json">${JSON.stringify(schema.localBusiness)}</script>
<script type="application/ld+json">${JSON.stringify(schema.service)}</script>
<script type="application/ld+json">${JSON.stringify(schema.faq)}</script>
<link rel="stylesheet" href="/_astro/about.CRmxRFHV.css">
</head>
<body class="bg-brand-bg text-brand-text min-h-screen flex flex-col">
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-brand-red text-white px-4 py-2 z-50 rounded">Skip to content</a>
${NAV}
<main id="main-content" role="main" class="flex-1">
<script type="application/ld+json">${JSON.stringify(schema.breadcrumb)}</script>
<nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-4 py-3">
  <ol class="flex flex-wrap gap-2 text-sm">
    <li class="flex items-center gap-2"><a href="/" class="text-brand-gold hover:text-brand-gold-light transition">Home</a></li>
    <li class="flex items-center gap-2"><span class="text-brand-text-muted">/</span><a href="/service-area" class="text-brand-gold hover:text-brand-gold-light transition">Service Area</a></li>
    <li class="flex items-center gap-2"><span class="text-brand-text-muted">/</span><a href="/service-area/${city.slug}" class="text-brand-gold hover:text-brand-gold-light transition">${city.name}</a></li>
    <li class="flex items-center gap-2"><span class="text-brand-text-muted">/</span><span aria-current="page" class="text-brand-text">Bed Bug Extermination</span></li>
  </ol>
</nav>

<div class="max-w-7xl mx-auto px-4 py-12">

  <h1 class="text-2xl md:text-4xl font-bold text-brand-text mb-8">Bed Bug Exterminator in ${city.name}, OH</h1>

  <p class="text-lg text-brand-text-muted max-w-3xl mb-12 leading-relaxed">
    LongPro Pest Control provides professional, discreet bed bug extermination in ${city.name}, Ohio. We arrive in completely unmarked vehicles, perform a thorough inspection before recommending any treatment, and provide a written estimate before we begin. BBB A+ accredited since 2015, 5.0 Google rating.
  </p>

  <!-- Trust bar -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
    <div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center">
      <p class="text-brand-gold font-bold text-xl">BBB A+</p>
      <p class="text-brand-text-muted text-sm">Accredited since 2015</p>
    </div>
    <div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center">
      <p class="text-brand-gold font-bold text-xl">5.0 ★</p>
      <p class="text-brand-text-muted text-sm">Google rating</p>
    </div>
    <div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center">
      <p class="text-brand-gold font-bold text-xl">Unmarked</p>
      <p class="text-brand-text-muted text-sm">vehicles always</p>
    </div>
    <div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center">
      <p class="text-brand-gold font-bold text-xl">~${city.distance} mi</p>
      <p class="text-brand-text-muted text-sm">from our base</p>
    </div>
  </div>

  <!-- Why this city -->
  <section class="mb-16 bg-brand-surface border border-brand-border rounded-lg p-8">
    <h2 class="text-3xl font-bold text-brand-text mb-6">Bed Bug Risk in ${city.name}</h2>
    <p class="text-brand-text-muted leading-relaxed max-w-3xl">${city.localContext}</p>
  </section>

  <!-- Treatment process -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-brand-text mb-8">How We Treat Bed Bugs in ${city.name} Homes</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-brand-surface border border-brand-border rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-gold mb-3">1. Free In-Home Inspection</h3>
        <p class="text-brand-text-muted text-sm leading-relaxed">We visit your ${city.name} home in an unmarked vehicle and conduct a thorough inspection — mattresses, box springs, bed frames, furniture, baseboards, and all likely harborage points. We confirm the infestation, identify the extent, and assess the right treatment approach.</p>
      </div>
      <div class="bg-brand-surface border border-brand-border rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-gold mb-3">2. Written Estimate</h3>
        <p class="text-brand-text-muted text-sm leading-relaxed">After inspection, we give you a clear written estimate — the full cost, what's included, how many treatments are recommended, and what preparation is needed. No surprises, no pressure.</p>
      </div>
      <div class="bg-brand-surface border border-brand-border rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-gold mb-3">3. Professional Treatment</h3>
        <p class="text-brand-text-muted text-sm leading-relaxed">We use proven chemical treatment protocols to eliminate bed bugs at every life stage — eggs, nymphs, and adults. Treatment targets all harborage areas identified during inspection.</p>
      </div>
      <div class="bg-brand-surface border border-brand-border rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-gold mb-3">4. Follow-Up &amp; Guarantee</h3>
        <p class="text-brand-text-muted text-sm leading-relaxed">We follow up to verify complete elimination. If bed bug activity continues after treatment, we return at no additional cost. We stand behind our work until the problem is solved.</p>
      </div>
    </div>
  </section>

  <!-- Discreet service -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-brand-text mb-8">Discreet Bed Bug Service for ${city.name} Residents</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-text mb-3">Unmarked Vehicles</h3>
        <p class="text-brand-text-muted text-sm">We arrive in completely unmarked vehicles — no logos, no company name. Your ${city.name} neighbors will have no reason to ask questions.</p>
      </div>
      <div class="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-text mb-3">Plain Attire</h3>
        <p class="text-brand-text-muted text-sm">Our technicians wear plain clothing with no visible company branding. Equipment is carried in discreet bags and cases.</p>
      </div>
      <div class="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6">
        <h3 class="text-lg font-bold text-brand-text mb-3">Confidential Process</h3>
        <p class="text-brand-text-muted text-sm">We never discuss your situation with neighbors, building managers, or anyone not directly involved in your service. Your pest problem stays between us.</p>
      </div>
    </div>
  </section>

  <!-- Areas served -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-brand-text mb-6">Areas We Cover Near ${city.name}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center">
        <p class="text-brand-text font-semibold">${city.name}</p>
      </div>
      ${city.nearby.map(n => `<div class="bg-brand-surface border border-brand-border rounded-lg p-4 text-center"><p class="text-brand-text font-semibold">${n}</p></div>`).join('\n      ')}
    </div>
  </section>

  <!-- FAQ -->
  <section class="mb-16 bg-brand-surface border border-brand-border rounded-lg p-8">
    <h2 class="text-3xl font-bold text-brand-text mb-6">Frequently Asked Questions — Bed Bug Treatment in ${city.name}</h2>
    <div class="space-y-6 max-w-3xl">
      <div>
        <h3 class="text-lg font-bold text-brand-text mb-2">Does LongPro Pest Control treat bed bugs in ${city.name}, OH?</h3>
        <p class="text-brand-text-muted leading-relaxed">Yes — LongPro serves all of ${city.name} and surrounding communities in ${city.county} County. We're approximately ${city.distance} miles from our Cleveland base and can typically schedule your inspection within 24 hours. Call <a href="tel:+12163004121" class="text-brand-gold hover:text-brand-gold-light transition">(216) 300-4121</a>.</p>
      </div>
      <div>
        <h3 class="text-lg font-bold text-brand-text mb-2">How quickly can you respond to a bed bug problem in ${city.name}?</h3>
        <p class="text-brand-text-muted leading-relaxed">Most inspections in ${city.name} are scheduled within 24 hours. For urgent situations — actively seeing live bugs, guests arriving soon, or a severe infestation — call us directly and we'll do everything possible to get there the same day.</p>
      </div>
      <div>
        <h3 class="text-lg font-bold text-brand-text mb-2">Do you use unmarked vehicles in ${city.name}?</h3>
        <p class="text-brand-text-muted leading-relaxed">Yes, always. Every LongPro vehicle is completely unmarked with no company name or pest control signage. We also wear plain attire and carry equipment discreetly. Your ${city.name} neighbors will never know why we're there.</p>
      </div>
      <div>
        <h3 class="text-lg font-bold text-brand-text mb-2">How much does bed bug treatment cost in ${city.name}?</h3>
        <p class="text-brand-text-muted leading-relaxed">We don't quote over the phone — every home is different. A free in-home inspection lets us accurately assess the scope and give you a written estimate before any work begins. Cleveland-area ranges run $400–$900 for a single room and $900–$2,500+ for a whole home, depending on infestation size and treatment method.</p>
      </div>
    </div>
  </section>

  <!-- Schedule section -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-brand-text mb-6">Schedule Bed Bug Treatment in ${city.name}</h2>
    <div class="space-y-6 text-brand-text-muted max-w-3xl leading-relaxed">
      <p>Getting started is simple:</p>
      <ul class="space-y-4">
        <li class="flex gap-4">
          <span class="text-brand-gold font-bold flex-shrink-0 text-xl">1</span>
          <span><strong class="text-brand-text block mb-1">Call or Request Online</strong>Contact us at <a href="tel:+12163004121" class="text-brand-gold hover:text-brand-gold-light font-semibold transition">(216) 300-4121</a> or <a href="/contact" class="text-brand-gold hover:text-brand-gold-light font-semibold transition">request a free estimate online</a>.</span>
        </li>
        <li class="flex gap-4">
          <span class="text-brand-gold font-bold flex-shrink-0 text-xl">2</span>
          <span><strong class="text-brand-text block mb-1">Free Inspection</strong>We visit your ${city.name} home in an unmarked vehicle, usually within 24 hours, and conduct a thorough bed bug inspection.</span>
        </li>
        <li class="flex gap-4">
          <span class="text-brand-gold font-bold flex-shrink-0 text-xl">3</span>
          <span><strong class="text-brand-text block mb-1">Written Estimate</strong>We explain exactly what we found, recommend the right treatment, and give you a clear written price before we begin.</span>
        </li>
        <li class="flex gap-4">
          <span class="text-brand-gold font-bold flex-shrink-0 text-xl">4</span>
          <span><strong class="text-brand-text block mb-1">Treatment &amp; Follow-Up</strong>We treat and follow up to confirm complete elimination. If bed bugs return after treatment, we come back at no charge.</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Related resources -->
  <section class="bg-brand-surface border border-brand-border rounded-lg p-8 mb-16">
    <h2 class="text-2xl font-bold text-white mb-6">Related Resources</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a href="/services/bed-bug-extermination" class="block bg-brand-dark rounded p-4 hover:border-l-4 hover:border-brand-gold transition-colors">
        <h3 class="font-bold text-brand-gold mb-2">Bed Bug Extermination</h3>
        <p class="text-brand-text-muted text-sm">Full details on our bed bug treatment approach</p>
      </a>
      <a href="/service-area/${city.slug}" class="block bg-brand-dark rounded p-4 hover:border-l-4 hover:border-brand-gold transition-colors">
        <h3 class="font-bold text-brand-gold mb-2">All Pest Control in ${city.name}</h3>
        <p class="text-brand-text-muted text-sm">Roaches, ants, spiders, fleas and more</p>
      </a>
      <a href="/blog/bed-bug-treatment-cost-cleveland" class="block bg-brand-dark rounded p-4 hover:border-l-4 hover:border-brand-gold transition-colors">
        <h3 class="font-bold text-brand-gold mb-2">Bed Bug Treatment Cost Guide</h3>
        <p class="text-brand-text-muted text-sm">What to expect for pricing in the Cleveland area</p>
      </a>
    </div>
  </section>

</div>

<!-- CTA banner -->
<section class="w-full bg-brand-red py-12 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Bed Bugs in ${city.name}? We Can Help.</h2>
    <p class="text-lg text-white/90 mb-8">Discreet arrival. Free inspection. Written estimate before we start. Same-day service often available.</p>
    <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
      <a href="tel:+12163004121" class="bg-white text-brand-red hover:bg-gray-100 transition px-8 py-3 rounded font-semibold">Call (216) 300-4121</a>
      <a href="/contact" class="border-2 border-white text-white hover:bg-white hover:text-brand-red transition px-8 py-3 rounded font-semibold">Request Free Estimate</a>
    </div>
  </div>
</section>
</main>
${FOOTER}
</body></html>`;
}

// ─── Run ───────────────────────────────────────────────────────────────────────

let created = 0;
let skipped = 0;

for (const city of cities) {
  const dir = path.join(DIST, city.slug, 'bed-bugs');
  const file = path.join(dir, 'index.html');

  fs.mkdirSync(dir, { recursive: true });
  const html = generatePage(city);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓ ${city.name} → service-area/${city.slug}/bed-bugs/index.html`);
  created++;
}

console.log(`\nDone. Created ${created} pages, skipped ${skipped}.`);
