document.addEventListener("DOMContentLoaded", function() {

    var submit = document.getElementById('submit');
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    var text = document.getElementById('text');
    var retroButton = document.getElementById('retroButton');
    var bgColor = document.getElementById('bg-color');
    var textColor = document.getElementById('text-color');
    var intoImage = document.getElementById('into-image');
    var borderColor = document.getElementById('border-color');
    var borderWidth = document.getElementById('border-width');
    var align = document.getElementById('align');

    function showPreview() {
        text.innerText = input.value;
        output.style.backgroundColor = bgColor.value;
        output.style.color = textColor.value;
        output.style.border = borderWidth.value + 'px solid ' + borderColor.value;
        var ele = document.getElementsByName('align');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                text.style.textAlign = ele[i].value;
            }

        }

        if (retroButton.checked) {
            //alert("checked");
            output.style.borderStyle = "inset";
            output.style.borderBottom = "2px solid black"
            output.style.borderRight = "2px solid black"
            output.style.borderTop = "2px solid white"
            output.style.borderLeft = "2px solid white"
            output.style.backgroundColor = "#9a9c9d"
        } else {
            // alert("You didn't check it! Let me check it for you.");
        }
        document.getElementById('upload').addEventListener('change', readURL, true);

        function readURL() {
            var file = document.getElementById("upload").files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                document.getElementById('output').style.backgroundImage = "url(" + reader.result + ")";
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        }

        function getBounds(node) {
            if (node.getBoundingClientRect) {
                var clientRect = node.getBoundingClientRect();
                var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
                return {
                    top: Math.floor(clientRect.top),
                    bottom: Math.floor(clientRect.bottom || (clientRect.top + clientRect.height)),
                    right: Math.floor(clientRect.left + width),
                    left: Math.floor(clientRect.left),
                    width: width,
                    height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
                };
            }
            return {};
        }
    }
    setInterval(showPreview, 1000);

    function displayRadioValue() {
        var ele = document.getElementsByName('align');

        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked === "center") {
                console.log('test');
                text.style.margin = "0 auto";
            } else if (ele[i].checked) {
                console.log('hi');
                text.style.textAlign = ele.value();
            }
        }
    }


    function convert2image() {
        var myOutput = document.getElementById('output');
        var resultsDiv = document.getElementById('results');

        resultsDiv.innerHTML = '';

        domtoimage.toPng(myOutput, {
            height: 31,
            width: 88
        }).then(function(dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            resultsDiv.appendChild(img);
        }).catch(function(error) {
            console.error('oops, something went wrong!', error);
        });
    }




    intoImage.addEventListener("click", convert2image);

});