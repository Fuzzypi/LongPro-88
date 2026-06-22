import React from 'react';

const longProJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': 'https://longpropc.com/#business',
      name: 'LongPro Pest Control LLC',
      legalName: 'LongPro Pest Control LLC',
      url: 'https://longpropc.com/',
      image: 'https://longpropc.com/images/og/home-preview.png',
      telephone: '+12163004121',
      email: 'info@longpropc.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cleveland',
        addressRegion: 'OH',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Cleveland' },
        { '@type': 'City', name: 'Lakewood' },
        { '@type': 'City', name: 'Parma' },
        { '@type': 'City', name: 'Euclid' },
        { '@type': 'City', name: 'Strongsville' },
        { '@type': 'AdministrativeArea', name: 'Cuyahoga County' },
        { '@type': 'AdministrativeArea', name: 'Greater Cleveland' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '21:00',
        },
      ],
      sameAs: [
        'https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736',
        'https://share.google/GETw9NeHew2eJ5lB2',
      ],
      knowsAbout: [
        'bed bug extermination',
        'cockroach extermination',
        'ant control',
        'spider control',
        'flea extermination',
        'general pest control',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://longpropc.com/#website',
      url: 'https://longpropc.com/',
      name: 'LongPro Pest Control',
      publisher: {
        '@id': 'https://longpropc.com/#business',
      },
    },
  ],
};

const LongProJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(longProJsonLd) }}
  />
);

export default LongProJsonLd;
