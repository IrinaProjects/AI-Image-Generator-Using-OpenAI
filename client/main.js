const generateBtn = document.querySelector(".generate-btn");
const promptInput = document.querySelector(".prompt-input");
const generatedImage = document.querySelector(".generated-image");
const downloadBtn = document.querySelector(".download-btn");

const showNotification = (message) => {
  alert(message);
};

const generateImage = async () => {
  const prompt = promptInput.value;
  if (prompt) {
    try {
      generatedImage.src = "images/2.png";

      const response = await fetch("http://localhost:4000/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      //   console.log(data);
      const image = `data:image/jpeg;base64,${data.image}`;
      generatedImage.src = image;
      downloadBtn.href = image;
    } catch (error) {
      console.log(error);
      showNotification("The image could not be generated.");
      generatedImage.src = "images/11.png";
    }
  } else {
    showNotification("Please, enter the prompt.");
  }
};

generateBtn.addEventListener("click", generateImage);
