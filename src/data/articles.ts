export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  images?: ArticleImage[];
  code?: {
    filename: string;
    language: string;
    snippet: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category:
    | 'Next.js Platforms'
    | 'E-Commerce & F&B'
    | 'Hospitality & Web'
    | 'Full-Stack & DevOps'
    | 'Video & AI Systems'
    | 'Mobile Architecture';
  publishedAt: string;
  publishedIso: string;
  readTime: string;
  featured: boolean;
  accent: string;
  liveUrl?: string;
  liveDomain?: string;
  repoName?: string;
  repoUrl?: string;
  heroImage?: ArticleImage;
  tags: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
}

export const ARTICLE_CATEGORIES = [
  'All',
  'Next.js Platforms',
  'E-Commerce & F&B',
  'Hospitality & Web',
  'Full-Stack & DevOps',
  'Video & AI Systems',
  'Mobile Architecture',
] as const;

export const ARTICLES: Article[] = [
  {
    slug: 'building-veyronix-shopify-pickup-and-local-delivery-app',
    title: 'Building Veyronix: A Local Delivery & Store Pickup Scheduling App for the Shopify App Store',
    subtitle:
      'Why native Shopify local delivery falls short for bakeries, florists, and multi-outlet retailers—and how I built Veyronix with Online Store 2.0 cart drawer embeds, server-side Checkout Functions, and one-click kitchen prep sheets.',
    excerpt:
      'Inside the product and engineering design of Veyronix, an upcoming Shopify App Store application that lets shoppers pick exact delivery dates and 15-minute pickup slots right in the cart while protecting checkout on Shopify’s servers.',
    category: 'E-Commerce & F&B',
    publishedAt: '28 Nov 2026',
    publishedIso: '2026-11-28',
    readTime: '9 min read',
    featured: true,
    accent: '#0557FA',
    liveUrl: 'https://veyronix-landing.vercel.app/',
    liveDomain: 'veyronix-landing.vercel.app',
    heroImage: {
      src: '/articles/veyronix/screen-dashboard.png',
      alt: 'Veyronix embedded dashboard inside Shopify Admin showing scheduled orders, revenue, delivery vs pickup split, and storefront widget status',
      caption:
        'Veyronix running natively inside Shopify Admin — tracking 7-day scheduled order volume, Delivery vs. Store Pickup split, and live storefront/checkout extension status across multiple outlets.',
    },
    tags: [
      'Shopify App',
      'Shopify Functions',
      'Online Store 2.0',
      'PostgreSQL (Neon)',
      'Local Delivery',
      'Store Pickup',
    ],
    keyTakeaways: [
      'Mounts directly inside both standard Cart pages and slide-out AJAX Cart Drawers via Shopify Online Store 2.0 App Embeds—requiring zero Liquid theme edits from merchants.',
      'Uses server-side Shopify Cart & Checkout Validation Functions and Delivery Customization Functions so customers cannot bypass date/time selection or minimum order thresholds on any Shopify plan.',
      'Connects storefront slot selection to daily store operations with 6-digit postal code prefix filtering, real-time slot capacity limits in Neon PostgreSQL, automatic order tagging, and printable Kitchen Prep Sheets.',
    ],
    sections: [
      {
        heading: 'Why I Started Building Veyronix',
        paragraphs: [
          'After building custom Shopify storefronts for food, catering, and retail businesses in Singapore, I kept running into the exact same operational headache. Shopify’s built-in Local Delivery and Local Pickup settings work fine if you sell t-shirts or dry goods that can arrive "sometime in the next two business days." They break down almost immediately when you sell sourdough bread, fresh flower bouquets, chilled butcher cuts, or festive hampers.',
          'When customers buy perishable food or gifts, timing is part of the product itself. A shopper ordering pastry boxes for a noon office meeting needs to know whether the 12:00 PM – 12:15 PM window is still open before paying. Meanwhile, the merchant needs hard guardrails: someone ordering at 11:15 PM cannot expect a freshly baked cake at 8:30 AM the next morning, vans cannot deliver single $12 orders to distant postal zones at a loss, and a small counter team cannot handle twenty walk-in pickups arriving at the exact same minute.',
          'Without a proper scheduling layer, store owners end up spending hours on WhatsApp and email chasing customers after checkout just to confirm delivery dates. Existing plugins on the market often force merchants to edit fragile Liquid theme files, break inside modern slide-out cart drawers, or rely purely on browser JavaScript that shoppers accidentally skip with express checkout buttons. I started building Veyronix—currently preparing for listing on the Shopify App Store—to solve those exact gaps cleanly in one native app.',
        ],
        images: [
          {
            src: '/articles/veyronix/screen-theme-editor.png',
            alt: 'Shopify Theme Editor showing Veyronix Drawer Embed toggled on with live slide-out cart drawer preview',
            caption:
              'Merchants enable Veyronix in Shopify’s Theme Editor with a single toggle. The scheduler mounts cleanly inside slide-out Cart Drawers and standard Cart pages with postal code checks and free-delivery progress hints.',
          },
        ],
      },
      {
        heading: 'No-Code Cart Drawer Integration & Real-Time Postal Checks',
        paragraphs: [
          'Most modern Shopify themes—starting with Dawn and extending across popular commercial themes—no longer send shoppers to a dedicated /cart page by default. Instead, clicking "Add to cart" opens a slide-out cart drawer. A huge source of support tickets for merchants is installing a delivery date app only to discover it requires a developer to paste custom snippets into main-cart-items.liquid or hook into theme-specific AJAX events.',
          'Veyronix is built on Shopify Online Store 2.0 Theme App Extensions with two drop-in targets: a Cart Delivery Block for classic cart pages and a lightweight App Embed designed specifically for slide-out drawers. Once toggled on in the Theme Editor, Veyronix observes cart mutations automatically and renders a clean switch between Local Delivery and Store Pickup right above the checkout button.',
          'Before a customer even picks a date, the widget validates whether their address is eligible. For Local Delivery, shoppers enter their postal code (such as 6-digit Singapore sectors like 238801 in Orchard or 408734 in Ubi) and get instant feedback on whether delivery is supported, along with a live banner showing how close their basket is to unlocking Free Local Delivery. Switching to Store Pickup swaps the postal input for an outlet selector showing exact store addresses and available collection windows.',
        ],
      },
      {
        heading: 'Server-Side Checkout Protection on Every Shopify Plan',
        paragraphs: [
          'Relying on cart-page JavaScript alone has a well-known flaw: if a customer clicks a dynamic "Buy It Now" button on a product page, uses a cached `/checkout` link, or checks out on a slow mobile connection before scripts finish loading, the order goes through without a delivery date or below the store’s minimum delivery basket.',
          'Previously, blocking invalid checkouts on the server required Shopify Plus and deprecated Checkout Scripts. For Veyronix, I built two native Shopify Functions extensions that run directly on Shopify’s checkout infrastructure across all standard Shopify plans: a Cart & Checkout Validation Function and a Delivery Customization Function.',
          'Whenever a shopper attempts to proceed to payment, the validation function reads Veyronix’s rules from shop metafields and verifies cart attributes on the server. If the delivery date or time slot is missing—or if a Local Delivery cart sits below the merchant’s required minimum (for example, SGD 50.00)—Shopify stops the checkout cleanly and asks the customer to pick a valid slot. At the same time, the Delivery Customization Function hides mismatched shipping rates so a customer who chose Store Pickup in the cart is never accidentally charged a Local Delivery fee at checkout.',
        ],
        code: {
          filename: 'extensions/fulfill-checkout-validator/src/index.js',
          language: 'javascript',
          snippet: `export function run(input) {
  const errors = [];
  const cfg = input?.shop?.metafield?.value ? JSON.parse(input.shop.metafield.value) : null;

  const enforceSchedule = cfg?.rules?.enforceCheckoutSchedule !== false;
  const methodVal = (input?.cart?.deliveryMethod?.value || '').trim();
  const dateVal = (input?.cart?.deliveryDate?.value || '').trim();
  const timeVal = (input?.cart?.deliveryTime?.value || '').trim();

  if (enforceSchedule && (!dateVal || !timeVal)) {
    errors.push({
      localizedMessage:
        cfg?.widget?.validationErrorText ||
        'Please return to your cart and select a preferred delivery or pickup date and time.',
      target: '$.cart',
    });
  }

  const isPickup = /pickup/i.test(methodVal);
  const minRequired = Number(isPickup ? cfg?.rates?.minOrderPickup || 0 : cfg?.rates?.minOrderDelivery || 0);
  const subtotal = parseFloat(input?.cart?.cost?.subtotalAmount?.amount || '0') || 0;

  if (minRequired > 0 && subtotal < minRequired) {
    errors.push({
      localizedMessage: \`Minimum order of \${input.cart.cost.subtotalAmount.currencyCode} \${minRequired.toFixed(2)} is required.\`,
      target: '$.cart',
    });
  }

  return { errors };
}`,
        },
        images: [
          {
            src: '/articles/veyronix/screen-rates.png',
            alt: 'Veyronix Rates and Checkout Rules screen inside Shopify Admin',
            caption:
              'Rates & Checkout Rules inside Veyronix — merchants activate server-side Shopify Checkout Functions, match shipping rates to the chosen fulfillment method, and configure minimum order and free-delivery thresholds.',
          },
        ],
      },
      {
        heading: 'Multi-Outlet Slot Rules, Cut-Off Times & Real-Time Capacity',
        paragraphs: [
          'Retail operations rarely follow one uniform schedule across every branch. A brand might run a central kitchen and roastery in Ubi that dispatches islandwide deliveries in 15-minute windows, an ION Orchard flagship offering same-day Click & Collect with a two-hour preparation lead time, and a Marina Bay Sands boutique that only allows in-store pickup with extended weekend hours.',
          'Inside Veyronix’s Locations editor, merchants import their existing Shopify locations in one click and configure independent rules per outlet. Store teams can keep hours identical every day or customize slots for each day of the week, auto-generate 15, 30, or 60-minute intervals, restrict specific postal prefixes (such as allowing central sectors while excluding offshore islands), set daily cut-off times so late-night orders roll over properly, and block out public holidays like Chinese New Year.',
          'Behind the scenes, Veyronix pairs Shopify webhooks with a Neon Serverless PostgreSQL database to track exact order caps per time slot. As soon as an order is paid, webhook handlers decrement remaining capacity for that window in real time—preventing two shoppers from overbooking the final Friday evening delivery slot during festive rushes.',
        ],
        images: [
          {
            src: '/articles/veyronix/screen-locations.png',
            alt: 'Veyronix Location Editor showing Singapore postal prefix validation, 15-minute slot configuration, and holiday blackout dates',
            caption:
              'Per-location scheduling controls — supporting 6-digit postal prefix rules, quick-fill 15/30/60-minute slot generators, daily cut-off rollover, and public holiday blackouts.',
          },
        ],
      },
      {
        heading: 'Closing the Operational Loop: Order Tags, Customer Receipts & Kitchen Prep Sheets',
        paragraphs: [
          'Capturing a date in the cart is only half the job; what happens right after payment determines whether the merchant’s team actually saves time. On the customer side, Veyronix includes a Checkout & Customer Account UI Extension that displays the confirmed fulfillment method, outlet or postal code, date, and time window right on Shopify’s Thank You and Order Status pages, alongside ready-to-paste email receipt blocks. Giving buyers clear visual confirmation immediately cuts down "When will my order arrive?" support messages.',
          'On the merchant side, every scheduled order is automatically tagged in Shopify Admin with the chosen time window, date, day of week, and workflow state (for example, 12:00 - 12:15 PM and Veyronix: Scheduled) so Shopify Flow automations and staff filters work out of the box. Inside the Veyronix Orders queue, staff can filter today’s dispatches by outlet, reschedule a slot in one click if a customer calls in, and step orders through clear operational stages: Scheduled, Preparing, Ready for Pickup, Out for Delivery, and Completed.',
          'Finally, because kitchens and packing benches think in total batch quantities rather than individual order invoices, I built a dedicated Reports & Kitchen Prep Sheet view. Instead of opening thirty-four separate orders each morning, bakers, florists, and packing teams get an instant consolidated tally—summing exact product and variant counts needed for today’s or tomorrow’s fulfillment windows, alongside peak slot utilization bars and one-click printing or CSV export.',
        ],
        bullets: [
          'Post-Purchase Clarity: Dedicated Thank You & Order Status UI Extension confirms exact pickup store or delivery window immediately after payment.',
          'Structured Dispatch Queue: Live status transitions (Scheduled → Preparing → Ready for Pickup → Out for Delivery → Completed) synced with Shopify Order Tags.',
          'Consolidated Production Prep Sheet: Aggregates line-item quantities across all scheduled orders for the day so kitchens bake and pack exact numbers with minimal waste.',
          'Built for Shopify App Store Standards: Engineered as an embedded Shopify Admin experience with OAuth offline/online access, GDPR/compliance webhooks, and serverless edge APIs.',
        ],
        images: [
          {
            src: '/articles/veyronix/screen-orders.png',
            alt: 'Veyronix Scheduled Orders dispatch table showing auto-synced tags and fulfillment status workflow',
            caption:
              'The Scheduled Orders dispatch view — filterable by method, outlet, and date, with auto-synced Shopify tags and one-click status updates from Preparing to Ready for Pickup or Out for Delivery.',
          },
          {
            src: '/articles/veyronix/screen-prepsheet.png',
            alt: 'Veyronix Reports and Printable Kitchen Prep Sheet summing exact product quantities across scheduled orders',
            caption:
              'Daily Kitchen & Packing Prep Sheet — automatically sums exact item quantities across all scheduled orders for the day alongside busiest time-slot utilization metrics.',
          },
        ],
      },
    ],
  },
  {
    slug: 'engineering-parentguide-sg-education-discovery-platform',
    title: 'Architecting ParentGuide.sg: An SEO-First Education & Family Discovery Platform in Next.js',
    subtitle:
      'How we engineered a fast editorial, vendor-listing, and AI-assisted parenting portal helping families across Singapore evaluate student care, enrichment, dining, and travel.',
    excerpt:
      'Building a multi-category discovery platform in Next.js with neighborhood-level SEO architecture, merchant onboarding flows, and an integrated AI parenting advisor.',
    category: 'Next.js Platforms',
    publishedAt: '24 Nov 2026',
    publishedIso: '2026-11-24',
    readTime: '8 min read',
    featured: true,
    accent: '#FF5C1A',
    liveUrl: 'https://parentguide.sg/',
    liveDomain: 'parentguide.sg',
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Technical SEO', 'AI Advisor'],
    keyTakeaways: [
      'Structured hyper-local editorial taxonomy across Singapore neighborhoods (Marine Parade, Bukit Merah, Queenstown, Toa Payoh) for high-intent organic search visibility.',
      'Combined editorial publishing with self-serve merchant discovery ("Get Featured" & "Get Listed") across five pillars: Education, Travel, Entertainment, Dining, and Shopping.',
      'Integrated an interactive "Ask AI Advisor" experience alongside server-rendered Next.js pages so parents can move seamlessly from long-form guides to personalized answers.',
    ],
    sections: [
      {
        heading: 'Product Vision: Bridging Parental Curiosity and Trusted Quality',
        paragraphs: [
          'Choosing the right student care centre, preschool enrichment programme, or weekend family activity in Singapore involves sifting through fragmented forum threads, outdated directories, and generic aggregator pages. When engineering ParentGuide.sg, our core product mission was clear: craft a modern standard in educational and family discovery that connects busy parents with vetted, neighborhood-specific insights.',
          'Rather than treating ParentGuide as a static blog, we designed the platform around five everyday family verticals—Education, Travel, Entertainment, Dining, and Shopping. Within Education alone, parents search with strong geographic intent: a family living in the East wants to compare homework supervision and enrichment quality in Marine Parade, while another household needs trusted student care options in Bukit Merah, Queenstown, or Toa Payoh. Every architectural decision on ParentGuide.sg was shaped around serving that local intent instantaneously on mobile and desktop devices.',
          'At the same time, the platform needed to serve two distinct audiences simultaneously: parents looking for objective, readable guidance, and educational centres or family-focused brands applying to showcase their programmes through the "Get Featured" and "Get Listed" partner funnels.',
        ],
      },
      {
        heading: 'Next.js Server Rendering & Hyper-Local SEO Taxonomy',
        paragraphs: [
          'Content-rich media and directory platforms win or lose on Core Web Vitals and crawlability. If category pages or neighborhood roundups rely on client-side data fetching waterfalls, search crawlers see incomplete markup and mobile readers on commuter networks experience layout shifts before reading a single paragraph.',
          'To guarantee sub-second First Contentful Paint (FCP) and clean indexing, we built ParentGuide.sg on Next.js using server-rendered route hierarchies and Incremental Static Regeneration (ISR). Articles and curated neighborhood guides—such as deep dives into student care centres across Marine Parade, Queenstown, Bukit Merah, and Toa Payoh—are pre-rendered into semantic HTML with structured OpenGraph metadata, canonical URLs, and clean heading hierarchies.',
          'We also engineered reusable content-card layouts that surface category context (for example, Student Care under Education) alongside scannable summaries so parents can compare multiple centres within seconds without pogo-sticking between slow tabs.',
        ],
        code: {
          filename: 'app/[category]/[slug]/page.tsx',
          language: 'tsx',
          snippet: `export const revalidate = 300; // Refresh curated neighborhood guides via ISR

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const guide = await getPublishedGuide(params.category, params.slug);
  if (!guide) return { title: 'Parent Guide Singapore' };

  return {
    title: \`\${guide.title} | Best Parent Guide Singapore\`,
    description: guide.summary,
    alternates: { canonical: \`https://parentguide.sg/\${params.category}/\${params.slug}\` },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      type: 'article',
    },
  };
}`,
        },
      },
      {
        heading: 'Combining Editorial Curation, Partner Onboarding & AI Assistance',
        paragraphs: [
          'One of the most interesting engineering challenges on ParentGuide.sg was unifying three different interaction speeds inside one cohesive interface: calm magazine-grade reading, structured B2B partner acquisition, and conversational AI discovery.',
          'When parents want tailored recommendations beyond a single article, the integrated "Ask AI Advisor" workflow lets them ask natural-language questions about child enrichment, student care considerations, or family outings without leaving the site. Meanwhile, newsletter dispatches capture recurring reader engagement, and authenticated member/partner flows ("Sign In", "Sign Up", "Get Listed") run on dynamic API routes isolated from cached editorial pages.',
        ],
        bullets: [
          'Multi-Vertical Information Architecture: Unified navigation spanning Education, Travel, Entertainment, Dining, and Shopping without cluttering the reading viewport.',
          'District-Focused Editorial Modeling: Structured data relationships linking articles to specific Singapore estates and planning areas for compounding long-tail SEO.',
          'Merchant Lead & Listing Pipeline: Dedicated "Get Featured" and "Get Listed" onboarding paths enabling schools and family brands to submit listings cleanly.',
          'Decoupled Caching Strategy: Static/ISR edge delivery for public editorial guides paired with dynamic server handlers for authentication and AI Advisor queries.',
        ],
      },
      {
        heading: 'Key Engineering Lessons & Production Impact',
        paragraphs: [
          'Shipping ParentGuide.sg reinforced how much typography, content hierarchy, and server-first rendering reinforce one another on modern editorial platforms. By keeping JavaScript payloads lean on article routes, enforcing consistent card aspect ratios to eliminate Cumulative Layout Shift (CLS), and structuring database queries around categories and Singapore neighborhoods, the platform scales smoothly as new guides and partner listings are published every week.',
          'For families in Singapore, the result is a calm, trustworthy, one-stop destination to evaluate student care and family experiences—backed by a Next.js architecture built for long-term editorial growth.',
        ],
      },
    ],
  },
  {
    slug: 'building-retirewell-sg-active-ageing-events-directory-platform',
    title: 'Building RetireWell.com.sg: A 365-Day Active Ageing, Events & Healthcare Directory Platform',
    subtitle:
      'Engineering an accessible Next.js ecosystem connecting Singapore’s silver generation with live community events, vetted allied-health providers, and retirement guides.',
    excerpt:
      'How we designed and built RetireWell SG—combining real-time community event seat tracking, a trusted health & wealth provider directory, and senior-friendly UX accessibility.',
    category: 'Next.js Platforms',
    publishedAt: '22 Nov 2026',
    publishedIso: '2026-11-22',
    readTime: '8 min read',
    featured: true,
    accent: '#3FA98A',
    liveUrl: 'https://retirewell.com.sg/',
    liveDomain: 'retirewell.com.sg',
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Event Booking', 'Accessibility'],
    keyTakeaways: [
      'Unified three active-ageing pillars—Health, Wealth, and Lifestyle—into one accessible Next.js web platform tailored for seniors and caregivers in Singapore.',
      'Engineered a live community Events engine displaying real-time remaining seat availability across Community Clubs and public venues.',
      'Built a searchable, vetted Services Directory connecting families with audiology, cardiac wellness, dental, pain management, and memory care specialists.',
    ],
    sections: [
      {
        heading: 'Designing Digital Infrastructure for Singapore’s Silver Generation',
        paragraphs: [
          'As Singapore’s population matures, older adults and their adult children increasingly look online for preventive health screenings, active community programmes, and trustworthy retirement planning advice. Yet many senior-oriented websites suffer from cramped text, confusing multi-tier navigation menus, low-contrast grey labels, or fragmented event registration forms that frustrate older readers.',
          'RetireWell SG (retirewell.com.sg) was conceived as Southeast Asia’s premier 365-day active-ageing platform under the guiding promise: "Your Best Years, Well Planned." From an engineering and UX standpoint, every screen had to balance institutional credibility with effortless readability—high-contrast typography, generous click and touch targets, clear visual hierarchy, and straightforward top-level navigation across Events, Articles, Directory, About Us, and Partner onboarding.',
          'The platform organizes its entire data model around three interconnected pillars: Health (preventive screenings, exercise physiology, audiology, dental care, and clinical wellness), Wealth (CPF optimization, retirement income streams, healthcare cost literacy, and estate planning), and Lifestyle (creative arts, photography walks, and intergenerational social connection).',
        ],
      },
      {
        heading: 'Real-Time Event Capacity & Community Venue Scheduling',
        paragraphs: [
          'Unlike static brochure websites, RetireWell SG powers ongoing physical programmes hosted across Singapore’s heartlands and iconic public spaces—including Intergenerational Gaming & Esports Tournaments at Sengkang Community Club, Hearing Health & Audiology Assessment Fairs at Clementi Community Club, and guided Photography Walks at Gardens by the Bay.',
          'Every physical venue—from a 50-seat esports room to a 200-seat community hall—has strict safety and seating limits. When a senior or caregiver browses upcoming activities, displaying accurate real-time seat availability ("39 spots left", "199 spots left", "15 spots left") sets clear expectations and prevents over-registration when email newsletters go out. In Next.js and PostgreSQL, we separated cacheable event descriptions from live capacity counters and wrapped registrations in atomic database transactions so concurrent sign-ups never exceed venue limits.',
          'Each event card also surfaces structured metadata—category tags like Creative Arts or Health Talk, localized Singapore dates and start/end times, exact building and room names, and a single unmistakable call to action—eliminating guesswork before attendees travel to the venue.',
        ],
        code: {
          filename: 'services/eventRegistration.ts',
          language: 'typescript',
          snippet: `export async function reserveEventSpot(eventId: string, attendeeId: string) {
  return db.$transaction(async (tx) => {
    const event = await tx.communityEvent.findUniqueOrThrow({
      where: { id: eventId },
      select: { id: true, capacity: true, bookedCount: true, title: true },
    });

    const spotsRemaining = event.capacity - event.bookedCount;
    if (spotsRemaining <= 0) {
      throw new Error('This community programme has reached full capacity.');
    }

    await tx.eventBooking.create({ data: { eventId, attendeeId } });
    return tx.communityEvent.update({
      where: { id: eventId },
      data: { bookedCount: { increment: 1 } },
    });
  });
}`,
        },
      },
      {
        heading: 'Vetted Allied-Health Directory & Evidence-Based Editorial Hub',
        paragraphs: [
          'Trust is paramount when recommending healthcare, rehabilitation, and financial services to seniors and their families. Alongside live events, we engineered the "Find Trusted Services" directory to showcase vetted clinical and allied-health organizations—including Apex Hearing Care Centre, the Acupuncture & Pain Management Association, Singapore Senior Dental Clinic, Heartline Cardiac Wellness, SilverFit Exercise Physiology, and specialized memory clinics.',
          'To connect educational reading directly with practical next steps, RetireWell’s Articles & Guides engine (featuring practical wellness topics such as the science of restorative sleep, mobility preservation, and retirement readiness) links readers naturally toward relevant upcoming health talks and verified directory specialists.',
        ],
        bullets: [
          'Senior-First Accessibility Standards: High-contrast type scales, generous spacing, unambiguous buttons ("Event Details >", "View All Events"), and zero intrusive modal traps.',
          'Live Seat Inventory Badges: Real-time remaining capacity counters tailored to each Community Club room or outdoor group limit.',
          'Partner & Sponsor Onboarding: Dedicated "Partner With Us" and member sign-in pipelines enabling clinics, community groups, and sponsors to collaborate year-round.',
          'Cohesive Content-to-Community Loop: Readers move smoothly from evidence-based wellness articles to in-person screenings and trusted local providers.',
        ],
      },
      {
        heading: 'Outcome: A Connected 365-Day Community Platform',
        paragraphs: [
          'Launching RetireWell.com.sg demonstrated how disciplined full-stack Next.js architecture and empathetic UI engineering can make a multi-sided community platform feel calm and approachable for every generation. Adult children can vet reputable allied-health clinics in seconds, institutional partners can fill neighbourhood health fairs reliably, and Singapore’s seniors gain an empowering digital companion for active, purposeful ageing.',
        ],
      },
    ],
  },
  {
    slug: 'sgat-digital-sanctuary-portal-nextjs-singapore',
    title: 'Engineering the SGAT Digital Portal: Cultural Architecture, Pooja Bookings & Donor Systems',
    subtitle:
      'Building the web platform for Singapore’s Sree Guruvayoorappan Ayyappan Temple (SGAT) complex—uniting multi-story facility walkthroughs, offerings, and community membership.',
    excerpt:
      'A deep dive into architecting sgat-ten.vercel.app in Next.js: translating a multi-level temple complex, sacred rituals, donor fundraising, and member workflows into a serene digital experience.',
    category: 'Next.js Platforms',
    publishedAt: '20 Nov 2026',
    publishedIso: '2026-11-20',
    readTime: '8 min read',
    featured: true,
    accent: '#7B6CF6',
    liveUrl: 'https://sgat-ten.vercel.app/homepage',
    liveDomain: 'sgat-ten.vercel.app',
    tags: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Booking Workflows', 'Institutional Portal'],
    keyTakeaways: [
      'Translated a six-level physical temple complex (Ground Floor, Level 2, and Levels 3–6 Cultural Hub) into an intuitive interactive web walkthrough.',
      'Unified Pooja & Offering bookings, Fundraising Donations, Event calendars, and Volunteer/Membership registration under one cohesive Next.js architecture.',
      'Paired respectful cultural storytelling with fast edge delivery on Vercel and shared schemas for the companion SGAT Flutter mobile app.',
    ],
    sections: [
      {
        heading: 'Translating Sacred Heritage into a Modern Institutional Web Platform',
        paragraphs: [
          'The Sree Guruvayoorappan Ayyappan Temple (SGAT) represents a landmark community project in Singapore: a newly planned Hindu temple complex dedicated as the joint abode of Lord Guruvayoorappan and Lord Ayyappan, steeped in traditional Kerala architectural proportions and sacred tantric ritual heritage. Because a new temple complex is built over years through collective community devotion, the official web platform (sgat-ten.vercel.app) needed to serve simultaneously as a spiritual sanctuary, an architectural blueprint showcase, a transparent fundraising hub, and a daily devotee service portal.',
          'Large institutional and religious websites frequently accumulate cluttered navigation bars where visitors struggle to locate essential actions such as booking a pooja, verifying festival timings, or contributing to the building fund. From day one, our UX architecture balanced serene cultural aesthetics with crystal-clear task pathways—placing Donations, Volunteer & Membership registration, Sign In, and Poojas & Offerings one tap away on both desktop and mobile viewports.',
        ],
      },
      {
        heading: 'Interactive Multi-Level Architectural & Sacred Tradition Walkthroughs',
        paragraphs: [
          'A defining highlight of the SGAT portal is how it communicates the spatial vision of the multi-story temple complex before devotees even step onto the physical site. Urban land constraints in Singapore mean modern cultural institutions must integrate sacred and civic spaces vertically while honoring centuries-old ritual guidelines.',
          'Using modular Next.js client components backed by structured content schemas, we built interactive floor-by-floor explorations covering the Ground Floor (arrival, purification, and devotee support facilities), Level 2 (the sacred sanctum housing the Presiding and Complementary Deities), and Levels 3 through 6 (the Temple Cultural Hub, classrooms, heritage halls, and community gathering suites). Dedicated storytelling sections walk visitors through Arrival & Purification customs and the spiritual significance of uniting both revered deities under one complex.',
        ],
        code: {
          filename: 'components/temple/FacilityFloorsTabs.tsx',
          language: 'tsx',
          snippet: `const TEMPLE_LEVELS = [
  {
    id: 'ground',
    label: 'Ground Floor',
    title: 'Support, Arrival & Purification Facilities',
    highlights: ['Devotee welcome concourse', 'Purification & preparation zones', 'Elder-friendly step-free access'],
  },
  {
    id: 'level-2',
    label: 'Level 2',
    title: 'Sacred Sanctum & Ritual Spaces',
    highlights: ['Joint abode of Lord Guruvayoorappan & Lord Ayyappan', 'Traditional Kerala tantric sanctum layout'],
  },
  {
    id: 'levels-3-6',
    label: 'Levels 3–6',
    title: 'Temple Cultural Hub & Community Classrooms',
    highlights: ['Multi-purpose cultural halls', 'Youth heritage & arts programmes', 'Community dining & volunteer suites'],
  },
] as const;`,
        },
      },
      {
        heading: 'Engineering Donations, Pooja Bookings & Cross-Platform Mobile Sync',
        paragraphs: [
          'Beyond heritage education, Committee governance pages, and Media Press updates, SGAT depends on reliable transactional workflows. Devotees visit the platform year-round to schedule Poojas & Offerings, contribute toward the Fundraising Mission, register for Upcoming Events & Festivals, and enroll as active volunteers or society members.',
          'Critically, because we also developed the companion cross-platform SGAT Mobile App in Flutter for iOS and Android devotees, we designed the Next.js portal’s authentication, member profile, event calendar, and offering schemas around clean API contracts. Whether a devotee registers on the Next.js web portal or opens the Flutter app during a festival, account state, event schedules, and offering categories remain unified.',
          'Deploying the frontend on Vercel’s edge network ensured fast asset delivery, optimized imagery for architectural renders, and resilient uptime during high-traffic festival announcements.',
        ],
        bullets: [
          'Clear Primary Action Hierarchy: Instant hero access to "Book Offerings" and "Discover the Temple", paired with persistent header access to "Donation" and "Sign In / Register".',
          'Structured Cultural & Governance Sections: Dedicated routes for About Temple, Committee, Media Press, Temple Cultural Hub, Events & Festivals, and Community & Culture.',
          'Shared Web + Mobile Data Contracts: Consistent user, event, donation, and offering structures shared seamlessly between Next.js and Flutter.',
          'Mobile-First Performance on Vercel: Fast page transitions and responsive typography readable by devotees across all age groups.',
        ],
      },
      {
        heading: 'Impact: Digital Stewardship for a Generational Milestone',
        paragraphs: [
          'Building the SGAT digital portal demonstrated how modern full-stack engineering can honour sacred tradition while delivering modern usability. By uniting architectural transparency, effortless offering and donation flows, and cross-platform consistency, the platform provides a lasting digital foundation for devotees across Singapore.',
        ],
      },
    ],
  },
  {
    slug: 'custom-shopify-bento-catering-engine-tora-tora-tora-singapore',
    title: 'Engineering Delivery.ToraToraTora.sg: Custom Shopify Liquid Bento & Corporate Catering Storefront',
    subtitle:
      'Transforming Shopify into a perishable kitchen dispatch engine with lunch & dinner delivery windows, $150 free-delivery incentives, and rapid corporate bento ordering.',
    excerpt:
      'Standard retail e-commerce templates break down on perishable restaurant food. Here is how we engineered custom delivery timeslots, pickup/delivery logic, and high-AOV catering flows on Shopify Liquid.',
    category: 'E-Commerce & F&B',
    publishedAt: '18 Nov 2026',
    publishedIso: '2026-11-18',
    readTime: '8 min read',
    featured: true,
    accent: '#F59E0B',
    liveUrl: 'https://delivery.toratoratora.sg/',
    liveDomain: 'delivery.toratoratora.sg',
    tags: ['Shopify Liquid', 'F&B E-Commerce', 'Time-Slot Checkout', 'AJAX Cart', 'JavaScript'],
    keyTakeaways: [
      'Customized Shopify Liquid for perishable kitchen operations with strict Lunch (11:45am–2:00pm) and Dinner (6:00pm–10:30pm) delivery timeslot selection.',
      'Implemented seamless switching between Islandwide Local Delivery and In-Store Pickup alongside structured order-attribute tagging for kitchen prep tickets.',
      'Drove higher corporate catering Average Order Value (AOV) with dynamic $150 free-delivery progress messaging and fast multi-collection AJAX cart drawers.',
    ],
    sections: [
      {
        heading: 'Why Perishable Restaurant Delivery Demands Custom Shopify Engineering',
        paragraphs: [
          'Out-of-the-box Shopify themes are designed for apparel and packaged goods that ship from warehouses within several business days. When Tora Tora Tora set out to scale its islandwide Japanese bento delivery and corporate lunch catering across Singapore via delivery.toratoratora.sg, standard retail assumptions had to be re-engineered from the ground up.',
          'Freshly grilled Japanese bentos, air-flown sushi & maki platters, sharing platters, and party sets are prepared to order around strict commercial kitchen service windows. Corporate admins ordering 30 labelled bento boxes for a boardroom meeting—or families ordering sushi platters for a dinner gathering—need absolute certainty over delivery time windows, dietary box labelling, pickup versus delivery fulfillment, and transparent delivery fee thresholds.',
        ],
      },
      {
        heading: 'Lunch & Dinner Timeslot Enforcement and Fulfillment Routing',
        paragraphs: [
          'To synchronize online orders directly with kitchen line capacity, we engineered custom Shopify Liquid components and storefront JavaScript around Tora Tora Tora’s two daily dispatch windows: 11:45 AM – 2:00 PM for lunch catering and 6:00 PM / 6:30 PM – 10:30 PM for evening service, alongside an In-Store Pickup option at Oxley Bizhub 2.',
          'Rather than relying on fragile third-party popup widgets that slow down page load or fail on mobile Safari, timeslot and fulfillment preferences are captured natively as validated Shopify cart attributes and order notes. Before proceeding through checkout, customers select their exact window, ensuring every order ticket printed in the kitchen carries unambiguous preparation and courier dispatch timing.',
        ],
        code: {
          filename: 'snippets/delivery-timeslot-picker.liquid',
          language: 'liquid',
          snippet: `<div class="ttt-fulfillment-widget" data-free-shipping-threshold="15000">
  <label class="ttt-label" for="DeliveryTimeSlot">
    Choose your delivery timeslot
  </label>
  <select id="DeliveryTimeSlot" name="attributes[Delivery Timeslot]" required>
    <option value="">Select Lunch or Dinner window...</option>
    <option value="11:45 AM - 2:00 PM">Lunch Window (11:45 AM – 2:00 PM)</option>
    <option value="6:30 PM - 10:30 PM">Dinner Window (6:30 PM – 10:30 PM)</option>
  </select>

  <p class="ttt-shipping-note">
    {% if cart.total_price >= 15000 %}
      You have unlocked Free Islandwide Delivery!
    {% else %}
      Add {{ 15000 | minus: cart.total_price | money }} more for Free Delivery above $150.
    {% endif %}
  </p>
</div>`,
        },
      },
      {
        heading: 'High-Conversion Merchandising for Corporate Bento & Platter Orders',
        paragraphs: [
          'Corporate buyers shop very differently from single-item consumers: an office manager typically combines individual main courses from Bento Boxes, adds centrepiece trays from Sushi & Maki Platters or Sharing Platters, tucks in Party Sets, Drinks, and Add-Ons, and checks whether the cart qualifies for free islandwide delivery.',
          'To make multi-category cart building effortless, we structured persistent horizontal and sidebar navigation across All, Bento Boxes, Sushi & Maki Platters, Sharing Platters, Party Sets, Drinks, Add-Ons, Ala-Carte, and Corporate Orders. Adding any item updates the slide-out AJAX shopping cart instantaneously without reloading the page, while real-time subtotal calculation nudges buyers toward the $150 Free Delivery milestone.',
          'We also surfaced operational trust signals directly in the storefront layout—highlighting individually labelled bento boxes for effortless office distribution, variety of choices, islandwide Singapore delivery, and one-click WhatsApp support for custom bulk catering quotes.',
        ],
        bullets: [
          'Dual Service Window Logic: Explicit Lunch and Dinner slot selection aligned with commercial kitchen prep schedules.',
          'Local Delivery & In-Store Pickup Support: Clear fulfillment pathways for both islandwide courier dispatch and self-collection.',
          'Automated $150 Free-Delivery Threshold UX: Top announcement bar and cart-level feedback increasing average catering basket size.',
          'Zero-Reload Slide-Out Cart Drawer: Fast mobile and desktop item adjustments across eight menu categories.',
        ],
      },
      {
        heading: 'Production Impact',
        paragraphs: [
          'Launching delivery.toratoratora.sg turned Tora Tora Tora’s culinary craft into a scalable daytime and evening e-commerce revenue stream. By tailoring Shopify Liquid specifically to F&B kitchen logistics and corporate catering psychology, the storefront delivers fast checkout for customers and clean, predictable order queues for the culinary team.',
          'From an operational engineering standpoint, keeping custom fulfillment logic inside lightweight native Liquid templates and vanilla browser events avoided heavy third-party script bloat. Pages load rapidly on mobile connections during lunch rushes, corporate assistants complete large multi-tray orders without confusion, and kitchen dispatchers receive structured timeslot data on every single receipt.',
        ],
      },
    ],
  },
  {
    slug: 'hospitality-web-architecture-toratoratora-sg-rooftop-izakaya',
    title: 'Designing ToraToraTora.sg: Hospitality Brand Experience, Reservations & Cross-Domain Funnels',
    subtitle:
      'How we crafted the digital flagship for East Singapore’s rooftop Japanese Izakaya & Sake Bar on Wix Studio—uniting table bookings, private dining, and delivery handoffs.',
    excerpt:
      'Hospitality websites must sell atmosphere in three seconds while converting hungry visitors into confirmed table reservations, private event leads, and online takeaway orders.',
    category: 'Hospitality & Web',
    publishedAt: '16 Nov 2026',
    publishedIso: '2026-11-16',
    readTime: '7 min read',
    featured: false,
    accent: '#EF4444',
    liveUrl: 'https://www.toratoratora.sg/',
    liveDomain: 'toratoratora.sg',
    tags: ['Wix Studio', 'Velo', 'Hospitality UX', 'Table Reservations', 'Local SEO', 'Cross-Domain Funnel'],
    keyTakeaways: [
      'Translated the playful, high-energy rooftop atmosphere of Oxley Bizhub 2’s Japanese Izakaya & Sake Bar into a fast, mobile-first hospitality showcase.',
      'Streamlined four high-value hospitality funnels: Table Reservations, Deliveries & Takeaway handoff, Private Dining, and Corporate Event bookings.',
      'Optimized local F&B search visibility in Singapore across Japanese Restaurant, Seafood & Sake Bar, and East-side Izakaya search queries.',
    ],
    sections: [
      {
        heading: 'Capturing Vibrant Izakaya Culture Without Sacrificing Utility',
        paragraphs: [
          'Hidden on Level 11’s rooftop at Oxley Bizhub 2 in East Singapore, Tora Tora Tora is known for its energetic modern Japanese Izakaya vibe—seasonal air-flown sashimi, sushi, charcoal-grilled signatures, and a curated collection of Japanese sakes and whiskies. Yet restaurant guests visiting a website on their phones rarely have patience for slow video splash screens or buried PDFs; within seconds, they want to inspect the menu, check current promos, book a table for tonight, or order bento delivery.',
          'When building and refining www.toratoratora.sg on Wix Studio and Velo, our core objective was to capture the playful personality of the physical rooftop venue while keeping high-intent conversion paths—Reserve a Table, Deliveries & Takeaway, Menu, Promos, Private Dining, and Corporate Events—immediately reachable above the fold.',
          'Every visual section was structured to mirror how diners evaluate a destination restaurant: an immediate sense of rooftop ambiance, proof of culinary freshness through sashimi and robatayaki showcases, and zero-dead-end navigation whether a visitor is booking a table for two or planning a forty-person corporate celebration.',
        ],
      },
      {
        heading: 'Orchestrating Dine-In Reservations, Private Events & Cross-Domain Delivery',
        paragraphs: [
          'A successful F&B flagship website acts as a traffic router for multiple revenue centers. Evening diners need frictionless table reservation integration; corporate HR teams planning team dinners or sake tastings need dedicated Private Dining and Corporate Events inquiry flows; and daytime office customers looking for takeaway bentos need an instant bridge to the e-commerce ordering engine.',
          'Rather than duplicating product catalogs across two databases, we connected www.toratoratora.sg cleanly to delivery.toratoratora.sg via dedicated navigation and hero CTAs. Dine-in storytelling, seasonal promotions, and visual galleries live on Wix Studio—where the marketing team can publish new sashimi specials or festive promos in minutes—while transactional cart and timeslot logic stays cleanly isolated on Shopify.',
        ],
        code: {
          filename: 'velo/reservationAndRouting.js',
          language: 'javascript',
          snippet: `$w.onReady(function () {
  // Track high-intent hospitality conversion actions across mobile & desktop
  $w('#reserveTableBtn').onClick(() => {
    trackHospitalityEvent('table_reservation_click', { source: 'hero_cta' });
  });

  $w('#deliveryTakeawayBtn').onClick(() => {
    trackHospitalityEvent('cross_domain_delivery_handoff', {
      destination: 'https://delivery.toratoratora.sg',
    });
  });
});`,
        },
      },
      {
        heading: 'Local Search Optimization & Mobile-First Diner Ergonomics',
        paragraphs: [
          'Over 75% of restaurant discovery traffic in Singapore originates from mobile searches ("Japanese restaurant East Singapore", "rooftop izakaya Singapore", "sake bar Ubi"). To maximize organic discovery and mobile conversion, we focused heavily on semantic heading structure, responsive viewport scaling, accessible keyboard/tab menu navigation, and fast image compression across culinary galleries.',
          'Clear venue wayfinding—surfacing exact rooftop unit details (#11-19 Oxley Bizhub 2), lunch and dinner operating hours, direct WhatsApp/phone contact, and one-tap reservation triggers—eliminated friction for first-time guests.',
        ],
        bullets: [
          'Dual-CTA Hero Architecture: Side-by-side "Reserve a Table" and "Deliveries & Takeaway" actions serving both dine-in and off-premise guests immediately.',
          'Dedicated B2B Event Funnels: Separate Private Dining and Corporate Events pages capturing high-margin group bookings.',
          'Rapid Marketing Agility on Wix Studio: Enables non-technical restaurant managers to update seasonal promos and menus safely.',
          'Clean Cross-Domain Ecosystem: Cohesive visual branding bridging www.toratoratora.sg and delivery.toratoratora.sg.',
        ],
      },
      {
        heading: 'Outcome: A Unified Hospitality & Commerce Presence',
        paragraphs: [
          'By giving Tora Tora Tora’s dine-in brand experience its own tailored Wix Studio flagship while linking seamlessly to its dedicated catering engine, the restaurant converts casual searchers into loyal rooftop diners, corporate event hosts, and repeat bento customers.',
          'Separating editorial hospitality agility from complex kitchen cart rules proved to be a clean architectural win: restaurant managers can update seasonal menus and festive promotions independently in minutes, while diners enjoy fast mobile discovery, clear venue wayfinding, and frictionless reservation and delivery pathways.',
        ],
      },
    ],
  },
  {
    slug: 'occasion-driven-shopify-catering-storefront-delish-sg',
    title: 'Occasion-First E-Commerce UX: Engineering Delish.sg on Shopify Liquid',
    subtitle:
      'Translating Deliciae’s gala catering craftsmanship into an effortless, occasion-driven Shopify storefront for boardroom lunches, tea breaks, and home celebrations.',
    excerpt:
      'How we structured Delish.sg ("Good Food. Zero Fuss.") around real customer occasions—The Boardroom, The Tea Break, and The Home Party—using custom Shopify Liquid sections.',
    category: 'E-Commerce & F&B',
    publishedAt: '15 Nov 2026',
    publishedIso: '2026-11-15',
    readTime: '7 min read',
    featured: false,
    accent: '#EC4899',
    liveUrl: 'https://delish.sg/',
    liveDomain: 'delish.sg',
    tags: ['Shopify Liquid', 'E-Commerce UX', 'Custom Theme Sections', 'JavaScript', 'Catering Flow'],
    keyTakeaways: [
      'Shifted traditional food-catalog navigation to an occasion-first merchandising model ("The Boardroom", "The Tea Break", "The Home Party", and seasonal holiday collections).',
      'Built modular Shopify Online Store 2.0 Liquid JSON sections so the culinary team can launch seasonal campaigns (like Christmas party menus) without developer intervention.',
      'Balanced self-serve instant cart checkout for bento & grazing boxes with a structured Catering Enquiry funnel for bespoke corporate events.',
    ],
    sections: [
      {
        heading: 'From Grand Gala Catering to "Good Food, Zero Fuss" Online Ordering',
        paragraphs: [
          'For years, the culinary team at Deliciae Catering Co. in Singapore built an enviable reputation cooking for formal galas, embassies, and grand celebrations. When launching Delish (delish.sg), the strategic vision was captured in four words: "Good Food. Zero Fuss." The team wanted to bring those exact chef standards—fresh ingredients, handcrafted preparation made from scratch every morning, and artisanal presentation like their signature Jardin de Versailles grazing box—to everyday gatherings without weeks of back-and-forth event coordination.',
          'Conventional catering websites force busy customers to submit an inquiry form and wait days for a PDF quotation, whereas generic food-delivery apps dump dozens of individual dishes onto a screen with zero guidance on how to feed twelve people in a client meeting. On Delish.sg, every layout and Liquid template decision focused on removing decision fatigue so an executive assistant or home host can assemble a polished spread in minutes.',
        ],
      },
      {
        heading: 'Occasion-Driven Merchandising & Modular Shopify 2.0 Architecture',
        paragraphs: [
          'Instead of greeting visitors with raw SKU grids, we anchored the storefront experience around how hosts actually plan food: "What’s the occasion?" Right from the homepage, shoppers step into curated occasion pathways—The Boardroom (executive bento boxes and polished client lunch sets), The Tea Break (handcrafted savoury and pastry platters for afternoon sessions), and The Home Party (generous sharing platters and artisanal cheese & charcuterie grazing boxes)—alongside timely seasonal spotlights such as Christmas party menus.',
          'Under the hood, we engineered custom Shopify Online Store 2.0 Liquid sections driven by structured JSON schemas. This architecture gives the Delish culinary and marketing team full autonomy in the Shopify Theme Editor: they can spotlight signature creations like The Jardin de Versailles, publish seasonal festive collections, reorder occasion cards, and update editorial copy ("The craft of catering. The ease of Delish.") without touching code or risking responsive layout regressions.',
        ],
        code: {
          filename: 'sections/occasion-showcase.liquid',
          language: 'liquid',
          snippet: `<section class="delish-occasions">
  <div class="delish-container">
    <h2 class="delish-heading">{{ section.settings.heading | escape }}</h2>
    <div class="delish-occasion-grid">
      {% for block in section.blocks %}
        <a href="{{ block.settings.collection.url }}" class="delish-occasion-card" {{ block.shopify_attributes }}>
          <div class="delish-card-media">
            {{ block.settings.image | image_url: width: 960 | image_tag: loading: 'lazy' }}
          </div>
          <h3>{{ block.settings.title | escape }}</h3>
          <p>{{ block.settings.caption | escape }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>`,
        },
      },
      {
        heading: 'Dual Conversion Funnels: Instant AJAX Cart vs. Bespoke Catering Enquiry',
        paragraphs: [
          'In premium catering e-commerce, serving both immediate self-checkout buyers and bespoke event planners requires clear UX separation so neither customer segment feels friction.',
          'For ready-to-order bento boxes, grazing boxes, and sharing platters delivered to offices or homes across Singapore, shoppers add platters directly into a responsive slide-out AJAX cart drawer with real-time subtotal updates. Meanwhile, clients organizing larger corporate receptions or custom menus have a dedicated "Catering Enquiry" pathway and instant WhatsApp access right from the navigation bar and footer.',
          'Careful attention to Shopify CDN responsive image sizing (`image_url` width descriptors and lazy loading) ensured lush, close-up food photography loads crisply on retina screens while maintaining snappy mobile navigation.',
        ],
        bullets: [
          'Editorial Culinary Brand Positioning: Dedicated storytelling blocks ("Made by hand, every time" and "The Deliciae kitchen") communicating chef-grade quality.',
          'Occasion-First Information Architecture: Intuitive pathways for The Boardroom, The Tea Break, The Home Party, and seasonal celebrations.',
          'Frictionless Slide-Out Cart Drawer: Zero-reload cart updates supporting multi-platter office and home orders.',
          'Merchant-Autonomous Liquid Blocks: Custom Online Store 2.0 schemas empowering rapid seasonal campaign launches.',
        ],
      },
      {
        heading: 'Results in Production',
        paragraphs: [
          'Delish.sg demonstrates how custom Shopify Liquid engineering and thoughtful editorial UX can elevate an online food storefront into a refined culinary brand—giving Singapore offices and hosts chef-crafted catering in a few effortless clicks while giving the Deliciae kitchen a streamlined digital order pipeline.',
        ],
      },
    ],
  },
  {
    slug: 'local-first-9-16-video-pipeline-viralreels-studio',
    title: 'Building a Zero-Cloud 9:16 Video & Subtitle Engine with Whisper.cpp and BullMQ',
    subtitle:
      'How ViralReels Studio Pro automates word-level karaoke captions, EBU R128 audio normalization, and Intel QuickSync encoding entirely on-premise.',
    excerpt:
      'Cloud transcription and video rendering APIs become expensive at scale. Here is how I architected a local-first TypeScript pipeline powered by whisper.cpp, Redis BullMQ queues, and hardware-accelerated FFmpeg.',
    category: 'Video & AI Systems',
    publishedAt: '28 Oct 2026',
    publishedIso: '2026-10-28',
    readTime: '7 min read',
    featured: false,
    accent: '#FF5C1A',
    repoName: 'husnizayyin/virals_reels',
    repoUrl: 'https://github.com/husnizayyin/virals_reels',
    tags: ['TypeScript', 'Whisper.cpp', 'BullMQ', 'Redis', 'FFmpeg', 'h264_qsv'],
    keyTakeaways: [
      'Eliminated 100% of recurring cloud speech-to-text API costs by running AVX2-optimized whisper.cpp locally.',
      'Isolated heavy FFmpeg rendering from HTTP uploads using Redis + BullMQ with strict concurrency and memory caps (<2.5 GB RAM).',
      'Automated 9:16 cropping (1080x1920), 480px safe-zone karaoke captions, and -14 LUFS loudness normalization in a single worker pipeline.',
    ],
    sections: [
      {
        heading: 'Why Move Video Processing Off the Cloud?',
        paragraphs: [
          'Short-form content workflows for Reels, Shorts, and TikTok require repetitive processing steps: speech transcription, word-level timestamp alignment, aspect-ratio cropping, audio normalization, and H.264 encoding.',
          'Relying on external cloud APIs introduces per-minute billing, upload latency for large source files, and rate limits. With ViralReels Studio Pro, the goal was straightforward: run the entire pipeline locally on modest hardware (an Intel Core i5-1235U baseline) without freezing the system.',
        ],
      },
      {
        heading: 'Decoupling Ingestion from Encoding with BullMQ',
        paragraphs: [
          'Video transcoding and speech inference are CPU- and GPU-intensive tasks. Running them directly inside an HTTP request handler quickly exhausts memory when multiple files are dropped into the web studio.',
          'To keep the web UI responsive, uploads immediately enqueue a job into BullMQ backed by Redis. A dedicated worker processes one job at a time (concurrency = 1) while streaming live stage progress back to the dashboard.',
        ],
        code: {
          filename: 'worker/videoQueue.ts',
          language: 'typescript',
          snippet: `import { Worker, Job } from 'bullmq';

export const videoWorker = new Worker(
  'reels-pipeline',
  async (job: Job) => {
    await job.updateProgress({ stage: 'transcribing', percent: 15 });
    const words = await runWhisperCpp(job.data.inputPath, { threads: 4 });

    await job.updateProgress({ stage: 'subtitles', percent: 45 });
    const assPath = buildKaraokeAssSubtitles(words, { bottomMarginPx: 480 });

    await job.updateProgress({ stage: 'encoding', percent: 75 });
    return renderVerticalVideo(job.data.inputPath, assPath);
  },
  { connection: redisConnection, concurrency: 1 }
);`,
        },
      },
      {
        heading: 'Hardware Tuning & Safe-Zone Subtitle Design',
        paragraphs: [
          'Two practical details made the biggest difference in output quality and system stability: thermal management on hybrid CPUs and platform UI safe zones.',
        ],
        bullets: [
          'Whisper Thread Cap (-t 4): Prevents thermal throttling on Intel 12th Gen hybrid cores while keeping transcription fast.',
          '3-Word Karaoke Grouping: Groups word-level timestamps into crisp 3-word phrases positioned above a 480px bottom margin so TikTok and Instagram Reels buttons never cover captions.',
          'Intel QuickSync (h264_qsv) + libx264 Fallback: Uses integrated GPU encoding first and falls back cleanly to CPU encoding when hardware acceleration is unavailable.',
          'EBU R128 Audio Normalization (-14 LUFS): Ensures consistent voice loudness across mobile speakers.',
        ],
      },
    ],
  },
  {
    slug: 'clean-flutter-architecture-mvvm-riverpod-vs-bloc-pos',
    title: 'Scalable Flutter Architecture in Production: MVVM + Riverpod vs. BLoC for Retail POS',
    subtitle:
      'Practical state management patterns drawn from building SimplePOS (Firebase + BLoC) and my Flutter MVVM Riverpod Supabase starter.',
    excerpt:
      'Choosing the right state management pattern in Flutter determines how cleanly your app scales. A practical comparison from shipping real retail POS, loyalty, and starter architectures.',
    category: 'Mobile Architecture',
    publishedAt: '14 Sep 2026',
    publishedIso: '2026-09-14',
    readTime: '7 min read',
    featured: false,
    accent: '#0284C7',
    repoName: 'husnizayyin/flutter_mvvm_riverpod',
    repoUrl: 'https://github.com/husnizayyin/flutter_mvvm_riverpod',
    tags: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Firebase', 'Supabase', 'MVVM'],
    keyTakeaways: [
      'MVVM + Riverpod + go_router excels for rapid product bootstrapping with compile-safe dependency injection and minimal boilerplate.',
      'BLoC shines in high-concurrency enterprise retail & POS apps (like SimplePOS) where explicit event-to-state auditability is critical.',
      'Decoupling repositories from UI widgets makes switching between Firebase Firestore and Supabase PostgreSQL straightforward.',
    ],
    sections: [
      {
        heading: 'Matching State Architecture to Product Complexity',
        paragraphs: [
          'Over 5+ years of building cross-platform mobile apps—from multi-branch retail ecosystems to lightweight indie starters—one lesson stands out: there is no single silver-bullet state manager, only clear boundaries.',
          'Across two open-source repositories—flutter_mvvm_riverpod (paired with Supabase and go_router) and pos_firebase / SimplePOS (paired with BLoC and Cloud Firestore)—I refined two complementary blueprints.',
        ],
      },
      {
        heading: 'Pattern 1: MVVM + Riverpod for Fast, Type-Safe Feature Delivery',
        paragraphs: [
          'In flutter_mvvm_riverpod, Views stay purely declarative while ViewModels (Notifiers) coordinate repositories, localization, authentication, and theme state without context-tree boilerplate.',
        ],
        code: {
          filename: 'lib/features/auth/auth_viewmodel.dart',
          language: 'dart',
          snippet: `class AuthViewModel extends AsyncNotifier<UserSession?> {
  @override
  FutureOr<UserSession?> build() {
    return ref.watch(authRepositoryProvider).currentSession();
  }

  Future<void> signInWithEmail(String email, String password) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(authRepositoryProvider).signIn(email, password),
    );
  }
}`,
        },
      },
      {
        heading: 'Pattern 2: BLoC + Firestore for Point-of-Sale Reliability',
        paragraphs: [
          'In SimplePOS (pos_firebase), store cashiers trigger rapid cart updates, stock deductions, and checkout receipts. Using BLoC enforces strict event streams so inventory state transitions never race.',
        ],
        bullets: [
          'Predictable CartEvent -> CartState transitions during barcode/item additions and stock checks.',
          'Firestore offline persistence keeps sales tracking responsive even on unstable store Wi-Fi.',
          'Clean separation between UI presentation, BLoC business rules, and Firebase data providers.',
        ],
      },
    ],
  },
  {
    slug: 'designing-interactive-hris-api-docs-malikago',
    title: 'Designing Clear Module & API Documentation Portals for Mobile HRIS Ecosystems',
    subtitle:
      'How Documentation-MalikaGoApp structures authentication, attendance, leave requests, and approval workflows into a live developer portal.',
    excerpt:
      'When mobile and backend engineers collaborate across attendance, leave, and approval modules, static PDFs quickly go stale. Here is how I built a dedicated live documentation web app on Vercel.',
    category: 'Full-Stack & DevOps',
    publishedAt: '06 Dec 2025',
    publishedIso: '2025-12-06',
    readTime: '5 min read',
    featured: false,
    accent: '#7B6CF6',
    liveUrl: 'https://documentation-malika-go-app.vercel.app',
    liveDomain: 'documentation-malika-go-app.vercel.app',
    repoName: 'husnizayyin/Documentation-MalikaGoApp',
    repoUrl: 'https://github.com/husnizayyin/Documentation-MalikaGoApp',
    tags: ['React', 'Vite', 'REST API Specs', 'HRIS Workflows', 'Vercel'],
    keyTakeaways: [
      'Organized complex workforce app specs into 9 dedicated domain routes: Login, Home, Attendance, Leave, Request, Approval, History, Employee, and Personal.',
      'Hosted live on Vercel so mobile (Flutter/Kotlin) and backend teams always reference a single source of truth.',
      'Reduced integration back-and-forth during sprint handoffs with explicit payload examples and status flows.',
    ],
    sections: [
      {
        heading: 'Why Living Documentation Matters in Mobile + API Teams',
        paragraphs: [
          'In workforce and logistics mobile apps like MalikaGo, every mobile screen depends on strict API contracts: token login, geolocation attendance check-ins, leave balances, multi-step manager approvals, and employee profiles.',
          'Sharing API contracts through chat messages or static documents often leads to mismatched field names and state bugs. Building a dedicated web portal deployed on Vercel gave every team member instant browser access to the exact module specifications.',
        ],
      },
      {
        heading: 'Domain-Driven Route Structure',
        paragraphs: [
          'Rather than dumping every endpoint onto a single endless page, the documentation app mirrors the exact product navigation of the mobile application itself using nested layouts.',
        ],
        code: {
          filename: 'src/App.jsx',
          language: 'jsx',
          snippet: `<Routes>
  <Route path="/" element={<DocLayout />}>
    <Route index element={<Navigate to="/login" replace />} />
    <Route path="login" element={<Login />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="leave" element={<Leave />} />
    <Route path="request" element={<Request />} />
    <Route path="approval" element={<Approval />} />
    <Route path="employee" element={<Employee />} />
  </Route>
</Routes>`,
        },
      },
      {
        heading: 'Impact on Cross-Functional Delivery',
        paragraphs: [
          'Mapping each route 1-to-1 with a real user flow made QA testing and mobile state management significantly faster.',
        ],
        bullets: [
          'Clear state transitions for Leave & Request -> Approval workflows (Pending, Approved, Rejected).',
          'Standardized authentication header and token refresh documentation on the Login entry route.',
          'Zero-config continuous deployment on Vercel whenever API contracts evolve.',
        ],
      },
    ],
  },
  {
    slug: 'dockerized-fullstack-react-express-prisma-learnjs-v3',
    title: 'Structuring a Containerized Full-Stack React, Express & Prisma Application',
    subtitle:
      'Lessons from building and deploying LearnJs v3 with Vite, Tailwind CSS, Prisma ORM, MySQL 8, and Docker Compose.',
    excerpt:
      'A practical walkthrough of connecting a modern React + Vite + Framer Motion frontend to a typed Express and Prisma MySQL backend with reproducible Docker Compose environments.',
    category: 'Full-Stack & DevOps',
    publishedAt: '18 Nov 2025',
    publishedIso: '2025-11-18',
    readTime: '5 min read',
    featured: false,
    accent: '#3FA98A',
    liveUrl: 'https://learn-js-v3.vercel.app',
    liveDomain: 'learn-js-v3.vercel.app',
    repoName: 'husnizayyin/LearnJs_v3',
    repoUrl: 'https://github.com/husnizayyin/LearnJs_v3',
    tags: ['React 18', 'Express', 'Prisma ORM', 'MySQL 8', 'Docker Compose', 'Tailwind CSS'],
    keyTakeaways: [
      'Paired Prisma ORM v6 with MySQL 8.0 to maintain strict schema migrations and clean relational queries in Express.',
      'Standardized local onboarding into a single docker-compose up --build workflow across frontend, API, and database containers.',
      'Deployed the React + Tailwind + Framer Motion client to Vercel for instant edge delivery.',
    ],
    sections: [
      {
        heading: 'Bridging Frontend Speed with Relational Data Integrity',
        paragraphs: [
          'LearnJs v3 was built as a clean, end-to-end JavaScript reference application separating concerns between an interactive SPA client and a structured REST API server.',
          'On the frontend, React 18, Vite, Tailwind CSS, and Framer Motion handle fast view transitions and Axios data fetching. On the backend, Express pairs with Prisma ORM and MySQL 8.0 so database queries remain readable, predictable, and easy to migrate.',
        ],
      },
      {
        heading: 'Clean Express + Prisma Service Layer',
        paragraphs: [
          'Instead of scattering raw SQL strings across route handlers, Prisma centralizes the schema definition and generates typed client methods for CRUD operations, validation, and pagination.',
        ],
        code: {
          filename: 'backend/src/controllers/courseController.js',
          language: 'javascript',
          snippet: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listModules(req, res) {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { createdAt: 'desc' },
      include: { lessons: true },
    });
    return res.status(200).json({ status: 'ok', data: modules });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load modules' });
  }
}`,
        },
      },
      {
        heading: 'Reproducible Environments with Docker Compose',
        paragraphs: [
          'Setting up local MySQL versions and Node.js environment variables manually often slows down team collaboration. Wrapping the API, MySQL 8 instance, and frontend in Docker Compose makes spinning up the stack deterministic.',
        ],
        bullets: [
          'Isolated network bridge between Express API container and MySQL 8 volume storage.',
          'CORS and Morgan HTTP request logging pre-configured for transparent local debugging.',
          'Frontend deployed live on Vercel while keeping the API contract decoupled via environment variables.',
        ],
      },
    ],
  },
];

export function getSortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.publishedIso.localeCompare(a.publishedIso));
}

export function getLatestArticles(limit = 4): Article[] {
  return getSortedArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
