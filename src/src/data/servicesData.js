const servicesData = [
  {
    id: 1,
    title: "House Cleaning Service",
    category: "Home Services",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    price: 999,
    discount: 20,
    discountPrice: 799,
    description:
      "Professional and reliable home cleaning service for a clean and hygienic home.",
    stock: 50,
    brand: "Vani Systems",
    sku: "SKU-001",
    gst: 18,
    shippingCharge: 99,
    featured: true,
    status: "Active"
  },
  {
    id: 2,
    title: "Office Cleaning Service",
    category: "Commercial Services",
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=900&q=80",
    price: 1499,
    discount: 25,
    discountPrice: 1124,
    description:
      "Complete office cleaning solutions with trained and professional staff.",
    stock: 30,
    brand: "Vani Systems",
    sku: "SKU-002",
    gst: 18,
    shippingCharge: 149,
    featured: false,
    status: "Active"
  },
  {
    id: 3,
    title: "Security Guard Service",
    category: "Security Services",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
    price: 2499,
    discount: 15,
    discountPrice: 2124,
    description:
      "Trusted and trained security professionals for your home, office and business.",
    stock: 20,
    brand: "Vani Systems",
    sku: "SKU-003",
    gst: 18,
    shippingCharge: 199,
    featured: true,
    status: "Active"
  },
  {
    id: 4,
    title: "AC Repair Service",
    category: "Repair Services",
    image:
      "https://images.unsplash.com/photo-1631545806609-6b6a7d7e9c9d?auto=format&fit=crop&w=900&q=80",
    price: 799,
    discount: 20,
    discountPrice: 639,
    description:
      "Fast and professional AC repair and maintenance service at your doorstep.",
    stock: 40,
    brand: "Vani Systems",
    sku: "SKU-004",
    gst: 18,
    shippingCharge: 79,
    featured: false,
    status: "Active"
  },
  {
    id: 5,
    title: "Electrician Service",
    category: "Electrical Services",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    price: 599,
    discount: 10,
    discountPrice: 539,
    description:
      "Experienced electricians for all types of electrical installation and repair work.",
    stock: 35,
    brand: "Vani Systems",
    sku: "SKU-005",
    gst: 18,
    shippingCharge: 59,
    featured: false,
    status: "Active"
  },
  {
    id: 6,
    title: "Plumbing Service",
    category: "Repair Services",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
    price: 699,
    discount: 15,
    discountPrice: 594,
    description:
      "Quick and reliable plumbing solutions for your home and office.",
    stock: 45,
    brand: "Vani Systems",
    sku: "SKU-006",
    gst: 18,
    shippingCharge: 69,
    featured: false,
    status: "Active"
  },
  {
    id: 7,
    title: "Pest Control Service",
    category: "Home Services",
    image:
      "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=900&q=80",
    price: 1299,
    discount: 20,
    discountPrice: 1039,
    description:
      "Effective pest control treatment to keep your home safe and pest-free.",
    stock: 25,
    brand: "Vani Systems",
    sku: "SKU-007",
    gst: 18,
    shippingCharge: 129,
    featured: true,
    status: "Active"
  },
  {
    id: 8,
    title: "Gardening Service",
    category: "Outdoor Services",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    price: 899,
    discount: 10,
    discountPrice: 809,
    description:
      "Professional gardening and plant care services for beautiful green spaces.",
    stock: 30,
    brand: "Vani Systems",
    sku: "SKU-008",
    gst: 18,
    shippingCharge: 89,
    featured: false,
    status: "Active"
  },
  {
    id: 9,
    title: "Manpower Service",
    category: "Manpower Services",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    price: 2999,
    discount: 25,
    discountPrice: 2249,
    description:
      "Reliable and skilled manpower solutions for businesses and organizations.",
    stock: 15,
    brand: "Vani Systems",
    sku: "SKU-009",
    gst: 18,
    shippingCharge: 299,
    featured: true,
    status: "Active"
  },
  {
    id: 10,
    title: "Car Washing Service",
    category: "Automobile Services",
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=80",
    price: 499,
    discount: 20,
    discountPrice: 399,
    description:
      "Professional car washing and cleaning service with quality care.",
    stock: 60,
    brand: "Vani Systems",
    sku: "SKU-010",
    gst: 18,
    shippingCharge: 49,
    featured: false,
    status: "Active"
  },
   {
    id: 11,
    title: "Manpower Service",
    category: "Manpower Services",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    price: 2999,
    discount: 25,
    discountPrice: 2249,
    description:
      "Reliable and skilled manpower solutions for businesses and organizations.",
    stock: 15,
    brand: "Vani Systems",
    sku: "SKU-011",
    gst: 18,
    shippingCharge: 299,
    featured: false,
    status: "Active"
  },
  {
    id: 12,
    title: "Car Washing Service",
    category: "Automobile Services",
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=80",
    price: 499,
    discount: 20,
    discountPrice: 399,
    description:
      "Professional car washing and cleaning service with quality care.",
    stock: 60,
    brand: "Vani Systems",
    sku: "SKU-012",
    gst: 18,
    shippingCharge: 49,
    featured: false,
    status: "Active"
  },
];

export default servicesData;