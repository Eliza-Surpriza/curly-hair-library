const app = document.getElementById('app');

const structure = {
  type: {
    label: 'Type',
    children: {
      'Product': {
        label: 'Product',
        groups: {
          'Shampoo/Conditioner': [
            'Sulfate-free shampoo',
            'Hair mask/deep conditioner',
            'Clarifying & Detox Shampoo',
            'Hydrating Shampoo',
            'Rinse-out conditioner',
            'Leave-in conditioner',
            'Curl friendly shampoo and conditioner bars'
          ],
          'Styling Products': [
            'Mousse',
            'Curl Cream',
            'Leave-in conditioner',
            'Curl cream recipe',
            'Hair gel',
            'Homemade flax-seed hair gel recipe',
            'Heat protectant',
            'Hair Oil'
          ]
        }
      },
      'Tools': {
        label: 'Tools',
        groups: {
          'Styling': [
            'Curl defining brush',
            'detangling comb',
            'Continuous spray bottle for water',
            'Diffuser',
            'Claw clip'
          ],
          'Protecting': [
            'Satin scrunchie',
            'Silk bonnet',
            'Silk pillowcase',
            'Microfiber hair towel',
            'Towel bonnet',
            'Cotton t-shirt'
          ]
        }
      },
      'Education': {
        label: 'Education',
        groups: {
          'Instructions': [
            'Homemade flax-seed hair gel recipe',
            'Curl cream recipe',
            '"Plopping" instructions',
            'How to use a diffuser',
            'How to scrunch curls',
            'Finger styling instructions',
            'Detangling instructions',
            '"Squish to condish" method',
            'Deep conditioning guide',
            'Tips for refreshing curls',
            'Tips for curly hair cuts',
            'Chart of curl patterns'
          ],
          'Science': [
            'Explanation of curly hair science',
            'Chart of curl patterns',
            'How your hair holds moisture',
            'Guidance for scalp health',
            'Common mistakes and myths'
          ],
          'Influencers': [
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      }
    }
  },
  routine: {
    label: 'Routine',
    children: {
      'Wash': {
        label: 'Wash',
        groups: {
          'Wash': [
            'Clarifying & Detox Shampoo',
            'Sulfate-free shampoo',
            'Hydrating Shampoo',
            'Rinse-out conditioner',
            'Hair mask / Deep conditioner',
            'Leave-in conditioner',
            '"Squish to condish" method',
            'Deep conditioning guide',
            'Guidance for scalp health',
            'How your hair holds moisture',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'detangling comb',
            'Detangling instructions'
          ]
        }
      },
      'Dry': {
        label: 'Dry',
        groups: {
          'Dry': [
            'Micro-fiber hair towel',
            '"Plopping" instructions',
            'Cotton t-shirt',
            'Towel Bonnet',
            'Heat protectant',
            'Diffuser',
            'How to use a diffuser',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Chart of curl patterns'
          ]
        }
      },
      'Style': {
        label: 'Style',
        groups: {
          'Style': [
            'Curl defining brush',
            'Finger styling instructions',
            'Curl cream',
            'Mousse',
            'Hair oil',
            'Hair gel',
            'Homemade flax-seed hair gel recipe',
            'How to scrunch curls',
            'Satin scrunchies',
            'Claw clip',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      },
      'Sleep': {
        label: 'Sleep',
        groups: {
          'Sleep': [
            'Silk pillowcase',
            'Silk bonnet',
            'Satin scrunchies',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Chart of curl patterns'
          ]
        }
      },
      'Refresh': {
        label: 'Refresh',
        groups: {
          'Refresh': [
            'Tips for refreshing curls',
            'Continuous spray bottle for water',
            'Hair oil',
            'Satin scrunchies',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      }
    }
  }
};

const curlePatterns = ['1A', '2A', '3A', '4A', '1B', '2B', '3B', '4B', '1C', '2C', '3C', '4C'];

const canonicalTargetMap = {
  'flax seed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  'homemade flax-seed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  'flaxseed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  '"plopping" instructions': '"Plopping" instructions',
  'plopping instructions': '"Plopping" instructions',
  'leave in conditioner': 'Leave-in conditioner',
  'tips for curly cuts': 'Tips for curly hair cuts',
  'chart of curl patterns': 'Chart of curl patterns',
  'curl defining brush': 'Curl defining brush',
  'influencer with curly hair': 'Influencer with curly hair (personal experience)',
  'explanation of hair porosity': 'How your hair holds moisture',
  'how your hair holds moisture': 'How your hair holds moisture',
  'diffuser': 'Diffuser',
  'micro-fiber hair towel': 'Micro-fiber hair towel',
  'microfiber hair towel': 'Micro-fiber hair towel',
  'hair mask / deep conditioner': 'Hair mask / Deep conditioner',
  'hair mask/deep conditioner': 'Hair mask / Deep conditioner',
  'towel bonnet': 'Towel Bonnet',
  'homemade flaxseed hair gel recipe': 'Homemade flax-seed hair gel recipe'
};

const itemDescriptions = {
  'Sulfate-free shampoo': 'Sulfates are strong cleansers that can strip curly hair of the natural oils it needs. Sulfate-free shampoos clean gently, keeping curls softer, more defined, and less frizzy. Look for mild cleansers and focus the lather on your scalp, letting the suds rinse down your lengths.',
  'Clarifying & Detox Shampoo': 'Over time, products, hard water minerals, and oils build up and weigh curls down. A clarifying shampoo resets your hair with a deeper clean. Use it once or twice a month, then follow with a deep conditioner to restore moisture.',
  'Hydrating Shampoo': 'Hydrating shampoos cleanse while adding moisture, making them ideal for dry or thirsty curls. Ingredients like aloe, glycerin, and natural oils help hair stay soft and bouncy. They\'re a great everyday choice if regular shampoo leaves your hair feeling tight or rough.',
  'Rinse-out conditioner': 'Rinse-out conditioner is the foundation of curl care. It softens, smooths, and makes detangling much easier. Apply it generously after shampooing, work it through your lengths, then rinse. Don\'t be shy with the amount, since curls are thirsty and love extra slip!',
  'Hair mask/deep conditioner': 'Think of a hair mask as a spa treatment for your curls. Deep conditioners provide intensive moisture and repair, restoring elasticity and shine. Use one weekly or every other week, leave it on for the recommended time, and enjoy softer, stronger, bouncier hair.',
  'Hair mask / Deep conditioner': 'Think of a hair mask as a spa treatment for your curls. Deep conditioners provide intensive moisture and repair, restoring elasticity and shine. Use one weekly or every other week, leave it on for the recommended time, and enjoy softer, stronger, bouncier hair.',
  'Leave-in conditioner': 'Leave-in conditioner is lightweight moisture you don\'t rinse out. Applied to damp hair, it keeps curls hydrated, softens frizz, and creates a smooth base for your styling products. A little goes a long way, especially if your curls are fine.',
  'Curl friendly shampoo and conditioner bars': 'Shampoo and conditioner bars are a zero-waste, travel-friendly option. Many are formulated to be gentle and moisturizing for curls. Look for sulfate-free, curl-friendly formulas, and rinse thoroughly, since some bars can leave residue, especially in hard water.',
  'Mousse': 'Mousse is a lightweight styling product that adds volume and hold without weight. It\'s great for fine or loose curls that tend to fall flat. Apply it to damp hair, scrunch it in, and let it dry for bouncy, defined curls with a soft, flexible feel.',
  'Curl Cream': 'Curl cream defines curls while adding moisture and controlling frizz. Rake or smooth it through damp hair in sections. Richer creams suit thicker or coily textures, while lighter formulas work well for waves and looser curls.',
  'Curl cream': 'Curl cream defines curls while adding moisture and controlling frizz. Rake or smooth it through damp hair in sections. Richer creams suit thicker or coily textures, while lighter formulas work well for waves and looser curls.',
  'Hair gel': 'Gel is the secret to long-lasting definition. It forms a cast around each curl that holds its shape and fights frizz as it dries. Once your hair is completely dry, gently scrunch out the crunch for soft, defined curls that last for days.',
  'Heat protectant': 'Whenever you use heat, like a blow dryer or diffuser, a heat protectant is essential. It forms a barrier that reduces damage and moisture loss. Apply it to damp hair before styling to keep your curls healthy, shiny, and bouncy.',
  'Hair Oil': 'Hair oil seals in moisture and adds shine. Apply a few drops to your ends or smooth a tiny amount over dry, styled hair to calm frizz. Lightweight oils like argan or jojoba work beautifully. Use it sparingly, since too much can weigh curls down.',
  'Hair oil': 'Hair oil seals in moisture and adds shine. Apply a few drops to your ends or smooth a tiny amount over dry, styled hair to calm frizz. Lightweight oils like argan or jojoba work beautifully. Use it sparingly, since too much can weigh curls down.',
  'Curl cream recipe': 'Making your own curl cream is easy and budget-friendly. Blend a little shea butter, aloe vera gel, and a light oil like jojoba until creamy. Store it in a clean jar in the fridge, use it within a week or two, and apply a small amount to damp hair.',
  'Flaxseed hair gel recipe': 'Flaxseed gel is a natural, flexible-hold styler. Simmer about 1/4 cup of flaxseeds in 2 cups of water until it thickens, then strain it through a fine mesh or cloth while warm. Cool it, add a little aloe if you like, and refrigerate for up to two weeks.',
  'Homemade flax-seed hair gel recipe': 'Flaxseed gel is a natural, flexible-hold styler. Simmer about 1/4 cup of flaxseeds in 2 cups of water until it thickens, then strain it through a fine mesh or cloth while warm. Cool it, add a little aloe if you like, and refrigerate for up to two weeks.',
  'Curl defining brush': 'A curl defining brush uses closely set bristles to group strands into neat, shiny curl clumps. Use it on wet, product-coated hair, smoothing section by section and letting curls wrap around the bristles. It\'s perfect for boosting definition and cutting down frizz.',
  'detangling comb': 'A wide-tooth detangling comb gently works through knots without pulling curls apart. Use it on wet, conditioner-slicked hair, starting at the ends and working your way up. Going slowly in sections protects your curl pattern and reduces breakage.',
  'Continuous spray bottle for water': 'A continuous mist spray bottle gives a fine, even spray at any angle, perfect for refreshing curls or re-wetting sections while you style. It\'s gentler and more efficient than a standard sprayer. Fill it with plain water or a light leave-in mix.',
  'Diffuser': 'A diffuser attachment spreads airflow gently so your curls dry with definition rather than frizz. It adds volume and speeds up drying time. Use low heat and low speed, and let your hair set before touching it for the best results.',
  'Claw clip': 'A claw clip is a curl-friendly way to pin hair up without tugging or leaving dents. It\'s great for pineappling at night, lifting roots for volume, or keeping hair out of your face during the day. Choose a size that fits the fullness of your hair.',
  'Satin scrunchie': 'Satin scrunchies hold your hair gently without the snagging and breakage that regular elastics can cause. They\'re perfect for loose updos or pineappling your curls overnight. Choose a roomy one so it supports your curls without flattening or crushing them.',
  'Satin scrunchies': 'Satin scrunchies hold your hair gently without the snagging and breakage that regular elastics can cause. They\'re perfect for loose updos or pineappling your curls overnight. Choose a roomy one so it supports your curls without flattening or crushing them.',
  'Silk bonnet': 'A silk bonnet protects your curls while you sleep by reducing friction and helping hair hold onto moisture. You\'ll wake up with less frizz, fewer tangles, and curls that need little refreshing. Pick one with a comfortable, stretchy band that stays put overnight.',
  'Silk pillowcase': 'Silk pillowcases let your hair glide instead of catch, which means less frizz, breakage, and moisture loss overnight. They\'re a lovely alternative or companion to a bonnet. As a bonus, the smooth surface is gentle on your skin too.',
  'Microfiber hair towel': 'Microfiber hair towel absorbs water gently, helping curls stay smooth and defined. Scrunch or squeeze your hair instead of rubbing, and you\'ll cut down on drying time too.',
  'Micro-fiber hair towel': 'Microfiber hair towel absorbs water gently, helping curls stay smooth and defined. Scrunch or squeeze your hair instead of rubbing, and you\'ll cut down on drying time too.',
  'Towel bonnet': 'A towel bonnet or turban wraps your hair up, absorbing extra water hands-free while you go about your routine. It\'s gentle on curls and great for getting ready. Don\'t leave it on too long, as it can flatten your roots or press your curls.',
  'Towel Bonnet': 'A towel bonnet or turban wraps your hair up, absorbing extra water hands-free while you go about your routine. It\'s gentle on curls and great for getting ready. Don\'t leave it on too long, as it can flatten your roots or press your curls.',
  'Cotton t-shirt': 'An old cotton t-shirt is a budget-friendly alternative to a towel. Its smooth fabric absorbs water without roughing up the hair cuticle, so frizz stays down. Use it to gently scrunch out water or for plopping.',
  '"Plopping" instructions': 'Plopping helps curls set while they dry. Lay a t-shirt or microfiber towel flat, flip your product-coated hair onto it, and wrap it up like a turban. Leave it on for 10 to 20 minutes, then unwrap and air dry or diffuse.',
  'How to use a diffuser': 'Apply heat protectant and your styling products, then set your dryer to low heat and low speed. Cup sections of curls in the diffuser, hold for a few minutes, and move on to the next section. Keep your hands off until fully dry to prevent frizz.',
  'How to scrunch curls': 'Scrunching encourages curls to clump and form. After applying product, cup sections of hair from the ends upward and gently squeeze toward the scalp. Repeat all over. Once dry, scrunch out the crunch with dry hands for soft, bouncy curls.',
  'Finger styling instructions': 'Finger styling gives you precise, tailored curls. Take a small section, apply product, and wrap the strand around your finger from root to tip, then slide your finger out. Repeat across your head for defined, uniform curls.',
  'Detangling instructions': 'Always detangle when your hair is wet and loaded with conditioner. Work in small sections, starting at the ends and moving up toward the roots with your fingers or a wide-tooth comb. Be gentle and patient, since curls break easily when dry.',
  '"Squish to condish" method': 'This method helps curls soak up moisture. After adding conditioner and water, cup your hair and squish upward toward the scalp until you hear a "squelch." Repeat a few times, then rinse. It boosts hydration and encourages curl clumps.',
  'Deep conditioning guide': 'Deep condition once a week or every other week. Apply the mask to clean, damp hair in sections, cover with a shower cap, and wait 15 to 30 minutes. Gentle warmth can help the product absorb. Rinse with lukewarm or cool water.',
  'Tips for refreshing curls': 'Tips for refreshing curls: To revive curls between wash days, lightly mist them with water or a refresh spray. Scrunch in a small amount of curl cream or gel, then let your hair air dry or diffuse. Fix flat spots by gently fluffing your roots with your fingers.',
  'Tips for curly hair cuts': 'Find a stylist experienced with curls. Many cut curly hair dry to see how each curl falls, which helps avoid uneven results. Share your goals, bring photos, and ask about shaping rather than just trimming. Regular trims every few months keep curls healthy and balanced.',
  'Chart of curl patterns': 'Curl patterns range from type 1 (straight) to type 4 (coily), with the letters A to C describing the tightness within each type. This chart helps you identify your pattern and choose the right products. Remember, your head may contain more than one type!',
  'Explanation of curly hair science': 'Curly hair grows from oval-shaped follicles that make each strand twist and bend. These curves make it harder for natural scalp oils to travel down the strand, so curls tend to be drier and more fragile. That\'s why moisture matters so much.',
  'How your hair holds moisture': 'Porosity describes how well your hair absorbs and keeps moisture. Low porosity hair resists water but holds onto it, while high porosity hair absorbs quickly but loses it just as fast. Knowing yours helps you choose products and techniques that keep curls hydrated.',
  'Guidance for scalp health': 'Healthy curls start at the scalp. Cleanse regularly to remove oil and buildup, massage gently with your fingertips, and avoid heavy products near the roots. If you notice persistent itching, flaking, or irritation, it\'s a good idea to see a dermatologist.',
  'Common mistakes and myths': 'Many curly-hair myths hold people back, like "curly hair shouldn\'t be washed often" or "more product means better curls." Common mistakes include brushing dry hair, skipping conditioner, and rough towel drying. Learning what actually works makes a big difference.',
  'Curly hair stylist influencer (professional experience)': 'Learn from a pro who works with curls every day. A curly hair stylist shares expert cutting techniques, product knowledge, and styling tips drawn from years of experience with many textures. Follow along for trustworthy advice and eye-opening before-and-after transformations.',
  'Influencer with curly hair (personal experience)': 'Sometimes the best advice comes from someone who\'s been there. Curly influencers share real-life routines, product trials, and honest results. Their journeys can inspire you and remind you that every curl pattern is different, so experiment and find what works for you.',
  '1A': 'Type 1A hair is fine, soft, and completely straight, with no natural curl. It tends to be shiny and can get oily quickly. Because it struggles to hold a curl, lightweight products and styling tools help add volume and shape.',
  '1B': 'Type 1B hair is straight with a bit more body and volume than 1A. It may have a slight bend near the ends. It holds curls slightly better, though it still needs some help to keep them in place.',
  '1C': 'Type 1C hair is straight but thick and coarse, sometimes with a slight bend. It can be prone to frizz and holds styles well. Moisturizing products help keep it smooth and manageable.',
  '2A': 'Type 2A hair has loose, gentle S-shaped waves and is usually fine and flat at the roots. It\'s easily weighed down, so lightweight products like mousse and sea salt spray can boost definition and volume.',
  '2B': 'Type 2B waves form more defined S-shapes starting from the mid-lengths, with flatter roots. Frizz is common. Lightweight gels and mousses help define your waves without weighing them down.',
  '2C': 'Type 2C hair has thick, defined S-waves that start near the roots, sometimes forming loose spirals. It\'s prone to frizz. Medium-hold gels and creams work well to enhance definition and manage texture.',
  '3A': 'Type 3A hair has large, loose, springy curls, about the size of sidewalk chalk. Shiny and defined, it can be prone to frizz and flatness. Lightweight moisture and curl creams work well.',
  '3B': 'Type 3B curls are bouncy ringlets about the size of a marker. They have more volume and tend to be drier. Moisturizing creams and gels help with definition and frizz control.',
  '3C': 'Type 3C hair has tight, dense corkscrew curls, about the size of a straw or pencil. It shrinks a lot and tends to be dry, so layering rich moisture with styling products is key.',
  '4A': 'Type 4A hair forms tight, springy S-shaped coils, about the size of a crochet needle. It\'s soft and defined but delicate and prone to dryness. Regular moisture and gentle handling help it thrive.',
  '4B': 'Type 4B hair bends in sharp Z-shaped angles rather than forming defined coils. It\'s soft, fragile, and prone to shrinkage and dryness. Deep conditioning and protective styles help retain length.',
  '4C': 'Type 4C hair has the tightest coils, often with little visible definition and the most shrinkage. It\'s densely packed and delicate, so moisture, gentle detangling, and protective styling are essential.'
};

const searchTags = {
  'Sulfate-free shampoo': "sulfate free; gentle shampoo; gentle cleanser; harsh shampoo; stripped hair; hair feels dry after washing; dry curls; frizzy; frizz; soft curls; scalp; wash day; moisture; mild cleanser",
  'Clarifying & Detox Shampoo': "buildup; product buildup; residue; greasy; oily hair; weighed down; limp curls; flat curls; heavy hair; dull hair; waxy; hard water; mineral buildup; deep clean; reset; detox; curls not absorbing moisture; once a month",
  'Hydrating Shampoo': "dry hair; dry curls; thirsty curls; dehydrated; tight hair; rough hair; brittle; straw-like; moisture; hydration; aloe; glycerin; everyday shampoo; frizzy; frizz; soft curls",
  'Rinse-out conditioner': "tangly; tangles; tangled hair; knots; knotty; detangle; hard to comb; matted; rough hair; dry hair; frizz; frizzy; slip; soft hair; smooth hair; conditioner; wash day; moisture",
  'Hair mask/deep conditioner': "deep conditioner; hair mask; damaged hair; dry hair; brittle; breakage; weak hair; dull hair; no shine; limp curls; lost curl; repair; elasticity; heat damage; color damage; bleach damage; treatment; spa; moisture; stretchy hair",
  'Hair mask / Deep conditioner': "deep conditioner; hair mask; damaged hair; dry hair; brittle; breakage; weak hair; dull hair; no shine; limp curls; lost curl; repair; elasticity; heat damage; color damage; bleach damage; treatment; spa; moisture; stretchy hair",
  'Leave-in conditioner': "leave in conditioner; tangly; tangles; frizz; frizzy; dry hair; dry curls; moisture; hydration; flyaways; fine hair; lightweight; detangle; between washes; base layer; styling prep; soft hair",
  'Curl friendly shampoo and conditioner bars': "shampoo bar; conditioner bar; zero waste; eco friendly; sustainable; plastic free; travel; camping; gym; gentle; sulfate free; residue; hard water; bar soap; budget",
  'Mousse': "flat curls; flat roots; limp hair; no volume; volume; lift; bounce; fine hair; thin hair; loose curls; waves; wavy hair; lightweight; light hold; weighed down; defined waves; foam",
  'Curl Cream': "frizz; frizzy; frizzy curls; undefined curls; definition; curl clumps; moisture; dry curls; soft hold; styling cream; thick hair; coily hair; waves; define curls; smooth curls; curl enhancer",
  'Curl cream': "frizz; frizzy; frizzy curls; undefined curls; definition; curl clumps; moisture; dry curls; soft hold; styling cream; thick hair; coily hair; waves; define curls; smooth curls; curl enhancer",
  'Hair gel': "hold; strong hold; frizz; frizzy; humidity; curls fall flat; curls don't last; curls won't hold; long lasting; definition; define curls; crunchy; cast; second day curls; flyaways; shape; styling",
  'Heat protectant': "heat protectant; heat damage; blow dryer; hair dryer; diffuser; hot tools; flat iron; straightener; burnt hair; damaged hair; straw-like; breakage; dry hair; moisture loss; protect hair; shine",
  'Hair Oil': "shine; shiny curls; dull hair; frizz; frizzy; flyaways; dry ends; split ends; seal moisture; sealing; argan oil; jojoba oil; soft ends; fluffy hair; smooth curls; finishing product",
  'Hair oil': "shine; shiny curls; dull hair; frizz; frizzy; flyaways; dry ends; split ends; seal moisture; sealing; argan oil; jojoba oil; soft ends; fluffy hair; smooth curls; finishing product",
  'Curl cream recipe': "DIY; homemade; recipe; make your own; budget; cheap; natural ingredients; shea butter; aloe vera; jojoba oil; curl cream; moisture; styling; kitchen",
  'Flaxseed hair gel recipe': "DIY; homemade; recipe; make your own; flax; flaxseed; natural; vegan; budget; cheap; gel; hold; flexible hold; alternative to store bought gel; aloe; no chemicals",
  'Homemade flax-seed hair gel recipe': "DIY; homemade; recipe; make your own; flax; flaxseed; natural; vegan; budget; cheap; gel; hold; flexible hold; alternative to store bought gel; aloe; no chemicals",
  'Curl defining brush': "tangly; tangles; brushing curls; brush; curl brush; definition; undefined curls; define curls; frizz; frizzy; curl clumps; clumping; shiny curls; separate curls; styling tool; wet hair; smooth curls; curls look messy",
  'detangling comb': "tangly; tangles; tangled hair; knots; snarls; matted; hard to comb; combing hurts; pulling; ouch; breakage; hair breaks when combing; wide tooth comb; comb; wet hair; detangle; gentle",
  'Continuous spray bottle for water': "spray bottle; mist; water spray; refresh curls; revive; second day hair; day two; wet hair; re-wet; flat curls; dry curls; morning; bedhead; styling; continuous mist; fine mist",
  'Diffuser': "diffuser; blow dryer; hair dryer; drying; dry faster; frizz; frizzy; definition; volume; flat curls; heat; air dry alternative; speed up drying; low heat; set curls",
  'Claw clip': "claw clip; updo; pineapple; pineappling; sleeping; overnight; volume at roots; flat roots; hair out of face; no dents; no creases; quick hairstyle; easy hairstyle; lazy day; gentle; accessory",
  'Satin scrunchie': "scrunchie; satin; hair tie; hair elastic; snagging; breakage; hair tie damage; pulling; creases; dents; pineapple; updo; ponytail; overnight; gentle; accessory; protect curls",
  'Satin scrunchies': "scrunchie; satin; hair tie; hair elastic; snagging; breakage; hair tie damage; pulling; creases; dents; pineapple; updo; ponytail; overnight; gentle; accessory; protect curls",
  'Silk bonnet': "bonnet; silk bonnet; sleeping; overnight; night routine; bedtime; frizz in the morning; bedhead; tangles overnight; flat curls in the morning; friction; moisture; protect curls; protective",
  'Silk pillowcase': "pillowcase; silk; satin; sleeping; overnight; night routine; bedtime; frizz in the morning; bedhead; tangles overnight; friction; breakage; moisture loss; skin; bonnet alternative",
  'Microfiber hair towel': "towel; microfiber; drying; wet hair; frizz; frizzy; rough towel; towel drying; scrunch; squeeze; definition; faster drying; gentle; reduce frizz; after shower",
  'Micro-fiber hair towel': "towel; microfiber; drying; wet hair; frizz; frizzy; rough towel; towel drying; scrunch; squeeze; definition; faster drying; gentle; reduce frizz; after shower",
  'Towel bonnet': "towel turban; hair wrap; towel bonnet; drying; wet hair; hands free; getting ready; absorb water; gentle; after shower; flat roots; press curls",
  'Towel Bonnet': "towel turban; hair wrap; towel bonnet; drying; wet hair; hands free; getting ready; absorb water; gentle; after shower; flat roots; press curls",
  'Cotton t-shirt': "t-shirt; tshirt; cotton shirt; towel alternative; frizz; frizzy; budget; cheap; free; DIY; plopping; scrunch; drying; wet hair; what you already own",
  '“Plopping” instructions': "plopping; plop; t-shirt; towel; definition; define curls; frizz; frizzy; curl clumps; volume; set curls; drying; wet hair; no heat; how to; wash day; routine; curls not forming",
  'How to use a diffuser': "how to diffuse; diffuser; blow dryer; hair dryer; drying; frizz; frizzy; volume; definition; low heat; heat; hovering; how to; tutorial; steps; touching hair while drying",
  'How to scrunch curls': "scrunch; scrunching; how to scrunch; curl clumps; clumping; curls not forming; define curls; definition; frizz; crunch; gel cast; soft curls; bounce; how to; tutorial; styling",
  'Finger styling instructions': "finger styling; finger coils; finger curls; defined curls; definition; ringlets; uniform curls; even curls; curls not forming; individual curls; precise; coils; wrap hair around finger; how to; tutorial; styling; stubborn curls",
  'Detangling instructions': "detangle; detangling; how to detangle; tangly; tangles; tangled hair; knots; snarls; matted; hard to comb; breakage; pulling; ouch; hair breaks; wet hair; conditioner; wide tooth comb; fingers; how to; gentle",
  '“Squish to condish” method': "squish to condish; squish; conditioner; hydration; moisture; dry curls; curls not clumping; curl clumps; definition; frizz; frizzy; wash day; how to; technique; soak up product; squelch",
  'Deep conditioning guide': "deep conditioning; deep conditioner; hair mask; how often; weekly; dry hair; damaged hair; brittle; breakage; limp curls; moisture; hydration; shower cap; warmth; how to; guide; routine; repair",
  'Tips for refreshing curls': "refresh; refresh curls; revive curls; day two; second day; third day; between washes; non wash day; flat curls; flat spots; frizzy; frizz; bedhead; morning; old curls; limp; wake up; how to; fluff roots; tips",
  'Tips for curly hair cuts': "haircut; hair cut; trim; stylist; salon; find a stylist; split ends; uneven; shapeless; triangle shape; bad haircut; layers; shaping; dry cut; hair too long; hair growth; photos; what to ask for; how often to cut; tips",
  'Chart of curl patterns': "curl pattern; curl type; hair type; what's my curl type; identify; chart; guide; 1A; 1B; 1C; 2A; 2B; 2C; 3A; 3B; 3C; 4A; 4B; 4C; straight; wavy; curly; coily; texture; beginner; multiple curl types; products for my type",
  'Explanation of curly hair science': "curly hair science; why is my hair dry; why frizzy; why does hair curl; follicle; oval follicle; oils; scalp oil; fragile; breakage; dryness; moisture; hair structure; basics; how curls work; beginner; learn",
  'How your hair holds moisture ': "porosity; low porosity; high porosity; hair absorbs water; water; product sits on top of hair; hair dries fast; hair dries slow; won't absorb moisture; dry quickly; moisture retention; hydration; products not working; porosity test; choose products",
  'Guidance for scalp health': "scalp; scalp health; itchy; itchy scalp; itching; flaky; flakes; dandruff; dry scalp; oily roots; greasy roots; irritation; sensitive scalp; buildup; massage; dermatologist; healthy hair growth; clean scalp",
  'Common mistakes and myths': "myths; mistakes; common mistakes; beginner; getting started; tips; curls not working; why aren't my curls working; how often to wash; too much product; brushing dry hair; skip conditioner; rough drying; do's and don'ts; what not to do; misinformation",
  'Curly hair stylist influencer (professional experience)': "Styles by Sammy; stylist; hairstylist; professional; expert advice; influencer; videos; social media; cutting techniques; haircut; product recommendations; styling tips; before and after; transformation; trustworthy; follow; learn",
  'Influencer with curly hair (personal experience)': "Mo Styles; Mo; influencer; videos; social media; tutorials; hairstyles; real routines; personal experience; relatable; product reviews; honest; kind; inspiration; many hairstyles; follow; learn",
  '1A': "1A; type 1A; straight hair; fine hair; thin hair; soft hair; shiny; oily; gets greasy fast; no curl; won't hold a curl; curls fall out; volume; lightweight products; curl type",
  '1B': "1B; type 1B; straight hair; body; volume; slight bend; curls fall out; won't hold a curl; help holding curls; curl type",
  '1C': "1C; type 1C; straight hair; thick hair; coarse hair; frizz; frizzy; holds styles; moisturizing; slight bend; manageable; curl type",
  '2A': "2A; type 2A; wavy hair; waves; loose waves; S-shaped; fine hair; flat roots; flat waves; weighed down; mousse; sea salt spray; lightweight products; volume; curl type",
  '2B': "2B; type 2B; wavy hair; waves; defined waves; S-shaped; flat roots; frizz; frizzy; lightweight gel; mousse; definition; curl type",
  '2C': "2C; type 2C; wavy hair; thick waves; loose spirals; S-waves; frizz; frizzy; moisture; gel; definition; protect waves; curl type",
  '3A': "3A; type 3A; curly hair; loose curls; springy curls; big curls; shiny curls; frizz; frizzy; flat curls; lightweight moisture; curl cream; curl type",
  '3B': "3B; type 3B; curly hair; ringlets; bouncy curls; volume; dry curls; moisture; curl cream; gel; definition; frizz; frizzy; curl type",
  '3C': "3C; type 3C; curly hair; tight curls; corkscrew curls; dense curls; shrinkage; dry curls; layering products; rich moisture; styling products; curl type",
  '4A': "4A; type 4A; coily hair; coils; tight coils; springy coils; S-shaped; soft hair; defined coils; delicate; dry hair; dryness; moisture; gentle handling; curl type",
  '4B': "4B; type 4B; coily hair; coils; kinky hair; Z-shaped; Z pattern; soft hair; fragile; shrinkage; dry hair; dryness; deep conditioning; protective styles; length retention; breakage; curl type",
  '4C': "4C; type 4C; coily hair; coils; kinky hair; tightest coils; shrinkage; dry hair; dryness; dense hair; delicate; fragile; moisture; gentle detangling; protective styles; low definition; curl type"
};


const state = {
  currentView: 'home',
  navigationStack: [],
  currentCategory: null,
  currentGroup: null,
  currentRoutine: null,
  currentItem: null,
  searchQuery: '',
  fromChartPage: false
};

function findItemLocation(itemName) {
  // Search in type categories
  for (const [categoryKey, categoryData] of Object.entries(structure.type.children)) {
    for (const [groupName, items] of Object.entries(categoryData.groups)) {
      if (items.includes(itemName)) {
        return { category: categoryKey, group: groupName };
      }
    }
  }
  
  // Search in routine categories
  for (const [routineKey, routineData] of Object.entries(structure.routine.children)) {
    for (const [groupName, items] of Object.entries(routineData.groups)) {
      if (items.includes(itemName)) {
        return { routine: routineKey, group: groupName };
      }
    }
  }
  
  // Check if it's a curl pattern
  if (curlePatterns.includes(itemName)) {
    return { isCurlPattern: true };
  }
  
  return null;
}

function renderNavigation() {
  const navHtml = `
    <div class="mode-controls">
      <div class="quick-browse-label">* quick browse *</div>
      <div class="nav-category-group">
        <div class="nav-category">
          <button class="mode-toggle" data-category="products">products</button>
          <div class="dropdown-menu" id="products-dropdown">
            <div class="dropdown-item" data-category="Product" data-group="Shampoo/Conditioner">Shampoo / Conditioner</div>
            <div class="dropdown-item" data-category="Product" data-group="Styling Products">Styling Products</div>
          </div>
        </div>
        <div class="nav-category">
          <button class="mode-toggle" data-category="tools">tools</button>
          <div class="dropdown-menu" id="tools-dropdown">
            <div class="dropdown-item" data-category="Tools" data-group="Styling">Styling</div>
            <div class="dropdown-item" data-category="Tools" data-group="Protecting">Protecting</div>
          </div>
        </div>
        <div class="nav-category">
          <button class="mode-toggle" data-category="education">education</button>
          <div class="dropdown-menu" id="education-dropdown">
            <div class="dropdown-item" data-category="Education" data-group="Instructions">Instructions</div>
            <div class="dropdown-item" data-category="Education" data-group="Science">Science</div>
            <div class="dropdown-item" data-category="Education" data-group="Influencers">Influencers</div>
          </div>
        </div>
      </div>
      <div class="search-container">
        <input type="text" class="search-bar" id="search-input" placeholder="search" />
        <svg class="search-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
          <line x1="14" y1="14" x2="20" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  `;
  
  return navHtml;
}

function renderHome() {
  const routines = Object.keys(structure.routine.children);
  const routinesHtml = routines
    .map((routine, index) => `
      <div class="routine-card" data-routine="${routine}">
        ${routine}
      </div>
      ${index < routines.length - 1 ? `
        <img class="routine-arrow" src="mockup_images/Arrow.png" alt="arrow" />
      ` : ''}
    `)
    .join('');

  const curlCardsHtml = curlePatterns
    .map(pattern => `
      <div class="curl-card" data-curl-pattern="${pattern}">
        <span class="curl-label">${pattern}</span>
        <img src="curlArt/${pattern}.png" alt="${pattern}" class="curl-art" />
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    <p class="routine-label">* find help at every step of the routine *</p>
    <div class="routine-grid">
      ${routinesHtml}
    </div>
    <div class="squiggle-divider"></div>
    <p class="curl-section-label">* get to know your unique curls *</p>
    <div class="item-grid">
      ${curlCardsHtml}
    </div>
  `;
}

function renderCategoryPage(category, group) {
  const categoryData = structure.type.children[category];
  if (!categoryData || !categoryData.groups[group]) {
    return renderHome();
  }

  const items = categoryData.groups[group];
  const itemsHtml = items
    .map(item => `
      <div class="item-card" data-item='${item}'>
        ${item}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    ${renderBreadcrumb(['home', category, group])}
    <h1 class="page-title">${group}</h1>
    <div class="item-grid">
      ${itemsHtml}
    </div>
  `;
}

function renderRoutinePage(routine) {
  const routineData = structure.routine.children[routine];
  if (!routineData) {
    return renderHome();
  }

  const items = routineData.groups[routine] || [];
  const itemsHtml = items
    .map(item => `
      <div class="item-card" data-item='${item}'>
        ${item}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    ${renderBreadcrumb(['home', routine])}
    <h1 class="page-title">${routine}</h1>
    <div class="item-grid">
      ${itemsHtml}
    </div>
  `;
}

function renderChartPage() {
  // Build breadcrumb based on where user came from
  let breadcrumbPath = ['home', 'chart of curl patterns'];
  
  // If we have category and group context, use it
  if (state.currentCategory && state.currentGroup) {
    breadcrumbPath = ['home', state.currentCategory, state.currentGroup, 'chart of curl patterns'];
  } else if (state.currentRoutine) {
    breadcrumbPath = ['home', state.currentRoutine, 'chart of curl patterns'];
  }
  
  const curlCardsHtml = curlePatterns
    .map(pattern => `
      <div class="curl-card" data-curl-pattern="${pattern}">
        <span class="curl-label">${pattern}</span>
        <img src="curlArt/${pattern}.png" alt="${pattern}" class="curl-art" />
      </div>
    `)
    .join('');

  const description = itemDescriptions['Chart of curl patterns'] || 'Curl patterns range from type 1 (straight) to type 4 (coily), with the letters A to C describing the tightness within each type.';
  
  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    ${renderBreadcrumb(breadcrumbPath)}
    <h1 class="page-title">* chart of curl types *</h1>
    <div class="detail-box">
      <p>
        ${description}
      </p>
    </div>
    <div class="item-grid curl-chart-grid">
      ${curlCardsHtml}
    </div>
  `;
}

function renderDetailPage(itemName) {
  // Special handling for Chart of curl patterns
  if (itemName === 'Chart of curl patterns') {
    return renderChartPage();
  }
  
  // Build breadcrumb from navigation state - shows the path the user took
  let breadcrumbPath = ['home', itemName];
  
  // Special handling for curl patterns coming from the chart page
  if (state.fromChartPage && isCurlPattern(itemName)) {
    breadcrumbPath = ['home', 'instructions', 'curl chart', itemName];
  }
  // If we have category and group context (from navigation), use it
  else if (state.currentCategory && state.currentGroup) {
    breadcrumbPath = ['home', state.currentCategory, state.currentGroup, itemName];
  } else if (state.currentRoutine) {
    // For routine items
    breadcrumbPath = ['home', state.currentRoutine, itemName];
  }
  
  // Check if itemName is a curl pattern
  const isCurl = isCurlPattern(itemName);
  const displayName = isCurl ? itemName.toUpperCase() : itemName;
  
  // Get description from itemDescriptions object
  const description = itemDescriptions[itemName] || `Learn more about ${displayName}.`;
  
  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    ${renderBreadcrumb(breadcrumbPath)}
    <h1 class="page-title" ${isCurl ? 'data-curl-pattern="true"' : ''}>${displayName}</h1>
    <div class="detail-box">
      <p>
        ${description}
      </p>
    </div>
  `;
}

function isCurlPattern(name) {
  return /^[1-4][A-C]$/.test(name);
}

// Levenshtein distance for fuzzy matching (typo tolerance)
function getLevenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

// Fuzzy search with typo tolerance
function fuzzyMatch(query, text) {
  const maxDistance = Math.max(1, Math.floor(query.length / 3)); // Allow ~1/3 typos
  return getLevenshteinDistance(query.toLowerCase(), text.toLowerCase()) <= maxDistance;
}

// Search through all items
function searchItems(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = [];
  const queryLower = query.toLowerCase();
  
  // Extract keywords from query - split by spaces and filter out only very common connector words
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'is', 'are', 'am', 'be', 'to', 'for', 'of', 'in', 'on', 'at', 'by', 'from', 'with', 'should', 'could', 'would', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'will', 'if', 'that', 'this', 'it', 'as']);
  const queryKeywords = queryLower
    .split(/[\s,\.!?;:]+/)
    .filter(word => word.length > 2 && !commonWords.has(word));

  // Helper function to find category and group for an item
  function findItemLocation(itemName) {
    for (const [categoryName, categoryData] of Object.entries(structure.type.children)) {
      if (categoryData.groups) {
        for (const [groupName, items] of Object.entries(categoryData.groups)) {
          if (items.includes(itemName)) {
            return { category: categoryName, group: groupName };
          }
        }
      }
    }
    return null;
  }

  // Search in all items
  for (const [categoryName, categoryData] of Object.entries(structure.type.children)) {
    if (categoryData.groups) {
      for (const [groupName, items] of Object.entries(categoryData.groups)) {
        for (const item of items) {
          let score = 0;
          const itemLower = item.toLowerCase();
          
          // Exact match: highest score
          if (itemLower === queryLower) {
            score = 1000;
          }
          // Contains match: high score
          else if (itemLower.includes(queryLower)) {
            score = 500;
          }
          // Fuzzy match: medium score
          else if (fuzzyMatch(query, item)) {
            score = 250;
          }
          // Check description
          else if (itemDescriptions[item] && itemDescriptions[item].toLowerCase().includes(queryLower)) {
            score = 200;
          }
          
          // Check search tags - split by semicolon and check each tag
          if (score === 0 && searchTags[item]) {
            const tags = searchTags[item].split(';').map(tag => tag.trim().toLowerCase());
            
            // Check each extracted keyword against tags
            for (const keyword of queryKeywords) {
              for (const tag of tags) {
                if (tag === keyword) {
                  score = Math.max(score, 450); // Exact tag match - high score
                } else if (tag.includes(keyword)) {
                  score = Math.max(score, 350); // Partial tag match
                } else if (fuzzyMatch(keyword, tag)) {
                  score = Math.max(score, 300); // Fuzzy tag match
                }
              }
            }
            
            // Also check if full query matches any tag
            for (const tag of tags) {
              if (tag === queryLower) {
                score = Math.max(score, 450); // Exact tag match
                break;
              } else if (tag.includes(queryLower)) {
                score = Math.max(score, 350);
              } else if (fuzzyMatch(query, tag)) {
                score = Math.max(score, 300);
              }
            }
          }
          
          // Fuzzy match in category/group names
          if (score === 0 && (fuzzyMatch(query, categoryName) || fuzzyMatch(query, groupName))) {
            score = 100;
          }

          if (score > 0) {
            results.push({
              name: item,
              category: categoryName,
              group: groupName,
              score: score
            });
          }
        }
      }
    }
  }

  // Sort by score (relevance)
  results.sort((a, b) => b.score - a.score);
  
  // Remove duplicates (same item name)
  const seen = new Set();
  return results.filter(result => {
    if (seen.has(result.name)) return false;
    seen.add(result.name);
    return true;
  });
}

function renderSearchResults(query) {
  const results = searchItems(query);
  
  let resultsHtml = '';
  
  if (results.length === 0) {
    resultsHtml = `
      <div class="no-results">
        <p>No results found for "${query}"</p>
        <p>Try searching for different keywords or browse the categories above.</p>
      </div>
    `;
  } else {
    resultsHtml = results
      .map(result => `
        <div class="item-card" data-item="${result.name}">
          ${result.name}
        </div>
      `)
      .join('');
  }

  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    <div class="search-results-header">
      <h2>Search Results for "${query}"</h2>
      <p>${results.length} result${results.length !== 1 ? 's' : ''} found</p>
    </div>
    <div class="item-grid">
      ${resultsHtml}
    </div>
  `;
}

function renderBreadcrumb(path) {
  const breadcrumbItems = path.map((item, index) => {
    if (index === 0) {
      return `<a class="breadcrumb-link" href="#" data-breadcrumb="home">home</a>`;
    }
    // For category names, use exact case
    if (item === 'Product' || item === 'Tools' || item === 'Education') {
      return `<a class="breadcrumb-link" href="#" data-breadcrumb="${item}">${item.toLowerCase()}</a>`;
    }
    // For curl patterns, keep uppercase
    if (isCurlPattern(item)) {
      return `<a class="breadcrumb-link" href="#" data-breadcrumb="${item}">${item.toUpperCase()}</a>`;
    }
    // For group and item names, use lowercase
    return `<a class="breadcrumb-link" href="#" data-breadcrumb="${item}">${item.toLowerCase()}</a>`;
  }).join('<span class="breadcrumb-separator"> / </span>');

  return `<div class="breadcrumb">${breadcrumbItems}</div>`;
}

function renderCategoryGroupPage(category) {
  const categoryData = structure.type.children[category];
  if (!categoryData) {
    return renderHome();
  }

  const groupsHtml = Object.keys(categoryData.groups)
    .map(groupName => `
      <div class="item-card" data-group-category="${category}" data-group-name="${groupName}">
        ${groupName}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    <div class="squiggle-divider"></div>
    ${renderBreadcrumb(['home', category])}
    <h1 class="page-title">${category}</h1>
    <div class="item-grid">
      ${groupsHtml}
    </div>
  `;
}

function render() {
  let content = '';

  if (state.currentView === 'home') {
    content = renderHome();
  } else if (state.currentView === 'search') {
    content = renderSearchResults(state.searchQuery);
  } else if (state.currentView === 'categoryGroup') {
    content = renderCategoryGroupPage(state.currentCategory);
  } else if (state.currentView === 'category') {
    content = renderCategoryPage(state.currentCategory, state.currentGroup);
  } else if (state.currentView === 'routine') {
    content = renderRoutinePage(state.currentRoutine);
  } else if (state.currentView === 'detail') {
    content = renderDetailPage(state.currentItem);
  }

  app.innerHTML = content;
  attachEventListeners();
}

function attachEventListeners() {
  // Navigation category buttons - navigate to category page on click
  document.querySelectorAll('.mode-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      // Map category names to proper case for navigation
      const categoryMap = {
        'products': 'Product',
        'tools': 'Tools',
        'education': 'Education'
      };
      const mappedCategory = categoryMap[category];
      if (mappedCategory) {
        state.currentView = 'categoryGroup';
        state.currentCategory = mappedCategory;
        render();
      }
    });
  });

  // Navigation category buttons - show dropdown on hover
  document.querySelectorAll('.nav-category').forEach(category => {
    const dropdown = category.querySelector('.dropdown-menu');
    
    category.addEventListener('mouseenter', () => {
      dropdown.classList.add('active');
    });
    
    category.addEventListener('mouseleave', () => {
      dropdown.classList.remove('active');
    });
  });

  // Dropdown items
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const group = item.dataset.group;
      state.currentView = 'category';
      state.currentCategory = category;
      state.currentGroup = group;
      render();
    });
  });

  // Routine cards
  document.querySelectorAll('.routine-card').forEach(card => {
    card.addEventListener('click', () => {
      const routine = card.dataset.routine;
      state.currentView = 'routine';
      state.currentRoutine = routine;
      render();
    });
  });

  // Category group cards (show groups within a category)
  document.querySelectorAll('[data-group-category]').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.groupCategory;
      const group = card.dataset.groupName;
      state.currentView = 'category';
      state.currentCategory = category;
      state.currentGroup = group;
      render();
    });
  });

  // Item cards
  document.querySelectorAll('.item-card:not([data-group-category])').forEach(card => {
    card.addEventListener('click', () => {
      const item = card.dataset.item;
      state.currentView = 'detail';
      state.currentItem = item;
      // Keep currentCategory and currentGroup from previous navigation
      render();
    });
  });

  // Curl pattern cards
  document.querySelectorAll('.curl-card').forEach(card => {
    card.addEventListener('click', () => {
      const pattern = card.dataset.curlPattern;
      // Check if we're currently viewing the chart page
      if (state.currentItem === 'Chart of curl patterns') {
        state.fromChartPage = true;
      } else {
        state.fromChartPage = false;
      }
      state.currentView = 'detail';
      state.currentItem = pattern;
      render();
    });
  });

  // Breadcrumb links
  document.querySelectorAll('.breadcrumb-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.breadcrumb;
      // Reset fromChartPage flag when navigating via breadcrumb
      state.fromChartPage = false;
      
      if (target === 'home') {
        state.currentView = 'home';
        state.currentCategory = null;
        state.currentGroup = null;
        state.currentRoutine = null;
      } else if (target === 'Product' || target === 'Tools' || target === 'Education') {
        state.currentView = 'categoryGroup';
        state.currentCategory = target;
        state.currentGroup = null;
      } else if (target === 'instructions' || target === 'curl chart') {
        // Handle special chart page breadcrumb links
        if (target === 'curl chart') {
          state.currentView = 'detail';
          state.currentItem = 'Chart of curl patterns';
          state.currentCategory = 'Education';
          state.currentGroup = 'Instructions';
        }
      } else if (structure.routine.children[target]) {
        // Check if target is a routine name (Wash, Dry, Style, Sleep, Refresh)
        state.currentView = 'routine';
        state.currentRoutine = target;
        state.currentCategory = null;
        state.currentGroup = null;
      } else if (state.currentCategory) {
        // Check if target is a group name
        const categoryData = structure.type.children[state.currentCategory];
        if (categoryData && categoryData.groups[target]) {
          state.currentView = 'category';
          state.currentGroup = target;
        }
      }
      render();
    });
  });

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchContainer = document.querySelector('.search-container');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchContainer.classList.add('active');
    });
    
    searchInput.addEventListener('blur', () => {
      searchContainer.classList.remove('active');
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length > 0) {
          state.currentView = 'search';
          state.searchQuery = query;
          render();
        }
      }
    });
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      state.searchQuery = query;
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-category]') && !e.target.closest('.dropdown-menu')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });
}

// Initialize
render();

