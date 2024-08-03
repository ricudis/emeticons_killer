// Facebook emeticons killer script

function emeticons_killer(node) {
  const selector ='img[src^="https://static.xx.fbcdn.net/images/emoji.php/"]';
  const images = document.querySelectorAll(selector);
  if (images) {
    images.forEach((imageItem) => {
      parent = imageItem.parentNode;
      if (parent && parent.parentNode &&
        parent.childElementCount == 1 &&
        parent.classList &&
        parent.classList[0] == "html-span") {
          parent.parentNode.removeChild(parent);
      }
    });
  }
}

function run_emeticons_killer() {
  emeticons_killer(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          emeticons_killer(newNode);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

run_emeticons_killer();
