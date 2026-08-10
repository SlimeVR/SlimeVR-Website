---
title: "Weekly Dev Update #127"
date: "2023-12-01T00:00:00.000Z"
description: "The process of certification is purposefully opaque and confusing and I'm so so so so tired of it. The main problem is that there are many moving parts - regulatory body (FCC itself), TCB (certific..."
---

## FCC

The process of certification is purposefully opaque and confusing and I'm so so so so tired of it. The main problem is that there are many moving parts - regulatory body (FCC itself), TCB (certification body that basically processes documentations and functions as an arm of FCC), lab that does testing, and "client" (us) that is responsible for everything else. The problem is that both lab and TCB can't really give much consultation on the matter, they can tell you if something isn't compliant or if some of your documents are likely to be rejected, but all solutions are on the client.

Of course it's a problem when the client isn't experienced, like us. It's confusing and unclear, what's the scope of work and how to do it right...

Long story short, yes we're compliant. The problem is we're once again missing a fucking paper <img src="/blog/emoji/aki_flop-908156245079363594.webp" alt="aki_flop" class="discord-emoji" /> To submit all the documents to FCC, we need an antenna specifications. Which we don't have, we didn't make the antenna - the module's manufacturer did. And they certified it many years ago before it was an explicit requirement from FCC, so they didn't have to do the testing required for it.

So either module's manufacturer actually have the documentation we need and will send it to us next week (we only messaged them yesterday because that's when we got on the same page with TCB on the fact that we need this stuff at all), or we'd have to do an extra test to make this missing paper. Which the lab we're using can't do, so we're looking for someone who can <img src="/blog/emoji/aki_flop-908156245079363594.webp" alt="aki_flop" class="discord-emoji" />

We still have chances to finish certification and ship everything during December, so let's hope either or will happen ASAP. I'm very very very tired of this already...

## Assembly

There are some good stuff though. We sent parts for 5000 more slimes to our assembly partner, so more slimes will be made soon!

## Re-packing and Updating

All the slimes on the right in the picture already have been updated to firmware 0.4.0, re-tested, re-labeled and have an extension port plug in them <img src="/blog/emoji/firPog-785701297478959104.webp" alt="firPog" class="discord-emoji" /> That's like ~2k slimes! The process is pretty fast, and next week we will start packing them into set boxes and making new slime sets!

After this shelf is done, we will start re-packing slimes from S3.

Also check this update station <img src="/blog/emoji/nya_umu-850498715617198080.webp" alt="nya_umu" class="discord-emoji" /> A little Raspberry Pi 4 can easily test and update 10 slimes at the same time! <img src="/blog/emoji/firPog-785701297478959104.webp" alt="firPog" class="discord-emoji" />

So yeah, that's how our current week went and our plans for the next. FCC grind and re-packing grind. Hope it ends soon, wish us luck and have a nice weekend <img src="/blog/emoji/Heart-1117832451620868136.webp" alt="Heart" class="discord-emoji" />
