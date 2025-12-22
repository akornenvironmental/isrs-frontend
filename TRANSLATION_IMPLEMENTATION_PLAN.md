# ISRS Public Site - French & Spanish Translation Implementation Plan

**Date**: December 16, 2025
**Status**: Analysis Complete - Ready for Implementation
**Scope**: All public-facing HTML pages (non-portal)

---

## Executive Summary

The ISRS website has a complete translation infrastructure in place with comprehensive Spanish and French translations (~500 keys each) in `/public/js/components.js`. However, **only the homepage (`index.html`) currently uses this system**. This plan outlines the implementation needed to extend translations to all 11 remaining public pages.

### Current State
- **Translation System**: ✅ Complete (Spanish & French in components.js)
- **Homepage**: ✅ Fully translated with `data-i18n` attributes
- **Other Pages**: ❌ Hardcoded English text only
- **Language Switcher**: ✅ Functional (in header)

### Required Work
- Add `data-i18n` attributes to 11 public HTML pages
- Create ~200-300 new translation keys for page-specific content
- Test language switching across all pages
- Ensure consistent translation quality

---

## Pages Requiring Translation

### Priority 1: High-Traffic Public Pages (Implement First)

#### 1. `/public/about.html` - About Page
**Content Sections**:
- Hero: "About ISRS" heading + subtitle
- Who We Are: Overview paragraph
- Mission & Vision: Card content
- Core Values: 6 value cards (Science-Based, Collaborative, Inclusive, Innovation, Impact-Driven, Sustainability)
- What We Do: 6 activity cards
- Our Community: 8 stakeholder types
- Strategic Partnerships: Partnership descriptions

**Estimated Translation Keys**: 40-50 keys

**Key Elements**:
```html
<h1 data-i18n="aboutHeroHeading">About ISRS</h1>
<p data-i18n="aboutHeroSubtitle">The International Shellfish...</p>
<h2 data-i18n="aboutWhoWeAre">Who We Are</h2>
<h3 data-i18n="aboutMission">Mission</h3>
<h3 data-i18n="aboutVision">Vision</h3>
```

---

#### 2. `/public/icsr.html` - Conference Information
**Content Sections**:
- Hero: Conference title + subtitle + CTA button
- About ICSR: Description paragraphs
- Who Attends: 6 attendee types
- Conference Activities: 6 activity types
- Conference History: Timeline content across 4 decades
- ICSR 2024 Highlights: Stats
- Code of Conduct: Expectations list

**Estimated Translation Keys**: 60-70 keys

**Key Elements**:
```html
<h1 data-i18n="icsrHeroHeading">International Conference on Shellfish Restoration</h1>
<p data-i18n="icsrHeroSubtitle">The premier global gathering...</p>
<a data-i18n="icsrCTA2026">ICSR2026 - Puget Sound</a>
<h2 data-i18n="icsrAbout">About ICSR</h2>
```

---

#### 3. `/public/icsr2026.html` - Upcoming Conference
**Content Sections**:
- Hero: ICSR2026 heading + location + dates
- Conference Overview: Description + mailing list CTA
- Important Dates: 4 date cards
- What to Expect: 4 feature items
- Venue Description: Squaxin Island Tribe context
- Why Puget Sound: 6 reason cards
- Expected Attendance: Stats
- Registration & Sponsorship: 2 CTA sections
- Sponsors: Acknowledgements
- Code of Conduct: Policy statement

**Estimated Translation Keys**: 50-60 keys

**Key Elements**:
```html
<h1 data-i18n="icsr2026Heading">ICSR2026</h1>
<p data-i18n="icsr2026HostedBy">Hosted by Puget Sound Restoration Foundation</p>
<p data-i18n="icsr2026Location">Puget Sound, Washington State</p>
<p data-i18n="icsr2026Dates">October 4-8, 2026</p>
```

---

#### 4. `/public/gallery.html` - Photo Gallery
**Content Sections**:
- Hero/Header: Page title + description
- Sidebar Search & Filters: Labels, placeholders, buttons
- Upload Section: Instructions, form labels
- Legal Notice: Copyright text
- Lightbox UI: Action buttons (Download, Favorite, Share)
- Metadata Labels: Photo details section
- Comments: Section headers, placeholder text
- Keyboard Shortcuts: Help overlay text
- Loading/Error States: Messages

**Estimated Translation Keys**: 40-50 keys

**Key Elements**:
```html
<h1 data-i18n="galleryHeading">Photo Gallery</h1>
<label data-i18n="gallerySearchLabel">Text Search</label>
<input data-i18n-placeholder="gallerySearchPlaceholder" placeholder="Caption, tags, location...">
<button data-i18n="galleryApplyButton">Search</button>
<button data-i18n="galleryClearButton">Clear</button>
```

**Special Consideration**: Dynamic JavaScript UI elements need translation function calls:
```javascript
// Current: alert('✅ Added to your favorites!');
// Translated: alert(translate('galleryFavoriteSuccess'));
```

---

#### 5. `/public/support.html` - Support/Partnership Page
**Content Sections**:
- Hero: "Support ISRS" heading + subtitle
- The Critical Opportunity: Description + stats
- Urgent Need: Federal funding crisis section
- Partnership Opportunities: 6 partner type cards (Foundations, Corporations, Government, Academia, Industry, Individual Donors)
- Programs: 4 program descriptions
- Feedback Form: Form labels
- CTA Section: Final call to action

**Estimated Translation Keys**: 60-70 keys

**Key Elements**:
```html
<h1 data-i18n="supportHeroHeading">Support ISRS</h1>
<h2 data-i18n="supportOpportunity">The Critical Opportunity</h2>
<h3 data-i18n="supportFoundations">For Foundations</h3>
```

---

### Priority 2: Secondary Public Pages (Implement After Priority 1)

#### 6. `/public/welcome.html`
- Welcome page for new visitors
- Introduction to ISRS

#### 7. `/public/press-kit.html`
- Media resources
- Press releases
- Logos and brand assets

#### 8. `/public/icsr2024-photos.html`
- ICSR 2024 conference photo gallery
- Specific event documentation

#### 9. `/public/login.html`
- Login page UI elements
- Form labels and instructions
- Error messages

---

### Priority 3: Test/Development Pages (Low Priority)

#### 10. `/public/test-feedback.html`
- Internal testing page

#### 11. `/public/test-photo-upload.html`
- Internal testing page

---

## Translation Keys Analysis

### Existing Translation Coverage (from components.js)

The existing translation system in `/public/js/components.js` already includes:

**Navigation & Global**:
- `home`, `about`, `icsr`, `donate`, `skipToMain`
- `navGallery`, `navPressKit`, `navSupport`, `navContact`

**Homepage Content** (~500 keys):
- Hero section
- Featured initiatives
- Latest news
- Why it matters
- Get involved
- Global network
- Footer

**Missing Content** (needs to be added):
- About page specific content (~50 keys)
- ICSR page specific content (~70 keys)
- ICSR2026 page specific content (~60 keys)
- Gallery page UI elements (~50 keys)
- Support page content (~70 keys)
- Form labels and validation messages (~30 keys)
- Error/success messages (~20 keys)

**Total New Keys Needed**: ~350 keys

---

## Implementation Strategy

### Phase 1: Infrastructure (Week 1)
1. **Expand translation files** in `components.js`:
   - Add Spanish translations for new ~350 keys
   - Add French translations for new ~350 keys
   - Organize keys by page/section for maintainability

2. **Enhance translation system**:
   - Add support for `data-i18n-placeholder` attribute for input fields
   - Add `translate()` helper function for JavaScript dynamic content
   - Add `data-i18n-aria-label` for accessibility attributes

### Phase 2: Priority 1 Pages (Week 2-3)
Implement translations in order:
1. `about.html` (40-50 keys)
2. `icsr.html` (60-70 keys)
3. `icsr2026.html` (50-60 keys)
4. `gallery.html` (40-50 keys)
5. `support.html` (60-70 keys)

### Phase 3: Priority 2 Pages (Week 4)
6. `welcome.html`
7. `press-kit.html`
8. `icsr2024-photos.html`
9. `login.html`

### Phase 4: Testing & QA (Week 5)
- Test language switching on all pages
- Verify translation quality with native speakers
- Check for layout breaking with longer translations
- Test RTL languages if needed in future
- Validate accessibility with screen readers

---

## Technical Implementation Details

### 1. Adding `data-i18n` Attributes

**Example Transformation**:

**Before**:
```html
<h2>Our Core Values</h2>
<p>ISRS operates guided by six foundational principles that shape our work and community:</p>
```

**After**:
```html
<h2 data-i18n="aboutCoreValuesHeading">Our Core Values</h2>
<p data-i18n="aboutCoreValuesIntro">ISRS operates guided by six foundational principles that shape our work and community:</p>
```

### 2. Form Input Placeholders

**Example**:
```html
<!-- Before -->
<input type="text" placeholder="Caption, tags, location...">

<!-- After -->
<input type="text" data-i18n-placeholder="gallerySearchPlaceholder" placeholder="Caption, tags, location...">
```

**Translation System Update** (in components.js):
```javascript
function translatePage() {
  // Existing text translation
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  // NEW: Placeholder translation
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });
}
```

### 3. Dynamic JavaScript Content

**Example - Alert Messages**:

**Before**:
```javascript
alert('✅ Added to your favorites!');
```

**After**:
```javascript
alert(translate('galleryFavoriteSuccess'));
```

**Add Helper Function** (in components.js):
```javascript
function translate(key) {
  const currentLang = localStorage.getItem('preferredLanguage') || 'en';
  return translations[currentLang]?.[key] || translations.en?.[key] || key;
}

// Export for use in other scripts
window.translate = translate;
```

### 4. Maintaining English as Fallback

All `data-i18n` attributes should keep the English text as the element's content. This ensures:
- Content displays if JavaScript fails
- SEO indexing works properly
- Graceful degradation

---

## New Translation Keys to Add

### About Page Keys (`aboutPage_*`)

```javascript
// In components.js - add to each language object

aboutHeroHeading: 'About ISRS',
aboutHeroSubtitle: 'The International Shellfish Restoration Society supports the global shellfish restoration community through collaboration, innovation, and knowledge exchange.',

aboutWhoWeAre: 'Who We Are',
aboutWhoWeAreText: 'The International Shellfish Restoration Society (ISRS) is a 501(c)(3) nonprofit organization (pending IRS approval) established in 2024 to support the global shellfish restoration community...',

aboutMission: 'Mission',
aboutMissionText: 'To build community, facilitate communication, and promote innovation within the shellfish restoration community worldwide.',

aboutVision: 'Vision',
aboutVisionText: 'A future where healthy shellfish ecosystems support resilient coasts, thriving marine life, and sustainable communities across the globe.',

aboutCoreValuesHeading: 'Our Core Values',
aboutCoreValuesIntro: 'ISRS operates guided by six foundational principles that shape our work and community:',

aboutValueScience: 'Science-Based Approach',
aboutValueScienceDesc: 'We apply rigorous research to inform restoration practices and decision-making.',

aboutValueCollaborative: 'Collaborative Partnerships',
aboutValueCollaborativeDesc: 'We believe in the power of working together across sectors, disciplines, and borders.',

// ... (continue for all 6 values)

aboutWhatWeDo: 'What We Do',
aboutHostICR: 'Host ICSR Conference',
aboutHostICRDesc: 'We organize the biennial International Conference on Shellfish Restoration...',

// ... (continue for all sections)
```

### ICSR Page Keys (`icsr_*`)

```javascript
icsrHeroHeading: 'International Conference on Shellfish Restoration',
icsrHeroSubtitle: 'The premier global gathering for shellfish restoration science and practice since 1996',
icsrCTA2026: 'ICSR2026 - Puget Sound',

icsrAbout: 'About ICSR',
icsrAboutText1: 'Since 1996, the International Conference on Shellfish Restoration has convened the global restoration community every two years...',

icsrWhoAttends: 'Who Attends ICSR',
icsrAttendeeScientists: 'Research Scientists',
icsrAttendeeScientistsDesc: 'Leading researchers presenting the latest findings in shellfish ecology...',

// ... (continue for all conference history, activities, etc.)
```

### Gallery Page Keys (`gallery_*`)

```javascript
galleryHeading: 'Photo Gallery',
galleryDescription: 'Explore photos from shellfish restoration projects, research, and events',

gallerySearchLabel: 'Text Search',
gallerySearchPlaceholder: 'Caption, tags, location...',
galleryAISearchLabel: 'AI Visual Search',
galleryAISearchPlaceholder: 'Describe the scene...',
gallerySortLabel: 'Sort By',
galleryApplyButton: 'Search',
galleryClearButton: 'Clear',

galleryDownloadFiltered: 'Download Filtered Photos',
galleryUploadButton: 'Upload Photos',

// Lightbox UI
galleryDownload: 'Download',
galleryFavorite: 'Favorite',
galleryShare: 'Share',
galleryPhotoDetails: 'Photo Details',
galleryRelatedPhotos: 'Related Photos',
galleryComments: 'Comments',

// Messages
galleryFavoriteSuccess: '✅ Added to your favorites!',
galleryCommentSuccess: '✅ Comment posted!',
galleryLoginRequired: 'Please log in to comment',

// Keyboard shortcuts
galleryShortcutsHelp: 'Keyboard Shortcuts',
galleryShortcutNext: 'Next photo',
galleryShortcutPrev: 'Previous photo',
galleryShortcutClose: 'Close lightbox',
galleryShortcutZoomIn: 'Zoom in',
galleryShortcutZoomOut: 'Zoom out',

// ... (continue for all UI elements)
```

### Support Page Keys (`support_*`)

```javascript
supportHeroHeading: 'Support ISRS',
supportHeroSubtitle: 'Building Global Resilience Through Marine Ecosystem Restoration',

supportOpportunity: 'The Critical Opportunity',
supportOpportunityText: 'Molluscan shellfish ecosystems provide some of nature\'s most powerful solutions...',

supportForFoundations: 'For Foundations',
supportForFoundationsDesc: 'Strategic investment in proven nature-based climate solutions with global impact potential.',

// ... (continue for all partnership types and programs)
```

---

## Spanish Translation Examples

### Core Values (from About page)
```javascript
es: {
  aboutValueScience: 'Enfoque Basado en la Ciencia',
  aboutValueScienceDesc: 'Aplicamos investigación rigurosa para informar las prácticas de restauración y la toma de decisiones.',

  aboutValueCollaborative: 'Asociaciones Colaborativas',
  aboutValueCollaborativeDesc: 'Creemos en el poder de trabajar juntos a través de sectores, disciplinas y fronteras.',

  aboutValueInclusive: 'Participación Inclusiva',
  aboutValueInclusiveDesc: 'Damos la bienvenida a perspectivas diversas de científicos, profesionales, comunidades indígenas, formuladores de políticas e industria.',

  aboutValueInnovation: 'Innovación',
  aboutValueInnovationDesc: 'Promovemos la resolución creativa de problemas y nuevas técnicas y tecnologías de restauración.',

  aboutValueImpact: 'Impulsado por el Impacto',
  aboutValueImpactDesc: 'Nos enfocamos en resultados medibles que benefician a las poblaciones de moluscos, los ecosistemas y las comunidades.',

  aboutValueSustainability: 'Sostenibilidad',
  aboutValueSustainabilityDesc: 'Defendemos enfoques de restauración que apoyan la salud ecológica y la resiliencia a largo plazo.',
}
```

### Conference Content
```javascript
es: {
  icsrHeroHeading: 'Conferencia Internacional sobre Restauración de Moluscos',
  icsrHeroSubtitle: 'La reunión global premier para la ciencia y práctica de restauración de moluscos desde 1996',
  icsrCTA2026: 'ICSR2026 - Puget Sound',

  icsrAbout: 'Acerca de ICSR',
  icsrWhoAttends: 'Quién Asiste a ICSR',
  icsrConferenceActivities: 'Actividades de la Conferencia',
  icsrConferenceHistory: 'Historia de la Conferencia',
}
```

---

## French Translation Examples

### Core Values (from About page)
```javascript
fr: {
  aboutValueScience: 'Approche Scientifique',
  aboutValueScienceDesc: 'Nous appliquons une recherche rigoureuse pour éclairer les pratiques de restauration et la prise de décision.',

  aboutValueCollaborative: 'Partenariats Collaboratifs',
  aboutValueCollaborativeDesc: 'Nous croyons au pouvoir de travailler ensemble à travers les secteurs, les disciplines et les frontières.',

  aboutValueInclusive: 'Participation Inclusive',
  aboutValueInclusiveDesc: 'Nous accueillons diverses perspectives de scientifiques, praticiens, communautés autochtones, décideurs politiques et industrie.',

  aboutValueInnovation: 'Innovation',
  aboutValueInnovationDesc: 'Nous promouvons la résolution créative de problèmes et de nouvelles techniques et technologies de restauration.',

  aboutValueImpact: 'Axé sur l\'Impact',
  aboutValueImpactDesc: 'Nous nous concentrons sur des résultats mesurables qui profitent aux populations de mollusques, aux écosystèmes et aux communautés.',

  aboutValueSustainability: 'Durabilité',
  aboutValueSustainabilityDesc: 'Nous défendons des approches de restauration qui soutiennent la santé écologique et la résilience à long terme.',
}
```

### Conference Content
```javascript
fr: {
  icsrHeroHeading: 'Conférence Internationale sur la Restauration des Mollusques',
  icsrHeroSubtitle: 'Le rassemblement mondial premier pour la science et la pratique de restauration des mollusques depuis 1996',
  icsrCTA2026: 'ICSR2026 - Puget Sound',

  icsrAbout: 'À Propos de ICSR',
  icsrWhoAttends: 'Qui Assiste à ICSR',
  icsrConferenceActivities: 'Activités de la Conférence',
  icsrConferenceHistory: 'Histoire de la Conférence',
}
```

---

## Quality Assurance Checklist

### Pre-Implementation
- [ ] Backup all HTML files before modifications
- [ ] Document current components.js structure
- [ ] Create translation key naming convention guide
- [ ] Set up version control for translation files

### During Implementation
- [ ] Add English fallback text in all `data-i18n` elements
- [ ] Use consistent key naming (page_section_element pattern)
- [ ] Test each page individually after adding translations
- [ ] Verify no layout breaking with longer translations
- [ ] Check mobile responsive behavior

### Post-Implementation
- [ ] Native Spanish speaker review
- [ ] Native French speaker review
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Screen reader testing for accessibility
- [ ] Performance testing (page load times)

### Translation Quality Checks
- [ ] Technical terminology consistency
- [ ] Cultural appropriateness
- [ ] Formal vs informal tone consistency
- [ ] Brand voice preservation
- [ ] Grammar and spelling accuracy

---

## Potential Challenges & Solutions

### Challenge 1: Layout Breaking with Longer Translations
**Issue**: French and Spanish text is often 20-30% longer than English
**Solution**:
- Use flexible CSS layouts (flexbox, grid)
- Set `min-height` instead of fixed `height`
- Test with longest translations first
- Allow text wrapping in buttons/cards

### Challenge 2: Dynamic JavaScript Content
**Issue**: Many UI elements generated in JavaScript aren't translated
**Solution**:
- Add `translate()` helper function
- Wrap all user-facing strings in `translate()` calls
- Store translations in global `window.translations` object

### Challenge 3: SEO with JavaScript Translations
**Issue**: Search engines may index before JavaScript executes
**Solution**:
- Keep English text as fallback in HTML
- Add `lang` attribute updates: `<html lang="es">`
- Consider server-side rendering for critical pages

### Challenge 4: Form Validation Messages
**Issue**: Browser native validation messages remain in English
**Solution**:
- Use `setCustomValidity()` for translated messages
- Implement custom validation with translated feedback
- Consider replacing native validation entirely

---

## Success Metrics

### Quantitative
- [ ] 100% of public pages support 3 languages (EN, ES, FR)
- [ ] <100ms language switching time
- [ ] 0 layout breaking issues
- [ ] 95%+ translation accuracy score

### Qualitative
- [ ] Positive feedback from Spanish-speaking users
- [ ] Positive feedback from French-speaking users
- [ ] Increased engagement from non-English regions
- [ ] Reduced support requests about language options

---

## Timeline

### Week 1: Infrastructure Setup
- Days 1-2: Expand components.js with new translation keys
- Days 3-4: Enhance translation system (placeholders, aria-labels)
- Day 5: Create translation testing framework

### Week 2: Priority 1 Pages (Part 1)
- Days 1-2: `about.html` implementation
- Days 3-4: `icsr.html` implementation
- Day 5: Testing and QA

### Week 3: Priority 1 Pages (Part 2)
- Days 1-2: `icsr2026.html` implementation
- Days 3-4: `gallery.html` implementation
- Day 5: `support.html` implementation

### Week 4: Priority 2 Pages
- Days 1-3: Implement remaining public pages
- Days 4-5: Comprehensive testing

### Week 5: QA & Launch
- Days 1-2: Native speaker reviews
- Days 3-4: Bug fixes and refinements
- Day 5: Production deployment

**Total Duration**: 5 weeks

---

## Next Steps

1. **Get stakeholder approval** for implementation plan
2. **Recruit native speakers** for translation quality review
3. **Set up development branch** for translation work
4. **Begin Phase 1** infrastructure enhancements
5. **Schedule weekly progress check-ins**

---

## Resources Needed

### Human Resources
- 1 Developer (full-time, 5 weeks)
- 1 Spanish native speaker (5 hours review)
- 1 French native speaker (5 hours review)
- 1 QA tester (20 hours)

### Tools
- Translation management platform (optional: POEditor, Lokalise)
- Browser testing tools (BrowserStack or similar)
- Version control (Git)

### Budget Estimate
- Development time: ~200 hours @ $50-100/hr = $10,000-20,000
- Native speaker reviews: ~10 hours @ $50/hr = $500
- QA testing: ~20 hours @ $40/hr = $800
- **Total**: $11,300 - $21,300

---

## Appendix: Full Page Inventory

| Page | Status | Priority | Estimated Keys | Notes |
|------|--------|----------|---------------|-------|
| index.html | ✅ Complete | - | ~500 existing | Already translated |
| about.html | ❌ Not started | P1 | 40-50 | Mission, values, community |
| icsr.html | ❌ Not started | P1 | 60-70 | Conference info, history |
| icsr2026.html | ❌ Not started | P1 | 50-60 | Upcoming conference |
| gallery.html | ❌ Not started | P1 | 40-50 | Photo gallery UI |
| support.html | ❌ Not started | P1 | 60-70 | Partnerships, donations |
| welcome.html | ❌ Not started | P2 | 15-20 | Welcome page |
| press-kit.html | ❌ Not started | P2 | 30-40 | Media resources |
| icsr2024-photos.html | ❌ Not started | P2 | 10-15 | Event photos |
| login.html | ❌ Not started | P2 | 20-25 | Login form |
| test-feedback.html | ❌ Not started | P3 | 5-10 | Testing only |
| test-photo-upload.html | ❌ Not started | P3 | 5-10 | Testing only |

**Total New Keys Needed**: ~350-400 keys
**Total Implementation Time**: 5 weeks

---

**Document Version**: 1.0
**Last Updated**: December 16, 2025
**Prepared By**: Claude Code
**Contact**: aaron.kornbluth@gmail.com
