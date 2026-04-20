/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

// --- Types & Data ---

type Product = {
  id: number;
  name: string;
  splitName: [string, string];
  bottleScale: number;
  bgColor: string;
  textColor: string;
  accentColor: string;
  nutColor: string;
  desc: string;
  longDesc: string;
  image: string;
  price: string;
  tags: string[];
  reviews: { name: string; text: string }[];
  nutrition: { label: string; value: string }[];
  harvestProcess: string;
};

const PRODUCTS: Product[] = [
  {
    id: 0,
    name: 'Almond',
    splitName: ['Alm', 'ond'],
    bottleScale: 0.97,
    bgColor: '#F9F1E7',
    textColor: '#3A2A22',
    accentColor: '#8D6E63',
    nutColor: '#A1887F',
    desc: 'Velvety texture with a signature toasted nut finish.',
    longDesc: 'Our Almond Milk is crafted from premium organic almonds, providing a creamy, versatile base for your morning coffee or favorite smoothies. Rich in Vitamin E and naturally lactose-free, it delivers the pure essence of California-grown heritage almonds in every pour.',
    image: '/almond.png',
    price: 'Rs 349',
    tags: ['Pure Organic', 'Vitamin E Rich', 'California Harvest'],
    reviews: [
      { name: "S. Malik", text: "The smoothest almond milk I've found. Perfect for my morning latte." },
      { name: "A. Chen", text: "Finally, no chalky aftertaste! Just pure, toasted almond goodness." },
      { name: "M. Rossi", text: "The glass bottle looks so premium in the fridge. Love the sustainability." }
    ],
    nutrition: [
      { label: 'Calories', value: '40 kcal' },
      { label: 'Vitamin E', value: '50% DV' },
      { label: 'Calcium', value: '30% DV' },
      { label: 'Net Carbs', value: '1g' }
    ],
    harvestProcess: 'Slow-roasted Californian almonds are triple-filtered through fine silk mesh for an impossibly smooth, velvety texture without any chalkiness.'
  },
  {
    id: 1,
    name: 'Hazelnut',
    splitName: ['Haze', 'lnut'],
    bottleScale: 1,
    bgColor: '#F1F4E8',
    textColor: '#2E3524',
    accentColor: '#689F38',
    nutColor: '#8D6E63',
    desc: 'Rich, aromatic, and naturally sweet indulgence.',
    longDesc: 'Indulge in the aromatic richness of our Hazelnut Milk. Slow-roasted hazelnuts create a deeply satisfying, naturally sweet flavor profile that elevates desserts and lattes alike. It is a decadent, nutrient-dense alternative that embodies the spirit of traditional artisanal pressing.',
    image: '/hazelnut.png',
    price: 'Rs 349',
    tags: ['Slow Roasted', 'Naturally Sweet', 'Artisanal Press'],
    reviews: [
      { name: "S. Malik", text: "Finally, a hazelnut milk that doesn't taste like candy. Pure, earthy, perfection." },
      { name: "A. Chen", text: "The texture is impossibly creamy. Works beautifully in my morning latte." },
      { name: "M. Rossi", text: "I love the sustainability focus. The glass bottles are a statement in my fridge." }
    ],
    nutrition: [
      { label: 'Calories', value: '65 kcal' },
      { label: 'Folate', value: '15% DV' },
      { label: 'Manganese', value: '80% DV' },
      { label: 'Healthy Fat', value: '4.5g' }
    ],
    harvestProcess: 'Turkish hazelnuts are deep-roasted at 160C to activate their natural oils, then cold-pressed in small batches to preserve their intense, nutty aroma.'
  },
  {
    id: 2,
    name: 'Walnut',
    splitName: ['Wal', 'nut'],
    bottleScale: 1.04,
    bgColor: '#EBE9F0',
    textColor: '#2E2435',
    accentColor: '#7E57C2',
    nutColor: '#5D4037',
    desc: 'Robust earthy notes packed with plant-based Omega-3s.',
    longDesc: 'Experience the robust, earthy notes of wild-harvested walnuts. Our Walnut Milk is a nutritional powerhouse, exceptionally high in plant-based Omega-3 fatty acids. Its sophisticated, slightly savory finish makes it the perfect pairing for overnight oats or standalone sipping for the health-conscious connoisseur.',
    image: '/walnut.png',
    price: 'Rs 349',
    tags: ['Omega-3 Power', 'Wild Harvested', 'Robust Body'],
    reviews: [
      { name: "S. Malik", text: "Deep, earthy flavor. Makes my overnight oats taste like a gourmet breakfast." },
      { name: "A. Chen", text: "Hard to find cold-pressed walnut milk. This one is exceptional." },
      { name: "M. Rossi", text: "Incredibly rich texture. I use it as a base for vegan cream sauces too." }
    ],
    nutrition: [
      { label: 'Calories', value: '70 kcal' },
      { label: 'Omega-3', value: '2.5g' },
      { label: 'Copper', value: '45% DV' },
      { label: 'Protein', value: '2g' }
    ],
    harvestProcess: 'Mountain-grown walnuts are gently crushed rather than ground, utilizing a unique high-retention process that keeps its delicate Omega-3-6-9 oils perfectly intact.'
  },
];

// --- Components ---

const FloatingNut = ({ image, delay, x, y, index }: { image: string; delay: number; x: string; y: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 0.9, 
        scale: index % 2 === 0 ? 0.7 : 1,
        y: [0, -40, 0],
        rotate: [index * 15, index * 15 + 30, index * 15 - 30, index * 15],
        x: [0, index % 2 === 0 ? 25 : -25, 0]
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 7 + index, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.12, rotate: 180, filter: "brightness(1.1)", transition: { duration: 0.4 } }}
      className="hidden sm:block absolute z-10 cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
      style={{ left: x, top: y }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Photorealistic nut image! */}
        <TransparentImage src={image} className="w-[116%] h-[116%] object-contain drop-shadow-sm" alt="Floating ingredient" />
      </div>
    </motion.div>
  );
};

const LiquidWave = ({ color }: { color: string }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
      <motion.svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-[200%] h-32"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path 
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35,72.79,18.66,144.7,33.1,221.8,33.1,102.31,0,201-38.48,310-38.48V0Z" 
          fill={color}
          className="opacity-20"
        />
        <path 
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
          fill={color}
          className="opacity-40"
        />
      </motion.svg>
    </div>
  );
};

// --- Client-side Background Removal Component (Corner-Only Flood Fill) ---
const transparentImageCache = new Map<string, string>();
const transparentImageTaskCache = new Map<string, Promise<string>>();

const processTransparentImage = (src: string): Promise<string> => {
  const cached = transparentImageCache.get(src);
  if (cached) return Promise.resolve(cached);

  const runningTask = transparentImageTaskCache.get(src);
  if (runningTask) return runningTask;

  const task = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        transparentImageCache.set(src, src);
        resolve(src);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Start flood fill only from the absolute corners to protect inner white pixels (like caps)
      const stack = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
      const visited = new Uint8Array(w * h);

      const isWhiteish = (idx: number) => {
        const i = idx * 4;
        return data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230 && data[i + 3] !== 0;
      };

      while (stack.length > 0) {
        const point = stack.pop();
        if (!point) break;
        const [x, y] = point;

        const idx = y * w + x;
        if (visited[idx]) continue;
        visited[idx] = 1;

        if (isWhiteish(idx)) {
          const pixelIdx = idx * 4;
          data[pixelIdx + 3] = 0; // Make transparent

          if (x + 1 < w && !visited[y * w + (x + 1)]) stack.push([x + 1, y]);
          if (x - 1 >= 0 && !visited[y * w + (x - 1)]) stack.push([x - 1, y]);
          if (y + 1 < h && !visited[(y + 1) * w + x]) stack.push([x, y + 1]);
          if (y - 1 >= 0 && !visited[(y - 1) * w + x]) stack.push([x, y - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const processed = canvas.toDataURL('image/png');
      transparentImageCache.set(src, processed);
      resolve(processed);
    };

    img.onerror = () => {
      transparentImageCache.set(src, src);
      resolve(src);
    };
  });

  transparentImageTaskCache.set(src, task);
  task.finally(() => transparentImageTaskCache.delete(src));
  return task;
};

const TransparentImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [displaySrc, setDisplaySrc] = useState<string>(() => transparentImageCache.get(src) ?? '');
  const [isProcessedLoaded, setIsProcessedLoaded] = useState<boolean>(() => transparentImageCache.has(src));

  useEffect(() => {
    let isActive = true;
    const cached = transparentImageCache.get(src);

    // Avoid rendering the raw source first; wait for processed image to prevent white-bg blink.
    setDisplaySrc(cached ?? '');
    setIsProcessedLoaded(Boolean(cached));

    processTransparentImage(src).then((processed) => {
      if (!isActive) return;
      setDisplaySrc(processed);
      setIsProcessedLoaded(true);
    });

    return () => {
      isActive = false;
    };
  }, [src]);

  return (
    <img
      src={displaySrc}
      alt={alt}
      className={`${className} mix-blend-multiply transition-opacity duration-200 ${isProcessedLoaded ? 'opacity-100' : 'opacity-0'}`}
      referrerPolicy="no-referrer"
      loading="eager"
      decoding="async"
    />
  );
};



const MilkBottle = ({ product }: { product: Product }) => {
  return (
    <div className="relative w-[14.5rem] h-[22rem] sm:w-[17rem] sm:h-[26rem] lg:w-80 lg:h-[32rem] mx-auto perspective-1000 z-30 flex items-center justify-center">
      {/* Dynamic Lighting Background Glow */}
      <motion.div
        key={`glow-${product.id}`}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full blur-[110px] sm:blur-[130px] lg:blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: product.nutColor }}
      />

      {/* Bottle Shadow */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-48 lg:w-52 h-6 sm:h-7 lg:h-8 bg-black/10 rounded-full blur-3xl opacity-50" />

      {/* Bottle only animates when flavor changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 28, scale: 0.93, rotate: -3 }}
          animate={{
            opacity: 1,
            y: [28, 0, -4, 0],
            scale: [0.93, 1.02, 0.995, 1],
            rotate: [-3, 0.9, -0.3, 0]
          }}
          exit={{ opacity: 0, y: -12, scale: 1.02, rotate: 1.5 }}
          transition={{ duration: 0.72, times: [0, 0.45, 0.75, 1], ease: "easeOut" }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `scale(${product.bottleScale})` }}
          >
            <TransparentImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain pointer-events-none filter contrast-[1.05] brightness-[1.02] saturate-[1.05]"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SiteWatermarks = () => {
  const marks = [
    { left: '4vw', top: '14vh', rotate: -18 },
    { left: '28vw', top: '10vh', rotate: -14 },
    { left: '68vw', top: '16vh', rotate: -12 },
    { left: '82vw', top: '34vh', rotate: -10 },
    { left: '8vw', top: '48vh', rotate: -16 },
    { left: '42vw', top: '56vh', rotate: -12 },
    { left: '72vw', top: '68vh', rotate: -14 },
    { left: '18vw', top: '82vh', rotate: -10 }
  ];

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-[35] select-none">
      {marks.map((mark, index) => (
        <p
          key={`${mark.left}-${mark.top}-${index}`}
          className="absolute text-[9px] lg:text-[10px] font-black uppercase tracking-[0.22em] text-white/30 mix-blend-difference"
          style={{ left: mark.left, top: mark.top, transform: `rotate(${mark.rotate}deg)` }}
        >
          Website By: Samm
        </p>
      ))}
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center space-x-2 group cursor-pointer">
    <div className="w-8 h-8 bg-zinc-900 rounded-md relative overflow-hidden flex items-center justify-center p-1 shadow-lg border border-white/5">
       <div className="w-full h-full bg-zinc-100 rounded-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-zinc-400" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/50 to-transparent" />
       </div>
    </div>
    <span className="font-extrabold text-[15px] tracking-tight text-zinc-900 transition-colors group-hover:text-black">NutMilk Co.</span>
  </div>
);

const ProductModal = ({ product, onClose, onAddToBag }: { product: Product; onClose: () => void; onAddToBag: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-8 backdrop-blur-3xl bg-black/60"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ type: "spring", damping: 35, stiffness: 350 }}
        className="bg-white w-full max-w-6xl max-h-[92svh] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] overflow-y-auto lg:overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-[60] w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center ring-4 ring-black/10 hover:scale-110 active:scale-95 transition-transform"
        >
          <Menu size={20} className="rotate-45" />
        </button>

        {/* Image Section */}
        <div className="w-full lg:w-[45%] h-[34vh] sm:h-[38vh] lg:h-auto relative overflow-hidden bg-zinc-50 flex items-center justify-center p-6 sm:p-10 lg:p-12 group">
           {/* Fallback pattern */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${product.nutColor} 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
           
           <div
              className="relative w-full h-[80%] flex items-center justify-center"
              style={{ transform: `scale(${product.bottleScale})` }}
           >
              <TransparentImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 filter contrast-[1.05] brightness-[1.02] saturate-[1.05]"
              />
           </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 sm:p-8 lg:p-20 flex flex-col justify-center bg-white">
           <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="space-y-3 sm:space-y-4">
                 <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-zinc-900 leading-none">{product.name}</h2>
                 <p className="text-base sm:text-lg lg:text-xl font-bold italic text-zinc-400 tracking-tight">{product.desc}</p>
                 <div className="w-20 h-1 bg-zinc-950 rounded-full" />
              </div>

              <p className="text-zinc-500 text-base lg:text-lg leading-relaxed font-normal">
                {product.longDesc}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                 {product.tags.map(tag => (
                   <span key={tag} className="px-3 sm:px-4 lg:px-5 py-2 rounded-full border border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-50/50">
                     {tag}
                   </span>
                 ))}
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                 <div className="flex-1 w-full">
                    <button 
                      onClick={() => {
                        onAddToBag();
                        onClose();
                      }}
                      className="w-full py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-black text-white rounded-2xl font-bold uppercase tracking-[0.24em] text-[10px] sm:text-xs transition-all transform hover:-translate-y-1 hover:brightness-110 active:scale-95 flex items-center justify-center space-x-3 shadow-xl shadow-black/30 ring-1 ring-white/10"
                    >
                      <ShoppingBag size={18} />
                      <span>Add to Bag</span>
                    </button>
                 </div>
                 <div className="text-xl sm:text-2xl font-black text-zinc-900 tabular-nums leading-none">{product.price}</div>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureSection = ({ product }: { product: Product }) => {
  const features = [
    { title: 'Purely Organic', desc: 'Sourced from heritage family farms with no synthetic additives.', icon: 'ORGANIC' },
    { title: 'Cold Pressed', desc: 'Our unique extraction method preserves maximum micronutrients.', icon: 'PRESSED' },
    { title: 'Refill Ritual', desc: 'Sustainable glass packaging designed for life, not landfill.', icon: 'REFILL' }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-20 bg-[#f7f2e9] relative overflow-hidden" style={{ color: product.textColor }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
           <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-6">The Standard</h2>
           <div className="w-12 h-px bg-current mx-auto opacity-20" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-24"
        >
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="mb-5 sm:mb-8 rounded-full border border-current px-4 py-2 text-[10px] font-black tracking-[0.3em] opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700" style={{ color: product.accentColor }}>{f.icon}</div>
              <h3 className="text-xl sm:text-2xl font-black italic tracking-tight mb-3 sm:mb-4">{f.title}</h3>
              <p className="text-sm sm:text-base text-zinc-500 font-medium leading-relaxed max-w-xs">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DetailSection = ({ product }: { product: Product }) => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-20 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: product.bgColor }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="space-y-4">
             <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 mix-blend-multiply" style={{ color: product.textColor }}>Harvest Process</h3>
             <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black italic tracking-tighter mix-blend-multiply leading-none" style={{ color: product.textColor }}>Handcrafted<br/>Excellence</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mix-blend-multiply opacity-70 font-medium" style={{ color: product.textColor }}>
            {product.harvestProcess}
          </p>
          <div className="pt-8">
             <div className="w-24 h-1 rounded-full mix-blend-multiply opacity-20" style={{ backgroundColor: product.textColor }} />
          </div>
        </div>

        <div className="relative">
           {/* Modern Glass Card */}
           <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[1.8rem] sm:rounded-[2.3rem] lg:rounded-[3rem] border border-white/50 shadow-2xl shadow-black/5" />
           <div className="relative p-6 sm:p-10 lg:p-20 space-y-8 sm:space-y-10 lg:space-y-12">
             <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 mix-blend-multiply" style={{ color: product.textColor }}>Nutrition Per Serving</h3>
             <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-8 sm:gap-y-12">
                {product.nutrition.map((item) => (
                  <div key={item.label} className="space-y-2">
                     <p className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter mix-blend-multiply" style={{ color: product.textColor }}>{item.value}</p>
                     <p className="text-xs font-bold uppercase tracking-widest opacity-50 mix-blend-multiply" style={{ color: product.textColor }}>{item.label}</p>
                  </div>
                ))}
             </div>
             {/* Modern decorative element */}
             <div className="pt-8 border-t border-current/10">
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 text-center">Nutrient Rich | Cold Pressed | Pure</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const ReviewSection = ({ product }: { product: Product }) => {
  return (
    <section className="py-20 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-20 bg-[#efe8dd] overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-24 relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40" style={{ color: product.textColor }}>The Collective Word</h2>
          <div className="w-16 h-1 bg-zinc-900 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-24">
          {product.reviews.map((r, i) => (
            <motion.div 
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 lg:space-y-10 flex flex-col items-center text-center group"
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-bold italic leading-relaxed text-zinc-800">{r.text}</p>
              <div className="flex flex-col items-center space-y-6">
                <div className="w-px h-8 bg-black/10 group-hover:h-12 transition-all duration-500" />
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{r.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onProductClick }: { onProductClick: (p: Product) => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <footer className="bg-black text-white py-16 px-6 lg:px-12 relative z-40">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12"
      >
        {/* Brand Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center space-x-2.5">
             <div className="w-7 h-8 bg-zinc-100 rounded-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-zinc-400" />
             </div>
             <h2 className="text-2xl font-black tracking-tight">NutMilk Co.</h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Small-batch plant milk. Clean ingredients, honest sourcing.
          </p>
        </motion.div>

        {/* Navigation Column */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Navigation</h3>
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Products</div>
              <ul className="flex flex-wrap gap-2">
                {PRODUCTS.map(p => (
                  <li 
                    key={p.name} 
                    onClick={() => onProductClick(p)}
                    className="cursor-pointer rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <span>{p.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-wrap gap-4 text-sm font-semibold text-zinc-400">
              {['Brew Guide', 'Impact', 'Press Kit'].map(item => (
                <li key={item} className="hover:text-white transition-colors cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>

      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.12em] text-center text-zinc-400"
      >
        <div>(c) 2026 NutMilk Co.</div>
        <div className="flex gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white transition-colors cursor-pointer">Legal</span>
        </div>
      </motion.div>
    </footer>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [, setCartCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showSiteWatermarks, setShowSiteWatermarks] = useState(false);
  const product = PRODUCTS[currentIndex];

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);

  const handleAddToBag = (p: Product) => {
    setCartCount(prev => prev + 1);
    setToast(`${p.name} Milk added to bag`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMenuClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  // Background smooth transition
  useEffect(() => {
    document.body.style.backgroundColor = product.bgColor;
    document.body.style.transition = 'background-color 0.8s ease-in-out';
  }, [product.bgColor]);

  useEffect(() => {
    const allImageSources = PRODUCTS.flatMap((item) => [
      item.image,
      `/${item.name.toLowerCase()}_real.png`
    ]);

    allImageSources.forEach((source) => {
      const preload = new Image();
      preload.decoding = "async";
      preload.src = source;
    });

    const warmupTimer = window.setTimeout(() => {
      PRODUCTS.forEach((item) => {
        void processTransparentImage(item.image);
      });
    }, 120);

    return () => {
      window.clearTimeout(warmupTimer);
    };
  }, []);

  useEffect(() => {
    const updateWatermarkVisibility = () => {
      const heroThreshold = Math.max(window.innerHeight * 0.9, 520);
      setShowSiteWatermarks(window.scrollY > heroThreshold);
    };

    updateWatermarkVisibility();
    window.addEventListener('scroll', updateWatermarkVisibility, { passive: true });
    window.addEventListener('resize', updateWatermarkVisibility);

    return () => {
      window.removeEventListener('scroll', updateWatermarkVisibility);
      window.removeEventListener('resize', updateWatermarkVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-zinc-900 selection:text-white">
      {showSiteWatermarks && <SiteWatermarks />}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-5 lg:px-8 py-3 bg-white/88 backdrop-blur-md border-b border-black/10 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center space-x-5 lg:space-x-8">
          {/* Logo */}
          <Logo />

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-1 rounded-full border border-black/15 bg-white/90 p-1 text-[10px] font-semibold tracking-[0.04em] text-zinc-900 shadow-sm backdrop-blur">
            {['Products', 'About', 'Partners', 'Contact'].map((item) => (
              <li 
                key={item}
                onClick={handleMenuClick}
                className="cursor-pointer rounded-full px-3 py-1.5 transition-colors hover:bg-zinc-900 hover:text-white"
              >
                {item}
              </li>
            ))}
            <li className="px-3 py-1.5 text-orange-500 font-bold tracking-[0.08em] whitespace-nowrap">
              Website By: Samm
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <button className="md:hidden p-2" onClick={handleMenuClick}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="min-h-[88svh] sm:h-[95vh] w-full relative flex items-center justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.section
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full h-full flex flex-col items-center justify-center px-3 sm:px-4"
          >
            {/* Background Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[21vw] sm:text-[18vw] lg:text-[12vw] font-extrabold uppercase leading-none tracking-[0.05em] flex items-center justify-center space-x-[8vw] sm:space-x-[18vw] lg:space-x-[15vw] opacity-30 sm:opacity-20 lg:opacity-10"
                style={{ color: product.textColor }}
              >
                <span className="flex-shrink-0 whitespace-nowrap">{product.splitName[0]}</span>
                <span className="flex-shrink-0 whitespace-nowrap">{product.splitName[1]}</span>
              </motion.h1>
            </div>

            <motion.p
              key={`mobile-name-${product.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="sm:hidden z-30 mb-2 text-[12px] font-bold uppercase tracking-[0.22em]"
              style={{ color: product.textColor }}
            >
              {product.name} Milk
            </motion.p>

            {/* Floating Nuts */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none z-20">
              <FloatingNut image={`/${product.name.toLowerCase()}_real.png`} delay={0.4} x="7%" y="16%" index={1} />
              <FloatingNut image={`/${product.name.toLowerCase()}_real.png`} delay={0.6} x="83%" y="12%" index={2} />
              <FloatingNut image={`/${product.name.toLowerCase()}_real.png`} delay={0.8} x="4%" y="70%" index={3} />
              <FloatingNut image={`/${product.name.toLowerCase()}_real.png`} delay={0.5} x="88%" y="64%" index={4} />
            </div>

            {/* Product Centerpiece */}
            <div className="relative mt-2">
              <MilkBottle product={product} />
            </div>

            {/* Shop Now Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 sm:mt-2 -translate-y-2 sm:-translate-y-5 lg:-translate-y-7 z-30 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2"
            >
              <button
                onClick={prevProduct}
                aria-label="Previous flavor"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-800/30 bg-white/95 text-zinc-900 flex items-center justify-center transition-all hover:bg-zinc-900 hover:text-white hover:scale-105 shadow-lg shadow-black/15 ring-2 ring-white/70"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setSelectedProduct(product)}
                className="px-5 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 border border-zinc-900/30 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] text-center whitespace-nowrap bg-gradient-to-r from-zinc-900 via-zinc-800 to-black text-white transition-all hover:brightness-110 transform hover:scale-105 active:scale-95 shadow-2xl shadow-black/30 ring-2 ring-white/40"
              >
                {product.name} - {product.price}
              </button>
              <button
                onClick={nextProduct}
                aria-label="Next flavor"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-800/30 bg-white/95 text-zinc-900 flex items-center justify-center transition-all hover:bg-zinc-900 hover:text-white hover:scale-105 shadow-lg shadow-black/15 ring-2 ring-white/70"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>

            {/* Liquid Wave Effect */}
            <LiquidWave color="#F7F2E9" />
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Content Sections */}
      <FeatureSection product={product} />
      <DetailSection product={product} />
      <ReviewSection product={product} />

      {/* New Footer Section */}
      <Footer onProductClick={setSelectedProduct} />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToBag={() => handleAddToBag(selectedProduct)}
          />
        )}
      </AnimatePresence>

      {/* Global Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="fixed bottom-4 sm:bottom-12 left-1/2 w-[calc(100%-1.5rem)] sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-zinc-900 text-white rounded-2xl shadow-2xl z-[150] flex items-center justify-center space-x-3 sm:space-x-4 border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Badge (like in screenshot) */}
      <div className="hidden sm:flex fixed bottom-6 w-full justify-center pointer-events-none z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mix-blend-difference text-white">Pure Plant Essence | 2026</p>
      </div>

      {/* Coming Soon Toast */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-auto px-6 py-3 bg-white text-black border border-black/5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl z-[100] text-center"
          >
            Stay Tuned
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
