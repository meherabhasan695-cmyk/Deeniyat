export const atorsData = [
  { 
    id: 1, 
    name: "Vampire Blood", 
    bnName: "ভ্যাম্পায়ার ব্লাড", 
    prices: { "3ml": 80, "6ml": 140 },
    image: "/images/vampire-blood.jpg",
    type: "Strong & Sweet",
    specialityEn: "A bold, mysterious and long-lasting fragrance with a rich, dark sweet undertone. Absolute showstopper for parties and evening events."
  },
  { 
    id: 2, 
    name: "Chocolate Musk", 
    bnName: "চকোলেট মাস্ক", 
    prices: { "3ml": 70, "6ml": 120 },
    image: "/images/chocolate-musk.jpg",
    type: "Sweet & Creamy",
    specialityEn: "A delicious blend of deep dark chocolate, smooth cocoa, and vanilla."
  },
  { 
    id: 3, 
    name: "Armani", 
    bnName: "আরমানি", 
    prices: { "3ml": 70, "6ml": 120 },
    image: "/images/armani.jpg",
    type: "Premium & Fresh",
    specialityEn: "Inspired by luxurious high-end designer perfumes. Classy and modern."
  },
  { 
    id: 4, 
    name: "Cool Water", 
    bnName: "কুল ওয়াটার", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/cool-water.jpg",
    type: "Light & Aquatics",
    specialityEn: "An ultra-fresh, aquatic scent reminiscent of ocean breeze."
  },
  { 
    id: 5, 
    name: "Salma", 
    bnName: "সালমা", 
    prices: { "3ml": 70, "6ml": 120 },
    image: "/images/salma.jpg",
    type: "Light & Floral",
    specialityEn: "A highly traditional, soothing floral essence with calming properties."
  },
  { 
    id: 6, 
    name: "Ameer Al Oud", 
    bnName: "আমীর আল ওউদ", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/ameer-al-oud.jpg",
    type: "Strong & Woody",
    specialityEn: "A deep, premium royal Arabian Oud mixed with creamy sandalwood notes."
  },
  { 
    id: 7, 
    name: "White Oud", 
    bnName: "হোয়াইট ওউদ", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/white-oud.jpg",
    type: "Medium & Powdery",
    specialityEn: "A soft, elegant, and sophisticated powdery woody blend."
  },
  { 
    id: 8, 
    name: "Green Musk / Kasturi", 
    bnName: "গ্রীন কস্তুরি", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/green-musk.jpg",
    type: "Fresh & Herbal",
    specialityEn: "A natural, crisp herbal fusion blended beautifully with fresh spiritual musk."
  },
  { 
    id: 9, 
    name: "Black Musk / Kasturi", 
    bnName: "ব্ল্যাক কস্তুরি", 
    prices: { "3ml": 90, "6ml": 160 },
    image: "/images/black-musk.jpg",
    type: "Strong & Earthy",
    specialityEn: "A powerful, sharp, traditional dark musk with intense animalic tones."
  },
  { 
    id: 10, 
    name: "Jannatul Firdaus", 
    bnName: "জান্নাতুল ফেরদাউস", 
    prices: { "3ml": 80, "6ml": 140 },
    image: "/images/jannatul-firdaus.jpg",
    type: "Strong & Traditional",
    specialityEn: "A timeless, ultra-popular traditional classic fragrance loved across generations."
  },
  { 
    id: 11, 
    name: "Ahsas Al-Arabian", 
    bnName: "Ahsas Al-Arabian", 
    prices: { "3ml": 100, "6ml": 180 },
    image: "/images/ahsas-al-arabian.jpg",
    type: "Medium & Spicy-Sweet",
    specialityEn: "An elite combination of Middle-Eastern spices and golden honey warm notes."
  },
  { 
    id: 12, 
    name: "Green Irani Bakhoor", 
    bnName: "গ্রীন ইরানি বাখুর", 
    prices: { "3ml": 70, "6ml": 140 }, 
    image: "/images/green-irani-bakhoor.jpg", // 🌟 এখানে /images/ পাথ ঠিক করা হলো
    type: "Premium & Exotic",
    specialityEn: "An exotic Middle-Eastern blend with rich, earthy, smoky bakhoor undertones."
  }
];

export const comboPackages = [
  {
    id: "pkg-1",
    name: "Regular Package",
    bnName: "রেগুলার প্যাকেজ",
    price: 270,
    image: "/images/regular-pkg.jpg",
    items: ["Salma", "Armani", "Green Irani Bakhoor", "Jannatul Firdaus", "Chocolate Musk"],
    gift: "Free Tasbih Included 📿"
  },
  {
    id: "pkg-2",
    name: "Premium Package",
    bnName: "প্রিমিয়াম প্যাকেজ",
    price: 300,
    image: "/images/premium-pkg.jpg",
    items: ["Ameer Al Oud", "White Oud", "Vampire Blood", "Green Kasturi", "Cool Water", "Ahsas Al-Arabian"],
    gift: "Free Premium Tasbih 📿",
    selectNote: "Select any five"
  },
  {
    id: "pkg-3",
    name: "Customized Package",
    bnName: "কাস্টমাইজড প্যাকেজ",
    price: 290,
    image: "/images/custom-pkg.jpg",
    isCustom: true,
    gift: "Free Tasbih Included 📿"
  }
];