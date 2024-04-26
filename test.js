var p1 = new Promise(function (resolve, reject) {
  resolve("1");
});
setTimeout(function () {
  console.log("2");
}, 10);
function a() {
  console.log("3");
}
p1.then(
  function (value) {
    console.log(value);
  },
  function (value) {
    console.log(value);
  },
);
setTimeout(function () {
  console.log("4");
}, 0);
a();
