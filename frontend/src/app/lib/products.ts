// Код залишається таким самим, як у попередній відповіді
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const productsDirectory = path.join(process.cwd(), 'src/products');

export function getSortedProductsData() {
  // Get file names under /src/products
  const fileNames = fs.readdirSync(productsDirectory);
  
  const allProductsData = fileNames
    // ДОДАЄМО ЦЕЙ РЯДОК ДЛЯ ФІЛЬТРАЦІЇ
    .filter((fileName) => fileName.endsWith('.md')) 
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the product metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...(matterResult.data as { name: string; price: number; image: string; description: string }),
      };
    });
    
  // Sort products by name
  return allProductsData.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });
}