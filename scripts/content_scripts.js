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
            const className = href.startsWith(innerText)
              ? "bluespy-overwrite"
              : "bluespy-beside";

            e.setAttribute("data-bluespy-destination", decodeURI(e.href));
            e.classList.add(className);
          } else {
            e.classList.add("bluespy-skip");
          }
        },
      );
  }
}
