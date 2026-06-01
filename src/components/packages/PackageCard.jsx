import React, { useState } from 'react';
import { ShoppingCart, Gift, Plus, Trash2, Sparkles } from 'lucide-react';
import { atorsData } from '../../data/ators';

export default function PackageCard({ pkg, onAddToCart }) {
  const [selectedAtors, setSelectedAtors] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('');

  const handleAddAtor = () => {
    if (!currentSelection) return;
    
    if (selectedAtors.length >= 5) {
      alert('Maximum of 5 ators can be added to this package.');
      return;
    }

    const selectedObject = atorsData.find(ator => ator.name === currentSelection);
    if (selectedObject) {
      setSelectedAtors([...selectedAtors, selectedObject.name]);
      setCurrentSelection(''); 
    }
  };

  const handleRemoveAtor = (indexToRemove) => {
    setSelectedAtors(selectedAtors.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCartClick = () => {
    if (pkg.isCustom && selectedAtors.length < 5) {
      alert(`Please select 5 fragrances to complete your custom set. (Selected: ${selectedAtors.length}/5)`);
      return;
    }

    const finalItems = pkg.isCustom ? selectedAtors : pkg.items;
    onAddToCart({
      ...pkg,
      finalPrice: pkg.price,
      selectedCustomItems: finalItems 
    });

    if (pkg.isCustom) {
      setSelectedAtors([]);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      
      {/* Package Image Banner */}
      <div className="h-52 bg-brand-light relative overflow-hidden shrink-0">
         {pkg.image ? (
           <img 
             src={pkg.image} 
             alt={pkg.name} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
           />
         ) : (
           <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif tracking-wider bg-gray-50">
             [ Presentation Box ]
           </div>
         )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
        
        <div className="space-y-4">
          {/* Title & Pricing Grid */}
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg font-bold text-brand-dark tracking-wide leading-tight">{pkg.name}</h3>
              <p className="font-sans text-[11px] uppercase tracking-widest text-brand-accent/80 font-semibold">Luxury Set</p>
            </div>
            <span className="font-sans text-sm font-bold text-brand-primary bg-brand-light/40 px-2.5 py-1 rounded-md border border-brand-primary/5 shrink-0">
              {pkg.price} BDT
            </span>
          </div>
          
          {/* Free Tasbih Premium Badge */}
          {pkg.gift && (
            <div className="flex items-center space-x-1.5 bg-emerald-50/60 text-emerald-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg w-fit border border-emerald-100/50 shadow-3xs">
              <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="tracking-wide">Complimentary Premium Tasbih Included</span>
            </div>
          )}

          {/* Interactive Selection Zone */}
          <div className="pt-1">
            {pkg.isCustom ? (
              <div className="space-y-3">
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-accent shrink-0" />
                  Curate your signature box. Select exactly 5 premium ators below:
                </p>
                
                {/* Modern Custom Dropdown Bar */}
                <div className="flex gap-2">
                  <select
                    value={currentSelection}
                    onChange={(e) => setCurrentSelection(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200/80 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/5 focus:bg-white transition-all font-sans font-medium text-brand-dark cursor-pointer appearance-none shadow-3xs"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '14px'
                    }}
                  >
                    <option value="">Choose a Fragrance...</option>
                    {atorsData.map((ator) => (
                      <option key={ator.id} value={ator.name}>
                        {ator.name} — {ator.type}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    type="button"
                    onClick={handleAddAtor}
                    className="bg-brand-primary hover:bg-brand-dark text-white px-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-3xs active:scale-95 shrink-0"
                    title="Add Fragrance"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Selected Showcase Vault */}
                <div className="bg-gray-50/40 p-3 rounded-xl border border-gray-100 space-y-2 shadow-3xs">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-gray-400 font-sans">
                    <span>Selected Fragrances</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${selectedAtors.length === 5 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-brand-light text-brand-accent border border-gray-100"}`}>
                      {selectedAtors.length} / 5 Slots Filled
                    </span>
                  </div>
                  
                  {selectedAtors.length === 0 ? (
                    <p className="text-[11px] text-gray-400 font-sans text-center py-3 italic bg-white/50 rounded-lg border border-dashed border-gray-200/60">
                      No fragrances added to your box yet
                    </p>
                  ) : (
                    <ul className="text-[11px] text-brand-dark font-sans space-y-1 max-h-32 overflow-y-auto pr-1">
                      {selectedAtors.map((item, i) => (
                        <li key={i} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-gray-100 shadow-3xs">
                          <span className="font-semibold text-gray-700 truncate mr-2">
                            <span className="text-brand-accent/60 mr-1 font-mono">0{i + 1}.</span> {item}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveAtor(i)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              /* Fixed Lists for Regular/Premium Sets */
              <ul className="text-xs text-gray-600 font-sans space-y-2 bg-gray-50/30 p-3 rounded-xl border border-gray-100/50">
                {pkg.items && pkg.items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0"></span>
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Call to Action Button */}
        <div className="pt-2">
          <button
            onClick={handleCartClick}
            disabled={pkg.isCustom && selectedAtors.length !== 5}
            className={`w-full font-sans text-[11px] uppercase tracking-widest font-bold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs ${
              pkg.isCustom && selectedAtors.length !== 5 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-brand-primary hover:bg-brand-dark text-white active:translate-y-px'
            }`}
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>
              {pkg.isCustom && selectedAtors.length < 5 
                ? `Fill ${5 - selectedAtors.length} more slot${5 - selectedAtors.length > 1 ? 's' : ''}` 
                : 'Add Collection to Cart'
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}