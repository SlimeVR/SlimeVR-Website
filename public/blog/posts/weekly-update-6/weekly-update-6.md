---
title: "Dev Mondays-ish Updates #6"
date: "2021-05-24T00:00:00.000Z"
description: "Some nice things has happened since the last , check them out! **Dev Mondays-ish Updates #6!** - **I fixed the thing I couldn't figure out in the server code**, so now trackers don't have to be mou..."
---

Some nice things has happened since the last , check them out!

**Dev Mondays-ish Updates #6!**

- **I fixed the thing I couldn't figure out in the server code**, so now trackers don't have to be mounted precisely parallel to the floor.
- This gave me new push I needed to work on the server code, **so I added support for 6th (chest) tracker** and added GUI to calibrate skeleton proportions live.
- This all resulted in a new video in <#818283147044978688>: https://youtu.be/tUgewB2DLhQ I think this can be improved further even, since I didn't adjust legs length here.
- I gave my friend SlimeVR to test! She never tried FBT before, but she spends a lot of hours in VRChat. Her verdict: this is awesome, and she won't be buying vive, will wait for SlimeVR! ^^
- Manufacturer received the review units that DHL returned and sent them back to me. Sadly, had to pay again... But it'll all worth it in two weeks when I get them!

Now some oofs <img src="/blog/emoji/OOF-638269238393438218.webp" alt="OOF" class="discord-emoji" /> that we noticed during the testing:
- Calibration GUI requires some work, it's bare bones rn and I forgot to add config saving even, lol, but it should be easy to improve.
- Biggest oof: crashes in dev units are still a thing <img src="/blog/emoji/nya_flop-790559157676933130.webp" alt="nya_flop" class="discord-emoji" /> they aren't frequent, but they did happen a few times, and it impacts the experience a lot if your leg suddenly starts behaving weirdly or stops moving... I'm still trying to reliably catch the source of it before I go redesigning this part. Yes, redesign is pretty easy, and I would've already done it at this point, ordered new dev boards and... ugh should I just do it lol? I still want to catch the crash on logic analyzer and send it to chip manufacturer to be sure... and test in review units... yikes, sorry for the rant. Anyway, <img src="/blog/emoji/nya_a-790558589084499978.webp" alt="nya_a" class="discord-emoji" />
> **[SlimeVR Full Body Tracking Preview 5 in VRChat: 6th tracker and sta...](https://www.youtube.com/watch?v=tUgewB2DLhQ)**
> Made multiple fixes to the server software: greatly increased position stability, easier configuration of trackers position and body proportions, added 6th (chest) tracker. Check out demonstration of different poses, including sitting on a chair, in VRChat. It's much more stable than in the latest demo! Sadly, some things can't be that easily fi...

Some another big yikes: it was brought to my attention, that there is a 25% import tariff on goods from China to USA <img src="/blog/emoji/nya_flop-790559157676933130.webp" alt="nya_flop" class="discord-emoji" /> and since SlimeVR will be made in China, I would need to pay it <img src="/blog/emoji/nya_flop-790559157676933130.webp" alt="nya_flop" class="discord-emoji" /> it won't be on the whole end price, but that's still a bummer... at this point I am already far off from the price I was aiming at at the start, despite optimizing a lot of manufacturing costs. And people keep asking for the price, but now I am just thinking what else did I miss <img src="/blog/emoji/nya_flop-790559157676933130.webp" alt="nya_flop" class="discord-emoji" /> Stay tuned, final price will be known when preorders launch, everything else is just a guess and a goal. The goal was always to make SlimeVR as affordable as possible, and being off so much every time is <img src="/blog/emoji/nya_a-790558589084499978.webp" alt="nya_a" class="discord-emoji" />

What's for this week?
- Start printing cases for review units. I have two weeks to print 25 cases, that's a lot, and I need to refresh the design a bit. So I'm doing this ASAP and start printing.
- Figure out one way or another to deal with the crashes. I want to catch them on the analyzer, and see what I can do with them. It can be firmware fix, hardware fix, wiring fix, or microcontroller replacement fix. Either way, fix won't be hard, but I really need to catch this bug redhanded, or it won't let me relax. Crashes affect SlimeVR experience significantly for my ADHD, so I should hyperfocus on them.

I planned on trying to stream, but it won't happen until my mind is focused on crashes. If I fix them, I might.

Anyway, this time it's a mixed bunch, and a tl;dr post. As usual, thanks for your support! <img src="/blog/emoji/slimepcbnom-839133114931347486.webp" alt="slimepcbnom" class="discord-emoji" />
Oh, right! The comparison table between SlimeVR and some other tracking solutions are up on the Crowd Supply page! Check it out. https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker#comparisons

I hope to give more precise info on Precision and Latency later on too.
