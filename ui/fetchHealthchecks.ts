// Source: https://github.com/healthchecks/dashboard
function fetch(key: string, callback: any) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        callback(JSON.parse(httpRequest.responseText));
      }
    }
  };
  httpRequest.open('GET', 'https://healthchecks.io/api/v1/checks/');
  httpRequest.setRequestHeader('X-Api-Key', key);
  httpRequest.send();
}

function timeSince(timestampMs: number) {
  let v = Math.floor((Date.now() - timestampMs) / 1000);

  if (v < 60) { // v is seconds
    return v + ' second' + (v == 1 ? '' : 's');
  }


  v = Math.floor(v / 60); // v is now minutes
  if (v < 60) {
    return v + ' minute' + (v == 1 ? '' : 's');
  }

  v = Math.floor(v / 60); // v is now hours
  if (v < 24) {
    return v + ' hour' + (v == 1 ? '' : 's');
  }


  v = Math.floor(v / 24); // v is now days
  return v + ' day' + (v == 1 ? '' : 's');
}

const template: any = `
<div class="check-template">
  <div class="name"></div>
  <div class="lp"></div>
  <div class="spinner"></div>
</div>
`;

function htmlToElement(html: any) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

export function updateHealthchecksPanel(nodeQuerySelector: string) {
  const node = document.querySelector(nodeQuerySelector) as any;
  console.log(node);
  fetch(node.dataset.readonlyKey, function (doc: any) {
    let tag = 'TAG_' + node.dataset.readonlyKey.substr(0, 6);

    // Sort returned checks by name:
    let sorted = doc.checks.sort(function (a: any, b: any) {
      return a.name.localeCompare(b.name);
    });

    let fragment = document.createDocumentFragment();
    sorted.forEach(function (item: any) {
      let div: any = htmlToElement(template)
      div.setAttribute('class', tag + ' status-' + item.status);
      div.querySelector('.name').textContent = item.name || 'unnamed';
      if (item.last_ping) {
        let s = timeSince(Date.parse(item.last_ping)) + ' ago';
        div.querySelector('.lp').textContent = s;
      }
      fragment.appendChild(div);
    });


    document.querySelectorAll('.' + tag).forEach(function (element: any) {
      element.remove();
    });

    node.parentNode.insertBefore(fragment, node.nextSibling);
  });
}
