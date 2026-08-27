export const atorsData = [
  { 
    id: 1, 
    name: "Vampire Blood", 
    bnName: "ভ্যাম্পায়ার ব্লাড", 
    prices: { "3ml": 100, "6ml": 180 },
    image: "/images/vampire-blood.jpg",
    type: "Strong & Sweet",
    isPremium: true,
    specialityEn: "A bold, mysterious and long-lasting fragrance with a rich, dark sweet undertone."
  },
  { 
    id: 2, 
    name: "Chocolate Musk", 
    bnName: "চকোলেট মাস্ক", 
    prices: { "3ml": 80, "6ml": 140 },
    image: "/images/chocolate-musk.jpg",
    type: "Sweet & Creamy",
    isPremium: false,
    specialityEn: "A delicious blend of deep dark chocolate, smooth cocoa, and vanilla."
  },
  { 
    id: 3, 
    name: "Ahsas Al-Arabian", 
    bnName: "এহসাস আল এরাবিয়ান", 
    prices: { "3ml": 100, "6ml": 180 },
    image: "/images/ahsas-al-arabian.jpg",
    type: "Medium & Spicy-Sweet",
    isPremium: true,
    specialityEn: "An elite combination of Middle-Eastern spices and golden honey warm notes."
  },
  { 
    id: 4, 
    name: "Green Irani Bakhoor", 
    bnName: "ইরানি বাখুর", 
    prices: { "3ml": 80, "6ml": 140 }, 
    image: "/images/green-irani-bakhoor.jpg",
    type: "Premium & Exotic",
    isPremium: false,
    specialityEn: "An exotic Middle-Eastern blend with rich, earthy, smoky bakhoor undertones."
  },
  { 
    id: 5, 
    name: "Cool Water", 
    bnName: "কুল ওয়াটার", 
    prices: { "3ml": 100, "6ml": 180 },
    image: "/images/cool-water.jpg",
    type: "Light & Aquatics",
    isPremium: true,
    specialityEn: "An ultra-fresh, aquatic scent reminiscent of ocean breeze."
  },
  { 
    id: 6, 
    name: "Ameer Al Oud", 
    bnName: "আমীর আল ওউদ", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/ameer-al-oud.jpg",
    type: "Strong & Woody",
    isPremium: true,
    specialityEn: "A deep, premium royal Arabian Oud mixed with creamy sandalwood notes."
  },
  { 
    id: 7, 
    name: "White Oud", 
    bnName: "হোয়াইট ওউদ", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/white-oud.jpg",
    type: "Medium & Powdery",
    isPremium: true,
    specialityEn: "A soft, elegant, and sophisticated powdery woody blend."
  },
  { 
    id: 8, 
    name: "Green Musk / Kasturi", 
    bnName: "গ্রীন কস্তুরি", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/green-musk.jpg",
    type: "Fresh & Herbal",
    isPremium: true,
    specialityEn: "A natural, crisp herbal fusion blended beautifully with fresh spiritual musk."
  },
  { 
    id: 9, 
    name: "Salma", 
    bnName: "সালমা", 
    prices: { "3ml": 70, "6ml": 120 },
    image: "/images/salma.jpg",
    type: "Light & Floral",
    isPremium: false,
    specialityEn: "A highly traditional, soothing floral essence with calming properties."
  },
  { 
    id: 10, 
    name: "Jannatul Firdaus", 
    bnName: "জান্নাতুল ফিরদাউস", 
    prices: { "3ml": 80, "6ml": 140 },
    image: "/images/jannatul-firdaus.jpg",
    type: "Strong & Traditional",
    isPremium: false,
    specialityEn: "A timeless, ultra-popular traditional classic fragrance loved across generations."
  },
  { 
    id: 11, 
    name: "Armani", 
    bnName: "আরমানি", 
    prices: { "3ml": 80, "6ml": 140 },
    image: "/images/armani.jpg",
    type: "Premium & Fresh",
    isPremium: false,
    specialityEn: "Inspired by luxurious high-end designer perfumes. Classy and modern."
  }
];

export const comboPackages = [
  {
    id: "pkg-1",
    name: "Regular Package",
    bnName: "রেগুলার প্যাকেজ",
    price: 300,
    image: "/images/regular-pkg.jpg",
    items: ["Salma", "Armani", "Green Irani Bakhoor", "Jannatul Firdaus", "Chocolate Musk"],
    gift: "Free Tasbih Included 📿"
  },
  {
    id: "pkg-2",
    name: "Premium Package",
    bnName: "প্রিমিয়াম প্যাকেজ",
    price: 350,
    image: "/images/premium-pkg.jpg",
    items: ["Ameer Al Oud", "Ahsas Al-Arabian", "Vampire Blood", "Green Musk / Kasturi", "Cool Water"],
    gift: "Free Premium Tasbih 📿"
  },
  {
    id: "pkg-3",
    name: "Customized Package",
    bnName: "কাস্টমাইজড প্যাকেজ",
    price: 330,
    image: "/images/custom-pkg.jpg",
    isCustom: true,
    gift: "Free Tasbih Included 📿"
  }
];