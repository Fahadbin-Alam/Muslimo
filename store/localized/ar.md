# Arabic store listing (ar)

Google Play: Play Console → Grow users → Store presence → Main store listing → Manage translations → Add your own translations → **Arabic – ar**, then paste each block.
App Store: App Store Connect → your app → the language menu at the top right → add **Arabic**, then paste the App Store blocks.

Screenshots: Google Play and App Store both let each language have its own. Use the Arabic ones in `store/graphics/localized/ar/` (same folder names as the English set: `google-play/phone`, `google-play/tablet`, `app-store/iphone-6.9`, `app-store/ipad-13`). In Play they go in the same "Manage translations" page, under Graphics. Character limits were checked by `scripts/check-store-listings.mjs`.

## Google Play

### App name (max 30)

```
Muslimo: تعلّم الإسلام يوميًا
```

### Short description (max 80)

```
تعلّم القرآن والحديث والسيرة والصلاة بدروس ممتعة مدتها 5 دقائق للصغار والكبار.
```

### Full description (max 4,000)

```
تعلّم الإسلام بضع دقائق في كل مرة، مع مسار يكبر معك. تطبيق مسابقات إسلامية ممتع للأطفال واليافعين والكبار: تعلّم القرآن والحديث والسيرة والصلاة كأنك تلعب.

يحوّل Muslimo تعلّم الإسلام إلى دروس قصيرة تشبه الألعاب. أجب عن الأسئلة، وحافظ على سلسلتك اليومية، واجمع نقاط XP والتمر، وشاهد مسارك يُفتح خطوة بخطوة. كل درس يذكر مصدره، لتقرأ المزيد في Quran.com وSunnah.com ومن كلام العلماء الموثوقين.

ماذا ستتعلّم
• الإيمان وإلقاء السلام والأذكار اليومية، والأساسيات التي يحتاجها كل مسلم
• الوضوء خطوة بخطوة، ثم الصلاة من تكبيرة الإحرام إلى التسليم
• القرآن والتفسير: كل سورة آيةً آيةً، مع المعنى والأحاديث
• قصص الأنبياء: من آدم عليه السلام إلى محمد ﷺ بالترتيب
• السيرة والصحابة: الخلفاء الراشدون وغيرهم من الصحابة رضي الله عنهم، تُروى كأنها قصة
• أحاديث صحيح البخاري وصحيح مسلم، كتابًا بعد كتاب
• الأدعية اليومية، وعظيمات النساء في الإسلام
• الآداب: الصدق والرحمة وبر الوالدين وغيرها الكثير
• الصيام والزكاة والحج ويوم القيامة

تعلّم بطريقة ترسخ في ذهنك
• دروس قصيرة تناسب وقت الاستراحة أو ما بعد الصلاة
• قصص مصوّرة تجعلك تعيش زمان كل درس ومكانه
• الأسئلة التي أخطأت فيها تعود حتى تتذكّرها
• شرح واضح بعد كل إجابة
• الدروس تعمل حتى دون اتصال بالإنترنت

حافظ على حماسك
• سلسلة يومية ونقاط XP وتمر وصناديق مكافآت
• سباق أسبوعي وتحديات أسئلة مع العائلة والأصدقاء
• سلسلة أيام مشتركة مع صديقك
• ادعُ صديقًا برمزك، فتحصلان كلاكما على التمر
• تذكيرات طريفة من جملك (يمكنك إيقافها في أي وقت)

يعمل التطبيق بالعربية والإنجليزية والبنغالية والأردية. التنزيل والدروس الأساسية مجانيان. الاشتراك المميز (Premium) اختياري، شهري أو سنوي، ويمنحك قلوبًا غير محدودة وتجربة بلا إعلانات.

Muslimo تطبيق للتعلّم وليس جهة فتوى. للأحكام التي تخصّ حياتك، اسأل عالمًا مؤهَّلًا من فضلك. إن وجدت خطأ فراسلنا عبر البريد الإلكتروني، وسنراجعه إن شاء الله.
```

## App Store

### Name (max 30)

```
Muslimo: تعلّم الإسلام يوميًا
```

### Subtitle (max 30)

```
مسابقة القرآن والحديث والسيرة
```

### Keywords (max 100 bytes, comma separated, no spaces)

Apple counts this field in bytes, and each letter of this script takes 2 or 3, so it holds fewer words. Words in the name and subtitle are already indexed. A few English words are kept because many people search in English.

```
صلاة,وضوء,دعاء,رمضان,أذكار,الصحابة,أطفال,quran,islam,muslim
```

### Promotional text (max 170)

```
تعلّم الوضوء والصلاة والقرآن وقصص الأنبياء والصحابة في دقائق كل يوم، بمتعة اللعب.
```

### Description (max 4,000)

Paste the Google Play full description above, then add these lines at the end (Apple needs the links):

```
Terms of Use: https://fahadbin-alam.github.io/Muslimo/terms.html
Privacy Policy: https://fahadbin-alam.github.io/Muslimo/privacy.html
```
