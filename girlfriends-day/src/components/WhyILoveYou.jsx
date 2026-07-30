import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════
//  ✏️ EDIT YOUR 10+ CHAPTERS AND PARAGRAPHS HERE
//  This array defines the storybook.
//  Each chapter is an object with a number, title, and paragraphs.
//  The first letter of the first paragraph of every chapter will get a drop-cap!
// ═══════════════════════════════════════════════════════════════════════
const CHAPTERS = [
  {
    number: "Chapter One",
    title: "Before Everything Else",
    paragraphs: [
      "Before I tell you why I love you, I think I should tell you something first. This is not just a story. It is every feeling I have never been able to explain properly. I know I am not always the best at putting my heart into words, but every single word in these pages comes from the part of me that loves you more than anything else.",
      
      "Sometimes I wonder how one person became so important to me. It did not happen all at once. It happened through the little things. Through every conversation, every laugh, every silly moment, every argument we solved, and every memory we made together. Without realizing it, you became my favorite person, my safe place, and the first thought I have whenever something good or bad happens.",
      
      "This book is called 'Why I Love You,' but the truth is I do not think there are enough pages in the world to answer that question. I could spend my whole life writing about you and still feel like I missed a thousand reasons. So this is not every reason. It is simply the beginning of the story of why, out of everyone in this world, my heart chose you and keeps choosing you every single day."
    ]
  },
  {
  number: "Chapter Two",
  title: "The Day You Became My Home",
  paragraphs: [
    "People say home is a place, but I think they are wrong. Home is a feeling. And somehow, without either of us realizing it, you became mine.",
    
    "If someone asked me when I fell in love with you, I honestly would not know what to say. There was no one magical moment where the world stopped spinning. No fireworks, no movie scene, no dramatic confession. Instead, my heart chose you quietly, a little more every single day. It happened when I started smiling every time your name appeared on my phone. It happened when I started saving every little story just so I could tell you later. Before I even noticed, you became my favorite part of every day.",
    
    "You have this beautiful way of making everything feel lighter. No matter how stressful my day is, hearing your voice feels like taking a deep breath after holding it in for too long. Somehow, without even trying, you make the world slow down. You make my heart feel calm. You are the only person who can make me laugh when I am trying so hard not to smile. The only person who can make me feel understood without saying much. The only person who can make silence feel so full of love.",
    
    "I love your smile because it somehow fixes days that you never even knew were broken. I love your laugh because it is the happiest sound I have ever heard. I love your eyes because every time I look into them, I feel like I am looking at the future I have always wanted. I love the way you care, the way you listen, the way you remember the smallest things, and the way you love me even when I make it difficult.",
    
    "Sometimes I catch myself imagining our future for no reason. Us waking up in the same house. Me making terrible tea while you laugh at me. Late-night drives with our favorite songs playing. Random grocery shopping where we somehow end up buying things we never needed. Watching movies while you steal all the blanket. Talking about our day before sleeping. Growing older together without ever getting tired of each other. Every dream I have somehow has you in it.",
    
    "People say home is a place you return to, but I think they are wrong. Home is the person who makes your heart feel safe. The person you miss even five minutes after saying goodbye. The person whose happiness becomes your own. The person you would choose over and over again, no matter how many lifetimes you were given. For me, home has your smile, your laugh, your voice, your hand in mine... Home will always be you."
  ]
  },
  {
  number: "Chapter Three",
  title: "The Little Things You Never Notice",
  paragraphs: [
    "There are so many reasons why I love you. Some are big enough to change my life, but most of them are so small that you probably do not even realize you are doing them. And somehow... those are my favorite.",
    
    "I love the way your smile appears without warning, like the sun coming out after a cloudy day. I do not think you realize how beautiful you look when you are genuinely happy. Every time you smile, I catch myself smiling too. I love hearing you laugh, not just because it is cute, but because your laugh tells me you are happy, and nothing in this world makes me happier than knowing you are okay.",
    
    "I love the way you care. You care so deeply about the people you love, sometimes even forgetting about yourself. You always want everyone around you to be happy, and that is one of the purest things about you. Sometimes I wish you could see yourself through my eyes. If you could, you would finally understand why I never stop falling in love with you.",
    
    "I love the little moments that nobody else gets to see. Our random conversations that somehow go from serious to complete nonsense. The way we tease each other. The way we laugh over the dumbest things. The way we can spend hours talking and still never run out of things to say. Those moments may not seem important to anyone else, but to me they are priceless.",
    
    "Sometimes I look at you and wonder how someone can be so beautiful without even trying. Not just because of the way you look, but because of who you are. Your kindness. Your patience. Your heart. The way you make people feel loved. That is the kind of beauty that never fades. You never had to become someone else for me to fall in love with you. You were simply yourself, and somehow... that was everything I had ever been looking for.",
    
    "If I had to describe you in one sentence, I could not. No sentence is long enough. No paragraph is enough. Not even this whole book is enough. That is why I keep writing. Because every page brings me a little closer to explaining something that words will probably never be able to explain. I love you, not because of one reason, but because every little thing about you gives me another one."
  ]
  },
  {
  number: "Chapter Four",
  title: "A Future That Has Your Name",
  paragraphs: [
    "Ever since you came into my life, I stopped dreaming about my future. I started dreaming about our future. Before you, I used to wonder where life would take me. Now, every dream I have, every goal I set, and every plan I make somehow has you in it. You became part of every tomorrow I look forward to.",

    "Sometimes I imagine us waking up in the same room after years of being together. I wake up before you just to spend a few minutes looking at the prettiest girl in the world sleeping peacefully beside me. I smile because after every difficult day, every misunderstanding, every late-night conversation, and every time we chose each other... we finally made it.",

    "I imagine making breakfast together, even though I already know I am gonna mess something up and you are gonna laugh at me. I imagine random grocery shopping where we somehow buy everything except what we actually needed. I imagine dancing with you in the kitchen for absolutely no reason while our favorite songs play in the background. Those little moments are the ones I want forever.",

    "I imagine us traveling the world together, watching sunsets in places we have never been, taking thousands of pictures, and making memories that we will smile about years later. I imagine building a home that is not perfect, but full of laughter, late-night conversations, warm hugs, and so much love that anyone who walks through the door can feel it.",

    "Maybe one day our children will ask us how we fell in love. I hope we smile at each other and tell them that love is not about finding someone perfect. It is about choosing the same person every single day, even when life gets difficult. I cannot promise that every day will be easy, but I can promise that no matter what happens, I am never letting go of your hand.",

    "Because at the end of every dream I have, every road I imagine walking, and every version of the future I picture, there is always one person standing beside me. You. And if I get to spend the rest of my life loving you, then I already have everything I have ever wished for."
  ]
  },
  {
  number: "Chapter Five",
  title: "I Will Choose You",
  paragraphs: [
    "I used to think love was about finding the perfect person. Then I met you, and I realized love has nothing to do with perfection. Because we are not perfect. We have misunderstood each other. We have argued. We have had difficult days. But at the end of every single one of them... it has always been you.",
    
    "No argument has ever made me stop loving you. No misunderstanding has ever made me question us. Even when we are upset with each other, you are still the person I miss the most. You are still the first person I want to talk to. You are still my favorite person, no matter what.",
    
    "I know I overthink. I know I blame myself more than I should. Sometimes I let my own thoughts become heavier than they need to be, and I know that has made you worry. I am sorry for that. I never wanted my fears to become your burden. I promise I will keep working on myself because you deserve someone who brings you peace, not unnecessary worries.",
    
    "Every problem we have ever faced has taught me something. Love is not about never fighting. It is about never giving up. It is about choosing each other even when things get difficult. It is about saying, 'We will figure this out together,' because no problem is ever bigger than what we have.",
    
    "Loving you makes me want to become the best version of myself. I want to be the person who makes you feel safe, who makes you smile after a difficult day, and who reminds you that you will never have to face life alone. I want to be someone you are always proud to call yours.",
    
    "If there is one promise I want you to remember, it is this: there will be easy days, and there will be difficult days, but no matter what tomorrow looks like, I will wake up, look at you, and choose you again. Then I will do the same the next day, and the next, for the rest of my life."
  ]
  },
  {
  number: "Chapter Six",
  title: "In Every Lifetime",
  paragraphs: [
    "Sometimes I wonder if people are really meant to find each other. If souls really meet again. Maybe in another life we met in school. Maybe we met in a café. Maybe we were strangers walking past each other on a busy street. I do not know if any of that is true, but I know one thing. If I were given another life, I would spend it looking for you all over again.",
    
    "Out of the billions of people in this world, my heart would still choose yours. Every single time. Because loving you does not feel like something I have to do. It feels like the most natural thing in the world. Like breathing. Like hearing your laugh and forgetting every problem I had only seconds before.",
    
    "Sometimes I think about how lucky I am. Out of every possible story my life could have written, it wrote you into it. You have given me memories I never want to forget. You have turned ordinary days into unforgettable ones and simple conversations into moments I never want to end. You made me believe that forever is not just something people say. It is something I want with you.",
    
    "If one day life becomes difficult, if we grow older, if wrinkles replace our smiles and our hair turns grey, I hope one thing never changes—the way I look at you. I hope that even after fifty years, I still look at you like you are the most beautiful girl I have ever seen, because beauty has never just been about your face. It has always been about your heart.",
    
    "If love had a destination, mine would always lead back to you. Not because I have nowhere else to go, but because nowhere else has ever felt as right. If this life ever gives me another beginning, another chance, another story, I hope it starts exactly the same way—with me finding you and spending the rest of my life falling in love with you again, and again, and again."
  ]
  },
  {
  number: "Chapter Seven",
  title: "Thank You for Existing",
  paragraphs: [
    "There is something I have wanted to say for a long time. Thank you. Not just for loving me. Not just for choosing me. But simply... for existing. Sometimes I wonder what my life would have looked like if our paths had never crossed. Honestly, I do not think it would have been anywhere near as beautiful as it is today.",
    
    "You changed my life in ways you probably do not even realize. You made ordinary days feel exciting. You gave me someone to look forward to every morning and someone to miss every night. You made me realize that happiness is not always found in places or things. Sometimes it is found in one person. For me, that person has always been you.",
    
    "Thank you for listening to me even when I talk too much. Thank you for staying on the days when I was difficult to understand. Thank you for being patient with my overthinking. Thank you for believing in me when I struggled to believe in myself. Thank you for making me feel loved in ways I never knew I needed.",
    
    "You have seen parts of me that nobody else has. The childish side. The emotional side. The annoying side. The version of me that worries too much. And somehow, you still stayed. You still loved me. I do not think I will ever stop being grateful for that.",
    
    "If one day I become the man I dream of becoming—a good husband, a good father, and someone who makes you proud—it will be because you believed in me long before I believed in myself. You inspire me every single day to become a better person, not because you expect perfection, but because your love makes me want to deserve it.",
    
    "I hope you never forget how important you are to me. Because if someone ever asked me what the greatest blessing of my life was, I would not tell them about success or achievements. I would simply smile... and say your name. Palak."
  ]
  },
  {
  number: "Chapter Eight",
  title: "Forever Starts With You",
  paragraphs: [
    "People always talk about forever like it is something impossible. Something too big. Something too far away. But when I think about forever, I do not think about time. I think about you. Forever is waking up every morning and still smiling because you are beside me. Forever is holding your hand after thousands of days together and still feeling butterflies.",
    
    "I know we are still young. We have so much life ahead of us. So many places to visit, so many dreams to chase, and so many memories waiting to be made. Every adventure I imagine somehow has you standing right beside me, and I would not want it any other way.",
    
    "I want to celebrate your victories like they are my own. I want to be the first person who claps the loudest when you achieve your dreams. And on the days when life feels unfair, I want to remind you how strong, beautiful, and incredible you really are. I want to be your biggest supporter, your safest place, and the person you can always come back to.",
    
    "I want to grow with you. Learn with you. Travel with you. Laugh until our stomachs hurt. Dance in the kitchen for no reason. Take thousands of photos that we will laugh at years later. Grow old without ever growing apart. Those little dreams mean more to me than anything else because they all have one thing in common—you.",
    
    "One day, when our hair turns grey and our faces are full of wrinkles, I hope we still look at each other the same way we do today. Not because we stayed young, but because our love did. Real love is not measured by how many years pass. It is measured by how many times you wake up and choose the same person again.",
    
    "If someone ever asked me what forever looks like, I would not point to a calendar or count the years. I would simply take your hand, smile, and say, 'It looks exactly like this.'"
  ]
  },
  {
  number: "Chapter Nine",
  title: "If You Ever Forget",
  paragraphs: [
    "There may come a day when you feel tired. A day when life feels unfair. A day when you look in the mirror and become too hard on yourself. A day when you wonder if you are enough. If that day ever comes, I want you to come back to this page and read every single word slowly.",
    
    "Because I need you to know something. You have always been enough. You have always been more than enough. You do not have to change the way you laugh, the way you smile, or who you are to deserve love. You are already everything I have ever wanted.",
    
    "I wish you could see yourself through my eyes. Maybe then you would understand why I stare at you when you are not looking. Why I randomly smile while talking to you. Why I always find myself wondering how someone as amazing as you chose me. You are beautiful not just because of your face, but because of your heart. The way you care. The way you love. The way you make people feel important. That is the kind of beauty that time can never take away.",
    
    "I know life will not always be easy. There will be days when we both feel lost. Days when nothing goes according to plan. Days when we question ourselves. When those days come, lean on me. You do not have to carry everything by yourself anymore. Let me be the person who reminds you how strong you are. Let me be the one who hugs you until the world feels a little lighter again.",
    
    "Because that is what love is. Not just celebrating the happy days, but protecting each other through the difficult ones. So if you ever forget how loved you are, how beautiful you are, or how important you are, read this chapter again. I will spend my whole life reminding you, again and again, until one day you finally see yourself the way I have always seen you—as the love of my life."
  ]
  },
  {
  number: "Chapter Ten",
  title: "Why I Love You",
  paragraphs: [
    "So... here we are. The last chapter. I have spent all these pages trying to answer one simple question: why do I love you? And after writing every memory, every dream, every promise, and every little reason, I realized something. I still do not have the answer. Because love like this cannot be explained. It can only be felt.",
    
    "How do I explain that one person became my favorite place in the world? How do I explain that hearing your voice can fix a day that felt impossible? How do I explain that your happiness feels just as important as my own? How do I explain that every version of my future has your name written all over it? Maybe some things are simply too beautiful for words.",
    
    "If there is one thing I hope you remember after reading this book, it is not how well I wrote it. It is how deeply I meant every single word. Every chapter, every sentence, every letter has always been about you. You are my peace, my comfort, my best friend, my biggest blessing, my favorite hello, my hardest goodbye, my safe place, my home, my future, and my forever.",
    
    "I know life is not going to be perfect. We are going to have difficult days, make mistakes, annoy each other, steal each other's hoodies and fries, and probably argue over the dumbest things. But that is okay, because I know we will always find our way back to each other. That is what makes us... us.",
    
    "If one day, many years from now, we find this book hidden away in a drawer, I hope we read it together. I hope you smile, call me dramatic, and laugh at every cheesy line I wrote. I hope I smile back and tell you that I would write every single page again, because every word came from the happiest place in my heart.",
    
    "And before I close this book, there is one last thing I want you to know. If this life gives me one chance, I choose you. If it gives me a thousand chances, I choose you a thousand times. If there are a million universes, I will spend forever looking for you in every single one. Because loving you has been the easiest decision my heart has ever made. This is not the end of our story. It is only the end of this book. Happy Girlfriend's Day, my Juliet. Thank you for being the most beautiful chapter of my life. I love you. Today. Tomorrow. Forever. ❤️"
  ]
  }
]

export default function WhyILoveYou() {
  const [chapterIdx, setChapterIdx] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for next chapter, -1 for prev
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isTocOpen, setIsTocOpen] = useState(false)

  const handleNext = () => {
    if (chapterIdx < CHAPTERS.length - 1) {
      setDirection(1)
      setChapterIdx((prev) => prev + 1)
      setIsTocOpen(false)
    }
  }

  const handlePrev = () => {
    if (chapterIdx > 0) {
      setDirection(-1)
      setChapterIdx((prev) => prev - 1)
      setIsTocOpen(false)
    }
  }

  const handleMouseMove = (e) => {
    if (isTocOpen) return // disable tilt during index navigation for usability
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / (rect.height / 2)) * 4 // subtle tilt
    const rotateY = (x / (rect.width / 2)) * 4
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  // 3D page-flip card rotation variants
  const pageFlipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 75 : -75,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
      transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -75 : 75,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? "right center" : "left center",
      transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] }
    })
  }

  const currentChapter = CHAPTERS[chapterIdx]

  return (
    <section id="why-love" className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 w-full">
      {/* Fixed Section indicator in top-right */}
      <div className="fixed top-16 right-6 z-40 text-[10px] sm:text-xs font-mono tracking-widest text-pink/80 bg-night-900/60 backdrop-blur px-3.5 py-1.5 rounded-full border border-pink/15 shadow-[0_0_12px_rgba(255,105,180,0.15)] select-none">
        CHAPTER {chapterIdx + 1} / {CHAPTERS.length}
      </div>
      
      {/* Header Info */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-2"
          style={{
            background: 'rgba(255,105,180,0.1)',
            border: '1px solid rgba(255,105,180,0.2)',
            color: '#ffb6c1',
          }}
        >
          ✦ Heartfelt Chronicles ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white">
          The Story of <span className="text-pink">Why I Love You</span>
        </h2>
      </motion.div>

      {/* Reading container with book bounds */}
      <div className="relative w-full max-w-2xl flex flex-col items-center justify-center z-10 perspective-1000">
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={chapterIdx}
            custom={direction}
            variants={pageFlipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass w-full p-8 md:p-14 relative overflow-hidden flex flex-col justify-between select-text"
            style={{
              border: '1px solid rgba(255,105,180,0.2)',
              boxShadow: 'inset 0 0 40px rgba(255,182,193,0.05), 0 20px 45px rgba(0,0,0,0.4)',
              background: 'rgba(20, 10, 36, 0.45)',
              rotateX: tilt.x,
              rotateY: tilt.y,
              transformStyle: 'preserve-3d',
              minHeight: '540px'
            }}
          >
            {/* Spine Bound lines (making it feel like a bound book page edge) */}
            <div className="absolute left-2.5 top-6 bottom-6 w-[2px] bg-gradient-to-b from-pink/5 via-pink/20 to-pink/5 pointer-events-none" />
            <div className="absolute left-3 top-6 bottom-6 w-[1px] bg-white/5 pointer-events-none" />

            <div>
              {/* Elegant Chapter Header with Contents Toggle */}
              <div className="mb-8 border-b border-pink/15 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold tracking-widest text-pink/80 font-mono">
                    {currentChapter.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mt-1">
                    {currentChapter.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="cursor-pointer px-3 py-1.5 rounded-full border border-pink/20 bg-pink/5 hover:bg-pink/15 text-xs text-pink/80 hover:text-white font-mono transition-all duration-300 z-30"
                >
                  {isTocOpen ? '📖 Read' : '📖 Index'}
                </button>
              </div>

              {/* Page Contents (Table of Contents OR Chapter Text) */}
              <div className="relative min-h-[280px]">
                <AnimatePresence mode="wait">
                  {isTocOpen ? (
                    <motion.div
                      key="toc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3 max-h-[300px] overflow-y-auto pr-1"
                      style={{ scrollbarWidth: 'thin' }}
                    >
                      <h4 className="text-xs font-semibold tracking-widest uppercase text-pink/70 font-mono mb-4">Table of Contents</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {CHAPTERS.map((ch, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setDirection(idx > chapterIdx ? 1 : -1)
                              setChapterIdx(idx)
                              setIsTocOpen(false)
                            }}
                            className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all duration-300 flex items-center justify-between cursor-pointer ${
                              idx === chapterIdx
                                ? 'bg-pink/20 border-pink text-white font-semibold'
                                : 'bg-night-900/40 border-pink/10 text-blush/80 hover:border-pink/30 hover:text-white'
                            }`}
                          >
                            <span className="font-serif truncate max-w-[180px]">{ch.number}: {ch.title}</span>
                            <span className="text-[9px] font-mono opacity-60 flex-shrink-0 ml-1">Pg {idx + 1}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-blush/90 text-base md:text-lg leading-relaxed font-serif text-justify"
                    >
                      {currentChapter.paragraphs.map((p, i) => {
                        const isFirstParagraph = i === 0
                        return (
                          <p key={i} className="indent-4 md:indent-8">
                            {isFirstParagraph ? (
                              <>
                                <span className="float-left text-5xl md:text-6xl font-serif text-pink font-extrabold mr-3 mt-1 leading-[0.85] text-shadow-glow">
                                  {p.charAt(0)}
                                </span>
                                {p.slice(1)}
                              </>
                            ) : (
                              p
                            )}
                          </p>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Book Page Footer Controls */}
            <div className="mt-12 pt-6 border-t border-pink/15 flex items-center justify-between z-20">
              <button
                onClick={handlePrev}
                disabled={chapterIdx === 0}
                className={`text-xs uppercase tracking-widest font-semibold font-mono flex items-center gap-1.5 transition-all duration-300 ${
                  chapterIdx === 0 
                    ? 'opacity-20 cursor-not-allowed text-white' 
                    : 'text-blush/70 hover:text-pink cursor-pointer'
                }`}
              >
                ← Prev Chapter
              </button>

              {/* Page indicator divider */}
              <div className="text-xs text-pink/40 font-mono tracking-widest">
                ♥
              </div>

              <button
                onClick={handleNext}
                disabled={chapterIdx === CHAPTERS.length - 1}
                className={`text-xs uppercase tracking-widest font-semibold font-mono flex items-center gap-1.5 transition-all duration-300 ${
                  chapterIdx === CHAPTERS.length - 1 
                    ? 'opacity-20 cursor-not-allowed text-white' 
                    : 'text-blush/70 hover:text-pink cursor-pointer'
                }`}
              >
                Next Chapter →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal reading progress bar underneath the book */}
        <div className="w-full bg-night-900/60 rounded-full h-[3px] mt-4 border border-pink/10 overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink to-magenta shadow-[0_0_8px_#ff1493]"
            animate={{ width: `${((chapterIdx + 1) / CHAPTERS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

      </div>

    </section>
  )
}
