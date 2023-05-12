window.addEventListener("load", main);

function isExternal(url) {
  return !/^https:\/\/(staging\.)?bsky\.app/.test(url);
}

function main(e) {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);

  function jsLoaded() {
    const selector = 'a.css-1qaijid.r-1loqt21[role="link"]';
    [...document.querySelectorAll(selector)]
      .filter((e) => e.classList.length === 2).forEach(
        (e) => {
          if (e.innerText.endsWith("...") || isExternal(e.href)) {
            const href = e.href.replace(/^https?:\/\//, "");
            const innerText = e.innerText.replace("...", "");
            const dst = decodeURI(e.href);
            if (href.startsWith(innerText)) {
              // overwrite
              e.innerText = dst;
            } else {
              // beside
              const span = document.createElement("span");
              span.innerText = ` [💙😎 ${dst} ]`;
              const parentFontSize = e.style["font-size"]?.replace("px", "");
              const fontSize = Number(parentFontSize || "16") - 4;
              span.style["font-size"] = `${fontSize}px`;

              e.appendChild(span);
            }
          }
          e.classList.add("bluespy-skip");
        },
      );
  }
}
