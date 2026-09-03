/* =========================================================
   ANDER DESIGN — Language switcher (EN / AR)
   ---------------------------------------------------------
   Rule: headings, nav links, the logo, category/service
   names, and filter labels ALWAYS stay in English — only
   descriptive body text switches to Arabic. This keeps the
   "premium" look the same in both languages.

   How it works:
   - Every translatable element carries data-i18n="key".
   - Lists (like the small tag pills under each work card)
     carry data-i18n-list="key" and get their <li> children
     rebuilt from an array.
   - TRANSLATIONS holds { key: { en: "...", ar: "..." } }.
   - The chosen language is remembered in localStorage so it
     stays the same across index.html and project.html.
   ========================================================= */

const TRANSLATIONS = {
  headerCta:      { en: "Let's Talk",              ar: "تواصل معايا" },
  heroSub:        { en: "Visual identity, logo systems, and social content that make small brands look clear, credible, and easy to trust — from the first glance.",
                     ar: "هوية بصرية، أنظمة شعارات، ومحتوى سوشيال ميديا تخلّي علامتك التجارية واضحة، موثوقة، وسهلة التذكر من أول نظرة." },
  btnSeeWork:     { en: "See the Work",             ar: "شوف الأعمال" },
  btnStartProject:{ en: "Start a Project",          ar: "ابدأ مشروعك" },
  scrollCue:      { en: "Scroll",                   ar: "مرر لتحت" },

  workNote:       { en: "A focused set of identity systems and campaign visuals — not everything, just the work that matters.",
                     ar: "مجموعة مختارة من أنظمة الهوية والحملات البصرية — ماشي كل شيء، غير الشغل اللي يستاهل." },

  work1Role: { en: "Brand Identity / Sports Nutrition", ar: "هوية بصرية / تغذية رياضية" },
  work1Desc: { en: "A bold identity system for a performance-focused supplement brand — strength, speed, and athletic energy in a sharp, modern visual language.",
               ar: "نظام هوية قوي لعلامة مكملات غذائية رياضية — القوة والسرعة والطاقة في لغة بصرية حادة وعصرية." },
  work1Meta: { en: ["Black","White","Red","Bold Type"], ar: ["أسود","أبيض","أحمر","خط عريض"] },

  work2Role: { en: "Brand Identity / Packaging", ar: "هوية بصرية / تغليف" },
  work2Desc: { en: "A soft identity system for a baby-care brand — trust, comfort, and gentleness through pastel colors and clean, rounded forms.",
               ar: "هوية بصرية ناعمة لعلامة عناية بالأطفال — الثقة والراحة واللطف عبر ألوان باستيل وأشكال دائرية نظيفة." },
  work2Meta: { en: ["Pastel Blue","Soft Pink","Rounded Forms"], ar: ["أزرق فاتح","وردي ناعم","أشكال دائرية"] },

  work3Role: { en: "Logo Design / Visual Identity", ar: "تصميم شعار / هوية بصرية" },
  work3Desc: { en: "A friendly identity for an educational brand — a simple mark, blue-orange palette, and readable type for print and digital.",
               ar: "هوية ودودة لعلامة تعليمية — علامة بسيطة، لوحة ألوان أزرق وبرتقالي، وخط مقروء للطباعة والرقمي." },
  work3Meta: { en: ["Blue","Orange","Simple Icon"], ar: ["أزرق","برتقالي","أيقونة بسيطة"] },

  work4Role: { en: "Social Media Campaign — Boltex Nutrition", ar: "حملة سوشيال ميديا — Boltex Nutrition" },
  work4Desc: { en: "Campaign visuals that carry the Boltex identity onto the feed — built for scroll-stopping contrast and clear offers.",
               ar: "محتوى بصري يحمل هوية Boltex للفيد — مبني على تباين يوقف التمرير وعروض واضحة." },
  work4Meta: { en: ["Carousel","Offer Creative"], ar: ["كاروسيل","عرض تسويقي"] },

  work5Role: { en: "Social Media Campaign — Bibiya Baby Care", ar: "حملة سوشيال ميديا — Bibiya Baby Care" },
  work5Desc: { en: "A gentler content system built from the Bibiya identity — pastel palette, soft type, awareness-first messaging.",
               ar: "نظام محتوى ألطف مبني من هوية Bibiya — لوحة باستيل، خط ناعم، رسائل توعوية أولاً." },
  work5Meta: { en: ["Post System","Brand Awareness"], ar: ["نظام منشورات","توعية بالعلامة"] },

  work6Role: { en: "Social Media Campaign — Book Space", ar: "حملة سوشيال ميديا — Book Space" },
  work6Desc: { en: "Friendly, readable content built on the Book Space system — made for parents and educators scrolling fast.",
               ar: "محتوى ودود ومقروء مبني على نظام Book Space — مصمم للأهل والمعلمين أثناء التصفح السريع." },
  work6Meta: { en: ["Content System","Print-Ready"], ar: ["نظام محتوى","جاهز للطباعة"] },

  workMore:     { en: "This is a focused selection.", ar: "هذي مجموعة مختارة." },
  workMoreLink: { en: "See the full archive on Behance ↗", ar: "شوف الأرشيف الكامل على Behance ↗" },

  service1Desc: { en: "Logo system, color palette, typography, visual elements, brand guidelines.",
                   ar: "نظام الشعار، لوحة الألوان، التيبوغرافيا، العناصر البصرية، دليل الهوية." },
  service2Desc: { en: "Posts, carousels, campaign systems, content direction, editable templates.",
                   ar: "منشورات، كاروسيل، أنظمة حملات، توجيه محتوى، قوالب قابلة للتعديل." },
  service3Desc: { en: "Product posters, offer creatives, visual ads for digital campaigns.",
                   ar: "بوسترات منتجات، تصاميم عروض، إعلانات بصرية للحملات الرقمية." },
  service4Desc: { en: "Flyers, brochures, business cards, packaging and print-ready assets.",
                   ar: "فلايرز، بروشورات، بطاقات أعمال، تغليف، ملفات جاهزة للطباعة." },
  service5Desc: { en: "Moodboards, layout direction, brand applications, creative supervision.",
                   ar: "لوحات مزاجية، توجيه التخطيط، تطبيقات الهوية، إشراف إبداعي." },
  service6Desc: { en: "Short reels, motion layouts, ad-style edits, content repurposing.",
                   ar: "ريلز قصيرة، تخطيطات موشن، مونتاج بأسلوب إعلاني، إعادة توظيف المحتوى." },

  termsNote: { en: "The rules every project runs on, agreed before any design starts.",
               ar: "القواعد اللي يمشي عليها كل مشروع، متفق عليها قبل أي بداية تصميم." },
  terms1: { en: "Goals, audience, references, and visual direction — agreed before any design starts.",
            ar: "الأهداف، الجمهور، المراجع، والتوجه البصري — يتفق عليها قبل أي بداية تصميم." },
  terms2: { en: "50% to start, 50% on delivery. Work begins once the deposit is received.",
            ar: "50% عند البدء، 50% عند التسليم. العمل يبدأ فور استلام العربون." },
  terms3: { en: "2 rounds of revision included per project. Further rounds are quoted separately.",
            ar: "جولتان من التعديل ضمن كل مشروع. أي تعديل إضافي يُحتسب بشكل منفصل." },
  terms4: { en: "Turnaround depends on project size — agreed and confirmed before we start.",
            ar: "مدة التنفيذ تعتمد على حجم المشروع — تتفق وتتأكد قبل البدء." },
  terms5: { en: "Exported files, ready for web, print, or social — organized and labeled.",
            ar: "ملفات جاهزة للويب أو الطباعة أو السوشيال ميديا — منظمة وموسومة بوضوح." },
  terms6: { en: "Once the final files are approved and sent, the project closes. New changes are a new project.",
            ar: "بمجرد اعتماد الملفات النهائية وإرسالها، يُغلق المشروع. أي تعديل جديد بعدها يُعتبر مشروعاً جديداً." },

  viewCaseStudy: { en: "View Case Study →", ar: "شوف دراسة الحالة ←" },
  coreService:   { en: "Core Service", ar: "الخدمة الأساسية" },

  aboutLead:  { en: "I'm Lahcen Nadir — founder of Ander Design. I design visual identities, brand systems, and social content that help businesses look clear, credible, and consistent.",
                 ar: "أنا لحسن نذير — مؤسس Ander Design. أصمم هويات بصرية، أنظمة براند، ومحتوى سوشيال ميديا يخلّي الأعمال تبان واضحة، موثوقة، ومتناسقة." },
  aboutPara2: { en: "Most small brands don't need more content. They need a visual system that gets remembered. That's the gap Ander Design fills: identity and logo work, social systems, and advertising visuals built with one goal — make the brand instantly recognizable and easy to trust.",
                 ar: "أغلب العلامات الصغيرة ما تحتاجش محتوى أكثر. تحتاج نظام بصري يتحفظ في الذهن. هذا اللي تقدمه Ander Design: شغل هوية وشعارات، أنظمة سوشيال ميديا، وتصاميم إعلانية، بهدف واحد — تخلّي العلامة تنعرف بسرعة وتكسب الثقة." },
  toolkitLabel: { en: "Toolkit", ar: "الأدوات" },
  stat1: { en: "Brands Designed", ar: "علامات صممتها" },
  stat2: { en: "Happy Clients", ar: "عملاء راضون" },
  stat3: { en: "Avg. Response Time", ar: "متوسط وقت الرد" },

  contactLead: { en: "Available for freelance projects and visual collaborations — identity systems, social content, and advertising visuals. I reply within a day.",
                  ar: "متاح لمشاريع فريلانس وتعاونات بصرية — أنظمة هوية، محتوى سوشيال ميديا، وتصاميم إعلانية. نرد خلال يوم." },
  labelEmail: { en: "Email", ar: "البريد الإلكتروني" },
  labelPhone: { en: "Phone / WhatsApp", ar: "الهاتف / واتساب" },
  labelLocation: { en: "Location", ar: "الموقع" },
  valueLocation: { en: "Oran, Algeria", ar: "وهران، الجزائر" },
  labelElsewhere: { en: "Elsewhere", ar: "روابط أخرى" },
  backToTop: { en: "Back to top ↑", ar: "رجوع للأعلى ↑" },
  whatsappFab: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },

  /* ---- project.html only ---- */
  projectSub: { en: "Tell me about your brand and what you need — I'll get back to you within a day.",
                 ar: "حدثني عن علامتك ووش تحتاج بالضبط — نرد عليك خلال يوم." },
  labelFullName: { en: "Full Name", ar: "الاسم الكامل" },
  labelEmailField: { en: "Email Address", ar: "البريد الإلكتروني" },
  labelService: { en: "Select a Service", ar: "اختر الخدمة" },
  labelBudget: { en: "Project Budget", ar: "ميزانية المشروع" },
  labelDetails: { en: "Project Details", ar: "تفاصيل المشروع" },
  placeholderDetails: { en: "Tell me about your brand, your goals, and what you need…",
                          ar: "حدثني عن علامتك، أهدافك، ووش تحتاج بالضبط..." },
  budgetUnder50: { en: "Under $50", ar: "أقل من 50$" },
  budget50to150: { en: "$50 – $150", ar: "50$ – 150$" },
  budget150to400: { en: "$150 – $400", ar: "150$ – 400$" },
  budget400plus: { en: "$400+", ar: "أكثر من 400$" },
  budgetUnsure: { en: "Not sure yet — let's discuss", ar: "مش متأكد بعد — نتفاهموا" },
  btnSubmit: { en: "Submit Request", ar: "إرسال الطلب" },
  btnSending: { en: "Sending…", ar: "جاري الإرسال..." },
  msgSuccess: { en: "Your request has been received!", ar: "تم استلام طلبك بنجاح" },
  msgError: { en: "Something went wrong — please try again, or email me directly.",
               ar: "صار خطأ — حاول مرة أخرى أو راسلني مباشرة." },

  /* ---- case study pages ---- */
  prevProject: { en: "Previous Project", ar: "المشروع السابق" },
  nextProject: { en: "Next Project", ar: "المشروع التالي" },
  backToWork: { en: "← Back to all work", ar: "← رجوع لكل الأعمال" },

  csBoltexChallenge: { en: "Most sports nutrition brands lean on loud colors and generic athletic clichés. Boltex needed to feel serious and performance-driven without shouting for attention on a crowded shelf.",
                         ar: "أغلب علامات المكملات الرياضية تعتمد على ألوان صاخبة وصور نمطية رياضية مكررة. Boltex احتاجت تبان جدية ومهنية في الأداء، بدون ما تصرخ فوق رف مزدحم." },
  csBoltexCreative: { en: "A stripped-back black-and-white palette with a single red accent, built around bold, condensed typography — a visual language borrowed from performance gear rather than typical supplement packaging.",
                        ar: "لوحة أبيض وأسود مبسطة مع لمسة حمراء واحدة، وتيبوغرافيا عريضة ومكثفة — لغة بصرية مستوحاة من عتاد الأداء أكثر من تغليف المكملات التقليدي." },
  csBoltexLogo: { en: "The wordmark and icon system built for Boltex — bold, geometric, and built to read clearly at any size, from a bottle cap to a billboard.",
                    ar: "نظام الشعار والأيقونة المبني لـ Boltex — عريض، هندسي، ويتقرا بوضوح في أي حجم، من غطاء القارورة لين اللوحة الإعلانية." },
  csBoltexType: { en: "Bold, condensed sans-serif for headlines paired with a clean grotesque for body copy — built for shelf impact and easy legibility.",
                    ar: "خط عريض ومكثف للعناوين مع خط نظيف للنصوص — مبني للتأثير على الرف وسهولة القراءة." },
  csBoltexResult: { en: "A performance-first identity system Boltex can carry across packaging, digital, and future product lines without losing consistency.",
                      ar: "نظام هوية يركز على الأداء، تقدر Boltex تحمله عبر التغليف، الرقمي، وخطوط منتجات مستقبلية بدون ما يفقد التناسق." },

  csBibiyaChallenge: { en: "Baby-care brands often default to generic pastel clichés that all start to look the same. Bibiya needed warmth and trust without disappearing into that sameness.",
                         ar: "علامات العناية بالأطفال غالبًا تعتمد على ألوان باستيل نمطية تخليها تبان كيف بعضها. Bibiya احتاجت دفء وثقة بدون ما تضيع في هذا التشابه." },
  csBibiyaCreative: { en: "Soft pastel blue and pink, rounded geometric shapes, and a gentle type system — built to feel calm and reassuring to parents making a careful purchase decision.",
                        ar: "أزرق باستيل ووردي ناعم، أشكال هندسية دائرية، ونظام خط لطيف — مبني باش يحس الوالدين بالهدوء والثقة وقت اتخاذ قرار الشراء." },
  csBibiyaLogo: { en: "The mark built for Bibiya — soft, rounded, and designed to read as gentle and trustworthy at a glance.",
                    ar: "الشعار المبني لـ Bibiya — ناعم، دائري، ومصمم يعكس اللطافة والثقة من أول نظرة." },
  csBibiyaType: { en: "A rounded, friendly sans-serif with soft weight contrast — built for a gentle, trustworthy tone across packaging and content.",
                    ar: "خط sans-serif دائري وودود مع تباين ناعم في الوزن — لصوت لطيف وموثوق عبر التغليف والمحتوى." },
  csBibiyaResult: { en: "A soft, trustworthy identity system that carries the same warmth from packaging all the way to social content.",
                      ar: "نظام هوية ناعم وموثوق يحافظ على نفس الدفء من التغليف لين محتوى السوشيال ميديا." },

  csBookChallenge: { en: "Educational brands tend to feel either too corporate or too childish. Book Space needed a middle ground — friendly enough for young readers, credible enough for parents and educators.",
                       ar: "العلامات التعليمية إما تبان رسمية بزاف أو طفولية بزاف. Book Space احتاجت توازن — ودودة بما يكفي للقراء الصغار، وموثوقة بما يكفي للوالدين والمعلمين." },
  csBookCreative: { en: "A simple, approachable icon mark paired with a blue-orange palette — playful but structured, built to work equally well on a classroom handout or a digital app icon.",
                      ar: "علامة بسيطة وودودة مع لوحة أزرق وبرتقالي — مرحة لكن منظمة، تخدم بنفس الكفاءة في ورقة توزيع بالقسم أو أيقونة تطبيق رقمي." },
  csBookLogo: { en: "The mark built for Book Space — simple, clear, and easy to remember at a glance.",
                  ar: "الشعار المبني لـ Book Space — بسيط، واضح، وسهل التذكر من أول نظرة." },
  csBookType: { en: "A rounded, highly legible sans-serif built for readability across print and small digital sizes.",
                  ar: "خط sans-serif دائري وواضح للقراءة عبر الطباعة والأحجام الرقمية الصغيرة." },
  csBookResult: { en: "An identity system that reads as friendly and credible at once — built to grow with the brand across print and digital touchpoints.",
                    ar: "نظام هوية يبان ودود وموثوق في نفس الوقت — مبني باش يكبر مع العلامة عبر نقاط التواصل المطبوعة والرقمية." }
};

let currentLang = "en";

function applyLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const entry = TRANSLATIONS[el.dataset.i18n];
    if (!entry) return;
    el.textContent = entry[lang];
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const entry = TRANSLATIONS[el.dataset.i18nPlaceholder];
    if (!entry) return;
    el.setAttribute("placeholder", entry[lang]);
  });

  document.querySelectorAll("[data-i18n-list]").forEach((list) => {
    const entry = TRANSLATIONS[list.dataset.i18nList];
    if (!entry) return;
    list.innerHTML = entry[lang].map((item) => `<li>${item}</li>`).join("");
    list.lang = lang;
    list.dir = lang === "ar" ? "rtl" : "ltr";
  });

  document.querySelectorAll("[data-lang-option]").forEach((opt) => {
    opt.classList.toggle("is-active", opt.dataset.langOption === lang);
  });

  document.documentElement.setAttribute("data-active-lang", lang);
  localStorage.setItem("ander-lang", lang);
}

function initLanguageToggle() {
  const saved = localStorage.getItem("ander-lang") || "en";
  applyLanguage(saved);

  const toggle = document.getElementById("langToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "ar" : "en");
  });
}

document.addEventListener("DOMContentLoaded", initLanguageToggle);
