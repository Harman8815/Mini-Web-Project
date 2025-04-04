
function func() {
    var x = document.getElementById("input").value;
    if (x.trim() !== '') {
        var url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(x)}`;
        var img = document.getElementById("img");
        img.src = url;
        img.onerror = function () {
            alert('Failed to generate QR code. Please try again.');
        };
    } else {
        alert('Please enter some text.');
    }
}




