function wait3Sec() {
  var time = 3000 + new Date().getTime();
  while (time > Date.now()) {}
  console.log("3 seconds wait complete");
}

document.addEventListener(
  "click",
  () => {
    console.log("clicked");
  },
  "click",
);

wait3Sec();
console.log("finished execution");
