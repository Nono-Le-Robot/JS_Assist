const edgeBrownser = navigator.userAgent.includes("Edg");
const chromeBrwoser = navigator.userAgent.includes("Chrome");

if (navigator.brave || navigator.userAgent.includes("OPR")) {
  alert("only work on chrome or edge.");
  document.body.style.display = "none";
} else {
  alert("only work on chrome or edge.");
  document.body.style.display = "none";
}
