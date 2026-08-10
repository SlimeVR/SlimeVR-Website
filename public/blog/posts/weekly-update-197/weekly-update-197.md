---
title: "Weekly Dev Update #197"
date: "2025-06-01T00:00:00.000Z"
description: "Hello everyone! This week as well as a few next, we’re moving to the new Cave (again! Over 1000 m²!), finishing v0.16.0 with Stay Aligned!, and preparing to properly showcase our new project. Very..."
---

Hello everyone! This week as well as a few next, we’re moving to the new Cave (again! Over 1000 m²!), finishing v0.16.0 with Stay Aligned!, and preparing to properly showcase our new project. Very excite :3 <img src="/blog/emoji/nighty_yay-1319261631217143910.webp" alt="nighty_yay" class="discord-emoji" />

## Shipment news <img src="/blog/emoji/nighty_heart-1314209486390427659.webp" alt="nighty_heart" class="discord-emoji" /> <img src="/blog/emoji/slimelol-981246371006931034.webp" alt="slimelol" class="discord-emoji" />

Shipment 13.2 should arrive early next week at Mouser's warehouse, and as soon as they unpack it you should get your slimes if you ordered v1.0/1.1. Also you will be able to buy the upgrade sets! Only 300 sets for now, so keep your eyes peeled.

Shipment 14 is now in full production. The last pieces - all PCBs for main and extension trackers, and boxes - are now being produced. Still targeting the end of July for shipping <3

## Progress on Stay Aligned Feature <img src="/blog/emoji/bingus-1157717351861596200.webp" alt="bingus" class="discord-emoji" />

This may be one of the, if not the biggest, improvements to IMU-based tracking that we and the community have implemented to date! Stay Aligned has the possibility to eliminate almost all yaw drift based on a few calibration poses, how cool is that?!

### How does it work?
Stay Aligned works by having you calibrate 3 different poses: relaxed standing, relaxed sitting in a chair, and relaxed sitting on the floor. Over time, when sitting, standing, talking with your friends, etc., it applies small imperceptible yaw corrections towards one of these poses. This way, when you eventually fully return to that pose, it will still be perfectly aligned as it was before! This should minimize visible drift and sometimes completely remove it, and can extend your reset times to several hours! You will be able to find this new feature in the next update. To enable staying aligned, head over to settings and start the "Setup Stay Aligned process".
Please help us test the release candidate for v0.16 and Stay Aligned! here :3 https://discord.com/channels/817184208525983775/1377106666730033355/1377106666730033355

## Nighty 3D model and VR Chat Avi <img src="/blog/emoji/nighty_art-1314209500709781524.webp" alt="nighty_art" class="discord-emoji" />
We are working on a 3D model of our mascot - Nighty, which will be used in different cool ways:
- Most importantly, Nighty’s use case is in the server guides to demonstrate correct poses for calibration, or to recommend tracking mounting places. Right now, we're doing that with just 2D graphics, but as SlimeVR grows, we need more and more poses to demonstrate, so it will be super convenient for us to just use a human-proportioned model.
- We're also planning to use Nighty’s model as an addition to the skeleton preview, so the user will be able to see how their tracking looks on an actual model.
- We also want to use Nighty’s model as a default avatar for FBT, which can be recommended by the server to test users’ FBT/face tracking/haptics inside VR chat if the user doesn't have any convenient avatar that supports those features from the get-go.
- Another use case for Nighty 3D model is, of course, to use it in promotional materials or just as a VRChat avatar :3

## Announcement next week 🐟

Cool announcement next week, do not miss <3 <img src="/blog/emoji/slimehug-822833057593294908.webp" alt="slimehug" class="discord-emoji" />
