/*
TODO:
Add customization for board colors
Fix multithreaded styling
*/
const editStyling = () => {
  document.getElementsByClassName("styleContainer")[0].style.display =
    "initial";
};
const doneEditingStyling = () => {
  document.getElementsByClassName("styleContainer")[0].style.display = "none";
  if (document.getElementById("multiThreadPerfBool").checked) {
    window.api.ipcRenderer.send(
      "styleEdit",
      `${document.getElementById("col1").value} ${
        document.getElementById("col2").value
      } -mt`
    );
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  } else {
    window.api.ipcRenderer.send(
      "styleEdit",
      `${document.getElementById("col1").value} ${
        document.getElementById("col2").value
      }`
    );
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }
};
const doneEditingStylingCanceled = () => {
  document.getElementsByClassName("styleContainer")[0].style.display = "none";
};
const RGBToHex = (r, g, b) => {
  r = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16);
  g = g.toString(16).length == 1 ? "0" + g.toString(16) : g.toString(16);
  b = b.toString(16).length == 1 ? "0" + b.toString(16) : b.toString(16);
  return `#${r}${g}${b}`;
};
