// Puja list and similarity-based fuzzy search utility

export const PUJA_LIST = [
  { id: 'satyanarayan', name: 'Satyanarayan Puja', icon: '✨', category: 'pujas', image: 'SATYANARAYAN PUJA.jpg' },
  { id: 'grihapravesh', name: 'Griha Pravesh (House Warming)', icon: '🏡', category: 'setup', image: 'tom-LvelDKbCeZg-unsplash.jpg' },
  { id: 'ganesh', name: 'Ganesh Puja', icon: '🐘', category: 'pujas', image: 'ai_kalash.png' },
  { id: 'lakshmi', name: 'Lakshmi Puja', icon: '🪔', category: 'pujas', image: 'ai_kalash.png' },
  { id: 'navagraha', name: 'Navagraha Puja', icon: '🪐', category: 'pujas', image: 'ai_kalash.png' },
  { id: 'rudrabhishek', name: 'Rudrabhishek', icon: '🔱', category: 'pujas', image: 'ai_kalash.png' },
  { id: 'vastu', name: 'Vastu Puja', icon: '📐', category: 'setup', image: 'ai_kalash.png' },
  { id: 'marriage', name: 'Wedding Rituals', icon: '💒', category: 'blessings', image: 'MARRAIGE.jpg' },
  { id: 'namkaran', name: 'Namkaran', icon: '👶', category: 'blessings', image: 'ai_kalash.png' },
  { id: 'annaprashan', name: 'Annaprashan', icon: '🍚', category: 'pujas', image: 'ANNAPRASANA.jpg' },
  { id: 'durga', name: 'Bengali Durga Puja Rituals', icon: '🔱', category: 'pujas', image: 'Bengali Rituals.jpg' },
  { id: 'odia', name: 'Odia Sudasha Brata / Laxmi Puja', icon: '🛕', category: 'setup', image: 'Odia Rituals.jpg' },
  { id: 'havan', name: 'Ganesh Puja & Havan Combo', icon: '🔥', category: 'pujas', image: 'HAVAN.jpg' },
  { id: 'temple', name: 'Temple Ceremonies', icon: '🕉️', category: 'setup', image: 'temple ceremonies.jpg' },
  { id: 'sundarkanda', name: 'Sundarkanda Path', icon: '🐒', category: 'pujas', image: 'Sundarkanda .jpg' }
];

// Helper to check if search query is a subsequence of the target string
function isSubsequence(pattern, str) {
  let patternIdx = 0;
  let strIdx = 0;
  
  while (patternIdx < pattern.length && strIdx < str.length) {
    if (pattern[patternIdx] === str[strIdx]) {
      patternIdx++;
    }
    strIdx++;
  }
  
  return patternIdx === pattern.length;
}

// Jaccard similarity score (between 0 and 1) based on character overlap
function getJaccardSimilarity(s1, s2) {
  const set1 = new Set(s1);
  const set2 = new Set(s2);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export function searchPujas(query) {
  const cleanQuery = query.toLowerCase().trim().replace(/\s+/g, '');
  if (!cleanQuery) return [];

  const scored = PUJA_LIST.map(puja => {
    const cleanName = puja.name.toLowerCase().replace(/\s+/g, '');
    let score = 0;

    // Direct substring match (highest priority)
    if (cleanName.includes(cleanQuery)) {
      score = 1.0 + (cleanQuery.length / cleanName.length); // bias towards shorter names
    }
    // Subsequence fuzzy match (medium priority)
    else if (isSubsequence(cleanQuery, cleanName)) {
      score = 0.6;
    }
    // Typo tolerant Jaccard character overlap (lowest priority)
    else {
      const similarity = getJaccardSimilarity(cleanQuery, cleanName);
      if (similarity >= 0.35) {
        score = similarity * 0.5;
      }
    }

    return { ...puja, score };
  });

  // Filter out non-matching results and sort descending by score
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
