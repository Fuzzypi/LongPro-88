# LongPro Pest Control JSON-LD Schema Installation Guide

This package provides comprehensive JSON-LD structured data for LongPro Pest Control, covering LocalBusiness, Services, Ratings, Reviews, and Actions. The schema is provided in two formats: React component and standalone JSON file.

## Package Contents

- **LongProJsonLd.jsx** – React functional component that renders a `<script type="application/ld+json">` tag
- **longpro-jsonld-graph.json** – Standalone JSON-LD graph for non-React contexts
- **INSTALL-NOTES.md** – This file

## Installation & Usage

### For React Applications

#### Step 1: Import the Component
```jsx
import LongProJsonLd from './components/seo/LongProJsonLd';
```

#### Step 2: Render in Your Layout
Add the component to your app layout (typically in a wrapper component, the root `<head>`, or an SEO-dedicated component):

```jsx
function App() {
  return (
    <>
      <LongProJsonLd />
      {/* Rest of your app */}
    </>
  );
}
```

**Important:** The component must render **once per page load** and should be included in your primary layout or `index.html` template. It will inject the JSON-LD into the `<head>` when the component mounts.

#### Step 3: Configure Prices (Optional)
To add pricing information, modify the `PRICE_RANGES` object at the top of `LongProJsonLd.jsx`:

```javascript
const PRICE_RANGES = {
  BED_BUG: '250-500',
  COCKROACH: '150-400',
  ANT_SPIDER: '100-300',
  FLEA: '200-450',
  GENERAL_PEST: '150-350',
  WDI_TERMITE: '300-600',
  VA_TERMITE: '300-600',
  EMERGENCY: '400-800',
};
```

Price values should be formatted as:
- A single number: `"250"` 
- A range: `"250-500"`
- Leave as `null` or `"Quote Required"` if pricing is not available

### For Static HTML / Non-React Pages

#### Step 1: Copy the JSON
Extract the JSON from `longpro-jsonld-graph.json` and place it directly in your HTML `<head>`:

```html
<head>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
          "@id": "https://longpropc.com/#business",
          "name": "LongPro Pest Control",
          ...
        }
      ]
    }
  </script>
</head>
```

#### Step 2: Update Prices (Optional)
In the `<script>` tag, locate the `priceSpecification` sections within each `Offer` object and update the `price` field:

**Before:**
```json
"priceSpecification": {
  "@type": "PriceSpecification",
  "priceCurrency": "USD",
  "price": "Quote Required"
}
```

**After:**
```json
"priceSpecification": {
  "@type": "PriceSpecification",
  "priceCurrency": "USD",
  "price": "250-500"
}
```

## Schema Coverage

This JSON-LD package includes:

- **LocalBusiness** (Primary Entity)
  - Legal name, description, URL, logo
  - Contact information (phone, email, contact form)
  - Physical address and coordinates (Cleveland, OH)
  - Service area (25-mile radius GeoCircle centered on Cleveland)
  - Business hours (Mon-Sat 9AM-9PM, Closed Sundays)

- **Ratings & Reviews**
  - Aggregate Rating: 5.0 stars, 33 reviews
  - Sample Review: anonymous customer, 5 stars, bed bug treatment testimonial

- **Services & Offers**
  - 8 service categories with individual Offer entries:
    1. Bed Bug Extermination
    2. Cockroach Extermination
    3. Ant & Spider Control
    4. Flea Extermination
    5. General Pest Control
    6. WDI Termite Inspection
    7. VA Home Loan Termite Inspection
    8. Emergency Service
  - Each with PriceSpecification (prices default to "Quote Required")

- **Brand Differentiators** (additionalProperty)
  - Unmarked Vehicles (privacy/discretion)
  - Inspection-First Approach
  - Fast Scheduling (same-day/24-hour)
  - BBB A+ Accreditation (13+ years)

- **Actions**
  - ScheduleAction: Direct link to contact form
  - CommunicateAction: Phone call link

- **Business Attributes**
  - sameAs: BBB profile and Google reviews links
  - knowsAbout: Pest control expertise keywords
  - Multiple @type array: LocalBusiness, HomeAndConstructionBusiness, ProfessionalService

## About Existing Schema

LongPro's existing static website (`dist_assets/`) already includes equivalent JSON-LD schema injected directly into the HTML. This package is designed for a **future React rebuild** and provides the same coverage in a modular, maintainable format suitable for component-based architecture.

**Relationship:**
- **Static site** (current): Schema embedded directly in template HTML
- **React site** (future): Schema provided via this React component

Both serve the same SEO and structured-data purposes; this package simply refactors for a modern frontend framework.

## Validation & Testing

To verify your JSON-LD is correct:

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Paste your page URL or the raw JSON
   - Check for errors and available rich result types

2. **JSON-LD Validator:** https://validator.schema.org/
   - Paste the JSON directly
   - Confirm all required fields are present

3. **SEO Tools:** Screaming Frog, SEMrush, Ahrefs all have structured data checkers

## Common Modifications

### Update Business Phone or Email
Edit the `telephone` and `email` fields in the component:

```javascript
telephone: '+12163004121',
email: 'info@longpropc.com',
```

### Update Service Area Radius
Modify the `geoRadius` value in the `areaServed` object (in kilometers):

```javascript
"geoRadius": "40.23", // ~25 miles in km
```

### Add More Reviews
Duplicate the `review` object and update author name, date, and description:

```javascript
"review": [
  { /* existing review */ },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "New Reviewer" },
    "datePublished": "2024-07-20",
    "description": "Another positive review...",
    "name": "Title of review",
    "reviewRating": { "@type": "Rating", "ratingValue": "5.0", ... }
  }
]
```

## Price Range Format Guide

Use one of these formats in `PriceSpecification.price`:

| Format | Example | Use Case |
|--------|---------|----------|
| Single Price | `"250"` | Fixed price for a service |
| Range | `"250-500"` | Price varies by property size |
| Quote Text | `"Quote Required"` | Pricing determined on consultation |
| null | `null` | No pricing info (component handles rendering) |

## Support & Maintenance

- Update `AggregateRating` annually with the latest review count and average rating
- Add new reviews to the `review` array as testimonials are collected
- Keep `hoursOfOperation` synchronized with actual business hours
- Update `areaServed` if service radius changes
- Refresh contact information if phone/email changes

## SEO Impact

This JSON-LD schema enables:
- **Rich Results** in Google Search for LocalBusiness and ratings/reviews
- **Knowledge Graph** eligibility
- **Voice Search Optimization** via structured business data
- **Map/Directory Listings** to pull accurate information
- **Review Aggregation** across platforms
- **Schema Validation** to ensure data consistency

---

**Created:** May 2026
**Package Version:** 1.0
**LongPro Pest Control Website:** https://longpropc.com
