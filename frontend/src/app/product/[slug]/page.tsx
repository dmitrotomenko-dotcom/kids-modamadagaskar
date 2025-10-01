import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const productsDirectory = path.join(process.cwd(), 'src/products');

// ФУНКЦІЯ №1 (Яку ми виправляли)
export function getSortedProductsData() {
  const fileNames = fs.readdirSync(productsDirectory);
  
  const allProductsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Фільтруємо .gitkeep
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        slug,
        ...(matterResult.data as { name: string; price: number; image: string; description: string }),
      };
    });
    
  return allProductsData.sort((a, b) => (a.name > b.name ? 1 : -1));
}

// ФУНКЦІЯ №2 (Яку ви випадково видалили - ми її повертаємо)
export function getProductData(slug: string) {
    const fullPath = path.join(productsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
        slug,
        ...(matterResult.data as { name: string; price: number; image: string; description: string }),
    };
}