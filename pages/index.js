import Image from "next/image"
import Head from "next/head"
import { useLayoutEffect, useState } from "react"

export default function HomePage() {
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const doc = document.documentElement
    const scrollListener = () => {
      setOffset((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0))
    }

    window.addEventListener("scroll", scrollListener)

    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  })

  return (
    <>
      <Head>
        <title>Oakland 2018</title>
      </Head>
     <body>
    <div class="container">
      <h1>Stack</h1>
      <div class="stack wrapper">
        <div class="box"></div>
        <div class="stack wrapper">
          <div class="box"></div>
          <div class="box"></div>
        </div>
        <div class="box"></div>
      </div>

      <h1>Box</h1>
      <div class="box">Outpost</div>

      <h1>Center</h1>
      <div class="center wrapper"></div>

      <h1>Cluster</h1>
      <div class="cluster">
        <!-- intermediary wrapper -->
        <div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>

      <h1>Sidebar</h1>
      <div class="sidebar">
        <!-- intermediary wrapper -->
        <div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>

      <h1>Switcher</h1>
      <div class="switcher">
        <!-- intermediary wrapper -->
        <div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>

      <h1>Cover</h1>
      <div class="cover box">
        <!-- header -->
        <div>
          Header
        </div>
        <!-- centered element -->
        <h2 style="text-align: center;">Cover Element</h2>
        <!-- footer -->
        <div>
          Footer
        </div>
      </div>

      <h1>Grid</h1>
      <div class="grid" data-min="15rem">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>

      <h1>Frame</h1>

      <h2>16:9</h2>
      <div class="frame frame916">
        <div class="box">16:9</div>
      </div>

      <h2>4:3</h2>
      <div class="frame frame43">
        <div class="box">4:3</div>
      </div>

      <h2>1:1</h2>
      <div class="frame frame-square">
        <div class="box">1:1</div>
      </div>

      <h1>Reel</h1>
      <div class="reel">
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
        <div class="box" style="height: 20em; width: 20em;"></div>
      </div>
    </div>

    <script>
      /* The Grid
      -----------------------------------------------------------------------*/
      (function observeGrid() {
        const gridNode = document.querySelector('.grid');
        // Feature detect ResizeObserver
        if ('ResizeObserver' in window) {
          // Get the min value from data-min="[min]"
          const min = gridNode.dataset.min;

          // Create a proxy element to measure and convert
          // the `min` value (which might be em, rem, etc) to `px`
          const test = document.createElement('div');
          test.style.width = min;
          gridNode.appendChild(test);
          const minToPixels = test.offsetWidth;
          gridNode.removeChild(test);

          const ro = new ResizeObserver((entries) => {
            for (let entry of entries) {
              // Get the element's current dimensions
              const cr = entry.contentRect;
              // `true` if the container is wider than the minimum
              const isWide = cr.width > minToPixels;
              // toggle the class conditionally
              gridNode.classList.toggle('aboveMin', isWide);
            }
          });

          ro.observe(gridNode);
        }
      })();

      /* The Reel
      -----------------------------------------------------------------------*/
      (function() {
        const className = 'reel';
        const reels = Array.from(document.querySelectorAll(`.${className}`));
        const toggleOverflowClass = (elem) => {
          elem.classList.toggle('overflowing', elem.scrollWidth > elem.clientWidth);
        };

        for (let reel of reels) {
          if ('ResizeObserver' in window) {
            new ResizeObserver((entries) => {
              toggleOverflowClass(entries[0].target);
            }).observe(reel);
          }

          if ('MutationObserver' in window) {
            new MutationObserver((entries) => {
              toggleOverflowClass(entries[0].target);
            }).observe(reel, { childList: true });
          }
        }
      })();
    </script>
  </body>
    </>
  )
}
