---
title: "Weekly Dev Update #225"
date: "2026-01-27T00:00:00.000Z"
description: "Hiyo slime gang~! Spazzwan<img src=\"/public/blog/emoji/SKC_SpazzwanLogo-1369048981102919742.webp\" alt=\"SKC_SpazzwanLogo\" class=\"discord-emoji\" /> here, with more slimevr news to fill up the news-hole in y..."
thumbnailUrl: "assets/1-a1.png"
---

Hiyo slime gang~! Spazzwan<img src="/public/blog/emoji/SKC_SpazzwanLogo-1369048981102919742.webp" alt="SKC_SpazzwanLogo" class="discord-emoji" /> here, with more slimevr news to fill up the news-hole in your heart. What a year so far huh?... its *what*? ***its still only January***? oh...<img src="/public/blog/emoji/nyaflop2-1369612021267693610.webp" alt="nyaflop2" class="discord-emoji" />
## Shipment update <img src="/public/blog/emoji/nighty_nom-1314209503276699708.webp" alt="nighty_nom" class="discord-emoji" />
**Shipment 15.1:**
Still being packed, now with extra deluxe sets and even more upgrade packs. While its a little later than I hoped, at least this news might be good for those waiting on an upgrade, as it means they may get bumped up to a sooner date with the extra stock being added.
That being said, we are expecting this to be picked up late this week for its journey to Crowd Supply.
It is expected to **arrive at CS** somewhere **around mid-February**.

**Shipment 16:**
This shipment is still in the assembly phase with chain powering through piles of parts to pack as many slimes as they can. This will restock most of the sets, including over 2000 6+0 sets. Pre-orders showing as March on Crowd Supply will be part of this shipment. We are still predicting this time-frame, with shipment release from NL sometime late February and arrival at CS **around the middle of March**.

__To sum up the current sets and when they are next expected:__
S**15.1** (mid Feb) **-** Contains: 6+2, 8+2, 12+4, DIY, upgrades
S**16** (mid March) **-** Contains: 5+0, 6+0, 6+2, 8+2, DIY, upgrades

-# (art by @Butterscotch!)
![attachment](assets/1-a1.png)

## Butterfly News <img src="/public/blog/emoji/nighty_hug-1314209493747241011.webp" alt="nighty_hug" class="discord-emoji" />

Still burning the midnight oil, the Cave team is fervently prepping the Butterfly tracker promotional materials for their debut in the Crowd Supply spotlight sometime very soon (picture of the recording studio below). Even so, improvements are still being made in the background by our busy team of engineers.

Our Butterfly PCB has entered its 13th revision, with PCB changes and tweaks being made by Cake based on her extensive antenna testing and research as well as a few other improvements such as coordinates on the silkscreen and a spare GPIO pad for shenanigans. I'll include some pics below of their findings, but they are way too complicated for me to understand. This new PCB has been ordered for testing and should arrive in the near future.

Not to be outdone, Meia has been head down with designing another iteration of our charging dock. The new design will sport 10 charging slots and include a nice little spot for the dongle to sit. Speaking of dongle, the newest design prototype just arrived at the cave and is ready for more extensive testing.

Meanwhile, Spinny™ has been doing its thing twirling around Butterfly trackers to limit test their usage against the theoretical limits. As a result, our 25+ hours estimate for battery life was confirmed, with testing showing over 28 hours of *continuous movement* on a tracker before it died. Crazy numbers considering the constant movement meant the integrated battery conserving code never even had a chance to kick in. Real world usage should be even higher, as the battery conserving stuff turns on/off opportunistically whenever they stop moving.

Last but not least, we have a prototype assembly jig now! It might not seem like much, but its a crucial step for efficiently turning pieces of trackers into a Butterfly Tracker. A good jig makes assembly faster and easier, and is a key piece to the production puzzle. Pics below!

Sign up here: https://slimevr.dev/smol

![attachment](assets/Butterfly-News/1-b1_vr_space.webp)
![attachment](assets/Butterfly-News/2-b2.png)
![attachment](assets/Butterfly-News/3-b3a.png)
![attachment](assets/Butterfly-News/4-b4.png)
![attachment](assets/Butterfly-News/5-b5.png)
![attachment](assets/Butterfly-News/6-b6.png)

## SlimeVR Tip Corner <img src="/public/blog/emoji/nighty_nerd-1451711628595691560.webp" alt="nighty_nerd" class="discord-emoji" />
Its cold for a lot of you in the upper half of the world. You may or may not have noticed some changes in your slimes. We tend to get a lot of reports of increased drift during winter time, and that's not a coincidence. IMU's--the things that 'track' inside slimes--are basically microscopic springs, and temperature affects how those springs move.
### **Why does that matter?**
Put simply, when booting up the trackers you need to do **'rest calibration'** where you place the tracker down for 10+ seconds. This is a type of IMU calibration that teaches the tracker what being completely still "feels like", then they use that plus some maths to zero out the bias (errors). Since they behave differently at different temperatures, its best to calibrate them at operating temperature since the bias changes with temperatures
### **OK... How can I Fix it?**
Just warm them up a little before use. 5 mins on your lap under a t-shirt or blanket should be plenty. Turn them on to get them to operating temp faster. After that just plop them down and leave them completely still for 10-20 seconds as you usually would before use to trigger self-calibration.
If you want to be extra certain, you can see the IMU temperature by switching to ⁨⁨`table view`⁩⁩ (Video below shows how). Try to calibrate the trackers between 30-40°C, or whatever temperature they sit at after 1 hour of normal use.

<video controls src="assets/How-can-I-Fix-it/c2_0127x.mp4" />

## Slimes on stage @ FOSDEM! <img src="/public/blog/emoji/nighty_data-1314209491365007360.webp" alt="nighty_data" class="discord-emoji" />
Just a reminder, many of cool people from the SlimeVR cave team in NL will be shuttling over to Belgium this weekend to attend and present at FOSDEM. It's basically a convention celebrating all the cool free and open-sourcey stuff happening in the world. Over 1000 lectures are blocked in, so its packed with cool nerdy stuff.

SlimeVR will be presenting on the second day, [Feb 1, 2026, 10:25-10:50 in the 'Gaming and VR devroom'](https://fosdem.org/2026/schedule/event/TBFSCP-slimevr/), so if you want to see us specifically that's the day! Come share your love for SlimeVR or tune in and ask some questions in the livestream chat room!

Event info: https://fosdem.org/2026/
SlimeVR panel: https://fosdem.org/2026/schedule/event/TBFSCP-slimevr/
Livestreams: https://live.fosdem.org/
## Rapid Roundup <img src="/public/blog/emoji/nighty_art-1314209500709781524.webp" alt="nighty_art" class="discord-emoji" />
Ready yourself for a bunch of SlimeVR news bits to bite on:
* Our ICM Glove prototype has gone from concept to reality, with a PCB prototype ready to test in the cave and various developers lairs'. Expect to see more info on this soon. Check them out below.
* Hannahpadd has been flexing her coding muscles by adding new GUI additions for customizing key bindings and associated reset delays. See the fruits of their labour in the pics below.
* Resident mad-scientist Sebby has created a SlimeVR input system to use a controller as... a controller.. but ***also*** a tracker. At the same time! See their handiwork here: https://discord.com/channels/817184208525983775/903962635161174076/1463513388234575883
* Steam release of our SlimeVR server is steadily coming together. This week I'm showing off some of the cool graphic designs by Leraine for the icons, banners, and other pictures that are required for Steam. Check them out below.

![attachment](assets/Rapid-Roundup/1-d1.jpg)
![attachment](assets/Rapid-Roundup/2-d3.webp)
![attachment](assets/Rapid-Roundup/3-d4.jpg)
![attachment](assets/Rapid-Roundup/4-d6.jpg)
![attachment](assets/Rapid-Roundup/5-d8.jpg)
![attachment](assets/Rapid-Roundup/7-d10.jpg)

*That's it for this week. Thank you for reading to the end, hope you all have a lovely week and weekend. See you space slimethings~! <3*
