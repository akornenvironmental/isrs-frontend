const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outputFile = path.join(__dirname, '../public/data/photo-catalog.json');

// Category configurations
const categories = {
  conference: {
    name: 'Conferences',
    description: 'Photos from ICSR conferences and events',
    defaultTags: ['conference']
  },
  historic: {
    name: 'Historic',
    description: 'Historic photos from past ICSR conferences',
    defaultTags: ['historic', 'archive']
  },
  headshots: {
    name: 'People',
    description: 'Professional headshots of ISRS members and speakers',
    defaultTags: ['headshot', 'people']
  },
  logos: {
    name: 'Logos',
    description: 'Organization logos and branding assets',
    defaultTags: ['logo', 'branding']
  },
  backgrounds: {
    name: 'Backgrounds',
    description: 'Background images and scenic photos',
    defaultTags: ['background', 'scenic']
  }
};

function extractNameFromFilename(filename, category) {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '');

  // Category-specific parsing
  if (category === 'headshots') {
    const match = nameWithoutExt.match(/HEADSHOT - (.+?)( \d+)?$/i);
    if (match) return match[1].trim();
  }

  if (category === 'logos') {
    const match = nameWithoutExt.match(/LOGO - (.+)$/i);
    if (match) return match[1].trim();
  }

  if (category === 'conference') {
    if (nameWithoutExt.includes('ICSR-2024')) {
      const num = nameWithoutExt.match(/ICSR-2024-(\d+)/);
      return num ? `ICSR 2024 - Photo ${num[1]}` : 'ICSR 2024';
    }
    if (nameWithoutExt.includes('Welcome Reception')) {
      const num = nameWithoutExt.match(/Reception-(\d+)/);
      return num ? `ICSR 2024 Welcome Reception - Photo ${num[1]}` : 'Welcome Reception';
    }
  }

  // Default: clean up the filename
  return nameWithoutExt
    .replace(/^IMAGE - /i, '')
    .replace(/^LOGO - /i, '')
    .replace(/^HEADSHOT - /i, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .trim();
}

function generatePhotoEntry(filename, category, index) {
  const categoryConfig = categories[category];
  const name = extractNameFromFilename(filename, category);

  const entry = {
    id: `${category}-${index}`,
    url: `/images/${category}/${filename}`,
    thumbnail_url: `/images/${category}/${filename}`,
    caption: name,
    description: categoryConfig.description,
    category: category,
    tags: [...categoryConfig.defaultTags],
    original_filename: filename,
    license_type: 'ISRS'
  };

  // Add category-specific metadata
  if (category === 'conference') {
    entry.location_name = 'Jekyll Island, Georgia';
    if (filename.includes('ICSR-2024')) {
      entry.event = 'ICSR 2024';
      entry.photographer_name = 'Trey Cooper';
      entry.tags.push('icsr-2024', 'jekyll-island');
    }
  }

  if (category === 'historic') {
    entry.tags.push('icsr-history');
  }

  return entry;
}

function scanCategory(category) {
  const categoryPath = path.join(imagesDir, category);

  if (!fs.existsSync(categoryPath)) {
    console.log(`Category ${category} not found at ${categoryPath}`);
    return [];
  }

  const files = fs.readdirSync(categoryPath)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
    .sort();

  console.log(`Found ${files.length} images in ${category}`);

  return files.map((file, index) => generatePhotoEntry(file, category, index + 1));
}

function generateCatalog() {
  const catalog = {
    generated: new Date().toISOString(),
    version: '1.0',
    total_photos: 0,
    categories: {},
    photos: []
  };

  // Scan all categories
  Object.keys(categories).forEach(category => {
    const photos = scanCategory(category);
    catalog.photos.push(...photos);
    catalog.categories[category] = {
      ...categories[category],
      count: photos.length
    };
  });

  catalog.total_photos = catalog.photos.length;

  // Ensure output directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write catalog
  fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2));

  console.log(`\nGenerated photo catalog:`);
  console.log(`Total photos: ${catalog.total_photos}`);
  Object.entries(catalog.categories).forEach(([cat, info]) => {
    console.log(`  ${info.name}: ${info.count} photos`);
  });
  console.log(`\nCatalog saved to: ${outputFile}`);

  return catalog;
}

// Run if called directly
if (require.main === module) {
  try {
    generateCatalog();
  } catch (error) {
    console.error('Error generating catalog:', error);
    process.exit(1);
  }
}

module.exports = { generateCatalog };
