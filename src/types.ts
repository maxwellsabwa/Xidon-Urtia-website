export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: 'pads' | 'tissues' | 'furniture' | 'rugs' | 'candles';
  description: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}
