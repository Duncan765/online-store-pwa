# Design Guidelines: Online Store PWA

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern e-commerce leaders (Shopify, Vercel's commerce templates, and contemporary DTC brands) with emphasis on clean product presentation, trustworthy aesthetics, and seamless mobile-first experience.

## Core Design Principles
1. **Product-First Visual Hierarchy** - Products are heroes; let imagery breathe
2. **Frictionless Commerce** - Clear CTAs, minimal steps to purchase
3. **Trust & Credibility** - Professional polish, social proof, secure feeling
4. **Progressive Enhancement** - PWA capabilities enhance, not replace core experience

---

## Typography System

### Font Families
- **Primary (UI/Body)**: Inter or 'DM Sans' via Google Fonts - clean, modern sans-serif for excellent readability
- **Display (Headers)**: Same font family with varying weights for visual consistency
- **Accent (Optional)**: For pricing or special callouts, use tabular numerals

### Type Scale
- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- **Section Headers**: text-3xl md:text-4xl, font-bold
- **Product Titles**: text-xl md:text-2xl, font-semibold
- **Subsections**: text-lg md:text-xl, font-medium
- **Body Text**: text-base, font-normal, leading-relaxed
- **Captions/Meta**: text-sm, font-medium
- **Micro-copy**: text-xs, tracking-wide, uppercase for labels

---

## Layout System

### Spacing Units (Tailwind)
**Consistent rhythm using**: 4, 6, 8, 12, 16, 20, 24, 32 units
- Tight spacing: p-4, gap-4
- Standard sections: py-12 md:py-20, px-6 md:px-8
- Generous hero sections: py-16 md:py-24 lg:py-32
- Component spacing: space-y-6 to space-y-8

### Grid System
- **Product Grids**: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- **Featured Collections**: grid-cols-1 md:grid-cols-2 (large product cards)
- **Blog Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Container widths**: max-w-7xl for main content, max-w-6xl for focused sections

### Responsive Breakpoints Strategy
- Mobile-first always
- Product cards: single column mobile → 2-col tablet → 3-4 col desktop
- Navigation: hamburger menu mobile → full horizontal desktop
- Hero: vertical stack mobile → horizontal split desktop

---

## Component Library

### Navigation
**Desktop**: Horizontal nav with logo left, primary links center, search + cart + account right
**Mobile**: Sticky header with logo center, hamburger left, cart icon right
- Transparent header on hero, solid background on scroll
- Search bar: expandable on click, full-width mobile overlay
- Cart indicator: badge with item count
- Categories: mega-menu dropdown (desktop) or accordion (mobile)

### Hero Section
**Large Hero Image Required**: Full-width, high-quality lifestyle product photography
- Image: Compelling product-in-use or styled flat-lay
- Overlay: Subtle gradient (dark to transparent) for text legibility
- Content placement: Left-aligned or centered text overlay on image
- CTA buttons: Blurred background (backdrop-blur-sm bg-white/20), white text with strong contrast
- Height: h-[600px] md:h-[700px] lg:h-[80vh]
- Content: Headline + subheadline + 2 CTAs (primary "Shop Now" + secondary "Learn More")

### Product Cards
- **Image**: Aspect ratio 3:4 or 1:1, object-cover, rounded-lg, hover:scale-105 transition
- **Structure**: Image → Title → Price → Quick actions (heart icon for wishlist, "Add to Cart" button)
- **Price display**: Bold, prominent, with original price crossed out if on sale
- **Badge overlays**: "New", "Sale", "-20%", positioned top-right on image
- **Spacing**: p-4, gap-3 within card content

### Product Detail Page
- **Layout**: Two-column grid (md:grid-cols-2) - Image gallery left, product info right
- **Gallery**: Main image + thumbnail strip below, zoom on hover
- **Info section**: Title → Price → Rating/reviews → Description → Quantity selector → Add to Cart → Product details accordion
- **Trust elements**: Shipping info, return policy, secure checkout badges below CTA

### Category/Collection Pages
- **Filter sidebar** (desktop) or drawer (mobile): Categories, price range, colors, sizes
- **Sorting**: Dropdown for "Featured", "Price: Low to High", "Newest", etc.
- **Breadcrumbs**: Above product grid for navigation context
- **Results count**: "Showing 24 of 156 products"

### Blog Components
- **Blog card**: Featured image (16:9) → Category label → Title → Excerpt → Read time + author
- **Blog post layout**: Hero image → Content (max-w-3xl, prose-lg) → Author bio → Related posts
- **Typography**: Generous line-height (leading-loose), larger font for readability

### Cart/Checkout
- **Mini cart**: Slide-out panel from right with item list + subtotal + "View Cart" + "Checkout" CTAs
- **Cart page**: Product thumbnail + details + quantity selector + remove → Subtotal + shipping estimate → Proceed to Checkout
- **Checkout**: Multi-step or single-page with clear progress indicator, mobile-optimized form fields

### Footer
**Rich footer layout**:
- **Column 1**: Brand logo + short description + social media icons
- **Column 2-4**: Quick Links (Shop, About, Support) + Newsletter signup (inline form: email input + submit button)
- **Bottom bar**: Copyright, payment method icons, security badges, terms/privacy links

### Forms & Inputs
- **Input fields**: rounded-md, border-2, focus:ring-2 focus:ring-offset-2, p-3
- **Labels**: text-sm font-medium, mb-2
- **Buttons**: rounded-md, py-3 px-6, font-semibold, transition-all
- **Primary button**: Full saturation, hover:shadow-lg
- **Secondary button**: Outline style, transparent bg, border-2

### Interactive Elements
- **Add to Cart**: Button transforms to checkmark on success with micro-animation
- **Wishlist toggle**: Heart icon, outline → filled on click
- **Image zoom**: Magnifying glass cursor, click for modal view
- **Quantity selector**: Minus/Plus buttons with centered number input
- **Loading states**: Skeleton loaders for product grids, spinner for actions

---

## Images Strategy

### Required Images
1. **Hero Section**: Large, high-res lifestyle product photo (e.g., styled workspace, person using product, beautiful flat-lay) - 1920x1080 minimum
2. **Product Images**: Clean white background or lifestyle contexts, minimum 1200x1600
3. **Collection Banners**: Category-specific imagery for "New Arrivals", "Best Sellers", etc.
4. **About/Trust Section**: Team photo, warehouse/studio shot, or process imagery
5. **Blog Featured Images**: 16:9 format, relevant to article topic

### Image Treatment
- Consistent editing style (color grading, brightness)
- Product images: zoom capability, multiple angles
- Use lazy loading for performance
- WebP format with fallbacks for PWA optimization

---

## Page-Specific Layouts

### Homepage
1. **Hero**: Large image with overlaid CTA
2. **Featured Products**: 4-column grid showcasing best sellers
3. **Collection Highlights**: 2-column split with large imagery + "Shop Category" CTA
4. **Trust/Social Proof**: Centered stats (e.g., "10,000+ Happy Customers", "4.8★ Average Rating") with testimonial carousel below
5. **Newsletter**: Full-width section with background image, centered signup form
6. **Instagram Feed**: 6-image grid linking to social

### Shop/Products Page
- Breadcrumbs → Page title → Filter/Sort bar → Product grid (responsive columns) → Pagination

### Blog Index
- Featured post (large card) → Grid of recent posts (3-column) → Load more button

---

## Mobile-First Considerations
- **Touch targets**: Minimum 44x44px for all interactive elements
- **Navigation**: Bottom tab bar optional for key actions (Home, Search, Cart, Account)
- **Product images**: Swipeable galleries, pinch-to-zoom
- **Forms**: Large inputs, clear labels, autofocus on relevant fields
- **PWA features**: Add to home screen prompt, offline product browsing, push notifications for order updates

---

## Accessibility & Polish
- High contrast ratios (WCAG AA minimum)
- Focus states: visible outline with appropriate offset
- Alt text for all product images
- ARIA labels for icon-only buttons
- Keyboard navigation support throughout
- Loading states prevent layout shift

This design creates a premium, trustworthy e-commerce experience that prioritizes product discovery, seamless mobile shopping, and conversion optimization while maintaining the performance benefits of a PWA.