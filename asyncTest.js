function Cooker(onDone) {
    console.log("cooking started")
    var time = getRandomInt(5);
    setTimeout(function () {
        onDone(time);
    }, time)
}


function Cooker2() {
    return new Promise((resolve, reject) => {
        var time = getRandomInt(5);
        setTimeout(function () {
            resolve(time);
        }, time)

    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max * 1000));
}


function onCookingComplete(time) {
    console.log("Cooking complete in " + time)

}

Cooker(onCookingComplete);

Cooker(function (time) {
    console.log("cooking finished in " + time);
    Cooker2().then(function(time) {
        console.log("cooking finished in " + time);
        Cooker2().then(onCookingComplete);
   
    });

})

async function main(){
  var time  =  await Cooker2();
  onCookingComplete(time);
}