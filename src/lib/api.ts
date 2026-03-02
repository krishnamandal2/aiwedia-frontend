
import "server-only";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  image: string;
  url: string;
  rank: number;
  benefits: string[];
  categorySlug: string;
}

export interface CategoryResponse {
  title?: string;
  description?: string;
  tools: Tool[];
  total: number;
}



export async function getToolsByCategory(slug: string): Promise<CategoryResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const res = await fetch(`${baseUrl}/api/categories/${slug}`, {
    
         next: { revalidate: 3600 }
    
    });

  if (!res.ok) return null;

  const data = await res.json();
  if (!Array.isArray(data.tools)) return null;

  return {
    title: data.title,
    description: data.description,
    tools: data.tools,
    total: data.total ?? data.tools.length,
  };
}

// Categories of home page

export async function getCategories(page = 1, limit = 12) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?page=${page}&limit=${limit}`,
    {// ✅ Revalidate every 1 hour
           next: { revalidate: 3600 }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}

//For Menu api
export async function getMenuCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/menu`,
    { 
      next: { revalidate: 3600 }

     } // or revalidate: 3600
  );

  if (!res.ok) {
    throw new Error("Failed to fetch menu categories");
  }

  return res.json();
}


