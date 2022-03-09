document.addEventListener("DOMContentLoaded", function() {

    var submit = document.getElementById('submit');
    var gradient = document.getElementById('gradient');
    
    var input = document.getElementById('input');
    var input2 = document.getElementById('input2');
    var input3 = document.getElementById('input3');
    
    var output = document.getElementById('output');
    var text = document.getElementById('text');
    var retroButton = document.getElementById('retroButton');
    var bgColor = document.getElementById('bg-color');
    
    var borderRounded = document.getElementById('borderRounded');
    
    var gradColor1 = document.getElementById('bg-color');
    var gradColor2 = document.getElementById('grad-color2');
    
    var textColor = document.getElementById('text-color');
    var textColor2 = document.getElementById('text2-color');
    var textColor3 = document.getElementById('text3-color');
    var intoImage = document.getElementById('into-image');
    var borderColor = document.getElementById('border-color');
    var borderStyle = document.getElementById('border-style');
    var borderWidth = document.getElementById('border-width');
    var align = document.getElementById('align');
    
    var font1 = document.getElementById('font1');
    var boldText = document.getElementById('boldText');



    function showPreview() {
        text.innerText = input.value;        
        if(gradient.value=='none'){output.style.background = bgColor.value;}
			else if(gradient.value=="linearltr"){ output.style.background = "linear-gradient(to right, " + gradColor1.value + "," + gradColor2.value + ")";}
			else if(gradient.value=="linearvert"){ output.style.background = "linear-gradient(to bottom, " + gradColor1.value + "," + gradColor2.value + ")";}
			else if(gradient.value=="lineardiag"){ output.style.background = "linear-gradient(to bottom right, " + gradColor1.value + "," + gradColor2.value + ")";}
			else if(gradient.value=="radial"){ output.style.background = "radial-gradient(" + gradColor1.value + "," + gradColor2.value + ")";}
			
        if(borderRounded.checked){output.style.borderRadius = "25px";}
        if(!borderRounded.checked){output.style.borderRadius = "0px";}
			
			
        if(boldText.checked){text.style.fontSize = "12px";}else{text.style.fontSize = "9px";}
			
			
        output.style.color = textColor.value;
        
        output.style.border = borderWidth.value + 'px ' + borderColor.value + " " + borderStyle.value;
        var ele = document.getElementsByName('align');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                text.style.textAlign = ele[i].value;
            }
        }

        text.style.fontFamily = font1.value;
        text.style.fontFace = font1.value;
        




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
    
    setInterval(showPreview, 600);

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
