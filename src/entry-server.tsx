// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="theme-color" content="#112d43" />
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
            as="style"
          />
          <link
            rel="preload"
            fetchpriority="high"
            as="image"
            href="/images/Webpage_Design_Parts_header_block.webp"
            type="image/webp"
          />
          <link
            rel="preload"
            fetchpriority="high"
            as="image"
            href="/images/Webpage_Design_Parts_first_block_bg.webp"
            type="image/webp"
          />
          <meta
            name="description"
            content="SlimeVR Full-Body Tracking is a set of open hardware sensors and open source software that facilitates full-body tracking (FBT) for Virtual Reality, VTubing and Motion Capture. SlimeVR FBT is designed to require no base stations, be affordable, comfortable and open."
          />
          <meta
            name="keywords"
            content="SlimeVR, Full, Body, Tracking, Tracker, Trackers, FBT, Virtual, Reality, VR, open, source, DIY"
          />
          {assets}
        </head>
        <body>
          {/* <noscript>You need to enable JavaScript to run this app.</noscript> */}
          <div id="app">{children}</div>
          {scripts}
          <script>
            {`(function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({"gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-N42PM2BF");`}
          </script>
          <script>
            {`window.axeptioSettings = {
              clientId: "67592ee8f13a61bf84a6d076",
              cookiesVersion: "slimevr-en-EU",
              googleConsentMode: {
                  default: {
                      analytics_storage: "denied",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                    wait_for_update: 500,
                  },
                },
              };

                    (function (d, s) {
                var t = d.getElementsByTagName(s)[0],
                    e = d.createElement(s);
                    e.async = true;
                    e.src = "//static.axept.io/sdk.js";
                    t.parentNode.insertBefore(e, t);
              })(document, "script");`}
          </script>
        </body>
      </html>

    )}
  />
), { mode: 'async' });